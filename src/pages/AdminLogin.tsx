import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from '@/components/auth/LoginForm';

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Helmet>
        <title>Accesso Amministratori - MUV Fitness</title>
        <meta name="description" content="Accesso riservato agli amministratori per la gestione di prenotazioni e articoli." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Area Amministratori</h1>
          <p className="text-muted-foreground">Accedi per gestire prenotazioni e articoli</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default AdminLogin;