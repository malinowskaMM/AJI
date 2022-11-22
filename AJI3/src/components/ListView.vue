<template>
    <div class="row">
      <GenreMovieList
          :jsonData="fullJsonData"
      />
      <ActorsMovieList
          :jsonData="fullJsonData"
      />
    </div>
  </template>
  
  <script>
    import GenreMovieList from "./GenreMovieList";
    import ActorsMovieList from "./ActorsMovieList";
  
    export default {
      name: "ListView",
  
      components: {
        ActorsMovieList,
        GenreMovieList
      },
  
      props: {
        fullJsonData: Array
      },
  
    }
  </script>
  
  <style scoped>
  
  </style>
  