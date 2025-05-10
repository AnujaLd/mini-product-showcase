import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

// Loading component
function ProductDetailSkeleton() {
  return (
    <div className="product-detail-container">
      <div className="breadcrumb skeleton-breadcrumb">
        <div className="skeleton-text skeleton-breadcrumb-item"></div>
        <div className="skeleton-text skeleton-breadcrumb-item"></div>
      </div>
      
      <div className="product-detail-grid">
        <div className="product-images">
          <div className="main-image-container skeleton"></div>
          <div className="thumbnail-container">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="thumbnail-skeleton skeleton"></div>
            ))}
          </div>
        </div>
        
        <div className="product-info">
          <div className="skeleton-text skeleton-title"></div>
          <div className="skeleton-text skeleton-price"></div>
          <div className="skeleton-text skeleton-rating"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-actions">
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Error component
function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2>Product Not Found</h2>
      <p>{message}</p>
      <Link href="/" className="back-button">
        Back to Products
      </Link>
    </div>
  );
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  // Fetch product data
  let product;
  let error = null;
  
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${params.id}`);
    product = response.data;
  } catch (err) {
    error = "We couldn't find the product you're looking for. It may have been removed or doesn't exist.";
    console.error('Error fetching product:', err);
  }
  
  // If error occurred during fetch
  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Function to generate star rating
  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= Math.round(rating) ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <div className="product-detail-container">
        {/* Breadcrumb navigation */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-separator">›</span>
          <Link href={`/category/${product.category}`}>{product.category}</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="current-page">{product.title}</span>
        </nav>
        
        <div className="product-detail-grid">
          {/* Product images section */}
          <div className="product-images">
            <div className="main-image-container">
              <img 
                src={product.image} 
                alt={product.title}
                className="main-product-image"
              />
              {product.rating.rate >= 4.5 && (
                <div className="product-badge">Top Rated</div>
              )}
            </div>
            
    
            <div className="thumbnail-container">
              <div className="thumbnail active">
                <img src={product.image} alt={product.title} />
              </div>
              {/* Placeholder thumbnails */}
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="thumbnail placeholder-thumb">
                  <div className="placeholder-content">{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Product information section */}
          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            
            <div className="product-meta">
              <div className="product-category">Category: <span>{product.category}</span></div>
              <div className="product-rating">
                <div className="stars">
                  {renderStarRating(product.rating.rate)}
                </div>
                <div className="rating-text">
                  <span className="rating-value">{product.rating.rate.toFixed(1)}</span>
                  <span className="rating-count">({product.rating.count} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="product-price-container">
              <div className="current-price">${product.price.toFixed(2)}</div>
              <div className="original-price">${(product.price * 1.2).toFixed(2)}</div>
              <div className="discount-badge">Save 20%</div>
            </div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            {/* Product configuration options */}
            <div className="product-config">
              <div className="config-option">
                <h4>Quantity</h4>
                <div className="quantity-selector">
                  <button className="quantity-btn">−</button>
                  <input type="text" value="1" readOnly className="quantity-input" />
                  <button className="quantity-btn">+</button>
                </div>
              </div>
              
              {product.category.includes('clothing') && (
                <div className="config-option">
                  <h4>Size</h4>
                  <div className="size-options">
                    <button className="size-btn">S</button>
                    <button className="size-btn active">M</button>
                    <button className="size-btn">L</button>
                    <button className="size-btn">XL</button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Call-to-action buttons */}
            <div className="product-actions">
              <button className="add-to-cart-btn">
                <span className="cart-icon">🛒</span>
                Add to Cart
              </button>
              <button className="wishlist-btn">
                <span className="heart-icon">❤️</span>
              </button>
            </div>
            
            {/* Additional product info */}
            <div className="additional-info">
              <div className="info-item">
                <span className="info-icon">🚚</span>
                <span className="info-text">Free shipping on orders over $50</span>
              </div>
              <div className="info-item">
                <span className="info-icon">↩️</span>
                <span className="info-text">Easy 30-day returns</span>
              </div>
              <div className="info-item">
                <span className="info-icon">🔒</span>
                <span className="info-text">Secure payment</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tab section */}
        <div className="product-tabs">
          <div className="tabs-header">
            <button className="tab-btn active">Details</button>
            <button className="tab-btn">Reviews ({product.rating.count})</button>
            <button className="tab-btn">Shipping</button>
          </div>
          
          <div className="tab-content">
            <div className="tab-pane active">
              <h3>Product Details</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}