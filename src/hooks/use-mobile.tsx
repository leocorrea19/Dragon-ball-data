import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useEsMovil() {
  const [esMovil, setEsMovil] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const alCambiar = () => {
      setEsMovil(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", alCambiar)
    setEsMovil(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", alCambiar)
  }, [])

  return !!esMovil
}
