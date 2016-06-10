System.register(['@angular/core', 'moment'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, moment_1;
    var DatePickerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            DatePickerComponent = (function () {
                function DatePickerComponent() {
                    this.value = '';
                    this.dates = [];
                    this.showDp = 'none';
                    this.selectedDate = new core_1.EventEmitter();
                }
                DatePickerComponent.prototype.ngOnChanges = function () {
                    this.daysofWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
                    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    this.currMonth = this.months[new Date().getMonth()].toString();
                    this.currYear = new Date().getFullYear().toString();
                    //Set previous and next months
                    this.prevMonth = this.months[new Date().getMonth() - 1].toString();
                    this.nextMonth = this.months[new Date().getMonth() + 1].toString();
                    this.prevYear = (parseInt(this.currYear) - 1).toString();
                    this.nextYear = (parseInt(this.currYear) + 1).toString();
                    //Set Date Array
                    if (this.value != '') {
                        var givenDate = moment_1.default(this.value);
                        this.currMonth = this.months[givenDate.month()].toString();
                        this.currYear = givenDate.year().toString();
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
                    //Set new previous month
                    var tempDate = new Date(this.currMonth + '/' + '1' + '/' + this.currYear);
                    if (this.currMonth == 'Jan') {
                        //Set previous month to December
                        this.prevMonth = this.months[11].toString();
                    }
                    else
                        this.prevMonth = this.months[tempDate.getMonth() - 1].toString();
                    if (this.currMonth == 'Dec') {
                        //Set current year to previous year
                        this.currYear = this.prevYear;
                        this.prevYear = (parseInt(this.currYear) - 1).toString();
                        this.nextYear = (parseInt(this.currYear) + 1).toString();
                    }
                    //Set Date Array to previous month
                    this.dates = this.setDateArray(this.currMonth, this.currYear, '');
                };
                DatePickerComponent.prototype.setNextMonth = function () {
                    this.prevMonth = this.currMonth;
                    this.currMonth = this.nextMonth;
                    //Set new next month
                    var tempDate = new Date(this.currMonth + '/' + '1' + '/' + this.currYear);
                    if (this.currMonth == 'Dec') {
                        //Set next month to January
                        this.nextMonth = this.months[0].toString();
                    }
                    else
                        this.nextMonth = this.months[tempDate.getMonth() + 1].toString();
                    if (this.currMonth == 'Jan') {
                        //Set current year to previous year
                        this.currYear = this.nextYear;
                        this.prevYear = (parseInt(this.currYear) - 1).toString();
                        this.nextYear = (parseInt(this.currYear) + 1).toString();
                    }
                    //Set Date Array to next month
                    this.dates = this.setDateArray(this.currMonth, this.currYear, '');
                };
                DatePickerComponent.prototype.setDateArray = function (month, year, date) {
                    var tempLastDate = this.decideDate(month, year);
                    var temp = [];
                    for (var i = 1; i <= tempLastDate; i++) {
                        var currentDate = moment_1.default().year(year).month(month).date(i);
                        var pastDate = moment_1.default(this.minDate);
                        var futureDate = moment_1.default(this.maxDate).add(1, 'd');
                        var dbld = false;
                        //To disable Days - Index based 0-6
                        for (var dayIndex = 0; dayIndex < this.disableDays.length; dayIndex++) {
                            if (currentDate.day() == this.disableDays[dayIndex]) {
                                dbld = true;
                            }
                        }
                        if (currentDate.isBefore(this.minDate, true) || currentDate.isAfter(futureDate, true)) {
                            dbld = true;
                        }
                        if (i != date)
                            temp.push({ 'month': this.months.indexOf(month) + 1, 'date': i, 'disabled': dbld, 'selected': false, 'empty': false });
                        else
                            temp.push({ 'month': this.months.indexOf(month) + 1, 'date': i, 'disabled': dbld, 'selected': true, 'empty': false });
                    }
                    this.completeDates = temp;
                    //Determine Date of First of the Month
                    var firstDate = new Date(month + '/' + '1' + '/' + year);
                    var lastDate = new Date(month + '/' + tempLastDate + '/' + year);
                    //Prepend Prev Month Dates
                    var spaceArray = [];
                    if (firstDate.getDay() != 0) {
                        //Not Sunday
                        var pMonth = this.months.indexOf(month) - 1;
                        var prevLast = this.decideDate(this.months[pMonth], year);
                        //Fix it to display last date last
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
                    //Append Next Month Dates
                    if (lastDate.getDay() != 6) {
                        //Not Saturday
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
                                //Feb
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
                                //April, June, September, November
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
                            //Set the new date array with active date
                            this.dates = this.setDateArray(this.currMonth, this.currYear, sDate.date);
                            var selDate = moment_1.default().year(this.currYear).month(this.currMonth).date(sDate.date).format('MM/DD/YYYY', true);
                            this.selectedDate.next(selDate);
                        }
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DatePickerComponent.prototype, "minDate", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DatePickerComponent.prototype, "maxDate", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DatePickerComponent.prototype, "disableDays", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], DatePickerComponent.prototype, "toContainPrevMonth", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], DatePickerComponent.prototype, "toContainNextMonth", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], DatePickerComponent.prototype, "value", void 0);
                DatePickerComponent = __decorate([
                    core_1.Component({
                        selector: 'date-picker',
                        templateUrl: 'app/datepicker.html',
                        styleUrls: ['app/datepicker.css'],
                        outputs: ['selectedDate']
                    }), 
                    __metadata('design:paramtypes', [])
                ], DatePickerComponent);
                return DatePickerComponent;
            }());
            exports_1("DatePickerComponent", DatePickerComponent);
        }
    }
});
//# sourceMappingURL=datepicker.js.map