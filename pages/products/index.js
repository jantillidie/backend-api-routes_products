import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function AllListingsPage() {
  const { data, error } = useSWR('/api/products', fetcher);

  if (error) {
    return <h2>Error loading products</h2>;
  }
  if (!data) {
    return <h2>Loading products...</h2>
  }

  return (
    <div>
      <h1>All Products</h1>
      <ul>
        {data.map((product) => (
          <li key={product.id}>
            <a href={`/products/${product.id}`}>{product.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
