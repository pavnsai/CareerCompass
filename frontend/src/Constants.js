const prod = {
  url: {
    API_BASE_URL: 'https://ig5rs61ds0.execute-api.us-east-1.amazonaws.com/devl'
  }
}

const dev = {
  url: {
    // API_BASE_URL: 'http://localhost:8080'
    API_BASE_URL: 'https://ig5rs61ds0.execute-api.us-east-1.amazonaws.com/devl'
  }
}
export const urlPaths={
  SIGNUP:'/auth/signup',
  AUTHENTICATE:'/auth/authenticate',
  CHECK_USER_REGISTRATION_STATUS:'/public/checkUserRegistrationStatus/',
  SEND_VERIFICATION:'/auth/sendVerificationChallenge',
  VALIDATE_VERIFICATION:'/auth/validateChallenge',
  FORGOT_PASSWORD_CHALLENGE:'/auth/sendForgotPasswordEmailChallenge',
  VALIDATE_FORGOT_HASH:'/auth/validateForgotPasswordEmailChallenge',
  RESET_FORGOT_PASSWORD_CHALLENGE:'/auth/resetForgotPasswordEmailChallenge',
  GET_UNARCHIVED_JOB_APPLICATIONS:'/tracker/inbox/',
  GET_ALL_TAGS:'/tags/getAllTags/',
  CREATE_TAG:'/tags/createTag',
  UPDATE_TAG:'/tags/updateTag',
  ARCHIVE_JOB_APPLICATION:'/tracker/archiveJobApplication/',
  GET_ARCHIVED_JOB_APPLICATIONS:'/tracker/archive/',
  UNARCHIVE_JOB_APPLICATION:'/tracker/unarchiveJobApplication/',
  UPDATE_JOB_APPLICATION:'/tracker/updateJobApplication',
  CREATE_JOB_APPLICATION:'/tracker/createJobApplication',
  UPDATE_STAR:'/tracker/updateJobApplicationStarStatus/'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod