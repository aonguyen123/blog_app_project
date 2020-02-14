"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBreadcrumbProps = exports.genBreadcrumbProps = exports.getBreadcrumbFromProps = exports.getBreadcrumb = void 0;

var _react = _interopRequireDefault(require("react"));

var _pathToRegexp = _interopRequireDefault(require("path-to-regexp"));

var _pathTools = require("./pathTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// 渲染Breadcrumb 子节点
// Render the Breadcrumb child node
var defaultItemRender = function defaultItemRender(_ref) {
  var breadcrumbName = _ref.breadcrumbName,
      path = _ref.path;
  return _react.default.createElement("a", {
    href: path
  }, breadcrumbName);
};

var renderItemLocal = function renderItemLocal(item, props) {
  var formatMessage = props.formatMessage,
      _props$menu = props.menu,
      menu = _props$menu === void 0 ? {
    locale: false
  } : _props$menu;

  if (item.locale && formatMessage && menu.locale !== false) {
    return formatMessage({
      id: item.locale,
      defaultMessage: item.name
    });
  }

  return item.name;
};

var getBreadcrumb = function getBreadcrumb(breadcrumbMap, url) {
  if (!breadcrumbMap) {
    return {
      path: ''
    };
  }

  var breadcrumbItem = breadcrumbMap.get(url);

  if (!breadcrumbItem) {
    // Find the first matching path in the order defined by route config
    // 按照 route config 定义的顺序找到第一个匹配的路径
    var targetPath = _toConsumableArray(breadcrumbMap.keys()).find(function (path) {
      return (// remove ? ,不然会重复
        (0, _pathToRegexp.default)(path.replace('?', '')).test(url)
      );
    });

    if (targetPath) {
      breadcrumbItem = breadcrumbMap.get(targetPath);
    }
  }

  return breadcrumbItem || {
    path: ''
  };
};

exports.getBreadcrumb = getBreadcrumb;

var getBreadcrumbFromProps = function getBreadcrumbFromProps(props) {
  var location = props.location,
      breadcrumbMap = props.breadcrumbMap;
  return {
    location: location,
    breadcrumbMap: breadcrumbMap
  };
}; // Generated according to props


exports.getBreadcrumbFromProps = getBreadcrumbFromProps;

var conversionFromProps = function conversionFromProps(props) {
  var _props$breadcrumbList = props.breadcrumbList,
      breadcrumbList = _props$breadcrumbList === void 0 ? [] : _props$breadcrumbList;
  return breadcrumbList.map(function (item) {
    var title = item.title,
        href = item.href;
    return {
      path: href,
      breadcrumbName: title
    };
  }).filter(function (item) {
    return item.path;
  });
};

var conversionFromLocation = function conversionFromLocation() {
  var routerLocation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    pathname: '/'
  };
  var breadcrumbMap = arguments.length > 1 ? arguments[1] : undefined;
  var props = arguments.length > 2 ? arguments[2] : undefined;

  if (!routerLocation) {
    return [];
  } // Convertor the url to an array


  var pathSnippets = (0, _pathTools.urlToList)(routerLocation.pathname); // Loop data mosaic routing

  var extraBreadcrumbItems = pathSnippets.map(function (url) {
    var currentBreadcrumb = getBreadcrumb(breadcrumbMap, url);

    if (currentBreadcrumb.inherited) {
      return {
        path: '',
        breadcrumbName: ''
      };
    }

    var name = renderItemLocal(currentBreadcrumb, props);
    var hideInBreadcrumb = currentBreadcrumb.hideInBreadcrumb;
    return name && !hideInBreadcrumb ? {
      path: url,
      breadcrumbName: name,
      component: currentBreadcrumb.component
    } : {
      path: '',
      breadcrumbName: ''
    };
  }).filter(function (item) {
    return item && item.path;
  });
  return extraBreadcrumbItems;
};
/**
 * 将参数转化为面包屑
 * Convert parameters into breadcrumbs
 */


var genBreadcrumbProps = function genBreadcrumbProps(props) {
  var breadcrumbList = props.breadcrumbList;

  var _getBreadcrumbFromPro = getBreadcrumbFromProps(props),
      location = _getBreadcrumbFromPro.location,
      breadcrumbMap = _getBreadcrumbFromPro.breadcrumbMap;

  if (breadcrumbList && breadcrumbList.length) {
    return conversionFromProps(props);
  } // 根据 location 生成 面包屑
  // Generate breadcrumbs based on location


  if (location && location.pathname && breadcrumbMap) {
    return conversionFromLocation(location, breadcrumbMap, props);
  }

  return [];
}; // use breadcrumbRender to change routes


exports.genBreadcrumbProps = genBreadcrumbProps;

var getBreadcrumbProps = function getBreadcrumbProps(props) {
  var breadcrumbRender = props.breadcrumbRender,
      propsItemRender = props.itemRender;
  var routesArray = genBreadcrumbProps(props);
  var itemRender = propsItemRender || defaultItemRender;
  var routes = routesArray; // if routes.length =1, don't show it

  if (breadcrumbRender) {
    routes = breadcrumbRender(routes) || [];
  }

  if (routes && routes.length < 2) {
    routes = undefined;
  }

  return {
    routes: routes,
    itemRender: itemRender
  };
};

exports.getBreadcrumbProps = getBreadcrumbProps;