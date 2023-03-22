import React, { useEffect, useState } from "react";
import { supabase } from "./helper/supabaseClient.js";
import "./App.css";


import { Auth } from '@supabase/auth-ui-react'
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'




export default function App() {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    time: "",
    value: "",
    service: "",
    plate: "",
    location: "",
  });
  const [services, setServices] = useState([]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user)
    });

    getServices();
  }, [])

  async function getServices() {
    try {
      let { data: services, error } = await supabase
        .from('services')
        .select('*')
      console.log(services);
      setServices(services);
    } catch (error) {
      console.log('error', error)
    }
    }
  

  async function createService() {
    try {
      let { data: service, error } = await supabase
        .from('services')
        .insert([
          { time: formData.time, value: formData.value, service: formData.service, plate: formData.plate, location: formData.location },
        ])
      console.log(service);
      //window.location.reload()
    } catch (error) {
      console.log('error', error)
    }
  }

  async function deleteService(id) {
    try {
      let { data: service, error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
      console.log(service);
      window.location.reload()
    } catch (error) {
      console.log('error', error)
    }
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value.trim(),
    });
  }
  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }
  return (

    <div className="App">
      {
        user ?
          <button  class="logout" onClick={logout}>Log-out</button> : null
      }
      <h1>Carvuk</h1>
      
        {
          user ? 
            <div >
              <div >
                
                <div class="container">

                  <form>
                    <label for="time">Hora:</label><br/>
                    <input onChange={handleChange} type="date" id="time" name="time" /><br/>
                    <label for="value">Valor:</label><br/>
                    <input onChange={handleChange} type="text" id="value" name="value" />
                    <label for="service">Servicio:</label><br/>
                    <input onChange={handleChange} type="text" id="service" name="service" />
                    <label for="plate">Patente:</label><br/>
                    <input onChange={handleChange} type="text" id="plate" name="plate" />
                    <label for="location">Direccion:</label><br/>
                    <input onChange={handleChange} type="text" id="location" name="location" />
                    <br/>
                    <button type="button" onClick={createService}>Agregar</button>
                  </form>
                </div>            
              </div>
              <div >
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Value</th>
                    <th scope="col">Service</th>
                    <th scope="col">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {services? 
                  (
                    services.map((service) => {
                      return (
                        <tr>
                          <th scope="row">1</th>
                          <td>{service.value}</td>
                          <td>{service.service}</td>
                          <td>{service.location}</td>
                          <button onClick={() => deleteService(service.id)}>Delete</button>
                        </tr>
                      )}
                    ))
                   : null}
                  
                  
                </tbody>
              </table>
              </div>
            </div>
              
          
          :
          (<Auth
          
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
        />)
        }
        
    </div>
)}


// export default function App() {

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   console.log(formData);

//   const [user, setUser] = useState(null);


//   function handleChange(event) {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value.trim(),
//     });
//   }

//   const login = async () => {

//     const { data, error } = await supabase.auth.signIn({
//       email: formData.email,
//       password: formData.password,
//     })
//     console.log(user);
  
//   };
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const {data: { session },} = await supabase.auth.getSession()
//   //     setUser(session?.user);
//   //     console.log(session);
//   //   }
  
//   //   fetchData()
//   //   }, []);


//   return (
    // <div className="App">
    //   <h1>Carvuk</h1>
    //   <div class="container">
    //     <h2>Log-in</h2>
    //     <form>
    //       <label for="fname">Email:</label><br/>
    //       <input onChange={handleChange} type="text" id="fname" name="fname" /><br/>
    //       <label for="lname">Password:</label><br/>
    //       <input onChange={handleChange} type="password" id="password" name="password" />
    //       <br/>
    //       <button type="button" onClick={login}>Log-in</button>
    //     </form>
    //   </div>

    // </div>
//   );
// }