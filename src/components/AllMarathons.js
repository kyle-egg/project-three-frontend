import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AllMarathons() {
  const [marathons, setMarathons] = React.useState()
  console.log(marathons)
  
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/marathons')
      setMarathons(res.data)
    }
    getData()
    
  }, [ ])

  
  return (
    <section>
      {marathons && marathons.map(marathon => {
        return <div key={marathon._id} className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" uk-slider="center: true">
          <Link to={`/marathons/${marathon._id}`} key={marathon._id}>
            <ul className="uk-slider-items uk-grid">
              <li className="uk-width-1-4">
                <div className="uk-h3">{marathon.name}</div>
                <div className="uk-panel">
                  <img src={marathon[0]} alt=""/>
                  <div className="uk-position-center uk-panel"></div>
                </div>
              </li>
              <li className="uk-width-1-4">
                <div className="uk-panel">
                  <img src={marathon[2]} alt=""/>
                  <div className="uk-position-center uk-panel"></div>
                </div>
              </li>
              <li className="uk-width-1-4">
                <div className="uk-panel">
                  <img src={marathon[4]} alt=""/>
                  <div className="uk-position-center uk-panel"></div>
                </div>
              </li>
              <li className="uk-width-1-4">
                <div className="uk-panel">
                  <img src={marathon[6]} alt=""/>
                  <div className="uk-position-center uk-panel"></div>
                </div>
              </li>
              <li className="uk-width-1-6">
                <div className="uk-panel">
                  <img src={marathon[8]} alt=""/>
                  <div className="uk-position-center uk-panel"></div>
                </div>
              </li>
              <li className="uk-width-1-6">
                <div className="uk-panel">
                  <img src={marathon[10]} alt=""/>
                  <div className="uk-position-center uk-panel"></div>
                </div>
              </li>
            </ul>
            
            <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
            <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
          </Link>
        </div>
      })}

    </section>
  )
}

export default AllMarathons