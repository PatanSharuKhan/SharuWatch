import styled from 'styled-components'

export const GamingList = styled.ul`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding-left: 0px;
`
export const GamingHeader = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${props => (props.isDarkTheme ? '#212222' : 'lightgrey')};
`

export const H = styled.h1`
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`

export const P = styled.p`
  margin-left: 10px;
  color: ${props => (props.isDarkTheme ? 'white' : 'black')};
`

export const ListItem = styled.li`
  width: 30%;
  box-shadow: 0px 4px 12px 0px grey;
  list-style-type: none;
  border-radius: 10px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    width: 45%;
  }
  @media screen and (max-width: 526px) {
    width: 100%;
  }
`
export const ItemImage = styled.img`
  width: 100%;
`
