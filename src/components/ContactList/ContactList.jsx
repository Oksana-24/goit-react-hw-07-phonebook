import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/operations';
import { selectAllContacts } from 'redux/selector';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = () => {
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const contacts = useSelector(selectAllContacts);

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(fetchContacts());
    }
    isFirstRender.current = false;
    return;
  }, [dispatch]);

  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, phone }) => (
        <li key={id} className={css.contactItem}>
          <span className={css.marker}></span>
          {name}: {phone}
          <button
            className={css.contactButton}
            type="button"
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  filter: PropTypes.string,
};
