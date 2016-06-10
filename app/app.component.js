System.register(['@angular/core', './datepicker', 'moment'], function(exports_1, context_1) {
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
    var core_1, datepicker_1, moment_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (datepicker_1_1) {
                datepicker_1 = datepicker_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.selDate = 'MM/DD/YYYY';
                    this.minDate = moment_1.default('2016-01-01T00:00:00.0000Z').toISOString();
                    this.maxDate = moment_1.default('2017-12-31T00:00:00.0000Z').toISOString();
                    this.disableDays = [0, 6]; //For Sunday and Saturday
                    this.toContainPrevMonth = false;
                    this.toContainNextMonth = false;
                    this.value = moment_1.default().toISOString();
                }
                AppComponent.prototype.setInputDate = function (event) {
                    this.value = event.target.value;
                };
                AppComponent.prototype.setDate = function (date) {
                    this.selDate = date;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    \t<h3>Angular 2 DatePicker</h3>\n    \t<input #dateText type='text' value={{selDate}} (change)=\"setInputDate($event)\"/>\n    \t<date-picker\n            [value]=\"value\"\n            [minDate]=\"minDate\"\n            [maxDate]=\"maxDate\"\n            [disableDays]=\"disableDays\"\n            [toContainPrevMonth]=\"toContainPrevMonth\"\n            [toContainNextMonth]=\"toContainNextMonth\"\n            (selectedDate)='setDate($event)'></date-picker>\n    ",
                        directives: [datepicker_1.DatePickerComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map