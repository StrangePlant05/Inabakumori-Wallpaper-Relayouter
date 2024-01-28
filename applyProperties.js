window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        if (properties.backgroundbrightness) {
            background.style.filter = `brightness(${properties.backgroundbrightness.value / 100})`
        }
        if (properties.audiovisualizerypos) {
            audiovisualizerypos = parseInt(properties.audiovisualizerypos.value);
        }
        if (properties.enabledragging) {
            draggingEnabled = properties.enabledragging.value;
        }
    },
};