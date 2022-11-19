import 'antd/lib/button/style/index.css'

import { Button as AntButton } from 'antd'

enum ButtonSize {
  SMALL = 'small',
  NORMAL = 'normal',
  MEDIUM = 'medium',
  BIG = 'big',
  BIGTOO = 'bigtoo',
}

enum ButtonType {
  SOLID = 'solid',
  OUTLINE = 'outline',
  LINK = 'link',
  LINK_YELLOW = 'link-yellow',
}

export const Button = ({
  className = '',
  size = ButtonSize.NORMAL,
  style = ButtonType.SOLID,
  ...props
}: React.PropsWithChildren<any>): JSX.Element => {
  return (
    <>
      <AntButton
        {...props}
        className={`ecm-button ${size} ${className} ${style} hoverable`}
        style={props.radius ? { borderRadius: props.radius } : null}
      />
      <style jsx global>{`
        .ecm-button {
          display: flex;
          align-items: center;
          justify-content: center;
          height: auto;
          border-radius: 3px;
          border-width: 2px;
          overflow: hidden;
        }

        .ecm-button.ant-btn-default {
          color: var(--primary-color);
          font-weight: var(--bold-font-weight);
          border-color: var(--primary-color);
        }

        .ecm-button.ant-btn-default {
          color: var(--primary-color);
          font-weight: var(--bold-font-weight);
          border-color: var(--primary-color);
        }

        .ecm-button.ant-btn-primary {
          background: var(--primary-color);
          border-color: var(--primary);
          color: var(--white);
          box-shadow: none;
        }

        .ecm-button.big {
          padding: 5px 15px;
          min-width: 240px;
          font-weight: var(--bold-font-weight);
        }
        .ecm-button.bigtoo {
          padding: 20px 15px;
          min-width: 240px;
          font-weight: var(--bold-font-weight);
        }

        .ecm-button.bigtoo:hover {
          background-color: #ffffff;
          color: #ff0a0a;
        }

        .ecm-button.medium {
          padding: 7px 10px;
          font-size: var(--larger-font-size);
        }

        .ecm-button.small {
          padding: 4px 7px;
          font-size: var(--medium-font-size);
        }

        .ecm-button.solid {
          background: var(--primary-color);
          color: var(--white);
        }

        .ecm-button.outline {
          background: var(--white);
          color: var(--primary-color);
        }

        .ecm-button.link {
          box-shadow: none;
          border: 0;
          padding: 0;
        }

        .ecm-button.link:after {
          display: none;
        }

        .ecm-button.link-yellow {
          box-shadow: none;
          border: 0;
          padding: 0;
        }

        .ecm-button.link-yellow:after {
          display: none;
        }

        @media (min-width: 768px) {
          .ecm-button.big {
            padding: 7px 15px;
          }
        }
      `}</style>
    </>
  )
}
