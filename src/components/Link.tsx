import NextLink, { LinkProps } from 'next/link';
import MUILink from '@mui/material/Link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { Box } from '@mui/material';

interface AnchorProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  children: any;
}

export default function Link({ children, ...props }: LinkProps & AnchorProps) {
  return (
    <Box mx={1.5} sx={{ display: 'inline-block' }}>
      <NextLink href={props.href} passHref>
        <MUILink variant="body1" component='button' color='black' underline='none'>
          {children}
        </MUILink>
      </NextLink>
    </Box>
  );
}
