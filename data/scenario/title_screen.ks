[_tb_system_call storage=system/_title_screen.ks]

[hidemenubutton]

[tb_clear_images]

[tb_keyconfig  flag="0"  ]
[varSetting  valueRandom="0-0"  varName="sf.langTranslate"  valueText="ru"  arithmeticOperations="="  ]

[timeSetting  time="08:00"  timeSpeed="0.01"  year="2024"  month="11"  day="29"  realTime="true"  ]

[tb_hide_message_window  ]
[bg  storage="24aacc415a6a11ef99bec255847a9628_1.jpg"  ]
*title

[buttonHover  soundVolume="0.5"  storage="title_screen.ks"  target="*start"  graphic="button/start_game.png"  width="197"  height="113"  graphicH="button/start_game_h.png"  x="0"  y="0"  _clickable_img="storageSe"  ]

[wait  time="1000"  ]
[buttonHover  soundVolume="0.5"  storage="title_screen.ks"  target="*load"  graphic="button/load_game.png"  width="197"  height="105"  graphicH="button/load_h.png"  x="533"  y="500"  _clickable_img="storageSe"  ]

[s  ]
*start

[showmenubutton]

[cm  ]
[tb_keyconfig  flag="1"  ]
[jump  storage="scene1.ks"  target=""  ]
[s  ]
*load

[cm  ]
[showload]

[jump  target="*title"  storage=""  ]
[s  ]
