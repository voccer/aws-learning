import 'antd/lib/tabs/style/index.css'

import { Tabs as AntTabs } from 'antd'
const { TabPane: AntTabPane } = AntTabs

const Tabs = ({ tabs = [], ...props }: React.PropsWithChildren<any>): JSX.Element => {
  return (
    <>
      <AntTabs {...props} className="ecm-tabs">
        {tabs.map(
          (tab: any): JSX.Element => (
            <AntTabPane tab={tab.value} key={tab.key}>
              {tab.children}
            </AntTabPane>
          )
        )}
      </AntTabs>
      <style jsx global>{`
        .ecm-tabs .ant-tabs-tab {
          width: calc(100% / 4);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 0;
          margin: 0 5px;
        }

        .ecm-tabs > .ant-tabs-nav .ant-tabs-nav-wrap {
          display: block;
        }

        .ecm-tabs > .ant-tabs-nav .ant-tabs-nav-wrap,
        .ecm-tabs > div > .ant-tabs-nav .ant-tabs-nav-wrap {
          width: 100%;
        }

        .ecm-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: var(--base-text-color);
        }

        .ecm-tabs .ant-tabs-tab:hover {
          color: var(--brown-border);
        }

        .ecm-tabs .ant-tabs-ink-bar {
          background: var(--brown-border);
          height: 3px !important;
        }

        .ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap,
        .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-wrap {
          white-space: pre-wrap;
          text-align: center;
        }
        @media (min-width: 768px) {
          .ecm-tabs .ant-tabs-tab {
            padding: 20px 0;
          }

          .ecm-tabs .ant-tabs-tab {
            font-size: var(--large-font-size);
          }
        }
      `}</style>
    </>
  )
}

export { Tabs }
