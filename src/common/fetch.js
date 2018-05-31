import axios from 'axios'
import MdbConfig from '@/common/mdb_config.js'
let dateNow = new Date()
const releaseMonthBefore = MdbConfig.releaseMonthBefore
const releaseMonthAfter = MdbConfig.releaseMonthAfter
const nowPlaingMonthAfter = MdbConfig.nowPlaingMonthAfter
const releaseDateMax = `${(dateNow.getMonth() + releaseMonthBefore) < 12 ? dateNow.getFullYear() : (dateNow.getFullYear() + 1)}-${(dateNow.getMonth() + releaseMonthBefore) < 12 ? (dateNow.getMonth() + releaseMonthBefore) : (dateNow.getMonth() - 12 + releaseMonthBefore)}-${dateNow.getDay()}`
const releaseDateMin = `${(dateNow.getMonth() + releaseMonthAfter) > 0 ? dateNow.getFullYear() : (dateNow.getFullYear() - 1)}-${(dateNow.getMonth() + releaseMonthAfter) > 0 ? (dateNow.getMonth() + releaseMonthAfter) : (dateNow.getMonth() + 12 + releaseMonthAfter)}-${dateNow.getDay()}`
const nowPlaingDateMin = `${(dateNow.getMonth() + nowPlaingMonthAfter) > 0 ? dateNow.getFullYear() : (dateNow.getFullYear() - 1)}-${(dateNow.getMonth() + nowPlaingMonthAfter) > 0 ? (dateNow.getMonth() + nowPlaingMonthAfter) : (dateNow.getMonth() + 12 + nowPlaingMonthAfter)}-${dateNow.getDay()}`
const airDate = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDay()}`


export default {
    name: 'Fetch',
    apiKey: MdbConfig.apiKey,
    language: MdbConfig.language,
    region: MdbConfig.region,
    airDate: airDate,
    releaseDateMax: releaseDateMax,
    releaseDateMin: releaseDateMin,
    nowPlaingDateMin: nowPlaingDateMin,

    setGenresList(category) {
        return axios
            .get(`https://api.themoviedb.org/3/genre/${category}/list?api_key=${this.apiKey}&language=${this.language}`)
            .then(data => data.data.genres)
            .catch(error => { console.error(error); return Promise.reject(error) })
    },

    getSearchCollection(page, categoryUrl, searchQuery) {
        return axios
            .get(`https://api.themoviedb.org/3/search/${categoryUrl}?api_key=${this.apiKey}&language=${this.language}&page=${page}&query=${searchQuery}`)
            .then(data => data.data)
            .catch(error => { console.error(error); return Promise.reject(error) })
    },

    getItemCollection(page, categoryUrl, genresSelected) {
        return axios
            .get(`https://api.themoviedb.org/3/${categoryUrl}?api_key=${this.apiKey}&language=${this.language}&page=${page}${genresSelected}`)
            .then(data => data.data)
            .catch(error => { console.error(error); return Promise.reject(error) })
    },

    getMoviesUpcoming(page, genresSelected) {
        return axios
            .get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=${this.language}&page=${page}&sort_by=popularity.desc&release_date.gte=${this.releaseDateMin}&release_date.lte=${this.releaseDateMax}&region=${this.region}${genresSelected}`)
            .then(data => data.data)
            .catch(error => { console.error(error); return Promise.reject(error) })
    },

    getMoviesNowPlaying(page, genresSelected) {
        return axios
            .get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=${this.language}&page=${page}&sort_by=popularity.desc&release_date.gte=${this.nowPlaingDateMin}&release_date.lte=${this.airDate}&region=${this.region}${genresSelected}`)
            .then(data => data.data)
            .catch(error => { console.error(error); return Promise.reject(error) })
    },

    getMoviesPopular(page, genresSelected) {
        return axios
            .get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=${this.language}&page=${page}&sort_by=popularity.desc&region=${this.region}${genresSelected}`)
            .then(data => data.data)
            .catch(error => { console.error(error); return Promise.reject(error) })
    },

    getMoviesTopRated(page, genresSelected) {
        return axios
            .get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=${this.language}&page=${page}&sort_by=vote_average.desc&region=${this.region}${genresSelected}`)
            .then(data => data.data)
            .catch(error => { console.error(error); return Promise.reject(error) })
    },

    getSeriesPopular(page, genresSelected) {
        return axios
            .get(`https://api.themoviedb.org/3/discover/tv?api_key=${this.apiKey}&language=${this.language}&page=${page}&sort_by=popularity.desc${genresSelected}`)
            .then(data => data.data)
            .catch(error => { console.error(error); return Promise.reject(error) })
    },

    getSeriesOnTheAir(page, genresSelected) {
        return axios
            .get(`https://api.themoviedb.org/3/discover/tv?api_key=${this.apiKey}&language=${this.language}&page=${page}&air_date.lte=${this.airDate}${genresSelected}`)
            .then(data => data.data)
            .catch(error => { console.error(error); return Promise.reject(error) })
    },

    getSeriesTopRated(page, genresSelected) {
        return axios
            .get(`https://api.themoviedb.org/3/discover/tv?api_key=${this.apiKey}&language=${this.language}&page=${page}&sort_by=vote_average.desc${genresSelected}`)
            .then(data => data.data)
            .catch(error => { console.error(error); return Promise.reject(error) })
    },

    // getItemPages(id, mediaType, item) {
    //     return axios
    //         .get(`https://api.themoviedb.org/3/${mediaType}/${id}${item}?api_key=${this.apiKey}&language=${this.language}`)
    //         .then(data => data.data)
    //         .catch(error => { console.error(error); return Promise.reject(error) })
    // },
    getItemPages(id, mediaType, item) {
        return axios
            .get(`https://api.themoviedb.org/3/${mediaType}/${id}${item}?api_key=${this.apiKey}&language=${this.language}&append_to_response=videos,images`)
            .then(data => data.data)
            .catch(error => { console.error(error); return Promise.reject(error) })
    },

}