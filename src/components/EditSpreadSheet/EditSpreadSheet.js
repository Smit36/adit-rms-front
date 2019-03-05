import React from 'react';
import './EditSpreadSheet.css';
import { Redirect } from 'react-router-dom';
import NetworkSpeed from 'network-speed';

class EditSpreadSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            speed: undefined
        }
        this.callbackInterval = undefined;
        this.checkInternetInterval = undefined;
        this.callback = this.callback.bind(this);
        this.checkInternet = this.checkInternet.bind(this);
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

    async checkInternet() {
        console.log('called');
        let baseUrl = 'http://eu.httpbin.org/stream-bytes/50000000';
        let fileSize = 500000;
        let speed = await new NetworkSpeed().checkDownloadSpeed(baseUrl, fileSize);
        if (parseFloat(speed.kbps) <= 100) {
            this.setState(() => ({ speed: speed.mbps }));
        } else {
            this.setState(() => ({ speed: undefined }));
        }
    }

    componentWillMount() {
        if (!this.props.url) {
            this.setState(() => ({ redirect: true }));
        }
        this.callbackInterval = setInterval(this.callback, 1000 * 60);
        this.checkInternetInterval = setInterval(this.checkInternet, 1000 * 15);
    }

    componentWillUnmount() {
        this.props.updateSpreadSheetUrl('');
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
                        {this.state.speed &&
                            <div className='network-speed'>
                                Please bare with us for a moment. You internet connectivity seems to be poor. <b>{this.state.speed}mbps</b>...
                            </div>
                        }
                        <iframe src={`${this.props.url}/edit?rm=demo&chrome=true`} title={`${this.props.url}`} frameBorder="0"></iframe>
                    </div>
                )
        );
    }
}

export default EditSpreadSheet;