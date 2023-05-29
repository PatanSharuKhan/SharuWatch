import './index.css'
import WatchContext from '../../context/WatchContext'

const ApiError = props => {
  const {fetchVideos} = props
  return (
    <WatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <div className={`api-error-sec ${isDarkTheme ? 'text-light' : null}`}>
            <img
              className="failure-img"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button type="button" onClick={fetchVideos}>
              Retry
            </button>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )
}
export default ApiError
