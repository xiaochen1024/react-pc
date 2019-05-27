const {
  override,
  fixBabelImports,
  addLessLoader,
  addBabelPlugins,
  addDecoratorsLegacy,
  addWebpackAlias,
  addPostcssPlugins,
  useBabelRc,
  addBundleVisualizer,
  overrideDevServer,
  watchAll
} = require("customize-cra");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

const disableProductSource = () => config => {
  config.devtool =
    config.mode === "development" ? "cheap-module-source-map" : false;
  return config;
};

const devServerConfig = () => config => {
  const url = "https://www.baidu.com/";
  return {
    ...config,
    proxy: {
      "/api": {
        target: url, //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  };
};

module.exports = {
  webpack: override(
    process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
    disableProductSource(),
    useBabelRc(),
    addPostcssPlugins([require("autoprefixer")()]),
    addDecoratorsLegacy(),
    ...addBabelPlugins([
      "@babel/plugin-proposal-optional-chaining",
      { loose: true }
    ]),

    addWebpackAlias({
      "@": resolve("src"),
      pages: resolve("src/pages"),
      components: resolve("src/components"),
      images: resolve("src/images"),
      utils: resolve("src/utils"),
      stores: resolve("src/stores"),
      common: resolve("src/common"),
      constants: resolve("src/constants")
    }),
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true
    }),
    addLessLoader({
      javascriptEnabled: true,
      // modifyVars: { "@primary-color": "#1DA57A" },
      localIdentName: "[local]--[hash:base64:5]"
    })
  ),
  devServer: overrideDevServer(devServerConfig(), watchAll())
};
