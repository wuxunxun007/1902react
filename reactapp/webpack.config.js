const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  // entry: './src/index.js', // String
  entry: { // Object
    app: './src/index.js'
  },
  output: {
    filename: '[name].js', // 最终会打包成为 app.js app为entry选项的key值
    path: __dirname + '/dist' // 最终会在当前文件夹下创建一个dist的目录，下面有app.js
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(), // 压缩js
    new HtmlWebpackPlugin({ // 复制index.html文件到dist目录，并且自动引入app.js
      template: 'index.html'
    })
  ],
  module: { // 各种解析器-- 解析css文件，解析less文件，解析scss文件，解析媒体类型文件，字体图标文件.....
    rules: [ // 各种解析器的配置规则
      {
        test: /\.css$/, // 所有以css结尾的文件
        loader: 'style-loader!css-loader' // 从右到左解析，先用css-loader将css文件转换为样式表文件，然后再通过style-loader将样式表文件渲染到页面中
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader' 
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader' 
      },
      {
        test: /\.stylus$/,
        loader: 'style-loader!css-loader!stylus-loader' 
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 图片的大小，如果背景图片无法显示，需要调整大小，大小约为不到10M
          name: path.posix.join('static','img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 媒体文件的大小
          name: path.posix.join('static', 'media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 字体文件的大小
          name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  devServer: { // 服务器的配置
    proxy: { // 代理服务器的配置
      '/api': {
        target: 'https://m.9ji.com',   //代理接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''    //代理的路径
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.css', '.less', '.stylus', '.scss'], // 说明引入的文件可以省略的后缀名 --- 缺省的后缀名,如果遇到前缀相同，后缀不同的文件，以第一个出现的为准
    alias: { // 别名的设置    src的文件目录设置为@
      '@': path.join(__dirname, './', 'src')
    }
  }
}