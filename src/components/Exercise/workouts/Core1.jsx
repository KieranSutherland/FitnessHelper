import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class Core1 extends Component {

  render() {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Plank</td>
            <td>3</td>
            <td>45s</td>
          </tr>
          <tr>
            <td>Ab crunch</td>
            <td>3</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Bicycle crunch</td>
            <td>3</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Treadmill/Rowing Machine</td>
            <td>1</td>
            <td>10 mins</td>
          </tr>
        </tbody>
      </Table>
    )
  }

}
