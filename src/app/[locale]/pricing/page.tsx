import { permanentRedirect } from 'next/navigation'

export default function PricingPage({ params }: { params: { locale: string } }) {
  permanentRedirect(`/${params.locale}/contact`)
}
