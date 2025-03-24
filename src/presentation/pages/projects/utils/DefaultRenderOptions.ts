import { RenderResponse } from './getRenderIconByStatusAndRole'

export namespace DefaultRenderOption {
  export const INITIAL: RenderResponse = {
    Icon: {
      SUBMIT: false,
      COMMENTS: false,
      EDIT: false,
      DELETE: false,
      EVALUATE: false,
      REPORT: false,
    },
  }

  export const DIRECTOR: RenderResponse = {
    Icon: {
      SUBMIT: false,
      COMMENTS: true,
      EDIT: true,
      DELETE: true,
      EVALUATE: true,
      REPORT: true,
    },
  }

  export const DRAFT_DIRECTOR: RenderResponse = {
    Icon: {
      SUBMIT: true,
      COMMENTS: false,
      EDIT: true,
      DELETE: true,
      EVALUATE: false,
      REPORT: false,
    },
  }
}
