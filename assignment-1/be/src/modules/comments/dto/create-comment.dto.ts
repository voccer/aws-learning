import { IsString } from 'class-validator'

export class CreateCommentDto {
  @IsString()
  readonly content: string

  @IsString()
  readonly parent_id: string

  @IsString()
  readonly video_id: string
}
