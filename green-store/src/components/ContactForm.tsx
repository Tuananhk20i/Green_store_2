"use client"
import React, { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message }),
      })

      if (!res.ok) throw new Error('Lỗi khi gửi yêu cầu')

      setSuccess('Cảm ơn! Chúng tôi đã nhận được tin nhắn của bạn.')
      setName('')
      setEmail('')
      setPhone('')
      setSubject('')
      setMessage('')
    } catch (err: any) {
      setError(err?.message || 'Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded">{success}</div>}
      {error && <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your Name" className="border px-3 py-2 rounded w-full" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Your Email" type="email" className="border px-3 py-2 rounded w-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="border px-3 py-2 rounded w-full" />
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="border px-3 py-2 rounded w-full sm:col-span-2" />
      </div>

      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Comments" rows={6} className="border px-3 py-2 rounded w-full" />

      <div>
        <button type="submit" disabled={loading} className="bg-lime-600 text-white px-5 py-2 rounded shadow">
          {loading ? 'Sending...' : 'POST COMMENT'}
        </button>
      </div>
    </form>
  )
}
