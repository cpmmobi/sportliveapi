// 用户来源追踪工具
import { getCompleteUTMParams } from './utm-persistence';

// 搜索引擎关键词解析
interface SearchInfo {
  searchEngine: string;
  keyword: string | null;
  referrerUrl: string;
}

// 设备信息接口
interface DeviceInfo {
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  userAgent: string;
  language: string;
  languages: string[];
}

// 用户来源完整信息
export interface UserSourceInfo {
  // 来源分类
  source: string;           // google, baidu, direct, referral
  medium: string;           // organic, cpc, referral, direct
  campaign?: string;        // 广告系列名称
  
  // 关键词信息
  keyword?: string;         // 搜索关键词
  keywordSource: 'organic' | 'paid' | 'unknown';
  
  // 技术信息
  referrer: string;         // 完整referrer URL
  landingPage: string;      // 着陆页
  
  // 设备信息
  device: DeviceInfo;
  
  // 地理信息（IP地址，后端获取）
  clientIP?: string;
  
  // 广告信息
  gclid?: string;           // Google Ads点击ID
  fbclid?: string;          // Facebook点击ID
  
  // UI 语言（根据 URL 路径前缀推断，如 zh / en / zh-TW）
  uiLocale?: string;
  
  // 时间信息
  timestamp: number;        // 访问时间戳
}

// 解析搜索引擎关键词
function extractSearchKeyword(referrer: string): SearchInfo {
  if (!referrer) {
    return {
      searchEngine: 'direct',
      keyword: null,
      referrerUrl: ''
    };
  }

  try {
    const url = new URL(referrer);
    const hostname = url.hostname.toLowerCase();
    
    // 百度搜索 - 关键词参数: wd, word, kw
    if (hostname.includes('baidu.com')) {
      const keyword = url.searchParams.get('wd') || 
                     url.searchParams.get('word') ||
                     url.searchParams.get('kw');
      return {
        searchEngine: 'baidu',
        keyword: keyword ? decodeURIComponent(keyword) : null,
        referrerUrl: referrer
      };
    }
    
    // Google搜索 - 关键词参数: q
    if (hostname.includes('google.')) {
      const keyword = url.searchParams.get('q');
      return {
        searchEngine: 'google',
        keyword: keyword ? decodeURIComponent(keyword) : null,
        referrerUrl: referrer
      };
    }
    
    // 必应搜索 - 关键词参数: q
    if (hostname.includes('bing.com')) {
      const keyword = url.searchParams.get('q');
      return {
        searchEngine: 'bing',
        keyword: keyword ? decodeURIComponent(keyword) : null,
        referrerUrl: referrer
      };
    }
    
    // 搜狗搜索 - 关键词参数: query, keyword
    if (hostname.includes('sogou.com')) {
      const keyword = url.searchParams.get('query') || 
                     url.searchParams.get('keyword');
      return {
        searchEngine: 'sogou',
        keyword: keyword ? decodeURIComponent(keyword) : null,
        referrerUrl: referrer
      };
    }
    
    // 360搜索 - 关键词参数: q
    if (hostname.includes('so.com') || hostname.includes('360.cn')) {
      const keyword = url.searchParams.get('q');
      return {
        searchEngine: '360',
        keyword: keyword ? decodeURIComponent(keyword) : null,
        referrerUrl: referrer
      };
    }
    
    // 搜搜搜索 - 关键词参数: w
    if (hostname.includes('soso.com')) {
      const keyword = url.searchParams.get('w');
      return {
        searchEngine: 'soso',
        keyword: keyword ? decodeURIComponent(keyword) : null,
        referrerUrl: referrer
      };
    }
    
    // 神马搜索 - 关键词参数: q
    if (hostname.includes('sm.cn')) {
      const keyword = url.searchParams.get('q');
      return {
        searchEngine: 'shenma',
        keyword: keyword ? decodeURIComponent(keyword) : null,
        referrerUrl: referrer
      };
    }
    
    // 其他搜索引擎通用解析
    const commonParams = ['q', 'query', 'search', 'keyword', 'wd', 'word', 'kw'];
    for (const param of commonParams) {
      const keyword = url.searchParams.get(param);
      if (keyword) {
        return {
          searchEngine: hostname,
          keyword: decodeURIComponent(keyword),
          referrerUrl: referrer
        };
      }
    }
    
    // 如果是搜索引擎但没找到关键词
    if (isSearchEngine(hostname)) {
      return {
        searchEngine: hostname,
        keyword: null,
        referrerUrl: referrer
      };
    }
    
    // 非搜索引擎referrer - 进一步分类
    const referralType = classifyReferralSource(hostname);
    return {
      searchEngine: referralType,
      keyword: null,
      referrerUrl: referrer
    };
    
  } catch (error) {
    console.error('解析referrer失败:', error);
    return {
      searchEngine: 'unknown',
      keyword: null,
      referrerUrl: referrer
    };
  }
}

// 判断是否为搜索引擎
function isSearchEngine(hostname: string): boolean {
  const searchEngines = [
    'google.', 'baidu.com', 'bing.com', 'yahoo.com',
    'sogou.com', 'so.com', '360.cn', 'soso.com', 'sm.cn',
    'yandex.', 'duckduckgo.com', 'ask.com'
  ];
  
  return searchEngines.some(engine => hostname.includes(engine));
}

// 分类引荐来源
function classifyReferralSource(hostname: string): string {
  // 社交媒体
  const socialMedia = [
    'facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com',
    'weibo.com', 'zhihu.com', 'wechat.com', 'qq.com'
  ];
  
  // 技术社区
  const techCommunity = [
    'github.com', 'stackoverflow.com', 'reddit.com', 'medium.com',
    'dev.to', 'csdn.net', 'cnblogs.com', 'segmentfault.com', 'v2ex.com'
  ];
  
  // 新闻媒体
  const newsMedia = [
    '36kr.com', 'ithome.com', 'techcrunch.com', 'producthunt.com',
    'hackernews.com', 'infoq.com'
  ];
  
  // 论坛社区
  const forums = [
    'tieba.baidu.com', 'douban.com', 'jianshu.com'
  ];
  
  for (const domain of socialMedia) {
    if (hostname.includes(domain)) {
      return 'social';
    }
  }
  
  for (const domain of techCommunity) {
    if (hostname.includes(domain)) {
      return 'tech_community';
    }
  }
  
  for (const domain of newsMedia) {
    if (hostname.includes(domain)) {
      return 'news_media';
    }
  }
  
  for (const domain of forums) {
    if (hostname.includes(domain)) {
      return 'forum';
    }
  }
  
  // 默认为普通网站引荐
  return 'referral';
}

// 从URL参数获取关键词（用于付费广告）
function getKeywordFromParams(): string | null {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  
  // Google Ads关键词
  const utmTerm = urlParams.get('utm_term');
  if (utmTerm) return decodeURIComponent(utmTerm);
  
  // 百度推广关键词
  const bdTerm = urlParams.get('bd_term');
  if (bdTerm) return decodeURIComponent(bdTerm);
  
  // 360推广关键词
  const qhTerm = urlParams.get('qh_term');
  if (qhTerm) return decodeURIComponent(qhTerm);
  
  // 搜狗推广关键词
  const sgTerm = urlParams.get('sg_term');
  if (sgTerm) return decodeURIComponent(sgTerm);
  
  // 其他可能的关键词参数
  const keywordParams = ['keyword', 'kw', 'q', 'search_term'];
  for (const param of keywordParams) {
    const value = urlParams.get(param);
    if (value) return decodeURIComponent(value);
  }
  
  return null;
}

// 获取设备信息
function getDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      device: 'desktop',
      browser: 'unknown',
      os: 'unknown',
      userAgent: '',
      language: 'unknown',
      languages: []
    };
  }
  
  const userAgent = navigator.userAgent;
  
  // 检测设备类型
  let device: 'desktop' | 'mobile' | 'tablet' = 'desktop';
  if (/iPad|Android(?=.*Tablet)|(?=.*\\bTablet\\b)/.test(userAgent)) {
    device = 'tablet';
  } else if (/iPhone|Android|BlackBerry|Opera Mini|IEMobile|WPDesktop/.test(userAgent)) {
    device = 'mobile';
  }
  
  // 检测浏览器
  let browser = 'unknown';
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browser = 'Chrome';
  } else if (userAgent.includes('Firefox')) {
    browser = 'Firefox';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser = 'Safari';
  } else if (userAgent.includes('Edg')) {
    browser = 'Edge';
  } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
    browser = 'IE';
  }
  
  // 检测操作系统
  let os = 'unknown';
  if (userAgent.includes('Windows')) {
    os = 'Windows';
  } else if (userAgent.includes('Mac OS') || userAgent.includes('macOS')) {
    os = 'macOS';
  } else if (userAgent.includes('Linux')) {
    os = 'Linux';
  } else if (userAgent.includes('Android')) {
    os = 'Android';
  } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    os = 'iOS';
  }
  
  // 获取浏览器语言设置
  let language = 'unknown';
  let languages: string[] = [];
  
  try {
    // 获取首选语言
    language = navigator.language || 'unknown';
    
    // 获取所有语言列表
    if (navigator.languages && navigator.languages.length > 0) {
      languages = Array.from(navigator.languages);
    } else {
      languages = [language];
    }
    
    console.log('🌐 检测到的语言信息:', {
      primary: language,
      all: languages
    });
    
  } catch (error) {
    console.warn('⚠️ 无法获取语言信息:', error);
    language = 'unknown';
    languages = [];
  }
  
  return {
    device,
    browser,
    os,
    userAgent,
    language,
    languages
  };
}

// 获取完整的用户来源信息
export function getUserSourceInfo(): UserSourceInfo {
  if (typeof window === 'undefined') {
    return {
      source: 'ssr',
      medium: 'unknown',
      keywordSource: 'unknown',
      referrer: '',
      landingPage: '',
      device: {
        device: 'desktop',
        browser: 'unknown',
        os: 'unknown',
        userAgent: '',
        language: 'unknown',
        languages: []
      },
      // SSR 场景默认 zh，实际表单在前端执行会覆盖
      uiLocale: 'zh',
      timestamp: Date.now()
    };
  }
  

  
  const urlParams = new URLSearchParams(window.location.search);
  const searchInfo = extractSearchKeyword(document.referrer);
  const keywordFromParams = getKeywordFromParams();
  const deviceInfo = getDeviceInfo();
  
  // 推断当前 UI 语言（基于 URL 路径前缀）
  let uiLocale: string = 'zh';
  try {
    const pathLocale = (window.location.pathname.split('/')[1] || '').trim();
    if (['zh', 'en', 'zh-TW'].includes(pathLocale)) {
      uiLocale = pathLocale;
    }
  } catch {}
  
  // 调试referrer信息
  console.log('🔍 调试用户来源信息:');
  console.log('  document.referrer:', document.referrer);
  console.log('  searchInfo:', searchInfo);
  console.log('  window.location.href:', window.location.href);
  
  // 获取完整的UTM参数（当前页面 + 持久化缓存）
  const completeUTM = getCompleteUTMParams();
  
  // UTM参数（优先使用持久化参数）
  const utmSource = completeUTM.utm_source || urlParams.get('utm_source');
  const utmMedium = completeUTM.utm_medium || urlParams.get('utm_medium');
  const utmCampaign = completeUTM.utm_campaign || urlParams.get('utm_campaign');
  
  // 广告点击ID（优先使用持久化参数）
  const gclid = completeUTM.gclid || urlParams.get('gclid');
  const fbclid = completeUTM.fbclid || urlParams.get('fbclid');
  
  // 关键词也优先使用持久化的utm_term
  const utmTerm = completeUTM.utm_term || urlParams.get('utm_term');
  const keywordFromUTM = utmTerm ? decodeURIComponent(utmTerm) : null;
  
  // 优先使用UTM参数，如果没有UTM参数才使用referrer分析
  let source: string;
  let medium: string;
  let keyword = keywordFromUTM || keywordFromParams || searchInfo.keyword;
  let keywordSource: 'organic' | 'paid' | 'unknown' = 'unknown';
  
  // 首先检查是否有UTM参数或广告点击ID
  if (utmSource || gclid || fbclid) {
    // 有UTM参数或广告ID，优先使用
    source = utmSource || (gclid ? 'google' : (fbclid ? 'facebook' : 'unknown'));
    medium = utmMedium || 'cpc';
  } else {
    // 没有UTM参数，使用referrer分析
    source = searchInfo.searchEngine;
    
    // 根据来源类型设置medium
    if (searchInfo.searchEngine === 'direct') {
      medium = 'direct';
    } else if (searchInfo.searchEngine && isSearchEngine(searchInfo.searchEngine)) {
      medium = 'organic';
    } else {
      // 不是搜索引擎，是引荐网站
      medium = 'referral';
    }
  }
  
  // 判断关键词来源
  if (keyword) {
    if (medium === 'cpc' || gclid) {
      keywordSource = 'paid';
    } else if (searchInfo.keyword) {
      keywordSource = 'organic';
    }
  }
  
  // 特殊情况处理 - 这些会覆盖上面的逻辑
  if (gclid) {
    source = 'google';
    medium = 'cpc';
  }
  
  if (fbclid) {
    source = 'facebook';
    medium = 'cpc';
  }
  
  return {
    source,
    medium,
    campaign: utmCampaign || undefined,
    keyword: keyword || undefined,
    keywordSource,
    referrer: document.referrer,
    landingPage: window.location.href,
    device: deviceInfo,
    gclid: gclid || undefined,
    fbclid: fbclid || undefined,
    uiLocale,
    timestamp: Date.now()
  };
}

// 格式化用户来源信息为易读文本 - 更新版本
export function formatUserSourceForDisplay(sourceInfo: UserSourceInfo): string {
  const parts = [];
  
  // 来源信息
  if (sourceInfo.source && sourceInfo.source !== 'unknown') {
    if (sourceInfo.medium === 'cpc') {
      parts.push(`💰 付费广告 - ${sourceInfo.source}`);
    } else if (sourceInfo.medium === 'organic') {
      parts.push(`🔍 自然搜索 - ${sourceInfo.source}`);
    } else if (sourceInfo.source === 'direct') {
      parts.push(`🎯 直接访问`);
    } else {
      parts.push(`🔗 网站引荐 - ${sourceInfo.source}`);
    }
  }
  
  // 关键词信息
  if (sourceInfo.keyword) {
    if (sourceInfo.keywordSource === 'paid') {
      parts.push(`🎯 付费关键词: ${sourceInfo.keyword}`);
    } else {
      parts.push(`🔍 搜索关键词: ${sourceInfo.keyword}`);
    }
  }
  
  // 广告系列信息
  if (sourceInfo.campaign) {
    parts.push(`📢 广告系列: ${sourceInfo.campaign}`);
  }
  
  // 设备信息
  const deviceEmoji = sourceInfo.device.device === 'mobile' ? '📱' : 
                     sourceInfo.device.device === 'tablet' ? '💻' : '🖥️';
  parts.push(`${deviceEmoji} ${sourceInfo.device.device} - ${sourceInfo.device.browser}/${sourceInfo.device.os}`);
  
  return parts.join('\\n');
}

// 格式化IP地址显示
export function formatIPAddress(ip: string): string {
  // 处理localhost地址
  if (ip === '::1' || ip === '127.0.0.1' || ip === 'localhost' || ip === 'unknown') {
    return '🏠 本地开发环境';
  }
  
  // 处理内网地址
  if (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return '🏢 内网地址';
  }
  
  // 处理IPv6地址
  if (ip.includes(':') && ip !== '::1') {
    return `🌍 IPv6: ${ip.substring(0, 20)}...`;
  }
  
  // 普通IPv4地址
  return `🌍 IP: ${ip}`;
}
