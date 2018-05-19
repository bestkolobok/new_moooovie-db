<template>
    <div class="item-container" @keyup.right="goBeforePage">
        <md-button class="md-icon-button md-accent close-button md-elevation-1" @click="closeWindow">
          <md-icon>close</md-icon>
        </md-button>
        <div class="navigate navigate-left" @click="goBeforePage" v-show="beforeButtonVisible">
            <md-icon>navigate_before</md-icon>
            <div class="navigate_empty"></div>
        </div>
        <div class="navigate navigate-right" @click="goNextPage" @keyup.left="goNextPage" v-show="nextButtonVisible">
            <div class="navigate_empty"></div>
            <md-icon>navigate_next</md-icon>
        </div>


        <md-content class="md-scrollbar content">
            <div class="content__top-row md-layout md-gutter md-alignment-top-center">
                <div class="content__poster-area md-layout-item md-large-size-33 md-medium-size-33 md-small-size-33 md-xsmall-size-100">
                    <img :src="posterImage" :alt="title">
                </div>
                <div class="content__text-area md-layout-item md-large-size-66 md-medium-size-66 md-small-size-66 md-xsmall-size-100">
                    <div class="content__title">
                        <span class="md-title">{{title}}</span>
                    </div>
                    <div class="content__rate-bar md-layout md-gutter md-alignment-center-space-around">
                        <div class="content__rate md-layout-item md-size-33">
                            <span class="md-subheading">Рейтинг {{vote}}</span>
                        </div> 
                        <div class="content__rate md-layout-item md-size-20">
                            <md-button class="md-icon-button" v-if="favorite" @click="addFavorite"><md-icon>favorite</md-icon></md-button>
                            <md-button class="md-icon-button" v-else @click="addFavorite"><md-icon>favorite_border</md-icon></md-button>
                        </div> 
                        <div class="content__rate md-layout-item md-size-20">
                            <md-button class="md-icon-button" v-if="bookmarkItem" @click="addBookmark"><md-icon>bookmark</md-icon></md-button>
                            <md-button class="md-icon-button" v-else @click="addBookmark"><md-icon>bookmark_border</md-icon></md-button>
                        </div>   
                    </div>
                    <div class="content__ganre md-layout md-gutter md-alignment-center-left">
                        <div class="content__genre-title md-layout-item md-size-10">
                            <span class="md-subheading">Жанр: </span>
                        </div> 
                        <div class="content__genre-item-layout-item md-size-90" v-for="item in genres" :key="item.id">
                            <span class="md-body-2">&nbsp; &nbsp;{{item}}</span>
                        </div> 
                        
                    </div>
                    <div class="content__owerviev">
                        <span class="md-body-2">{{overview}}</span>
                    </div>
                </div>
            </div>
            <div class="content__video-row md-layout md-gutter md-alignment-top-center">
                <div class="content__video-area md-layout-item md-size-100">
                    <!-- <div class="content__video-conteiner" v-for="item in movieItems" :key="item.id">
                        <img src="" alt="">
                    </div>  -->
                </div>
            </div>
            <!-- <video-gallery></video-gallery> -->
            <scroll-field class="scroll" :videos="currentVideosKey"></scroll-field>
        </md-content>
        <img class="null-image" :src="posterImage" :alt="title">
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import VideoGallery from './Gallery.vue'
import ScrollField from './ScrollField.vue'

export default {
    name: 'ItemPage',
    components: { VideoGallery, ScrollField },
    data: () => ({
        language: "uk-UA",
        // language: "ru-RUS",
        region: "UA",
        apiKey: "8e2cc7ff01fa51e26900ce7e019c1293",
        // categoryUrl: '',
        beforeButtonVisible: true,
        nextButtonVisible: true,
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
        nullImage: ''

    }),
    // beforeMount(){
    //     // this.fetchData(startId);
    //     // let startId = this.$eventHub.current_items[this.$eventHub["current_item_number"]].id
    //     // console.log("THIS ITEM mounted mounted", startId)
    // },
    mounted(){
        this.itemNumber = this.$eventHub["current_item_number"];
        // let mediaType
        // if (this.$route.path.indexOf("main") !== -1){mediaType = this.$eventHub.current_items[this.$eventHub["current_item_number"]].media_type}
        // if (this.$route.path.indexOf("movies") !== -1){mediaType = "movie"}
        // if (this.$route.path.indexOf("series") !== -1){mediaType = "tv"}
        // if (this.$route.path === "actors"){mediaType = "person"}
        const item = this.$eventHub.current_items[this.$eventHub["current_item_number"]]
        const startId = item.id
        let mediaType = this.checkMediaType(item)
        // console.log("THIS ITEM mediaType", mediaType)

        // this.$eventHub.fetchingItems[this.categoryUrl][startId + '/videos'] = null
        // this.videoInit = this.$eventHub.fetchingItems[this.categoryUrl][startId + '/videos']
        this.fetchData(startId, mediaType)
        this.$eventHub.$on('update-item-page', this.updateItemData);
        this.itemInit = this.$eventHub.current_item_number;
        
        this.fetchCollections();

        // this.currentItems = this.$eventHub["current_items"];
        // console.log("THIS ITEM mounted mounted", this.currentItems)

        // &append_to_response=videos,images,similar

  },
    methods:{
        fetchData(id, mediaType) {
            console.log("FETCH mediaType", mediaType)
            const dataList = [
                '', 
                '/images', 
                '/videos', 
                // '/similar'
            ]
            dataList.forEach(item => {
                // console.log("FETCH axios", this.categoryUrl, id + item)
                // console.log("FETCH axios", this.$eventHub.fetchingItems[this.categoryUrl]["id" + id + item])
                if(!this.$eventHub.fetchingItems[mediaType]["id" + id + item] && !(mediaType === 'person' && item === '/videos')){
                    axios
                    .get(`https://api.themoviedb.org/3/${mediaType}/${id}${item}?api_key=${this.apiKey}&language=${this.language}`)
                    .then(data => {
                        this.$eventHub.fetchingItems[mediaType]["id" + id + item] = Object.assign({}, data.data);
                        this.nullImage = item === '' ? 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.$eventHub.fetchingItems[mediaType]["id" + id].poster_path : this.nullImage
                        // console.log("FETCH axios", this.$eventHub.fetchingItems[this.categoryUrl])
                        // console.log("FETCH ITEMS"+item, this.$eventHub.fetchingItems[this.categoryUrl]["id" + id].poster_path) 
                        if(id === this.$eventHub.current_items[this.$eventHub["current_item_number"]].id){
                            this.updateItemData()
                            // console.log("FETCH updateItemData()")
                        }        
                    })
                    .catch(function (error) { console.log(error) })
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
            this.overview = this.currentItem.overview || '';
            this.vote = this.currentItem.vote_average || '';
            const currentId = this.currentItem.id
            const mediaType = this.checkMediaType(this.currentItem)
            this.currentDetails = this.$eventHub.fetchingItems[mediaType]["id" + currentId] ? this.$eventHub.fetchingItems[mediaType]["id" + currentId].results : [];
            this.currentImages = this.$eventHub.fetchingItems[mediaType]["id" + currentId + '/images'] ? this.$eventHub.fetchingItems[mediaType]["id" + currentId + '/images'].results : [];
            this.currentVideosKey = this.$eventHub.fetchingItems[mediaType]["id" + currentId + '/videos'] ? this.$eventHub.fetchingItems[mediaType]["id" + currentId + '/videos'].results : [];
            this.currentSimilar = this.$eventHub.fetchingItems[mediaType]["id" + currentId + '/smilar'] ? this.$eventHub.fetchingItems[mediaType]["id" + currentId + '/smilar'].results : [];
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
            this.cangePageButtons();
        },
        goNextPage(){
            if (this.itemNumber === 19 && this.$eventHub[this.$route.name  + 'currentPage'] < this.$eventHub[this.$route.name  + 'total']){
                this.$eventHub.$emit('update-page', this.$eventHub[this.$route.name  + 'currentPage'] + 1);
                this.itemNumber = 0;
            }else{
                this.itemNumber = this.itemNumber < this.maxItemNumber ? this.itemNumber + 1 : this.itemNumber;
                this.updateItemData();
            } 
            this.cangePageButtons();
        },
        addFavorite(){
            this.favorite = !this.favorite;
        },
        addBookmark(){
            this.bookmarkItem = !this.bookmarkItem;
        },
        cangePageButtons(){
            this.beforeButtonVisible = this.itemNumber > 0 || this.$eventHub[this.$route.name + 'currentPage'] > 1 ? true : false;
            this.nextButtonVisible = this.itemNumber < this.maxItemNumber || this.itemNumber === 19 ? true : false;
        },
        checkMediaType(item){
            // console.log('MEDIATYPE', item)
            let mediaType
            if (this.$route.path.indexOf("main") !== -1){mediaType = item.media_type}
            if (this.$route.path.indexOf("movies") !== -1){mediaType = "movie"}
            if (this.$route.path.indexOf("series") !== -1){mediaType = "tv"}
            if (this.$route.path === "actors"){mediaType = "person"}
            return mediaType
        }
    },
    watch: {
        itemInit(val){
            this.itemNumber = this.$eventHub["current_item_number"];
            this.updateItemData();
            this.cangePageButtons();
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
    min-width: 90vw;
    height: 90vh;
    // padding: 14px 40px;
    // overflow-y: auto;
    .close-button{
        position: absolute;
        top: 0;
        right: 0;
        .md-icon-font{
            font-size: 36px !important;
        }
    }
    .navigate{
        display: flex;
        align-content: center;
        position: absolute;
        height: 100%;
        width: 60px;
        cursor: pointer;
        .md-icon-font{
            display: none;
            font-size: 36px !important;
            transform: scaleY(4);
        }
        .navigate_empty{
            width: 30px;
        }
    }
    .navigate:hover .md-icon-font{
            display: flex;
    }
    
    .navigate-left{
        left: 0;
    }
    .navigate-right{
       right: 0;
    }
    .content{
        padding: 20px 40px;
        overflow-y: auto;
        height: 100%;
        // &.__top-row{
        //     justify-content: flex-start;
        //     // align-content: flex-start;
        //     // align-items: flex-start;
        // }
        // &__text-area{
        //     align-self: flex-start;
        // }
        &__poster-area{
            img{
              box-shadow: 0px 20px 40px 10px rgba(0, 0, 0, 0.541);  
            } 
        }
        &__title {
            display: flex;
            padding-bottom: 30px;
            align-content: center;
            justify-content: center;
            // span{
            //     line-height: 3;
            // } 
        }
        &__rate-bar{
            padding-bottom: 30px;
        }
        &__ganre{
            padding-bottom: 30px;
            background-color: #7b1fa2;
        }
        &__owerviev{
            margin-top: 20px;
            text-align: justify;
            text-indent: 20px;
        }
        &__video-area{
            padding-top: 30px;
        }
        &__video-conteiner{
            height: 200px;
            min-width: 100%;
            background-color: #7b1fa2;
        }
    }

}
.scroll{
    margin-top: 40px;
    width: 100%;
}
.null-image{
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
}
</style>