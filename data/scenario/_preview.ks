[_tb_system_call storage=system/_preview.ks ]

[mask time=10]
[bg  storage="сцена_1.png"  time="10"  cross="false"  method="fadeIn"  ]
[tb_show_message_window] 
[chara_mod  name="ГГ"  time="10"  cross="false"  storage="chara/1/GG_ulybka.png"  ]
[chara_show  name="ГГ"  time="10"  wait="true"  storage="chara/1/GG.png"  width="814"  height="1424"  left="-287"  top="5"  reflect="false"  ]
[mask_off time=10]
[glink  color="black"  storage="scene1.ks"  size="20"  x="3"  y="437"  width="496"  height="40"  text="“Надеюсь,&nbsp;я&nbsp;не&nbsp;испачкаю&nbsp;подол&nbsp;платья&nbsp;в&nbsp;этой&nbsp;глупой&nbsp;деревушке”."  _clickable_img="кнопка1.png"  target="*Мысль1"  glink_sm="true"  ]
[glink  color="btn_02_yellow"  storage="scene1.ks"  size="20"  x="3"  y="531"  width="500"  height="60"  text="“Нужно&nbsp;быть&nbsp;дружелюбной&nbsp;и&nbsp;вежливой”"  _clickable_img=""  target="*Мысль_2"  glink_sm="true"  ]
[s  ]
[cm  ]
*Мысль1

[tb_start_text mode=1 ]
#Я
Чем быстрее закончим, тем лучше”.[p]
[_tb_end_text]

[jump  storage="scene1.ks"  target="*Сцена_1.1"  ]
*Мысль_2

[tb_start_text mode=1 ]
#Я
“Все же я будущая королева”. [p]
[_tb_end_text]

*Сцена_1.1

[tb_hide_message_window  ]
[chara_hide  name="ГГ"  time="1000"  wait="true"  pos_mode="true"  ]
[bg  time="1000"  method="fadeInRight"  storage="сцена_1-1.png"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
#. . .
Мама, а, точнее, Ее Высочество, ехала в отдельной карете. Я еще раз вздохнула. В деревне происходили какие-то странные вещи. [p]
Настолько странные, что нам пришлось выехать посмотреть самим. [p]


[_tb_end_text]

[cm  ]
