/**
 * Created by Mello on 16.09.2017.
 */

import React from 'react';
import {bookFieldNames} from './bookFieldNames';
const headers = Object.keys(bookFieldNames);
const DEFAULT_BOOK = {
    id: '',
    name: '',
    author: '',
    style: '',
    language: '',
    year: ''
};
export class AddBook extends React.Component {

    constructor() {
        super();
        this.state = {...DEFAULT_BOOK};
    }

    componentWillReceiveProps({selectedBook}) {
         this.setState(selectedBook ? selectedBook : DEFAULT_BOOK);
    }


    render() {
        const {selectedBook, visibility, onDelete, onEdit, onAdd, onCancel} = this.props;

        return (
            <div className={`modal fade ${visibility ? 'in' : ''}`}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-body'>
                            {
                                headers.map((header, index) =>
                                    <div className='field' key={index}>
                                        <label htmlFor={header}>{bookFieldNames[header]}:</label>
                                        <input id={header} type='text' name='text'
                                            value={this.state[header]}
                                            onChange={(e) => {
                                                this.setState({
                                                    [header]: e.target.value
                                                })
                                            }}
                                        />
                                    </div>
                                )
                            }
                        </div>
                        <div className='modal-footer'>
                            {
                                selectedBook
                                    ? <div>
                                    <button type='button'
                                            className='btn btn-default buttonStyle'
                                            onClick={() => onDelete({...this.state})}>Удалить
                                    </button>
                                    <button type='button'
                                            className='btn btn-default buttonStyle'
                                            onClick={() => onEdit({...this.state})}>Редактировать
                                    </button>
                                </div>
                                    : <button type='button'
                                              className='btn btn-default buttonStyle'
                                              onClick={() => onAdd({...this.state})}>Добавить
                                </button>
                            }
                            <button type='button'
                                    className='btn btn-default buttonStyle'
                                    onClick={onCancel}>Отмена
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

