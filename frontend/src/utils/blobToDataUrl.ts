const blobToDataUrl = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = function(evt: ProgressEvent<FileReader>) {
            resolve(evt?.target?.result as string);
        };

        reader.readAsDataURL(blob);
    });
}

export {
    blobToDataUrl
}