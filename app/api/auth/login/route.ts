import { NextResponse } from "next/server"
// import { users } from "../signup/route"
import {users} from '../signup/route'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if user exists
    const user = users.find((user) => user.email === email)
    if (!user) {
      // For demo purposes, create the user if they don't exist
      // This helps with the presentation flow
      const newUser = {
        id: Date.now().toString(),
        name: email.split("@")[0], // Use part of email as name
        email,
        password,
      }
      users.push(newUser)

      console.log(`[LOGIN] Auto-created user: ${email}`)

      return NextResponse.json({
        message: "Login successful",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      })
    }

    // Check password
    if (user.password !== password) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    console.log(`[LOGIN] User logged in: ${email}`)

    // Return user data
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
