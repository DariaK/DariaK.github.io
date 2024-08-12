// Переменные
const system_ = tyrano.plugin.kag.tag;
//

// FaceChar - Размещение картинок перед текстбоксом.
system_.face_char = {
    vital: ["face_char_select"],
    pm: {
        face_char_select: "",
        face_char_url: "",
        face_char_location: "",
        face_char_position: "",
        face_char_position_left: "",
        face_char_position_bottom: "",
        face_char_zoom: "",
        face_char_text_left: "",
        face_char_text_width: "",
        face_char_id: ""
    },
    start: function (pm) {
        let face_char_html = '\
                <div class="face_char_container">\
                    <img class="face_char_img layer_event_click" id="' + pm.face_char_id + '" style="object-fit: cover;border: none;" src="data/fgimage/' + pm.face_char_url + '">\
                </div>\
                ';
        if (pm.face_char_url !== "") {
            $('.message0_fore').append(face_char_html)
        }
        if (pm.face_char_location === "true") {
            $(".face_char_container").css({
                position: "absolute",
                zIndex: "100",

            })
        } else {
            $(".face_char_container").css({
                position: "absolute",
                zIndex: "0"
            })
        }
        if (pm.face_char_position === "left") {
            $(".face_char_container").css({
                left: pm.face_char_position_left + "px",
                bottom: pm.face_char_position_bottom + "px"
            })
        } else {
            $(".face_char_container").css({
                right: pm.face_char_position_left + "px",
                bottom: pm.face_char_position_bottom + "px"
            })
        }
        if (pm.face_char_zoom !== "") {
            $(".face_char_img").css({
                zoom: pm.face_char_zoom
            })
        }


        $(".message_inner p").css({
            left: pm.face_char_text_left + "px",
            width: pm.face_char_text_width + "px"
        })
        console.log(pm.face_char_text_left + " " + pm.face_char_text_width)

        TYRANO.kag.ftag.nextOrder();
    }
};
system_.face_char_delete = {
    start: function () {
        $(".face_char_container").remove()

        TYRANO.kag.ftag.startTag("cm");
        TYRANO.kag.ftag.nextOrder();
        TYRANO.kag.layer.showEventLayer();
    }
};

// ChatStory - чат в отдельном окне


(function ($) {
    $.chatConfig = function () {
        if (typeof TYRANO.kag.stat.tchat == "undefined") {
            TYRANO.kag.stat.tchat = {
                "current_top": 0,
                "current_scroll": 0,
                "layer": "0",
                "face_width": "100",
                "margin_face": "20",
                "bgcolor": "",
                "left_bgcolor": "0xFFC0CB",
                "right_bgcolor": "0xFFFFFF",
                "center_bgcolor": "0xDCDCDC",
                "anim_time": "",
                "width": "",
                "height": "",
                "left": "0",
                "top": "0",
                "se": "",
                "backlog": "true",
                "overflow": "remove",
                "name_font_size": "16",
                "name_font_color": "0x000000",
                "edit_mode": "false",
                "zindex": ""
            };

            var under_height = parseInt(TYRANO.kag.config.scHeight) * 0.7;
            TYRANO.kag.stat.tchat["under_height"] = under_height;

            TYRANO.kag.stat.tchat.width = TYRANO.kag.config.scWidth;
            TYRANO.kag.stat.tchat.height = TYRANO.kag.config.scHeight;


        }

        return TYRANO.kag.stat.tchat;


    };

    $.extendObj = function (pm, target) {
        var tmp = target;

        for (key in target) {

            if (pm[key]) {
                if (pm[key] != "") {
                    target[key] = pm[key];
                }
            }
        }
        return target;
    };


    $.getAreaChat = function (target_layer) {
        var j_area_chat = $('.message0_fore').find(".area_tchat");

        if (!j_area_chat.length) {
            var chat_config = $.chatConfig();
            j_area_chat = $("<div class='area_tchat' id='area_tchat' defer></div>");
            j_area_chat.css({
                "position": "absolute",
                "overflow": "hidden",
                "left": parseInt(chat_config.left),
                "top": parseInt(chat_config.top),
                "width": parseInt(chat_config.width),
                "height": parseInt(chat_config.height),
            });
            $('.message0_fore').append(j_area_chat);
        }
        return j_area_chat;
    };


})(jQuery);


system_.chat_talk = {

    kag: TYRANO.kag,
    vital: [],

    pm: {
        "layer": "",
        "page": "fore",
        "name": "",
        "id": "",
        "face": "",
        "text": "",
        "pos": "left",
        "color": "",
        "bgcolor": "",
        "graphic": "",
        "video": "",
        "graphic_width": "",
        "graphic_height": "",
        "folder": "",
        "time": "300",
        "width": "",
        "bottom": "",
        "se": "",
        "delay": "",
        "reflect": "false",
        "update": "false",
        "insert_chat_id": "",
        "face_path_full": "false",
        "message_preloader_type":""
    },

    start: function (pm) {
        var that = this;
        that.kag.layer.hideEventLayer();
        var chat_config = $.chatConfig();
        var storage_url = "";

        if (pm.face != "") {
            if ($.isHTTP(pm.face) || pm.face_path_full == "true") {
                storage_url = pm.face;
            } else {
                storage_url = "./data/fgimage/" + pm.face;
            }
        }

        var tmp = $('<img src="' + storage_url + '" />');
        var pos = pm.pos;
        var f_pos = "right";

        if (pos == "right") {
            f_pos = "left";
        }

        if (pos == "l") {
            pos = "left";
        } else if (pos == "r") {
            pos = "right";
        } else if (pos == "c") {
            pos = "center";
        }

        if (pm.bgcolor == "") {
            if (pos == "left") {
                pm.bgcolor = chat_config.left_bgcolor;
            } else if (pos == "right") {
                pm.bgcolor = chat_config.right_bgcolor;
            } else if (pos == "center") {
                pm.bgcolor = chat_config.center_bgcolor;
            }
        }
        const local_var = TYRANO.kag.stat;
        let name = local_var;
        pm.name.split(".").forEach(element => name = name[element]);
        var html = '\
            <div style="display:none;position:absolute" class="tchat">\
                 <figure class="t_chat_face tchat-img-' + pos + '">\
                    <img class="face_img" style="object-fit: cover;border: none" src="' + storage_url + '" alt="″>\
                    <figcaption class="tchat_name_text tchat-img-description">\
                    <div class="t_chat_name" style="justify-content:center;display:flex;text−align:center;width:' + chat_config.face_width + 'px"><p>' + name + '</p></div>\
                    </figcaption>\
                 </figure>\
                 <div class="t_chat_text tchat-text-' + f_pos + '">\
                   <div class="text_f-before tchat-text-' + f_pos + '-f-before"></div>\
                   <p class="tchat-text-inner" style="word-break: break-all;">\
                   </p>\
                   <div class="text_f-after tchat-text-' + f_pos + '-f-after"></div>\
                 </div>\
                </div>\
            ';

        var j_tchat = $(html);

        $.setName(j_tchat, "tyrano_story_" + pm.name);
        $.setName(j_tchat, pm.id);
        j_tchat.attr("chat-id", pm.id);

        if (chat_config.zindex != "") {
            j_tchat.css("z-index", parseInt(chat_config.zindex));
        }

        if (pos == "left") {
            j_tchat.css("left", 0);
        } else {
            j_tchat.css("right", 0);
        }

        if (pos === "left") {

            if (pm.face === "") {
                j_tchat.find(".face_img").css({
                    visibility: "hidden"
                });
                j_tchat.find(".t_chat_name").css({
                    position: "relative",
                    left: "6px"

                });
                j_tchat.find(".text_f-after").css({
                    position: "absolute",
                    top: "43px",
                    left: "9px",
                });
            }

            j_tchat.find(".text_f-after").css({
                position: "absolute",
                top: "8px",
                left: "-19px",
            });

            j_tchat.find(".t_chat_text").css({
                "margin-top": parseInt(chat_config.margin_top),
                "margin-left": parseInt(chat_config.face_width) + 20,
                "margin-right": 100
            });

            j_tchat.css("margin-left", 20);

            j_tchat.find(".tchat-text-right-f-after").css({
                "border-right": "10px solid " + $.convertColor(pm.bgcolor)
            });


        } else if (pos === "right") {
            if (pm.face === "") {
                j_tchat.find(".face_img").css({
                    visibility: "hidden"
                });
                j_tchat.find(".t_chat_name").css({
                    position: "relative",
                    right: "46px"

                });
                j_tchat.find(".text_f-after").css({
                    position: "absolute",
                    top: "43px",
                    right: "8px",
                    transform: "rotate(90deg)"
                });
            }

            j_tchat.find(".text_f-after").css({
                position: "absolute",
                top: "8px",
                right: "-19px",
            });

            j_tchat.find(".t_chat_text").css({
                "margin-top": parseInt(chat_config.margin_top),
                "margin-right": parseInt(chat_config.face_width) + 20,
                "margin-left": 100,
            });

            j_tchat.css("margin-right", 20);

            j_tchat.find(".tchat-text-left-f-after").css({
                "border-left": "10px solid " + $.convertColor(pm.bgcolor)
            });

        } else if (pos == "center") {
            j_tchat.find(".t_chat_face").remove();
            j_tchat.css("width", "100%");
            j_tchat.find(".t_chat_text").css({
                "margin-top": 25,
                "text-align": "center"
            });
        }

        if (pm.face === "") {
            j_tchat.find(".tchat-text-" + f_pos).css("margin-" + pos, 0);

        } else {
            if (pm.reflect == "true") {
                j_tchat.find(".face_img").addClass("reflect");
            }
            j_tchat.find(".t_chat_face").css({
                "width": parseInt(chat_config.face_width),
                "height": parseInt(chat_config.face_width),
            });
        }

        j_tchat.find(".tchat-text-" + f_pos).css({
            "background-color": $.convertColor(pm.bgcolor)
        });
        var j_tchat_text = j_tchat.find(".tchat-text-inner");
        j_tchat_text.html(pm.text);
        if (pm.color == "") {
            pm.color = that.kag.stat.font.color
        }
        var font_style = {
            "color": $.convertColor(pm.color),
            "font-weight": that.kag.stat.font.bold,
            "font-size": that.kag.stat.font.size + "px",
            "font-family": that.kag.stat.font.face,
            "font-style": that.kag.stat.font.italic,
        };
        j_tchat_text.css(font_style);

        $(function () {
            if (pm.width != "") {
                $(".t_chat_text").css("width", parseInt(pm.width));
            }
        })

        if (chat_config.backlog == "true") {
            var logstr = "";
            if (pm.text != "") {

                if (pm.name != "") {
                    logstr += "<b class='backlog_chara_name " + pm.name + "'>" + pm.name + "</b>：";
                }

                logstr += "<span class='backlog_text " + pm.name + "'>" + pm.text + "</span>";

                this.kag.pushBackLog(logstr, "add");

            }

        }

        j_tchat_name = j_tchat.find(".t_chat_name").css({
            "font-size": parseInt(chat_config.name_font_size),
            "color": $.convertColor(chat_config.name_font_color),
            "font-family": that.kag.stat.font.face,
        });

        if (pm.layer == "") {
            pm.layer = chat_config.layer;
        }

        var target_layer = that.kag.layer.getLayer(pm.layer, pm.page);
        var j_area_chat = $.getAreaChat($('.message0_fore'));

        $('.message0_fore').show();
        j_area_chat.show();

        if (chat_config.edit_mode == "false" && pm["update"] == "false") {
            j_area_chat.append(j_tchat);
        }

        if (pm.video != "") {

            var storage_url = "";
            storage_url = "./data/" + pm.video;

            var j_video = $("<video class='video_player' src='" + storage_url + "' loop controls></video>")

            $(function () {
                j_video.css({
                    borderRadius: "5px",
                    position: "relative",
                })

                if (pm.graphic_width != "") {
                    j_video.css("width", parseInt(pm.graphic_width));
                }

                if (pm.graphic_height != "") {
                    j_video.css("height", parseInt(pm.graphic_height));
                }

                j_tchat.find(".tchat-text-inner").after(j_video)
            })
        }

        if (pm.graphic != "") {
            img_load_flag = 1

            var foler = "";
            if (pm.folder != "") {
                folder = pm.folder;
            } else {
                folder = "fgimage";
            }

            var storage_url = "";
            if ($.isHTTP(pm.graphic)) {
                storage_url = pm.graphic;
            } else {
                storage_url = "./data/" + folder + "/" + pm.graphic;
            }


            $(function () {
                $('.minimized').click(function (event) {
                    $(this).attr('src');
                    $('body').append('<div id="overlay"></div><div id="magnify"><img id="fl_img" src="' + storage_url + '"><div id="close-popup"><i></i></div></div>');
                    $('#magnify').css({
                        left: ($(document).width() - $('#magnify').outerWidth()) / 2,
                        top: ($(window).height() - $('#magnify').outerHeight()) / 2,
                    });
                    $('#fl_img').css({
                        width: document.width,
                        height: document.height,
                    });
                    $('#overlay, #magnify').fadeIn('fast');
                });

                $('body').on('click', '#close-popup, #overlay', function (event) {
                    event.preventDefault();
                    $('#overlay, #magnify').fadeOut('fast', function () {
                        $('#close-popup, #magnify, #overlay').remove();
                    });
                });
            });

            var j_img = $("<img class='img_graphic minimized'/>");
            j_img.attr("src", storage_url).on("load", function () {

                j_img.css({
                    borderRadius: "5px",
                    position: "relative",
                })

                if (pm.graphic_width != "") {
                    j_img.css("width", parseInt(pm.graphic_width));
                }

                if (pm.graphic_height != "") {
                    j_img.css("height", parseInt(pm.graphic_height));
                }

                j_tchat.find(".tchat-text-inner").after(j_img);

                if (pm.bottom != "") {
                    j_img.after("<div style='height:" + parseInt(pm.bottom) + "px'></div>");
                }


                setTimeout(function () {
                    that.show(j_tchat, chat_config, pm);
                }, 1);
            })

        }

        if (pm.graphic == "") {

            if (pm.bottom != "") {
                j_tchat.find(".tchat-text-inner").after("<div style='height:" + parseInt(pm.bottom) + "px'></div>");
            }

            setTimeout(function () {
                that.show(j_tchat, chat_config, pm);
            }, 1);

        }


    },

    show: function (j_tchat, chat_config, pm) {
        var that = this;
        var target_layer = that.kag.layer.getLayer(chat_config.layer, "fore");
        var height = parseInt(j_tchat.css("height"));
        var new_top = that.kag.stat.tchat.current_top;

        if (chat_config.edit_mode == "false") {

            //もし、スクロールされた痕跡があるなら、元に戻す
            if (chat_config.current_scroll != 0) {

                $('.message0_fore').find(".tchat_talked").each(function () {

                    var top = parseInt($(this).css("top"));
                    top = top - chat_config.current_scroll;
                    $(this).css("top", top);

                });

                chat_config.current_scroll = 0;
            }


            if (chat_config.current_top > parseInt(chat_config.under_height)) {

                //はじめて切り替わる時用の調整
                var s = chat_config.current_top - parseInt(chat_config.under_height);

                chat_config.current_top = parseInt(chat_config.under_height) + 1;

                new_top = that.kag.stat.tchat.under_height - height;

                var num_target = $('.message0_fore').find(".tchat_talked").length;
                var cnt_target = 0;

                $('.message0_fore').find(".tchat_talked").each(function () {

                    var j_obj = $(this);
                    var tmp = parseInt(j_obj.css("top"));
                    var top = tmp - height - 40 - s;

                    if (chat_config.anim_time == "0" || chat_config.anim_time == "") {

                        j_obj.css("top", top);

                        if (chat_config.overflow == "remove") {
                            if (top + parseInt(j_obj.css("height")) < 0) {
                                j_obj.remove();
                            }
                        }

                        cnt_target++;
                        if (num_target == cnt_target) {
                            that.talk_in(j_tchat, new_top, pm);
                        }

                    } else {

                        j_obj.animate(
                            {"top": top},
                            parseInt(chat_config.anim_time),
                            function () {

                                if (top + parseInt(j_obj.css("height")) < 0) {
                                    j_obj.remove();
                                }

                                cnt_target++;
                                if (num_target == cnt_target) {
                                    that.talk_in(j_tchat, new_top, pm);
                                }
                            }
                        );
                    }

                });

            } else {
                that.kag.stat.tchat.current_top += height + 40;
                this.talk_in(j_tchat, new_top, pm);
            }

        } else {

            //開発モード
            that.kag.stat.tchat.current_top += height + 40;

            j_tchat.css("position", "relative");
            j_tchat.css("margin-top", "40px");

            j_tchat.attr("data-pm", JSON.stringify(pm));

            //同じIDのやつがあるなら、一旦削除
            var j_area_chat = $.getAreaChat($('.message0_fore'));


            if (pm.update == "true") {

                var j_old = j_area_chat.find("." + pm["id"]);

                //後ろに挿入
                j_old.after(j_tchat);

                //削除
                j_old.remove();

                j_tchat.trigger("click");


            } else {

                if (pm.insert_chat_id != "") {

                    //途中への挿入
                    var j_obj = j_area_chat.find("." + pm.insert_chat_id);

                    if (j_obj.length > 0) {
                        j_obj.after(j_tchat);
                    } else {
                        j_area_chat.append(j_tchat);
                    }

                    j_tchat.trigger("click");


                } else {

                    j_area_chat.append(j_tchat);

                }
            }

            j_tchat.show();

            that.kag.ftag.nextOrder();

        }


    },

    talk_in: function (j_tchat, new_top, pm) {

        var that = this;

        j_tchat.addClass("tchat_talked");
        j_tchat.css("top", new_top + 20);

        if (pm.delay != "") {

            j_tchat.find(".tchat-text-inner").hide();
            j_tchat.find(".img_graphic").hide();

            if (pm.message_p_t == "spinner") {
                var j_load_img = $("<div class=\"spinner\" >\n" +
                    "  <div class=\"blob top\"></div>\n" +
                    "  <div class=\"blob bottom\"></div>\n" +
                    "  <div class=\"blob left\"></div>\n" +
                    "  \n" +
                    "  <div class=\"blob move-blob\"></div>\n" +
                    "</div>");
            } else if (pm.message_p_t == "dots") {
                var j_load_img = $("<div class=\"dots_fade\" >\n" +
                    "  <span></span>" +
                    "  <span></span>" +
                    "  <span></span>" +
                    "</div>");
            } else if (pm.message_p_t == "radial") {
                var j_load_img = $("<div class=\"radial\" >\n" +
                    "  <span></span>" +
                    "  <span></span>" +
                    "  <span></span>" +
                    "</div>");
            } else if (pm.message_p_t == "spiral") {
                var j_load_img = $("<div class=\"spiral\" >\n" +
                    "  <div></div>" +
                    "  <div></div>" +
                    "  <div></div>" +
                    "</div>");
            }


            j_tchat.find(".tchat-text-inner").after(j_load_img);

            j_tchat.show();
            setTimeout(function () {

                that.playse(pm);

                j_load_img.remove();
                j_tchat.find(".img_graphic").show();
                j_tchat.find(".tchat-text-inner").fadeIn(parseInt(that.kag.cutTimeWithSkip(pm.time)), function () {

                    that.kag.layer.showEventLayer();
                    that.kag.ftag.nextOrder();
                });
            }, parseInt(that.kag.cutTimeWithSkip(pm.delay)));

        } else {

            j_tchat.fadeIn(parseInt(that.kag.cutTimeWithSkip(pm.time)), function () {
                that.kag.layer.showEventLayer();
                that.kag.ftag.nextOrder();
            });

            this.playse(pm);

        }

    },

    playse: function (pm) {

        const chat_config = $.chatConfig();
        let se_storage = "";
        console.log(se_storage)

        if (pm.se != "") {
            se_storage = pm.se;
            console.log(se_storage)
        } else if (chat_config.se != "" && chat_config.se != "none") {
            se_storage = chat_config.se;
        }

        if (se_storage != "") {
            this.kag.ftag.startTag("playse", {
                "storage": se_storage,
                "stop": true
            });
        }

    }


};


system_.chat_sh = {
    vital: ["chat_hide_show"],
    pm: {
        chat_hide_show: "",
    },
    start: function (pm) {
        if (pm.chat_hide_show === "hide") {
            $(".layer_fore").find(".area_tchat").css('display', 'none');
        } else {
            $(".layer_fore").find(".area_tchat").css('display', 'block');
        }
        TYRANO.kag.ftag.nextOrder();
    }
}

system_.tb_hide = {
    vital: ["tb_hide_show"],
    pm: {
        chat_hide_show: "",
    },
    start: function (pm) {
        if (pm.tb_hide_show === "hide") {
            $(".message_outer, .message_inner, .chara_name_area").css('display', 'none');
        } else {
            $(".message_outer, .message_inner, .chara_name_area").css('display', 'block');
        }
        TYRANO.kag.ftag.nextOrder();
    }
}


system_.chat_config = {

    kag: TYRANO.kag,
    vital: [],

    pm: {

        "layer": "",
        "face_width": "",//表情アイコンの横サイズ
        "margin_face": "",

        "bgcolor": "", //背景色を指定できます。

        "left_bgcolor": "",
        "right_bgcolor": "",
        "center_bgcolor": "",

        "name_font_size": "",
        "name_font_color": "",
        "margin_top": "",

        "under_height": "", //最後の所 Under
        "anim_time": "",
        "se": "", //デフォルトのSE

        "width": "",
        "height": "",
        "top": "",
        "left": "",

        "edit_mode": "",

        "backlog": "",
        "chat_bg_image": "",
        "chat_width": "",
        "chat_height": "",
        "chat_fullScreen": "",
        "chat_opacity": "",
        "chat_text_font": "",

    },

    start: function (pm) {

        const that = this;

        const chat_config = $.chatConfig();


        $(function () {
            $(".layer_fore").find(".area_tchat").css({
                position: "absolute",
                top: pm.y + "px",
                left: pm.x + "px",

            });

            if (pm.left_bgcolor !== "") {
                $(".layer_fore").find(".area_tchat").css({
                    color: $.convertColor(pm.left_bgcolor),
                });
            }
            if (pm.right_bgcolor !== "") {
                $(".layer_fore").find(".area_tchat").css({
                    color: $.convertColor(pm.right_bgcolor),
                });
            }
            if (pm.center_bgcolor !== "") {
                $(".layer_fore").find(".area_tchat").css({
                    backgroundColor: $.convertColor(pm.center_bgcolor),
                });
            }

            if (pm.bgcolor !== "") {
                const hexTorgba = (hex, alpha = 1) => {
                    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
                    return `rgba(${r},${g},${b},${alpha})`;
                };
                $(".layer_fore").find(".area_tchat").css({
                    backgroundColor: hexTorgba($.convertColor(pm.bgcolor), pm.chat_opacity),
                });
            }
            if (pm.chat_bg_image !== "") {
                $(".layer_fore").find(".area_tchat").css({
                    backgroundImage: 'url(' + 'data/bgimage/' + pm.chat_bg_image + ')',
                    opacity: pm.chat_opacity,
                    backgroundColor: ""
                });
            }
            if (pm.chat_width !== "") {
                $(".layer_fore").find(".area_tchat").css({
                    width: pm.chat_width + "px",
                });
            }
            if (pm.chat_height !== "") {
                $(".layer_fore").find(".area_tchat").css({
                    height: pm.chat_height + "px",
                });
            }
            if (pm.chat_fullScreen === "true") {
                $(".layer_fore").find(".area_tchat").css({
                    height: "100%",
                    width: "100%",
                });
            }

        });

        TYRANO.kag.stat.tchat = $.extendObj(pm, chat_config);

        that.kag.ftag.nextOrder();

    }

};

system_.chat_clear = {

    kag: TYRANO.kag,
    vital: [],

    pm: {
        time: "200"
    },

    start: function (pm) {

        var that = this;

        var chat_config = $.chatConfig();

        //コンフィグを適応する
        TYRANO.kag.stat.tchat = $.extendObj(pm, chat_config);
        var target_layer = that.kag.layer.getLayer(chat_config.layer, pm.page);

        var j_area_chat = $.getAreaChat($('.message0_fore'));

        j_area_chat.fadeOut(parseInt(pm.time), function () {

            $(this).remove();
            chat_config.current_top = 0;
            that.kag.ftag.nextOrder();
        });
    }

};

system_.chat_scroll = {
    kag: TYRANO.kag,
    vital: ["top"],
    pm: {
        time: "500",
        direction: "up",
        effect: "easeInQuad",
        top: ""
    },

    start: function (pm) {
        var that = this;
        var chat_config = $.chatConfig();
        var target_layer = that.kag.layer.getLayer(chat_config.layer, "fore");
        var j_area_chat = $.getAreaChat($('.message0_fore'));
        var num_target = $('.message0_fore').find(".tchat_talked").length;
        var cnt_target = 0;
        var top = "+=" + pm.top;
        if (pm.direction == "down") {
            top = "-=" + pm.top;
            chat_config.current_scroll -= parseInt(pm.top);
        } else {
            top = "+=" + pm.top;
            chat_config.current_scroll += parseInt(pm.top);
        }
        j_area_chat.find(".tchat_talked").each(function () {
            var j_obj = $(this);
            j_obj.animate(
                {"top": top},
                parseInt(pm.time),
                pm.effect,
                function () {
                    cnt_target++;
                    if (num_target === cnt_target) {
                        that.kag.ftag.nextOrder();
                    }

                }
            );

        });


    }

};

system_.translateSystem = {
    start: function () {
        const langTranslate = TYRANO.kag.variable.sf.langTranslate;
        let translationsInterface = {};
        let translationMainText = {};

        if (langTranslate === "" || !langTranslate || langTranslate === "undefined" || langTranslate === "null") {} else {
            $.when(
                $.getJSON(`data/lang/interface.json`).done(function (data) {
                    translationsInterface = data;
                    traverse(document.body);
                }),
                $.getJSON(`data/lang/${langTranslate}.json`).done(function (data) {
                    translationMainText = data;
                })
            ).then(function () {
                translate();
                const observerCallback = function (mutationsList, observer) {
                    for (let mutation of mutationsList) {
                        if (mutation.type === "childList" && mutation.target.matches(".current_span")) {
                            translate();
                        } else if (mutation.type === "characterData" && mutation.target.parentNode.matches(".current_span")) {
                            translate();
                        } else if (mutation.type === "childList" || mutation.type === "subtree" || mutation.type === "characterData") {
                            traverse(mutation.target);
                        }
                    }
                };
                const observer = new MutationObserver(observerCallback);
                observer.observe(document.body, {childList: true, subtree: true, characterData: true});
            });

            function traverse(node) {
                const childNodes = node.childNodes;
                for (let i = 0; i < childNodes.length; i++) {
                    const childNode = childNodes[i];
                    if (childNode.nodeType === Node.TEXT_NODE) {
                        const text = childNode.nodeValue && childNode.nodeValue.trim && childNode.nodeValue.trim().replace(/\s+/g, " ");
                        if (text) {
                            let translation;
                            if (translationMainText[langTranslate] && translationMainText[langTranslate][text]) {
                                translation = translationMainText[langTranslate][text];
                            } else if (translationsInterface[text]) {
                                translation = translationsInterface[text][langTranslate];
                            }
                            if (translation) {
                                childNode.nodeValue = translation;
                            } else {
                            }
                        }
                    } else if (childNode.nodeType === Node.ELEMENT_NODE) {
                        if (childNode.matches && childNode.matches(".current_span")) {
                            traverse(childNode);
                        } else if (childNode.tagName.toLowerCase() === 'img') {
                            const src = childNode.getAttribute('src');
                            if (src.endsWith('.png') || src.startsWith('data:image/png') ||
                                src.endsWith('.jpg') || src.startsWith('data:image/jpg')) {
                                const filename = src.substring(src.lastIndexOf('/') + 1);
                                const imgFilename = `${langTranslate}_${filename}`;
                                const imgSrc = `data/lang/img/${langTranslate}/${imgFilename}`;
                                $.ajax({
                                    url: imgSrc,
                                    type: 'HEAD',
                                    error: function () {

                                    },
                                    success: function () {
                                        childNode.setAttribute('src', `data/lang/img/${langTranslate}/${imgFilename}`);
                                    }
                                });
                            }
                        } else {
                            traverse(childNode);
                            $.each(childNode.attributes, function (index, attribute) {
                                const text = attribute.value && attribute.value.trim && attribute.value.trim().replace(/\s+/g, " ");
                                if (translationsInterface[text]) {
                                    attribute.value = translationsInterface[text][langTranslate];
                                }
                            });
                        }
                    }
                }
            }

            function translate() {
                $(".current_span").each(function () {
                    const originalText = $(this).text();
                    const translatedText = translationMainText[langTranslate][originalText];
                    let i = 0;
                    const speed = translationMainText["s"]["time"];

                    if (typeof translatedText === "string") {
                        const printChar = () => {
                            if (i < translatedText.length) {
                                const char = translatedText[i];
                                i++;
                                output += char;
                                $(this).text(output);
                                setTimeout(printChar, speed);
                            } else {
                                $(this).text(output);
                            }
                        };
                        let output = "";
                        printChar();
                    }
                });
            }
        }

        this.kag.ftag.nextOrder()
    }
};


system_.uiCloseAndOpen = {
    vital: [],
    pm: {
        uiVarCloseAndOpen: "" || "und",
        uiVarCloseAndOpenName: "",
        uiAllCloseAndOpen: ""
    },
    start: function (pm) {
        if (pm.uiVarCloseAndOpen === "close") {
            let elements = document.querySelectorAll("." + pm.uiVarCloseAndOpenName);
            elements.forEach(element => element.style.display = "none");
        } else {
            let elements = document.querySelectorAll("." + pm.uiVarCloseAndOpenName);
            elements.forEach(element => element.style.display = "block");
        }

        if(pm.uiAllCloseAndOpen === "true") {
            const elements = document.querySelectorAll(".dynamic-interface");
            elements.forEach((element) => {
                element.style.display = "none";
            });
        }


        TYRANO.kag.ftag.nextOrder();
    }
};


system_.uiVariable = {
    vital: ["uiNameVar"],
    pm: {
        uiTypeVar: "",
        uiNameVar: "",
        uiName: "",
        uiNameDiv: "",
        color: "",
        width: "",
        height: "",
        left: "",
        top: "",
        paddingTop: "",
        paddingBottom: "",
        paddingLeft: "",
        paddingRight: "",
        borderRadius: "",
        opacity: "",
        fontColor: "",
        fontSize: "",
        face: "",
        disableBG: ""
    },

    start: function (pm) {
        const local_var = TYRANO.kag.stat;
        let uiNameVar = local_var;
        pm.uiNameVar.split(".").forEach(element => uiNameVar = uiNameVar[element]);

        let vu_div = $('<div>', {
            class: 'dynamic-interface ' + pm.uiNameDiv,
        }).append($('<span>', {
            class: 'vu_text',
            text: pm.uiName + ' ' + uiNameVar,
        }));

        $('.message0_fore').append(vu_div);

        let nameDiv = $("." + pm.uiNameDiv);

        pm.disableBG === "true" ? "" : nameDiv.css("background", $.convertColor(pm.color));
        nameDiv.css({
            position: "absolute",
            width: pm.width,
            height: pm.height,
            left: pm.left + "px",
            top: pm.top + "px",
            userSelect: "none",
            paddingTop: pm.paddingTop + "px",
            paddingBottom: pm.paddingBottom + "px",
            paddingLeft: pm.paddingLeft + "px",
            paddingRight: pm.paddingRight + "px",
            borderRadius: pm.borderRadius + "px",
            opacity: pm.opacity,
            color: $.convertColor(pm.fontColor),
            fontSize: pm.fontSize + "px",
            fontFamily: pm.face,
        });

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                let newText = pm.uiName + ': ' + uiNameVar;
                if (mutation.target.innerText !== newText) {
                    mutation.target.innerText = newText;
                }
            });
        });

        observer.observe($("." + pm.uiNameDiv + " .vu_text")[0], {characterData: true, subtree: true});

        setInterval(function () {
            const newLocalVar = TYRANO.kag.stat;
            let newUiNameVar = newLocalVar;
            pm.uiNameVar.split(".").forEach(element => newUiNameVar = newUiNameVar[element]);

            if (newUiNameVar !== uiNameVar) {
                uiNameVar = newUiNameVar;

                let newText = pm.uiName + ' ' + uiNameVar;
                $("." + pm.uiNameDiv + " .vu_text").text(newText);
            }
        }, 100);

        TYRANO.kag.ftag.nextOrder();
    }
};

system_.textHint = {
    vital: ["hint_text"],
    pm: {
        what_to_replace: "",
        on_what_replace: "",
        hint_text: "",
        hint_direction: "",
    },
    start: function (pm) {
        let result;
        let textReplace;
        let textHintDiv;

        setInterval(function () {
            $(function () {
                const currentSpan = $(".current_span");

                if (currentSpan.text().indexOf(pm.what_to_replace) >= 0) {
                    textHintDiv = "<span class='text-hint' aria-label='"+pm.hint_text+"' data-balloon-pos='"+pm.hint_direction+"'>" + pm.on_what_replace + "</span>";
                    textReplace = currentSpan.text().replace(pm.what_to_replace, textHintDiv);
                    result = currentSpan.html(textReplace);
                    currentSpan.replaceWith(result);
                }
            })
        }, 5);
        TYRANO.kag.ftag.nextOrder();
    }
};

system_.textHintSettings = {
    vital: [],
    pm: {
        text_color_hover: "",
        text_transition: "",
        bold_text: "",
        italic_text: "",
        balloon_bg_color: "",
        balloon_text_color: "",
        balloon_border_radius: "",
        balloon_padding: "",
        balloon_font_size: "",
        balloon_font: ""
    },
    start: function (pm) {
        setInterval(function () {
            $(".text-hint").mouseover(function () {
                $(this).css({
                    color: $.convertColor(pm.text_color_hover),
                    transition: pm.text_transition + "s",
                    cursor: "default"
                })
            });
            $(".text-hint").mouseout(function () {
                $(this).css({
                    color: "#fff",
                    transition: pm.text_transition + "s"
                })
            });

            if (pm.bold_text === "true") {
                $('.text-hint').css({
                    fontWeight: "bold"
                })
            }
            if (pm.italic_text === "true") {
                $('.text-hint').css({
                    fontStyle: "italic"
                })
            }
            if (pm.balloon_bg_color !== "") {
                $(':root').css({
                    "--balloon-color": $.convertColor(pm.balloon_bg_color)
                })
            }
            if (pm.balloon_text_color !== "") {
                $(':root').css({
                    "--balloon-text-color": $.convertColor(pm.balloon_text_color)
                })
            }
            if (pm.balloon_border_radius !== "") {
                $(':root').css({
                    "--balloon-border-radius": pm.balloon_border_radius + "px"
                })
            }
            if (pm.balloon_padding !== "") {
                $(':root').css({
                    "--balloon-padding": pm.balloon_padding + "px"
                })
            }
            if (pm.balloon_font_size !== "") {
                $(':root').css({
                    "--balloon-font-size": pm.balloon_font_size + "px"
                })
            }
            if (pm.balloon_font !== "") {
                $(':root').css({
                    "--balloon-font": pm.balloon_font
                })
            }

        }, 5);

        TYRANO.kag.ftag.nextOrder();
    }
};

// Система достижений
system_.achievementSystem = {
    start: function () {
        const fs = require("fs");
        const path = require('path');

        // Путь до вашего JSON файла
        const jsonPath = path.join(__dirname, '/data/achievement/achievements.json');

        // Чтение и парсинг JSON файла
        let achievements = JSON.parse(fs.readFileSync(jsonPath));
        console.log('Achievements:', achievements);

        let handler = {
            set: function(obj, prop, value) {
                if (prop === 'achievementSystem') {
                    let achVarChangedEvent = new Event('ach_var_changed');
                    achVarChangedEvent.detail = value;
                    document.dispatchEvent(achVarChangedEvent);
                }
                obj[prop] = value;
                return true;
            }
        };

        TYRANO.kag.stat.f = new Proxy(TYRANO.kag.stat.f, handler);

        let generalHandler = function(e) {
            let ach_var = e.detail;
            achievements.forEach(pm => {
                if (e.detail == pm.ach_id) {
                    let storage_url = "./data/achievement/icon/" + pm.ach_img;
                    let html = `
                                <div class="achievement">
                                    <div class="">
                                        <div class="ach_container">
                                            <img class="ach_img" style="object-fit: cover;border: none;box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px;" src="${storage_url}">
                                            <div class="ach_text_container">
                                                <p class="ach_name">${pm.ach_name}</p>
                                                <p class="ach_text">${pm.ach_text}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `;
                    const ach_json_path = path.join(__dirname, '/data/achievement/data.json');
                    if (!fs.existsSync(ach_json_path)) {
                        fs.writeFileSync(ach_json_path, JSON.stringify([]));
                    }
                    let ach_json = JSON.parse(fs.readFileSync(ach_json_path));
                    let ach_by_id = ach_json
                        .filter(entry => {
                            return entry.ach_id === pm.ach_id && entry.achieved === true;
                        })[0];
                    if (ach_var == pm.ach_id && (ach_by_id == null || ach_by_id.achieved !== true)) {
                        ach_json.push(
                            {
                                "ach_id": pm.ach_id,
                                "achieved": true
                            }
                        );
                        fs.writeFileSync(ach_json_path, JSON.stringify(ach_json));
                        $('.layer_camera').append(html);
                    }
                    $(".achievement").css({
                        background: $.convertColor(pm.ach_color),
                        position: "absolute",
                        borderRadius: pm.ach_border_radius + "px",
                        width: pm.ach_width + "px",
                        height: "auto",
                        wordWrap: "break-word",
                        overflowX: "hidden",
                        overflowY: "hidden",
                        right: "-1000px",
                        marginRight: "5px",
                        marginTop: "15px",
                        boxShadow: "rgba(17, 12, 46, 0.15) 0px 8px 15px 0px"

                    })
                    if (pm.highlight_text === "true") {
                        $(".ach_name").css({
                            fontFamily: pm.ach_font_name,
                        })
                        $(".ach_text").css({
                            fontFamily: pm.ach_font_text,
                        })
                        $(".ach_name, .ach_text").css({
                            background: $.convertColor(pm.ach_name_color),
                            padding: "2px 0 2px 5px",
                            borderRadius: "5px",
                            marginBottom: "2px",
                            boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                        })
                    } else {
                        $(".ach_name").css({
                            fontFamily: pm.ach_font_name,
                        })
                        $(".ach_text").css({
                            fontFamily: pm.ach_font_text,
                        })
                        $(".ach_name, .ach_text").css({
                            padding: "2px 0 2px 5px",
                            borderRadius: "5px",
                            marginBottom: "2px",
                        })
                    }
                    $(".ach_container").css({
                        color: $.convertColor(pm.ach_fonts_color),
                        padding: pm.ach_padding + "px",
                        minHeight: "50px",

                    })
                    $(".ach_text_container").css({
                        position: "relative",
                        width: pm.ach_text_width + "px",
                        height: "auto",
                        float: "right"
                    })
                    $(".ach_img").css({
                        position: "relative",
                        width: pm.image_width + "px",
                        height: pm.image_width + "px",
                        border: "none",
                        borderRadius: "50px",
                        objectFit: "cover"
                    })
                    $('.achievement').animate({
                        right: '10px',
                        transition: '0.5s',
                    })
                    setTimeout(function () {
                        $('.achievement').fadeOut(1000);
                    }, pm.display_time);
                }
            });
        };

        document.addEventListener('ach_var_changed', generalHandler);

        this.kag.ftag.nextOrder()
    }
};

system_.animFrame = {
    vital: ["animFrame_url"],
    pm: {
        animFrame_id: "",
        animFrame_url: "",
        animFrame_interval: "",
        animFrame_loop: "",
        animFrame_size: "",
        left: "",
        top: "",
        animFrame_fadeIn: ""
    },

    start: function (pm) {
        const fs = require('fs');
        const path = require('path');

        class FrameAnimation {
            constructor(folderPath, interval, loop) {
                this.folderPath = folderPath;
                this.interval = interval;
                this.loop = loop;
                this.imageFiles = [];
                this.currentFrame = 0;
                this.preloadedImages = new Map();
                this.init();
            }

            async init() {
                try {
                    const files = await fs.promises.readdir(this.folderPath);
                    const animFilesRegex = /^anim_-?\d+/;
                    this.imageFiles = files
                        .filter((file) => animFilesRegex.test(file))
                        .sort(
                            (a, b) =>
                                parseInt(a.match(animFilesRegex)[1]) -
                                parseInt(b.match(animFilesRegex)[1])
                        );
                    if (this.imageFiles.length > 0) {
                        this.preloadImages().then(() => {
                            this.startAnimation();
                        });
                    } else {
                        console.error("Не найдены файлы анимации");
                    }
                } catch (err) {
                    console.error("Ошибка чтения директории:", err);
                    return;
                }
            }


            async preloadImages() {
                const promises = this.imageFiles.map(async (imageFile) => {
                    const img = new Image();
                    img.src = path.join(this.folderPath, imageFile);

                    return new Promise((resolve, reject) => {
                        img.onload = () => {
                            this.preloadedImages.set(imageFile, img);
                            resolve();
                        };
                        img.onerror = (err) => {
                            reject(err);
                        };
                    });
                });

                await Promise.all(promises);
            }

            startAnimation() {
                const container = document.createElement('div');
                const imageElement = document.createElement('img');
                let baseLayer = "";
                if (pm.animFrame_size === "true") {
                    imageElement.style.cssText = 'width: 100%; height: 100%;';
                    container.style.top = baseLayer.offsetTop + 'px';
                    container.style.left = baseLayer.offsetLeft + 'px';
                    baseLayer = document.querySelector('.layer.base_fore.layer_fore.layer_camera');
                    container.style.cssText = 'position: absolute; width: 100%; height: 100%; pointer-events: none;';
                } else {
                    baseLayer = document.querySelector('.message_outer');
                    container.style.cssText = `position: absolute; pointer-events: none; left: ${pm.left}px; top: ${pm.top}px; object-fit: contain;`;
                    console.log(pm.left)
                }

                container.classList.add('animationContainer');
                container.setAttribute('id', pm.animFrame_id);
                container.setAttribute('data-size', pm.animFrame_size);

                container.appendChild(imageElement);
                baseLayer.parentElement.insertBefore(container, baseLayer);

                let hasFadedOut = false;

                const fadeOutBaseLayer = () => {
                    const dataSize = container.getAttribute('data-size');

                    if (dataSize === "true" && !hasFadedOut) {
                        if (pm.animFrame_size === "true") {
                            const baseLayer = $(".layer.base_fore.layer_fore.layer_camera");
                            const fadeInDuration = parseInt(pm.animFrame_fadeIn);
                            if (baseLayer.length > 0) {
                                baseLayer.animate({
                                    opacity: 0
                                }, fadeInDuration);
                                hasFadedOut = true;
                            }
                        }
                    }
                }


                const displayFrame = () => {
                    imageElement.src = this.preloadedImages.get(this.imageFiles[this.currentFrame]).src;
                    if (this.currentFrame === 0) {
                        fadeOutBaseLayer();
                    }
                    this.currentFrame++;

                    if (this.currentFrame >= this.imageFiles.length) {
                        if (this.loop === "true") {
                            this.currentFrame = 0;
                        } else {
                            clearInterval(animationInterval);
                        }
                    }
                };

                const animationInterval = setInterval(displayFrame, this.interval);
            }


        }
        const folderPath = path.join(__dirname, 'data/bgimage/animationFrame/' + pm.animFrame_url);
        const interval = pm.animFrame_interval;
        const loop = pm.animFrame_loop;

        new FrameAnimation(folderPath, interval, loop);

        TYRANO.kag.ftag.nextOrder();
    }
}
system_.animFrameClose = {
    vital: ["animFrameClose_id"],
    pm: {
        animFrameClose_id: "",
        animFrameClose_fadeOut: ""
    },

    start: function (pm) {
        const container = document.querySelector('.animationContainer');
        if (container) {
            const containerId = container.getAttribute('id');
            const dataSize = container.getAttribute('data-size');
            if (containerId === pm.animFrameClose_id) {
                const baseLayer = $(".layer.base_fore.layer_fore.layer_camera");
                const fadeOutDuration = parseInt(pm.animFrameClose_fadeOut);
                if(dataSize === "true") {
                    if (baseLayer.length > 0) {
                        baseLayer.animate({
                            opacity: 1
                        }, fadeOutDuration);
                    }
                }
                container.remove();
            }
        }

        TYRANO.kag.ftag.nextOrder();
    }
}