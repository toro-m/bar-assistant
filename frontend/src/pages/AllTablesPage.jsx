import { useState, useEffect } from 'react';
import TableCard from "../components/TableCard.jsx";
import TableConfirmation from "../components/TableConfirmation";
import '../styles/AllTablesPage.css';

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
    setIsModalOpen(true);
  };

  const handleConfirmReservation = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/tables/reserve/${selectedTable}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reservationTime: reservationDateTime.toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reserve table');
      }

      const success = await response.json();
      if (success) {
        await fetchTables();
      } else {
        console.error('Failed to reserve table. It might already be reserved.');
      }
    } catch (err) {
      console.error('Error reserving table:', err);
    } finally {
      setIsProcessing(false);
      setIsModalOpen(false);
      setSelectedTable(null);
      setReservationDateTime(null);
    }
  };

  const handleCancelReservation = () => {
    setIsModalOpen(false);
    setSelectedTable(null);
    setReservationDateTime(null);
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
      
      <TableConfirmation
        isOpen={isModalOpen}
        tableNumber={selectedTable}
        onConfirm={handleConfirmReservation}
        onCancel={handleCancelReservation}
        isProcessing={isProcessing}
        onDateTimeChange={handleDateTimeChange}
        reservationDateTime={reservationDateTime}
      />
    </div>
  );
};

export default AllTablesPage;