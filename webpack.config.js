const HtmlWebpackPlugin=require('html-webpack-plugin')

module.exports={
    entry:'./src/main.js',
    plugins:[
        new HtmlWebpackPlugin({
            template:'src/index.html',
            favicon:'src/images/android-chrome-192x192.png'
        })
    ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader', 
          { 
            loader: 'css-loader', 
            options: { 
              modules: true 
            } 
          },
        ],
      },
    ]
}
}