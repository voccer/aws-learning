import { ViewEntity } from 'modules/views/entities/view.entity'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { VideoEntity } from 'modules/videos/entities/video.entity'
import { LikeEntity } from '../../likes/entities/like.entity'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column({ name: 'password', type: 'varchar', length: 100, nullable: false })
  password: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date

  @OneToMany(() => VideoEntity, (video: VideoEntity) => video.user)
  videos: VideoEntity[]

  @OneToMany(() => ViewEntity, (view: ViewEntity) => view.user)
  views: ViewEntity[]

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.user)
  likes: LikeEntity[]
}
