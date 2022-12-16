import { createGlobalStyle } from 'styled-components';

import { scrollbars } from './container/design/Styled';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    line-height: 1.5;
    font-size: 16px;
    ${scrollbars};
    scroll-behavior: smooth;
  }

  body {
    font-family: Montserrat;
  }

  body.fontLoaded {
    font-family: Montserrat;
  }

  #app {
    background-color: #eceef6;
    user-select: none;
    height: 100%;
    width: 100%;
    min-height: 100%;
    min-width: 100%;

    @media (min-width: 320px) and (max-width: 767px) {
      overflow: auto;
      overflow-x: hidden;
      ${scrollbars}; 
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
  } 

  .modal-dialog {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    margin: auto;
    height: 100%;
  }

  .modal-dialog.delete-confirmation-modal {
    max-width: 393px;
  
    h5 {
      font-size: 16px;
      color: #d81212;
      font-weight: 600;
      line-height: 1.5;
    }

    button {
      width: 100px;
      height: 45px;
      padding: 0;
      font-size: 14px;
    }
  
    .modal-body {
      max-height: auto;
      overflow: hidden;
    }
  
    .modal-content {
      border-radius: 8px;
    }
  }
`;

export default GlobalStyle;
