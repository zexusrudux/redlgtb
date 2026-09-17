export const metadata = {
  title: 'Red Social LGBT+',
  description: 'Un espacio seguro y libre para compartir.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>
      </head>
      <body style={{
        margin: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#0d0d0d',
        color: '#ffffff'
      }}>
        {children}
      </body>
    </html>
  )
}
