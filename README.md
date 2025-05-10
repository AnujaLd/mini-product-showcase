# Premium Product Showcase

A beautifully designed product showcase application built with Next.js and TypeScript.

## Features

- **Product Listing Page**: Displays a list of products generated using Static Site Generation (SSG).
- **Product Detail Page**: Displays detailed information about a product using Server-Side Rendering (SSR).
- **Contact Form**: A simple contact form that submits data via a Next.js API route.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js 
- npm (comes bundled with Node.js)

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

### 2. Navigate to the Project Directory

### 3. Install Dependencies

Run the following command to install all the required dependencies:

```bash
npm install
```

### 4. Run the Development Server

Start the development server with the following command:

```bash
npm run dev
```

### 5. Access the Application

Once the server is running, open your browser and navigate to the following URLs:

- **Product Listing**: [http://localhost:3000](http://localhost:3000)
- **Product Details**: [http://localhost:3000/product/{id}](http://localhost:3000/product/{id})
  - Replace `{id}` with the ID of the product you want to view.
- **Contact Form**: [http://localhost:3000/contact](http://localhost:3000/contact)

## Project Structure

The project follows a modern `src/app` directory structure introduced in Next.js.

```
src/
├── app/
│   ├── api/          # API routes for server-side logic
│   ├── product/      # Product detail pages
│   ├── contact/      # Contact form page
│   ├── layout.tsx    # Application layout
│   ├── page.tsx      # Product listing page (homepage)
├── public/           # Static assets
├── styles/           # Global and component styles
```

## License

This project is licensed under the MIT License. See `LICENSE` for more information.
