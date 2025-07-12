const register=(e)=>{
    e.preventDefault()
    const username=document.querySelector('input[name="username"]').value
    const email=document.querySelector('input[name="email"]').value
    const password=document.querySelector('input[name="password"]').value
    const DOB=document.querySelector('input[name="DOB"]').value
    const data={username:username,email:email,password:password,DOB:DOB}
    fetch('../registration',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(data) 
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        alert('redirecting to login page')
        window.location.href='/login'
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}