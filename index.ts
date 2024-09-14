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
    contentObjects: (TextObj | PictureObj)[],
    background: Background
}
type ObjectsSelection = {
    objectsIds: string[],
    slidesIds: string[]
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
function addSlide(collection: Slide[]): Slide[] {
    let newSlide: Slide;
    newSlide = {
        id: getUID(),
        contentObjects: [],
        background: getDefaultBackground()
    }
    let newCollection = collection;
    newCollection.push(newSlide);
    return newCollection;
}
function deleteSlide(collection: Slide[], slideIdToDelete: string): Slide[] {
    let newCollection = collection;
    for (let i = 0; i < newCollection.length; i++) {
        if (newCollection[i].id === slideIdToDelete) {
            newCollection.splice(i);
            break;
        }
    }
    return newCollection;
}

// изменение позиции слайда
function slidesOrderPushedByOne(collection: Slide[], slideId: string, positionTo: number): Slide[] {
    let newCollection = collection;
    let slideToMove: Slide;
    let indexNow = 0;
    for (const slide of collection) {
        if (slide.id === slideId) {
            slideToMove = slide;
            break;
        }
        indexNow++;
    };
    slideToMove = collection[indexNow];
    if (positionTo > indexNow) {
        for (let i = indexNow; i < positionTo; i++) {
            newCollection[i] = newCollection[i + 1]; 
        }
    }
    if (positionTo < indexNow) {
        for (let i = indexNow; i > positionTo; i--) {
            newCollection[i] = newCollection[i - 1]; 
        }
    }
    newCollection[positionTo] = slideToMove;
    return newCollection;
}

// добавление/удаление текста и картинки
function createText(slide: Slide, value: string): Slide {
    let newText: TextObj;
    newText = {
        x: 0,
        y: 0,
        size: {
            width: 100,
            height: 30
        },
        text: value,
        fontSize: 11,
        family: 'Times New Roman',
        color: 'black'
    }
    return {
        ...slide,
        contentObjects: [...slide.contentObjects, newText]
    }
}
function createPicture(slide: Slide, src: string): Slide {
    let newPic: PictureObj;
    newPic = {
        x: 0,
        y: 0,
        size: {
            width: 200,
            height: 200
        },
        src: src
    }
    return {
        ...slide,
        contentObjects: [...slide.contentObjects, newPic]
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
function textValueSet(text:TextObj, newText: string): TextObj {
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

function getUID(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);;
}

function getDefaultBackground(): Background {
    let background: Background;
    let defaultSolid: SolidBackground;
    defaultSolid = {
        color: 'white',
        type: 'solid'
    };
    background = {
        type: defaultSolid
    }
    return background;
}