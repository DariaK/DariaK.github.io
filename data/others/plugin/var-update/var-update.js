const local = TYRANO.kag.stat.f;
const system = TYRANO.kag.variable.sf;


TYRANO.kag.ftag.master_tag.vu_close_open = {
    vital: ["vu_close_open"],
    pm: {
        vu_close_open: "",
        vu_close_open_name_el: ""
    },
    start: function (pm) {
        if (pm.vu_close_open === "close") {
            $(pm.vu_close_open_name_el).css('display', 'none');
        } else {
            $(pm.vu_close_open_name_el).css('display', 'block');
        }
        console.log(pm.vu_close_open_name_el)
        TYRANO.kag.ftag.nextOrder();
    }
}

TYRANO.kag.ftag.master_tag.varupdate = {
    vital: ["vu_var"],
    pm: {
        vu_type_var: "",
        vu_var: "",
        name: "",
        my_name_div: "",
        color: "",
        width: "",
        height: "",
        left: "",
        top: "",
        padding_top: "",
        padding_bottom: "",
        padding_left: "",
        padding_right: "",
        borderRadius: "",
        opacity: "",
        font_color: "",
        font_size: "",
        face: "",
    },

    start: function (pm) {
        if (pm.vu_type_var === "local") {
            let vu_div = '<div class="' + pm.my_name_div + '"><span class="vu_text">' + pm.name + ':' + " " + local[pm.vu_var] + '</span></div>'
            $('.message0_fore').append(vu_div)
        } else {
            let vu_div = '<div class="' + pm.my_name_div + '"><span class="vu_text">' + pm.name + ':' + " " + system[pm.vu_var] + '</span></div>'
            $('.message0_fore').append(vu_div)
        }

        $("." + pm.my_name_div).css({
            background: $.convertColor(pm.color),
            position: "absolute",
            width: pm.width,
            height: pm.height,
            left: pm.left + "px",
            top: pm.top + "px",
            userSelect: "none",
            paddingTop: pm.padding_top + "px",
            paddingBottom: pm.padding_bottom + "px",
            paddingLeft: pm.padding_left + "px",
            paddingRight: pm.padding_right + "px",
            borderRadius: pm.borderRadius + "px",
            opacity: pm.opacity,
            color: $.convertColor(pm.font_color),
            fontSize: pm.font_size + "px",
            fontFamily: pm.face

        })

        setInterval(function () {
            $(function () {
                if (pm.vu_type_var === "local") {
                    let res = '<span class="vu_text">' + pm.name + ':' + " " + local[pm.vu_var] + '</span>'
                    const currentDiv = $("." + pm.my_name_div)
                    if (currentDiv.text() !== pm.name + ':' + " " + local[pm.vu_var]) {
                        currentDiv.html(res)
                    }
                } else {
                    let res = '<span class="vu_text">' + pm.name + ':' + " " + system[pm.vu_var] + '</span>'
                    const currentDiv = $("." + pm.my_name_div)
                    if (currentDiv.text() !== pm.name + ':' + " " + system[pm.vu_var]) {
                        currentDiv.html(res)
                    }
                }
            })
        }, 100);
        TYRANO.kag.ftag.nextOrder();
    }
}