import React, { Component } from "react";
import Rows from "./Rows.js";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const keys = ["Name", "WMI", "Country", "CreatedOn", "VehicleType"];

class App extends Component {
  constructor(props) {
    super(props);

    this.filterHandleChange = this.filterHandleChange.bind(this);
    this.SelectHandleChange = this.SelectHandleChange.bind(this);
  }
  render() {
    return (
      <div className="App">
        <Card className="card">
          <Card.Title> Search </Card.Title>
          <Form className="search">
            <Form.Group>
              <Form.Label>Filter</Form.Label>
              <Form.Control
                type="text"
                value={this.state.filter}
                onChange={this.filterHandleChange}
                placeholder="Enter filter"
              />
              <Form.Label>Filter by country</Form.Label>
              <Form.Control
                as="select"
                value={this.state.country}
                onChange={this.SelectHandleChange}
                placeholder="Enter filter"
              >
                {this.state.countries.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Card>
        <Card className="card">
          <Card.Title>WMI Data - Honda | Total: {this.state.count} </Card.Title>
          {this.state.loading && (
            <Loader className="loader" type="Puff" color="#00BFFF" />
          )}
          <Table striped bordered hover>
            <thead>
              <tr>
                {keys.map((x) => (
                  <th key={x}>{x}</th>
                ))}
              </tr>
            </thead>
            <Rows WMIs={this.state.WMIs} />
          </Table>
        </Card>
        {this.state.error && (
          <Alert variant="danger">
            <Alert.Heading>Network connetion problem </Alert.Heading>
            <p>the backend is having problems</p>
          </Alert>
        )}
      </div>
    );
  }

  state = {
    WMIs: [],
    filter: "",
    countries: [],
    country: "",
    loading: false,
    count: 0,
    error: false,
  };

  filterHandleChange(event) {
    this.setState(
      { filter: event.target.value, loading: true, WMIs: [] },
      this.getWMI(event.target.value, this.state.country)
    );
  }

  SelectHandleChange(event) {
    this.setState(
      { country: event.target.value, loading: true, WMIs: [] },
      this.getWMI(this.state.filter, event.target.value)
    );
  }

  componentDidMount() {
    fetch("https://localhost:44307/WMI")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          WMIs: data,
          loading: false,
          count: data.length,
          error: false,
        });
      })
      .catch((data) => {
        this.setState({ error: true });
      });

    fetch("https://localhost:44307/WMI/Country")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ countries: data });
      })
      .catch(console.log);
  }

  getWMI(filter, country) {
    fetch(
      "https://localhost:44307/WMI/filter?query=" +
        filter +
        "&country=" +
        country
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          WMIs: data,
          loading: false,
          count: data.length,
          error: false,
        });
      })
      .catch((data) => {
        this.setState({ error: true });
      });
  }
}

export default App;
