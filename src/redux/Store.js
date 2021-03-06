import logger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'app/redux/sagas/index'
import reducers from 'app/redux/reducers/index'

// Create middlewares
const sagaMiddleware = typeof createSagaMiddleware === 'function'
    ? createSagaMiddleware()
    : createSagaMiddleware.default()
const middlewares = [
  sagaMiddleware,
]

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
}

// Create store
const store = createStore(
    reducers,
    compose(
        applyMiddleware(...middlewares),
    ),
)

sagaMiddleware.run(rootSaga)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index')
    store.replaceReducer(nextRootReducer)
  })
}

const action = (type, payload) => store.dispatch({ type, payload })

// Export history and store
export { store, action }
