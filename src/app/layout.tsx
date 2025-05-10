import './globals.css';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata = {
  title: 'Premium Product Showcase',
  description: 'A beautifully designed product showcase using Next.js and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="header-content">
            <div className="logo">
              <Link href="/">
                <span className="logo-text">ShopEase</span>
              </Link>
            </div>
            
            <nav className="main-nav">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
            </nav>
            
            <div className="header-actions">
              <button className="icon-button">
                <span className="icon">🔍</span>
              </button>
              <button className="icon-button">
                <span className="icon">👤</span>
              </button>
              <button className="icon-button cart-button">
                <span className="icon">🛒</span>
                <span className="cart-count">0</span>
              </button>
            </div>
          </div>
        </header>
        
        <main className="site-main">
          <Suspense fallback={<div className="loading">Loading...</div>}>
            {children}
          </Suspense>
        </main>
        
        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About Us</h3>
              <p>ShopEase is your premium shopping destination for quality products at amazing prices.</p>
            </div>
            
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link href="#">About</Link></li>
                <li><Link href="#">FAQ</Link></li>
                <li><Link href="#">Terms & Conditions</Link></li>
                <li><Link href="#">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Contact Us</h3>
              <address>
                <p>123 Shopping Avenue</p>
                <p>Market City, ST 12345</p>
                <p>Email: info@shopease.example</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
            
            <div className="footer-section">
              <h3>Newsletter</h3>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email" className="newsletter-input" />
                <button className="newsletter-button">Subscribe</button>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
            <div className="social-icons">
              <a href="#" className="social-icon">📱</a>
              <a href="#" className="social-icon">💻</a>
              <a href="#" className="social-icon">📸</a>
              <a href="#" className="social-icon">🐦</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}