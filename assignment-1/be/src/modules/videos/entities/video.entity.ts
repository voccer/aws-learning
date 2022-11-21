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

@Entity('videos')
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'url', type: 'varchar', length: 100, nullable: false })
  url: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.videos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}
