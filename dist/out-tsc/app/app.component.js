var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DatePickerComponent } from './datepicker/datepicker';
export var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
        this.selDate = 'MM/DD/YYYY';
        this.minDate = '01/01/2016';
        this.maxDate = '12/31/2017';
        this.disableDays = [0, 6];
        this.toContainPrevMonth = false;
        this.toContainNextMonth = false;
        this.value = '';
    }
    AppComponent.prototype.setInputDate = function (event) {
        this.value = event.target.value;
    };
    AppComponent.prototype.setDate = function (date) {
        this.selDate = date;
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            directives: [DatePickerComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=../../../src/app/app.component.js.map