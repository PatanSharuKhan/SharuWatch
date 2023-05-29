import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {ImCross} from 'react-icons/im'
import {BsSearch} from 'react-icons/bs'
import Buffer from '../Buffer'
import ApiError from '../ApiError'
import Navbar from '../Navbar'
import WatchContext from '../../context/WatchContext'
import LeftNavSection from '../LeftNavSection'
import RightSection from '../../StyledComponents'
import {BannerContainer, List, ListItem} from './styledComponents'
import './index.css'
import NoResults from '../NoResults'
import VideoCardItem from '../VideoCardItem'

class Home extends Component {
  state = {
    bannerStatus: true,
    userInput: '',
    searchInput: '',
    isLoading: false,
    videosList: [],
    isApiError: false,
  }

  componentDidMount() {
    this.fetchVideos()
  }

  // --------------------------------fetching videos data--------------------------------------------------

  fetchVideos = async () => {
    this.setState({isLoading: true})
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    // --------------------------------on api success--------------------------------------------------

    if (response.ok) {
      const data = await response.json()
      const {videos} = data
      this.setState({videosList: videos, isLoading: false})
    }
    // --------------------------------on api failure-------------------------------------------------
    else {
      this.setState({isApiError: true, isLoading: false})
    }
  }

  changeBannerStatus = () => {
    this.setState({bannerStatus: false})
  }

  fetchData = () => {
    const {userInput} = this.state
    this.setState({searchInput: userInput}, this.fetchVideos)
  }

  changeInput = event => {
    this.setState({userInput: event.target.value})
  }

  renderBanner = () => (
    // ----------------------------------banner code------------------------------------------------

    <BannerContainer data-testid="banner">
      <div className="flex-space-between">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="website-logo"
        />
        <button
          type="button"
          onClick={this.changeBannerStatus}
          className="banner-cross-btn"
          data-testid="close"
        >
          <ImCross />
        </button>
      </div>
      <p className="banner-desc">
        Buy Nxt Watch Premium prepaid plans with UPI
      </p>
      <button type="button" className="get-now-btn">
        GET IT NOW
      </button>
    </BannerContainer>
  )

  renderInput = isDarkTheme => (
    // --------------------------------user input code--------------------------------------------------

    <div className="input-container">
      <input
        data-testid="search"
        type="search"
        className={`search-input ${isDarkTheme ? 'bg-black' : null}`}
        onChange={this.changeInput}
        placeholder="Search"
      />
      <button
        data-testid="searchButton"
        type="button"
        className={`search-btn ${isDarkTheme ? 'bg-blackishgrey' : null}`}
        onClick={this.fetchData}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  renderVideos = () => {
    // -------------------------conditional rendering views---------------------------------------------------------

    const {videosList, isLoading, isApiError} = this.state
    if (isLoading) {
      // --------------loading view--------------
      return <Buffer />
    }
    if (isApiError) {
      // --------------api error view--------------
      return <ApiError fetchVideos={this.fetchVideos} />
    }
    if (videosList.length === 0) {
      // --------------no videos view--------------
      return <NoResults fetchVideos={this.fetchVideos} />
    }
    return (
      // --------------list videos view--------------
      <List className="videos-container">
        {videosList.map(each => (
          <ListItem key={each.id}>
            <Link to={`/videos/${each.id}`}>
              <VideoCardItem obj={each} />
            </Link>
          </ListItem>
        ))}
      </List>
    )
  }

  render() {
    const {bannerStatus} = this.state
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <div className="home-container">
              <Navbar />
              <div className="home-body-container">
                <LeftNavSection />
                <RightSection isDarkTheme={isDarkTheme} data-testid="home">
                  {bannerStatus && this.renderBanner()}
                  {this.renderInput(isDarkTheme)}
                  {this.renderVideos()}
                </RightSection>
              </div>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default Home
