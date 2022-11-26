<template>
    <h1>Filmy wg obsady</h1>
    <div class="col-sm-6 mt-5 px-4">
    <div v-for="(actor, index) in actorsList" :key="index">
      <div>
        {{ actor }}
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

export default{
    name: 'ActorsMovieList',

    props: {
        jsonData: Array
    },

    data() {
        return {
            actorsList: _.sortBy(_.uniq(_.flatten(_.filter(
                _.map(this.jsonData, "cast"), _.size)))),
            titleList: [],
        }
    },

    mounted() {
        for (let it of this.actorsList) {
            this.titleList.push(_.filter(
                this.jsonData.slice(this.jsonData.length-100, this.jsonData.length), o => 
                _.includes(_.flatten(o.cast), it)))
        }
    },
}

</script>