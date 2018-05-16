// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueYoutube from 'vue-youtube'
import MdbConfig from './common/mdb_config'
import 'vuetify/dist/vuetify.min.css'
// import Vuetify from 'vuetify'
import {
    Vuetify,
    VApp,
    VAvatar,
    VBtn,
    VBtnToggle,
    VBottomSheet,
    VCard,
    VCarousel,
    VDatePicker,
    VDialog,
    VDivider,
    VFooter,
    VForm,
    VIcon,
    VGrid,
    VList,
    VMenu,
    VNavigationDrawer,
    VParallax,
    VPagination,
    VSwitch,
    VTabs,
    VToolbar,
    VTooltip,
    VTextField,
    transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
    components: {
        VApp,
        VAvatar,
        VBtn,
        VBtnToggle,
        VBottomSheet,
        VCard,
        VCarousel,
        VDatePicker,
        VDialog,
        VDivider,
        VFooter,
        VForm,
        VIcon,
        VGrid,
        VList,
        VMenu,
        VNavigationDrawer,
        VParallax,
        VPagination,
        VSwitch,
        VTabs,
        VToolbar,
        VTooltip,
        VTextField,
        transitions
    },
    theme: {
        primary: '#7b1fa2',
        secondary: '#BA68C8',
        accent: '#00E676',
        error: '#FF5252',
        info: '#E1BEE7',
        success: '#E1BEE7',
        warning: '#FFC107'
    }
})

// Vue.use(Vuetify)
Vue.use(VueYoutube)

Vue.config.productionTip = false

Vue.prototype.$eventHub = new Vue()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    data: {
        MdbConfig: MdbConfig
    }
})