'use strict';

(function() {
    const body = document.body;
    const arLabel = body.querySelectorAll('.service');
    const arResInt = {
        'ENGINE_CLEAR' : 0.12,
        'ENGINE_OWN' : 0.40
    };

    let arRes = {};
    let upPrice = 0; //наценка
    let obResult = body.querySelector("#result"); // document.getElementById('result')

    arLabel.forEach(item => {

        //выбираем поле для обработки
        let obField = item.querySelector('input[type=checkbox], input[type=text]');

        //Если тип поля чекбокс
        if(obField.type === 'checkbox') {
            obField.addEventListener('click', function() {
                let code = obField.name;
                let value = arResInt[code];

                if(obField.checked) { //если чекбокс выбран то мы наращиваем наценку
                    upPrice = upPrice + value;
                }
                else {
                    upPrice -= value;
                }
            });
        }

        //Если тип поля текст
        if(obField.type === 'text') {
            obField.addEventListener('keyup', function() {
                arRes[obField.name] = parseFloat(obField.value);
            });
        }

        //Глобальное условие изменения всех полей, общий пересчет и вывод в результат
        obField.addEventListener('change', () => {
            let up = (upPrice > 0) ? upPrice + 1 : 1;
            let result = 0;

            for(let i in arRes) {
                result += arRes[i];
            }

            obResult.innerText = result * up;
        });

    });

})(window);