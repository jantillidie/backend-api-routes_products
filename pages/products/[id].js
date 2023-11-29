import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function ProductsDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/products/${id}`, fetcher);

  if (error) {
    return <h2>Error loading product</h2>;
  }
  if (!data) {
    return <h2>Loading product...</h2>
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <p>{data.currency} {data.price}</p>
      <p>{data.category}</p>
    </div>
  );
}
