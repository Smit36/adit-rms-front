import React from 'react';
import './Edit.css';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      department: undefined,
      semester: undefined,
      subject: undefined,
      email: undefined,
      password: undefined,
      error: undefined
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSemesterChange = this.handleSemesterChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const inputs = {
      branch: e.target.elements.branch.value,
      semester: e.target.elements.semester.value,
      subject: e.target.elements.subject.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    }
    if (inputs.branch === 'select' || inputs.semester === 'select' || inputs.subject === 'select') {
      this.setState(() => ({ error: 'All fields are necessary' }));
    } else if (inputs.email === '') {
      this.setState(() => ({ error: 'Email is required' }))
    } else if (inputs.password === '') {
      this.setState(() => ({ error: 'Password is required' }))
    }
  }

  handleDepartmentChange(e) {
    const department = e.target.value !== 'select' ? e.target.value : undefined;
    this.setState(() => ({ department, semester: undefined }));
  }

  handleSemesterChange(e) {
    const semester = e.target.value !== 'select' ? e.target.value : undefined;
    this.setState(() => ({ semester }));
  }

  render() {
    return (
      <div className='edit-container'>
        <div className='form-container'>
          <form className='form' onSubmit={this.handleSubmit}>

            <div className='form-control'>
              <div className='label-div'>
                <label htmlFor="branch">Department: </label>
              </div>
              <div className='form-input'>
                <select name="branch" onChange={this.handleDepartmentChange}>
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
                <select name="semester" onChange={this.handleSemesterChange}>
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
                <select name="subject" disabled={!(this.props.departments && this.state.department && this.state.semester)}>
                  <option value="select"></option>
                  {this.props.departments && this.state.department && this.state.semester &&
                    this.props.departments[this.state.department].semesters[this.state.semester].map((sub, j) =>
                      <option key={j} value={sub.code}>{sub.fullName}</option>
                    )}
                </select>
              </div>
            </div>

            <div className='form-control'>
              <div className='label-div'>
                <label htmlFor="Subject">Password:</label>
              </div>
              <div className='form-input'>
                <input type="password" name='password' />
              </div>
            </div>

            {
              this.state.error &&
              <div className='form-errors'>{this.state.error}</div>
            }
            <div className='form-submit'>
              <button type='submit'>Submit</button>
            </div>

          </form>
        </div>
      </div>
    )
  }
}

export default Edit;