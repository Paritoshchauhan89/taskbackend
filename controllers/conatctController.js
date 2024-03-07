import Contact from '../models/contactSchema.js';

let addCount = 0;
let updateCount = 0;

// Function to add a contact
export const addContact = async (req, res) => {
    try {
        const { firstName, lastName, email, contactNumber, address } = req.body;

        // Check if required fields are missing
        if (!firstName || !lastName || !email || !contactNumber || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check for uniqueness of email or contactNumber if needed (you may adjust based on your schema)
        const existingContact = await Contact.findOne({ $or: [{ email }, { contactNumber }] });
        if (existingContact) {
            return res.status(400).json({ message: "Email or contact number already exists" });
        }

        const newContact = new Contact(req.body);
        await newContact.save();
        addCount++;
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get all contacts
export const getAllContacts = async (req, res) => {
    try {
      // Fetch all contacts from MongoDB
      const contacts = await Contact.find();
      
      // Respond with the contacts data
      res.status(200).json(contacts);
    } catch (error) {
      // Handle errors
      console.error('Error fetching contacts:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// Function to update a contact
export const updateContact = async(req, res)=> {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        updateCount++;
        res.json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to delete a contact
export const deleteContact = async(req, res)=> {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to get counts of add and update APIs
export const  getApiCounts = async(req, res)=> {
    res.json({ addCount, updateCount });
}

