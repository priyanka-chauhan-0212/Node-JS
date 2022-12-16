import React from 'react';
import { Helmet } from 'react-helmet';

export default function({ title, description }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        {description && ` - ${description}`} {title} | NPS
      </title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}
