import { Schema } from 'mongoose'

const questionSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: true
    },
    choices: {
      type: [String],
      required: true
    },
    required: Boolean
  }
)

export default questionSchema
