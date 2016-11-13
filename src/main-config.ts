requirejs.config({
  baseUrl: '/scripts',
  paths: {
    'react': '/node_modules/react/dist/react',
    'react-dom': '/node_modules/react-dom/dist/react-dom',
    'redux': '/node_modules/redux/dist/redux',
    'react-redux': '/node_modules/react-redux/dist/react-redux',
    'redux-actions': '/node_modules/redux-actions/dist/redux-actions',
    'axios': '/node_modules/axios/dist/axios'
  }
});

require(['main']);
