import styled from 'styled-components'

export const ProfileTitle = styled.div`
  display: flex;
`
export const Heading = styled.h1`
  font-size: 16px;
  color: ${props => (props.isDarkTheme ? '#ffffff' : 'black')};
`
export const P = styled.p`
  color: ${props => (props.isDarkTheme ? '#ffffff' : 'black')};
  margin-bottom: 4px;
  margin-top: 0px;
`
