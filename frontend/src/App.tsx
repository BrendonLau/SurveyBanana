import './App.css'
import AddSurveyPage from './pages/AddSurveyPage'
import FormPage from './pages/FormPage'
import HomePage from './pages/HomePage'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ThankYouPage from './pages/ThankYouPage'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/add-new-survey' element={<AddSurveyPage/>} />
          <Route path='/form' element={<FormPage/>} />
          <Route path='/thank-you' element={<ThankYouPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
