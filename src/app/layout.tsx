import './globals.css';

export const metadata = {
  title: 'Mini Product Showcase',
  description: 'A simple product showcase using Next.js and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}