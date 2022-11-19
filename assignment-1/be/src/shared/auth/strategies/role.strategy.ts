// import { PassportStrategy } from '@nestjs/passport'
// import { Strategy } from 'passport-local'
// import { Injectable, UnauthorizedException } from '@nestjs/common'
// import { UsersService } from '../../../users/controllers/services'
// // import { UserEntity } from '../../models/users/serializers/user.serializer';

// @Injectable()
// export class RoleStrategy extends PassportStrategy(Strategy, 'role') {
//   constructor(private usersService: UsersService) {
//     super({ usernameField: 'email' })
//   }
//   async validate(): Promise<any> {
//     console.log('validate user: ')
//     return { a: 1 }
//   }
// }
