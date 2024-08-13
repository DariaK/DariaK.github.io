[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[tb_show_message_window] 
[mask_off time=10]
[bg  storage="1708668203_flomaster-top-p-fon-shreka-instagram-narisovannie-1.jpg"  time="1000"  ]
[tb_show_message_window  ]
[chara_show  name="Shrek"  time="1000"  wait="true"  storage="chara/1/png-clipart-shrek-shrek-superslam-princess-fiona-shrek-the-musical-shrek-film-series-shrek-food-cartoons-thumbnail.png"  width="384"  height="639"  left="70"  top="149"  reflect="false"  ]
[tb_start_text mode=1 ]
#Шрек
Это мое болото![p]
#
[_tb_end_text]

[chara_hide  name="Shrek"  time="1000"  wait="true"  pos_mode="true"  ]
[tb_start_tyrano_code]
[glink target="Lesh" text="Дать леща" graphic="ShrekB.png" x=155 y=540 font_color=0x000000 size=18 width=400 height=70 enterimg="ShrekB1.png"]
[glink target="Koleni" text="Сломать колени" graphic="ShrekB.png" x=155 y=600 font_color=0x000000 size=18 width=400 height=70 enterimg="ShrekB1.png"]
[_tb_end_tyrano_code]

[s  ]
*Lesh

[cm  ]
[tb_start_text mode=1 ]
#
Вам дали леща![p]
[_tb_end_text]

[jump  storage="scene1.ks"  target="*Common"  ]
*Koleni

[cm  ]
[tb_start_text mode=1 ]
Вам сломали колени![p]
[_tb_end_text]

[jump  storage="scene1.ks"  target="*Common"  ]
*Common

[tb_start_text mode=1 ]
Пошли нахуй с болота![p]
[_tb_end_text]

[s  ]
