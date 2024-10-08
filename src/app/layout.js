import './globals.css'
import Navigation from '../../components/Navigation';
import AuthProvider from '../../components/Provider';

export const metadata = {
  title: 'Productivity Simulation',
  description: 'Simulate your next project',
}
export default function RootLayout({ children, asideContent }) {
  // ... the rest of your RootLayout code ...

  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-900">
        <AuthProvider>
        <header>
          <Navigation />
          <main>{children}</main>
        </header>
        </AuthProvider>
      </body>
    </html>
  );
}