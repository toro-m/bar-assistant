import React, {useEffect, useState} from "react";
import {fetchTables} from "../utils/utils.js";
import AdminTableCard from "../components/AdminTableCard.jsx";
import CreateTableForm from "../components/CreateTableForm.jsx";


const AdminPage = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const loadTables = async () => {
            try {
                setLoading(true);
                const data = await fetchTables();
                setTables(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadTables();
    }, []);

    function handleEditTable(tableNumber) {
        // todo implement
    }

    async function handleDeleteTable(tableNumber) {
        try {
            await fetch(`/api/tables/${tableNumber}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                }
            });
            setTables((prevTables) => prevTables.filter((table) => table.tableNumber !== tableNumber));
        } catch (err) {
            console.error("Error deleting table:", err);
        }
    }

    return (
        <div className="admin">
            <CreateTableForm/>
            {tables.map((table) => (
                <AdminTableCard key={table.tableNumber} table={table} onEdit={handleEditTable}
                                onDelete={handleDeleteTable}/>
            ))}

        </div>
    );
};

export default AdminPage;