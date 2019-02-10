import React from 'react';
import './EditSpreadSheet.css';

class EditSpreadSheet extends React.Component {
    componentWillUnmount() {
        // make url private
        window.addEventListener('unload', logData, true);
        function logData() {
            fetch('http://localhost:5000', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jwtToken: localStorage.getItem('jwtToken') })
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        }
    }
    render() {
        return (
            <div className='edit-spreadsheet-container'>
                <iframe src={`${this.props.url}`} title={`${this.props.url}`} frameBorder="0"></iframe>
            </div>
        );
    }
}

export default EditSpreadSheet;