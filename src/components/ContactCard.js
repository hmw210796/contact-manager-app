import { Fragment } from "react";
import { Link } from "react-router-dom";
import user1 from "../image/user1.jpg";

function ContactCard(props) {
  const { id, name, email } = props.list;

  return (
    <Fragment>
      <div className="ui item row ">
        <img
          src={user1}
          alt="user-profile"
          className="ui image avatar left floated"
        />
        <div className="content">
          <Link to={{ pathname: `/contact/${id}` }}>
            <div className="header">{name}</div>
            <div>{email}</div>
          </Link>
        </div>
        <Link to={{ pathname: `/contact/delete/${id}` }}>
          <i
            className="trash alternate outline icon right floated"
            style={{
              color: "red",
              marginTop: "20px",
              marginLeft: "15px",
              cursor: "pointer",
            }}
          ></i>
        </Link>

        <Link to={{ pathname: `/contact/edit/${id}` }}>
          <i
            className="edit alternate outline icon right floated"
            style={{ color: "blue", marginTop: "20px" }}
          ></i>
        </Link>
      </div>
    </Fragment>
  );
}

export default ContactCard;
