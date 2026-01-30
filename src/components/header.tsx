'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { combinarClases } from '@/lib/utils';

const enlacesNavegacion = [
  { href: '/personajes', label: 'Personajes' },
  { href: '/planetas', label: 'Planetas' },
  { href: '/transformaciones', label: 'Transformaciones' },
];

export function Header() {
  const [estaAbierto, setEstaAbierto] = useState(false);
  const rutaActual = usePathname();

  const EnlaceNavegacion = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={combinarClases(
        'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-yellow-400/90 hover:text-accent-foreground',
        rutaActual === href ? 'bg-yellow-400/90 text-accent-foreground' : 'text-muted-foreground'
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-evenly">
        <Link href="/" className="flex items-center gap-2">
          <img src="/img/esfera-icon.png" alt="esfera 4 estrellas" className="w-10 h-10" />
          <span className="font-headline text-xl font-bold tracking-tight">
            Z-DATA
          </span>
        </Link>
        <nav className="hidden items-center space-x-4 md:flex">
          {enlacesNavegacion.map((enlace) => (
            <EnlaceNavegacion key={enlace.href} {...enlace} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden font-bold md:flex bg-yellow-400/90">
            <a
              href="https://web.dragonball-api.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Utilizada
            </a>
          </Button>
          <div className="md:hidden">
            <Sheet open={estaAbierto} onOpenChange={setEstaAbierto}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6 " />
                  <span className="sr-only ">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menú de Navegación</SheetTitle>
                  <SheetDescription>
                    Selecciona una sección para navegar por la aplicación.
                  </SheetDescription>
                </SheetHeader>
                <nav className="mt-8 flex flex-col space-y-4">
                  {enlacesNavegacion.map((enlace) => (
                    <Link
                      key={enlace.href}
                      href={enlace.href}
                      onClick={() => setEstaAbierto(false)}
                      className={combinarClases(
                        'rounded-md px-3 py-2 text-lg font-medium transition-colors',
                        rutaActual === enlace.href
                          ? 'bg-yellow-400/90 text-accent-foreground'
                          : 'text-foreground'
                      )}
                    >
                      {enlace.label}
                    </Link>
                  ))}
                  <Button asChild className="font-bold bg-yellow-400/90" onClick={() => setEstaAbierto(false)}>
                    <a
                      href="https://web.dragonball-api.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      API Utilizada
                    </a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
