import { mockStoreActions } from '../../src/mockStoreActions'

describe('mockStoreActions', () => {
  const foo = () => {}
  const mockResolvedValue = { mockResolvedValue: () => foo }
  const jestFn = () => mockResolvedValue

  const modules = {
    todos: {
      namespaced: true,
      actions: {
        getTodos () {
          return Promise.resolve(['todo1', 'todo2'])
        }
      }
    },
    users: {
      actions: {
        getUsers () {
          return Promise.resolve([])
        }
      }
    },
    onlyActions: {
      actions: {
        onlyAction () {
          return Promise.resolve([])
        }
      }
    }
  }

  it('should mock store actions and getters', () => {
    const expectedActions = {
      'getUsers': jestFn().mockResolvedValue(),
      'onlyAction': jestFn().mockResolvedValue(),
      'todos/getTodos': jestFn().mockResolvedValue()
    }

    const { actions } = mockStoreActions({
      modules,
      jestFn
    })

    expect(actions).toEqual(expectedActions)
  })
})
