const app = new Vue({
    el: '#app',
    data: {
        apiKeyPersonal: "6d39ae316bc0b27bb4b8deb559102c72",
        searchInput: "",
        moviesList: [],
        seriesTv:[],
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
                    if(typeSearch==="movie"){
                        this.moviesList = resp.data.results
                    }else if(typeSearch === "tv"){
                        this.seriesTv = resp.data.results.map((movieTv)=>{
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
            let fusionArray =this.moviesList.concat(this.seriesTv)
            console.log(fusionArray);
        },
        
        iconFlags(movie) {
            const langMovie = movie.original_language;
            const langList = [];
            if (Object.keys(langList).includes(langMovie)) {
                return langList[langMovie][0];
            } else {
                return langMovie;
            }
        },


    },

   
});