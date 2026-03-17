import React from 'react';
import PolicyPage from '../components/layout/PolicyPage';

export const Terms = () => (
  <PolicyPage 
    title="Terms & Conditions" 
    content="
      <h3>1. Agreement to Terms</h3>
      <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
      <br/>
      <h3>2. Products & Pricing</h3>
      <p>All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice.</p>
      <br/>
      <h3>3. Accuracy of Information</h3>
      <p>We attempt to be as accurate as possible in product descriptions. However, we do not warrant that product descriptions or other content are error-free.</p>
    " 
  />
);

export const Privacy = () => (
  <PolicyPage 
    title="Privacy Policy" 
    content="
      <p>Your privacy is important to us. It is NutriNest's policy to respect your privacy regarding any information we may collect across our website.</p>
      <br/>
      <h3>Information we collect</h3>
      <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
      <br/>
      <h3>Data Security</h3>
      <p>We protect the data we store within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.</p>
    " 
  />
);

export const Refund = () => (
  <PolicyPage 
    title="Refund Policy" 
    content="
      <p>Since we deal with natural food products, returns are generally not accepted for hygiene and safety reasons.</p>
      <br/>
      <h3>Damaged or Incorrect Items</h3>
      <p>If you receive a defective, damaged, or incorrect item, please contact us within 48 hours of delivery with photos of the product and packaging. We will evaluate the issue and make it right via replacement or refund.</p>
    " 
  />
);

export const Shipping = () => (
  <PolicyPage 
    title="Shipping Policy" 
    content="
      <p>We strive to deliver your natural snacks as quickly and safely as possible.</p>
      <br/>
      <h3>Processing Time</h3>
      <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.</p>
      <br/>
      <h3>Shipping Rates & Delivery Estimates</h3>
      <p>Shipping charges for your order will be calculated and displayed at checkout. Standard delivery typically takes 3-5 business days depending on your location.</p>
    " 
  />
);

export const FoodSafety = () => (
  <PolicyPage 
    title="Food Safety Disclaimer" 
    content="
      <p>At NutriNest, we pride ourselves on providing minimially processed, natural foods.</p>
      <br/>
      <h3>Allergens</h3>
      <p>While we take precautions, our products are packed in a facility that may handle tree nuts, peanuts, and dairy. Please review the ingredients list carefully if you have severe allergies.</p>
      <br/>
      <h3>Natural Variations</h3>
      <p>Because we do not use artificial colors or preservatives, you may notice slight variations in color, texture, and taste between batches. This is proof of our organic, unadulterated process!</p>
    " 
  />
);
