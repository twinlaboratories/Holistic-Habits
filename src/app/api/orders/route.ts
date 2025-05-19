import { NextResponse } from 'next/server';
import { Order } from '@/lib/types';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Simple order storage in a JSON file
const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

// Ensure the data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
  }
};

// Get all orders
export async function GET() {
  try {
    ensureDataDir();
    const ordersData = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const orders = JSON.parse(ordersData);
    
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve orders' },
      { status: 500 }
    );
  }
}

// Create a new order
export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    ensureDataDir();
    
    // Read existing orders
    const ordersData = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const orders: Order[] = JSON.parse(ordersData);
    
    // Create new order with ID and timestamp
    const newOrder: Order = {
      ...orderData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    
    // Add to orders and save
    orders.push(newOrder);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    
    // In a real app, we would also:
    // 1. Process payment with Stripe/PayPal
    // 2. Send confirmation email
    // 3. Update inventory
    
    return NextResponse.json({ 
      success: true, 
      order: newOrder 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
} 