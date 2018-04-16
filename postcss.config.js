module.exports = (webpack) => ({
  plugins: [
    require('postcss-import')({addDependencyTo: webpack}),
    require('postcss-url'),
    require('postcss-cssnext')({
      browsers: ['last 3 versions']
    }),
    require('cssnano')({autoprefixer: false}),
    require('postcss-browser-reporter')
  ]
});
