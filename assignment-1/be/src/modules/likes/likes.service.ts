import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'modules/users/entities'
import { DeleteResult, Repository } from 'typeorm'
import { CreateLikeDto } from './dto'
import { LikeEntity } from './entities'
import { DeleteLikeDto } from './dto/delete-like.dto'

@Injectable()
export class LikesService {
  constructor(@InjectRepository(LikeEntity) private readonly likesRepository: Repository<LikeEntity>) {}
  async create(createLikeDto: CreateLikeDto, user: UserEntity): Promise<LikeEntity> {
    const commentId = createLikeDto.comment_id
    const userId = user.id

    const existLike = await this.likesRepository.findOneBy({ commentId, userId })

    if (existLike) {
      return existLike
    }
    const like = this.likesRepository.create()
    like.commentId = commentId
    like.userId = userId

    return await this.likesRepository.save(like)
  }

  async remove(deleteLikeDto: DeleteLikeDto, user: UserEntity): Promise<DeleteResult> {
    return await this.likesRepository.delete({ commentId: deleteLikeDto.comment_id, userId: user.id })
  }

  async checkIsLiked(commentId: number, userId: number): Promise<boolean> {
    const like = await this.likesRepository.findOneBy({ commentId, userId })
    if (like) {
      return true
    }

    return false
  }
}
