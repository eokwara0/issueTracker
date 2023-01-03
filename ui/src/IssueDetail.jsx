
import React from 'react';
import graphQLFetch from './graphQLFetch.js';
import SnackBar from './snackBar.jsx';


export default class IssueDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issue: {},
      alert: {
        open: false,
        message: "",
        color: "info",
      },
    };

    this.closeAlert = this.closeAlert.bind(this);
    this.showSnack = this.showSnack.bind(this);
  }

  closeAlert() {
    this.setState({ alert: { open: false } });
  }

  showSnack(color = "error", message = "", open = false) {
    this.setState({ alert: { color: color, message: message, open: open } });
  }

  componentDidMount() {
    this.loadData();
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

    if (prevId !== id) {
      this.loadData();
    }
  }

  async loadData() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const query = ` query issue($id : Int!){
            issue (id : $id){
                id description
            }
        }`;
    const data = await graphQLFetch(query, { id } , this.showSnack);
    if (data) {
      this.setState({ issue: data.issue });
    } else {
      this.setState({ issue: {} });
    }
  }
  render() {

    const {
      issue: { description },
    } = this.state;
    const { alert } = this.state;
    return (
      <div>
        <h2>Description</h2>
        <pre>{description}</pre>
        <SnackBar alert={alert} closeAlert={this.closeAlert}/>
      </div>
    );
  }
}
