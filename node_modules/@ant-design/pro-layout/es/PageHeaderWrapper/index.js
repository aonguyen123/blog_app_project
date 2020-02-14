import "antd/es/page-header/style";
import _PageHeader from "antd/es/page-header";
import "antd/es/tabs/style";
import _Tabs from "antd/es/tabs";

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import './index.less';
import GridContent from '../GridContent';
import RouteContext from '../RouteContext';
var prefixedClassName = 'ant-pro-page-header-wrap';
/**
 * render Footer tabList
 * In order to be compatible with the old version of the PageHeader
 * basically all the functions are implemented.
 */

var renderFooter = function renderFooter(_ref) {
  var tabList = _ref.tabList,
      tabActiveKey = _ref.tabActiveKey,
      onTabChange = _ref.onTabChange,
      tabBarExtraContent = _ref.tabBarExtraContent,
      tabProps = _ref.tabProps;

  if (tabList && tabList.length) {
    return React.createElement(_Tabs, Object.assign({
      className: "".concat(prefixedClassName, "-tabs"),
      activeKey: tabActiveKey,
      onChange: function onChange(key) {
        if (onTabChange) {
          onTabChange(key);
        }
      },
      tabBarExtraContent: tabBarExtraContent
    }, tabProps), tabList.map(function (item) {
      return React.createElement(_Tabs.TabPane, Object.assign({}, item, {
        tab: item.tab,
        key: item.key
      }));
    }));
  }

  return null;
};

var renderPageHeader = function renderPageHeader(content, extraContent) {
  if (!content && !extraContent) {
    return null;
  }

  return React.createElement("div", {
    className: "".concat(prefixedClassName, "-detail")
  }, React.createElement("div", {
    className: "".concat(prefixedClassName, "-main")
  }, React.createElement("div", {
    className: "".concat(prefixedClassName, "-row")
  }, content && React.createElement("div", {
    className: "".concat(prefixedClassName, "-content")
  }, content), extraContent && React.createElement("div", {
    className: "".concat(prefixedClassName, "-extraContent")
  }, extraContent))));
};

var defaultPageHeaderRender = function defaultPageHeaderRender(props, value) {
  var title = props.title,
      content = props.content,
      pageHeaderRender = props.pageHeaderRender,
      extraContent = props.extraContent,
      style = props.style,
      restProps = __rest(props, ["title", "content", "pageHeaderRender", "extraContent", "style"]);

  if (pageHeaderRender) {
    return pageHeaderRender(Object.assign(Object.assign({}, props), value));
  }

  var pageHeaderTitle = title;

  if (!title && title !== false) {
    pageHeaderTitle = value.title;
  }

  return React.createElement(React.Fragment, null, React.createElement(Helmet, null, React.createElement("meta", {
    name: "description",
    content: value.title
  }), typeof props.content === 'string' && React.createElement("meta", {
    name: "description",
    content: props.content
  })), React.createElement(_PageHeader, Object.assign({}, value, {
    title: pageHeaderTitle
  }, restProps, {
    footer: renderFooter(restProps)
  }), renderPageHeader(content, extraContent)));
};

var PageHeaderWrapper = function PageHeaderWrapper(props) {
  var children = props.children,
      style = props.style;
  var value = useContext(RouteContext);
  var className = classNames(prefixedClassName, props.className);
  return React.createElement("div", {
    style: style,
    className: className
  }, React.createElement("div", {
    className: "".concat(prefixedClassName, "-page-header-warp")
  }, React.createElement(GridContent, null, defaultPageHeaderRender(props, value))), children ? React.createElement(GridContent, null, React.createElement("div", {
    className: "".concat(prefixedClassName, "-children-content")
  }, children)) : null);
};

export default PageHeaderWrapper;