"use client"

import type React from "react"

import { useState } from "react"
import { login } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData()
    formData.append("phoneNumber", phoneNumber)

    const result = await login(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#111b21] p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <WhatsAppIcon className="w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold text-white">WhatsApp Web</h1>
          <p className="text-[#8696a0] text-center mt-2">Enter your phone number to login or create an account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium text-[#d1d7db]">
              Phone Number
            </label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+1 234 567 890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="bg-[#2a3942] border-0 text-white placeholder:text-[#8696a0] focus-visible:ring-[#00a884] focus-visible:ring-offset-[#111b21]"
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button type="submit" disabled={loading} className="w-full bg-[#00a884] hover:bg-[#00a884]/90 text-white">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-xs text-[#8696a0] text-center mt-8">
          By logging in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
