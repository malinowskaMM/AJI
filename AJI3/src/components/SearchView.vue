<template>
    <div class="container">
        <h1>Baza filmów</h1>
        <form>
            <div class="form-group">
                <label for="titleInput">Tytuł</label>
                <input type="text" class="form-control" id="titleInput" placeholder="Podaj tytuł lub fragment tytułu filmu" v-model="title">
            </div>
            <div class="form-group row">
                <label class="col-sm-4 col-form-label" for="yearInputFrom">Rok produkcji od:</label>
                <div class="col-sm-8">
                    <input type="number" class="form-control" id="yearInputFrom" placeholder="Liczba naturalna z przedziału 1900-2019" v-model="year">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-4 col-form-label" for="yearInputTo">Rok produkcji do:</label>
                <div class="col-sm-8">
                    <input type="number" class="form-control" id="yearInputTo" placeholder="Liczba naturalna z przedziału 1900-2019" v-model="year">
                </div>
            </div>
            <div class="form-group">
                <label for="castInput">Obsada</label>
                <input type="text" class="form-control" id="castInput" placeholder="Imię i nazwisko" v-model="cast">
            </div>
            <div class="">
                <input type="button" class="btn btn-info col-sm-12" value="Szukaj" @click="search">
            </div>
        </form>
    </div>
    <TableViewVue :json="fullMoviesData" :movie-title="title" :from-year="minYear" :to-year="maxYear" :cast="cast"></TableViewVue>
</template>

<script>
import TableViewVue from '@/components/TableView.vue';
export default {
    
    name: "SearchView",
    components: {
        TableViewVue
    },
    props: {
        fullMoviesData: Array
    },
    data() {
        return {
            title: "",
            minYear: 0,
            maxYear: 0,
            cast: "",
        }
    },
    methods: {
        search() {
            this.text = document.getElementById('titleInput').value
            this.minYear = document.getElementById('yearInputFrom').value
            this.maxYear = document.getElementById('yearInputTo').value
            this.cast = document.getElementById('castInput').value
        }
    }
}
</script>