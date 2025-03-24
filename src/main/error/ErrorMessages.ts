/* eslint-disable @typescript-eslint/no-namespace */

import { env } from '@/config/env/Environment'

export namespace DefaultErrorMessages {
  export const GENERIC = {
    validationError: env.GENERIC_VALIDATION_ERROR,
  }

  export const ADDRESS = {
    notFound: env.ADDRESS_NOT_FOUND,
  }

  export const COURSE = {
    notFoundAll: env.COURSE_NOT_FOUND_ALL,
    notFoundOne: env.COURSE_NOT_FOUND_ONE,
    update: env.COURSE_UPDATE,
    delete: env.COURSE_DELETE,
  }

  export const NOTICE = {
    notFoundAll: env.NOTICE_NOT_FOUND_ALL,
    delete: env.NOTICE_DELETE,
  }

  export const PROJECT = {
    notFoundAll: env.PROJECT_NOT_FOUND_ALL,
    delete: env.PROJECT_DELETE,
    submit: env.PROJECT_SUBMIT,
    evaluation: env.PROJECT_EVALUATION,
  }

  export const SCHOOL = {
    notFoundAll: env.SCHOOL_NOT_FOUND_ALL,
    delete: env.SCHOOL_DELETE,
  }

  export const USER = {
    notFoundAll: env.USER_NOT_FOUND_ALL,
    notFoundOne: env.USER_NOT_FOUND_ONE,
    delete: env.USER_DELETE,
  }

  export const ROLE = {
    notFoundAll: env.ROLE_NOT_FOUND_ALL,
  }

  export const REPORT = {
    notFoundAll: env.REPORT_NOT_FOUND_ALL,
    notFoundOne: env.REPORT_NOT_FOUND_ONE,
  }
}
