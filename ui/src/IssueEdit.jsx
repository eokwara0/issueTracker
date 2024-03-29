import React from "react";
import { Link } from "react-router-dom";
import graphQLFetch from "./graphQLFetch.js";
import NumInput from "./NumInput.jsx";
import DateInput from "./DateInput.jsx";
import TextInput from "./TextInput.jsx";
import SnackBar from "./snackBar.jsx";
import {
  Col,
  Panel,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonToolbar,
  Button,
  Alert,
} from "react-bootstrap";

export default class IssueEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: {},
      invalidFields: {},
      showingValidation: false,
      alert: {
        color: "info",
        message: "",
        open: false,
      },
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.showingValidation = this.showingValidation.bind(this);
    this.showSnack = this.showSnack.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  closeAlert() {
    this.setState({ alert: { open: false } });
  }

  showSnack(color = "error", message = "", open = false) {
    this.setState({ alert: { color: color, message: message, open: open } });
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id: prevId },
      },
    } = prevProps;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    // console.log( name ,textValue );
    const value = naturalValue === null ? textValue : naturalValue;
    this.setState((prevState) => ({
      issue: { ...prevState.issue, [name]: value },
    }));
  }
  handleStatus(event) {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState((prevState) => ({
      issue: { ...prevState.issue, [name]: value },
    }));
  }

  onValidityChange(event, valid) {
    const { name } = event.target;
    this.setState((prevState) => {
      const invalidFields = { ...prevState.invalidFields, [name]: !valid };
      if (valid) delete invalidFields[name];
      return { invalidFields };
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.showingValidation();
    const { issue, invalidFields } = this.state;
    if (Object.keys(invalidFields).length !== 0) {
      this.showSnack(
        "error",
        "Please correct invalid fields before submitting",
        true
      );
      return null;
    }

    const query = `mutation issueUpdate(
            $id: Int!
            $changes: IssueUpdateInputs!
        ){
            issueUpdate(
                id:$id
                changes: $changes
            ){
                id title status owner effort created due description
            }
        }`;

    const { id, created, ...changes } = issue;
    const data = await graphQLFetch(query, { changes, id });
    if (data) {
      this.setState({ issue: data.issueUpdate });
      this.showSnack("success", "Updated issue successfully🧪🧪", true);
    }
    console.log(issue);
  }

  async loadData() {
    const query = `query issue($id: Int!) {
        issue(id: $id) {
            id title status owner
            effort created due description
        }
    }`;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const data = await graphQLFetch(query, { id });
    this.setState({ issue: data ? data.issue : {}, invalidFields: {} });
  }

  showingValidation() {
    this.setState({ showingValidation: true });
  }

  dismissValidation() {
    this.setState({ showingValidation: false });
  }
  render() {
    const { issue } = this.state;
    const {
      match: {
        params: { id: propsId },
      },
    } = this.props;
    const { id, owner, status, title } = issue;
    const { effort, due, description, created } = issue;
    if (id === null) {
      if (propsId != null) {
        return <h3>{`Issue with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }

    const { invalidFields } = this.state;

    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle={true}>{`Editing issue: ${id}`}</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible={true}>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Created
              </Col>
              <Col sm={9}>
                <FormControl.Static>
                  {new Date(created).toDateString()}
                </FormControl.Static>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Status
              </Col>
              <Col sm={9}>
                <FormControl
                  componentClass="select"
                  name="status"
                  value={status}
                  onChange={this.handleStatus}
                >
                  <option value="New">New</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Closed">Closed</option>
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Owner
              </Col>
              <Col sm={9}>
                <FormControl
                  componentClass={TextInput}
                  name="owner"
                  value={owner}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Effort
              </Col>
              <Col sm={9}>
                <FormControl
                  componentClass={NumInput}
                  name="effort"
                  value={effort}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </FormGroup>
            <FormGroup validationState={invalidFields.due ? "error" : null}>
              <Col componentClass={ControlLabel} sm={3}>
                Due
              </Col>
              <Col sm={9}>
                <FormControl
                  componentClass={DateInput}
                  onValidityChange={this.onValidityChange}
                  name="due"
                  value={due}
                  onChange={this.onChange}
                  key={id}
                />
                <FormControl.Feedback />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Title
              </Col>
              <Col sm={9}>
                <FormControl
                  componentClass={TextInput}
                  size={50}
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Description
              </Col>
              <Col sm={9}>
                <FormControl
                  componentClass={TextInput}
                  tag="textarea"
                  rows={4}
                  cols={50}
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={3} sm={6}>
                <ButtonToolbar>
                  <Button bsStyle="primary" type="submit">
                    Submit
                  </Button>
                  <Link to="/issues">
                    <Button bsStyle="link">Back</Button>
                  </Link>
                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Form>
          <FormGroup>
            <Col smOffset={3} sm={9}>
              {
                <SnackBar
                  closeAlert={this.closeAlert}
                  alert={this.state.alert}
                />
              }
            </Col>
          </FormGroup>
        </Panel.Body>
        <Panel.Footer>
          <Link to={`/edit/${id - 1}`}>Prev</Link>
          {" | "}
          <Link to={`/edit/${id + 1}`}>Next</Link>
        </Panel.Footer>
      </Panel>
    );
  }
}
