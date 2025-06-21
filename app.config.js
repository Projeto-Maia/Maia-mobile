import 'dotenv/config'; // Carrega as variáveis do arquivo .env

export default {
  expo: {
    name: 'Maia',
    slug: 'Maia',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/ic_launcher.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/logo_plum.png',
      resizeMode: 'contain',
      backgroundColor: '#FEF9FA'
    },
    plugins: ['expo-font'],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#F5C6D6'
      },
      package: 'com.artmdx.Maia',
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_Maps_API_KEY
        }
      }
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      eas: {
        projectId: 'd5e63318-eeca-4cf3-97c8-18ca4fbc4ab9'
      }
    }
  }
};
