import express from 'express';
import { addContact, getAllContacts, updateContact, deleteContact, getApiCounts } from '../controllers/conatctController.js';

const router = express.Router();

// Route to add API 
router.post('/add-contact', addContact);

// Route to get API 
router.get('/all-contacts', getAllContacts);

// Route to update/edit API 
router.put('/update-contact/:id', updateContact);

// Route to delete API 
router.delete('/delete-contact/:id', deleteContact);

// Route to get API call counts
router.get('/api-counts', getApiCounts);

export default router;
