import Layout from '@/layout/layout'

export default function layout({ children }: { children: React.ReactNode }) {
  console.log('Renderizou layout dashboard')

  return <Layout>{children}</Layout>
}
