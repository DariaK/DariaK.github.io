[_tb_system_call storage=system/_scene1.ks]

[cm  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
Привет[p]
Это проверка реализации пути ша... шальной императрицы. [p]
Итак, что ты выберешь? [p]
[_tb_end_text]

[glink  color="btn_28_black"  storage="scene1.ks"  size="20"  x="270"  y="190"  width="678"  height="87"  text="Поцеловать&nbsp;Васю"  _clickable_img=""  target="*Vasya"  ]
[glink  color="btn_28_black"  storage="scene1.ks"  size="20"  text="Поцеловать&nbsp;Петю"  x="270"  y="324"  width="678"  height="87"  _clickable_img=""  target="*Petya"  ]
[s  ]
*Vasya

[varSetting  valueRandom="0-0"  arithmeticOperations="+"  varName="f.VASYA_LOVE"  valueNum="1"  valueText=""  ]
[cm  ]
[tb_start_text mode=1 ]
Вася был очень рад и подарил тебе шоколадку![p]
[_tb_end_text]

[jump  storage="scene1.ks"  target="*Choise_2"  ]
*Petya

[varSetting  valueRandom="0-0"  arithmeticOperations="+"  varName="f.PETYA_LOVE"  valueNum="1"  valueText=""  ]
[cm  ]
[tb_start_text mode=1 ]
Петя признался, что любил тебя всю жизнь! [p]
[_tb_end_text]

[jump  storage="scene1.ks"  target="*Choise_2"  ]
*Choise_2

[cm  ]
[tb_start_text mode=1 ]
А теперь?[p]
[_tb_end_text]

[glink  color="btn_28_black"  storage="scene1.ks"  size="20"  x="270"  y="190"  width="678"  height="87"  text="Поцеловать&nbsp;Васю"  _clickable_img=""  target="*Vasya2"  ]
[glink  color="btn_28_black"  storage="scene1.ks"  size="20"  text="Поцеловать&nbsp;Петю"  x="270"  y="324"  width="678"  height="87"  _clickable_img=""  target="*Petya2"  ]
[s  ]
*Vasya2

[varSetting  valueRandom="0-0"  arithmeticOperations="+"  varName="f.VASYA_LOVE"  valueNum="1"  valueText=""  ]
[cm  ]
[tb_start_text mode=1 ]
Вася пообещал быть верным всю жизнь![p]

[_tb_end_text]

[jump  storage="scene1.ks"  target="*Choise_3"  ]
*Petya2

[varSetting  valueRandom="0-0"  arithmeticOperations="+"  varName="f.PETYA_LOVE"  valueNum="1"  valueText=""  ]
[cm  ]
[tb_start_text mode=1 ]
Петя пообещал, что никому тебя не отдаст![p]
[_tb_end_text]

[jump  storage="scene1.ks"  target="*Choise_3"  ]
*Choise_3

[cm  ]
[tb_start_text mode=1 ]
Настало время узнать, что случилось дальше![p]
[_tb_end_text]

[if  exp="f.VASYA_LOVE>0&&f.PETYA_LOVE>0"  ]
[varSetting  valueRandom="0-0"  varName="f.SHALNAYA"  valueNum="1"  arithmeticOperations="="  ]
[tb_start_text mode=1 ]
О нет! Кажется, в тебя влюбились два мальчика![p]
[_tb_end_text]

[endif  ]
[tb_start_text mode=1 ]
Ты пришла в школу. Вроде бы все хорошо, но...[p]
[_tb_end_text]

[if  exp="f.SHALNAYA==1"  ]
[tb_start_text mode=1 ]
Ты узнала, что Петя убил Васю! Он стоял в коридоре школы, с окровавленными руками, и улыбался.[p]
#Петя
Я же говорил...[p]
Я тебя никому не отдам! [p]
[_tb_end_text]

[jump  storage="scene1.ks"  target="*END"  ]
[endif  ]
[tb_start_text mode=1 ]
Ой![p]
[_tb_end_text]

[if  exp="f.SHALNAYA<1&&f.VASYA_LOVE>0"  ]
[tb_start_text mode=1 ]
Вася потребовал у тебя все свои подарки обратно! Жаль, что  он такой жлоб.[p]
[_tb_end_text]

[else  ]
[tb_start_text mode=1 ]
Петя принес в школу букет цветов для тебя, но его забрала плохая учительница! Жалко :([p]
[_tb_end_text]

[endif  ]
*END

[tb_start_text mode=1 ]
Вот так все и закончилось. [p]

Конец. [p]
[_tb_end_text]

[s  ]
