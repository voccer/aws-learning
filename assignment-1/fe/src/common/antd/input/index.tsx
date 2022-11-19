import 'antd/lib/input/style/index.css'

import { DatePicker, Input as AntInput, InputNumber } from 'antd'
const { TextArea: AntTextArea } = AntInput

enum InputType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PASSWORD = 'password',
  NUMBER = 'number',
  DATE = 'date',
  MONTH = 'month',
  TIME = 'time',
}

enum InputStyle {
  OUTLINE = 'line',
  SOLID = 'solid',
}

enum InputSize {
  SMALL = 'small',
  NORMAL = 'normal',
  BIG = 'big',
}

const Input = ({
  type = InputType.INPUT,
  style = InputStyle.OUTLINE,
  size = InputSize.NORMAL,
  className = '',
  ...props
}: React.PropsWithChildren<any>): JSX.Element => {
  return (
    <>
      {type === InputType.INPUT ? (
        <AntInput {...props} className={`ecm-input ${style} ${size} ${className}`} />
      ) : type === InputType.PASSWORD ? (
        <AntInput.Password {...props} className={`ecm-input ${style} ${size} ${className}`} />
      ) : type === InputType.NUMBER ? (
        <InputNumber {...props} className={`ecm-input ${style} ${size} ${className}`} />
      ) : type === InputType.DATE ? (
        <DatePicker {...props} className={`ecm-input ${style} ${size} ${className}`} />
      ) : type === InputType.MONTH ? (
        <DatePicker picker="month" {...props} className={`ecm-input ${style} ${size} ${className}`} />
      ) : type === InputType.TIME ? (
        <DatePicker
          showTime={true}
          format="YYYY-MM-DD HH:mm:ss"
          {...props}
          className={`ecm-input ${style} ${size} ${className}`}
        />
      ) : (
        <AntTextArea {...props} className={`ecm-textarea ${style} ${size} ${className}`} />
      )}
      <style jsx global>{`
        .ecm-input,
        .ecm-textarea {
          border-radius: 5px;
          font-size: var(--larger-font-size);
          padding: 10px;
          border: 1px solid var(--meta-background);
        }

        .ecm-input .ant-input,
        .ecm-textarea .ant-input {
          background-color: transparent;
        }

        .ecm-input.small,
        .ecm-textarea.small {
          font-size: var(--larger-font-size);
        }

        .ecm-input.normal,
        .ecm-textarea.normal {
          border-color: transparent;
        }

        .ecm-input:focus,
        .ecm-textarea:focus,
        .ecm-input:hover,
        .ecm-textarea:hover {
          border-color: var(--primary-color) !important;
          box-shadow: 0 0 0 2px var(--table-cell-selected) !important;
        }

        .ecm-input.big,
        .ecm-textarea.big {
          padding: 8px 20px;
        }

        .ecm-input.line,
        .ecm-textarea.line {
          border-color: var(--select-border);
          background: transparent;
        }

        .ecm-input.solid,
        .ecm-textarea.solid {
          background: var(--input-background);
          border-color: transparent;
        }

        .ecm-input svg {
          width: 20px;
          height: 20px;
          margin-right: 5px;
          margin-left: -10px;
        }

        .ecm-input .ant-input-clear-icon {
          visibility: visible;
          color: transparent !important;
          position: relative;
        }

        .ecm-input .ant-input-clear-icon:after {
          content: '✕';
          position: absolute;
          pointer-events: none;
          color: var(--base-text);
          font-size: var(--big-font-size);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .ecm-input.ant-input-disabled {
          background: var(--input-disabled);
          color: var(--base-text-color);
        }

        @media (min-width: 768px) {
          .ecm-input,
          .ecm-textarea {
            font-size: var(--base-font-size);
          }

          .ecm-input.small,
          .ecm-textarea.small {
            font-size: var(--base-font-size);
          }

          .ecm-input.big,
          .ecm-textarea.big {
            padding: 15px 20px;
          }
        }
      `}</style>
    </>
  )
}

export { Input }
