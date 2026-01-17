"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "تم الاشتراك بنجاح!",
      description: "شكراً لاشتراكك في نشرتنا البريدية",
    })

    setEmail("")
    setIsLoading(false)
  }

  return (
    <section className="py-20 bg-foreground text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">كوني أول من يعلم</h2>
        <p className="text-white/80 mb-8 max-w-md mx-auto">
          اشتركي في نشرتنا البريدية للحصول على آخر العروض والمنتجات الجديدة
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-3">
          <Input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary-dark px-8">
            {isLoading ? "جاري..." : "اشترك"}
          </Button>
        </form>
      </div>
    </section>
  )
}
