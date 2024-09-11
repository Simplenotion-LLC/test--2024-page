
// `modulePromise` is a promise to the `WebAssembly.module` object to be
//   instantiated.
// `importObjectPromise` is a promise to an object that contains any additional
//   imports needed by the module that aren't provided by the standard runtime.
//   The fields on this object will be merged into the importObject with which
//   the module will be instantiated.
// This function returns a promise to the instantiated module.
export const instantiate = async (modulePromise, importObjectPromise) => {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + js;
    }

    // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
      const exports = dartInstance.exports;
      const read = exports.$listRead;
      const length = exports.$listLength(list);
      const array = new constructor(length);
      for (let i = 0; i < length; i++) {
        array[i] = read(list, i);
      }
      return array;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {

_1: (x0,x1,x2) => x0.set(x1,x2),
_2: (x0,x1,x2) => x0.set(x1,x2),
_6: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._6(f,arguments.length,x0) }),
_7: x0 => new window.FinalizationRegistry(x0),
_8: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
_9: (x0,x1) => x0.unregister(x1),
_10: (x0,x1,x2) => x0.slice(x1,x2),
_11: (x0,x1) => x0.decode(x1),
_12: (x0,x1) => x0.segment(x1),
_13: () => new TextDecoder(),
_14: x0 => x0.buffer,
_15: x0 => x0.wasmMemory,
_16: () => globalThis.window._flutter_skwasmInstance,
_17: x0 => x0.rasterStartMilliseconds,
_18: x0 => x0.rasterEndMilliseconds,
_19: x0 => x0.imageBitmaps,
_167: x0 => x0.select(),
_168: (x0,x1) => x0.append(x1),
_169: x0 => x0.remove(),
_172: x0 => x0.unlock(),
_177: x0 => x0.getReader(),
_189: x0 => new MutationObserver(x0),
_208: (x0,x1,x2) => x0.addEventListener(x1,x2),
_209: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_212: x0 => new ResizeObserver(x0),
_215: (x0,x1) => new Intl.Segmenter(x0,x1),
_216: x0 => x0.next(),
_217: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
_294: x0 => x0.close(),
_295: (x0,x1,x2,x3,x4) => ({type: x0,data: x1,premultiplyAlpha: x2,colorSpaceConversion: x3,preferAnimation: x4}),
_296: x0 => new window.ImageDecoder(x0),
_297: x0 => x0.close(),
_298: x0 => ({frameIndex: x0}),
_299: (x0,x1) => x0.decode(x1),
_302: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._302(f,arguments.length,x0) }),
_303: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._303(f,arguments.length,x0) }),
_304: (x0,x1) => ({addView: x0,removeView: x1}),
_305: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._305(f,arguments.length,x0) }),
_306: f => finalizeWrapper(f, function() { return dartInstance.exports._306(f,arguments.length) }),
_307: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
_308: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._308(f,arguments.length,x0) }),
_309: x0 => ({runApp: x0}),
_310: x0 => new Uint8Array(x0),
_312: x0 => x0.preventDefault(),
_313: x0 => x0.stopPropagation(),
_314: (x0,x1) => x0.addListener(x1),
_315: (x0,x1) => x0.removeListener(x1),
_316: (x0,x1) => x0.prepend(x1),
_317: x0 => x0.remove(),
_318: x0 => x0.disconnect(),
_319: (x0,x1) => x0.addListener(x1),
_320: (x0,x1) => x0.removeListener(x1),
_322: (x0,x1) => x0.append(x1),
_323: x0 => x0.remove(),
_324: x0 => x0.stopPropagation(),
_328: x0 => x0.preventDefault(),
_329: (x0,x1) => x0.append(x1),
_330: x0 => x0.remove(),
_331: x0 => x0.preventDefault(),
_336: (x0,x1) => x0.appendChild(x1),
_337: (x0,x1,x2) => x0.insertBefore(x1,x2),
_338: (x0,x1) => x0.removeChild(x1),
_339: (x0,x1) => x0.appendChild(x1),
_340: (x0,x1) => x0.transferFromImageBitmap(x1),
_341: (x0,x1) => x0.append(x1),
_342: (x0,x1) => x0.append(x1),
_343: (x0,x1) => x0.append(x1),
_344: x0 => x0.remove(),
_345: x0 => x0.remove(),
_346: x0 => x0.remove(),
_347: (x0,x1) => x0.appendChild(x1),
_348: (x0,x1) => x0.appendChild(x1),
_349: x0 => x0.remove(),
_350: (x0,x1) => x0.append(x1),
_351: (x0,x1) => x0.append(x1),
_352: x0 => x0.remove(),
_353: (x0,x1) => x0.append(x1),
_354: (x0,x1) => x0.append(x1),
_355: (x0,x1,x2) => x0.insertBefore(x1,x2),
_356: (x0,x1) => x0.append(x1),
_357: (x0,x1,x2) => x0.insertBefore(x1,x2),
_358: x0 => x0.remove(),
_359: x0 => x0.remove(),
_360: (x0,x1) => x0.append(x1),
_361: x0 => x0.remove(),
_362: (x0,x1) => x0.append(x1),
_363: x0 => x0.remove(),
_364: x0 => x0.remove(),
_365: x0 => x0.getBoundingClientRect(),
_366: x0 => x0.remove(),
_367: x0 => x0.blur(),
_368: x0 => x0.remove(),
_369: x0 => x0.blur(),
_370: x0 => x0.remove(),
_383: (x0,x1) => x0.append(x1),
_384: x0 => x0.remove(),
_385: (x0,x1) => x0.append(x1),
_386: (x0,x1,x2) => x0.insertBefore(x1,x2),
_387: x0 => x0.preventDefault(),
_388: x0 => x0.preventDefault(),
_389: x0 => x0.preventDefault(),
_390: x0 => x0.preventDefault(),
_391: x0 => x0.remove(),
_392: (x0,x1) => x0.observe(x1),
_393: x0 => x0.disconnect(),
_394: (x0,x1) => x0.appendChild(x1),
_395: (x0,x1) => x0.appendChild(x1),
_396: (x0,x1) => x0.appendChild(x1),
_397: (x0,x1) => x0.append(x1),
_398: x0 => x0.remove(),
_399: (x0,x1) => x0.append(x1),
_401: (x0,x1) => x0.appendChild(x1),
_402: (x0,x1) => x0.append(x1),
_403: x0 => x0.remove(),
_404: (x0,x1) => x0.append(x1),
_408: (x0,x1) => x0.appendChild(x1),
_409: x0 => x0.remove(),
_969: () => globalThis.window.flutterConfiguration,
_970: x0 => x0.assetBase,
_975: x0 => x0.debugShowSemanticsNodes,
_976: x0 => x0.hostElement,
_977: x0 => x0.multiViewEnabled,
_978: x0 => x0.nonce,
_980: x0 => x0.fontFallbackBaseUrl,
_981: x0 => x0.useColorEmoji,
_985: x0 => x0.console,
_986: x0 => x0.devicePixelRatio,
_987: x0 => x0.document,
_988: x0 => x0.history,
_989: x0 => x0.innerHeight,
_990: x0 => x0.innerWidth,
_991: x0 => x0.location,
_992: x0 => x0.navigator,
_993: x0 => x0.visualViewport,
_994: x0 => x0.performance,
_995: (x0,x1) => x0.fetch(x1),
_1000: (x0,x1) => x0.dispatchEvent(x1),
_1001: (x0,x1) => x0.matchMedia(x1),
_1002: (x0,x1) => x0.getComputedStyle(x1),
_1004: x0 => x0.screen,
_1005: (x0,x1) => x0.requestAnimationFrame(x1),
_1006: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1006(f,arguments.length,x0) }),
_1010: (x0,x1) => x0.warn(x1),
_1013: () => globalThis.window,
_1014: () => globalThis.Intl,
_1015: () => globalThis.Symbol,
_1018: x0 => x0.clipboard,
_1019: x0 => x0.maxTouchPoints,
_1020: x0 => x0.vendor,
_1021: x0 => x0.language,
_1022: x0 => x0.platform,
_1023: x0 => x0.userAgent,
_1024: x0 => x0.languages,
_1025: x0 => x0.documentElement,
_1026: (x0,x1) => x0.querySelector(x1),
_1029: (x0,x1) => x0.createElement(x1),
_1031: (x0,x1) => x0.execCommand(x1),
_1035: (x0,x1) => x0.createTextNode(x1),
_1036: (x0,x1) => x0.createEvent(x1),
_1040: x0 => x0.head,
_1041: x0 => x0.body,
_1042: (x0,x1) => x0.title = x1,
_1045: x0 => x0.activeElement,
_1047: x0 => x0.visibilityState,
_1048: () => globalThis.document,
_1049: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1050: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1051: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1052: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_1055: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1055(f,arguments.length,x0) }),
_1056: x0 => x0.target,
_1058: x0 => x0.timeStamp,
_1059: x0 => x0.type,
_1061: x0 => x0.preventDefault(),
_1065: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
_1070: x0 => x0.firstChild,
_1076: x0 => x0.parentElement,
_1078: x0 => x0.parentNode,
_1081: (x0,x1) => x0.removeChild(x1),
_1082: (x0,x1) => x0.removeChild(x1),
_1083: x0 => x0.isConnected,
_1084: (x0,x1) => x0.textContent = x1,
_1087: (x0,x1) => x0.contains(x1),
_1092: x0 => x0.firstElementChild,
_1094: x0 => x0.nextElementSibling,
_1095: x0 => x0.clientHeight,
_1096: x0 => x0.clientWidth,
_1097: x0 => x0.offsetHeight,
_1098: x0 => x0.offsetWidth,
_1099: x0 => x0.id,
_1100: (x0,x1) => x0.id = x1,
_1103: (x0,x1) => x0.spellcheck = x1,
_1104: x0 => x0.tagName,
_1105: x0 => x0.style,
_1107: (x0,x1) => x0.append(x1),
_1108: (x0,x1) => x0.getAttribute(x1),
_1109: x0 => x0.getBoundingClientRect(),
_1112: (x0,x1) => x0.closest(x1),
_1114: (x0,x1) => x0.querySelectorAll(x1),
_1115: x0 => x0.remove(),
_1116: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1118: (x0,x1) => x0.removeAttribute(x1),
_1119: (x0,x1) => x0.tabIndex = x1,
_1121: (x0,x1) => x0.focus(x1),
_1122: x0 => x0.scrollTop,
_1123: (x0,x1) => x0.scrollTop = x1,
_1124: x0 => x0.scrollLeft,
_1125: (x0,x1) => x0.scrollLeft = x1,
_1126: x0 => x0.classList,
_1127: (x0,x1) => x0.className = x1,
_1131: (x0,x1) => x0.getElementsByClassName(x1),
_1132: x0 => x0.click(),
_1133: (x0,x1) => x0.hasAttribute(x1),
_1136: (x0,x1) => x0.attachShadow(x1),
_1140: (x0,x1) => x0.getPropertyValue(x1),
_1142: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
_1144: (x0,x1) => x0.removeProperty(x1),
_1146: x0 => x0.offsetLeft,
_1147: x0 => x0.offsetTop,
_1148: x0 => x0.offsetParent,
_1150: (x0,x1) => x0.name = x1,
_1151: x0 => x0.content,
_1152: (x0,x1) => x0.content = x1,
_1165: (x0,x1) => x0.nonce = x1,
_1170: x0 => x0.now(),
_1172: (x0,x1) => x0.width = x1,
_1174: (x0,x1) => x0.height = x1,
_1178: (x0,x1) => x0.getContext(x1),
_1256: x0 => x0.status,
_1257: x0 => x0.headers,
_1258: x0 => x0.body,
_1259: x0 => x0.arrayBuffer(),
_1262: (x0,x1) => x0.get(x1),
_1264: x0 => x0.read(),
_1265: x0 => x0.value,
_1266: x0 => x0.done,
_1268: x0 => x0.name,
_1269: x0 => x0.x,
_1270: x0 => x0.y,
_1273: x0 => x0.top,
_1274: x0 => x0.right,
_1275: x0 => x0.bottom,
_1276: x0 => x0.left,
_1285: x0 => x0.height,
_1286: x0 => x0.width,
_1287: (x0,x1) => x0.value = x1,
_1289: (x0,x1) => x0.placeholder = x1,
_1290: (x0,x1) => x0.name = x1,
_1291: x0 => x0.selectionDirection,
_1292: x0 => x0.selectionStart,
_1293: x0 => x0.selectionEnd,
_1296: x0 => x0.value,
_1298: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1303: x0 => x0.readText(),
_1304: (x0,x1) => x0.writeText(x1),
_1305: x0 => x0.altKey,
_1306: x0 => x0.code,
_1307: x0 => x0.ctrlKey,
_1308: x0 => x0.key,
_1309: x0 => x0.keyCode,
_1310: x0 => x0.location,
_1311: x0 => x0.metaKey,
_1312: x0 => x0.repeat,
_1313: x0 => x0.shiftKey,
_1314: x0 => x0.isComposing,
_1315: (x0,x1) => x0.getModifierState(x1),
_1316: x0 => x0.state,
_1319: (x0,x1) => x0.go(x1),
_1320: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
_1321: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
_1322: x0 => x0.pathname,
_1323: x0 => x0.search,
_1324: x0 => x0.hash,
_1327: x0 => x0.state,
_1333: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1333(f,arguments.length,x0,x1) }),
_1335: (x0,x1,x2) => x0.observe(x1,x2),
_1338: x0 => x0.attributeName,
_1339: x0 => x0.type,
_1340: x0 => x0.matches,
_1344: x0 => x0.matches,
_1345: x0 => x0.relatedTarget,
_1346: x0 => x0.clientX,
_1347: x0 => x0.clientY,
_1348: x0 => x0.offsetX,
_1349: x0 => x0.offsetY,
_1352: x0 => x0.button,
_1353: x0 => x0.buttons,
_1354: x0 => x0.ctrlKey,
_1355: (x0,x1) => x0.getModifierState(x1),
_1356: x0 => x0.pointerId,
_1357: x0 => x0.pointerType,
_1358: x0 => x0.pressure,
_1359: x0 => x0.tiltX,
_1360: x0 => x0.tiltY,
_1361: x0 => x0.getCoalescedEvents(),
_1362: x0 => x0.deltaX,
_1363: x0 => x0.deltaY,
_1364: x0 => x0.wheelDeltaX,
_1365: x0 => x0.wheelDeltaY,
_1366: x0 => x0.deltaMode,
_1371: x0 => x0.changedTouches,
_1373: x0 => x0.clientX,
_1374: x0 => x0.clientY,
_1375: x0 => x0.data,
_1376: (x0,x1) => x0.type = x1,
_1377: (x0,x1) => x0.max = x1,
_1378: (x0,x1) => x0.min = x1,
_1379: (x0,x1) => x0.value = x1,
_1380: x0 => x0.value,
_1381: x0 => x0.disabled,
_1382: (x0,x1) => x0.disabled = x1,
_1383: (x0,x1) => x0.placeholder = x1,
_1384: (x0,x1) => x0.name = x1,
_1385: (x0,x1) => x0.autocomplete = x1,
_1386: x0 => x0.selectionDirection,
_1387: x0 => x0.selectionStart,
_1388: x0 => x0.selectionEnd,
_1392: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1399: (x0,x1) => x0.add(x1),
_1402: (x0,x1) => x0.noValidate = x1,
_1403: (x0,x1) => x0.method = x1,
_1404: (x0,x1) => x0.action = x1,
_1431: x0 => x0.orientation,
_1432: x0 => x0.width,
_1433: x0 => x0.height,
_1434: (x0,x1) => x0.lock(x1),
_1451: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1451(f,arguments.length,x0,x1) }),
_1461: x0 => x0.length,
_1462: (x0,x1) => x0.item(x1),
_1463: x0 => x0.length,
_1464: (x0,x1) => x0.item(x1),
_1465: x0 => x0.iterator,
_1466: x0 => x0.Segmenter,
_1467: x0 => x0.v8BreakIterator,
_1470: x0 => x0.done,
_1471: x0 => x0.value,
_1472: x0 => x0.index,
_1476: (x0,x1) => x0.adoptText(x1),
_1478: x0 => x0.first(),
_1479: x0 => x0.next(),
_1480: x0 => x0.current(),
_1493: x0 => x0.hostElement,
_1494: x0 => x0.viewConstraints,
_1496: x0 => x0.maxHeight,
_1497: x0 => x0.maxWidth,
_1498: x0 => x0.minHeight,
_1499: x0 => x0.minWidth,
_1500: x0 => x0.loader,
_1501: () => globalThis._flutter,
_1502: (x0,x1) => x0.didCreateEngineInitializer(x1),
_1503: (x0,x1,x2) => x0.call(x1,x2),
_1504: () => globalThis.Promise,
_1505: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1505(f,arguments.length,x0,x1) }),
_1508: x0 => x0.length,
_1511: x0 => x0.tracks,
_1515: x0 => x0.image,
_1520: x0 => x0.codedWidth,
_1521: x0 => x0.codedHeight,
_1524: x0 => x0.duration,
_1528: x0 => x0.ready,
_1529: x0 => x0.selectedTrack,
_1530: x0 => x0.repetitionCount,
_1531: x0 => x0.frameCount,
_1576: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_1577: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
_1578: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1578(f,arguments.length,x0) }),
_1579: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1580: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1580(f,arguments.length,x0) }),
_1581: x0 => x0.send(),
_1582: () => new XMLHttpRequest(),
_1584: (x0,x1,x2,x3,x4,x5,x6,x7) => ({apiKey: x0,authDomain: x1,databaseURL: x2,projectId: x3,storageBucket: x4,messagingSenderId: x5,measurementId: x6,appId: x7}),
_1585: (x0,x1) => globalThis.firebase_core.initializeApp(x0,x1),
_1586: x0 => globalThis.firebase_core.getApp(x0),
_1587: () => globalThis.firebase_core.getApp(),
_1598: (x0,x1) => globalThis.firebase_storage.getStorage(x0,x1),
_1603: x0 => globalThis.firebase_storage.getDownloadURL(x0),
_1607: (x0,x1) => globalThis.firebase_storage.ref(x0,x1),
_1676: () => ({}),
_1682: x0 => x0.call(),
_1684: x0 => globalThis.firebase_storage.getStorage(x0),
_1686: () => globalThis.firebase_core.SDK_VERSION,
_1693: x0 => x0.apiKey,
_1695: x0 => x0.authDomain,
_1697: x0 => x0.databaseURL,
_1699: x0 => x0.projectId,
_1701: x0 => x0.storageBucket,
_1703: x0 => x0.messagingSenderId,
_1705: x0 => x0.measurementId,
_1707: x0 => x0.appId,
_1709: x0 => x0.name,
_1710: x0 => x0.options,
_1711: (x0,x1,x2) => ({errorMap: x0,persistence: x1,popupRedirectResolver: x2}),
_1727: x0 => globalThis.firebase_auth.OAuthProvider.credentialFromResult(x0),
_1728: x0 => globalThis.firebase_auth.OAuthProvider.credentialFromError(x0),
_1750: (x0,x1) => globalThis.firebase_auth.initializeAuth(x0,x1),
_1751: () => globalThis.firebase_auth.debugErrorMap,
_1755: () => globalThis.firebase_auth.browserSessionPersistence,
_1757: () => globalThis.firebase_auth.browserLocalPersistence,
_1759: () => globalThis.firebase_auth.indexedDBLocalPersistence,
_1763: (x0,x1) => globalThis.firebase_auth.connectAuthEmulator(x0,x1),
_1765: (x0,x1,x2) => globalThis.firebase_auth.createUserWithEmailAndPassword(x0,x1,x2),
_1766: x0 => globalThis.firebase_auth.getAdditionalUserInfo(x0),
_1776: (x0,x1,x2) => globalThis.firebase_auth.signInWithEmailAndPassword(x0,x1,x2),
_1798: x0 => globalThis.firebase_auth.multiFactor(x0),
_1799: (x0,x1) => globalThis.firebase_auth.getMultiFactorResolver(x0,x1),
_1801: x0 => x0.currentUser,
_1809: x0 => x0.signOut(),
_1816: x0 => x0.displayName,
_1817: x0 => x0.email,
_1818: x0 => x0.phoneNumber,
_1819: x0 => x0.photoURL,
_1820: x0 => x0.providerId,
_1821: x0 => x0.uid,
_1822: x0 => x0.emailVerified,
_1823: x0 => x0.isAnonymous,
_1824: x0 => x0.providerData,
_1825: x0 => x0.refreshToken,
_1826: x0 => x0.tenantId,
_1827: x0 => x0.metadata,
_1832: x0 => x0.toJSON(),
_1834: x0 => x0.providerId,
_1835: x0 => x0.signInMethod,
_1836: x0 => x0.accessToken,
_1837: x0 => x0.idToken,
_1838: x0 => x0.secret,
_1865: x0 => x0.creationTime,
_1866: x0 => x0.lastSignInTime,
_1871: x0 => x0.code,
_1873: x0 => x0.message,
_1885: x0 => x0.email,
_1886: x0 => x0.phoneNumber,
_1887: x0 => x0.tenantId,
_1908: x0 => x0.user,
_1911: x0 => x0.providerId,
_1912: x0 => x0.profile,
_1913: x0 => x0.username,
_1914: x0 => x0.isNewUser,
_1917: () => globalThis.firebase_auth.browserPopupRedirectResolver,
_1923: x0 => x0.displayName,
_1924: x0 => x0.enrollmentTime,
_1925: x0 => x0.factorId,
_1926: x0 => x0.uid,
_1928: x0 => x0.hints,
_1929: x0 => x0.session,
_1931: x0 => x0.phoneNumber,
_1943: (x0,x1) => x0.getItem(x1),
_1950: (x0,x1) => x0.createElement(x1),
_1957: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1957(f,arguments.length,x0) }),
_1958: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1958(f,arguments.length,x0) }),
_1959: (x0,x1,x2) => x0.onAuthStateChanged(x1,x2),
_1960: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1960(f,arguments.length,x0) }),
_1961: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1961(f,arguments.length,x0) }),
_1962: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1962(f,arguments.length,x0) }),
_1963: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1963(f,arguments.length,x0) }),
_1964: (x0,x1,x2) => x0.onIdTokenChanged(x1,x2),
_1970: (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6,x7,x8,x9),
_1971: (x0,x1) => new firebase_firestore.GeoPoint(x0,x1),
_1973: x0 => globalThis.firebase_firestore.Bytes.fromUint8Array(x0),
_1976: x0 => globalThis.firebase_firestore.Timestamp.fromMillis(x0),
_1983: x0 => ({source: x0}),
_1985: x0 => ({serverTimestamps: x0}),
_1986: (x0,x1) => globalThis.firebase_firestore.getFirestore(x0,x1),
_1991: (x0,x1) => globalThis.firebase_firestore.collection(x0,x1),
_1997: (x0,x1) => globalThis.firebase_firestore.doc(x0,x1),
_1998: () => globalThis.firebase_firestore.documentId(),
_2002: x0 => globalThis.firebase_firestore.getDoc(x0),
_2003: x0 => globalThis.firebase_firestore.getDocFromCache(x0),
_2004: x0 => globalThis.firebase_firestore.getDocFromServer(x0),
_2045: x0 => x0.path,
_2049: () => globalThis.firebase_firestore.GeoPoint,
_2050: x0 => x0.latitude,
_2051: x0 => x0.longitude,
_2053: () => globalThis.firebase_firestore.Bytes,
_2055: x0 => x0.toUint8Array(),
_2065: () => globalThis.firebase_firestore.DocumentReference,
_2069: x0 => x0.path,
_2080: x0 => x0.metadata,
_2081: x0 => x0.ref,
_2082: (x0,x1) => x0.data(x1),
_2102: () => globalThis.firebase_firestore.Timestamp,
_2103: x0 => x0.seconds,
_2104: x0 => x0.nanoseconds,
_2138: x0 => x0.hasPendingWrites,
_2140: x0 => x0.fromCache,
_2147: x0 => x0.source,
_2175: (x0,x1) => globalThis.firebase_firestore.setDoc(x0,x1),
_2179: x0 => globalThis.firebase_firestore.doc(x0),
_2184: () => globalThis.firebase_firestore.getFirestore(),
_2190: x0 => new firebase_firestore.FieldPath(x0),
_2191: (x0,x1) => new firebase_firestore.FieldPath(x0,x1),
_2192: (x0,x1,x2) => new firebase_firestore.FieldPath(x0,x1,x2),
_2193: (x0,x1,x2,x3) => new firebase_firestore.FieldPath(x0,x1,x2,x3),
_2194: (x0,x1,x2,x3,x4) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4),
_2195: (x0,x1,x2,x3,x4,x5) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5),
_2196: (x0,x1,x2,x3,x4,x5,x6) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6),
_2197: (x0,x1,x2,x3,x4,x5,x6,x7) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6,x7),
_2198: (x0,x1,x2,x3,x4,x5,x6,x7,x8) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6,x7,x8),
_2199: f => finalizeWrapper(f, function() { return dartInstance.exports._2199(f,arguments.length) }),
_2200: (x0,x1) => x0.debug(x1),
_2201: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2201(f,arguments.length,x0) }),
_2202: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._2202(f,arguments.length,x0,x1) }),
_2203: (x0,x1) => ({createScript: x0,createScriptURL: x1}),
_2204: (x0,x1,x2) => x0.createPolicy(x1,x2),
_2205: (x0,x1) => x0.createScriptURL(x1),
_2206: (x0,x1,x2) => x0.createScript(x1,x2),
_2207: (x0,x1) => x0.appendChild(x1),
_2208: (x0,x1) => x0.appendChild(x1),
_2209: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2209(f,arguments.length,x0) }),
_2216: x0 => x0.remove(),
_2217: x0 => globalThis.URL.createObjectURL(x0),
_2218: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2218(f,arguments.length,x0) }),
_2219: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2219(f,arguments.length,x0) }),
_2220: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2220(f,arguments.length,x0) }),
_2221: (x0,x1) => x0.querySelector(x1),
_2222: (x0,x1) => x0.append(x1),
_2223: (x0,x1,x2) => x0.setAttribute(x1,x2),
_2224: (x0,x1) => x0.replaceChildren(x1),
_2225: (x0,x1) => x0.append(x1),
_2226: x0 => x0.click(),
_2262: x0 => new Array(x0),
_2265: (o, c) => o instanceof c,
_2269: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2269(f,arguments.length,x0) }),
_2270: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2270(f,arguments.length,x0) }),
_2295: (decoder, codeUnits) => decoder.decode(codeUnits),
_2296: () => new TextDecoder("utf-8", {fatal: true}),
_2297: () => new TextDecoder("utf-8", {fatal: false}),
_2298: v => v.toString(),
_2299: (d, digits) => d.toFixed(digits),
_2303: x0 => new WeakRef(x0),
_2304: x0 => x0.deref(),
_2310: Date.now,
_2312: s => new Date(s * 1000).getTimezoneOffset() * 60 ,
_2313: s => {
      if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
        return NaN;
      }
      return parseFloat(s);
    },
_2314: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_2315: () => typeof dartUseDateNowForTicks !== "undefined",
_2316: () => 1000 * performance.now(),
_2317: () => Date.now(),
_2318: () => {
      // On browsers return `globalThis.location.href`
      if (globalThis.location != null) {
        return globalThis.location.href;
      }
      return null;
    },
_2320: () => new WeakMap(),
_2321: (map, o) => map.get(o),
_2322: (map, o, v) => map.set(o, v),
_2323: () => globalThis.WeakRef,
_2334: s => JSON.stringify(s),
_2335: s => printToConsole(s),
_2336: a => a.join(''),
_2337: (o, a, b) => o.replace(a, b),
_2339: (s, t) => s.split(t),
_2340: s => s.toLowerCase(),
_2341: s => s.toUpperCase(),
_2342: s => s.trim(),
_2343: s => s.trimLeft(),
_2344: s => s.trimRight(),
_2346: (s, p, i) => s.indexOf(p, i),
_2347: (s, p, i) => s.lastIndexOf(p, i),
_2348: (s) => s.replace(/\$/g, "$$$$"),
_2349: Object.is,
_2350: s => s.toUpperCase(),
_2351: s => s.toLowerCase(),
_2352: (a, i) => a.push(i),
_2356: a => a.pop(),
_2357: (a, i) => a.splice(i, 1),
_2359: (a, s) => a.join(s),
_2360: (a, s, e) => a.slice(s, e),
_2363: a => a.length,
_2365: (a, i) => a[i],
_2366: (a, i, v) => a[i] = v,
_2368: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_2369: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_2370: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_2371: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_2372: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_2373: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_2374: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_2375: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_2377: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
_2378: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_2379: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_2380: (t, s) => t.set(s),
_2382: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_2384: o => o.buffer,
_2385: o => o.byteOffset,
_2386: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_2387: (b, o) => new DataView(b, o),
_2388: (b, o, l) => new DataView(b, o, l),
_2389: Function.prototype.call.bind(DataView.prototype.getUint8),
_2390: Function.prototype.call.bind(DataView.prototype.setUint8),
_2391: Function.prototype.call.bind(DataView.prototype.getInt8),
_2392: Function.prototype.call.bind(DataView.prototype.setInt8),
_2393: Function.prototype.call.bind(DataView.prototype.getUint16),
_2394: Function.prototype.call.bind(DataView.prototype.setUint16),
_2395: Function.prototype.call.bind(DataView.prototype.getInt16),
_2396: Function.prototype.call.bind(DataView.prototype.setInt16),
_2397: Function.prototype.call.bind(DataView.prototype.getUint32),
_2398: Function.prototype.call.bind(DataView.prototype.setUint32),
_2399: Function.prototype.call.bind(DataView.prototype.getInt32),
_2400: Function.prototype.call.bind(DataView.prototype.setInt32),
_2403: Function.prototype.call.bind(DataView.prototype.getBigInt64),
_2404: Function.prototype.call.bind(DataView.prototype.setBigInt64),
_2405: Function.prototype.call.bind(DataView.prototype.getFloat32),
_2406: Function.prototype.call.bind(DataView.prototype.setFloat32),
_2407: Function.prototype.call.bind(DataView.prototype.getFloat64),
_2408: Function.prototype.call.bind(DataView.prototype.setFloat64),
_2409: (x0,x1) => x0.getRandomValues(x1),
_2410: x0 => new Uint8Array(x0),
_2411: () => globalThis.crypto,
_2422: (o, t) => o instanceof t,
_2424: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2424(f,arguments.length,x0) }),
_2425: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2425(f,arguments.length,x0) }),
_2426: o => Object.keys(o),
_2427: (ms, c) =>
              setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
_2428: (handle) => clearTimeout(handle),
_2429: (ms, c) =>
          setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
_2430: (handle) => clearInterval(handle),
_2431: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_2432: () => Date.now(),
_2437: () => new XMLHttpRequest(),
_2438: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_2439: x0 => x0.send(),
_2441: () => new FileReader(),
_2442: (x0,x1) => x0.readAsArrayBuffer(x1),
_2445: () => new XMLHttpRequest(),
_2446: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
_2447: (x0,x1) => x0.send(x1),
_2449: x0 => x0.getAllResponseHeaders(),
_2455: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2455(f,arguments.length,x0) }),
_2456: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2456(f,arguments.length,x0) }),
_2457: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_2458: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
_2480: (x0,x1) => x0.item(x1),
_2481: x0 => x0.trustedTypes,
_2483: (x0,x1) => x0.text = x1,
_2485: (s, m) => {
          try {
            return new RegExp(s, m);
          } catch (e) {
            return String(e);
          }
        },
_2486: (x0,x1) => x0.exec(x1),
_2487: (x0,x1) => x0.test(x1),
_2488: (x0,x1) => x0.exec(x1),
_2489: (x0,x1) => x0.exec(x1),
_2490: x0 => x0.pop(),
_2494: (x0,x1,x2) => x0[x1] = x2,
_2496: o => o === undefined,
_2497: o => typeof o === 'boolean',
_2498: o => typeof o === 'number',
_2500: o => typeof o === 'string',
_2503: o => o instanceof Int8Array,
_2504: o => o instanceof Uint8Array,
_2505: o => o instanceof Uint8ClampedArray,
_2506: o => o instanceof Int16Array,
_2507: o => o instanceof Uint16Array,
_2508: o => o instanceof Int32Array,
_2509: o => o instanceof Uint32Array,
_2510: o => o instanceof Float32Array,
_2511: o => o instanceof Float64Array,
_2512: o => o instanceof ArrayBuffer,
_2513: o => o instanceof DataView,
_2514: o => o instanceof Array,
_2515: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_2517: o => {
            const proto = Object.getPrototypeOf(o);
            return proto === Object.prototype || proto === null;
          },
_2518: o => o instanceof RegExp,
_2519: (l, r) => l === r,
_2520: o => o,
_2521: o => o,
_2522: o => o,
_2523: b => !!b,
_2524: o => o.length,
_2527: (o, i) => o[i],
_2528: f => f.dartFunction,
_2529: l => arrayFromDartList(Int8Array, l),
_2530: (data, length) => {
          const jsBytes = new Uint8Array(length);
          const getByte = dartInstance.exports.$uint8ListGet;
          for (let i = 0; i < length; i++) {
            jsBytes[i] = getByte(data, i);
          }
          return jsBytes;
        },
_2531: l => arrayFromDartList(Uint8ClampedArray, l),
_2532: l => arrayFromDartList(Int16Array, l),
_2533: l => arrayFromDartList(Uint16Array, l),
_2534: l => arrayFromDartList(Int32Array, l),
_2535: l => arrayFromDartList(Uint32Array, l),
_2536: l => arrayFromDartList(Float32Array, l),
_2537: l => arrayFromDartList(Float64Array, l),
_2538: (data, length) => {
          const read = dartInstance.exports.$byteDataGetUint8;
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, read(data, i));
          }
          return view;
        },
_2539: l => arrayFromDartList(Array, l),
_2540:       (s, length) => {
        if (length == 0) return '';

        const read = dartInstance.exports.$stringRead1;
        let result = '';
        let index = 0;
        const chunkLength = Math.min(length - index, 500);
        let array = new Array(chunkLength);
        while (index < length) {
          const newChunkLength = Math.min(length - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(s, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      }
      ,
_2541:     (s, length) => {
      if (length == 0) return '';

      const read = dartInstance.exports.$stringRead2;
      let result = '';
      let index = 0;
      const chunkLength = Math.min(length - index, 500);
      let array = new Array(chunkLength);
      while (index < length) {
        const newChunkLength = Math.min(length - index, 500);
        for (let i = 0; i < newChunkLength; i++) {
          array[i] = read(s, index++);
        }
        if (newChunkLength < chunkLength) {
          array = array.slice(0, newChunkLength);
        }
        result += String.fromCharCode(...array);
      }
      return result;
    }
    ,
_2542:     (s) => {
      let length = s.length;
      let range = 0;
      for (let i = 0; i < length; i++) {
        range |= s.codePointAt(i);
      }
      const exports = dartInstance.exports;
      if (range < 256) {
        if (length <= 10) {
          if (length == 1) {
            return exports.$stringAllocate1_1(s.codePointAt(0));
          }
          if (length == 2) {
            return exports.$stringAllocate1_2(s.codePointAt(0), s.codePointAt(1));
          }
          if (length == 3) {
            return exports.$stringAllocate1_3(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2));
          }
          if (length == 4) {
            return exports.$stringAllocate1_4(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3));
          }
          if (length == 5) {
            return exports.$stringAllocate1_5(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4));
          }
          if (length == 6) {
            return exports.$stringAllocate1_6(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5));
          }
          if (length == 7) {
            return exports.$stringAllocate1_7(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6));
          }
          if (length == 8) {
            return exports.$stringAllocate1_8(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7));
          }
          if (length == 9) {
            return exports.$stringAllocate1_9(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8));
          }
          if (length == 10) {
            return exports.$stringAllocate1_10(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8), s.codePointAt(9));
          }
        }
        const dartString = exports.$stringAllocate1(length);
        const write = exports.$stringWrite1;
        for (let i = 0; i < length; i++) {
          write(dartString, i, s.codePointAt(i));
        }
        return dartString;
      } else {
        const dartString = exports.$stringAllocate2(length);
        const write = exports.$stringWrite2;
        for (let i = 0; i < length; i++) {
          write(dartString, i, s.charCodeAt(i));
        }
        return dartString;
      }
    }
    ,
_2543: () => ({}),
_2544: () => [],
_2545: l => new Array(l),
_2546: () => globalThis,
_2547: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_2548: (o, p) => p in o,
_2549: (o, p) => o[p],
_2550: (o, p, v) => o[p] = v,
_2551: (o, m, a) => o[m].apply(o, a),
_2553: o => String(o),
_2554: (p, s, f) => p.then(s, f),
_2555: s => {
      if (/[[\]{}()*+?.\\^$|]/.test(s)) {
          s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
      }
      return s;
    },
_2558: x0 => x0.index,
_2560: x0 => x0.length,
_2562: (x0,x1) => x0[x1],
_2563: (x0,x1) => x0.exec(x1),
_2565: x0 => x0.flags,
_2566: x0 => x0.multiline,
_2567: x0 => x0.ignoreCase,
_2568: x0 => x0.unicode,
_2569: x0 => x0.dotAll,
_2570: (x0,x1) => x0.lastIndex = x1,
_2572: (o, p) => o[p],
_2573: (o, p, v) => o[p] = v,
_2574: (o, p) => delete o[p],
_2632: x0 => x0.status,
_2633: (x0,x1) => x0.responseType = x1,
_2635: x0 => x0.response,
_2669: (x0,x1) => x0.withCredentials = x1,
_2672: x0 => x0.responseURL,
_2673: x0 => x0.status,
_2674: x0 => x0.statusText,
_2675: (x0,x1) => x0.responseType = x1,
_2677: x0 => x0.response,
_2784: (x0,x1) => x0.oncancel = x1,
_2790: (x0,x1) => x0.onchange = x1,
_2830: (x0,x1) => x0.onerror = x1,
_3704: (x0,x1) => x0.accept = x1,
_3720: x0 => x0.files,
_3744: (x0,x1) => x0.multiple = x1,
_3762: (x0,x1) => x0.type = x1,
_4015: (x0,x1) => x0.type = x1,
_4023: (x0,x1) => x0.crossOrigin = x1,
_4025: (x0,x1) => x0.text = x1,
_4433: () => globalThis.window,
_4494: x0 => x0.location,
_4514: x0 => x0.navigator,
_4770: x0 => x0.trustedTypes,
_4771: x0 => x0.sessionStorage,
_4788: x0 => x0.hostname,
_4996: x0 => x0.vendor,
_9269: x0 => x0.type,
_9270: x0 => x0.target,
_9409: () => globalThis.document,
_9499: x0 => x0.body,
_9500: x0 => x0.head,
_9865: (x0,x1) => x0.id = x1,
_10542: x0 => x0.size,
_10543: x0 => x0.type,
_10550: x0 => x0.name,
_10551: x0 => x0.lastModified,
_10557: x0 => x0.length,
_10572: x0 => x0.result,
_15251: () => globalThis.console,
_15275: () => globalThis.window.flutterCanvasKit,
_15276: () => globalThis.window._flutter_skwasmInstance,
_15277: x0 => x0.name,
_15278: x0 => x0.message,
_15279: x0 => x0.code,
_15281: x0 => x0.customData
    };

    const baseImports = {
        dart2wasm: dart2wasm,


        Math: Math,
        Date: Date,
        Object: Object,
        Array: Array,
        Reflect: Reflect,
    };

    const jsStringPolyfill = {
        "charCodeAt": (s, i) => s.charCodeAt(i),
        "compare": (s1, s2) => {
            if (s1 < s2) return -1;
            if (s1 > s2) return 1;
            return 0;
        },
        "concat": (s1, s2) => s1 + s2,
        "equals": (s1, s2) => s1 === s2,
        "fromCharCode": (i) => String.fromCharCode(i),
        "length": (s) => s.length,
        "substring": (s, a, b) => s.substring(a, b),
    };

    dartInstance = await WebAssembly.instantiate(await modulePromise, {
        ...baseImports,
        ...(await importObjectPromise),
        "wasm:js-string": jsStringPolyfill,
    });

    return dartInstance;
}

// Call the main function for the instantiated module
// `moduleInstance` is the instantiated dart2wasm module
// `args` are any arguments that should be passed into the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

