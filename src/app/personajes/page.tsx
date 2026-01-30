import { Button } from '@/components/ui/button';
import { obtenerPersonajes, obtenerOpcionesDeFiltro } from '@/lib/api';
import type { Personaje } from '@/lib/types';
import { CharacterFilters } from '@/components/character-filters';
import { CharacterGrid } from '@/components/character-grid';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    filter?: string;
    page?: string;
  };
}) {
  const parametros = await searchParams;
  const busqueda = parametros?.query?.toLowerCase() || '';
  const filtro = parametros?.filter || 'Todos';
  const paginaActual = Number(parametros?.page) || 1;
  const limite = 12;

  // Obtenemos los personajes para la página actual con filtros aplicados en el servidor
  const { items: personajesFiltrados, meta, errorPersonajes } = await obtenerPersonajes(paginaActual, limite, busqueda, filtro);

  // Para las opciones de filtro, necesitamos todos los personajes (o al menos conocer todas las razas)
  // Como la API no tiene un endpoint de razas, traemos una lista amplia para construir el filtro
  const { items: todosLosPersonajes } = await obtenerPersonajes(1, 100);
  const opciones = await obtenerOpcionesDeFiltro(todosLosPersonajes);

  const totalPaginas = meta?.totalPages || 1;

  // Función para construir la URL con los parámetros actuales
  const crearUrlPagina = (pagina: number) => {
    const params = new URLSearchParams();
    if (busqueda) params.set('query', busqueda);
    if (filtro !== 'Todos') params.set('filter', filtro);
    params.set('page', pagina.toString());
    return `/personajes?${params.toString()}#character-browser`;
  };

  return (
    <div className="flex w-full flex-col">

      <div className="flex flex-col items-center text-center mt-16">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-7xl">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Personajes
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-xl">
          Busca a los personajes de Dragon Ball que más te gusten.
        </p>
      </div>

      <section
        id="character-browser"
        className="container mx-auto max-w-7xl px-4 py-16"
      >
        {errorPersonajes === false ? (
          <>
            < CharacterFilters
              currentFilter={filtro}
              opciones={opciones}
            />

            <Suspense fallback={<LoadingSpinner />}>
              <CharacterGrid personajes={personajesFiltrados} />
            </Suspense>

            {totalPaginas > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={crearUrlPagina(Math.max(1, paginaActual - 1))}
                        className={paginaActual === 1 ? "pointer-events-none opacity-50" : "hover:bg-yellow-400/90"}
                      />
                    </PaginationItem>

                    {[...Array(totalPaginas)].map((_, i) => {
                      const pag = i + 1;
                      // Lógica básica para no mostrar demasiadas páginas
                      if (
                        pag === 1 ||
                        pag === totalPaginas ||
                        (pag >= paginaActual - 1 && pag <= paginaActual + 1)
                      ) {
                        return (
                          <PaginationItem key={pag}>
                            <PaginationLink
                              href={crearUrlPagina(pag)}
                              isActive={pag === paginaActual}
                            >
                              {pag}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      if (pag === paginaActual - 2 || pag === paginaActual + 2) {
                        return (
                          <PaginationItem key={pag}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}

                    <PaginationItem>
                      <PaginationNext
                        href={crearUrlPagina(Math.min(totalPaginas, paginaActual + 1))}
                        className={paginaActual === totalPaginas ? "pointer-events-none opacity-50" : "hover:bg-yellow-400/90"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <>
            <Alert variant="destructive">
              <AlertTitle>Error de conexión</AlertTitle>
              <AlertDescription>
                No se pudo obtener la lista de personajes. Por favor, intenta de nuevo más tarde.
              </AlertDescription>
            </Alert>
          </>
        )}
      </section>
    </div>
  );
}
