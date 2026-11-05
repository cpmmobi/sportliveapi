import ContactClientPage from './contact-client';
import { Metadata } from 'next';
import { pageMeta } from '@/lib/meta';
import { contactPage } from '@/content/site';
import { tx } from '@/lib/locale';

type Props = {
  params: { locale: string };
};

export function generateMetadata({ params: { locale } }: Props): Metadata {
  return pageMeta(locale, '/contact', tx(locale, contactPage.title), tx(locale, contactPage.lede));
}

export default function ContactPage() {
  return <ContactClientPage />;
}