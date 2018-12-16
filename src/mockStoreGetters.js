function mockStoreGetters ({
  modules: modulesDictionary,
  mockedGetters,
  jestFn
}) {
  const gettersDictionary = {}

  Object.keys(modulesDictionary).forEach(moduleKey => {
    const moduleValue = modulesDictionary[moduleKey]
    const isNamespaced = Object.keys(moduleValue).includes('namespaced')

    if (moduleValue.getters) {
      Object.keys(moduleValue.getters).forEach(key => {
        const mockedGetterKey = isNamespaced ? `${moduleKey}/${key}` : key
        let mockFn = jestFn()
        // use custom mock functions when available
        if (Object.keys(mockedGetters).includes(mockedGetterKey)) {
          mockFn = mockedGetters[mockedGetterKey]
        }
        gettersDictionary[mockedGetterKey] = mockFn
        moduleValue.getters[key] = mockFn
      })
    }
  })

  return {
    getters: gettersDictionary
  }
}

export { mockStoreGetters }
