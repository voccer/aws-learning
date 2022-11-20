import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { authConfig } from 'config'
import { between } from 'shared/utils/random'
import { Repository } from 'typeorm'
import { createUserDto } from 'users/model/dtos'
import UserEntity from 'users/model/users.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {}

  async login(email: string, password: string): Promise<any> {
    const entity = await this.findByEmailAndPassword(email, password)
    const error = 'information login is incorrect'

    if (!entity) {
      console.log('can not find user')

      return { error: error }
    }

    return { id: entity.id, email: entity.email }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email)

    const isPassword = await this.comparePassword(password, user.password)

    if (user && user.password && isPassword) {
      return user
    }
  }

  async findByEmail(email: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    })

    return user ? user : null
  }

  async findByEmailAndPassword(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email)
    if (user) {
      const isPassword = await this.comparePassword(password, user.password)
      if (isPassword) {
        return user
      }
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, authConfig['HASH_SALT_ROUNDS'])
  }

  async comparePassword(password: string, storedPasswordHash: string): Promise<any> {
    return await bcrypt.compare(password, storedPasswordHash)
  }

  async createUser(createUserDto: createUserDto): Promise<any> {
    const existUser = await this.findByEmail(createUserDto.email)
    if (existUser) {
      throw new Error('Email is existed')
    }

    const newPassword = between(100000, 999999).toString()

    const newUser = {
      password: newPassword,
      createdAt: new Date(),
      ...createUserDto,
    }
    await this.usersRepository.save(newUser)
  }
}
