<template>
    <div id="app">
        <gallery 
            :images="images" 
            :index="index" 
            :options="{youTubeVideoIdProperty: 'youtube', youTubePlayerVars: undefined, youTubeClickToPlay: true}"
            @close="index = null"
        ></gallery>
        <div class="scroll-bar">
            <div class="image"
                v-for="(image, imageIndex) in images"
                :key="image.id" 
                @click="index = imageIndex"
                :style="{ backgroundImage: 'url(' + image.poster + ')', width: '300px', height: '200px' }">
            </div>
        </div>
        
    </div>
</template>

<script>
import VueGallery from 'vue-gallery';
export default {
    name: 'VideoGallery',
    components: {'gallery': VueGallery},
    props: ['searchData'],
    data: () => ({
        images: [
            {
                // id: 1,
                title: 'A YouYube video',
                href: 'https://www.youtube.com/watch?v=hNdlUHBJDKs',
                type: 'text/html',
                youtube: 'hNdlUHBJDKs',
                poster: 'https://img.youtube.com/vi/hNdlUHBJDKs/maxresdefault.jpg'
            },
            {
                // id: 2,
                title: 'A YouYube video 2',
                href: 'https://www.youtube.com/watch?v=s5iUsaPPtnk',
                type: 'text/html',
                youtube: 's5iUsaPPtnk',
                poster: 'https://img.youtube.com/vi/s5iUsaPPtnk/maxresdefault.jpg'
            },
            {
                // id: 3,
                title: 'Image',
                href: 'https://dummyimage.com/1600/ffffff/000000',
                type: 'image/jpeg',
                poster: 'https://dummyimage.com/350/ffffff/000000'
            },
            {
                // id: 1,
                title: 'A YouYube video',
                href: 'https://www.youtube.com/watch?v=hNdlUHBJDKs',
                type: 'text/html',
                youtube: 'hNdlUHBJDKs',
                poster: 'https://img.youtube.com/vi/hNdlUHBJDKs/maxresdefault.jpg'
            },
            {
                // id: 2,
                title: 'A YouYube video 2',
                href: 'https://www.youtube.com/watch?v=s5iUsaPPtnk',
                type: 'text/html',
                youtube: 's5iUsaPPtnk',
                poster: 'https://img.youtube.com/vi/s5iUsaPPtnk/maxresdefault.jpg'
            },
            
        ],
        index: null


    }),
    methods:{
       
    }
    
}
</script>

<style lang="scss" scoped>
    .image {
        display: inline-block;
        // float: left;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        border: 1px solid #ebebeb;
        margin: 5px;
    }

  .scroll-bar{
      max-width: 80vw;
      white-space: nowrap; 
      overflow-x: scroll;

  }
</style>
