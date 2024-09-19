'use client'

import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const { signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const displayName = `${firstName} ${lastName}`.trim()
    try {
      await signup(email, password, firstName, lastName, phoneNumber)
      console.log('Registration successful')
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg'
    >
      <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
        Register
      </h2>
      <input
        type='text'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder='First Name'
        required
        className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <input
        type='text'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder='Last Name'
        required
        className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <input
        type='tel'
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder='Phone Number'
        required
        className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        required
        className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        required
        className='w-full px-3 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button
        type='submit'
        className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200'
      >
        Register
      </button>
    </form>
  )
}
