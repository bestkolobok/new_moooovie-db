<template>
    <v-toolbar :clipped-left="$vuetify.breakpoint.mdAndUp" class="primary toolbar" dark app scroll-off-screen :scroll-threshold="50" dense prominent extended>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3 toolbar-title">
            <v-toolbar-side-icon @click.stop="drawerToggle"></v-toolbar-side-icon>
            <span class="hidden-sm-and-down toolbar-title__text">MooovieLand</span>
        </v-toolbar-title>

            

        <v-spacer></v-spacer>
        <v-text-field 
            flat solo-inverted 
            prepend-icon="search" 
            label="Search" 
            class="hidden-sm-and-down"
            v-model="inputData" 
            @keyup.enter="onSearch"
        ></v-text-field>
        
        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>

        <!-- <v-btn icon large>
            <v-avatar size="32px" tile>
            <img src="https://vuetifyjs.com/static/doc-images/logo.svg" alt="Vuetify">
            </v-avatar>
        </v-btn> -->
        <v-tabs
            slot="extension"
            v-model="currentItem"
            fixed-tabs
            color="transparent"
            slider-color="white"
        >
            <v-tab
                v-for="item in mediaTypeItems"
                :key="item.id"
                :href="'#tab-' + item"
                :to="item.path"
                >
                {{ item.name }}
            </v-tab>
            <v-spacer></v-spacer>
            <v-menu
                class="tabs__div"
                :close-on-content-click="false"
                origin="center center"
                transition="scale-transition"
                bottom
                >
                <span class="tabs__item" slot="activator" dark>
                    Жанр
                </span>
                <v-list>
                    <v-list-tile v-for="(item, i) in genresName" :key="i" :data-id="item.id" @click="genreListMark">
                        <v-list-tile-title >{{ item.name }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu> 
            <v-menu
                class="tabs__div"
                origin="center center"
                transition="scale-transition"
                bottom
                >
                <span class="tabs__item" slot="activator" dark>
                    Категория
                </span>
                <v-list v-if="visibleMovieCategory">
                    <v-list-tile v-for="(item, i) in categoryItems" :key="i" :data-path="item.moviePath" @click="categoryItemsMark">
                        <v-list-tile-title >{{ item.categoryMovie }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
                <v-list v-if="visibleTvCategory">
                    <v-list-tile v-for="(item, i) in categoryItems" :key="i" :data-path="item.tvPath" @click="categoryItemsMark">
                        <v-list-tile-title >{{ item.categoryTv }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu> 
        </v-tabs>
    </v-toolbar>
    
</template>

<script>
import _ from 'lodash'
import Fetch from '@/common/fetch.js'
export default {
    name: 'Header',
    components: { Fetch },
    data(){
        return{
            visibleMovieCategory: false,
            visibleTvCategory: false,
            toolbarVisible: true,
            genresToolbarVisible: false,
            titleSize:'',
            drawer: false,
            genresName: [],
            genresSelectElement: null,
            selectedGenres: [],
            categorySelected: '',
            inputData: null,
            searchLabel: '',
            routeName: null,
            routeNameOld: null,
            mediaTypeItems: [
                {name: "Фильмы", path: "/movies"}, 
                {name: "Сериалы", path: "/series"},
                {name: "актеры", path: "/actors"}
            ],
            categoryItems: [
                { categoryMovie: 'Все фильмы', categoryTv: 'Все сериалы', moviePath: "/movies", tvPath: "/series"},
                { categoryMovie: 'Премьеры', categoryTv: 'Популярные', moviePath: "/movies/upcoming", tvPath: "/series/popular" },
                { categoryMovie: 'Популярные', categoryTv: 'Сейчас на экранах', moviePath: "/movies/nowPlaying", tvPath: "/series/onTheAir" },
                { categoryMovie: 'Топ 100', categoryTv: 'Топ 100', moviePath: "/movies/topRated", tvPath: "/series/topRated" }
            ],
            currentItem: null,

        }
    },
    methods: {
        drawerToggle () {
            this.$eventHub.$emit('toggle-drawer')
        },
        genreListMark(e) {
            e.currentTarget.classList.toggle('success')
            if(e.currentTarget.classList.contains('success')){
                this.selectedGenres.push(e.currentTarget.firstChild.dataset.id)
            }else{
                const deleteId = this.selectedGenres.indexOf(e.currentTarget.firstChild.dataset.id)
                this.selectedGenres.splice(deleteId, 1)
            }
            this.changeGenre(this.selectedGenres)
            this.genresSelectElement = Array.from(e.currentTarget.parentNode.children)
        },
        genreListRemove() {
            if(this.genresSelectElement){this.genresSelectElement.forEach(element => { element.classList.remove('success') })}
            this.selectedGenres = []
        },
        categoryItemsMark(e) {
            const elements = Array.from(e.currentTarget.parentNode.children)
            elements.forEach(element => { element.classList.remove('success') })
            if(e.currentTarget.firstChild.dataset.path !== "/movies" && e.currentTarget.firstChild.dataset.path !== "/series"){e.currentTarget.classList.add('success')}
            this.changeCategory(e.currentTarget.firstChild.dataset.path)
            console.log(e.currentTarget.firstChild.dataset.path)
        },

        clearInput: _.debounce(function(){this.inputData = null}, 8000, { 'leading': false }),

        onSearch($event){
            if (this.$route.name.indexOf("movies") !== -1){this.$router.push('/movies/search')} else
            if (this.$route.name.indexOf("series") !== -1){this.$router.push('/series/search')} else
            if (this.$route.name.indexOf("actors") !== -1){this.$router.push('/actors/search')} else
            {this.$router.push(`/main/search`)}
            
            window.setTimeout(()=>{
                this.$eventHub.$emit('start-search', null, this.inputData);
            }, 0)
        },
        changeCategory(category){
            this.$router.push(category);
        },
        setGenresList(mediaCategory, type){
            this.genresName = []
            this.genreListRemove()

            if (typeof this.$eventHub[this.$route.name + 'list' + type] !== 'undefined') {
                this.genresName = this.$eventHub[this.$route.name + 'list' + type]
            } else {
                this.genresName = Fetch.setGenresList(mediaCategory)
                console.log('Fetch', this.genresName)
            }
        },
        changeGenre(id){
            if (this.$route.name.indexOf("movies") !== -1){
                this.$eventHub.$emit('genre-select', id, "movie")
                // this.$eventHub['selectedGenres_movies'] = this.selectedGenres;
            }else
            if (this.$route.name.indexOf("series") !== -1){
                this.$eventHub.$emit('genre-select', id, "tv")
                // this.$eventHub['selectedGenres_series'] = this.selectedGenres;
            }
            // if(this.routeName === this.routeNameOld){
                this.$eventHub.$emit('page-reset', 1);
            // }
            this.routeName = this.routeNameOld;
            // this.showCloseButton();
        },
        watchRoutes(to,from){
            if (to.name === "main"){ this.toolbarVisible = false; this.titleSize = "md-display-2";} 
            else {this.toolbarVisible = true; this.titleSize = "md-title";}

            if (to.name.indexOf("movies") !== -1){this.visibleMovieCategory = true; this.setGenresList('movie', 'movies')}else{this.visibleMovieCategory = false}
            if (to.name.indexOf("series") !== -1){this.visibleTvCategory = true; this.setGenresList('tv', 'series')}else{this.visibleTvCategory = false}
            if (to.name.indexOf("movies") !== -1 || to.name.indexOf("series") !== -1){this.genresToolbarVisible = true}else{this.genresToolbarVisible = false}
            if (to.name === "movies" || to.name === "series"){this.categorySelected = ''}

            this.searchLabel = to.name.indexOf("movies") !== -1 ? 'фильмов' : to.name.indexOf("series") !== -1 ? 'сериалов' : to.name.indexOf("actors") !== -1 ? 'актеров' : 'по сайту';
        }
    },
    watch: {
        '$route' (to, from) { 
            this.routeNameOld = from.name;
            this.routeName = to.name;
            this.watchRoutes(to,from)
        },
        genresName(){
            this.$eventHub.genres_current = this.genresName
        },
        inputData(){
            if(this.inputData){
                this.onSearchDebounse();
                this.clearInput();
            }
        }
    },
    created(){
        this.onSearchDebounse = _.debounce(this.onSearch, 1000)
        // this.clearInput = _.debounce(()=>{this.inputData = null}, 3000);
    },
    mounted(){
        const to = this.$route
        this.watchRoutes(to)
    }
}
</script>

<style lang="scss" scoped>
    .list{
        &__tile{
         
        }
        &__tile__title{
            
        }
    }

</style>