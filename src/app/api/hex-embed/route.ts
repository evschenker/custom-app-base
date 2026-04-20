// src/app/api/hex-embed/route.ts
import { NextResponse } from 'next/server'

const BASE_HEX_API_URL = 'https://app.hex.tech/api/v1'

export async function GET() {
  const token = process.env.HEX_WORKSPACE_TOKEN
  const projectId = process.env.HEX_PROJECT_ID

  if (!token || !projectId) {
    return NextResponse.json({ error: 'Missing Hex config' }, { status: 500 })
  }

  const body = {
    displayOptions: {
      noEmbedFooter: true,
      noEmbedOutline: true,
      noEmbedBasePadding: true,
    },
    "hexUserAttributes": {
    "userId": "12345",
    "brand_name": "Sony",
    "region": "MEX"
  },
  }

  const response = await fetch(
    `${BASE_HEX_API_URL}/embedding/createPresignedUrl/${projectId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: response.status })
  }

  return NextResponse.json({ url: data.url })
}
