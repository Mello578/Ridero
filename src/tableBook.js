/**
 * Created by Mello on 15.09.2017.
 */

/**
 * Created by Mello on 15.09.2017.
 */

import React from "react";
import {AddBook} from './addBook';
import {bookFieldNames} from './bookFieldNames';


export class TableBook extends React.Component {

    constructor() {
        super();

        this.state = {
            filterString: '',
            sortBook: false,
            isModalWindowOpened: false,
            selectedBook: null,
            books: JSON.parse(localStorage.getItem('book'))
        };
    }

    setBooks(books) {
        this.setState({books});
        localStorage.setItem('book', JSON.stringify(books));
    }

    showModalWindow(selectedBook) {
        this.setState({
            isModalWindowOpened: true,
            selectedBook
        });
    }

    deleteBook(book) {
        console.log('delete: ', book);
    }

    editBook(editedBook) {
        console.log('edit book: ', editedBook);
    }

    addBook(newBook) {
        console.log('new book: ', newBook);
    }

    hideModalWindow() {
        this.setState({
            isModalWindowOpened: false
        });
    }

    refreshFilterString(event) {
        let filterString = event.target.value.toLowerCase();
        this.setState({filterString});
    }

    getFilteredTable() {
        const {allBook} = this.props;
        if (this.state.filterString) {
            return allBook.filter((item) => {
                for (let key in item) {
                    if (String(item[key]).toLowerCase().indexOf(this.state.filterString) > -1 && key !== 'id') {
                        return true;
                    }
                }

                return false;
            });
        } else {
            return allBook
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
        const bookFields = Object.keys(bookFieldNames);
        const headers = bookFields.map((fieldName) => bookFieldNames[fieldName]);
        let allBook = this.getFilteredTable();

        return (
            <div>
                <AddBook selectedBook={this.state.selectedBook}
                         visibility={this.state.isModalWindowOpened}
                         onDelete={(book) => this.deleteBook(book)}
                         onEdit={(book) => this.editBook(book)}
                         onAdd={(book) => this.addBook(book)}
                         onCancel={() => this.hideModalWindow()}/>
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
                                        onClick={() => this.showModalWindow(null)}>
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
                                            onClick={(event) => this.sortBook(event, bookFields)}>
                                            {
                                                item
                                            }
                                        </td>)
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                allBook.map((book, id) =>
                                    <tr key={id} id={'book' + id}
                                        onDoubleClick={(event) => this.showModalWindow(book)}
                                    >
                                        {
                                            bookFields.map((internal, i) =>
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