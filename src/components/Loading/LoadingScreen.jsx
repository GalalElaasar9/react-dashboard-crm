import { Circles } from 'react-loader-spinner'
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';

export default function LoadingScreen() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="h-screen flex justify-center items-center">
      <Circles
        height="80"
        width="80"
        color={colors.blueAccent[700]}
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}
