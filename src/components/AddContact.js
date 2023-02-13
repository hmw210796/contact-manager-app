import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContactContext from "../context/contacts-context";

function AddContact() {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const contactCtx = useContext(ContactContext);

  function addContact(e) {
    e.preventDefault();

    if (user.name === "" || user.email === "") {
      alert("All fields are mandatory!");
      return;
    }
    contactCtx.onAddContact(user);
    setUser({ name: "", email: "" });
    navigate("/");
  }

  return (
    <div>
      <h2>
        Add Contact{" "}
        <Link to="/">
          <button className="ui button">Back to Contact List</button>
        </Link>
      </h2>

      <form className="ui form " onSubmit={addContact}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <button className="ui blue button">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddContact;
