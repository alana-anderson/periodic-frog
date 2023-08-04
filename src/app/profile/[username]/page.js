import { gql } from "@apollo/client";
import { getClient } from "../../ApolloClient";
import Header from '@/components/Header';

const GET_USER_PROFILE = gql`
  query GetUserProfile($username: String!) {
    userProfile(username: $username) {
      name
      email
      username
    }
  }
`;

export default async function Profile({ params }) {
  const { username } = params;

  if (!username) {
    return <p>Loading...</p>;
  }

  const { data } = await getClient().query({
    query: GET_USER_PROFILE,
    variables: { username },
  });

  const user = data?.userProfile;

  return (
    <>
      <section>
        <Header title="Profile" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            {!user ? (
              <p>No user found</p>
            ) : (
              <p>Data received during RSC render: {JSON.stringify(user)}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
