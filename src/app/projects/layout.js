import RootLayout from '../layout';

export default function ProjectsLayout({ children }) {
  return (
    <RootLayout>
        <section>{children}</section>
    </RootLayout>
  );
}
