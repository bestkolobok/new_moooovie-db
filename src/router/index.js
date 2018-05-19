import Vue from 'vue'
import Router from 'vue-router'

import Content from '@/components/Content'
// import Main from '@/components/Main'
// import Movies from '@/components/Movies'
// import Series from '@/components/Series'



Vue.use(Router)

export default new Router({
    routes: [
        // { path: '/', name: 'main', component: Main },
        { path: '/movies', name: 'movies', component: Content },
        { path: '/series', name: 'series', component: Content },
        { path: '/actors', name: 'actors', component: Content },
        { path: '/movies/upcoming', name: 'moviesUpcoming', component: Content },
        { path: '/movies/nowPlaying', name: 'moviesNowPlaying', component: Content },
        { path: '/movies/topRated', name: 'moviesTopRated', component: Content },
        { path: '/series/popular', name: 'seriesPopular', component: Content },
        { path: '/series/onTheAir', name: 'seriesOnTheAir', component: Content },
        { path: '/series/topRated', name: 'seriesTopRated', component: Content },
        { path: '/main/search', name: 'search', component: Content },
        { path: '/movies/search', name: 'searchMovies', component: Content },
        { path: '/series/search', name: 'searchSeries', component: Content },
        { path: '/actors/search', name: 'searchActors', component: Content }
    ]
})