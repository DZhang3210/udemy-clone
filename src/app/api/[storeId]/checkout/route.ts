import Stripe from "stripe";

import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { stripe } from "@/lib/stripe";

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  const { productIds } = await req.json();
  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", {
      status: 400,
      headers: corsHeader,
    });
  }

  const items = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
    (item) => {
      return {
        quantity: 1,
        price_data: {
          currency: "USD",

          product_data: {
            name: item.name,
          },
          unit_amount: item.price.toNumber() * 100,
        },
      };
    },
  );

  const order = await db.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    payment_method_types: ["card"],
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    // customer_email: user.emailAddresses[0]?.emailAddress,
    line_items: line_items,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json({ url: stripeSession.url }, { headers: corsHeader });
}
