
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Shipment from '@/models/Shipment';
import { shipmentValidationSchema } from '@/lib/validations/shipment';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const data = await req.json();

    // Validate the data
    const validatedData = shipmentValidationSchema.parse(data);

    const shipment = await Shipment.create(validatedData);

    return NextResponse.json({ success: true, shipment }, { status: 201 });
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
      { error: error.message || 'Failed to create shipment' },
      { status: 500 }
    );
  }
}
