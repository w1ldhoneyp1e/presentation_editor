type Size = {
    width: number,
    height: number
}
type Position = {
    x: number,
    y: number
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
    id: string,
    position: Position,
    size: Size
}
type TextObj = SlideObject & {
    text: string,
    fontSize: number,
    family: string,
    hexColor: string
}
type PictureObj = SlideObject & {
    src: string
}
type Background = SolidBackground | ImageBackground
type SolidBackground = {
    hexColor: string,
    type: 'solid'
}
type ImageBackground = {
    src: string,
    type: 'image'
}

export {
    Size,
    Position,
    Presentation,
    Slide,
    ObjectsSelection,
    SlideObject,
    TextObj,
    PictureObj,
    Background,
    SolidBackground,
    ImageBackground,
};