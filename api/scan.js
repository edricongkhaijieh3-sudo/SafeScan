/**
 * Vercel serverless function: proxy to VirusTotal API for URL scanning.
 * Keeps API key server-side and avoids CORS.
 *
 * POST /api/scan
 * Body: { url: "https://example.com" }
 *
 * Set VIRUSTOTAL_API_KEY in Vercel environment variables.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.VIRUSTOTAL_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'VirusTotal API key not configured' })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  const url = (body.url || '').trim()
  if (!url) {
    return res.status(400).json({ error: 'Missing url' })
  }

  // Basic URL validation
  try {
    new URL(url)
  } catch {
    return res.status(400).json({ error: 'Invalid URL format' })
  }

  const headers = {
    'X-Apikey': apiKey,
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  try {
    // 1. Submit URL for scanning
    const submitRes = await fetch('https://www.virustotal.com/api/v3/urls', {
      method: 'POST',
      headers,
      body: new URLSearchParams({ url }).toString(),
    })

    if (!submitRes.ok) {
      const err = await submitRes.json().catch(() => ({}))
      if (submitRes.status === 429) {
        return res.status(429).json({ error: 'Rate limit exceeded. Try again later.' })
      }
      return res.status(submitRes.status).json({
        error: err.error?.message || `VirusTotal error: ${submitRes.status}`,
      })
    }

    const submitData = await submitRes.json()
    const analysisId = submitData?.data?.id
    if (!analysisId) {
      return res.status(500).json({ error: 'Could not start scan' })
    }

    const analysisUrl = `https://www.virustotal.com/api/v3/analyses/${analysisId}`
    const maxAttempts = 15
    const pollInterval = 2000

    for (let i = 0; i < maxAttempts; i++) {
      await new Promise((r) => setTimeout(r, pollInterval))

      const analysisRes = await fetch(analysisUrl, {
        headers: { 'X-Apikey': apiKey },
      })

      if (!analysisRes.ok) {
        return res.status(analysisRes.status).json({
          error: 'Failed to fetch analysis',
        })
      }

      const analysisData = await analysisRes.json()
      const attrs = analysisData?.data?.attributes || {}
      const status = attrs.status

      if (status === 'completed') {
        const stats = attrs.stats || {}
        const malicious = stats.malicious ?? 0
        const suspicious = stats.suspicious ?? 0
        const harmless = stats.harmless ?? 0
        const undetected = stats.undetected ?? 0

        const isThreat = malicious > 0 || suspicious >= 2

        return res.status(200).json({
          safe: !isThreat,
          malicious,
          suspicious,
          harmless,
          undetected,
          message: isThreat
            ? `${malicious} engine(s) flagged as malicious${suspicious > 0 ? `, ${suspicious} as suspicious` : ''}`
            : 'No threats detected',
        })
      }

      if (status === 'failed' || status === 'cancelled') {
        return res.status(500).json({ error: 'Scan failed' })
      }
    }

    return res.status(504).json({ error: 'Scan timed out' })
  } catch (err) {
    console.error('VirusTotal proxy error:', err)
    return res.status(500).json({ error: 'Scan failed. Please try again.' })
  }
}
