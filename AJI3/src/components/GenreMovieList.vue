<template>
        <h1>Filmy wg gatunku</h1>
        <div class="col-sm-6 mt-5 px-4">
    <div v-for="(genre, index) in genreList" :key="index">
      <div>
        {{ genre }}
      </div>
      <ol>
        <li v-for="(element, jndex) in titleList[index]" :key="jndex">
          {{ element.title }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
    name: 'GenreMovieList',

    props: {
        jsonData: Array
    },

    data() {
        return {
            genreList: _.sortBy(_.uniq(_.flatten(_.filter(
                _.map(this.jsonData, "genres"), _.size)))),
            titleList: [],
        }
    },

    mounted() {
        for (let it of this.genreList) {
            this.titleList.push(_.filter(
                this.jsonData.slice(this.jsonData.length-100, this.jsonData.length), (o) => _.includes(_.flatten(o.genres), it)))
        }
    },

}


</script>