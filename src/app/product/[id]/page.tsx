import axios from 'axios';

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const response = await axios.get(`https://fakestoreapi.com/products/${params.id}`);
  const product = response.data;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}