const URL = location.origin; // root domain

// redirects
$("#go-p0").on("click", e => {
    window.location.assign(`${URL}/pages/p0.html`);
});

$("#src-p0").on("click", e => {
    e.preventDefault();
    window.location.href = "../downloads/p0.zip";
});

$("#det-p0").on("click", e => {
    e.preventDefault();
    window.location.href = "../downloads/p0 details.zip";
});

$("#go-p1").on("click", e => {
    window.location.assign(`${URL}/pages/p1.html`);
});

$("#go-p2").on("click", e => {
    window.location.assign(`${URL}/pages/p2.html`);
});