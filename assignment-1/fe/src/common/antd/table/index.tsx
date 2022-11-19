import 'antd/lib/table/style/index.css'
import 'antd/lib/pagination/style/index.css'

import { Table as AntTable } from 'antd'

export const Table = (props: any): JSX.Element => {
  return (
    <>
      <AntTable
        {...props}
        className={`ecm-table ${props.noCheckBox ? 'no-checkbox' : ''} ${props.newDesign ? 'new-design' : ''} ${
          props.isHeaderWhite ? 'table-head-white' : ''
        }`}
      />
      <style jsx global>{`
        .ecm-table .ant-table table {
          table-layout: inherit !important;
        }
        .ecm-table .ant-table thead th {
          background-color: rgba(207, 198, 185, 0.5);
          font-weight: bold;
        }

        .table-head-white .ant-table thead th {
          background-color: var(--white);
          font-weight: var(--normal-font-weight);
        }

        .ecm-table .ant-pagination .ant-pagination-item,
        .ecm-table .ant-pagination .ant-pagination-next,
        .ecm-table .ant-pagination .ant-pagination-prev {
          border: 2px solid var(--primary-color);
          width: 48px;
          height: 48px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .ecm-table .ant-pagination .ant-pagination-next button,
        .ecm-table .ant-pagination .ant-pagination-prev button {
          background-color: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .ecm-table .ant-pagination .ant-pagination-item a,
        .ecm-table .ant-pagination .ant-pagination-next button,
        .ecm-table .ant-pagination .ant-pagination-prev button {
          color: var(--primary-color);
        }

        .ecm-table .ant-pagination .ant-pagination-item-active {
          background-color: var(--primary-color);
        }

        .ecm-table .ant-pagination .ant-pagination-item-active a {
          color: var(--white);
        }

        .ecm-table .ant-pagination {
          margin-top: 60px;
          position: relative;
          margin-bottom: 20px;
          align-items: center;
          justify-content: center;
        }

        .ecm-table .ant-pagination li {
          margin-right: 20px;
        }

        .ecm-table .ant-pagination li:last-child {
          margin-right: 0;
        }

        .ecm-table .ant-pagination .ant-pagination-total-text {
          position: absolute;
          bottom: -50px;
        }

        .ecm-table .ant-table tbody tr.ant-table-row-selected td,
        .ecm-table .ant-table .ant-table-tbody > tr.ant-table-row:hover > td,
        .ecm-table .ant-table .ant-table-tbody > tr > td.ant-table-cell-row-hover {
          background: transparent;
        }

        .ecm-table .ant-pagination .ant-pagination-disabled,
        .ecm-table .ant-pagination .ant-pagination-jump-next,
        .ecm-table .ant-pagination .ant-pagination-jump-prev,
        .ecm-table .ant-pagination .ant-pagination-jump-next + .ant-pagination-item {
          display: none;
        }

        .ecm-table .ant-checkbox .ant-checkbox-inner {
          width: 20px;
          height: 20px;
          border-radius: 5px;
        }

        .ecm-table .ant-checkbox-wrapper:hover .ant-checkbox::after,
        .ecm-table .ant-checkbox.ant-checkbox-checked .ant-checkbox-inner,
        .ecm-table .ant-checkbox.ant-checkbox-checked:hover .ant-checkbox-inner {
          border-color: var(--primary-color);
          border-radius: 5px;
        }

        .ecm-table .ant-checkbox::after,
        .ecm-table .ant-checkbox-wrapper:hover .ant-checkbox-inner,
        .ecm-table .ant-checkbox:hover .ant-checkbox-inner,
        .ecm-table .ant-checkbox-input:focus + .ant-checkbox-inner {
          border-color: var(--checkbox-border);
        }

        .ecm-table .ant-checkbox.ant-checkbox-checked .ant-checkbox-inner,
        .ecm-table .ant-checkbox.ant-checkbox-checked:hover .ant-checkbox-inner {
          background: var(--primary-color);
        }

        .ecm-table .ant-checkbox:hover .ant-checkbox-inner {
          border-color: var(--primary-color);
        }

        .ecm-table .ant-checkbox .ant-checkbox-inner::after {
          left: 25%;
          transform: rotate(45deg) scale(1.3) translate(-50%, -50%);
        }

        .ant-table-cell.ant-table-selection-column {
          padding: 16px;
        }

        .ecm-table .ant-checkbox.ant-checkbox-indeterminate .ant-checkbox-inner::after {
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: var(--primary-color);
        }

        .ecm-table table thead {
          clip: rect(0 0 0 0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          position: absolute;
          width: 1px;
        }

        .ecm-table table tr {
          margin-bottom: 25px;
        }

        .ecm-table:not(.no-checkbox) table tbody tr td:first-child {
          position: absolute;
          right: 60px;
          border: none;
        }

        .ecm-table table tbody tr td::before {
          content: attr(data-label);
          float: left;
        }

        @media (max-width: 767px) {
          .ecm-table table tr {
            display: block;
          }

          .ecm-table:not(.new-design) table tr td {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .ecm-table table colgroup col {
            width: 100% !important;
          }
        }

        @media (min-width: 768px) {
          .ecm-table .ant-table table {
            table-layout: fixed !important;
          }

          .ecm-table table tbody tr td {
            display: revert;
          }

          .ecm-table .ant-table tbody td {
            padding: 16px;
          }

          .ecm-table table thead {
            clip: none;
            height: auto;
            width: auto;
            position: relative;
            overflow: initial;
          }

          .ecm-table table tr {
            margin-bottom: 0;
          }

          .ecm-table table tbody tr td::before {
            display: none;
          }

          .ecm-table table tbody tr td:first-child {
            position: relative;
            right: auto;
          }

          .ecm-table:not(.new-design) .ant-table tbody tr.ant-table-row-selected td,
          .ecm-table:not(.new-design) .ant-table .ant-table-tbody > tr.ant-table-row:hover > td,
          .ecm-table:not(.new-design) .ant-table .ant-table-tbody > tr > td.ant-table-cell-row-hover {
            background: rgba(241, 156, 166, 0.05);
          }

          .ecm-table table tbody tr td:last-child {
            border-bottom: 1px solid var(--table-cell-border);
          }

          .ecm-table:not(.no-checkbox) table tbody tr td:first-child {
            position: relative;
            right: auto;
            border-bottom: 1px solid var(--table-cell-border);
          }
        }
      `}</style>
    </>
  )
}
