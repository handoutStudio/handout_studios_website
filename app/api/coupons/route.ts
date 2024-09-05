import db from '@/app/lib/db';
import { NextResponse } from "next/server";

export async function POST(request: any) {
    try
    {
        
        const { title, couponCode, slug, image, expiryDate } = await request.json();

        const newCoupon = { title, couponCode, slug, image, expiryDate };
        const newCouponDB = await db.coupon.create({ data: { ...newCoupon } });
        return NextResponse.json(newCouponDB, { status: 200 });
    }
    catch (error)
    {
        console.log(error);
        return NextResponse.json({ message: "Failed to create new Coupon...!", error }, { status: 500 });
    }
}