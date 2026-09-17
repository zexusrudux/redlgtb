'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar publicaciones desde la API
  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Ocultar el Splash Screen después de 2.5 segundos
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Publicar un nuevo mensaje
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    setContent('');
    setLoading(false);
    fetchPosts();
  };

  // 1. PANTALLA SPLASH (Bienvenida)
  if (showSplash) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0d0d0d',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px',
        textAlign: 'center'
      }}>
        {/* Isotipo / Icono Arcoíris */}
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #FF0018, #FFA500, #FFFF00, #008000, #0000FF, #860079)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 25px rgba(233, 30, 99, 0.4)',
          marginBottom: '20px',
          animation: 'pulse 1.8s infinite ease-in-out'
        }}>
          <span style={{ fontSize: '42px' }}>🌈</span>
        </div>

        <h1 style={{
          color: '#ffffff',
          fontSize: '28px',
          fontWeight: 'bold',
          margin: '0 0 8px 0',
          background: 'linear-gradient(45deg, #e91e63, #9c27b0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Red LGBT+
        </h1>

        <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
          Un espacio libre, seguro y orgulloso.
        </p>

        {/* Indicador de Carga */}
        <div style={{
          marginTop: '30px',
          width: '40px',
          height: '4px',
          backgroundColor: '#222',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#e91e63',
            animation: 'loading 1.5s infinite ease-in-out'
          }} />
        </div>
      </div>
    );
  }

  // 2. INTERFAZ PRINCIPAL DE LA APP
  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '16px', fontFamily: 'sans-serif' }}>
      {/* Barra Superior / Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: '1px solid #222',
        marginBottom: '16px'
      }}>
        <h1 style={{
          fontSize: '20px',
          margin: 0,
          background: 'linear-gradient(45deg, #FF0018, #860079)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Red LGBT+ 🌈
        </h1>
      </header>

      {/* Creador de publicaciones */}
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#181818',
        padding: '14px',
        borderRadius: '12px',
        border: '1px solid #282828',
        marginBottom: '20px'
      }}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="¿Qué quieres compartir hoy con la comunidad?"
          rows="3"
          style={{
            width: '100%',
            backgroundColor: '#101010',
            color: '#fff',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '10px',
            boxSizing: 'border-box',
            outline: 'none',
            resize: 'none'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '10px',
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(90deg, #e91e63, #9c27b0)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Publicando...' : 'Publicar'}
        </button>
      </form>

      {/* Muro / Feed */}
      <section>
        <h2 style={{ fontSize: '16px', color: '#888', marginBottom: '12px' }}>Últimas publicaciones</h2>
        {posts.length === 0 ? (
          <p style={{ color: '#555', textAlign: 'center', marginTop: '30px' }}>No hay publicaciones aún. ¡Sé lxs primerxs en escribir!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={{
              backgroundColor: '#181818',
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid #282828',
              marginBottom: '12px',
              color: '#fff'
            }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '15px', lineHeight: '1.4' }}>{post.content}</p>
              <small style={{ color: '#666', fontSize: '12px' }}>
                {new Date(post.created_at).toLocaleString('es-MX')}
              </small>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
