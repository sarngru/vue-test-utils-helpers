"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockStoreActions = mockStoreActions;

function mockStoreActions(_ref) {
  var modulesDictionary = _ref.modules,
      jestFn = _ref.jestFn;
  var actionsDictionary = {};
  Object.keys(modulesDictionary).forEach(function (moduleKey) {
    var moduleValue = modulesDictionary[moduleKey];
    var isNamespaced = Object.keys(moduleValue).includes('namespaced');

    if (moduleValue.actions) {
      Object.keys(moduleValue.actions).forEach(function (key) {
        var mockActionKey = isNamespaced ? "".concat(moduleKey, "/").concat(key) : key;
        var mockFn = jestFn().mockResolvedValue({});
        actionsDictionary[mockActionKey] = mockFn;
        moduleValue.actions[key] = mockFn;
      });
    }
  });
  return {
    actions: actionsDictionary
  };
}