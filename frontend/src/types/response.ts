import { IQuestion, type ISurvey } from './survey'

export interface AddSurveyRes {
  message: string
  status: string
}

export interface IDeleteSurveyRes {
  message: string
  status: string
}

export interface IGetSurveysRes {
  message: string
  status: string
  surveys: ISurvey[]
}

export interface IGetSurveyQuestionRes {
  message: string
  status: string
  survey: Pick<ISurvey, 'questions' | 'title' >
}

export interface IAddSurveyAttemptRes {
  message: string
  status: string
}
