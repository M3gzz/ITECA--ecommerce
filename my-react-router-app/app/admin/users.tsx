import axios from "axios";
import { useEffect, useState } from "react";

export default function Users(props: { setShowUsers: (show: boolean) => void }) {
    const buttonStyle = {
        color: "white",
        padding: "10px 20px",
        textDecoration: "none",
        borderRadius: "5px",
        backgroundColor: "#30C5FF",
        margin: "20px 0",
        cursor: "pointer",
        display: "inline-block",
    }

    let [users, setUsers] = useState<any[]>([]);
    let [userRoleModalOpen, setUserRoleModalOpen] = useState<boolean>(false);
    let [selectedUser, setSelectedUser] = useState<any>(null);

            async function getUsers() {
            await axios.get(`https://meta-aura-463810-f3.uc.r.appspot.com/users`).then(res => {
                if (res.data) {
                    setUsers(res.data);
                    console.log("Users fetched successfully:", res.data);
                } else {
                    console.error("No users found.");
                }
            })
        }

    useEffect(() => {

        getUsers();
    }, [])

    function updateUserRole(role: string) {
        console.log(`Updating user role to ${role} for user:`, selectedUser);
        setSelectedUser((prev: any) => ({ ...prev, role }));
        console.log(`Updated user role for user:`, selectedUser);
    }

    function saveUserChangesToDB() {
        if (selectedUser) {
            axios.post(`https://meta-aura-463810-f3.uc.r.appspot.com/updateUserRole`, {
                userId: selectedUser.id,
                role: selectedUser.role
            }).then(res => {
                if (res.data.success) {
                    console.log("User role updated successfully:", res.data);
                    setUserRoleModalOpen(false);
                    setSelectedUser(null);
                    // Refresh users list
                    setUsers([]);
                    getUsers();
                } else {
                    console.error("Failed to update user role:", res.data.message);
                }
            }).catch(err => {
                console.error("Error updating user role:", err);
            });
        }
    }

    return (

        <>
            <div style={{ padding: "0px 20px" }}>
                <span style={buttonStyle} onClick={() => {
                    props.setShowUsers(false);
                }}>Back to Admin Portal</span>
                {users.length > 0 ? <table>
                    <thead>
                        <tr>
                            <th style={{ width: "100px", textAlign: "left" }}>Name</th>
                            <th style={{ width: "200px", textAlign: "left" }}>Email</th>
                            <th style={{ width: "100px", textAlign: "left" }}>Role</th>
                            <th style={{ width: "100px", textAlign: "left" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id || user.email}>
                                <td style={{ width: "100px" }}>{user.name}</td>
                                <td style={{ width: "100px" }}>{user.email}</td>
                                <td style={{ width: "100px" }}>{user.role}</td>
                                <td style={{ width: "100px" }}>
                                    <button type="button" onClick={() => {
                                        setUserRoleModalOpen(true);
                                        setSelectedUser(user);
                                    }}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> : <p>Loading users....</p>}
            </div>
            {userRoleModalOpen && selectedUser &&
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: "rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                }}>
                    <div style={{
                        background: "white",
                        padding: 24,
                        borderRadius: 8,
                        minWidth: 300,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                    }}>
                        <span style={{fontSize: "1.5rem"}}>Update Role for {selectedUser?.name}</span>
                        <div style={{ marginBottom: 16, marginTop: 16 }}>
                            <label>
                                Role:{" "}
                                <select value={selectedUser.role} onChange={e => updateUserRole(e.target.value)}>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </label>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => saveUserChangesToDB()} style={{ background: "#30C5FF", color: "white", border: "none", padding: "8px 16px", borderRadius: 4 }}>Save</button>
                            <button onClick={() => {
                                setUserRoleModalOpen(false);
                                setSelectedUser(null);
                            }} style={{ background: "#eee", border: "none", padding: "8px 16px", borderRadius: 4 }}>Cancel</button>
                        </div>
                    </div>
                </div>}
        </>
    );
}