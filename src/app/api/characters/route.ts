import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pagina = searchParams.get('page') || '1';
    const limite = searchParams.get('limit') || '12';

    // Construimos la URL con todos los parámetros recibidos
    const apiUrl = new URL('https://dragonball-api.com/api/characters');
    searchParams.forEach((value, key) => {
        apiUrl.searchParams.set(key, value);
    });

    const res = await fetch(apiUrl.toString());
    const data = await res.json();
    return NextResponse.json(data);
}
