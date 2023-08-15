import { Schema } from 'mongoose'

const attemptSchema: Schema = new Schema(
  {
    timestamp: Date,
    answers: [{
      description: String,
      answer: String
    }]
  }
)

export default attemptSchema
