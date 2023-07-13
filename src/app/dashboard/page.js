import dynamic from 'next/dynamic';
// import Projects from '../../../components/Projects';

const Projects = dynamic(() => import("../../../components/Projects"), {
  ssr: false,
});

export default function Page() {
  return (
    <section>
      <Projects />
    </section>
  )
}
