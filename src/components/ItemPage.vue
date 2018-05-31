<template>
    <div class="item-container grey darken-4"  
        v-touch="{
        left: () => swipe('Left'),
        right: () => swipe('Right')
        }"
        :style="{ height: $vuetify.breakpoint.smAndUp ? ' 90vh;' : '100vh;' }">
    >
        <v-btn outline class="close-button" flat icon color="grey lighten-1" @click="closeWindow"><v-icon>close</v-icon></v-btn>
 
        <div class="navigate navigate-left hidden-xs-only" v-show="beforeButtonVisible">
            <v-btn large class="navigate__button" flat icon color="white" @click="goBeforePage" @keyup.right="goBeforePage"><v-icon>navigate_before</v-icon></v-btn>
        </div>
        <div class="navigate navigate-right hidden-xs-only" v-show="nextButtonVisible">
            <v-btn large class="navigate__button" flat icon color="white" @click="goNextPage" @keyup.left="goNextPage"><v-icon>navigate_next</v-icon></v-btn>
        </div>


        <v-container class="content" :class="xsmallContent" grid-list-lg v-resize="onResize">
            <v-layout row wrap class="content__top-row" align-start>
                <v-flex class="content__title" justify-center xs12>
                    <span class="content__title-text title">{{title}}</span>
                </v-flex>
                <v-flex class="content__poster-area" xs12 sm6 md4>
                    <img :src="posterImage" :alt="title">
                </v-flex>

                <v-flex class="content__text-area" xs12 sm6 md8>
                    <v-layout class="" wrap>
                        <!-- <v-flex class="content__title hidden-sm-and-down" justify-center xs12>
                            <span class="content__title-text title">{{title}}</span>
                        </v-flex> -->
                        <v-flex class="content__tools-area primary" xs12>
                            <v-layout row wrap class="content__tools-area primary">
                                <v-flex v-if="visibleRateGenre" align-center class="content__rate" xs6 sm8 md3>
                                    <div><span class="content__rate-title subheading">Рейтинг: </span></div>
                                    <div><span class="content__rate-text display-1">&nbsp;&nbsp;{{vote}}</span></div>
                                </v-flex>
                                <v-flex class="content__rate" xs3 sm2 md1>
                                    <v-btn class="content__rate-button" flat icon color="white" v-if="favorite" @click="addFavorite"><v-icon>favorite</v-icon></v-btn>
                                    <v-btn class="content__rate-button" flat icon color="white" v-else @click="addFavorite"><v-icon>favorite_border</v-icon></v-btn>
                                </v-flex>
                                <v-flex class="content__rate" xs3 sm2 md1>
                                    <v-btn class="content__rate-button" flat icon color="white" v-if="bookmarkItem" @click="addBookmark"><v-icon>bookmark</v-icon></v-btn>
                                    <v-btn class="content__rate-button" flat icon color="white" v-else @click="addBookmark"><v-icon>bookmark_border</v-icon></v-btn>
                                </v-flex>
                                <v-flex v-if="visibleRateGenre" align-center class="content__genre" xs12 sm12 md6 offset-md1>
                                    <div class="content__genre-title"><span class="subheading">Жанр: </span></div>
                                    <div class="content__genre-items">
                                        <div v-for="(item, i) in genres" :key="item.id"><span> &nbsp;{{item}}</span><span v-if="i < genres.length - 1">, </span></div>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex class="content__owerviev" xs12>
                            <span class="md-body-2">{{overview}}</span>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex class="content__video-area" xs12 sm12 md12>
                    <scroll-field class="scroll" :videos="currentVideosKey"></scroll-field>
                </v-flex>
                <v-flex class="content__images-area" xs12 sm12 md12 v-if="currentImages !== null && currentImages.length > 0">
                    <image-gallery :fetchingImages="currentImages"></image-gallery>
                </v-flex>
            </v-layout>
        </v-container>

        <!-- <img class="null-image" :src="posterImage" :alt="title"> -->
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import Fetch from '@/common/fetch.js'
import ImageGallery from './Gallery.vue'
import ScrollField from './ScrollField.vue'

export default {
    name: 'ItemPage',
    components: { 
        ImageGallery, 
        ScrollField 
        },
    data: () => ({
        // categoryUrl: '',
        // swipeDirection: null,
        visibleRateGenre: true,
        beforeButtonVisible: true,
        nextButtonVisible: true,
        xsmallContent: '',
        favorite: false,
        bookmarkItem: false,
        posterImage: '',
        itemInit: null,
        itemNumber: null,
        maxItemNumber: null,
        currentItem: null,
        // currentId: null,
        currentDetails: null,
        currentImages: null,
        currentVideosKey: [],
        currentVideos: null,
        currentSimilar: null,
        // currentItems: null,
        title: '',
        date: '',
        year: '',
        overview: '',
        vote: '',
        genreIds: [],
        genres: [],
        nullImage: '',
        stopChangePage: false

    }),
    // beforeMount(){
    //     // this.fetchData(startId);
    //     // let startId = this.$eventHub.current_items[this.$eventHub["current_item_number"]].id
    //     // console.log("THIS ITEM mounted mounted", startId)
    // },
    mounted(){
        this.itemNumber = this.$eventHub["current_item_number"];
        console.log("this.itemNumber", this.itemNumber)
        // let mediaType
        // if (this.$route.path.indexOf("main") !== -1){mediaType = this.$eventHub.current_items[this.$eventHub["current_item_number"]].media_type}
        // if (this.$route.path.indexOf("movies") !== -1){mediaType = "movie"}
        // if (this.$route.path.indexOf("series") !== -1){mediaType = "tv"}
        // if (this.$route.path === "actors"){mediaType = "person"}
        const item = this.$eventHub.current_items[this.$eventHub["current_item_number"]]
        const startId = item.id
        let mediaType = this.checkMediaType(item)
        console.log("THIS ITEM mediaType", mediaType)
        console.log("THIS ITEM startId", startId)

        // this.$eventHub.fetchingItems[this.categoryUrl][startId + '/videos'] = null
        // this.videoInit = this.$eventHub.fetchingItems[this.categoryUrl][startId + '/videos']
        this.fetchData(startId, mediaType)
        this.$eventHub.$on('update-item-page', this.updateItemData);
        this.itemInit = this.$eventHub.current_item_number;
        
        this.fetchCollections();

        // this.currentItems = this.$eventHub["current_items"];
        // console.log("THIS ITEM mounted mounted", this.currentItems)

        // &append_to_response=videos,images,similar
        this.$eventHub.$on('stop-change-item', state => this.stopChangePage = state)

  },
    methods:{

        fetchData(id, mediaType) {
            const dataList = [
                '', 
                // '/images', 
                // '/videos', 
                // '/similar'
            ]

            dataList.forEach(item => {
                const catchResponse = (response) => {
                    // this.$eventHub.fetchingItems[mediaType]["id" + id + item] = response
                    this.$eventHub.fetchingItems[mediaType]["id" + id] = response
                    this.nullImage = item === '' ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.$eventHub.fetchingItems[mediaType]["id" + id].poster_path : this.nullImage
                    if(id === this.$eventHub.current_items[this.$eventHub["current_item_number"]].id){
                        this.updateItemData()
                        
                    } 
                    console.log("FETCH updateItemData()", response)
                }
                // if(!this.$eventHub.fetchingItems[mediaType]["id" + id + item] && !(mediaType === 'person' && item === '/videos')){
                if(!this.$eventHub.fetchingItems[mediaType]["id" + id] && !(mediaType === 'person' && item === '/videos')){    
                    Fetch.getItemPages(id, mediaType, item).then(data => catchResponse(data))
                }
            })
        },
        fetchCollections(){
            const items = this.$eventHub.current_items;
            items.forEach(item => {
                setTimeout(this.fetchData(item.id, this.checkMediaType(item)), 400)
                // console.log("fetchCollections", item.id)
            });
        },
        updateItemData(){
            this.maxItemNumber = this.$eventHub.current_items.length - 1 || 19;
            this.currentItem = this.$eventHub.current_items[this.itemNumber];
            const posterPath = this.currentItem.poster_path || this.currentItem.profile_path || null;
            this.posterImage = posterPath ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + posterPath : require('../assets/img/template.png');
            this.title = this.currentItem.title || this.currentItem.name || '';
            this.date = this.currentItem.release_date || this.currentItem.first_air_date || '';
            this.dateArray = this.date.split("-");
            this.year = this.date !== '' ? this.dateArray[0] : '';
            // this.overview = this.currentItem.overview || this.currentItem.biography || '';
            
            this.vote = this.currentItem.vote_average || '';
            const currentId = this.currentItem.id
            const mediaType = this.checkMediaType(this.currentItem)
            // this.currentDetails = this.$eventHub.fetchingItems[mediaType]["id" + currentId] ? this.$eventHub.fetchingItems[mediaType]["id" + currentId].results : [];
            // this.currentImages = this.$eventHub.fetchingItems[mediaType]["id" + currentId + '/images'] ? this.$eventHub.fetchingItems[mediaType]["id" + currentId + '/images'].results : [];
            // this.currentVideosKey = this.$eventHub.fetchingItems[mediaType]["id" + currentId + '/videos'] ? this.$eventHub.fetchingItems[mediaType]["id" + currentId + '/videos'].results : [];
            if(this.$eventHub.fetchingItems[mediaType]["id" + currentId]){
                this.currentDetails = this.$eventHub.fetchingItems[mediaType]["id" + currentId]
                this.currentVideosKey = this.$eventHub.fetchingItems[mediaType]["id" + currentId].videos.results
                this.currentImages = this.$eventHub.fetchingItems[mediaType]["id" + currentId].images.posters || this.$eventHub.fetchingItems[mediaType]["id" + currentId].images.profiles
                this.overview = this.$eventHub.fetchingItems[mediaType]["id" + currentId].overview || this.$eventHub.fetchingItems[mediaType]["id" + currentId].biography || '';
            }
            
            // this.currentVideosKey = this.$eventHub.fetchingItems[mediaType]["id" + currentId] ? this.$eventHub.fetchingItems[mediaType]["id" + currentId].videos.results : [];
            
            
            // this.currentSimilar = this.$eventHub.fetchingItems[mediaType]["id" + currentId + '/smilar'] ? this.$eventHub.fetchingItems[mediaType]["id" + currentId + '/smilar'].results : [];
            // console.log('video ID',  this.currentVideosKey)
            // console.log('this.currentId',  this.currentId)
            // console.log('this.categoryUrl',  this.categoryUrl)

            this.genreIds = this.currentItem.genre_ids || [];
            this.genres = [];
            if(this.$eventHub.genres_current){
                this.genreIds.forEach(id => {
                    for (let key in this.$eventHub.genres_current) {
                        if(this.$eventHub.genres_current[key].id === id)
                        {this.genres.push(this.$eventHub.genres_current[key].name)}
                    }
                });
            } 
           this.visibleRateGenre = this.$route.path !== "/actors"
        },
        closeWindow(){
            this.$eventHub.$emit('close-window');
        },
        goBeforePage(){
            if (this.itemNumber === 0 && this.$eventHub[this.$route.name  + 'currentPage'] > 1){
                this.$eventHub.$emit('update-page', this.$eventHub[this.$route.name  + 'currentPage'] - 1);
                this.itemNumber = this.maxItemNumber;
            }else{
                this.itemNumber = this.itemNumber > 0 ? this.itemNumber - 1 : this.itemNumber;
                this.updateItemData();
            }
            this.changePageButtons();
        },
        goNextPage(){
            console.log('NextPage', this.$eventHub[this.$route.name + 'currentPage'], this.$eventHub[this.$route.name  + 'total'])
            if (this.itemNumber === 19 && this.$eventHub[this.$route.name + 'currentPage'] < this.$eventHub[this.$route.name  + 'total']){
                this.$eventHub.$emit('update-page', this.$eventHub[this.$route.name  + 'currentPage'] + 1);
                this.itemNumber = 0;
                
            }else{
                this.itemNumber = this.itemNumber < this.maxItemNumber ? this.itemNumber + 1 : this.itemNumber;
                this.updateItemData();
            } 
            this.changePageButtons();
        },
        addFavorite(){
            this.favorite = !this.favorite;
        },
        addBookmark(){
            this.bookmarkItem = !this.bookmarkItem;
        },
        changePageButtons(){
            this.beforeButtonVisible = this.itemNumber > 0 || this.$eventHub[this.$route.name + 'currentPage'] > 1 ? true : false;
            this.nextButtonVisible = this.itemNumber < this.maxItemNumber || this.itemNumber === 19 ? true : false;
        },
        checkMediaType(item){
            // console.log('MEDIATYPE', item.media_type)
            let mediaType = ''
            if (this.$route.name === "search"){mediaType = item.media_type}
            if (this.$route.path.indexOf("movies") !== -1){mediaType = "movie"}
            if (this.$route.path.indexOf("series") !== -1){mediaType = "tv"}
            if (this.$route.path === "/actors"){mediaType = "person"}
            console.log('MEDIATYPE', mediaType)
            return mediaType
        },
        swipe (direction) {
            // this.swipeDirection = direction
            if(direction === 'Left' && !this.stopChangePage){this.goNextPage()}
            if(direction === 'Right' && !this.stopChangePage){this.goBeforePage()}
            console.log('swipe', direction)
        },
        onResize () {
            this.xsmallContent = window.innerWidth < 600 ? 'content--xsmall' : ''
        }
    },
    watch: {
        itemInit(val){
            this.itemNumber = this.$eventHub["current_item_number"];
            this.updateItemData();
            this.changePageButtons();
            // console.log('itemInit(val)')
        },
        // videoInit(){
        //     this.updateItemData()
        //     console.log('video ID watch',  this.$eventHub.fetchingItems[this.categoryUrl][this.currentId + '/videos'])
        // }
    },
    // beforeUpdate(){
    //     console.log("UPDATED")
    // }
}


</script>

<style lang="scss" scoped>
.item-container {
    position: relative;
    // height: 90vh;
    overflow: hidden;
    .close-button{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 300;
    }
    .navigate{
        display: flex;
        position: absolute;
        height: 90vh;
        width: 60px;
        &__button{
            align-self: center;
            z-index: 200;
            i{
                color: gray;
                font-size: 36px;
            }
        }
    }
    .navigate:hover .navigate__button{
        i{
            color: white;
        }
    }
    
    .navigate-left{
        left: 0;
    }
    .navigate-right{
       right: 0;
    }
    .content{
        padding: 20px 80px 20px 62px;
        margin: 0 -18px 0 0;
        flex-wrap: wrap;
        overflow-y: scroll;
        overflow-x: hidden;
        width: calc(100% + 18px);
        max-width: calc(100% + 18px);
        height: 85vh;
        align-content: flex-start;

        &__text-area{
            padding-left: 16px !important;
        }
        &__top-row{
            width: 100%;
        }
        &__poster-area{
            img{
              box-shadow: 0px 20px 40px 10px rgba(0, 0, 0, 0.541);  
            } 
        }
        &__title {
            display: flex;
            margin-bottom: 30px;
            align-content: center;
            justify-content: center;
            // span{
            //     line-height: 3;
            // } 
        }
        &__tools-area{
            margin-bottom: 30px;
            margin-top: 8px;
            // background-color: #7b1fa2;
        }
        &__rate{
            display: flex;
        }
        &__rate-text{
            color: #69F0AE;
        }
        &__genre{
            display: flex;
            // justify-content: flex-end;
        }
        &__genre-title{
            // margin-left: 20px;
            color: #69F0AE;
        }
        &__genre-items{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-left: 6px;
            span{
                text-align: center;
            }
        }
        // &__genre-item{
        //     display: flex;
        // }
        &__owerviev{
            margin-top: 20px;
            text-align: justify;
            text-indent: 20px;
            margin-left: -8px;
            margin-right: -8px;
        }
        &__video-area{
            padding-top: 30px;
        }
        &__images-area{
            height: 100%;
            z-index: 500;
        }
    }
    .content--xsmall{
        padding: 20px 40px 20px 22px;
    }

}
.scroll{
    margin-top: 40px;
    width: 100%;
}
// .null-image{
//     position: absolute;
//     bottom: 0;
//     width: 0;
//     height: 0;
// }

</style>



