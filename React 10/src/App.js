import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';

const EmployeeForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employed, setEmployed] = useState(false);
  const [education, setEducation] = useState('');
  //const [expertise, setExpertise] = useState({ html: false, css: false , Javascript: false , NodeJS: false , ReactJS: false  });
   const [expertise, setExpertise] = useState(false);
   const [expertise3, setExpertise3] = useState(false);
   const [expertise4, setExpertise4] = useState(false);
   const [expertise5, setExpertise5] = useState(false);
   const [expertise6, setExpertise6] = useState(false);
   const [preferred1, setPreferred1] = useState(false);
   const [preferred2, setPreferred2] = useState(false);
   const [preferred3, setPreferred3] = useState(false);
  //const [preferred, setPreferred] = useState({ Front_End: false, Back_End: false , Full_Stack: false  });
  const [notes, setNotes] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleCheckboxChange = (event) => {
    setEmployed(event.target.checked);
  };

  const handleCheckboxChange2 = (event) => {
    setExpertise(event.target.checked);
  };

  const handleCheckboxChange3 = (event) => {
    setExpertise3(event.target.checked);
  };

  const handleCheckboxChange4 = (event) => {
    setExpertise4(event.target.checked);
  };

  const handleCheckboxChange5 = (event) => {
    setExpertise5(event.target.checked);
  };

  const handleCheckboxChange6 = (event) => {
    setExpertise6(event.target.checked);
  };

  const handleCheckboxChange7 = (event) => {
    setPreferred1(event.target.checked);
  };

  const handleCheckboxChange8 = (event) => {
    setPreferred2(event.target.checked);
  };

  const handleCheckboxChange9 = (event) => {
    setPreferred3(event.target.checked);
  };

  const handleEducation = (event) => {
    setEducation(event.target.value);
  };

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setEmployed(false);
    setEducation('');
    // setExpertise({ html: false, css: false , Javascript: false , NodeJS: false , ReactJS: false });
    setExpertise(false);
    setExpertise3(false);
    setExpertise4(false);
    setExpertise5(false);
    setExpertise6(false);
    setPreferred1(false);
    setPreferred2(false);
    setPreferred3(false);
    //setPreferred({ html: false, css: false , Javascript: false , NodeJS: false , ReactJS: false });
    setNotes('');
    setSubmittedData(null);
  };

  const handleSubmit = (values) => {
    console.log(values);
    setSubmittedData(values);
    // submit mengirim data ke backend atau menghandle data lainnya
  };

  const Card = () => {
    return (
      submittedData && (
        <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>Submitted Data</h3>
          <p><strong>First Name:</strong> {submittedData.firstName}</p>
          <p><strong>Last Name:</strong> {submittedData.lastName}</p>
          <p><strong>Employed:</strong> {submittedData.employed ? 'Yes' : 'No'}</p>
          <p><strong>Education:</strong> {submittedData.education}</p>
          <p><strong>Expertise:</strong> {submittedData.expertise ? 'Yes' : 'No'}</p> 
          {/* <p><strong>Expertise:</strong> {submittedData.expertise.join(', ')}</p> */}
          {/* <p><strong>Expertise:</strong> {submittedData.expertise ? 'Yes' : 'No'}</p> */}
          {/* <p><strong>Preferred:</strong> {submittedData.preferred.join(', ')}</p> */}
          <p><strong>Notes:</strong> {submittedData.notes}</p>
        </div>
      )
    );
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center' }}>Employee Form</h2>
      <Form
        onSubmit={handleSubmit}        
        render={({ handleSubmit }) => (
   
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="firstName">First Name:</label>
              <Field name="firstName">
                {({ input }) => {
                  // Set nilai ke dalam state saat input berubah
                  setFirstName(input.value);
                 return <input {...input} type="text" placeholder="First Name" style={{ width: '100%', padding: '5px', fontSize: '16px', borderRadius: '3px', border: '1px solid #ccc' }} />;
                }}
              </Field>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="lastName">Last Name:</label>
              <Field name="lastName">
                {({ input }) => {
                  // Set nilai ke dalam state saat input berubah
                 setLastName(input.value);
                 return <input {...input} type="text" placeholder="Last Name" style={{ width: '100%', padding: '5px', fontSize: '16px', borderRadius: '3px', border: '1px solid #ccc' }} />;
                }}
              </Field>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <Field
                  name="employed"
                  component="input"
                  type="checkbox"
                  value="agree"
                  checked={employed}
                  onChange={handleCheckboxChange}
                />{' '}
                Employed
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="education">Education:</label>
              <Field name="education" component="select" onChange={handleEducation} value={education} style={{ width: '100%', padding: '5px', fontSize: '16px', borderRadius: '3px', border: '1px solid #ccc' }}>
                <option value="">Select Education</option>
                <option value="sma">SMA</option>
                <option value="s1">S1</option>
                <option value="s2">S2</option>
                <option value="s3">S3</option>
              </Field>
            </div>

            <div style={{ marginBottom: '10px' }}>
            <label htmlFor="expertise">Expertise:</label><br/>
              <label>
                <Field
                  name="expertise"
                  component="input"
                  type="checkbox"
                  value="html"
                  checked={expertise}
                  onChange={handleCheckboxChange2}
                />{' '}
                HTML
              </label>
              <label style={{ marginLeft: '10px' }}>
                <Field
                  name="expertise3"
                  component="input"
                  type="checkbox"
                  value="css"
                  checked={expertise3}
                  onChange={handleCheckboxChange3}
                />{' '}
                CSS
              </label>
              <label style={{ marginLeft: '10px' }}>
                <Field
                  name="expertise4"
                  component="input"
                  type="checkbox"
                  value="Javascript"
                  checked={expertise4}
                  onChange={handleCheckboxChange4}
                />{' '}
                Javascript
              </label>
              <label style={{ marginLeft: '10px' }}>
                <Field
                  name="expertise5"
                  component="input"
                  type="checkbox"
                  value="NodeJS"
                  checked={expertise5}
                  onChange={handleCheckboxChange5}
                />{' '}
                NodeJS
              </label>
              <label style={{ marginLeft: '10px' }}>
                <Field
                  name="expertise6"
                  component="input"
                  type="checkbox"
                  value="ReactJS"
                  checked={expertise6}
                  onChange={handleCheckboxChange6}
                />{' '}
                ReactJS
              </label>
            </div>

            <div style={{ marginBottom: '10px' }}>
            <label htmlFor="preferred">Preferred Technology:</label><br/>
              <label>
                <Field
                  name="preferred1"
                  component="input"
                  type="checkbox"
                  value="Front_End"
                  checked={preferred1}
                  onChange={handleCheckboxChange7}
                />{' '}
                Front End
              </label>
              <label style={{ marginLeft: '10px' }}>
                <Field
                  name="preferred2"
                  component="input"
                  type="checkbox"
                  value="Back_End"
                  checked={preferred2}
                  onChange={handleCheckboxChange8}
                />{' '}
                Back End
              </label>
              <label style={{ marginLeft: '10px' }}>
                <Field
                  name="preferred3"
                  component="input"
                  type="checkbox"
                  value="Full_Stack"
                  checked={preferred3}
                  onChange={handleCheckboxChange9}
                />{' '}
                Full Stack
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="notes">Notes:</label>
              <Field name="notes">
                {({ input }) => {
                  // Set nilai ke dalam state saat input berubah
                  setNotes(input.value);
                 return <textarea {...input} rows="4" placeholder="Notes" style={{ width: '100%', padding: '5px', fontSize: '16px', borderRadius: '3px', border: '1px solid #ccc' }} />
                }}
              </Field>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Submit</button>
              <button type="button" onClick={handleReset} style={{ marginLeft: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Reset</button>
            </div>
          </form>
          
  
        )}
      />
      <Card />
      <div style={{ width: '100%', height: '200px', backgroundColor: '#ccc', margin: '20px auto' }}>
        {/* Di dalam render prop Form, tampilkan nilai yang dimasukkan di dalam Field "name" */}
        <div>First Name: {firstName}</div>
        <div>Last Name: {lastName}</div>
        <div>Agree: {employed ? 'true' : 'false'}</div>
        <div>Education: {education}</div>
        <div>Expertise: {expertise ? 'HTML' : ''} {expertise3 ? 'CSS' : ''} {expertise4 ? 'Javascript' : ''} {expertise5 ? 'NodeJS' : ''} {expertise6 ? 'ReactJS' : ''}</div>
        <div>Preferred Technology: {preferred1 ? 'Front End' : ''} {preferred2 ? 'Back End' : ''} {preferred3 ? 'Full Stack' : ''}</div>
        <div>Noted: {notes}</div>
      </div>
    </div>
  );
};

export default EmployeeForm;