const path = require('path')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/')
]

const adminPassphrase = process.env.ADMIN_PASSPHRASE;

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  define: {
    "process.env": {
      ADMIN_PASSPHRASE: adminPassphrase,
    },
  },
  env: {
      "development": {
        "extraBabelPlugins": [
          "dva-hmr",
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": true }],
        ]
      },
      "production": {
        "extraBabelPlugins": [
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": true}]
        ]
      }
  }
}
