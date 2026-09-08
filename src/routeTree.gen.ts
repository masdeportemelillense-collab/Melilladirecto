/* eslint-disable */
// @ts-nocheck
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as EquipoSlugRouteImport } from './routes/equipo.$slug'

const IndexRoute = IndexRouteImport.update({
  id: '/', path: '/', getParentRoute: () => rootRouteImport,
} as any)
const EquipoSlugRoute = EquipoSlugRouteImport.update({
  id: '/equipo/$slug', path: '/equipo/$slug', getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/equipo/$slug': typeof EquipoSlugRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/equipo/$slug': typeof EquipoSlugRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/equipo/$slug': typeof EquipoSlugRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/equipo/$slug'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/equipo/$slug'
  id: '__root__' | '/' | '/equipo/$slug'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  EquipoSlugRoute: typeof EquipoSlugRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
    '/equipo/$slug': { id: '/equipo/$slug'; path: '/equipo/$slug'; fullPath: '/equipo/$slug'; preLoaderRoute: typeof EquipoSlugRouteImport; parentRoute: typeof rootRouteImport }
  }
}

const rootRouteChildren: RootRouteChildren = { IndexRoute, EquipoSlugRoute }
export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
  }
}
