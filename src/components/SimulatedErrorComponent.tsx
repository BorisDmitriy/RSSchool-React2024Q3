import React from 'react';
import { SimulatedErrorComponentIState } from '../types/Types';

export default class SimulatedErrorComponent extends React.Component<
  object,
  SimulatedErrorComponentIState
> {
  constructor(props: object) {
    super(props);
    this.state = {
      error: false,
    };
  }

  render() {
    const { error } = this.state;

    if (error) {
      console.log(this);
      throw new Error('error examle');
    }

    return (
      <button
        type="button"
        className="btn"
        onClick={() => this.setState({ error: true })}
      >
        Throw Error
      </button>
    );
  }
}
