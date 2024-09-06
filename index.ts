enum TypeOfObject {
    slides,
    contents
}
enum BackgroundTypes {
    color,
    picture
}
enum Size {
    width,
    height
}
type Presentation = {
    id: number,
    name: string,
    slidesCollection: SlidesCollection,
    owner: any
}
type SlidesCollection = {
    id: number,
    presentationId: number,
    slides: Slide[]
}
type Slide = {
    id: number,
    collectionId: number,
    index: number,
    contentObjects: any[],
    background: Background
}
type ObjectsSelection = {
    ids: number[],
    objectType: TypeOfObject
}
type TextObj = {
    text: string,
    x: number,
    y: number,
    size: Size,
    fontSize: number,
    family: string
}
type PictureObj = {
    b64: string,
    x: number,
    y: number,
    size: Size
}
type Background = {
    value: string,
    type: BackgroundTypes
}

// изменение названия презентации
function presentationNameChange(presentation:Presentation, newName: string): Presentation {
    return {
        ...presentation,
        name: newName
    }
}

// добавление/удаление слайда
function addSlide(slidesCollection:SlidesCollection, slide: Slide): SlidesCollection {
    let newSlidesCollection = slidesCollection;
    newSlidesCollection.slides.push(slide);
    return newSlidesCollection;
}
function deleteSlide(slidesCollection:SlidesCollection, slideToDelete: Slide): SlidesCollection {
    let collection = slidesCollection;
    let slideFound = false
    collection.slides.forEach(slide => {
        if (slideFound) {
            slide.index--
        }
        if (slide === slideToDelete) {
            slidesCollection.slides.push(slide);
            slideFound = true;
        }
    });
    return collection;
}

// изменение позиции слайда
function slideIndexSet(slide:Slide, newIndex: number): Slide {
    return {
        ...slide,
        index: newIndex
    }
}
function slidesOrderPushedByOne(slidesCollection: SlidesCollection, slideWithNewPosition: Slide): SlidesCollection {
    let newSlidesCollection = slidesCollection;
    let slideFound = false;
    let slideToMove1: Slide;
    let slideToMove2: Slide;
    newSlidesCollection.slides.forEach(slide => {
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
    return newSlidesCollection;
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
function objectPositionSet(object:TextObj | PictureObj, x, y): TextObj | PictureObj {
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

// изменение фона слайда
function slideBackgroundSet(slide:Slide, newBackground: Background): Slide {
    return {
        ...slide,
        background: newBackground
    }
}