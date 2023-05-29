import {Component} from 'react'
import Cookies from 'js-cookie'
import WatchContext from '../../context/WatchContext'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isLoginError: false,
    inputType: 'password',
  }

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value, isLoginError: false})
  }

  changePassword = event => {
    this.setState({password: event.target.value, isLoginError: false})
  }

  fetchData = async (username, password) => {
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 3})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({isLoginError: true})
    }
  }

  logUser = event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username === '' || password === '') {
      this.setState({isLoginError: true})
    } else {
      this.fetchData(username, password)
    }
  }

  changeInputType = event => {
    if (event.target.checked) {
      this.setState({inputType: 'text'})
    } else {
      this.setState({inputType: 'password'})
    }
  }

  render() {
    const {username, password, isLoginError, inputType} = this.state
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const webLogoUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          const renderLogo = () => (
            <img
              src={webLogoUrl}
              alt="website logo"
              className="website-logo web-logo"
            />
          )
          const renderUsernameField = () => (
            <>
              <label htmlFor="username" className="login-label">
                USERNAME
              </label>
              <input
                type="text"
                placeholder="Username"
                className="login-input"
                id="username"
                onChange={this.changeUsername}
                value={username}
              />
            </>
          )
          const renderPasswordField = () => (
            <>
              <label htmlFor="password" className="login-label">
                PASSWORD
              </label>
              <input
                type={inputType}
                placeholder="Password"
                className="login-input"
                id="password"
                onChange={this.changePassword}
                value={password}
              />
            </>
          )
          const renderShowPassword = () => (
            <div className="check-container">
              <input
                type="checkbox"
                className="login-checkbox"
                id="loginCheckbox"
                onChange={this.changeInputType}
              />
              <label htmlFor="loginCheckbox" className="show-label">
                Show Password
              </label>
            </div>
          )

          const renderLoginButton = () => (
            <button type="submit" className="login-btn">
              Login
            </button>
          )

          const renderLoginError = () => (
            <>
              {isLoginError && <p>*Username and Password didn&apos;t match</p>}
              {!isLoginError && null}
            </>
          )

          return (
            <div className="login-container">
              <form className="form-container" onSubmit={this.logUser}>
                {renderLogo()}
                {renderUsernameField()}
                {renderPasswordField()}
                {renderShowPassword()}
                {renderLoginButton()}
                {renderLoginError()}
              </form>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default Login
