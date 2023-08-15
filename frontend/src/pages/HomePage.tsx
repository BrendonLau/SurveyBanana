import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, Card, Fab, Modal, Snackbar, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom'
import { type ISurvey } from '../types/survey'
import { baseUrl, deleteSurveyApi, getSurveyAttemptsApi, getSurveysApi } from '../API'
import { USER_UUID, WEB_URL } from '../constants'

const HomePage = () => {
  const navigate = useNavigate()
  const [surveys, setSurveys] = useState<ISurvey[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<string>('')
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [deleteUuid, setDeleteUuid] = useState<string>('')
  const [disableDelete, setDisableDelete] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    fetchData()
  }, [isDelete])

  const fetchData = async () => {
    const data = (await getSurveysApi({ user_uuid: USER_UUID })).data
    setSurveys([...(data.surveys)])
  }

  const deleteSurvey = async () => {
    setDisableDelete(true)
    await deleteSurveyApi({ user_uuid: USER_UUID, survey_uuid: deleteUuid })
    setDisableDelete(false)
    setOpenModal(false)
    setIsDelete(false)
    setDeleteUuid('')
  }

  const handleModal = (content: string) => {
    setOpenModal(true)
    setModalContent(content)
  }

  const downloadCsv = async (surveyUuid: string) => {
    try {
      await getSurveyAttemptsApi({ user_uuid: USER_UUID, survey_uuid: surveyUuid })
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage('There is no current attempt to download.')
      } else {
        throw new Error('Unknown Error')
      }
    }
  }

  const modalStyle = () => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4
  })

  return (
  <div className={'flex justify-center items-center h-screen bg-[#F5F5F5]'}>
    <NavBar/>
    <div className='w-2/3'>
      <Card variant='outlined' sx={{ position: 'relative', boxShadow: 3, height: '85vh', borderRadius: '5%', marginTop: '1.5em', padding: '0.5em' }}>
        {
          surveys.map((survey, index) => <Card key={survey.title + index.toString()}
          sx={{ marginTop: '0.5em', boxShadow: 1, borderColor: 'grey', borderWidth: '2px', padding: '0.2em' }}>
            <div className='p-[0.1em]'>
              <Typography sx={{ float: 'left' }}>{`${index + 1} Title: ${survey.title}`}</Typography>
              <div className='float-right space-x-2'>
                <Button onClick={() => { handleModal(WEB_URL + '/form?uuid=' + (survey.uuid ?? '')) }} size='small' variant='outlined'>view shareable url</Button>
                <Button onClick={() => { handleModal(JSON.stringify(survey, null, 2)) }} size='small' variant='outlined'>view details</Button>
                <Button size='small' variant='outlined' onClick={() => { { downloadCsv(survey.uuid ?? '') } }}>download (csv)</Button>
                <Button onClick={() => {
                  setIsDelete(true)
                  setDeleteUuid(survey.uuid ?? '')
                  handleModal('Are you sure you want to delete? ')
                }} size='small' variant='outlined'>delete</Button>
              </div>
            </div>
          </Card>)
        }
        <Fab color='primary' aria-label='add'
          onClick = {() => {
            navigate('/add-new-survey')
          }}
          sx={{ position: 'absolute', bottom: '2em', right: '2em' }}>
              <AddIcon />
        </Fab>
      </Card>
    </div>
    <Modal open={openModal} onClose={() => {
      {
        setOpenModal(false)
        setIsDelete(false)
        setDeleteUuid('')
      }
    }}>
      <Box sx={modalStyle}>
        { modalContent }
        { isDelete ? <Button disabled={disableDelete} onClick={ deleteSurvey }>confirm</Button> : undefined }
      </Box>
    </Modal>
    <Snackbar anchorOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }} open={!!errorMessage} autoHideDuration={6000} onClose={() => { { setErrorMessage('') } }}>
          <Alert severity='error' onClose={() => { { setErrorMessage('') } }}>
            {errorMessage}
          </Alert>
    </Snackbar>
  </div>
  )
}

export default HomePage
