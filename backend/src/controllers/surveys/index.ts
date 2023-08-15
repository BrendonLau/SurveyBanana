import { type Response, type Request } from 'express'
import { type IAttempt, type ISurvey } from '../../types/models/survey'
import { type IEditSurveyReq, type IAddSurveyReq, type IGetSurveysReq, type IAddSurveyAnsReq, type ISurveyReq } from '../../types/requests/survey'
import UserModel from '../../models/user'
import { v4 as uuidv4 } from 'uuid'
import { type IUser } from '../../types/models/user'
import { parseAsync } from 'json2csv'

const addSurvey = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IAddSurveyReq, 'user_uuid' | 'title' | 'questions'>

    const newSurvey: ISurvey = {

      uuid: uuidv4(),
      title: body.title,
      questions: body.questions
    } as ISurvey

    await UserModel.findOneAndUpdate({ uuid: body.user_uuid }, { $push: { surveys: newSurvey } })

    res
      .status(201)
      .json({ message: 'Survey added' })
  } catch (error) {
    throw error
  }
}

const editSurvey = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IEditSurveyReq, 'user_uuid' | 'survey_uuid' | 'title' | 'questions'>

    await UserModel.findOneAndUpdate({
      uuid: body.user_uuid,
      'surveys.uuid': body.survey_uuid
    }, { $set: { 'surveys.$.questions': body.questions, 'surveys.$.title': body.title } })

    res
      .status(200)
      .json({ message: 'Survey edited' })
  } catch (error) {
    throw error
  }
}

const deleteSurvey = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as ISurveyReq

    await UserModel.updateOne({ uuid: body.user_uuid },
      { $pull: { surveys: { uuid: body.survey_uuid } } })

    res
      .status(200)
      .json({ message: 'Survey deleted' })
  } catch (error) {
    throw error
  }
}

const getAllSurveys = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as IGetSurveysReq

    const result: IUser = (await UserModel.findOne({ uuid: body.user_uuid })) as IUser

    res
      .status(200)
      .json({ message: 'Surveys retrieved', surveys: result.surveys })
  } catch (error) {
    throw error
  }
}

const getSurveyQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as ISurveyReq

    const userWithSurvey: IUser = (await UserModel.findOne({ uuid: body.user_uuid, 'surveys.uuid': body.survey_uuid }, { 'surveys.$': 1 })) as IUser

    if (userWithSurvey) {
      res
        .status(200)
        .json({ message: 'Survey retrieved', survey: { questions: userWithSurvey.surveys[0].questions, title: userWithSurvey.surveys[0].title } })
    } else {
      res
        .status(404)
        .json({ message: 'Survey does not exist' })
    }
  } catch (error) {
    throw error
  }
}

const addSurveyAttempt = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as IAddSurveyAnsReq

    const newAttempt: IAttempt = {
      timestamp: new Date(),
      answers: body.answers
    }

    await UserModel.findOneAndUpdate({ uuid: body.user_uuid, 'surveys.uuid': body.survey_uuid },
      { $push: { 'surveys.$.attempts': newAttempt } })

    res
      .status(201)
      .json({ message: 'Survey attempt added' })
  } catch (error) {
    throw error
  }
}

const getSurveyAttemptsCsv = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as ISurveyReq

  const userWithSurvey: IUser = (await UserModel.findOne({
    uuid: body.user_uuid, 'surveys.uuid': body.survey_uuid
  }, { 'surveys.$': 1 })) as IUser

  if (!(userWithSurvey && userWithSurvey.surveys && userWithSurvey.surveys[0].attempts && userWithSurvey.surveys[0].attempts.length !== 0)) {
    res.status(404)
      .json({ message: 'Survey attempts not found' })
    return
  }

  const attempts: IAttempt[] = userWithSurvey.surveys[0].attempts

  interface IData {
    timestamp: string
    [key: string]: string
  }

  const resultFormat: IData[] = []
  for (let i = 0; i < attempts.length; i++) {
    const attempt = attempts[i]
    const curResultFormat: IData = { timestamp: attempt.timestamp.toLocaleString() }
    const answers = attempt.answers
    for (let j = 0; j < answers.length; j++) {
      curResultFormat[answers[j].description] = answers[j].answer
    }
    resultFormat.push(curResultFormat)
  }

  let csvFields: string[] = []
  if (resultFormat.length !== 0) {
    csvFields = Object.keys(resultFormat[0])
  }
  const jsonResult = JSON.parse(JSON.stringify(resultFormat))

  const csv = await parseAsync(jsonResult, { fields: csvFields })
  console.log(userWithSurvey.surveys[0].title)
  const fileName = 'attempts_' + body.survey_uuid + '.csv'

  res
    .setHeader('Content-Type', 'text/csv')
    .setHeader('Content-Disposition', 'attachment; filename=' + fileName)

  res.status(200).end(csv)
}

export { addSurvey, editSurvey, deleteSurvey, getAllSurveys, addSurveyAttempt, getSurveyQuestions, getSurveyAttemptsCsv }
