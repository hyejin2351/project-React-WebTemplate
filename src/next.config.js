const { PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = (phase, {defaultConfig}) => {
  // console.log(phase + '>>>', defaultConfig);
  if (phase === PHASE_PRODUCTION_BUILD) {
    defaultConfig.distDir = '../../build/app/client/.next';
  }

  return {
    ...defaultConfig,
    exportPathMap: function exportPathMap() {
      return {
        '/': { page: '/' },
        '/users/profile': { page: '/users/profile' },
        '/users/create-account': { page: '/users/create-account' },
        '/users/signin': { page: '/users/signin' },
      };
    },
    serverRuntimeConfig: { // Will only be available on the server side
      mySecret: 'secret'
    },
    publicRuntimeConfig: { // Will be available on both server and client
      staticFolder: '/static'
    },

    // webpack: (config, { dev }) => {
    //   // Perform customizations to webpack config
    //   if (!dev) {
    //     config.module.rules.push({
    //       test: /\.(css|ico|gif)$/,
    //       use: [
    //         {
    //           loader: 'file-loader',
    //           options: {
    //             outputPath: 'static/',
    //           },
    //         },
    //       ],
    //     });
    //   }

    //   // Important: return the modified config
    //   return config;
    // },
  }
};
