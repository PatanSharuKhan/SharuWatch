import {createContext} from 'react'

const WatchContext = createContext({
  isDarkTheme: false,
  activeLink: '1',
  savedVideosList: [],
  changeTheme: () => {},
  changeActiveLink: () => {},
  changeSavedList: () => {},
})

export default WatchContext
