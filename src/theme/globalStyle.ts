import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
  }
  body {
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
  }  

  .MuiTypography-h4 {
    overflow-wrap: break-word;
    font-size: 1.5rem !important;
    @media screen and (min-width: 600px) {
      font-size: 2rem !important;
    }
    @media screen and (min-width: 1024px) {
      font-size: 2.125rem !important;
    }
  }
  .MuiTypography-h6 {
    overflow-wrap: break-word;
    font-size: 1.10rem !important;
    @media screen and (min-width: 600px) {
      font-size: 1.15rem !important;
    }
    @media screen and (min-width: 1024px) {
      font-size: 1.25rem !important;
    }
  }
`;
