import React, { Component } from 'react';

class ValuesCreationTable extends Component {
    constructor() {
        super();

        this.state = {
            lines: 1,
            columns: 2
        };
    }

    render() {
        return (
            <div>
                <table className='table table-bordered table-condensed'>
                    <tbody>
                        {[...Array(this.state.lines)].map((x, i) =>
                            <tr key={'l_' + i}>
                                {[...Array(this.state.columns)].map((y, j) =>
                                    <td key={'c_' + j} ref={'cell_' + i + '_' + j} contentEditable></td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
                <a href='#' onClick={e => this.addLine(e)}>Add line</a> <a href='#' onClick={e => this.addColumn(e)}>Add column</a>
            </div>
        );
    }

    addLine(e) {
        e.preventDefault();

        this.setState({
            ...this.state,
            lines: this.state.lines + 1
        });
    }

    addColumn(e) {
        e.preventDefault();

        this.setState({
            ...this.state,
            columns: this.state.columns + 1
        })
    }

    getTableValues() {
        let valuesMatrix = [];
        for (var i = 0; i < this.state.lines; i++) {
            let values = [];
            for (var j = 0; j < this.state.columns; j++) {
                values.push(this.refs['cell_' + i + '_' + j].innerText);
            }
            valuesMatrix.push(values);
        }

        return valuesMatrix;
    }
}

export default ValuesCreationTable;
