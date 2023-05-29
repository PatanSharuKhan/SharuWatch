import './index.css'
import WatchContext from '../../context/WatchContext'

const NoResults = props => {
  const {fetchVideos} = props
  return (
    <WatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <div className="no-results-container">
            <img
              className="not-found-img"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
              alt="not found"
            />
            <h1>No Search results found</h1>
            <p>Try different keywords or remove search filter.</p>
            <button type="button" onClick={fetchVideos}>
              Retry
            </button>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )
}
export default NoResults
