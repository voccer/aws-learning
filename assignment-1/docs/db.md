# Users

- name: `users`
- description: `users` is a table that contains all the users of the system. It is saved in the RDS database.

| Name         | Type     | Content       | Default |
| ------------ | -------- | ------------- | ------- |
| `id`         | BigInt   | primary key   |         |
| `username`   | String   | username      |         |
| `password`   | String   | hash password |         |
| `created_at` | Datetime | created at    |         |

# Views

- name: `views`
- description: `views` is a table that contains all the views of the system. It is saved in the RDS database.

| Name         | Type     | Content      | Default |
| ------------ | -------- | ------------ | ------- |
| `id`         | BigInt   | primary key  |         |
| `video_id`   | BigInt   | video's id   |         |
| `viewer_id`  | BigInt   | viewer's id  |         |
| `count`      | BigInt   | view's count | 0       |
| `created_at` | Datetime | created at   |         |

# Videos

- name: `videos`
- description: `videos` is a table that contains all the videos of the system. It is saved in the RDS database.

| Name         | Type     | Content                                | Default |
| ------------ | -------- | -------------------------------------- | ------- |
| `id`         | BigInt   | primary key                            |         |
| `video_url`  | String   | video's url is saved in S3, cloudfront |         |
| `author_id`  | BigInt   | author's id                            |         |
| `created_at` | Datetime | created at                             |         |

# Comments

## Base Table

- name: `comments`
- description: `comments` is a table that contains all the comments of the system. It is saved in the Dynamodb

| Name         | Type     | Content                                                          | Default |
| ------------ | -------- | ---------------------------------------------------------------- | ------- |
| `pk`         | String   | partition key, `video_id`                                        |         |
| `sk`         | String   | sort key, `config#id`: comment, `reply#parent_id#id`: reply info |         |
| `content`    | String   | content of comment                                               |         |
| `author_id`  | BigInt   | author's id                                                      |         |
| `liked_cnt`  | BigInt   | liked count                                                      |         |
| `id`         | BigInt   | unique id                                                        |         |
| `created_at` | Datetime | created at                                                       |         |

## GSI CreatedAt Table

- name: `CreatedAtGSI`

| Field       | Type          |
| ----------- | ------------- |
| `data_type` | Partition key |
| `name`      | Sort Key      |
| `sk`        |               |
| `is_active` |               |
| `id`        |               |
| `pk`        |               |

- Uses Case
  - Fetch user by data_type and name
