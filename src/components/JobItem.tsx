import Link from 'next/link';
import React, { Fragment } from 'react';
import { IJob } from '../helpers/interfaces';

export default function JobItem({ data }: {data:IJob}) {
  return (
    <Fragment>
      <div>{data.name}</div>
      <Link passHref href={data.link}><a href="#" target="_blank">Link</a></Link>
    </Fragment>
  );
}
