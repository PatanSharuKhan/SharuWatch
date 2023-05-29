import {Component} from 'react'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import WatchContext from '../../context/WatchContext'
import LeftNavSection from '../LeftNavSection'
import RightSection from '../../StyledComponents'
import {
  H,
  P,
  TrendingHeader,
  TrendingList,
  ListItem,
  ItemImage,
  ItemDesc,
} from './styledComponents'
import ApiError from '../ApiError'
import Buffer from '../Buffer'
import './index.css'

class Trending extends Component {
  state = {
    isLoading: false,
    isApiError: false,
    list: [],
  }

  componentDidMount = () => {
    this.fetchTrending()
  }

  fetchTrending = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.onApiSuccess(data)
    } else {
      this.onApiFailure()
    }
  }

  onApiSuccess = data => {
    const {videos} = data
    this.setState({isLoading: false, list: videos})
  }

  onApiFailure = () => {
    this.setState({isLoading: false, isApiError: true})
  }

  fetchVideos = () => {
    this.fetchTrending()
  }

  renderBuffer = () => <Buffer />

  renderContent = isDarkTheme => {
    const {isApiError, list} = this.state
    if (isApiError) {
      return <ApiError fetchVideos={this.fetchVideos} />
    }
    return (
      <>
        <TrendingHeader isDarkTheme={isDarkTheme}>
          <H isDarkTheme={isDarkTheme}>Trending</H>
        </TrendingHeader>
        <TrendingList>
          {list.map(each => (
            <ListItem key={each.id}>
              <ItemImage src={each.thumbnail_url} alt="video thumbnail" />
              <ItemDesc>
                <P isDarkTheme={isDarkTheme}>
                  <b>{each.title}</b>
                </P>
                <P isDarkTheme={isDarkTheme}>
                  {each.view_count} Watching Worldwide
                </P>
              </ItemDesc>
            </ListItem>
          ))}
        </TrendingList>
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
            <div className="trending-container">
              <Navbar />
              <div className="trending-body-container">
                <LeftNavSection />
                <RightSection isDarkTheme={isDarkTheme} data-testid="trending">
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

export default Trending
