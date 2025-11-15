# Shpify1 Theme Setup Guide

## Quick Start

### 1. Connect to Your Shopify Store

```bash
cd /Users/mohammed/shpify1
shopify theme dev
```

This will:
- Ask you to log in to your Shopify store
- Start a local development server
- Give you a preview URL (e.g., https://yourstore.myshopify.com?preview_theme_id=123)

### 2. Create Test Products

Go to your Shopify Admin:
1. Products → Add product
2. Add product title, description, price
3. Upload product images
4. Save the product

Create at least 3-5 products to see the theme in action.

### 3. View Your Theme

Once you run `shopify theme dev` and create products:
- Homepage will show products in Featured Products and Flash Sale sections
- Click any product to see the conversion-optimized landing page
- Click "Order Now" to see the COD form modal

## Option 2: Push to Shopify Store

```bash
shopify theme push
```

This uploads the theme to your Shopify store.

## Features to Test

### Product Landing Page Features:
✓ Image gallery with thumbnails
✓ Trust badges
✓ Urgency countdown timer (24 hours)
✓ Product reviews section
✓ FAQ accordion
✓ Sticky mobile CTA button
✓ Enhanced COD form with progress steps

### COD Form Features:
✓ Order summary with product image
✓ Contact form (name, phone, address)
✓ Benefits display
✓ Success confirmation screen

## Troubleshooting

**No products showing?**
- Make sure you've created products in Shopify Admin
- Products must be set to "Active" status
- Check that products are in the "All" collection

**Links not working?**
- Theme must be running through Shopify (either dev server or live store)
- Cannot test Liquid templates as static HTML files

**COD form not appearing?**
- Make sure JavaScript is enabled
- Check browser console for errors
- Ensure theme.js is loaded properly
