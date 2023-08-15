import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { type AddSurveyRes, type IDeleteSurveyRes, type IGetSurveyQuestionRes, type IAddSurveyAttemptRes, type IGetSurveysRes } from './types/response'
import { type IGetSurveyQuestionReq, type IDeleteSurveysReq, type IGetSurveysReq, type ISurveyReq, type IAddSurveyAttemptReq, type IGetSurveyAttemptsReq } from './types/request'
import SaveAs from 'file-saver'

export const baseUrl: string = 'http://localhost:4000'

export const addSurveyApi = async (formData: ISurveyReq): Promise<AxiosResponse<AddSurveyRes>> => {
  try {
    const res: AxiosResponse<AddSurveyRes> = await axios.post(baseUrl + '/add-survey', formData)
    return res
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Unknown Error')
    }
  }
}

export const getSurveysApi = async (formData: IGetSurveysReq): Promise<AxiosResponse<IGetSurveysRes>> => {
  try {
    const res: AxiosResponse<IGetSurveysRes> = await axios.put(baseUrl + '/get-all-surveys', formData)
    return res
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Unknown Error')
    }
  }
}

export const deleteSurveyApi = async (formData: IDeleteSurveysReq): Promise<AxiosResponse<IDeleteSurveyRes>> => {
  try {
    const res: AxiosResponse<IDeleteSurveyRes> = await axios.delete(baseUrl + '/delete-survey', { data: formData })
    return res
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Unknown Error')
    }
  }
}

export const getSurveyQuestionsApi = async (formData: IGetSurveyQuestionReq): Promise<AxiosResponse<IGetSurveyQuestionRes> | undefined> => {
  try {
    const res: AxiosResponse<IGetSurveyQuestionRes> = await axios.put(baseUrl + '/get-survey-questions', formData)
    return res
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      throw new Error('Unknown Error')
    }
  }
}

export const AddSurveyAttemptApi = async (formData: IAddSurveyAttemptReq): Promise<AxiosResponse<IAddSurveyAttemptRes> | undefined> => {
  try {
    console.log(formData)
    const res: AxiosResponse<IAddSurveyAttemptRes> = await axios.post(baseUrl + '/add-survey-attempt', formData)
    return res
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      throw new Error('Unknown Error')
    }
  }
}

export const getSurveyAttemptsApi = async (formData: IGetSurveyAttemptsReq): Promise<AxiosResponse<any> | undefined> => {
  try {
    const config = {
      Headers: {
        'Content-Type': 'multipart/form-data',
        responseType: 'blob'
      }
    } as AxiosRequestConfig
    const res: AxiosResponse<any> = await axios.put(baseUrl + '/get-survey-attempts-csv', formData, config)
    SaveAs(new Blob([res.data], { type: 'application/octet-stream' }), 'attempts_' + formData.survey_uuid + '.csv', { autoBom: false })
    return res
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('Unknown Error')
    }
  }
}
