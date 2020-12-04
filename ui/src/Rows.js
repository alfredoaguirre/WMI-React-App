import React from "react";
import Row from "./Row.js";

class Rows extends React.Component {
  render() {
    return (
      <tbody className="container">
        {this.props.WMIs.map((x, i) => {
          return <Row WMI={x} key={x.wmi} />;
        })}
      </tbody>
    );
  }
}

export default Rows;
