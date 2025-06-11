import React from 'react';
import '../styles/TableConfirmation.css';

const TableConfirmation = ({
                               isOpen,
                               tableNumber,
                               onConfirm,
                               onCancel,
                               isProcessing = false
                           }) => {
    return (
        <div className={`confirmation-overlay ${isOpen ? 'active' : ''}`}>
            <div className="confirmation-modal">
                <h3 className="confirmation-title">Confirm Reservation</h3>
                <p className="confirmation-message">
                    Are you sure you want to reserve Table {tableNumber}?
                </p>
                <div className="confirmation-buttons">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isProcessing}
                        className="confirmation-button cancel-button"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isProcessing}
                        className="confirmation-button confirm-button"
                    >
                        {isProcessing ? (
                            <>
                                <span className="loading-spinner"></span>
                                Processing...
                            </>
                        ) : 'Confirm Reservation'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableConfirmation;