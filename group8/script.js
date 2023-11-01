'use strict';

function Calc() {
    return {
        totalPrice: 0,
        upPrice: 0,

        Init: function() {
            this.obBody = document.body;
            this.arInputsUp = this.obBody.querySelectorAll('[type=checkbox]');
            this.obField = this.obBody.querySelector('[type=text]');
            this.obResult = document.getElementById('result');
            this.arFields = this.obBody.querySelectorAll('input');
            this.InitDefault();

            this.arFields.forEach(item => {
                let self = this;
                self.bindEvent(item, 'change');
                self.bindEvent(item, 'keyup');
            });

        },

        InitDefault: function() {
            this.obField.value = 1000;
            this.reCalc();
        },

        bindEvent: function(item, e) {
            let self = this;
            let regExr = new RegExp('^[0-9]{1,}$');

            item.addEventListener(e, function(event) {
                if(event === 'keyup') 
                    self.showError(item, !item.value.match(regExr));
                self.reCalc();
            });
        },

        showError: function(item, isset = false) {
            if(isset) {
                item.parentNode.style.color = "red";
                item.parentNode.style.fontWeight = 'bold';
                item.parentNode.style.borderBottom = '1px dashed red';
            }
            else {
                item.parentNode.removeAttribute('style');
            }
        },

        getUpPrice: function() {
            let result = 0;
            this.arInputsUp.forEach(item => {
                if(item.checked) 
                    result += parseFloat(item.dataset.value);
            });

            return result + 1;
        },

        reCalc: function() {
            let upCheckbox = this.getUpPrice();
            let resField = parseFloat(this.obField.value);
            let result = (resField * upCheckbox).toLocaleString() + ' руб.';

            let totalResult = document.createElement('b');
            totalResult.innerText = result;

            this.obResult.innerText = 'Полная стоимость: '; //removeContent, obResult.innerHTML
            this.obResult.append(totalResult);
        }
    }
}

let calc = Calc();
calc.Init();
