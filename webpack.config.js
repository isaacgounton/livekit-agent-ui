import Dotenv from 'dotenv-webpack';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  mode: 'production',
  entry: './components/embed-popup/standalone-bundle-root.tsx', // Input file
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: (pathData) => {
      return pathData.chunk.name === 'livekit'
        ? '[name].js'
        : pathData.chunk.name === 'vendors'
          ? '[name].js'
          : 'embed-popup.js';
    },
    globalObject: 'typeof window !== "undefined" ? window : this',
  },
  devtool: 'source-map', // Equivalent to sourcemap: true
  optimization: {
    minimize: true, // Enable minification now that variable conflicts are resolved
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        livekit: {
          test: /[\\/]node_modules[\\/]livekit-client[\\/]/,
          name: 'livekit',
          chunks: 'all',
          priority: 20,
        },
      },
    },
  },
  resolve: {
    alias: { '@/*': path.resolve(__dirname, '*') },
    extensions: ['.tsx', '.ts', '.js'], // Resolve TypeScript and JS files
  },
  plugins: [
    // NOTE: the below doesn't whitelist, see https://github.com/mrsteele/dotenv-webpack/issues/41
    new Dotenv({
      systemvars: true,
      path: '.env.local',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.webpack.json',
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              exportType: 'string',
            },
          },
          'postcss-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    // Mark LiveKitEmbedFixed as an external global (optional depending on usage)
    LiveKitEmbedFixed: 'LiveKitEmbedFixed',
  },
};

export default config;
