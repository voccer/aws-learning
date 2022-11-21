import { Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'

import { AppConfigService } from './app-config.service'
import { GeneratorService } from './generator.service'

@Injectable()
export class AwsS3Service {
  constructor(public configService: AppConfigService, public generatorService: GeneratorService) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const s3 = new AWS.S3()
    const fileName = this.generatorService.fileName(file.originalname)
    const key = 'file/' + fileName
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ACL: 'public-read',
    }
    const result = await s3.upload(params).promise()
    return result.Location
  }
}
