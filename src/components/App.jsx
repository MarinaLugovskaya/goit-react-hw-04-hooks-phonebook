import React, { useState, useEffect } from 'react';
import Form from '../components/Form/Form';
import Contacts from '../components/Contacts/Contacts';
import Filter from '../components/Filter/Filter';
import { v4 as uuidv4 } from 'uuid';
import css from '../components/Form/Form.module.css';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // --LOCAL STORAGE--

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = contactsData => {
    if (contacts.some(contact => contact.name.toLowerCase() === contactsData.name.toLowerCase())) {
      alert(`${contactsData.name} is already exists in contact list`);
      return;
    }
    setContacts(prevState => [...prevState, contactsData]);
  };

  // const handleDeleteContacts = id => {
  //   setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  // };
  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => id !== contact.id));
  };
  // --FILTER--
  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const filterByName = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  return (
    <>
      <div className={css.postcard}>
        <h1>Phonebook</h1>
        <Form contacts={contacts} onSubmit={formSubmitHandler} />
        <div className={css.formRow}>
          <Filter value={filter} onChange={changeFilter} />
        </div>
        <h2>Contacts</h2>
        <Contacts
          filter={filter}
          // onChange={filterByName}
          onClick={deleteContact}
          contacts={filterByName()}
        />
      </div>
    </>
  );
}
