import React from 'react';
import { Redirect } from 'react-router-dom';

import './Edit.css';

import login from '../../controllers/login';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      department: undefined,
      semester: undefined,
      subject: undefined,
      password: undefined,
      error: undefined,
      redirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSemesterChange = this.handleSemesterChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleDepartmentChange(e) {
    const department = e.target.value !== 'select' ? e.target.value : undefined;
    this.setState(() => ({ department, semester: undefined }));
  }

  handleSemesterChange(e) {
    const semester = e.target.value !== 'select' ? e.target.value : undefined;
    this.setState(() => ({ semester }));
  }

  handleSubjectChange(e) {
    const subject = e.target.value !== 'select' ? e.target.value : undefined;
    this.setState(() => ({ subject }));
  }

  handlePasswordChange(e) {
    const password = e.target.value;
    this.setState(() => ({ password }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const loginData = {
      subjectCode: e.target.elements.subject.value + '_' + e.target.elements.branch.value,
      password: e.target.elements.password.value,
    }
    login(loginData).then(res => {
      if (res.error) {
        this.setState(() => ({ error: res.error, errorMessage: res.errorMessage }));
      } else {
        localStorage.setItem('jwtToken', res.jwtToken);
        this.props.updateSpreadSheetUrl(res.url);
        this.setState(() => ({ redirect: true }));
      }
    });
  }

  render() {
    return (
      this.state.redirect ?
        <Redirect to='/edit/sheet' /> :
        (
          <div className='edit-container'>
            <div className='form-container'>
              <form className='form' onSubmit={this.handleSubmit}>

                <div className='form-control'>
                  <div className='label-div'>
                    <label htmlFor="branch">Department: </label>
                  </div>
                  <div className='form-input'>
                    <select
                      name="branch"
                      onChange={this.handleDepartmentChange}
                    >
                      <option value="select"></option>
                      {this.props.departments && Object.keys(this.props.departments).map((key, i) =>
                        <option value={key} key={i}>{this.props.departments[key].fullName}</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className='form-control'>
                  <div className='label-div'>
                    <label htmlFor="semester">Semester:</label>
                  </div>
                  <div className='form-input'>
                    <select
                      name="semester"
                      onChange={this.handleSemesterChange}
                    >
                      <option value="select"></option>
                      {this.props.departments &&
                        Object.keys(this.props.departments).map((key, i) =>
                          this.state.department === key && Object.keys(this.props.departments[key].semesters).map((sem, j) =>
                            <option key={j} value={sem}>{sem}</option>
                          ))
                      }
                    </select>
                  </div>
                </div>

                <div className='form-control'>
                  <div className='label-div'>
                    <label htmlFor="Subject">Subject:</label>
                  </div>
                  <div className='form-input'>
                    <select
                      name="subject"
                      onChange={this.handleSubjectChange}
                      disabled={!(this.props.departments && this.state.department && this.state.semester)}
                    >
                      <option value="select"></option>
                      {this.props.departments && this.state.department && this.state.semester &&
                        this.props.departments[this.state.department].semesters[this.state.semester].map((sub, j) =>
                          <option
                            key={j}
                            value={sub.code}
                          >{sub.fullName}
                          </option>
                        )}
                    </select>
                  </div>
                </div>

                <div className='form-control'>
                  <div className='label-div'>
                    <label htmlFor="Subject">Password:</label>
                  </div>
                  <div className='form-input'>
                    <input type="password" name='password' onChange={this.handlePasswordChange} required />
                  </div>
                </div>

                {
                  this.state.error &&
                  <div className='form-errors'>{this.state.errorMessage}</div>
                }
                <div className='form-submit'>
                  <button
                    type='submit'
                    className={(this.props.departments && this.state.department && this.state.semester && this.state.subject && this.state.password) ? '' : 'disabled'}
                    disabled={!(this.props.departments && this.state.department && this.state.semester && this.state.subject && this.state.password)}
                  >Submit
                </button>
                </div>

              </form>
            </div>
          </div>
        )
    )
  }
}

export default Edit;