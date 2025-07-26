import React from 'react';
import { Helmet } from 'react-helmet';
import BookingManager from '@/components/booking/BookingManager';
import Footer from '@/components/Footer';

const BookingManagement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Gestione Prenotazioni - MUV Fitness</title>
        <meta name="description" content="Gestisci tutte le prenotazioni dei clienti MUV Fitness" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="flex-1 pt-[var(--header-height)]">
        <BookingManager />
      </div>
      <Footer />
    </div>
  );
};

export default BookingManagement;