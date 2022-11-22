import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { UserEntity } from 'modules/users/entities'

@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date

  @Column({ name: 'comment_id', type: 'int', nullable: false })
  commentId: number

  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}
