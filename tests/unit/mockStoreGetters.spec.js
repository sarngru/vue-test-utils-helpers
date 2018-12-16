import { mockStoreGetters } from '../../src/mockStoreGetters'

describe('mockStoreGetters', () => {
  const foo = () => {}
  const mockResolvedValue = { mockResolvedValue: () => foo }
  const jestFn = () => mockResolvedValue

  const modules = {
    todos: {
      namespaced: true,
      getters: {
        todos: () => {},
        archivedTodos: () => {}
      }
    },
    users: {
      getters: {
        users: () => {}
      }
    },
    onlyGetters: {
      getters: {
        onlyGetter: () => {}
      }
    }
  }

  it('should mock store actions and getters', () => {
    const mockedGetters = {
      'todos/archivedTodos': foo
    }

    const expectedGetters = {
      'users': mockResolvedValue,
      'onlyGetter': mockResolvedValue,
      'todos/todos': mockResolvedValue,
      'todos/archivedTodos': foo
    }

    const { getters } = mockStoreGetters({
      modules,
      mockedGetters,
      jestFn
    })

    expect(getters).toEqual(expectedGetters)
  })
})
