import React from 'react'
import Select from 'react-select'
import { Link } from 'react-router-dom'
 
import axios from 'axios'
 
const genreOptions = [
  { value: 'Action', label: 'Action' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Animation', label: 'Animation' },
  { value: 'Biography', label: 'Biography' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Crime', label: 'Crime' },
  { value: 'Documentary', label: 'Documentary' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Family', label: 'Family' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'History', label: 'History' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Music', label: 'Music' },
  { value: 'Mystery', label: 'Mystery' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Sci-Fi', label: 'Sci-Fi' },
  { value: 'Short', label: 'Short' },
  { value: 'Thriller', label: 'Thriller' },
  { value: 'War', label: 'War' }
]
 
 
function Movies() {
  const [movies, setMovies] = React.useState(null)
  const [genreValue, setGenreValue] = React.useState(null)
  const [runTimeValue, setRunTimeValue] = React.useState(null)
  const [formData, setFormData] = React.useState({
    genres: [],
    runtime: 1,
    breaks: '',
  
  })
 
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/movies')
      setMovies(res.data)
    }
    getData()
 
  }, [ ])

  const handleGenreChange = (selected, name) => {
    const selectedGenres = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: selectedGenres })
    setGenreValue(selectedGenres)
  }
 
  const handleTimeChange = (event) => {
    const bingeTime = event.target.value
    setFormData({ ...formData, [event.target.name]: bingeTime })
    setRunTimeValue(bingeTime)
  }
  
  const filterGenresOne = () => {
    if (genreValue) {
      return movies.filter(movie => {
        return movie.genre.includes(genreValue[0]) && movie.runtime < runTimeValue
      })
    }
  }
 
  const filterGenresTwo = () => {
    if (genreValue) {
      return movies.filter(movie => {
        return movie.genre.includes(genreValue[1]) && movie.runtime < runTimeValue
      })
    }
  }
 
  const filterGenresThree = () => {
    if (genreValue) {
      return movies.filter(movie => {
        return movie.genre.includes(genreValue[2]) && movie.runtime < runTimeValue
      })
    }
  }
  
 
  return (
    <div className="main uk-section uk-height-viewport uk-background-cover">
      <div className="uk-container uk-column-1-1 uk-height-1-1">
        <div className="topten-container uk-position-center">
        </div>
        <div className="form-section uk-container">
          <div className="tophalf">
            <div className="marathon uk-text-center">Choose Your Sprint!</div>
            <div className="marathon-info uk-text-center">In a rush with nothing to watch? Pick your genres and time below to help choose your perfect movie!</div>
          </div>
          <form>
            <div className="form-container">
              <label className="label-movies">Choose Your Genres!</label>
              <div className="searchbar">
                <div className="field">
                  <div className="control">
                    <Select
                      options={genreOptions}
                      isMulti
                      onChange={selected =>
                        handleGenreChange(selected, 'genres')
                      }
                      value={formData.genres.map(item => ({ label: item[0].toUpperCase() + item.substring(1), value: item }))}
                    />
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label-movies">Select How Much Time You Have!</label>
                <div className="control">
                  <input
                    className="uk-input"
                    name="runtime"
                    type="number"
                    onChange={handleTimeChange}
                    value={formData.runtime}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* </div> */}
        <div className="topten-movies uk-container-large">
          <div className="movie uk-grid uk-grid-medium uk-width-1-1">
            {genreValue &&
          movies &&
          filterGenresOne().map(movie =>
            <>
              <div 
                className="genre-filters posters movie uk-grid uk-grid-medium" key={movie._id} {...movie}>
                <div className="movie-cards">
                  <img className="showing" src={movie.poster}/>
                  <div className="hiding uk-button-group">
                    <Link to={`/movies/${movie._id}`} key={movie._id}>
                      <button className="uk-button uk-button-secondary uk-button-small">
                    Watch Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
            {genreValue &&
              movies &&
              filterGenresTwo().map(movie =>
                <>
                  <div 
                    className="genre-filters posters movie uk-grid uk-grid-medium" key={movie._id} {...movie}>
                    <div className="movie-cards">
                      <img className="showing" src={movie.poster}/>
                      <div className="hiding uk-button-group">
                        <Link to={`/movies/${movie._id}`} key={movie._id}>
                          <button className="uk-button uk-button-secondary uk-button-small">
                        Watch Now
                          </button>
                        </Link>
                        
                      </div>
                    </div>
                  </div>
                </>
              )}
            {genreValue &&
            movies &&
            filterGenresThree().map(movie =>
              <>
                <div 
                  className="genre-filters posters movie uk-grid uk-grid-medium" key={movie._id} {...movie}>
                  <div className="movie-cards">
                    <img className="showing" src={movie.poster}/>
                    <div className="hiding uk-button-group">
                      <Link to={`/movies/${movie._id}`} key={movie._id}>
                        <button className="uk-button uk-button-secondary uk-button-small">
                      Watch Now
                        </button>
                      </Link>
                      
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
 
    
  )
  
}
 
export default Movies