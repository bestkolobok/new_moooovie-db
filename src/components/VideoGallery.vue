<template>
    <div id="app">
        <gallery :class="$vuetify.breakpoint.smAndUp ? 'gallery' : 'gallery-xs'"
            :images="images" 
            :index="index"
            :options="{youTubeVideoIdProperty: 'youtube', youTubePlayerVars: undefined, youTubeClickToPlay: true}"
            @close="close"
        ></gallery>
        <div class="scroll-bar">
            <div class="image"
                v-for="(image, imageIndex) in images"
                :key="image.id" 
                @click="open(imageIndex)"
                :style="{ 
                    backgroundImage: 'url(' + image.poster + ')', 
                    width: $vuetify.breakpoint.smAndUp ?  $vuetify.breakpoint.lgAndUp ? 'calc(12.5% - 10px)' : 'calc(25% - 10px)' : 'calc(33.3% - 10px)', 
                    height: '100px' 
                }"
            >
            </div>
        </div>
    </div>
</template>

<script>
import VueGallery from 'vue-gallery';
export default {
    name: 'VideoGallery',
    components: {'gallery': VueGallery},
    props: ['fetchingVideos'],
    data: () => ({
        images: [],
        index: null
    }),
    methods:{
        open(imageIndex){
            this.index = imageIndex
            this.$eventHub.$emit('stop-change-item', true)
        },
        close(){
            this.index = null
            this.$eventHub.$emit('stop-change-item', false)
        }
    },
    watch: {
        fetchingVideos(){
            this.images = []
            this.fetchingVideos.forEach((item, i) => {
                this.images[i] = {type: 'text/html'}
                this.images[i].href = 'https://www.youtube.com/watch?v=' + item.key
                this.images[i].youtube = item.key
                this.images[i].poster = 'https://img.youtube.com/vi/' + item.key + '/maxresdefault.jpg'
                this.images[i].title = item.name
            }) 
        }
    }
    
}
</script>

<style lang="scss" scoped>
    .image {
        // display: inline-block;
        float: left;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        border: 1px solid #ebebeb;
        margin: 5px;
    }

    .scroll-bar{
        //   max-width: 80vw;
        //   white-space: nowrap; 
        //   overflow-x: scroll;

  }
    .gallery{
        margin: 30px;
    }
    // .gallery-xs{
    //     .prev{
    //         display: none;
    //     }
    //     .next{
    //         display: none;
    //     }
    // }
</style>
