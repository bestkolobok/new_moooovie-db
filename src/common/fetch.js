import axios from 'axios'
import MdbConfig from '@/common/mdb_config.js'
let dateNow = new Date()
const releaseMonthBefore = MdbConfig.releaseMonthBefore
const releaseMonthAfter = MdbConfig.releaseMonthAfter
const releaseDateMax = `${(dateNow.getMonth() + releaseMonthBefore) < 12 ? dateNow.getFullYear() : (dateNow.getFullYear() + 1)}-${(dateNow.getMonth() + releaseMonthBefore) < 12 ? (dateNow.getMonth() + releaseMonthBefore) : (dateNow.getMonth() + releaseMonthAfter)}-${dateNow.getDay()}`
const releaseDateMin = `${(dateNow.getMonth() + releaseMonthAfter) > 0 ? dateNow.getFullYear() : (dateNow.getFullYear() - 1)}-${(dateNow.getMonth() + releaseMonthAfter) > 0 ? (dateNow.getMonth() + releaseMonthAfter) : (dateNow.getMonth() + releaseMonthBefore)}-${dateNow.getDay()}`
const airDate = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDay()}`


export default {
    name: 'Fetch',
    apiKey: MdbConfig.apiKey,
    language: MdbConfig.language,
    airDate: airDate,
    releaseDateMax: releaseDateMax,
    releaseDateMin: releaseDateMin,

    route() {
        return this.$route.path
    },

    setGenresList(category, item) {
        if (typeof this.$root.eventHub['genres_' + item] !== 'undefined') {
            this.genres = this.$root.eventHub['genres_' + item]
        } else { this.genres = [] }

        if (typeof this.$root.eventHub[this.$route.name + 'list' + item] !== 'undefined') {
            this.genresName = this.$root.eventHub[this.$route.name + 'list' + item]
        } else {
            axios
                .get(`https://api.themoviedb.org/3/genre/${category}/list?api_key=${this.apiKey}&language=${this.language}`)
                .then(data => {
                    this.genresName = Object.assign({}, data.data.genres);
                    this.$root.eventHub[this.$route.name + 'list' + item]
                        // console.log("LIST", list)         
                })
                .catch(function(error) { console.log(error) })
        }
        // this.$root.eventHub.genres_current = this.genresName
    },



}