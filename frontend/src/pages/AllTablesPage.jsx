import { useState, useEffect } from 'react';
import TableCard from "../components/TableCard.jsx";
import ReservationConfirmation from "../components/ReservationConfirmation.jsx";
import '../styles/AllTablesPage.css';
import ReservationCalendar from "../components/ReservationCalendar.jsx";

const AllTablesPage = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reservationDateTime, setReservationDateTime] = useState(null);

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/tables');
      if (!response.ok) {
        throw new Error('Failed to fetch tables');
      }
      const data = await response.json();
      setTables(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tables:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleReserveClick = (tableNumber) => {
    setSelectedTable(tableNumber);
    setReservationDateTime(null);
    setIsModalOpen(true);
  };

  const formatToLocalISO = (date) => {
    const pad = (n) => n.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
  };

  const handleConfirmReservation = async (reservationDateTime) => {
    if (!reservationDateTime) return;

    setIsProcessing(true);
    try {
      const startTime = new Date(reservationDateTime);
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

      const userEmail = localStorage.getItem('email');

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          tableNumber: selectedTable,
          reservationStartTime: formatToLocalISO(startTime),
          reservationEndTime: formatToLocalISO(endTime)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create reservation');
      }

      await fetchTables();

    } catch (err) {
      console.error('Error creating reservation:', err);
      setError(err.message || 'Failed to create reservation');
    } finally {
      setIsProcessing(false);
      setIsModalOpen(false);
      setSelectedTable(null);
      setReservationDateTime(null);
    }
  };

  const handleCancelReservation = () => {
    setIsModalOpen(false);
    setReservationDateTime(null);
    setTimeout(() => {
      setSelectedTable(null);
    }, 300);
  };

  const handleDateTimeChange = (dateTime) => {
    setReservationDateTime(dateTime);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <svg className="error-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="error-message">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="tables-page">
      <h1 className="page-title">All Tables</h1>
      <div className="tables-grid">
        {tables.map((table) => (
          <TableCard
            key={table.tableNumber}
            table={table}
            onReserve={() => handleReserveClick(table.tableNumber)}
          />
        ))}
      </div>

      <ReservationConfirmation
          key={`${isModalOpen}-${selectedTable}`}
          isOpen={isModalOpen}
          tableNumber={selectedTable}
          onConfirm={handleConfirmReservation}
          onCancel={handleCancelReservation}
          isProcessing={isProcessing}
      >
        <ReservationCalendar
            tableNumber={selectedTable}
            onTimeSelect={handleDateTimeChange}
            key={`calendar-${isModalOpen}-${selectedTable}`}
        />
      </ReservationConfirmation>
    </div>
  );
};

export default AllTablesPage;