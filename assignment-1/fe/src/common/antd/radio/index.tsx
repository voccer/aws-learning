import 'antd/lib/radio/style/index.css'

import { Radio as AntRadio } from 'antd'

export const Radio = ({ group = false, children, ...props }: React.PropsWithChildren<any>): JSX.Element => {
  return (
    <>
      {group ? (
        <AntRadio.Group {...props} className="ecm-radio" />
      ) : (
        <AntRadio {...props} className="ecm-radio">
          {children}
        </AntRadio>
      )}
      <style jsx global>{`
        .ecm-radio {
          margin-top: -10px;
        }

        .ant-radio.ant-radio-checked .ant-radio-inner,
        .ant-radio-checked:after,
        .ant-radio:hover .ant-radio-inner,
        .ant-radio-wrapper:hover .ant-radio,
        .ant-radio:hover .ant-radio-inner,
        .ant-radio-input:focus + .ant-radio-inner {
          border-color: var(--primary-color);
        }

        .ant-radio-input:focus + .ant-radio-inner {
          box-shadow: 0 0 0 3px var(--table-cell-selected);
        }

        .ant-radio.ant-radio-checked .ant-radio-inner:after {
          background-color: var(--primary-color);
        }

        .ant-radio-wrapper > span:not(.ant-radio) {
          font-size: var(--big-font-size);
          margin-left: 5px;
        }

        .ant-radio .ant-radio-inner {
          width: 22px;
          height: 22px;
          border-width: 2px;
          top: 3px;
        }

        .ant-radio .ant-radio-inner:after {
          width: 20px;
          height: 20px;
          margin-left: -10px;
          margin-top: -10px;
        }

        @media (min-width: 1024px) {
        }
      `}</style>
    </>
  )
}
