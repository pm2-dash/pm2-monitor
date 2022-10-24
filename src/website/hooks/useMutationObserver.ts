import { Ref, RefObject, useEffect } from 'react'

export const useMutationObserver = (
  ref: RefObject<HTMLElement>,
  callback: MutationCallback,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  }
) => {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback)
      observer.observe(ref.current, options)
      return () => observer.disconnect()
    }
  }, [callback, options])
}
