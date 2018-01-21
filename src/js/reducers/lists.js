import update from 'immutability-helper';
import {
  GET_LISTS, MOVE_CARD, PUSH_CARD, REMOVE_CARD, CREATE_CARD, CREATE_LIST, PUSH_LIST, REMOVE_LIST
} from '../actions';

const initialState = {
  lists: [],
};
let cardIdMin = 10;
let listIdMin = 4;

export default function lists(state = initialState, action) {
  switch (action.type) {
    case GET_LISTS:
      return { ...state, lists: action.payload };
    case MOVE_CARD: {
      const { listId, dragIndex, hoverIndex } = action;
      const newLists = [...state.lists];
      const list = newLists.filter(l => l.id === listId)[0];
      const dragCard = list.cards[dragIndex];

      newLists[newLists.indexOf(list)] = update(list, {
        cards: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        }
      });

      return { ...state, lists: newLists };
    }
    case PUSH_LIST: {
      const { list, before } = action;
      let newLists = state;
      const dragIndex = newLists.lists.indexOf(newLists.lists.filter(l => l.id === list.id)[0]);
      const hoverIndex = newLists.lists.indexOf(newLists.lists.filter(l => l.id === before)[0]);

      newLists = update(newLists, {
        lists: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, list]
          ]
        }
      });

      return newLists;
    }

    case REMOVE_LIST: {
      const { listId } = action;
      let newLists = state;

      const removeFromList = newLists.lists.indexOf(newLists.lists.filter(l => l.id === listId)[0]);

      newLists = update(newLists, {
        lists: {
          $splice: [
            [removeFromList, 1]
          ]
        }
      });

      return newLists;
    }

    case PUSH_CARD: {
      const { card, to, from } = action;
      const newLists = [...state.lists];
      const moveToList = newLists.filter(l => l.id === to)[0];
      const removeFromList = newLists.filter(l => l.id === from)[0];

      newLists[newLists.indexOf(moveToList)] = update(moveToList, {
        cards: {
          $push: [card]
        }
      });

      newLists[newLists.indexOf(removeFromList)] = update(removeFromList, {
        cards: {
          $splice: [
            [removeFromList.cards.indexOf(card), 1]
          ]
        }
      });

      return { ...state, lists: newLists };
    }
    case REMOVE_CARD: {
      const { cardId, listId } = action;
      const newLists = [...state.lists];
      const removeFromList = newLists.filter(l => l.id === listId)[0];
      const card = removeFromList.cards.filter(l => l.id === cardId)[0];
      newLists[newLists.indexOf(removeFromList)] = update(removeFromList, {
        cards: {
          $splice: [
            [removeFromList.cards.indexOf(card), 1]
          ]
        }
      });

      return { ...state, lists: newLists };
    }
    case CREATE_CARD: {
      const { card } = action;

      const newLists = [...state.lists];
      const list = newLists.filter(l => l.id === card.listId)[0];
      const newCard = { id: cardIdMin += 1, text: card.text };

      newLists[newLists.indexOf(list)] = update(list, {
        cards: {
          $push: [newCard]
        }
      });

      return { ...state, lists: newLists };
    }
    case CREATE_LIST: {
      const { list } = action;
      let newLists = [...state.lists];

      newLists = update(newLists, {
        $push: [{ id: listIdMin += 1, ...list, cards: [] }]
      });

      return { ...state, lists: newLists };
    }
    default:
      return state;
  }
}
