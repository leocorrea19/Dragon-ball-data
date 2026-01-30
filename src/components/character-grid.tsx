import type { Personaje } from '@/lib/types';
import { CharacterCard } from './character-card';
import { AlertCircle } from 'lucide-react';

export function CharacterGrid({ personajes }: { personajes: Personaje[] }) {
  if (personajes.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
        <AlertCircle className="h-16 w-16 text-primary" />
        <h3 className="font-headline text-2xl font-bold">
          Sin Resultados
        </h3>
        <p className="text-lg text-muted-foreground">
          No se detectaron formas de vida con ese nombre.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {personajes.map((personaje) => (
        <CharacterCard key={personaje.id} personaje={personaje} />
      ))}
    </div>
  );
}
