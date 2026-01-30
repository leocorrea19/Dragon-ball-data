import Image from 'next/image';
import type { Planeta } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';

export function PlanetCard({ planeta }: { planeta: Planeta }) {
  return (
    <Card className="flex h-full transform flex-col overflow-hidden bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
          <Image
            src={planeta.imagen || '/placeholder.png'}
            alt={`Imagen de ${planeta.nombre}`}
            fill
            className="flex h-full w-full items-center justify-center bg-zinc-900 object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="font-headline text-2xl font-bold text-primary">
          {planeta.nombre}
        </CardTitle>
        <p className="mt-2 text-muted-foreground">{planeta.descripcion}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full font-bold">
          <Link href={`/planeta/${planeta.id}`}>Ver Planeta +</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
