import './globals.css'
import Navigation from '../../components/Navigation';
import AuthProvider from '../../components/Provider';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Knomadic',
  description: 'Simulate your next project',
}
export default function RootLayout({ children, asideContent }) {
  // ... the rest of your RootLayout code ...

  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-50">
        <AuthProvider>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}