import styled from 'styled-components'

export const StyledContainer = styled.div`
  width: 100%;

  .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,
  .ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners {
    background: ${({ theme }) => theme['white-150']};
    border: none;
    border-radius: 4px 4px 0px 0px !important;
  }

  .ck.ck-toolbar.ck-toolbar_grouping > .ck-toolbar__items {
    background: ${({ theme }) => theme['white-150']};
  }

  .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
    background: ${({ theme }) => theme['white-150']};
    border: none;
    border-top: 1px solid ${({ theme }) => theme['white-350']};
    border-radius: 0px 0px 4px 4px;
  }

  .ck-rounded-corners .ck.ck.ck-editor__main > .ck-editor__editable,
  .ck.ck-editor__main > .ck.ck-editor__editable.ck-rounded-corners {
    background: ${({ theme }) => theme['white-150']};
    border: none;
    border-top: 1px solid ${({ theme }) => theme['white-350']};
    border-radius: 0px 0px 4px 4px;
    box-shadow: none;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
  }

  .ck-rounded-corners .ck.ck.ck-editor__main > .ck-editor__editable,
  .ck.ck-editor__main > .ck.ck-editor__editable.ck-rounded-corners p {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    text-transform: uppercase;
    word-break: break-all;
  }

  .ck.ck-editor {
    width: 100% !important;
  }

  b,
  strong {
    color: #000000;
  }
`
