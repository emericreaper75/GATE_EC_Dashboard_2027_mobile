import { storage } from './storage';
import { COLORS } from '../styles/colors';

/**
 * Generate compact JSON string from all stored data.
 * Suitable for QR code encoding (stripped whitespace).
 */
export async function generateQRData() {
  const allData = await storage.exportAll();
  if (!allData) return null;
  // Strip whitespace to keep QR payload small
  return allData.replace(/\s+/g, ' ');
}

/**
 * Parse and import data from a scanned QR string.
 */
export async function importQRData(qrString) {
  try {
    return await storage.importAll(qrString.trim());
  } catch (error) {
    console.error('[QR import error]:', error);
    return false;
  }
}
