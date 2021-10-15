import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function MovieProfile() {
  const { marathonId } = useParams()
  const [marathon, setMarathon] = React.useState(null)
  const [movies, setMovies] = React.useState(null)
  const reducer = (previousValue, currentValue) => previousValue + currentValue

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/marathons/${marathonId}`)
        setMarathon(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
    

  }, [marathonId])

  React.useEffect(() => {
    const getData = async () => {
      const resp = await axios.get('/api/movies')
      setMovies(resp.data)
    }
    getData()
 
  }, [ ])
  
  const movieData = () => {
    if (marathon && movies) {
      return movies.filter(movie => {
        return movie.poster.includes(marathon[0]) ||
        movie.poster.includes(marathon[2])
      })
    }
  }

  const totalMarathonTime = () => {
    if (marathon && movies) {
      return movieData().map(movie => {
        return movie.runtime
      })
    }
  }

  return (
    <section className= "main uk-height-viewport">
      <div className="uk-container-large uk-height-1-1">
        <div id="movieprofilecard" className= "uk-container uk-column-1-2 uk-position-center">
          {marathon && 
          <div>
            <div className= "column is-half">
              
              <figure className= "image profile-poster">
                <img src={marathon[0]}/>
                <img src={marathon[2]}/>
                <img src={marathon[4]}/>
                <img src={marathon[6]}/>
                <img src={marathon[8]}/>
                <img src={marathon[10]}/>
              </figure>
            </div>
            <div id= "movieinfo" className= "column is-half">
              <h2><strong>{marathon.name}</strong></h2>
              <p><strong>Movies:</strong><br></br>{marathon[1]}<br></br>{marathon[3]}<br></br>{marathon[5]}<br></br>{marathon[7]}<br></br>{marathon[9]}<br></br>{marathon[11]}</p>
              <p><strong>Total Marathon Duration: </strong></p>
              {marathon && movies &&
              Math.floor(((totalMarathonTime().reduce(reducer)) / 60))     
              } Hours {marathon && movies &&
              ((totalMarathonTime().reduce(reducer)) - (Math.floor(((totalMarathonTime().reduce(reducer)) / 60)) * 60)) 
              } Minutes
                     
            </div>
          </div>
          }
        </div>
      </div>
    </section>
  )
}

export default MovieProfile