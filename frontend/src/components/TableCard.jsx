import React from 'react';
import '../styles/TableCard.css';

const TableCard = ({ table, onReserve }) => {
    return (
        <div className={`table-card ${table.reserved ? 'reserved' : 'available'}`}>
            <div>
                <h3>Table {table.tableNum}</h3>
                <span className="status">
          {table.reserved ? 'Reserved' : 'Available'}
        </span>
                <p className="seats">Seats: {table.availableSeats}</p>
            </div>
            {!table.reserved && (
                <button
                    className="reserve-button"
                    onClick={() => onReserve()}
                >
                    Reserve
                </button>
            )}
        </div>
    );
};

export default TableCard;