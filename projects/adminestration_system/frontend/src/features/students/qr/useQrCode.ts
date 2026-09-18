import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export function useQrCode(value: string) {
  const [result, setResult] = useState({ value: '', dataUrl: '', error: '' })

  useEffect(() => {
    if (!value) return
    let active = true

    QRCode.toDataURL(value, {
      width: 768,
      margin: 4,
      errorCorrectionLevel: 'H',
      color: { dark: '#09090b', light: '#ffffff' },
    })
      .then((dataUrl) => active && setResult({ value, dataUrl, error: '' }))
      .catch(() => active && setResult({ value, dataUrl: '', error: 'Не удалось создать QR-код.' }))

    return () => {
      active = false
    }
  }, [value])

  return result.value === value ? result : { value, dataUrl: '', error: '' }
}
