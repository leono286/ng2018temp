import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-call-for-papers',
  templateUrl: './call-for-papers.component.html',
  styleUrls: ['./call-for-papers.component.scss']
})
export class CallForPapersComponent implements OnInit, AfterViewInit {

  parallaxBox;
  @ViewChild('bigCircle') bigCircle: ElementRef;
  @ViewChild('middleCircle') middleCircle: ElementRef;
  @ViewChild('smallCircle') smallCircle: ElementRef;
  viewPortWidth;
  viewPortHeight;
  // bcleft;
  // bctop;
  // mcleft;
  // mctop;
  // scleft;
  // sctop;
  rotation = 0;
  delta = 10;
  bounceCounter = 0;


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.parallaxBox = document.getElementById('box');
    this.getViewPortBoundaries();
  }


  animateElements(event) {

    if (this.bounceCounter == 0) {

      
      event = event || window.event;
      let x = event.clientX - this.parallaxBox.offsetLeft,
      y = event.clientY - this.parallaxBox.offsetTop;

      
      let offsetX = 0.5 - event.pageX / this.viewPortWidth;
      let offsetY = 0.5 - event.pageY / this.viewPortHeight;
  
      let bc = this.bigCircle.nativeElement;
      let mc = this.middleCircle.nativeElement;
      let sc = this.smallCircle.nativeElement;

      let offsetXForBC = parseInt(bc.x);
      let offsetYForBC = parseInt(bc.y);
      let offsetXForMC = parseInt(mc.x);
      let offsetYForMC = parseInt(mc.y);
      let offsetXForSC = parseInt(sc.x);
      let offsetYForSC = parseInt(sc.y);
      this.rotation += 0.6;
      
      let transformBC = "translate(" + Math.round(offsetX * offsetXForBC / this.delta) + "px," + Math.round(offsetY * offsetYForBC / this.delta) + "px) rotate(" + this.rotation + "deg)";
      let transformMC = "translate(" + Math.round(offsetX * offsetXForMC / this.delta) + "px," + Math.round(offsetY * offsetYForMC / this.delta) + "px) rotate(" + this.rotation + "deg)";
      let transformSC = "translate(" + Math.round(offsetX * offsetXForSC / this.delta) + "px," + Math.round(offsetY * offsetYForSC / this.delta) + "px) rotate(" + this.rotation + "deg)";
      bc.style.transform = transformBC;
      mc.style.transform = transformMC;
      sc.style.transform = transformSC;
      
      console.log(offsetYForBC);
      this.bounceCounter = 1;
      
    } else {
      this.bounceCounter = 0; 
    }
  }

  getViewPortBoundaries(): void {
    this.viewPortWidth = window.innerWidth;
    this.viewPortHeight = window.innerHeight;
  }

  mouseParallax(element, left, top, mouseX, mouseY, speed) {
    // var obj = document.getElementById(id);
    var obj = element;
    var parentObj = obj.parentElement,
      containerWidth = parentObj.offsetWidth,
      containerHeight = parentObj.offsetHeight;
    let leftVariation = left - (((mouseX - (obj.offsetWidth / 2 + left)) / containerWidth) * speed);
    let topVariation = top - (((mouseY - (obj.offsetHeight / 2 + top)) / containerHeight) * speed);
    this.rotation += 0.5;
    // console.log((leftVariation - obj.offsetLeft)*180);

    obj.style.left = leftVariation + 'px';
    obj.style.top = topVariation + 'px';
    //  obj.style.transform = 'rotate(280deg)';
    obj.style.transform = `rotate(${this.rotation}deg)`;
  }

  updateValues(event) {
    // console.info(event)
  }

}
