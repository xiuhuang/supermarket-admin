import React, { PureComponent } from 'react';
import { Button, Row, Col, Input, Icon, Checkbox, Modal, Spin, message } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
import Authorized from '@/utils/Authorized';
import groupData from './data';

const { check } = Authorized;
const { confirm } = Modal;

// function renderIndeterminateData(competenceList) {
//   competenceList.map(firstCompete => {
//     const firstCompetence = firstCompete;
//     let firstChildrenLen = firstCompetence.children.length;
//     let firstChildrenCheckLen = 0;
//     if (firstCompetence.children.length > 0) {
//       firstCompetence.children.map(secondCompet => {
//         const secondCompetence = secondCompet;
//         const secondChildrenLen = secondCompetence.children.length;
//         let secondChildrenCheckLen = 0;
//         firstChildrenLen += secondChildrenLen;
//         if (secondChildrenLen) {
//           secondCompetence.children.map(thirdCompete => {
//             const thirdCompetence = thirdCompete;
//             if (thirdCompetence.checked) {
//               secondChildrenCheckLen += 1;
//               firstChildrenCheckLen += 1;
//             }
//             return false;
//           });
//           if (secondChildrenCheckLen > 0) {
//             secondCompetence.checked = true;
//           } else {
//             secondCompetence.checked = false;
//           }
//           if (secondChildrenCheckLen > 0 && secondChildrenCheckLen < secondChildrenLen) {
//             secondCompetence.indeterminate = true;
//           } else {
//             secondCompetence.indeterminate = false;
//           }
//         } else {
//           secondCompetence.indeterminate = false;
//         }
//         if (secondCompetence.checked) {
//           firstChildrenCheckLen += 1;
//         }
//         return false;
//       });
//       if (firstChildrenCheckLen > 0) {
//         firstCompetence.checked = true;
//       } else {
//         firstCompetence.checked = false;
//       }
//       if (firstChildrenCheckLen > 0 && firstChildrenCheckLen < firstChildrenLen) {
//         firstCompetence.indeterminate = true;
//       } else {
//         firstCompetence.indeterminate = false;
//       }
//     }
//     return false;
//   });
//   return competenceList;
// }

const getMenuIds = competenceList => {
  const menuIds = [];
  function mapList(list) {
    list.map(item => {
      if (item.checked || item.indeterminate) {
        menuIds.push(item.id);
      }
      if (item.children.length > 0) {
        mapList(item.children);
      }
      return false;
    });
  }
  mapList(competenceList);
  return menuIds;
};

/* eslint react/no-multi-comp:0 */
@connect(({ competence, loading }) => ({
  competence,
  loading: loading.models.competence,
}))
class CompetenceManagement extends PureComponent {
  state = {
    tabCurrentKey: 1,
    tabsList: [
      {
        title: '功能授权',
        key: 1,
      },
    ],
    competenceList: groupData,
    rolesList: [],
    userGropList: [],
    searchRolesList: [
      { roleId: '0001', roleName: '管理员' },
      { roleId: '0002', roleName: '普通用户' },
    ],
    searchUsersList: [],
    currentRoleId: '',
    currentGroupId: '',
    isChange: false,
  };

  componentDidMount() {}

  //   getCompetenceList() {
  //     const { tabCurrentKey, currentRoleId, currentGroupId } = this.state;
  //     const { dispatch } = this.props;
  //     if (tabCurrentKey === 1) {
  //       dispatch({
  //         type: 'competence/getCompetenceListByRoleId',
  //         payload: {
  //           roleId: currentRoleId,
  //         },
  //         callback: res => {
  //           if (res.code === '200') {
  //             let { competenceList } = this.state;
  //             // competenceList = renderIndeterminateData(res.data);
  //             this.setState({
  //               competenceList,
  //             });
  //           }
  //         },
  //       });
  //     } else {
  //       dispatch({
  //         type: 'competence/getCompetenceListByGroupId',
  //         payload: {
  //           groupIds: currentGroupId,
  //         },
  //         callback: res => {
  //           if (res.code === '200') {
  //             let { competenceList } = this.state;
  //             // competenceList = renderIndeterminateData(res.data);
  //             this.setState({
  //               competenceList,
  //             });
  //           }
  //         },
  //       });
  //     }
  //   }

    getCompetenceListByRolesId(id) {
      this.isSaveData(() => {
        this.setState(
          {
            isChange: false,
            currentRoleId: id,
          },
          // this.getCompetenceList,
        );
      });
    }

  //   getCompetenceListByUserGropId(id) {
  //     this.isSaveData(() => {
  //       this.setState(
  //         {
  //           isChange: false,
  //           currentGroupId: id,
  //         },
  //         this.getCompetenceList,
  //       );
  //     });
  //   }

  isSaveData(callback) {
    const { isChange, tabCurrentKey } = this.state;
    if (isChange && check('auth:menu:edit', true)) {
      confirm({
        title: '温馨提示',
        content:
          tabCurrentKey === 1
            ? '该角色的权限列表有编辑，是否保存？'
            : '该用户组的权限列表有编辑，是否保存？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.save();
          if (callback) callback();
        },
        onCancel: () => {
          if (callback) callback();
        },
      });
    } else if (callback) callback();
  }

  tabClick(key) {
    this.isSaveData(() => {
      this.setState(
        {
          isChange: false,
          tabCurrentKey: key,
        },
        this.getCompetenceList,
      );
    });
  }

  searchText(e) {
    const { tabCurrentKey, rolesList, userGropList } = this.state;
    const searchList = [];
    const { value } = e.target;
    if (tabCurrentKey === 1) {
      if (!value) {
        this.setState({
          searchRolesList: rolesList,
        });
        return false;
      }
      rolesList.map(role => {
        if (role.roleName.indexOf(value) > -1) {
          searchList.push(role);
        }
        return false;
      });
      this.setState({
        searchRolesList: searchList,
      });
    } else {
      if (!value) {
        this.setState({
          searchUsersList: userGropList,
        });
        return false;
      }
      userGropList.map(userGrop => {
        if (userGrop.userGroupName.indexOf(value) > -1) {
          searchList.push(userGrop);
        }
        return false;
      });
      this.setState({
        searchUsersList: searchList,
      });
    }
    return false;
  }

  checkedAll(firstCompete, preIndex) {
    this.setState({
      isChange: true,
    });
    const firstCompetence = firstCompete;
    const { competenceList } = this.state;
    firstCompetence.checked = !firstCompetence.checked;
    firstCompetence.children.map(secondCompete => {
      const secondCompetence = secondCompete;
      secondCompetence.checked = firstCompetence.checked;
      secondCompetence.children.map(thirdCompete => {
        const thirdCompetence = thirdCompete;
        thirdCompetence.checked = firstCompetence.checked;
        return false;
      });
      return false;
    });
    competenceList[preIndex] = firstCompetence;
    // competenceList = renderIndeterminateData(competenceList);
    this.setState({
      competenceList: [...competenceList],
    });
  }

  childrenCheckedAll(secondCompete, preIndex, index) {
    this.setState({
      isChange: true,
    });
    const secondCompetence = secondCompete;
    const { competenceList } = this.state;
    secondCompetence.checked = !secondCompetence.checked;
    secondCompetence.children.map(thirdCompete => {
      const thirdCompetence = thirdCompete;
      thirdCompetence.checked = secondCompetence.checked;
      return false;
    });
    competenceList[preIndex].children[index] = secondCompetence;
    // competenceList = renderIndeterminateData(competenceList);
    this.setState({
      competenceList: [...competenceList],
    });
  }

  checkBox(thirdCompete, preIndex, index, childIndex) {
    this.setState({
      isChange: true,
    });
    const thirdCompetence = thirdCompete;
    const { competenceList } = this.state;
    thirdCompetence.checked = !thirdCompetence.checked;
    competenceList[preIndex].children[index].children[childIndex] = thirdCompetence;
    // competenceList = renderIndeterminateData(competenceList);
    this.setState({
      competenceList: [...competenceList],
    });
  }

  save() {
    const { tabCurrentKey, currentGroupId, currentRoleId, competenceList } = this.state;
    const { dispatch } = this.props;

    const permissionIds = getMenuIds(competenceList);
    if (tabCurrentKey === 1) {
      dispatch({
        type: 'competence/saveRoleMenu',
        payload: {
          roleId: currentRoleId,
          menuIds: permissionIds.join(','),
        },
        callback: res => {
          if (res.code === '200') {
            this.setState({
              isChange: false,
            });
            message.success(res.message);
          }
        },
      });
    } else {
      dispatch({
        type: 'competence/saveGroupMenu',
        payload: {
          userGroupId: currentGroupId,
          permissionIds: permissionIds.join(','),
        },
        callback: res => {
          if (res.code === '200') {
            this.setState({
              isChange: false,
            });
            message.success(res.message);
          }
        },
      });
    }
  }

  readerTabs() {
    const { tabsList, tabCurrentKey } = this.state;
    return (
      <div className={styles.tabs}>
        <Button type="primary" className={styles.saveBtn} onClick={() => this.save()}>
          保存
        </Button>
        <ul>
          {tabsList.map(tab => (
            <li
              className={tab.key === tabCurrentKey ? styles.active : ''}
              key={tab.key}
              onClick={() => this.tabClick(tab.key)}
            >
              {tab.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderRoles() {
    const {
      searchRolesList,
      searchUsersList,
      currentRoleId,
      currentGroupId,
      tabCurrentKey,
    } = this.state;
    const ulH = window.innerHeight - 480;
    return (
      <div className={styles.roles}>
        <div className={tabCurrentKey === 2 ? styles.none : null}>
          <Input
            placeholder="请输入角色名"
            onChange={e => this.searchText(e)}
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <div className={styles.rolesList}>
            <ul style={{ height: `${ulH}px` }}>
              {searchRolesList.map(item => (
                <li
                  key={item.roleId}
                  className={currentRoleId === item.roleId ? styles.active : null}
                  onClick={() => this.getCompetenceListByRolesId(item.roleId)}
                >
                  {item.roleName}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={tabCurrentKey === 1 ? styles.none : null}>
          <Input
            placeholder="请输入用户组名"
            onChange={e => this.searchText(e)}
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <div className={styles.rolesList}>
            <ul style={{ height: `${ulH}px` }}>
              {searchUsersList.map(item => (
                <li
                  key={item.userGroupId}
                  className={currentGroupId === item.userGroupId ? styles.active : null}
                  onClick={() => this.getCompetenceListByUserGropId(item.userGroupId)}
                >
                  {item.userGroupName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderCompeteTable() {
    const { competenceList } = this.state;
    return (
      <div className={styles.competeTable}>
        <table>
          <thead>
            <tr>
              <th width="30">一级</th>
              <th width="30">二级</th>
              <th width="40">权限配置细则</th>
            </tr>
          </thead>
          {competenceList.map((firstCompetence, index) => this.renderTr(firstCompetence, index))}
        </table>
      </div>
    );
  }

  renderTr(firstCompetence, preIndex) {
    return (
      <tbody key={firstCompetence.id}>
        {firstCompetence.children.map((secondCompetence, index) => (
          <tr key={secondCompetence.id}>
            {index === 0 ? (
              <td rowSpan={firstCompetence.children.length} style={{ width: '20%' }}>
                <Checkbox
                  checked={firstCompetence.checked}
                  value={firstCompetence.id}
                  className={styles.competeCheckbox}
                  indeterminate={firstCompetence.indeterminate}
                  onChange={() => this.checkedAll(firstCompetence, preIndex)}
                >
                  {firstCompetence.name}
                </Checkbox>
              </td>
            ) : null}
            <td style={{ width: '20%' }}>
              <Checkbox
                checked={secondCompetence.checked}
                className={styles.competeCheckbox}
                indeterminate={secondCompetence.indeterminate}
                onChange={() => this.childrenCheckedAll(secondCompetence, preIndex, index)}
              >
                {secondCompetence.name}
              </Checkbox>
            </td>
            <td className={styles.competeTd}>
              {secondCompetence.children.map((thirdCompetence, childIndex) => (
                <Checkbox
                  checked={thirdCompetence.checked}
                  key={thirdCompetence.id}
                  className={styles.competeCheckbox}
                  onChange={() => this.checkBox(thirdCompetence, preIndex, index, childIndex)}
                >
                  {thirdCompetence.name}
                </Checkbox>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  render() {
    return (
      <PageHeaderWrapper>
        <div className={styles.competContainer}>
          {this.readerTabs()}
          <Row className={styles.competContent}>
            <Col span={6} style={{ paddingRight: 20 }}>
              {this.renderRoles()}
            </Col>
            <Col span={18}>{this.renderCompeteTable()}</Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CompetenceManagement;
