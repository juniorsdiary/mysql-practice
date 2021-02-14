interface IObject {
    [prop: string]: any
}

export const objectToJsonBuffer = function objectToJsonBuffer(object: IObject) {
    const jsonObject = JSON.stringify(object);
    return Buffer.from(jsonObject);
};
