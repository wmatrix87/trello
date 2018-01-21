import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import withScrolling from 'react-dnd-scrollzone';
import flow from 'lodash/flow';
import { pushCard } from '../actions';
import Card from './Card';


const ScrollingComponent = withScrolling('div');

const styleScroll = {
  width: '150px',
  height: '325px',
  overflow: 'scroll',
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  margin: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const cardsTarget = {
  drop(props, monitor) {
    if (props.listId !== monitor.getItem().listId) {
      pushCard(monitor.getItem().card, props.listId, monitor.getItem().listId);
    }
  }
};

class Cards extends Component {
    static propTypes = {
      connectDropTarget: PropTypes.func.isRequired,
      canDrop: PropTypes.bool,
      isOver: PropTypes.bool,
      isDragging: PropTypes.bool,
      listId: PropTypes.number.isRequired,
      cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    };
    static defaultProps = {
      canDrop: false,
      isOver: false,
      isDragging: false,
    };
    render() {
      const {
        canDrop, isOver, isDragging, connectDropTarget
      } = this.props;
      const isActive = canDrop && isOver;
      const backgroundColor = isActive ? 'lightgreen' : '#FFF';
      const opacity = isDragging ? 0 : 1;

      return connectDropTarget(<div>
        <ScrollingComponent style={{ ...styleScroll, opacity, backgroundColor }}>
          {this.props.cards.map((card, i) => (
            <Card
              key={card.id}
              index={i}
              listId={this.props.listId}
              card={card}
            />
                    ))}
        </ScrollingComponent>
                               </div>);
    }
}


export default flow(DropTarget('CARD', cardsTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})))(Cards);
