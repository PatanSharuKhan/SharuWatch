import {BsMoon, BsSun} from 'react-icons/bs'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {NavbarContainer, LogoutButton, ThemeButton} from './styledComponents'
import WatchContext from '../../context/WatchContext'
import './index.css'

class Navbar extends Component {
  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme, changeTheme} = value
          const webLogoUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const removePermission = () => {
            const {history} = this.props
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          const renderWebsiteLogo = () => (
            <Link to="/">
              <img
                src={webLogoUrl}
                alt="website logo"
                className="website-logo"
              />
            </Link>
          )
          const renderNavLinks = () => (
            <ul className="nav-links-container">
              <li>
                <ThemeButton
                  type="button"
                  onClick={changeTheme}
                  data-testid="theme"
                >
                  {isDarkTheme ? (
                    <BsSun className="sun-icon" fill="white" />
                  ) : (
                    <BsMoon className="moon-icon" />
                  )}
                </ThemeButton>
              </li>
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="avatar"
                />
              </li>
              <li>
                <Popup
                  modal
                  trigger={
                    <LogoutButton isDarkTheme={isDarkTheme}>
                      Logout
                    </LogoutButton>
                  }
                  className="popup-content"
                >
                  {close => (
                    <div>
                      <h1 className="popup-title">
                        Are you sure you want to logout?
                      </h1>
                      <button type="button" onClick={() => close()}>
                        Cancel
                      </button>
                      <button type="button" onClick={removePermission}>
                        Confirm
                      </button>
                    </div>
                  )}
                </Popup>
              </li>
            </ul>
          )

          return (
            <NavbarContainer isDarkTheme={isDarkTheme}>
              {renderWebsiteLogo()}
              {renderNavLinks()}
            </NavbarContainer>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}
export default withRouter(Navbar)
