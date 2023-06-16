/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_window_background_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _images_winscreen_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _images_start_screen_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _images_dead_frog_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
// Imports







var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_window_background_png__WEBPACK_IMPORTED_MODULE_3__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_winscreen_png__WEBPACK_IMPORTED_MODULE_4__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_start_screen_png__WEBPACK_IMPORTED_MODULE_5__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_dead_frog_png__WEBPACK_IMPORTED_MODULE_6__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\nbody {\n  position: relative;\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    background-size: cover;\n}\ncanvas {\n  display: inline-block;\n  margin: auto;\n  visibility: hidden;\n}\n\n\nimg {\n  margin-left: -999px;\n}\n\n#win-screen {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 600px;\n  height: 600px;\n  margin: 0 34vw;\n  background-repeat: no-repeat;\n  background-color: darkblue;\n  visibility: hidden;\n}\n\n\n#start-screen {\n  display: inline-block;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  display: block;\n  margin: auto;\n  width: 600px;\n  height: 600px;\n  margin: auto;\n  background-repeat: no-repeat;\n  background-color: lightblue;\n  border: none;\n  text-decoration: none;\n  }\n\n#game-over-screen {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    width: 600px;\n    height: 600px;\n    margin: 0 34vw;\n    background-repeat: no-repeat;\n    background-color: red;\n    visibility: hidden;\n  }\n\n  #start-button {\n    margin-top: 65%;\n    margin-left: 5%;\n    font-family: Overlock SC;\n    font-size: 30px;\n    border-radius: 10vh;\n    width: 170px;\n    height: 70px;\n    background-color: orange;\n    border: none;\n  }\n\n  #start-button:hover {\n    background-color: magenta;\n    border: none;\n  }\n\n  #restart-button {\n    margin-top: 80%;\n    margin-left: 65%;\n    font-family: Overlock SC;\n    font-size: 30px;\n    color: white;\n    border-radius: 10vh;\n    width: 170px;\n    height: 70px;\n    background-color: black;\n    border: none;\n  }\n\n  #restart-button:hover {\n    background-color: darkblue;\n    color: white;\n    border: none;\n  }\n\n.title {\n    font-family: Monofett;\n    font-size: 60px;\n    margin-left: 48%;\n    margin-top: 0\n}\n\n.try-again-note {\n  font-family: Overlock SC;\n  font-size: 45px;\n  position: absolute;\n  left: 55px;\n  bottom: 100px;\n}\n\n#next-level-button {\n    margin-top: 5%;\n    margin-left: 67%;\n    font-family: Overlock SC;\n    font-size: 30px;\n    color: white;\n    border-radius: 10vh;\n    width: 170px;\n    height: 70px;\n    position: absolute;\n    border: none;\n}\n\n#next-level-button:hover{\n  background-color: magenta;\n  border: none;\n}\n\n#reload-button {\n    margin-top: 5%;\n    margin-left: 5%;\n    font-family: Overlock SC;\n    font-size: 30px;\n    color: white;\n    border-radius: 10vh;\n    width: 170px;\n    height: 70px;\n    border: none;\n}\n\n#reload-button:hover {\n  background-color: magenta;\n  border: none;\n}\n\n.winNote {\n  font-family: Overlock SC;\n  font-size: 45px;\n  position: absolute;\n  left: 30px;\n  bottom: 10px;\n  color: white;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":";AACA;EACE,kBAAkB;IAChB,mDAAkD;IAClD,sBAAsB;AAC1B;AACA;EACE,qBAAqB;EACrB,YAAY;EACZ,kBAAkB;AACpB;;;AAGA;EACE,mBAAmB;AACrB;;AAEA;EACE,yDAAgD;EAChD,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,YAAY;EACZ,aAAa;EACb,cAAc;EACd,4BAA4B;EAC5B,0BAA0B;EAC1B,kBAAkB;AACpB;;;AAGA;EACE,qBAAqB;EACrB,yDAAmD;EACnD,cAAc;EACd,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,4BAA4B;EAC5B,2BAA2B;EAC3B,YAAY;EACZ,qBAAqB;EACrB;;AAEF;IACI,yDAAgD;IAChD,kBAAkB;IAClB,MAAM;IACN,QAAQ;IACR,SAAS;IACT,OAAO;IACP,YAAY;IACZ,aAAa;IACb,cAAc;IACd,4BAA4B;IAC5B,qBAAqB;IACrB,kBAAkB;EACpB;;EAEA;IACE,eAAe;IACf,eAAe;IACf,wBAAwB;IACxB,eAAe;IACf,mBAAmB;IACnB,YAAY;IACZ,YAAY;IACZ,wBAAwB;IACxB,YAAY;EACd;;EAEA;IACE,yBAAyB;IACzB,YAAY;EACd;;EAEA;IACE,eAAe;IACf,gBAAgB;IAChB,wBAAwB;IACxB,eAAe;IACf,YAAY;IACZ,mBAAmB;IACnB,YAAY;IACZ,YAAY;IACZ,uBAAuB;IACvB,YAAY;EACd;;EAEA;IACE,0BAA0B;IAC1B,YAAY;IACZ,YAAY;EACd;;AAEF;IACI,qBAAqB;IACrB,eAAe;IACf,gBAAgB;IAChB;AACJ;;AAEA;EACE,wBAAwB;EACxB,eAAe;EACf,kBAAkB;EAClB,UAAU;EACV,aAAa;AACf;;AAEA;IACI,cAAc;IACd,gBAAgB;IAChB,wBAAwB;IACxB,eAAe;IACf,YAAY;IACZ,mBAAmB;IACnB,YAAY;IACZ,YAAY;IACZ,kBAAkB;IAClB,YAAY;AAChB;;AAEA;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA;IACI,cAAc;IACd,eAAe;IACf,wBAAwB;IACxB,eAAe;IACf,YAAY;IACZ,mBAAmB;IACnB,YAAY;IACZ,YAAY;IACZ,YAAY;AAChB;;AAEA;EACE,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,wBAAwB;EACxB,eAAe;EACf,kBAAkB;EAClB,UAAU;EACV,YAAY;EACZ,YAAY;AACd","sourcesContent":["\nbody {\n  position: relative;\n    background: url('../images/window-background.png');\n    background-size: cover;\n}\ncanvas {\n  display: inline-block;\n  margin: auto;\n  visibility: hidden;\n}\n\n\nimg {\n  margin-left: -999px;\n}\n\n#win-screen {\n  background-image: url('../images/winscreen.png');\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: 600px;\n  height: 600px;\n  margin: 0 34vw;\n  background-repeat: no-repeat;\n  background-color: darkblue;\n  visibility: hidden;\n}\n\n\n#start-screen {\n  display: inline-block;\n  background-image: url('../images/start-screen.png');\n  display: block;\n  margin: auto;\n  width: 600px;\n  height: 600px;\n  margin: auto;\n  background-repeat: no-repeat;\n  background-color: lightblue;\n  border: none;\n  text-decoration: none;\n  }\n\n#game-over-screen {\n    background-image: url('../images/dead-frog.png');\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    width: 600px;\n    height: 600px;\n    margin: 0 34vw;\n    background-repeat: no-repeat;\n    background-color: red;\n    visibility: hidden;\n  }\n\n  #start-button {\n    margin-top: 65%;\n    margin-left: 5%;\n    font-family: Overlock SC;\n    font-size: 30px;\n    border-radius: 10vh;\n    width: 170px;\n    height: 70px;\n    background-color: orange;\n    border: none;\n  }\n\n  #start-button:hover {\n    background-color: magenta;\n    border: none;\n  }\n\n  #restart-button {\n    margin-top: 80%;\n    margin-left: 65%;\n    font-family: Overlock SC;\n    font-size: 30px;\n    color: white;\n    border-radius: 10vh;\n    width: 170px;\n    height: 70px;\n    background-color: black;\n    border: none;\n  }\n\n  #restart-button:hover {\n    background-color: darkblue;\n    color: white;\n    border: none;\n  }\n\n.title {\n    font-family: Monofett;\n    font-size: 60px;\n    margin-left: 48%;\n    margin-top: 0\n}\n\n.try-again-note {\n  font-family: Overlock SC;\n  font-size: 45px;\n  position: absolute;\n  left: 55px;\n  bottom: 100px;\n}\n\n#next-level-button {\n    margin-top: 5%;\n    margin-left: 67%;\n    font-family: Overlock SC;\n    font-size: 30px;\n    color: white;\n    border-radius: 10vh;\n    width: 170px;\n    height: 70px;\n    position: absolute;\n    border: none;\n}\n\n#next-level-button:hover{\n  background-color: magenta;\n  border: none;\n}\n\n#reload-button {\n    margin-top: 5%;\n    margin-left: 5%;\n    font-family: Overlock SC;\n    font-size: 30px;\n    color: white;\n    border-radius: 10vh;\n    width: 170px;\n    height: 70px;\n    border: none;\n}\n\n#reload-button:hover {\n  background-color: magenta;\n  border: none;\n}\n\n.winNote {\n  font-family: Overlock SC;\n  font-size: 45px;\n  position: absolute;\n  left: 30px;\n  bottom: 10px;\n  color: white;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/window-background.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/winscreen.png");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/start-screen.png");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/dead-frog.png");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/frugger.png");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/car1.png");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/car2.png");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/car3.png");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/Lily_Pad.png");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/log.png");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/truck1.png");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/truck2.png");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turtle.png");

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/background.png");

/***/ }),
/* 21 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Cars = __webpack_require__(22);

function CarGenerator(context) {
  this.laneOne = [];
  this.laneTwo = [];
  this.laneThree = [];
  this.laneFour = [];
  this.laneFive = [];
  this.generateCars(this.laneOne, 0, 520, {minus: true, val: 180}, context);
  this.generateCars(this.laneTwo, 600, 480, {plus: true, val: 180}, context);
  this.generateCars(this.laneThree, 80, 440, {minus: true, val: 120}, context);
  this.generateCars(this.laneFour, 540, 400, {minus: true, val: 140}, context);
  this.generateCars(this.laneFive, 20, 360, {minus: true, val: 140}, context);
  this.allLeft = [this.laneTwo, this.laneFour];
  this.allRight = [this.laneOne, this.laneThree, this.laneFive];
}

CarGenerator.prototype.generateCars = function(lane, x, y, instructions, ctx) {
  [0, 1, 2].forEach(function(e) {
    lane.push(new Cars(x, y, 60, 35, ctx));
    if (instructions.minus) x -= instructions.val;
    if (instructions.plus) x += instructions.val;
  });
};

module.exports = CarGenerator;


/***/ }),
/* 22 */
/***/ ((module) => {

function Cars(x, y, width, height, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.context = context;
  this.speed = 2;
}

Cars.prototype.draw = function() {
  this.context.drawImage(car1, this.x, this.y, this.width, this.height);
  return this;
};

Cars.prototype.drawLaneTwo = function() {
  this.context.drawImage(truck1, this.x, this.y, this.width, this.height);
  return this;
};

Cars.prototype.drawLaneThree = function() {
  this.context.drawImage(car2, this.x, this.y, this.width, this.height);
  return this;
};

Cars.prototype.drawLaneFour = function() {
  this.context.drawImage(truck2, this.x, this.y, this.width, this.height);
  return this;
};

Cars.prototype.drawLaneFive = function() {
  this.context.drawImage(car3, this.x, this.y, this.width, this.height);
  return this;
};

Cars.prototype.driveRight = function() {
  if (this.x > 600) {
    this.x = -60;
  }
  return (this.x += this.speed);
};

Cars.prototype.driveLeft = function() {
  if (this.x < 0) {
  this.x = 660;
  }
  return (this.x -= this.speed);
};

module.exports = Cars;


/***/ }),
/* 23 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Logs = __webpack_require__(24);

var LogGenerator = function(context) {
  this.one = [];
  this.two = [];
  this.three = [];
  this.one.push(new Logs(0, 240, 100, 35, context));
  this.one.push(new Logs(-200, 240, 100, 35, context));
  this.one.push(new Logs(-400, 240, 100, 35, context));
  this.two.push(new Logs(0, 160, 300, 35, context));
  this.three.push(new Logs(-100, 80, 100, 35, context));
  this.three.push(new Logs(-360, 80, 100, 35, context));
  this.three.push(new Logs(-560, 80, 100, 35, context));
  this.all = [this.one, this.two, this.three];
};

module.exports = LogGenerator;


/***/ }),
/* 24 */
/***/ ((module) => {

function Logs (x, y, width, height, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.context = context;
}

Logs.prototype.draw = function() {
  this.context.fillStyle = 'rosybrown';
  this.context.drawImage(log1, this.x, this.y, this.width, this.height);
  return this;
};

Logs.prototype.floatRight = function() {
  if (this.x > 600){
    this.x = -300;
  }
  return (this.x++);
};


module.exports = Logs;


/***/ }),
/* 25 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Turtles = __webpack_require__(26);

var TurtleGenerator = function(context) {
  this.one = [];
  this.two = [];
  this.three = [];
  this.one.push(new Turtles(200, 200, 50, 35, context));
  this.one.push(new Turtles(260, 200, 50, 35, context));
  this.one.push(new Turtles(320, 200, 50, 35, context));
  this.one.push(new Turtles(500, 200, 50, 35, context));
  this.one.push(new Turtles(560, 200, 50, 35, context));
  this.one.push(new Turtles(620, 200, 50, 35, context));
  this.two.push(new Turtles(390, 120, 50, 35, context));
  this.two.push(new Turtles(450, 120, 50, 35, context));
  this.two.push(new Turtles(510, 120, 50, 35, context));
  this.two.push(new Turtles(690, 120, 50, 35, context));
  this.two.push(new Turtles(750, 120, 50, 35, context));
  this.two.push(new Turtles(810, 120, 50, 35, context));
  this.three.push(new Turtles(200, 40, 50, 35, context));
  this.three.push(new Turtles(260, 40, 50, 35, context));
  this.three.push(new Turtles(320, 40, 50, 35, context));
  this.three.push(new Turtles(500, 40, 50, 35, context));
  this.three.push(new Turtles(560, 40, 50, 35, context));
  this.three.push(new Turtles(620, 40, 50, 35, context));
  this.all = [this.one, this.two, this.three];
};

module.exports = TurtleGenerator;


/***/ }),
/* 26 */
/***/ ((module) => {

function Turtles (x, y, width, height, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.context = context;
  this.speed = 2;
}

Turtles.prototype.draw = function() {
  this.context.drawImage(turtle1, this.x, this.y, this.width, this.height);
  return this;
};

Turtles.prototype.swimLeft = function() {
  if (this.x < -50){
    this.x = 680;
  }
  return (this.x -= this.speed);
};



module.exports = Turtles;


/***/ }),
/* 27 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var LilyPad = __webpack_require__(28);

var LilyPadsGenerator = function(context) {
  this.one = [];
  this.one.push(new LilyPad(5, 0, 60, 40, context));
  this.one.push(new LilyPad(137, 0, 60, 40, context));
  this.one.push(new LilyPad(269, 0, 60, 40, context));
  this.one.push(new LilyPad(401, 0, 60, 40, context));
  this.one.push(new LilyPad(533, 0, 60, 40, context));
  return this.one;
};

module.exports = LilyPadsGenerator;


/***/ }),
/* 28 */
/***/ ((module) => {

function LilyPad (x, y, width, height, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.context = context;
}

LilyPad.prototype.draw = function() {
  this.context.drawImage(lilypad, this.x, this.y, this.width, this.height);
  return this;
};


module.exports = LilyPad;


/***/ }),
/* 29 */
/***/ ((module) => {

function Frog(x, y, width, height, context) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.context = context;
}

var frogger = document.getElementById('frog');


Frog.prototype.draw = function() {
  this.context.fillStyle = 'green';
  this.context.drawImage(frogger, this.x, this.y, this.width, this.height);
};

Frog.prototype.moveRight = function() {
    if (this.canMoveRight()) {
      this.x += 40;
    }
};

Frog.prototype.moveUp = function() {
  if (this.canMoveUp()) {
    this.y -= 40;
  }
};

Frog.prototype.moveDown = function() {
  if (this.canMoveDown()) {
    this.y += 40;
  }
};

Frog.prototype.moveLeft = function() {
  if (this.canMoveLeft()) {
    this.x -= 40;
  }
};

Frog.prototype.canMoveUp = function() {
  return (this.y > 0);
};

Frog.prototype.canMoveRight = function() {
  return (this.x < 600 - this.width);
};

Frog.prototype.canMoveDown = function() {
  return (this.y < 600 - this.height);
};

Frog.prototype.canMoveLeft = function() {
  return (this.x > 0);
};

module.exports = Frog;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_frugger_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _images_car1_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _images_car2_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _images_car3_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/* harmony import */ var _images_dead_frog_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _images_Lily_Pad_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
/* harmony import */ var _images_log_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(16);
/* harmony import */ var _images_start_screen_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9);
/* harmony import */ var _images_truck1_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(17);
/* harmony import */ var _images_truck2_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(18);
/* harmony import */ var _images_turtle_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(19);
/* harmony import */ var _images_window_background_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7);
/* harmony import */ var _images_winscreen_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8);
/* harmony import */ var _images_background_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(20);
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'















var CarGenerator = __webpack_require__(21);
var LogGenerator = __webpack_require__(23);
var TurtleGenerator = __webpack_require__(25);
var LilyPadsGenerator = __webpack_require__(27);
var Frog = __webpack_require__(29);
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var frog = new Frog(280, 560, 40, 40, context);
var car1 = document.getElementById('car1');
var car2 = document.getElementById('car2');
var car3 = document.getElementById('car3');
var truck1 = document.getElementById('truck1');
var truck2 = document.getElementById('truck2');
var log1 = document.getElementById('log1');
var turtle1 = document.getElementById('turtle1');
var lilypad = document.getElementById('lilypad');
var isDrowning = true;
var turtleArrayOne = [];
var turtleArrayTwo = [];
var cars = new CarGenerator(context);
var logs = new LogGenerator(context);
var turtles = new TurtleGenerator(context);
var lilypads = new LilyPadsGenerator(context);
var level = 1;
var startScreen = document.getElementById('start-screen');
var startButton = document.getElementById('start-button');
var winScreen = document.getElementById('win-screen');
var gameOverScreen = document.getElementById('game-over-screen');
var restartButton = document.getElementById('restart-button');
var reloadButton = document.getElementById('reload-button');
var nextLevel = document.getElementById('next-level-button');


function collideCar(car) {
  if (frog.x < car.x + (car.width/1.5) &&
    frog.x + frog.width > car.x &&
    frog.y < car.y + car.height &&
    frog.height + frog.y > car.y){
      level = 1;
      levelUpRight(cars);
      resetFrog();
      gameOver();
    }
}

function logTravel(log) {
  if (frog.x < log.x + log.width &&
    frog.x + frog.width > log.x &&
    frog.y < log.y + log.height &&
    frog.height + frog.y > log.y){
      if(frog.x < 560){
          frog.x++;
          isDrowning = false;
        }
    }
}

function turtleTravel(turtle, speed) {
  if (frog.x < turtle.x + turtle.width &&
    frog.x + frog.width > turtle.x &&
    frog.y < turtle.y + turtle.height &&
    frog.height + frog.y > turtle.y) {
      if(frog.x > 0){
        frog.x -= 2;
        isDrowning = false;
      }
    }
}

function drowningFrog() {
  if (frog.y < 280 && frog.y >= 0 && isDrowning) {
    level = 1;
    levelUpRight(cars);
    resetFrog();
    gameOver();
  } else {
    isDrowning = true;
  }
}

function resetFrog() {
  frog.x = 280;
  frog.y = 560;
}

function win(lilypads) {
  lilypads.forEach(function (lilypad){
    if (frog.x < lilypad.x + lilypad.width &&
      frog.x + frog.width > lilypad.x &&
      frog.y < lilypad.y + lilypad.height &&
      frog.height + frog.y > lilypad.y){
      isDrowning = false;
      resetFrog();
      level += 3;
      levelUpRight(cars);
      addWinScreen();
    }
  });
}

function displayCanvas(){
  canvas.style.display='block';
  canvas.style.visibility='visible';
}

function addWinScreen() {
  winScreen.style.visibility='visible';
  canvas.style.visibility='hidden';
  startScreen.style.visiblility='hidden';
}

function gameOver() {
  gameOverScreen.style.visibility='visible';
  canvas.style.visibility='hidden';
  startScreen.style.visibility='hidden';
  winScreen.style.visibility='hidden';
}

function levelUpRight(cars) {
  cars.allRight.forEach(function(vehicles) {
    vehicles.forEach(function(vehicle) {
      vehicle.speed = level;
    });
  });
}

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  cars.laneOne.forEach(function (car) {
    car.draw().driveRight();
    collideCar(car);
  });
  cars.laneTwo.forEach(function (car) {
    car.drawLaneTwo().driveLeft();
    collideCar(car);
  });
  cars.laneThree.forEach(function (car) {
    car.drawLaneThree().driveRight();
    collideCar(car);
  });
  cars.laneFour.forEach(function (car) {
    car.drawLaneFour().driveLeft();
    collideCar(car);
  });
  cars.laneFive.forEach(function (car) {
    car.drawLaneFive().driveRight();
    collideCar(car);
  });
  logs.all.forEach(function(log) {
    log.forEach(function(e) {
      e.draw().floatRight();
      logTravel(e);
    });
  });
  turtles.all.forEach(function(turtle){
    turtle.forEach(function(e) {
      e.draw().swimLeft();
      turtleTravel(e);
    });
  });
  lilypads.forEach(function(lilypad){
    lilypads.forEach(function(e) {
      e.draw();
    });
  });
  win(lilypads);
  drowningFrog();
  frog.draw();
  requestAnimationFrame(gameLoop);
});



startButton.addEventListener('click', function() {
  startScreen.style.display='none';
  canvas.style.display='block';
  canvas.style.visibility='visible';
});

restartButton.addEventListener('click', function() {
  gameOverScreen.style.display='none';
  canvas.style.display='block';
  canvas.style.visibility='hidden';
  window.location.reload();
});

reloadButton.addEventListener('click', function(){
  gameOverScreen.style.display='none';
  canvas.style.display='block';
  canvas.style.visibility='hidden';
  window.location.reload();
});

nextLevel.addEventListener('click', function(){
  winScreen.style.visibility='hidden';
  canvas.style.visibility='visible';
});


window.addEventListener('keydown', function(event) {
  if (event.keyCode === 38){
    event.preventDefault();
    frog.moveUp();
  } else if (event.keyCode === 40){
    event.preventDefault();
    frog.moveDown();
  } else if (event.keyCode === 37){
    event.preventDefault();
    frog.moveLeft();
  } else if (event.keyCode === 39){
    event.preventDefault();
    frog.moveRight();
  }
});



console.log('This is the JavaScript entry file - your code begins here.');

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map