<template>
  <v-app id="inspire" dark v-scroll="onScroll">
    <v-navigation-drawer v-model="drawerLeft" app 
      :clipped="$vuetify.breakpoint.lgAndUp"
      width="250" 
      class="draver-left"
      :style="{top: '-' + onScrollStyle + 'px'}"
    >
      <drawer-left></drawer-left>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawerRight" app right disable-resize-watcher>
      <drawer-right></drawer-right>
    </v-navigation-drawer>

    <app-header></app-header>
      <v-content class="content-conteiner__inside" id="scroll-target"> 
        <router-view class="router-conteiner" v-scroll:#scroll-target="onScroll"></router-view>
      </v-content>
    <app-footer class="footer"></app-footer>
  </v-app>
</template>

<script>
import AppHeader from '@/components/Header.vue'
import AppFooter from '@/components/Footer.vue'
import DrawerLeft from '@/components/DrawerLeft.vue'
import DrawerRight from '@/components/DrawerRight.vue'
export default {
  name: 'App',
  components: { AppHeader, AppFooter, DrawerLeft, DrawerRight },
  data () {
    return {
      dialog: false,
      drawerLeft: false,
      drawerRight: false,
      onScrollStyle: 0,
      onScrollOffsetOld: 0,
    }
  },
  mounted() {
    this.$eventHub.$on('toggle-drawer-left', () => this.drawerLeft = !this.drawerLeft)
    this.$eventHub.$on('toggle-drawer-right', () => this.drawerRight = !this.drawerRight)
    this.$eventHub.searchQueryCollection = []
    this.$eventHub.fetchingItems = {
      main: {},
      movie: {},
      tv: {},
      person: {}
    }
    this.$eventHub.favorites = []
    this.$eventHub.bookmarks = []
    this.$eventHub.viewed = []
  },
  methods:{
    onScroll (e) {
        const offsetTop = window.pageYOffset || document.documentElement.scrollTop
        if(offsetTop > this.onScrollOffsetOld + 50){
          this.onScrollStyle = 50
          this.$eventHub.$emit('scroll-header', 50)
        }else 
        if(offsetTop < this.onScrollOffsetOld - 50){
          this.onScrollStyle = 0
          this.$eventHub.$emit('scroll-header', 0)
        }
        setTimeout(()=>this.onScrollOffsetOld = offsetTop, 300)
    }
  }
}
</script>

<style>
  a {
    text-decoration: none!important;
  }
</style>

<style lang="scss" scoped>
.draver-left {
  top: -50px;
}
</style>
