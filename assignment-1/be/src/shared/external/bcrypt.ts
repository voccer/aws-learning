import { hash, compare } from 'bcrypt'
import { appConfig } from 'config'

export class Bcrypt {
  async hashPassword(password: string): Promise<string> {
    return await hash(password, appConfig.HASH_SALT_ROUNDS)
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword)
  }
}
