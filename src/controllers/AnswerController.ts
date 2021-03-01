import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors/AppError'
import { SurveysUsersRespository } from '../repositories/SurveysUsersRepository'

class AnswerController {
  async execute(req: Request, res: Response) {
    const { value } = req.params
    const { u } = req.query

    const surveysUsersRepository = getCustomRepository(SurveysUsersRespository)

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    })

    if (!surveyUser) {
      throw new AppError('Survey user not exists!')
    }

    surveyUser.value = Number(value)

    await surveysUsersRepository.save(surveyUser)

    return res.json(surveyUser)
  }
}

export { AnswerController }
