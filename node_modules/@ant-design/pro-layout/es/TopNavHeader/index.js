function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { debounce } from '../utils/utils';
import { defaultRenderLogoAndTitle } from '../SiderMenu/SiderMenu';
import './index.less';
import BaseMenu from '../SiderMenu/BaseMenu';

var TopNavHeader = function TopNavHeader(props) {
  var ref = useRef(null);
  var theme = props.theme,
      onMenuHeaderClick = props.onMenuHeaderClick,
      contentWidth = props.contentWidth,
      rightContentRender = props.rightContentRender,
      propsClassName = props.className,
      style = props.style;
  var baseClassName = 'ant-pro-top-nav-header';
  var headerDom = defaultRenderLogoAndTitle(props);
  var className = classNames(baseClassName, propsClassName, {
    light: theme === 'light'
  });

  var _useState = useState('auto'),
      _useState2 = _slicedToArray(_useState, 2),
      rightSize = _useState2[0],
      setRightSize = _useState2[1];

  return React.createElement("div", {
    className: className,
    style: style
  }, React.createElement("div", {
    ref: ref,
    className: "".concat(baseClassName, "-main ").concat(contentWidth === 'Fixed' ? 'wide' : '')
  }, headerDom && React.createElement("div", {
    className: "".concat(baseClassName, "-left"),
    onClick: onMenuHeaderClick
  }, React.createElement("div", {
    className: "".concat(baseClassName, "-logo"),
    key: "logo",
    id: "logo"
  }, headerDom)), React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'hidden'
    },
    className: "".concat(baseClassName, "-menu")
  }, React.createElement(BaseMenu, Object.assign({}, props, props.menuProps))), rightContentRender && React.createElement("div", {
    style: {
      minWidth: rightSize
    }
  }, React.createElement(ResizeObserver, {
    onResize: debounce(function (_ref) {
      var width = _ref.width;

      if (!width) {
        return;
      }

      setRightSize(width);
    }, 200)
  }, React.createElement("div", {
    style: {
      paddingRight: 8
    }
  }, rightContentRender(Object.assign({}, props)))))));
};

export default TopNavHeader;