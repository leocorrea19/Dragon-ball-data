import type { Personaje, Planeta, Transformacion } from './types';

const URL_API = typeof window !== 'undefined' ? '/api' : (process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/api` : 'http://localhost:9002/api');

export async function obtenerPersonajes(pagina: number = 1, limite: number = 12, busqueda: string = '', filtro: string = 'Todos'): Promise<{ items: Personaje[], meta?: any, errorPersonajes: boolean }> {
    let url = `${URL_API}/characters?page=${pagina}&limit=${limite}`;

    // Si hay búsqueda o filtro, la API devuelve un array directo (según docs)
    // Pero probamos enviando los parámetros a ver qué devuelve
    if (busqueda) url += `&name=${busqueda}`;
    if (filtro !== 'Todos') url += `&race=${filtro}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        // La API devuelve o { items, meta } o un array directo si se filtra
        const rawItems = Array.isArray(datos) ? datos : (datos.items || []);
        const meta = Array.isArray(datos) ? { totalItems: datos.length, totalPages: 1, currentPage: 1 } : datos.meta;

        const items = rawItems.map((elemento: any) => ({
            id: elemento.id,
            nombre: elemento.name,
            ki: elemento.ki,
            raza: elemento.race,
            genero: elemento.gender,
            descripcion: elemento.description,
            imagen: elemento.image,
            afiliacion: elemento.affiliation,
            biografia: elemento.description,
            transformaciones: (elemento.transformations || []).map((t: any) => ({
                nombre: t.name,
                ki: t.ki,
                imagen: t.image
            })),
        }));

        return {
            items,
            meta,
            errorPersonajes: false
        };

    } catch (error) {
        console.error('Error al obtener personajes:', error);
        return { items: [], meta: {}, errorPersonajes: true };
    }
}

export async function obtenerPersonajePorId(id: number): Promise<Personaje | null> {
    const respuesta = await fetch(`${URL_API}/characters/${id}`);
    if (!respuesta.ok) return null;
    const datos = await respuesta.json();

    return {
        id: datos.id,
        nombre: datos.name,
        ki: datos.ki,
        raza: datos.race,
        genero: datos.gender,
        descripcion: datos.description,
        imagen: datos.image,
        afiliacion: datos.affiliation,
        biografia: datos.description,
        transformaciones: (datos.transformations || []).map((transformacion: any) => ({
            nombre: transformacion.name,
            ki: transformacion.ki,
            imagen: transformacion.image
        })),
    };
}

export async function obtenerPlanetas(pagina: number = 1, limite: number = 12): Promise<{ items: Planeta[], errorPlanetas: boolean, meta?: any }> {
    let url = `${URL_API}/planets?page=${pagina}&limit=${limite}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        const rawItems = Array.isArray(datos) ? datos : (datos.items || []);
        const meta = Array.isArray(datos) ? { totalItems: datos.length, totalPages: 1, currentPage: 1 } : datos.meta;

        const items = rawItems.map((planeta: any) => ({
            id: planeta.id,
            nombre: planeta.name,
            descripcion: planeta.description,
            imagen: planeta.image
        }))

        return { items, errorPlanetas: false, meta };

    } catch (error) {
        console.error('Error al obtener planetas:', error);
        return { items: [], errorPlanetas: true, meta: {} };
    }

}

export async function obtenerPlanetaPorId(id: number): Promise<Planeta | null> {
    const respuesta = await fetch(`${URL_API}/planets/${id}`);
    if (!respuesta.ok) return null;
    const datos = await respuesta.json();

    return {
        id: datos.id,
        nombre: datos.name,
        descripcion: datos.description,
        estaDestruido: datos.isDestroyed,
        imagen: datos.image,
        eliminadoEn: datos.deletedAt,
        personajes: (datos.characters || []).map((elemento: any) => ({
            id: elemento.id,
            nombre: elemento.name,
            ki: elemento.ki,
            raza: elemento.race,
            genero: elemento.gender,
            descripcion: elemento.description,
            imagen: elemento.image,
            afiliacion: elemento.affiliation,
            biografia: elemento.description,
            transformaciones: [],
        })),
    };
}

export async function obtenerTransformaciones(pagina: number = 1, limite: number = 12): Promise<{ items: Transformacion[], errorTransformaciones: boolean, meta?: any }> {
    let url = `${URL_API}/transformations?page=${pagina}&limit=${limite}`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        const rawItems = Array.isArray(datos) ? datos : (datos.items || []);

        let itemsFinales = rawItems;
        let metaFinal = datos.meta;

        if (Array.isArray(datos)) {
            const inicio = (pagina - 1) * limite;
            const final = inicio + limite;
            itemsFinales = rawItems.slice(inicio, final)

            metaFinal = {
                totalItems: rawItems.length,
                itemCount: itemsFinales.length,
                itemsPerPage: limite,
                totalPages: Math.ceil(rawItems.length / limite),
                currentPage: pagina
            }
        }

        const items = itemsFinales.map((transformacion: any) => ({
            id: transformacion.id,
            nombre: transformacion.name,
            ki: transformacion.ki,
            imagen: transformacion.image
        }));

        return { items, errorTransformaciones: false, meta: metaFinal }

    } catch (error) {
        console.error('Error al obtener transformaciones:', error);
        return { items: [], errorTransformaciones: true, meta: {} };
    }

}


export async function obtenerOpcionesDeFiltro(personajes: Personaje[]): Promise<string[]> {
    const razas = personajes.map((personaje) => personaje.raza);
    const razasUnicas = Array.from(new Set(razas));
    return ['Todos', ...razasUnicas];
}
