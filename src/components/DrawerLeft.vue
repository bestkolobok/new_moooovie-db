<template>
    <v-list dense>
        <template v-for="item in pages">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click="choisePage(child.link)">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="choisePage(item.link)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
    </v-list>
</template>

<script>

export default {
  name: 'DrawerLeft',
  data(){
    return{
      pages: [
        { icon: 'movie', text: 'Фильмы', link: '/movies' },
        { icon: 'tv', text: 'Сериалы', link: '/series' },
        { icon: 'people', text: 'Актеры', link: '/actors' },
        { icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down', text: 'Категории фильмов', model: false,
          children: [
            { text: 'Премьеры', link: '/movies/upcoming' },
            { text: 'Сейчас на экранах', link: '/movies/nowPlaying' },
            { text: 'Популярные', link: '/movies/Popular' },
            { text: 'Топ 100', link: '/movies/topRated' }
          ]
        },
        { icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down', text: 'Категории сериалов', model: false,
          children: [
            { text: 'Популярные', link: '/series/popular' },
            { text: 'Сейчас на экранах', link: '/series/onTheAir' },
            { text: 'Топ 100', link: '/series/topRated' }
          ]
        },
        { icon: 'bookmark', text: 'Закладки', link: '/' },
        { icon: 'history', text: 'История просмотра', link: '/' },
        { icon: 'search', text: 'История поиска', link: '/' },
        { icon: 'account_circle', text: 'Вход в аккаунт', link: '/' },
      ]
    }
  },
  methods: {
    choisePage(link){
      this.$router.push(link)
      this.pages.forEach(item => {item.model ? item.model = false : null})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>