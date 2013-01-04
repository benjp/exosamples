"use strict";
if (typeof console == 'undefined') console = { log: function() { console.log_stack.push(arguments) }, log_stack: [], warn: function (msg) { alert(msg.stack ? msg.message + '\n' + msg.stack : (msg.message || msg.msg || msg)) }, error: function () { console.warn.apply(null, arguments) } };
Function.prototype.inheritFrom = function (superClass, prefix) {
    for (var prop in superClass.prototype) {
        if (this.prototype[prop]) {
            if (/Phase$/.test(prop)) {
                console.warn("Overriding " + prefix + "." + prop + " () in ", this);
            }
            this.prototype[prefix + "$" + prop] = superClass.prototype[prop];
        } else {
            this.prototype[prop] = superClass.prototype[prop];
        }
    }
    if (superClass.prototype.hasOwnProperty("toString")) {
        if (this.prototype.hasOwnProperty("toString")) {
            this.prototype[prefix + "$toString"] = superClass.prototype.toString;
        } else {
            this.prototype.toString = superClass.prototype.toString;
        }
    }
};


function Identifier(o) { for (var p in o) return p };

Function.prototype.initDecoration = function () {
  for (var method in this.prototype)
    if (!this.prototype[method].__class)
      this.prototype[method].__class = this;
};


(function () { return function mixin(a, b) {
  // recursive mixin
  for (var i in b)
    if (!a[i])
      a[i] = b[i];
    else
      mixin(a[i], b[i]);
}})()(this, {com: {xopus: {core: {lang: {array: {}, crypt: {}, debug: {}, error: {}, events: {}, js: {}, object: {}}, platform: {}}, xopus: {platform: {}}}}});


//#com.xopus.core.lang.crypt.CryptUtil
if (typeof com.xopus.core.lang.crypt.CryptUtil == 'undefined')
com.xopus.core.lang.crypt.CryptUtil = (function() {

var CryptUtil = function CryptUtil() {
};


CryptUtil.prototype.CryptUtil = CryptUtil;

CryptUtil.create = function create(args) {
    var obj = {};
    for (var i = 0; i < args.length; i += 2) {
        obj[args[i]] = args[i + 1];
    }
    return obj;
};

CryptUtil.get = function get(obj, key) {
    return obj[key];
};

CryptUtil.isCrypted = function isCrypted() {
    for (var propName in {cryptTest: true}) {
        return propName != "cryptTest";
    }
};



if (!CryptUtil.name) CryptUtil.name = Identifier({CryptUtil:1});


CryptUtil.initDecoration();


return CryptUtil;

})();
//#com.xopus.core.lang.array.ArrayUtil
if (typeof com.xopus.core.lang.array.ArrayUtil == 'undefined')
com.xopus.core.lang.array.ArrayUtil = (function() {

var ArrayUtil = function ArrayUtil() {
};


ArrayUtil.prototype.ArrayUtil = ArrayUtil;

ArrayUtil.uniques = function uniques(arr) {
    for (var arr = arr.concat().sort(), i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == arr[i - 1]) {
            arr.splice(i, 1);
        }
    }
    return arr;
};

ArrayUtil.isArray = function isArray(obj) {
    return typeof obj == "object" && obj.constructor === Array;
};

ArrayUtil.toArray = function toArray(args) {
    if (typeof args.item != "undefined") {
        for (var arr = [], i = 0, l = args.getLength ? args.getLength() : args.length; i < l; ++i) {
            arr.push(args.item(i));
        }
    } else {
        for (var arr = [], i = 0, l = args.length; i < l; ++i) {
            arr.push(args[i]);
        }
    }
    return arr;
};

ArrayUtil.strip = function strip(arr, value) {
    for (var i = 0; (i = arr.indexOf(value)) != -1;) {
        return arr;
    }
};

ArrayUtil.removeLast = function removeLast(arr, value) {
    for (var i = arr.length; i--;) {
        if (arr[i] === value) {
            return void arr.splice(i, 1);
        }
    }
};

ArrayUtil.prototype_indexOf = function prototype_indexOf(elt) {
    var len = this.length;
    var from = Number(arguments[1]) || 0;
    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
    if (from < 0) {
        from += len;
    }
    for (; from < len; from++) {
        if (from in this && this[from] === elt) {
            return from;
        }
    }
    return -1;
};

ArrayUtil.prototype_lastIndexOf = function prototype_lastIndexOf(elt) {
    var len = this.length;
    var from = Number(arguments[1]);
    if (isNaN(from)) {
        from = len - 1;
    } else {
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
            from += len;
        } else if (from >= len) {
            from = len - 1;
        }
    }
    for (; from > -1; from--) {
        if (from in this && this[from] === elt) {
            return from;
        }
    }
    return -1;
};

ArrayUtil.prototype_map = function prototype_map(fun) {
    var len = this.length;
    if (typeof fun != "function") {
        throw new TypeError;
    }
    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
        if (i in this) {
            res[i] = fun.call(thisp, this[i], i, this);
        }
    }
    return res;
};

ArrayUtil.prototype_forEach = function prototype_forEach(fun) {
    var len = this.length;
    if (typeof fun != "function") {
        throw new TypeError;
    }
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
        if (i in this) {
            fun.call(thisp, this[i], i, this);
        }
    }
};

ArrayUtil.prototype_filter = function prototype_filter(fun) {
    var len = this.length;
    if (typeof fun != "function") {
        throw new TypeError;
    }
    var res = new Array;
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
        if (i in this) {
            var val = this[i];
            if (fun.call(thisp, val, i, this)) {
                res.push(val);
            }
        }
    }
    return res;
};

ArrayUtil.prototype_every = function prototype_every(fun) {
    var len = this.length;
    if (typeof fun != "function") {
        throw new TypeError;
    }
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
        if (i in this && !fun.call(thisp, this[i], i, this)) {
            return false;
        }
    }
    return true;
};

ArrayUtil.prototype_last = function prototype_last(corr) {
    return this[this.length - 1 + (corr || 0)];
};

ArrayUtil.prototype_reduce = function prototype_reduce(fun) {
    var len = this.length;
    if (typeof fun != "function") {
        throw new TypeError;
    }
    if (len == 0 && arguments.length == 1) {
        throw new TypeError;
    }
    var i = 0;
    if (arguments.length >= 2) {
        var rv = arguments[1];
    } else {
        do {
            if (i in this) {
                rv = this[i++];
                break;
            }
            if (++i >= len) {
                throw new TypeError;
            }
        } while (true);
    }
    for (; i < len; i++) {
        if (i in this) {
            rv = fun.call(null, rv, this[i], i, this);
        }
    }
    return rv;
};

ArrayUtil.prototype_reduceRight = function prototype_reduceRight(fun) {
    var len = this.length;
    if (typeof fun != "function") {
        throw new TypeError;
    }
    if (len == 0 && arguments.length == 1) {
        throw new TypeError;
    }
    var i = len - 1;
    if (arguments.length >= 2) {
        var rv = arguments[1];
    } else {
        do {
            if (i in this) {
                rv = this[i--];
                break;
            }
            if (--i < 0) {
                throw new TypeError;
            }
        } while (true);
    }
    for (; i >= 0; i--) {
        if (i in this) {
            rv = fun.call(null, rv, this[i], i, this);
        }
    }
    return rv;
};

ArrayUtil.prototype_slice = function prototype_slice(begin, end) {
    var a;
    if (this.constructor == Array) {
        a = this;
    } else {
        a = [];
        for (var i = 0; i < this.length; i++) {
            a[i] = this[i];
        }
    }
    return a.slice(begin === undefined ? 0 : begin, end === undefined ? a.length + 1 : end);
};

ArrayUtil.extract = function extract(arr, fun, thisp) {
    if (typeof fun != "function") {
        throw new TypeError;
    }
    var res = [];
    var thisp = arguments[2];
    for (var i = 0; i < arr.length; i++) {
        if (i in arr) {
            var val = arr[i];
            if (fun.call(thisp, val, i, arr)) {
                res.push.apply(res, arr.splice(i--, 1));
            }
        }
    }
    return res;
};

ArrayUtil.prototype_shuffle = function prototype_shuffle() {
    for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x) {
    }
    return this;
};

ArrayUtil.mapsort = function mapsort(arr, fn) {
    for (var val, map = [], l = arr.length, i = l; i--;) {
        val = arr[i];
        map.push([val, fn(val)]);
    }
    map.sort(function (a, b) {return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;});
    for (i = l; i--;) {
        arr[i] = map[i][0];
    }
    return arr;
};

ArrayUtil.prototype_some = function prototype_some(callback, thisObject) {
    var arr = this;
    if (typeof callback != "function") {
        return false;
    }
    for (var i = 0, l = arr.length; i < l; ++i) {
        if (callback.call(thisObject, arr[i], i, arr)) {
            return true;
        }
    }
    return false;
};

ArrayUtil.flatten = function flatten(arr, depth) {
    depth = depth || 1;
    do {
        var touched = false;
        var ins;
        var del;
        var net;
        for (var i = 0, l = arr.length; i < l; i = i + net + 1) {
            var item = arr[i];
            ins = 0;
            del = 0;
            net = 0;
            if (typeof item == "object" && item.constructor === Array) {
                del = 1;
                ins = item.length;
                var nested = arr.splice(i, 1)[0];
                var args = [i, 0].concat(nested);
                arr.splice.apply(arr, args);
                touched = true;
            }
            net = ins - del;
        }
        if (!touched) {
            break;
        }
    } while (depth--);
    return arr;
};

ArrayUtil.clear = function clear(arr) {
    var length = arr.length;
    if (length) {
        arr.splice(0, length);
    }
};

ArrayUtil.install = function install(win) {
    if (win.Array === undefined) {
        throw {name: "Initialization Error", message: "Javascript engine not yet enabled on this window"};
    }
    var methods = {map: ArrayUtil.prototype_map, forEach: ArrayUtil.prototype_forEach, indexOf: ArrayUtil.prototype_indexOf, every: ArrayUtil.prototype_every, lastIndexOf: ArrayUtil.prototype_lastIndexOf, filter: ArrayUtil.prototype_filter, last: ArrayUtil.prototype_last, some: ArrayUtil.prototype_some, reduce: ArrayUtil.prototype_reduce, reduceRight: ArrayUtil.prototype_reduceRight};
    for (var p in methods) {
        if (win.Array.prototype[p] === undefined) {
            win.Array.prototype[p] = methods[p];
        }
    }
};



if (!ArrayUtil.name) ArrayUtil.name = Identifier({ArrayUtil:1});


ArrayUtil.initDecoration();


(function () {
    ArrayUtil.install(window);
})();

return ArrayUtil;

})();
//#com.xopus.core.lang.events.XEvent
if (typeof com.xopus.core.lang.events.XEvent == 'undefined')
com.xopus.core.lang.events.XEvent = (function() {

var XEvent = function XEvent() {
};


XEvent.prototype.XEvent = XEvent;

XEvent.prototype.fires = function fires(events) {
    if (!this.Event) {
        this.Event = {};
    }
    XEvent.fires.call(this.Event, events);
};

XEvent.fires = function fires(events) {
    for (var eventName in events) {
        this[eventName] = this[eventName] ||
            {type: eventName, fire: XEvent.__fire, addListener: XEvent.__addListener, hasListener: XEvent.__hasListener, removeListener: XEvent.__removeListener, reverseOrder: events[eventName].reverseOrder};
    }
};

XEvent.__fire = function __fire(target) {
    if (this.listeners) {
        var args = [target];
        for (var i = 1, l = arguments.length; i < l; i++) {
            args.push(arguments[i]);
        }
        for (this.fireIdx = this.listeners.length - 1; this.fireIdx >= 0; --this.fireIdx) {
            var listener = this.listeners[this.fireIdx];
            if (listener[this.type].apply(listener, args) === false) {
                return false;
            }
        }
    }
    return true;
};

XEvent.__addListener = function __addListener(listener) {
    if (!this.listeners) {
        this.listeners = [listener];
    } else if (this.reverseOrder) {
        this.listeners.push(listener);
    } else {
        this.listeners.unshift(listener);
    }
};

XEvent.__hasListener = function __hasListener(listener) {
    if (this.listeners) {
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i] == listener) {
                return true;
            }
        }
    }
    return false;
};

XEvent.__removeListener = function __removeListener(listener) {
    if (this.listeners) {
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i] == listener) {
                if (this.fireIdx > i) {
                    this.fireIdx--;
                }
                this.listeners.splice(i, 1);
            }
        }
    }
};



if (!XEvent.name) XEvent.name = Identifier({XEvent:1});


XEvent.initDecoration();


return XEvent;

})();
//#com.xopus.core.lang.js.TypeUtil
if (typeof com.xopus.core.lang.js.TypeUtil == 'undefined')
com.xopus.core.lang.js.TypeUtil = (function() {

var TypeUtil = function TypeUtil() {
};


TypeUtil.prototype.TypeUtil = TypeUtil;

TypeUtil.isInaccessible = function isInaccessible(obj) {
    return typeof obj === "object" &&
        obj !== null && typeof obj.constructor == "unknown";
};

TypeUtil.isNative = function isNative(obj) {
    return typeof obj == "function" && /\[native code\]\s*\}$/m.test(obj);
};

TypeUtil.isUndefined = function isUndefined(obj) {
    return obj === undefined;
};

TypeUtil.isNull = function isNull(obj) {
    return obj === null;
};

TypeUtil.isBoolean = function isBoolean(obj) {
    return typeof obj == "boolean";
};

TypeUtil.isString = function isString(obj) {
    return typeof obj == "string" || obj instanceof String;
};

TypeUtil.isNumber = function isNumber(obj) {
    return (typeof obj == "number" || obj !== null && obj instanceof Number) &&
        !window.isNaN(obj);
};

TypeUtil.isFunction = function isFunction(obj) {
    return typeof obj == "function";
};

TypeUtil.isObject = function isObject(obj) {
    return typeof obj == "object" && obj !== null;
};

TypeUtil.isXML = function isXML(obj) {
    return typeof obj == "xml";
};

TypeUtil.isArray = function isArray(obj) {
    return Object.prototype.toString.call(obj) == "[object Array]";
};

TypeUtil.isDate = function isDate(obj) {
    return typeof obj == "object" && obj !== null && obj instanceof Date;
};

TypeUtil.isRegExp = function isRegExp(obj) {
    return typeof obj == "object" && obj !== null && obj instanceof RegExp;
};

TypeUtil.isNaN = function isNaN(obj) {
    return typeof obj == "number" && window.isNaN(obj);
};



if (!TypeUtil.name) TypeUtil.name = Identifier({TypeUtil:1});


TypeUtil.initDecoration();


return TypeUtil;

})();
//#com.xopus.core.lang.debug.Debugging
if (typeof com.xopus.core.lang.debug.Debugging == 'undefined')
com.xopus.core.lang.debug.Debugging = (function() {

var CryptUtil = com.xopus.core.lang.crypt.CryptUtil;

var Debugging = function Debugging() {
};


Debugging.prototype.Debugging = Debugging;

Debugging.isEnabled = function isEnabled(obj) {
    if (obj) {
    } else {
        return Debugging.enabled;
    }
};

Debugging.setEnabled = function setEnabled(val, obj) {
    if (obj) {
    } else {
        Debugging.enabled = !!val;
    }
};

Debugging.runDebugger = function runDebugger() {
    if (Debugging.enabled) {
    }
    return Debugging.enabled;
};



if (!Debugging.name) Debugging.name = Identifier({Debugging:1});


Debugging.initDecoration();


(function () {
    var match = typeof location != "undefined" &&
        /debug=(true|false)/.exec(location.search);
    switch (match && match[1]) {
      case "true":
      case "false":
        Debugging.enabled = match[1] == "true";
        break;
      default:
        Debugging.enabled = !CryptUtil.isCrypted();
        break;
    }
})();

return Debugging;

})();
//#com.xopus.core.lang.object.ObjectUtil
if (typeof com.xopus.core.lang.object.ObjectUtil == 'undefined')
com.xopus.core.lang.object.ObjectUtil = (function() {

var TypeUtil = com.xopus.core.lang.js.TypeUtil;

var ObjectUtil = function ObjectUtil() {
};


ObjectUtil.prototype.ObjectUtil = ObjectUtil;

ObjectUtil.create = function create(args) {
    var obj = {};
    for (var i = 0; i < args.length; i += 2) {
        obj[args[i]] = args[i + 1];
    }
    return obj;
};

ObjectUtil.size = function size(obj) {
    var size = 0;
    for (var i in obj) {
        size++;
    }
    return size;
};

ObjectUtil.merge = function merge(a, b) {
    var newObject = {};
    ObjectUtil.mixin(newObject, a);
    ObjectUtil.mixin(newObject, b);
    return newObject;
};

ObjectUtil.clone = function clone(value, deep) {
    var clonedValue;
    if (TypeUtil.isArray(value)) {
        clonedValue = [];
        for (var i = 0, l = value.length - 1; i <= l; i++) {
            clonedValue.push(ObjectUtil.clone(value[i]));
        }
    } else if (TypeUtil.isRegExp(value)) {
        clonedValue = new RegExp(value);
    } else if (TypeUtil.isDate(value)) {
        clonedValue = new Date(value);
    } else if (TypeUtil.isFunction(value)) {
        throw new Error("Cloning functions is not implemented yet");
    } else if (TypeUtil.isObject(value)) {
        if (TypeUtil.isFunction(value.clone)) {
            clonedValue = object.clone();
        } else {
            clonedValue = {};
            for (var key in value) {
                clonedValue[key] = deep === false ? value[key] : ObjectUtil.clone(value[key]);
            }
        }
    } else {
        clonedValue = value;
    }
    return clonedValue;
};

ObjectUtil.forEach = function forEach(obj, fun, thisp) {
    if (typeof fun != "function") {
        throw new TypeError;
    }
    for (var i in obj) {
        fun.call(thisp, obj[i], i, obj);
    }
};

ObjectUtil.map = function map(obj, fun, thisObj) {
    if (typeof fun != "function") {
        throw new TypeError;
    }
    var res = {};
    for (var i in obj) {
        res[i] = fun.call(thisObj, obj[i], i, obj);
    }
    return res;
};

ObjectUtil.mixin = function mixin(obj, mixinObj) {
    for (var key in mixinObj) {
        obj[key] = mixinObj[key];
    }
    return obj;
};

ObjectUtil.getKeys = function getKeys(obj) {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }
    return keys;
};

ObjectUtil.getValues = function getValues(obj) {
    var values = [];
    for (var key in obj) {
        values.push(obj[key]);
    }
    return values;
};

ObjectUtil.isEmpty = function isEmpty(obj) {
    for (var i in obj) {
        return false;
    }
    return true;
};

ObjectUtil.swap = function swap(obj) {
    var swapped = {};
    for (var i in obj) {
        swapped[obj[i]] = i;
    }
    return swapped;
};

ObjectUtil.getConstructorName = function getConstructorName(obj) {
    return Object.prototype.toString.call(obj).match(/^\[object ([^\]]+)\]$/)[1];
};



if (!ObjectUtil.name) ObjectUtil.name = Identifier({ObjectUtil:1});


ObjectUtil.initDecoration();


return ObjectUtil;

})();
//#com.xopus.core.platform.PlatformDetection
if (typeof com.xopus.core.platform.PlatformDetection == 'undefined')
com.xopus.core.platform.PlatformDetection = (function() {

var ObjectUtil = com.xopus.core.lang.object.ObjectUtil;

var PlatformDetection = function PlatformDetection() {
};


PlatformDetection.prototype.PlatformDetection = PlatformDetection;

PlatformDetection.prototype.toString = function toString() {
    return PlatformDetection.browser + " " + PlatformDetection.browserVersion + " on " + PlatformDetection.os;
};

PlatformDetection.detect = function detect(scope) {
    var platform = {os: "", osVersion: "", engine: "", engineVersion: "", browser: "", browserVersion: ""};
    var m = /(Linux|Mac OS X|Windows) (?:NT )?([\d\._]+)?/.exec(scope.navigator.userAgent) ||
        /(Macintosh)/.exec(scope.navigator.userAgent);
    if (m) {
        platform.os = m[1];
        if (m[2]) {
            platform.osVersion = m[2].replace(/_/g, ".");
        }
    }
    var r = /\b([A-Za-z]+)\/([a-z\d\+\.]+)/g;
    var map = {};
    while (m = r.exec(scope.navigator.userAgent)) {
        map[m[1]] = m[2];
    }
    for (var i = PlatformDetection.BROWSERS.length; i--;) {
        if (PlatformDetection.BROWSERS[i] in map) {
            platform.browser = PlatformDetection.BROWSERS[i];
            platform.browserVersion = map[PlatformDetection.BROWSERS[i]];
            break;
        }
    }
    for (var i = PlatformDetection.ENGINES.length; i--;) {
        if (PlatformDetection.ENGINES[i] in map) {
            platform.engine = PlatformDetection.ENGINES[i];
            platform.engineVersion = map[PlatformDetection.ENGINES[i]];
            break;
        }
    }
    for (var i = PlatformDetection.OS.length; i--;) {
        if (PlatformDetection.OS[i] in map) {
            platform.os = PlatformDetection.OS[i];
            platform.osVersion = map[PlatformDetection.OS[i]];
            break;
        }
    }
    var m = /MSIE ([\d\.]+)/.exec(scope.navigator.userAgent);
    if (m) {
        platform.browser = "Internet Explorer";
        platform.browserVersion = m[1];
        if (platform.engine == "Mozilla") {
            platform.engine = "Trident";
            platform.engineVersion = "";
        }
    }
    var m = /Version\/([\d\.]+)/.exec(scope.navigator.userAgent);
    if (m) {
        platform.browserVersion = m[1];
    }
    if (platform.os == "Mac OS X") {
        platform.os = "Macintosh";
    }
    if (platform.engine == "AppleWebKit") {
        platform.engine = "WebKit";
    }
    return platform;
};

PlatformDetection.compare = function compare(a, b, op) {
    if (typeof a !== "string" || typeof b !== "string") {
        return null;
    }
    var r;
    a = a.replace(/_/g, ".").replace(/([a-z]+)/gi, ".$1.");
    b = b.replace(/_/g, ".").replace(/([a-z]+)/gi, ".$1.");
    if (a == b) {
        r = 0;
    } else {
        a = a.split(".").map(toVersionNumber);
        b = b.split(".").map(toVersionNumber);
        for (var partA, partB, i = 0, l = Math.max(a.length, b.length) - 1; i <= l; i++) {
            partA = a[i] || 0;
            partB = b[i] || 0;
            if (partA != partB) {
                r = partA > partB ? 1 : -1;
                break;
            }
        }
        if (!r) {
            r = -1;
        }
    }
    switch (op) {
      case "<":
        return r === -1;
      case "<=":
        return r === -1 || r === 0;
      case ">":
        return r === 1;
      case ">=":
        return r === 1 || r === 0;
      case "==":
        return r === 0;
      case "!=":
        return r !== 0;
      default:
        return r;
    }
};

var toVersionNumber = function toVersionNumber(s) {
    if (!s) {
        return 0;
    }
    switch (s) {
      case "dev":
        return -4;
      case "a":
        return -3;
      case "b":
        return -2;
      case "RC":
        return -1;
      default:
        return parseInt(s);
    }
};

PlatformDetection.ENGINE_TRIDENT = "Trident";

PlatformDetection.ENGINE_WEBKIT = "WebKit";

PlatformDetection.ENGINE_PRESTO = "Presto";

PlatformDetection.ENGINE_GECKO = "Gecko";

PlatformDetection.OS_MACINTOSH = "Macintosh";

PlatformDetection.OS_WINDOWS = "Windows";

PlatformDetection.OS_LINUX = "Linux";

PlatformDetection.BROWSER_CHROME = "Chrome";

PlatformDetection.BROWSERS = ["Mozilla", "Firefox", "Iceweasel", "Camino", "Minefield", "Opera", "Safari", "OmniWeb", "iCab", "Chrome"];

PlatformDetection.ENGINES = ["Mozilla", "Trident", "Gecko", "Presto", "AppleWebKit"];

PlatformDetection.OS = ["Ubuntu"];



if (!PlatformDetection.name) PlatformDetection.name = Identifier({PlatformDetection:1});


PlatformDetection.initDecoration();


(function () {
    ObjectUtil.mixin(PlatformDetection, PlatformDetection.detect(window));
})();

return PlatformDetection;

})();
//#com.xopus.core.lang.error.ErrorHandler
if (typeof com.xopus.core.lang.error.ErrorHandler == 'undefined')
com.xopus.core.lang.error.ErrorHandler = (function() {

var Debugging = com.xopus.core.lang.debug.Debugging;

var XEvent = com.xopus.core.lang.events.XEvent;

var ErrorHandler = function ErrorHandler() {
    this.XEvent();
    this.fires({Error: {message: String}, Warning: {message: String}, Help: {message: String}, Info: {message: String}});
};


ErrorHandler.prototype.ErrorHandler = ErrorHandler;

ErrorHandler.prototype.monitor = function monitor(obj) {
    for (var i = 1, l = arguments.length; i < l; i++) {
        this.wrap(obj, arguments[i]);
    }
};

ErrorHandler.prototype.wrap = function wrap(obj, fn) {
    if (obj.monitored === fn || fn === ErrorHandler.wrapper) {
        return;
    }
    if (obj.monitored) {
        throw new Error("There already is another monitored function on this object. Currently, only one method per object is supported.");
    }
    for (var i in obj) {
        if (obj[i] === fn) {
            obj[i] = ErrorHandler.wrapper;
            break;
        }
    }
    obj.monitored = fn;
};

ErrorHandler.wrapper = function wrapper() {
    var fn = this.monitored;
    if (Debugging.isEnabled()) {
        return fn.apply(this, arguments);
    } else {
        try {
            return fn.apply(this, arguments);
        } catch (e) {
            if (this.Error) {
                return this.Error(e, fn, arguments);
            } else {
                throw e;
            }
        }
    }
};

ErrorHandler.prototype.error = function error(e) {
    if (typeof e == "string") {
        e = new Error(e);
    }
    this.Event.Error.fire(e);
};

ErrorHandler.prototype.fatalError = function fatalError(e) {
    if (typeof e == "string") {
        e = new Error(e);
    }
    this.error(e);
    throw e;
};

ErrorHandler.prototype.warning = function warning(e) {
    if (typeof e == "string") {
        e = new Error(e);
    }
    this.Event.Warning.fire(e);
};

ErrorHandler.prototype.info = function info(e) {
    if (typeof e == "string") {
        e = new Error(e);
    }
    this.Event.Info.fire(e);
};

ErrorHandler.prototype.log = function log(e) {
};

ErrorHandler.prototype.caught = function caught(e) {
};

ErrorHandler.prototype.discard = function discard(e) {
};

ErrorHandler.prototype.help = function help(e, varargs) {
    if (typeof e == "string") {
        e = new Error(e);
    }
    e.help = true;
    if (varargs) {
        e.hash = varargs;
    }
    this.Event.Help.fire(e);
};

ErrorHandler.prototype.debugError = function debugError(e) {
    if (Debugging.isEnabled()) {
        if (e) {
            this.fatalError(e);
        } else {
        }
    }
};

ErrorHandler.inheritFrom(com.xopus.core.lang.events.XEvent, Identifier({XEvent:1}));


if (!ErrorHandler.name) ErrorHandler.name = Identifier({ErrorHandler:1});


ErrorHandler.initDecoration();


return new ErrorHandler;

})();
//#com.xopus.core.platform.MSXMLDetection
if (typeof com.xopus.core.platform.MSXMLDetection == 'undefined')
com.xopus.core.platform.MSXMLDetection = (function() {

var ArrayUtil = com.xopus.core.lang.array.ArrayUtil;

var Debugging = com.xopus.core.lang.debug.Debugging;

var ErrorHandler = com.xopus.core.lang.error.ErrorHandler;

var PlatformDetection = com.xopus.core.platform.PlatformDetection;

var MSXMLDetection = function MSXMLDetection() {
};


MSXMLDetection.prototype.MSXMLDetection = MSXMLDetection;

MSXMLDetection.version = null;

MSXMLDetection.versions = [];



if (!MSXMLDetection.name) MSXMLDetection.name = Identifier({MSXMLDetection:1});


MSXMLDetection.initDecoration();


(function () {
    if (PlatformDetection.engine === PlatformDetection.ENGINE_TRIDENT &&
        PlatformDetection.browserVersion !== "6.0") {
        MSXMLDetection.versions = ["6.0", "4.0"];
    } else if (PlatformDetection.engine === PlatformDetection.ENGINE_TRIDENT) {
        MSXMLDetection.versions = Debugging.isEnabled() ? ["4.0", "6.0", "5.0"] : ["6.0", "4.0", "5.0"];
    }
    MSXMLDetection.versions.some(function isAvailableMSXMLVersion(version) {try {new ActiveXObject("MSXML2.DOMDocument." + version);return MSXMLDetection.version = version;} catch (e) {ErrorHandler.discard(e);}});
})();

return MSXMLDetection;

})();
//#com.xopus.xopus.platform.XopusEnvironmentCheck
if (typeof com.xopus.xopus.platform.XopusEnvironmentCheck == 'undefined')
com.xopus.xopus.platform.XopusEnvironmentCheck = (function() {

var Debugging = com.xopus.core.lang.debug.Debugging;

var MSXMLDetection = com.xopus.core.platform.MSXMLDetection;

var PlatformDetection = com.xopus.core.platform.PlatformDetection;

var XopusEnvironmentCheck = function XopusEnvironmentCheck() {
    if ((location + "").toLowerCase().indexOf("/source/com/xopus/xopus/") != -1) {
        return;
    }
    if (!XopusEnvironmentCheck.isSupportedPlatform()) {
        this.reportError("platform");
    }
    if (!XopusEnvironmentCheck.isSupportedProtocol()) {
        this.reportError("protocol");
    }
    if (PlatformDetection.engine === PlatformDetection.ENGINE_TRIDENT &&
        !MSXMLDetection.version) {
        this.reportError("msxml");
    }
};


XopusEnvironmentCheck.prototype.XopusEnvironmentCheck = XopusEnvironmentCheck;

XopusEnvironmentCheck.prototype.reportError = function reportError(id) {
    var redirectURI = "media/requirements.html";
    if (location.href.indexOf(redirectURI) == -1) {
        location.replace(redirectURI + location.hash);
    }
    var el = document.getElementById(id);
    if (el) {
        el.style.display = "block";
    }
};

XopusEnvironmentCheck.isSupportedProtocol = function isSupportedProtocol() {
    return /^https?:$/.test(location.protocol);
};

XopusEnvironmentCheck.isSupportedPlatform = function isSupportedPlatform() {
    switch (true) {
      case PlatformDetection.engine === PlatformDetection.ENGINE_TRIDENT &&
          PlatformDetection.compare("6", PlatformDetection.browserVersion) == 1:
      case PlatformDetection.engine === PlatformDetection.ENGINE_GECKO &&
          PlatformDetection.compare("20080529", ("" + PlatformDetection.engineVersion).substr(0, 8)) == 1:
      case PlatformDetection.browser === "Firefox" &&
          PlatformDetection.compare("3", PlatformDetection.browserVersion) == 1:
      case !(PlatformDetection.engine === PlatformDetection.ENGINE_TRIDENT ||
          PlatformDetection.engine === PlatformDetection.ENGINE_GECKO ||
          PlatformDetection.browser === PlatformDetection.BROWSER_CHROME):
        return location.search.indexOf("platformtest=skip") != -1;
      default:
        return true;
    }
};



if (!XopusEnvironmentCheck.name) XopusEnvironmentCheck.name = Identifier({XopusEnvironmentCheck:1});


XopusEnvironmentCheck.initDecoration();


return new XopusEnvironmentCheck;

})();
//#