import { Injectable } from '@nestjs/common'
import { CreateViewDto, UpdateViewDto } from './dto'

@Injectable()
export class ViewsService {
  create(createViewDto: CreateViewDto) {
    return 'This action adds a new View'
  }

  findAll() {
    return `This action returns all views`
  }

  findOne(id: number) {
    return `This action returns a #${id} View`
  }

  update(id: number, updateViewDto: UpdateViewDto) {
    return `This action updates a #${id} View`
  }

  remove(id: number) {
    return `This action removes a #${id} View`
  }
}
