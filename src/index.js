module.exports = function check(str, bracketsConfig) {
  let stack = [];

  let lenstr = str.length;
  if (lenstr % 2 != 0) return false; // Сразу проверка на четность длины. Если нечетная - сразу понятно, что будет где-то лишняя скобка

  let lenConfig = bracketsConfig.length;
  let checkevenSeven = 1; // переменная, отвечающая за цифру 7, а именно за ее наличие в строке и ее закрытии как скобки
  let checkevenEight = 1; // аналогично, только для цифры 8
  let checkeven = 1; // для символа |
  let cheven; // сюда записываем сам элемент, который м.б как открывающимся, так и закрывающимся
  let chClose; 
  for (let i = 0; i < lenstr; i++) {
      let ch = str.charAt(i);
      let close = false; // переменная, которая передают сам факт закрытия скобок
      let open = false; // аналогично, только наоборот
      let even = false; // отвечает за элемент |
      let evenSeven = false; // за 7
      let evenEight = false // за 8
      for (let j = 0; j < lenConfig; j++) {
          if (bracketsConfig[j][0] == bracketsConfig[j][1] && ch == bracketsConfig[j][0] && ch == '7') { // если в массиве bracketsConfig открывающий элемент равен закрывающему, 
                                                                                                         // текущий элемент равен открывающему и он равен 7
              evenSeven = true; // говорим, что получили 7
              checkevenSeven = (-1) * checkevenSeven; // перекидываем счетчик, чтобы потом сказать, что эта семерка - открывающая скобка
              cheven = ch; // далее запишем ее в отдельную переменную
              break;
          }

          // далее аналогично 7, проверяем 8 и | 
          if (bracketsConfig[j][0] == bracketsConfig[j][1] && ch == bracketsConfig[j][0] && ch == '8') {
            evenEight = true;
            checkevenEight = (-1) * checkevenEight;
            cheven = ch;
            break;
          }
          if (bracketsConfig[j][0] == bracketsConfig[j][1] && ch == bracketsConfig[j][0]) {
            even = true;
            checkeven = (-1) * checkeven;
            cheven = ch;
            break;
        }
        // если у нас нормальные скобки (под нормальными имеется в виду те скобки, которые отличаются между собой), то сразу прыгаем сюда, пропуская 3 предыдущих условия
          if (ch == bracketsConfig[j][0]) {
              open = true;
              break;
          }
          if (ch == bracketsConfig[j][1]) {
              close = true;
              chClose = bracketsConfig[j][0];
              break;
          }
      }
      if (evenSeven == true) { // если у нас есть 7
          if (checkevenSeven == -1) { // и она открывающая
              stack.push(ch); // пушим ее в массив
          }
          if (checkevenSeven == 1 && cheven == stack[stack.length - 1]) { // если мы получили закрывающую 7
              stack.pop();  // достаем из массива
          }
        }
        else if (evenEight == true) { // аналогично с 8
            if (checkevenEight == -1) {
                stack.push(ch);
            }
            if (checkevenEight == 1 && cheven == stack[stack.length - 1]) {
                stack.pop();
            }
        } else if (even == true) { // и |
          if (checkeven == -1) {
              stack.push(ch);
          }
          if (checkeven == 1 && cheven == stack[stack.length - 1]) {
              stack.pop();
          }
      } else { // если передаваемые символы не 7, 8 или |

          if (open === true) { // если скобка открывающая
              stack.push(ch); // пушим
          }
          if (close === true && chClose == stack[stack.length - 1]) { // если скобка закрывающая и она должна закрывать нужную открывающую скобку
              stack.pop(); // достаем из массива открывающую скобку
          }
      }
  }
  return (stack.length === 0); // если длина массива равна 0, то все скобки закрылись успешно, => вернется true, иначе false
}

