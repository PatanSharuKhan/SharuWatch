import {Component} from 'react'
import Navbar from '../Navbar'
import WatchContext from '../../context/WatchContext'
import LeftNavSection from '../LeftNavSection'
import RightSection from '../../StyledComponents'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const renderNotFound = () => {
            const bgClass = isDarkTheme ? 'bg-black' : 'bg-light'
            const textClass = isDarkTheme ? 'text-light' : 'text-dark'
            const imgUrl = isDarkTheme
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
            return (
              <div className={`display-column-center-center ${bgClass}`}>
                <img src={imgUrl} alt="not found" className="not-found-image" />
                <h1 className={textClass}>Page Not Found</h1>
                <p className={textClass}>
                  We are sorry, the page you requested could not be found.
                </p>
              </div>
            )
          }
          return (
            <div className="not-found-container">
              <Navbar />
              <div className="not-found-body-container">
                <LeftNavSection />
                <RightSection>{renderNotFound()}</RightSection>
              </div>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default NotFound
