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
})({"hmhtW":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "57fbebb8f0141f62";
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

},{}],"eVi9I":[function(require,module,exports,__globalThis) {
/**
 * Funkcjonalność galerii produktów
 */ class ProductGallery {
    constructor(){
        // Główny obraz produktu
        this.mainImage = document.querySelector('.main-image img');
        // Miniatury obrazów produktu
        this.thumbnails = document.querySelectorAll('.thumbnail');
        // Aktualny indeks wyświetlanego obrazu
        this.currentIndex = 0;
        // Flaga informująca, czy trwa przejście między obrazami
        this.isTransitioning = false;
        // Inicjalizacja galerii, jeśli istnieją elementy obrazu głównego i miniatur
        if (this.mainImage && this.thumbnails.length > 0) this.initGallery();
    }
    initGallery() {
        // Dodanie przejść CSS do głównego obrazu
        if (this.mainImage) {
            this.mainImage.style.opacity = '1'; // Ustawienie początkowej opopacity na 1
            this.mainImage.style.transition = 'opacity 0.3s ease-in-out'; // Dodanie przejścia opacity
        }
        // Obsługa kliknięć miniatur
        this.thumbnails.forEach((thumbnail, index)=>{
            thumbnail.addEventListener('click', (e)=>{
                e.preventDefault(); // Zapobieganie domyślnej akcji linku
                if (this.isTransitioning) return; // Przerwanie, jeśli trwa już przejście
                const newImage = thumbnail.querySelector('img'); // Pobranie elementu img z miniatury
                // Sprawdzenie, czy nowy obraz istnieje i czy jego źródło jest różne od aktualnego obrazu głównego
                if (newImage && newImage.src !== this.mainImage.src) this.switchImage(newImage.src, index); // Przełączenie obrazu
            });
        });
        // Ustawienie początkowego aktywnego stanu dla pierwszej miniatury
        if (this.thumbnails[0]) this.thumbnails[0].classList.add('active'); // Dodanie klasy 'active' do pierwszej miniatury
        // Dodanie nawigacji klawiaturą
        document.addEventListener('keydown', (e)=>{
            if (e.key === 'ArrowLeft') this.previousImage(); // Przejście do poprzedniego obrazu
            else if (e.key === 'ArrowRight') this.nextImage(); // Przejście do następnego obrazu
        });
        // Dodanie obsługi dotyku
        this.setupTouchEvents();
    }
    // Funkcja do przełączania obrazu
    switchImage(newSrc, newIndex) {
        if (this.isTransitioning || newIndex === this.currentIndex) return; // Przerwanie, jeśli trwa przejście lub indeks jest taki sam
        this.isTransitioning = true; // Ustawienie flagi przejścia na true
        // Wyciszenie aktualnego obrazu
        this.mainImage.style.opacity = '0'; // Ustawienie opacity na 0
        // Aktualizacja obrazu po wyciszeniu
        setTimeout(()=>{
            this.mainImage.src = newSrc; // Zmiana źródła obrazu głównego
            this.mainImage.classList.add('fade-in'); // Dodanie klasy 'fade-in' dla efektu pojawiania się
            this.mainImage.style.opacity = '1'; // Ustawienie opacity na 1, aby obraz był widoczny
            // Aktualizacja aktywnej miniatury
            this.thumbnails[this.currentIndex].classList.remove('active'); // Usunięcie klasy 'active' z poprzedniej miniatury
            this.thumbnails[newIndex].classList.add('active'); // Dodanie klasy 'active' do nowej miniatury
            this.currentIndex = newIndex; // Aktualizacja aktualnego indeksu
            // Usunięcie klasy fade-in i reset blokady przejścia po pojawieniu się obrazu
            setTimeout(()=>{
                this.mainImage.classList.remove('fade-in'); // Usunięcie klasy 'fade-in'
                this.isTransitioning = false; // Reset flagi przejścia
            }, 300); // Czas trwania animacji przejścia
        }, 300); // Opóźnienie przed zmianą źródła obrazu, odpowiadające czasowi wyciszania
    }
    // Funkcja do przełączania na poprzedni obraz
    previousImage() {
        if (this.isTransitioning) return; // Przerwanie, jeśli trwa przejście
        // Obliczenie indeksu poprzedniego obrazu
        const newIndex = (this.currentIndex - 1 + this.thumbnails.length) % this.thumbnails.length;
        const newImage = this.thumbnails[newIndex].querySelector('img'); // Pobranie elementu img poprzedniej miniatury
        if (newImage) this.switchImage(newImage.src, newIndex); // Przełączenie obrazu na poprzedni
    }
    // Funkcja do przełączania na następny obraz
    nextImage() {
        if (this.isTransitioning) return; // Przerwanie, jeśli trwa przejście
        // Obliczenie indeksu następnego obrazu
        const newIndex = (this.currentIndex + 1) % this.thumbnails.length;
        const newImage = this.thumbnails[newIndex].querySelector('img'); // Pobranie elementu img następnej miniatury
        if (newImage) this.switchImage(newImage.src, newIndex); // Przełączenie obrazu na następny
    }
    // Konfiguracja obsługi zdarzeń dotykowych
    setupTouchEvents() {
        let touchStartX = 0; // Początkowa pozycja X dotyku
        let touchEndX = 0; // Końcowa pozycja X dotyku
        // Detektor zdarzenia rozpoczęcia dotyku na głównym obrazie
        this.mainImage.addEventListener('touchstart', (e)=>{
            touchStartX = e.touches[0].clientX; // Zapisanie pozycji X dotknięcia
        }, {
            passive: true
        }); // Opcja passive: true dla lepszej responsywności przewijania
        // Detektor zdarzenia zakończenia dotyku na głównym obrazie
        this.mainImage.addEventListener('touchend', (e)=>{
            touchEndX = e.changedTouches[0].clientX; // Zapisanie pozycji X po zakończeniu dotyku
            const difference = touchStartX - touchEndX; // Obliczenie różnicy między początkową a końcową pozycją
            if (Math.abs(difference) > 50) {
                if (difference > 0) this.nextImage(); // Przejście do następnego obrazu (swipe w lewo)
                else this.previousImage(); // Przejście do poprzedniego obrazu (swipe w prawo)
            }
        }, {
            passive: true
        }); // Opcja passive: true dla lepszej responsywności przewijania
    }
}
/**
 * Funkcjonalność strony produktu
 */ class ProductPage {
    constructor(){
        // Galeria produktu
        this.gallery = null;
        this.initialize(); // Inicjalizacja strony produktu
    }
    initialize() {
        // Inicjalizacja galerii
        this.gallery = new ProductGallery();
        // Inicjalizacja kontrolek ilości
        this.setupQuantityControls();
        // Inicjalizacja dodawania do koszyka
        this.setupAddToCart();
    }
    // Konfiguracja kontrolek ilości produktu
    setupQuantityControls() {
        const controls = document.querySelector('.quantity-controls'); // Znalezienie kontrolek ilości
        if (!controls) return; // Przerwanie, jeśli kontrolki nie istnieją
        const input = controls.querySelector('input'); // Znalezienie inputa ilości
        const minus = controls.querySelector('.minus'); // Znalezienie przycisku minus
        const plus = controls.querySelector('.plus'); // Znalezienie przycisku plus
        // Obsługa kliknięcia przycisku minus
        if (minus && input) minus.addEventListener('click', ()=>{
            const currentValue = parseInt(input.value); // Pobranie aktualnej wartości z inputa
            if (currentValue > 1) input.value = currentValue - 1; // Zmniejszenie wartości o 1, jeśli jest większa niż 1
        });
        // Obsługa kliknięcia przycisku plus
        if (plus && input) plus.addEventListener('click', ()=>{
            const currentValue = parseInt(input.value); // Pobranie aktualnej wartości z inputa
            if (currentValue < 99) input.value = currentValue + 1; // Zwiększenie wartości o 1, jeśli jest mniejsza niż 99
        });
        // Obsługa zmiany wartości w inpucie ilości
        if (input) input.addEventListener('change', ()=>{
            let value = parseInt(input.value); // Parsowanie wartości z inputa
            if (isNaN(value) || value < 1) value = 1; // Ustawienie wartości na 1, jeśli jest NaN lub mniejsza niż 1
            if (value > 99) value = 99; // Ustawienie wartości na 99, jeśli jest większa niż 99
            input.value = value; // Aktualizacja wartości inputa
        });
    }
    // Konfiguracja dodawania produktu do koszyka
    setupAddToCart() {
        const addToCartBtn = document.querySelector('.add-to-cart'); // Znalezienie przycisku "Dodaj do koszyka"
        if (!addToCartBtn) return; // Przerwanie, jeśli przycisk nie istnieje
        // Obsługa kliknięcia przycisku "Dodaj do koszyka"
        addToCartBtn.addEventListener('click', ()=>{
            const productElement = document.querySelector('[data-product-id]'); // Znalezienie elementu produktu po data-product-id
            if (!productElement) return; // Przerwanie, jeśli element produktu nie istnieje
            // Pobranie danych produktu
            const quantity = parseInt(document.querySelector('.quantity-controls input')?.value || 1); // Pobranie ilości z inputa lub domyślnie 1
            const productData = {
                id: productElement.dataset.productId,
                name: document.querySelector('.product-header h1')?.textContent,
                price: document.querySelector('.price')?.textContent,
                image: document.querySelector('.main-image img')?.src,
                quantity: quantity // Ilość produktu
            };
            this.addToCart(productData); // Dodanie produktu do koszyka
        });
    }
    // Funkcja dodająca produkt do koszyka
    addToCart(productData) {
        // Sprawdzenie, czy obiekt aplikacji i CartManager istnieją
        if (window.app && window.app.cartManager) {
            if (window.app.cartManager.addToCart(productData)) this.showNotification(); // Wyświetlenie powiadomienia o dodaniu do koszyka
        } else console.error("CartManager not available"); // Wyświetlenie błędu, jeśli CartManager nie jest dostępny
    }
    // Wyświetlenie powiadomienia o dodaniu do koszyka
    showNotification() {
        const notification = document.createElement('div'); // Utworzenie elementu div dla powiadomienia
        notification.className = 'added-to-cart-notification glass'; // Dodanie klas CSS
        notification.textContent = 'Dodano do koszyka'; // Ustawienie tekstu powiadomienia
        document.body.appendChild(notification); // Dodanie powiadomienia do body
        // Animacja pojawiania się powiadomienia
        requestAnimationFrame(()=>{
            notification.classList.add('show'); // Dodanie klasy 'show', aby rozpocząć animację
        });
        // Ukrycie i usunięcie powiadomienia po 2 sekundach
        setTimeout(()=>{
            notification.classList.remove('show'); // Usunięcie klasy 'show', aby rozpocząć animację znikania
            setTimeout(()=>notification.remove(), 300); // Usunięcie elementu powiadomienia z DOM po zakończeniu animacji znikania
        }, 2000); // Czas wyświetlania powiadomienia (2 sekundy)
    }
}
// Inicjalizacja strony produktu po załadowaniu DOM
document.addEventListener('DOMContentLoaded', ()=>{
    // Sprawdzenie, czy na stronie znajduje się element .product-details (co sugeruje stronę produktu)
    if (document.querySelector('.product-details')) new ProductPage(); // Utworzenie nowej instancji ProductPage, inicjalizując funkcjonalność strony produktu
});

},{}]},["hmhtW","eVi9I"], "eVi9I", "parcelRequire94c2")

//# sourceMappingURL=bio-regeneration.f0141f62.js.map
