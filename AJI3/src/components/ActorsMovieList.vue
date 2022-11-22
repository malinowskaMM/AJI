<template>
    <div class="container">
        <h1>Filmy wg obsady</h1>
        <div class="card" v-for="(it,index) in actorsList" :key="index">
      <div class="card-header">
        {{it}}
      </div>

      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="(jt,jndex) in titleList[index]" :key="jndex">
          {{jt.title}}
        </li>
      </ul>

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
                this.jsonData.slice(this.jsonData.length-100, this.jsonData.length), (o) => _.includes(_.flatten(o.cast), it)))
        }
    },
}

</script>