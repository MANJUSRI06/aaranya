/**
 * AARANYA — WhatsApp Concierge Ordering Utility
 *
 * Encodes dynamic, elegant messages for single saree inquiries and full cart checkout.
 * Opens WhatsApp through user-initiated events.
 */

import { brandConfig } from '../config/brand.config';
import type { Saree, CartItem } from '../types';

/**
 * Format currency for Indian Rupee
 */
export function formatCurrency(amount: number): string {
  return `${brandConfig.currency.symbol}${amount.toLocaleString(brandConfig.currency.locale)}`;
}

/**
 * Generate dynamic WhatsApp link for a single saree order/inquiry
 */
export function generateSingleSareeWhatsAppUrl(
  saree: Saree,
  quantity = 1,
  selectedVariant?: string
): string {
  const cleanNumber = brandConfig.whatsapp.phoneNumber.replace(/[^0-9]/g, '');
  const productUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/saree/${saree.slug}`
    : `https://aaranyasaree.com/saree/${saree.slug}`;

  const imageUrl = saree.images.hero.startsWith('http')
    ? saree.images.hero
    : typeof window !== 'undefined'
      ? `${window.location.origin}${saree.images.hero}`
      : `https://aaranyasaree.com${saree.images.hero}`;

  const messageLines = [
    `*Namaste AARANYA Team,* 🙏`,
    ``,
    `I would like to enquire about ordering the following handloom saree:`,
    ``,
    `🌿 *Saree:* ${saree.title}`,
    `🏷️ *SKU:* ${saree.sku}`,
    `💰 *Price:* ${formatCurrency(saree.price)} (incl. of all taxes)`,
    `🔢 *Quantity:* ${quantity}`,
    selectedVariant ? `✨ *Variant / Blouse:* ${selectedVariant}` : `✂️ *Blouse Option:* ${saree.dimensions.blousePiece}`,
    `🧵 *Fabric:* ${saree.fabric}`,
    `🏛️ *Weaving Origin:* ${saree.regionalOrigin}`,
    `🔖 *Handloom Status:* ${saree.handloomCertification}`,
    ``,
    `🖼️ *Product Image:* ${imageUrl}`,
    `🔗 *Product Page:* ${productUrl}`,
    ``,
    `*Request:* Could you please confirm current stock availability, dispatch timeline, and share payment details for this piece?`,
    ``,
    `Thank you!`
  ];

  const fullMessage = messageLines.join('\n');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(fullMessage)}`;
}

/**
 * Generate dynamic WhatsApp link for the entire shopping bag checkout
 */
export function generateCartWhatsAppUrl(
  items: CartItem[],
  subtotal: number,
  shippingFee: number,
  estimatedTotal: number,
  customerNote?: string
): string {
  const cleanNumber = brandConfig.whatsapp.phoneNumber.replace(/[^0-9]/g, '');
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://aaranyasaree.com';

  const itemsBreakdown = items
    .map((item, idx) => {
      const lineTotal = item.saree.price * item.quantity;
      const productUrl = `${baseUrl}/saree/${item.saree.slug}`;
      return [
        `*${idx + 1}. ${item.saree.title}*`,
        `   • SKU: ${item.saree.sku}`,
        `   • Fabric: ${item.saree.fabric}`,
        `   • Qty: ${item.quantity} × ${formatCurrency(item.saree.price)} = ${formatCurrency(lineTotal)}`,
        `   • Link: ${productUrl}`,
      ].join('\n');
    })
    .join('\n\n');

  const shippingDisplay =
    shippingFee === 0 ? 'Complimentary (Insured Pan-India)' : formatCurrency(shippingFee);

  const messageLines = [
    `*Namaste AARANYA Concierge,* 🙏`,
    ``,
    `I would like to place an order for the following curated sarees from my shopping bag:`,
    ``,
    `═══════════════════════════`,
    itemsBreakdown,
    `═══════════════════════════`,
    ``,
    `*ORDER SUMMARY:*`,
    `📦 Total Items: ${items.reduce((acc, curr) => acc + curr.quantity, 0)} sarees`,
    `🏷️ Subtotal: ${formatCurrency(subtotal)}`,
    `🚚 Shipping: ${shippingDisplay}`,
    `💎 *Estimated Total: ${formatCurrency(estimatedTotal)}*`,
    ``,
    customerNote ? `📝 *Customer Note:* ${customerNote}\n` : '',
    `*Request:* Please confirm availability of these handloom pieces and share official payment instructions (UPI / Bank Wire / Card) and estimated dispatch dates.`,
    ``,
    `_Sent via AARANYA Handloom Concierge_`
  ].filter(Boolean);

  const fullMessage = messageLines.join('\n');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(fullMessage)}`;
}

/**
 * Initiates user-triggered action to open WhatsApp in a new tab
 */
export function openWhatsAppAction(url: string): void {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
