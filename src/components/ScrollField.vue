<template>
    <div class="conteiner">
        <!-- <scroller class="conteiner__scroller"
            :on-refresh="refresh"
            :on-infinite="infinite"> -->
           <div class="videocell" v-for="video in videos" :key="video.id"> 
            <!-- <youtube :video-id="video.key" ref="youtube2" @playing="playing(2)" @paused="paused(2)" @ended="paused(2)" width="290" height="223" 
                class="video__item3" frameborder="0" allowfullscreen> -->

                <youtube :video-id="video.key" ref="youtube" width="290" height="250" class="videocell__item" frameborder="0" allowfullscreen>
                </youtube>
            </div>
        <!-- </scroller> -->
        
        
    </div>
</template>

<script>

export default {
    name: 'ScrollField',
    props: ['videos'],
    data: () => ({
    //    videos: [],
    }),
    methods:{
        playVideo(item) {
            // this.player.playVideo()
            this.$refs['youtube' + item].player.playVideo()
        },
        playing(n) {
            this['videoVisible' + n] = false;
            this.videoPlaying[n] = true;
            for(let i in this.videoPlaying){
                if (this.videoPlaying[i] && i != n) {
                this.$refs['youtube' + i].player.pauseVideo()
            }
        }
    },

    paused(n){
      this['videoVisible' + n] = true;
      this.videoPlaying[n] = false;
    }
    }
    
}
</script>

<style lang="scss" scoped>
    .conteiner{
        // ._v-content{
        //     display: flex;
        //     flex-wrap: nowrap;
        //     flex-direction: row;
        //     // justify-content: flex-start;
        //     width: 100%;
        // }
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        .videocell{
            display: flex;
            // flex-basis: 290px;
            margin: 0 10px 10px 0;
            // width: 290px;
            // &__item{

            // }
        }
    }

</style>
