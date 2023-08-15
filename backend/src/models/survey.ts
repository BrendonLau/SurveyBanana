import { Schema } from 'mongoose'
import questionSchema from './question'
import attemptSchema from './attempt'

const surveySchema: Schema = new Schema(
  {
    uuid: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    questions: [questionSchema],
    attempts: [attemptSchema]
  }
)

export default surveySchema
