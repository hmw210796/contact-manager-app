import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ContactContext from "../context/contacts-context";

function ContactEdit() {
  const contactCtx = useContext(ContactContext);
  const params = useParams();

  const singleContact = contactCtx.contacts.filter(
    (contact) => contact.id === params.id
  );

  const [user, setUser] = useState(...singleContact);
  const navigate = useNavigate();

  function editContact(e) {
    e.preventDefault();
    if (user.name === "" || user.email === "") {
      alert("All fields are mandatory!");
      return;
    }
    contactCtx.onUpdateContact(user);
    setUser({ name: "", email: "" });
    navigate("/");
  }

  return (
    <div>
      <h2>
        Edit Contact{" "}
        <Link to="/">
          <button className="ui button">Back to Contact List</button>
        </Link>
      </h2>

      <form className="ui form " onSubmit={editContact}>
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
          <button className="ui blue button">Edit</button>
        </div>
      </form>
    </div>
  );
}

export default ContactEdit;
