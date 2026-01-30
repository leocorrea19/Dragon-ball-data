"use client"

// Inspirado en la biblioteca react-hot-toast
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const LIMITE_NOTIFICACIONES = 1
const RETRASO_ELIMINACION_NOTIFICACION = 1000000

type NotificacionToaster = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const tiposDeAccion = {
  AGREGAR_NOTIFICACION: "AGREGAR_NOTIFICACION",
  ACTUALIZAR_NOTIFICACION: "ACTUALIZAR_NOTIFICACION",
  DESCARTAR_NOTIFICACION: "DESCARTAR_NOTIFICACION",
  ELIMINAR_NOTIFICACION: "ELIMINAR_NOTIFICACION",
} as const

let contador = 0

function generarId() {
  contador = (contador + 1) % Number.MAX_SAFE_INTEGER
  return contador.toString()
}

type TipoDeAccion = typeof tiposDeAccion

type Accion =
  | {
    type: TipoDeAccion["AGREGAR_NOTIFICACION"]
    toast: NotificacionToaster
  }
  | {
    type: TipoDeAccion["ACTUALIZAR_NOTIFICACION"]
    toast: Partial<NotificacionToaster>
  }
  | {
    type: TipoDeAccion["DESCARTAR_NOTIFICACION"]
    toastId?: NotificacionToaster["id"]
  }
  | {
    type: TipoDeAccion["ELIMINAR_NOTIFICACION"]
    toastId?: NotificacionToaster["id"]
  }

interface Estado {
  notificaciones: NotificacionToaster[]
}

const tiemposEsperaNotificacion = new Map<string, ReturnType<typeof setTimeout>>()

const agregarAColaEliminacion = (idNotificacion: string) => {
  if (tiemposEsperaNotificacion.has(idNotificacion)) {
    return
  }

  const temporizador = setTimeout(() => {
    tiemposEsperaNotificacion.delete(idNotificacion)
    despachar({
      type: tiposDeAccion.ELIMINAR_NOTIFICACION,
      toastId: idNotificacion,
    })
  }, RETRASO_ELIMINACION_NOTIFICACION)

  tiemposEsperaNotificacion.set(idNotificacion, temporizador)
}

export const reductor = (estado: Estado, accion: Accion): Estado => {
  switch (accion.type) {
    case tiposDeAccion.AGREGAR_NOTIFICACION:
      return {
        ...estado,
        notificaciones: [accion.toast, ...estado.notificaciones].slice(0, LIMITE_NOTIFICACIONES),
      }

    case tiposDeAccion.ACTUALIZAR_NOTIFICACION:
      return {
        ...estado,
        notificaciones: estado.notificaciones.map((n) =>
          n.id === accion.toast.id ? { ...n, ...accion.toast } : n
        ),
      }

    case tiposDeAccion.DESCARTAR_NOTIFICACION: {
      const { toastId } = accion

      if (toastId) {
        agregarAColaEliminacion(toastId)
      } else {
        estado.notificaciones.forEach((notificacion) => {
          agregarAColaEliminacion(notificacion.id)
        })
      }

      return {
        ...estado,
        notificaciones: estado.notificaciones.map((n) =>
          n.id === toastId || toastId === undefined
            ? {
              ...n,
              open: false,
            }
            : n
        ),
      }
    }
    case tiposDeAccion.ELIMINAR_NOTIFICACION:
      if (accion.toastId === undefined) {
        return {
          ...estado,
          notificaciones: [],
        }
      }
      return {
        ...estado,
        notificaciones: estado.notificaciones.filter((n) => n.id !== accion.toastId),
      }
  }
}

const oyentes: Array<(estado: Estado) => void> = []

let estadoMemoria: Estado = { notificaciones: [] }

function despachar(accion: Accion) {
  estadoMemoria = reductor(estadoMemoria, accion)
  oyentes.forEach((oyente) => {
    oyente(estadoMemoria)
  })
}

type Notificacion = Omit<NotificacionToaster, "id">

function notificar({ ...propiedades }: Notificacion) {
  const id = generarId()

  const actualizar = (propiedades: NotificacionToaster) =>
    despachar({
      type: tiposDeAccion.ACTUALIZAR_NOTIFICACION,
      toast: { ...propiedades, id },
    })
  const descartar = () => despachar({ type: tiposDeAccion.DESCARTAR_NOTIFICACION, toastId: id })

  despachar({
    type: tiposDeAccion.AGREGAR_NOTIFICACION,
    toast: {
      ...propiedades,
      id,
      open: true,
      onOpenChange: (estaAbierto) => {
        if (!estaAbierto) descartar()
      },
    },
  })

  return {
    id: id,
    descartar,
    actualizar,
  }
}

function useNotificacion() {
  const [estado, setEstado] = React.useState<Estado>(estadoMemoria)

  React.useEffect(() => {
    oyentes.push(setEstado)
    return () => {
      const indice = oyentes.indexOf(setEstado)
      if (indice > -1) {
        oyentes.splice(indice, 1)
      }
    }
  }, [estado])

  return {
    ...estado,
    notificar,
    descartar: (idNotificacion?: string) => despachar({ type: tiposDeAccion.DESCARTAR_NOTIFICACION, toastId: idNotificacion }),
  }
}

export { useNotificacion, notificar as toast }
