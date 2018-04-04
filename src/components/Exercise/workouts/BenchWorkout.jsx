import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class BenchWorkout extends Component {

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
            <td>Squat</td>
            <td>5</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Bench Press</td>
            <td>5</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Barbell Row</td>
            <td>5</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Dips</td>
            <td>3</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Plank</td>
            <td>3</td>
            <td>60s</td>
          </tr>
        </tbody>
      </Table>
    )
  }

}
