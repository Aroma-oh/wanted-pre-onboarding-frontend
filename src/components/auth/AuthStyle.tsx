// styled import
import styled from 'styled-components';

export const AuthStyle = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 10vh 15vw;

  h1 {
    font-size: 2.5rem;
    margin: 1rem;
  }

  input, button {
    width: 400px;
    height: 40px;
    margin: 0.5rem;
    padding: 0 1rem;
    border: solid 1.5px black;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border: solid 1.5px black;
  }

  button {
    cursor: pointer;
    box-shadow: 6px 8px 0px 2px #FF6464;
    color: black;
    background-color: white ;
  }
  button:disabled {
    color: #979797;
  }
  button:active {
    transform: translate(4px, 6px);
    box-shadow: 0px 0px 0px 4px #FF6464;
  }

  .link {
    margin: 1rem 0;
  }

  a {
    color: black;
    text-decoration: underline;
  }
`