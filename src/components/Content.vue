<template>
  <div id="search-container">
      <div >
      <!-- <md-button class="md-fab close-button" @click="itemPageVisible = !itemPageVisible" :v-show="itemPageVisible">
        <md-icon>close</md-icon>
      </md-button> -->

      <!-- <v-dialog v-model="itemPageVisible" class="item-page-area md-scrollbar" width="800px" :fullscreen="$vuetify.breakpoint.xsOnly">
        <item-page></item-page>
      </v-dialog> -->
    </div>
      
    <!-- <v-container grid-list-md text-xs-center> -->
      <v-layout row wrap>
        <v-flex xs12 sm6 md3 v-for="(item, i) in movieItems" :key="item.id">
          <film-card :item="item" :keyItem="i"> </film-card>
        </v-flex>
      </v-layout>
    <!-- </v-container> -->
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import Fetch from '@/common/fetch.js'
import FilmCard from '@/components/FilmCard.vue'
// import ItemPage from '@/components/ItemPage.vue'

export default {
  name: 'Content',
  components: { 
    FilmCard,
    Fetch, 
    // ItemPage 
  },
  // props: ['searchData'],
  data () {
    return {
      movieItems: null,
      language: "ru-RUS",
      region: "UA",
      apiKey: "8e2cc7ff01fa51e26900ce7e019c1293",
      searchUrl: '',
      oldSearchData: '',
      oldRouteName: '',
      // searchQuery: '',
      sortQuery: '',
      airDate:'',
      releaseDateMax: '',
      releaseDateMin: '',
      genresSelected:'',
      genreSetString: '',
      genresMovies: '',
      genresSeries: '',
      categoryUrl: '',
      searchPage: 1,
      routeName: this.$route.name,
      itemPageVisible: false,
      watchCurrentItem: null
    }
  },
  mounted () {
    // this.watchCurrentItem = this.movieItems;
    this.$eventHub.$on('close-window', this.closeItemPage);
    this.$eventHub.$on('go-to-item', this.openItemPage);
    this.$eventHub.$on('genre-select', this.genresSelectCategory);
    this.$eventHub.$on('start-search', this.getSearch);
    this.getCategory(1, this.$route);
    this.$eventHub.$on('change-page', this.changePage);

    // let dateNow = new Date();
    // this.releaseDateMax = `${(dateNow.getMonth() + 9) < 12 ? dateNow.getFullYear() : (dateNow.getFullYear() + 1)}-${(dateNow.getMonth() + 9) < 12 ? (dateNow.getMonth() + 9) : (dateNow.getMonth() -3)}-${dateNow.getDay()}`;
    // this.releaseDateMin = `${(dateNow.getMonth() - 3) > 0 ? dateNow.getFullYear() : (dateNow.getFullYear() - 1)}-${(dateNow.getMonth() - 3) > 0 ? (dateNow.getMonth() - 3) : (dateNow.getMonth() + 9)}-${dateNow.getDay()}`;
    // this.airDate = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDay()}`;
  },
  
  methods: {
    // getSearch(searchData){
    //   this.searchQuery = `&query=${searchData}`;

    //   if (this.$route.name === "searchMovies"){this.categoryUrl = "search/movie"} else 
    //   if (this.$route.name === "searchSeries"){this.categoryUrl = "search/tv"} else
    //   if (this.$route.name === "searchActors"){this.categoryUrl = "search/person"} else
    //   {this.categoryUrl = "search/multi"}
      
    //   if(searchData !== null){ 
    //     this.$eventHub[this.$route.name + 'currentPage'] = 1;  
    //     this.fetchData(true) 
    //   }else{
    //     this.$eventHub[this.$route.name + 'currentPage'] = 1;  
    //     this.fetchData(false) 
    //   }
    // },
    setPages(totalPages, currentPage){
      this.$eventHub.$emit('set-total-pages', totalPages)
      this.$eventHub.$emit('update-fetch-page', currentPage)
    },

    getSearch(changePage, inputData){
      const page = changePage !== null ? changePage : 1

      if(inputData !== null || changePage !== null){
        const searchData = inputData || this.oldSearchData
        const queryId = this.$eventHub.searchQueryCollection.indexOf(searchData)
        console.log("queryId", queryId)
        const catchResponse = (searchResponse) => {
          console.log("FETCH search", searchResponse)
          this.$eventHub[this.$route.name + page + 'query_' + searchDataLength] = searchResponse
          this.movieItems = searchResponse.results
          this.setPages(searchResponse.total_pages, searchResponse.page)
        } 
        
        // if (this.oldSearchData !== searchData){this.$eventHub[this.$route.name + 'currentPage'] = 1}
        const page = this.$eventHub[this.$route.name + 'currentPage']
        if(queryId !== -1 && this.$eventHub[this.$route.name + page + 'query_' + queryId]){
          console.log("catchResponse", this.$eventHub[this.$route.name + page + 'query_' + queryId])
          catchResponse(this.$eventHub[this.$route.name + page + 'query_' + queryId])
        }else
        {
          this.oldSearchData = searchData
          this.$eventHub.searchQueryCollection.push(searchData)
          var searchDataLength = this.$eventHub.searchQueryCollection.length - 1
          console.log("FETCH push(searchData)", this.$eventHub.searchQueryCollection)
          if (this.$route.name === "searchMovies"){Fetch.getSearchCollection(page, "movie", searchData).then(data => catchResponse(data))} else 
          if (this.$route.name === "searchSeries"){Fetch.getSearchCollection(page, "tv", searchData).then(data => catchResponse(data))} else
          if (this.$route.name === "searchActors"){Fetch.getSearchCollection(page, "person", searchData).then(data => catchResponse(data))} else
          {Fetch.getSearchCollection(page, "multi", searchData).then(data => catchResponse(data))}
          
        }
        
      }
    },

    // getCategory(){
    //   if (this.$route.name.indexOf("movies") !== -1){this.categoryUrl = "discover/movie"}
    //   if (this.$route.name.indexOf("series") !== -1){this.categoryUrl = "discover/tv"}
    //   if (this.$route.name === "actors"){this.categoryUrl = "person/popular"}
    //   if(this.$route.name === "moviesUpcoming"){this.sortQuery = `&sort_by=popularity.desc&release_date.gte=${this.releaseDateMin}&release_date.lte=${this.releaseDateMax}&region=${this.region}`}
    //   if(this.$route.name === "moviesNowPlaying"){this.sortQuery = `&sort_by=popularity.desc&region=${this.region}`}
    //   if(this.$route.name === "moviesTopRated"){this.sortQuery = `&sort_by=vote_average.desc&region=${this.region}`}
    //   if(this.$route.name === "seriesPopular"){this.sortQuery = "&sort_by=popularity.desc"}
    //   if(this.$route.name === "seriesOnTheAir"){this.sortQuery = `&air_date.lte=${this.airDate}`}
    //   if(this.$route.name === "seriesTopRated"){this.sortQuery = `&sort_by=vote_average.desc`}

    //   this.fetchData()
    // },
    
    getCategory(changePage, route){
      const page = changePage !== null ? changePage : 1
      const catchResponse = (response) => {
        console.log("FETCH category", response)
        this.$eventHub[route.name + page + 'genre' + this.genreSetString] = response
        this.movieItems = response.results
        this.setPages(response.total_pages, response.page)
      }
      // if (this.oldRouteName !== route.name){this.$eventHub[route.name + 'currentPage'] = 1}
      if(typeof this.$eventHub[route.name + page + 'genre' + this.genreSetString] !== 'undefined'){
         catchResponse(this.$eventHub[route.name + page + 'genre' + this.genreSetString])
        // this.setState(this.movieItems, totalPages, currentPage, this.genreSetString)
      } else { 
        console.log("FETCH else", page)
        if (route.name === "movies"){Fetch.getItemCollection(page, "discover/movie", this.genreSetString).then(data => catchResponse(data))}
        if (route.name === "series"){Fetch.getItemCollection(page, "discover/tv", this.genreSetString).then(data => catchResponse(data))}
        if (route.name === "actors"){Fetch.getItemCollection(page, "person/popular", this.genreSetString).then(data => catchResponse(data))}
        if (route.name === "moviesUpcoming"){Fetch.getMoviesUpcoming(page, this.genreSetString).then(data => catchResponse(data))}
        if (route.name === "moviesNowPlaying"){Fetch.getMoviesNowPlaying(page, this.genreSetString).then(data => catchResponse(data))}
        if (route.name === "moviesTopRated"){Fetch.getMoviesTopRated(page, this.genreSetString).then(data => catchResponse(data))}
        if (route.name === "seriesPopular"){Fetch.getSeriesPopular(page, this.genreSetString).then(data => catchResponse(data))}
        if (route.name === "seriesOnTheAir"){Fetch.getSeriesOnTheAir(page, this.genreSetString).then(data => catchResponse(data))}
        if (route.name === "seriesTopRated"){Fetch.getSeriesTopRated(page, this.genreSetString).then(data => catchResponse(data))}
      }
    },


    // fetchData(pass) {
    //   const fetchPage = this.$eventHub[this.$route.name + 'currentPage'] || 1;
    //   let currentPage = fetchPage;
    //   let totalPages = null;
    //   if(typeof this.$eventHub[this.$route.name + fetchPage + 'genre' + this.genreSetString] !== 'undefined' && !pass){
    //     this.movieItems = this.$eventHub[this.$route.name + fetchPage + 'genre' + this.genreSetString];
    //     this.setState(this.movieItems, totalPages, currentPage, this.genreSetString);
    //   } else {
    //     axios
    //     .get(`https://api.themoviedb.org/3/${this.categoryUrl}?api_key=${this.apiKey}&language=${this.language}&page=${fetchPage}${this.searchQuery}${this.sortQuery}${this.genresSelected}`)
    //     .then(data => {
    //       const getData = Object.assign({}, data.data);
    //       this.movieItems = getData.results;
    //       this.setState(this.movieItems, getData.total_pages, getData.page, this.genreSetString);
    //       this.currentPage = getData.page;
    //       this.totalPages = getData.total_pages;
    //       // if(this.movieItems){this.$eventHub.$emit('clear-input');}
    //       console.log("FETCH", data)         
    //     })
    //     .catch(function (error) { console.log(error) })
    //   }
    //   // this.setState(this.movieItems, totalPages, currentPage, this.genreSetString);
    //   this.$eventHub.$emit('set-total-pages', totalPages)   
    // },
    // setState(result, totalPages, page, genre){
    //   console.log('TotalPages', totalPages)
    //   this.$eventHub[this.$route.name + page + 'genre' + genre] = result;
    //   this.$eventHub[this.$route.name + 'total'] = totalPages || this.$eventHub[this.$route.name + 'total'];
    //   this.$eventHub[this.$route.name + 'currentPage'] = page || this.$eventHub[this.$route.name + 'currentPage'];
    //   this.$eventHub[this.$route.name + 'current_genre'] = genre;
    // },
    changePage(page){
      if(this.$route.path.indexOf("search") !== -1){this.getSearch(page, null)}else{this.getCategory(page, this.$route)}
      // this.searchPage = page;
      // this.fetchData();
    },
    genresSelectCategory(data, item){
      this.genreSetString = data.join('_');
      // if(item === "movie"){
      //   this.genresMovies = data.join(',')
      // }
      // if(item === "tv"){
      //   this.genresSeries = data.join(',')
      // }

      this.genresSelected = '&with_genres=' + data.join(',')
      this.getCategory(null, this.$route)
    },
    openItemPage(){
      // this.cuttentItem = item;
      this.itemPageVisible = true;
      // this.$eventHub["current_items"] = this.movieItems;
    },
    closeItemPage(){
      this.itemPageVisible = false;
    }
  },
  watch: {
    '$route' (to, from) { 
      if(to.path.indexOf("search") === -1){this.getCategory(null, to)}
       
      // if (to.name.indexOf("movies") !== -1 && this.genresMovies !== ''){this.genresSelected = '&with_genres=' + this.genresMovies}
      // if (to.name.indexOf("series") !== -1 && this.genresSeries !== ''){this.genresSelected = '&with_genres=' + this.genresSeries}
      },
    movieItems(val){
      this.$eventHub["current_items"] = this.movieItems;
      if(this.itemPageVisible){this.$eventHub.$emit('update-item-page');}
    }
  }
}
</script>

<style lang="scss" scoped>
// .md-layout{
//   // position: static;
  
//   .md-layout-item {

//     margin-top: 8px;
//     margin-bottom: 8px;
//     transition: 1s $md-transition-stand-timing;
//   }
// }

.item-page-area{
  max-width: 110vw;
  max-height: 90vh;

  .item-page{
    width: 100%;
  }
}

    .close-button{
      position: absolute;
      right: 0px;
      top: 0px;
    }
  
</style>