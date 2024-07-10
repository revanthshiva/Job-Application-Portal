import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    resume: '',
    info: ''
  });

  const [database, setDatabase] = useState({
    databaseType:''
    
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setDatabase({
      ...database,
      databaseType:value
    })

  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/apply/${database.databaseType}`, formData);
      setMessage('Application submitted successfully.');
      document.getElementById('form').classList.add('hidden');
      console.log(response.data);
    } catch (error) {
      setMessage('There was an error submitting your application.');
      document.getElementById('form').classList.add('hidden');

      console.error('There is an API error', error);
    }
    console.log(`http://localhost:5000/apply/${database.databaseType}`)

  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center bg-slate-700 h-lvh">
          <div>
            <form onSubmit={handleSubmit} className='form gap-2 ' id='form' >
              <h1 className="text-2xl text-white text-center font-bold mb-5">Job Application</h1>
              <div>
                <label >Full Name</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  value={formData.name}
                />
              </div>
              <div>
                <label >Email Id</label>
                <input
                  type="email"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                />
              </div>
              <div>
                <label >Phone Number</label>
                <input
                  type="number"
                  onChange={handleChange}
                  name="phone"
                  value={formData.phone}
                />
              </div>
              <div>

                <label >Qualification</label>
                <select
                  onChange={handleChange}
                  name="qualification"
                  value={formData.qualification}
                >
                  <option value="">Select your Qualification</option>
                  <option value="Bachelor of Engineering">Bachelor of Engineering</option>
                  <option value="Bachelor of Arts">Bachelor of Arts</option>
                  <option value="Diploma">Diploma</option>
                  <option value="High School">High School</option>
                </select>
              </div>
              <div>

                <label >Resume (Google Drive Public Sharing Link)</label>
                <input
                  type="text"
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                />
              </div>
              <div>

                <label  >Additional Information</label>
                <textarea
                  onChange={handleChange}
                  name="info"
                  value={formData.info}
                  rows={3}
                  cols={32}
                ></textarea>
              </div>
              <div>
                <label htmlFor="mongoose">
                  <input
                    type="radio"
                    id="mongoose"
                    name="database"
                    value="mongoose"
                    onChange={handleChange}
                  />
                  Mongoose
                </label>
                <label htmlFor="sql" className='ms-2'>
                  <input
                    type="radio"
                    id="sql"
                    name="database"
                    value="sql"
                    onChange={handleChange}
                  />
                  SQL
                </label>
              </div>
              <button type='submit' className='mt-3'>Apply</button>
            </form>
            <h1 className='text-3xl text-white font-bold'>{message}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
