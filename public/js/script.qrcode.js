// const base_url = 'http://localhost:3000/api'
// async function getinfo() {
//   const res = await fetch(base_url, { method: 'GET' })
//   const data = await res.json()
//   document.getElementsByClassName('speakeasy')[0].innerHTML = `
//   <img src="${data.data}"/>
//   <p id="base32">${data.base32}</p>`
// }
// getinfo()

document.getElementById('textCopy').onclick = () => {
  const textCopy = document.getElementById('textCopy')
  textCopy.disabled = true
  textCopy.innerText = 'Copyed'
  const base32 = document.getElementById('base32')
  navigator.clipboard.writeText(base32.innerText)
}
