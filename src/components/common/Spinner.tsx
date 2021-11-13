import styled, { keyframes } from 'styled-components'

const load = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }

  border-radius: 50%;
  width: 10em;
  height: 10em;
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid black;
  border-right: 1.1em solid black;
  border-bottom: 1.1em solid black;
  border-left: 1.1em solid ${({ theme }) => theme.colors.primary};
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${load} 1.1s infinite linear;
  animation: ${load} 1.1s infinite linear;
`

export function Spinner() {
  return <Loader className="loader" />
}
