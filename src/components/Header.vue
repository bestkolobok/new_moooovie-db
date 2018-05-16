<template>
    <v-toolbar :clipped-left="$vuetify.breakpoint.mdAndUp" class="primary toolbar" dark app fixed scroll-off-screen :scroll-threshold="50" dense prominent extended>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3 toolbar-title">
            <v-toolbar-side-icon @click.stop="drawerToggle"></v-toolbar-side-icon>
            <span class="hidden-sm-and-down toolbar-title__text">MooovieLand</span>
        </v-toolbar-title>

            

        <v-spacer></v-spacer>
        <v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>
        
        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>

        <!-- <v-btn icon large>
            <v-avatar size="32px" tile>
            <img src="https://vuetifyjs.com/static/doc-images/logo.svg" alt="Vuetify">
            </v-avatar>
        </v-btn> -->
        <v-tabs
            slot="extension"
            v-model="currentItem"
            fixed-tabs
            color="transparent"
            slider-color="white"
        >
            <v-tab
                v-for="item in categoryItems"
                :key="item.id"
                :href="'#tab-' + item"
                :to="item.path"
                >
                {{ item.name }}
            </v-tab>
            <v-spacer></v-spacer>
            <v-menu
                class="tabs__div"
                :close-on-content-click="false"
                origin="center center"
                transition="scale-transition"
                bottom
                >
                <span class="tabs__item" slot="activator" dark>
                    Жанр
                </span>
                <v-list>
                    <v-list-tile v-for="(item, i) in items" :key="i" @click="genreList">
                        <v-list-tile-title >{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu> 
            <v-menu
                class="tabs__div"
                origin="center center"
                transition="scale-transition"
                bottom
                >
                <span class="tabs__item" slot="activator" dark>
                    Категория
                </span>
                <v-list>
                    <v-list-tile v-for="(item, i) in items" :key="i" @click="genreList">
                        <v-list-tile-title >{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu> 
        </v-tabs>
    </v-toolbar>
    
</template>

<script>
import Fetch from '@/common/fetch.js'
export default {
  name: 'Header',
  components: { Fetch },
  data(){
    return{
        drawer: false,
        categoryItems: [
            {name: "Фильмы", path: "/movies"}, 
            {name: "Сериалы", path: "/series"},
            {name: "актеры", path: "/actors"}
        ],
        items: [
            { title: 'Click Me' },
            { title: 'Click Me' },
            { title: 'Click Me' },
            { title: 'Click Me 2' }
        ],
        currentItem: null
    }
  },
  methods: {
    drawerToggle () {
        this.$eventHub.$emit('toggle-drawer')
    },
    genreList(e) {
        e.currentTarget.classList.toggle('success')
        console.log(e.currentTarget)
    }
  }
}
</script>

<style lang="scss" scoped>
    .list{
        &__tile{
         
        }
        &__tile__title{
            
        }
    }

</style>