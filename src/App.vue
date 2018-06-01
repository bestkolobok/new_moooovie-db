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
    <!-- <v-container fluid fill-height grid-list-lg justify-space-between> -->
      <!-- <div v-bar class="content-conteiner"> -->
      <!-- <div class="content-conteiner">  -->
        <v-content class="content-conteiner__inside" id="scroll-target"> 
          <router-view class="router-conteiner" v-scroll:#scroll-target="onScroll"></router-view>
        </v-content>
      <!-- </div> -->
      
    <!-- </v-container> -->
    <!-- <v-dialog v-model="dialog" width="800px" :fullscreen="$vuetify.breakpoint.xsOnly">
    </v-dialog> -->
    <app-footer class="footer"></app-footer>
  </v-app>
</template>

<script>
// import Fetch from '@/common/fetch.js'
import AppHeader from '@/components/Header.vue'
// import AppContent from '@/components/Content.vue'
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
      // offsetTop: 0,
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
  /* html{
    overflow: hidden;
  } */
  a {
    text-decoration: none!important;
  }
</style>

<style lang="scss" scoped>
.draver-left {
  top: -50px;
}
// #inspire{
//   width: 100vw;
//   overflow-x: hidden;
// }

// .toolbar{
//   .toolbar-title{
//     .toolbar-title__text{
//       cursor: pointer;
//     }
//   }
// }

// .content-conteiner{
//   height: 100vh;
//   width: 100vw;
//   margin: 0 -16px 0 0;
//   overflow-x: hidden;
//   .router-conteiner{
//     width: 1100px;
//   }
// }
// .vb > .vb-dragger {
//     z-index: 1;
//     width: 12px;
//     right: 14px;
//     border: 0;
// }

// .vb > .vb-dragger > .vb-dragger-styler {
//     // -webkit-backface-visibility: hidden;
//     backface-visibility: hidden;
//     // -webkit-transform: rotate3d(0,0,0,0);
//     transform: rotate3d(0,0,0,0);
//     // -webkit-transition:
//     //     background-color 100ms ease-out,
//     //     margin 100ms ease-out,
//     //     height 100ms ease-out;
//     transition:
//         background-color 100ms ease-out,
//         margin 100ms ease-out,
//         height 100ms ease-out;
//     background-color: rgba(255, 255, 255, 0.301);
//     margin: 5px 5px 5px 0;
//     border-radius: 20px;
//     height: calc(100% - 10px);
//     display: block;
// }

// .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
//     background-color: #7b1fa2;
// }

// .vb > .vb-dragger:hover > .vb-dragger-styler {
//     background-color: rgba(105, 240, 175, 0.644);
//     margin: 0px;
//     height: 100%;
// }

// .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
//     background-color: #7b1fa271;
//     margin: 0px;
//     height: 100%;
// }

// .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
//     background-color: rgba(105, 240, 175, 1);
// }

</style>
