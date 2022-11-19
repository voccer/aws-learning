import 'antd/lib/pagination/style/index.css'

import { Pagination as AntPagination } from 'antd'

export const Pagination = (props: any): JSX.Element => {
  return (
    <>
      <AntPagination {...props} className={`ecm-pagination flex items-center`} />
      <style jsx global>{`
        .ecm-pagination .ant-pagination-item,
        .ecm-pagination .ant-pagination-next,
        .ecm-pagination .ant-pagination-prev {
          border: 2px solid var(--primary-color);
          width: 48px;
          height: 48px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .ecm-pagination .ant-pagination-next button,
        .ecm-pagination .ant-pagination-prev button {
          background-color: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .ecm-pagination .ant-pagination-item a,
        .ecm-pagination .ant-pagination-next button,
        .ecm-pagination .ant-pagination-prev button {
          color: var(--primary-color);
        }

        .ecm-pagination .ant-pagination-item-active {
          background-color: var(--primary-color);
        }

        .ecm-pagination .ant-pagination-item-active a {
          color: var(--white);
        }

        .ecm-pagination {
          margin-top: 60px;
          position: relative;
          margin-bottom: 80px;
          align-items: center;
          justify-content: center;
        }

        .ecm-pagination li {
          margin-right: 10px;
        }

        .ecm-pagination li:last-child {
          margin-right: 0;
        }

        .ecm-pagination .ant-pagination-total-text {
          position: absolute;
          bottom: -50px;
        }

        .ecm-pagination .ant-pagination-disabled,
        .ecm-pagination .ant-pagination-jump-next,
        .ecm-pagination .ant-pagination-jump-prev,
        .ecm-pagination .ant-pagination-jump-next ~ .ant-pagination-item,
        .ecm-pagination .ant-pagination-jump-prev + .ant-pagination-item {
          display: none;
        }

        .ecm-pagination .ant-pagination-prev:hover .ant-pagination-item-link,
        .ecm-pagination .ant-pagination-next:hover .ant-pagination-item-link {
        }

        @media (min-width: 768px) {
          .ecm-pagination li {
            margin-right: 20px;
          }
        }
      `}</style>
    </>
  )
}
