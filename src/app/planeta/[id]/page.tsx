import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { obtenerPlanetaPorId } from '@/lib/api';
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

export default async function PlanetaDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const parametros = await params;
    const planeta = await obtenerPlanetaPorId(parseInt(parametros.id));

    if (!planeta) {
        notFound();
    }

    return (
        <div className="container mx-auto max-w-5xl px-4 py-8">
            <Button asChild variant="ghost" className="mb-8 gap-2">
                <Link href="/planetas">
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
                                    src={planeta.imagen || ''}
                                    alt={`Imagen de ${planeta.nombre}`}
                                    fill
                                    className="flex h-full w-full items-center justify-center bg-zinc-900 object-contain p-8"
                                    sizes="33vw"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <h1 className="font-headline text-4xl font-bold text-primary">
                                {planeta.nombre}
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
                                <p className="text-muted-foreground">{planeta.descripcion}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="grid grid-cols-2 gap-4 mt-4">
                                <div className="space-y-1">
                                    <p className="font-semibold text-muted-foreground">Está destruido</p>
                                    <p>{planeta.estaDestruido ? 'Sí' : 'No'}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {planeta.personajes.length > 0 && (
                            <div>
                                <h2 className="font-headline text-3xl font-bold mb-4">
                                    Personajes del planeta
                                </h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {planeta.personajes.map((personaje: any) => (
                                            <TransformationCard
                                                key={personaje.nombre}
                                                transformacion={personaje}
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
