import type { Metadata } from 'next';
import '@highcharts/grid-pro/css/grid-pro.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Highcharts Grid Pro - Next.js Example',
  description: 'Example of Highcharts Grid Pro integration with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body>
            <div id="root">{children}</div>
        </body>
    </html>
  );
}

