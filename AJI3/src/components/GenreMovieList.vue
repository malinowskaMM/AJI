<template>
    <div class="container">
        <h1>Filmy wg gatunku</h1>
        <div class="col-sm-6 mt-5 px-4">
        <div class="card" v-for="(it,index) in genreList" :key="index">
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