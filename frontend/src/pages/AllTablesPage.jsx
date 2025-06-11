import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AllTablesPage.css';

const AllTablesPage = () => {
    const [tables, setTables] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // In a real app, this would be an API call to fetch tables
        const mockTables = [
            { id: 1, number: 1, isReserved: false },
            { id: 2, number: 2, isReserved: true },
            { id: 3, number: 3, isReserved: false },
            { id: 4, number: 4, isReserved: true },
            { id: 5, number: 5, isReserved: false },
        ];
        setTables(mockTables);
    }, []);

    const handleReserve = (tableId) => {
        if (window.confirm('Are you sure you want to reserve this table?')) {
            // In a real app, this would be an API call to update the reservation status
            setTables(tables.map(table =>
                table.id === tableId ? { ...table, isReserved: true } : table
            ));
            // Reload the page to show updated status
            window.location.reload();
        }
    };

    return (
        <div className="tables-container">
            <h1>All Tables</h1>
            <div className="tables-grid">
                {tables.map((table) => (
                    <div
                        key={table.id}
                        className={`table-card ${table.isReserved ? 'reserved' : 'available'}`}
                    >
                        <h3>Table {table.number}</h3>
                        <p>{table.isReserved ? 'Reserved' : 'Available'}</p>
                        {!table.isReserved && (
                            <button
                                onClick={() => handleReserve(table.id)}
                                className="reserve-button"
                            >
                                Reserve
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTablesPage;