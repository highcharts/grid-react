import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Highcharts Grid Lite - Next.js Example',
  description: 'Example of Highcharts Grid Lite integration with Next.js',
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

