module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import '@/assets/styles/styles.scss';`,
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
      fullInstall: true
    }
  }
};
