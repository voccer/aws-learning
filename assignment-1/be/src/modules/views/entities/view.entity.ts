import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm'
import { UserEntity } from 'modules/users/entities'
import { VideoEntity } from 'modules/videos/entities'

@Entity('views')
export class ViewEntity {
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

  @Column({ name: 'count', type: 'int', nullable: false })
  count: number

  @Column({ name: 'video_id', type: 'int', nullable: false })
  videoId: number

  @Column({ name: 'viewer_id', type: 'int', nullable: false })
  userId: number

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.views)
  @JoinColumn({ name: 'viewer_id' })
  user: UserEntity

  @ManyToOne(() => VideoEntity, (video: VideoEntity) => video.views)
  @JoinColumn({ name: 'video_id' })
  video: VideoEntity
}
