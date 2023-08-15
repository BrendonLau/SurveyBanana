import { type IUser } from '../types/models/user'
import { model, Schema } from 'mongoose'
import surveySchema from './survey'

const userSchema: Schema = new Schema(
  {
    uuid: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    surveys: [surveySchema]
  }
)

export default model<IUser>('User', userSchema)
