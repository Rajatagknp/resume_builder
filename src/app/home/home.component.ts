import { Component, ElementRef, ViewChild, EventEmitter, Input, Output, ViewEncapsulation, OnInit } from "@angular/core";
import * as jspdf from 'jspdf';
import * as _moment from 'moment';
import html2canvas from 'html2canvas';
import {defaultFormat as _rollupMoment} from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from "@angular/material/core";

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: "home",
  styleUrls:["home.component.scss"],
  templateUrl: './home.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  encapsulation: ViewEncapsulation.Emulated
})

export class homecomponent implements OnInit{

  skill_text:any[] = ['JavaScript','HTML','nodeJS']
  star_array:any = []

  ngOnInit(){
    for(let i=0;i<this.skill_text.length;i++){
      let start_value = ['star_border','star_border','star_border','star_border','star_border']
      this.star_array.push(start_value)
    }
  }

  change_rating(value_1:any,value_2:any){
    if(this.star_array[value_1][value_2]=='star'){
      for(let i=value_2+1;i<5;i++){
        this.star_array[value_1][i]='star_border'
      }
    }else{
      for(let i=0;i<value_2+1;i++){
        this.star_array[value_1][i]='star'
      }
    }
  }


  number_of_entries:any = [1];
  interest_entries:any = [1];
  education_entries:any = [1];

  add_more(){
    this.number_of_entries.push(this.number_of_entries.length);
  }
  add_more_int(){
    this.interest_entries.push(this.interest_entries.length)
  }
  add_more_edu(){
    this.education_entries.push(this.education_entries)
  }
  del_int(value:number){
    this.interest_entries.splice(value,1)
    console.log(this.interest_entries)
  }
  
  @ViewChild('content') content!: ElementRef;
  button_dis:boolean = true;
  pdf_generator(value:any){
    let data:any = document.getElementById(value);
    this.button_dis = (!this.button_dis)
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf.jsPDF();
      let options = {
        pagesplit: true
      };
      console.log(this.button_dis)
      pdf.addImage(contentDataURL, 'JPEG', 0, 0, 208, canvas.height*208/canvas.width);
      // pdf.save('a4.pdf');
    });
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}