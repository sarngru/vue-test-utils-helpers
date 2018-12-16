"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockStoreGetters = mockStoreGetters;

function mockStoreGetters(_ref) {
  var modulesDictionary = _ref.modules,
      mockedGetters = _ref.mockedGetters,
      jestFn = _ref.jestFn;
  var gettersDictionary = {};
  Object.keys(modulesDictionary).forEach(function (moduleKey) {
    var moduleValue = modulesDictionary[moduleKey];
    var isNamespaced = Object.keys(moduleValue).includes('namespaced');

    if (moduleValue.getters) {
      Object.keys(moduleValue.getters).forEach(function (key) {
        var mockedGetterKey = isNamespaced ? "".concat(moduleKey, "/").concat(key) : key;
        var mockFn = jestFn(); // use custom mock functions when available

        if (Object.keys(mockedGetters).includes(mockedGetterKey)) {
          mockFn = mockedGetters[mockedGetterKey];
        }

        gettersDictionary[mockedGetterKey] = mockFn;
        moduleValue.getters[key] = mockFn;
      });
    }
  });
  return {
    getters: gettersDictionary
  };
}