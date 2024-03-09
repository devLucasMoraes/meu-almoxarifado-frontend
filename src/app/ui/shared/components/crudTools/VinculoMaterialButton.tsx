import { materialQueries } from '@/queries/MaterialQueries'
import { Button, LinearProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

export function VinculoMaterialButton({ id }: { id: number }) {
  const { data, isLoading } = useQuery({ ...materialQueries.getById(id) })

  return (
    <>
      {isLoading ? (
        <LinearProgress sx={{ overflow: 'hidden', width: '90%' }} />
      ) : data ? (
        <Button>{data.descricao}</Button>
      ) : (
        <Button color='error'>vincular material</Button>
      )}
    </>
  )
}
