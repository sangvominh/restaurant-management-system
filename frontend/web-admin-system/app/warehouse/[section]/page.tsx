import LivePage, { type LiveSection } from '@/warehouse/LivePage';
import { notFound } from 'next/navigation';
export default async function Page({ params }: { params: Promise<{section:string}> }) {
  const {section} = await params;
  if (!['receipts','material-issues','finished-issues','finished-goods','transactions'].includes(section)) notFound();
  return <LivePage section={section as LiveSection}/>;
}
