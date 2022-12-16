class filterItems {
  constructor(Movies) {
    this.movies = Movies;
    this.Users = [];
    this.populateUsers();
    this.Genres = [];
    this.populateGenres();
  }

  populateUsers() {
    if (this.movies != null) {
      this.movies.map((movie) => {
        const submittedby = movie.otherDetails.submittedby;
        if (!this.Users.includes(submittedby)) {
          this.Users.push(submittedby);
        }
      });
    }
  }

  populateGenres() {
    this.Genres = [
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Fantasy",
      "Historical",
      "Horror",
      "Romance",
      "Sci-fi",
      "Action",
      "Thriller",
    ];
  }

  getUsers() {
    if (this.Users) {
      return this.Users;
    }
    return null;
  }

  getGenres() {
    if (this.Genres) {
      return this.Genres;
    }
    return null;
  }
}

export default filterItems;
