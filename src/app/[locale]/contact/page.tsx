import { getTranslations } from 'next-intl/server';
import ContactClientPage from './contact-client';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function ContactPage() {
  return <ContactClientPage />;
}