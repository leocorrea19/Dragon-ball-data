import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function TransformationCard({
  transformacion,
}: {
  transformacion: { nombre: string; ki: string; imagen: string };
}) {
  return (
    <Card className="flex h-full transform flex-col overflow-hidden bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
          <Image
            src={transformacion.imagen || '/placeholder.png'}
            alt={`Imagen de ${transformacion.nombre}`}
            fill
            className="flex h-full w-full items-center justify-center bg-zinc-900 object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="font-headline text-2xl font-bold text-primary">
          {transformacion.nombre}
        </CardTitle>
        <div className="mt-2">
          <p className="font-semibold text-muted-foreground">Nivel de Ki</p>
          <p>{transformacion.ki}</p>
        </div>
      </CardContent>
    </Card>
  );
}
