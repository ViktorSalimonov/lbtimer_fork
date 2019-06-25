var c = document,
    d = () => {
        chrome.storage.local.get({
            l: []
        }, a => {
            var b = 0,
                g = 0,
                e = 0,
                f = ["#fc8", "#fb0"];
            c.getElementById("l").innerHTML = a.l.map(a => "<div style=background-color:" + (~a.indexOf("MAN") ? "#fff" : ~a.indexOf("dd") ? f[++e % 2] + " data-num=" + ++b : ~a.indexOf("cq") ? f[++g % 2] : ~a.indexOf("lea") ? (e++, "#f33") : "#fff") + ">" + a + "</div>").join("");
            scrollTo(0, c.body.scrollHeight)
        })
    };
c.getElementById("d").onclick = () => {
    chrome.storage.local.get({
        l: []
    }, a => {
        var b = c.getElementById("p");
        b.href = "data:text/plain," + encodeURIComponent(a.l.join("\n"));
        b.click()
    })
};
chrome.storage.onChanged.addListener(d);
c.body.addEventListener("keyup", a => {
    27 === a.keyCode && close()
});
d();