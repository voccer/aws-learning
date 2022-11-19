import { Dispatch, Store } from 'redux'

export type ControllerContext<StateType = any, MessagesType = string> = {
  state?: StateType
  messages?: Record<MessagesType, string>
  router?: NextRouter
  store?: Store
  dispatch?: Dispatch
}
