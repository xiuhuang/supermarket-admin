import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Tree,
  Button,
  Icon,
  Input,
  Tooltip,
  Menu,
  Form,
  Dropdown,
  Modal,
  message,
  TreeSelect,
  Affix,
} from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import StandardTable from './components/StandardTable';
import styles from './index.less';
import Authorized from '@/utils/Authorized';
import UserData from './data';
import DepartData from './departData';
// import { checkDeptName } from '@/utils/validator';
// import IconFont from '@/components/IconFont';

const { TreeNode } = Tree;
const { Search } = Input;
const FormItem = Form.Item;
const { confirm } = Modal;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateDepartModalForm = Form.create()(props => {
  const {
    departModalVisible,
    form,
    handleDepartAdd,
    handleDepartModalVisible,
    treeSelectData,
    editDepartOpt,
  } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      handleDepartAdd(fieldsValue, editDepartOpt, form.resetFields);
    });
  };
  const loopSelectTree = data => {
    if (data.length > 0) {
      return data.map(item => {
        if (item.children && item.children.length > 0) {
          return (
            <TreeNode title={item.name} key={item.id} value={item.id}>
              {loopSelectTree(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode title={item.name} key={item.id} value={item.id} />;
      });
    }
    return <TreeNode title="/" value={0} />;
  };

  return (
    <Modal
      destroyOnClose
      title={editDepartOpt.type === 'edit' ? '编辑部门' : '新建部门'}
      visible={departModalVisible}
      onOk={okHandle}
      className="form12"
      onCancel={() => handleDepartModalVisible()}
      closable={false}
    >
      <button
        type="button"
        className="ant-modal-close"
        onClick={() => handleDepartModalVisible(false)}
      >
        <span className="ant-modal-close-x">{/* <IconFont type="icon-shanchu1" /> */}</span>
      </button>
      {editDepartOpt.type === 'add' || editDepartOpt.type === 'departAdd' ? (
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上级部门">
          {form.getFieldDecorator('parentId', {
            rules: [{ required: true, message: '请选择上级部门' }],
            initialValue: editDepartOpt.parentId,
          })(
            <TreeSelect
              disabled={editDepartOpt.type === 'departAdd'}
              style={{ width: '100%' }}
              treeDefaultExpandAll
            >
              {loopSelectTree(treeSelectData)}
            </TreeSelect>,
          )}
        </FormItem>
      ) : null}
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="部门名称">
        {form.getFieldDecorator('name')(<Input placeholder="请输入部门名称" />)}
      </FormItem>
    </Modal>
  );
});

const getKeysByValue = (value, SysDeptTreeData) => {
  const expandedKeys = [];
  const getKey = treeData =>
    treeData.map(tree => {
      const treeNameToLower = (tree.name || '').toLowerCase();
      const valueToLower = (value || '').toLowerCase();
      if (treeNameToLower.indexOf(valueToLower) > -1) {
        expandedKeys.push(tree.id);
      }
      if (tree.children && tree.children.length > 0) {
        getKey(tree.children);
      }
      return false;
    });
  if (value) {
    getKey(SysDeptTreeData);
  } else {
    expandedKeys.push(SysDeptTreeData[0].id);
  }
  return expandedKeys;
};

/* eslint react/no-multi-comp:0 */
@connect(({ competence, loading }) => ({
  competence,
  loading: loading.models.competence,
}))
@Form.create()
class Department extends PureComponent {
  state = {
    selectedRows: [],
    expandForm: false,
    SysDeptTreeData: DepartData,
    searchValue: '',
    autoExpandParent: true,
    expandedKeys: [],
    selectedKeys: [],
    currentDepartInfo: {},
    treeSelectData: DepartData,
    departModalVisible: false,
    editDepartOpt: {
      type: 'add',
      parentId: '0',
      currentDepartInfo: {},
    },
    // visibleByAddUser: false,
  };

  columns = [
    {
      title: '姓名',
      dataIndex: 'userName',
    },
    {
      title: '登录帐号',
      dataIndex: 'loginName',
    },
    {
      title: '手机号',
      dataIndex: 'phonenumber',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '操作',
      render: (text, record) => <a onClick={() => this.handleRemoveUser([record])}>移除</a>,
    },
  ];

  pagination = {
    current: 1,
    pageSize: 10,
  };

  formValues = {};

  componentDidMount() {
    // this.getSysDeptTreeData();
  }

  onTreeSelect(checkedKeys) {
    const currentDepartInfo = this.getTreeNodeInfoById(checkedKeys[0]);
    if (checkedKeys.length > 0) {
      this.setState({
        currentDepartInfo,
        selectedKeys: checkedKeys,
      });
      this.handleTableList(currentDepartInfo.id);
    }
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange(e) {
    const { value } = e.target;
    const { SysDeptTreeData } = this.state;
    const expandedKeys = getKeysByValue(value, SysDeptTreeData);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }

  getTreeNodeInfoById(id) {
    const { SysDeptTreeData } = this.state;
    let treeInfo = {};
    const getTreeInfo = trees =>
      trees.map(tree => {
        if (tree.id === id) {
          treeInfo = tree;
        }
        if (tree.children && tree.children.length > 0) {
          return getTreeInfo(tree.children);
        }
        return false;
      });
    getTreeInfo(SysDeptTreeData);
    return treeInfo;
  }

  getSysDeptTreeData() {
    const { dispatch } = this.props;
    dispatch({
      type: 'competence/getAllDeptTreeData',
      callback: res => {
        if (res.code === '200') {
          const treeSelectData = [
            {
              name: '/',
              id: '0',
              children: res.data,
            },
          ];
          this.setState(
            {
              SysDeptTreeData: res.data,
              treeSelectData,
              selectedKeys: res.data.length > 0 ? [res.data[0].id] : [],
              expandedKeys: res.data.length > 0 ? [res.data[0].id] : [],
              currentDepartInfo: res.data.length > 0 ? res.data[0] : {},
            },
            this.handleTableList,
          );
        }
        return false;
      },
    });
  }

  delDepart = (e, depart) => {
    e.stopPropagation();
    confirm({
      title: '删除部门',
      content: (
        <span>
          请问您是否确认删除部门：<em className="em_color">{depart.name}</em> 吗？
        </span>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.clickDelDepartById(depart.id);
      },
    });
    return false;
  };

  clickDelDepartById = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'competence/delDepartById',
      payload: id,
      callback: res => {
        if (res.code === '200') {
          message.success(res.message);
          this.getSysDeptTreeData();
        }
      },
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleModalVisible = flag => {
    // this.setState({
    //   visibleByAddUser: !!flag,
    // });
  };

  handleMenuClick = e => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      message.info('请勾选用户');
      return;
    }
    switch (e.key) {
      case 'remove':
        this.handleRemoveUser(selectedRows);
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearchChange = params => {
    this.formValues = params;
    this.pagination.current = 1;
    this.handleTableList();
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    this.formValues = params;
    this.pagination = pagination;
    this.handleTableList();
  };

  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    this.pagination.current = 1;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.formValues = values;
      this.handleTableList();
    });
  };

  handleAddUsers(users) {
    const { currentDepartInfo } = this.state;
    const { dispatch } = this.props;
    const userIds = users.map(user => user.userId);
    dispatch({
      type: 'competence/addUsersInDepart',
      payload: {
        deptId: currentDepartInfo.id,
        userIds: userIds.join(','),
      },
      callback: res => {
        if (res.code === '200') {
          message.success(res.message);
          this.handleTableList();
        }
      },
    });
  }

  handleDepartModalVisible() {
    this.setState({
      departModalVisible: false,
    });
  }

  handleDepartAdd(fieldsValue, editDepartOpt, resetFields) {
    const { dispatch } = this.props;
    let params = {};
    if (editDepartOpt.type === 'edit') {
      params = {
        deptId: editDepartOpt.currentDepartInfo.id,
        deptName: fieldsValue.name,
      };
      dispatch({
        type: 'competence/editDepartById',
        payload: params,
        callback: res => {
          if (res.code === '200') {
            message.success(res.message);
            this.setState({
              departModalVisible: false,
            });
            this.getSysDeptTreeData();
            resetFields();
          }
        },
      });
    } else {
      params = {
        parentId: fieldsValue.parentId,
        deptName: fieldsValue.name,
      };
      dispatch({
        type: 'competence/addDepart',
        payload: params,
        callback: res => {
          if (res.code === '200') {
            message.success(res.message);
            this.setState({
              departModalVisible: false,
            });
            this.getSysDeptTreeData();
          }
        },
      });
    }
  }

  handleTableList(serId) {
    const { currentDepartInfo } = this.state;
    const { dispatch } = this.props;
    const { pagination, formValues } = this;
    const params = {
      ...formValues,
      relType: 1,
      serId: serId || currentDepartInfo.id,
      idType: 1,
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    };
    if (!params.serId) return;
    dispatch({
      type: 'competence/queryUserListByDepart',
      payload: params,
    });
  }

  handleRemoveUser(users) {
    const { currentDepartInfo } = this.state;
    const { dispatch } = this.props;
    Modal.confirm({
      title: '移除用户',
      content: (
        <span>
          确定要从{currentDepartInfo.name}移除
          <em className="em_color">{users.map(user => user.userName).join('、')}</em> 吗?
        </span>
      ),
      okText: '移除',
      cancelText: '取消',
      onOk: () => {
        const userIds = users.map(user => user.userId);
        dispatch({
          type: 'competence/removeUsersInDepart',
          payload: {
            deptId: currentDepartInfo.id,
            userIds: userIds.join(','),
          },
          callback: res => {
            if (res.code === '200') {
              message.success(res.message);
              this.handleTableList();
              this.setState({
                selectedRows: [],
              });
            }
          },
        });
      },
    });
  }

  addDepart(e, depart, type) {
    e.stopPropagation();
    this.setState({
      departModalVisible: true,
      editDepartOpt: {
        type,
        parentId: depart.id || '0',
        currentDepartInfo: {},
      },
    });
  }

  editDepart(e, depart, type) {
    e.stopPropagation();
    this.setState({
      departModalVisible: true,
      editDepartOpt: {
        type,
        parentId: depart.parentId || '0',
        currentDepartInfo: depart || {},
      },
    });
  }

  renderDepLeft() {
    const height = document.body.clientHeight - 84;
    return (
      <div className={styles.depLeft}>
        <Affix offsetTop={84}>
          <div className={styles.depLeftBox} style={{ maxHeight: height }}>
            <div className={styles.addDepBtn}>
              <Button type="primary" onClick={e => this.addDepart(e, {}, 'add')}>
                <Icon type="plus" />
                新建部门
              </Button>
            </div>
            <div className={styles.depLeftSearch}>
              <Search placeholder="请输入部门名称" onChange={e => this.onChange(e)} />
            </div>
            <div className={styles.depTree}>{this.renderTreeNode()}</div>
          </div>
        </Affix>
      </div>
    );
  }

  renderTreeNode() {
    const {
      SysDeptTreeData,
      autoExpandParent,
      expandedKeys,
      selectedKeys,
      searchValue = '',
    } = this.state;
    const loopTree = data =>
      data.map(item => {
        const itmeNameToLower = (item.name || '').toLowerCase();
        const searchValueToLower = (searchValue || '').toLowerCase();
        const index = itmeNameToLower.indexOf(searchValueToLower);
        const beforeStr = item.name.substr(0, index);
        const centerStr = item.name.substr(index, searchValue.length);
        const afterStr = item.name.substr(index + searchValue.length);
        const title =
          index > -1 && searchValue ? (
            <span>
              {beforeStr}
              <em style={{ color: '#f50', fontStyle: 'normal' }}>{centerStr}</em>
              {afterStr}
            </span>
          ) : (
            <span>{item.name}</span>
          );
        if (item.children && item.children.length > 0) {
          return (
            <TreeNode title={this.renderTreeNodeTitle(item, title)} key={item.id}>
              {loopTree(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode title={this.renderTreeNodeTitle(item, title)} key={item.id} />;
      });
    return (
      <Tree
        showLine
        onExpand={this.onExpand}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onSelect={checkedKeys => this.onTreeSelect(checkedKeys)}
        className={styles.treeNode}
        autoExpandParent={autoExpandParent}
      >
        {loopTree(SysDeptTreeData)}
      </Tree>
    );
  }

  renderTreeNodeTitle(depart, title) {
    return (
      <div>
        <div className={styles.treeTitle}>{title}</div>
        <div className={styles.posi}>
          <Tooltip title="编辑">
            <Icon
              type="edit"
              className="treeNodeIcon"
              onClick={e => this.editDepart(e, depart, 'edit')}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Icon
              type="minus-circle"
              onClick={e => this.delDepart(e, depart)}
              className="treeNodeIcon"
            />
          </Tooltip>
          <Tooltip title="新建">
            <Icon
              type="plus-circle"
              className="treeNodeIcon"
              onClick={e => this.addDepart(e, depart, 'departAdd')}
            />
          </Tooltip>
        </div>
      </div>
    );
  }

  renderDepRight() {
    const { currentDepartInfo, treeSelectData } = this.state;
    const loopSelectTree = data =>
      data.map(item => {
        if (item.children && item.children.length > 0) {
          return (
            <TreeNode title={item.name} key={item.id} value={item.id}>
              {loopSelectTree(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode title={item.name} key={item.id} value={item.id} />;
      });

    return (
      <div className={styles.depRight}>
        <h4 className={styles.depTitle}>部门信息</h4>
        <div className={styles.depInfo}>
          <Row className={styles.depInfoRow}>
            <Col span={8} className={styles.depInfoCol}>
              <i className={styles.depInfoRed}>*</i>
              上级部门：
            </Col>
            <Col span={10}>
              <TreeSelect
                disabled
                showLine
                style={{ width: '100%' }}
                value={currentDepartInfo.parentId}
                treeDefaultExpandAll
              >
                {loopSelectTree(treeSelectData)}
              </TreeSelect>
            </Col>
          </Row>
          <Row className={styles.depInfoRow}>
            <Col span={8} className={styles.depInfoCol}>
              <i className={styles.depInfoRed}>*</i>
              部门名称：
            </Col>
            <Col span={10}>
              <Input disabled value={currentDepartInfo.name} />
            </Col>
          </Row>
        </div>
        <h4 className={styles.depTitle}>用户列表</h4>
        <div>{this.renderDepUserList()}</div>
      </div>
    );
  }

  renderDepUserList() {
    const { selectedRows, expandForm } = this.state;
    // const {
    //   competence: { userListByDepart },
    //   loading,
    // } = this.props;
    const userListByDepart = UserData;
    return (
      <div className={styles.deptTableBox}>
        <div className={styles.advanceForm}>{this.renderAdvancedForm()}</div>
        <StandardTable
          selectedRows={selectedRows}
          data={userListByDepart}
          rowKey="userId"
          columns={this.columns}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleStandardTableChange}
          onChangeSearch={this.handleSearchChange}
          expandForm={expandForm}
        />
      </div>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">批量移除</Menu.Item>
      </Menu>
    );
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem>
              {getFieldDecorator('keyword')(
                <Input
                  placeholder="请输入搜索条件"
                  style={{ width: '196px' }}
                  prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />,
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary">
                关联用户
              </Button>
              <span style={{ marginLeft: '15px' }}>
                <Dropdown overlay={menu}>
                  <Button>
                    更多操作 <Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { departModalVisible, treeSelectData, editDepartOpt } = this.state;
    return (
      <PageHeaderWrapper title="部门管理">
        <div className={styles.departmentContainer}>
          <Row>
            <Col span={6}>{this.renderDepLeft()}</Col>
            <Col span={18}>{this.renderDepRight()}</Col>
          </Row>
        </div>
        <CreateDepartModalForm
          departModalVisible={departModalVisible}
          handleDepartModalVisible={() => this.handleDepartModalVisible()}
          treeSelectData={treeSelectData}
          editDepartOpt={editDepartOpt}
          handleDepartAdd={(fieldsValue, editDepartDto) =>
            this.handleDepartAdd(fieldsValue, editDepartDto)
          }
        />
      </PageHeaderWrapper>
    );
  }
}

export default Department;
