import "./globals.css";

export const metadata = {
  title: "Konfigurátor",
  description: "Testovací verze konfigurátoru",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
