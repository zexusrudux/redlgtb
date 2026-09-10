export default function Home() {
  return (
    <main style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center'
    }}>
      <header style={{ padding: '20px 0' }}>
        <h1 style={{ fontSize: '28px', color: '#e91e63', marginBottom: '8px' }}>
          Bienvenidx a tu Red Social LGBT+ 🌈
        </h1>
        <p style={{ color: '#aaa', fontSize: '15px' }}>
          Un espacio seguro para conectar, expresarte y compartir.
        </p>
      </header>

      <section style={{
        backgroundColor: '#1e1e1e',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Crear Publicación</h2>
        <textarea 
          placeholder="¿Qué estás pensando hoy?" 
          rows="3"
          style={{
            width: '100%',
            backgroundColor: '#2d2d2d',
            border: '1px solid #444',
            borderRadius: '8px',
            color: '#fff',
            padding: '10px',
            boxSizing: 'border-box',
            resize: 'none'
          }}
        />
        <button style={{
          marginTop: '12px',
          width: '100%',
          padding: '12px',
          backgroundColor: '#e91e63',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Publicar
        </button>
      </section>
    </main>
  );
}


