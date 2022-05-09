export default {
  install: (app) => {
    app.config.globalProperties.$load = async (action, errorHandler) => {
      try {
        await action();
      } catch(error) {
        if (errorHandler) {
          errorHandler();
        } else {
          console.log(error);
        }
      }
    };
  }
}