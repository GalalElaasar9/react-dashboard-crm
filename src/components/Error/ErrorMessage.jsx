export default function ErrorMessage({error}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="h-screen flex justify-center items-center">
      <Box
        bgcolor={colors.blueAccent[700]}
        className="alert text-center w-[50%] font-bold"
      >
        {error}
      </Box>
    </div>
  )
}
