import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import WatchContext from './context/WatchContext'
import './App.css'
import SavedVideos from './components/SavedVideos'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoDetails from './components/VideoDetails'

class App extends Component {
  state = {isDarkTheme: false, activeLink: 1, savedVideosList: []}

  changeTheme = () => {
    this.setState(prev => ({isDarkTheme: !prev.isDarkTheme}))
  }

  changeActiveLink = id => {
    this.setState({activeLink: id})
  }

  changeSavedList = newVideoItem => {
    const {savedVideosList} = this.state
    let modList = savedVideosList.filter(
      videoItem => videoItem.id === newVideoItem.id,
    )
    if (modList.length !== 1) {
      modList = [...savedVideosList, newVideoItem]
    }
    console.log(modList)
    this.setState({savedVideosList: modList})
  }

  render() {
    const {isDarkTheme, activeLink, savedVideosList} = this.state
    return (
      <WatchContext.Provider
        value={{
          isDarkTheme,
          changeTheme: this.changeTheme,
          activeLink,
          changeActiveLink: this.changeActiveLink,
          savedVideosList,
          changeSavedList: this.changeSavedList,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute path="/videos/:id" component={VideoDetails} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </WatchContext.Provider>
    )
  }
}

export default App
