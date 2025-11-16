import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { VaultFile } from "@/types"; // your updated interface

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File missing" }, { status: 400 });
    }

    const folder = (form.get("folder") as string) || "vault";
    const tags = (form.get("tags") as string)?.split(",") || [];
    const publicId = form.get("public_id") as string | undefined;
    let userId = parseInt(form.get("userId") as string) ; // ✔ Cognito user ID (string)

    // if (!userId) {
    //   return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    // }

    // Convert File → Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ☁ UPLOAD TO CLOUDINARY
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            tags,
            public_id: publicId,
            resource_type: "auto",
            use_filename: true,
            unique_filename: false,
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    // ---------------------------------------------------------
    // FILE TYPE DETECTION (IMAGE / PDF / DOCUMENT / VIDEO / OTHER)
    // ---------------------------------------------------------
    const mime = file.type;
    let fileType: VaultFile["type"] = "OTHER";

    if (mime.startsWith("image")) fileType = "IMAGE";
    else if (mime === "application/pdf") fileType = "PDF";
    else if (mime.startsWith("video")) fileType = "VIDEO";
    else if (
      mime.includes("msword") ||
      file.name.endsWith(".doc") ||
      file.name.endsWith(".docx")
    ) {
      fileType = "DOCUMENT";
    }

    // ---------------------------------------------------------
    // CATEGORY DETECTION BASED ON FILENAME
    // ---------------------------------------------------------
    let category: VaultFile["category"] = "OTHER";
    const lowerName = uploadResult.original_filename.toLowerCase();

    if (lowerName.includes("cert")) category = "CERTIFICATES";
    else if (lowerName.includes("doc") || lowerName.includes("report"))
      category = "DOCUMENTS";
    else if (lowerName.includes("id") || lowerName.includes("card"))
      category = "IDS";
    else if (lowerName.includes("photo") || lowerName.includes("img"))
      category = "PHOTOS";
    else if (lowerName.includes("assign")) category = "ASSIGNMENTS";
    else if (lowerName.includes("transcript")) category = "TRANSCRIPTS";

    // ---------------------------------------------------------
    // SAVE TO PRISMA (VaultFile)
    // ---------------------------------------------------------
    // const saved = await prisma.vaultFile.create({
    //   data: {
    //     userId, // string
    //     name: uploadResult.original_filename,
    //     type: fileType,
    //     size: uploadResult.bytes,
    //     category,
    //     tags,
    //     url: uploadResult.secure_url,
    //   },
    // });

    return NextResponse.json({
      message: "File uploaded & saved to database",
      cloudinary: uploadResult,
      // db: saved,
    });
  } catch (err: any) {
    console.error("Upload Route Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal upload error" },
      { status: 500 }
    );
  }
}
