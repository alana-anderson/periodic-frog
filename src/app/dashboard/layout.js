import Header from '../../../components/Header';

export default function DashboardLayout({ children, asideContent }) {
  return (
    <section>
      <section><Header title="Dashboard" /></section>
      <section>{children}</section>
    </section>
  )
}