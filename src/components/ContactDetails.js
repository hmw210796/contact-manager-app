import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ContactContext from "../context/contacts-context";
import rick from "../image/rick.jpg";

function ContactDetails(props) {
  const renderBtn = props.btn;
  const params = useParams();

  const contactCtx = useContext(ContactContext);

  const singleContact = contactCtx.contacts.find(
    (contact) => contact.id === params.id
  );

  const { name, email } = singleContact;

  return (
    <div className="ui main ">
      <div className="ui card centered">
        <div className="image">
          <img src={rick} alt="rick" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="ui container center aligned">
        {renderBtn && (
          <Link to="/">
            <button className="ui button blue center ">
              Back to Contact List
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ContactDetails;
