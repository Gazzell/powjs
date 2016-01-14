var pow =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by joseba on 10/12/15.
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.utils = exports.core = exports.Engine = undefined;

	var _engine2 = __webpack_require__(1);

	var _engine3 = _interopRequireDefault(_engine2);

	var _core2 = __webpack_require__(2);

	var _core3 = _interopRequireDefault(_core2);

	var _utils2 = __webpack_require__(8);

	var _utils = _interopRequireWildcard(_utils2);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Engine = exports.Engine = _engine3.default;
	var core = exports.core = _core3.default;
	var utils = exports.utils = _utils;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;

	var _core = __webpack_require__(2);

	var _core2 = _interopRequireDefault(_core);

	var _renderManager = __webpack_require__(7);

	var _renderManager2 = _interopRequireDefault(_renderManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Engine = function Engine(params) {
	    _classCallCheck(this, Engine);

	    this.htmlContainer = undefined;
	    this.renderMgr = new _renderManager2.default();
	    this.resourceMgr = new _core2.default.ResourceManager();
	    this.objectFactory = new _core2.default.ObjectFactory();
	    this.objectFactory.registerObjects(_core2.default.renderables);

	    if (!params) {
	        params = {};
	    }

	    if (!params.container) {
	        this.htmlContainer = document.createElement('div');
	        this.htmlContainer.name = 'POW_Div';
	        this.htmlContainer.id = 'POW_Div';
	        this.htmlContainer.setAttribute("style", "position:absolute;top:0px;left:0px;");
	        params.container = this.htmlContainer;
	    } else {
	        this.htmlContainer = params.container;
	    }
	};

	exports.default = Engine;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by joseba on 10/12/15.
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;

	var _resourceManager = __webpack_require__(3);

	var _resourceManager2 = _interopRequireDefault(_resourceManager);

	var _objectFactory = __webpack_require__(4);

	var _objectFactory2 = _interopRequireDefault(_objectFactory);

	var _renderables = __webpack_require__(5);

	var _renderables2 = _interopRequireDefault(_renderables);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var core = {
	    ResourceManager: _resourceManager2.default,
	    ObjectFactory: _objectFactory2.default,
	    renderables: _renderables2.default
	};
	exports.default = core;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ResourceManager = function ResourceManager() {
	    _classCallCheck(this, ResourceManager);

	    this.pepe = "pepe";
	};

	exports.default = ResourceManager;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Created by joseba on 14/1/16.
	 */
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ObjectFactory = (function () {
	    function ObjectFactory() {
	        _classCallCheck(this, ObjectFactory);

	        this.objectPool = new Map();
	        this.typeConstructors = new Map();
	    }

	    _createClass(ObjectFactory, [{
	        key: "registerObjects",
	        value: function registerObjects(objects) {
	            for (var key in objects) {
	                if (objects.hasOwnProperty(key)) {
	                    this.registerObjectType(key, objects[key]);
	                }
	            }
	        }
	    }, {
	        key: "registerObjectType",
	        value: function registerObjectType(typeName, constructor) {
	            if (!this.objectPool.has(typeName)) {
	                this.objectPool.set(typeName, []);
	            }
	            if (!this.typeConstructors.has(typeName)) {
	                this.typeConstructors.set(typeName, constructor);
	            }
	        }
	    }, {
	        key: "create",
	        value: function create(objectType) {
	            if (this.objectPool.has(objectType) && this.typeConstructors.has(objectType)) {
	                var objectArray = this.objectPool.get(objectType);
	                if (objectArray.length > 0) {
	                    return objectArray.pop();
	                } else {
	                    return new (this.typeConstructors.get(objectType))();
	                }
	            }
	        }
	    }, {
	        key: "free",
	        value: function free(object) {
	            if (this.objectPool.has(object.type)) {
	                object.init();
	                this.objectPool.get(object.type).push(object);
	            }
	        }
	    }]);

	    return ObjectFactory;
	})();

	exports.default = ObjectFactory;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by joseba on 14/1/16.
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _sceneObject = __webpack_require__(6);

	var _sceneObject2 = _interopRequireDefault(_sceneObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var renderables = {
	  SceneObject: _sceneObject2.default
	};
	exports.default = renderables;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Created by joseba on 14/1/16.
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SceneObject = function SceneObject(params) {
	    _classCallCheck(this, SceneObject);

	    this.type = 'SceneObject';
	};

	exports.default = SceneObject;

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Created by joseba on 12/12/15.
	 */
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RenderManager = (function () {
	    function RenderManager(params) {
	        _classCallCheck(this, RenderManager);

	        this._scene = undefined;
	    }

	    _createClass(RenderManager, [{
	        key: "scene",
	        get: function get() {
	            return this._scene;
	        },
	        set: function set(value) {}
	    }]);

	    return RenderManager;
	})();

	exports.default = RenderManager;

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Created by joseba on 11/12/15.
	 */
	"use strict"

	/**
	 * Extracts base path from an URL
	 * @param {string} url. URL to parse
	 * @returns {string}. Base URL
	 */
	;
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.extractUrlBase = extractUrlBase;
	exports.normalizeUrl = normalizeUrl;
	exports.generateGUID = generateGUID;
	exports.computePowerOfTwo = computePowerOfTwo;
	function extractUrlBase(url) {
	    var parts = url.split('/');
	    parts.pop();
	    return parts.length < 1 ? '' : parts.join('/') + '/';
	}

	/**
	 * Extracts fileName from an URL
	 * @param {string} url. Complete URL
	 * @returns {string} [fileName]. File name
	 */
	var extractFileName = exports.extractFileName = function extractFileName(url) {
	    return url.split('/').pop();
	};

	/**
	 * Very basic func to extract a file extension from its name
	 * @param {string} url. File URL, assuming the file has only a '.' separating file extension
	 * @returns {string} file extension
	 */
	var extractExt = exports.extractExt = function extractExt(url) {
	    return url.split('.').pop();
	};

	/**
	 * Normalize URL, removing '//' and other chars
	 * @param {string} url. URL to normalize
	 * @returns {string} Normalized URL
	 */
	function normalizeUrl(url) {
	    var newUrl = url,
	        len = undefined,
	        tag = undefined;

	    var httpHead = "";
	    if (newUrl.substr(0, 7) == 'http://') {
	        httpHead = 'http://';
	        newUrl = newUrl.substring(7, newUrl.length);
	    }
	    // remove extra slashes
	    var tags = newUrl.split('/');
	    newUrl = '';

	    len = tags.length;
	    while (len > 0) {
	        tag = tags.pop();
	        if (tag != '') {
	            if (newUrl == '') {
	                newUrl = tag;
	            } else {
	                newUrl = tag + '/' + newUrl;
	            }
	        }
	        len--;
	        if (len == 0 && url[0] == '/') {
	            newUrl = '/' + newUrl;
	        }
	    }

	    return httpHead + newUrl;
	}

	/**
	 * Generates a random UID
	 * @returns {number} generated UID
	 */
	function generateGUID() {
	    var newGuid = undefined;

	    var S4 = function S4() {
	        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
	    };

	    newGuid = S4() + S4() + S4() + S4();

	    return newGuid;
	}

	/**
	 * Normalize URL, removing '//' and other chars
	 * @param {number} num. Number to find the nearest power of two
	 * @returns {number} power of two
	 */
	function computePowerOfTwo(num) {
	    // brute force solution
	    var poweroftwo = 2;

	    // while power of two is smaller
	    while (poweroftwo < num) {
	        // compute next one
	        poweroftwo *= 2;
	    }

	    return poweroftwo;
	}

/***/ }
/******/ ]);