// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"hjw7g":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "631aac008a863c08";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"gRO0R":[function(require,module,exports,__globalThis) {
// Pobierz element canvas i kontekst WebGL
const canvas = document.querySelector("#particles-canvas");
const gl = canvas.getContext("webgl");
// Sprawdź, czy WebGL jest wspierany
if (!gl) alert("WebGL nie jest wspierany przez Twoj\u0105 przegl\u0105dark\u0119.");
// Ustawienie rozmiarów canvas na cały ekran
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, canvas.width, canvas.height);
// Konfigurowalne parametry
const config = {
    particleCount: 5000,
    textArray: [
        "UltraPower",
        "Super Moce"
    ],
    mouseRadius: 0.1,
    particleSize: 2,
    forceMultiplier: 0.001,
    returnSpeed: 0.005,
    velocityDamping: 0.95,
    colorMultiplier: 40000,
    saturationMultiplier: 1000,
    textChangeInterval: 10000,
    rotationForceMultiplier: 0.5 // Mnożnik siły rotacji
};
// Inicjalizacja indeksu aktualnego tekstu
let currentTextIndex = 0;
// Zmienna dla timeoutu zmiany tekstu
let nextTextTimeout;
// Tablica współrzędnych tekstu
let textCoordinates = [];
// Obiekt reprezentujący mysz
const mouse = {
    x: -500,
    y: -500,
    radius: config.mouseRadius // Promień interakcji myszy
};
// Tablica cząsteczek
const particles = [];
// Inicjalizacja cząsteczek
for(let i = 0; i < config.particleCount; i++)particles.push({
    x: 0,
    y: 0,
    baseX: 0,
    baseY: 0,
    vx: 0,
    vy: 0
});
// Vertex shader - odpowiedzialny za pozycję i rozmiar cząsteczek
const vertexShaderSource = `
    attribute vec2 a_position; // Atrybut - pozycja cz\u{105}steczki
    attribute float a_hue; // Atrybut - hue (odcie\u{144}) koloru
    attribute float a_saturation; // Atrybut - nasycenie koloru
    varying float v_hue; // Zmienna wariacyjna - hue przekazywane do fragment shader'a
    varying float v_saturation; // Zmienna wariacyjna - nasycenie przekazywane do fragment shader'a
    void main() {
        gl_PointSize = ${config.particleSize.toFixed(1)}; // Ustawienie rozmiaru punktu (cz\u{105}steczki)
        gl_Position = vec4(a_position, 0.0, 1.0); // Ustawienie pozycji cz\u{105}steczki
        v_hue = a_hue; // Przekazanie hue do fragment shader'a
        v_saturation = a_saturation; // Przekazanie nasycenia do fragment shader'a
    }
`;
// Fragment shader - odpowiedzialny za kolor cząsteczek
const fragmentShaderSource = `
    precision mediump float; // Ustawienie precyzji na \u{15B}redni\u{105}
    varying float v_hue; // Zmienna wariacyjna - hue otrzymane z vertex shader'a
    varying float v_saturation; // Zmienna wariacyjna - nasycenie otrzymane z vertex shader'a
    void main() {
        // Definicje kolor\xf3w (zielony i fioletowy)
        vec3 green = vec3(0.0, 1.0, 0.62); // #00FF9F - zielony
        vec3 purple = vec3(0.61, 0.0, 1.0); // #9D00FF - fioletowy

        // Mieszanie kolor\xf3w w zale\u{17C}no\u{15B}ci od v_hue (pr\u{119}dko\u{15B}ci)
        float mixValue = mod(v_hue, 1.0); // U\u{17C}ywamy mod, aby warto\u{15B}ci by\u{142}y mi\u{119}dzy 0 a 1
        vec3 color = mix(green, purple, mixValue); // Mieszanie zielonego i fioletowego

        // Mieszanie koloru z bia\u{142}ym w zale\u{17C}no\u{15B}ci od nasycenia
        vec3 finalColor = mix(vec3(1.0), color, v_saturation);
        gl_FragColor = vec4(finalColor, 1.0); // Ustawienie koloru fragmentu
    }
`;
// Funkcja do tworzenia shader'a
function createShader(gl, type, source) {
    const shader = gl.createShader(type); // Utworzenie shader'a danego typu
    gl.shaderSource(shader, source); // Ustawienie źródła shader'a
    gl.compileShader(shader); // Kompilacja shader'a
    // Sprawdzenie statusu kompilacji
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader)); // Wyświetlenie logu błędów kompilacji
        gl.deleteShader(shader); // Usunięcie shader'a w przypadku błędu
        return null; // Zwrócenie null
    }
    return shader; // Zwrócenie skompilowanego shader'a
}
// Funkcja do tworzenia programu shader'owego
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram(); // Utworzenie programu shader'owego
    gl.attachShader(program, vertexShader); // Dołączenie vertex shader'a
    gl.attachShader(program, fragmentShader); // Dołączenie fragment shader'a
    gl.linkProgram(program); // Linkowanie programu
    // Sprawdzenie statusu linkowania
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program)); // Wyświetlenie logu błędów linkowania
        gl.deleteProgram(program); // Usunięcie programu w przypadku błędu
        return null; // Zwrócenie null
    }
    return program; // Zwrócenie zlinkowanego programu
}
// Utworzenie vertex shader'a
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
// Utworzenie fragment shader'a
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
// Utworzenie programu shader'owego
const program = createProgram(gl, vertexShader, fragmentShader);
// Pobranie lokalizacji atrybutów w programie shader'owym
const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
const hueAttributeLocation = gl.getAttribLocation(program, "a_hue");
const saturationAttributeLocation = gl.getAttribLocation(program, "a_saturation");
// Utworzenie buforów dla pozycji, hue i nasycenia
const positionBuffer = gl.createBuffer();
const hueBuffer = gl.createBuffer();
const saturationBuffer = gl.createBuffer();
// Utworzenie tablic dla danych pozycji, hue i nasycenia
const positions = new Float32Array(config.particleCount * 2);
const hues = new Float32Array(config.particleCount);
const saturations = new Float32Array(config.particleCount);
// Funkcja do pobierania współrzędnych tekstu na canvas
function getTextCoordinates(text) {
    const ctx = document.createElement("canvas").getContext("2d"); // Utworzenie tymczasowego canvas 2D
    ctx.canvas.width = canvas.width; // Ustawienie szerokości canvas
    ctx.canvas.height = canvas.height; // Ustawienie wysokości canvas
    const fontSize = Math.min(canvas.width / 6, canvas.height / 6); // Obliczenie rozmiaru czcionki
    ctx.font = `900 ${fontSize}px Arial`; // Ustawienie czcionki
    ctx.fillStyle = "white"; // Ustawienie koloru tekstu na biały
    ctx.textAlign = "center"; // Ustawienie wyrównania tekstu na środek
    ctx.textBaseline = "middle"; // Ustawienie linii bazowej tekstu na środek
    ctx.fillText(text, canvas.width / 2, canvas.height / 2); // Wypełnienie tekstem na canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data; // Pobranie danych obrazu z canvas
    const coordinates = []; // Tablica na współrzędne
    // Iteracja po danych obrazu co 4 piksele (R, G, B, A)
    for(let y = 0; y < canvas.height; y += 4)for(let x = 0; x < canvas.width; x += 4){
        const index = (y * canvas.width + x) * 4; // Obliczenie indeksu piksela
        // Sprawdzenie, czy kanał alfa jest większy niż 128 (próg przezroczystości)
        if (imageData[index + 3] > 128) coordinates.push({
            x: x / canvas.width * 2 - 1,
            y: y / canvas.height * -2 + 1 // Normalizacja współrzędnej Y do zakresu -1 do 1
        });
    }
    return coordinates; // Zwrócenie tablicy współrzędnych
}
// Funkcja do tworzenia cząsteczek na podstawie tekstu
function createParticles() {
    textCoordinates = getTextCoordinates(config.textArray[currentTextIndex]); // Pobranie współrzędnych tekstu
    // Ustawienie pozycji bazowych cząsteczek na współrzędne tekstu
    for(let i = 0; i < config.particleCount; i++){
        const randomIndex = Math.floor(Math.random() * textCoordinates.length); // Losowy indeks współrzędnej
        const { x, y } = textCoordinates[randomIndex]; // Pobranie losowej współrzędnej
        particles[i].x = particles[i].baseX = x; // Ustawienie pozycji X i bazowej pozycji X
        particles[i].y = particles[i].baseY = y; // Ustawienie pozycji Y i bazowej pozycji Y
    }
}
// Funkcja do aktualizacji pozycji cząsteczek
function updateParticles() {
    // Iteracja po wszystkich cząsteczkach
    for(let i = 0; i < config.particleCount; i++){
        const particle = particles[i]; // Pobranie cząsteczki
        const dx = mouse.x - particle.x; // Obliczenie różnicy X między myszą a cząsteczką
        const dy = mouse.y - particle.y; // Obliczenie różnicy Y między myszą a cząsteczką
        const distance = Math.sqrt(dx * dx + dy * dy); // Obliczenie odległości między myszą a cząsteczką
        const forceDirectionX = dx / distance; // Kierunek siły w osi X
        const forceDirectionY = dy / distance; // Kierunek siły w osi Y
        const maxDistance = mouse.radius; // Maksymalna odległość interakcji myszy
        const force = (maxDistance - distance) / maxDistance; // Siła odpychania (maleje z odległością)
        const directionX = forceDirectionX * force * config.forceMultiplier; // Składowa X siły
        const directionY = forceDirectionY * force * config.forceMultiplier; // Składowa Y siły
        const angle = Math.atan2(dy, dx); // Kąt między cząsteczką a myszą
        // Siła rotacji cząsteczek wokół myszy
        const rotationForceX = Math.sin(-Math.cos(angle * -1) * Math.sin(config.rotationForceMultiplier * Math.cos(force)) * Math.sin(distance * distance) * Math.sin(angle * distance));
        const rotationForceY = Math.sin(Math.cos(angle * 1) * Math.sin(config.rotationForceMultiplier * Math.sin(force)) * Math.sin(distance * distance) * Math.cos(angle * distance));
        // Jeśli cząsteczka jest blisko myszy, odepchnij ją
        if (distance < mouse.radius) {
            particle.vx -= directionX + rotationForceX; // Zmiana prędkości X
            particle.vy -= directionY + rotationForceY; // Zmiana prędkości Y
        } else {
            // W przeciwnym razie, przyciągaj cząsteczkę do pozycji bazowej
            particle.vx += (particle.baseX - particle.x) * config.returnSpeed; // Powrót do pozycji bazowej X
            particle.vy += (particle.baseY - particle.y) * config.returnSpeed; // Powrót do pozycji bazowej Y
        }
        // Aktualizacja pozycji cząsteczki
        particle.x += particle.vx;
        particle.y += particle.vy;
        // Tłumienie prędkości cząsteczek
        particle.vx *= config.velocityDamping;
        particle.vy *= config.velocityDamping;
        // Obliczenie prędkości i hue na podstawie prędkości
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        const hue = speed * config.colorMultiplier % 360; // Hue zależy od prędkości
        // Ustawienie hue i nasycenia dla cząsteczki
        hues[i] = hue / 360; // Normalizacja hue do zakresu 0-1
        saturations[i] = Math.min(speed * config.saturationMultiplier, 1); // Nasycenie zależy od prędkości, max 1
        positions[i * 2] = particle.x; // Ustawienie pozycji X w tablicy pozycji
        positions[i * 2 + 1] = particle.y; // Ustawienie pozycji Y w tablicy pozycji
    }
    // Aktualizacja buforów pozycji, hue i nasycenia
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW); // Dynamiczne rysowanie - dane mogą się zmieniać
    gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, hues, gl.DYNAMIC_DRAW); // Dynamiczne rysowanie - dane mogą się zmieniać
    gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, saturations, gl.DYNAMIC_DRAW); // Dynamiczne rysowanie - dane mogą się zmieniać
}
// Funkcja animacji
function animate() {
    updateParticles(); // Aktualizacja pozycji cząsteczek
    gl.clear(gl.COLOR_BUFFER_BIT); // Czyszczenie canvas
    // Ustawienie atrybutów pozycji, hue i nasycenia
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0); // Ustawienie wskaźnika na dane pozycji
    gl.enableVertexAttribArray(positionAttributeLocation); // Włączenie atrybutu pozycji
    gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
    gl.vertexAttribPointer(hueAttributeLocation, 1, gl.FLOAT, false, 0, 0); // Ustawienie wskaźnika na dane hue
    gl.enableVertexAttribArray(hueAttributeLocation); // Włączenie atrybutu hue
    gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
    gl.vertexAttribPointer(saturationAttributeLocation, 1, gl.FLOAT, false, 0, 0); // Ustawienie wskaźnika na dane nasycenia
    gl.enableVertexAttribArray(saturationAttributeLocation); // Włączenie atrybutu nasycenia
    gl.useProgram(program); // Użycie programu shader'owego
    gl.drawArrays(gl.POINTS, 0, config.particleCount); // Rysowanie punktów (cząsteczek)
    requestAnimationFrame(animate); // Wywołanie animacji w następnej klatce
}
// Detektor zdarzeń dla ruchu myszy
canvas.addEventListener("mousemove", (event)=>{
    mouse.x = event.clientX / canvas.width * 2 - 1; // Normalizacja pozycji X myszy
    mouse.y = event.clientY / canvas.height * -2 + 1; // Normalizacja pozycji Y myszy
});
// Detektor zdarzeń dla opuszczenia canvas przez mysz
canvas.addEventListener("mouseleave", ()=>{
    mouse.x = -500; // Ustawienie pozycji X myszy poza ekran
    mouse.y = -500; // Ustawienie pozycji Y myszy poza ekran
});
// Detektor zdarzeń dla zmiany rozmiaru okna
window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth; // Aktualizacja szerokości canvas
    canvas.height = window.innerHeight; // Aktualizacja wysokości canvas
    gl.viewport(0, 0, canvas.width, canvas.height); // Aktualizacja viewport WebGL
    createParticles(); // Ponowne utworzenie cząsteczek dla nowego rozmiaru
});
// Funkcja do zmiany tekstu
function changeText() {
    currentTextIndex = (currentTextIndex + 1) % config.textArray.length; // Przejście do następnego tekstu w tablicy
    const newCoordinates = getTextCoordinates(config.textArray[currentTextIndex]); // Pobranie współrzędnych nowego tekstu
    // Aktualizacja pozycji bazowych cząsteczek na nowe współrzędne tekstu
    for(let i = 0; i < config.particleCount; i++){
        const randomIndex = Math.floor(Math.random() * newCoordinates.length); // Losowy indeks współrzędnej
        const { x, y } = newCoordinates[randomIndex]; // Pobranie losowej współrzędnej
        particles[i].baseX = x; // Ustawienie bazowej pozycji X
        particles[i].baseY = y; // Ustawienie bazowej pozycji Y
    }
    nextTextTimeout = setTimeout(changeText, config.textChangeInterval); // Ustawienie timeoutu dla następnej zmiany tekstu
}
// Ustawienie koloru czyszczenia canvas na czarny
gl.clearColor(0, 0, 0, 1);
// Utworzenie cząsteczek
createParticles();
// Rozpoczęcie animacji
animate();
// Uruchomienie zmiany tekstu po pierwszym interwale
nextTextTimeout = setTimeout(changeText, config.textChangeInterval);

},{}]},["hjw7g","gRO0R"], "gRO0R", "parcelRequire94c2")

//# sourceMappingURL=index.8a863c08.js.map
