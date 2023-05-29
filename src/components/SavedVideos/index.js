import {Component} from 'react'
import Navbar from '../Navbar'
import WatchContext from '../../context/WatchContext'
import LeftNavSection from '../LeftNavSection'
import RightSection from '../../StyledComponents'
import {
  H,
  P,
  NoSavedImage,
  NoSavedContainer,
  SavedVideosList,
  ListItem,
} from './styledComponents'
import './index.css'

class SavedVideos extends Component {
  state = {videosList: []}

  renderVideos = savedVideosList => (
    <SavedVideosList>
      {savedVideosList.map(videoItem => (
        <ListItem key={videoItem.id}>
          <h1>{videoItem.isSaved}</h1>
        </ListItem>
      ))}
    </SavedVideosList>
  )

  renderNoSaved = () => (
    <NoSavedContainer>
      <NoSavedImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <H>No saved videos found</H>
      <P>You can save your videos while watching them</P>
    </NoSavedContainer>
  )

  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme, savedVideosList} = value
          return (
            <div className="saved-videos-container">
              <Navbar />
              <div className="saved-videos-body-container">
                <LeftNavSection />
                <RightSection
                  isDarkTheme={isDarkTheme}
                  data-testid="savedVideos"
                >
                  {savedVideosList.length !== 0
                    ? this.renderVideos(savedVideosList)
                    : this.renderNoSaved()}
                </RightSection>
              </div>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default SavedVideos
