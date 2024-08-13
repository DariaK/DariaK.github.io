[_tb_system_call storage=system/_scene1.ks]

[bg  time="1000"  method="crossfade"  storage="5aab18d5d3ba0f96c7091cc4cc3aae3d.jpg"  ]
[chara_show  name="Гаррет"  time="1000"  wait="true"  storage="chara/1/photo_2024-07-17_23-59-17.png"  width="754"  height="779"  left="-10"  top="-50"  reflect="false"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
Привет. Я пытаюсь разобраться, как работает эта шайтан-машина. Мне нужно, чтобы ты сделала пару ничего не значащих выборов. Просто так, что первое в голову взбредет. Поможешь мне?[p]

[_tb_end_text]

[tb_hide_message_window  ]
[glink  color="black"  storage="scene1.ks"  size="20"  x="490"  y="250"  width="281"  height="65"  text="Да,&nbsp;дружище"  _clickable_img=""  target="*Друг"  glink_sm="true"  ]
[glink  color="black"  storage="scene1.ks"  size="20"  x="490"  y="340"  width="281"  height="65"  text="Да,&nbsp;мой&nbsp;сладкий"  _clickable_img=""  target="*Романтик"  glink_sm="true"  ]
[s  ]
*Друг

[tb_show_message_window  ]
[tb_start_text mode=1 ]
Спасибо! Всегда знал, что на тебя можно положиться! Э-э-э, в переносном смысле. разумеется... Короче![p]
[_tb_end_text]

[jump  storage="scene1.ks"  target="*Выбор"  ]
*Романтик

[tb_show_message_window  ]
[tb_start_text mode=1 ]
Кто? Я?.. Хи-хи, а ты милая. Я скорее соленый после отработки... Не рекомендую пробовать. [p]
[_tb_end_text]

[tb_start_text mode=1 ]
Нет, не то, чтобы я в остальное время рекомендовал, но если ты сама захочешь, то... О Мерлин, что я несу! Прости! Я задумался. О пиве, да, о пиве. Конечно же. О том, как буду распивать пиво со своей дорогой подругой.[p]
[_tb_end_text]

[tb_start_text mode=1 ]
Так вот, что я там собирался спросить...[p]
[_tb_end_text]

[jump  storage="scene1.ks"  target="*Выбор"  ]
*Выбор

[tb_start_text mode=1 ]
Скажи мне честно, что ты любишь больше всего на свете?[p]
[_tb_end_text]

[tb_hide_message_window  ]
[glink  color="black"  storage="scene1.ks"  size="20"  x="540"  y="255"  width="189"  height="55"  text="Пиво"  _clickable_img=""  target="*Пиво"  glink_sm="true"  ]
[glink  color="black"  storage="scene1.ks"  size="20"  x="540"  y="330"  width="189"  height="55"  text="Тебя"  _clickable_img=""  target="*Тебя"  glink_sm="true"  ]
[s  ]
*Пиво

[tb_show_message_window  ]
[tb_start_text mode=1 ]
Я не сомневался в тебе. Держи![p]
[_tb_end_text]

[tb_image_show  time="1000"  storage="default/2e80d768207cbf01.png"  width="270"  height="353"  x="690"  y="175"  _clickable_img=""  name="img_27"  ]
[tb_start_text mode=1 ]
Пей с удовольствием, моя любимая... подруга. Моя любимая подруга. Да.[p]
[_tb_end_text]

[tb_start_text mode=1 ]
А я пойду, пожалуй.[p]
[_tb_end_text]

[chara_hide  name="Гаррет"  time="1000"  wait="true"  pos_mode="true"  ]
[tb_image_hide  time="1000"  ]
[jump  storage="scene1.ks"  target="*Конец"  ]
*Тебя

[tb_show_message_window  ]
[tb_start_text mode=1 ]
Ч-чт.. Что?[p]
[_tb_end_text]

[tb_start_text mode=1 ]
Ты это серьезно сейчас?[p]
[_tb_end_text]

[tb_hide_message_window  ]
[glink  color="black"  storage="scene1.ks"  size="20"  text="Да"  x="560"  y="260"  width="194"  height="49"  _clickable_img=""  glink_sm="true"  target="*Продолжение"  ]
[glink  color="black"  storage="scene1.ks"  size="20"  text="Абсолютно"  x="560"  y="330"  width="194"  height="49"  _clickable_img=""  glink_sm="true"  target="*Продолжение"  ]
[s  ]
*Продолжение

[tb_show_message_window  ]
[tb_start_text mode=1 ]
Я... О Мерлин, я... Я тоже тебя люблю. Собирался сказать еще в прошлый вторник, но не нашел подходящих слов. Или в среду? А, не важно.[p]
[_tb_end_text]

[tb_start_text mode=1 ]
Хмель мой, иди сюда.[p]
[_tb_end_text]

[tb_start_text mode=1 ]
Ты такая потрясающая. Подумать только, ты любишь меня. Пиво и меня. Идеальная женщина.[p]
[_tb_end_text]

[tb_start_text mode=1 ]
Будь моей женой...[p]
[_tb_end_text]

[tb_image_show  time="1000"  storage="default/Vybirayem_pomolvochnoye_kolechko_1.jpg"  width="388"  height="388"  x="650"  y="138"  _clickable_img=""  ]
[tb_start_text mode=1 ]
Заметь, это не вопрос...[p]
[_tb_end_text]

[tb_hide_message_window  ]
[tb_image_hide  time="1000"  ]
[chara_hide  name="Гаррет"  time="1000"  wait="true"  pos_mode="true"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
(и жили они долго и счастливо)[p]
[_tb_end_text]

[jump  storage="scene1.ks"  target="*Конец"  ]
*Конец

[tb_start_text mode=1 ]
Всё, конец.[p]
[_tb_end_text]

