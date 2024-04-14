import { MyBreadcrumbs } from '@/app/ui/shared/components/MyBreadcrumbs'
import { Box, Paper, Stack, Typography } from '@mui/material'

export const BasePageLayout = ({
  children,
  pageTitle = 'Exibir',
  breadcrumbsPath,
  tools
}: {
  children: React.ReactNode
  pageTitle?: string
  breadcrumbsPath: {
    label: string
    to?: string | undefined
  }[]
  tools?: React.ReactNode
}) => {
  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={1} mb={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant='h5'>{pageTitle}</Typography>
          <MyBreadcrumbs path={breadcrumbsPath} />
        </Box>

        <>{tools}</>
      </Stack>
      <Paper>{children}</Paper>
    </>
  )
}
