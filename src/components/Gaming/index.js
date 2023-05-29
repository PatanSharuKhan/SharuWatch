import {Component} from 'react'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import WatchContext from '../../context/WatchContext'
import LeftNavSection from '../LeftNavSection'
import RightSection from '../../StyledComponents'
import Buffer from '../Buffer'
import './index.css'
import ApiError from '../ApiError'
import {
  GamingHeader,
  H,
  P,
  GamingList,
  ListItem,
  ItemImage,
} from './styledComponents'

class Gaming extends Component {
  state = {
    isLoading: false,
    isApiError: false,
    list: [],
  }

  componentDidMount() {
    this.fetchGames()
  }

  fetchGames = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      this.onApiSuccess(response)
    } else {
      this.onApiFailure()
    }
  }

  onApiSuccess = async response => {
    const data = await response.json()
    const {videos} = data
    this.setState({isLoading: false, list: videos})
  }

  onApiFailure = () => {
    this.setState({isLoading: false, isApiError: true})
  }

  fetchVideos = () => {
    this.fetchGames()
  }

  renderBuffer = () => <Buffer />

  renderContent = isDarkTheme => {
    const {isApiError, list} = this.state
    if (isApiError) {
      return <ApiError fetchVideos={this.fetchVideos} />
    }
    return (
      <>
        <GamingHeader isDarkTheme={isDarkTheme}>
          <H isDarkTheme={isDarkTheme}>Gaming</H>
        </GamingHeader>
        <GamingList>
          {list.map(each => (
            <ListItem key={each.id}>
              <ItemImage src={each.thumbnail_url} alt="video thumbnail" />
              <P isDarkTheme={isDarkTheme}>
                <b>{each.title}</b>
              </P>
              <P isDarkTheme={isDarkTheme}>
                {each.view_count} Watching Worldwide
              </P>
            </ListItem>
          ))}
        </GamingList>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <div className="gaming-container">
              <Navbar />
              <div className="gaming-body-container">
                <LeftNavSection />
                <RightSection isDarkTheme={isDarkTheme} data-testid="gaming">
                  {isLoading
                    ? this.renderBuffer()
                    : this.renderContent(isDarkTheme)}
                </RightSection>
              </div>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default Gaming
