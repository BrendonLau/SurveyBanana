import { type Document } from 'mongoose'
import { type ISurvey } from './survey'

export interface IUser extends Document {
  uuid: string
  email: string
  surveys: ISurvey[]
}
