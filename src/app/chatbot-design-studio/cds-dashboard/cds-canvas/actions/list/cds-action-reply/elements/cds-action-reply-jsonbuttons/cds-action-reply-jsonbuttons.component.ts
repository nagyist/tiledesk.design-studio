import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoggerService } from 'src/chat21-core/providers/abstract/logger.service';
import { LoggerInstance } from 'src/chat21-core/providers/logger/loggerInstance';

import { LIST_JSON_MODEL_REPLY_V1, LIST_JSON_MODEL_REPLY_V2, JSON_MODEL_PLACEHOLDER } from 'src/app/chatbot-design-studio/utils-jsonbuttons';
import { IntentService } from 'src/app/chatbot-design-studio/services/intent.service';
import { TYPE_ACTION } from 'src/app/chatbot-design-studio/utils-actions';
import { DOCS_LINK } from 'src/app/chatbot-design-studio/utils';

@Component({
  selector: 'cds-action-reply-jsonbuttons',
  templateUrl: './cds-action-reply-jsonbuttons.component.html',
  styleUrls: ['./cds-action-reply-jsonbuttons.component.scss']
})
export class CdsActionReplyJsonbuttonsComponent implements OnInit {

  showJsonBody: boolean =  false;
  jsonPlaceholder: string = JSON_MODEL_PLACEHOLDER;
  listType: any = {};
  link: any;
  exampleSelected: null;

  @Input() jsonBody: string;
  @Output() changeJsonButtons = new EventEmitter();
  
  private readonly logger: LoggerService = LoggerInstance.getInstance();

  constructor(
    private readonly intentService: IntentService
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  ngAfterViewInit (): void {
    // empty
  }

  initialize(){
    this.listType = LIST_JSON_MODEL_REPLY_V1; 
    if(this.intentService.selectedAction._tdActionType !== TYPE_ACTION.REPLY){
      this.listType = LIST_JSON_MODEL_REPLY_V2; 
    };
    if(this.jsonBody && this.jsonBody.trim() !== ''){
      this.showJsonBody = true;
    } else {
      this.showJsonBody = false;
      this.jsonBody = '';
    }
    this.link = DOCS_LINK.JSON_BUTTONS;
  }


  // ACTIONS //

  /** onDeleteJsonButtons */
  onChangeJsonButtonsType(event){
    this.jsonBody = event['value'];
    this.showJsonBody = true;
    this.exampleSelected = null;
    this.changeJsonButtons.emit(this.jsonBody);
  }

  /** onDeleteJsonButtons */
  onResetJsonButtonsType(event){
    this.jsonBody = '';
    this.showJsonBody = false;
    this.exampleSelected = null;
    this.changeJsonButtons.emit(this.jsonBody);
  }

  /** onClickJsonButtons */
  onClickJsonButtons(){
    if(!this.showJsonBody){
      this.showJsonBody = true;
    }
  }

  /** onDeleteJsonButtons */
  onDeleteJsonButtons(){
    this.showJsonBody = false;
    this.jsonBody = '';
    this.changeJsonButtons.emit();
  }

  /** onChangeJsonTextarea */
  onChangeJsonTextarea(text:string) {
    this.jsonBody = text;
    // // this.changeJsonButtons.emit(text);
  }

  /** onBlurJsonTextarea */
  onBlurJsonTextarea(event:any){
    this.logger.log('[ACTION REPLY jsonbuttons] onBlurJsonTextarea ', event);
    const json = event.target?.value;
    if(!json || json.trim() === ''){
      this.showJsonBody = false;
    }
    this.changeJsonButtons.emit(json);
  }
    
}
