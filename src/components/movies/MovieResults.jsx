import {useContext} from 'react';
import MovieDBContext from '../../context/moviedb/MovieDBContext';
import PropagateLoader from 'react-spinners/PropagateLoader';
import MovieItem from '../../components/movies/MovieItem';

function MovieResults() {
    const {loading, movies} = useContext(MovieDBContext);
    
    if(!loading) {
      if(movies.length > 0) {
        return (
          <div className = 'grid gird-cols-1 gap-8 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 mt-10' >
              {movies.map((movie) =>(
                <MovieItem key={movie.imdbID} movie={movie} />
              )
            
                  
                
              )}
          </div>
        ) 
      }else{
        return <div></div>
      }
        
    }else{
        return <PropagateLoader className='text-center mx-auto' color='#6d3a9c'/>
    }
}

export default MovieResults