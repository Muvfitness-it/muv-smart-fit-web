import BookingManager from '@/components/booking/BookingManager';
import Footer from '@/components/Footer';

const BookingManagement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <BookingManager />
      </div>
      <Footer />
    </div>
  );
};

export default BookingManagement;