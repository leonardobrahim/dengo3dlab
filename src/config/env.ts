/**
 * Environment configuration with fallbacks for Dengo3dLab
 */
const metaEnv = (typeof import.meta !== 'undefined' && (import.meta as any).env) || {};

export const ENV = {
  USE_MOCK_API: metaEnv.VITE_USE_MOCK_API === 'false' ? false : true,
  API_BASE_URL: metaEnv.VITE_API_BASE_URL || 'http://localhost:3000/api',
  MOCK_DELAY_MS: 300,
  APP_NAME: metaEnv.VITE_APP_NAME || 'Dengo3dLab',
  BRAND_NAME: 'Dengo 3D Estúdio Criativo',
  APP_VERSION: '1.0.0-dengo-candy',
  IS_PRODUCTION: metaEnv.PROD || false,
  IS_DEVELOPMENT: metaEnv.DEV || true,
};
