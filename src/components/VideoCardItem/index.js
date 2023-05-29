import {ProfileTitle, P} from './styledComponents'
import WatchContext from '../../context/WatchContext'

const VideoCardItem = props => {
  const {obj} = props
  const {channel} = obj
  return (
    <WatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <>
            <img
              src={obj.thumbnail_url}
              alt="video thumbnail"
              className="thumbnail"
            />
            <ProfileTitle>
              <img
                src={channel.profile_image_url}
                alt="channel logo"
                className="channel-logo"
              />
              <div>
                <P isDarkTheme={isDarkTheme}>{obj.title}</P>
                <P isDarkTheme={isDarkTheme}>{channel.name}</P>
                <P isDarkTheme={isDarkTheme}>
                  {obj.view_count} views . {obj.published_at}
                </P>
              </div>
            </ProfileTitle>
          </>
        )
      }}
    </WatchContext.Consumer>
  )
}

export default VideoCardItem
