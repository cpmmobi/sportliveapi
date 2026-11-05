'use client'

import { useEffect, useRef, useState } from 'react'

type ShotKind = 'scores' | 'player'

/**
 * Finds the vertical centers of green badge clusters in a given X/Y region
 * so we can replace every green stream icon with a crisp red play button at sub-pixel accuracy.
 */
function findGreenBadgeCentersY(
  ctx: CanvasRenderingContext2D,
  x0: number,
  x1: number,
  y0: number,
  y1: number
): number[] {
  const width = Math.max(1, x1 - x0)
  const height = Math.max(1, y1 - y0)
  const imgData = ctx.getImageData(x0, y0, width, height).data
  const rowHasGreen: boolean[] = new Array(height).fill(false)

  for (let ry = 0; ry < height; ry++) {
    let greenCount = 0
    for (let rx = 0; rx < width; rx++) {
      const idx = (ry * width + rx) * 4
      const r = imgData[idx]
      const g = imgData[idx + 1]
      const b = imgData[idx + 2]
      if (g > 145 && g > r + 35 && g > b + 25) {
        greenCount++
      }
    }
    if (greenCount >= 4) {
      rowHasGreen[ry] = true
    }
  }

  const centers: number[] = []
  let inCluster = false
  let startY = 0
  for (let ry = 0; ry < height; ry++) {
    if (rowHasGreen[ry] && !inCluster) {
      inCluster = true
      startY = ry
    } else if (!rowHasGreen[ry] && inCluster) {
      inCluster = false
      if (ry - startY >= 5) {
        centers.push(y0 + Math.round((startY + ry - 1) / 2))
      }
    }
  }
  if (inCluster && height - startY >= 5) {
    centers.push(y0 + Math.round((startY + height - 1) / 2))
  }
  return centers
}

function drawRedPlayButton(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  btnW: number,
  btnH: number,
  label?: string,
  fontSans?: string
) {
  const x = Math.round(cx - btnW / 2)
  const y = Math.round(cy - btnH / 2)
  const radius = Math.max(4, Math.round(btnH * 0.25))

  ctx.fillStyle = '#E11D48'
  ctx.beginPath()
  ctx.roundRect(x, y, btnW, btnH, radius)
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  if (label && fontSans) {
    // Draw play triangle on the left + label on the right
    const triSize = Math.max(4, Math.round(btnH * 0.24))
    const triX = x + Math.round(btnW * 0.22)
    ctx.beginPath()
    ctx.moveTo(triX - triSize * 0.5, cy - triSize * 0.85)
    ctx.lineTo(triX - triSize * 0.5, cy + triSize * 0.85)
    ctx.lineTo(triX + triSize * 0.9, cy)
    ctx.closePath()
    ctx.fill()

    ctx.font = `bold ${Math.max(9, Math.round(btnH * 0.48))}px ${fontSans}`
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, triX + triSize + 3, cy + 1)
  } else {
    // Centered white play triangle
    const triSize = Math.max(4, Math.round(btnH * 0.28))
    ctx.beginPath()
    ctx.moveTo(cx - triSize * 0.55, cy - triSize * 0.9)
    ctx.lineTo(cx - triSize * 0.55, cy + triSize * 0.9)
    ctx.lineTo(cx + triSize * 0.95, cy)
    ctx.closePath()
    ctx.fill()
  }
}

/**
 * Redraws Chinese customer screenshots (scores / player)
 */
function drawZhRedactedCanvas(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  kind: ShotKind
) {
  const cropX = Math.round(img.naturalWidth * 0.006)
  const cropY = Math.round(img.naturalHeight * 0.006)
  const cropW = img.naturalWidth - cropX * 2
  const cropH = img.naturalHeight - cropY * 2

  canvas.width = cropW
  canvas.height = cropH

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH)

  const w = cropW
  const h = cropH
  const fontSans = '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif'

  // 1. Clean top navigation bar (0% -> 6.8% height)
  const navH = Math.round(h * 0.068)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, w, navH)
  ctx.fillStyle = '#eef2f6'
  ctx.fillRect(0, navH - 1, w, 1)

  const logoX = Math.round(w * 0.088)
  const iconR = Math.round(navH * 0.28)
  const centerY = Math.round(navH * 0.5)
  ctx.fillStyle = '#E11D48'
  ctx.beginPath()
  ctx.arc(logoX + iconR, centerY, iconR, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.font = `900 ${Math.max(10, Math.round(h * 0.016))}px ${fontSans}`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText('▶', logoX + iconR + 1, centerY + 1)

  ctx.textAlign = 'left'
  ctx.fillStyle = '#0f172a'
  ctx.font = `bold ${Math.max(12, Math.round(h * 0.021))}px ${fontSans}`
  ctx.fillText('体育比分直播', logoX + iconR * 2 + Math.round(w * 0.008), centerY - Math.round(h * 0.006))

  ctx.fillStyle = '#64748b'
  ctx.font = `500 ${Math.max(9, Math.round(h * 0.012))}px ${fontSans}`
  ctx.fillText('SPORTS LIVE PORTAL', logoX + iconR * 2 + Math.round(w * 0.008), centerY + Math.round(h * 0.013))

  const navItems = ['首页', '即时比分', '赛事直播', '赛程', '资料库']
  const activeIdx = kind === 'scores' ? 1 : 2
  let navCursorX = Math.round(w * 0.23)
  navItems.forEach((label, idx) => {
    const itemW = Math.round(w * 0.068)
    const itemH = Math.round(navH * 0.56)
    const itemY = Math.round((navH - itemH) / 2)
    if (idx === activeIdx) {
      ctx.fillStyle = '#fff1f2'
      ctx.beginPath()
      ctx.roundRect(navCursorX, itemY, itemW, itemH, 16)
      ctx.fill()
      ctx.fillStyle = '#E11D48'
      ctx.font = `bold ${Math.max(11, Math.round(h * 0.018))}px ${fontSans}`
    } else {
      ctx.fillStyle = '#334155'
      ctx.font = `500 ${Math.max(11, Math.round(h * 0.018))}px ${fontSans}`
    }
    ctx.textAlign = 'center'
    ctx.fillText(label, navCursorX + itemW / 2, centerY)
    navCursorX += Math.round(w * 0.082)
  })

  ctx.textAlign = 'left'
  const searchW = Math.round(w * 0.14)
  const searchH = Math.round(navH * 0.54)
  const searchX = w - Math.round(w * 0.085) - searchW
  const searchY = Math.round((navH - searchH) / 2)
  ctx.fillStyle = '#f1f5f9'
  ctx.beginPath()
  ctx.roundRect(searchX, searchY, searchW, searchH, 16)
  ctx.fill()
  ctx.fillStyle = '#94a3b8'
  ctx.font = `500 ${Math.max(10, Math.round(h * 0.014))}px ${fontSans}`
  ctx.fillText('🔍 搜索联赛或球队...', searchX + Math.round(w * 0.012), centerY)

  if (kind === 'scores') {
    // Detect all green TV icons in the "直播" column and replace them with red play buttons!
    const colX0 = Math.round(w * 0.608)
    const colX1 = Math.round(w * 0.642)
    const colY0 = Math.round(h * 0.27)
    const colY1 = Math.round(h * 0.992)
    const centersY = findGreenBadgeCentersY(ctx, colX0, colX1, colY0, colY1)
    const centerX = Math.round(w * 0.625)
    const btnW = Math.round(w * 0.022)
    const btnH = Math.round(h * 0.028)

    centersY.forEach((cy) => {
      // Sample row background color just to the left of the icon
      const pixel = ctx.getImageData(Math.round(w * 0.595), cy, 1, 1).data
      ctx.fillStyle = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`
      // Clear both the green icon and any adjacent anchor avatar
      ctx.fillRect(Math.round(w * 0.61), cy - Math.round(h * 0.024), Math.round(w * 0.045), Math.round(h * 0.048))
      // Draw crisp red play button
      drawRedPlayButton(ctx, centerX, cy, btnW, btnH)
    })
  } else {
    // Player screenshot redaction
    ctx.fillStyle = '#1b1f29'
    ctx.fillRect(0, Math.round(h * 0.875), Math.round(w * 0.063), Math.round(h * 0.125))

    const roomX = Math.round(w * 0.065)
    const roomY = Math.round(h * 0.165)
    const roomW = Math.round(w * 0.688)
    const roomH = Math.round(h * 0.12)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(roomX, roomY, roomW, roomH)
    ctx.fillStyle = '#e2e8f0'
    ctx.fillRect(roomX, roomY + roomH - 1, roomW, 1)

    const liveBadgeX = roomX + Math.round(w * 0.014)
    const liveBadgeY = roomY + Math.round(roomH * 0.22)
    const liveBadgeW = Math.round(w * 0.052)
    const liveBadgeH = Math.round(roomH * 0.32)
    ctx.fillStyle = '#E11D48'
    ctx.beginPath()
    ctx.roundRect(liveBadgeX, liveBadgeY, liveBadgeW, liveBadgeH, 4)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = `bold ${Math.max(9, Math.round(h * 0.013))}px ${fontSans}`
    ctx.textAlign = 'center'
    ctx.fillText('▶ 直播中', liveBadgeX + liveBadgeW / 2, liveBadgeY + liveBadgeH / 2)

    ctx.textAlign = 'left'
    ctx.fillStyle = '#0f172a'
    ctx.font = `bold ${Math.max(12, Math.round(h * 0.022))}px ${fontSans}`
    ctx.fillText(
      'NBA 常规赛 · 马刺 vs 独行侠',
      liveBadgeX + liveBadgeW + Math.round(w * 0.01),
      liveBadgeY + liveBadgeH / 2
    )

    const lines = [
      { label: '▶ 国际高清 1080P', active: true },
      { label: '聚合线路', active: false },
      { label: '赛场原声 (无解说)', active: false },
      { label: '备用线路', active: false },
    ]
    let pillX = liveBadgeX
    const pillY = roomY + Math.round(roomH * 0.62)
    const pillH = Math.round(roomH * 0.28)
    lines.forEach((ln) => {
      const pw = Math.round(w * (ln.label.length * 0.009 + 0.018))
      ctx.fillStyle = ln.active ? '#E11D48' : '#f1f5f9'
      ctx.beginPath()
      ctx.roundRect(pillX, pillY, pw, pillH, 4)
      ctx.fill()
      ctx.fillStyle = ln.active ? '#ffffff' : '#475569'
      ctx.font = `bold ${Math.max(9, Math.round(h * 0.013))}px ${fontSans}`
      ctx.textAlign = 'center'
      ctx.fillText(ln.label, pillX + pw / 2, pillY + pillH / 2)
      pillX += pw + Math.round(w * 0.008)
    })
    ctx.textAlign = 'left'

    const wmX = Math.round(w * 0.59)
    const wmY = Math.round(h * 0.285)
    const wmW = Math.round(w * 0.164)
    const wmH = Math.round(h * 0.058)
    ctx.fillStyle = '#090d16'
    ctx.fillRect(wmX, wmY, wmW, wmH)
    ctx.fillStyle = '#38bdf8'
    ctx.font = `bold ${Math.max(10, Math.round(h * 0.016))}px ${fontSans}`
    ctx.textAlign = 'right'
    ctx.fillText('HD 1080P · 60FPS', wmX + wmW - Math.round(w * 0.014), wmY + wmH / 2)
    ctx.textAlign = 'left'

    const botX = Math.round(w * 0.065)
    const botY = Math.round(h * 0.918)
    const botW = Math.round(w * 0.689)
    const botH = h - botY
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(botX, botY, botW, botH)
    ctx.fillStyle = '#e2e8f0'
    ctx.fillRect(botX, botY, botW, 1)
    ctx.fillStyle = '#64748b'
    ctx.font = `500 ${Math.max(10, Math.round(h * 0.014))}px ${fontSans}`
    ctx.fillText(
      '当前信号：国际高清 (1920×1080 · 60fps)   |   支持画中画与全屏切换   |   遇到卡顿可点击上方切换备用线路',
      botX + Math.round(w * 0.014),
      botY + botH / 2
    )

    const rightX = Math.round(w * 0.754)
    const rightW = w - rightX
    const annY = navH
    const topRightH = Math.round(h * 0.262)
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(rightX, annY, rightW, topRightH)
    ctx.fillStyle = '#e2e8f0'
    ctx.fillRect(rightX, annY + topRightH - 1, rightW, 1)

    const cardX = rightX + Math.round(w * 0.012)
    const cardY = annY + Math.round(h * 0.018)
    const cardW = rightW - Math.round(w * 0.024)
    const cardH = topRightH - Math.round(h * 0.036)
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.roundRect(cardX, cardY, cardW, cardH, 8)
    ctx.fill()

    ctx.fillStyle = '#0f172a'
    ctx.font = `bold ${Math.max(10, Math.round(h * 0.016))}px ${fontSans}`
    ctx.fillText('📊 本场球迷胜负支持率', cardX + Math.round(w * 0.012), cardY + Math.round(cardH * 0.24))

    const barX = cardX + Math.round(w * 0.012)
    const barY = cardY + Math.round(cardH * 0.48)
    const barW = cardW - Math.round(w * 0.024)
    const barH = Math.round(cardH * 0.16)
    ctx.fillStyle = '#e2e8f0'
    ctx.beginPath()
    ctx.roundRect(barX, barY, barW, barH, 6)
    ctx.fill()
    ctx.fillStyle = '#E11D48'
    ctx.beginPath()
    ctx.roundRect(barX, barY, Math.round(barW * 0.54), barH, 6)
    ctx.fill()

    ctx.fillStyle = '#475569'
    ctx.font = `600 ${Math.max(9, Math.round(h * 0.013))}px ${fontSans}`
    ctx.fillText('马刺 54%', barX, cardY + Math.round(cardH * 0.8))
    ctx.textAlign = 'right'
    ctx.fillText('独行侠 46%', barX + barW, cardY + Math.round(cardH * 0.8))
    ctx.textAlign = 'left'

    ctx.fillStyle = '#f1f5f9'
    ctx.fillRect(rightX + Math.round(w * 0.008), Math.round(h * 0.445), rightW - Math.round(w * 0.016), Math.round(h * 0.078))
    ctx.fillStyle = '#475569'
    ctx.font = `600 ${Math.max(10, Math.round(h * 0.013))}px ${fontSans}`
    ctx.fillText('💬 欢迎进入本场赛事聊天室，文明聊球', rightX + Math.round(w * 0.018), Math.round(h * 0.485))

    const chatMaskRows = [0.542, 0.587, 0.632, 0.682, 0.748, 0.793, 0.838, 0.885]
    chatMaskRows.forEach((ry, idx) => {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(rightX + Math.round(w * 0.042), Math.round(h * ry), Math.round(w * 0.068), Math.round(h * 0.028))
      ctx.fillStyle = '#64748b'
      ctx.font = `600 ${Math.max(9, Math.round(h * 0.013))}px ${fontSans}`
      ctx.fillText(`球迷 #${108 + idx}:`, rightX + Math.round(w * 0.044), Math.round(h * (ry + 0.015)))
    })
  }
}

/**
 * Redraws English / International dark-theme customer screenshots (en-scores / en-player)
 * Removes CAMEL LIVE brand, REGISTER button, watermarks, URLs, and ad banners,
 * and replaces green LIVE badges with red play buttons.
 */
function drawEnRedactedCanvas(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  kind: ShotKind
) {
  const cropX = Math.round(img.naturalWidth * 0.004)
  const cropY = Math.round(img.naturalHeight * 0.004)
  const cropW = img.naturalWidth - cropX * 2
  const cropH = img.naturalHeight - cropY * 2

  canvas.width = cropW
  canvas.height = cropH

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH)

  const w = cropW
  const h = cropH
  const fontSans = '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif'

  // 1. Replace top dark-green header bar (0% -> 7.4% height)
  //    Removes CAMEL LIVE logo on left & REGISTER / UK flag / chat icons on right
  const navH = Math.round(h * 0.074)
  ctx.fillStyle = '#141820'
  ctx.fillRect(0, 0, w, navH)
  ctx.fillStyle = '#262c3a'
  ctx.fillRect(0, navH - 1, w, 1)

  // Clean brand-neutral logo on top-left
  const logoX = Math.round(w * 0.02)
  const centerY = Math.round(navH * 0.5)
  const badgeH = Math.round(navH * 0.58)
  const badgeW = Math.round(badgeH * 1.15)
  drawRedPlayButton(ctx, logoX + badgeW / 2, centerY, badgeW, badgeH)

  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  ctx.font = `800 ${Math.max(12, Math.round(h * 0.022))}px ${fontSans}`
  ctx.fillText('SPORTS', logoX + badgeW + Math.round(w * 0.008), centerY)
  ctx.fillStyle = '#E11D48'
  ctx.fillText('LIVE', logoX + badgeW + Math.round(w * 0.068), centerY)

  // Clean dark search bar in header
  const searchX = Math.round(w * 0.15)
  const searchW = Math.round(w * 0.29)
  const searchH = Math.round(navH * 0.6)
  const searchY = Math.round((navH - searchH) / 2)
  ctx.fillStyle = '#1f2633'
  ctx.beginPath()
  ctx.roundRect(searchX, searchY, searchW, searchH, 18)
  ctx.fill()
  ctx.fillStyle = '#94a3b8'
  ctx.font = `500 ${Math.max(10, Math.round(h * 0.015))}px ${fontSans}`
  ctx.fillText('🔍  Search Matches, Teams, Competitions...', searchX + Math.round(w * 0.014), centerY)

  // Clean navigation pills on the right of header
  const rightPillW = Math.round(w * 0.16)
  const rightPillH = Math.round(navH * 0.54)
  const rightPillX = w - Math.round(w * 0.02) - rightPillW
  const rightPillY = Math.round((navH - rightPillH) / 2)
  ctx.fillStyle = '#1f2633'
  ctx.beginPath()
  ctx.roundRect(rightPillX, rightPillY, rightPillW, rightPillH, 14)
  ctx.fill()
  ctx.fillStyle = '#e2e8f0'
  ctx.font = `600 ${Math.max(10, Math.round(h * 0.014))}px ${fontSans}`
  ctx.textAlign = 'center'
  ctx.fillText('● Live Feeds Connected', rightPillX + rightPillW / 2, centerY)
  ctx.textAlign = 'left'

  if (kind === 'scores') {
    // 2a. Replace green "● LIVE" filter button (x: 10.2%..19.4%, y: 32.1%..37%) with red play filter button
    const filterX = Math.round(w * 0.102)
    const filterY = Math.round(h * 0.321)
    const filterW = Math.round(w * 0.092)
    const filterH = Math.round(h * 0.048)
    ctx.fillStyle = '#16181d'
    ctx.fillRect(filterX - 2, filterY - 2, filterW + 4, filterH + 4)
    ctx.strokeStyle = '#E11D48'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(filterX, filterY, filterW, filterH, 20)
    ctx.stroke()
    ctx.fillStyle = '#E11D48'
    ctx.font = `bold ${Math.max(10, Math.round(h * 0.016))}px ${fontSans}`
    ctx.textAlign = 'center'
    ctx.fillText('▶ LIVE', filterX + filterW / 2, filterY + filterH / 2 + 1)
    ctx.textAlign = 'left'

    // 2b. Detect the green LIVE badges on the match rows (x: 38.5%..45%, y: 42%..84%)
    //     and replace each with a crisp red play button ("▶ LIVE")
    const colX0 = Math.round(w * 0.388)
    const colX1 = Math.round(w * 0.448)
    const colY0 = Math.round(h * 0.42)
    const colY1 = Math.round(h * 0.84)
    const centersY = findGreenBadgeCentersY(ctx, colX0, colX1, colY0, colY1)
    const centerX = Math.round(w * 0.419)
    const btnW = Math.round(w * 0.048)
    const btnH = Math.round(h * 0.036)

    centersY.forEach((cy) => {
      ctx.fillStyle = '#16181d'
      ctx.fillRect(colX0 - 2, cy - Math.round(h * 0.024), colX1 - colX0 + 4, Math.round(h * 0.048))
      drawRedPlayButton(ctx, centerX, cy, btnW, btnH, 'LIVE', fontSans)
    })
  } else {
    // en-player screenshot redaction
    // 2a. Clean breadcrumb bar (y: 7.4% -> 10.8%) removing "Camel Live >"
    const bcY = navH
    const bcH = Math.round(h * 0.035)
    ctx.fillStyle = '#0e1015'
    ctx.fillRect(Math.round(w * 0.085), bcY, Math.round(w * 0.83), bcH)
    ctx.fillStyle = '#94a3b8'
    ctx.font = `600 ${Math.max(10, Math.round(h * 0.014))}px ${fontSans}`
    ctx.fillText(
      'Live Matches   ›   CFA Team China Futsal International Tournament   ›   Korea Republic vs Maldives (1080p HD)',
      Math.round(w * 0.092),
      bcY + bcH / 2
    )

    // 2b. Remove "CAMEL LIVE" watermark inside top-right of video player (x: 48.2%..66.8%, y: 13.5%..22.2%)
    const wmX = Math.round(w * 0.482)
    const wmY = Math.round(h * 0.135)
    const wmW = Math.round(w * 0.186)
    const wmH = Math.round(h * 0.088)
    ctx.fillStyle = 'rgba(15, 20, 28, 0.92)'
    ctx.beginPath()
    ctx.roundRect(wmX, wmY, wmW, wmH, 8)
    ctx.fill()
    ctx.strokeStyle = '#E11D48'
    ctx.lineWidth = 1.5
    ctx.stroke()

    ctx.fillStyle = '#E11D48'
    ctx.beginPath()
    ctx.arc(wmX + Math.round(w * 0.018), wmY + wmH / 2, Math.round(h * 0.008), 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#ffffff'
    ctx.font = `bold ${Math.max(11, Math.round(h * 0.018))}px ${fontSans}`
    ctx.fillText('LIVE 1080P · 60FPS', wmX + Math.round(w * 0.032), wmY + wmH / 2)

    // 2c. Redraw right-hand chat panel (x: 68%..90.8%, y: 10.9%..62%)
    //     Removes Camel promo messages, vip.camelgoal20.com link, and blue ad banner
    const chatX = Math.round(w * 0.68)
    const chatY = Math.round(h * 0.109)
    const chatW = Math.round(w * 0.228)
    const chatH = Math.round(h * 0.51)
    ctx.fillStyle = '#181b20'
    ctx.fillRect(chatX, chatY, chatW, chatH)

    // Top chat notice bar
    ctx.fillStyle = '#22262e'
    ctx.fillRect(chatX, chatY, chatW, Math.round(h * 0.042))
    ctx.fillStyle = '#e2e8f0'
    ctx.font = `bold ${Math.max(10, Math.round(h * 0.014))}px ${fontSans}`
    ctx.fillText('💬  Live Match Chat Room (1,280 online)', chatX + Math.round(w * 0.012), chatY + Math.round(h * 0.021))

    const messages = [
      { user: 'Fan #104', color: '#38bdf8', text: 'Super smooth 1080p stream! Zero buffering.' },
      { user: 'Fan #219', color: '#34d399', text: 'Korea Republic leading 3-1 at halftime 🔥' },
      { user: 'Fan #305', color: '#fbbf24', text: 'Switched to Raw Stadium Audio — love the crowd noise' },
      { user: 'Fan #418', color: '#f43f5e', text: 'Great futsal pace, second half starting soon!' },
      { user: 'Fan #502', color: '#a78bfa', text: 'Multi-line switcher works instantaneously' },
    ]
    let msgY = chatY + Math.round(h * 0.075)
    messages.forEach((m) => {
      ctx.fillStyle = m.color
      ctx.font = `bold ${Math.max(9, Math.round(h * 0.013))}px ${fontSans}`
      ctx.fillText(`${m.user}:`, chatX + Math.round(w * 0.012), msgY)
      ctx.fillStyle = '#cbd5e1'
      ctx.font = `500 ${Math.max(9, Math.round(h * 0.013))}px ${fontSans}`
      ctx.fillText(m.text, chatX + Math.round(w * 0.012), msgY + Math.round(h * 0.022))
      msgY += Math.round(h * 0.068)
    })

    // 2d. Replace bottom ad banner (x: 8.8%..91.2%, y: 69.2%..85.8%)
    //     with a clean Multi-Line Stream Switcher & Match Control Bar
    const banX = Math.round(w * 0.088)
    const banY = Math.round(h * 0.692)
    const banW = Math.round(w * 0.824)
    const banH = Math.round(h * 0.165)
    ctx.fillStyle = '#181b20'
    ctx.beginPath()
    ctx.roundRect(banX, banY, banW, banH, 8)
    ctx.fill()
    ctx.strokeStyle = '#262c3a'
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.fillStyle = '#ffffff'
    ctx.font = `bold ${Math.max(12, Math.round(h * 0.022))}px ${fontSans}`
    ctx.fillText(
      'Korea Republic Futsal   3  -  1   Maldives Futsal',
      banX + Math.round(w * 0.02),
      banY + Math.round(banH * 0.36)
    )
    ctx.fillStyle = '#94a3b8'
    ctx.font = `500 ${Math.max(10, Math.round(h * 0.014))}px ${fontSans}`
    ctx.fillText(
      'Stream Status: 1920×1080 · 60fps   |   Switch between Global HD, Web Stream & Raw Stadium Audio',
      banX + Math.round(w * 0.02),
      banY + Math.round(banH * 0.72)
    )

    // Draw 3 stream line pills on the right side of the bar
    const pills = [
      { label: '▶ Global HD 1080p', active: true },
      { label: 'Web Stream', active: false },
      { label: 'Raw Audio', active: false },
    ]
    let px = banX + banW - Math.round(w * 0.34)
    const py = banY + Math.round(banH * 0.28)
    const ph = Math.round(banH * 0.44)
    pills.forEach((p) => {
      const pw = p.active ? Math.round(w * 0.125) : Math.round(w * 0.09)
      ctx.fillStyle = p.active ? '#E11D48' : '#262c3a'
      ctx.beginPath()
      ctx.roundRect(px, py, pw, ph, 6)
      ctx.fill()
      ctx.fillStyle = '#ffffff'
      ctx.font = `bold ${Math.max(9, Math.round(h * 0.014))}px ${fontSans}`
      ctx.textAlign = 'center'
      ctx.fillText(p.label, px + pw / 2, py + ph / 2 + 1)
      px += pw + Math.round(w * 0.01)
    })
    ctx.textAlign = 'left'
  }
}

export function RedactedSlideStage({
  kind,
  locale,
  caption,
}: {
  kind: ShotKind
  locale: string
  caption: string
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [zoomUrl, setZoomUrl] = useState<string | null>(null)

  const isChinese = locale === 'zh' || locale === 'zh-TW'
  const assetName = isChinese ? kind : `en-${kind}`

  useEffect(() => {
    setLoaded(false)
    let active = true
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      if (!active || !canvasRef.current) return
      if (isChinese) {
        drawZhRedactedCanvas(canvasRef.current, img, kind)
      } else {
        drawEnRedactedCanvas(canvasRef.current, img, kind)
      }
      setLoaded(true)
    }
    img.src = `/api/preview/case-asset?name=${assetName}`
    return () => {
      active = false
    }
  }, [assetName, isChinese, kind])

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-[22rem] flex-col overflow-hidden rounded-lg border border-white/15 bg-[#0b0d12] shadow-2xl sm:h-[25rem]">
        {/* Browser Chrome Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#141720] px-3.5 py-2 text-[11px] text-white/70">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-mono text-[11px] text-white/60">
              {kind === 'scores'
                ? 'https://your-sports-portal.com/livescore'
                : 'https://your-sports-portal.com/live/match-room'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (loaded && canvasRef.current) {
                setZoomUrl(canvasRef.current.toDataURL('image/jpeg', 0.94))
              }
            }}
            className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white hover:bg-brand-primary"
          >
            {isChinese ? '🔍 全屏查看实拍细节' : '🔍 Click to Enlarge'}
          </button>
        </div>

        {/* Canvas Stage — Fixed uniform height with object-contain */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#0b0d12]">
          {!loaded && (
            <div className="flex h-full w-full items-center justify-center text-xs text-white/50">
              {isChinese ? '正在渲染脱敏实拍图...' : 'Rendering redacted screenshot...'}
            </div>
          )}
          <canvas
            ref={canvasRef}
            onClick={() => {
              if (loaded && canvasRef.current) {
                setZoomUrl(canvasRef.current.toDataURL('image/jpeg', 0.94))
              }
            }}
            className={`max-h-full max-w-full cursor-zoom-in object-contain transition-opacity ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>

      <p className="mt-2.5 text-center text-xs text-white/60">{caption}</p>

      {zoomUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setZoomUrl(null)}
        >
          <div
            className="max-h-[92vh] max-w-6xl overflow-hidden border-2 border-brand-primary bg-brand-ink shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/15 px-4 py-2.5 text-xs text-white">
              <span className="font-bold">{caption}</span>
              <button
                type="button"
                onClick={() => setZoomUrl(null)}
                className="bg-brand-primary px-3 py-1 font-bold text-white hover:bg-brand-dark"
              >
                {isChinese ? '关闭 ✕' : 'Close ✕'}
              </button>
            </div>
            <img src={zoomUrl} alt={caption} className="max-h-[84vh] w-auto object-contain" />
          </div>
        </div>
      )}
    </div>
  )
}

export default function RedactedCaseShowcase({ locale }: { locale: string }) {
  return <RedactedSlideStage kind="scores" locale={locale} caption="" />
}
