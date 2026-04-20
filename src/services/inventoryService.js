// src/services/inventoryService.js
// All Firestore CRUD operations for inventory items

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'inventory';

/**
 * Subscribe to realtime updates for a user's inventory.
 * @param {string} userId
 * @param {Function} callback - called with array of items
 * @returns {Function} unsubscribe function
 */
export function subscribeToInventory(userId, callback) {
  const q = query(
    collection(db, COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(items);
  });
}

/**
 * Add a new component to inventory.
 * @param {string} userId
 * @param {Object} itemData
 */
export async function addInventoryItem(userId, itemData) {
  return addDoc(collection(db, COLLECTION), {
    ...itemData,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Update an existing inventory item.
 * @param {string} itemId
 * @param {Object} updates
 */
export async function updateInventoryItem(itemId, updates) {
  const ref = doc(db, COLLECTION, itemId);
  return updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
}

/**
 * Delete an inventory item.
 * @param {string} itemId
 */
export async function deleteInventoryItem(itemId) {
  const ref = doc(db, COLLECTION, itemId);
  return deleteDoc(ref);
}
