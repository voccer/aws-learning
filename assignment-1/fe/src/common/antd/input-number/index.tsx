import 'antd/lib/input-number/style/index.css'

import { InputNumber as AntInputNumber } from 'antd'

enum InputStyle {
  OUTLINE = 'line',
  SOLID = 'solid',
}

enum InputSize {
  SMALL = 'small',
  NORMAL = 'normal',
  BIG = 'big',
}

const InputNumber = ({
  style = InputStyle.OUTLINE,
  size = InputSize.NORMAL,
  className = '',
  ...props
}: React.PropsWithChildren<any>): JSX.Element => {
  return (
    <>
      <AntInputNumber {...props} controls={false} className={`ecm-input-number ${style} ${size} ${className}`} />
      <style jsx global>{`
        ecm-input-number,
        .ant-input-number {
          font-size: var(--larger-font-size);
          border-radius: 5px;
          padding: 5px;
          border: 1px solid var(--meta-background);
          width: 100%;
        }

        .ant-input-number {
          background-color: transparent;
        }

        .ant-input-number,
        .ant-input-number.small {
          font-size: var(--larger-font-size);
        }

        .ant-input-number-input.normal {
          border-color: transparent;
        }

        .ant-input-number:focus,
        .ant-input-number:hover {
          border-color: var(--primary-color) !important;
          box-shadow: 0 0 0 2px var(--table-cell-selected) !important;
        }

        .ant-input-number.big {
          padding: 8px 20px;
        }

        .ant-input-number svg {
          width: 20px;
          height: 20px;
          margin-right: 5px;
          margin-left: -10px;
        }

        .ant-input-number-disabled {
          background: var(--input-disabled);
          color: var(--base-text-color);
        }

        @media (min-width: 768px) {
          .ant-input-number {
            font-size: var(--base-font-size);
          }

          .ant-input-number.small {
            font-size: var(--base-font-size);
          }

          .ant-input-number.big {
            padding: 15px 20px;
          }
        }
      `}</style>
    </>
  )
}

export { InputNumber }
