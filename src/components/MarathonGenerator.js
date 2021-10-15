import { posterSelection, marathonSelection } from './Marathon.js'
import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


function MarathonGenerator() {
  const [playlistData, setPlaylistData] = React.useState(marathonSelection)
  const history = useHistory()
  
  const handleChange = e => {
    setPlaylistData({ ...playlistData, [e.target.name]: e.target.value })
    console.log(playlistData)
  } 


  const handleSubmit = async e => {
    e.preventDefault()
    console.log(playlistData)
    try {
      const { data } = await axios.post('/api/marathons', playlistData)
      console.log('submitted', playlistData)
      history.push(`/marathons/${data._id}`)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="main uk-section uk-height-viewport">
      <div className="uk-container uk-column-1-1 uk-height-1-1">
        <div className="form-section uk-container">
          <div className="form-container">  
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label"></label>
                <div className="control">
                  <div className="marathon uk-text-center">Create Your Marathon Name:</div>
                  <input
                    className="uk-input"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    value={playlistData.name}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="uk-button uk-button-danger uk-button-large uk-width-1-1 uk-margin-medium-top uk-margin-medium-bottom"
                onSubmit={handleSubmit}>
                    Submit Marathon!
              </button>
              <div className="field" id="hideme">
                <label className="label-movies"></label>
                <div className="control">
                  <input
                    className="uk-input"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                    value={marathonSelection}
                  />
                </div>
              </div>
              <div>
              </div>
              <div className="movie-card">
                {posterSelection.map(poster =>
                  <img className="marathon-images" key={poster} value={playlistData.poster} src={poster}/>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  

  )
}

export default MarathonGenerator