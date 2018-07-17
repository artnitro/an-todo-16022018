/**
 * Webpack config.
 */

const 
  path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CompressionPlugin = require('compression-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

let paths = {
  app: path.join(__dirname, './src/app.ts'),
  build: path.join(__dirname, 'dist')
};

module.exports = function(env){

  let 
    isProduction = env.production === true,
    environment = '',
    fileName = '',
    sourceMap = '';

  (isProduction) ? (
    process.env.NODE_ENV = 'production',
    environment = 'production',
    fileName = 'src/[name].[chunkhash].js',
    sourceMap = 'source-map'
  ) : ( 
    process.env.NODE_ENV = 'development',
    environment = 'development',
    fileName = 'src/[name].js',
    sourceMap = 'cheap-source-map'
  );
  
  return config = {
    mode: environment,
    parallelism: 4,
    entry: {
      polyfills: path.join(__dirname,'./src/polyfills.ts'),
      index: paths.app,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    },
    output: {
      path: paths.build,
      pathinfo: false,
      chunkFilename: fileName,
      filename: fileName
    },
    devtool: sourceMap,
    watchOptions: {
      ignored: [
        /node_modules/,
        /fonts/,
        /img/,
        /favicon.ico/
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: [
        { 
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          loader: '@ngtools/webpack' 
        },
        {
          test: /\.html$/, 
          loader: 'raw-loader' 
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
				  use: [
					  {
						  loader: 'file-loader',
						  options: {
							  name: '[name].[ext]',
							  outputPath: 'img/'
						  }
					  }
				  ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
        	use: [
        		{
        			loader: 'file-loader',
        			options: {
        				name: '/css/[name].[ext]'
        			}
        		}
        	]
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
          	  {
           		  loader: 'css-loader',
           		  options: { minimize: true }
           	  }, 
           	  { loader: 'sass-loader' }
            ],
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'an_ENVIRONMENT': JSON.stringify(process.env.NODE_ENV)
      }),
      new ExtractTextPlugin({
        filename: 'css/styles.css',
        allChunks: true
      }),
      new HtmlWebpackPlugin({
        template: '!!raw-loader!templates/index/index.html',
        inject: 'body',
        minify: false,
      // favicon: './public/favicon.ico'
      }),
      new CompressionPlugin({
        // With this setup, all values, by default. It is compressed 
        // all files. Server is sending the pre-compressed files, 
        // don't compress them, by server's configuration.
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new AngularCompilerPlugin({
        tsConfigPath: './tsconfig.json',
        entryModule: path.join(__dirname, './src/app.module#AppModule')
      }),
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, '/img'), 
          to: path.join(__dirname, 'dist/img')
        }
      ]),
      new BundleAnalyzerPlugin ({
        analyzerMode: 'static',
        generateStatsFile: true,
        openAnalyzer: true
      }),
      new CleanWebpackPlugin([
        'dist/src/*.*'
      ]), 
    ]
  }

};
