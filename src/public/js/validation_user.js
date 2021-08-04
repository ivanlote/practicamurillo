const socket = io()

const user = document.getElementById('user')
const contentUser = document.getElementById('enter-user')
const messageInput = document.getElementById('message-input')
const imgProfile = document.getElementById('img-profile-change')
const imgUserProfile = document.getElementById('img-user-profile')

user.addEventListener('keyup', (event) => {
  if (user.value !== '') {
    messageInput.textContent = 'Presionar Enter para ingresar'
    messageInput.style.color = '#11FA2D'
  } else {
    messageInput.textContent = 'Nombre de usuario vacío'
    messageInput.style.color = '#FA0404'
  }

  if (event.key === 'Enter') {
    if (user.value === '') {
      messageInput.textContent = 'Nombre de usuario vacío'
      messageInput.style.color = '#FA0404'
    } else {
      socket.emit('new-user', { user: user.value, img: imgUserProfile.src }, isConnected => {
        if (isConnected) {
          contentUser.classList.add('close-login')
        } else {
          messageInput.textContent = 'Nombre de usuario existente'
          messageInput.style.color = '#FA0404'
        }
      })
    }
  }
})

imgProfile.addEventListener('change', () => {
  let file = imgProfile.files[0]
  if (file.type.indexOf('image') === -1) {
    messageInput.textContent = 'Foto de perfil no es una imagen'
    messageInput.style.color = '#FA0404'
  } else {
    let reader = new window.FileReader()
    reader.onload = event => {
      imgUserProfile.src = event.target.result
    }
    reader.readAsDataURL(file)
    messageInput.textContent = 'Presionar Enter para ingresar'
    messageInput.style.color = '#04FA69'
  }
})