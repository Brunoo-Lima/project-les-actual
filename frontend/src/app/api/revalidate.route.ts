import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidateTag("statusClient");

  return NextResponse.json({ message: "Cache revalidado!" });
}
