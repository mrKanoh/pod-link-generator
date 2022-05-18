const dropArea = document.querySelector('.containerDrop');
const dragText = dropArea.querySelector('h2');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('#input-file');
let files;

button.addEventListener('click', (e) => {
    input.click();
});

input.addEventListener('change', (e) => {
    files = input.files;
    dropArea.classList.add('active');
    showFiles(files);
    dropArea.classList.remove('active');
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('active');
    dragText.textContent = 'Suelta para generar los links'
})

dropArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropArea.classList.remove('active');
    dragText.textContent = 'Arrastra y suelta imágenes'
})

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove('active');
    dragText.textContent = 'Arrastra y suelta imágenes'
})

function showFiles(files) {
    if(files.length === undefined){
        processFile(files);
    }else {
        for(const file of files){
            processFile(file);
        }
    }
}

function processFile(file) {
    const docType = file.type;
    const validExtensions = ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'];
    if(validExtensions.includes(docType)){
        //Archivo válido
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener('load', e => {
            const image = `
                <div id="${id}" class="file-container">
                    <p>https://www.paris.cl/on/demandware.static/-/Sites/es_CL/dw2c967659/marketing/category-world-landing/<span>${file.name}</span></p>
                </div>
            `;
            const html = document.querySelector('#preview').innerHTML;
            document.querySelector('#preview').innerHTML = image + html;
        });
        fileReader.readAsDataURL(file);
        uploadFile(file, id);
    }else {
        //No es un archivo válido
        alert('No es un archivo válido');
    }
}

function uploadFile(){}