# Dragon Ball Wiki - Next.js 15 🐉

¡Bienvenido a la Wiki definitiva de Dragon Ball! Esta aplicación consume la API oficial de Dragon Ball para mostrar personajes, planetas y transformaciones con un diseño moderno, dinámico y optimizado.

## ✨ Características

- **Explorador de Personajes:** Listado completo con paginación, búsqueda por nombre y filtros por raza.
- **Detalle de Personajes:** Vista individual con biografía, estadísticas de Ki y sus transformaciones.
- **Planetas:** Listado de los planetas del universo Dragon Ball y sus habitantes.
- **Arquitectura Moderna:** Migración completa de backend Python (FastAPI) a **Next.js Route Handlers** para un despliegue simplificado.
- **UI/UX Premium:** Construido con Tailwind CSS, Radix UI y componentes de Shadcn/UI.

## 🚀 Tecnologías

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes:** Shadcn/UI + Lucide React
- **API:** [Dragon Ball API](https://dragonball-api.com/)

## 🛠️ Instalación y Desarrollo Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/dragon-ball.git
    cd dragon-ball
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:9002`.

## 🌍 Despliegue en Vercel

Este proyecto está preparado para ser desplegado en Vercel con un solo clic. Gracias a los **Route Handlers**, no necesitas un servidor de backend separado.

### Pasos para desplegar:

1. Sube tu código a GitHub.
2. Conecta tu repositorio en el panel de Vercel.
3. **Importante:** Configura la siguiente Variable de Entorno:
   - `NEXT_PUBLIC_SITE_URL`: La URL final de tu proyecto (ej: `https://tu-proyecto.vercel.app`).

## 📁 Estructura del Proyecto

- `src/app/api`: Backend interno que gestiona las peticiones a la API oficial.
- `src/app/(paginas)`: Rutas de la aplicación (Personajes, Planetas, Transformaciones).
- `src/lib/api.ts`: Cliente de API centralizado y tipado.
- `src/components`: Componentes reutilizables y de interfaz.

---
Creado con ❤️ para fans de Dragon Ball. ¡Kamehameha! 💥
