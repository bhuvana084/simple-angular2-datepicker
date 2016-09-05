import { Component } from '@angular/core';
import { DatePickerComponent } from './datepicker/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [DatePickerComponent]
})
export class AppComponent {
  title = 'app works!';

  private selDate:string='MM/DD/YYYY';
  private minDate:string='01/01/2016';
  private maxDate:string='12/31/2017';
  private disableDays:Array<number>=[0,6];    //For Sunday and Saturday
  private toContainPrevMonth:boolean = false;
  private toContainNextMonth:boolean = false;
  private value:string='';

  setInputDate(event) {
    this.value = event.target.value;
  }

	setDate(date){
		this.selDate = date;
	}

}
