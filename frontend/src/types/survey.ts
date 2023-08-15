export interface ISurvey {
  title: string
  uuid?: string
  questions: IQuestion[]
  attempts?: IAttempt[]
}

export interface IQuestion {
  description: string
  choices: string[]
  required: boolean
}

export interface IAttempt {
  answers: Array<{
    description: string
    answer: string
  }>
}
