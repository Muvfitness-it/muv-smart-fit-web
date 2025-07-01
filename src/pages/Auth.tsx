
import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from '@/components/auth/LoginForm';

const Auth = () => {
  return (
    <>
      <Helmet>
        <title>Accesso Amministratori - MUV Fitness</title>
        <meta name="description" content="Accesso riservato agli amministratori per la gestione del blog MUV Fitness." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <LoginForm />
    </>
  );
};

export default Auth;
