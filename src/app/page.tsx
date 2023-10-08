import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default function Homepage() {
  const headerList = headers()
  const domain = headerList.get('host') || ''
  redirect(`http://${domain}/0`)
}
