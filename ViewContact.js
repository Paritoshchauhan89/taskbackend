import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './Api';
import '../App.css'; // Import CSS file for styling

const ViewContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [executionTime, setExecutionTime] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Record the start time
        const startTime = performance.now();

        const response = await axios.get(`${API_URL}/api/v1/contact/all-contacts`);

        // Record the end time
        const endTime = performance.now();

        // Calculate the elapsed time
        const elapsedTime = endTime - startTime;

        // Set the execution time state
        setExecutionTime(elapsedTime);

        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Function to handle updating contact
  const handleUpdateContact = async (contactId) => {
    try {
      // Record the start time
      const startTime = performance.now();

      // Make a PUT request to update contact count API
      await axios.put(`${API_URL}/api/v1/contact/update-count/${contactId}`);

      // Record the end time
      const endTime = performance.now();

      // Calculate the elapsed time
      const elapsedTime = endTime - startTime;

      // Set the execution time state
      setExecutionTime(elapsedTime);

      // Fetch updated contact list after updating count
      const response = await axios.get(`${API_URL}/api/v1/contact/all-contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error updating contact count:', error);
    }
  };

  return (
    <div>
      <h2>View Contacts</h2>
      <p>Execution Time: {executionTime ? `${executionTime.toFixed(2)} ms` : 'N/A'}</p>
      <p className='add-p'><button className='add-button'>📝 Add Contact</button></p>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="table-container">
      
        </div>
      )}
    </div>
  );
};

export default ViewContact;
