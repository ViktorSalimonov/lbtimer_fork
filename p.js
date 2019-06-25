var d = document,
    e, f, g, h = chrome.runtime,
    j = d.querySelectorAll(".auto"),
    k = d.getElementById("pl"),
    l = d.getElementById("onoff"),
    m = d.getElementById("LB"),
    n = d.querySelector("label"),
    p = () => {
        e = ++e % 3;
        j[0].dataset.is = ["OFF", "ON", "STOP"][e]
    },
    q = () => {
        f = ++f % 2;
        j[1].dataset.is = ["OFF", "ON"][f]
    },
    r = () => {
        g = ++g % 2;
        j[2].dataset.is = ["OFF", "ON"][g]
    },
    s = a => {
        k.innerHTML = ["&#9654;", "||"][a];
        k.title = ["Unp", "P"][a] + "ause the timer"
    },
    u = a => {
        a = a + .5 | 0;
        return 60 <= a ? (0 | a / 60) + "h " + ("0" + a % 60).slice(-2) + "m" : a % 60 + "m"
    },
    v = a => {
        l.checked = a;
        n.title = "Turn LBTimer o" + (a ? "ff" : "n");
        m.style.backgroundColor = a ? "#ff9800" : "#ddd"
    };
h.getBackgroundPage(a => {
    v(a.x);
    d.getElementById("tmr").style.visibility = a.F & 1 ? "visible" : "hidden";
    e = 128 & a.o.oflags ? 16384 & a.o.oflags ? 1 : 0 : 2;
    p();
    f = 2048 & a.o.oflags ? 0 : 1;
    q();
    g = 64 & a.o.oflags ? 0 : 1;
    r();
    var t = 512 & a.o.oflags ? Math.abs(a.B - a.E + 1) : a.E - 1,
        w = "",
        t = (0 | t / 60) + ":" + ("0" + t % 60).slice(-2);
    d.getElementById("tim").textContent = t;
    s(a.F & 16 ? 0 : 1);
    a.aH(a.aa, b => {
        if (!b.error) {
            w += "<tr><td colspan=3>" + ~~b.name.slice(6) + " - " + [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][~~b.name.slice(4, 6)] + " - " + b.name.slice(0, 4);
            b = JSON.parse(b.description);
            for (var t = 0, x = 0, c = 0; 7 > c; c++) b[2 * c + 1] && (w += "<tr><td>" + "DB EXP IRR RR SXS TTR URL".split(" ")[c] + "<td>" + u((1024 & a.o.oflags ? b[2 * c] : b[14 + c]) / 60) + "<td>" + b[2 * c + 1], t += 1024 & a.o.oflags ? b[2 * c] : b[14 + c], x += b[2 * c + 1]);
            w += '<tr><td>TOT<td title="Earnings: ' + (a.o.payrate * t / 3600).toFixed(2) + '">' + u(t / 60) + "<td>" + x;
            d.getElementById("ts").innerHTML = w
        }
    });
    j[0].onclick = () => {
        p();
        h.sendMessage({
            command: "toggleAuto",
            auto: e
        })
    };
    j[1].onclick = () => {
        q();
        h.sendMessage({
            command: "toggleAcq",
            auto: f
        })
    };
    j[2].onclick = () => {
        r();
        h.sendMessage({
            command: "toggleRel",
            auto: g
        })
    };
    m.onclick = () => {
        h.sendMessage({
            command: "showPanel"
        });
        close()
    };
    d.getElementById("pl").onclick = () => {
        h.sendMessage({
            command: "timer"
        }, s)
    };
    d.getElementById("tim").onclick = () => {
        h.sendMessage({
            command: "clock"
        })
    };
    d.getElementById("more").onclick = () => {
        h.sendMessage({
            command: "od",
            which: "settingsscreen"
        })
    };
    l.onchange = () => {
        h.sendMessage({
            command: "activate"
        }, v)
    }
});
d.getElementById("hl").onclick = () => {
    chrome.tabs.create({
        url: "https://lbtimer.github.io/help"
    })
};
h.onMessage.addListener(a => {
    "tick" == a.command && (d.getElementById("tim").textContent = a.t, d.getElementById("tim").style.backgroundColor = a.c)
});