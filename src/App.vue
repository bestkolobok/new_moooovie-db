<template>
    <v-app id="inspire">
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
      <drawer-left></drawer-left>
    </v-navigation-drawer>

    <app-header></app-header>

    <v-content> 
      <app-content></app-content>
    </v-content>

    <v-dialog v-model="dialog" width="800px" :fullscreen="$vuetify.breakpoint.xsOnly">
    </v-dialog>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Fetch from '@/common/fetch.js'
import AppHeader from '@/components/Header.vue'
import AppContent from '@/components/Content.vue'
import AppFooter from '@/components/Footer.vue'
import DrawerLeft from '@/components/DrawerLeft.vue'
export default {
  name: 'App',
  components: { AppHeader, AppContent, AppFooter, DrawerLeft },
  data () {
    return {
      dialog: false,
      drawer: false,
    }
  },
  mounted() {
    this.$eventHub.$on('toggle-drawer', () => this.drawer = !this.drawer)
  }
}
</script>

<style lang="scss" >
.toolbar{
  .toolbar-title{
    .toolbar-title__text{
      cursor: pointer;
    }
  }
}

</style>
