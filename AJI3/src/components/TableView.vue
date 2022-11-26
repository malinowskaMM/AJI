<template>
    <div class="container">
        <table class="tableView">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Production Year</th>
                    <th>Cast</th>
                    <th>Genres</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="it in display()" v-bind:key="it">
                    <td>{{it.title}}</td>
                    <td>{{it.year}}</td>
                    <td>{{it.cast.toString()}}</td>
                    <td>{{it.genres.toString()}}</td>
                </tr>
            </tbody>
        </table>
        <div class="form-group row" v-if="isButtonVisable">
            <input type="button" class="btn btn-info col-sm-12" value="Pokaż więcej" @click="showMore">
        </div>
        <div class="form-group row">
            <input type="button" class="btn btn-info col-sm-12" value="Wyczyść" @click="clear">
        </div>
    </div>
</template>

<script>
const INITIAL_PAGE_SIZE = 10;
let moviesToDisplay = [];
let moviesCollection = [];
let isButtonVisable = true;
import _ from "lodash";

export default {
    name: 'TableView',

    props: {
        movieTitle: String,
        fromYear: Number,
        toYear: Number,
        cast: String,
        json: Array
    },

    data() {
        for (let movie of this.json) {
            moviesCollection.push(movie)
        }
        return {
            dataTableSize: INITIAL_PAGE_SIZE,
            isButtonVisable: isButtonVisable
        }
    },
    methods: {
        showMore() {
            this.dataTableSize += 10;
            if(moviesToDisplay.length <= this.dataTableSize){
                this.isButtonVisable = false;
            }
        },

        clear() {
            this.dataTableSize = INITIAL_PAGE_SIZE;
            this.isButtonVisable = true;
        },

        display() {
            this.filter()

            moviesToDisplay = (!this.movieTitle
                && !this.fromYear && !this.toYear && !this.cast)
                ? moviesCollection : moviesToDisplay

            return _.take(moviesToDisplay, this.dataTableSize)

        },

        filter() {
            if(this.movieTitle) {
                moviesToDisplay = _.filter(moviesCollection, (movie) => {
                    return movie.title.toLowerCase().includes(this.movieTitle.toLowerCase());
                });
            }
            if(this.fromYear) {
                moviesToDisplay = _.filter(moviesToDisplay, (movie) => {
                    return movie.year >= this.fromYear;
                });
            }
            if(this.toYear) {
                moviesToDisplay = _.filter(moviesToDisplay, (movie) => {
                    return movie.year <= this.toYear;
                });
            }
            if(this.cast) {
                moviesToDisplay = _.filter(moviesToDisplay, (movie) => {
                    return JSON.stringify(movie.cast).toString().toLowerCase().trimStart().trimEnd()
            .includes(this.cast.toLowerCase().trimStart().trimEnd());
                }
                )
            }
        },

    }
}
</script>