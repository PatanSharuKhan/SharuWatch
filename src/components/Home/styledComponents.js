import styled from 'styled-components'

export const BannerContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
`

export const List = styled.ul`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding-left: 0px;
`
export const ListItem = styled.li`
  width: 30%;
  list-style-type: none;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    width: 45%;
  }
  @media screen and (max-width: 526px) {
    width: 95%;
  }
`
