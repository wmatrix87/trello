import store from '../store';

export const GET_LISTS = 'GET_LISTS';
export const MOVE_CARD = 'MOVE_CARD';
export const PUSH_CARD = 'PUSH_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const REMOVE_LIST = 'REMOVE_LIST';
export const CREATE_CARD = 'CREATE_CARD';
export const CREATE_LIST = 'CREATE_LIST';
export const PUSH_LIST = 'PUSH_LIST';

export function getLists() {
  const listOne = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
  ];

  const listTwo = [
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' },
    { id: 6, text: 'Item 6' }
  ];

  const listThree = [
    { id: 7, text: 'Item 7' },
    { id: 8, text: 'Item 8' },
    { id: 9, text: 'Item 9' }
  ];

  const lists = [
    {
      id: 1,
      name: 'col 1',
      cards: listOne
    },
    {
      id: 2,
      name: 'col 2',
      cards: listTwo
    },
    {
      id: 3,
      name: 'col 3',
      cards: listThree
    }
  ];

  return {
    type: GET_LISTS,
    payload: lists
  };
}

export function moveCard(listId, dragIndex, hoverIndex) {
  return store.dispatch({
    type: MOVE_CARD, listId, dragIndex, hoverIndex
  });
}

export function pushCard(card, to, from) {
  return store.dispatch({
    type: PUSH_CARD, card, to, from
  });
}

export function pushList(list, before) {
  return store.dispatch({ type: PUSH_LIST, list, before });
}

export function removeCard(listId, cardId) {
  return store.dispatch({ type: REMOVE_CARD, listId, cardId });
}

export function removeList(listId) {
  return store.dispatch({ type: REMOVE_LIST, listId });
}

export function createCard(card) {
  return store.dispatch({ type: CREATE_CARD, card });
}

export function createList(list) {
  return store.dispatch({ type: CREATE_LIST, list });
}

