import './index.less';
import React from 'react';
import classNames from 'classnames';
export default (function (_ref) {
  var className = _ref.className,
      links = _ref.links,
      copyright = _ref.copyright,
      style = _ref.style;

  if ((links == null || links === false || Array.isArray(links) && links.length === 0) && (copyright == null || copyright === false)) {
    return null;
  }

  var clsString = classNames('ant-pro-global-footer', className);
  return React.createElement("footer", {
    className: clsString,
    style: style
  }, links && React.createElement("div", {
    className: "ant-pro-global-footer-links"
  }, links.map(function (link) {
    return React.createElement("a", {
      key: link.key,
      title: link.key,
      target: link.blankTarget ? '_blank' : '_self',
      href: link.href
    }, link.title);
  })), copyright && React.createElement("div", {
    className: "ant-pro-global-footer-copyright"
  }, copyright));
});