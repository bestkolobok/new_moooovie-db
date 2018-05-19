<template>
    <div class="md-layout md-gutter md-alignment-center">
        <div v-for="item in cardItems" 
            class="md-layout-item md-size-100" @click="navigateTo(item.categoryPath)" 
            :key="item.id">
                    <md-card>
                        <md-card-media-cover md-solid>
                            <md-card-media>
                                <img class="image-item" :src="item.categoryImage" :alt="item.categoryName">
                                <img class="image-item" :src="item.categoryImage" :alt="item.categoryName">
                                <img class="image-item" :src="item.categoryImage" :alt="item.categoryName">
                                <img class="image-item" :src="item.categoryImage" :alt="item.categoryName">
                                <img class="image-item" :src="item.categoryImage" :alt="item.categoryName">
                                <img class="image-item" :src="item.categoryImage" :alt="item.categoryName">
                                <img class="image-item" :src="item.categoryImage" :alt="item.categoryName">
                                <img class="image-item" :src="item.categoryImage" :alt="item.categoryName">
                                <img class="image-item" :src="item.categoryImage" :alt="item.categoryName">
                            </md-card-media>

                            <md-card-area>
                                <md-card-header>
                                    <span class="md-title">{{item.categoryName}}</span>
                                </md-card-header>
                            </md-card-area>
                        </md-card-media-cover>
                    </md-card>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'LastRowFixed',
  data: () => ({
    cardItems: [
        {categoryName: "Фильмы", categoryPath: "/movies", categoryImage: require('../assets/img/movies.jpg')},
        {categoryName: "Сериалы", categoryPath: "/series", categoryImage: require('../assets/img/series.jpg')},
        {categoryName: "Актеры", categoryPath: "/actors", categoryImage: require('../assets/img/actors.jpg')}
    ]
  }),
  methods: {
    navigateTo: function (nav) {
        this.$router.push({
        path: nav
        })
    }
  }
  
}
</script>

<style lang="scss" scoped>
// @import "~vue-material/dist/theme/engine";
.md-layout-item {
    // width: 320px;
    display: flex;
    margin-top: 8px;
    margin-bottom: 8px;
    align-items: center;
    cursor: pointer;
    // transition: .3s $md-transition-stand-timing;
    .md-card {
        width: 100%;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
        .md-card-media-cover{
            .md-card-media {
                display: flex;
                height: 130px;
                overflow: hidden;
                white-space: nowrap;
                .image-item {
                    height: 100%;
                    width: auto;
                    display: inline-flex;
                }
                }
                .md-card-area{
                    height: 100%;
                    width: 30vw;
                    justify-content: center;
                    .md-card-header{
                    align-self: center;
                }
            }
        }
        
    }
        
}
</style>