import { NextResponse } from "next/server";
import { seedData } from "@/lib/seed";

export async function POST() {
  try {
    const result = await seedData();

    if (result.success) {
      return NextResponse.json({ message: "Sample data seeded successfully!" });
    } else {
      return NextResponse.json(
        { error: "Failed to seed data", details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in seed endpoint:", error);
    return NextResponse.json({ error: "Failed to seed data" }, { status: 500 });
  }
}
