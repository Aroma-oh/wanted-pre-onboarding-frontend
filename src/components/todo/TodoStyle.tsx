// styled import
import styled from 'styled-components';

export const TodoStyle = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 10vh 15vw;

  h1 {
    font-size: 2.5rem;
    margin: 1rem 0;
  }

  form, li, div {
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: center;
    margin: 1rem 0;
  }

  input[type='text'] {
    width: 419.2px;
    height: 40px;
    padding: 0 1rem;
    border: solid 1.5px black;
    box-sizing: border-box;
  }

  input[type='text']:focus {
    outline: none;
    border: solid 1.5px black;
  }

  input[type="checkbox"] {
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
  }

  span {
    width: 400px;
    height: 40px;
    padding-left: 1.2rem;

    display: flex;
    align-items: center;
    border-bottom: solid 1px;
  }

  button {
    width: 60px;
    height: 40px;
    margin-left: 0.5rem;

    border: solid 1.5px black;
    color: black;
    background-color: white ;
    cursor: pointer;
  }
`