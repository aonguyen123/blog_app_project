function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useState } from 'react';
import { createContainer } from 'unstated-next';

function useMenuCounter() {
  var _useState = useState(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      flatMenus = _useState2[0],
      setFlatMenus = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      flatMenuKeys = _useState4[0],
      setFlatMenuKeys = _useState4[1];

  return {
    flatMenus: flatMenus,
    setFlatMenus: setFlatMenus,
    flatMenuKeys: flatMenuKeys,
    setFlatMenuKeys: setFlatMenuKeys
  };
}

var MenuCounter = createContainer(useMenuCounter);
export default MenuCounter;