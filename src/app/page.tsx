// Product Listing Page
import axios from 'axios';
import Link from 'next/link';

export default async function Home() {
  const response = await axios.get('https://fakestoreapi.com/products');
  const products = response.data;

  return (
    <div>
      <h1>Product Listing</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}