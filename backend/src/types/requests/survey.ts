import { type ISurvey } from '../models/survey'

export interface IAddSurveyReq extends ISurvey {
  user_uuid: string
}

export interface IEditSurveyReq extends ISurvey {
  user_uuid: string
  survey_uuid: string
}

export interface ISurveyReq {
  user_uuid: string
  survey_uuid: string
}

export interface IGetSurveysReq {
  user_uuid: string
}

export interface IAddSurveyAnsReq {
  user_uuid: string
  survey_uuid: string
  answers: Array<{
    description: string
    answer: string
    required: boolean
  }>
}
