import { TransformationCard } from '@/components/transformation-card';
import { obtenerTransformaciones } from '@/lib/api';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function TransformacionesPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {

  const parametros = await searchParams;
  const paginaActual = Number(parametros?.page) || 1;
  const limite = 12;

  const { items: transformaciones, meta, errorTransformaciones } = await obtenerTransformaciones(paginaActual, limite);

  const totalPaginas = meta?.totalPages || 1;

  // Función para construir la URL con los parámetros actuales
  const crearUrlPagina = (pagina: number) => {
    const params = new URLSearchParams();
    params.set('page', pagina.toString());
    return `/transformaciones?${params.toString()}`;
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col items-center text-center">
        <h1 className="font-headline text-5xl font-bold tracking-tight md:text-7xl">
          Formas y{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Transformaciones
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Descubre las transformaciones que han marcado la historia del universo.
        </p>
      </div>
      {errorTransformaciones === false ? (
        <>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {transformaciones.map((transformacion) => (
              <TransformationCard
                key={transformacion.id}
                transformacion={transformacion}
              />
            ))}
          </div>

          {totalPaginas > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={crearUrlPagina(Math.max(1, paginaActual - 1))}
                      className={paginaActual === 1 ? "pointer-events-none opacity-50" : ""}
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
                      className={paginaActual === totalPaginas ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <>
          <Alert variant="destructive" className='mt-12'>
            <AlertTitle>Error de conexión</AlertTitle>
            <AlertDescription>
              No se pudo obtener la lista de transformaciones. Por favor, intenta de nuevo más tarde.
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  );
}
