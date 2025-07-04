// src/plugins/vuetify.js
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.green.darken1,     // verde
                secondary: colors.yellow.darken2   // amarelo
            }
        }
    }
})
