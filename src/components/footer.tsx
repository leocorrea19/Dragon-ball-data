import { Heart, Code } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 py-8">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 text-center text-sm text-muted-foreground md:grid-cols-2 md:text-left">
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <p>Desarrollado con</p>
          <Heart className="h-4 w-4 text-primary" />
          <p>por</p>
          <a href="https://github.com/leocorrea19" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Correa Leonel</a>
        </div>
        <div className="flex items-center justify-center gap-2 md:justify-end">
          <Code className="h-4 w-4 text-accent" />
          <p>API perteneciente a</p>
          <a href="https://web.dragonball-api.com/" target="_blank" className="underline hover:text-primary">Dragon Ball API</a>
        </div>
        <div className="col-span-1 text-xs md:col-span-3 md:mt-4 md:text-center">
          <p>
            Dragon Ball y todos sus logotipos son marcas registradas de Toei
            Animation, Funimation, y Akira Toriyama. Este sitio es un proyecto
            educativo sin fines de lucro.
          </p>
        </div>
      </div>
    </footer>
  );
}
