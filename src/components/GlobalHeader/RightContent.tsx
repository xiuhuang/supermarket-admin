import { Icon, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';
import NoticeIconView from './NoticeIconView';

export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  // const { theme, layout } = props;
  const className = `${styles.right}  ${styles.dark}`;
  return (
    <div className={className}>
      <Tooltip title="门户首页">
        <a href="http://47.103.35.164:8083" rel="noopener noreferrer" className={styles.action}>
          <Icon type="home" />
        </a>
      </Tooltip>
      <Tooltip title="使用文档">
        <a target="_blank" href="" rel="noopener noreferrer" className={styles.action}>
          <Icon type="question-circle-o" />
        </a>
      </Tooltip>
      <Avatar menu />
      <SelectLang className={styles.action} />
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
