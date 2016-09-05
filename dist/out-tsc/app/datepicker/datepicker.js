var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter } from '@angular/core';
import { FaDirective } from 'angular2-fontawesome/directives';
import * as moment from 'moment';
export var DatePickerComponent = (function () {
    function DatePickerComponent() {
        this.value = '';
        this.dates = [];
        this.showDp = 'none';
        this.selectedDate = new EventEmitter();
    }
    DatePickerComponent.prototype.ngOnChanges = function () {
        this.daysofWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.currMonth = this.months[new Date().getMonth()].toString();
        this.currYear = new Date().getFullYear();
        this.prevMonth = this.months[new Date().getMonth() - 1].toString();
        this.nextMonth = this.months[new Date().getMonth() + 1].toString();
        this.prevYear = this.currYear - 1;
        this.nextYear = this.currYear + 1;
        if (this.value != '') {
            var givenDate = moment(this.value, "MM/DD/YYYY", true);
            this.currMonth = this.months[givenDate.month()].toString();
            this.currYear = givenDate.year();
            this.dates = this.setDateArray(this.currMonth, this.currYear, givenDate.date());
        }
        else {
            this.dates = this.setDateArray(this.currMonth, this.currYear, '');
        }
    };
    DatePickerComponent.prototype.openDatePicker = function () {
        if (this.showDp == 'none')
            this.showDp = 'block';
        else
            this.showDp = 'none';
    };
    DatePickerComponent.prototype.setPrevMonth = function () {
        this.nextMonth = this.currMonth;
        this.currMonth = this.prevMonth;
        var tempDate = new Date(this.currMonth + '/' + '1' + '/' + this.currYear);
        if (this.currMonth == 'Jan') {
            this.prevMonth = this.months[11].toString();
        }
        else
            this.prevMonth = this.months[tempDate.getMonth() - 1].toString();
        if (this.currMonth == 'Dec') {
            this.currYear = this.prevYear;
            this.prevYear = this.currYear - 1;
            this.nextYear = this.currYear + 1;
        }
        this.dates = this.setDateArray(this.currMonth, this.currYear, '');
    };
    DatePickerComponent.prototype.setNextMonth = function () {
        this.prevMonth = this.currMonth;
        this.currMonth = this.nextMonth;
        var tempDate = new Date(this.currMonth + '/' + '1' + '/' + this.currYear);
        if (this.currMonth == 'Dec') {
            this.nextMonth = this.months[0].toString();
        }
        else
            this.nextMonth = this.months[tempDate.getMonth() + 1].toString();
        if (this.currMonth == 'Jan') {
            this.currYear = this.nextYear;
            this.prevYear = this.currYear - 1;
            this.nextYear = this.currYear + 1;
        }
        this.dates = this.setDateArray(this.currMonth, this.currYear, '');
    };
    DatePickerComponent.prototype.setDateArray = function (month, year, date) {
        var tempLastDate = this.decideDate(month, year);
        var temp = [];
        for (var i = 1; i <= tempLastDate; i++) {
            var currentDate = moment(new Date().toString(), 'MM/DD/YYYY').year(year).month(month).date(i);
            var pastDate = moment(this.minDate, 'MM/DD/YYYY');
            var futureDate = moment(this.maxDate, 'MM/DD/YYYY').add(1, 'd');
            var dbld = false;
            for (var dayIndex = 0; dayIndex < this.disableDays.length; dayIndex++) {
                if (currentDate.day() == this.disableDays[dayIndex]) {
                    dbld = true;
                }
            }
            if (currentDate.isBefore(pastDate, 'day') || currentDate.isAfter(futureDate, 'day')) {
                dbld = true;
            }
            if (i != date)
                temp.push({ 'month': this.months.indexOf(month) + 1, 'date': i, 'disabled': dbld, 'selected': false, 'empty': false });
            else
                temp.push({ 'month': this.months.indexOf(month) + 1, 'date': i, 'disabled': dbld, 'selected': true, 'empty': false });
        }
        this.completeDates = temp;
        var firstDate = new Date(month + '/' + '1' + '/' + year);
        var lastDate = new Date(month + '/' + tempLastDate + '/' + year);
        var spaceArray = [];
        if (firstDate.getDay() != 0) {
            var pMonth = this.months.indexOf(month) - 1;
            var prevLast = this.decideDate(this.months[pMonth], year);
            for (var i = 0; i < firstDate.getDay(); i++) {
                if (this.toContainPrevMonth) {
                    spaceArray.push({ 'month': firstDate.getMonth() - 1, 'date': prevLast, 'disabled': true, 'selected': false, 'empty': false });
                }
                else {
                    spaceArray.push({ 'month': '', 'date': '', 'disabled': false, 'selected': false, 'empty': true });
                }
                prevLast--;
            }
        }
        this.tempArray = spaceArray.reverse().concat(this.completeDates);
        if (lastDate.getDay() != 6) {
            var nIndex = 1;
            for (var i = 6; i > lastDate.getDay(); i--) {
                if (this.toContainNextMonth) {
                    this.tempArray.push({ 'month': firstDate.getMonth() + 1, 'date': nIndex, disabled: true, 'selected': false, 'empty': false });
                }
                else {
                    this.tempArray.push({ 'month': '', 'date': '', disabled: false, 'selected': false, 'empty': true });
                }
                nIndex++;
            }
        }
        var tempDateChild = [];
        var tempDateMain = [];
        for (var date_1 in this.tempArray) {
            if ((parseInt(date_1) + 1) % 7 == 0) {
                tempDateChild.push(this.tempArray[date_1]);
                tempDateMain.push(tempDateChild);
                tempDateChild = [];
            }
            else {
                tempDateChild.push(this.tempArray[date_1]);
            }
        }
        return tempDateMain;
    };
    DatePickerComponent.prototype.decideDate = function (month, year) {
        var last = 31;
        switch (month) {
            case 'Feb':
                {
                    last = 28;
                    if ((parseInt(year) % 4) == 0)
                        last = last + 1;
                }
                break;
            case 'Apr':
            case 'Jun':
            case 'Sep':
            case 'Nov':
                {
                    last = 30;
                }
                break;
            default: break;
        }
        return last;
    };
    DatePickerComponent.prototype.setDate = function (sDate) {
        if (!sDate.disabled) {
            if (sDate.date != '') {
                this.dates = this.setDateArray(this.currMonth, this.currYear, sDate.date);
                var selDate = moment().year(this.currYear).month(this.currMonth).date(sDate.date).format('MM/DD/YYYY');
                this.selectedDate.next(selDate);
            }
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], DatePickerComponent.prototype, "minDate", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], DatePickerComponent.prototype, "maxDate", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Array)
    ], DatePickerComponent.prototype, "disableDays", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], DatePickerComponent.prototype, "toContainPrevMonth", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], DatePickerComponent.prototype, "toContainNextMonth", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], DatePickerComponent.prototype, "value", void 0);
    DatePickerComponent = __decorate([
        Component({
            selector: 'date-picker',
            templateUrl: 'datepicker.html',
            styleUrls: ['datepicker.css'],
            outputs: ['selectedDate'],
            directives: [FaDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], DatePickerComponent);
    return DatePickerComponent;
}());
//# sourceMappingURL=../../../../src/app/datepicker/datepicker.js.map