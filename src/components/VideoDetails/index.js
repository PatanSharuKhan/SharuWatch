/* eslint-disable no-nested-ternary */
import {Component} from 'react'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import WatchContext from '../../context/WatchContext'
import Navbar from '../Navbar'
import LeftNavSection from '../LeftNavSection'
import {P, Button, Span} from './styledConponents'
import RightSection from '../../StyledComponents'
import './index.css'
import ApiError from '../ApiError'

class VideoDetails extends Component {
  state = {
    videoUrl: '',
    videoDetails: '',
    channel: [],
    isLoading: false,
    isApiError: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  // --------------------------------fetching api-------------------------------------------------------

  fetchVideos = () => {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)

    // ---------------------------------on api success------------------------------------------------------

    if (response.ok) {
      const data = await response.json()
      const videodetails = data.video_details
      const {channel} = videodetails
      this.setState({
        videoUrl: videodetails.video_url,
        videoDetails: videodetails,
        channel,
        isLoading: false,
      })
    }
    // -----------------------------------on api failure----------------------------------------------------
    else {
      this.setState({isLoading: false, isApiError: true})
    }
  }

  changeLikeStatus = () => {
    let {videoDetails} = this.state
    if (videoDetails.isLiked === undefined || videoDetails.isLiked === false) {
      videoDetails = {...videoDetails, isLiked: true}
    } else {
      videoDetails = {...videoDetails, isLiked: false}
    }
    this.setState({videoDetails})
  }

  changeSaveStatus = () => {
    let {videoDetails} = this.state
    if (videoDetails.isSaved === undefined || videoDetails.isSaved === false) {
      videoDetails = {...videoDetails, isSaved: true}
    } else {
      videoDetails = {...videoDetails, isSaved: false}
    }
    this.setState({videoDetails})
  }

  // ---------------------------------------------------------------------------------------
  // -------------------------------RENDERING MAIN--------------------------------------------------------
  // ---------------------------------------------------------------------------------------

  render() {
    const {videoUrl, videoDetails, channel, isLoading, isApiError} = this.state
    // ---------------------------------JSX PORTION------------------------------------------------------
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme, changeSavedList} = value
          const updateSaveList = () => {
            changeSavedList(videoDetails)
          }
          const renderVideoStatus = () => (
            <div className="d-flex">
              <P isDarkTheme={isDarkTheme}>{channel.subscriber_count} views</P>
              <div className="d-flex">
                <Button type="button" onClick={this.changeLikeStatus}>
                  <P isDarkTheme={isDarkTheme}>
                    {videoDetails.isLiked ? (
                      <Span isLiked>Dislike</Span>
                    ) : (
                      'Like'
                    )}
                  </P>
                </Button>
                <Button type="button" onClick={this.changeSaveStatus}>
                  <P isDarkTheme={isDarkTheme} onClick={updateSaveList}>
                    {videoDetails.isSaved ? 'Saved' : 'Save'}
                  </P>
                </Button>
              </div>
            </div>
          )

          return (
            <div className="video-Detailed-container">
              <Navbar />
              <div className="videoDetailed-body-container">
                <LeftNavSection />
                <RightSection
                  isDarkTheme={isDarkTheme}
                  data-testid="videoItemDetails"
                >
                  <div className="player-container">
                    {isLoading ? (
                      <div className="loader-container" data-testid="loader">
                        <Loader
                          type="ThreeDots"
                          color="red"
                          height="50"
                          width="50"
                        />
                      </div>
                    ) : !isApiError ? (
                      <>
                        <ReactPlayer url={videoUrl} controls width="100%" />
                        <P isDarkTheme={isDarkTheme}>{videoDetails.title}</P>
                        {renderVideoStatus()}
                        <hr />
                      </>
                    ) : (
                      <ApiError fetchVideos={this.fetchVideos} />
                    )}
                  </div>
                </RightSection>
              </div>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default VideoDetails
