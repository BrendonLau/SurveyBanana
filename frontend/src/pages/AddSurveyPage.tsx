import React, { useState } from 'react'
import { Alert, Button, Card, CardContent, Container, Paper, Snackbar, TextField, Typography } from '@mui/material'
import { type IQuestion, type ISurvey } from '../types/survey'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { addSurveyApi } from '../API'
import { USER_UUID } from '../constants'
import { useNavigate } from 'react-router-dom'

const AddSurveyPage = () => {
  const [title, setTitle] = useState<string>('Untitled Form')
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const navigate = useNavigate()

  const onSubmit = (title: string, data: IQuestion[]): void => {
    const newSurvey: ISurvey = {
      title,
      questions: data
    }

    if (isFormError(newSurvey)) {
      setErrorMessage('There are missing field(s). Please check.')
    } else {
      addSurveyApi({ ...newSurvey, user_uuid: USER_UUID })
      navigate('/')
    }
  }

  const isFormError = (survey: ISurvey) => {
    const isTitleError = survey.title === ''
    const isDescriptionsError: boolean[] = survey.questions.map(q => q.description === '')
    const isOptionsError: boolean[][] = survey.questions.map(q => q.choices.map(c => c === ''))

    return isTitleError || isDescriptionsError.some(d => d) || isOptionsError.some(r => r.some(o => o)) || survey.questions.length == 0
  }

  const removeQuestion = (id: number) => {
    setQuestions(questions => questions.filter((question, i) => i !== id))
  }

  return (
    <div className={'h-screen bg-[#F5F5F5]'}>
        <Container maxWidth='md'>
            <Paper variant='outlined' sx={{ bgcolor: 'white', height: '100vh', boxShadow: 3, padding: '1em' }}>
                <TextField variant='standard'
                    value={title}
                    name='title'
                    label='Title'
                    required={true}
                    fullWidth={true}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { setTitle(e.target.value) }}
                />
                <div className='overflow-y-auto max-h-[80vh]'>
                  {
                      questions.map((question, index) => <Card key={index} sx={{ marginTop: '1em', boxShadow: 0, borderColor: 'grey', borderWidth: '2px' }}>
                        <CardContent>
                          <Typography sx={{ float: 'left' }}>
                            Q{index + 1}
                          </Typography>
                          <Button onClick={() => { removeQuestion(index) }} sx={{ float: 'right' }}><DeleteIcon/></Button>
                          <TextField variant='standard'
                              value={question.description}
                              name='description'
                              label='Description'
                              required={true}
                              fullWidth={true}
                              size='small'
                              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                const updatedQuestions = [...questions]
                                updatedQuestions[index] = { ...updatedQuestions[index], description: e.target.value }
                                setQuestions(updatedQuestions)
                              }}
                          />
                          {
                            question.choices.map((choice, secIndex) =>
                            <div key={ index.toString() + secIndex.toString() }
                              className='mx-[0.5em] mt-[0.2em]'
                            >
                            <TextField variant='standard'
                              value={choice}
                              name='option'
                              label='Option'
                              required={true}
                              fullWidth={true}
                              size='small'
                              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                const updatedQuestions = [...questions]
                                updatedQuestions[index].choices[secIndex] = e.target.value
                                updatedQuestions[index] = {
                                  ...updatedQuestions[index],
                                  choices: [...updatedQuestions[index].choices]
                                }
                                setQuestions(updatedQuestions)
                              }}
                          />
                            </div>)
                          }
                          <Button size='small' sx={{ marginTop: '0.2em' }}
                            onClick={() => {
                              const updatedQuestions = [...questions]
                              updatedQuestions[index] = {
                                ...updatedQuestions[index],
                                choices: [...updatedQuestions[index].choices,
                                  '']
                              }
                              setQuestions(updatedQuestions)
                            }}
                          >add option</Button>
                        </CardContent>
                      </Card>)
                  }
                </div>
                <Button variant='contained' sx={{ marginTop: '0.5em', marginRight: '0.5em' }}
                  onClick={() => {
                    setQuestions([...questions, { description: '', choices: [''], required: false }])
                  } }
                >
                  New Question
                </Button>
                <Button variant='contained' sx={{ marginTop: '0.5em' }}
                  onClick={() => { onSubmit(title, questions) }}
                >
                  submit
                </Button>
            </Paper>
        </Container>
        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => { { setErrorMessage('') } }}>
          <Alert severity='error' onClose={() => { { setErrorMessage('') } }}>
            {errorMessage}
          </Alert>
        </Snackbar>
    </div>
  )
}

export default AddSurveyPage
