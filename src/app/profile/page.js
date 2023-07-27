import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from '../../../components/Header';
import Stats from '../../../components/Stats';
import { ProfileForm } from './form';

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log('server session', session)

  return (
    <>
      <section>
        <Header title="Profile" action="Edit" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            {!user ? (
              <p>Loading...</p>
            ) : (
              <Stats />
            )}
            <ProfileForm session={user}/>
          </div>
        </div>
      </section>
    </>
  );
}