function dropHandler(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
        compressImage(files[i]);
    }
}

function compressImage(file) {
    var reader = new FileReader();

    reader.onload = function (e) {
        var image = new Image();
        image.onload = function () {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            canvas.toBlob(function (blob) {
                var compressedImage = new File([blob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now()
                });
                var compressedPreview = URL.createObjectURL(compressedImage);
                // showPreview(compressedPreview);
                generateDownloadLinks(compressedPreview, compressedImage);
            }, 'image/jpeg', 0.6);
        };
        image.src = e.target.result;
    };

    reader.readAsDataURL(file);
}


function generateDownloadLinks(previewSrc, file) {
    var previewContainer = document.getElementById('preview-container');
    var card = document.createElement('div');
    var links = document.createElement('ul');
    links.classList.add('links');
    card.classList.add('card'); // Agrega la clase "card" al contenedor
    var img = document.createElement('img');
    img.src = previewSrc;
    img.style.maxWidth = '100%';
    card.appendChild(img);
    card.appendChild(links)
    previewContainer.appendChild(card);


    //  links.innerHTML += '<li><a href="' + URL.createObjectURL(file) + '" download="' + file.name.replace(/\.[^/.]+$/, "") + '.jpg">JPEG - ' + file.name + '</a></li>';
    links.innerHTML += '<li><a href="' + URL.createObjectURL(file) + '" download="' + file.name.replace(/\.[^/.]+$/, "") + '.jpg">JPG</a></li>';


    if (typeof createImageBitmap !== "undefined") {
        createImageBitmap(file).then(function (imageBitmap) {
            var webpCanvas = document.createElement('canvas');
            webpCanvas.width = imageBitmap.width;
            webpCanvas.height = imageBitmap.height;
            var webpCtx = webpCanvas.getContext('2d');
            webpCtx.drawImage(imageBitmap, 0, 0);
            webpCanvas.toBlob(function (webpBlob) {
                var compressedWebP = new File([webpBlob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                    type: 'image/webp',
                    lastModified: Date.now()
                })

                // links.innerHTML += '<li><a href="' + URL.createObjectURL(compressedWebP) + '" download="' + file.name.replace(/\.[^/.]+$/, "") + '.webp">WEBP - ' + file.name + '</a></li>';
                links.innerHTML += '<li><a href="' + URL.createObjectURL(compressedWebP) + '" download="' + file.name.replace(/\.[^/.]+$/, "") + '.webp">WEBP</a></li>';


            }, 'image/webp', 0.6);
        });
    }
}