// изменение названия презентации
function changePresentationName(presentation, newName) {
    return Object.assign(Object.assign({}, presentation), { name: newName });
}
// добавление/удаление слайда
function addSlide(collection) {
    const newSlide = {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    };
    return [...collection, newSlide];
}
function deleteSlide(collection, slideIdToDelete) {
    // const newCollection = collection;
    // for (let i = 0; i < newCollection.length; i++) {
    //     if (newCollection[i].id === slideIdToDelete) {
    //         newCollection.splice(i);
    //         break;
    //     }
    // }
    return [...collection].filter((slide) => slide.id !== slideIdToDelete);
    ;
}
// изменение позиции слайда
function changeSlidePosition(collection, slideId, positionToMove) {
    const slideToMove = collection.find(s => s.id === slideId);
    const originalIndex = collection.indexOf(slideToMove);
    const newCollection = [...collection];
    newCollection.splice(originalIndex, 1);
    newCollection.splice(positionToMove, 0, slideToMove);
    return newCollection;
}
// добавление/удаление текста и картинки
function addText(slide) {
    const newText = {
        id: getUID(),
        position: {
            x: 0,
            y: 0
        },
        size: {
            width: 100,
            height: 30
        },
        text: '',
        fontSize: 11,
        family: 'Times New Roman',
        hexColor: 'black'
    };
    return Object.assign(Object.assign({}, slide), { contentObjects: [...slide.contentObjects, newText] });
}
function addPicture(slide, src) {
    const newPic = {
        id: getUID(),
        position: {
            x: 0,
            y: 0
        },
        size: {
            width: 200,
            height: 200
        },
        src: src
    };
    return Object.assign(Object.assign({}, slide), { contentObjects: [...slide.contentObjects, newPic] });
}
// изменение позиции текста/картинки
function setObjectPosition(object, _position) {
    return Object.assign(Object.assign({}, object), { position: _position });
}
// изменение размера текста/картинки
function setObjectSize(object, size) {
    return Object.assign(Object.assign({}, object), { size: size });
}
// изменение текста
function setTextValue(text, newText) {
    return Object.assign(Object.assign({}, text), { text: newText });
}
// изменение размера текста
function setTextFontSize(text, newSize) {
    return Object.assign(Object.assign({}, text), { fontSize: newSize });
}
// изменение семейства шрифтов у текста
function setTextFamily(text, newTextFamily) {
    return Object.assign(Object.assign({}, text), { family: newTextFamily });
}
function setTextColor(text, newColor) {
    return Object.assign(Object.assign({}, text), { hexColor: newColor });
}
// изменение фона слайда
function setSlideBackground(slide, newBackground) {
    return Object.assign(Object.assign({}, slide), { background: newBackground });
}
function getUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
function getDefaultBackground() {
    const defaultSolid = {
        hexColor: 'white',
        type: 'solid'
    };
    return defaultSolid;
}
export { changePresentationName, addSlide, deleteSlide, changeSlidePosition, addText, addPicture, setObjectPosition, setObjectSize, setTextValue, setTextFontSize, setTextFamily, setTextColor, setSlideBackground, getUID, };
