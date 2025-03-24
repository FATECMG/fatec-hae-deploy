const apiUrl = import.meta.env.VITE_API_URL
const statisticsApiUrl = import.meta.env.VITE_STATISTICS_API_URL

const genericValidationError = import.meta.env.VITE_GENERIC_VALIDATION_ERROR

const addressNotFound = import.meta.env.VITE_ADDRESS_NOT_FOUND

const courseNotFoundAll = import.meta.env.VITE_COURSE_NOT_FOUND_ALL
const courseNotFoundOne = import.meta.env.VITE_COURSE_NOT_FOUND_ONE
const courseUpdate = import.meta.env.VITE_COURSE_UPDATE
const courseDelete = import.meta.env.VITE_COURSE_DELETE

const noticeNotFoundAll = import.meta.env.VITE_NOTICE_NOT_FOUND_ALL
const noticeDelete = import.meta.env.VITE_NOTICE_DELETE

const projectNotFoundAll = import.meta.env.VITE_PROJECT_NOT_FOUND_ALL
const projectDelete = import.meta.env.VITE_PROJECT_DELETE
const projectSubmit = import.meta.env.VITE_PROJECT_SUBMIT
const projectEvaluation = import.meta.env.VITE_PROJECT_EVALUATION

const schoolNotFoundAll = import.meta.env.VITE_SCHOOL_NOT_FOUND_ALL
const schoolDelete = import.meta.env.VITE_SCHOOL_DELETE

const userNotFoundAll = import.meta.env.VITE_USER_NOT_FOUND_ALL
const userNotFoundOne = import.meta.env.VITE_USER_NOT_FOUND_ONE
const userDelete = import.meta.env.VITE_USER_DELETE

const roleNotFoundAll = import.meta.env.VITE_ROLE_NOT_FOUND_ALL

const reportNotFoundAll = import.meta.env.VITE_REPORT_NOT_FOUND_ALL
const reportNotFoundOne = import.meta.env.VITE_REPORT_NOT_FOUND_ONE

export const env = {
  API_URL: apiUrl,
  STATISTICS_API_URL: statisticsApiUrl,

  GENERIC_VALIDATION_ERROR: genericValidationError,

  ADDRESS_NOT_FOUND: addressNotFound,

  COURSE_NOT_FOUND_ALL: courseNotFoundAll,
  COURSE_NOT_FOUND_ONE: courseNotFoundOne,
  COURSE_UPDATE: courseUpdate,
  COURSE_DELETE: courseDelete,

  NOTICE_NOT_FOUND_ALL: noticeNotFoundAll,
  NOTICE_DELETE: noticeDelete,

  PROJECT_NOT_FOUND_ALL: projectNotFoundAll,
  PROJECT_DELETE: projectDelete,
  PROJECT_SUBMIT: projectSubmit,
  PROJECT_EVALUATION: projectEvaluation,

  SCHOOL_NOT_FOUND_ALL: schoolNotFoundAll,
  SCHOOL_DELETE: schoolDelete,

  USER_NOT_FOUND_ALL: userNotFoundAll,
  USER_NOT_FOUND_ONE: userNotFoundOne,
  USER_DELETE: userDelete,

  ROLE_NOT_FOUND_ALL: roleNotFoundAll,

  REPORT_NOT_FOUND_ALL: reportNotFoundAll,
  REPORT_NOT_FOUND_ONE: reportNotFoundOne,
}
