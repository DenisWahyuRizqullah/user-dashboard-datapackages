import { useEffect, useState } from "react";
import api from "../services/api";

function TestApi() {

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers");
      console.log("Data customers:", response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Add Customer
  const [loading, setLoading] = useState(false);
  const addCustomer = async () => {
    setLoading(true);
    try {
      const newCustomer = {
        name: "Mahardika",
        phone: "081234567890",
        email: "mahardika@mail.com"
      };
  
      const response = await api.post("/customers", newCustomer);
      console.log("Customer added:", response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Update Customer (PUT)
  const updateCustomer = async () => {
    try {
      const updatedCustomer = {
        name: "Budi Santoso (Updated)",
        phone: "08123456789",
        email: "budi.updated@mail.com"
      };

      // contoh: update customer dengan id "1"
      const response = await api.put("/customers/1", updatedCustomer);
      console.log("Customer updated:", response.data);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  // Delete Customer (DELETE)
  const deleteCustomer = async () => {
    try {
      // contoh: hapus customer dengan id "2"
      await api.delete("/customers/2");
      console.log("Customer with id 2 deleted");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div>
      <h1>Test API - Check Console</h1>
      <button onClick={addCustomer} disabled={loading}>
        {loading ? "Adding..." : "Add Customer"}
      </button>
      <button onClick={updateCustomer}>
        Update Customer (id 1)
      </button>
      <button onClick={deleteCustomer}>
        Delete Customer (id 2)
      </button>
    </div>
  );

}

export default TestApi;
