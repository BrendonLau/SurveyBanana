import express, { type Express, type Request, type Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import surveyRoutes from './routes'
import { type IUser } from './types/models/user'
import UserModel from './models/user'

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(surveyRoutes)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0yce8ds.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

mongoose
  .connect(uri)
  .then(async () => {
    app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`) }
    )
    const userCount = await UserModel.countDocuments()

    if (userCount === 0) {
      const newUser: IUser = new UserModel({
        uuid: '123456',
        email: 'johndoe@hotmail.com'
      })

      newUser.save()
        .then(saved => {
          console.log('User saved with default value:', saved)
        })
        .catch(error => {
          throw error
        })
    }
  })
  .catch(error => {
    throw error
  })
