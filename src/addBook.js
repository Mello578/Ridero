/**
 * Created by Mello on 16.09.2017.
 */

import React from 'react';

export class AddBook extends React.Component {

    addBook(command) {

        if(command === 'edit'){
            let buttonDel = document.getElementById('buttonDeleteBook');
            console.log(buttonDel)
        }
        const fieldName = String(document.getElementById('name').value);
        const fieldAuthor = String(document.getElementById('author').value);
        const fieldStyle = String(document.getElementById('style').value);
        const fieldLanguage = String(document.getElementById('language').value);
        const fieldYear = String(document.getElementById('year').value);

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

            this.props.internalsBook.forEach((item)=>{
                if(document.getElementById(item).value !== ''){
                    document.getElementById(item).value = '';
                }
            })

        } else {
            alert('Поле Название - обязательно к заполнению');
        }
    }


    render() {
        const {headers, internalsBook} = this.props;
        module.exports = this.addBook;
        return (
            <div id='addElement' className='modal fade'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-body'>
                            {
                                headers.map((header, index) =>
                                    <div className='field' key={index}>
                                        <label htmlFor={internalsBook[index]}>{header}:</label>
                                        <input id={internalsBook[index]} type='text'/>
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
                            <button type='button' className='btn btn-default buttonStyle noDisplay'
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

