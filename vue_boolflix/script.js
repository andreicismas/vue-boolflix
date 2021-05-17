const app = new Vue({
    el: '#app',
    data: {
        apiKeyPersonal: "6d39ae316bc0b27bb4b8deb559102c72",
        searchInput: "",
        moviesList: [],
        seriesTv: [],

    },
    computed: {
        fusionArrayComplete() {
            return this.moviesList.concat(this.seriesTv)
        },
    },

    methods: {
        functionAxiSearch(typeSearch) {
            const axiosParams = {
                params: {
                    api_key: this.apiKeyPersonal,
                    query: this.searchInput,
                    language: "it-IT"
                }
            }

            axios.get("https://api.themoviedb.org/3/search/" + typeSearch, axiosParams)
                .then((resp) => {
                    if (typeSearch === "movie") {
                        this.moviesList = resp.data.results
                    } else if (typeSearch === "tv") {
                        this.seriesTv = resp.data.results.map((movieTv) => {
                            movieTv.original_title = movieTv.original_name
                            movieTv.title = movieTv.name
                            return movieTv
                        })
                    }
                })
            console.log(this.moviesList);
        },

        myResearch() {
            this.functionAxiSearch("movie");
            this.functionAxiSearch("tv");
        },

        iconFlags(movie) {
            const langMovie = movie.original_language;
            const langList = {
                "en": "us",
                "en": "gb",
                "en": "ca",
                "es": "es",
                "es": "ar",
                "es": "cu",
                "es": "mx",
                "de": "de",
                "de": "be",
                "de": "li",
                "it": "it",
                "it": "sm"
            };
            if (Object.keys(langList).includes(langMovie)) {
                return langList[langMovie];
            } else {
                return langMovie;
            }
        },
        posterPathFinder(posterMovie) {
            const posterSize = "w185"
            if (posterMovie.poster_path) {
                return `https://image.tmdb.org/t/p/${posterSize}${posterMovie.poster_path}`;

            } else {
                return "/vue_boolflix/img/palceholder.png"
            }
        },

        vote(number) {
            return Math.ceil(number / 2);
        },


    },


});