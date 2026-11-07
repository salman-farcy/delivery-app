
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";

export async function POST(req: NextRequest) {
     try {
          await connectDB()
          const { name, email, password } = await req.json()
          const existUser = await User.findOne({ email })

          if (existUser) {
               return NextResponse.json(
                    { message: "Email already exist!" },
                    { status: 400 }
               )
          }

          if (password.length < 6) {
               return NextResponse.json(
                    { message: "Password must be at least 6 characters" },
                    { status: 400 }
               )
          }

          const hashedPassword = await bcrypt.hash(password, 10)

          const user = await User.create({
               name, email, password:hashedPassword
          })

          return NextResponse.json(
               user,
               { status: 200 }
          )

     } catch (error) {
          return NextResponse.json(
               { message: `Register Error ${error}` },
               { status: 500 }
          )
     }
}

// conncct DB
// name, email, password Frontend Thake Nia asbo
// email Check
// password 6 character chake
// password hash
// user create 