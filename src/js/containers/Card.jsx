import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import { moveCard, removeCard } from '../actions';


const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  margin: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

class Card extends Component {
    static propTypes = {
      connectDropTarget: PropTypes.func.isRequired,
      connectDragSource: PropTypes.func.isRequired,
      isDragging: PropTypes.bool,
      isOver: PropTypes.bool,
      canDrop: PropTypes.bool,
      listId: PropTypes.number.isRequired,
      card: PropTypes.shape({
        text: PropTypes.string,
        id: PropTypes.number
      }).isRequired,
    };
    static defaultProps = {
      isDragging: false,
      isOver: false,
      canDrop: false,
    };
    removeCard(cardId) {
      removeCard(this.props.listId, cardId);
    }
    render() {
      const {
        canDrop, isOver, card, isDragging, connectDragSource, connectDropTarget
      } = this.props;
      const isActive = canDrop && isOver;
      const backgroundColor = isActive ? 'lightgreen' : '#FFF';
      const opacity = isDragging ? 0 : 1;

      return connectDragSource(connectDropTarget(<div style={{ ...style, opacity, backgroundColor }}>
        {card.text}
        <i role="presentation" onClick={e => this.removeCard(card.id, e)} className="material-icons" style={{ cursor: 'pointer' }}>delete</i>
                                                 </div>));
    }
}

const cardSource = {

  beginDrag(props) {
    return {
      index: props.index,
      listId: props.listId,
      card: props.card
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().listId;

    if (dragIndex === hoverIndex) {
      return;
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    if (props.listId === sourceListId) {
      moveCard(sourceListId, dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  }
};

export default flow(
  DragSource('CARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget('CARD', cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    item: monitor.getItem()
  })),
)(Card);
