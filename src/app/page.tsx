// Product Listing Page
"use client";
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Product type definition
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Loading skeleton component
const ProductSkeleton = () => (
  <div className="product-card skeleton">
    <div className="product-image-skeleton"></div>
    <div className="product-content">
      <div className="product-title-skeleton"></div>
      <div className="product-price-skeleton"></div>
      <div className="product-category-skeleton"></div>
    </div>
  </div>
);

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter products based on search and category
  const filteredProducts = products
    .filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => 
      selectedCategory === 'all' || product.category === selectedCategory
    );

  // Display star rating
  const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= Math.round(rating) ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return <div className="star-rating">{stars}</div>;
  };

  return (
    <div className="container">
      <div className="hero-section">
        <h1>Discover Amazing Products</h1>
        <p>Shop our collection of high-quality items</p>
      </div>

      <div className="filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="products-grid">
        {loading ? (
          // Show skeletons while loading
          Array(8).fill(0).map((_, index) => <ProductSkeleton key={index} />)
        ) : filteredProducts.length === 0 ? (
          <div className="no-products">No products found</div>
        ) : (
          filteredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="product-link">
              <div className="product-card">
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="product-image"
                  />
                </div>
                <div className="product-content">
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-price">${product.price.toFixed(2)}</div>
                  <div className="product-category">{product.category}</div>
                  <StarRating rating={product.rating.rate} />
                  <div className="product-reviews">{product.rating.count} reviews</div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}