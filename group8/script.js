'use strict';

(function() {
    const body = document.body; //document.querySelector('body');
    const arLabel = body.querySelectorAll('label');
    // const arModify = {
    //     'ENGINE_CLEAR' : 0.12,
    //     'ENGINE_OWN' : 0.09
    // }

    let arRes = {};

    let obResult = document.getElementById('result'); //только от document
    let upPrice = 0; //наценка

    console.log(arLabel);

    arLabel.forEach(function(item) {
        let field = item.querySelector('[type=text], [type=checkbox]');
        let r = 0;
        let result = 0;

        //chekboxes
        if(field.type === 'checkbox') {
            field.addEventListener('click', function(event) {
                // let valueCode = event.target.name; //field.name
                // let value = arModify[valueCode];
                let value = parseFloat(field.dataset.value);

                if(field.checked) {
                    upPrice = upPrice + value;
                }
                else {
                    upPrice -= value;
                }
            });
        }

        //text fields
        if(field.type === 'text') {
            field.addEventListener('keyup', e => {
                let regExr = new RegExp('^[0-9]{1,}$');
                let arCheckboxes = body.querySelectorAll('[type=checkbox]');

                if(!field.value.match(regExr)) {
                    item.style.color = "red";
                    item.style.fontWeight = 'bold';
                    item.style.borderBottom = '1px dashed red';

                    console.log(item.style);

                    arCheckboxes.forEach(checkbox => {
                        checkbox.setAttribute('disabled', true);
                    });
                }
                else {
                    //item.style.color = "black";
                    item.removeAttribute('style');
                    arCheckboxes.forEach(checkbox => {
                        checkbox.removeAttribute('disabled'); //setAttribute('disabled', false)
                    });
                }

                arRes[field.name] = parseFloat(field.value);
            });
        }

        field.addEventListener('change', ()=>{
            let up = (upPrice > 0) ? upPrice + 1 : 1;
            let res = 0;
            let result = 0;

            for(let i in arRes) {
                res += arRes[i];
            }

            result = (res * up).toLocaleString() + ' руб.'; //3000 | 3 000 000 000

            let totalResult = document.createElement('b');
            totalResult.innerText = result;

            obResult.innerText = 'Полная стоимость: '; //removeContent, obResult.innerHTML
            obResult.append(totalResult);
        });

    });
})(window);
