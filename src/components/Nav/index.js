import React, { Component } from 'react';
import NavLink from 'umi/navlink';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { Menu } from 'antd';
import IconFont from './../IconFont';
import menuConfig from '../../config/routerConfig.js';
import style from './index.less';

const { SubMenu, Item } = Menu;
@connect(({ system }) => ({
  system,
}))
class Nav extends Component {
  state = {};
  componentWillMount() {
    const menuNodeTree = this.renderMenu(menuConfig);
    this.setState({
      menuNodeTree,
      pathname: this.props.location.pathname,
    });
  }
  renderMenu = menuConfig => {
    return menuConfig.map(item => {
      if (item.routes) {
        return (
          <SubMenu
            title={
              <span>
                {item.icon && <IconFont type={item.icon} />}
                <span>{item.title}</span>
              </span>
            }
            key={item.path}
          >
            {this.renderMenu(item.routes)}
          </SubMenu>
        );
      }
      return (
        <Item title={item.title} key={item.path}>
          {item.isLevel ? (
            <NavLink to={item.path}>
              {item.icon && <IconFont type={item.icon} />}
              <span>{item.title}</span>
            </NavLink>
          ) : (
            <span>
              {item.icon && <IconFont type={item.icon} />}
              <span>{item.title}</span>
            </span>
          )}
        </Item>
      );
    });
  };
  render() {
    return (
      <div className={style.nav_wrapper}>
        <div className={style.logo}>
          <img src={require('./../../assets/logo.svg')} alt="logo" />
          {this.props.system.collapsed ? '' : <h1>叮咚管理</h1>}
        </div>
        <div className={style.menu_wrapper}>
          <div className={style.menu}>
            <Menu mode="inline" theme="dark" defaultSelectedKeys={[this.state.pathname]}>
              {this.state.menuNodeTree}
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Nav);
