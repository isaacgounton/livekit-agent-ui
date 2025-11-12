import { headers } from 'next/headers';
import { ApplyThemeScript } from '@/components/embed-iframe/theme-provider';
import { getAppConfig, getStyles } from '@/lib/utils';

interface IframeLayoutProps {
    children: React.ReactNode;
}

export default async function IframeLayout({ children }: IframeLayoutProps) {
    const hdrs = await headers();
    const appConfig = await getAppConfig(hdrs);
    const styles = getStyles(appConfig);

    return (
        <>
            {styles && <style>{styles}</style>}
            <ApplyThemeScript />
            <div className="min-h-screen overflow-x-hidden">{children}</div>
        </>
    );
}
