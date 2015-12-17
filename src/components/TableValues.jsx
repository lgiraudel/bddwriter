import React, { Component } from 'react';

class TableValues extends Component {
    render() {
        console.log(this.props);
        return (
            <table className='table'>
                <tbody>
                    {this.props.values.map(line =>
                        <tr>
                            {line.map(cell =>
                                <td>{cell}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
}

export default TableValues;
