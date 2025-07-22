import {jwtDecode} from "jwt-decode";

export function getEmailFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.sub;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}
export async function fetchTables() {
    const response = await fetch('/api/tables');
    if (!response.ok) {
        throw new Error('Failed to fetch tables');
    }
    return await response.json();
}

