import React from 'react';
import './EditSpreadSheet.css';
import { Redirect } from 'react-router-dom';
import NetworkSpeed from 'network-speed';

class EditSpreadSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            speed: undefined,
            jwtToken: undefined
        }
        this.callbackInterval = undefined;
        this.checkInternetInterval = undefined;
    }

    callback = () => {
        fetch('http://localhost:5000/session/callback', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jwtToken: this.state.jwtToken })
        }).then(res => {
            res.json().then(data => {
                if (!data.error) {
                    this.setState(() => ({ jwtToken: data.jwtToken }));
                } else {
                    clearInterval(this.interval);
                    this.setState(() => ({ redirect: true, jwtToken: undefined }));
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }

    checkInternet = async () => {
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
        this.setState(() => ({ jwtToken: this.props.jwtToken }));
        if (!this.props.url) {
            this.setState(() => ({ redirect: true }));
        }
        this.callbackInterval = setInterval(this.callback, 1000 * 60);
        this.checkInternetInterval = setInterval(this.checkInternet, 1000 * 15);
    }

    componentWillUnmount() {
        this.props.updateSheetData(undefined, undefined);
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