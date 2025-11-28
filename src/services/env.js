export const getEnvConfig = () => {
  let firebaseConfig = {};
  let appId = 'default-app-id';
  let authToken = null;

  try {
    const viteConfigStr = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_FIREBASE_CONFIG : null;
    if (viteConfigStr) {
      firebaseConfig = JSON.parse(viteConfigStr);
      appId = import.meta.env.VITE_APP_ID || 'default-app-id';
      authToken = import.meta.env.VITE_AUTH_TOKEN;
      return { firebaseConfig, appId, authToken };
    }
  } catch (error) {
    console.warn('Vite config loading skipped:', error);
  }

  try {
    if (typeof __firebase_config !== 'undefined' && __firebase_config) {
      firebaseConfig = JSON.parse(__firebase_config);
    }
    if (typeof __app_id !== 'undefined') {
      appId = __app_id;
    }
    if (typeof __initial_auth_token !== 'undefined') {
      authToken = __initial_auth_token;
    }
  } catch (error) {
    console.error('Canvas config parsing failed:', error);
  }

  return { firebaseConfig, appId, authToken };
};
