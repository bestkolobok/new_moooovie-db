<template>
    <div class="card-container" @click.exact.stop="goToItem">
        <md-card>
            <md-card-media-cover md-text-scrim>
                <md-card-media md-ratio="4:3" >
                    <img :src="posterImage" :alt="name">
                </md-card-media>
                <md-card-area class="md-area_top">
                    <md-card-actions class="action-button">
                        <v-btn flat icon color="white" v-if="watchFavirite" @click="addFavorite"><v-icon>favorite</v-icon></v-btn>
                        <v-btn flat icon color="white" v-else @click="addFavorite"><v-icon>favorite_border</v-icon></v-btn>
                        <v-btn fab small color="accent" class="md-vote" v-show="voteVisible" light>{{vote}}</v-btn>
                    </md-card-actions>
                </md-card-area>
                <md-card-area class="md-area_bottom">
                    <md-card-header class="md-header">
                        <span class="md-subheading md-name">{{name}}</span> 
                        <span class="md-caption md-date">{{dates}}</span>     
                    </md-card-header>
                </md-card-area> 
            </md-card-media-cover>
        </md-card>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'FilmCard',
    props: ['item', 'keyItem'],
    data: () => ({
        favorite: false,
        favoriteState: [],
        // item: {},
        dates: '',
        name: '',
        vote: '',
        voteVisible: false,
        posterImage: null,
        overview: '',
        blockButton: true
    }),
    mounted(){
        this.dates = this.item.release_date !== undefined ? this.item.release_date.split("-") : this.item.first_air_date !== undefined ? this.item.first_air_date.split("-") : '';
        this.dates = this.dates !== '' ? '('+this.dates[0]+')' : this.dates;
        this.name = typeof this.item.title !== 'undefined' ? this.item.title : typeof this.item.name !== 'undefined' ? this.item.name : '';
        this.vote = this.item.vote_average || ""
        this.overview = this.item.overview || ""
        
        const posterLink = this.item.poster_path || this.item.profile_path || null
        this.posterImage = posterLink ? 'https://image.tmdb.org/t/p/w342' + posterLink : require('../assets/img/template.png') 
        
        this.voteVisible = this.vote === "" ? false : true
        if(this.$eventHub.favorites.indexOf(this.item.id) !== -1){this.favorite = true}
        this.favoriteState = this.$eventHub.favorites
    },
    methods: {
        goToItem(){
            if(this.blockButton === true){
                this.$eventHub["current_item"] = this.item
                this.$eventHub["current_item_number"] = this.keyItem
                this.$eventHub.$emit('go-to-item')
                // this.$eventHub.$emit('on-item', this.item);
            }
        this.blockButton = true
        },
        addFavorite(){
            this.favorite = !this.favorite
            this.blockButton = false
            if(this.favorite && this.$eventHub.favorites.indexOf(this.item.id) === -1){this.$eventHub.favorites.push(this.item.id)}else
            if(!this.favorite && this.$eventHub.favorites.indexOf(this.item.id) !== -1){
                const deleteId = this.$eventHub.favorites.indexOf(this.item.id)
                this.$eventHub.favorites.splice(deleteId, 1)
            }
        }
    },
    computed:{
        watchFavirite(){
            const state = this.favoriteState
            if(state.indexOf(this.item.id) !== -1){this.favorite = true}else{this.favorite = false}
            let favorite = this.favorite
            return favorite
        }
    }
}
</script>

<style lang="scss" scoped>
.card-container {
    .md-card {
        margin: 4px auto;
        display: block;
        .md-card-media-cover{
            cursor: pointer;
        }
        .md-area_top {
            top: 0px;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            
            .action-button {
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                flex-direction: row;
                width: 100%;
                .md-vote {
                    background-color: #69F0AE;
                    opacity: .6;
                    cursor: default;
                }
            }
        }
        .md-area_bottom {
            .md-header {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                padding-bottom: 5px;
                justify-content: space-between;
                // width: 100%;
                .md-name {
                    line-height: 18px;
                }
                .md-date {
                    padding-left: 5px;
                }
            }
        }
        
            
    }
}
</style>