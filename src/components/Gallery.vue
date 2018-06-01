<template>
    <div id="app">
        <gallery :class="$vuetify.breakpoint.smAndUp ? 'gallery' : 'gallery-xs'"
            :images="images" 
            :index="index" 
            @close="close"
        ></gallery>
        <div class="scroll-bar">
            <div class="image"
                v-for="(image, imageIndex) in setImages"
                :key="image.id" 
                @click="open(imageIndex)"
                :style="{ 
                    backgroundImage: 'url(' + image + ')', 
                    width: $vuetify.breakpoint.smAndUp ?  $vuetify.breakpoint.lgAndUp ? 'calc(16.6% - 10px)' : 'calc(25% - 10px)' : 'calc(50% - 10px)', 
                    height: '150px' 
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
    computed:{
        setImages(){
            this.images = []
            this.fetchingImages.forEach((item, i) => {
                this.images[i] = 'https://image.tmdb.org/t/p/w500/' + item.file_path
            })
            return this.images
        }
    },
    // watch: {
    //     fetchingImages(){
    //         this.images = []
    //         this.fetchingImages.forEach((item, i) => {
    //             this.images[i] = 'https://image.tmdb.org/t/p/w500/' + item.file_path
    //         }) 
    //     }
    // }
    
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

    // .scroll-bar{
    //     //   max-width: 80vw;
    //     //   white-space: nowrap; 
    //     //   overflow-x: scroll;

    // }
    .gallery{
        // margin: 30px;
        margin: 0 auto 30px;
        max-width: 1218px;
        height: 88vh;
        width: 95%;
        top: 6%;
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
