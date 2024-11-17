const endpoint = 'https://motor-server-tdi2.onrender.com/motor';

export const updateData = async (inputValue: any) => {
   try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(inputValue)
    })

    const data = await response.json()
  }
  catch(e) {
    console.error(e)
  }
}