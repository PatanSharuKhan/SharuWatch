import styled from 'styled-components'

export const LeftContainer = styled.div`
  width: 25vw;
  height: 90vh;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#ffffff')};
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    display: none;
  }
`
export const P = styled.p`
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`
export const Heading = styled.h1`
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`
export const LeftBottomContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`
export const List = styled.ul`
  padding-left: 0px;
`

export const ListItem = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  background-color: ${props => (props.isDarkTheme ? 'grey' : '')};
`
