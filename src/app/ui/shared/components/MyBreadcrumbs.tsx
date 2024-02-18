import { Breadcrumbs, Link, Typography } from '@mui/material'
import NextLink from 'next/link'

export const MyBreadcrumbs = ({
  path
}: {
  path: {
    label: string
    to?: string
  }[]
}) => {
  return (
    <Breadcrumbs>
      <Link underline='hover' component={NextLink} href='/dashboard'>
        Dashboard
      </Link>

      {path.map((item, index) =>
        item.to ? (
          <Link key={`item-${index}`} underline='hover' component={NextLink} href={item?.to ?? '#'}>
            {item.label}
          </Link>
        ) : (
          <Typography key={`item-${index}`}>{item.label}</Typography>
        )
      )}
    </Breadcrumbs>
  )
}
