<template>
  <div ip="App">
    <SearchVue :fullMoviesData="fullMoviesData"></SearchVue>
    <ListView :fullJsonData="fullMoviesData"></ListView>
  </div>
</template>

<script>
import SearchVue from '@/components/SearchView.vue';
import ListView from '@/components/ListView.vue';
import json from './assets/movies.json';

export default {
  name: 'App',
  data() {
      return {
        fullMoviesData: json
      }
    },
  components: {
    SearchVue,
    ListView
  }
}
</script>