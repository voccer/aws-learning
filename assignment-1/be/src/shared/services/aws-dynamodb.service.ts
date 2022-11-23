import { Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { ItemList } from 'aws-sdk/clients/dynamodb'

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

  async query(tableName: string, keyConditionExpression: string, expressionAttributeValues: any): Promise<ItemList> {
    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const params = {
      TableName: tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    }
    const result = await dynamodb.query(params).promise()

    return result.Items
  }
}
