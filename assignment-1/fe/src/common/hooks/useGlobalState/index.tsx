/* eslint-disable @typescript-eslint/no-explicit-any */
import equal from 'fast-deep-equal/es6/react'
import { useEffect, useState } from 'react'
import { buildEnv } from 'src/common/helpers'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any
  }
}

const _globalState: { [key: string]: any } = {}
const _listener: { [key: string]: any } = {}
/* istanbul ignore next */
const _devTools = (() => {
  // only work in development browser to debug
  if (buildEnv.isProduction() || !process.browser) {
    return null
  }
  const options = {
    name: '__global_state__',
    trace: true,
  }

  const devTools = window?.__REDUX_DEVTOOLS_EXTENSION__?.connect(options)

  devTools?.subscribe((message: any) => {
    if (
      message?.type === 'DISPATCH' &&
      message?.source === '@devtools-extension' &&
      message?.payload?.type === 'COMMIT'
    ) {
      devTools?.init(_globalState)
    }
  })
  devTools?.init({})
  return devTools
})()

export function useGlobalState<T>(key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
  _listener[key] = _listener[key] || new Set()
  const [state, setState] = useState(_globalState[key])

  useEffect(() => {
    _listener[key].add(setState)
    setState(_globalState[key])
    return () => {
      _listener[key].delete(setState)
    }
  }, [key])

  const setNextState = (nextState: any, deepEqual = false) => {
    nextState = typeof nextState === 'function' ? nextState?.(_globalState[key]) : nextState
    if (_globalState[key] === nextState || (deepEqual && equal(_globalState[key], nextState))) {
      return
    }
    _globalState[key] = nextState
    _devTools?.send(key, _globalState)
    _listener[key]?.forEach((setState: any) => setState(nextState))
  }
  return [state, setNextState]
}

export function setGlobalState(data: any) {
  Object.entries(data).map(([key, nextState]) => {
    if (equal(_globalState[key], nextState)) {
      return
    }
    _globalState[key] = nextState
    _devTools?.send(key, _globalState)
    _listener[key]?.forEach((setState: any) => setState(nextState))
  })
}

export function getGlobalState<T>(key: string): T {
  return _globalState[key]
}
