import { useQuery, gql } from "@apollo/client";

const HELLO_WORLD = gql`
  {
    hello
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(HELLO_WORLD);

  if (error) return <p id="zero-state">Error :{error}</p>;

  return <div id="zero-state">{loading ? <p>Loading...</p> : <p>{data.hello}</p>}</div>;
}
