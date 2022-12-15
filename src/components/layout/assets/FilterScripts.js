
class filterUsers{
    constructor(Movies){
        this.movies = Movies;
        this.Users = [];
        this.populateUsers();
    }
    
    populateUsers(){
        console.log(this.movies)
        if(this.movies != null){
            this.movies.map((movie) => {
              const submittedby = movie.otherDetails.submittedby;
              console.log(submittedby)
              if (!this.Users.includes(submittedby)) {
                this.Users.push(submittedby);
              }
            });
        }
    }

    getUsers(){
        if(this.Users){
            return this.Users;
        }
        return null;
    }

}

export default filterUsers;