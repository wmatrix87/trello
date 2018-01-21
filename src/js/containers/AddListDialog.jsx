import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class AddListDialog extends React.Component {
    static propTypes = {
      isOpen: PropTypes.bool,
      onSubmit: PropTypes.func.isRequired,
      onClose: PropTypes.func.isRequired,
    };
    static defaultProps = {
      isOpen: false,
    };
    constructor(props) {
      super(props);

      this.state = {
        name: '',
      };
    }

    handleSubmit() {
      const { onSubmit } = this.props;

      if (onSubmit) {
        onSubmit({
          name: this.state.name,
        });
      }

      this.setState({ name: '' });
    }

    handleClose() {
      const { onClose } = this.props;

      this.setState({ name: '' });

      if (onClose) {
        onClose();
      }
    }

    handleTextChange(e) {
      this.setState({
        name: e.target.value,
      });
    }

    render() {
      const { name } = this.state;
      const { isOpen } = this.props;

      return (
        <Dialog
          contentStyle={{ maxWidth: 400 }}
          actions={[
            <FlatButton
              label="Cancel"
              onTouchTap={e => this.handleClose(e)}
            />,
            <FlatButton
              primary
              label="Submit"
              disabled={!name}
              onTouchTap={e => this.handleSubmit(e)}
            />,
                ]}
          open={isOpen}
        >
          <h3 >Add card</h3>
          <TextField
            value={name}
            onChange={e => this.handleTextChange(e)}
            floatingLabelText="Enter task name"
          />
        </Dialog>
      );
    }
}

export default AddListDialog;
