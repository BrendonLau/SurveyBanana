import { type ISurvey } from './survey'

export interface ISurveyReq extends ISurvey {
  user_uuid: string
}

export interface IGetSurveysReq {
  user_uuid: string
}

export interface IDeleteSurveysReq {
  user_uuid: string
  survey_uuid: string
}

export interface IGetSurveyQuestionReq {
  user_uuid: string
  survey_uuid: string
}

export interface IAddSurveyAttemptReq {
  user_uuid: string
  survey_uuid: string
  answers: Array<{
    description: string
    answer: string
  }>
}

export interface IGetSurveyAttemptsReq {
  user_uuid: string
  survey_uuid: string
}
