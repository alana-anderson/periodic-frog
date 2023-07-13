import './globals.css'
import Navigation from '../../components/Navigation';

export const metadata = {
  title: 'Productivity Simulation',
  description: 'Simulate your next project',
}
export default function RootLayout({ children, asideContent }) {
  // ... the rest of your RootLayout code ...

  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-900">
        <section><Navigation /></section>
        <section>{children}</section>
      </body>
    </html>
  );
}