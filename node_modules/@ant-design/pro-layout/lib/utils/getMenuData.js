"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var mergePath = function mergePath() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var parentPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

  if ((0, _utils.isUrl)(path)) {
    return path;
  }

  if ((path || parentPath).startsWith('/')) {
    return path;
  }

  return "/".concat(parentPath, "/").concat(path).replace(/\/\//g, '/').replace(/\/\//g, '/');
}; // Conversion router to menu.


function formatter(props) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    path: '/'
  };
  var data = props.data,
      _props$menu = props.menu,
      menu = _props$menu === void 0 ? {
    locale: true
  } : _props$menu,
      formatMessage = props.formatMessage,
      authority = props.authority,
      parentName = props.parentName;

  if (!data) {
    return [];
  }

  return data.filter(function (item) {
    if (!item) {
      return false;
    }

    if (item.routes || item.children) {
      return true;
    }

    if (item.name && item.path) {
      return true;
    }

    return false;
  }).map(function () {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      path: '/'
    };

    if (!item.name) {
      return item;
    }

    var path = mergePath(item.path, parent ? parent.path : '/');
    var name = item.name;
    var locale = item.locale || "".concat(parentName || 'menu', ".").concat(name); // if enableMenuLocale use item.name,
    // close menu international

    var localeName = menu.locale !== false && formatMessage ? formatMessage({
      id: locale,
      defaultMessage: name
    }) : name;
    var _parent$parentKeys = parent.parentKeys,
        parentKeys = _parent$parentKeys === void 0 ? [] : _parent$parentKeys;
    var result = Object.assign(Object.assign({}, item), {
      path: path,
      name: localeName,
      locale: locale,
      key: item.key || (0, _utils.getKeyByPath)(item),
      routes: null,
      parentKeys: [].concat(_toConsumableArray(parentKeys), [parent.key || '/'])
    });

    if (item.routes || item.children) {
      var children = formatter(Object.assign(Object.assign({}, props), {
        authority: item.authority || authority,
        data: item.routes || item.children,
        parentName: locale
      }), result); // Reduce memory usage

      result.children = children;
    }

    return result;
  });
}

var memoizeOneFormatter = (0, _memoizeOne.default)(formatter, _lodash.default);
/**
 * filter menuData
 */

var defaultFilterMenuData = function defaultFilterMenuData() {
  var menuData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return menuData.filter(function (item) {
    return item && item.name && !item.hideInMenu;
  }).map(function (item) {
    if (item.children && Array.isArray(item.children) && !item.hideChildrenInMenu && item.children.some(function (child) {
      return child && !!child.name;
    })) {
      var children = defaultFilterMenuData(item.children);
      if (children.length) return Object.assign(Object.assign({}, item), {
        children: children
      });
    }

    return Object.assign(Object.assign({}, item), {
      children: undefined
    });
  }).filter(function (item) {
    return item;
  });
};
/**
 * 获取面包屑映射
 * @param MenuDataItem[] menuData 菜单配置
 */


var getBreadcrumbNameMap = function getBreadcrumbNameMap(menuData) {
  // Map is used to ensure the order of keys
  var routerMap = new Map();

  var flattenMenuData = function flattenMenuData(data, parent) {
    data.forEach(function (menuItem) {
      if (!menuItem) {
        return;
      }

      if (menuItem && menuItem.children) {
        flattenMenuData(menuItem.children, menuItem);
      } // Reduce memory usage


      var path = mergePath(menuItem.path, parent ? parent.path : '/');
      routerMap.set(path, menuItem);
    });
  };

  flattenMenuData(menuData);
  return routerMap;
};

var memoizeOneGetBreadcrumbNameMap = (0, _memoizeOne.default)(getBreadcrumbNameMap, _lodash.default);

function fromEntries(iterable) {
  return _toConsumableArray(iterable).reduce(function (obj, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    obj[key] = val;
    return obj;
  }, {});
}

var _default = function _default(routes, menu, formatMessage, menuDataRender) {
  var originalMenuData = memoizeOneFormatter({
    data: routes,
    formatMessage: formatMessage,
    menu: menu || {
      locale: false
    }
  });

  if (menuDataRender) {
    originalMenuData = memoizeOneFormatter({
      data: menuDataRender(originalMenuData),
      menu: menu,
      formatMessage: formatMessage
    });
  }

  var menuData = defaultFilterMenuData(originalMenuData); // Map type used for internal logic

  var breadcrumbMap = memoizeOneGetBreadcrumbNameMap(originalMenuData); // Object type used for external users

  var breadcrumb = fromEntries(breadcrumbMap);
  return {
    breadcrumb: breadcrumb,
    breadcrumbMap: breadcrumbMap,
    menuData: menuData
  };
};

exports.default = _default;