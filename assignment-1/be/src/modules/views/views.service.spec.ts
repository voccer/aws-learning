import { Test, TestingModule } from '@nestjs/testing'
import { viewsService } from './views.service'

describe('viewsService', () => {
  let service: viewsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [viewsService],
    }).compile()

    service = module.get<viewsService>(viewsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
