import { permanentRedirect } from 'next/navigation'

export default function ServicesPage({ params }: { params: { locale: string } }) {
  permanentRedirect(`/${params.locale}/products/streams`)
}
