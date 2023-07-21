import Header from '../../../components/Header';

export default function ProjectsLayout({ children }) {
  return (
    <section>
      <section><Header title="Projects" /></section>
      <section>{children}</section>
    </section>
  )
}
