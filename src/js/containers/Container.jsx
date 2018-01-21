/* eslint class-methods-use-this: ["error", { "exceptMethods": ["removeList"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Cards from './Cards';
import { removeList, createCard, pushList } from '../actions/index';
import AddCardDialog from './AddCardDialog';


injectTapEventPlugin();

class Container extends Component {
    static propTypes = {
      connectDropTarget: PropTypes.func.isRequired,
      connectDragSource: PropTypes.func.isRequired,
      canDrop: PropTypes.bool,
      isOver: PropTypes.bool,
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    };
    static defaultProps = {
      canDrop: false,
      isOver: false,
    };
    constructor(props) {
      super(props);
      this.state = {
        isCreatingTask: false
      };
    }
    removeList(listId) {
      removeList(listId);
    }
    addCard() {
      this.setState({ isCreatingTask: true });
    }
    closeDialog() {
      this.setState({ isCreatingTask: false });
    }
    cardSubmit(card) {
      createCard({ ...card, listId: this.props.id });
      this.setState({ isCreatingTask: false });
    }

    render() {
      const {
        canDrop, isOver, connectDragSource, connectDropTarget
      } = this.props;
      const isActive = canDrop && isOver;
      const style = {
        width: '200px',
        height: '404px',
        border: '1px dashed gray'
      };

      const backgroundColor = isActive ? 'lightgreen' : '#FFF';

      return connectDragSource(connectDropTarget(<div>
        <div style={{ ...style, backgroundColor }}>
          <div>{this.props.name}</div>
          <Cards
            cards={this.props.cards}
            listId={this.props.id}
          />
          <button onClick={e => this.addCard(e)}>Add new card</button>
          <button onClick={e => this.removeList(this.props.id, e)}>Remove list</button>
        </div>
        <AddCardDialog
          isOpen={this.state.isCreatingTask}
          onSubmit={e => this.cardSubmit(e)}
          onClose={e => this.closeDialog(e)}
        />
                                                 </div>));
    }
}

const listSource = {

  beginDrag(props) {
    return {
      id: props.id,
      name: props.name,
      cards: props.cards
    };
  },
};

const listTarget = {
  drop(props, monitor) {
    pushList(monitor.getItem(), props.id);
  }
};

export default flow(
  DropTarget('LIST', listTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })),
  DragSource('LIST', listSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
)(Container);
