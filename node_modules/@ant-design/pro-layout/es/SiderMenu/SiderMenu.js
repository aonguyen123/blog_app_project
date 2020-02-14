import "antd/es/menu/style";
import _Menu from "antd/es/menu";
import "antd/es/layout/style";
import _Layout from "antd/es/layout";
import React from 'react';
import classNames from 'classnames';
import './index.less';
import BaseMenu from './BaseMenu';
import MenuCounter from './Counter';
var Sider = _Layout.Sider;
export var defaultRenderLogo = function defaultRenderLogo(logo) {
  if (typeof logo === 'string') {
    return React.createElement("img", {
      src: logo,
      alt: "logo"
    });
  }

  if (typeof logo === 'function') {
    return logo();
  }

  return logo;
};
export var defaultRenderLogoAndTitle = function defaultRenderLogoAndTitle(props) {
  var _props$logo = props.logo,
      logo = _props$logo === void 0 ? 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg' : _props$logo,
      title = props.title,
      menuHeaderRender = props.menuHeaderRender;

  if (menuHeaderRender === false) {
    return null;
  }

  var logoDom = defaultRenderLogo(logo);
  var titleDom = React.createElement("h1", null, title);

  if (menuHeaderRender) {
    // when collapsed, no render title
    return menuHeaderRender(logoDom, props.collapsed ? null : titleDom, props);
  }

  return React.createElement("a", {
    href: "/"
  }, logoDom, props.collapsed ? null : titleDom);
};

var SiderMenu = function SiderMenu(props) {
  var collapsed = props.collapsed,
      fixSiderbar = props.fixSiderbar,
      _onCollapse = props.onCollapse,
      theme = props.theme,
      _props$siderWidth = props.siderWidth,
      siderWidth = _props$siderWidth === void 0 ? 256 : _props$siderWidth,
      isMobile = props.isMobile,
      onMenuHeaderClick = props.onMenuHeaderClick,
      _props$breakpoint = props.breakpoint,
      breakpoint = _props$breakpoint === void 0 ? 'lg' : _props$breakpoint,
      style = props.style,
      links = props.links,
      onOpenChange = props.onOpenChange;

  var _MenuCounter$useConta = MenuCounter.useContainer(),
      flatMenus = _MenuCounter$useConta.flatMenus;

  var siderClassName = classNames('ant-pro-sider-menu-sider', {
    'fix-sider-bar': fixSiderbar,
    light: theme === 'light'
  });
  var headerDom = defaultRenderLogoAndTitle(props);
  return React.createElement(Sider, {
    collapsible: true,
    trigger: null,
    collapsed: collapsed,
    breakpoint: breakpoint === false ? undefined : breakpoint,
    onCollapse: function onCollapse(collapse) {
      if (!isMobile) {
        if (_onCollapse) {
          _onCollapse(collapse);
        }
      }
    },
    style: style,
    width: siderWidth,
    theme: theme,
    className: siderClassName
  }, headerDom && React.createElement("div", {
    className: "ant-pro-sider-menu-logo",
    onClick: onMenuHeaderClick,
    id: "logo"
  }, headerDom), flatMenus && React.createElement(BaseMenu, Object.assign({}, props, {
    mode: "inline",
    handleOpenChange: onOpenChange,
    style: {
      padding: '16px 0',
      width: '100%'
    }
  })), links && links.length > 0 && React.createElement("div", {
    className: "ant-pro-sider-menu-links"
  }, React.createElement(_Menu, {
    theme: theme,
    className: "ant-pro-sider-menu-link-menu",
    selectedKeys: [],
    openKeys: [],
    mode: "inline"
  }, (links || []).map(function (node, index) {
    return (// eslint-disable-next-line react/no-array-index-key
      React.createElement(_Menu.Item, {
        key: index
      }, node)
    );
  }))));
};

export default SiderMenu;