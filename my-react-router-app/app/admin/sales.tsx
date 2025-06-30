import axios from "axios";
import { useEffect, useState } from "react";

export default function Sales(props: { setShowSales: (show: boolean) => void }) {
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

    let [salesItems, setSalesItems] = useState<any[]>([]);
    let [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    let [monthlySalesTotal, setMonthlySalesTotal] = useState<number>(0);

    async function getSalesReport(month: number) {
        setSelectedMonth(month);
        setMonthlySalesTotal(0); // Reset total for the new month
        setSalesItems([]); // Clear previous sales items
        try {
            const response = await axios.get(`https://meta-aura-463810-f3.uc.r.appspot.com/sales?month=${month}`);
            if (response.data && Array.isArray(response.data)) { 
                setSalesItems(response.data);
                response.data.forEach((item: any) => {
                    setMonthlySalesTotal(prevTotal => prevTotal + (item.pricePerItem * item.quantitySold));
                });
                console.log("Sales report fetched successfully:", response.data);
            } else {
                console.error("No sales data found for the specified month.");
            }
        } catch (error) {
            console.error("Error fetching sales report:", error);
        }
    }

    useEffect(() => {
        getSalesReport(selectedMonth)
    }, [])

    return (
        <div style={{ padding: "0px 20px" }}>
            <span style={buttonStyle} onClick={() => {
                props.setShowSales(false);
            }}>Back to Admin Portal</span>
            <div style={{ margin: "20px 0" }}>
                <label htmlFor="month-select" style={{ marginRight: "10px" }}>Select Month:</label>
                <select
                    id="month-select"
                    onChange={e => getSalesReport(Number(e.target.value))}
                    defaultValue={new Date().getMonth()}
                    style={{ padding: "5px 10px", borderRadius: "4px" }}
                >
                    {[
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ].map((month, idx) => (
                        <option key={month} value={idx}>{month}</option>
                    ))}
                </select>
            </div>
            {salesItems.length > 0 ? <div>
                <table>
                <thead>
                    <tr>
                        <th style={{ width: "100px", textAlign: "left" }}>Product Name</th>
                        <th style={{ width: "200px", textAlign: "left" }}>Product Price ( Per Item )</th>
                        <th style={{ width: "100px", textAlign: "left" }}>Quantity Sold</th>
                        <th style={{ width: "100px", textAlign: "left" }}>Date Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {salesItems.map((salesItem) => (
                        <tr key={salesItem.id}>
                            <td style={{ width: "100px" }}>{salesItem.productName}</td>
                            <td style={{ width: "100px" }}>{salesItem.pricePerItem}</td>
                            <td style={{ width: "100px" }}>{salesItem.quantitySold}</td>
                            <td style={{ width: "100px" }}>{salesItem.dateSold}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <span style={{ display: "block", marginTop: "20px", fontSize: "1.2rem", fontWeight: "bold" }}>
                Total sales for {
                    [
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ][selectedMonth]
                } was R {monthlySalesTotal.toFixed(2)}
            </span>
            </div> : <p>Loading sales report....</p>}
        </div>
    )
}