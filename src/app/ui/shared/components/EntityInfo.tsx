import { Box, Grid, Typography } from '@mui/material'

export function EntityInfo<T>({
  data,
  fields
}: {
  data?: T
  fields: { label: string; render: (data: T) => React.ReactNode }[]
}) {
  console.log('EntityInfo', data)
  return (
    <Box sx={{ paddingX: 1 }}>
      <Grid container direction='column' spacing={2}>
        {fields.map(field => (
          <Grid item key={field.label}>
            <Typography variant='caption' noWrap>
              {field.label}
            </Typography>
            {data && field.render(data)}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
