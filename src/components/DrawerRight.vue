<template>
    <v-list dense>
        <template v-for="(item, id) in pages"  v-if="item.visible">

          <v-list-group class="genre-select" :key="id" v-model="item.model" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{item.title}}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile  @click="onClearList" ripple v-show="item.clearVisible" :data-link="item.subText.link">
              <v-list-tile-title >
                {{item.subText.name}}
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile class="genre-select__element genres-child-elem1" v-for="(child, i) in item.children" :key="i" 
              :data-id="child.id"
              :data-link="child.link"
              :class="child.class"
              ripple 
              @click="onMarkList"
            >
              <v-list-tile-title >
                {{ child.name }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list-group>

          <!-- <v-list-tile v-else :key="item.text" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile> -->
        </template>
    </v-list>
</template>

<script>

export default {
  name: 'DrawerRight',
  data(){
    return{
      pages: [
        // { icon: 'people', text: 'Актеры', link: '/actors' },
        { icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down', text: 'Категории фильмов', model: false,
          title: 'Выбор жанра', subText: {name: 'ВСЕ ЖАНРЫ'}, visible: true, clearVisible: false,
          children: []
        },
        { icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down', text: 'Категории фильмов', model: false,
          title: 'Выбор категории', subText: {name: 'ВСЕ КАТЕГОРИИ', link: '/movies'}, visible: false, clearVisible: false,
          children: [
            { name: 'Премьеры', link: '/movies/upcoming', class: 'movies-child-elem1' },
            { name: 'Сейчас на экранах', link: '/movies/nowPlaying', class: 'movies-child-elem1' },
            { name: 'Популярные', link: '/movies/Popular', class: 'movies-child-elem1' },
            { name: 'Топ 100', link: '/movies/topRated', class: 'movies-child-elem1' }
          ]
        },
        { icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down', text: 'Категории фильмов', model: false,
          title: 'Выбор категории', subText: {name: 'ВСЕ КАТЕГОРИИ', link: '/series'}, visible: false, clearVisible: false,
          children: [
            { name: 'Популярные', link: '/series/popular', class: 'tv-child-elem1'},
            { name: 'Сейчас на экранах', link: '/series/onTheAir', class: 'tv-child-elem1' },
            { name: 'Топ 100', link: '/series/topRated', class: 'tv-child-elem1' }
          ]
        },
        // { icon: 'bookmark', text: 'Закладки', link: '/' },
        // { icon: 'history', text: 'История просмотра', link: '/' },
        // { icon: 'search', text: 'История поиска', link: '/' },
        // { icon: 'account_circle', text: 'Вход в аккаунт', link: '/' },
      ],
      closeGenresArea: false,
      genreActive: '',
      genresToolbarVisible: false,
      allGenresVisible: false,
      genresName: [],
      selectedGenres: [],
      genresSelectElement: null,
      childGenres: this.$eventHub.genres_current
    }
  },
  methods: {
    genreListSet(e){
      const currentId = e.currentTarget.firstChild.dataset.id
      if(this.selectedGenres.indexOf(currentId) === -1){
        this.selectedGenres.push(currentId)
      }else{
        const deleteId = this.selectedGenres.indexOf(currentId)
        this.selectedGenres.splice(deleteId, 1)
      }
      this.genreListMark()
      // console.log('genreListSet(e)', this.selectedGenres)
      this.$eventHub.$emit('change-genre-drawer', this.selectedGenres)
    },
    genreListMark(){
      const child = document.querySelector(".genres-child-elem1")
      if(child !== null){
        const elementsGroup = Array.from(child.parentNode.children)
        // console.log('elementsGroup', elementsGroup)
        elementsGroup.forEach(elem => { 
          const id = elem.firstChild.dataset.id
          
          if(elem.classList.contains('success')){elem.classList.remove('success')}
          if(this.selectedGenres.indexOf(id) !== -1){elem.classList.add('success')} 
        })
      }
      
      this.pages[0].clearVisible = this.selectedGenres.length > 0 
    },
    genreListRemove(){
      this.selectedGenres = []
      this.genreListMark()
      this.$eventHub.$emit('genres-list-remove')
      console.log('genreListRemove()')
    },
    changeGenreHeader(selectedGenres){
      this.selectedGenres = selectedGenres
      this.genreListMark()
      this.pages.forEach(item => {item.model ? item.model = false : ''})
    },
    categoryItemsSet(e) {
      const elements = Array.from(e.currentTarget.parentNode.children)
      elements.forEach(element => { element.classList.remove('success') })
      if(e.currentTarget.firstChild.dataset.link !== "/movies" && e.currentTarget.firstChild.dataset.link !== "/series"){e.currentTarget.classList.add('success')}
      // this.changeCategory(e.currentTarget.firstChild.dataset.path)
      // console.log(e.currentTarget.firstChild.dataset.path)
      // console.log('categoryItemsSet(e)')
    },
    categoryItemsMark() {
      let child = null
      if(this.pages[1].visible){child = document.querySelector(".movies-child-elem1")}
      if(this.pages[2].visible){child = document.querySelector(".tv-child-elem1")}
      if(child !== null){
        // console.log('child', child)
        const elementsGroup = Array.from(child.parentNode.children)
        elementsGroup.forEach(elem => { 
          const path = elem.firstChild.dataset.link
          if(elem.classList.contains('success')){elem.classList.remove('success')}
          if(this.$route.path === path){elem.classList.add('success')}
        })
      }
    },
    onMarkList(e){
      if(e.currentTarget.firstChild.dataset.link){
        this.$router.push(e.currentTarget.firstChild.dataset.link)
        // this.categoryItemsSet(e)
        this.categoryItemsMark()
      }else{this.genreListSet(e)}
    },
    onClearList(e){
      if(e.currentTarget.firstChild.dataset.link){
        this.$router.push(e.currentTarget.firstChild.dataset.link)
        // this.categoryItemsSet(e)
        this.categoryItemsMark()
      }else{this.genreListRemove()}
    },
    watchRoutes(to,from){
      const route = this.$route.name
      this.pages[1].visible = this.$route.path.indexOf("movies") !== -1
      this.pages[2].visible = this.$route.path.indexOf("series") !== -1
      this.pages[0].visible = this.$route.path.indexOf("series") !== -1 || this.$route.path.indexOf("movies") !== -1

      if (route === 'moviesUpcoming' || route === 'moviesNowPlaying' || route === 'moviesPopular' || route === 'moviesTopRated'){this.pages[1].clearVisible = true} else {this.pages[1].clearVisible = false}
      if (route === 'seriesPopular' || route === 'seriesOnTheAir' || route === 'seriesTopRated'){this.pages[2].clearVisible = true} else {this.pages[2].clearVisible = false}
    },
  },
  mounted(){
    this.$eventHub.$on('change-genre-header', this.changeGenreHeader)
    this.$eventHub.$on('update-genre', genre => this.pages[0].children = genre)
    this.$eventHub.$on('update-category', this.categoryItemsMark)
    this.watchRoutes()
  },
  watch: {
    '$route' (to, from) { 
      this.watchRoutes(to,from)
    }
  }
}

// this.$eventHub.selectedGenres_current
</script>

<style lang="scss" scoped>

</style>