import { rootReducer } from 'fast-redux'
import { createWrapper, MakeStore } from 'next-redux-wrapper'
import { applyMiddleware, compose, Store, createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { buildEnv } from 'src/common/helpers'

export const AppAction = {
  HYDRATE: 'HYDRATE',
  RESET: 'RESET',
  SET: 'SET',
}

const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case AppAction.RESET: {
      return {}
    }
    case AppAction.SET: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return rootReducer(state, action)
  }
}

export const initStore = (preloadedState: any = {}) => {
  const composerEnhancer = !buildEnv.isProduction()
    ? composeWithDevTools({
        name: '__redux_state__',
        trace: true,
        traceLimit: 25,
      })
    : compose

  return configureStore({
    reducer: appReducer,
    devTools: true,
    preloadedState,
    enhancers: [composerEnhancer(applyMiddleware(thunkMiddleware))],
  })
}

export const withRedux = (component: React.ReactNode, store?: Store) => {
  const makeStore: MakeStore<Store> = store ? () => store : initStore
  
  return createWrapper(makeStore).withRedux(component)
}
