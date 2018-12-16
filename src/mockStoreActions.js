function mockStoreActions ({
  modules: modulesDictionary,
  jestFn
}) {
  const actionsDictionary = {}

  Object.keys(modulesDictionary).forEach(moduleKey => {
    const moduleValue = modulesDictionary[moduleKey]
    const isNamespaced = Object.keys(moduleValue).includes('namespaced')

    if (moduleValue.actions) {
      Object.keys(moduleValue.actions).forEach(key => {
        const mockActionKey = isNamespaced ? `${moduleKey}/${key}` : key
        const mockFn = jestFn().mockResolvedValue({})
        actionsDictionary[mockActionKey] = mockFn
        moduleValue.actions[key] = mockFn
      })
    }
  })

  return {
    actions: actionsDictionary
  }
}

export { mockStoreActions }
