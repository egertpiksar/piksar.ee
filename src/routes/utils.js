// Preload images
export function preloadFonts(id) {
    return new Promise((resolve) => {
        WebFont.load({
            typekit: {
                id: id
            },
            active: resolve
        });
    });
};

export function randomNumber(min, max){
    Math.floor(Math.random() * (max - min + 1)) + min;
}