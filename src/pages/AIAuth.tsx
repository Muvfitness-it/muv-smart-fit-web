
import React from 'react';
import { Helmet } from 'react-helmet';
import AIAuthForm from '@/components/auth/AIAuthForm';

const AIAuth = () => {
  return (
    <>
      <Helmet>
        <title>Autenticazione IA - MUV Fitness</title>
        <meta name="description" content="Sistema di autenticazione dedicato per intelligenze artificiali autorizzate." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AIAuthForm />
    </>
  );
};

export default AIAuth;
