import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ViewsService } from './views.service'
import { CreateViewDto, UpdateViewDto } from './dto'

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Post()
  create(@Body() createViewDto: CreateViewDto) {
    return this.viewsService.create(createViewDto)
  }

  @Get()
  findAll() {
    return this.viewsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewsService.findOne(+id)
  }
}
