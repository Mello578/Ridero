/**
 * Created by Mello on 16.09.2017.
 */

import React from 'react';

export class AddBook extends React.Component {

    addBook() {
        let fieldName = String(document.getElementById('name').value);
        let fieldAuthor = String(document.getElementById('author').value);
        let fieldStyle = String(document.getElementById('style').value);
        let fieldLanguage = String(document.getElementById('language').value);
        let fieldYear = String(document.getElementById('year').value);


        const checkNameBook = (field) => {
            const fieldName = document.getElementById(field);
            return fieldName.value !== '' ? true : false;
        };

        if (checkNameBook('name')) {
            let books = JSON.parse(localStorage.getItem('book'));
            const newBook = {
                id: books.length,
                name: fieldName,
                author: fieldAuthor,
                style: fieldStyle,
                language: fieldLanguage,
                year: fieldYear
            };
            books.push(newBook);
            books = JSON.stringify(books);
            localStorage.setItem('book', books);

            const refreshData = require('./index');
            refreshData();

            this.props.internalsBook.forEach((item) => {
                if (document.getElementById(item).value !== '') {
                    document.getElementById(item).value = '';
                }
            })

        } else {
            alert('Поле Название - обязательно к заполнению');
        }
    }

    addButton(mode) {
        if (mode !== '') {
            let buttonRemoveDisplay = document.getElementById('buttonDeleteBook');
            buttonRemoveDisplay.style.display = (mode !== 'add' && mode !== '') ? 'block' : 'none';
        }
    }

    addContent(item, index) {
        if(index === 'add' || index === ''){
            return ''
        }else{
            let selectedBook = JSON.parse(localStorage.getItem('book'));
            selectedBook = selectedBook[index];

            return selectedBook[item];

        }

    }


    render() {
        const {headers, internalsBook, modeData} = this.props;
        (() => this.addButton(modeData))();

        return (
            <div id='addElement' className='modal fade'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-body'>
                            {
                                headers.map((header, index) =>
                                    <div className='field' key={index}>
                                        <label htmlFor={internalsBook[index]}>{header}:</label>
                                        <input id={internalsBook[index]} type='text' value={this.addContent(internalsBook[index], modeData)}/>
                                    </div>
                                )
                            }
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-default buttonStyle'
                                    data-dismiss='modal'>Отмена
                            </button>
                            <button type='button' className='btn btn-default buttonStyle'
                                    onClick={() => this.addBook()}>Добавить
                            </button>
                            <button type='button' className='btn btn-default buttonStyle'
                                    id="buttonDeleteBook"
                                    onClick={() => this.addBook()}>Удалить
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

