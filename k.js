var b = document,
    k = chrome.runtime,
    r = b.getElementById("tasktype"),
    c = b.getElementById("aet"),
    l = b.querySelectorAll(".disab"),
    m = 1,
    d = 0,
    g = 0,
    t, n = 0,
    p, e, q = -1,
    f = b.getElementById("mainclock"),
    h = b.getElementById("startstop"),
    u = () => {
        var a = Date.now() - t - 1E3 * n++,
            c = (0 | d / 60) + ":" + ("0" + d++ % 60).slice(-2);
        b.title = f.textContent = c;
        p = setTimeout(u, 1E3 - a)
    };
k.onMessage.addListener(a => {
    switch (a.command) {
        case "tick":
            f.textContent = b.title = a.t;
            f.style.backgroundColor = a.c;
            break;
        case "reset":
            m = 0;
            q = a.tasktype;
            r.selectedIndex = q + 1;
            h.textContent = "AUTO";
            e = a.AET;
            for (a = c.length; a--;) {
                if (e == c[a].value) {
                    c.selectedIndex = a;
                    break
                }
                if (e > c[a].value) {
                    var d = b.createElement("option");
                    d.value = e;
                    d.textContent = (0 | e / 60) + ":" + ("0" + e % 60).slice(-2);
                    c.add(d, a + 1);
                    c.selectedIndex = a + 1;
                    break
                }
            }
            for (a = l.length; a--;) l[a].disabled = !0;
            g = 1;
            break;
        case "release":
            for (m = 1, f.style.backgroundColor = "#fff", f.textContent = b.title = "-:--", a = l.length; a--;) l[a].disabled = !1
    }
});
b.getElementById("submit").onclick = () => {
    m && g ? (clearTimeout(p), k.sendMessage({
        command: "addThis",
        time: d,
        AET: e,
        tasktype: q
    }), d = n = 0, t = Date.now(), u()) : k.sendMessage({
        command: "doSubmit"
    })
};
b.getElementById("reset").onclick = () => {
    clearTimeout(p);
    g = n = d = 0;
    f.textContent = b.title = "0:00";
    h.textContent = "START"
};
h.onclick = f.onclick = () => {
    m ? g ? (clearTimeout(p), n = g = 0, h.textContent = "START") : (t = Date.now(), u(), g = 1, h.textContent = "PAUSE") : k.sendMessage({
        command: "timer"
    })
};
r.onchange = () => {
    q = 0 | r.value
};
c.onchange = () => {
    e = 0 | c.value
}