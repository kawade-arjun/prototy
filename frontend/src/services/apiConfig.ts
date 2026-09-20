/**
 * Centralized API base URL helper for production (Render) and local dev environments.
 */
export const getApiBaseUrl = (fallbackPort: number = 8000): string => {
  const envUrl = (import.meta as any).env?.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    // Remove trailing slash if present
    return envUrl.replace(/\/+$/, '');
  }

  // Only use localhost fallback when browser is actually running on localhost
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `http://${hostname}:${fallbackPort}`;
    }
  }

  // In production (Render) with no VITE_API_URL set, use relative root path
  return '';
};
