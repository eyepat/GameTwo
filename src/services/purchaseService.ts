import * as RNIap from 'react-native-iap';
import {categoryProductId, useGameStore} from '../store/gameStore';

const PURCHASE_SKUS: string[] = []; // dynamically built from helper below

export function getProductId(gameId: string, categoryId: string) {
  return categoryProductId(gameId, categoryId);
}

export async function initIap(): Promise<void> {
  try {
    await RNIap.initConnection();
  } catch (e) {
    // ignore
  }
}

export async function getProducts(productIds: string[]) {
  try {
    await initIap();
    const products = await RNIap.getProducts(productIds);
    return products;
  } catch (e) {
    return [];
  }
}

export async function buy(productId: string) {
  await initIap();
  try {
    await RNIap.requestPurchase({sku: productId});
    useGameStore.getState().markPurchased(productId);
    return true;
  } catch (e) {
    return false;
  }
}

export async function restorePurchases() {
  await initIap();
  try {
    const purchases = await RNIap.getAvailablePurchases();
    purchases.forEach(p => useGameStore.getState().markPurchased(p.productId));
    return purchases.map(p => p.productId);
  } catch (e) {
    return [];
  }
}

