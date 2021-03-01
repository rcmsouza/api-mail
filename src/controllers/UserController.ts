import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import * as yup from 'yup'
import { AppError } from '../errors/AppError'
import { UsersRepository } from '../repositories/UsersRepository'

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body

    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      email: yup.string().email().required('Email inválido'),
    })

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (err) {
      throw new AppError(err)
    }

    const userRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await userRepository.findOne({
      email,
    })

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const user = userRepository.create({
      name,
      email,
    })

    await userRepository.save(user)

    return res.status(201).json(user)
  }
}

export { UserController }
