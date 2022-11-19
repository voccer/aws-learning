import { useCallback, useRef } from 'react'

type UpdateRefType = HTMLDivElement | HTMLSpanElement | HTMLLabelElement | any
export function useUpdated(): [UpdateRefType, () => void] {
  const ref = useRef<UpdateRefType>()
  const onUpdated = useCallback(() => {
    ref?.current?.setAttribute?.('data-testid', 'updated')
  }, [ref])
  return [ref, onUpdated]
}
