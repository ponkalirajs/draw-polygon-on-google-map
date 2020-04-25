import { Component, AfterViewInit } from '@angular/core';
import { MapLoaderService } from './map.loader'
declare var google: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'google-map-polygon';
  map: any;
  drawingManager: any;
  currentLat;
  currentLong;
  imgUrl;
  infowindow: any;

  ngAfterViewInit() {
    MapLoaderService.load().then(() => {
      this.drawPolygon();
    })
  }

  drawPolygon() {

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 53,
        lng: 0
      },
      zoom: 13
    });
    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon']
      },
      //drawingMode: null
    });
    var infowindow = new google.maps.InfoWindow();
    let result: any[] = [];
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
      var area = google.maps.geometry.spherical.computeArea(polygon.getPath());
      infowindow.setContent("polygon area=" + area.toFixed(2) + " sq meters");
      infowindow.setPosition(polygon.getPath().getAt(0));
      infowindow.open(map);
      result.push(area);
      console.log('result', result);
      console.log('area: ', area);
      console.log('polygon', polygon);
    });
    drawingManager.setMap(map);
  }
}
