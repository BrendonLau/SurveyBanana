import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AddSurveyAttemptApi, getSurveyQuestionsApi } from '../API'
import { USER_UUID } from '../constants'
import { Alert, Button, Card, CardContent, Container, FormControlLabel, Paper, Radio, RadioGroup, Snackbar, Typography } from '@mui/material'

const FormPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [queryParameters] = useSearchParams()
  const uuid = queryParameters.get('uuid')
  interface IQuestionForm {
    description: string
    choices: string[]
    required: boolean
    answer: string
  }

  interface ISurveyForm {
    title: string
    questions: IQuestionForm[]
  }
  const [survey, setSurvey] = useState<ISurveyForm>()
  const navigate = useNavigate()

  useEffect(() => {
    if (uuid) { fetchData(uuid) }
  }, [])

  const fetchData = async (uuid: string) => {
    const data = (await getSurveyQuestionsApi({ user_uuid: USER_UUID, survey_uuid: uuid }))?.data
    if (data) {
      const newQuestions = [...data.survey.questions]
      const newQuestions2 = newQuestions.map(q => ({ description: q.description, choices: q.choices, required: q.required, answer: '' } as IQuestionForm))

      setSurvey({ title: data.survey.title, questions: newQuestions2 })
    }
  }

  const onSubmit = (survey: ISurveyForm): void => {
    if (isFormError(survey)) {
      setErrorMessage('There are missing field(s). Please check.')
    } else {
      const answers: Array<{ description: string, answer: string }> = survey.questions.map(q => ({ description: q.description, answer: q.answer } as unknown as { description: string, answer: string }))
      if (uuid) {
        AddSurveyAttemptApi({ user_uuid: USER_UUID, survey_uuid: uuid, answers })
        navigate('/thank-you')
      }
    }
  }

  const isFormError = (survey: ISurveyForm) => {
    const isAnswerError = survey.questions.map(q => q.answer === '')
    return isAnswerError.some(a => a)
  }

  return (<div className={'h-screen bg-[#F5F5F5]'}>
    {
        survey && survey.questions
          ? <Container maxWidth='md'>
            <Paper variant='outlined' sx={{ bgcolor: 'white', height: '100vh', boxShadow: 3, padding: '1em' }}>
              <Typography variant="h4">{survey.title}</Typography>
              <div className='overflow-y-auto max-h-[85vh]'>
                {
                  survey.questions.map((question, index) =>
                  <Card key={ question.description + index.toString()} sx={{ marginTop: '0.5em', boxShadow: 0, borderColor: 'grey', borderWidth: '2px' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>{ question.description }</Typography>
                      <RadioGroup value={survey.questions[index].answer}
                        onChange={
                          (e) => {
                            const updatedSurvey = { ...survey }
                            survey.questions[index].answer = e.target.value
                            setSurvey(updatedSurvey)
                          }
                        }
                      >
                        {
                          question.choices.map((choice, secIndex) => {
                            return <FormControlLabel key={ choice + index.toString() + secIndex.toString() } value={choice} control={<Radio />} label={choice} />
                          })
                        }
                      </RadioGroup>
                    </CardContent>
                  </Card>)
                }
              </div>
              <Button variant='contained' sx={{ marginTop: '0.5em' }}
                onClick={() => { { onSubmit(survey) } }}
                >
                  submit
              </Button>
            </Paper>
            <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => { { setErrorMessage('') } }}>
              <Alert severity='error' onClose={() => { { setErrorMessage('') } }}>
                {errorMessage}
              </Alert>
            </Snackbar>
          </Container>
          : 'undefined'
    }
  </div>)
}

export default FormPage
