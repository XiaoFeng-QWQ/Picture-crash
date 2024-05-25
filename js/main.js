const fileInput = document.getElementById('fileInput');
const base64Result = document.getElementById('base64Result');
const imageContainer = document.getElementById('imageContainer');
const settingsContainer = document.getElementById('corruptImageSettings');
// 监听转换按钮点击事件
document.getElementById('convertButton').addEventListener('click', convertToBase64);
// 监听损坏按钮点击事件
document.getElementById('corruptButton').addEventListener('click', corruptImage);
/**
 * 图片转换为Base64
 */
function convertToBase64() {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            base64Result.value = e.target.result;
            displayImage(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        alert('请选择要转换的图片！');
    }
}
/**
 * 显示图片
 * @param {string} base64Data - 图片的Base64数据
 */
function displayImage(base64Data) {
    const img = document.createElement('img');
    img.src = base64Data;
    imageContainer.innerHTML = '';
    imageContainer.appendChild(img);
}
/**
 * 图片崩坏
 */
function corruptImage() {
    const img = imageContainer.querySelector('img');
    if (img) {
        let base64Data = img.src.split(',')[1];
        const dataLength = base64Data.length;
        const startIndex = Math.floor(Math.random() * (dataLength - settingsContainer.querySelector('#startIndex').value));
        const offset = Math.floor(Math.random() * settingsContainer.querySelector('#offset').value) + 3;
        const charToModify = base64Data.charAt(startIndex);
        const modifiedChar = String.fromCharCode(charToModify.charCodeAt(0) + offset);
        base64Data = base64Data.substring(0, startIndex) +
            modifiedChar +
            base64Data.substring(startIndex + 1);
        const mimeType = img.src.split(';')[0].split(':')[1];
        const corruptedImg = new Image();
        corruptedImg.onload = function () {
            URL.revokeObjectURL(corruptedImg.src);
        };
        corruptedImg.src = `data:${mimeType};base64,${base64Data}`;
        corruptedImg.alt = '图片损坏了！';
        imageContainer.innerHTML = '';
        imageContainer.appendChild(corruptedImg);
        base64Result.value = corruptedImg.src;
    } else {
        alert('请先选择图片并转换为Base64！');
    }
}