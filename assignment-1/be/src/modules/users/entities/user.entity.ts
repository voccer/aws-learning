import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { VideoEntity } from '../../videos/entities/video.entity'

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
}
