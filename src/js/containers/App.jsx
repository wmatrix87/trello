import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';
import AddListDialog from './AddListDialog';
import { createList, getLists } from '../actions';

class App extends Component {
    static propTypes = {
      lists: PropTypes.arrayOf(PropTypes.object).isRequired,
      getLists: PropTypes.func.isRequired,
    };
    constructor(props) {
      super(props);
      this.state = {
        isCreatingList: false,
      };
    }
    componentWillMount() {
      this.props.getLists();
    }
    addList() {
      this.setState({ isCreatingList: true });
    }

    closeDialog() {
      this.setState({ isCreatingList: false });
    }
    listSubmit(list) {
      createList(list);
      this.setState({ isCreatingList: false });
    }
    render() {
      const { lists } = this.props;

      const style = {
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: '20px'
      };

      return (
        <div>
          <div style={{ ...style }}>
            {lists.map(item =>
            (<Container
              key={item.id}
              id={item.id}
              name={item.name}
              cards={item.cards}
            />))}

          </div>
          <button onClick={e => this.addList(e)}>Add new list</button>
          <AddListDialog
            isOpen={this.state.isCreatingList}
            onSubmit={e => this.listSubmit(e)}
            onClose={e => this.closeDialog(e)}
          />
        </div>
      );
    }
}
const mapStateToProps = state => ({
  lists: state.lists.lists
});

const mapDispatchToProps = { getLists };
export default DragDropContext(HTML5Backend)(connect(mapStateToProps, mapDispatchToProps)(App));
