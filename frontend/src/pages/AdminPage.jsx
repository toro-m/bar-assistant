import React, {useEffect, useState} from "react";
import {fetchTables} from "../utils/utils.js";
import AdminTableCard from "../components/AdminTableCard.jsx";
import CreateTableForm from "../components/CreateTableForm.jsx";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";


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


    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <Error message={error}/>;
    }

    return (
        <div className="admin">
            <CreateTableForm/>
            {tables.map((table) => (
                <AdminTableCard key={table.tableNumber} table={table}
                                onDelete={handleDeleteTable}/>
            ))}

        </div>
    );
};

export default AdminPage;