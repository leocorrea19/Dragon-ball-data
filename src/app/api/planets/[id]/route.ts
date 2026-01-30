import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    const res = await fetch(`https://dragonball-api.com/api/planets/${id}`);
    const data = await res.json();
    return NextResponse.json(data);
}
