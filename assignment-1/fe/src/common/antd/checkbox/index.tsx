import 'antd/lib/checkbox/style/index.css'

import { Checkbox as AntCheckbox } from 'antd'

enum CheckboxType {
  NORMAL = 'normal',
  ROUNDED = 'rounded',
}

export const Checkbox = ({
  size = CheckboxType.NORMAL,
  group = false,
  children,
  ...props
}: React.PropsWithChildren<any>): JSX.Element => {
  return (
    <>
      {group ? (
        <AntCheckbox.Group
          {...props}
          className={`ecm-checkbox-group ${size ? `ecm-checkbox__${size}` : ''} ${props.className || ''}`}
        />
      ) : (
        <AntCheckbox
          {...props}
          className={`ecm-checkbox ${size ? `ecm-checkbox__${size}` : ''} ${props.className || ''}`}
        >
          {children}
        </AntCheckbox>
      )}
      <style jsx global>{`
        .ecm-checkbox__normal .ant-checkbox span {
          border-color: var(--select-border) !important;
        }

        .ecm-checkbox__normal .ant-checkbox:hover span,
        .ecm-checkbox__normal .ant-checkbox:hover span {
          border-color: var(--primary-color) !important;
        }

        .ecm-checkbox__normal .ant-checkbox.ant-checkbox-checked span,
        .ecm-checkbox__rounded .ant-checkbox.ant-checkbox-checked span {
          background-color: var(--primary-color);
          border-color: var(--primary-color) !important;
        }

        .ecm-checkbox__normal .ant-checkbox.ant-checkbox-checked:after {
          border-color: var(--primary-color) !important;
        }

        .ecm-checkbox__rounded .ant-checkbox-group-item {
          position: relative;
          margin-right: 8px;
        }

        .ecm-checkbox__rounded .ant-checkbox-group-item > span:not(.ant-checkbox) {
          position: absolute;
          z-index: 1;
          color: var(--upload-zone-background);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-weight: var(--bold-font-weight);
        }

        .ecm-checkbox__rounded .ant-checkbox span {
          border-color: var(--upload-zone-background) !important;
          width: 40px;
          height: 40px;
          border-radius: 40px;
        }

        .ecm-checkbox__rounded .ant-checkbox.ant-checkbox-checked:after {
          border-color: var(--primary-color) !important;
          border-radius: 50px;
        }

        .ecm-checkbox__rounded .ant-checkbox.ant-checkbox-checked .ant-checkbox-inner:after {
          display: none;
        }

        .ecm-checkbox__rounded .ant-checkbox-wrapper-checked > span:not(.ant-checkbox) {
          color: var(--white);
        }

        .ecm-checkbox__normal .ant-checkbox .ant-checkbox-inner {
          width: 20px;
          height: 20px;
          border-radius: 3px;
          overflow: hidden;
        }

        .ecm-checkbox__normal .ant-checkbox-wrapper:hover .ant-checkbox::after,
        .ecm-checkbox__normal .ant-checkbox.ant-checkbox-checked .ant-checkbox-inner,
        .ecm-checkbox__normal .ant-checkbox.ant-checkbox-checked:hover .ant-checkbox-inner {
          border-color: var(--primary-color);
          border-radius: 3px;
          overflow: hidden;
        }

        .ecm-checkbox__normal .ant-checkbox::after,
        .ecm-checkbox__normal.ant-checkbox-wrapper:hover .ant-checkbox-inner,
        .ecm-checkbox__normal .ant-checkbox:hover .ant-checkbox-inner,
        .ecm-checkbox__normal .ant-checkbox-input:focus + .ant-checkbox-inner {
          border-color: var(--checkbox-border);
        }

        .ecm-checkbox__normal .ant-checkbox.ant-checkbox-checked .ant-checkbox-inner,
        .ecm-checkbox__normal .ant-checkbox.ant-checkbox-checked:hover .ant-checkbox-inner {
          background: var(--primary-color);
        }

        .ecm-checkbox__normal .ant-checkbox:hover .ant-checkbox-inner {
          border-color: var(--primary-color);
        }

        .ecm-checkbox__normal .ant-checkbox .ant-checkbox-inner::after {
          left: 25%;
          transform: rotate(45deg) scale(1.3) translate(-50%, -50%);
        }

        @media (min-width: 768px) {
          .ecm-checkbox__rounded .ant-checkbox-group-item {
            position: relative;
            margin-right: 30px;
          }

          .ecm-checkbox__rounded .ant-checkbox span {
            width: 50px;
            height: 50px;
            border-radius: 50px;
          }
        }
      `}</style>
    </>
  )
}
