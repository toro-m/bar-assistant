import { useState, useEffect } from 'react';
import '../styles/AllTablesPage.css';
import TableCard from "../components/TableCard.jsx";

const AllTablesPage = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/tables/all');
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

  const handleReserve = async (tableNumber) => {
    if (window.confirm('Are you sure you want to reserve this table?')) {
      try {
        const response = await fetch(`/api/tables/reserve/${tableNumber}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to reserve table');
        }

        const success = await response.json();
        if (success) {
          await fetchTables();
          alert('Table reserved successfully!');
        } else {
          alert('Failed to reserve table. It might already be reserved.');
        }
      } catch (err) {
        console.error('Error reserving table:', err);
        alert('An error occurred while reserving the table. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading tables...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="tables-container">
      <h1>All Tables</h1>
      <div className="tables-grid">
        {tables.map((table) => (
          <TableCard
            key={table.tableNum}
            table={table}
            onReserve={handleReserve}
          />
        ))}
      </div>
    </div>
  );
};

export default AllTablesPage;