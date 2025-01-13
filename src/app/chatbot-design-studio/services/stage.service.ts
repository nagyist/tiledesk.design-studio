import { Injectable } from '@angular/core';
import { TiledeskStage } from 'src/assets/js/tiledesk-stage.js';
import { LoggerService } from 'src/chat21-core/providers/abstract/logger.service';
import { LoggerInstance } from 'src/chat21-core/providers/logger/loggerInstance';
import { scaleAndcenterStageOnCenterPosition } from '../utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private alphaConnectorsSubject = new BehaviorSubject<number>(60);
  alphaConnectors$ = this.alphaConnectorsSubject.asObservable();

  tiledeskStage: any;
  loaded: boolean = false;

  private logger: LoggerService = LoggerInstance.getInstance()
  constructor() { }


  initializeStage(){
    this.tiledeskStage = new TiledeskStage('tds_container', 'tds_drawer', 'tds_draggable');
  }

  setDrawer(){
    this.tiledeskStage.setDrawer();
  }

  centerStageOnPosition(pos){
    let intervalId = setInterval(async () => {
      const result = await this.tiledeskStage.centerStageOnPosition(pos);
      if (result === true) {
        clearInterval(intervalId);
      }
    }, 100);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 1000);
  }

  centerStageOnTopPosition(pos){
    let intervalId = setInterval(async () => {
      const result = await this.tiledeskStage.centerStageOnTopPosition(pos);
      if (result === true) {
        clearInterval(intervalId);
      }
    }, 100);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 1000);
  }

  centerStageOnHorizontalPosition(pos){
    let intervalId = setInterval(async () => {
      const result = await this.tiledeskStage.centerStageOnHorizontalPosition(pos);
      if (result === true) {
        clearInterval(intervalId);
      }
    }, 100);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 1000);
  }


  setDragElement(elementId:string) {
    const element = document.getElementById(elementId);
    this.logger.log("[STAGE SERVICE] imposto il drag sull'elemento ", elementId, element);
    if(element)this.tiledeskStage.setDragElement(element);
  }
  

  physicPointCorrector(point){
    return this.tiledeskStage.physicPointCorrector(point);
  }


  async zoom(event: 'in' | 'out'){
    return await this.tiledeskStage.zoom(event);
    // return new Promise((resolve) => {
    //   const element = document.getElementById(elementId);
    //   let intervalId = setInterval(async () => {
    //     const result = await this.tiledeskStage.zoom(event, element);
    //     if (result === true) {
    //       clearInterval(intervalId);
    //       resolve(result);
    //     }
    //   }, 100);
    //   setTimeout(() => {
    //     clearInterval(intervalId);
    //     resolve(false);
    //   }, 1000);
    // });
  }

  scaleAndCenter(listOfintents){
    let resp = scaleAndcenterStageOnCenterPosition(listOfintents);
    return this.tiledeskStage.translateAndScale(resp.point, resp.scale);
    // this.logger.log('[CDS-CANVAS] moved-and-scaled ', el)
  }
  

  getScale(){
    return this.tiledeskStage.scale;
  }


  onSwipe(event: WheelEvent) {
    if (event.deltaX > 0) {
      // console.log('Swipe RIGHT');
      event.preventDefault();
    } else if (event.deltaX < 0) {
      // console.log('Swipe LEFT');
      event.preventDefault();
    }
    // if (event.deltaY > 0) {
    //   console.log('Swipe DOWN');
    // } else if (event.deltaY < 0) {
    //   console.log('Swipe UP');
    // }
  }

  setAlpha(alpha: number): void {
    this.alphaConnectorsSubject.next(alpha);
  }

  getAlpha(): number {
    return this.alphaConnectorsSubject.getValue();
  }



}
