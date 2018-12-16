# Vue Test Utils Helpers
Helper functions that make unit testing easier for VueJs applications.

## Installation

`npm install --save-dev git+https://git@github.com/sarngru/vue-test-utils-helpers.git`

---
## Vue-router mocking helpers
### mockRouterComponents
Mocks all components in routes array and makes them available for assertion.

```javascript
mockRouterComponents(routes)

expect(wrapper.vm.$route.name).toBe('home')
```

### toHaveRouteName
Jest matcher that matches vue-test-utils `Wrapper` route with the expected route.

```javascript
expect(wrapper).toHaveRouteName('home')
```

---
## Vuex store mocking helper
### mockStoreActions
Discovers and mocks all `actions` in passed Vuex store `modules`

```javascript
const { actions } = mockStoreActions({ modules, jestFn: jest.fn })
```

### mockStoreMutations
Discovers and mocks all `mutations` in passed Vuex store `modules`

```javascript
const { mutations } = mockStoreMutations({ modules, jestFn: jest.fn })
```

### mockStoreGetters
Discovers and mocks all `getters` in passed Vuex store `modules`

```javascript
const { getters } = mockStoreGetters({ modules, mockedGetters: {}, jestFn: jest.fn })
```

### toHaveBeenLastCalledWithPayload
Jest matcher that matches the payload of last call to a mocked function with the expected payload. Makes it easier to assert on mocked store action.

```javascript
expect(actions.someAction).toHaveBeenLastCalledWithPayload(expected)
```

### toHaveBeenLastCalledWithPayload
Jest matcher is similar to `toHaveBeenLastCalledWithPayload` and allows you to pick the index for the call.

```javascript
expect(actions.someAction).toHaveBeenNthCalledWithPayload(expected, index)
```

---

## Stub components
Create stubbed component using `createStubbedComponent` that can be used with `mount` method in vue-test-utils.

```javascript
const component = createStubbedComponent()

const component = createStubbedComponent({ slots: ['default', 'slot1'] })

const component = createStubbedComponent({ events: ['emit1', 'emit2'] })

const component = createStubbedComponent({
    events: {
    emit1: 'foo',
    emit2: { foo: 'bar' },
    emit3: null
    }
})
```

```javascript
/*
vue-test-utils - emit event from stubbed component so that component under test can react to emitted event
*/
const wrapper = mount(Component, {
    stubs: {
        'StubbedComponent': createStubbedComponent({
            events: ['emit1']
        })
    }
})

wrapper.find('.stubbed-component-selector').trigger('emit1')
expect(<wrapper behviour on handling event emit1>).toBe(<expected>)
```
