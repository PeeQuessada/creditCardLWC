import { LightningElement, track } from 'lwc';

import BACKGROUND_CARD from '@salesforce/resourceUrl/backgroundCard';
import LOGO from '@salesforce/resourceUrl/logo';
import CHIP from '@salesforce/resourceUrl/chip';

export default class VoucherCardContainer extends LightningElement {

    backgroundCard = BACKGROUND_CARD;
    logo = LOGO;
    chip = CHIP;

    showFront = true;

    cardNumber = '';
    fullName;
    month;
    year;
    cvv;

    handleChangeValue(event) {
        let fieldName = event.target.dataset.field;
        this[fieldName] = event.target.value;
    }

    addFocus(event){
        this.changeFocus(event, 'add');
    }

    removeFocus(event) {
        this.changeFocus(event, 'remove');
    }

    teste1() {
        var test1 = setInterval(function () {  
            this.template.querySelector('[data-name="front"]').className = 'custom-card-item front custom-hidden'; 
            clearInterval(test1);  
            
        }.bind(this), 500); 
    }

    teste2() {
        var test2 = setInterval(function() {  
            this.template.querySelector('[data-name="back"]').className = 'custom-card-item back custom-hidden'; 
            this.template.querySelector('[data-name="front"]').className = 'custom-card-item front testeHide teste1802';
            clearInterval(test2);  
            
        }.bind(this), 500); 

    }

    virarParaTras() {
        this.showFront = false;
        this.template.querySelector('[data-name="front"]').className = 'custom-card-item front testeHide teste360 teste180Fixo ';
        this.template.querySelector('[data-name="back"]').className = 'custom-card-item back testeHide teste180';
        this.teste1();
    }

    changeFocus(event, type) { 

        if(!this.showFront) {
            this.teste2();
            this.template.querySelector('[data-name="back"]').className = 'custom-card-item back testeHide teste360 teste180Fixo ';
            this.showFront = true;
        }
        
        let fieldName = event.target.dataset.field;

        if(fieldName == 'month' || fieldName == 'year') {
            fieldName = 'validade';
        }

        let oldClass = this.template.querySelector('[data-name="'+ fieldName + '"]').className;

        if(type == 'add') {
            this.template.querySelector('[data-name="'+ fieldName + '"]').className = oldClass + ' border';
        }
        else {
            this.template.querySelector('[data-name="'+ fieldName + '"]').className = oldClass.replace('border', '');
        }


    }


    get showCardNumber() {
        let size = this.cardNumber.length;
        

        size = size == undefined ? 0 : size;

        let invalids = '';
        for(let i = 0; i < 16 - size; i++) {
            invalids = invalids + '#';
        }

        let formatedCardNumber = '';
        let cardNumberList = (this.cardNumber + invalids).split('');
        
        for(let i = 0; i < cardNumberList.length; i++) {
            formatedCardNumber = formatedCardNumber + cardNumberList[i];

            if((i+1) % 4 == 0) {
                formatedCardNumber = formatedCardNumber + ' ';
            }
        }


        return formatedCardNumber ;
    }

    get showFullName() {
        return this.fullName ? this.fullName : 'NOME COMPLETO';
    }

    get showValidity() {
        let month = this.month ? this.month : 'MM'; 
        let year = this.year ? this.year : 'YY';

        return month + '/' + year;
    }

    get monthOptions() {
        return [
            { label: 'Janeiro', value: '01' },
            { label: 'Fevereiro', value: '02' },
            { label: 'Março', value: '03' },
            { label: 'Abril', value: '04' },
            { label: 'Maio', value: '05' },
            { label: 'Junho', value: '06' },
            { label: 'Julho', value: '07' },
            { label: 'Agosto', value: '08' },
            { label: 'Setembro', value: '09' },
            { label: 'Outubro', value: '10' },
            { label: 'Novembro', value: '11' },
            { label: 'Dezembro', value: '12' },
        ];
    }

    get yearOptions() {
        let options = [];

        for(let i = 0; i < 10; i++) {
            let year = {
                label: 22 + i,
                value: 22 + i
            }
            options.push(year);
        }

        return options;
    }

}