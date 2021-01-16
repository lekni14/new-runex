import React from 'react'
import { Col, Row } from 'react-bootstrap'
import iconrunning from '../images/icon-running.svg'
import iconmarker from '../images/icon-marker.svg'
import { eventService } from '../services/event.service';
import Image from 'react-bootstrap/Image'
import { IMAGE_URL } from '../utils/constants';
import { history } from '../store'
import { utils } from '../utils/utils';
// import Banner from './Banner'



class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: []
    }
  }

  componentDidMount() {
    this.getEvent();
  }

  getEvent() {
    eventService.getEvents().then(res => {
      console.log(res)
      if ((res.code !== undefined) && (res.code === 200)) {
        console.log(res)
        if (res.data != null) {
          this.setState({
            events: res.data
          })
        }

      }

    })
  }
  getMeta({ target: image }) {

    //console.log(image.offsetWidth, image.offsetHeight)
  }
  render() {
    return (
      <div>
        {/* <Banner className="mb-3" items={ITEMS}></Banner> */}
        <div className="container-fluid home my-5">
          <Row className="mt-5">
            <Col xs={12} md={12} md={{ span: 10, offset: 1 }}>
              <div className="clearfix">
                <h4 className="float-left latest-events">รายการวิ่ง</h4>
                {/* <Link to="/privateevent"><dt className="float-right">See all</dt></Link> */}
              </div>
            </Col>
          </Row>
          <Row >
            <Col xs={12} md={12} md={{ span: 10, offset: 1 }}>
              <Row >
                {this.state.events.map((event, i) => {
                  return (
                    <div className="col-sm-6 col-md-4 col-lg-3 pb-2" id="p1" key={i}>
                      <div style={{ cursor: 'pointer' }} className="cover-card card shadow border-0" onClick={() => history.push(`/preview/${event.code}`)}>

                        {/* <svg className="img-fluid rounded-top" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Responsive image">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Responsive image</text>
                  </svg> */}
                        <figure>
                          <Image onLoad={this.getMeta} src={`${event.cover}`} className="card-img-top img-fluid" alt={event.name} />
                        </figure>


                        <div className="card-body p-2">
                          <img
                            src={iconrunning}
                            height="18"
                            className="mr-1"
                            alt={`${event.title}`}
                          />
                          <small className="event-date-label">
                            <cite title="Source Title">
                              <span className="event-date-start">{utils.convertDateApiToMMMM_DD_YYYY(event.start_reg)} </span>
                              <span className="event-date-end">{utils.convertDateApiToMMMM_DD_YYYY(event.end_reg)}</span>
                            </cite>
                          </small>
                          <h5 className="card-title">{event.title}</h5>

                          <p className="card-text text-muted ellipsis" style={{ display: event ? (event.category === 'Virtual Run' ? "none" : "block") : 'none' }}><img
                            src={iconmarker}
                            height="18"
                            className="mr-1"
                            alt="Runex logo"
                          />
                            {event.location}</p>
                          {/* <div className="list-reg-images">
                            <span className="li-images">
                              <span>
                                <a>
                                  <img className="rounded-circle" width="30" height="30" src="https://i.kinja-img.com/gawker-media/image/upload/gd8ljenaeahpn0wslmlz.jpg" />
                                </a>
                              </span>
                              <span>
                                <a>
                                  <img className="rounded-circle" width="30" height="30" src="http://imgc.allpostersimages.com/images/P-473-488-90/68/6896/2GOJ100Z/posters/despicable-me-2-minions-movie-poster.jpg" alt=""></img>
                                </a>
                              </span>
                              <span>
                                <a>
                                  <img className="rounded-circle" width="30" height="30" src="https://static.eharmony.com/blog/wp-content/uploads/2010/04/eHarmony-Blog-profile-picture.jpg" alt="" ></img>
                                </a>
                              </span>
                            </span>
                            <span className="li-text">
                              <a>+12</a>
                            </span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Row>
            </Col>

          </Row>

        </div >
      </div>

    )
  }
}

export default Home
