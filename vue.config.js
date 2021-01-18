// module.exports = {
//   configureWebpack: {
//     resolve: {
//       alias: {
//         'assets': '@/assets',
//         'common': '@/common',
//         'components': '@/components',
//         'network': '@/network',
//         'view': '@/view',
//       }
//     }
//   }
// }

//const BundleTracker = require("webpack-bundle-tracker");
module.exports = {
  publicPath: "./",  //基本路径
  outputDir: "./dist/", //打包时的输出目录
  assetsDir: "static",  //放置静态资源的目录
  indexPath: "index.html", //html的输出路径

  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'view': '@/view',
      }
    }
  },
}
//   chainWebpack: (config) => {
//     config
//         .plugin("BundleTracker")
//         .use(BundleTracker, [{ filename: "./webpack-stats.json" }]);
//
//     config.output.filename("bundle.js");
//
//     config.optimization.splitChunks(false);
//
//     config.resolve.alias.set("__STATIC__", "static");
//
//     config.devServer
//         // the first 3 lines of the following code have been added to the configuration
//         .public("http://0.0.0.0:8080/")
//         .host("127.0.0.1")
//         .port(8080)
//         .hotOnly(true)
//         .watchOptions({ poll: 1000 })
//         .https(false)
//         .disableHostCheck(true)
//         .headers({ "Access-Control-Allow-Origin": ["*"] });
//   }
// };
