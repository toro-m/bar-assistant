import React from 'react';

const TableCard = ({ table, onReserve }) => {
    return (
        <div className={`table-card ${table.reserved ? 'reserved' : 'available'}`}>
            <h3>Table {table.tableNum}</h3>
            <p>{table.reserved ? 'Reserved' : 'Available'}</p>
            <p>Capacity: {table.availableSeats}</p>
            {!table.reserved && (
                <button
                    onClick={() => onReserve(table.tableNum)}
                    className="reserve-button"
                >
                    Reserve
                </button>
            )}
        </div>
    );
};

export default TableCard;