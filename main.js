============================= */
const fileInput = document.getElementById('fileInput');
const galleryContainer = document.getElementById('galleryContainer');


fileInput.addEventListener('change', (event) => {
const files = event.target.files;
Array.from(files).forEach(file => {
const reader = new FileReader();
reader.onload = (e) => {
const img = document.createElement('img');
img.src = e.target.result;
galleryContainer.appendChild(img);
};
reader.readAsDataURL(file);
});
});


document.getElementById('contactForm').addEventListener('submit', (e) => {
e.preventDefault();
alert('Mensagem enviada com sucesso!');
});