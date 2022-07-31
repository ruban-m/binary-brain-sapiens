function check() {
  if (document.getElementById('password').value == document.getElementById('confirm_password').value) {
    document.getElementById('message').style.color = 'green'
    document.getElementById('message').innerHTML = '✔️Password'
    document.getElementById('confirm_password').style.cssText = 'outline: none !important; border: 1.5px solid #6c63ff;'
  } else {
    document.getElementById('message').style.color = 'red'
    document.getElementById('message').innerHTML = '❌Password'
    document.getElementById('confirm_password').style.cssText = 'outline: none !important; border: 1.5px solid red;'
  }
}
