function submitHandler() {
  var formData = new FormData();
  var fileField = document.querySelector("input[type='file']");

  formData.append('username', 'abc123');
  formData.append('text', 'abc123');
  formData.append('audio_path', 'abc123');
  formData.append('text_2', 'abc123');
  formData.append('avatar', fileField.files[0]);

  fetch('http://localhost:8080/profile', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', JSON.stringify(response)));
}
