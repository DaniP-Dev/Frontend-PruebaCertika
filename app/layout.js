import "./globals.css";

export const metadata = {
  title: "Prueba Certika | Tasks",
  description: "Frontend Next.js para la gestion de tareas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
