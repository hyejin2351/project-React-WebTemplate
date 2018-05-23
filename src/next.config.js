
module.exports = {
  exportPathMap: function exportPathMap() {
    return {
      '/': { page: '/' },
      '/news': { page: '/' },
      '/login': { page: '/login' },
      '/user': { page: '/user' },

      //     '/p/975': { page: '/post', query: { id: '975' } },
      //     '/p/481': { page: '/post', query: { id: '481' } },
    };
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
