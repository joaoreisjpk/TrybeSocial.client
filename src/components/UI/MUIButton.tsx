import Button, { ButtonProps } from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

interface IButton extends ButtonProps {
  children: any;
  bgColor?: string;
  isLoading?: boolean
}

export default function MUIButton({
  bgColor, size, sx, children, isLoading, ...rest
}: IButton) {
  return (
    <LoadingButton
      sx={{
        background: bgColor,
        textTransform: 'none',
        fontWeight: 600,
        '&:hover': {
          backgroundColor: bgColor,
          opacity: [0.9, 0.8, 0.7],
        },
        ...sx,
      }}
      {...rest}
      loading={isLoading}
      size={size || 'medium'}
    >
      {children}
    </LoadingButton>
  );
}
