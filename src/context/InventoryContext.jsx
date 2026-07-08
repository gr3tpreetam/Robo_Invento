// src/context/InventoryContext.jsx
// Global inventory state using useReducer + Context API
// Demonstrates: Context API, useReducer, CRUD, real-time sync

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import { useAuth } from './AuthContext';
import {
  subscribeToInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from '../services/inventoryService';

// ---- Reducer ----
const initialState = {
  items: [],
  loading: true,
  error: null,
};

function inventoryReducer(state, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

// ---- Demo mode local storage fallback ----
const DEMO_KEY = 'inventory_robo_demo_items';
const SAMPLE_ITEMS = [
  {
    id: 'demo-1',
    name: 'L298N Motor Driver',
    partNumber: 'L298N',
    manufacturer: 'STMicroelectronics',
    category: 'Motor Drivers',
    quantity: 3,
    location: 'Drawer A2',
    notes: 'For robot arm project',
    imageUrl: null,
    datasheetUrl: 'https://www.st.com/resource/en/datasheet/l298.pdf',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    name: 'LM317T Voltage Regulator',
    partNumber: 'LM317T',
    manufacturer: 'Texas Instruments',
    category: 'Linear Regulators',
    quantity: 8,
    location: 'Box B1',
    notes: 'Adjustable 1.25–37V',
    imageUrl: null,
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/lm317.pdf',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    name: 'HC-SR04 Ultrasonic Sensor',
    partNumber: 'HC-SR04',
    manufacturer: 'Generic',
    category: 'Sensors',
    quantity: 2,
    location: 'Tray C3',
    notes: 'Range: 2cm–400cm',
    imageUrl: null,
    datasheetUrl: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-4',
    name: '10kΩ Resistor (1/4W)',
    partNumber: 'CFR-25JB-52-10K',
    manufacturer: 'Yageo',
    category: 'Passives',
    quantity: 47,
    location: 'Resistor Kit',
    notes: '1% tolerance',
    imageUrl: null,
    datasheetUrl: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-5',
    name: 'ESP32 DevKit v1',
    partNumber: 'ESP32-DEVKITC-32E',
    manufacturer: 'Espressif',
    category: 'Microcontrollers',
    quantity: 1,
    location: 'Desk Shelf',
    notes: 'WiFi + BT, currently in use',
    imageUrl: null,
    datasheetUrl: null,
    createdAt: new Date().toISOString(),
  },
];

function loadDemoItems() {
  try {
    const saved = localStorage.getItem(DEMO_KEY);
    return saved ? JSON.parse(saved) : SAMPLE_ITEMS;
  } catch {
    return SAMPLE_ITEMS;
  }
}

function saveDemoItems(items) {
  localStorage.setItem(DEMO_KEY, JSON.stringify(items));
}

// ---- Context ----
const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);
  const { currentUser, isDemoMode } = useAuth();

  // Subscribe to Firestore (or load demo data)
  useEffect(() => {
    if (!currentUser) {
      dispatch({ type: 'SET_ITEMS', payload: [] });
      return;
    }

    if (isDemoMode) {
      dispatch({ type: 'SET_ITEMS', payload: loadDemoItems() });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    const unsubscribe = subscribeToInventory(
      currentUser.uid,
      (items) => {
        dispatch({ type: 'SET_ITEMS', payload: items });
      },
      (error) => {
        dispatch({
          type: 'SET_ERROR',
          payload: `Failed to load inventory: ${error.message}`,
        });
      }
    );
    return unsubscribe;
  }, [currentUser, isDemoMode]);

  // CRUD operations
  const addItem = useCallback(
    async (itemData) => {
      if (isDemoMode) {
        const newItem = {
          ...itemData,
          id: `demo-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        const updated = [newItem, ...state.items];
        saveDemoItems(updated);
        dispatch({ type: 'SET_ITEMS', payload: updated });
        return;
      }
      await addInventoryItem(currentUser.uid, itemData);
    },
    [currentUser, isDemoMode, state.items]
  );

  const updateItem = useCallback(
    async (id, updates) => {
      if (isDemoMode) {
        const updated = state.items.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        );
        saveDemoItems(updated);
        dispatch({ type: 'SET_ITEMS', payload: updated });
        return;
      }
      await updateInventoryItem(id, updates);
    },
    [isDemoMode, state.items]
  );

  const deleteItem = useCallback(
    async (id) => {
      if (isDemoMode) {
        const updated = state.items.filter((item) => item.id !== id);
        saveDemoItems(updated);
        dispatch({ type: 'SET_ITEMS', payload: updated });
        return;
      }
      await deleteInventoryItem(id);
    },
    [isDemoMode, state.items]
  );

  return (
    <InventoryContext.Provider
      value={{ ...state, addItem, updateItem, deleteItem }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used inside <InventoryProvider>');
  return ctx;
}
