import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ContactContext from "../context/contacts-context";
import ContactDetails from "./ContactDetails";

function ContactDelete(props) {
  const params = useParams();
  const navigate = useNavigate();

  const contactCtx = useContext(ContactContext);

  const { onRemoveContact } = contactCtx;

  const deleteHandler = () => {
    onRemoveContact(params.id);
    navigate("/");
  };

  return (
    <div className="ui container center aligned">
      <ContactDetails btn={false} />
      <div>
        <h3>Are you sure you want to delete this contact?</h3>
      </div>

      <div>
        <div>
          <button className="ui button blue" onClick={deleteHandler}>
            Yes
          </button>
          <Link to={"/"}>
            <button className="ui button red" onClick={() => navigate("/")}>
              No
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContactDelete;
