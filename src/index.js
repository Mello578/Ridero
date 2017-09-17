import React from "react";
import {render} from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '..//style/style.css';
import {TableBook} from './tableBook';


class App extends React.Component {

    render() {

        return (
            <div className="workingField col-md-10 col-md-offset-1">
                <div className="container listEmployees col-md-offset-1">
                    <div className="row">
                        <div>
                            <h1 className="textFont">Список книг</h1>
                        </div>
                    </div>
                </div>
                <TableBook
                    allBook={this.props.allBook}
                />
            </div>
        )
    }
}

(() => {
    new Promise((resolve) => {
        const dataDownload = require('./dataDownload');
        resolve(dataDownload('book'));
    }).then((allBook) => {
        render(<App allBook={allBook}/>,
            document.getElementById('content'));
    });
})();

