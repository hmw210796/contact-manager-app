import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import ContactContext from "../context/contacts-context";

function ContactList() {
  const inputRef = useRef();
  const contactCtx = useContext(ContactContext);

  const getSearchTerm = () => {
    contactCtx.onSearch(inputRef.current.value);
  };

  const { retrieveContacts, onAddContact, contacts } = contactCtx;

  useEffect(() => {
    retrieveContacts();
  }, [retrieveContacts, onAddContact]);

  let contact;

  if (!contactCtx.searchTerm) {
    contact = contacts;
  } else {
    contact = contactCtx.searchResults;
  }

  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right floated">Add Contact</button>
        </Link>
      </h2>

      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputRef}
            placeholder="Search Contacts"
            className="prompt"
            value={contactCtx.searchTerm}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>

      <div className="ui celled list container">
        {contact.length > 0 ? (
          contact.map((contact) => (
            <ContactCard list={contact} key={contact.id} />
          ))
        ) : (
          <p>No contacts available</p>
        )}
      </div>
    </div>
  );
}

export default ContactList;
