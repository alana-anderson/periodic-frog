// export default function Page() {
//   return <p>List Scenarios Page</p>;
// }

import ScenariosLayout from './layout';

export default function Page() {
  const asideContent = (
    <div>
      <p>test</p>
      {/* ...additional components */}
    </div>
  );

  return (
    <ScenariosLayout asideContent={asideContent}>
      <p>List Scenarios Page</p>
    </ScenariosLayout>
  );
}