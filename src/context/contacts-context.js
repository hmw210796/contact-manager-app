import React, { useState, useCallback } from "react";
import api from "../api/contacts";

const ContactContext = React.createContext({
  contacts: [],
  retrieveContacts: () => {},
  onAddContact: (contact) => {},
  onRemoveContact: (id) => {},
  onUpdateContact: (contact) => {},
  onSearch: (term) => {},
  searchTerm: "",
  searchResults: "",
});

export default ContactContext;

export function ContactContextProvider(props) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const retrieveContacts = useCallback(async () => {
    const response = await api.get("/contacts.json");

    if (!response.data) {
      throw new Error("Something went wrong!");
    }

    const loadedContacts = [];

    for (const key in response.data) {
      loadedContacts.push({
        id: key,
        name: response.data[key].name,
        email: response.data[key].email,
      });
    }

    setContacts(loadedContacts);
  }, []);

  const addContactHandler = async (contact) => {
    const request = {
      ...contact,
    };

    await api.post("/contacts.json", request);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}.json`);
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  const updateContactHandler = async (contact) => {
    console.log(contact);
    const response = await api.put(`/contacts/${contact.id}.json`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...response.data } : contact
      )
    );
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const filteredContacts = contacts.filter(
        (contact) =>
          contact.email
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase()) ||
          contact.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      setSearchResults(filteredContacts);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        searchTerm,
        searchResults,
        retrieveContacts: retrieveContacts,
        onUpdateContact: updateContactHandler,
        onAddContact: addContactHandler,
        onRemoveContact: removeContactHandler,
        onSearch: searchHandler,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
}
