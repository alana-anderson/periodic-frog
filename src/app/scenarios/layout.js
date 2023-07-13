import RootLayout from '../layout';

export default function ScenariosLayout({ children, asideContent }) {
  return (
    <RootLayout asideContent={asideContent}>
      <section>{children}</section>
    </RootLayout>
  );
}
