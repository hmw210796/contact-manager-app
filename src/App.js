import { Routes, Route } from "react-router-dom";
import "./App.css";

import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import Header from "./components/Header";
import ContactDetails from "./components/ContactDetails";
import ContactEdit from "./components/ContactEdit";
import { ContactContextProvider } from "./context/contacts-context";
import ContactDelete from "./components/ContactDelete";

function App() {
  return (
    <div className="ui container">
      <Header />
      <ContactContextProvider>
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/contact/:id" element={<ContactDetails btn={true} />} />
          <Route path="/contact/edit/:id" element={<ContactEdit />} />
          <Route path="/contact/delete/:id" element={<ContactDelete />} />
        </Routes>
      </ContactContextProvider>
    </div>
  );
}

export default App;
