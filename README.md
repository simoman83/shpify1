# Shpify1 - Lazada-Style Shopify Theme

A mobile-first Shopify theme inspired by Lazada's design, featuring Cash on Delivery (COD) checkout.

## Features

### 🎨 Design
- **Mobile-First Design** - Optimized for mobile shopping experience
- **Lazada-Inspired Layout** - Orange accent color (#f57224) and clean card-based design
- **Responsive Grid** - 2 columns on mobile, 4 on tablet, 6 on desktop
- **Sticky Header** - Search bar and navigation always accessible

### 💰 Cash on Delivery
- **No Cart System** - Direct "Buy Now" checkout flow
- **COD Modal Form** - Complete delivery information collection
- **Order Management** - Orders stored locally and logged for processing
- **Mobile-Optimized Form** - Easy checkout on any device

### 📦 Sections
- **Hero Section** - Full-width banner with customizable image and text
- **Flash Sale** - Countdown timer and special deals display
- **Featured Products** - Customizable product grids
- **Product Gallery** - Image thumbnails with main image viewer
- **Ratings & Reviews** - Display product ratings and sold count

### 🛍️ Product Features
- **Variant Selection** - Visual button-based variant picker
- **Quantity Controls** - Plus/minus buttons for easy quantity adjustment
- **Product Meta** - Display delivery info, location, and ratings
- **Discount Badges** - Automatic discount percentage calculation

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/simoman83/shpify1.git
   ```

2. Upload to your Shopify store:
   - Zip the theme folder
   - Go to Shopify Admin > Online Store > Themes
   - Upload the zip file

3. Customize settings in the Theme Customizer

## Theme Structure

```
shpify1/
├── assets/
│   ├── theme.css         # Mobile-first Lazada-style CSS
│   └── theme.js          # COD modal, image gallery, and interactions
├── config/
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/
│   └── theme.liquid      # Main layout with COD modal
├── locales/
│   └── en.default.json   # English translations
├── sections/
│   ├── header.liquid     # Search bar and category navigation
│   ├── footer.liquid     # Footer with newsletter
│   ├── hero-section.liquid
│   ├── flash-sale.liquid # Flash sale with countdown timer
│   ├── featured-products.liquid
│   ├── main-product.liquid  # Product page with COD button
│   └── main-collection.liquid
├── snippets/
│   └── cod-form.liquid   # Cash on Delivery modal form
└── templates/
    ├── index.json        # Homepage template
    ├── product.json      # Product page template
    └── collection.json   # Collection page template
```

## Cash on Delivery Setup

The COD system works as follows:

1. Customer clicks "Buy Now - Cash on Delivery" button
2. COD modal opens with order summary
3. Customer fills delivery information form
4. Order is stored in localStorage and logged
5. Success message displays with order number

### Integrating with Backend

To connect COD orders to your system, modify `theme.js`:

```javascript
function sendOrderNotification(orderNumber, orderData) {
  // Send to your backend API
  fetch('/api/cod-orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderNumber, ...orderData })
  });
}
```

## Customization

### Colors
Primary color (Orange): `#f57224`
Background: `#f5f5f5`

Change these in `assets/theme.css`

### Mobile-First Breakpoints
- Mobile: Default (< 768px)
- Tablet: 768px+
- Desktop: 1024px+

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Author

simoman83

## Credits

Design inspired by Lazada's e-commerce platform.
