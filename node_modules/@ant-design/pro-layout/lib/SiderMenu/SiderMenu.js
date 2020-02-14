"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultRenderLogoAndTitle = exports.defaultRenderLogo = void 0;

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

require("antd/lib/layout/style");

var _layout = _interopRequireDefault(require("antd/lib/layout"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./index.less");

var _BaseMenu = _interopRequireDefault(require("./BaseMenu"));

var _Counter = _interopRequireDefault(require("./Counter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sider = _layout.default.Sider;

var defaultRenderLogo = function defaultRenderLogo(logo) {
  if (typeof logo === 'string') {
    return _react.default.createElement("img", {
      src: logo,
      alt: "logo"
    });
  }

  if (typeof logo === 'function') {
    return logo();
  }

  return logo;
};

exports.defaultRenderLogo = defaultRenderLogo;

var defaultRenderLogoAndTitle = function defaultRenderLogoAndTitle(props) {
  var _props$logo = props.logo,
      logo = _props$logo === void 0 ? 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg' : _props$logo,
      title = props.title,
      menuHeaderRender = props.menuHeaderRender;

  if (menuHeaderRender === false) {
    return null;
  }

  var logoDom = defaultRenderLogo(logo);

  var titleDom = _react.default.createElement("h1", null, title);

  if (menuHeaderRender) {
    // when collapsed, no render title
    return menuHeaderRender(logoDom, props.collapsed ? null : titleDom, props);
  }

  return _react.default.createElement("a", {
    href: "/"
  }, logoDom, props.collapsed ? null : titleDom);
};

exports.defaultRenderLogoAndTitle = defaultRenderLogoAndTitle;

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

  var _MenuCounter$useConta = _Counter.default.useContainer(),
      flatMenus = _MenuCounter$useConta.flatMenus;

  var siderClassName = (0, _classnames.default)('ant-pro-sider-menu-sider', {
    'fix-sider-bar': fixSiderbar,
    light: theme === 'light'
  });
  var headerDom = defaultRenderLogoAndTitle(props);
  return _react.default.createElement(Sider, {
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
  }, headerDom && _react.default.createElement("div", {
    className: "ant-pro-sider-menu-logo",
    onClick: onMenuHeaderClick,
    id: "logo"
  }, headerDom), flatMenus && _react.default.createElement(_BaseMenu.default, Object.assign({}, props, {
    mode: "inline",
    handleOpenChange: onOpenChange,
    style: {
      padding: '16px 0',
      width: '100%'
    }
  })), links && links.length > 0 && _react.default.createElement("div", {
    className: "ant-pro-sider-menu-links"
  }, _react.default.createElement(_menu.default, {
    theme: theme,
    className: "ant-pro-sider-menu-link-menu",
    selectedKeys: [],
    openKeys: [],
    mode: "inline"
  }, (links || []).map(function (node, index) {
    return (// eslint-disable-next-line react/no-array-index-key
      _react.default.createElement(_menu.default.Item, {
        key: index
      }, node)
    );
  }))));
};

var _default = SiderMenu;
exports.default = _default;