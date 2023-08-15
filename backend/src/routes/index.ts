import { Router } from 'express'
import { addSurvey, addSurveyAttempt, deleteSurvey, editSurvey, getAllSurveys, getSurveyAttemptsCsv, getSurveyQuestions } from '../controllers/surveys'

const router: Router = Router()

router.post('/add-survey', addSurvey)
router.put('/edit-survey', editSurvey)
router.delete('/delete-survey', deleteSurvey)
router.put('/get-all-surveys', getAllSurveys)

router.post('/add-survey-attempt', addSurveyAttempt)
router.put('/get-survey-questions', getSurveyQuestions)
router.put('/get-survey-attempts-csv', getSurveyAttemptsCsv)

export default router
