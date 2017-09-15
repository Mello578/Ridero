/**
 * Created by Mello on 15.09.2017.
 */

/**
 * Created by Mello on 15.09.2017.
 */

import React from "react";
import {AddBook} from './addBook';

export class TableBook extends React.Component {

    constructor() {
        super();
        this.state = {
            filterString: '',
            filteredBook: false,
            sortBook: false
        }
    }

    refreshFilterString(event) {
        let filterString = event.target.value.toLowerCase();
        this.setState({filterString});
    }

    filterTable() {
        if (this.state.filterString) {
            let allBook = this.props.allBook;
            let displayBook = allBook.filter((item) => {
                for (let key in item) {
                    if (String(item[key]).toLowerCase().indexOf(this.state.filterString) > -1 && key !== 'id') {
                        return true
                    }
                }
            });
            return displayBook;
        } else {
            return this.props.allBook
        }
    }

    sortBook(e, fields) {
        const column = e.target.cellIndex;
        const arr = this.props.allBook;
        arr.sort((item1, item2) => {
            const first = item1[fields[column]];
            const second = item2[fields[column]];
            return !this.state.sortBook
                ? (first < second ? 1 : -1)
                : (first > second ? 1 : -1);
        });
        this.setState({sortBook: !this.state.sortBook});
    }

    render() {
        const headers = ['Книга', 'Автор', 'Стиль', 'Язык', 'Год'];
        const internalsBook = ['name', 'author', 'style', 'language', 'year'];
        let allBook = this.filterTable();

        return (
            <div>
                <AddBook headers={headers} internalsBook={internalsBook}/>
                <div className='row topBuffer'>
                    <div className='col-md-offset-1 col-sm-offset-1 col-md-10 col-sm-10'>
                        <div className="indentTable">
                            <input type='text' placeholder='Фильтр'
                                   className='buttonBorder filterStyle'
                                   id="filter"
                                   onChange={(event) => this.refreshFilterString(event)}/>

                            <div className="flRight">
                                <button type='button'
                                        className='btn btn-default buttonBorder buttonStyle'
                                        data-toggle='modal'
                                        data-target='#addElement'>
                                    Добавить
                                </button>
                            </div>
                        </div>
                        <table
                            className='table table-bordered table-striped table-condensed table-hover bufferTable employees'>
                            <thead>
                            <tr>
                                {
                                    headers.map((item, id) =>
                                        <td key={id} className="headTable"
                                            onClick={(event) => this.sortBook(event, internalsBook)}>
                                            {
                                                item
                                            }
                                        </td>)
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                allBook.map((book, i) =>
                                    <tr key={i}>
                                        {
                                            internalsBook.map((internal, i) =>
                                                <td key={i}> {book[internal]} </td>)
                                        }
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}