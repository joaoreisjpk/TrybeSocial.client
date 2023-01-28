import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import Link from '@mui/material/Link';
import { ILab } from '../helpers/interfaces';
import MUIButton from './UI/MUIButton';

export default function JobItem({ data }: {data: ILab}) {
  return (
    <Card sx={{ minWidth: 400, display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {data.title}
        </Typography>
        <Typography variant="h6" fontSize={18} color="text.secondary">
          {data.description}
        </Typography>
        <Typography variant="body2" mt={1} fontSize={18} color="text.secondary">
          Número de Contato: {data.contactNumber}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: 'auto' }}>
        <MUIButton size="small">
          <Link target="_blank" fontSize={20} underline='none' href={data.repositoryLink} color='#000' rel="noreferrer">
            Visitar Repositório
          </Link>
        </MUIButton>
        <MUIButton size="small">
          <Link target="_blank" fontSize={20} underline='none' href={data.contactLink} color='#000' rel="noreferrer">
            Entrar em Contato
          </Link>
        </MUIButton>
      </CardActions>
    </Card>
  );
}
