import { Component, ElementRef, ViewChild, EventEmitter, Input, Output, ViewEncapsulation, OnInit } from "@angular/core";
import * as jspdf from 'jspdf';
import * as _moment from 'moment';
import html2canvas from 'html2canvas';
import {defaultFormat as _rollupMoment} from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from "@angular/material/core";


import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

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

  // month_array:any[] = ['January','February','March','April','May','June','July','August','September','October','November','December']
  month_array:any[] = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  year_array:any[] = []
  skill_text:any[] = [0]
  star_array:any = []

  add_more_skill(){
    this.skill_text.push(this.skill_text.length)
    this.star_array = []
    for(let i=0;i<this.skill_text.length;i++){
      let start_value = ['star_border','star_border','star_border','star_border','star_border']
      this.star_array.push(start_value)
    }
  }

  ngOnInit(){
    for(let i=1990;i<2090;i++){
      this.year_array.push(i)
    }
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

  @ViewChild('content')
  container!: ElementRef;

  button_dis:boolean = true;
  pdf_generator(value:any){
    this.button_dis = (!this.button_dis)
    setTimeout(() => {
      if(!this.button_dis){
        let data:any = document.getElementById(value)
        let convas_width = this.container.nativeElement.offsetWidth;
        let convas_height = this.container.nativeElement.offsetHeight;
        let options = {
          // pagesplit: true
        };
        html2canvas(data).then(canvas => {
          let contentDataURL = canvas.toDataURL('jpeg',1)
          // let pdf = new jspdf.jsPDF('p', 'mm', [297, 210]);
          // pdf.addImage(contentDataURL, 'jpeg', 0, 0, 0, 0);
          // pdf.save('a4.pdf');
          let docDefinition = {
            content: [{
              image: contentDataURL,
              width: 500,
            }]
          };
          pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
        });
      }
    }, 1000);
  }
  
  imgurl:any = "../../assets/img_leave/User Image.png";
  upload_photo:boolean = false;
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.upload_photo = true;
        this.imgurl = event.target?.result;
      }
    }
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}