import { QueryBase } from '@/queries/QueryBase'
import { LinearProgress, Link, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import NextLink from 'next/link'

export function UnderlineLink<T>({
  linkPath,
  id,
  queries,
  nameProperty
}: {
  linkPath: string
  id: number
  queries: QueryBase<T>
  nameProperty: keyof T
}) {
  const { data, isLoading } = useQuery({ ...queries.getById(id) })

  return (
    <>
      {isLoading ? (
        <LinearProgress sx={{ overflow: 'hidden', width: '90%' }} />
      ) : (
        <Link sx={{ cursor: 'pointer' }} underline='hover' component={NextLink} href={linkPath}>
          <Typography noWrap>{data ? (data[nameProperty] as string) : 'erro'}</Typography>
        </Link>
      )}
    </>
  )
}
