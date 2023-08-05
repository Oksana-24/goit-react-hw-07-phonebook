import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.items;

export const getFilter = state => state.filter.filter;

export const selectAllContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
