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
}})()(this, {com: {xopus: {core: {lang: {crypt: {}}}, xopus: {api: {}}}}});


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
//#com.xopus.xopus.api.EmbeddedXopus
if (typeof com.xopus.xopus.api.EmbeddedXopus == 'undefined')
com.xopus.xopus.api.EmbeddedXopus = (function() {

var CryptUtil = com.xopus.core.lang.crypt.CryptUtil;

var EmbeddedXopus = function EmbeddedXopus() {
    this.api = null;
    this.map = {};
    this.listeners = {};
};


EmbeddedXopus.prototype.EmbeddedXopus = EmbeddedXopus;

EmbeddedXopus.prototype["registerAPI"] = function() { return this.registerAPI.apply(this, arguments) };
EmbeddedXopus.prototype.registerAPI = function registerAPI(api, name) {
    this.map[name] = api;
    this.dispatchAPI(api, name);
};

EmbeddedXopus.prototype["getAPI"] = function() { return this.getAPI.apply(this, arguments) };
EmbeddedXopus.prototype.getAPI = function getAPI(name) {
    return this.map[name] || null;
};

EmbeddedXopus.prototype.dispatchAPI = function dispatchAPI(api, name) {
    var listeners = [];
    if (this.listeners[undefined]) {
        listeners = listeners.concat(this.listeners[undefined]);
    }
    if (this.listeners[name]) {
        listeners = listeners.concat(this.listeners[name]);
    }
    for (var listener, i = 0, l = listeners.length; i < l; i++) {
        listener = listeners[i];
        if (typeof listener == "function") {
            listener(api, name);
        } else if (listener !== null &&
            typeof listener == "object" &&
            typeof listener.handleAPI == "function") {
            listener.handleAPI(api, name);
        }
    }
};

EmbeddedXopus.prototype["addListener"] = function() { return this.addListener.apply(this, arguments) };
EmbeddedXopus.prototype.addListener = function addListener(listener, name) {
    if (!this.listeners[name]) {
        this.listeners[name] = [];
    }
    this.listeners[name].push(listener);
};

EmbeddedXopus.prototype["removeListener"] = function() { return this.removeListener.apply(this, arguments) };
EmbeddedXopus.prototype.removeListener = function removeListener(listener, name) {
    if (!this.listeners[name]) {
        return;
    }
    for (var i = this.listeners[name].length; i--;) {
        if (this.listeners[name][i] === listener) {
            this.listeners[name].splice(i, 1);
        }
    }
};



if (!EmbeddedXopus.name) EmbeddedXopus.name = Identifier({EmbeddedXopus:1});


EmbeddedXopus.initDecoration();


(function () {
    var api = CryptUtil.create(["EmbeddedXopus", new EmbeddedXopus]);
    for (var i in api) {
        window[i] = api[i];
    }
})();

return EmbeddedXopus;

})();
//#