import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class Core2 extends Component {

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
            <td>Treadmill/Rowing Machine (90s intense, 30s less intense, repeat)</td>
            <td>1</td>
            <td>20 mins</td>
          </tr>
          <tr>
            <td>Plank</td>
            <td>3</td>
            <td>60s</td>
          </tr>
          <tr>
            <td>Side plank (both sides = 1 set)</td>
            <td>3</td>
            <td>45s</td>
          </tr>
          <tr>
            <td>Straight leg raise with bench</td>
            <td>3</td>
            <td>12</td>
          </tr>
        </tbody>
      </Table>
    )
  }

}
