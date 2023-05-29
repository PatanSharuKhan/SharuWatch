import './index.css'
import Loader from 'react-loader-spinner'

const Buffer = () => (
  <div className="loader-container" data-testid="loader">
    <Loader type="ThreeDots" color="red" height="50" width="50" />
  </div>
)

export default Buffer
