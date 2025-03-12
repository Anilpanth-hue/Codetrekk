"use client"

import { useState } from "react"
import { X, AlertCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

interface Platform {
  id: string
  name: string
  logo: string
  color: string
  connected: boolean
  username: string
}

export function ConnectModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: "leetcode",
      name: "LeetCode",
      logo: "/placeholder.svg?height=40&width=40",
      color: "bg-yellow-500",
      connected: false,
      username: "",
    },
    {
      id: "gfg",
      name: "GeeksforGeeks",
      logo: "/placeholder.svg?height=40&width=40",
      color: "bg-green-500",
      connected: false,
      username: "",
    },
    {
      id: "codeforces",
      name: "CodeForces",
      logo: "/placeholder.svg?height=40&width=40",
      color: "bg-blue-500",
      connected: false,
      username: "",
    },
    {
      id: "hackerrank",
      name: "HackerRank",
      logo: "/placeholder.svg?height=40&width=40",
      color: "bg-emerald-500",
      connected: false,
      username: "",
    },
  ])
  const [error, setError] = useState("")

  const verifyEmail = () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address")
      return
    }

    // Simulate email verification
    setIsEmailVerified(true)
    setError("")
  }

  const connectPlatform = (id: string, username: string) => {
    if (!username.trim()) {
      setError(`Please enter a valid ${platforms.find((p) => p.id === id)?.name} username`)
      return
    }

    setPlatforms(
      platforms.map((platform) => (platform.id === id ? { ...platform, connected: true, username } : platform)),
    )
    setError("")
  }

  const handleContinue = () => {
    const allConnected = platforms.some((platform) => platform.connected)

    if (!allConnected) {
      setError("Please connect at least one platform to continue")
      return
    }

    // Save connected platforms to localStorage for demo purposes
    localStorage.setItem("connectedPlatforms", JSON.stringify(platforms.filter((p) => p.connected)))
    localStorage.setItem("userEmail", email)

    // Close modal and redirect to profile page
    onOpenChange(false)
    router.push("/profile-tracker")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            Connect Your Coding Profiles
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            Link your coding platform accounts to track all your progress in one place
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="bg-red-950 border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6 py-4">
          {!isEmailVerified ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Gmail Account
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Button onClick={verifyEmail} className="w-full bg-primary hover:bg-primary/90">
                Verify Email
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-md">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-300">{email}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-gray-400 hover:text-white"
                  onClick={() => setIsEmailVerified(false)}
                >
                  Change
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-300">Connect Platforms</h3>

                {platforms.map((platform) => (
                  <div key={platform.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${platform.color}`} />
                      <Label htmlFor={platform.id} className="text-gray-300">
                        {platform.name} Username
                      </Label>
                    </div>

                    <div className="flex gap-2">
                      <Input
                        id={platform.id}
                        placeholder={`Enter your ${platform.name} username`}
                        value={platform.username}
                        onChange={(e) =>
                          setPlatforms(
                            platforms.map((p) => (p.id === platform.id ? { ...p, username: e.target.value } : p)),
                          )
                        }
                        className="bg-gray-800 border-gray-700 text-white"
                        disabled={platform.connected}
                      />

                      {platform.connected ? (
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-700 text-gray-400"
                          onClick={() =>
                            setPlatforms(platforms.map((p) => (p.id === platform.id ? { ...p, connected: false } : p)))
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                          onClick={() => connectPlatform(platform.id, platform.username)}
                        >
                          Connect
                        </Button>
                      )}
                    </div>

                    {platform.connected && (
                      <p className="text-xs text-green-500 flex items-center gap-1">
                        <Check className="h-3 w-3" /> Connected successfully
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <Button onClick={handleContinue} className="w-full bg-primary hover:bg-primary/90">
                Continue to Profile Tracker
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

