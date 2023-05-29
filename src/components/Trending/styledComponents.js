import styled from 'styled-components'

const LightColor = '#ffffff'

export const H = styled.h1`
  color: ${props => (props.isDarkTheme ? LightColor : 'black')};
`
export const TrendingHeader = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${props => (props.isDarkTheme ? '#222222' : 'lightgrey')};
`
export const TrendingList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0px;
`
export const ListItem = styled.li`
  list-style-type: none;
  margin-bottom: 10px;
  border: 1px solid grey;
  border-radius: 10px;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`

export const ItemDesc = styled.div`
  padding: 10px;
  flex-grow: 1;
`

export const ItemImage = styled.img`
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`
export const P = styled.p`
  color: ${props => (props.isDarkTheme ? LightColor : 'black')};
`
