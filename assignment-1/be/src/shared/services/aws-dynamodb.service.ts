import { Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'

@Injectable()
export class AwsDynamoDBService {
  async upsert(tableName: string, data: any): Promise<string> {
    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const params = {
      TableName: tableName,
      Item: data,
    }
    await dynamodb.put(params).promise()

    return data.id
  }
}
