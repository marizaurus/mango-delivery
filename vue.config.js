module.exports = {
  publicPath: '/mango-delivery/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/assets/styles/index.scss';`,
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    }
  }
};