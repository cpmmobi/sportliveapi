// UTM参数持久化管理
// 解决用户从首页导航到联系页面时UTM参数丢失的问题

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
}

const UTM_STORAGE_KEY = 'user_utm_params';
const UTM_EXPIRY_KEY = 'user_utm_expiry';
const UTM_EXPIRY_HOURS = 24; // UTM参数保持24小时

// 从URL中提取UTM参数
export function extractUTMFromURL(url?: string): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const targetURL = url || window.location.href;
  const urlParams = new URLSearchParams(new URL(targetURL).search);
  
  const utmParams: UTMParams = {};
  
  // 提取所有UTM参数
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const adKeys = ['gclid', 'fbclid'];
  
  [...utmKeys, ...adKeys].forEach(key => {
    const value = urlParams.get(key);
    if (value) {
      (utmParams as any)[key] = value;
    }
  });
  
  return utmParams;
}

// 保存UTM参数到localStorage
export function saveUTMParams(utmParams: UTMParams): void {
  if (typeof window === 'undefined') return;
  
  // 只有当有UTM参数时才保存
  const hasUTMParams = Object.keys(utmParams).length > 0;
  if (!hasUTMParams) return;
  
  try {
    // 设置过期时间
    const expiryTime = Date.now() + (UTM_EXPIRY_HOURS * 60 * 60 * 1000);
    
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));
    localStorage.setItem(UTM_EXPIRY_KEY, expiryTime.toString());
    
    console.log('💾 UTM参数已保存:', utmParams);
  } catch (error) {
    console.warn('⚠️ 无法保存UTM参数:', error);
  }
}

// 从localStorage获取UTM参数
export function getSavedUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  try {
    const expiryTime = localStorage.getItem(UTM_EXPIRY_KEY);
    const currentTime = Date.now();
    
    // 检查是否过期
    if (!expiryTime || currentTime > parseInt(expiryTime)) {
      // 已过期，清除数据
      clearUTMParams();
      return {};
    }
    
    const savedParams = localStorage.getItem(UTM_STORAGE_KEY);
    if (!savedParams) return {};
    
    const utmParams = JSON.parse(savedParams);
    console.log('📖 从缓存读取UTM参数:', utmParams);
    return utmParams;
    
  } catch (error) {
    console.warn('⚠️ 无法读取UTM参数:', error);
    return {};
  }
}

// 清除UTM参数
export function clearUTMParams(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(UTM_STORAGE_KEY);
    localStorage.removeItem(UTM_EXPIRY_KEY);
    console.log('🗑️ UTM参数已清除');
  } catch (error) {
    console.warn('⚠️ 无法清除UTM参数:', error);
  }
}

// 获取完整的UTM参数（当前URL + 缓存）
export function getCompleteUTMParams(): UTMParams {
  const currentUTM = extractUTMFromURL();
  const savedUTM = getSavedUTMParams();
  
  // 当前URL的UTM参数优先级更高
  const completeUTM = { ...savedUTM, ...currentUTM };
  
  console.log('🎯 完整UTM参数:', {
    current: currentUTM,
    saved: savedUTM,
    complete: completeUTM
  });
  
  return completeUTM;
}

// 初始化UTM参数管理（在页面加载时调用）
export function initUTMTracking(): void {
  if (typeof window === 'undefined') return;
  
  // 提取当前URL的UTM参数
  const currentUTM = extractUTMFromURL();
  
  // 如果当前页面有UTM参数，保存它们
  if (Object.keys(currentUTM).length > 0) {
    saveUTMParams(currentUTM);
  }
  
  // 清理过期的UTM参数
  getSavedUTMParams(); // 这个函数会自动清理过期数据
}

// 为链接添加UTM参数（仅在需要时）
export function addUTMToLink(url: string): string {
  // 检查是否需要传递UTM参数
  if (!shouldPreserveUTM()) {
    return url;
  }
  
  const utmParams = getCompleteUTMParams();
  
  if (Object.keys(utmParams).length === 0) {
    return url;
  }
  
  try {
    const urlObj = new URL(url, window.location.origin);
    
    // 只添加UTM参数到特定页面（如联系页面）
    if (urlObj.pathname === '/contact') {
      // 添加UTM参数到URL
      Object.entries(utmParams).forEach(([key, value]) => {
        if (value) {
          urlObj.searchParams.set(key, value);
        }
      });
      
      console.log('🔗 为联系页面添加UTM参数:', utmParams);
      return urlObj.toString();
    }
    
    // 其他页面不添加UTM参数
    return url;
  } catch (error) {
    console.warn('⚠️ 无法为链接添加UTM参数:', error);
    return url;
  }
}

// 判断是否应该保留UTM参数
function shouldPreserveUTM(): boolean {
  if (typeof window === 'undefined') return false;
  
  // 检查当前页面是否有UTM参数
  const currentUTM = extractUTMFromURL();
  const hasCurrentUTM = Object.keys(currentUTM).length > 0;
  
  // 检查是否有保存的UTM参数
  const savedUTM = getSavedUTMParams();
  const hasSavedUTM = Object.keys(savedUTM).length > 0;
  
  // 只有在有UTM参数的会话期间才保留参数
  return hasCurrentUTM || hasSavedUTM;
}

// 强制清除UTM参数（调试用）
export function forceCleanUTMCache(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(UTM_STORAGE_KEY);
    localStorage.removeItem(UTM_EXPIRY_KEY);
    console.log('🧹 强制清除UTM缓存完成');
    
    // 如果在开发环境，提供额外信息
    if (process.env.NODE_ENV === 'development') {
      console.log('💡 提示：请刷新页面以确保清除生效');
    }
  } catch (error) {
    console.warn('⚠️ 无法清除UTM缓存:', error);
  }
}

// React Hook for UTM tracking
export function useUTMTracking() {
  if (typeof window !== 'undefined') {
    // 初始化UTM追踪
    initUTMTracking();
    
    // 开发环境下在控制台提供清除缓存的方法
    if (process.env.NODE_ENV === 'development') {
      (window as any).clearUTMCache = forceCleanUTMCache;
      console.log('🛠️ 开发模式：可在控制台运行 clearUTMCache() 清除UTM缓存');
    }
  }
  
  return {
    getUTMParams: getCompleteUTMParams,
    saveUTMParams,
    clearUTMParams,
    addUTMToLink,
    forceCleanUTMCache
  };
}
