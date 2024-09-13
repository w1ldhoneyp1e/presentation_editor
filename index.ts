enum ObjectTypes {
    slides,
    contents
}
enum BackgroundTypes {
    color,
    picture
}
type Size = {
    width: number,
    height: number
}
type Presentation = {
    id: string,
    name: string,
    slides: Slide[]
}
type Slide = {
    id: string,
    index: number,    // Убрать, адаптировать остальной код под изменения
    contentObjects: (TextObj | PictureObj)[],
    background: Background
}
type ObjectsSelection = {
    ids: string[],
    objectType: ObjectTypes
}
type SlideObject = {
    x: number,
    y: number,
    size: Size
}
type TextObj = SlideObject & {
    text: string,
    fontSize: number,
    family: string,
    color: string
}
type PictureObj = SlideObject & {
    src: string
}
type Background = {
    type: SolidBackground | ImageBackground
}
type SolidBackground = {
    color: string,
    type: 'solid'
}
type ImageBackground = {
    src: string,
    type: 'image'
}

// изменение названия презентации
function presentationNameChange(presentation:Presentation, newName: string): Presentation {
    return {
        ...presentation,
        name: newName
    }
}

// добавление/удаление слайда
function addSlide(collection: Slide[], slide: Slide): Slide[] {
    let newCollection = collection;
    newCollection.push(slide);
    return newCollection;
}
function deleteSlide(collection: Slide[], slideIdToDelete: string): Slide[] {
    let newCollection = collection;
    let slideFound = false
    newCollection.forEach(slide => {
        if (slideFound) {
            slide.index--
        }
        if (slide.id === slideIdToDelete) {
            newCollection.push(slide);
            slideFound = true;
        }
    });
    return newCollection;
}

// изменение позиции слайда
function slideIndexSet(slide:Slide, newIndex: number): Slide {
    return {
        ...slide,
        index: newIndex
    }
}
function slidesOrderPushedByOne(collection: Slide[], slideWithNewPosition: Slide): Slide[] {
    let newCollection = collection;
    let slideFound = false;
    let slideToMove1: Slide;
    let slideToMove2: Slide;
    newCollection.forEach(slide => {
        if (slideFound) {
            slideToMove2 = slide;
            slide = slideToMove1;
            slideToMove1 = slideToMove2;
        }
        if (slide.index === slideWithNewPosition.index && !slideFound) {
            slideToMove1 = slide;
            slide = slideWithNewPosition;
            slideFound = true;
        }
    });
    return newCollection;
}

// добавление/удаление текста и картинки
function addText(slide: Slide, text: TextObj): Slide {
    return {
        ...slide,
        contentObjects: [...slide.contentObjects, text]
    }
}
function addPicture(slide: Slide, picture: PictureObj): Slide {
    return {
        ...slide,
        contentObjects: [...slide.contentObjects, picture]
    }
}

// изменение позиции текста/картинки
function objectPositionSet(object:TextObj | PictureObj, x: number, y: number): TextObj | PictureObj {
    return {
        ...object,
        x: x,
        y: y
    }
}

// изменение размера текста/картинки
function objectSizeSet(object:TextObj | PictureObj, size: Size): TextObj | PictureObj {
    return {
        ...object,
        size: size
    }
}

// изменение текста
function textSet(text:TextObj, newText: string): TextObj {
    return {
        ...text,
        text: newText
    }
}

// изменение размера текста
function textFontSizeSet(text:TextObj, newSize: number): TextObj {
    return {
        ...text,
        fontSize: newSize
    }
}

// изменение семейства шрифтов у текста
function textFamilySet(text:TextObj, newTextFamily: string): TextObj {
    return {
        ...text,
        family: newTextFamily
    }
}

function textColorSet(text:TextObj, newColor: string): TextObj {
    return {
        ...text,
        color: newColor
    }
}

// изменение фона слайда
function slideBackgroundSet(slide:Slide, newBackground: Background): Slide {
    return {
        ...slide,
        background: newBackground
    }
}