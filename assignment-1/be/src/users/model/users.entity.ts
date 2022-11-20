import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'

import * as bcrypt from 'bcrypt'
import { appConfig } from 'config'

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

  @BeforeInsert()
  ahihi() {
    console.log('ahihi')
  }

  @BeforeInsert()
  async beforeInsertCallBack() {
    console.log('beforeInsertCallBack')
    await this.hashPassword()
  }

  @BeforeUpdate()
  async beforeUpdateCallBack() {
    await this.hashPassword()
  }

  async hashPassword() {
    console.log('hashPassword')
    this.password = await bcrypt.hash(this.password, appConfig.HASH_SALT_ROUNDS)
  }
}
