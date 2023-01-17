import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  NavItem,
  Glyphicon,
  Modal,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import graphQLFetch from "./graphQLFetch.js";
import Toast from "./Toast.jsx";
import SnackBar from './snackBar.jsx';


/** 
 * 🚀🐼 @IssueAddNavItem
 * This is the issue add component used 
 * for adding issues to the database
 */
class IssueAddNavItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      owner: '',
      showing: false,
      open: false,
      message: "",
      color: "info",
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    this.showSnack = this.showSnack.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

   /**🧪 Handles changes that occur within the component */
    handleChange(e){
        let name = e.target.name;
        let ss = this.state
        ss[name] = e.target.value;
        this.setState({ ss })
    }
  /** 🐫sets the display modal to true */
  showModal() {
    this.setState({ showing: true });
  }

  /** ⭕Hides modal */
  hideModal() {
    this.setState({ showing: false });
  }

  /** 🅰️Displays error message */
  showError(message) {
    this.setState({
      open: true,
      message: message,
      color: "error"
    });
  }

  /** 👾 displays snackbar on the ui */
  showSnack(message,color,open){
    this.setState({
        open : open,
        message : message,
        color: color 
    });
  }

  /** 👾 dismisses toast */
  dismissToast() {
    this.setState({ open: false });
  }


  /**
   * 👾HandleSubmit function
   * retrieves issue data and 
   * makes a post request to add the issue
   */
  async handleSubmit(e) {

    e.preventDefault();
    const { owner, title } = this.state;

    this.hideModal();
    const issue = {
      owner: owner,
      title: title,
      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
    };
    console.log( issue );
     const query = `mutation issueAdd($issue:IssueInputs!){
            issueAdd(issue: $issue){
                id
            }
        }`;

    const data = await graphQLFetch(query, { issue }, this.showSnack);

    if (data) {
      this.showSnack("Issue Has been Loaded Ⓜ️", "success", true);
        
      const { history } = this.props;
      history.push(`/edit/${data.issueAdd.id}`);
    }
  }

  render() {
    const { showing } = this.state;
    const { open, message, color } = this.state;
    const { title , owner } = this.props;
    return (
      <React.Fragment>
        <NavItem onClick={this.showModal}>
          <OverlayTrigger
            placement="left"
            delayShow={1000}
            overlay={<Tooltip id="create-issue">Create Issue</Tooltip>}
          >
            <Glyphicon glyph="plus" />
          </OverlayTrigger>
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Issue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="issueAdd">
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl as='input' name="title" autoFocus value={title} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Owner</ControlLabel>
                <FormControl as='input' name="owner" value={owner} onChange={this.handleChange}/>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                type="button"
                bsStyle="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button bsStyle="link" onClick={this.hideModal}>
                Cancel
              </Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
        {/* <Toast
          showing={open}
          onDismiss={this.dismissToast}
          bsStyle={mesage}
        >
          {toastMessage}
        </Toast> */}
        {<SnackBar alert={{open : open , message : message , color : color }} closeAlert={this.dismissToast}/>}
      </React.Fragment>
    );
  }
}

export default withRouter(IssueAddNavItem);