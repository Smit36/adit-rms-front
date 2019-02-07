import React from 'react';
import './Edit.css';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: undefined,
      semester: undefined,
      subject: undefined,
      email: undefined,
      password: undefined,
      error: undefined
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
      <div className='edit-container'>
        <div className='form-container'>
          <form className='form' onSubmit={this.handleSubmit}>

            <div className='form-control'>
              <div className='label-div'>
                <label htmlFor="branch">Select branch: </label>
              </div>
              <div className='form-input'>
                <select name="branch">
                  <option value="select"></option>
                  <option value="automobile">Automobile Eng.</option>
                  <option value="computer">Computer Eng.</option>
                  <option value="mechanical">Mechanical Eng.</option>
                  <option value="information">Information and Technology</option>
                </select>
              </div>
            </div>

            <div className='form-control'>
              <div className='label-div'>
                <label htmlFor="semester">Semester:</label>
              </div>
              <div className='form-input'>
                <select name="semester">
                  <option value="select"></option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                </select>
              </div>
            </div>

            <div className='form-control'>
              <div className='label-div'>
                <label htmlFor="Subject">Subject:</label>
              </div>
              <div className='form-input'>
                <select name="subject">
                  <option value="select"></option>
                  <option value="computer-graphics">Computer Graphics</option>
                  <option value="net">.NET</option>
                  <option value="advanced-java">Advanced JAVA</option>
                  <option value="web-technology">Web Technology</option>
                </select>
              </div>
            </div>

            <div className='form-control'>
              <div className='label-div'>
                <label htmlFor="Subject">Email:</label>
              </div>
              <div className='form-input'>
                <input type="email" name='email' />
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