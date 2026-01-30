import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { obtenerPersonajePorId } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChevronLeft, Info } from 'lucide-react';
import { TransformationCard } from '@/components/transformation-card';

export default async function CharacterDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const parametros = await params;
  const personaje = await obtenerPersonajePorId(parseInt(parametros.id));

  if (!personaje) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <Button asChild variant="ghost" className="mb-8 gap-2">
        <Link href="/personajes">
          <ChevronLeft className="h-4 w-4" />
          Volver al Radar
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="sticky top-24 overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={personaje.imagen || ''}
                  alt={`Imagen de ${personaje.nombre}`}
                  fill
                  className="flex h-full w-full items-center justify-center bg-zinc-900 object-contain p-8"
                  sizes="33vw"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h1 className="font-headline text-4xl font-bold text-primary">
                {personaje.nombre}
              </h1>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Biografía
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{personaje.biografia}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  Estadísticas de Combate
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="font-semibold text-muted-foreground">Raza</p>
                  <p>{personaje.raza}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-muted-foreground">Género</p>
                  <p>{personaje.genero}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-muted-foreground">
                    Afiliación
                  </p>
                  <p>{personaje.afiliacion}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-muted-foreground">
                    Ki Base
                  </p>
                  <div className="flex items-center gap-2">
                    <p>{personaje.ki}</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Nivel de poder estimado en su última aparición.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardContent>
            </Card>

            {personaje.transformaciones.length > 0 && (
              <div>
                <h2 className="font-headline text-3xl font-bold mb-4">
                  Transformaciones
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {personaje.transformaciones.map((transformacion: any) => (
                      <TransformationCard
                        key={transformacion.nombre}
                        transformacion={transformacion}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
