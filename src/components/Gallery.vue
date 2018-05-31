<template>
    <div id="app">
        <gallery :class="$vuetify.breakpoint.smAndUp ? 'gallery' : 'gallery-xs'"
            :images="images" 
            :index="index" 
            @close="close"
        ></gallery>
        <div class="scroll-bar">
            <div class="image"
                v-for="(image, imageIndex) in images"
                :key="image.id" 
                @click="open(imageIndex)"
                :style="{ 
                    backgroundImage: 'url(' + image + ')', 
                    width: $vuetify.breakpoint.smAndUp ?  $vuetify.breakpoint.lgAndUp ? 'calc(25% - 10px)' : 'calc(33.3% - 10px)' : '100%', 
                    height: '200px' 
                }"
            >
            </div>
        </div>
    </div>
</template>

<script>
import VueGallery from 'vue-gallery';
export default {
    name: 'ImageGallery',
    components: {'gallery': VueGallery},
    props: ['fetchingImages'],
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
        // updateImages(){
        //     this.images = []
        //     this.fetchingImages.forEach((item, i) => {
        //         this.images[i] = 'https://image.tmdb.org/t/p/w500/' + item.file_path
        //     }) 
        // }
    },
    watch: {
        fetchingImages(){
            this.images = []
            this.fetchingImages.forEach((item, i) => {
                this.images[i] = 'https://image.tmdb.org/t/p/w500/' + item.file_path
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
