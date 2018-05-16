<template>
    <v-footer height="auto" class="primary">
        <v-layout row justify-center>
            <div class="text-xs-center">
                <v-pagination :length="maxLength" v-model="currentPage" :total-visible="7" circle color="accent"></v-pagination>
            </div>
        </v-layout>
    </v-footer>

  <!-- <div>
    <md-toolbar class="md-primary" md-elevation="1">
      <div class="md-search-button">
        <md-button :to="searchPath" v-show="storyButtonVisible">Вы искали</md-button>
      </div>
      <div class="md-page-buttons" v-show="pagesButtonVisible">
        <md-button class="md-icon-button" @click="changePage('first')" v-show="firstButtonVisible">
          <md-icon>first_page</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="changePage('prev')" v-show="prevButtonVisible">
          <md-icon>chevron_left</md-icon>
        </md-button>
        <span class="md-title">{{currentPage}}</span>
        <md-button class="md-icon-button" @click="changePage('next')" v-show="nextButtonVisible">
          <md-icon >chevron_right</md-icon>
        </md-button>
      </div>
    </md-toolbar>
  </div> -->
</template>

<script>

export default {
  name: 'Footer',
  data: () => ({
    searchPath: '',
    storyButtonVisible: false,
    pagesButtonVisible: true,
    firstButtonVisible: true,
    prevButtonVisible: true,
    nextButtonVisible: true,
    currentPage: 1,
    maxLength: 15
  }),
//   methods: {
//     changePage(state){
//       // const genre = this.$root.eventHub[this.$route.name + 'current_genre'];
//       let stateCurrentPage = this.$root.eventHub[this.$route.name  + 'current'] || 1;
//       const stateTotalPages = this.$root.eventHub[this.$route.name  + 'total'] || 1;
//       if(state === "next"){
//         stateCurrentPage = stateCurrentPage < stateTotalPages ? stateCurrentPage + 1 : stateCurrentPage;
//       }
//       if(state === "prev"){
//         stateCurrentPage = stateCurrentPage > 1 ? stateCurrentPage - 1 : stateCurrentPage;
//       }
//       if(state === "first"){
//         stateCurrentPage = 1
//       }
//       // if(state === "last"){
//       //   this.currentPage = this.$root.eventHub[this.$route.name + 'total'] 
//       // }
//       this.$root.eventHub[this.$route.name + 'current'] = stateCurrentPage;
//       this.$root.eventHub.$emit('change-page');
//       this.currentPage = this.$root.eventHub[this.$route.name + 'current'];
//       // console.log('stateCurrentPage', stateCurrentPage)
//       // console.log('stateTotalPages', stateTotalPages)
//     },
//     searchStateData(data){
//       let item
//       for(let key in this.$root.eventHub){
//         if(key.indexOf(data) !== -1){item = true}
//       }
//       return item
//     }
//   },
//   watch: {
//     '$route' (to, from) {
//       this.searchPath = `/${to.name}/search`
//       if(to.name.indexOf("series") !== -1){this.searchPath = `/series/search`} else
//       if(to.name.indexOf("movies") !== -1){this.searchPath = `/movies/search`} else
//       if(to.name.indexOf("actors") !== -1){this.searchPath = `/actors/search`} else
//       {this.searchPath = `/main/search`}

//       if(
//         to.name.indexOf("series") !== -1 && this.searchStateData('searchSeries1') ||
//         to.name.indexOf("movies") !== -1 && this.searchStateData('searchMovies1') ||
//         to.name.indexOf("actors") !== -1 && this.searchStateData('searchActors1') ||
//         to.name === "main" && this.$root.eventHub.search1
//         ){this.storyButtonVisible = true} else {this.storyButtonVisible = false}

//       if(to.name === "main"){this.pagesButtonVisible = false} else {this.pagesButtonVisible = true}

//       this.currentPage = this.$root.eventHub[to.name + 'current'] || 1
//       // console.log("ROUTE_NAME", to.name) 
//     },
//     '$root'(eventHub){
//       // console.log("ROOOOOOT CHANGE", eventHub)
//     }
//   },
//   mounted(){
//     // this.$root.eventHub.$on('update-page', page => this.currentPage = page);
//     this.$root.eventHub.$on('update-page', this.changePage);
//     this.$root.eventHub.$on('page-reset', this.changePage);
//     this.currentPage = this.$root.eventHub[this.$route.name + 'current'] || 1;
//     if(this.$route.name === "main"){this.pagesButtonVisible = false} else {this.pagesButtonVisible = true}
    
//   },
//   updated(){
//     // console.log("beforeUpdate")
//     // this.currentPage = this.$root.eventHub[this.$route.name + 'current'];
//     this.currentPage = this.$root.eventHub[this.$route.name + 'current'] || 1;

//     this.firstButtonVisible = this.currentPage > 2 ? true : false;
//     this.prevButtonVisible = this.currentPage > 1 ? true : false;
//     // this.nextButtonVisible = this.currentPage < this.$root.eventHub[this.$route.name + 'total'] ? true : false;
//     // console.log(this.$root.eventHub[this.$route.name + 'total'])
//     // console.log('this.$root', this.$root)
//   }
  
}
</script>

<style lang="scss" scoped>

// .md-toolbar{
//   .md-search-button {
//     position: absolute;
//     left: 20px;
//   }
//   .md-page-buttons {
//     display: flex;
//     margin: auto;
//     align-content: center;
//     span {
//       line-height: 100%;
//       margin: auto;
//     }
//   }
// }
</style>