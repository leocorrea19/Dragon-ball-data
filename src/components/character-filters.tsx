'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { combinarClases } from '@/lib/utils';

export function CharacterFilters({
  currentFilter,
  opciones,
}: {
  currentFilter: string;
  opciones: string[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const manejarBusqueda = (termino: string) => {
    const parametros = new URLSearchParams(searchParams);
    if (termino) {
      parametros.set('query', termino);
    } else {
      parametros.delete('query');
    }
    parametros.delete('page');
    replace(`${pathname}?${parametros.toString()}`);
  };

  const manejarFiltro = (filtro: string) => {
    const parametros = new URLSearchParams(searchParams);
    parametros.set('filter', filtro);
    parametros.delete('page');
    replace(`${pathname}?${parametros.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Escribe el nombre de un guerrero (ej. Kakarot, Freezer...)"
          className="w-full rounded-lg bg-card py-6 pl-10 text-base"
          onChange={(e) => manejarBusqueda(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {opciones.map((opcion) => (
          <Button
            key={opcion}
            variant={currentFilter === opcion ? 'default' : 'secondary'}
            onClick={() => manejarFiltro(opcion)}
            className={combinarClases(
              'rounded-full font-semibold',
              currentFilter === opcion && 'bg-primary text-primary-foreground'
            )}
          >
            {opcion}
          </Button>
        ))}
      </div>
    </div>
  );
}
