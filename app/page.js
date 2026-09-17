'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'search', 'profile'
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados del Perfil
  const [username, setUsername] = useState('');
  const [pronouns, setPronouns] = useState('elle/elles');
  const [bio, setBio] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSavedMsg, setProfileSavedMsg] = useState('');

  // Cargar publicaciones y perfil
  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      const data = await res.json();
      if (data.profile) {
        setUsername(data.profile.username || '');
        setPronouns(data.profile.pronouns || 'elle/elles');
        setBio(data.profile.bio || '');
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchProfile();

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Guardar publicación
  const handleSubmitPost = async (e) => {
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

  // Guardar datos del Perfil
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSavedMsg('');

    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, pronouns, bio }),
      });
      setProfileSavedMsg('¡Perfil actualizado con éxito! 🌈');
    } catch (e) {
      setProfileSavedMsg('Error al guardar el perfil.');
    } finally {
      setSavingProfile(false);
    }
  };

  // 1. PANTALLA SPLASH
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

  // 2. INTERFAZ PRINCIPAL CON NAVEGACIÓN
  return (
    <main style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '16px 16px 80px 16px',
      fontFamily: 'sans-serif',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
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

      {/* PANTALLA: INICIO (HOME) */}
      {activeTab === 'home' && (
        <div>
          <form onSubmit={handleSubmitPost} style={{
            backgroundColor: '#181818',
            padding: '14px',
            borderRadius: '12px',
            border: '1px solid #282828',
            marginBottom: '20px'
          }}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="¿Qué quieres compartir hoy?"
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

          <section>
            <h2 style={{ fontSize: '16px', color: '#888', marginBottom: '12px' }}>Últimas publicaciones</h2>
            {posts.length === 0 ? (
              <p style={{ color: '#555', textAlign: 'center', marginTop: '30px' }}>No hay publicaciones aún.</p>
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
        </div>
      )}

      {/* PANTALLA: BUSCAR */}
      {activeTab === 'search' && (
        <div style={{ textAlign: 'center', paddingTop: '40px' }}>
          <h2 style={{ color: '#fff', fontSize: '20px' }}>🔍 Buscar en la red</h2>
          <input
            type="text"
            placeholder="Buscar personas o publicaciones..."
            style={{
              width: '100%',
              backgroundColor: '#181818',
              border: '1px solid #333',
              borderRadius: '20px',
              padding: '12px 16px',
              color: '#fff',
              marginTop: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>
      )}

      {/* PANTALLA: PERFIL */}
      {activeTab === 'profile' && (
        <div style={{ backgroundColor: '#181818', padding: '20px', borderRadius: '16px', border: '1px solid #282828' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#e91e63',
              margin: '0 auto 12px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px'
            }}>
              👤
            </div>
            <h2 style={{ color: '#fff', margin: 0 }}>{username || 'Tu Nombre'}</h2>
            <p style={{ color: '#e91e63', margin: '4px 0 0 0', fontSize: '14px' }}>{pronouns}</p>
          </div>

          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '13px', display: 'block', marginBottom: '4px' }}>Nombre / Nickname</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ej. Alex"
                style={{
                  width: '100%',
                  backgroundColor: '#101010',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  padding: '10px',
                  color: '#fff',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ color: '#aaa', fontSize: '13px', display: 'block', marginBottom: '4px' }}>Pronombres</label>
              <select
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#101010',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  padding: '10px',
                  color: '#fff',
                  boxSizing: 'border-box'
                }}
              >
                <option value="elle/elles">elle / elles</option>
                <option value="ella/ellas">ella / ellas</option>
                <option value="él/ellos">él / ellos</option>
                <option value="cualquiera">cualquier pronombre</option>
                <option value="preguntar">prefiero que pregunten</option>
              </select>
            </div>

            <div>
              <label style={{ color: '#aaa', fontSize: '13px', display: 'block', marginBottom: '4px' }}>Biografía</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Escribe algo sobre ti..."
                rows="3"
                style={{
                  width: '100%',
                  backgroundColor: '#101010',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  padding: '10px',
                  color: '#fff',
                  boxSizing: 'border-box',
                  resize: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              style={{
                padding: '12px',
                background: 'linear-gradient(90deg, #e91e63, #9c27b0)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '6px'
              }}
            >
              {savingProfile ? 'Guardando...' : 'Guardar Perfil'}
            </button>

            {profileSavedMsg && (
              <p style={{ color: '#4caf50', textAlign: 'center', fontSize: '14px', margin: 0 }}>{profileSavedMsg}</p>
            )}
          </form>
        </div>
      )}

      {/* NAVBAR INFERIOR */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#121212',
        borderTop: '1px solid #222',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0',
        zIndex: 1000
      }}>
        <button
          onClick={() => setActiveTab('home')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'home' ? '#e91e63' : '#666',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '20px', marginBottom: '2px' }}>🏠</span>
          Inicio
        </button>

        <button
          onClick={() => setActiveTab('search')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'search' ? '#e91e63' : '#666',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '20px', marginBottom: '2px' }}>🔍</span>
          Buscar
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'profile' ? '#e91e63' : '#666',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '20px', marginBottom: '2px' }}>👤</span>
          Perfil
        </button>
      </nav>
    </main>
  );
}

