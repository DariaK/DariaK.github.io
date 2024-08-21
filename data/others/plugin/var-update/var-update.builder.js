'use strict';
module.exports = class plugin_setting {

    constructor(TB) {
        this.TB = TB;
        this.name = TB.$.s("Variable Update");
        this.plugin_text = TB.$.s("The plugin is designed to update variables.");
        this.plugin_img = "img/logo.png";
    }

    triggerInstall() {

    }

    defineComponents() {
        var cmp = {};
        var TB = this.TB;

        cmp["varupdate"] = {
            "info": {
                "default": true,
                "name": TB.$.s("Var Update"),
                "help": TB.$.s("Use to display the variable on the screen."),
                "icon": TB.$.s("s-icon-star-full")
            },

            "component": {
                name: TB.$.s("Var Update"),
                component_type: "Simple",

                default_view: {
                    icon: "fa-sharp fa-solid fa-binary-circle-check",
                    category: "plugin"
                },
                param_view: {},

                param: {
                    "vu_type_var": {
                        type: "Select",
                        name: TB.$.s("Variable Type"),
                        help: TB.$.s("Select the type of variable. There are only two types. 1. Local and 2. System. Choose according to your variable."),
                        vital: true,
                        select_list : [
                            {
                                name : TB.$.s("Local"),
                                val : "local"
                            },
                            {
                                name : TB.$.s("System"),
                                val : "system"
                            },
                        ],
                        default_val : "local",
                    },
                    "vu_var": {
                        type: "Text",
                        name: TB.$.s("Var Name"),
                        help: TB.$.s("The name of the variable you created with the variable manager."),
                        vital: true,
                    },

                    "name": {
                        type: "Text",
                        name: TB.$.s("Display name"),
                        help: TB.$.s("The name that players will see in the game."),
                        vital: true,
                        default_val: ""
                    },

                    "my_name_div": {
                        type: "Text",
                        name: TB.$.s("Name of Element"),
                        help: TB.$.s("The item name is required to distinguish one \"Div\" from another. Be sure to name it differently!"),
                        vital: true,
                        default_val: "_var"
                    },
                    _bound_select: {

                        type: "BoundSelectPlugin",
                        bound_type: "plugin",
                        name: TB.$.s("領域選択"),
                        help: TB.$.s("座標を見やすいツールを使って指定することができます"),
                        vital: false, //必須かどうか
                        default_val: "",

                        drag_obj: function (pm) {

                            var html = '<div class="' + pm.my_name_div + '"> ' + pm.my_name_div + ' : ' + local[pm.vu_var] + ' </div>';
                            var j_obj = TB.$(html);

                            return j_obj


                        },
                    },
                    "color": {
                        type: "Color",
                        name: TB.$.s("Background Color"),
                        default_val: "0x000000",
                        validate: {
                            required: true
                        }
                    },
                    "font_color": {
                        type: "Color",
                        name: TB.$.s("Font Color"),
                        default_val: "#fff",
                        validate: {
                            required: true
                        }
                    },
                    "font_size": {
                        type: "Num",
                        name: TB.$.s("Font Size"),
                        unit: TB.$.s("px"),
                        default_val: "22",
                        spinner: {
                            min: 0,
                            max: 100,
                            step: 1
                        },
                        validate: {
                            number: true
                        }
                    },
                    face: {
                        type: "Select",
                        name: $.s("フォント変更"),
                        select_list: _font_face_list
                    },
                    "padding_top": {
                        type: "Num",
                        name: TB.$.s("Padding Top"),
                        unit: TB.$.s("px"),
                        help: TB.$.s("Inner indent at the top. Allows you to move the text away from the upper border of the block."),
                        spinner: {
                            min: 0,
                            max: 50,
                            step: 0.5
                        },
                        validate: {
                            number: true
                        }
                    },
                    "padding_bottom": {
                        type: "Num",
                        name: TB.$.s("Padding Bottom"),
                        unit: TB.$.s("px"),
                        help: TB.$.s("Internal indent at the bottom. Allows you to move the text away from the bottom border of the block."),
                        spinner: {
                            min: 0,
                            max: 50,
                            step: 0.5
                        },
                        validate: {
                            number: true
                        }
                    },
                    "padding_left": {
                        type: "Num",
                        name: TB.$.s("Padding Left"),
                        unit: TB.$.s("px"),
                        help: TB.$.s("Internal indent on the left. Allows you to indent the text from the left border of the block."),
                        spinner: {
                            min: 0,
                            max: 50,
                            step: 0.5
                        },
                        validate: {
                            number: true
                        }
                    },
                    "padding_right": {
                        type: "Num",
                        name: TB.$.s("Padding Right"),
                        unit: TB.$.s("px"),
                        help: TB.$.s("Inner right indent. Allows you to indent the text from the right border of the block."),
                        spinner: {
                            min: 0,
                            max: 50,
                            step: 0.5
                        },
                        validate: {
                            number: true
                        }
                    },
                    "borderRadius": {
                        type: "Num",
                        name: TB.$.s("Border Radius"),
                        unit: TB.$.s("px"),
                        help: TB.$.s("Allows you to load the corners of the block."),
                        spinner: {
                            min: 0,
                            max: 50,
                            step: 0.5
                        },
                        validate: {
                            number: true
                        }
                    },

                    "opacity": {
                        type: "Num",
                        name: TB.$.s("Opacity"),
                        spinner: {
                            min: 0,
                            max: 1,
                            step: 0.1
                        },
                        validate: {
                            number: true
                        }
                    },

                    width: {
                        type: "Num",
                        name: TB.$.s("Width"),
                        unit: TB.$.s("px"),
                        help: TB.$.s("Block width. For more fine-tuning."),
                        spinner: {
                            min: 0,
                            max: 10000,
                            step: 1
                        },
                        validate: {
                            number: true
                        }
                    },
                    height: {
                        type: "Num",
                        name: TB.$.s("Height"),
                        unit: TB.$.s("px"),
                        help: TB.$.s("Block height. For more fine-tuning."),
                        spinner: {
                            min: 0,
                            max: 10000,
                            step: 1
                        },
                        validate: {
                            number: true
                        }
                    },


                },
            }
        };

        cmp["vu_close_open"] = {
            "info":{
                "default":true,
                "name":TB.$.s("Var Update [SH]"),
                "help":TB.$.s("Use it to hide or show elements."),
                "icon":TB.$.s("s-icon-star-full")
            },

            "component":{

                name : TB.$.s("Var Update [SH]"),
                component_type : "Simple",

                default_view : {
                    base_img_url : "data/bgimage/",
                    icon : "fa-sharp fa-solid fa-binary-slash",
                    icon_color : "#FFFF99",
                    category : "plugin"
                },
                param_view : {
                },
                param:{

                    "vu_close_open": {
                        type: "Select",
                        name: TB.$.s("Display"),
                        vital: true,
                        select_list : [
                            {
                                name : TB.$.s("Hide"),
                                val : "close"
                            },
                            {
                                name : TB.$.s("Show"),
                                val : "open"
                            },
                        ],
                        default_val : "close",
                    },

                    "vu_close_open_name_el": {
                        type: "Text",
                        name: TB.$.s("Name of Element"),
                        help: TB.$.s("Write here the name of element that you want to hide or show."),
                        vital: true,
                    },

                },
            }
        };


        return cmp;
    }

    test() {
    }
}

