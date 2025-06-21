import 'dotenv/config';

export default {
  expo: {
    name: 'Maia',
    slug: 'Maia',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/ic_launcher.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    owner: 'artmdx',
    plugins: ['expo-font'],
    splash: {
      image: './assets/logo_plum.png',
      resizeMode: 'contain',
      backgroundColor: '#FCD1D3'
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptative-icon.png',
        backgroundColor: '#FCD1D3'
      },
      edgeToEdgeEnabled: true,
      package: 'com.artmdx.Maia',
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_Maps_API_KEY
        }
      }
    },
    web: {
      favicon: './assets/favicon_plum.png'
    },
    extra: {
      eas: {
        projectId: 'd5e63318-eeca-4cf3-97c8-18ca4fbc4ab9'
      }
    }
  }
};
