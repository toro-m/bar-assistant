import React from 'react';
import '../styles/TableCard.css';

const TableCard = ({ table, onReserve }) => {
    return (
        <div className={`table-card available`}>
            <div>
                <h3>Table {table.tableNumber}</h3>
                <p className="seats">Seats: {table.numOfSeats}</p>
            </div>
                <button
                    className="reserve-button"
                    onClick={() => onReserve()}
                >
                    Reserve
                </button>
        </div>
    );
};

export default TableCard;