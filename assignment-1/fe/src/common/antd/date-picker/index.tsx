import 'antd/lib/date-picker/style/index.css'

import generatePicker from 'antd/lib/date-picker/generatePicker'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'

export const DatePicker = generatePicker(dayjsGenerateConfig)
