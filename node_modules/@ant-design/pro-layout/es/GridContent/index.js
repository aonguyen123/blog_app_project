import './GridContent.less';
import React, { useContext } from 'react';
import classNames from 'classnames';
import RouteContext from '../RouteContext';
/**
 * This component can support contentWidth so you don't need to calculate the width
 * contentWidth=Fixed, width will is 1200
 * @param props
 */

var GridContent = function GridContent(props) {
  var value = useContext(RouteContext);
  var children = props.children,
      propsContentWidth = props.contentWidth,
      propsClassName = props.className,
      style = props.style;
  var contentWidth = propsContentWidth || value.contentWidth;
  var className = 'ant-pro-grid-content';

  if (contentWidth === 'Fixed') {
    className = 'ant-pro-grid-content wide';
  }

  return React.createElement("div", {
    className: classNames(className, propsClassName),
    style: style
  }, children);
};

export default GridContent;