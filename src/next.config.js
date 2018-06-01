
module.exports = {
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
};
