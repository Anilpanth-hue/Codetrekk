import { NextResponse } from "next/server"

// In-memory storage for demo purposes
// In a real app, you would use a database
const users: any[] = []
const otpStore: Record<string, string> = {}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 })
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP for verification (in a real app, you would send this via email)
    otpStore[email] = otp

    // Create user (but don't add to users array until OTP is verified)
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app, you would hash this password
    }

    console.log(`[SIGNUP] Created user: ${email} with OTP: ${otp}`)

    return NextResponse.json({
      message: "User created successfully. Please verify OTP.",
      otp, // Only for demo purposes! In a real app, never return the OTP
      user: { name, email },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// Export the users and otpStore for other routes to use
export { users, otpStore }
