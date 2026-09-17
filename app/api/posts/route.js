import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

// Usa la variable con tu prefijo customizado 'redlgtb'
const connectionString = 
  process.env.REDLGTB_URL || 
  process.env.REDLGTB_POSTGRES_URL || 
  process.env.DATABASE_URL;

const sql = neon(connectionString);

// Obtener todas las publicaciones (GET)
export async function GET() {
  try {
    const rows = await sql`SELECT * FROM posts ORDER BY created_at DESC;`;
    return NextResponse.json({ posts: rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Crear una nueva publicación (POST)
export async function POST(request) {
  try {
    const { content } = await request.json();
    if (!content || content.trim() === '') {
      return NextResponse.json({ error: 'El contenido es requerido' }, { status: 400 });
    }

    await sql`INSERT INTO posts (content) VALUES (${content});`;
    return NextResponse.json({ message: 'Publicación creada exitosamente' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
