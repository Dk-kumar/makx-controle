const endpoint = 'https://motor-server-tdi2.onrender.com';

export const updateData = async (inputValue: any) => {
   try {
    const response = await fetch(endpoint +"/motor", {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(inputValue)
    });
    return response.json();
  }
  catch(e) {
    console.error(e)
  }
}

export const requestSignIn = async (formData: object) =>{
  try{
    const response = await fetch(endpoint + "/signin", {
      method: 'post',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify(formData)
    });
    return await response.json();
  }
  catch(e){
    console.log("Error from requestSignIn", e);
  }
}

export const requestSignUp = async (formData: object) =>{
  try{
    const response = await fetch(endpoint +"/signup", {
      method: 'post',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify(formData)
    });
    return await response.json();
  }
  catch(e){
    console.log(e);
  }
}

export const requestAddDevice = async (formData: object) =>{
  try{
    const response = await fetch(endpoint +"/adddevice", {
      method: 'post',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify(formData)
    });
    return await response.json();
  }
  catch(e){
    console.log(e);
  }
}