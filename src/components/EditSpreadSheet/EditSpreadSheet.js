import React from 'react';
import './EditSpreadSheet.css';
import { Redirect } from 'react-router-dom';

class EditSpreadSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.interval = undefined;
        this.callback = this.callback.bind(this);
    }

    callback() {
        fetch('http://localhost:5000/session/callback', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jwtToken: localStorage.getItem('jwtToken') })
        }).then(res => {
            res.json().then(data => {
                if (!data.error) {
                    localStorage.setItem('jwtToken', data.jwtToken);
                } else {
                    localStorage.removeItem('jwtToken');
                    clearInterval(this.interval);
                    this.setState(() => ({ redirect: true }));
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }

    componentWillMount() {
        this.interval = setInterval(this.callback, 1000 * 60);
    }

    componentWillUnmount() {
        localStorage.removeItem('jwtToken');
        clearInterval(this.interval);
    }

    render() {
        return (
            this.state.redirect ?
                <Redirect to='/edit' />
                :
                (
                    <div className='edit-spreadsheet-container'>
                        <iframe src={`${this.props.url}`} title={`${this.props.url}`} frameBorder="0"></iframe>
                    </div>
                )
        );
    }
}

export default EditSpreadSheet;