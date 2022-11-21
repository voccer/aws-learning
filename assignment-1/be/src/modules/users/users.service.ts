import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { authConfig } from 'config'
import { between } from 'shared/utils/random'
import { Repository } from 'typeorm'
import { UserEntity } from 'modules/users/entities'
import { UserRegisterDto } from 'modules/auth/dto'

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

  async createUser(userRegisterDto: UserRegisterDto): Promise<any> {
    const existUser = await this.findByEmail(userRegisterDto.email)
    if (existUser) {
      throw new Error('email is existed')
    }

    const password = await this.hashPassword(userRegisterDto.password)

    const newUser = {
      ...userRegisterDto,
      createdAt: new Date(),
      password: password,
    }

    return await this.usersRepository.save(newUser)
  }
}
