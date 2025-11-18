import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Shipment from '@/models/Shipment';
import { z, ZodError } from 'zod';

// Define the shipment validation schema
const shipmentValidationSchema = z.object({
  trackingNumber: z.string().min(1, 'Tracking number is required'),
  senderName: z.string().min(1, 'Sender name is required'),
  senderAddress: z.string().min(1, 'Sender address is required'),
  recipientName: z.string().min(1, 'Recipient name is required'),
  recipientAddress: z.string().min(1, 'Recipient address is required'),
  weight: z.number().positive('Weight must be positive'),
  dimensions: z.object({
    length: z.number().positive('Length must be positive'),
    width: z.number().positive('Width must be positive'),
    height: z.number().positive('Height must be positive'),
  }),
  status: z.enum(['PENDING', 'IN_TRANSIT', 'DELIVERED', 'EXCEPTION']),
  estimatedDelivery: z.string().datetime('Invalid date format for estimated delivery'),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { trackingNumber: string } }
) {
  try {
    await dbConnect();

    const shipment = await Shipment.findOne({ trackingNumber: params.trackingNumber });

    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }

    return NextResponse.json({ shipment }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch shipment' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { trackingNumber: string } }
) {
  try {
    await dbConnect();

    const data = await req.json();

    // Validate the data
    const validatedData = shipmentValidationSchema.parse(data);

    const shipment = await Shipment.findOneAndUpdate(
      { trackingNumber: params.trackingNumber },
      validatedData,
      { new: true }
    );

    if (!shipment) {
      return NextResponse.json(
        { error: 'Shipment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, shipment });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to update shipment' },
      { status: 500 }
    );
  }
}