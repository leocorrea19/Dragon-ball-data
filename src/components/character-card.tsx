import Image from 'next/image';
import Link from 'next/link';
import type { Personaje } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { combinarClases } from '@/lib/utils';

export function CharacterCard({ personaje }: { personaje: Personaje }) {
  return (
    <Card className="flex h-full transform flex-col overflow-hidden bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="relative h-64 w-full">
          <Image
            src={personaje.imagen || '/placeholder.png'}
            alt={`Imagen de ${personaje.nombre}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="flex h-full w-full items-center justify-center bg-zinc-900 object-contain p-4"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="font-headline text-2xl font-bold text-primary">
          {personaje.nombre}
        </CardTitle>
        <CardDescription className="mt-2 line-clamp-3 h-[60px]">
          {personaje.descripcion}
        </CardDescription>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="font-semibold text-muted-foreground">Raza</p>
            <p>{personaje.raza}</p>
          </div>
          <div>
            <p className="font-semibold text-muted-foreground">Ki Base</p>
            <p>{personaje.ki}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full font-bold">
          <Link href={`/personaje/${personaje.id}`}>Ver Ficha Completa +</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
