import QRCode from 'qrcode'

export async function generateQRCode(userId: string): Promise<string> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_QR_CODE_BASE_URL
    if (!baseUrl) {
      throw new Error(
        'NEXT_PUBLIC_QR_CODE_BASE_URL is not set in environment variables'
      )
    }
    const url = `${baseUrl}/add-contact/${userId}`
    const qrCodeDataUrl = await QRCode.toDataURL(url)
    return qrCodeDataUrl
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw error
  }
}

export async function generateContactQRCode(data: string): Promise<string> {
  try {
    return await QRCode.toDataURL(data)
  } catch (error) {
    console.error('Error generating contact QR code:', error)
    return 'https://placehold.co/200x200?text=QR+Generation+Failed'
  }
}
