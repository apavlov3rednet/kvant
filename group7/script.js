'use strict';

function Calc() {
    return {
        Init: function() {
            this.arFields = document.body.querySelectorAll('input');
            this.obResult = document.getElementById('result');
            this.obField = document.body.querySelector('input[type=text]');
            this.arRes = {};

            this.InitDefault();

            this.arFields.forEach(item => {
                this.BindEvent(item, 'change');
                this.BindEvent(item, 'keyup');
            });
        },

        InitDefault: function() {
            this.obField.value = 10000;
            this.ReCalc();
        },

        BindEvent: function(item, event) {
            let self = this;
            let regExr = new RegExp('^[0-9]{1,}$');

            item.addEventListener(event, function(e) {
                if(event === 'keyup')
                    self.ShowError(item, !item.value.match(regExr));
                self.ReCalc();
            });
        },

        ShowError: function(item, isset = false) {
            if(isset)
                item.setAttribute('style', 'color:red; font-weight: bold; border-bottom: 1px solid red;');
            else 
                item.removeAttribute('style');
        },

        GetUpPrice: function() {
            let result = 0;
            this.arFields.forEach(item => {
                if(item.checked)
                    result += parseFloat(item.dataset.value); //parseInt для целых чисел
            });
            return result + 1;
        },

        ReCalc: function() {
            let upCheckbox = this.GetUpPrice();
            let resultField = parseFloat(this.obField.value);
            let result = (resultField * upCheckbox).toLocaleString() + ' руб.';

            let obTotalResult = document.createElement('b');
            obTotalResult.innerText = result;
            this.obResult.innerText = 'Полная стоимость: ';
            this.obResult.append(obTotalResult);
        }
    }
}

let calc = Calc();
calc.Init();


// (function() {
//     const body = document.body; //document.querySelector('body');
//     const arLabel = body.querySelectorAll('label');
//     let arRes = {};

//     let obResult = document.getElementById('result'); //только от document
//     let upPrice = 0; //наценка

//     console.log(arLabel);

//     arLabel.forEach(function(item) {
//         let field = item.querySelector('[type=text], [type=checkbox]');
//         let r = 0;
//         let result = 0;

//         //chekboxes
//         if(field.type === 'checkbox') {
//             field.addEventListener('click', function(event) {
//                 let value = parseFloat(field.dataset.value);

//                 if(field.checked) {
//                     upPrice = upPrice + value;
//                 }
//                 else {
//                     upPrice -= value;
//                 }
//             });
//         }

//         //text fields
//         if(field.type === 'text') {
//             field.addEventListener('keyup', e => {
//                 let regExr = new RegExp('^[0-9]{1,}$');
//                 let arCheckboxes = body.querySelectorAll('[type=checkbox]');

//                 if(!field.value.match(regExr)) {
//                     item.style.color = "red";
//                     item.style.fontWeight = 'bold';
//                     item.style.borderBottom = '1px dashed red';

//                     console.log(item.style);

//                     arCheckboxes.forEach(checkbox => {
//                         checkbox.setAttribute('disabled', true);
//                     });
//                 }
//                 else {
//                     //item.style.color = "black";
//                     item.removeAttribute('style');
//                     arCheckboxes.forEach(checkbox => {
//                         checkbox.removeAttribute('disabled'); //setAttribute('disabled', false)
//                     });
//                 }

//                 arRes[field.name] = parseFloat(field.value);
//             });
//         }

//         field.addEventListener('change', ()=>{
//             let up = (upPrice > 0) ? upPrice + 1 : 1;
//             let res = 0;
//             let result = 0;

//             for(let i in arRes) {
//                 res += arRes[i];
//             }

//             result = (res * up).toLocaleString() + ' руб.'; //3000 | 3 000 000 000

//             let totalResult = document.createElement('b');
//             totalResult.innerText = result;

//             obResult.innerText = 'Полная стоимость: '; //removeContent, obResult.innerHTML
//             obResult.append(totalResult);
//         });

//     });
// })(window);
