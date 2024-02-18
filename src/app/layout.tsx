import DrawerProvider from '@/layout/context/DrawerContext'
import MuiProvider from '@/providers/MuiProvider'
import QueryProvider from '@/providers/QueryProvider'
import * as React from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log('Renderizou RootLayout')
  return (
    <html lang='pt-BR'>
      <body>
        <QueryProvider>
          <MuiProvider>
            <DrawerProvider>{children}</DrawerProvider>
          </MuiProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
