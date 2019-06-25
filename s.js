/** @license (c)2014-2017 Ivan Nokonoko - See LICENSE * highlighting based on original Javascript code by Chirp Internet: www.chirp.com.au*/
if (!document.getElementById("lb-panel")) {
    var d = document,
        i = d.createElement("div");
    d.body.appendChild(i);
    i.outerHTML = '<style>#lb-qs,#lb-u{-webkit-appearance:none;min-width:200px;width:200px!important;height:6px;max-height:6px!important;min-height:6px!important;background:#CCC;padding:0;border:0;display:block;margin:auto;box-shadow:none;overflow:visible}#lb-u::-webkit-slider-thumb{-webkit-appearance:none;width:10px;height:20px;background-color:#095}#lb-qs::-webkit-slider-thumb{-webkit-appearance:none;width:10px;height:20px;background-color:#88C}input:focus{outline:0;border:none}.lblactv{font-weight:700}.lb-qws{font:700 15px arial;color:#000;float:none}label.lb-f{font:700 13px arial;color:#000;display:inline;border:1px solid grey;padding:0 3px;clear:none;float:none;margin:0 2px;cursor:pointer}input[type=checkbox].lb-f{display:none}input[type=checkbox].lb-f:checked+label{background-color:#ffd5d8;border:1px solid #c41a28}.lb-tbl{border:none;text-align:center;padding:2px;margin:0!important;direction:ltr!important;background-color:#e5e5e5}.lb-sld{width:200px;min-width:200px;max-width:200px;height:22px;min-height:22px;max-height:22px;background-repeat:no-repeat;background-position:center;margin:auto;display:flex}</style><div style="position:fixed;bottom:0;top:initial!important;min-width:550px;max-height:150px;margin:0 30%;padding:5px;border:solid 2px grey;border-bottom-style:none;border-radius:5px 5px 0 0;background-color:#e5e5e5;z-index:2147483647"id=lb-panel><div style=position:absolute;left:0;top:0;color:#00F;cursor:pointer><span id=lb-rl title="Reload this LP">&#x27f3;</span></div><div style=position:absolute;left:initial!important;right:0;top:0;color:#00F;cursor:pointer><span id=lb-say title="Hide/show comment"data-on=0>&#64;</span> <span id=lb-hd title="Hide/show ratings">&#x25bc;</span></div><div style=text-align:center;float:none><span style=font-family:arial;font-size:15px;color:#000;display:inline;cursor:pointer;float:none id=lb-lbl class=lblactv></span><span style="font:15px arial;color:#000;display:none;float:none"id=lb-dvdr>/</span> <span style=font-family:arial;font-size:15px;color:#000;display:none;cursor:pointer;float:none id=lb-lbl2></span>- <span style=display:none;cursor:pointer;float:none id=lb-srchbfr>&lt;</span> <span style=display:inline;float:none id=lb-q></span><span style=display:none;cursor:pointer;float:none id=lb-srchaft>&gt;</span><br></div><table id=lb-rtng class=lb-tbl style=width:100% data-on=1><tr dir=ltr><td class="lb-tbl lb-util"><div class=lb-sld id=lb-u-div><input type=range min=0 max=9 step=1 id=lb-u value=0 style=direction:ltr!important;padding:0!important></div><td class="lb-tbl lb-qlty"><div class=lb-sld id=lb-q-div><input type=range min=0 max=9 step=1 id=lb-qs value=0 style=direction:ltr!important;padding:0!important></div><tr dir=ltr><td class="lb-tbl lb-util"><span style="font:700 16px arial;color:#095"id=lb-Ulbl>N/A</span><td class="lb-tbl lb-qlty"><span style="font:700 16px arial;color:#88C"id=lb-Qlbl>N/A</span><tr dir=ltr><td class=lb-tbl><div id=lb-flags-div style=text-align:left></div><td class=lb-tbl><span style="font:14px arial;color:#2196F3;cursor:pointer"id=seldup>select dupes</span> <span style="font:14px arial;color:#2196F3;cursor:pointer;display:none"id=findup>finish selecting dupes</span> <span id=mrkdup style=display:none><input type=checkbox class=lb-f id=chkdup><label class=lb-f for=chkdup>Dupe of:<span id=duplbl></span></label></span><tr dir=ltr><td class=lb-tbl colspan=2><textarea style=width:100%;display:none;background-color:#FFF;color:#000 id=lb-cmnt placeholder="Write your comment here..."></textarea></table></div>';
    var j, k, l, m = "",
        n = "",
        o, p, q, r = d.getElementById("lb-u"),
        s = d.getElementById("lb-qs"),
        t = d.getElementById("lb-cmnt"),
        u = d.getElementById("lb-rtng"),
        v = d.getElementById("seldup"),
        w = d.getElementById("findup"),
        x = d.getElementById("mrkdup"),
        y = d.getElementById("chkdup"),
        z = d.getElementById("lb-Ulbl"),
        A = d.getElementById("lb-Qlbl"),
        B = d.getElementById("lb-lbl"),
        C = d.getElementById("lb-lbl2"),
        D = d.getElementsByClassName("lb-qlty"),
        E = d.getElementsByClassName("lb-util"),
        F, G = [],
        H = chrome.runtime,
        I = [],
        J = [],
        K = {},
        L = 0,
        M = -1,
        N, O = {
            3: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAWAQMAAAC/okGCAAAAA3NCSVQICAjb4U/gAAAABlBMVEUAAAB3d3daxsy0AAAAAXRSTlMAQObYZgAAABdJREFUKFNjOMCAABJIbGaGUZlRGbwyAMz7EtOnllVVAAAAAElFTkSuQmCC')",
            4: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAWAQMAAAC/okGCAAAAA3NCSVQICAjb4U/gAAAABlBMVEUAAAB3d3daxsy0AAAAAXRSTlMAQObYZgAAABpJREFUKFNjOMAAARJQ2gBKMzOMyozK4JUBAGDGFvPGVZ90AAAAAElFTkSuQmCC)",
            5: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAWAQMAAAC/okGCAAAAA3NCSVQICAjb4U/gAAAABlBMVEUAAAB3d3daxsy0AAAAAXRSTlMAQObYZgAAABpJREFUKFNjOMAAAhJIpAGYZGYYlRmVwSsDAKqkGQOLI5KzAAAAAElFTkSuQmCC)",
            6: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAWAQMAAAC/okGCAAAAA3NCSVQICAjb4U/gAAAABlBMVEUAAAB3d3daxsy0AAAAAXRSTlMAQObYZgAAAB1JREFUKFNjOMAABAYgAsRiBjF4GMCsUZlRGbwyADIEJq1HrFshAAAAAElFTkSuQmCC)",
            8: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAWAgMAAAD4AjtSAAAAA3NCSVQICAjb4U/gAAAACVBMVEUAAAB3d3eZmZnzzOmPAAAAAXRSTlMAQObYZgAAAC9JREFUOI1jCGAAA0YHBiQggsxhCEDhsTIMhBamBmQtGshaoFKjWka1jGoZfBkZAKOEKD1I5X5dAAAAAElFTkSuQmCC)",
            10: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAWAgMAAAD4AjtSAAAAA3NCSVQICAjb4U/gAAAACVBMVEUAAAB3d3eZmZnzzOmPAAAAAXRSTlMAQObYZgAAADJJREFUOMtjCGAAAREGGGB0gDNZ4SyGAAYkUbpr4UJoWYDQsgCuhWtUy6iWUS2DMyMDAOubKysA1bU0AAAAAElFTkSuQmCC)"
        },
        P = function () {
            H.sendMessage({
                command: "fl",
                side: j,
                result: o,
                fl: this.value
            })
        },
        Q = function () {
            this.dataset.on = "0" == this.dataset.on ? "1" : "0";
            R()
        },
        R = () => {
            for (var a = d.getElementsByClassName("lb-qws"), c = a.length, e = [], b; c--;) "1" == a[c].dataset.on && (e[e.length] = a[c].textContent);
            N = e.length ? new RegExp("(" + e.join("|") + ")", "i") : "";
            for (a = d.getElementsByClassName("lb-hltd"); a.length && (b = a[0]);) c = b.parentNode, c.replaceChild(b.firstChild, b), c.normalize();
            d.getElementById("lb-srchbfr").style.display = N ? "inline" : "none";
            d.getElementById("lb-srchaft").style.display = N ? "inline" : "none";
            N && S(d.body)
        },
        S = a => {
            var c, e;
            if (a && N && !/^(?:SCRIPT|FORM|STYLE|TEXTAREA)$/i.test(a.nodeName) && "lb-hltd" !== a.className) {
                if (a.hasChildNodes())
                    for (var b = 0; b < a.childNodes.length; b++) S(a.childNodes[b]);
                3 === a.nodeType && (c = a.textContent) && (e = N.exec(c)) && (b = e[0].toLowerCase(), K[b] = K[b] || "#ff5 #9ff #f99 #99f #9f9 #f9f #bb6 #6ff".split(" ")[L++ % 8], c = d.createElement("span"), c.appendChild(d.createTextNode(e[0])), c.style.backgroundColor = K[b], c.className = "lb-hltd", c.style.fontStyle = "inherit", c.style.color = "#000", b = a.splitText(e.index), b.textContent = b.textContent.substring(e[0].length), a.parentNode.insertBefore(c, b))
            }
        };
    r.oninput = () => {
        var a = r.value;
        z.textContent = I[a];
        H.sendMessage({
            command: "uorq",
            uorq: "u",
            side: j,
            result: o,
            val: a
        });
        a /= r.max;
        r.style.backgroundImage = "-webkit-gradient(linear,0 0,100% 0,color-stop(" + a + ",#095),color-stop(" + a + ",#CCC))"
    };
    s.oninput = () => {
        var a = s.value;
        A.textContent = J[a];
        H.sendMessage({
            command: "uorq",
            uorq: "q",
            side: j,
            result: o,
            val: a
        });
        a /= s.max;
        s.style.backgroundImage = "-webkit-gradient(linear,0 0,100% 0,color-stop(" + a + ",#88C),color-stop(" + a + ",#CCC))"
    };
    d.getElementById("lb-rl").onclick = () => {
        H.sendMessage({
            command: "rl",
            side: j,
            result: o
        })
    };
    d.getElementById("lb-hd").onclick = function () {
        var a = "1" == u.dataset.on;
        u.dataset.on = a ? "0" : "1";
        u.style.display = a ? "none" : "table";
        this.innerHTML = a ? "&#x25b2" : "&#x25bc"
    };
    d.getElementById("lb-say").onclick = function () {
        var a = "0" == this.dataset.on;
        t.style.display = a ? "block" : "none";
        this.dataset.on = a ? "1" : "0";
        a && t.focus()
    };
    d.getElementById("lb-srchbfr").onclick = () => {
        var a = d.getElementsByClassName("lb-hltd");
        0 > --M && (M = a.length - 1);
        a[M].scrollIntoView()
    };
    d.getElementById("lb-srchaft").onclick = () => {
        var a = d.getElementsByClassName("lb-hltd");
        ++M >= a.length && (M = 0);
        a[M].scrollIntoView()
    };
    t.oninput = () => {
        H.sendMessage({
            command: "comment",
            side: j,
            result: o,
            comment: t.value
        })
    };
    v.onclick = () => {
        H.sendMessage({
            command: "seldup",
            side: j,
            result: o
        });
        v.style.display = "none";
        w.style.display = "inline"
    };
    w.onclick = () => {
        H.sendMessage({
            command: "findup",
            side: j,
            result: o
        });
        w.style.display = "none"
    };
    y.onchange = () => {
        H.sendMessage({
            command: "mrkdup",
            side: j,
            result: o
        });
        y.checked ? G[G.length] = F : G.splice(G.indexOf(F), 1)
    };
    H.onMessage.addListener(a => {
        if ("datapassing" === a.command && !m) {
            j = a.side;
            o = a.result;
            m = (j ? "R" : "L") + o;
            B.textContent = m;
            a.dupe ? (k = j, l = (j + 1) % 2, p = o, q = ~a.dupe + 1, d.getElementById("lb-dvdr").style.display = "inline", n = (j ? "L" : "R") + q, C.textContent = n, C.style.display = "inline", d.title = m + "/" + n, B.onclick = () => {
                B.classList.add("lblactv");
                C.classList.remove("lblactv");
                j = k;
                o = p
            }, C.onclick = () => {
                C.classList.add("lblactv");
                B.classList.remove("lblactv");
                j = l;
                o = q
            }) : d.title = m;
            for (var c = a.flags, e = c.length, b = 0, h = d.getElementById("lb-flags-div"); b < e; b++) {
                var g = d.createElement("input"),
                    f = "lb-f" + b;
                h.appendChild(g);
                g.outerHTML = ['<input type=checkbox class=lb-f id="', f, '" value="', b, '"><label class=lb-f title="', c[b], '" for="', f, '">', c[b][0].toUpperCase(), "</label>"].join("");
                d.getElementById(f).onchange = P
            }
            c = a.query.split(/[\s.,]+/);
            c.forEach(a => {
                var b = d.createElement("span");
                d.getElementById("lb-q").appendChild(b);
                b.outerHTML = " <span style=display:inline;cursor:pointer data-on=0 class=lb-qws>" + a + "</span>"
            });
            G.forEach.call(d.getElementsByClassName("lb-qws"), a => {
                a.onclick = Q
            });
            r.max = a.sliderLength - 1;
            d.getElementById("lb-u-div").style.backgroundImage = O[a.sliderLength] || O[10];
            I = a.lblArray;
            a.isthereq ? (s.max = a.PQsliderLength - 1, d.getElementById("lb-q-div").style.backgroundImage = O[a.PQsliderLength] || O[10], J = a.PQlblArray) : (D[0].style.display = D[1].style.display = "none", E[0].colSpan = E[1].colSpan = 2)
        }
        "seldup" === a.command && (F = (a.side ? "R" : "L") + a.result, m != F && n != F && (v.style.display = "none", d.getElementById("duplbl").textContent = F, x.style.display = "inline", y.checked = !!~G.indexOf(F)));
        "findup" === a.command && (v.style.display = "inline", w.style.display = x.style.display = "none")
    });
}