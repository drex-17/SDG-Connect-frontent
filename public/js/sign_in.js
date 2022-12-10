document.addEventListener('DOMContentLoaded', () => {
  const URL = 'http://localhost:3000'

  document.querySelector('#sign_in').onclick = async (evt) => {
    const form = document.querySelector('form')
    let email = document.querySelector('#floatingInput');
    let password = document.querySelector('#floatingInput');
    
    const response = await fetch(`${URL}`, {
      method: 'POST',
      body: {email, password},
    });

    console.log(response)
  }
})