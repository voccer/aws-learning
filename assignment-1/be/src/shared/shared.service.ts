import { Injectable } from '@nestjs/common'
import { Bcrypt } from 'shared/external'
import { UsersService } from 'users/users.service'

@Injectable()
export class SharedService {
  bcrypt: Bcrypt

  constructor(private usersService: UsersService) {
    this.bcrypt = new Bcrypt()
  }

  async login(workspaceId: number, email: string, password: string): Promise<any> {
    const entity = await this.usersService.findByEmailAndPassword(email, password)

    const error = 'information login is incorrect'
    if (!entity) {
      console.log('can not find user')
      return { error: error }
    }
    if (entity.workspaceId !== workspaceId) {
      console.log('workspace id is not match')
      return { error: error }
    }

    return { id: entity.id, email: entity.email, role: entity.role }
  }
}
