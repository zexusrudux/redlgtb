import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const connectionString = 
  process.env.REDLGTB_URL || 
  process.env.REDLGTB_POSTGRES_URL || 
  process.env.DATABASE_URL;

const sql = neon(connectionString);

// Obtener el perfil del usuario (GET)
export async function GET() {
  try {
    const rows = await sql`SELECT * FROM users ORDER BY id DESC LIMIT 1;`;
    return NextResponse.json({ profile: rows[0] || null });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Guardar o actualizar perfil (POST)
export async function POST(request) {
  try {
    const { username, pronouns, bio } = await request.json();

    if (!username || !pronouns) {
      return NextResponse.json({ error: 'Nombre de usuario y pronombres son requeridos' }, { status: 400 });
    }

    // Insertar o reemplazar perfil
    await sql`
      INSERT INTO users (username, pronouns, bio) 
      VALUES (${username}, ${pronouns}, ${bio || ''});
    `;

    return NextResponse.json({ message: 'Perfil guardado exitosamente' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
