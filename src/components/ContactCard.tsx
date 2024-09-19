'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Phone, Mail, MapPin, Linkedin, Twitter, Download } from 'lucide-react'

interface ContactCardProps {
  name: string
  jobTitle?: string
  phone?: string
  email?: string
  location?: string
  avatarUrl?: string
  qr: string
}

export function ContactCard({
  name,
  jobTitle,
  phone,
  email,
  location,
  avatarUrl,
  qr,
}: ContactCardProps) {
  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='text-center'>
        <Avatar className='w-24 h-24 mx-auto'>
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <CardTitle className='mt-4'>{name}</CardTitle>
        <p className='text-sm text-muted-foreground'>{jobTitle}</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex justify-center'>
          {qr && <img src={qr} alt='Contact QR Code' className='w-48 h-48' />}
        </div>
        <div className='space-y-2'>
          {phone && (
            <div className='flex items-center space-x-2'>
              <Phone className='w-4 h-4' />
              <span>{phone}</span>
            </div>
          )}
          {email && (
            <div className='flex items-center space-x-2'>
              <Mail className='w-4 h-4' />
              <span>{email}</span>
            </div>
          )}
          {location && (
            <div className='flex items-center space-x-2'>
              <MapPin className='w-4 h-4' />
              <span>{location}</span>
            </div>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='notes'>Notes</Label>
          <Textarea id='notes' placeholder='Add notes...' />
        </div>
        <div className='flex space-x-2'>
          <Button variant='outline' size='icon'>
            <Linkedin className='w-4 h-4' />
          </Button>
          <Button variant='outline' size='icon'>
            <Twitter className='w-4 h-4' />
          </Button>
        </div>
        <Button className='w-full'>
          <Download className='w-4 h-4 mr-2' />
          Save Contact
        </Button>
      </CardContent>
    </Card>
  )
}
