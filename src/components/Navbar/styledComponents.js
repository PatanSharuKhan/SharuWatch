import styled from 'styled-components'

export const NavbarContainer = styled.div`
  width: 100vw;
  height: 10vh;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => (props.isDarkTheme ? '#181818' : 'white')};
`

export const LogoutButton = styled.button`
  background-color: transparent;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  color: ${props => (props.isDarkTheme ? 'white' : 'rgb(65, 4, 145)')};
  border: 1px solid
    ${props => (props.isDarkTheme ? 'white' : 'rgb(65, 4, 145)')};
`
export const ThemeButton = styled.button`
  background-color: transparent;
  border: 0px;
  cursor: pointer;
`
