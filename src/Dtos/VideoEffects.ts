export enum VideoEffect {
    Basic, GrayScale
}

export const basicVideoProcessor = {
    processFrame: (inputFrame: any, outputFrame: any) => {
        const ctx = outputFrame.getContext('2d');
        ctx.drawImage(inputFrame, 0, 0);
    }
};

export const grayVideoProcessor = {
    processFrame: (inputFrame: any, outputFrame: any) => {
        const ctx = outputFrame.getContext('2d');
        ctx.filter = 'grayscale(100%)';
        ctx.drawImage(inputFrame, 0, 0);
    }
};