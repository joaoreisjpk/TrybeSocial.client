import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Link from '@mui/material/Link';
import { IJob } from '../helpers/interfaces';
import MUIButton from './UI/MUIButton';

export default function JobItem({ data }: {data:IJob}) {
  return (
    <Card sx={{ minWidth: 400 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {data.title}

          </Typography>
          <Typography variant="h6" fontSize={18} color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <MUIButton size="small">
          <Link target="_blank" fontSize={20} underline='none' href={data.link} color='#000' rel="noreferrer">
            Visitar a página
          </Link>
        </MUIButton>
      </CardActions>
    </Card>
  );
}
