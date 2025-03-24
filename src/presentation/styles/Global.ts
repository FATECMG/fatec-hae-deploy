import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

    :root{
        --bs-body-line-height: normal;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        background: ${({ theme }) => theme['white-200']};
        color: #333;
    }

    body, input, textarea, button{
        font-size: 1rem;
    }

    /* Works on Firefox */
    * {
        scrollbar-width: thin;
        scrollbar-color: #AFAFAF #DBDBDB;
    }

    /* Works on Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
        width: 11px;
    }

    *::-webkit-scrollbar-track {
        background: #DBDBDB;
    }

    *::-webkit-scrollbar-thumb {
        background: #AFAFAF;
        border-radius: 10px;
    }
`
