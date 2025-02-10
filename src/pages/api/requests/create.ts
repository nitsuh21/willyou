import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { supabase } from '../../../lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

    const { type, senderName, receiverName, customMessage, music, gifts, theme } = body

    if (!type || !senderName || !receiverName) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: ['type', 'senderName', 'receiverName']
      })
    }

    // Create request in database using Prisma
    const request = await prisma.request.create({
      data: {
        type,
        senderName,
        receiverName,
        customMessage,
        music,
        gifts: Array.isArray(gifts) ? gifts : [],
        theme,
        status: 'PENDING',
        createdAt: new Date()
      }
    })

    // For real-time updates
    const { error: supabaseError } = await supabase
      .from('requests')
      .insert({
        id: request.id,
        type: request.type,
        sender_name: request.senderName,
        receiver_name: request.receiverName,
        custom_message: request.customMessage,
        music: request.music,
        gifts: request.gifts,
        theme: request.theme,
        status: 'PENDING',
        created_at: request.createdAt.toISOString()
      })
    
    if (supabaseError) {
      console.error('Supabase sync error:', supabaseError)
      // Don't fail the request if real-time sync fails
    }

    return res.status(200).json(request)
  } catch (error) {
    console.error('Failed to create request:', error)

    return res.status(500).json({ 
      message: 'Internal server error',
      detail: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
