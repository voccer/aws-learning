import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { UserEntity } from 'modules/users/entities'
import { ViewEntity } from 'modules/views/entities/view.entity'

@Entity('videos')
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'url', type: 'varchar', length: 1024, nullable: false })
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

  @OneToMany(() => ViewEntity, (view: ViewEntity) => view.video)
  views: ViewEntity[]
}
