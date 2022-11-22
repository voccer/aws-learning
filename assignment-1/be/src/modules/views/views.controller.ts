import { Controller, Get, Post, Body, Param, Req, Res, UseGuards } from '@nestjs/common'
import { ViewsService } from './views.service'
import { CreateViewDto } from './dto'
import { Request, Response } from 'express'
import { AuthenticationGuard } from 'modules/auth/guards'
import { UserEntity } from 'modules/users/entities'

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  async create(@Body() createViewDto: CreateViewDto, @Req() req: Request, @Res() res: Response) {
    const user = <UserEntity>req.user
    const view = await this.viewsService.create(createViewDto, user)

    return res.status(201).json(view).end()
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
