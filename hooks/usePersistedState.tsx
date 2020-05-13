import { useEffect, useState } from "react"

export const usePersistedState = (key: string, initalValue) => {
  const [state, setState] = useState(initalValue)
  useEffect(() => {
    const localState = window.localStorage.getItem(key)
    if (localState) {
      setState(JSON.parse(localState))
    }
  }, [key])
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])
  return [state, setState]
}
