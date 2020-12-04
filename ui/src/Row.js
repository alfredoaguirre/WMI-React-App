import React from "react";
class Row extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.WMI.name}</td>
        <td>{this.props.WMI.wmi}</td>
        <td>{this.props.WMI.country}</td>
        <td>{this.props.WMI.createdOn}</td>
        <td>{this.props.WMI.vehicleType}</td>
      </tr>
    );
  }
}

export default Row;
