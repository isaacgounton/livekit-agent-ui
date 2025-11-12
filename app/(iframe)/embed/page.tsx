import { headers } from 'next/headers';
import EmbedAgentClient from '@/components/embed-iframe/agent-client';
import { getAppConfig } from '@/lib/env';

export default async function EmbedPage() {
  const hdrs = await headers();
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const appConfig = await getAppConfig(origin);

  return <EmbedAgentClient appConfig={appConfig} />;
}
