'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const res = login(email, password)
    if (res.ok) {
      router.push('/akun')
    } else {
      setError(res.error ?? 'Gagal masuk.')
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke beranda
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-display tracking-tight">
              <span className="text-primary">UGO</span>REX
            </span>
          </div>
          <h1 className="text-2xl font-display tracking-tight">Masuk ke akun</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Belum punya akun?{' '}
            <Link href="/daftar" className="text-primary hover:underline">
              Daftar gratis
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="kamu@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" size="lg" className="w-full">
              Masuk
            </Button>
          </form>

          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-6">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Demo mode — login belum tersambung ke server.
          </p>
        </div>
      </div>
    </main>
  )
}
