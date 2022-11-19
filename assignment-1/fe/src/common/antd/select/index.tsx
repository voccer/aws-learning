import 'antd/lib/select/style/index.css'

import { Select as AntSelect } from 'antd'

enum SelectSize {
  SMALL = 'small',
  NORMAL = 'normal',
  BIG = 'big',
}

export const Select = ({ size = SelectSize.NORMAL, ...props }: React.PropsWithChildren<any>): JSX.Element => {
  return (
    <>
      <AntSelect
        {...props}
        className={`ecm-select ${size} ${props.className}`}
        dropdownClassName="ecm-select-dropdown"
      />
      <style jsx global>{`
        .ecm-select {
          border-color: var(--select-border);
        }

        .ecm-select.big {
          width: 100%;
          box-shadow: 0 2px 5px 0 var(--header-shadow);
        }

        .ecm-select.normal .ant-select-selector {
          padding: 6px 11px;
          border-radius: 5px;
          height: auto;
          border-color: var(--select-border);
          padding-right: 35px;
        }

        .ecm-select.normal .ant-select-arrow > span {
          position: relative;
        }

        // .ecm-select.normal .ant-select-arrow > span:before {
        //   content: '';
        //   position: absolute;
        //   display: block;
        //   top: 50%;
        //   left: -10px;
        //   transform: translate(0, -50%);
        //   width: 1px;
        //   height: 20px;
        //   background-color: var(--select-border);
        // }

        .ecm-select.big .ant-select-selector {
          padding: 5px 20px;
          height: auto;
          border-radius: 5px;
          border-color: var(--select-border);
        }

        .ecm-select.ant-select:hover .ant-select-selector,
        .ecm-select.ant-select-focused .ant-select-selector {
          border-color: var(--primary-color) !important;
          box-shadow: 0 0 0 2px var(--table-cell-selected) !important;
        }

        .ecm-select .ant-select-selector .ant-select-selection-search-input {
          height: 100% !important;
        }

        .ecm-select.big .ant-select-selector .ant-select-selection-search {
          left: 20px;
        }

        .ecm-select-dropdown {
          padding: 0;
        }

        .ecm-select-dropdown .rc-virtual-list .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
          background-color: var(--table-cell-selected);
          font-weight: var(--normal-font-weight);
        }

        @media (min-width: 768px) {
          .ecm-select.big .ant-select-selector {
            padding: 10px 20px;
          }
        }
      `}</style>
    </>
  )
}
