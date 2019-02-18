module.exports = {
    publicPath: "/",

    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/assets/scss/_reset.scss";
                    @import "@/assets/scss/_variables.scss";
                    @import "@/assets/scss/_template.scss";
                `
            }
        }
    },

    pluginOptions: {
      moment: {
        locales: [
          'en'
        ]
      }
    }
}
