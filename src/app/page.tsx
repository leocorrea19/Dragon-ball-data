import Link from 'next/link';

export default function Home() {
    const categorias = [
        {
            titulo: 'PERSONAJES',
            enlace: '/personajes',
            imagen: '/img/bg-personajes.webp',
            color: 'from-orange-500/20 to-yellow-500/20',
            colorBorde: 'group-hover:border-yellow-500'
        },
        {
            titulo: 'PLANETAS',
            enlace: '/planetas',
            imagen: '/img/bg-planetas.webp',
            color: 'from-blue-500/20 to-purple-500/20',
            colorBorde: 'group-hover:border-blue-500'
        },
        {
            titulo: 'TRANSFORMACIONES',
            enlace: '/transformaciones',
            imagen: '/img/bg-transformaciones.webp',
            color: 'from-red-600/20 to-orange-600/20',
            colorBorde: 'group-hover:border-red-500'
        }
    ];

    return (
        <div className="flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center p-4 py-12 md:p-8">
            <div className="w-full max-w-5xl space-y-6">

                {categorias.map((categoria) => (
                    <Link
                        key={categoria.enlace}
                        href={categoria.enlace}
                        className="group relative flex h-40 md:h-56 w-full items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20"
                    >
                        {/* Imagen de fondo */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{
                                backgroundImage: `url(${categoria.imagen})`,
                                backgroundColor: 'transparent'
                            }}
                        />

                        {/* Superposición de fondo con degradado */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${categoria.color} opacity-60 transition-opacity group-hover:opacity-40`} />

                        {/* Efecto de brillo (shimmer) */}
                        <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />

                        {/* Contenido */}
                        <div className="relative z-10 flex flex-col items-center gap-2">
                            <h2 className="font-headline text-2xl font-black tracking-[0.2em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-all duration-300 md:text-5xl group-hover:scale-105 group-hover:text-primary">
                                {categoria.titulo}
                            </h2>
                            <div className="md:opacity-0 flex items-center gap-3 text-xs md:text-base font-bold uppercase tracking-[0.3em] drop-shadow-[0_0_2px_rgba(0,0,0,1)] text-white/100 opacity-100 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-4">
                                <span className="h-[1px] w-8 bg-white/100" />
                                <span>Explorar</span>
                                <span className="h-[1px] w-8 bg-white/100" />
                            </div>
                        </div>

                        {/* Interacción de borde */}
                        <div className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 ${categoria.colorBorde}`} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
