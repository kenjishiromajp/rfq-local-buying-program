// Use the hidden-source-map option when you don't want the source maps to be
// publicly available on the servers, only to the error reporting

// Following configuration provided by vercel example
// https://github.com/vercel/next.js/blob/canary/examples/with-sentry/next.config.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPlugins = require( 'next-compose-plugins' );
const withPWA = require('next-pwa');
const withTM = require( 'next-transpile-modules' )( ['react-hook-form'] );

const withSourceMaps = require( '@zeit/next-source-maps' )();
const DuplicatePackageCheckerPlugin = require( 'duplicate-package-checker-webpack-plugin' );
const path = require( 'path' );
const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );

const basePath = '';

module.exports = withPlugins( [withTM, withSourceMaps, withPWA], {
  future: {
    webpack5: true,
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    runtimeCaching: [
      {
        // MUST be the same as "start_url" in manifest.json
        urlPattern: '/',
        // use NetworkFirst or NetworkOnly if you redirect un-authenticated user to login page
        // use StaleWhileRevalidate if you want to prompt user to reload when new version available
        handler: 'NetworkFirst',
        options: {
          // don't change cache name
          cacheName: 'start-url',
          expiration: {
            maxEntries: 1,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts',
          expiration: {
            maxEntries: 4,
            maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
          }
        }
      },
      {
        urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-font-assets',
          expiration: {
            maxEntries: 4,
            maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
          }
        }
      },
      {
        urlPattern: /\/imgs\/.*\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-image-assets',
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
      },
      {
        urlPattern: /\.(?:js)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-js-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
      },
      {
        urlPattern: /\.(?:css|less)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-style-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
      },
      {
        urlPattern: /\.(?:json|xml|csv)$/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'static-data-assets',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60 // 24 hours
          }
        }
      },
      {
        urlPattern: /\/api\/.*$/i,
        handler: 'NetworkOnly',
      },
      {
        urlPattern: /.*/i,
        handler: 'NetworkOnly'
      }
    ]
  },
  serverRuntimeConfig: {
    rootDir: __dirname,
  },
  webpack: (config) => {
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin( {
          analyzerMode: 'static',
          analyzerPort: 8888,
          openAnalyzer: true,
        } )
      );
    }

    config.plugins.push( new DuplicatePackageCheckerPlugin() );
    // Resolving duplicate packages
    [
      'strip-ansi',
      '@babel/runtime',
      'react',
    ].forEach((packageName) => {
      // eslint-disable-next-line no-param-reassign
      config.resolve.alias[packageName] = path.resolve(
        __dirname,
        'node_modules',
        packageName
      );
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config
  },

  "rules": {
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"]
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  basePath,
} )
