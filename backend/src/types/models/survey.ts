import { type Document } from 'mongoose'

export interface ISurvey extends Document {
  uuid: string
  title: string
  questions: IQuestion[]
  attempts?: IAttempt[]
}

export interface IQuestion {
  description: string
  choices: string[]
  required: boolean
}

export interface IAttempt {
  timestamp: Date
  answers: Array<{
    description: string
    answer: string
  }>
}
