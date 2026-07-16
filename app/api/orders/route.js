import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, customer, total, shipping } = body;

    if (!items?.length || !customer) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        total,
        shipping,
        firstName: customer.firstName,
        lastName: customer.lastName,
        city: customer.city,
        address: customer.address,
        notes: customer.notes || "",
        items: {
          create: items.map((item) => ({
            productId: item.id,
            productName: item.name,
            productImage: item.imageUrl || "",
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create order" }, { status: 500 });
  }
}
