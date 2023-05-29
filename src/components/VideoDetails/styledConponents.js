import styled from 'styled-components'

export const P = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: ${props => (props.isDarkTheme ? '#ffffff' : 'black')};
  cursor: pointer;
`

export const Button = styled.button`
  background-color: transparent;
  border: 0px;
`
export const Span = styled.span`
  color: ${props => props.isLiked && 'Blue'};
`
