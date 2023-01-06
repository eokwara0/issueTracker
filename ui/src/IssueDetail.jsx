
import React from 'react';
import graphQLFetch from './graphQLFetch.js';
import SnackBar from './snackBar.jsx';



/** Issue detail Component */
export default class IssueDetail extends React.Component {
  /** class constructor */
  constructor(props) {
    super(props);
    this.state = {
      /** issue object  */
      issue: {},
      /** alert object for snackBar #SnackBar */
      alert: {
        open: false,
        message: "",
        color: "info",
      },
    };

    /** Binding function/methods to the component */
    /** Data binding */
    this.closeAlert = this.closeAlert.bind(this);
    this.showSnack = this.showSnack.bind(this);
  }

  /** sets the SnackBar state to false */
  /** causing it to close */
  closeAlert() {
    this.setState({ alert: { open: false } });
  }

  /** Displays the SnackBar along with your message and color profile
   * color  = [error, success, info]
   * open   = [true, false].🐫
   */
  showSnack(color = "error", message = "", open = false) {
    this.setState({ alert: { color: color, message: message, open: open } });
  }

  /** Mounts the component on to the browser */
  componentDidMount() {
    this.loadData();
  }

  /** @executes when the component or the overall page changes
   * this method has access to its previous state
   * the value is stored within the @prevProps variable
   * client @route parameters are stored within the @match variable
   */
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


  /**
   * Retrieves @issue based on it's @id
   * and renders the @description of the issue
   * onto the browser
   */
  async loadData() {
    const {
      match: {
        params: { id }, // retrieving id
      },
    } = this.props;

    /** graphQL query */
    const query = ` query issue($id : Int!){
            issue (id : $id){
                id description
            }
        }`;
      
    /**🐫 executing @query  and retrieving data*/
    const data = await graphQLFetch(query, { id } , this.showSnack);

    /**👻 validate if @data is available */
    if (data) {
      /** 👻setstate if valid */
      this.setState({ issue: data.issue });
    } else {
      this.setState({ issue: {} });
    }
  }
  render() {

    const {
      /**🐔retrieve issue description */
      issue: { description },
    } = this.state;
    const { alert } = this.state;
    return (
      <div>
        {/** Displays the issue */}
        <h2>Description</h2>
        <pre>{description}</pre>
        <SnackBar alert={alert} closeAlert={this.closeAlert}/>
      </div>
    );
  }
}
