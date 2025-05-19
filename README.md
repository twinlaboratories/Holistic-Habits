# Holistic Habits - Sleep Optimization eCommerce Site

A full-stack eCommerce site built with Next.js App Router and Tailwind CSS for Holistic Habits, a brand selling scientifically-researched health products for biohackers.

## Project Overview

This website sells a bundle of sleep optimization products:

1. Bedside Air Purifier - $44.99
2. NasalBreathe Mouth Tape - $9.99
3. 100% Natural Fitted Sheet (cotton) - $39.99
4. Blue Light Filter Glasses - $12.99

Customers can buy the complete bundle with a discount or customize their own bundle by removing or adding products.

## Features

- Modern, minimalist design inspired by EightSleep.com
- Mobile responsive interface
- Product catalog with detail pages
- Customizable sleep bundle builder
- Shopping cart functionality
- Order processing with Stripe integration
- WooCommerce integration for order management
- Email notifications for order confirmation
- Subtle scroll animations on the homepage

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Payment Processing**: Stripe
- **Order Management**: WooCommerce
- **Email**: EmailJS
- **Data Storage**: JSON files (local) and WooCommerce (production)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/holistic-habits.git
   cd holistic-habits
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   # Base URL for your website
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   
   # Stripe API Keys
   STRIPE_SECRET_KEY=sk_test_your_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   
   # WooCommerce API credentials
   WOOCOMMERCE_API_URL=https://your-wordpress-site.com/wp-json/wc/v3
   WOOCOMMERCE_CONSUMER_KEY=your_consumer_key
   WOOCOMMERCE_CONSUMER_SECRET=your_consumer_secret
   
   # EmailJS credentials
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID=your_emailjs_order_template_id
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploying to Vercel

The easiest way to deploy this application is using Vercel, which is built by the same team behind Next.js.

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/holistic-habits.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Create an account on [vercel.com](https://vercel.com) if you don't have one
   - Click "New Project" and import your GitHub repository
   - Configure environment variables (copy them from your `.env.local`)
   - Click "Deploy"
   
3. **Update Environment Variables**:
   - After the initial deployment, update your `NEXT_PUBLIC_BASE_URL` to your Vercel deployment URL 
   - If you have a custom domain, update it once you've configured it
   
4. **Production Configuration**:
   - For production, switch to Stripe's live API keys
   - Make sure your WooCommerce instance is properly secured

### Setting up Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" > "Domains"
2. Add your custom domain and follow the verification instructions
3. Update your `NEXT_PUBLIC_BASE_URL` environment variable to your custom domain

## Project Structure

```
/src
  /app                   # App Router pages
    /api                 # API routes
    /bundle              # Bundle builder page
    /cart                # Shopping cart page
    /products            # Products listing and details
  /components            # Reusable UI components
  /lib                   # Shared utility functions, types, and data
  /hooks                 # Custom React hooks
  /styles                # Global styles and Tailwind config
/public                  # Static assets
  /images                # Product images
```

## Development Notes

- The site uses WooCommerce for backend order management.
- Stripe is used for payment processing and requires proper API keys.
- Email functionality requires EmailJS configuration.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 