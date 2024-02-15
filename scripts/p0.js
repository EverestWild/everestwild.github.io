$("#move_teabag").on("mousedown", e => {
    $("#bag").animate({
        top: 550
    });
});

$("#move_teabag").on("mouseup", e => {
    $("#bag").animate({
        top: 250
    });
});