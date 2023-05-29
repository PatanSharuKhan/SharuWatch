import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {BiJoystick, BiListPlus} from 'react-icons/bi'
import {
  LeftContainer,
  P,
  LeftBottomContainer,
  ListItem,
  List,
} from './styledComponents'
import WatchContext from '../../context/WatchContext'

const navItemsList = [
  {
    id: 1,
    name: 'Home',
    value: '/',
    icon: <AiFillHome className="nav-icons " />,
  },
  {
    id: 2,
    name: 'Trending',
    value: '/trending',
    icon: <HiFire className="nav-icons" />,
  },
  {
    id: 3,
    name: 'Gaming',
    value: '/gaming',
    icon: <BiJoystick className="nav-icons" />,
  },
  {
    id: 4,
    name: 'Saved Videos',
    value: '/saved-videos',
    icon: <BiListPlus className="nav-icons" />,
  },
]

class LeftNavSection extends Component {
  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme, activeLink, changeActiveLink} = value

          const renderNavLinks = () =>
            navItemsList.map(each => {
              const code1 = each.id === activeLink ? 'active-light' : null
              const code2 = each.id === activeLink ? 'active-dark' : null
              const active = isDarkTheme ? code2 : code1
              const code3 = each.id === activeLink ? 'icon-red' : 'icon-light'
              const code4 = each.id === activeLink ? 'icon-red' : 'icon-grey'
              const activeBtn = isDarkTheme ? code3 : code4
              const changeRoute = () => {
                changeActiveLink(each.id)
              }
              return (
                <ListItem key={each.id} className={active}>
                  <Link to={`${each.value}`}>
                    <button
                      type="button"
                      className={`${activeBtn} d-flex-btn`}
                      onClick={changeRoute}
                    >
                      {each.icon}

                      <P isDarkTheme={isDarkTheme}>{each.name}</P>
                    </button>
                  </Link>
                </ListItem>
              )
            })

          return (
            <LeftContainer isDarkTheme={isDarkTheme}>
              <List>{renderNavLinks()}</List>
              <LeftBottomContainer>
                <P isDarkTheme={isDarkTheme}>CONTACT US</P>
                <div className="social-icons-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                    alt="facebook logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                    alt="twitter logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                  />
                </div>
                <P isDarkTheme={isDarkTheme}>
                  Enjoy! Now to see your channels and recommendations!
                </P>
              </LeftBottomContainer>
            </LeftContainer>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}
export default LeftNavSection
