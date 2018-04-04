import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class Toning1 extends Component {

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
            <td>Treadmill/Rowing Machine</td>
            <td>1</td>
            <td>10 mins</td>
          </tr>
          <tr>
            <td>Bicep curl</td>
            <td>3</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Tricep pulldown</td>
            <td>3</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Lateral pulldown</td>
            <td>3</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Front raise with dumbbell</td>
            <td>3</td>
            <td>12</td>
          </tr>
        </tbody>
      </Table>
    )
  }

}
