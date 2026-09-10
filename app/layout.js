export const metadata = {
  title: 'Red Social LGBT+',
  description: 'Un espacio seguro y libre para compartir.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{
        margin: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#121212',
        color: '#ffffff'
      }}>
        {children}
      </body>
    </html>
  )
}


