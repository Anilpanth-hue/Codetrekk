import { NextResponse } from "next/server"
import { users, otpStore } from "../signup/route"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, otp } = body

    // Basic validation
    if (!email || !otp) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if OTP exists and matches
    const storedOtp = otpStore[email]
    if (!storedOtp) {
      return NextResponse.json({ message: "OTP expired or not found" }, { status: 400 })
    }

    if (storedOtp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 })
    }

    // Find the pending user
    const pendingUser = users.find((user) => user.email === email)

    // If user doesn't exist yet (normal flow), add them now
    if (!pendingUser) {
      // This means the user signed up but hasn't been added to the users array yet
      // We don't have their info here, so we'll just verify the OTP
      console.log(`[VERIFY] OTP verified for: ${email}`)

      // Remove the OTP from storage
      delete otpStore[email]

      return NextResponse.json({
        message: "OTP verified successfully. Please login.",
      })
    }

    // Remove the OTP from storage
    delete otpStore[email]

    return NextResponse.json({
      message: "OTP verified successfully",
      user: {
        id: pendingUser.id,
        name: pendingUser.name,
        email: pendingUser.email,
      },
    })
  } catch (error) {
    console.error("OTP verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
