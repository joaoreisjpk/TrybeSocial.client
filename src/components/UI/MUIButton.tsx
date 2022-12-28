import Button, { ButtonProps } from '@mui/material/Button';

interface IButton extends ButtonProps {
  children: any;
  bgColor?: string;
}

export default function MUIButton({
  bgColor, size, sx, children, ...rest
}: IButton) {
  return (
    <Button
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
      size={size || 'medium'}
    >
      {children}
    </Button>
  );
}
