import { type ISurvey } from './survey'

export interface IUser {
  uuid: string
  email: string
  surveys: ISurvey[]
}
