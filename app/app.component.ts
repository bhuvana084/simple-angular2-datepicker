import {Component} from '@angular/core';
import {DatePickerComponent} from './datepicker';
import moment from 'moment';

@Component({
    selector: 'my-app',
    template: `
    	<h3>Angular 2 DatePicker</h3>
    	<input #dateText type='text' value={{selDate}} (change)="setInputDate($event)"/>
    	<date-picker
            [value]="value"
            [minDate]="minDate"
            [maxDate]="maxDate"
            [disableDays]="disableDays"
            [toContainPrevMonth]="toContainPrevMonth"
            [toContainNextMonth]="toContainNextMonth"
            (selectedDate)='setDate($event)'></date-picker>
    `,
	directives: [DatePickerComponent]
})
export class AppComponent {

	private selDate:string='MM/DD/YYYY';
  private minDate:string=moment('2016-01-01T00:00:00.0000Z').toISOString();
  private maxDate:string=moment('2017-12-31T00:00:00.0000Z').toISOString();
  private disableDays:Array<number>=[0,6];    //For Sunday and Saturday
  private toContainPrevMonth:boolean = false;
  private toContainNextMonth:boolean = false;
  private value:string=moment().toISOString();

  setInputDate(event) {
      this.value = event.target.value;
  }
	setDate(date){
		this.selDate = date;
	}

}
