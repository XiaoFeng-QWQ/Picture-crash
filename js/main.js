const fileInput = document.getElementById('fileInput');
const base64Result = document.getElementById('base64Result');
const imageContainer = document.getElementById('imageContainer');
const settingsContainer = document.getElementById('corruptImageSettings');

/**
 * 图片转换为Base64
 */
function convertToBase64() {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64Data = e.target.result;
            base64Result.value = base64Data;
            displayImage(base64Data);
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
    clearImageContainer();
    imageContainer.appendChild(img);
}

/**
 * 清空图片容器
 */
function clearImageContainer() {
    imageContainer.innerHTML = '';
}

/**
 * 图片崩坏
 */
function corruptImage() {
    const img = imageContainer.querySelector('img');
    if (img) {
        let base64Data = img.src.split(',')[1];
        const numModifications = parseInt(settingsContainer.querySelector('#numModifications').value);
        const dataLength = base64Data.length;

        // 创建一个数组，存储要修改的位置
        const modificationIndices = [];
        for (let i = 0; i < numModifications; i++) {
            modificationIndices.push(Math.floor(Math.random() * dataLength));
        }

        // 修改Base64数据
        const corruptedBase64Data = base64Data.split('');
        modificationIndices.forEach(index => {
            const offset = Math.floor(Math.random() * parseInt(settingsContainer.querySelector('#offset').value));
            const charCode = corruptedBase64Data[index].charCodeAt(0) + offset;
            corruptedBase64Data[index] = String.fromCharCode(charCode);
        });

        // 生成损坏图片
        const mimeType = img.src.split(';')[0].split(':')[1];
        const corruptedImgSrc = `data:${mimeType};base64,${corruptedBase64Data.join('')}`;
        displayImage(corruptedImgSrc);
        base64Result.value = corruptedImgSrc;
    } else {
        alert('请先选择图片并转换为Base64！');
    }
}

/**
 * 替换字符串中指定位置的字符
 * @param {string} str - 要修改的字符串
 * @param {number} index - 要修改的位置
 * @param {string} char - 修改后的字符
 * @returns {string} - 修改后的字符串
 */
function replaceCharAt(str, index, char) {
    return str.substring(0, index) + char + str.substring(index + 1);
}