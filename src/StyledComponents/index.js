import styled from 'styled-components'

const RightSection = styled.div`
  width: 100vw;
  height: 90vh;
  overflow-y: auto;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#ffffff')};
  @media screen and (min-width: 768px) {
    width: 75vw;
  }
`
export default RightSection
