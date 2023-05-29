import styled from 'styled-components'

export const P = styled.p`
  color: ${props => (props.isDarkTheme ? '#ffffff' : 'black')};
`
export const H = styled.h1`
  color: ${props => (props.isDarkTheme ? '#ffffff' : 'black')};
`
export const NoSavedImage = styled.img`
  width: 70%;
`
export const NoSavedContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const SavedVideosList = styled.ul`
  padding-left: 0px;
  display: flex;
`
export const ListItem = styled.li`
  list-style-type: none;
`
