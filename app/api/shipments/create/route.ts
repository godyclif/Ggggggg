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

    // Assuming you have a way to get recipient coordinates based on validatedData
    // For demonstration, let's mock it or use placeholder values
    const recipientCoords = { lat: 0, lng: 0 }; // Replace with actual logic

    const shipmentData = {
      senderName: validatedData.senderName,
      senderAddress: validatedData.senderAddress,
      senderCity: validatedData.senderCity,
      senderState: validatedData.senderState,
      senderZip: validatedData.senderZip,
      recipientName: validatedData.recipientName,
      recipientAddress: validatedData.recipientAddress,
      recipientCity: validatedData.recipientCity,
      recipientState: validatedData.recipientState,
      recipientZip: validatedData.recipientZip,
      weight: validatedData.weight,
      dimensions: validatedData.dimensions,
      trackingNumber: validatedData.trackingNumber,
      // Other fields as needed
    };

    const newShipment = new Shipment({
      ...shipmentData,
      latitude: validatedData.latitude,
      longitude: validatedData.longitude,
      recipientLatitude: recipientCoords.lat,
      recipientLongitude: recipientCoords.lng,
      history: [{
        status: 'pending',
        location: `${validatedData.senderCity}, ${validatedData.senderState}`,
        description: 'Shipment created at origin facility',
        timestamp: new Date(),
        icon: 'package'
      }]
    });

    await newShipment.save();

    return NextResponse.json({ success: true, shipment: newShipment }, { status: 201 });
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

    console.error("Error creating shipment:", error); // Log the error for debugging
    return NextResponse.json(
      { error: error.message || 'Failed to create shipment' },
      { status: 500 }
    );
  }
}