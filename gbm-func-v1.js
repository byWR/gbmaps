/*
GB Maps ギビマップ - © Karya IT (http://www.karyait.net.my/) 2012-2014. All rights reserved. 
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

GB Maps ギビマップ by Karya IT is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. Based on a work at https://code.google.com/p/gbmaps/. Permissions beyond the scope of this license may be available at https://developers.google.com/readme/terms. Google Maps - ©2014 Google.

Code license : Apache License 2.0

Main GB Maps ギビマップ Website : http://gbmaps.karyait.net.my/ or http://gbmaps.blogspot.com

Development site (programming) : https://github.com/karyait/gbmaps & https://code.google.com/p/gbmaps/
Personal blog for GB Maps ギビマップ (design algorithm) : http://blogkaryait.wordpress.com/tag/gbmaps/

File : gbm-func-v1.js
purpose : gb maps function library
type : release (under development)
version : 1.0.0
build : 
last update : 06 September 2014 1:23am (GMT 8+)

*/
var gbm_ver = '2.0.0';
var currMarker = null;
var newPoly = null;
var currMod = '';
var wd = 0;
var data = null;
var defaultGauge = (typeof $.cookie('defaulGauge') != 'undefined') ? parseInt($.cookie('defaulGauge')) : 1067;
var defaultCant = (typeof $.cookie('defaulCant') != 'undefined') ? parseInt($.cookie('defaulCant')) : 105;
var defaulOffset = (typeof $.cookie('defaulOffset') != 'undefined') ? parseFloat($.cookie('defaulOffset')) : 3.8;
var devID = $.cookie('developerID');

//bve object reference, generate with gb maps tools
var bverailobjArr = [];
var bvebveStrOjArr = [];
var bvefreeObjArr = [];
var bvetrainObjArr = [];
var bveaudioObjArr = [];
var bvetrainDirArr = [];
var bvetunnelObjArr = [];
var bveplatformObjArr = [];
var bvecutObjArr = [];
var bvedikeObjArr = [];
var bveFOObjArr = [];
var bvebridgeObjArr = [];
var bveRCObjArr = [];
var bveUGObjArr = [];
var bvepoleObjArr = [];
var bvecrackObjArr = [];

//update reference when loading data file
var oldnewid = []

function btnAddMarker2Polyline(polyid,tmpLat,tmpLng) {
	// by : Karya IT (Mac 2012) 
	// based on : http://jsfiddle.net/kjy112/NRafz/
	// url : http://gbmaps.karyait.net.my/
	// ver. : 1.0.0
	// purpose : add new marker on line at selected point
	
	// 2do : 19 Jan 2013 - check and make correction to added point, semak adakah heading h0 = h1 = H, adakah point betul2 atas poliline gmaps function
	
	if (typeof polyid != 'undefined') {

		var markerDist;
		var dblClickIndexAt = null;
		var polyAddMarker = null;
		
		var ty = polyid.split('_')[0];
		
		if (ty == 'line') {
			if (typeof MapToolbar.features["lineTab"][polyid] != 'undefined') {
				polyAddMarker = MapToolbar.features["lineTab"][polyid];
			}	
		} else if (ty == 'curve') {
			if (typeof MapToolbar.features["curveTab"][polyid] != 'undefined') {
				polyAddMarker = MapToolbar.features["curveTab"][polyid];
			}	
		} else if (ty == 'tcurve') {	
			if (typeof MapToolbar.features["tcurveTab"][polyid] != 'undefined') {
				polyAddMarker = MapToolbar.features["tcurveTab"][polyid];
			}				
		} else {
				
		}
		
		if (polyAddMarker == null) {
			alert('unable to verify@ existing line with ' + polyid);
			return false;
		}
		
		// modify code from http://jsfiddle.net/kjy112/NRafz/
		markerDist = {p1:'', p2:'', d:-1};

		var allPoints = polyAddMarker.getPath().getArray();
    
		var e1 = new google.maps.LatLng(parseFloat(tmpLat), parseFloat(tmpLng));

		for (var i = 0; i < allPoints.length - 1; i++) {
			var ab = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],e1); 
			var bc = google.maps.geometry.spherical.computeDistanceBetween(e1,allPoints[i + 1]); 
			var ac = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],allPoints[i + 1]); 
			//console.log(parseFloat(markerDist.d) + ' '+ Math.abs(ab+bc-ac));
      
			if ((parseFloat(markerDist.d) == -1) || parseFloat(markerDist.d) > parseFloat(Math.abs(ab + bc - ac))) {
				markerDist.p1 = allPoints[i];
				markerDist.p2 = allPoints[i + 1];
				markerDist.d = Math.abs(ab + bc - ac);
				dblClickIndexAt = i+1;
			}
		}
    
		if ((!google.maps.geometry.poly.isLocationOnEdge(e1, polyAddMarker, 0)) && (ty == 'line')) {
			//new point location correction
			
			var Hca = google.maps.geometry.spherical.computeHeading(e1,allPoints[dblClickIndexAt-1]);
			var Hab = google.maps.geometry.spherical.computeHeading(allPoints[dblClickIndexAt-1],allPoints[dblClickIndexAt]);
			var Hcb = google.maps.geometry.spherical.computeHeading(e1,allPoints[dblClickIndexAt-1]);
			var Hba = google.maps.geometry.spherical.computeHeading(allPoints[dblClickIndexAt],allPoints[dblClickIndexAt-1]);
			
			var Xac = google.maps.geometry.spherical.computeDistanceBetween(allPoints[dblClickIndexAt-1],e1);
			var Xbc = google.maps.geometry.spherical.computeDistanceBetween(allPoints[dblClickIndexAt],e1);
			var Xab = google.maps.geometry.spherical.computeDistanceBetween(allPoints[dblClickIndexAt-1],allPoints[dblClickIndexAt]);
			
			var angleA = intersection_angle(Hca,Hab).angle ;
			var angleB = intersection_angle(Hcb,Hba).angle ; 
			
			var Xcc2a = Xac * Math.sin(angleA.toRad());
			var Xcc2b = Xbc * Math.sin(angleB.toRad()); 
			
			var Xac2 = Math.abs(Xac * Math.cos(angleA.toRad()));
			var Xbc2 = Math.abs(Xbc * Math.cos(angleB.toRad()));
			
			//if (Xac2 + Xbc2 != Xab) { alert('Xac2 : ' + Xac2 + ' + ' + 'Xbc2 : ' + Xbc2 + ' =\n' + (Xac2 + Xbc2) + ' != ' + Xab + '(Xab)'); };
				
			var ec2 = google.maps.geometry.spherical.computeOffset(allPoints[dblClickIndexAt-1], Xac2, Hab);
			
			MapToolbar.addPoint(ec2, polyAddMarker, dblClickIndexAt);
			
			//alert('new point added with correction!');
			
		} else {
			
			MapToolbar.addPoint(e1, polyAddMarker, dblClickIndexAt);
			
		}
         		
    dblClickIndexAt = null;
     			
	}
}

function AddMarker2Polyline(pid,latlng) {
	// by : Karya IT (Mac 2012) 
	// based on : http://jsfiddle.net/kjy112/NRafz/
	// url : http://gbmaps.karyait.net.my/
	// ver. : 1.0.0
	// purpose : add new marker on line at selected point
	
	// 2do : 19 Jan 2013 - check and make correction to added point, semak adakah heading h0 = h1 = H, adakah point betul2 atas poliline gmaps function
	
	if (typeof pid != 'undefined') {

		var markerDist;
		var idxAt = null;
		var polyAddMarker = null;
		
		var ty = pid.split('_')[0];
		
		if (ty == 'line') {
			if (typeof MapToolbar.features["lineTab"][pid] != 'undefined') {
				polyAddMarker = MapToolbar.features["lineTab"][pid];
			}	
		} else if (ty == 'curve') {
			if (typeof MapToolbar.features["curveTab"][pid] != 'undefined') {
				polyAddMarker = MapToolbar.features["curveTab"][pid];
			}	
		} else if (ty == 'tcurve') {	
			if (typeof MapToolbar.features["tcurveTab"][pid] != 'undefined') {
				polyAddMarker = MapToolbar.features["tcurveTab"][pid];
			}				
		} else {
				
		}
		
		if (polyAddMarker == null) {
			alert('unable to verify@ existing line with ' + pid);
			return false;
		}
		
		// modify code from http://jsfiddle.net/kjy112/NRafz/
		markerDist = {p1:'', p2:'', d:-1};

		var allPoints = polyAddMarker.getPath().getArray();
    
		//var e1 = new google.maps.LatLng(parseFloat(tmpLat), parseFloat(tmpLng));

		for (var i = 0; i < allPoints.length - 1; i++) {
			var ab = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],latlng); 
			var bc = google.maps.geometry.spherical.computeDistanceBetween(latlng,allPoints[i + 1]); 
			var ac = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],allPoints[i + 1]); 
			//console.log(parseFloat(markerDist.d) + ' '+ Math.abs(ab+bc-ac));
      
			if ((parseFloat(markerDist.d) == -1) || parseFloat(markerDist.d) > parseFloat(Math.abs(ab + bc - ac))) {
				markerDist.p1 = allPoints[i];
				markerDist.p2 = allPoints[i + 1];
				markerDist.d = Math.abs(ab + bc - ac);
				idxAt = i+1;
			}
		}
    
		if ((!google.maps.geometry.poly.isLocationOnEdge(latlng, polyAddMarker, 0)) && (ty == 'line')) {
			//new point location correction
			
			var Hca = google.maps.geometry.spherical.computeHeading(latlng,allPoints[idxAt-1]);
			var Hab = google.maps.geometry.spherical.computeHeading(allPoints[idxAt-1],allPoints[idxAt]);
			var Hcb = google.maps.geometry.spherical.computeHeading(latlng,allPoints[idxAt-1]);
			var Hba = google.maps.geometry.spherical.computeHeading(allPoints[idxAt],allPoints[idxAt-1]);
			
			var Xac = google.maps.geometry.spherical.computeDistanceBetween(allPoints[idxAt-1],latlng);
			var Xbc = google.maps.geometry.spherical.computeDistanceBetween(allPoints[idxAt],latlng);
			var Xab = google.maps.geometry.spherical.computeDistanceBetween(allPoints[idxAt-1],allPoints[idxAt]);
			
			var angleA = intersection_angle(Hca,Hab).angle ;
			var angleB = intersection_angle(Hcb,Hba).angle ; 
			
			var Xcc2a = Xac * Math.sin(angleA.toRad());
			var Xcc2b = Xbc * Math.sin(angleB.toRad()); 
			
			var Xac2 = Math.abs(Xac * Math.cos(angleA.toRad()));
			var Xbc2 = Math.abs(Xbc * Math.cos(angleB.toRad()));
			
			//if (Xac2 + Xbc2 != Xab) { alert('Xac2 : ' + Xac2 + ' + ' + 'Xbc2 : ' + Xbc2 + ' =\n' + (Xac2 + Xbc2) + ' != ' + Xab + '(Xab)'); };
				
			var ec2 = google.maps.geometry.spherical.computeOffset(allPoints[idxAt-1], Xac2, Hab);
			
			MapToolbar.addPoint(ec2, polyAddMarker, idxAt);
			
			//alert('new point added with correction!');
			
		} else {
			
			MapToolbar.addPoint(latlng, polyAddMarker, idxAt);
			
		}
         		
    return idxAt;
     			
	}
}

function splitPolyline(polyid,tmpLat,tmpLng) {
	// by : Karya IT (Mac 2012)
	// url : http://gbmaps.karyait.net.my/
	// ver. : 1.0.0
	// purpose : split single line into two seprate line at the break point

	if (typeof polyid != 'undefined') {
		var poly2split = null;
		var markerDist;
		var dblClickIndexAt = null;		
		
		if (typeof MapToolbar.features["lineTab"][polyid] != 'undefined') {
			poly2split = MapToolbar.features["lineTab"][polyid];
		}	

		var tmppolypath1 = []; 
		var tmppolypath2 = []; 
			
	
		// modify code from http://jsfiddle.net/kjy112/NRafz/
		markerDist = {p1:'', p2:'', d:-1};

		var allPoints = poly2split.getPath().getArray();
    
		var e1 = new google.maps.LatLng(parseFloat(tmpLat), parseFloat(tmpLng));
    
		for (var i = 0; i < allPoints.length - 1; i++) {
			var ab = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],e1); 
			var bc = google.maps.geometry.spherical.computeDistanceBetween(e1,allPoints[i + 1]); 
			var ac = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],allPoints[i + 1]); 
			//console.log(parseFloat(markerDist.d) + ' '+ Math.abs(ab+bc-ac));
      
			if ((parseFloat(markerDist.d) == -1) || parseFloat(markerDist.d) > parseFloat(Math.abs(ab + bc - ac))) {
				markerDist.p1 = allPoints[i];
				markerDist.p2 = allPoints[i + 1];
				markerDist.d = Math.abs(ab + bc - ac);
				dblClickIndexAt = i+1;
			}
		}
    
		MapToolbar.addPoint(e1, poly2split, dblClickIndexAt);

		var currPolyPath = poly2split.getPath().getArray();
		var currPolyPathLength = currPolyPath.length;
		
		for (var i = 0; i < currPolyPathLength; i++) {
			if (i < dblClickIndexAt) {
				tmppolypath1.push(currPolyPath[i]);
			} else {						
				tmppolypath2.push(currPolyPath[i]);
				if (i == dblClickIndexAt) {
					var tmpLat = currPolyPath[i].lat() - 0.0005; // 2 visualize that the two new marker at cutting point is not overlapping (random number)
					var tmpLng = currPolyPath[i].lng() - 0.0005;
					tmppolypath1.push(new google.maps.LatLng(tmpLat, tmpLng));
				};
			}
		}
							
		MapToolbar.initFeature('line');
		MapToolbar.stopEditing();
		var no = MapToolbar['lineCounter']; 
			
		for (var i = 0; i < tmppolypath1.length ; i++) {
			var tmpL = tmppolypath1[i];
			MapToolbar.addPoint(tmpL, newPoly, i); 
		}
				
		newPoly = null;
		MapToolbar.initFeature('line');
		MapToolbar.stopEditing();
			
		for (var i = 0; i < tmppolypath2.length ; i++) {
			var tmpL = tmppolypath2[i];
			MapToolbar.addPoint(tmpL, newPoly, i); 
		}
	
	// 2 do 29/10 ::::::::::::::::::::::::::::::::::::::::::::: restore old markers reference before deleting
	
	for (var i = 0; i < currPolyPathLength; i++) {
		if ( i < tmppolypath1.length) {
			var pno = 'line_' + no;
			if (poly2split.markers.getAt(i).note != '') {MapToolbar.features["lineTab"][pno].markers.getAt(i).note = poly2split.markers.getAt(i).note;} 
			
			$.each(poly2split.markers.getAt(i).bdata, function(key, value){
				if (poly2split.markers.getAt(i).bdata[key] != '') {
					MapToolbar.features["lineTab"][pno].markers.getAt(i).bdata.key = poly2split.markers.getAt(i).bdata[key];
				}
			});

			$.each(poly2split.markers.getAt(i).kdata, function(key, value){
				if (poly2split.markers.getAt(i).kdata[key] != '') {
					MapToolbar.features["lineTab"][pno].markers.getAt(i).kdata.key = poly2split.markers.getAt(i).kdata[key];
				}
			});	
			
			if (poly2split.markers.getAt(i).bdata.curve != '') {
				MapToolbar.features["lineTab"][pno].markers.getAt(i).bdata.curve = poly2split.markers.getAt(i).bdata.curve;
				var cid = poly2split.markers.getAt(i).bdata.curve; 
				MapToolbar.features['curveTab'][cid].pid = pno;
				MapToolbar.features['curveTab'][cid].mid = i;
				poly2split.markers.getAt(i).bdata.curve = '';
			} 
			if (poly2split.markers.getAt(i).bdata.tcurve != '') {
				MapToolbar.features["lineTab"][pno].markers.getAt(i).bdata.tcurve = poly2split.markers.getAt(i).bdata.tcurve;
				var cid = poly2split.markers.getAt(i).bdata.tcurve; 
				MapToolbar.features['tcurveTab'][cid].pid = pno;
				MapToolbar.features['tcurveTab'][cid].mid = i;
				poly2split.markers.getAt(i).bdata.tcurve = '';
			} 
			if (poly2split.markers.getAt(i).sline != '') {MapToolbar.features["lineTab"][pno].markers.getAt(i).sline = poly2split.markers.getAt(i).sline;}
			if (poly2split.markers.getAt(i).pid != '') {MapToolbar.features["lineTab"][pno].markers.getAt(i).pid = pno;}
			 
		} else {
			var j = i - tmppolypath1.length; // double cek
			var pno = 'line_' + (no + 1);
			if (i < currPolyPathLength+1 ) {
				if (poly2split.markers.getAt(i).note != '') {MapToolbar.features["lineTab"][pno].markers.getAt(j+1).note = poly2split.markers.getAt(i).note;}  
				
				$.each(poly2split.markers.getAt(i).bdata, function(key, value){
					if (poly2split.markers.getAt(i).bdata[key] != '') {
						MapToolbar.features["lineTab"][pno].markers.getAt(j+1).bdata.key = poly2split.markers.getAt(i).bdata[key];
					}
				});

				$.each(poly2split.markers.getAt(i).kdata, function(key, value){
					if (poly2split.markers.getAt(i).kdata[key] != '') {
						MapToolbar.features["lineTab"][pno].markers.getAt(j+1).kdata.key = poly2split.markers.getAt(i).kdata[key];
					}
				});	
				
				if (poly2split.markers.getAt(i).bdata.curve != '') {
					MapToolbar.features["lineTab"][pno].markers.getAt(j+1).bdata.curve = poly2split.markers.getAt(i).bdata.curve;
					var cid = poly2split.markers.getAt(i).bdata.curve; 
					MapToolbar.features['curveTab'][cid].pid = pno;
					MapToolbar.features['curveTab'][cid].mid = j+1;
					poly2split.markers.getAt(i).bdata.curve = '';
				} 
				if (poly2split.markers.getAt(i).bdata.tcurve != '') {
					MapToolbar.features["lineTab"][pno].markers.getAt(j+1).bdata.tcurve = poly2split.markers.getAt(i).bdata.tcurve;
					var cid = poly2split.markers.getAt(i).bdata.tcurve; 
					MapToolbar.features['tcurveTab'][cid].pid = pno;
					MapToolbar.features['tcurveTab'][cid].mid = j+1;
					poly2split.markers.getAt(i).bdata.tcurve = '';
				} 
				if (poly2split.markers.getAt(i).sline != '') {MapToolbar.features["lineTab"][pno].markers.getAt(j+1).sline = poly2split.markers.getAt(i).sline;}
				if (poly2split.markers.getAt(i).pid != '') {MapToolbar.features["lineTab"][pno].markers.getAt(j+1).pid = pno;}			
			}
		}
	}

	MapToolbar.removeFeature(polyid);
	poly2split = null;			
  newPoly = null;
}
}

function precombine2polyline(polyid) {
	if (typeof polyid != 'undefined') {
		document.getElementById('pline1name').value = polyid;
		currMod = 'join_line';
		jQuery('#dialogCombinePolyline').dialog('open');
	} else {
		alert ('start line undefine');
	}
}

function combine2polyline() {
	// by : Karya IT (Mac 2012)
	// url : http://gbmaps.karyait.net.my/
	// ver. : 1.0.0
	// purpose : combine two line into a single line
	
	if ((typeof document.getElementById('pline1name').value !== 'undefined') && (typeof document.getElementById('pline2name').value !== 'undefined')) {
		var poly1 = null; var poly2 = null;
		
		if (typeof MapToolbar.features["lineTab"][document.getElementById('pline1name').value] != 'undefined') {
			poly1 = MapToolbar.features["lineTab"][document.getElementById('pline1name').value];
		}
		
		if (typeof MapToolbar.features["lineTab"][document.getElementById('pline2name').value] != 'undefined') {
			poly2 = MapToolbar.features["lineTab"][document.getElementById('pline2name').value];
		}
		
		if ((poly1 != null) && (poly2 != null)) {
			var poly1Path = poly1.getPath().getArray();
			var poly2Path = poly2.getPath().getArray();
		
			var tmpEP = new Array(3);
			//calculate the shortest distance for 2 polyline edges
			tmpEP[0] = google.maps.geometry.spherical.computeDistanceBetween(poly1Path[0],poly2Path[0]); 
			tmpEP[1] = google.maps.geometry.spherical.computeDistanceBetween(poly1Path[0],poly2Path[poly2Path.length-1]); 
			tmpEP[2] = google.maps.geometry.spherical.computeDistanceBetween(poly1Path[poly1Path.length-1],poly2Path[0]); 
			tmpEP[3] = google.maps.geometry.spherical.computeDistanceBetween(poly1Path[poly1Path.length-1],poly2Path[poly2Path.length-1]); 
		
			var shortestPoint = 0;

			for (var i = 1; i < 4; i++) {
				if (tmpEP[i] <= tmpEP[shortestPoint]) {
					shortestPoint = i;
				}
			}
		
			MapToolbar.initFeature('line');
	 		MapToolbar.stopEditing();
	 	
			var newI = 0;
		
			switch(shortestPoint)
			{
				case 0:				
  				for (var x = poly1Path.length - 1; x >= 0 ; x--) {
						var tmpL = poly1Path[x];
						MapToolbar.addPoint(tmpL, newPoly, newI);
						newI++;
					}	
  				for (var y = 0; y < poly2Path.length ; y++) {
						var tmpL = poly2Path[y];
						MapToolbar.addPoint(tmpL, newPoly, newI);
						newI++;
					}
  				break;
				case 1:
  				for (var x = poly1Path.length - 1; x >= 0 ; x--) {
						var tmpL = poly1Path[x];
						MapToolbar.addPoint(tmpL, newPoly, newI);
						newI++;
					}
  				for (var y = poly2Path.length - 1; y >= 0 ; y--) {
						var tmpL = poly2Path[y];
						MapToolbar.addPoint(tmpL, newPoly, newI);
						newI++;
					}
  				break;
				case 2:
  				for (var x = 0; x < poly1Path.length ; x++) {
						var tmpL = poly1Path[x];
						MapToolbar.addPoint(tmpL, newPoly, newI);
						newI++;
					}		
  				for (var y = 0; y < poly2Path.length ; y++) {
						var tmpL = poly2Path[y];
						MapToolbar.addPoint(tmpL, newPoly, newI);
						newI++;
					}		
  				break;
				case 3:
  				for (var x = 0; x < poly1Path.length ; x++) {
						var tmpL = poly1Path[x];
						MapToolbar.addPoint(tmpL, newPoly, newI);
						newI++;
					}		
  				for (var y = poly2Path.length - 1; y >= 0 ; y--) {
						var tmpL = poly2Path[y];
						MapToolbar.addPoint(tmpL, newPoly, newI);
						newI++;
					}
  				break;
				default:
  				//????
			}

	// 2 do 29/10 ::::::::::::::::::::::::::::::::::::::::::::: restore old markers reference before deleting
	
			var no = MapToolbar['lineCounter'];
			var pno = 'line_' + no;
			var ix = 0;
			var newPLength = newPoly.getPath().getArray().length;
			
			for (var i = 0; i < poly1Path.length; i++) {
				if (poly1.markers.getAt(i).note != '') {MapToolbar.features["lineTab"][pno].markers.getAt(i).note = poly1.markers.getAt(i).note;}  
								
				$.each(poly1.markers.getAt(i).bdata, function(key, value){
					if (poly1.markers.getAt(i).bdata[key] != '') {
						MapToolbar.features["lineTab"][pno].markers.getAt(i).bdata.key = poly1.markers.getAt(i).bdata[key];
					}
				});

				$.each(poly1.markers.getAt(i).kdata, function(key, value){
					if (poly1.markers.getAt(i).kdata[key] != '') {
						MapToolbar.features["lineTab"][pno].markers.getAt(i).kdata.key = poly1.markers.getAt(i).kdata[key];
					}
				});	
				
				if (poly1.markers.getAt(i).bdata.curve != '') {
					MapToolbar.features["lineTab"][pno].markers.getAt(i).bdata.curve = poly1.markers.getAt(i).bdata.curve;
					var cid = poly1.markers.getAt(i).bdata.curve; 
					MapToolbar.features['curveTab'][cid].pid = pno;
					MapToolbar.features['curveTab'][cid].mid = i;
					poly1.markers.getAt(i).bdata.curve = '';
				} 
				if (poly1.markers.getAt(i).bdata.tcurve != '') {
					MapToolbar.features["lineTab"][pno].markers.getAt(i).bdata.tcurve = poly1.markers.getAt(i).bdata.tcurve;
					var cid = poly1.markers.getAt(i).bdata.tcurve; 
					MapToolbar.features['tcurveTab'][cid].pid = pno;
					MapToolbar.features['tcurveTab'][cid].mid = i;
					poly1.markers.getAt(i).bdata.tcurve = ''; 
				} 
				if (poly1.markers.getAt(i).sline != '') {MapToolbar.features["lineTab"][pno].markers.getAt(i).sline = poly1.markers.getAt(i).sline;}
				if (poly1.markers.getAt(i).pid != '') {MapToolbar.features["lineTab"][pno].markers.getAt(i).pid = pno;}	
				ix = i;		
			}
	
			for (var i = 0; i < poly2Path.length; i++) {
				if (i+ix < newPLength ) {
					if (poly2.markers.getAt(i).note != '') {MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).note = poly2.markers.getAt(i).note;}  

					$.each(poly2.markers.getAt(i).bdata, function(key, value){
						if (poly2.markers.getAt(i).bdata[key] != '') {
							MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).bdata.key = poly2.markers.getAt(i).bdata[key];
						}
					});

					$.each(poly2.markers.getAt(i).kdata, function(key, value){
						if (poly2.markers.getAt(i).kdata[key] != '') {
							MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).kdata.key = poly2.markers.getAt(i).kdata[key];
						}
					});	

					if (poly2.markers.getAt(i).bdata.curve != '') {
						MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).bdata.curve = poly2.markers.getAt(i).bdata.curve;				
						var cid = poly2.markers.getAt(i).bdata.curve; 
						MapToolbar.features['curveTab'][cid].pid = pno;
						MapToolbar.features['curveTab'][cid].mid = i+ix+1;
						poly2.markers.getAt(i).bdata.curve = ''; 
					} 
					if (poly2.markers.getAt(i).bdata.tcurve != '') {
						MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).bdata.tcurve = poly2.markers.getAt(i).bdata.tcurve;
						var cid = poly2.markers.getAt(i).bdata.tcurve; 
						MapToolbar.features['tcurveTab'][cid].pid = pno;
						MapToolbar.features['tcurveTab'][cid].mid = i+ix+1;
						poly2.markers.getAt(i).bdata.tcurve = ''; 
					} 
					if (poly2.markers.getAt(i).sline != '') {MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).sline = poly2.markers.getAt(i).sline;}
					if (poly2.markers.getAt(i).pid != '') {MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).pid = pno;}						
				}
			}

			MapToolbar.removeFeature(poly1.id);
			MapToolbar.removeFeature(poly2.id);

 			newPoly = null;
			poly1 = null;		
			poly2 = null;
			currMod = '';
    	
			$('#pline1name').val('');
			$('#pline2name').val('');

			jQuery('#dialogCombinePolyline').dialog('close');
    	
		} else{
			alert('line null');
		}	
		
	} else {
		alert ('start line undefine');
	}
			
}

function invertpolyline(pid) {
	if (typeof MapToolbar.features["lineTab"][pid] != 'undefined') {
		var poly = MapToolbar.features["lineTab"][pid];
					
		var polyPath = poly.getPath().getArray();
		var tmpEP = new Array(3);			
		
		MapToolbar.initFeature('line');
		MapToolbar.stopEditing();
		
		var no = MapToolbar['lineCounter'];
		var pno = 'line_' + no;
		var polyR = MapToolbar.features["lineTab"][pno];
		
		polyR.uid = poly.uid;
		polyR.ptype = poly.ptype;
		polyR.name = poly.name;
		polyR.route = poly.route;
		polyR.lineX = poly.lineX;
		polyR.bdata = poly.bdata;		
			
		for (var i = 0; i < polyPath.length ; i++) {
			var tmpL = polyPath[polyPath.length-1-i];
			MapToolbar.addPoint(tmpL, polyR, i); 
		}
					
		for (var i = polyPath.length-1; i >= 0; i--) {
			polyR.markers.getAt(polyPath.length-1-i).pid = pno;	
			polyR.markers.getAt(polyPath.length-1-i).uid = poly.markers.getAt(i).uid;
			polyR.markers.getAt(polyPath.length-1-i).note = poly.markers.getAt(i).note;
			
			/*
			$.each(poly.markers.getAt(i).bdata, function(key, value){
				if (poly.markers.getAt(i).bdata[key] != '') {
					//{height:'',railindex:'',pitch:'',curve:'',tcurve:''}, curve only - ignore others
					if (key == 'curve' || key == 'tcurve') {
						polyR.markers.getAt(polyPath.length-1-i).bdata.key = poly.markers.getAt(i).bdata[key];				
					}					
				}
			}); */

			$.each(poly.markers.getAt(i).kdata, function(key, value){
				if (poly.markers.getAt(i).kdata[key] != '') {
					polyR.markers.getAt(polyPath.length-1-i).kdata.key = poly.markers.getAt(i).kdata[key];
				}
			});	

			//ignore gdata values, need to create a new one.
			
			if (poly.markers.getAt(i).bdata.curve != '') {
				polyR.markers.getAt(polyPath.length-1-i).bdata.curve = poly.markers.getAt(i).bdata.curve;				
				var cid = poly.markers.getAt(i).bdata.curve; 
				MapToolbar.features['curveTab'][cid].pid = pno;
				MapToolbar.features['curveTab'][cid].mid = polyPath.length-1-i;
				MapToolbar.features['curveTab'][cid].Rc *= -1;
				//poly.markers.getAt(i).bdata.curve = '';
			} 
			if (poly.markers.getAt(i).bdata.tcurve != '') {
				polyR.markers.getAt(polyPath.length-1-i).bdata.tcurve = poly.markers.getAt(i).bdata.tcurve;
				var cid = poly.markers.getAt(i).bdata.tcurve; 
				MapToolbar.features['tcurveTab'][cid].pid = pno;
				MapToolbar.features['tcurveTab'][cid].mid = polyPath.length-1-i;
				MapToolbar.features['tcurveTab'][cid].Rc *= -1;
				//poly.markers.getAt(i).bdata.tcurve = '';
			} 
			
			//if (poly.markers.getAt(i).sline != '') {polyR.markers.getAt(polyPath.length-1-i).sline = poly.markers.getAt(i).sline;}
			//if (poly.markers.getAt(i).lineX != '') {polyR.markers.getAt(polyPath.length-1-i).lineX = poly.markers.getAt(i).lineX;}

		}

		MapToolbar.removeFeature(poly.id);
		polyR = null;					
		
	}
}

function preparallel_line(polyid) {

	if (typeof polyid != 'undefined') {
		$('#PLbasePolyID').val(polyid);
		currMod = 'parallel_line';
		$('#dialogParalelLine').dialog('open');
	} else {
		alert ('start line undefine');
	}	
}

function parallel_line() {
	// by : Karya IT (Feb 2014)
	// url : http://gbmaps.karyait.net.my/
	// ver. : 1.0.0
	// purpose : generate parallel line based on selected line
	
	if (document.getElementById('PLbasePolyID').value != "") {
		var polyid = document.getElementById('PLbasePolyID').value;
		var polyBaseLine;
		if (typeof MapToolbar.features["lineTab"][polyid] !== 'undefined') {
			polyBaseLine = MapToolbar.features["lineTab"][polyid];
		} else {
			alert ('based line undefine');
			return;
		}
				
		if ((currMod == 'parallel_line') && (polyBaseLine.id.split('_')[0] == 'line')) {		
			var side = 90; // default value, right
			var offset = parseFloat(document.getElementById('sBtnPLineOffset').value); // default value
			
			if (document.getElementById('sBtnPLineOffset').value > 0) {
				if (document.getElementById('Right2Line').checked) {
					side = 90; 
				}
				if (document.getElementById('Left2Line').checked) {
					side = -90; 
				}
				
				var polyPath = polyBaseLine.getPath().getArray();
				//offset = document.getElementById('sBtnPLineOffset').value;				
					 			
	 			var sP = null; // start point
	 			var eP = null; // end point
	 			
	 			if (document.getElementById('PLCopyType_0').checked) {						  
					sP = 1;
					eP = polyPath.length-1 ;
					MapToolbar.initFeature('line');
	 				MapToolbar.stopEditing();	
				} else {
					if (($('#m1').val() != '') && ($('#m2').val() != '')) {
						sP = parseInt($('#m1').val()) + 1;
						eP = parseInt($('#m2').val());	    				    			
						MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing();
					} else {
						alert('please state your start point and end point for the line that you want to duplicate')
						return;
					}	
				}
				if (document.getElementById('PLcrackOp').checked) {
					var crack = $('#PLcrackID option:selected').val();
					if (crack != '- select -') { polyBaseLine.markers.getAt(sP-1).kdata.crack = crack; }
				}
				
				newPoly.route = (polyBaseLine.route != '') ? polyBaseLine.route : '';	 			
				newPoly.lineX = polyid; // new feature 3/7/2014 *** for non parallel side line
				
				for (var i = sP; i <= eP; i++) {
	 				var h1 = google.maps.geometry.spherical.computeHeading(polyPath[i-1],polyPath[i]);
	 				var platLng;
	 				//2do : double check 21/03/2014
	 				if (i == sP) {	 										
						var startOffset = null;
						if (document.getElementById('plswAtStart').checked) { startOffset = 0; }
						var stSwlength = null; 
						if (document.getElementById('plswAtStart').checked) { stSwlength = parseFloat($('#pLstSwLength').val()); }
						
						var uidB = polyBaseLine.markers.getAt(i-1).uid; // new : added on 25 Jul 2014 8:00am GMT8+
						
						if (startOffset != null) {
							MapToolbar.addPoint(polyPath[i-1], newPoly, 0);
							var odml = google.maps.geometry.spherical.computeOffset(polyPath[i-1], stSwlength, h1);
							platLng = google.maps.geometry.spherical.computeOffset(odml, offset, h1 +  side);
							MapToolbar.addPoint(platLng, newPoly, 1);
							
							//new format 4 v1.0.0
							newPoly.markers.getAt(0).lineX = polyid + ':' + side + ':' + startOffset + ':' + stSwlength + ':' + uidB;
							newPoly.markers.getAt(1).lineX = polyid + ':' + side + ':' + offset + '::' ;
						} else {
							platLng = google.maps.geometry.spherical.computeOffset(polyPath[i-1], offset, h1 +  side);
							MapToolbar.addPoint(platLng, newPoly, 0);
							//new format 4 v1.0.0
							newPoly.markers.getAt(0).lineX = polyid + ':' + side + ':' + offset + '::' + uidB;
						}
						// data format lineX = (base line):(side direction):(offset distance):(switch length opsyenal):(baseline marker uid)

						var uidN = newPoly.markers.getAt(i-1).uid; // new : added on 25 Jul 2014 8:00am GMT8+
						if (polyBaseLine.markers.getAt(i-1).sline == '') {
							polyBaseLine.markers.getAt(i-1).sline = newPoly.id + ':0:0:' + uidN;
						} else {
							polyBaseLine.markers.getAt(i-1).sline += '¤' + newPoly.id + ':0:0:' + uidN;
						}
						// data format sline = '(side line 1):(0=start,>0 end):index,(side line 1):(0=start,>0 end):(newline marker index):(newline marker uid),,,,....';
						
						polyBaseLine.markers.getAt(i-1).setDraggable(false);
	 				}
					
					if (i == eP) {
						//2do : double check 14/12/2012	
						var endOffset = null;
						if (document.getElementById('plswAtEnd').checked) { endOffset = 0; }
						var edSwlength = null;
						if (document.getElementById('plswAtEnd').checked) { edSwlength = parseFloat($('#pLedSwLength').val()); }
		 				
						var uidB = polyBaseLine.markers.getAt(i).uid; // new : added on 25 Jul 2014 8:00am GMT8+
						
		 				if (endOffset != null) {
							var odml = google.maps.geometry.spherical.computeOffset(polyPath[i], -edSwlength, h1);
														
							platLng = google.maps.geometry.spherical.computeOffset(odml, offset, h1 +  side);
							var plength = newPoly.markers.length;
							MapToolbar.addPoint(platLng, newPoly, plength);
		 					MapToolbar.addPoint(polyPath[i], newPoly, plength+1);
							
							//new format 4 v1.0.0
							newPoly.markers.getAt(newPoly.markers.length-2).lineX = polyid + ':' + side + ':' + offset + ':' + edSwlength + ':' + uidB;
							newPoly.markers.getAt(newPoly.markers.length-1).lineX = polyid + ':' + side + ':' + endOffset + '::' + uidB;
								
						} else {
							platLng = google.maps.geometry.spherical.computeOffset(polyPath[i], offset, h1 + side);
		 					MapToolbar.addPoint(platLng, newPoly, newPoly.markers.length);	
							//new format 4 v1.0.0
							newPoly.markers.getAt(newPoly.markers.length-1).lineX = polyid + ':' + side + ':' + offset + '::' + uidB;
						}
						var npidlastIndex = newPoly.markers.length-1;
						var uidN = newPoly.markers.getAt(npidlastIndex).uid; // new : added on 25 Jul 2014 8:00am GMT8+	
						if (polyBaseLine.markers.getAt(i).sline == '') {
							polyBaseLine.markers.getAt(i).sline = newPoly.id + ':1:' + npidlastIndex + ':' + uidN;
						} else {
							polyBaseLine.markers.getAt(i).sline += '¤' + newPoly.id + ':1:' + npidlastIndex + ':' + uidN;
						}
						
						polyBaseLine.markers.getAt(i).setDraggable(false);
							
					} else {
							
						var h2 = google.maps.geometry.spherical.computeHeading(polyPath[i],polyPath[i+1]);
						var fic = intersection_angle(h1, h2);
						var s12 = fic.angle;
						var sdir = fic.direction;
							
							
						if (s12 <= 90) {
							if (side >= 0) {
								var t0;								
								if (sdir > 0)  {
									t0 = (180 - h1 + h2) / 2; // pass
								} else {
									t0 = (h2 - 180 - h1) / 2; //pass
								}									

								var x0 = offset / Math.tan(t0.toRad());
								var sx = google.maps.geometry.spherical.computeOffset(polyPath[i], offset, h1+ side);
									
								platLng = google.maps.geometry.spherical.computeOffset(sx, x0, h1 );
								MapToolbar.addPoint(platLng, newPoly, i+1);
									
									
							} else {	
								var t0;								
								if (sdir > 0) {
									t0 = (180 - h1 + h2) / 2; // pass
								} else {
									t0 = (h2 - 180 - h1) / 2; // pass
								}									
								var x0 = - offset / Math.tan(t0.toRad());
								var sx = google.maps.geometry.spherical.computeOffset(polyPath[i], x0, h1);
									
								platLng = google.maps.geometry.spherical.computeOffset(sx, offset, h1 + side);
								MapToolbar.addPoint(platLng, newPoly, i+1);								
							}
								
						} else { // > 90
								
							if (side >= 0) {
								var sx = google.maps.geometry.spherical.computeOffset(polyPath[i], offset, h1 + side);
								var t0 = (h1 - h2) / 2;
								var x0 = offset * Math.tan(t0.toRad());
									
								platLng = google.maps.geometry.spherical.computeOffset(sx, x0, h1);
								MapToolbar.addPoint(platLng, newPoly, i+1);
									
							} else {
								var t0 = (180 - h1 + h2) / 2;
								var x0 = -offset / Math.tan(t0.toRad());
								var sx = google.maps.geometry.spherical.computeOffset(polyPath[i], x0, h1);
									
								platLng = google.maps.geometry.spherical.computeOffset(sx, offset, h1 + side);
								MapToolbar.addPoint(platLng, newPoly, i+1);	
									
							}
						}					
					}
				
				}

				$('#m1').val('');
				$('#m2').val('');
				
				polyBaseLine = null;			
				newPoly = null;
				currMod = '';
    		
				jQuery('#dialogParalelLine').dialog('close');
			} 
		}
	}
}

function prelinepitch(polyid) {
	$('#cgsp').val('');
	$('#cgep').val('');
	$('#txtCalculatedPitch').val('');
	$('#setPPoint').val('');
	$('#setPHeightSt').val('');
	$('#txtPitchStrP').val('');
	$('#sBtnpitchRatio').val('0');
	$('#setPtHeight').val('0');
		
	if (data != null) { data = null; alert(typeof data);}
		
	$('#RPbasePolyID').val(polyid);
	
	$('#dialogpreRailpitch').dialog('open');
	
	$('#resetPitchMarker').click(function() {
		$('#rpM1').val('');
		$('#rpM2').val('');
	});
	
	$('#btnpreRailpitch').click(function() {
		var rpm1;
		var rpm2;
	    			    		
		if ($('#rpM1').val() == '') { 
			alert('Please select any two point on line \"' + polyid + '\".'); return false; 
		} else {
			rpm1 = parseInt($('#rpM1').val()); 
			$('#LLmidxSt').val($('#rpM1').val());
		}
		if ($('#rpM2').val() == '') { 
			alert('Please select any two point on line \"' + polyid + '\".'); return false; 
		} else {
			rpm2 = parseInt($('#rpM2').val()); 
			$('#LLmidxEd').val($('#rpM2').val());
		}	

		$('#dialogRailpitch').dialog('open');
	 	$('#dialogpreRailpitch').dialog('close');
		
	 
		if (typeof polyid != 'undefined') {
			var epoly = null; 
			if (MapToolbar.features["lineTab"][polyid] != null) {
				epoly = MapToolbar.features["lineTab"][polyid];
			} else {
				alert('unable to verify@ existing line with ' + polyid);
				return;			
			}
			
			var allPoints = epoly.getPath().getArray();
			var path = [];
			var gnote = [];    	   	
    	
			for (var k = rpm1; k<= rpm2; k++) {
				if ((epoly.markers.getAt(k).bdata.curve == '') && (epoly.markers.getAt(k).bdata.tcurve == '')) {
					path.push(allPoints[k]);
					
					var note = '', pit = '', bdata = '', kit = '';
					if (epoly.markers.getAt(k).note != '') { note = epoly.markers.getAt(k).note; } 
					
					$.each(epoly.markers.getAt(k).bdata, function(key, value){
						if (epoly.markers.getAt(k).bdata[key] != '') {
							if (key = 'pitch') {
								pit = epoly.markers.getAt(k).pitch;
							} else {
								if (bdata == '') {
									bdata = key + ":" + epoly.markers.getAt(k).bdata[key];
								} else {
									bdata += '§' + key + ":" + epoly.markers.getAt(k).bdata[key];
								}
							}
						}
					});

					$.each(epoly.markers.getAt(k).kdata, function(key, value){
						if (epoly.markers.getAt(k).kdata[key] != '') {
							var ktxt = setKTxtEv(key,epoly.markers.getAt(k).kdata[key]);
							if (kit == '') {
								kit = ktxt;
							} else {
								kit += '§' + ktxt;
							}
						}
					});	

					$.each(epoly.markers.getAt(k).gdata, function(key, value){
						 if (epoly.markers.getAt(k).gdata[key] != '') {					
							if (kit == '') {
								kit = key + ":" + epoly.markers.getAt(k).gdata[key];
							} else {
								kit += '§' + key + ":" + epoly.markers.getAt(k).gdata[key];
							}
						}
					});					
					
					var dis =  google.maps.geometry.spherical.computeLength(path);
					
					gnote.push([Math.ceil(dis.toString()), note, pit, bdata, kit]); 
					
				} else {
					if ((epoly.markers.getAt(k).bdata.curve == '') || (epoly.markers.getAt(k).bdata.tcurve != '')) {
						//2do 4 transition curve
						var cuvid = epoly.markers.getAt(k).bdata.tcurve;
						var tctype = MapToolbar.features['tcurveTab'][cuvid].tctype;
						var Rc = Math.abs(MapToolbar.features['tcurveTab'][cuvid].Rc);
						var Ls = MapToolbar.features['tcurveTab'][cuvid].Ls;
						var Lc = MapToolbar.features['tcurveTab'][cuvid].Lc;
						var Cc = MapToolbar.features['tcurveTab'][cuvid].Cc;
						var TotalX = MapToolbar.features['tcurveTab'][cuvid].TotalX;
						var TotalY = MapToolbar.features['tcurveTab'][cuvid].TotalY;
						var Ttst = MapToolbar.features['tcurveTab'][cuvid].Ttst;
						var Tted = MapToolbar.features['tcurveTab'][cuvid].Tted;
						var Tcst = MapToolbar.features['tcurveTab'][cuvid].Tcst;
						var Tced = MapToolbar.features['tcurveTab'][cuvid].Tced;

						var h1 = MapToolbar.features['tcurveTab'][cuvid].h1;
						var h2 = MapToolbar.features['tcurveTab'][cuvid].h2;
						var dir = (MapToolbar.features['tcurveTab'][cuvid].Rc < 0) ? -1 : 1;
 	 							
						if (tctype == 'cubic') { 
						
							// Cubic Parabola : TotalX = Ls  (full length of transition by assumption)
							var parts = 30; // any value, higher = more precision
							var ts = Ls / parts; //transition segment divided by any value (for plotting)

							path.push(Ttst);

							var tcpoly = MapToolbar.features['tcurveTab'][cuvid];
							var tcstart =  parseFloat(google.maps.geometry.spherical.computeLength(path));

							var note = '', pit = '', bdata = '', kit = '';
							
							//curve start marker index 0
							if (tcpoly.markers.getAt(0).note != '') { note = tcpoly.markers.getAt(0).note; } 
							if (tcpoly.markers.getAt(0).bdata.pitch != '') { 
								pit = tcpoly.markers.getAt(0).bdata.pitch; 
							}
							bdata = "tcurve:startT:" + cuvid; 
							if (tcpoly.markers.getAt(0).bdata.height != '') { 
								bdata += '§height:' + tcpoly.markers.getAt(0).bdata.height;
							}
							
							$.each(tcpoly.markers.getAt(0).kdata, function(key, value){
								if (tcpoly.markers.getAt(0).kdata[key] != '') {
									var ktxt = setKTxtEv(key,tcpoly.markers.getAt(0).kdata[key]);
									if (kit == '') {
										kit = ktxt;
									} else {
										kit += '§' + ktxt;
									}
								}
							});
												
							gnote.push([Math.ceil(tcstart).toString(), note , pit, bdata, kit]);
							
							
							
							//curve end marker index 1
							note = ''; pit = ''; bdata = ''; kit = '';
							if (tcpoly.markers.getAt(1).note != '') { note = tcpoly.markers.getAt(1).note; } 
							if (tcpoly.markers.getAt(1).bdata.pitch != '') { 
								pit = tcpoly.markers.getAt(1).bdata.pitch; 
							}
							bdata = "tcurve:startC:" + cuvid; 
							if (tcpoly.markers.getAt(1).bdata.height != '') { 
								bdata += '§height:' + tcpoly.markers.getAt(1).bdata.height;
							}

							$.each(tcpoly.markers.getAt(1).kdata, function(key, value){
								if (tcpoly.markers.getAt(1).kdata[key] != '') {
									var ktxt = setKTxtEv(key,tcpoly.markers.getAt(1).kdata[key]);
									if (kit == '') {
										kit = ktxt;
									} else {
										kit += '§' + ktxt;
									}
								}
							});

							var cvstart = Math.ceil(tcstart + Ls);
							gnote.push([cvstart.toString(), note, pit, bdata, kit]); 							

							//curve end marker index 1
							note = ''; pit = ''; bdata = ''; kit = '';
							if (tcpoly.markers.getAt(1).note != '') { note = tcpoly.markers.getAt(1).note; } 
							if (tcpoly.markers.getAt(1).bdata.pitch != '') { 
								pit = tcpoly.markers.getAt(1).bdata.pitch; 
							}
							bdata = "tcurve:endC:" + cuvid; 
							if (tcpoly.markers.getAt(1).bdata.height != '') { 
								bdata += '§height:' + tcpoly.markers.getAt(1).bdata.height;
							}

							$.each(tcpoly.markers.getAt(1).kdata, function(key, value){
								if (tcpoly.markers.getAt(1).kdata[key] != '') {
									var ktxt = setKTxtEv(key,tcpoly.markers.getAt(1).kdata[key]);
									if (kit == '') {
										kit = ktxt;
									} else {
										kit += '§' + ktxt;
									}
								}
							});

							var cvend = Math.ceil(tcstart + Ls + Lc);
							gnote.push([cvend.toString(), note, pit, bdata, kit]); 

							//curve end marker index 1
							note = ''; pit = ''; bdata = ''; kit = '';
							if (tcpoly.markers.getAt(1).note != '') { note = tcpoly.markers.getAt(1).note; } 
							if (tcpoly.markers.getAt(1).bdata.pitch != '') { 
								pit = tcpoly.markers.getAt(1).bdata.pitch; 
							}
							bdata = "tcurve:endT:" + cuvid; 
							if (tcpoly.markers.getAt(1).bdata.height != '') { 
								bdata += '§height:' + tcpoly.markers.getAt(1).bdata.height;
							}

							$.each(tcpoly.markers.getAt(1).kdata, function(key, value){
								if (tcpoly.markers.getAt(1).kdata[key] != '') {
									var ktxt = setKTxtEv(key,tcpoly.markers.getAt(1).kdata[key]);
									if (kit == '') {
										kit = ktxt;
									} else {
										kit += '§' + ktxt;
									}
								}
							});

							var tcend = Math.ceil(tcstart + 2 * Ls + Lc);
							gnote.push([tcend.toString(), note, pit, bdata, kit]);

							for (var c = 5; c < tcpoly.markers.length; c++) {
								if (typeof tcpoly.markers.getAt(c).ld != 'undefined')  {
									note = ''; pit = ''; bdata = ''; kit = '';
									if (tcpoly.markers.getAt(c).note != '') { note = tcpoly.markers.getAt(c).note; } 
									
									if (tcpoly.markers.getAt(c).bdata.pitch != '') { 
										pit = tcpoly.markers.getAt(c).bdata.pitch; 
									}
									bdata = "tcurve:ld:" + cuvid + ':' + c;
									if (tcpoly.markers.getAt(c).bdata.height != '') { 
										bdata = 'height:' + tcpoly.markers.getAt(c).bdata.height;
									}

									$.each(tcpoly.markers.getAt(c).kdata, function(key, value){
										if (tcpoly.markers.getAt(c).kdata[key] != '') {
											var ktxt = setKTxtEv(key,tcpoly.markers.getAt(c).kdata[key]);
											if (kit == '') {
												kit = ktxt;
											} else {
												kit += '§' + ktxt;
											}
										}
									});
					
									var dis = Math.ceil(tcpoly.markers.getAt(c).ld + tcstart);
									gnote.push([dis.toString(), note, pit, bdata, kit]);
	
								} 
							} 
							
							
							//gnote.sort(function(a,b){return a-b});
							var sorted;
							do {
								sorted = 0;
								for (d = 1; d < gnote.length; d++) {
									if (parseInt(gnote[d][0]) < parseInt(gnote[d-1][0])) {
										var tar0 = gnote[d];
										gnote.splice(d,1);
										gnote.splice(d-1,0,tar0);
									} else {
										sorted++;
									}
								}								
							} while (sorted < gnote.length -1); 							
							
							for (var i=1; (i < parts); i++) { 
								var yi = google.maps.geometry.spherical.computeOffset(Ttst, ts * i, h1);
								var ycd = (Math.pow((ts * i),3))/(6 * Rc * Ls);
								var yd = google.maps.geometry.spherical.computeOffset(yi, ycd , h1+(90 * dir));
								var xo = google.maps.geometry.spherical.computeHeading(path[i-1],yd);
								var xd = google.maps.geometry.spherical.computeDistanceBetween(path[i-1],yd);
								var xi = google.maps.geometry.spherical.computeOffset(path[i-1], xd, xo);
								path.push(xi);
							}

							path.push(Tcst); 
							
							
							var points = Math.ceil(Lc/25);
							var iB = google.maps.geometry.spherical.computeHeading(Cc,Tcst);
							var fB = google.maps.geometry.spherical.computeHeading(Cc,Tced);
	
							var br = fB - iB;
							if (br >  180) {br -= 360;}
							if (br < -180) {br += 360;}
	
							var deltaBearing = br/points;
	
							//plotting circular curve
							for (var i=0; (i < points+1); i++) {     
								path.push(google.maps.geometry.spherical.computeOffset(Cc, Rc, iB + i*deltaBearing)); 
							}	
							// --- end
	
							//plotting exiting spiral curve
							for (var i=parts; (i >= 0); i--) {     
								if (i == 0) {
									path.push(Tted); 		  		 	 
								} else if (i== parts) {		
									path.push(Tced);  	  		 
								} else {
									var yi = google.maps.geometry.spherical.computeOffset(Tted, -ts * i, h2);
									var ycd = (Math.pow((ts * i),3))/(6 * Rc * Ls);
									var yd = google.maps.geometry.spherical.computeOffset(yi, -ycd , h2-(90 * dir));
									var xo = google.maps.geometry.spherical.computeHeading(path[i-1],yd);
									var xd = google.maps.geometry.spherical.computeDistanceBetween(path[i-1],yd);
									var xi = google.maps.geometry.spherical.computeOffset(path[i-1], xd, xo);
									path.push(xi);
								}
							}
							// --- end							
							
						} else if (tctype == 'halfsine') {
							var X2_2PI2 = Math.pow(TotalX,2)/(2*Math.pow(Math.PI,2));						
							var parts = 30; // any value, higher = more precision on plotting
							var ts = Ls / parts; // TotalX = full length of transition by assumption (see Cubic Parabola calculation), ntc new transition segment divided by any value
							path.push(Ttst);
							
							var tcpoly = MapToolbar.features['tcurveTab'][cuvid];
							var tcstart =  parseFloat(google.maps.geometry.spherical.computeLength(path));

							var note = '', pit = '', bdata = '', kit = '';
							
							//curve start marker index 0
							if (tcpoly.markers.getAt(0).note != '') { note = tcpoly.markers.getAt(0).note; } 
							if (tcpoly.markers.getAt(0).bdata.pitch != '') { 
								pit = tcpoly.markers.getAt(0).bdata.pitch; 
							}
							bdata = "tcurve:startT:" + cuvid; 
							if (tcpoly.markers.getAt(0).bdata.height != '') { 
								bdata += '§height:' + tcpoly.markers.getAt(0).bdata.height;
							}
							
							$.each(tcpoly.markers.getAt(0).kdata, function(key, value){
								if (tcpoly.markers.getAt(0).kdata[key] != '') {
									var ktxt = setKTxtEv(key,tcpoly.markers.getAt(0).kdata[key]);
									if (kit == '') {
										kit = ktxt;
									} else {
										kit += '§' + ktxt;
									}
								}
							});
												
							gnote.push([Math.ceil(tcstart).toString(), note , pit, bdata, kit]);
							
							
							
							//curve end marker index 1
							note = ''; pit = ''; bdata = ''; kit = '';
							if (tcpoly.markers.getAt(1).note != '') { note = tcpoly.markers.getAt(1).note; } 
							if (tcpoly.markers.getAt(1).bdata.pitch != '') { 
								pit = tcpoly.markers.getAt(1).bdata.pitch; 
							}
							bdata = "tcurve:startC:" + cuvid; 
							if (tcpoly.markers.getAt(1).bdata.height != '') { 
								bdata += '§height:' + tcpoly.markers.getAt(1).bdata.height;
							}

							$.each(tcpoly.markers.getAt(1).kdata, function(key, value){
								if (tcpoly.markers.getAt(1).kdata[key] != '') {
									var ktxt = setKTxtEv(key,tcpoly.markers.getAt(1).kdata[key]);
									if (kit == '') {
										kit = ktxt;
									} else {
										kit += '§' + ktxt;
									}
								}
							});

							var cvstart = Math.ceil(tcstart + Ls);
							gnote.push([cvstart.toString(), note, pit, bdata, kit]); 							

							//curve end marker index 1
							note = ''; pit = ''; bdata = ''; kit = '';
							if (tcpoly.markers.getAt(1).note != '') { note = tcpoly.markers.getAt(1).note; } 
							if (tcpoly.markers.getAt(1).bdata.pitch != '') { 
								pit = tcpoly.markers.getAt(1).bdata.pitch; 
							}
							bdata = "tcurve:endC:" + cuvid; 
							if (tcpoly.markers.getAt(1).bdata.height != '') { 
								bdata += '§height:' + tcpoly.markers.getAt(1).bdata.height;
							}

							$.each(tcpoly.markers.getAt(1).kdata, function(key, value){
								if (tcpoly.markers.getAt(1).kdata[key] != '') {
									var ktxt = setKTxtEv(key,tcpoly.markers.getAt(1).kdata[key]);
									if (kit == '') {
										kit = ktxt;
									} else {
										kit += '§' + ktxt;
									}
								}
							});

							var cvend = Math.ceil(tcstart + Ls + Lc);
							gnote.push([cvend.toString(), note, pit, bdata, kit]); 

							//curve end marker index 1
							note = ''; pit = ''; bdata = ''; kit = '';
							if (tcpoly.markers.getAt(1).note != '') { note = tcpoly.markers.getAt(1).note; } 
							if (tcpoly.markers.getAt(1).bdata.pitch != '') { 
								pit = tcpoly.markers.getAt(1).bdata.pitch; 
							}
							bdata = "tcurve:endT:" + cuvid; 
							if (tcpoly.markers.getAt(1).bdata.height != '') { 
								bdata += '§height:' + tcpoly.markers.getAt(1).bdata.height;
							}

							$.each(tcpoly.markers.getAt(1).kdata, function(key, value){
								if (tcpoly.markers.getAt(1).kdata[key] != '') {
									var ktxt = setKTxtEv(key,tcpoly.markers.getAt(1).kdata[key]);
									if (kit == '') {
										kit = ktxt;
									} else {
										kit += '§' + ktxt;
									}
								}
							});

							var tcend = Math.ceil(tcstart + 2 * Ls + Lc);
							gnote.push([tcend.toString(), note, pit, bdata, kit]);

							for (var c = 5; c < tcpoly.markers.length; c++) {
								if (typeof tcpoly.markers.getAt(c).ld != 'undefined')  {
									note = ''; pit = ''; bdata = ''; kit = '';
									if (tcpoly.markers.getAt(c).note != '') { note = tcpoly.markers.getAt(c).note; } 
									
									if (tcpoly.markers.getAt(c).bdata.pitch != '') { 
										pit = tcpoly.markers.getAt(c).bdata.pitch; 
									}
									bdata = "tcurve:ld:" + cuvid + ':' + c;
									if (tcpoly.markers.getAt(c).bdata.height != '') { 
										bdata = 'height:' + tcpoly.markers.getAt(c).bdata.height;
									}

									$.each(tcpoly.markers.getAt(c).kdata, function(key, value){
										if (tcpoly.markers.getAt(c).kdata[key] != '') {
											var ktxt = setKTxtEv(key,tcpoly.markers.getAt(c).kdata[key]);
											if (kit == '') {
												kit = ktxt;
											} else {
												kit += '§' + ktxt;
											}
										}
									});
					
									var dis = Math.ceil(tcpoly.markers.getAt(c).ld + tcstart);
									gnote.push([dis.toString(), note, pit, bdata, kit]);
	
								} 
							} 
							
							
							//gnote.sort(function(a,b){return a-b});
							var sorted;
							do {
								sorted = 0;
								for (d = 1; d < gnote.length; d++) {
									if (parseInt(gnote[d][0]) < parseInt(gnote[d-1][0])) {
										var tar0 = gnote[d];
										gnote.splice(d,1);
										gnote.splice(d-1,0,tar0);
									} else {
										sorted++;
									}
								}								
							} while (sorted < gnote.length -1);

							
							$.each(tcpoly.markers.getAt(0).kdata, function(key, value){
								if (tcpoly.markers.getAt(0).kdata[key] != '') {
									var ktxt = setKTxtEv(key,tcpoly.markers.getAt(0).kdata[key]);
									if (kit == '') {
										kit = ktxt;
									} else {
										kit += '§' + ktxt;
									}
								}
							});
							
							
							//gnote.push([Math.ceil(tcstart).toString(), note , pit, bdata, kit]); 							
							
							for (var i=1; (i < parts); i++) {     
								var yi = google.maps.geometry.spherical.computeOffset(Ttst, ts * i, h1);
								var ycd = (1/Rc)*((Math.pow(ts * i,2)/4)-X2_2PI2*(1-Math.cos((Math.PI * ts * i)/TotalX)));
								var yd = google.maps.geometry.spherical.computeOffset(yi, ycd , h1+(90 * dir));
								var xo = google.maps.geometry.spherical.computeHeading(path[i-1],yd);
								var xd = google.maps.geometry.spherical.computeDistanceBetween(path[i-1],yd);
								var xi = google.maps.geometry.spherical.computeOffset(path[i-1], xd, xo);
								path.push(xi);
							}	
							path.push(Tcst);
							
							var points = Math.ceil(Lc/25);
							var iB = google.maps.geometry.spherical.computeHeading(Cc,Tcst);
							var fB = google.maps.geometry.spherical.computeHeading(Cc,Tced);
	
							var br = fB - iB;
							if (br >  180) {br -= 360;}
							if (br < -180) {br += 360;}
	
							var deltaBearing = br/points;
	
							for (var i=1; (i < points); i++) {     
								path.push(google.maps.geometry.spherical.computeOffset(Cc, Rc, iB + i*deltaBearing)); 
							}
							
							path.push(Tced);
							
							for (var i=parts-1; (i > 0); i--) {     
								var yi = google.maps.geometry.spherical.computeOffset(Tted, -ts * i, h2);
								var ycd = (1/Rc)*((Math.pow(ts * i,2)/4)-X2_2PI2*(1-Math.cos((Math.PI * ts * i)/TotalX)));
								var yd = google.maps.geometry.spherical.computeOffset(yi, -ycd , h2-(90 * dir));
								var xo = google.maps.geometry.spherical.computeHeading(path[i-1],yd);
								var xd = google.maps.geometry.spherical.computeDistanceBetween(path[i-1],yd);
								var xi = google.maps.geometry.spherical.computeOffset(path[i-1], xd, xo);
								path.push(xi);
							} 
							path.push(Tted);

						}
	
  
					} else if ((epoly.markers.getAt(k).bdata.curve != '') || (epoly.markers.getAt(k).bdata.tcurve == '')) {
							
							var cuvid = epoly.markers.getAt(k).bdata.curve;
							var cR = Math.abs(MapToolbar.features['curveTab'][cuvid].Rc);
							var tL = MapToolbar.features['curveTab'][cuvid].Lt ;
							var cL = MapToolbar.features['curveTab'][cuvid].Lc ;
							var xpc = MapToolbar.features['curveTab'][cuvid].Cc;
							var xp1 = MapToolbar.features['curveTab'][cuvid].st;
							var xp2 = MapToolbar.features['curveTab'][cuvid].ed;
							var xh1 = MapToolbar.features['curveTab'][cuvid].h1;
							var xh2 = MapToolbar.features['curveTab'][cuvid].h2;
							
							path.push(xp1);
							var points = Math.ceil(cL/25);
							var iB = google.maps.geometry.spherical.computeHeading(xpc,xp1);
							var fB = google.maps.geometry.spherical.computeHeading(xpc,xp2);

							var br = null;
				
							br = fB - iB;
				
							if (br >  180) {br -= 360;}
							if (br < -180) {br += 360;}
				
							var deltaBearing = br/points;
							
							var cpoly = MapToolbar.features['curveTab'][cuvid];
							var cuvstart =  parseFloat(google.maps.geometry.spherical.computeLength(path));

							var note = '', pit = '', bdata = '', kit = '';
							
							//curve start marker index 0
							if (cpoly.markers.getAt(0).note != '') { note = cpoly.markers.getAt(0).note; } 
							if (cpoly.markers.getAt(0).bdata.pitch != '') { 
								pit = cpoly.markers.getAt(0).bdata.pitch; 
							}
							bdata = "curve:start:" + cuvid; 
							if (cpoly.markers.getAt(0).bdata.height != '') { 
								bdata += '§height:' + cpoly.markers.getAt(0).bdata.height;
							}

							
							$.each(cpoly.markers.getAt(0).kdata, function(key, value){
								if (cpoly.markers.getAt(0).kdata[key] != '') {
									var ktxt = setKTxtEv(key,cpoly.markers.getAt(0).kdata[key]);
									if (kit == '') {
										kit = ktxt;
									} else {
										kit += '§' + ktxt;
									}
								}
							});
							
							
							gnote.push([Math.ceil(cuvstart).toString(), note , pit, bdata, kit]); 
							
							
							//curve end marker index 1
							note = ''; pit = ''; bdata = ''; kit = '';
							if (cpoly.markers.getAt(1).note != '') { note = cpoly.markers.getAt(1).note; } 
							if (cpoly.markers.getAt(1).bdata.pitch != '') { 
								pit = cpoly.markers.getAt(1).bdata.pitch; 
							}
							bdata = "curve:end:" + cuvid; 
							if (cpoly.markers.getAt(1).bdata.height != '') { 
								bdata += '§height:' + cpoly.markers.getAt(1).bdata.height;
							}

							$.each(cpoly.markers.getAt(1).kdata, function(key, value){
								if (cpoly.markers.getAt(1).kdata[key] != '') {
									var ktxt = setKTxtEv(key,cpoly.markers.getAt(1).kdata[key]);
									if (kit == '') {
										kit = ktxt;
									} else {
										kit += '§' + ktxt;
									}
								}
							});

							var cuvend = Math.ceil(cuvstart + cL);
							gnote.push([cuvend.toString(), note, pit, bdata, kit]); 
							

							for (var c = 3; c < cpoly.markers.length; c++) {
								if (typeof cpoly.markers.getAt(c).ld != 'undefined')  {
									note = ''; pit = ''; bdata = ''; kit = '';
									if (cpoly.markers.getAt(c).note != '') { note = cpoly.markers.getAt(c).note; } 
									
									if (cpoly.markers.getAt(c).bdata.pitch != '') { 
										pit = cpoly.markers.getAt(c).bdata.pitch; 
									}
									bdata = "curve:ld:" + cuvid + ':' + c;
									if (cpoly.markers.getAt(c).bdata.height != '') { 
										bdata = 'height:' + cpoly.markers.getAt(c).bdata.height;
									}

									$.each(cpoly.markers.getAt(c).kdata, function(key, value){
										if (cpoly.markers.getAt(c).kdata[key] != '') {
											var ktxt = setKTxtEv(key,cpoly.markers.getAt(c).kdata[key]);
											if (kit == '') {
												kit = ktxt;
											} else {
												kit += '§' + ktxt;
											}
										}
									});
					
									var dis = Math.ceil(cpoly.markers.getAt(c).ld + cuvstart);
									gnote.push([dis.toString(), note, pit, bdata, kit]);
	
								} 
							} 
							
							
							//gnote.sort(function(a,b){return a-b});
							var sorted;
							do {
								sorted = 0;
								for (d = 1; d < gnote.length; d++) {
									if (parseInt(gnote[d][0]) < parseInt(gnote[d-1][0])) {
										var tar0 = gnote[d];
										gnote.splice(d,1);
										gnote.splice(d-1,0,tar0);
									} else {
										sorted++;
									}
								}								
							} while (sorted < gnote.length -1);
							
							for (var i=0; (i < points+1); i++) {     
								path.push(google.maps.geometry.spherical.computeOffset(xpc, cR, iB + i*deltaBearing)); 
							}
							path.push(xp2);
							
					} else {
						// either 1 only
					}
				}
			}
  		
			var sectionLength = google.maps.geometry.spherical.computeLength(path);
			var numberOfSegment = Math.ceil(sectionLength/25); // segmen per 25 meter

			if (numberOfSegment > 512) { 
				alert('distance is too large (' + sectionLength + ' m),\nnumber of sample generate is ' + numberOfSegment + '.\nplease add new point to make the line segment shorter and to make\nthe number of sample is less than 512.');
				$('#dialogRailpitch').dialog('close');
				return;
			}

			// Create a new chart in the elevation_chart DIV.
			//chart = new google.visualization.ColumnChart(document.getElementById('elevation_chart'));
  
			// Create a PathElevationRequest object using this array.
			// Ask for 256 samples along that path.
			var pathRequest = {
				'path': path,
				'samples': numberOfSegment
			}
			var startdistance = Math.round(parseFloat(getTrackDistanceFromStart(polyid,rpm1).LwCurve));
			$('#txtPitchDetails').val(gnote.join('\n'));
			$('#txtPitchStartPointAtM').val(startdistance);
			$('#LLmidxSt').val(rpm1);
			$('#LLmidxEd').val(rpm2);
			$('#LLbasePolyID').val(polyid);

  		// Initiate the path request.
  		elevator.getElevationAlongPath(pathRequest, plotElevation);    
		}	
	});	
}

function predrawRailCurve(polyid,mindex) {
	$('#DCbasePolyID').val(polyid);
	$('#DCmarkerIndex').val(mindex);
	$('#sBtnRCGauge').val(defaultGauge);
	$('#sBtnRCCant').val(defaultCant);
	
	$('#dialogRailCurve').dialog('open');
	curveCalculator('RC','');
}

function drawRailCurve() {
	if (typeof $('#DCbasePolyID').val() != 'undefined') {
		var polyL = null;
		if (MapToolbar.features["lineTab"][$('#DCbasePolyID').val()] != null) {
			polyL = MapToolbar.features["lineTab"][$('#DCbasePolyID').val()];
			var currIdx = parseInt($('#DCmarkerIndex').val());
			var enforceSL = (document.getElementById('enforceSpeedLimit').checked) ? true : false;
			var railIndex = 0;
			//alert($('#ddc_railindex option:selected').text());
			for (r = 0; r < bverailobjArr.length; r++) {
				if (bverailobjArr[r][2] == $('#ddc_railindex option:selected').text()) {
					railIndex = r;
					break;
				}
			}

			if (polyL.markers.getAt(currIdx).bdata.curve != '') {
				alert('Please remove the current curve (' + polyL.markers.getAt(currIdx).bdata.curve + ') at this point.');
				$('#dialogRailCurve').dialog('close');					
				return;
			}
						
			if ((typeof polyL.markers.getAt(currIdx - 1) == 'undefined') || (polyL.markers.getAt(currIdx - 1) == null)) {
				alert('sorry, you can\'t create curve at the beginning of the line.');
				$('#dialogRailCurve').dialog('close');
				return;
			}

			if ((typeof polyL.markers.getAt(currIdx + 1) == 'undefined') || (polyL.markers.getAt(currIdx + 1) == null)) {
				alert('sorry, you can\'t create curve at the end of the line.');
				$('#dialogRailCurve').dialog('close');
				return;
			}
			
				var m0 = polyL.markers.getAt(currIdx-1).getPosition();
				var m1 = polyL.markers.getAt(currIdx).getPosition();
				var m2 = polyL.markers.getAt(currIdx+1).getPosition();
				var h1 = google.maps.geometry.spherical.computeHeading(m0,m1);
				var h2 = google.maps.geometry.spherical.computeHeading(m1,m2);
				var fic = intersection_angle(h1,h2);
				var theta = fic.angle;
				var dir = fic.direction;
				
				if (dir == 0) {
					alert('sorry, unable to draw curve on stright line');
					$('#dialogRailCurve').dialog('close');	
				} else {
					var delta = 180-theta ; 
					var deltaR = delta.toRad();
					var Rc = (typeof $('#sBtnCurveRadius').val() != 'undefined') ? parseFloat($('#sBtnCurveRadius').val()) : 160;
					var Lt = Rc /(Math.tan((theta/2).toRad())); // length@distance to m1 point
					var np1 = google.maps.geometry.spherical.computeOffset(m1, -Lt, h1);
					var np2 = google.maps.geometry.spherical.computeOffset(m1, Lt, h2);
					var Lc = (delta/360) * 2 * Math.PI * Rc;

					var Lb0 = google.maps.geometry.spherical.computeDistanceBetween(m0,m1) ;
					var Lb1 = google.maps.geometry.spherical.computeDistanceBetween(m1,m2) ;
					
					if (polyL.markers.getAt(currIdx-1).bdata.curve != '') {
						var Lt0 = MapToolbar.features['curveTab'][polyL.markers.getAt(currIdx-1).bdata.curve].Lt;
						if (Lt0 + Lt > Lb0) {
							alert('Warning! curve overlapped with previous curve.');
							return;
						}
					}

					if (polyL.markers.getAt(currIdx+1).bdata.curve != '') {
						var Lt1 = MapToolbar.features['curveTab'][polyL.markers.getAt(currIdx+1).bdata.curve].Lt;
						if (Lt1 + Lt > Lb1) {
							alert('Warning! curve overlapped with next curve.');
							return;
						}					
					}
					
					if ((Lt > Lb0) || (Lt > Lb1)) {
							alert('Warning! Unable to fit curve at the intersection. Curve is too big, please reduce curve radius or design speed.');
							return;						
					}
					
					var cc1a = google.maps.geometry.spherical.computeOffset(np1, Rc, h1 + (90 * dir));
					var cc1b = google.maps.geometry.spherical.computeOffset(np1, Rc, h1 - (90 * dir));
					var cc2a = google.maps.geometry.spherical.computeOffset(np2, Rc, h2 + (90 * dir));
					var cc2b = google.maps.geometry.spherical.computeOffset(np2, Rc, h2 - (90 * dir));	

					var Cc = null;
				
					if (google.maps.geometry.spherical.computeDistanceBetween(cc1a,cc2a) <= 1) {
						Cc = cc1a;
					} else if (google.maps.geometry.spherical.computeDistanceBetween(cc1a,cc2b) <= 1) {
						Cc = cc1b;
					} else if (google.maps.geometry.spherical.computeDistanceBetween(cc1b,cc2a) <= 1) {
						Cc = cc2a;
					} else if (google.maps.geometry.spherical.computeDistanceBetween(cc1b,cc2b) <= 1) {
						Cc = cc2b;
					} else {
						//alert('center satu pun tak match : \n' + google.maps.geometry.spherical.computeDistanceBetween(cc1a,cc2a) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(cc1a,cc2b) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(cc1b,cc2a) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(cc1b,cc2b));
					}
							
					var points = Math.ceil(Lc/25);
					var iB = google.maps.geometry.spherical.computeHeading(Cc,np1);
					var fB = google.maps.geometry.spherical.computeHeading(Cc,np2);

					var extp = [];
					var br = null;
				
					br = fB - iB;
				
					if (br >  180) {br -= 360;}
					if (br < -180) {br += 360;}
				
					var deltaBearing = br/points;
				
					for (var i=0; (i < points+1); i++) {     
						extp.push(google.maps.geometry.spherical.computeOffset(Cc, Rc, iB + i*deltaBearing)); 
					}
										
					var curve = new google.maps.Polyline({
						path: extp,
						strokeColor: "#FF0000",
						strokeOpacity: 0.7,
						geodesic: true,
						map: map,
						strokeWeight: 1
					});
					//curve.setMap(map);
					
					++MapToolbar["curveCounter"];
					curve.id = 'curve_'+ MapToolbar["curveCounter"];
					curve.pid = polyL.id;
					curve.ptype = 'curve';
					curve.uid = genUiD(curve.id); //unique id - new feature start on 01/9/2014
					curve.mid = currIdx;
 					curve.Rc = Rc * dir,
 					curve.cant = parseInt($('#sBtnRCCant').val());
 					curve.Vd = parseInt($('#sBtnRCDesignSpeed').val());
 					curve.Lt = Lt;
 					curve.Lc = Lc;
 					curve.Cc = Cc;
 					curve.st = extp[0];
 					curve.ed = extp[extp.length-1];
 					curve.h1 = h1;
 					curve.h2 = h2;
 					curve.forceSL = enforceSL;
 					curve.delta = delta;
 					curve.theta = theta;
 					curve.railindex = railIndex;
					curve.route = (polyL.route != '') ? polyL.route : '';
					curve.$el = MapToolbar.addFeatureEntry(curve.id);
					curve.markers = new google.maps.MVCArray;	     
					MapToolbar.features['curveTab'][curve.id] = curve;
									
					MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx).bdata.curve = curve.id ;
					MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx).setDraggable(false);
															
					var imgurl = "images/curve-sign.png";
					var imgurl2 = "images/curve-sign2.png";
					var imgccurl = "images/bullet_white.png";
     
					var e1 = new google.maps.LatLng(extp[0]),      
						image = new google.maps.MarkerImage(imgurl,
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(5, 5)), 
						index =0,
						marker = new google.maps.Marker({
							position: extp[0],
							map: map,
							icon: image,
							title: curve.id + ' start point : ' + extp[0] ,
							note: '', // any extra note 
							bdata: {height:'',pitch:''},
							kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
							sline: '',
							lineX: '',
							gdata: {lastpitch:'',lastheight:'',lastheightratio:''},
							ld:0, // distance on circumference from curve start point 
							pid:curve.id
						});

				marker.index = index;    
				curve.markers.insertAt(index, marker)

          var e2 = new google.maps.LatLng(extp.length-1),      
          image= new google.maps.MarkerImage(imgurl2,
		        new google.maps.Size(6, 6),
		        new google.maps.Point(0, 0),
		        new google.maps.Point(5, 5)), 
          index =1,
	        marker = new google.maps.Marker({
				    position: extp[extp.length-1],
				    map: map,
				    icon: image,
				    title: curve.id + ' end point : ' + extp[extp.length-1],
				    note: '', // any extra note 
					bdata: {height:'',pitch:''},
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
					lineX: '',
					gdata: {lastpitch:'',lastheight:'',lastheightratio:''},
					ld:Lc, // distance on circumference from curve start point 
					pid:curve.id
	        });
	        marker.index = index;    
	        curve.markers.insertAt(index, marker)
	    
          var ec = new google.maps.LatLng(Cc),      
          image= new google.maps.MarkerImage(imgccurl,
		        new google.maps.Size(6, 6),
		        new google.maps.Point(0, 0),
		        new google.maps.Point(3, 3)), 
          index =2,
	        marker = new google.maps.Marker({
				    position: Cc,
				    map: map,
				    icon: image,
				    title: curve.id + ' center point : ' + Cc ,
				    note: '', // any extra note 
					bdata: {height:'',pitch:''},
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
					lineX: '',
					gdata: {lastpitch:'',lastheight:'',lastheightratio:''},
					ld:null, // distance on circumference from curve start point 
					pid:curve.id
	        });
	        marker.index = index;    
	        curve.markers.insertAt(index, marker)
	        
				google.maps.event.addListener(curve, "click", function(mEvent){
					var infoWindowTxt = 'curve Id : ' + curve.id + '(' + curve.uid + ')';
					infoWindowTxt += '<br><br>line id : ' + curve.pid + ' mid : ' + curve.mid; 
					infoWindowTxt += '<br>radius : ' + curve.Rc + 'm<br>design speed : ' + curve.Vd + ' km/h<br>cant : ' + curve.cant + ' mm' + '<br>curve length : ' + (Math.round(Lc*10000)/10000) + '<br>tangent length : ' + (Math.round(Lt*10000)/10000) + ' m<br>';

					var lat0 = mEvent.latLng.lat();
					var lng0 = mEvent.latLng.lng();
					
					infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="2"><tr>' + '<td width="24"><img src="images/remove line.png" width="20" height="20" title="Remove line" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\''+ curve.id + '\');"></td><td>&nbsp;&nbsp;</td>'; 

				infoWindowTxt += '<td width="24"><img src="images/line+point.png" width="20" height="20" title="Add new point to current line" style="cursor: pointer;" onclick="btnAddMarker2Polyline(\''+ curve.id + '\',\'' + lat0 + '\',\'' + lng0 + '\');"></td>';
			
					infoWindowTxt += '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
				
					infoWindowTxt += '<td><img src="images/sticky_note_pencil.png" title="Add Note" width="16" height="16" style="cursor: pointer;" onclick="curveNote(\'' + curve.id + '\');"></td>';
				
					infoWindowTxt += '<td><img src="images/xfce4_settings.png" title="Setting" width="16" height="16" style="cursor: pointer;" onclick="curveSetting(\'' + curve.id + '\');"></td>';
				
					infoWindowTxt += '</tr></table>';    			
			
					var infowindow = new google.maps.InfoWindow({
						content: infoWindowTxt,
						position: mEvent.latLng
					});

					infowindow.open(map);	

				});
				
				$('#dialogRailCurve').dialog('close');	     							
			}
		}
	}
}

function predrawRailTransitionCurve(polyid,mindex) {
	$('#DtCbasePolyID').prop("value", polyid);
	$('#DtCmarkerIndex').prop("value", mindex);
	$('#sRTCBtnGauge').val(defaultGauge);
	$('#sBtnRtCCant').val(defaultCant);	
	$('#dialogRailTransitionCurve').dialog('open');
	curveCalculator('TC','');
}

function drawRailTransitionCurve() {
// by : Karya IT
// updated : 15 Jan 2014
// v1.0.0
	var cant = parseInt($('#sBtnRtCCant').val()); // mm unit
	var gauge = parseInt($('#sRTCBtnGauge').val()); // mm unit
	var v_ds = parseInt($('#sBtnRTCDesignSpeed').val()); // kph unit
	var mid = parseInt($('#DtCmarkerIndex').val());
	var pid = $('#DtCbasePolyID').val();
	var Rc = parseInt($('#sBtnRTCCircularRadius').val());
	var Ls = 0;
	var Lc = 0;
	var TL = 0;
	
	var railIndex = 0;
	//alert($('#ddc_railindex option:selected').text());
	for (r = 0; r < bverailobjArr.length; r++) {
		if (bverailobjArr[r][2] == $('#ddtc_railindex option:selected').text()) {
			railIndex = r;
			break;
		}
	}	

	var imgurlTcSt = "images/gbm-m_curve.png";
	var imgurlCcSt = "images/curve-sign2.png";
	var imgurlCcCt = "images/bullet_white.png";
	var imgurlShft = "images/bullet_grey.png";	
	
	if (typeof MapToolbar.features["lineTab"][pid] == 'undefined') {
		alert('poly id undefined');
		$('#dialogRailTransitionCurve').dialog('close');
		return;		
	}
	
	var polyL = MapToolbar.features["lineTab"][pid];	
	
	if ((polyL.markers.getAt(mid).note != '') && (polyL.markers.getAt(mid).note != '')) {
		var str = polyL.markers.getAt(mid).note;				
		if (str.indexOf('tcurve') >= 0) {
			var arr = str.split('§');
			for (x=0; x < arr.length; x++) {
				if (arr[x].indexOf('tcurve') >= 0) {
					alert('Please remove the current curve (' + arr[x].split(':')[1]+ ') at this point.');
					break;
				}
			}
			$('#dialogRailTransitionCurve').dialog('close');		
			return;
		}
	}
	
	if ((typeof polyL.markers.getAt(mid - 1).index == 'undefined') && (typeof polyL.markers.getAt(mid + 1).index == 'undefined')) {
		alert('Unable to draw a curve at the end of the polyline.');
		$('#dialogRailTransitionCurve').dialog('close');
		return;
	}

	var m0 = polyL.markers.getAt(mid-1).getPosition();
	var m1 = polyL.markers.getAt(mid).getPosition();
	var m2 = polyL.markers.getAt(mid+1).getPosition();
	var h1 = google.maps.geometry.spherical.computeHeading(m0,m1);
	var h2 = google.maps.geometry.spherical.computeHeading(m1,m2);
	var fic = intersection_angle(h1,h2);
	var thetaD = fic.angle; // θ intersection angle
	var dir = fic.direction;
	
	var Lb0 = google.maps.geometry.spherical.computeDistanceBetween(m0,m1) ;
	var Lb1 = google.maps.geometry.spherical.computeDistanceBetween(m1,m2) ;
		
	var thetaR = thetaD * (Math.PI / 180);
	
	var delta = 180 - thetaD; //Δ deflectionAngle
	var deltaRad = delta * (Math.PI / 180);

	if (dir == 0) {
		alert('sorry, unable to draw curve or transition curve on stright line');
		$('#dialogRailTransitionCurve').dialog('close');	
		return;
	}
		
	if (document.getElementById('tc_cubic_parabola').checked) {
	//cubic parabola
		Ls = Math.pow(v_ds,3) / (Math.pow(3.6,3) * 0.3 * Rc); // spiral length
		var S = (Ls * Ls) /(24 * Rc); //shift of the curve 
		var IT = ((Rc + S)/(Math.tan(thetaR/2)))+ (Ls/2);
			
		Lc = deltaRad * Rc - Ls; // 2 x Ls/2
		var TotalL = Lc + 2 * Ls;
	
		var delta_C = (Lc*360)/(2*Math.PI*Rc); //Δc
		var delta_S = (delta - delta_C)/2; //Δs
	
		if (delta_S < 0) {
			alert('Warning: the deflection angle is too small to introduce transition curve. \nCurrent deflection angle is ' + (Math.round(delta*100)/100) + '°.');
			$('#dialogRailTransitionCurve').dialog('close');	
			return;
		}
	
		var rmin1 = 1.39 * Math.sqrt(Rc * Ls); // method 1		
		var rmin2 = Math.sqrt(Math.pow(v_ds,3)/(Math.pow(3.6,3)*0.3*deltaRad));// method 2
		var rmin = 0;
			
		if (rmin1 > rmin2) { 
			rmin = rmin1;
		} else if (rmin1 < rmin2) { 
			rmin = rmin2;
		} else	{ 				
			rmin = rmin2; // @ rmin = rmin1;	
		}
			
		if (Rc < rmin) { 
			alert('Warning: Minimum radius for this deflection angle is ' + rmin + ' m.'); 
			return;
		}
				
		var IT = ((Rc + S)/(Math.tan(thetaR/2)))+ (Ls/2); // Total tangent length from intersection point to transition start/end point
		var K = Ls/2;
		var ntp1 = google.maps.geometry.spherical.computeOffset(m1, -IT, h1); //point 1 : transition start
		var ntp2 = google.maps.geometry.spherical.computeOffset(m1, IT, h2); //point 2 : transition end
		
		var tditcl = (Rc + S)/(Math.tan(thetaR/2));			
		var tditc0 = google.maps.geometry.spherical.computeOffset(m1, -tditcl, h1);
		var tditc1 = google.maps.geometry.spherical.computeOffset(m1, tditcl, h2);
	
		var nscc1 = google.maps.geometry.spherical.computeOffset(tditc0, (Rc+S), h1 + (90 * dir));
		var nscc2 = google.maps.geometry.spherical.computeOffset(tditc0, (Rc+S), h1 - (90 * dir));
		var nscc3 = google.maps.geometry.spherical.computeOffset(tditc1, (Rc+S), h2 + (90 * dir));
		var nscc4 = google.maps.geometry.spherical.computeOffset(tditc1, (Rc+S), h2 - (90 * dir));	

		var Cc = null;
		TL = IT;
		
		if (google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc3) <= 1) {
			Cc = nscc1;
		} else if (google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc4) <= 1) {
			Cc = nscc2;
		} else if (google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc3) <= 1) {
			Cc = nscc3;
		} else if (google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc4) <= 1) {
			Cc = nscc4;
		} else {
			Cc = nscc1;
		}

		// Cubic Parabola : TotalX = Ls  (full length of transition by assumption)
		var parts = 30; // any value, higher = more precision
		var ts = Ls / parts; //transition segment divided by any value (for plotting)
		var TotalY = (Math.pow(Ls,2))/(6*Rc); //(L^2/6R)
		
		if (polyL.markers.getAt(mid-1).bdata.tcurve != '') {
			var TL0 = MapToolbar.features['tcurveTab'][polyL.markers.getAt(mid-1).bdata.tcurve].TL;
			if (TL0 + TL > Lb0) {
				alert('Warning! curve overlapped with previous transition curve.');
				return;
			}
		}

		if (polyL.markers.getAt(mid+1).bdata.tcurve != '') {
			var TL1 = MapToolbar.features['tcurveTab'][polyL.markers.getAt(mid+1).bdata.tcurve].TL;
			if (TL1 + TL > Lb1) {
				alert('Warning! curve overlapped with next transition curve.');
				return;
			}					
		}

		if (polyL.markers.getAt(mid-1).bdata.curve != '') {
			var Lt0 = MapToolbar.features['curveTab'][polyL.markers.getAt(mid-1).bdata.curve].Lt;
			if (Lt0 + TL > Lb0) {
				alert('Warning! curve overlapped with previous curve.');
				return;
			}
		}

		if (polyL.markers.getAt(mid+1).bdata.curve != '') {
			var Lt1 = MapToolbar.features['curveTab'][polyL.markers.getAt(mid+1).bdata.curve].Lt;
			if (Lt1 + TL > Lb1) {
				alert('Warning! curve overlapped with next curve.');
				return;
			}					
		}
					
		if ((TL > Lb0) || (TL > Lb1)) {
			alert('Warning! Unable to fit transition curve at the intersection. Transition curve is too big, please reduce curve radius or the design speed.');
			return;						
		}		
             
		var tarr = [];
		var scp1;
		var scp2;
	
		//plotting entering spiral curve
		for (var i=0; (i <= parts); i++) {     
			if (i == 0) {
				tarr.push(ntp1);
			} else if (i== parts) {
				var scp1x = google.maps.geometry.spherical.computeOffset(ntp1, Ls, h1);
				var scp1y = google.maps.geometry.spherical.computeOffset(scp1x, TotalY, h1+(90 * dir));
				var xo = google.maps.geometry.spherical.computeHeading(tarr[i-1],scp1y);
				var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[i-1],scp1y);
				scp1 = google.maps.geometry.spherical.computeOffset(tarr[i-1], xd, xo);
				tarr.push(scp1);   	  		 
			} else {
				var yi = google.maps.geometry.spherical.computeOffset(ntp1, ts * i, h1);
				var ycd = (Math.pow((ts * i),3))/(6 * Rc * Ls);
				var yd = google.maps.geometry.spherical.computeOffset(yi, ycd , h1+(90 * dir));
				var xo = google.maps.geometry.spherical.computeHeading(tarr[i-1],yd);
				var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[i-1],yd);
				var xi = google.maps.geometry.spherical.computeOffset(tarr[i-1], xd, xo);
				tarr.push(xi);
			}
		}
		// --- end
	
		var tarrL = tarr.length;
		var scp2x = google.maps.geometry.spherical.computeOffset(ntp2, -Ls, h2);
		var scp2y = google.maps.geometry.spherical.computeOffset(scp2x, -TotalY, h2-(90 * dir));
		var xo = google.maps.geometry.spherical.computeHeading(tarr[tarrL-1],scp2y);
		var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[tarrL-1],scp2y);
		scp2 = google.maps.geometry.spherical.computeOffset(tarr[tarrL-1], xd, xo);
	
		
		var points = Math.ceil(Lc/25);
		var iB = google.maps.geometry.spherical.computeHeading(Cc,scp1);
		var fB = google.maps.geometry.spherical.computeHeading(Cc,scp2);
	
		var br = fB - iB;
		if (br >  180) {br -= 360;}
		if (br < -180) {br += 360;}
	
		var deltaBearing = br/points;
		var ccSt;
		var ccEd;
	
		//plotting circular curve
		for (var i=0; (i < points+1); i++) {     
			tarr.push(google.maps.geometry.spherical.computeOffset(Cc, Rc, iB + i*deltaBearing)); 
			if (i == 0) {  
				ccSt = tarr[tarr.length-1];
			} else if (i == points) {
				ccEd = tarr[tarr.length-1];
			}
		}	
		// --- end
	
		//plotting exiting spiral curve
		for (var i=parts; (i >= 0); i--) {     
			if (i == 0) {
				tarr.push(ntp2); 		  		 	 
			} else if (i== parts) {		
				tarr.push(scp2);  	  		 
			} else {
				var yi = google.maps.geometry.spherical.computeOffset(ntp2, -ts * i, h2);
				var ycd = (Math.pow((ts * i),3))/(6 * Rc * Ls);
				var yd = google.maps.geometry.spherical.computeOffset(yi, -ycd , h2-(90 * dir));
				var xo = google.maps.geometry.spherical.computeHeading(tarr[i-1],yd);
				var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[i-1],yd);
				var xi = google.maps.geometry.spherical.computeOffset(tarr[i-1], xd, xo);
				tarr.push(xi);
			}
		}
		// --- end
	
		tarrL = tarr.length;	

		var  color = MapToolbar.getColor(true),
			tcurve = new google.maps.Polyline({
			path: tarr,
			strokeColor: "#00E600",
			strokeOpacity: 0.7,
			geodesic: true,
			map: map,
			strokeWeight: 1
		});	
			
		// cubic parabola plotter end
				
	} else {
		//halfsine tangent
		
		if (gauge == 1067) {
			kc = 1;
		} else if (gauge == 1435) {
			kc = 0.75;
		} else if (gauge == 1372) {
			kc = 0.78;
		} else if (gauge == 762) {
			kc = 1.4;
		} else {
			kc = 1;
		}

		if (v_ds > 75) {
			Ls = 0.008 * kc * cant * v_ds ;
		} else {
			Ls = 0.007 * kc * cant * v_ds ;
		}
					
		var TotalX = Ls - 0.0226689447*(Math.pow(Ls,3)/Math.pow(Rc,2));
		var X2_2PI2 = Math.pow(TotalX,2)/(2*Math.pow(Math.PI,2));
	
		var delta_S = Math.atan(TotalX/(2*Rc)); //Δs
		var delta_C = deltaRad - 2 * delta_S; //Δc
		Lc = delta_C * Rc; // circular arc length
		var delta_Sd = delta_S * (180/Math.PI); //Δs
		var delta_Cd = delta_C * (180/Math.PI); //Δc

		var TotalY = (0.25-(1/Math.pow(Math.PI,2)))*(Math.pow(TotalX,2)/Rc);
		var P = TotalY - Rc * (1-Math.cos(delta_S));
		tShift = P;
		var K = TotalX - Rc * Math.sin(delta_S);
		var TV = (Rc+P)*Math.tan(deltaRad/2) + K; // Total tangent length from intersection point to transition start/end point
		var TotalL = Lc + 2 * Ls;
		TL = TV;
		
		if (delta_Cd < 0) {
			alert('<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong>Warning:</strong> the deflection angle is too small to introduce transition curve. <br />Current deflection angle is ' + (Math.round(delta*100)/100) + '°.');
			return;
		}

		var ntp1 = google.maps.geometry.spherical.computeOffset(m1, -TV, h1); //point 1 : transition start
		var ntp2 = google.maps.geometry.spherical.computeOffset(m1, TV, h2); //point 2 : transition end
								
		//var Xb = (Ls/2)*(1/(Math.sqrt(1+Math.pow((Ls/(2*Rc)),2))));
		var tditcl = (Rc + P)/(Math.tan(thetaR/2));			
		var tditc0 = google.maps.geometry.spherical.computeOffset(m1, -tditcl, h1);
		var tditc1 = google.maps.geometry.spherical.computeOffset(m1, tditcl, h2);
	
		var nscc1 = google.maps.geometry.spherical.computeOffset(tditc0, (Rc+P), h1 + (90 * dir));
		var nscc2 = google.maps.geometry.spherical.computeOffset(tditc0, (Rc+P), h1 - (90 * dir));
		var nscc3 = google.maps.geometry.spherical.computeOffset(tditc1, (Rc+P), h2 + (90 * dir));
		var nscc4 = google.maps.geometry.spherical.computeOffset(tditc1, (Rc+P), h2 - (90 * dir));	

		var Cc = null;

		if (google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc3) <= 1) {
			Cc = nscc1;
		} else if (google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc4) <= 1) {
			Cc = nscc2;
		} else if (google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc3) <= 1) {
			Cc = nscc3;
		} else if (google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc4) <= 1) {
			Cc = nscc4;
		} else {
			Cc = nscc1;
		}		

		var parts = 30; // any value, higher = more precision on plotting
		var ts = Ls / parts; // TotalX = full length of transition by assumption (see Cubic Parabola calculation), ntc new transition segment divided by any value
		
		if (polyL.markers.getAt(mid-1).bdata.tcurve != '') {
			var TL0 = MapToolbar.features['tcurveTab'][polyL.markers.getAt(mid-1).bdata.tcurve].TL;
			if (TL0 + TL > Lb0) {
				alert('Warning! curve overlapped with previous transition curve.');
				return;
			}
		}

		if (polyL.markers.getAt(mid+1).bdata.tcurve != '') {
			var TL1 = MapToolbar.features['tcurveTab'][polyL.markers.getAt(mid+1).bdata.tcurve].TL;
			if (TL1 + TL > Lb1) {
				alert('Warning! curve overlapped with next transition curve.');
				return;
			}					
		}

		if (polyL.markers.getAt(mid-1).bdata.curve != '') {
			var Lt0 = MapToolbar.features['curveTab'][polyL.markers.getAt(mid-1).bdata.curve].Lt;
			if (Lt0 + TL > Lb0) {
				alert('Warning! curve overlapped with previous curve.');
				return;
			}
		}

		if (polyL.markers.getAt(mid+1).bdata.curve != '') {
			var Lt1 = MapToolbar.features['curveTab'][polyL.markers.getAt(mid+1).bdata.curve].Lt;
			if (Lt1 + TL > Lb1) {
				alert('Warning! curve overlapped with next curve.');
				return;
			}					
		}
					
		if ((TL > Lb0) || (TL > Lb1)) {
			alert('Warning! Unable to fit transition curve at the intersection. Transition curve is too big, please reduce curve radius or the design speed.');
			return;						
		}				
             
		var tarr = [];
		var scp1;
		var scp2;
	
		for (var i=0; (i <= parts); i++) {     
			if (i == 0) {
				tarr.push(ntp1);
			} else if (i== parts) {
				var scp1x = google.maps.geometry.spherical.computeOffset(ntp1, Ls, h1);
				var scp1y = google.maps.geometry.spherical.computeOffset(scp1x, TotalY, h1+(90 * dir));
				var xo = google.maps.geometry.spherical.computeHeading(tarr[i-1],scp1y);
				var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[i-1],scp1y);
				scp1 = google.maps.geometry.spherical.computeOffset(tarr[i-1], xd, xo);
				tarr.push(scp1);   	  		 
			} else {
				var yi = google.maps.geometry.spherical.computeOffset(ntp1, ts * i, h1);
				var ycd = (1/Rc)*((Math.pow(ts * i,2)/4)-X2_2PI2*(1-Math.cos((Math.PI * ts * i)/TotalX)));
				var yd = google.maps.geometry.spherical.computeOffset(yi, ycd , h1+(90 * dir));
				var xo = google.maps.geometry.spherical.computeHeading(tarr[i-1],yd);
				var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[i-1],yd);
				var xi = google.maps.geometry.spherical.computeOffset(tarr[i-1], xd, xo);
				tarr.push(xi);
			}
		}	
	
		var tarrL = tarr.length;
		var scp2x = google.maps.geometry.spherical.computeOffset(ntp2, -Ls, h2);
		var scp2y = google.maps.geometry.spherical.computeOffset(scp2x, -TotalY, h2-(90 * dir));
		var xo = google.maps.geometry.spherical.computeHeading(tarr[tarrL-1],scp2y);
		var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[tarrL-1],scp2y);
		scp2 = google.maps.geometry.spherical.computeOffset(tarr[tarrL-1], xd, xo);
	
		var points = Math.ceil(Lc/25);
		var iB = google.maps.geometry.spherical.computeHeading(Cc,scp1);
		var fB = google.maps.geometry.spherical.computeHeading(Cc,scp2);
	
		var br = fB - iB;
		if (br >  180) {br -= 360;}
		if (br < -180) {br += 360;}
	
		var deltaBearing = br/points;
		var ccSt;
		var ccEd;
	
		for (var i=0; (i < points+1); i++) {     
			tarr.push(google.maps.geometry.spherical.computeOffset(Cc, Rc, iB + i*deltaBearing)); 
			if (i == 0) {  
				ccSt = tarr[tarr.length-1];
			} else if (i == points) {
				ccEd = tarr[tarr.length-1];
			}
		}	
	
		for (var i=parts; (i >= 0); i--) {     
			if (i == 0) {
				tarr.push(ntp2); 		  		 	 
			} else if (i== parts) {		
				tarr.push(scp2);  	  		 
			} else {
				var yi = google.maps.geometry.spherical.computeOffset(ntp2, -ts * i, h2);
				var ycd = (1/Rc)*((Math.pow(ts * i,2)/4)-X2_2PI2*(1-Math.cos((Math.PI * ts * i)/TotalX)));
				var yd = google.maps.geometry.spherical.computeOffset(yi, -ycd , h2-(90 * dir));
				var xo = google.maps.geometry.spherical.computeHeading(tarr[i-1],yd);
				var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[i-1],yd);
				var xi = google.maps.geometry.spherical.computeOffset(tarr[i-1], xd, xo);
				tarr.push(xi);
			}
		}

		tarrL = tarr.length;	

		var  color = MapToolbar.getColor(true),
			tcurve = new google.maps.Polyline({
			path: tarr,
			strokeColor: "#00E600",
			strokeOpacity: 0.7,
			geodesic: true,
			map: map,
			strokeWeight: 1
		});
		// halfsine curve plotter end
		
	
	}
 			
	++MapToolbar["tcurveCounter"];
	tcurve.id = 'tcurve_'+ MapToolbar["tcurveCounter"];
	tcurve.uid = genUiD(tcurve.id); //unique id - new feature start on 01/9/2014
	tcurve.pid = polyL.id;
	tcurve.mid = mid;
	tcurve.ptype = 'tcurve';
	tcurve.tctype = (document.getElementById('tc_cubic_parabola').checked) ? 'cubic' : 'halfsine';
	tcurve.note = ''; 
	tcurve.Rc = Rc * dir,
 	tcurve.cant = cant;
 	tcurve.Vd = v_ds;
 	tcurve.Ls = Ls;
 	tcurve.Lc = Lc;
 	tcurve.K = K;
	tcurve.TotalX = (document.getElementById('tc_cubic_parabola').checked) ? Ls : TotalX;
	tcurve.TotalY = TotalY;
 	tcurve.Cc = Cc;
 	tcurve.Ttst = tarr[0];
 	tcurve.Tted = tarr[tarr.length-1];
 	tcurve.Tcst = ccSt;
 	tcurve.Tced = ccEd;

 	tcurve.h1 = h1;
 	tcurve.h2 = h2;

 	tcurve.TL = TL;
 	tcurve.shift = (document.getElementById('tc_cubic_parabola').checked) ? S : P;
 	 	
 	tcurve.forceSL = true;
 	tcurve.delta = delta;
 	tcurve.theta = thetaD;
 
 	tcurve.deltaS = (document.getElementById('tc_cubic_parabola').checked) ? delta_S : delta_Sd;
 	tcurve.deltaC = (document.getElementById('tc_cubic_parabola').checked) ? delta_C : delta_Cd;
 	tcurve.railindex = railIndex;	//circular rail index
	tcurve.route = (polyL.route != '') ? polyL.route : '';	
	tcurve.$el = MapToolbar.addFeatureEntry(tcurve.id);
	tcurve.markers = new google.maps.MVCArray;	 
	
	MapToolbar.features['tcurveTab'][tcurve.id] = tcurve;

	
	//MapToolbar.features["lineTab"][pid].markers.getAt(mid).note = '' ;
	MapToolbar.features["lineTab"][pid].markers.getAt(mid).bdata.tcurve = tcurve.id; 
	MapToolbar.features["lineTab"][pid].markers.getAt(mid).setDraggable(false);
	
	var e1 = new google.maps.LatLng(tarr[0]),      
		image = new google.maps.MarkerImage(imgurlTcSt,
			new google.maps.Size(16, 16),
			new google.maps.Point(0, 0),
			new google.maps.Point(8, 8)), 
		index =0,
		marker = new google.maps.Marker({
			position: tarr[0],
			map: map,
			icon: image,
		    note: '', // any extra note 
			bdata: {height:'',pitch:''},
			kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
			sline: '',
			gdata: {lastpitch:'',lastheight:'',lastheightratio:''},			
			ld:0, // distance on circumference from curve start point 
			pid : tcurve.id,
			title : tcurve.id + ' start point : ' + tarr[0] 
		});

	marker.index = index;    
	tcurve.markers.insertAt(index, marker)
		
	var e2 = new google.maps.LatLng(tarr[tarrL-1]),      
		image= new google.maps.MarkerImage(imgurlTcSt,
			new google.maps.Size(16, 16),
			new google.maps.Point(0, 0),
			new google.maps.Point(8, 8)), 
		index =1,
		marker = new google.maps.Marker({
			position: tarr[tarrL-1],
			map: map,
			icon: image,
		    note: '', // any extra note 
			bdata: {height:'',pitch:''},
			kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
			sline: '',
			lineX: '',
			gdata: {lastpitch:'',lastheight:'',lastheightratio:''},			
			ld: 2*Ls + Lc,  
			pid : tcurve.id,
			title: tcurve.id + ' end point : ' + tarr[tarrL-1]
		});
		marker.index = index;    
		tcurve.markers.insertAt(index, marker)
	    
		var ec = new google.maps.LatLng(Cc),      
			image= new google.maps.MarkerImage(imgurlCcCt,
				new google.maps.Size(6, 6),
				new google.maps.Point(0, 0),
				new google.maps.Point(3, 3)), 
		index =2,
		marker = new google.maps.Marker({
			position: Cc,
			map: map,
			icon: image,
		    note: '', // any extra note 
			bdata: {height:'',pitch:''},
			kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
			sline: '',
			lineX: '',
			gdata: {lastpitch:'',lastheight:'',lastheightratio:''},			
			ld:null,  
			pid : tcurve.id,
			title: tcurve.id + ' circlular center : ' + Cc
		});
		marker.index = index;    
		tcurve.markers.insertAt(index, marker)

		var e3 = new google.maps.LatLng(ccSt),      
			image= new google.maps.MarkerImage(imgurlCcSt,
				new google.maps.Size(6, 6),
				new google.maps.Point(0, 0),
				new google.maps.Point(3, 3)), 
		index =3,
		marker = new google.maps.Marker({
			position: ccSt,
			map: map,
			icon: image,
		    note: '', // any extra note 
			bdata: {height:'',pitch:''},
			kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
			sline: '',
			lineX: '',
			gdata: {lastpitch:'',lastheight:'',lastheightratio:''},			
			ld:Ls,  
			pid : tcurve.id,
			title: tcurve.id + ' circlular start : ' + ccSt
		});
		marker.index = index;    
		tcurve.markers.insertAt(index, marker)

		var e4 = new google.maps.LatLng(ccEd),      
			image= new google.maps.MarkerImage(imgurlCcSt,
				new google.maps.Size(6, 6),
				new google.maps.Point(0, 0),
				new google.maps.Point(3, 3)), 
		index =4,
		marker = new google.maps.Marker({
			position: ccEd,
			map: map,
			icon: image,
		    note: '', // any extra note 
			bdata: {height:'',pitch:''},
			kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
			sline: '',
			lineX: '',
			gdata: {lastpitch:'',lastheight:'',lastheightratio:''},			
			ld:Ls + Lc,  
			pid : tcurve.id,
			title: tcurve.id + ' circlular end : ' + ccEd
		});
		marker.index = index;    
		tcurve.markers.insertAt(index, marker)
	
	google.maps.event.addListener(tcurve, "click", function(mEvent){
		var infoWindowTxt = 'curve Id : ' + tcurve.id + '<br>total transition curve length : ' + (Math.round((Lc + 2 * Ls)*10000)/10000) + ' m';
		infoWindowTxt += '<br>total tangent from intersection : ' + (Math.round(TL*10000)/10000) + ' m';
		infoWindowTxt += '<br>spiral curve length Ls : ' + (Math.round(Ls*10000)/10000) + ' m';
		infoWindowTxt += '<br>circular curve length Lc : ' + (Math.round(Lc*10000)/10000) + ' m';
		infoWindowTxt += '<br>shift : ' + (Math.round(tcurve.shift*10000)/10000)  + ' m';
		infoWindowTxt += '<br>deflection angle Δ : ' + delta + '&deg;';
		infoWindowTxt += '<br>intersection angle θ : ' + thetaD + '&deg;';
		infoWindowTxt += '<br>Δs : ' + delta_Sd + '&deg;';
		infoWindowTxt += '<br>Δc : ' + delta_Cd + '&deg;';
		
		infoWindowTxt += '<br>Rc : ' + tcurve.Rc  + '&deg;';
		infoWindowTxt += '<br>cant : ' + tcurve.cant + ' mm';
		infoWindowTxt += '<br>Vd : ' + tcurve.Vd + ' km/h';

		var lat0 = mEvent.latLng.lat();
		var lng0 = mEvent.latLng.lng();
		
		infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="2"><tr>' + '<td width="24"><img src="images/remove line.png" width="20" height="20" title="Remove line" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\''+ tcurve.id + '\');"></td><td>&nbsp;&nbsp;</td>'; 
    	
    	infoWindowTxt += '<td width="24"><img src="images/line+point.png" width="20" height="20" title="Add new point to current line" style="cursor: pointer;" onclick="btnAddMarker2Polyline(\''+ tcurve.id + '\',\'' + lat0 + '\',\'' + lng0 + '\');"></td>';
    			
		infoWindowTxt += '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
					
		infoWindowTxt += '<td><img src="images/sticky_note_pencil.png" title="Add Note" width="16" height="16" style="cursor: pointer;" onclick="curveNote(\'' + tcurve.id + '\');"></td>';
					
		infoWindowTxt += '<td><img src="images/xfce4_settings.png" title="Setting" width="16" height="16" style="cursor: pointer;" onclick="curveSetting(\'' + tcurve.id + '\');"></td>';

		infoWindowTxt += '</td></tr></table><br />';
	   	
		var infowindow = new google.maps.InfoWindow({
			content: infoWindowTxt,
			position: mEvent.latLng
		});
        
		infowindow.open(map);	
		
	});	
	
    $('#dialogRailTransitionCurve').dialog('close');
	$('#tnote').html('');	
}

function intersection_angle(h1,h2) {
	//http://stackoverflow.com/questions/16180595/find-the-angle-between-two-bearings 
	//test fail pd 04 Feb 2014 1:00pm GMT8+
	//return Math.min( (h1-h2)<0 ? h1-h2+360 : h1-h2, (h2-h1)<0 ? h2-h1+360 : h2-h1);
	
	//modified version : 10 April 2014
	// by : Karya IT (Mac 2012)
	// url : http://gbmaps.karyait.net.my/
	// ver. : 1.0.0
	// purpose : angle and direction between two line @ bearing
	
	var lineratio = h1 / h2;
	
	if ((Math.round(lineratio*1000)/1000) == 1) {
		return {'angle': 0, 'direction':0};
	}	
	var h1a = (h1 < 0) ? h1 + 180 : h1 -180;
	var angle = Math.min((h1a - h2) < 0 ? h1a - h2 + 360 : h1a - h2, (h2 - h1a) < 0 ? h2 - h1a + 360 : h2 - h1a);
	var hd = 0; // 0 - error, -ve left, +ve right
	
	if (h1 == 0) {
		if (h2 < 0) {
			hd = -1;
		} else {
			hd = 1;
		}

	} else if ((h1 == 180) || (h1 == -180)) {
		if (h2 < 0) {
			hd = 1;
		} else {
			hd = -1;
		}
	
	} else if (h1 > 0) {
		if (((h2 >= h1) && (h2 <=180)) || ((h1a >= h2) && (h2 >=-180))) {
			hd = 1;
		} else {
			hd = -1;
		}
	
	} else if (h1 < 0) {
		if (((h2 >= h1) && (h2 <=0)) || ((h2 >= 0) && (h2 <=h1a))) {
			hd = 1;
		} else {
			hd = -1;
		}
	
	} else {
		//error
		alert('sorry! unable to determine next heading direction');
		return false;
	}

	return {'angle': angle, 'direction':hd};
}

function codeAddress(address) {
	if (address==null || address=="") { address = $('#address').val();}
  geocoder.geocode( { 'address': address}, function(results, status) {
  	if (status == google.maps.GeocoderStatus.OK) {
  		map.setCenter(results[0].geometry.location);
  		//map.setZoom(11);
  	} else {
  		alert('Geocode was not successful for the following reason: ' + status);
  	}	
	});
}

function curveCalculator(mod, lock) {
	var msgTxt = '';
	
	if (mod =='RC') {
		var cant = parseInt($('#sBtnRCCant').val()); // mm unit
		var gauge = parseInt($('#sBtnRCGauge').val()); // mm unit
		var v_ds = parseInt($('#sBtnRCDesignSpeed').val()); // kph unit
		var Rc = Math.round((gauge * v_ds * v_ds) / (127 * cant)); 	
		$('#sBtnCurveRadius').val(Rc);
		
		var mid = parseInt($('#DCmarkerIndex').val());
		var pid = $('#DCbasePolyID').val();
  	var polyL = MapToolbar.features["lineTab"][pid];
		var m0 = polyL.markers.getAt(mid-1).getPosition();
		var m1 = polyL.markers.getAt(mid).getPosition();
		var m2 = polyL.markers.getAt(mid+1).getPosition();
		var h1 = google.maps.geometry.spherical.computeHeading(m0,m1);
		var h2 = google.maps.geometry.spherical.computeHeading(m1,m2);
		var fic = intersection_angle(h1,h2);
		var theta = fic.angle;				
		var Lb0 = google.maps.geometry.spherical.computeDistanceBetween(m0,m1) ;
		var Lb1 = google.maps.geometry.spherical.computeDistanceBetween(m1,m2) ;
		var Lt = Rc /(Math.tan((theta/2).toRad()));
		
		if (polyL.markers.getAt(mid-1).bdata.curve != '') {
			var Lt0 = MapToolbar.features['curveTab'][polyL.markers.getAt(mid-1).bdata.curve].Lt;
			if (Lt0 + Lt > Lb0) {
				msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong> Warning!: </strong> curve overlapped with previous curve.<br />';
			}
		}

		if (polyL.markers.getAt(mid+1).bdata.curve != '') {
			var Lt1 = MapToolbar.features['curveTab'][polyL.markers.getAt(mid+1).bdata.curve].Lt;
			if (Lt1 + Lt > Lb1) {
				msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong> Warning!: </strong> curve overlapped with next curve.<br />';
			}					
		}
					
		if ((Lt > Lb0) || (Lt > Lb1)) {
			msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong> Warning!: </strong> Unable to fit curve at the intersection.<br />Curve is too big, please reduce curve radius or design speed.<br />';					
		}
					
		$('#cvdata').html(msgTxt);					
		
	} else {
		var cant = parseInt($('#sBtnRtCCant').val()); // mm unit
		var gauge = parseInt($('#sRTCBtnGauge').val()); // mm unit
		var v_ds = parseInt($('#sBtnRTCDesignSpeed').val()); // kph unit
		var mid = parseInt($('#DtCmarkerIndex').val());
		var pid = $('#DtCbasePolyID').val();
		var Rc = 0;
		var Lt = 0;
		
		
		if (lock =='') {
			Rc = Math.round((gauge * v_ds * v_ds) / (127 * cant));
			$('#sBtnRTCCircularRadius').val(Rc);
		} else {
			Rc = parseInt($('#sBtnRTCCircularRadius').val());
		}
		
  	var polyL = MapToolbar.features["lineTab"][pid];
		var m0 = polyL.markers.getAt(mid-1).getPosition();
		var m1 = polyL.markers.getAt(mid).getPosition();
		var m2 = polyL.markers.getAt(mid+1).getPosition();
		var h1 = google.maps.geometry.spherical.computeHeading(m0,m1);
		var h2 = google.maps.geometry.spherical.computeHeading(m1,m2);
		var fic = intersection_angle(h1,h2);
		var thetaD = fic.angle; // θ intersection angle
		var dir = fic.direction;
		
		var thetaR = thetaD * (Math.PI / 180);
	
		var delta = 180 - thetaD; //Δ deflectionAngle
		var deltaRad = delta * (Math.PI / 180);

		$('#tc_theta').val(thetaD);
		$('#tc_delta').val(delta);
		
		var Lb0 = google.maps.geometry.spherical.computeDistanceBetween(m0,m1) ;
		var Lb1 = google.maps.geometry.spherical.computeDistanceBetween(m1,m2) ;
		
		if (document.getElementById('tc_cubic_parabola').checked) {
		//cubic parabola
			var Lt = Math.pow(v_ds,3) / (Math.pow(3.6,3) * 0.3 * Rc); // spiral length
			var S = (Lt * Lt) /(24 * Rc); //shift of the curve 
			var IT = ((Rc + S)/(Math.tan(thetaR/2)))+ (Lt/2);
			var TL = IT;
			var Lc = deltaRad * Rc - Lt; // 2 x Lt/2
			var TotalL = Lc + 2 * Lt;
	
			var delta_C = (Lc*360)/(2*Math.PI*Rc); //Δc
			var delta_S = (delta - delta_C)/2; //Δs
	
			if (delta_C < 0) {
				msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong>Warning:</strong> the deflection angle is too small to introduce transition curve. <br />Current deflection angle is ' + (Math.round(delta*100)/100) + '°.<br />';
			}
	
			var rmin1 = 1.39 * Math.sqrt(Rc * Lt); // method 1		
			var rmin2 = Math.sqrt(Math.pow(v_ds,3)/(Math.pow(3.6,3)*0.3*deltaRad));// method 2
			var rmin = 0;
			
			if (rmin1 > rmin2) { 
				if (Rc < rmin1) { 
					msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong>Warning:</strong> Minimum radius for this deflection angle is ' + rmin1 + ' m.<br />'; 
				}
				rmin = rmin1;
			} else if (rmin1 < rmin2) { 
				if (Rc < rmin2) { 
					msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong>Warning:</strong> Minimum radius for this deflection angle is ' + rmin2 + ' m.<br />'; 
				} 
				rmin = rmin2;
			} else	{ 
				if (Rc < rmin2) { //rmin1 = rmin2
					msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong>Warning:</strong> Minimum radius for this deflection angle is ' + rmin2 + ' m.<br />'; 
				}
				rmin = rmin2; // @ rmin = rmin1;	
			}
	
			if (S < 0.25) {
				msgTxt += '<span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>Transition curve is not required for this setting.<br />';
			} else {
				msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong>Note:</strong> Transition curve is required for this setting.<br />';			
			}
			
			$('#sBtnTCShift').val(S);			
			$('#tc_cp_minR').val(rmin);
			$('#tc_Tt').val(IT);
			$('#tc_TL').val(TotalL);
			$('#tc_Lt').val(Lt);
			$('#tc_Lc').val(Lc);
			$('#tc_deltaS').val(delta_S);
			$('#tc_deltaC').val(delta_C);

		if (polyL.markers.getAt(mid-1).bdata.tcurve != '') {
			var TL0 = MapToolbar.features['tcurveTab'][polyL.markers.getAt(mid-1).bdata.tcurve].TL;
			if (TL0 + TL > Lb0) {
				msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong> Warning!: </strong> overlapped with previous transition curve.<br />';
			}
		}

		if (polyL.markers.getAt(mid+1).bdata.tcurve != '') {
			var TL1 = MapToolbar.features['tcurveTab'][polyL.markers.getAt(mid+1).bdata.tcurve].TL;
			if (TL1 + TL > Lb1) {
				msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong> Warning!: </strong> curve overlapped with next transition curve.<br />';
			}					
		}

		if (polyL.markers.getAt(mid-1).bdata.curve != '') {
			var Lt0 = MapToolbar.features['curveTab'][polyL.markers.getAt(mid-1).bdata.curve].Lt;
			if (Lt0 + TL > Lb0) {
				msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong> Warning!: </strong>  curve overlapped with previous curve.<br />';
			}
		}

		if (polyL.markers.getAt(mid+1).bdata.curve != '') {
			var Lt1 = MapToolbar.features['curveTab'][polyL.markers.getAt(mid+1).bdata.curve].Lt;
			if (Lt1 + TL > Lb1) {
				msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong> Warning!: </strong> curve overlapped with next curve.<br />';
			}					
		}
					
		if ((TL > Lb0) || (TL > Lb1)) {
			msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong> Warning!: </strong> Unable to fit transition curve at the intersection.<br />Transition curve is too big, please reduce curve radius or the design speed.<br />';				
		}		
			
			
		} else {
		//halfsine tangent
			if (gauge == 1067) {
				kc = 1;
			} else if (gauge == 1435) {
				kc = 0.75;
			} else if (gauge == 1372) {
				kc = 0.78;
			} else if (gauge == 762) {
				kc = 1.4;
			} else {
				kc = 1;
			}

			if (v_ds > 75) {
				Lt = 0.008 * kc * cant * v_ds ;
			} else {
				Lt = 0.007 * kc * cant * v_ds ;
			}
					
			var TotalX = Lt - 0.0226689447*(Math.pow(Lt,3)/Math.pow(Rc,2));
			var X2_2PI2 = Math.pow(TotalX,2)/(2*Math.pow(Math.PI,2));
	
			var delta_S = Math.atan(TotalX/(2*Rc)); //Δs
			var delta_C = deltaRad - 2 * delta_S; //Δc
			var Lc = delta_C * Rc; // circular arc length
			var delta_Sd = delta_S * (180/Math.PI); //Δs
			var delta_Cd = delta_C * (180/Math.PI); //Δc

			var TotalY = (0.25-(1/Math.pow(Math.PI,2)))*(Math.pow(TotalX,2)/Rc);
			var P = TotalY - Rc * (1-Math.cos(delta_S));
			var K = TotalX - Rc * Math.sin(delta_S);
			var TV = (Rc+P)*Math.tan(deltaRad/2) + K; // Total tangent length from intersection point to transition start/end point
			var TotalL = Lc + 2 * Lt;
			var TL = TV;
			if (delta_C < 0) {
				msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong>Warning:</strong> the deflection angle is too small to introduce transition curve. <br />Current deflection angle is ' + (Math.round(delta*100)/100) + '°.';
			}

			$('#sBtnTCShift').val(P);			
			$('#tc_cp_minR').val('');
			$('#tc_Tt').val(TV);
			$('#tc_TL').val(TotalL);
			$('#tc_Lt').val(Lt);
			$('#tc_Lc').val(Lc);
			$('#tc_deltaS').val(delta_Sd);
			$('#tc_deltaC').val(delta_Cd);
			
		if (polyL.markers.getAt(mid-1).bdata.tcurve != '') {
			var TL0 = MapToolbar.features['tcurveTab'][polyL.markers.getAt(mid-1).bdata.tcurve].TL;
			if (TL0 + TL > Lb0) {
				msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong> Warning!: </strong> overlapped with previous transition curve.<br />';
			}
		}

		if (polyL.markers.getAt(mid+1).bdata.tcurve != '') {
			var TL1 = MapToolbar.features['tcurveTab'][polyL.markers.getAt(mid+1).bdata.tcurve].TL;
			if (TL1 + TL > Lb1) {
				msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong> Warning!: </strong> curve overlapped with next transition curve.<br />';
			}					
		}

		if (polyL.markers.getAt(mid-1).bdata.curve != '') {
			var Lt0 = MapToolbar.features['curveTab'][polyL.markers.getAt(mid-1).bdata.curve].Lt;
			if (Lt0 + TL > Lb0) {
				msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong> Warning!: </strong>  curve overlapped with previous curve.<br />';
			}
		}

		if (polyL.markers.getAt(mid+1).bdata.curve != '') {
			var Lt1 = MapToolbar.features['curveTab'][polyL.markers.getAt(mid+1).bdata.curve].Lt;
			if (Lt1 + TL > Lb1) {
				msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong> Warning!: </strong> curve overlapped with next curve.<br />';
			}					
		}
					
		if ((TL > Lb0) || (TL > Lb1)) {
			msgTxt += '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong> Warning!: </strong> Unable to fit transition curve at the intersection.<br />Transition curve is too big, please reduce curve radius or the design speed.<br />';						
		}				
			
		}
				
		$('#tdata').html(msgTxt);
	}
}


function getTrackDistanceFromStart(pid,index) {
	if (pid.split('_')[0] != 'line') { alert('warning! not a line type polyline.'); return false; }
	var pLM = MapToolbar.features['lineTab'][pid].markers;
	var allPoints = MapToolbar.features['lineTab'][pid].getPath().getArray();	    		
	var arrD = [];
	var Lpoly = 0;
	var LwCurve = 0;
	var LwPitch = 0;
	var pitchProp = { prevX : 0, currX : 0, pitch : 0}
	
	if (typeof pLM == 'undefined') { alert('polyline not exist.'); return false; }
	if (index > allPoints.length) { alert('getTrackDistanceFromStart - index over flow.'); return false; }
	
	for (var i = 1; i <= index; i++) {  	
		if (i == 1) { arrD.push(allPoints[0]); } // add first point i = 0
		arrD.push(allPoints[i]); // collect distance up to point i on polyline	
		var lenDiff = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i-1], allPoints[i]);
		/*
		if (typeof pLM.getAt(i-2) != 'undefined') {
			if (pLM.getAt(i-2).bdata.tcurve != '') {
				var TL = MapToolbar.features['tcurveTab'][pLM.getAt(i-2).bdata.tcurve].TL;
				lenDiff -= TL;
			} else if (pLM.getAt(i-2).bdata.curve != '') {
				var tL = MapToolbar.features['curveTab'][pLM.getAt(i-2).bdata.curve].Lt;
				lenDiff -= tL;
			}
		} */
		LwCurve += lenDiff; 	
	
		if ((pLM.getAt(i-1).bdata.curve == '') && (pLM.getAt(i-1).bdata.tcurve == '')) {
			if (pLM.getAt(i-1).bdata.pitch != '') {
				if (pitchProp.pitch != parseFloat(pLM.getAt(i-1).bdata.pitch)) {
					var pitch = parseFloat(pLM.getAt(i-1).bdata.pitch)/1000;
					pitchProp.prevX = pitchProp.currX;
					pitchProp.currX = LwCurve;
					var theta = Math.atan(pitch);
					var x = pitchProp.currX - pitchProp.prevX;
					var y = x / Math.cos(theta);
					LwPitch += y;
					pitchProp.pitch = parseFloat(pLM.getAt(i-1).bdata.pitch);
				} else {
					pitchProp.prevX = pitchProp.currX;
					pitchProp.currX = LwCurve;
					pitchProp.pitch = 0;
					var x = pitchProp.currX - pitchProp.prevX;
					LwPitch += x;
				}		
			} else {
				pitchProp.prevX = pitchProp.currX;
				pitchProp.currX = LwCurve;
				pitchProp.pitch = 0;
				var x = pitchProp.currX - pitchProp.prevX;
				LwPitch += x;
			}
		} else {
  		//1st priority, transition curve
		
		if ((pLM.getAt(i-1).bdata.curve == '') && (pLM.getAt(i-1).bdata.tcurve != '')) {
			var tPoly = MapToolbar.features['tcurveTab'][pLM.getAt(i-1).bdata.tcurve];	
			var TL = tPoly.TL;
			var Ls = tPoly.Ls;
			var Lc = tPoly.Lc;
			// LwCurve += (-2 * TL) + ((2*Ls)+ Lc); 
			LwCurve -= TL; 
			
			if (tPoly.markers.getAt(0).bdata.pitch != '') {
				if (pitchProp.pitch != parseFloat(tPoly.markers.getAt(0).bdata.pitch)) {
					var pitch = parseFloat(tPoly.markers.getAt(0).bdata.pitch)/1000;
					pitchProp.prevX = pitchProp.currX;
					pitchProp.currX = LwCurve;
					var theta = Math.atan(pitch);
					var x = pitchProp.currX - pitchProp.prevX;
					var y = x / Math.cos(theta);
					LwPitch += y;
					pitchProp.pitch = parseFloat(tPoly.markers.getAt(0).bdata.pitch);
				} else {
					pitchProp.prevX = pitchProp.currX;
					pitchProp.currX = LwCurve;
					pitchProp.pitch = 0;
					var x = pitchProp.currX - pitchProp.prevX;
					LwPitch += x;
				}		
			} else {
				pitchProp.prevX = pitchProp.currX;
				pitchProp.currX = LwCurve;
				pitchProp.pitch = 0;
				var x = pitchProp.currX - pitchProp.prevX;
				LwPitch += x;
			}
			
			for (var ci=3; ci < tPoly.markers.getLength(); ci++) {
				if (ci == 3) {
					LwCurve += tPoly.markers.getAt(ci).ld ;
				} else {
					LwCurve += tPoly.markers.getAt(ci).ld - tPoly.markers.getAt(ci-1).ld;
				}
					
				if (tPoly.markers.getAt(ci).bdata.pitch != '') {
					if (pitchProp.pitch != parseFloat(tPoly.markers.getAt(ci).bdata.pitch)) {
						var pitch = parseFloat(tPoly.markers.getAt(ci).bdata.pitch)/1000;
						pitchProp.prevX = pitchProp.currX;
						pitchProp.currX = LwCurve;
						var theta = Math.atan(pitch);
						var x = pitchProp.currX - pitchProp.prevX;
						var y = x / Math.cos(theta);
						LwPitch += y;
						pitchProp.pitch = parseFloat(tPoly.markers.getAt(ci).bdata.pitch);
					} else {
						pitchProp.prevX = pitchProp.currX;
						pitchProp.currX = LwCurve;
						pitchProp.pitch = 0;
						var x = pitchProp.currX - pitchProp.prevX;
						LwPitch += x;
					}		
				} else {
					pitchProp.prevX = pitchProp.currX;
					pitchProp.currX = LwCurve;
					pitchProp.pitch = 0;
					var x = pitchProp.currX - pitchProp.prevX;
					LwPitch += x;
				}
			}

			
			if (tPoly.markers.getLength() > 5) {
				LwCurve += tPoly.markers.getAt(1).ld - tPoly.markers.getAt(tPoly.markers.getLength()-1).ld - TL;
			} else {
				LwCurve += tPoly.markers.getAt(1).ld - tPoly.markers.getAt(4).ld - TL;
			}

			if (tPoly.markers.getAt(1).bdata.pitch != '') {
				if (pitchProp.pitch != parseFloat(tPoly.markers.getAt(1).bdata.pitch)) {
					var pitch = parseFloat(tPoly.markers.getAt(1).bdata.pitch)/1000;
					pitchProp.prevX = pitchProp.currX;
					pitchProp.currX = LwCurve;
					var theta = Math.atan(pitch);
					var x = pitchProp.currX - pitchProp.prevX;
					var y = x / Math.cos(theta);
					LwPitch += y;
					pitchProp.pitch = parseFloat(tPoly.markers.getAt(1).bdata.pitch);
				} else {
					pitchProp.prevX = pitchProp.currX;
					pitchProp.currX = LwCurve;
					pitchProp.pitch = 0;
					var x = pitchProp.currX - pitchProp.prevX;
					LwPitch += x;
				}		
			} else {
				pitchProp.prevX = pitchProp.currX;
				pitchProp.currX = LwCurve;
				pitchProp.pitch = 0;
				var x = pitchProp.currX - pitchProp.prevX;
				LwPitch += x;
			}			

		} else if ((pLM.getAt(i-1).bdata.curve != '') && (pLM.getAt(i-1).bdata.tcurve == '')) {
			var cPoly = MapToolbar.features['curveTab'][pLM.getAt(i-1).bdata.curve];			
			var tL = cPoly.Lt;
			var cL = cPoly.Lc;
			LwCurve -= tL; 
			
			if (cPoly.markers.getAt(0).bdata.pitch != '') {
				if (pitchProp.pitch != parseFloat(cPoly.markers.getAt(0).bdata.pitch)) {
					var pitch = parseFloat(cPoly.markers.getAt(0).bdata.pitch)/1000;
					pitchProp.prevX = pitchProp.currX;
					pitchProp.currX = LwCurve;
					var theta = Math.atan(pitch);
					var x = pitchProp.currX - pitchProp.prevX;
					var y = x / Math.cos(theta);
					LwPitch += y;
					pitchProp.pitch = parseFloat(cPoly.markers.getAt(0).bdata.pitch);
				} else {
					pitchProp.prevX = pitchProp.currX;
					pitchProp.currX = LwCurve;
					pitchProp.pitch = 0;
					var x = pitchProp.currX - pitchProp.prevX;
					LwPitch += x;
				}		
			} else {
				pitchProp.prevX = pitchProp.currX;
				pitchProp.currX = LwCurve;
				pitchProp.pitch = 0;
				var x = pitchProp.currX - pitchProp.prevX;
				LwPitch += x;
			}
			
			if (cPoly.markers.getLength() > 3) {
				for (var ci=3; ci < cPoly.markers.getLength(); ci++) {
					if (ci == 3) {
						LwCurve += cPoly.markers.getAt(ci).ld ;
					} else {
						LwCurve += cPoly.markers.getAt(ci).ld - cPoly.markers.getAt(ci-1).ld;
					}
					
					if (cPoly.markers.getAt(ci).bdata.pitch != '') {
						if (pitchProp.pitch != parseFloat(cPoly.markers.getAt(ci).bdata.pitch)) {
							var pitch = parseFloat(cPoly.markers.getAt(ci).bdata.pitch)/1000;
							pitchProp.prevX = pitchProp.currX;
							pitchProp.currX = LwCurve;
							var theta = Math.atan(pitch);
							var x = pitchProp.currX - pitchProp.prevX;
							var y = x / Math.cos(theta);
							LwPitch += y;
							pitchProp.pitch = parseFloat(cPoly.markers.getAt(ci).bdata.pitch);
						} else {
							pitchProp.prevX = pitchProp.currX;
							pitchProp.currX = LwCurve;
							pitchProp.pitch = 0;
							var x = pitchProp.currX - pitchProp.prevX;
							LwPitch += x;
						}		
					} else {
						pitchProp.prevX = pitchProp.currX;
						pitchProp.currX = LwCurve;
						pitchProp.pitch = 0;
						var x = pitchProp.currX - pitchProp.prevX;
						LwPitch += x;
					}
				
				}
			}
			
			if (cPoly.markers.getLength() > 3) {
				LwCurve += cPoly.markers.getAt(1).ld - cPoly.markers.getAt(cPoly.markers.getLength()-1).ld - tL;
			} else {
				LwCurve += cPoly.markers.getAt(1).ld - tL;
			}

			if (cPoly.markers.getAt(1).bdata.pitch != '') {
				if (pitchProp.pitch != parseFloat(cPoly.markers.getAt(1).bdata.pitch)) {
					var pitch = parseFloat(cPoly.markers.getAt(1).bdata.pitch)/1000;
					pitchProp.prevX = pitchProp.currX;
					pitchProp.currX = LwCurve;
					var theta = Math.atan(pitch);
					var x = pitchProp.currX - pitchProp.prevX;
					var y = x / Math.cos(theta);
					LwPitch += y;
					pitchProp.pitch = parseFloat(cPoly.markers.getAt(1).bdata.pitch);
				} else {
					pitchProp.prevX = pitchProp.currX;
					pitchProp.currX = LwCurve;
					pitchProp.pitch = 0;
					var x = pitchProp.currX - pitchProp.prevX;
					LwPitch += x;
				}		
			} else {
				pitchProp.prevX = pitchProp.currX;
				pitchProp.currX = LwCurve;
				pitchProp.pitch = 0;
				var x = pitchProp.currX - pitchProp.prevX;
				LwPitch += x;
			}
			
			//LwCurve += (-2 * tL) + cL;
		}
	}
	
  }
  Lpoly = google.maps.geometry.spherical.computeLength(arrD);
  return { 'Lpoly' : Lpoly, 'LwCurve' : LwCurve, 'LwPitch' : LwPitch};
}

function getElevation(event) {
	var locations = [];
	var ELinfowindow = new google.maps.InfoWindow();
	// Retrieve the clicked location and push it on the array
	var clickedLocation = event.latLng;
	locations.push(clickedLocation);

	// Create a LocationElevationRequest object using the array's one value
	var positionalRequest = {'locations': locations}

	// Initiate the location request
	elevator.getElevationForLocations(positionalRequest, function(results, status) {
	if (status == google.maps.ElevationStatus.OK) {
  	// Retrieve the first result
  	if (results[0]) {
    	// Open an info window indicating the elevation at the clicked position
    	ELinfowindow.setContent('The elevation at this point <br>is ' + results[0].elevation + ' meters.');
    	ELinfowindow.setPosition(clickedLocation);
    	ELinfowindow.open(map);
    } else {
      alert('No results found');
    }
   } else {
     alert('Elevation service failed due to: ' + status);
   }
  });
}

// Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a Visualization API ColumnChart.
function plotElevation(results, status) {
	if (status == google.maps.ElevationStatus.OK) {
  	elevations = results;

    // Extract the elevation samples from the returned results
    // and store them in an array of LatLngs.
    var elevationPath = [];
    for (var i = 0; i < results.length; i++) {
    	elevationPath.push(elevations[i].location);
    }

    // Extract the data from which to populate the chart.
    // Because the samples are equidistant, the 'Sample'
    // column here does double duty as distance along the
    // X axis.
    data = new google.visualization.DataTable();
    data.addColumn('string', 'Distance');
    data.addColumn('number', 'Elevation');
    data.addColumn('number', 'Track');
        
    for (var i = 0; i < results.length; i++) {
    	data.addRow([(i*25).toString(), elevations[i].elevation, elevations[i].elevation]); 
    }

    //2do 29-1-2013
    //redraw elevation if exist 
    //[X, note, pitch, bdata, kit]
    var arrElv0 =  $('#txtPitchDetails').val().split('\n');
    var arrElv = [];
    for (var ei=0; ei < arrElv0.length; ei++) {
    	arrElv.push(arrElv0[ei].split(','));
    }
    
		//reload last point
		var pitch0 = null; var Xd0 = 0;
		
		var arrlast = arrElv[0][4].split('§');
		//console.log(arrlast);
		for (iv = 0; iv < arrlast.length; iv++) {
			if (arrlast[iv].indexOf('lastheight:') == 0) {
				var lastH = parseFloat(arrlast[iv].split(':')[1]);
				data.setValue(0, 2, lastH);			
			}
			if (arrlast[iv].indexOf('§lastpitch:') == 0) {
				pitch0 = parseFloat(arrlast[iv].split(':')[1]);
			}			
		}
		
		// test dan cek balik bhg ini 30/1/2013 - start
		for (var ev=0; ev < arrElv.length; ev++) {
    	if (arrElv[ev][2] != '') {
				if (pitch0 == null) {
					pitch0 = parseFloat(arrElv[ev][2]);
					Xd0 = parseInt(arrElv[ev][0]);
				} else {
					if (parseFloat(arrElv[ev][2]) != pitch0 ) {
		  			var pitchA = pitch0/1000;
				    var y1; var y2;
		    		var cgsp = Xd0;
		    		var cgep = parseInt(arrElv[ev][0]);
		    			
		    		for (i = 0; i < data.getNumberOfRows(); i++) {
		    			if (cgsp == parseInt(data.getValue(i, 0))) { 
		    				y1 = parseFloat(data.getValue(i, 2)); 						
		    			}
		    	    
  	  				if ((parseInt(data.getValue(i, 0)) >= cgsp) && (parseInt(data.getValue(i, 0)) <= cgep)) { 
  	  					var y2 = pitchA*(parseInt(data.getValue(i, 0)) - cgsp) + y1; 
	  	  				data.setValue(i, 2, y2);
	  	  				if (i == data.getNumberOfRows() -1) {
	  	  					$('#LLlastheight').val(y2);
	  	  					$('#LLlastpitch').val(pitchA*1000);
	  						}
	  	  			} 
	    			}
	  				pitch0 = parseFloat(arrElv[ev][2]);
						Xd0 = parseInt(arrElv[ev][0]);
					}
				}
			}
		}
		// test dan cek balik bhg ini 30/1/2013 - end
		
		wd = (results.length * 10) + 80; // target +/- 6px per bar
					
		if (wd < 770) { wd = 770; }
					
    // Draw the chart using the data within its DIV.
    document.getElementById('elevation_chart').style.display = 'block';
    document.getElementById('elevation_chart').style.overflow = 'auto';
    chart.draw(data, {
    	width: wd,
      height: 210,
      legend: 'none',
      titleY: 'Elevation (m)',
      titleX: 'Distance (m) + ' + $('#txtPitchStartPointAtM').val() + ' m'
   	});


   }
}

function presetMarkerNote(pid, mid) {
	var poli;

	switch (pid.split('_')[0]) {
		case 'line':
			poli = MapToolbar.features["lineTab"][pid];
			break;
		case 'curve':
			poli = MapToolbar.features["curveTab"][pid];
			break;
		case 'tcurve':
			poli = MapToolbar.features["tcurveTab"][pid];
			break;	
		default:
			// default statements
	}
	
	if (typeof poli != 'undefined') {
		
		if (poli.markers.getAt(mid).note != '') {
			$('#mnote').val(poli.markers.getAt(mid).note);
		} else {
			$('#mnote').val(''); 
		}
		$('#mnotePID').val(pid);
		$('#mnoteMID').val(mid);
		$('#dialogInsertNoteAtMarker').dialog('open');				
	}
}  

function setMarkerNote() {
	var pid = $('#mnotePID').val();
	var midx  = parseInt($('#mnoteMID').val());

	if ($('#mnote').val() != '') {
		switch (pid.split('_')[0]) {
			case 'line':
				MapToolbar.features["lineTab"][pid].markers.getAt(midx).note = $('#mnote').val();
				break;
			case 'curve':
				MapToolbar.features["curveTab"][pid].markers.getAt(midx).note = $('#mnote').val();
				break;
			case 'tcurve':
				MapToolbar.features["tcurveTab"][pid].markers.getAt(midx).note = $('#mnote').val();
				break;	
			default:
				// default statements
		}	
		alert('the note has succesfully insert at ' + $('#mnotePID').val() + ' (' + $('#mnoteMID').val() + ').\n\n\"' + $('#mnote').val() + '\"');
		$('#dialogInsertNoteAtMarker').dialog('close');
	} else {
		switch (pid.split('_')[0]) {
			case 'line':
				if (confirm('remove note from this point?')) { MapToolbar.features["lineTab"][pid].markers.getAt(midx).note = ''; alert('done');}
				break;
			case 'curve':
				if (confirm('remove note from this point?')) { MapToolbar.features["curveTab"][pid].markers.getAt(midx).note = ''; alert('done');}
				break;
			case 'tcurve':
				if (confirm('remove note from this point?')) { MapToolbar.features["tcurveTab"][pid].markers.getAt(midx).note = ''; alert('done');}
				break;	
			default:
				// default statements
		}	
	}	
}

function resetMarkerNote() {    
	var pid = $('#mnotePID').val();
	var midx  = parseInt($('#mnoteMID').val());
	$('#mnote').val('');
	
	switch (pid.split('_')[0]) {
			case 'line':
				if (confirm('remove note from this point?')) { MapToolbar.features["lineTab"][pid].markers.getAt(midx).note = ''; alert('note has be remove from point ' + midx + ' on line ' + pid + '.');}
				break;
			case 'curve':
				if (confirm('remove note from this point?')) { MapToolbar.features["curveTab"][pid].markers.getAt(midx).note = ''; alert('note has be remove from point ' + midx + ' on line ' + pid + '.');}
				break;
			case 'tcurve':
				if (confirm('remove note from this point?')) { MapToolbar.features["tcurveTab"][pid].markers.getAt(midx).note = ''; alert('note has be remove from point ' + midx + ' on line ' + pid + '.');}
				break;	
			default:
				// default statements
	}
	$('#dialogInsertNoteAtMarker').dialog('close');
}

function playSound() {
	var soundfile = $('#melodyindex').val();
	if (soundfile != 'none') {
		var basedir = '../../OpenBVE/UserData/LegacyContent/Railway/Sound/';
		play_sound(basedir + soundfile);
	}	
}

function html5_audio(){
	var a = document.createElement('audio');
	return !!(a.canPlayType && a.canPlayType('audio/wav;').replace(/no/, ''));
}
 
var play_html5_audio = false;
if(html5_audio()) play_html5_audio = true;
 
function play_sound(url){
	if(play_html5_audio){
		var snd = new Audio(url);
		snd.load();
		snd.play();
	}else{
		alert('html 5 audio is not supported by this browser');
	}
}

function changeImgSrc(otype,src) {
	var iid = 'strpx';
	document.getElementById(iid).src='images/' + src;
}

function markerSetting(pid,midx) {
	var type;
	switch (pid.split("_")[0]) {
		case "curve" :
			type = "curveTab";		
			break;
		case "tcurve" :
			type = "tcurveTab";	
			break;
		default:
			type = "lineTab";
			break;
	}
	$('#dms_lineid').val(pid);
	$('#dms_markerindex').val(midx);
	if (!MapToolbar.features[type][pid].markers.getAt(midx).getDraggable()) {
		document.getElementById('lockedmarker').checked = true;
	} else {
		document.getElementById('lockedmarker').checked = false;
	}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.pole != '') {
		document.getElementById('poleOn').checked = true;
		$('#dms_poleindex').prop('disabled', false);
		var x = document.getElementById("dms_poleindex");
		for (var i = 0; i < x.length; i++) {
			if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.pole == x.options[i].value) {
				$("#dms_poleindex option[value=\'" + x.options[i].value + "\']").attr("selected", "selected");
				break;
			}
		}
		
	} else {
		document.getElementById('poleOn').checked = false;
		$('#dms_poleindex').prop('disabled', true);
	}
	if (MapToolbar.features[type][pid].markers.getAt(midx).bdata.railindex != '') {
		$('#dms_railindex').val(MapToolbar.features[type][pid].markers.getAt(midx).bdata.railindex);
	} else {
		$('#dms_railindex').val(MapToolbar.features[type][pid].bdata.railindex);
	}

	$('#dms_position').val(MapToolbar.features[type][pid].markers.getAt(midx).position.toString());
	if (MapToolbar.features[type][pid].route != '') { $('#dms_route').val(MapToolbar.features[type][pid].route); } else { $('#dms_route').val('');}
	if (MapToolbar.features[type][pid].name != '') { $('#dms_linename').val(MapToolbar.features[type][pid].name); } else { $('#dms_linename').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).bdata.height != '') { $('#dms_height').val(MapToolbar.features[type][pid].markers.getAt(midx).bdata.height); } else { $('#dms_height').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).bdata.pitch != '') { $('#dms_pitch').val(MapToolbar.features[type][pid].markers.getAt(midx).bdata.pitch); } else { $('#dms_pitch').val('');}
	

	if (MapToolbar.features[type][pid].markers.getAt(midx).lineX != '') { $('#dms_lineX').val(MapToolbar.features[type][pid].markers.getAt(midx).lineX); } else { $('#dms_lineX').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).sline != '') { $('#dms_sline').val(MapToolbar.features[type][pid].markers.getAt(midx).sline); } else { $('#dms_sline').val('');}

	if (MapToolbar.features[type][pid].markers.getAt(midx).bdata.curve != '') { $('#dms_curve').val(MapToolbar.features[type][pid].markers.getAt(midx).bdata.curve); } else { $('#dms_curve').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).bdata.tcurve != '') { $('#dms_tcurve').val(MapToolbar.features[type][pid].markers.getAt(midx).bdata.tcurve); } else { $('#dms_tcurve').val('');}
	
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.bridge != '') { $('#dms_bridge').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.bridge); } else { $('#dms_bridge').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.overbridge != '') { $('#dms_overbridge').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.overbridge); } else { $('#dms_overbridge').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.river != '') { $('#dms_river').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.river); } else { $('#dms_river').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.ground != '') { $('#dms_ground').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.ground); } else { $('#dms_ground').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.flyover != '') { $('#dms_flyover').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.flyover); } else { $('#dms_flyover').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.tunnel != '') { $('#dms_tunnel').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.tunnel); } else { $('#dms_tunnel').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.pole != '') { $('#dms_pole').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.pole); } else { $('#dms_pole').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.dike != '') { $('#dms_dike').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.dike); } else { $('#dms_dike').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.cut != '') { $('#dms_cut').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.cut); } else { $('#dms_cut').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.underground != '') { $('#dms_underground').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.underground); } else { $('#dms_underground').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.form != '') { $('#dms_form').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.form); } else { $('#dms_form').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.roadcross != '') { $('#dms_roadcross').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.roadcross); } else { $('#dms_roadcross').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.crack != '') { $('#dms_crack').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.crack); } else { $('#dms_crack').val('');}
	if (MapToolbar.features[type][pid].markers.getAt(midx).kdata.beacon != '') { $('#dms_beacon').val(MapToolbar.features[type][pid].markers.getAt(midx).kdata.beacon); } else { $('#dms_beacon').val('');}

	$('#dialogMarkerSetting').dialog('open');
} 

function polylineSetting(pid) {
	$('#dtsv_lineid').val(pid);
	var poly = MapToolbar.features["lineTab"][pid];
	if (poly.name != '') { $('#dtsv_trackname').val(poly.name); } else { $('#dtsv_trackname').val('');}
	if (poly.route != '') { $('#dtsv_route').val(poly.route); } else { $('#dtsv_route').val('');}
	
	if (poly.bdata.devID != '') { $('#dtsv_devID').val(poly.bdata.devID); } else { $('#dtsv_devID').val('');}
	if (poly.bdata.maxSpeed != '') { $('#dtsv_maxSpeed').val(poly.bdata.maxSpeed); } else { $('#dtsv_maxSpeed').val('');}
	if (poly.bdata.simBVE != '') { $('#dtsv_simBVE').val(poly.bdata.simBVE); } else { $('#dtsv_simBVE').val('');}
	if (poly.bdata.gauge != '') { $('#dtsv_trackGauge').val(poly.bdata.gauge); } else { $('#dtsv_trackGauge').val('');}
	if (poly.bdata.desc != '') { $('#dtsv_desc').val(poly.bdata.desc); } else { $('#dtsv_desc').val('');}
	if (poly.bdata.train != '') { $('#dtsv_runningTrain').val(poly.bdata.train); } else { $('#dtsv_runningTrain').val('');}
	if (poly.bdata.railindex != '') { $('#dtsv_railtypedefault').val(poly.bdata.railindex); } else { $('#dtsv_railtypedefault').val('');}
	
	
	if ((poly.note != '') && (poly.note != '')) { $('#dtsv_note').val(poly.note); }
	
	$('#dialogTrackSetting').dialog('open');
} 

function curveNote(pid) {
	alert('Sorry! This feature has not been coded yet.')
	//$('#dialogParalelLine').dialog('open');
} 

function curveSetting(pid) {
	alert('Sorry! This feature has not been coded yet.')
	//$('#dialogParalelLine').dialog('open');
} 

function curveRailRefresh() {
	var dir = 0;

	if ($('#DCbasePolyID').val() != '') {
		if (typeof MapToolbar.features["lineTab"][$('#DCbasePolyID').val()] != 'undefined') {
			var polyL = MapToolbar.features["lineTab"][$('#DCbasePolyID').val()];
			var currIdx = parseInt($('#DCmarkerIndex').val());
			var m0 = polyL.markers.getAt(currIdx-1).getPosition();
			var m1 = polyL.markers.getAt(currIdx).getPosition();
			var m2 = polyL.markers.getAt(currIdx+1).getPosition();
			var h1 = google.maps.geometry.spherical.computeHeading(m0,m1);
			var h2 = google.maps.geometry.spherical.computeHeading(m1,m2);
			var fic = intersection_angle(h1,h2);
			var intAngleDeg = fic.angle;
			dir = fic.direction;					
		}
	}
	if (dir == 0) {
		alert('sorry, unable to draw curve on stright line');
		return false;
	}
 	var $strLIndex = $('#ddc_railindex');
 	var radius = dir * parseInt($('#sBtnCurveRadius').val());
 				
	$strLIndex.empty().append('<option selected>- select -</option>');
    	
	for (var i=0; i < bverailobjArr.length; i++) {
  	if (bverailobjArr[i][3] == 'cv') {
    	if (parseInt(bverailobjArr[i][7]) == radius) {
      	$('#ddc_railindex').append($("<option></option>").attr("value", bverailobjArr[i][1]).text(bverailobjArr[i][2]));
      }     			
    }
  }
}

function tcurveRailRefresh() {
	var dir = 0;
	if ($('#DtCbasePolyID').val() != '') {
		if (typeof MapToolbar.features["lineTab"][$('#DtCbasePolyID').val()] != 'undefined') {
			var polyL = MapToolbar.features["lineTab"][$('#DtCbasePolyID').val()];
			var currIdx = parseInt($('#DtCmarkerIndex').val());
			var m0 = polyL.markers.getAt(currIdx-1).getPosition();
			var m1 = polyL.markers.getAt(currIdx).getPosition();
			var m2 = polyL.markers.getAt(currIdx+1).getPosition();
			var h1 = google.maps.geometry.spherical.computeHeading(m0,m1);
			var h2 = google.maps.geometry.spherical.computeHeading(m1,m2);
			var fic = intersection_angle(h1,h2);
			var intAngleDeg = fic.angle;
			dir = fic.direction;					
		}
	}
	if (dir == 0) {
		alert('sorry, unable to draw curve on stright line');
		return false;
	}
 	var $strLIndex = $('#ddtc_railindex');
 	var radius = dir * parseInt($('#sBtnRTCCircularRadius').val());
 				
	$strLIndex.empty().append('<option selected>- select -</option>');
    	
	for (var i=0; i < bverailobjArr.length; i++) {
		if (bverailobjArr[i][3] == 'cv') {
			if (parseInt(bverailobjArr[i][7]) == radius) {
				$('#ddtc_railindex').append($("<option></option>").attr("value", bverailobjArr[i][1]).text(bverailobjArr[i][2]));
			}     			
		}
	}
}

function fI_RC(pid,idx) {
	$('#dInsC_PID').val(pid);
	$('#dInsC_MID').val(idx);
	$('#dialogInsertCrossing').dialog('open');
}

function fI_Ov(pid,idx) {
	$('#dInsOb_PID').val(pid);
	$('#dInsOb_MID').val(idx);
	$('#dialogInsertOverbridge').dialog('open');
}

function fI_ToC(pid,idx) {
	$('#dInsSTC_T1').val(pid);
	$('#dInsSTC_t1mi').val(idx);
	$('#dialogSwitchTrack').dialog('open');
}

function fI_Br(pid,idx) {
	$('#dInsB_PID').val(pid);
	$('#dInsB_MID').val(idx);
	$('#dialogInsertBridge').dialog('open');
}

function fI_MakePL(pid,idx) {
	$('#dMkPl2p_L2').val(pid);
	$('#dMkPl2p_M20').val(idx);
	$('#dialogMakeItParallelBetween2Point').dialog('open');
}

function fu_Gd(pid,idx) {
	$('#dUpdG_PID').val(pid);
	$('#dUpdG_MID').val(idx);
	$('#dialogUpdateGround').dialog('open');
}

function fI_Rv(pid,idx) {
	$('#dInsR_PID').val(pid);
	$('#dInsR_MID').val(idx);
	$('#dialogInsertRiver').dialog('open');
}

function fI_Tu(pid,idx) {
	$('#dInsTun_PID').val(pid);
	$('#dInsTun_MID').val(idx);
	$('#dialogInsertTunnel').dialog('open');
}

function fI_Link(pid,idx) {
	$('#dLL_Pid1').val(pid);
	$('#dLL_Pid1m1').val(idx);
	$('#dialogLinkLines').dialog('open');
}

function fI_Pform(pid,idx) {
	$('#dInsForm_pid').val(pid);
	$('#dInsForm_idx').val(idx);
	$('#dialogInsertPlatform').dialog('open');
}

function fI_DTCWd(pid,idx) {
	$('#dpLTs_Line1').val(pid);
	$('#dpLTs_stIdx').val(idx);	
	$('#dialogWidenParallelGap').dialog('open');
}

function fI_Fyo(pid,idx) {
	$('#dInsFO_PID').val(pid);
	$('#dInsFO_MID').val(idx);
	$('#dialogInsertFlyover').dialog('open');
}

function DecInDeg(latLng) {
	var latD = latLng.lat();
	var lngD = latLng.lng();
	var DegTxt = "";
	
	if (latD >= 0) {
		var gpsdeg = parseInt(latD);
		var remainder = latD - (gpsdeg * 1.0);
		var gpsmin = remainder * 60.0;
		var D = gpsdeg;
		var M = parseInt(gpsmin);
		var remainder2 = gpsmin - (parseInt(gpsmin)*1.0);
		var S = Math.round((remainder2*60.0)*1000)/1000;
		DegTxt = D + "&deg; "+M+"' "+S+"'' N";		
	} else {
		var gpsdeg = parseInt(Math.abs(latD));
		var remainder = Math.abs(latD) - (gpsdeg * 1.0);
		var gpsmin = remainder * 60.0;
		var D = gpsdeg;
		var M = parseInt(gpsmin);
		var remainder2 = gpsmin - (parseInt(gpsmin)*1.0);
		var S = Math.round((remainder2*60.0)*1000)/1000;
		DegTxt = D + "&deg; "+M+"' "+S+"'' S";
	}

	if (lngD >= 0) {
		var gpsdeg = parseInt(lngD);
		var remainder = lngD - (gpsdeg * 1.0);
		var gpsmin = remainder * 60.0;
		var D = gpsdeg;
		var M = parseInt(gpsmin);
		var remainder2 = gpsmin - (parseInt(gpsmin)*1.0);
		var S = Math.round((remainder2*60.0)*1000)/1000;
		DegTxt += " , " + D + "&deg; "+M+"' "+S+"'' E";		
	} else {
		var gpsdeg = parseInt(Math.abs(lngD));
		var remainder = Math.abs(lngD) - (gpsdeg * 1.0);
		var gpsmin = remainder * 60.0;
		var D = gpsdeg;
		var M = parseInt(gpsmin);
		var remainder2 = gpsmin - (parseInt(gpsmin)*1.0);
		var S = Math.round((remainder2*60.0)*1000)/1000;
		DegTxt += " , " + D + "&deg; "+M+"' "+S+"'' W";
	}
	
	return DegTxt;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexFromRGB(r, g, b) {
	var hex = [r.toString( 16 ),g.toString( 16 ),b.toString( 16 )];
	$.each( hex, function( nr, val ) {
		if ( val.length === 1 ) {
			hex[ nr ] = "0" + val;
		}
	});
	return hex.join( "" ).toUpperCase();
}

function refreshSwatch() {
	var red = $( "#red" ).slider( "value" ),
		green = $( "#green" ).slider( "value" ),
		blue = $( "#blue" ).slider( "value" ),
		hex = hexFromRGB( red, green, blue );
	$( "#swatch" ).css( "background-color", "#" + hex );
	$('#colorCodeHex').val(rgbToHex(red,green,blue));
	$('#colorR').val(red);
	$('#colorG').val(green);
	$('#colorB').val(blue);
	
}

function refreshSwatch2() {
	var red = $( "#red" ).slider( "value" ),
		green = $( "#green" ).slider( "value" ),
		blue = $( "#blue" ).slider( "value" ),
		hex = hexFromRGB( red, green, blue );
	$( "#swatch" ).css( "background-color", "#" + hex );
	$('#colorCodeHex').val(rgbToHex(red,green,blue));

}

function changeFormType() {
	if (typeof document.getElementById('MMchoosePlatform').value != 'undefined') {
		$( ".formTab" ).hide();
		var noF = parseInt(document.getElementById('MMchoosePlatform').value);
		$('#platform_width').val('');
		switch(noF){
		    case 0:
			     $( "#tabs-form0" ).show();
				$('#platform_width').val('');
				$('#platform_width').prop('disabled', true);
				break;
		    case 1:
			     $( "#tabs-form1" ).show();
				$('#platform_width').val('');
				$('#platform_width').prop('disabled', true);
				break;
		    case 2:
			     $( "#tabs-form2" ).show();
				$('#platform_width').prop('disabled', false);
				break;
		    case 3:
			     $( "#tabs-form3" ).show();
				$('#platform_width').prop('disabled', false);
				break;
		    case 4:
			     $( "#tabs-form4" ).show(); 
				$('#platform_width').prop('disabled', false);
				break;
		    case 5:
			     $( "#tabs-form5" ).show();
				$('#platform_width').val('');
				$('#platform_width').prop('disabled', true);
				break;
		    case 6:
			     $( "#tabs-form6" ).show();
				$('#platform_width').val('');
				$('#platform_width').prop('disabled', true);
				break;
		    case 7:
			     $( "#tabs-form7" ).show();
				$('#platform_width').prop('disabled', false);
				break;
		    case 8:
				$( "#tabs-form8" ).show();
				$('#platform_width').prop('disabled', false);
				break;
		    case 9:
			     $( "#tabs-form9" ).show();
		    		$('#platform_width').prop('disabled', false);
				break;
		    case 10:
			     $( "#tabs-form10" ).show();
				$('#platform_width').prop('disabled', false);
				break;
		    case 11:
			     $( "#tabs-form11" ).show();
				$('#platform_width').prop('disabled', false);
				break;
		    case 12:
			     $( "#tabs-form12" ).show();
				$('#platform_width').prop('disabled', false);
				break;
		    case 13:
			     $( "#tabs-form13" ).show();
				$('#platform_width').prop('disabled', false);
				break;
		    case 14:
			     $( "#tabs-form14" ).show();
				$('#platform_width').prop('disabled', false);
				break;
		    case 15:
			     $( "#tabs-form15" ).show();
				$('#platform_width').val('');
				$('#platform_width').prop('disabled', true);
				break;
		    default:
				$( ".formTab" ).hide();
				$('#platform_width').val('');
				$('#platform_width').prop('disabled', true);
		    	break;
		}
	} else {
		$( ".formTab" ).hide();
	}
}

function curveAddAt(pid,e1) {
	// modify code from http://jsfiddle.net/kjy112/NRafz/
	var markerDist = {p1:'', p2:'', d:-1};

	var allPoints = (typeof MapToolbar.features['curveTab'][pid] != 'undefined') ? MapToolbar.features['curveTab'][pid].getPath().getArray() : MapToolbar.features['tcurveTab'][pid].getPath().getArray();
    
	for (var i = 0; i < allPoints.length - 1; i++) {
		var ab = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],e1); 
		var bc = google.maps.geometry.spherical.computeDistanceBetween(e1,allPoints[i + 1]); 
		var ac = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],allPoints[i + 1]); 
		//console.log(parseFloat(markerDist.d) + ' '+ Math.abs(ab+bc-ac));
      
		if ((parseFloat(markerDist.d) == -1) || parseFloat(markerDist.d) > parseFloat(Math.abs(ab + bc - ac))) {
			markerDist.p1 = allPoints[i];
			markerDist.p2 = allPoints[i + 1];
			markerDist.d = Math.abs(ab + bc - ac);
			addAt = i+1;
		}
	}
	return addAt;
}

function formLineWidenAddAt(pid,e1) {
	// modify code from http://jsfiddle.net/kjy112/NRafz/
	var markerDist = {p1:'', p2:'', d:-1};

	var allPoints = MapToolbar.features["lineTab"][pid].getPath().getArray();
    
	for (var i = 0; i < allPoints.length - 1; i++) {
		var ab = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],e1); 
		var bc = google.maps.geometry.spherical.computeDistanceBetween(e1,allPoints[i + 1]); 
		var ac = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],allPoints[i + 1]); 
		//console.log(parseFloat(markerDist.d) + ' '+ Math.abs(ab+bc-ac));
      
		if ((parseFloat(markerDist.d) == -1) || parseFloat(markerDist.d) > parseFloat(Math.abs(ab + bc - ac))) {
			markerDist.p1 = allPoints[i];
			markerDist.p2 = allPoints[i + 1];
			markerDist.d = Math.abs(ab + bc - ac);
			addAt = i;
		}
	}
	return addAt;
}

function toggleRoute(route) {

	for(var pid in MapToolbar.features['lineTab'] ) {
		if (typeof MapToolbar.features['lineTab'][pid].route != 'undefined') {
			if (MapToolbar.features['lineTab'][pid].route == route) {
				var feature = MapToolbar.features['lineTab'][pid];
	    
				if (feature.getVisible()) {
					feature.setVisible(false); 
					feature.markers.forEach(function(marker, index){
						marker.setVisible(false);
					});	    	
				} else {
					feature.setVisible(true);
					feature.markers.forEach(function(marker, index){
						marker.setVisible(true);
					});  	
				}
			}
		}
	}
	
	for(var pid in MapToolbar.features['tcurveTab'] ) {
		if (typeof MapToolbar.features['tcurveTab'][pid].route != 'undefined') {
			if (MapToolbar.features['tcurveTab'][pid].route == route) {
				var feature = MapToolbar.features['tcurveTab'][pid];
	    
				if (feature.getVisible()) {
					feature.setVisible(false); 
					feature.markers.forEach(function(marker, index){
						marker.setVisible(false);
					});	    	
				} else {
					feature.setVisible(true);
					feature.markers.forEach(function(marker, index){
						marker.setVisible(true);
					});  	
				}
			}
		}
	}

	for(var pid in MapToolbar.features['curveTab'] ) {
		if (typeof MapToolbar.features['curveTab'][pid].route != 'undefined') {
			if (MapToolbar.features['curveTab'][pid].route == route) {
				var feature = MapToolbar.features['curveTab'][pid];
	    
				if (feature.getVisible()) {
					feature.setVisible(false); 
					feature.markers.forEach(function(marker, index){
						marker.setVisible(false);
					});	    	
				} else {
					feature.setVisible(true);
					feature.markers.forEach(function(marker, index){
						marker.setVisible(true);
					});  	
				}
			}
		}
	}
	

	return true;
}

function removeRoute(route) {
	var count = 0;

	for(var pid in MapToolbar.features['lineTab'] ) {
		if (typeof MapToolbar.features['lineTab'][pid].route != 'undefined') {
			if (MapToolbar.features['lineTab'][pid].route == route) {
				count++;
			}
		}
	}
	
	if (count == 0) {
		var svclist = document.getElementById('route_list');
		for (var i = 0; i < svclist.childElementCount; i++) {
			if (svclist.children[i].firstElementChild.getAttribute("value") == route) {
				document.getElementById(svclist.children[i].id).remove();
				break;
			}
		}
	}
	
	return true;
}

function linesRoute(pid,route) {
// data format sline = '(side line 1):(0=start,>0 end):index:(sideline marker uid),(side line 2):(0=start,>0 end):(sideline2 marker index):(sideline2 marker uid),,,,....';
	for (var i = 0; i < MapToolbar.features["lineTab"][pid].markers.length; i++) {
		if (MapToolbar.features["lineTab"][pid].markers.getAt(i).sline !='') {
			var lines = MapToolbar.features["lineTab"][pid].markers.getAt(i).sline.split('¤');
			for (j = 0; j < lines.length; j++) {
				var line = lines[j].split(':');
				if (line[1] == '0' && line[2] == '0') {
					MapToolbar.features["lineTab"][line[0]].route = route;
				}
			}
		}
		if (MapToolbar.features["lineTab"][pid].markers.getAt(i).bdata.tcurve !='') {
			MapToolbar.features['tcurveTab'][MapToolbar.features["lineTab"][pid].markers.getAt(i).bdata.tcurve].route = route;
		}
		if (MapToolbar.features["lineTab"][pid].markers.getAt(i).bdata.curve !='') {
			MapToolbar.features['curveTab'][MapToolbar.features["lineTab"][pid].markers.getAt(i).bdata.curve].route = route;
		}
	}
	
	return true;
	
}

function formWidth() {
	var pid1 = $('#dInsForm_pid').val();
	var pid2 = $('#dInsForm_pid2').val();
	var idx = parseInt($('#dInsForm_idx').val());
	var offset = getOffset(pid1,pid2,idx);
				
	if (typeof document.getElementById('MMchoosePlatform').value != 'undefined') {
		var noF = parseInt(document.getElementById('MMchoosePlatform').value);

		switch(noF){
		    case 0:
				$('#platform_width').val('N/A');
				break;
		    case 1:
				$('#platform_width').val('N/A');
				break;
		    case 2:			
				var wi1 = parseFloat($('#form2_wi1').val());
				var wi2 = parseFloat($('#form2_wi2').val());
				var sW = wi1 + wi2 + offset - 3 ; //3 = 2 (both side) * 1.5 (form offset);
				var platform_width = Math.round(sW * 1000)/1000;
				$('#platform_width').val(platform_width);
				
				break;
		    case 3:
				var wi1 = parseFloat($('#form3_wi1').val());
				var wi2 = parseFloat($('#form3_wi2').val());
				var sW = wi1 + wi2 + offset - 3 ; //3 = 2 (both side) * 1.5 (form offset);
				var platform_width = Math.round(sW * 1000)/1000;
				$('#platform_width').val(platform_width);

				break;
		    case 4:
				var wi1 = parseFloat($('#form4_wi3').val());
				var wi2 = parseFloat($('#form4_wi4').val());
				var sW = wi1 + wi2 + offset - 3 ; //3 = 2 (both side) * 1.5 (form offset);
				var platform_width = Math.round(sW * 1000)/1000;
				$('#platform_width').val(platform_width);

				break;
		    case 5:
				$('#platform_width').val('N/A');
				break;
		    case 6:
				$('#platform_width').val('N/A');
				break;
		    case 7:
				var wi1 = parseFloat($('#form7_wi1').val());
				var wi2 = parseFloat($('#form7_wi2').val());
				var sW = wi1 - 3 ; //3 = 2 (both side) * 1.5 (form offset);
				var platform_width = Math.round(sW * 1000)/1000;
				$('#platform_width').val(platform_width);

				break;
		    case 8:
				var wi1 = parseFloat($('#form8_wi3').val());
				var wi2 = parseFloat($('#form8_wi4').val());
				var sW = wi1 - 3 ; //3 = 2 (both side) * 1.5 (form offset);
				var platform_width = Math.round(sW * 1000)/1000;
				$('#platform_width').val(platform_width);
				
				break;
		    case 9:
				var wi1 = parseFloat($('#form9_wi1').val());
				var wi3 = parseFloat($('#form9_wi3').val());
				var sW = wi1 - wi3 - 3 ; //3 = 2 (both side) * 1.5 (form offset);
				var platform_width = Math.round(sW * 1000)/1000;
				$('#platform_width').val(platform_width);
			     
				break;
		    case 10:
				var wi1 = parseFloat($('#form10_wi1').val());
				var wi3 = parseFloat($('#form10_wi3').val());
				var sW = wi3 - wi1 - 3 ; //3 = 2 (both side) * 1.5 (form offset);
				var platform_width = Math.round(sW * 1000)/1000;
				$('#platform_width').val(platform_width);
			     
				break;
		    case 11:
				var wi3 = parseFloat($('#form11_wi3').val());
				var wi5 = parseFloat($('#form11_wi5').val());
				var sW = wi3 - wi5 - 3 ; //3 = 2 (both side) * 1.5 (form offset);
				var platform_width = Math.round(sW * 1000)/1000;
				$('#platform_width').val(platform_width);
			     
				break;
		    case 12:
				var wi1 = parseFloat($('#form12_wi1').val());
				var wi3 = parseFloat($('#form12_wi3').val());
				var sW = wi1 - wi3 - 3 ; //3 = 2 (both side) * 1.5 (form offset);
				var platform_width = Math.round(sW * 1000)/1000;
				$('#platform_width').val(platform_width);
			     
				break;
		    case 13:
				var wi1 = parseFloat($('#form13_wi1').val());
				var wi3 = parseFloat($('#form13_wi3').val());
				var sW = wi3 - wi1 - 3 ; //3 = 2 (both side) * 1.5 (form offset);
				var platform_width = Math.round(sW * 1000)/1000;
				$('#platform_width').val(platform_width);
			     
				break;
		    case 14:
				var wi3 = parseFloat($('#form14_wi3').val());
				var wi5 = parseFloat($('#form14_wi5').val());
				var sW = wi3 - wi5 - 3 ; //3 = 2 (both side) * 1.5 (form offset);
				var platform_width = Math.round(sW * 1000)/1000;
				$('#platform_width').val(platform_width);
			     
				break;
		    case 15:
			     $('#platform_width').val('N/A');
				break;
		    default:
				$('#platform_width').val('N/A');
				break;
		}
	}
	
}

function getOffset(pid1,pid2,idx) {
var offset = 0;
	for (var oi = idx; oi >= 0; oi--) {
		if (MapToolbar.features["lineTab"][pid1].markers.getAt(oi).sline != '') {
			if (MapToolbar.features["lineTab"][pid1].markers.getAt(oi).sline.indexOf(pid2) >= 0) {
						
				var plines = MapToolbar.features["lineTab"][pid1].markers.getAt(oi).sline.split('¤');
				for (var a=0; a < plines.length;a++) {
					var ar1 = plines[a].split(':'); 
					if (ar1[0] == pid2) {
						if  (ar1[1] == '0') {
							if (typeof  MapToolbar.features["lineTab"][ar1[0]] != 'undefined') {
								var ino = parseInt(ar1[1] );
								var lineXdata = MapToolbar.features["lineTab"][ar1[0]].markers.getAt(ino).lineX;
								arrLineX = lineXdata.split(':'); 
								if (arrLineX[0] == pid1) {
									side = parseInt(arrLineX[1] );
									offset = (side < 0) ? (-1 * parseFloat(arrLineX[2])) : parseFloat(arrLineX[2]);
									break;
								}
							}
						}
					}
					if (offset !== 0) { break; }
				}
			}
		}
	}
	return offset;
} 

function getObjectImage(type,id) {
	var src = '';
	
	switch (type) {
		case 'rail':
			for (var i=0; i < bverailobjArr.length; i++) {
				if (bverailobjArr[i][1] == id) {
					src = bverailobjArr[i][5];
					break;
				}
			}
			break;
		case 'train':
			for (var i=0; i < bvetrainDirArr.length; i++) {
				if (bvetrainDirArr[i][1] == id) {
					src = bvetrainDirArr[i][3];
					break;
				}
			}			
			break;
		case 'tunnel':
			for (var i=0; i < bvetunnelObjArr.length; i++) {
				if (bvetunnelObjArr[i][1] == id) {
					src = bvetunnelObjArr[i][3];
					break;
				}
			}			
			break;
		case 'bridge':
			for (var i=0; i < bvebridgeObjArr.length; i++) {
				if (bvebridgeObjArr[i][1] == id) {
					src = bvebridgeObjArr[i][3];
					break;
				}
			}		
			break;
		case 'flyover':
			for (var i=0; i < bveFOObjArr.length; i++) {
				if (bveFOObjArr[i][1] == id) {
					src = bveFOObjArr[i][3];
					break;
				}
			}		
			break;
		case 'cut':
			for (var i=0; i < bvecutObjArr.length; i++) {
				if (bvecutObjArr[i][1] == id) {
					src = bvecutObjArr[i][3];
					break;
				}
			}		
			break;
		case 'dike':
			for (var i=0; i < bvedikeObjArr.length; i++) {
				if (bvedikeObjArr[i][1] == id) {
					src = bvedikeObjArr[i][3];
					break;
				}
			}		
			break;
		case 'roadcross':
			for (var i=0; i < bveRCObjArr.length; i++) {
				if (bveRCObjArr[i][1] == id) {
					src = bveRCObjArr[i][3];
					break;
				}
			}		
			break;
		case 'form':
			for (var i=0; i < bveplatformObjArr.length; i++) {
				if (bveplatformObjArr[i][1] == id) {
					src = bveplatformObjArr[i][3];
					break;
				}
			}		
			break;
		case 'pole':
			for (var i=0; i < bvepoleObjArr.length; i++) {
				if (bvepoleObjArr[i][1] == id) {
					src = bvepoleObjArr[i][3];
					break;
				}
			}		
			break;
		case 'crack':
			for (var i=0; i < bvecrackObjArr.length; i++) {
				if (bvecrackObjArr[i][1] == id) {
					src = bvecrackObjArr[i][3];
					break;
				}
			}		
			break;
		case 'ground':
			for (var i=0; i < bvebveStrOjArr.length; i++) {
				if (bvebveStrOjArr[i][1] == id) {
					src = bvebveStrOjArr[i][4];
					break;
				}
			}		
			break;
		case 'beacon':
			for (var i=0; i < bvebveStrOjArr.length; i++) {
				if (bvebveStrOjArr[i][1] == id) {
					src = bvebveStrOjArr[i][4];
					break;
				}
			}		
			break;
		case 'river':
			for (var i=0; i < bvebveStrOjArr.length; i++) {
				if (bvebveStrOjArr[i][1] == id) {
					src = bvebveStrOjArr[i][4];
					break;
				}
			}		
			break;
		case 'overbridge':
			for (var i=0; i < bvefreeObjArr.length; i++) {
				if (bvefreeObjArr[i][1] == id) {
					src = bvefreeObjArr[i][4];
					break;
				}
			}		
			break;
/*
			case 'underground':
			for (var i=0; i < bveUGObjArr.length; i++) {
				if (bveUGObjArr[i][1] == id) {
					src = bveUGObjArr[i][3];
					break;
				}
			}		
			break;
*/			
		default:
		
	}
	
	return src;
}

function updateKdata(tab,pid,mid,arr0) {
var arr1 = arr0.split('§'); //contoh : "height:2.1§curve:end:curve_1"
	for (var a = 0; a < arr1.length; a++) {
		var arr2 = arr1[a].split(':');
		switch (arr2[0]) {
			case 'height' :
				MapToolbar.features[tab][pid].markers.getAt(mid).bdata.height = arr2[1];
				break;
			case 'curve' :
							
				break;
			case 'tcurve' :
									
				break;
		}
	}
}

function updateBdata(tab,pid,mid,arr0) {
	var arr1 = arr0.split('§'); //contoh : "tunnel_end:DarkTunnel01§cut_start:WCut03" >> "tunnel_end:DarkTunnel01" "cut_start:WCut03"
	for (var a = 0; a < arr1.length; a++) {
		var arr2 = arr1[a].split('_'); //contoh : "tunnel" "end:DarkTunnel01"
		switch (arr2[0]) {
			case 'tunnel' :
				var arr3 = arr2[1].split(':'); //contoh : "end" "DarkTunnel01"
				if (arr3[0] == 'start') {
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.tunnel == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.tunnel = arr3[1] + ':0'; 
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.tunnel += '¤' + arr3[1] + ':0'; 
					}

				} else {				
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.tunnel == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.tunnel = arr3[1] + ':1'; 
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.tunnel += '¤' + arr3[1] + ':1'; 
					}
				}
				var image = new google.maps.MarkerImage('images/tunnel_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
				MapToolbar.features[tab][pid].markers.getAt(mid).setIcon(image);
				break;
			case 'bridge' :
				var arr3 = arr2[1].split(':'); //contoh : "end" "DarkTunnel01"
				if (arr3[0] == 'start') {				
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.bridge == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.bridge = arr3[1] + ':0'; 
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.bridge += '¤' + arr3[1] + ':0'; 
					}
				} else {
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.bridge == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.bridge = arr3[1] + ':1'; 
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.bridge += '¤' + arr3[1] + ':1';
					}
				}
				var image = new google.maps.MarkerImage('images/bridge_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
				MapToolbar.features[tab][pid].markers.getAt(mid).setIcon(image);
				break;
			case 'cut' :
				var arr3 = arr2[1].split(':'); //contoh : "end" "DarkTunnel01"
				if (arr3[0] == 'start') {
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.cut == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.cut = arr3[1] + ':0';
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.cut += '¤' + arr3[1] + ':0';
					}
				} else {
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.cut == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.cut = arr3[1] + ':1';
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.cut += '¤' + arr3[1] + ':1';
					}			 
				}
				var image = new google.maps.MarkerImage('images/hillcut_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
				MapToolbar.features[tab][pid].markers.getAt(mid).setIcon(image);
				break;
			case 'dike' :
				var arr3 = arr2[1].split(':'); //contoh : "end" "DarkTunnel01"
				if (arr3[0] == 'start') {
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.dike == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.dike = arr3[1] + ':0';
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.dike += '¤' + arr3[1] + ':0';
					}
				} else {					 
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.dike == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.dike = arr3[1] + ':1';
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.dike += '¤' + arr3[1] + ':1';
					}
				}
				var image = new google.maps.MarkerImage('images/dike_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
				MapToolbar.features[tab][pid].markers.getAt(mid).setIcon(image);
				break;
			case 'flyover' :
				var arr3 = arr2[1].split(':'); //contoh : "end" "DarkTunnel01"
				if (arr3[0] == 'start') {					 
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.flyover == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.flyover = arr3[1] + ':0';
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.flyover += '¤' + arr3[1] + ':0';
					}
				} else {					 
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.flyover == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.flyover = arr3[1] + ':1';
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.flyover += '¤' + arr3[1] + ':1';
					}	
				}
				var image = new google.maps.MarkerImage('images/flyover_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
				MapToolbar.features[tab][pid].markers.getAt(mid).setIcon(image);
				break;
			//case 'underground' :
			
			default:
				// default statements
			
		}
	} 
}

function setKTxtEv(key,txt) {
	var ktxt;
	var karr = txt.split(',');
	
	switch (key) {
		case 'tunnel':
			ktxt = (karr[1] == '0') ? 'tunnel_start:' + karr[0] : 'tunnel_end:' + karr[0];
			break;
		case 'bridge':
			ktxt = (karr[1] == '0') ? 'bridge_start:' + karr[0] : 'bridge_end:' + karr[0];
			break;
		case 'flyover':
			ktxt = (karr[1] == '0') ? 'flyover_start:' + karr[0] : 'flyover_end:' + karr[0];
			break;
		case 'cut':
			ktxt = (karr[1] == '0') ? 'cut_start:' + karr[0] : 'cut_end:' + karr[0];
			break;
		case 'dike':
			ktxt = (karr[1] == '0') ? 'dike_start:' + karr[0] : 'dike_end:' + karr[0];
			break;
/*
		case 'underground':
		
			break;
*/			
		default:
			ktxt = '';
			break;
	}
	
	return ktxt;
}

function addStation (staName,staID,latlng) {
	var dahada = false;

	if (staName != '' && staID != '' ) { 

		var stlist = document.getElementById('station_list');
		if (stlist.childElementCount > 0) {
			for (var i = 0; i < stlist.childElementCount; i++) {
				if (stlist.children[i].firstElementChild.getAttribute("value") == staID) {
					dahada = true;
					break;
				}
			}
			if (dahada == false) {
				var slist = document.createElement('label');
				slist.id = staID;
				slist.innerHTML = '<input type="radio" value="' + staID + '" name="stations" onClick="map.setCenter({lat: ' + latlng.lat() + ', lng: ' + latlng.lng() + '});">' + staName + '<br />';
				stlist.appendChild(slist);						
			}
		} else {
			var slist = document.createElement('label');
			slist.id = staID;
			slist.innerHTML = '<input type="radio" value="' + staID + '" name="stations" onClick="map.setCenter({lat: ' + latlng.lat() + ', lng: ' + latlng.lng() + '});">' + staName + '<br />';
			stlist.appendChild(slist);
		}
				
	} else {
		alert("Station Nama & ID not defined.");
	}
	return dahada;
}

function updateStation (staID) {

}

function removeStation(staID) {
	var stlist = document.getElementById('station_list');
	for (var i = 0; i < stlist.childElementCount; i++) {
		if (stlist.children[i].firstElementChild.getAttribute("value") == staID) {
			document.getElementById(stlist.children[i].id).remove();
			break;
		}
	}
	
	return true;
}

function cekStaID(staID) {
	var dahada = false;
	if (staID != '' ) { 
		var stlist = document.getElementById('station_list');
		if (stlist.childElementCount > 0) {
			for (var i = 0; i < stlist.childElementCount; i++) {
				if (stlist.children[i].firstElementChild.getAttribute("value") == staID) {
					dahada = true;
					break;
				}
			}
		}
	}
	return dahada;
}

function cekFormInput(formType) {
	var valid = false;
	
	return valid;
}

function genUiD(latlngtxt) {
	var d = new Date();
	var n = d.getTime(); 
	var x = Math.random()+1;//Math.floor((Math.random() * 100000) + 1); 
	var xn = x * n;
	var xntxt = xn.toString() + latlngtxt; 
	//based on code : https://gist.github.com/wpbasti/762108
	// **** start ****
	var table = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918000, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
	
	var crc = 0 ^ (-1);
	for(var i=0, l= xntxt.length; i<l; i++) {
		crc = (crc >>> 8) ^ table[(crc ^ xntxt.charCodeAt(i)) & 0xFF];
	}
	
	var crc32 =	(crc ^ (-1)) >>> 0;
	// alert(x + ' : ' + crc32.toString(16));
	// **** end ****
	return crc32.toString(16);
}

function findUidIndex(pid,uid) {
	var index = -1;
	for (var i = 0; i < MapToolbar.features["lineTab"][pid].markers.length; i++) {
		//if (MapToolbar.features["lineTab"][pid].markers.getAt(i).lineX != '') {
			if (MapToolbar.features["lineTab"][pid].markers.getAt(i).uid == uid) {
				index = i;
				break;
			}
		//}
	}		
	
	return index;
}

function startupCheck() {
	var txt='';
	
	//browser check
	var browser = get_browser();
	var browser_version=get_browser_version();
	if (browser != 'Firefox' && browser != 'Chrome') {
		txt += 'Unsupported browser : ' + browser + ' ' + browser_version + '\n';
	}
	
	//cookie check
	$.cookie('testcooke', 'pass', { expires: 2 });
	if ($.cookie('testcooke') == null) {
		txt += 'Local cookie not supported.\n';
	}
	
	//HTML5 file API
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		//$('#html5fileapi01').html("<b>File API supported.</b>");
	} else {
		txt += 'File API not supported by this browser.\n';
	}
	
	if (txt !="") {
		txt += '\nNote: Please check for browser compatibility.';
		
		alert(txt);
	}
}

function get_browser(){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return 'IE '+(tem[1]||'');
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return 'Opera '+tem[1];}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return M[0];
}

function get_browser_version(){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];                                                                                                                         
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1]||'');
        }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return 'Opera '+tem[1];}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return M[1];
}

function readerHandler(e2) 
{ 
  var store = document.getElementById('html5fileapi01');
  store.innerHTML=e2.target.result; 
}

function readfile(e1)
{
  var filename = e1.target.files[0]; 
  var fr = new FileReader();
   fr.onload = readerHandler;  
  fr.readAsText(filename); 
}

function addGBDataFile()
{

	var datafile = $('#op_addjsfile').val();
  //alert(datafile.toString().length);
	var gdlist = document.getElementById('op_gbmapdata');
  
	if (gdlist.length == 0) {
		$.cookie('gdatafiles', datafile, { expires: 365 });
		var op = document.createElement('option');
		op.value = '';
		op.innerHTML = "- select -";
		gdlist.appendChild(op);
			
		var opt = document.createElement('option');
		opt.value = i;
		opt.innerHTML = datafile;
		gdlist.appendChild(opt);		
	} else {
		var inList = false;
		for (var i = 0; i < gdlist.length; i++) {
			if (gdlist.options[i].text == datafile) {
				inList = true;
				break;
			}

		}
		if (!inList) {				
			var opt = document.createElement('option');
			opt.value = i;
			opt.innerHTML = datafile;
			gdlist.appendChild(opt);
			if ($.cookie('gdatafiles') != null) {
				if ($.cookie('gdatafiles').indexOf(datafile) == -1) {
					txgdata = $.cookie('gdatafiles');
					txgdata += ',' + datafile;
					$.cookie('gdatafiles', txgdata, { expires: 365 });
				}
			}
		}		
	}
}

function preProcesOpenMapData(teksOP) {
	$( "#dialogImportData" ).dialog('close');
	var rowsData = teksOP.split("\n"); // split rows to array
	var kood = rowsData[0].split(",");
	
	if (kood.length > 2) {

		//teks = map.getCenter().lat() + "," + map.getCenter().lng() + "," + gbm_ver + "," + map.getMapTypeId() + "," + map.getZoom() + "," + gbmapdata + "," + defaultGauge + "," + defaultCant + "," + defaulOffset + "\n";
		map.setCenter(new google.maps.LatLng(kood[0],kood[1])); // recenter map
		map.setMapTypeId(kood[3]);
		map.setZoom(parseInt(kood[4]));
		gbmapdata = kood[5];
		defaultGauge = parseInt(kood[6]);
		defaultCant = parseInt(kood[7]);
		defaulOffset = parseFloat(kood[8]);
		setTimeout(function() { processPolylineID(rowsData, 1); }, 100);
		
	} else {
		//prevoius data from prototype 3
		
		$('#dialogLoadingData').dialog('open');
		$( "#mainload" ).progressbar({
			value: 0
		});
		$( "#subload" ).progressbar({
			value: 0
		});
		$( "#loadstatus" ).text('Reading data ...');
		$( "#loadprocess" ).text('Loading : polylines and curves ...');	
	
		map.setCenter(new google.maps.LatLng(kood[0],kood[1])); // recenter map
		map.setZoom(11);
		
		setTimeout(function() { processoldPolylineID(rowsData, 1); }, 100);

											
	}		

}

function processPolylineID(rowsData, i) {
	if(i < rowsData.length) {
		if (rowsData[i] != '') {
			var rd = rowsData[i].split(",");
			var dname = rd[0];									
			var otype = dname.split("_")[0];
			//alert('otype : ' + otype);
			if (otype == 'line') {
				var dahada = false;
				for(var pid in MapToolbar.features['lineTab'] ) {
					if (MapToolbar.features['lineTab'][pid].uid == rd[1]) {
						dahada = true;
						break;
					}
				}	
				if (!dahada) {
					var loadNextPoly = null; 				
					MapToolbar.initFeature('line');
					MapToolbar.stopEditing();
					var newPID = 'line_'+ MapToolbar['lineCounter'];
					loadNextPoly = MapToolbar.features["lineTab"][newPID];
					
					if (typeof loadNextPoly != 'undefined') {
						loadNextPoly.uid = rd[1];
						loadNextPoly.ptype = rd[2];	
						loadNextPoly.note = (rd[3] != '')? rd[3].replace('-',',').replace(' - ','\n') : '';
						loadNextPoly.name = (rd[4] != '')? rd[4] : '';
						loadNextPoly.route = (rd[5] != '')? rd[5] : '';
						loadNextPoly.lineX = '';
						if (rd[6] != '') {
							var newlineX = '';
							for (r=0;r<oldnewid.length;r++) {
								if (oldnewid[r][0] == rd[6]) {
									newlineX = rd[6].replace(oldnewid[r][0],oldnewid[2]);
									break;
								}									
							}
							if (newlineX !='') {
								loadNextPoly.lineX = newlineX;
							} else {
								loadNextPoly.lineX = rd[6];
							}
						}
						var bdataL = rd[7].split('§');
						loadNextPoly.bdata.devID = (bdataL[0] != '')? bdataL[0] : '';
						loadNextPoly.bdata.maxSpeed = (bdataL[1] != '')? bdataL[1] : '';
						loadNextPoly.bdata.simBVE = (bdataL[2] != '')? bdataL[2] : '';
						loadNextPoly.bdata.gauge = (bdataL[3] != '')? bdataL[3] : '';
						loadNextPoly.bdata.desc = (bdataL[4] != '')? bdataL[4] : '';
						loadNextPoly.bdata.train = (bdataL[5] != '')? bdataL[5] : '';
						loadNextPoly.bdata.rail = (bdataL[6] != '')? bdataL[6] : '';
					
						if (loadNextPoly.id != rd[0]) {	
							var oldnew = [rd[0],rd[1],loadNextPoly.id];
							oldnewid.push(oldnew);
						}
						$( "#mainload" ).progressbar({
							value: Math.round((i/(rowsData.length-1))*100)
						});
						$( "#subload" ).progressbar({
							value: Math.round((8/(rd.length-1))*100)
						});	

						setTimeout(function() { processPolylineData(loadNextPoly,rd, 8, rowsData, i); }, 100);
						
					} else {
						setTimeout(function() { processPolylineID(rowsData, i+1); }, 100);
					}					
				} else {
					setTimeout(function() { processPolylineID(rowsData, i+1); }, 100);
				}
			} else {
				setTimeout(function() { processPolylineID(rowsData, i+1); }, 100);
			}			
		} else {
			setTimeout(function() { processPolylineID(rowsData, i+1); }, 150);		
		}
	} else {
		$( "#loadprocess" ).text('Loading : curves ...');				
		setTimeout(function() { processCurve(rowsData, 1); }, 100);	
	}
}

function processPolylineData(loadPoly,rd, n, rowsData, i) {
	//poly marker coordinate start at 8
	/*
0,1	teks += ',' + allPoints[i].lat() + ";" + allPoints[i].lng();
	
2	teks += ';' + polyL.markers.getAt(i).uid;
	//teks += ';' + polyL.markers.getAt(i).pid;
3	teks += ';' + polyL.markers.getAt(i).note.replace(',','-').replace('\n',' - ');

4	//bdata
	teks += ';' + polyL.markers.getAt(i).bdata.height;
	teks += '§' + polyL.markers.getAt(i).bdata.railindex;
	teks += '§' + polyL.markers.getAt(i).bdata.pitch;
	teks += '§' + polyL.markers.getAt(i).bdata.curve;
	teks += '§' + polyL.markers.getAt(i).bdata.tcurve;

5	//kdata
	teks += ';' + polyL.markers.getAt(i).kdata.bridge;
	teks += '§' + polyL.markers.getAt(i).kdata.overbridge;
	teks += '§' + polyL.markers.getAt(i).kdata.river;
	teks += '§' + polyL.markers.getAt(i).kdata.ground;
	teks += '§' + polyL.markers.getAt(i).kdata.flyover;
	teks += '§' + polyL.markers.getAt(i).kdata.tunnel;
	teks += '§' + polyL.markers.getAt(i).kdata.pole;
	teks += '§' + polyL.markers.getAt(i).kdata.dike;
	teks += '§' + polyL.markers.getAt(i).kdata.cut;
	teks += '§' + polyL.markers.getAt(i).kdata.underground;
	teks += '§' + polyL.markers.getAt(i).kdata.form;
	teks += '§' + polyL.markers.getAt(i).kdata.roadcross;
	teks += '§' + polyL.markers.getAt(i).kdata.crack;
	teks += '§' + polyL.markers.getAt(i).kdata.beacon;

6	//gdata
	teks += ';' + polyL.markers.getAt(i).gdata.lastpitch;
	teks += '§' + polyL.markers.getAt(i).gdata.lastheight;
	teks += '§' + polyL.markers.getAt(i).gdata.lastheightratio;

7	teks += ';' + polyL.markers.getAt(i).lineX;
8	teks += '§' + polyL.markers.getAt(i).sline;
	*/
	var xD = rd[n].split(";");
	MapToolbar.addPoint(new google.maps.LatLng(xD[0], xD[1]), loadPoly, n-8);	
	//loadPoly.markers.getAt(n-8)
  
	loadPoly.markers.getAt(n-8).uid = xD[2]; 
	loadPoly.markers.getAt(n-8).note = (xD[3] != '')? xD[3].replace('-',',').replace(' - ','\n') : ''; 
	
	var bdataM = xD[4].split('§');
	var kdataM = xD[5].split('§');
	var gdataM = xD[6].split('§');

	//loadPoly.markers.getAt(n-8).lineX = (xD[7] != '')? xD[7] : ''; 

	if (xD[7] != '') {
		var newId = '';
		var lineXid = xD[7].split(':');
		for (r=0;r<oldnewid.length;r++) {
			if (oldnewid[r][0] == lineXid[0]) {
				newId = lineXid[0].replace(oldnewid[r][0],oldnewid[r][2]);
				break;
			}									
		}
		if (newId !='') {
			loadPoly.markers.getAt(n-8).lineX =  newId + ':' + lineXid[1] + ':' + lineXid[2] + ':' + lineXid[3] + ':' + lineXid[4];
		} else {
			loadPoly.markers.getAt(n-8).lineX = xD[7];
		}
	}	

	loadPoly.markers.getAt(n-8).sline = (xD[8] != '')? xD[8] : ''; //cek last krn data utk newpoly ava. kemudian


	//bdata
	loadPoly.markers.getAt(n-8).bdata.height = bdataM[0];
	loadPoly.markers.getAt(n-8).bdata.railindex = bdataM[1];
	loadPoly.markers.getAt(n-8).bdata.pitch = bdataM[2];
	loadPoly.markers.getAt(n-8).bdata.curve = bdataM[3];
	loadPoly.markers.getAt(n-8).bdata.tcurve = bdataM[4];
	
	//kdata {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
	if (kdataM[0] != '') {
		loadPoly.markers.getAt(n-8).kdata.bridge = kdataM[0];
		var image0 = new google.maps.MarkerImage('images/bridge_icon.png',
			new google.maps.Size(6, 6),
			new google.maps.Point(0, 0),
			new google.maps.Point(3, 3));
		loadPoly.markers.getAt(n-8).setIcon(image0);	
	}
	if (kdataM[1] != '') {
		loadPoly.markers.getAt(n-8).kdata.overbridge = kdataM[1];
		var image1 = new google.maps.MarkerImage('images/overbridge_icon.png',
			new google.maps.Size(6, 6),
			new google.maps.Point(0, 0),
			new google.maps.Point(3, 3));
		loadPoly.markers.getAt(n-8).setIcon(image1);	
	}

	loadPoly.markers.getAt(n-8).kdata.river = kdataM[2];

	if (kdataM[3] != '') {
		loadPoly.markers.getAt(n-8).kdata.ground = kdataM[3];
		var image3 = new google.maps.MarkerImage('images/ground8.png',
			new google.maps.Size(8, 8),
			new google.maps.Point(0, 0),
			new google.maps.Point(4, 4));
		loadPoly.markers.getAt(n-8).setIcon(image3);	
	} 
	if (kdataM[4] != '') {
		loadPoly.markers.getAt(n-8).kdata.flyover = kdataM[4];
		var image4 = new google.maps.MarkerImage('images/flyover_icon.png',
			new google.maps.Size(6, 6),
			new google.maps.Point(0, 0),
			new google.maps.Point(3, 3));
		loadPoly.markers.getAt(n-8).setIcon(image4);	
	} 
	if (kdataM[5] != '') {
		loadPoly.markers.getAt(n-8).kdata.tunnel = kdataM[5];
		var image5 = new google.maps.MarkerImage('images/tunnel_icon.png',
			new google.maps.Size(6, 6),
			new google.maps.Point(0, 0),
			new google.maps.Point(3, 3));
		loadPoly.markers.getAt(n-8).setIcon(image5); 	
	} 
	if (kdataM[6] != '') {
		loadPoly.markers.getAt(n-8).kdata.pole = kdataM[6];
	
	} 
	if (kdataM[7] != '') {
		loadPoly.markers.getAt(n-8).kdata.dike = kdataM[7];
		var image7 = new google.maps.MarkerImage('images/dike_icon.png',
			new google.maps.Size(6, 6),
			new google.maps.Point(0, 0),
			new google.maps.Point(3, 3));
		loadPoly.markers.getAt(n-8).setIcon(image7);	
	} 
	if (kdataM[8] != '') {
		loadPoly.markers.getAt(n-8).kdata.cut = kdataM[8];
		var image8 = new google.maps.MarkerImage('images/hillcut_icon.png',
			new google.maps.Size(6, 6),
			new google.maps.Point(0, 0),
			new google.maps.Point(3, 3));
		loadPoly.markers.getAt(n-8).setIcon(image8);	
	} 
	if (kdataM[9] != '') {
		loadPoly.markers.getAt(n-8).kdata.underground = kdataM[9];
	
	} 
	if (kdataM[10] != '') {
		loadPoly.markers.getAt(n-8).kdata.form = kdataM[10];
		var image10 = new google.maps.MarkerImage('images/form_icon.png',
			new google.maps.Size(6, 6),
			new google.maps.Point(0, 0),
			new google.maps.Point(3, 3));
		loadPoly.markers.getAt(n-8).setIcon(image10);	
	} 
	if (kdataM[11] != '') {
		loadPoly.markers.getAt(n-8).kdata.roadcross = kdataM[11];
		var image11 = new google.maps.MarkerImage('images/roadcross_icon.png',
			new google.maps.Size(6, 6),
			new google.maps.Point(0, 0),
			new google.maps.Point(3, 3));
		loadPoly.markers.getAt(n-8).setIcon(image11);	
	} 
	if (kdataM[12] != '') {
		loadPoly.markers.getAt(n-8).kdata.crack = kdataM[12];
	
	} 
	if (kdataM[13] != '') {
		loadPoly.markers.getAt(n-8).kdata.beacon = kdataM[13];
	
	} 
	
	//gdata
	loadPoly.markers.getAt(n-8).bdata.lastpitch = gdataM[0];
	loadPoly.markers.getAt(n-8).bdata.lastheight = gdataM[1];
	loadPoly.markers.getAt(n-8).bdata.lastheightratio = gdataM[2];

	n++;
	
	if(n < rd.length) {
		$( "#subload" ).progressbar({
			value: Math.round((n/(rd.length-1))*100)
		});		
		setTimeout(function() { processPolylineData(loadPoly,rd, n, rowsData, i); }, 150);	
	} else {
		setTimeout(function() { processPolylineID(rowsData, i+1); }, 150);
	
	}
}

function processCurve(rowsData, i) {
	var rd = rowsData[i].split(",");
	var dname = rd[0];				    					
	if (rd[2] == 'curve') {
		var dahada = false;
		for(var cid in MapToolbar.features['curveTab'] ) {
			if (MapToolbar.features['curveTab'][cid].uid == rd[1]) {
				dahada = true;
				break;
			}
		}	
		if (!dahada) {
		/*
			teks += ',' + cpoly.uid;
			teks += ',' + cpoly.ptype;
			teks += ',' + cpoly.pid;
			teks += ',' + cpoly.mid;
			teks += ',' + cpoly.Rc;
			teks += ',' + cpoly.cant;
			teks += ',' + cpoly.Vd;
			teks += ',' + cpoly.Lt;
			teks += ',' + cpoly.Lc;
			teks += ',' + cpoly.Cc;
			teks += ',' + cpoly.st;
			teks += ',' + cpoly.ed;
			teks += ',' + cpoly.h1;
			teks += ',' + cpoly.h2;
			teks += ',' + cpoly.forceSL;
			teks += ',' + cpoly.delta;
			teks += ',' + cpoly.theta;
			teks += ',' + cpoly.railindex;
			teks += ',' + cpoly.route;
		*/	
			var uid = rd[1];
			var ptype = rd[2];
			var pid = '';
			
			if (rd[3] != '') {
				var newpid = '';
				for (r=0;r<oldnewid.length;r++) {
					if (oldnewid[r][0] == rd[3]) {
						newpid = rd[3].replace(oldnewid[r][0],oldnewid[r][2]);
						break;
					}									
				}
				if (newpid !='') {
					pid = newpid;
				} else {
					pid = rd[3];
				}
			}			
			
			var mid = parseInt(rd[4]);
			var Rc = parseFloat(rd[5]);
			var cant = parseInt(rd[6]);
			var Vd = parseInt(rd[7]);
			var Lt = parseFloat(rd[8]);
			var Lc = parseFloat(rd[9]);
			var Cc = new google.maps.LatLng(rd[10].split(';')[0],rd[10].split(';')[1]);
			var st = new google.maps.LatLng(rd[11].split(';')[0],rd[11].split(';')[1]);
			var ed = new google.maps.LatLng(rd[12].split(';')[0],rd[12].split(';')[1]);
			var h1 = parseFloat(rd[13]);
			var h2 = parseFloat(rd[14]);
			var forceSL = (rd[15] == 'true')? true:false;
			var delta = parseFloat(rd[16]);
			var theta = parseFloat(rd[17]);
			var railIndex = parseInt(rd[18]);
			var route = rd[19];
		
			var dir = (Rc < 0) ? -1: 1;
			var preR = Math.abs(Rc);

			var points = Math.ceil(Lc/25);
			var iB = google.maps.geometry.spherical.computeHeading(Cc,st);
			var fB = google.maps.geometry.spherical.computeHeading(Cc,ed);

			var extp = [];
			var br = null;
				
			br = fB - iB;
				
			if (br >  180) {br -= 360;}
			if (br < -180) {br += 360;}

			var deltaBearing = br/points;
		
			for (var b=0; (b < points+1); b++) {     
				extp.push(google.maps.geometry.spherical.computeOffset(Cc, preR, iB + b*deltaBearing)); 
			}
								
			var curve = new google.maps.Polyline({
				path: extp,
				strokeColor: "#FF0000",
				strokeOpacity: 0.7,
				geodesic: true,
				map: map,
				strokeWeight: 1
			});
			//curve.setMap(map);
			
			++MapToolbar["curveCounter"];
			curve.id = 'curve_'+ MapToolbar["curveCounter"];
			curve.pid = pid;
			curve.ptype = ptype;
			curve.uid = uid; //unique id - new feature start on 01/9/2014
			curve.mid = mid;
			curve.Rc = Rc * dir,
			curve.cant = cant;
			curve.Vd = Vd;
			curve.Lt = Lt;
			curve.Lc = Lc;
			curve.Cc = Cc;
			curve.st = st;
			curve.ed = ed;
			curve.h1 = h1;
			curve.h2 = h2;
			curve.forceSL = forceSL;
			curve.delta = delta;
			curve.theta = theta;
			curve.railindex = railIndex;
			curve.route = route;
			curve.$el = MapToolbar.addFeatureEntry(curve.id);
			curve.markers = new google.maps.MVCArray;	     
			MapToolbar.features['curveTab'][curve.id] = curve;
							
			MapToolbar.features["lineTab"][pid].markers.getAt(mid).bdata.curve = curve.id ;
			MapToolbar.features["lineTab"][pid].markers.getAt(mid).setDraggable(false);
													
			var imgurl = "images/curve-sign.png";
			var imgurl2 = "images/curve-sign2.png";
			var imgccurl = "images/bullet_white.png";
 
			var e1 = st,      
				image = new google.maps.MarkerImage(imgurl,
				new google.maps.Size(6, 6),
				new google.maps.Point(0, 0),
				new google.maps.Point(5, 5)), 
				index =0,
				marker = new google.maps.Marker({
					position: st,
					map: map,
					icon: image,
					title: '' ,
					note: '', // any extra note 
					bdata: {height:'',pitch:''},
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
					lineX: '',
					gdata: {lastpitch:'',lastheight:'',lastheightratio:''},
					ld:0, // distance on circumference from curve start point 
					pid:curve.id
				});

				marker.index = index;    
				curve.markers.insertAt(index, marker);
				curve.markers.getAt(index).title = curve.id + ' start point : ' + st;	

			var e2 = ed,      
				image= new google.maps.MarkerImage(imgurl2,
					new google.maps.Size(6, 6),
					new google.maps.Point(0, 0),
					new google.maps.Point(5, 5)), 
				index =1,
				marker = new google.maps.Marker({
					position: ed,
					map: map,
					icon: image,
					note: '', // any extra note 
					bdata: {height:'',pitch:''},
					title: '',
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
					lineX: '',
					gdata: {lastpitch:'',lastheight:'',lastheightratio:''},
					ld:Lc, // distance on circumference from curve start point 
					pid:curve.id
				});
				marker.index = index;    
				curve.markers.insertAt(index, marker);
				curve.markers.getAt(index).title = curve.id + ' end point : ' + ed;	
				
			var ec = Cc,      
				image= new google.maps.MarkerImage(imgccurl,
					new google.maps.Size(6, 6),
					new google.maps.Point(0, 0),
					new google.maps.Point(3, 3)), 
				index =2,
				marker = new google.maps.Marker({
					position: Cc,
					map: map,
					icon: image,
					note: '', // any extra note 
					bdata: {height:'',pitch:''},
					title: curve.id + ' center point : ' + Cc,
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
					lineX: '',
					gdata: {lastpitch:'',lastheight:'',lastheightratio:''},
					ld:null, // distance on circumference from curve start point 
					pid:curve.id
				});
			marker.index = index;    
			curve.markers.insertAt(index, marker);
			//curve.markers.getAt(index).title = curve.id + ' center point : ' + Cc;
	
			google.maps.event.addListener(curve, "click", function(mEvent){
				var infoWindowTxt = 'curve Id : ' + curve.id + '(' + uid + ')';
				infoWindowTxt += '<br><br>line id : ' + pid + ' mid : ' + mid; 
				infoWindowTxt += '<br>radius : ' + Rc + 'm<br>design speed : ' + Vd + ' km/h<br>cant : ' + cant + ' mm' + '<br>curve length : ' + (Math.round(Lc*10000)/10000) + '<br>tangent length : ' + (Math.round(Lt*10000)/10000) + ' m<br>';

				var lat0 = mEvent.latLng.lat();
				var lng0 = mEvent.latLng.lng();
				
				infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="2"><tr>' + '<td width="24"><img src="images/remove line.png" width="20" height="20" title="Remove line" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\''+ curve.id + '\');"></td><td>&nbsp;&nbsp;</td>'; 

				infoWindowTxt += '<td width="24"><img src="images/line+point.png" width="20" height="20" title="Add new point to current line" style="cursor: pointer;" onclick="btnAddMarker2Polyline(\''+ curve.id + '\',\'' + lat0 + '\',\'' + lng0 + '\');"></td>';
		
				infoWindowTxt += '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
			
				infoWindowTxt += '<td><img src="images/sticky_note_pencil.png" title="Add Note" width="16" height="16" style="cursor: pointer;" onclick="curveNote(\'' + curve.id + '\');"></td>';
			
				infoWindowTxt += '<td><img src="images/xfce4_settings.png" title="Setting" width="16" height="16" style="cursor: pointer;" onclick="curveSetting(\'' + curve.id + '\');"></td>';
			
				infoWindowTxt += '</tr></table>';    			
	
				var infowindow = new google.maps.InfoWindow({
					content: infoWindowTxt,
					position: mEvent.latLng
				});

				infowindow.open(map);	

			});	

			/*
				teks += ',' + cpoly.markers.getAt(mi).getPosition().lat() + ";" +cpoly.markers.getAt(mi).getPosition().lng();

				//teks += ';' +  cpoly.markers.getAt(mi).pid;
				teks += ';' +  cpoly.markers.getAt(mi).index;
				teks += ';' +  cpoly.markers.getAt(mi).note.replace(',','-').replace('\n',' - ');
				teks += ';' +  cpoly.markers.getAt(mi).ld;
				teks += ';' +  cpoly.markers.getAt(mi).title;
				teks += ';' +  cpoly.markers.getAt(mi).sline;
				teks += ';' +  cpoly.markers.getAt(mi).lineX;
				
				//bdata
				teks += ';' + cpoly.markers.getAt(mi).bdata.height;
				teks += '§' + cpoly.markers.getAt(mi).bdata.pitch;

				//kdata
				teks += ';' + cpoly.markers.getAt(mi).kdata.bridge;
				teks += '§' + cpoly.markers.getAt(mi).kdata.overbridge;
				teks += '§' + cpoly.markers.getAt(mi).kdata.river;
				teks += '§' + cpoly.markers.getAt(mi).kdata.ground;
				teks += '§' + cpoly.markers.getAt(mi).kdata.flyover;
				teks += '§' + cpoly.markers.getAt(mi).kdata.tunnel;
				teks += '§' + cpoly.markers.getAt(mi).kdata.pole;
				teks += '§' + cpoly.markers.getAt(mi).kdata.dike;
				teks += '§' + cpoly.markers.getAt(mi).kdata.cut;
				teks += '§' + cpoly.markers.getAt(mi).kdata.underground;
				teks += '§' + cpoly.markers.getAt(mi).kdata.form;
				teks += '§' + cpoly.markers.getAt(mi).kdata.roadcross;
				teks += '§' + cpoly.markers.getAt(mi).kdata.crack;
				teks += '§' + cpoly.markers.getAt(mi).kdata.beacon;

				//gdata
				teks += ';' + cpoly.markers.getAt(mi).gdata.lastpitch;
				teks += '§' + cpoly.markers.getAt(mi).gdata.lastheight;
				teks += '§' + cpoly.markers.getAt(mi).gdata.lastheightratio;							

			*/	
			//index=3;
			
			$( "#mainload" ).progressbar({
				value: Math.round((i/(rowsData.length-1))*100)
			});

						
			for (a=20; a<rd.length; a++) {
				var part = rd[a].split(';');
				
				//var latlng = new google.maps.LatLng(parseFloat(part[0]),parseFloat(part[1]));
				index = parseInt(part[2]);
				if (parseInt(part[2]) > 2) { btnAddMarker2Polyline(curve.id,parseFloat(part[0]),parseFloat(part[1])); }
				//MapToolbar.addPoint(latlng, curve, index);
				
				//bdata
				var bpart = part[8].split('§');
				//kdata
				var kpart = part[9].split('§');
				//gdata
				var gpart = part[10].split('§');
				//curve.markers.getAt(index).pid = ;
				//curve.markers.getAt(index).index = part[2];
				curve.markers.getAt(index).note = part[3].replace(',','-').replace('\n',' - ');
				curve.markers.getAt(index).ld = part[4];
				curve.markers.getAt(index).title = part[5];
				curve.markers.getAt(index).sline = part[6];
				curve.markers.getAt(index).lineX = part[7];
				
				//bdata
				curve.markers.getAt(index).bdata.height = bpart[0];
				curve.markers.getAt(index).bdata.pitch = bpart[1];

				//kdata
				if (kpart[0] != '') {
					curve.markers.getAt(index).kdata.bridge = kpart[0];
					var image0 = new google.maps.MarkerImage('images/bridge_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					curve.markers.getAt(index).setIcon(image0);	
				}
				if (kpart[1] != '') {
					curve.markers.getAt(index).kdata.overbridge = kpart[1];
					var image1 = new google.maps.MarkerImage('images/overbridge_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					curve.markers.getAt(index).setIcon(image1);	
				}

				curve.markers.getAt(index).kdata.river = kpart[2];

				if (kpart[3] != '') {
					curve.markers.getAt(index).kdata.ground = kpart[3];
					var image3 = new google.maps.MarkerImage('images/ground8.png',
						new google.maps.Size(8, 8),
						new google.maps.Point(0, 0),
						new google.maps.Point(4, 4));
					curve.markers.getAt(index).setIcon(image3);	
				} 
				if (kpart[4] != '') {
					curve.markers.getAt(index).kdata.flyover = kpart[4];
					var image4 = new google.maps.MarkerImage('images/flyover_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					curve.markers.getAt(index).setIcon(image4);	
				} 
				if (kpart[5] != '') {
					curve.markers.getAt(index).kdata.tunnel = kpart[5];
					var image5 = new google.maps.MarkerImage('images/tunnel_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					curve.markers.getAt(index).setIcon(image5); 	
				} 
				if (kpart[6] != '') {
					curve.markers.getAt(index).kdata.pole = kpart[6];
				
				} 
				if (kpart[7] != '') {
					curve.markers.getAt(index).kdata.dike = kpart[7];
					var image7 = new google.maps.MarkerImage('images/dike_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					curve.markers.getAt(index).setIcon(image7);	
				} 
				if (kpart[8] != '') {
					curve.markers.getAt(index).kdata.cut = kpart[8];
					var image8 = new google.maps.MarkerImage('images/hillcut_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					curve.markers.getAt(index).setIcon(image8);	
				} 
				if (kpart[9] != '') {
					curve.markers.getAt(index).kdata.underground = kpart[9];
				
				} 
				if (kpart[10] != '') {
					curve.markers.getAt(index).kdata.form = kpart[10];
					var image10 = new google.maps.MarkerImage('images/form_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					curve.markers.getAt(index).setIcon(image10);	
				} 
				if (kpart[11] != '') {
					curve.markers.getAt(index).kdata.roadcross = kpart[11];
					var image11 = new google.maps.MarkerImage('images/roadcross_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					curve.markers.getAt(index).setIcon(image11);	
				} 
				if (kpart[12] != '') {
					curve.markers.getAt(index).kdata.crack = kpart[12];
				
				} 
				if (kpart[13] != '') {
					curve.markers.getAt(index).kdata.beacon = kpart[13];
				
				}

				//gdata
				curve.markers.getAt(index).gdata.lastpitch = gpart[0];
				curve.markers.getAt(index).gdata.lastheight = gpart[1];
				curve.markers.getAt(index).gdata.lastheightratio = gpart[2];
				
				$( "#subload" ).progressbar({
					value: Math.round(((a-20)/(rd.length-1))*100)
				});	
			}
			
		} 
	}
	i++;

	if (i < rowsData.length) {		
		setTimeout(function() { processCurve(rowsData, i); }, 50 );		
	} else {
		$( "#loadprocess" ).text('Loading : transition curves ...');	
		setTimeout(function() { processTCurve(rowsData, 1); }, 100 );
	}	
}

function processTCurve(rowsData, i) {
	var rd = rowsData[i].split(",");
	var dname = rd[0];				    					
	if (rd[2] == 'tcurve') {
		var dahada = false;
		for(var cid in MapToolbar.features['tcurveTab'] ) {
			if (MapToolbar.features['tcurveTab'][cid].uid == rd[1]) {
				dahada = true;
				break;
			}
		}	
		if (!dahada) {
		/*
			teks += ',' + cpoly.uid;
			teks += ',' + cpoly.ptype;
			teks += ',' + cpoly.pid;
			teks += ',' + cpoly.mid;
			teks += ',' + cpoly.tctype;
			teks += ',' + cpoly.note;
			teks += ',' + cpoly.Rc;
			teks += ',' + cpoly.cant;
			teks += ',' + cpoly.Vd;
			teks += ',' + cpoly.Ls;
			teks += ',' + cpoly.Lc;
			teks += ',' + cpoly.K;
			teks += ',' + cpoly.TotalX;
			teks += ',' + cpoly.TotalY;
			teks += ',' + cpoly.Cc.lat() + ';' + cpoly.Cc.lng();
			teks += ',' + cpoly.Ttst.lat() + ';' + cpoly.Ttst.lng();
			teks += ',' + cpoly.Tted.lat() + ';' + cpoly.Tted.lng();
			teks += ',' + cpoly.Tcst.lat() + ';' + cpoly.Tcst.lng();
			teks += ',' + cpoly.Tced.lat() + ';' + cpoly.Tced.lng();
			teks += ',' + cpoly.h1;
			teks += ',' + cpoly.h2;
			teks += ',' + cpoly.TL;
			teks += ',' + cpoly.shift;
			teks += ',' + cpoly.forceSL;
			teks += ',' + cpoly.delta;
			teks += ',' + cpoly.theta;
			teks += ',' + cpoly.deltaS;
			teks += ',' + cpoly.deltaC;
			teks += ',' + cpoly.railindex;
			teks += ',' + cpoly.route;
		*/	
			var uid = rd[1];
			var ptype = rd[2];
			var pid = '';
			if (rd[3] != '') {
				var newpid = '';
				for (r=0;r<oldnewid.length;r++) {
					if (oldnewid[r][0] == rd[3]) {
						newpid = rd[3].replace(oldnewid[r][0],oldnewid[r][2]);
						break;
					}									
				}
				if (newpid !='') {
					pid = newpid;
				} else {
					pid = rd[3];
				}
			}			
			var mid = parseInt(rd[4]);
			var tctype = rd[5];
			var note = rd[6];
			var Rc = parseFloat(rd[7]);
			var cant = parseInt(rd[8]);
			var Vd = parseInt(rd[9]);
			var Ls = parseFloat(rd[10]);
			var Lc = parseFloat(rd[11]);
			var K = parseFloat(rd[12]);
			var TotalX = parseFloat(rd[13]);
			var TotalY = parseFloat(rd[14]);
			var Cc = new google.maps.LatLng(rd[15].split(';')[0],rd[15].split(';')[1]);
			var Ttst = new google.maps.LatLng(rd[16].split(';')[0],rd[16].split(';')[1]);
			var Tted = new google.maps.LatLng(rd[17].split(';')[0],rd[17].split(';')[1]);
			var Tcst = new google.maps.LatLng(rd[18].split(';')[0],rd[18].split(';')[1]);
			var Tced = new google.maps.LatLng(rd[19].split(';')[0],rd[19].split(';')[1]);
			var h1 = parseFloat(rd[20]);
			var h2 = parseFloat(rd[21]);
			var TL = parseFloat(rd[22]);
			var shift = parseFloat(rd[23]);
			var forceSL = (rd[24] == 'true')? true:false;
			var delta = parseFloat(rd[25]);
			var theta = parseFloat(rd[26]);
			var deltaS = parseFloat(rd[27]);
			var deltaC = parseFloat(rd[28]);
			var railIndex = parseInt(rd[29]);
			var route = rd[30];
			
			var dir = (Rc < 0) ? -1: 1;
			var preR = Math.abs(Rc);
			
			var tarr = [];

					
			if (tctype == 'cubic') {
				//cubic parabola
				var parts = 30; // any value, higher = more precision
				var ts = Ls / parts; //transition segment divided by any value (for plotting)
									 
				//plotting entering spiral curve
				for (var i=0; (i <= parts); i++) {     
					if (i == 0) {
						tarr.push(Ttst);
					} else if (i== parts) {
						tarr.push(Tcst);   	  		 
					} else {
						var yi = google.maps.geometry.spherical.computeOffset(Ttst, ts * i, h1);
						var ycd = (Math.pow((ts * i),3))/(6 * preR * Ls);
						var yd = google.maps.geometry.spherical.computeOffset(yi, ycd , h1+(90 * dir));
						var xo = google.maps.geometry.spherical.computeHeading(tarr[i-1],yd);
						var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[i-1],yd);
						var xi = google.maps.geometry.spherical.computeOffset(tarr[i-1], xd, xo);
						tarr.push(xi);
					}
				}
				// --- end		
				
				var points = Math.ceil(Lc/25);
				var iB = google.maps.geometry.spherical.computeHeading(Cc,Tcst);
				var fB = google.maps.geometry.spherical.computeHeading(Cc,Tced);
			
				var br = fB - iB;
				if (br >  180) {br -= 360;}
				if (br < -180) {br += 360;}
			
				var deltaBearing = br/points;
			
				//plotting circular curve
				for (var i=0; (i < points+1); i++) {     
					tarr.push(google.maps.geometry.spherical.computeOffset(Cc, preR, iB + i*deltaBearing)); 
				}	
				// --- end
			
				//plotting exiting spiral curve
				for (var i=parts; (i >= 0); i--) {     
					if (i == 0) {
						tarr.push(Tted); 		  		 	 
					} else if (i== parts) {		
						tarr.push(Tced);  	  		 
					} else {
						var yi = google.maps.geometry.spherical.computeOffset(Tted, -ts * i, h2);
						var ycd = (Math.pow((ts * i),3))/(6 * preR * Ls);
						var yd = google.maps.geometry.spherical.computeOffset(yi, -ycd , h2-(90 * dir));
						var xo = google.maps.geometry.spherical.computeHeading(tarr[i-1],yd);
						var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[i-1],yd);
						var xi = google.maps.geometry.spherical.computeOffset(tarr[i-1], xd, xo);
						tarr.push(xi);
					}
				}
				// --- end
			
				// cubic parabola plotter end
						
			} else {
				//halfsine tangent	
				var X2_2PI2 = Math.pow(TotalX,2)/(2*Math.pow(Math.PI,2));
				var parts = 30; // any value, higher = more precision on plotting
				var ts = Ls / parts; // TotalX = full length of transition by assumption (see Cubic Parabola calculation), ntc new transition segment divided by any value
									 			
				for (var i=0; (i <= parts); i++) {     
					if (i == 0) {
						tarr.push(Ttst);
					} else if (i== parts) {
						tarr.push(Tcst);   	  		 
					} else {
						var yi = google.maps.geometry.spherical.computeOffset(Ttst, ts * i, h1);
						var ycd = (1/preR)*((Math.pow(ts * i,2)/4)-X2_2PI2*(1-Math.cos((Math.PI * ts * i)/TotalX)));
						var yd = google.maps.geometry.spherical.computeOffset(yi, ycd , h1+(90 * dir));
						var xo = google.maps.geometry.spherical.computeHeading(tarr[i-1],yd);
						var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[i-1],yd);
						var xi = google.maps.geometry.spherical.computeOffset(tarr[i-1], xd, xo);
						tarr.push(xi);
					}
				}	
					
				var points = Math.ceil(Lc/25);
				var iB = google.maps.geometry.spherical.computeHeading(Cc,Tcst);
				var fB = google.maps.geometry.spherical.computeHeading(Cc,Tced);
			
				var br = fB - iB;
				if (br >  180) {br -= 360;}
				if (br < -180) {br += 360;}
			
				var deltaBearing = br/points;
			
				for (var i=0; (i < points+1); i++) {     
					tarr.push(google.maps.geometry.spherical.computeOffset(Cc, preR, iB + i*deltaBearing)); 
				}	
			
				for (var i=parts; (i >= 0); i--) {     
					if (i == 0) {
						tarr.push(Tted); 		  		 	 
					} else if (i== parts) {		
						tarr.push(Tced);  	  		 
					} else {
						var yi = google.maps.geometry.spherical.computeOffset(Tted, -ts * i, h2);
						var ycd = (1/preR)*((Math.pow(ts * i,2)/4)-X2_2PI2*(1-Math.cos((Math.PI * ts * i)/TotalX)));
						var yd = google.maps.geometry.spherical.computeOffset(yi, -ycd , h2-(90 * dir));
						var xo = google.maps.geometry.spherical.computeHeading(tarr[i-1],yd);
						var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[i-1],yd);
						var xi = google.maps.geometry.spherical.computeOffset(tarr[i-1], xd, xo);
						tarr.push(xi);
					}
				}

				// halfsine curve plotter end
				
			
			}

			var  color = MapToolbar.getColor(true),
				tcurve = new google.maps.Polyline({
				path: tarr,
				strokeColor: "#00E600",
				strokeOpacity: 0.7,
				geodesic: true,
				map: map,
				strokeWeight: 1
			});
								
			++MapToolbar["tcurveCounter"];
			tcurve.id = 'tcurve_'+ MapToolbar["tcurveCounter"];
			tcurve.uid = uid; //unique id - new feature start on 01/9/2014
			tcurve.pid = pid;
			tcurve.mid = mid;
			tcurve.ptype = 'tcurve';
			tcurve.tctype = tctype;
			tcurve.note = ''; 
			tcurve.Rc = Rc,
			tcurve.cant = cant;
			tcurve.Vd = Vd;
			tcurve.Ls = Ls;
			tcurve.Lc = Lc;
			tcurve.K = K;
			tcurve.TotalX = TotalX;
			tcurve.TotalY = TotalY;
			tcurve.Cc = Cc;
			tcurve.Ttst = Ttst;
			tcurve.Tted = Tted;
			tcurve.Tcst = Tcst;
			tcurve.Tced = Tced;

			tcurve.h1 = h1;
			tcurve.h2 = h2;

			tcurve.TL = TL;
			tcurve.shift = shift;
				
			tcurve.forceSL = forceSL;
			tcurve.delta = delta;
			tcurve.theta = theta;
		 
			tcurve.deltaS = deltaS;
			tcurve.deltaC = deltaC;
			tcurve.railindex = railIndex;	//circular rail index
			tcurve.route = route;	
			tcurve.$el = MapToolbar.addFeatureEntry(tcurve.id);
			tcurve.markers = new google.maps.MVCArray;	 
			
			MapToolbar.features['tcurveTab'][tcurve.id] = tcurve;

			var imgurlTcSt = "images/gbm-m_curve.png";
			var imgurlCcSt = "images/curve-sign2.png";
			var imgurlCcCt = "images/bullet_white.png";
			var imgurlShft = "images/bullet_grey.png";			
			
			//MapToolbar.features["lineTab"][pid].markers.getAt(mid).note = '' ;
			MapToolbar.features["lineTab"][pid].markers.getAt(mid).bdata.tcurve = tcurve.id; 
			MapToolbar.features["lineTab"][pid].markers.getAt(mid).setDraggable(false);
			
			var e1 = new google.maps.LatLng(Ttst),      
				image = new google.maps.MarkerImage(imgurlTcSt,
					new google.maps.Size(16, 16),
					new google.maps.Point(0, 0),
					new google.maps.Point(8, 8)), 
				index =0,
				marker = new google.maps.Marker({
					position: Ttst,
					map: map,
					icon: image,
					note: '', // any extra note 
					bdata: {height:'',pitch:''},
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
					lineX: '',
					gdata: {lastpitch:'',lastheight:'',lastheightratio:''},			
					ld:0, // distance on circumference from curve start point 
					pid : tcurve.id,
					title : tcurve.id + ' start point : ' + Ttst 
				});

			marker.index = index;    
			tcurve.markers.insertAt(index, marker)
				
			var e2 = new google.maps.LatLng(Tted),      
				image= new google.maps.MarkerImage(imgurlTcSt,
					new google.maps.Size(16, 16),
					new google.maps.Point(0, 0),
					new google.maps.Point(8, 8)), 
				index =1,
				marker = new google.maps.Marker({
					position: Tted,
					map: map,
					icon: image,
					note: '', // any extra note 
					bdata: {height:'',pitch:''},
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
					lineX: '',
					gdata: {lastpitch:'',lastheight:'',lastheightratio:''},			
					ld: 2*Ls + Lc,  
					pid : tcurve.id,
					title: tcurve.id + ' end point : ' + Tted
				});
				marker.index = index;    
				tcurve.markers.insertAt(index, marker)
				
				var ec = new google.maps.LatLng(Cc),      
					image= new google.maps.MarkerImage(imgurlCcCt,
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3)), 
				index =2,
				marker = new google.maps.Marker({
					position: Cc,
					map: map,
					icon: image,
					note: '', // any extra note 
					bdata: {height:'',pitch:''},
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
					lineX: '',
					gdata: {lastpitch:'',lastheight:'',lastheightratio:''},			
					ld:null,  
					pid : tcurve.id,
					title: tcurve.id + ' circlular center : ' + Cc
				});
				marker.index = index;    
				tcurve.markers.insertAt(index, marker)

				var e3 = new google.maps.LatLng(Tcst),      
					image= new google.maps.MarkerImage(imgurlCcSt,
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3)), 
				index =3,
				marker = new google.maps.Marker({
					position: Tcst,
					map: map,
					icon: image,
					note: '', // any extra note 
					bdata: {height:'',pitch:''},
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
					lineX: '',
					gdata: {lastpitch:'',lastheight:'',lastheightratio:''},			
					ld:Ls,  
					pid : tcurve.id,
					title: tcurve.id + ' circlular start : ' + Tcst
				});
				marker.index = index;    
				tcurve.markers.insertAt(index, marker)

				var e4 = new google.maps.LatLng(Tced),      
					image= new google.maps.MarkerImage(imgurlCcSt,
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3)), 
				index =4,
				marker = new google.maps.Marker({
					position: Tced,
					map: map,
					icon: image,
					note: '', // any extra note 
					bdata: {height:'',pitch:''},
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
					lineX: '',
					gdata: {lastpitch:'',lastheight:'',lastheightratio:''},			
					ld:Ls + Lc,  
					pid : tcurve.id,
					title: tcurve.id + ' circlular end : ' + Tced
				});
				marker.index = index;    
				tcurve.markers.insertAt(index, marker)
			
			google.maps.event.addListener(tcurve, "click", function(mEvent){
				var infoWindowTxt = 'curve Id : ' + tcurve.id + '<br>total transition curve length : ' + (Math.round((Lc + 2 * Ls)*10000)/10000) + ' m';
				infoWindowTxt += '<br>total tangent from intersection : ' + (Math.round(TL*10000)/10000) + ' m';
				infoWindowTxt += '<br>spiral curve length Ls : ' + (Math.round(Ls*10000)/10000) + ' m';
				infoWindowTxt += '<br>circular curve length Lc : ' + (Math.round(Lc*10000)/10000) + ' m';
				infoWindowTxt += '<br>shift : ' + (Math.round(tcurve.shift*10000)/10000)  + ' m';
				infoWindowTxt += '<br>deflection angle Δ : ' + delta + '&deg;';
				infoWindowTxt += '<br>intersection angle θ : ' + thetaD + '&deg;';
				infoWindowTxt += '<br>Δs : ' + delta_Sd + '&deg;';
				infoWindowTxt += '<br>Δc : ' + delta_Cd + '&deg;';
				
				infoWindowTxt += '<br>Rc : ' + tcurve.Rc  + '&deg;';
				infoWindowTxt += '<br>cant : ' + tcurve.cant + ' mm';
				infoWindowTxt += '<br>Vd : ' + tcurve.Vd + ' km/h';

				var lat0 = mEvent.latLng.lat();
				var lng0 = mEvent.latLng.lng();
				
				infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="2"><tr>' + '<td width="24"><img src="images/remove line.png" width="20" height="20" title="Remove line" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\''+ tcurve.id + '\');"></td><td>&nbsp;&nbsp;</td>'; 
				
				infoWindowTxt += '<td width="24"><img src="images/line+point.png" width="20" height="20" title="Add new point to current line" style="cursor: pointer;" onclick="btnAddMarker2Polyline(\''+ tcurve.id + '\',\'' + lat0 + '\',\'' + lng0 + '\');"></td>';
						
				infoWindowTxt += '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
							
				infoWindowTxt += '<td><img src="images/sticky_note_pencil.png" title="Add Note" width="16" height="16" style="cursor: pointer;" onclick="curveNote(\'' + tcurve.id + '\');"></td>';
							
				infoWindowTxt += '<td><img src="images/xfce4_settings.png" title="Setting" width="16" height="16" style="cursor: pointer;" onclick="curveSetting(\'' + tcurve.id + '\');"></td>';

				infoWindowTxt += '</td></tr></table><br />';
				
				var infowindow = new google.maps.InfoWindow({
					content: infoWindowTxt,
					position: mEvent.latLng
				});
				
				infowindow.open(map);	
				
			});	

			$( "#mainload" ).progressbar({
				value: Math.round((i/(rowsData.length-1))*100)
			});
	
						
			//index=5;
			for (a=31; a<rd.length; a++) {
				var part = rd[a].split(';');
				
				//var latlng = new google.maps.LatLng(parseFloat(part[0]),parseFloat(part[1]));
				index = parseInt(part[2]);
				if (parseInt(part[2]) > 4) { btnAddMarker2Polyline(tcurve.id,parseFloat(part[0]),parseFloat(part[1])); }
				//MapToolbar.addPoint(latlng, tcurve, index);
				
				//bdata
				var bpart = part[8].split('§');
				//kdata
				var kpart = part[9].split('§');
				//gdata
				var gpart = part[10].split('§');
				//tcurve.markers.getAt(index).pid = ;
				//tcurve.markers.getAt(index).index = part[2];
				tcurve.markers.getAt(index).note = part[3].replace(',','-').replace('\n',' - ');
				tcurve.markers.getAt(index).ld = part[4];
				tcurve.markers.getAt(index).title = part[5];
				tcurve.markers.getAt(index).sline = part[6];
				tcurve.markers.getAt(index).lineX = part[7];
				
				//bdata
				tcurve.markers.getAt(index).bdata.height = bpart[0];
				tcurve.markers.getAt(index).bdata.pitch = bpart[1];

				//kdata
				if (kpart[0] != '') {
					tcurve.markers.getAt(index).kdata.bridge = kpart[0];
					var image0 = new google.maps.MarkerImage('images/bridge_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					tcurve.markers.getAt(index).setIcon(image0);	
				}
				if (kpart[1] != '') {
					tcurve.markers.getAt(index).kdata.overbridge = kpart[1];
					var image1 = new google.maps.MarkerImage('images/overbridge_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					tcurve.markers.getAt(index).setIcon(image1);	
				}

				tcurve.markers.getAt(index).kdata.river = kpart[2];

				if (kpart[3] != '') {
					tcurve.markers.getAt(index).kdata.ground = kpart[3];
					var image3 = new google.maps.MarkerImage('images/ground8.png',
						new google.maps.Size(8, 8),
						new google.maps.Point(0, 0),
						new google.maps.Point(4, 4));
					tcurve.markers.getAt(index).setIcon(image3);	
				} 
				if (kpart[4] != '') {
					tcurve.markers.getAt(index).kdata.flyover = kpart[4];
					var image4 = new google.maps.MarkerImage('images/flyover_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					tcurve.markers.getAt(index).setIcon(image4);	
				} 
				if (kpart[5] != '') {
					tcurve.markers.getAt(index).kdata.tunnel = kpart[5];
					var image5 = new google.maps.MarkerImage('images/tunnel_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					tcurve.markers.getAt(index).setIcon(image5); 	
				} 
				if (kpart[6] != '') {
					tcurve.markers.getAt(index).kdata.pole = kpart[6];
				
				} 
				if (kpart[7] != '') {
					tcurve.markers.getAt(index).kdata.dike = kpart[7];
					var image7 = new google.maps.MarkerImage('images/dike_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					tcurve.markers.getAt(index).setIcon(image7);	
				} 
				if (kpart[8] != '') {
					tcurve.markers.getAt(index).kdata.cut = kpart[8];
					var image8 = new google.maps.MarkerImage('images/hillcut_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					tcurve.markers.getAt(index).setIcon(image8);	
				} 
				if (kpart[9] != '') {
					tcurve.markers.getAt(index).kdata.underground = kpart[9];
				
				} 
				if (kpart[10] != '') {
					tcurve.markers.getAt(index).kdata.form = kpart[10];
					var image10 = new google.maps.MarkerImage('images/form_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					tcurve.markers.getAt(index).setIcon(image10);	
				} 
				if (kpart[11] != '') {
					tcurve.markers.getAt(index).kdata.roadcross = kpart[11];
					var image11 = new google.maps.MarkerImage('images/roadcross_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					tcurve.markers.getAt(index).setIcon(image11);	
				} 
				if (kpart[12] != '') {
					tcurve.markers.getAt(index).kdata.crack = kpart[12];
				
				} 
				if (kpart[13] != '') {
					tcurve.markers.getAt(index).kdata.beacon = kpart[13];
				
				}

				//gdata
				tcurve.markers.getAt(index).gdata.lastpitch = gpart[0];
				tcurve.markers.getAt(index).gdata.lastheight = gpart[1];
				tcurve.markers.getAt(index).gdata.lastheightratio = gpart[2];
				
				$( "#subload" ).progressbar({
					value: Math.round(((a-31)/(rd.length-1))*100)
				});
			}

		} 	
	
	}
	i++;

	if (i < rowsData.length) {		
		setTimeout(function() { processTCurve(rowsData, i); }, 50 );		
	} else {
		$( "#loadprocess" ).text('Loading : dotMarkers ...');	
		setTimeout(function() { processdotMarker(rowsData, 1); }, 50 );
	}	
}

function processshape(rowsData, i) {
	var rd = rowsData[i].split(",");
	var dname = rd[0];				    					
	if (rd[2] == 'shape') {
		var dahada = false;
		for(var cid in MapToolbar.features['shapeTab'] ) {
			if (MapToolbar.features['shapeTab'][cid].uid == rd[1]) {
				dahada = true;
				break;
			}
		}	
		if (!dahada) {
			/*
				teks += ',' + polyL.uid;
				teks += ',' + polyL.ptype;
				teks += ',' + polyL.note.replace(',','-').replace('\n',' - ');
				teks += ',' + polyL.name;
			*/	

			var poligon = null; 				
			MapToolbar.initFeature('shape');
			MapToolbar.stopEditing();
			var newPID = 'shape_'+ MapToolbar['shapeCounter'];
			poligon = MapToolbar.features["shapeTab"][newPID];
		/*
			teks += ',' + allPoints[i].lat() + ";" + allPoints[i].lng();
			
			teks += ';' + polyL.markers.getAt(i).kit;
			teks += ';' + polyL.markers.getAt(i).note.replace(',','-').replace('\n',' - ');		
		
		*/			
			if (typeof poligon != 'undefined') {
				poligon.uid = rd[1];
				poligon.ptype = rd[2];	
				poligon.note = rd[3];
				poligon.name = rd[4];
				
				$( "#mainload" ).progressbar({
					value: Math.round((i/(rowsData.length-1))*100)
				});
				for (a=5; a<rd.length; a++) {
					var part = rd[a].split(';');
					var latlng = new google.maps.LatLng(parseFloat(part[0]),parseFloat(part[1]));

					MapToolbar.addPoint(latlng, poligon, a-5);
					poligon.markers.getAt(a-5).kit = part[2];
					poligon.markers.getAt(a-5).note = part[3];
					$( "#subload" ).progressbar({
						value: Math.round((5/(rd.length-1))*100)
					});						
				}
			}						

		} 	
	}
	i++;

	if (i < rowsData.length) {		
		setTimeout(function() { processshape(rowsData, i); }, 50 );		
	} else {			
		//alert('3 - m(^_^)m ... done loading, thank you for waiting.');
		$( "#loadstatus" ).text('Reading polylines ...');
		$( "#loadprocess" ).text('Updating lines id reference ...');
		setTimeout(function() { lineXslineRef(); }, 100 );
	}	
}

function processdotMarker(rowsData, i) {
	var rd = rowsData[i].split(",");
	var dname = rd[0];				    					
	if (rd[2] == 'dotMarker') {
		var dahada = false;
		for(var cid in MapToolbar.features['dotMarkerTab'] ) {
			if (MapToolbar.features['dotMarkerTab'][cid].uid == rd[1]) {
				dahada = true;
				break;
			}
		}	
		if (!dahada) {
			/*
				teks += ',' + dotMarker.uid;
				teks += ',' + dotMarker.ptype;
				teks += ',' + dotMarker.note.replace(',','-');
				teks += ',' + dotMarker.iwref;			
			*/
			
			var pos = new google.maps.LatLng(parseFloat(rd[5].split(';')[0]), parseFloat(rd[5].split(';')[1]));

			var color = MapToolbar.getColor2(true),
			  marker = new google.maps.Marker({
				position: pos, 
				map: map, 
				draggable: true,
				flat: true
			}); 
					
			++MapToolbar["dotMarkerCounter"];
			marker.id = 'dotMarker_'+ MapToolbar["dotMarkerCounter"];
			marker.uid = rd[1]; //unique id  new feature start on 01/9/2014
			marker.ptype = rd[2];
			marker.note = rd[3];
			marker.iwref = rd[4];
			marker.$el = MapToolbar.addFeatureEntry(marker.id);	     
			MapToolbar.updateMarker(marker, marker.$el, color);
			MapToolbar.features['dotMarkerTab'][marker.id] = marker;

			google.maps.event.addListener(marker, "dragend", function() {
				MapToolbar.updateMarker(marker, marker.$el);
			}); 
			
			google.maps.event.addListener(marker, "click", function(mEvent){
				//alert(mEvent.latLng.toString());
				var DegMinSec = DecInDeg(mEvent.latLng);
				var infoWindowTxt = 'Marker Id : ' + marker.id;
				infoWindowTxt += '<br />' + 'Location : ';
				//infoWindowTxt += '<br />' + mEvent.latLng.toString() + '<br />';
				infoWindowTxt += DegMinSec + '<br />';
				//var lat0 = mEvent.latLng.lat();
				//var lng0 = mEvent.latLng.lng();
				
				infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="3"><tr><td>';
				infoWindowTxt += '<img src="images/marker_remove.png" title="Remove marker" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\'' + marker.id + '\');">' + 'Remove' + '</td><td>&nbsp;</td><td>';
				infoWindowTxt += '<img src="images/note_todo_list.png" title="Properties" width="16" height="16" style="cursor: pointer;" onclick="alert(\'No code defined, this feature still not yet planned.\');">' + 'Properties' + '</td><td>&nbsp;</td>';
		 
				infoWindowTxt += '</tr></table>';
				var infowindow = new google.maps.InfoWindow({
					content: infoWindowTxt,
					position: mEvent.latLng
				});
				
				infowindow.open(map);		
			});			
				
		} 
	}
	i++;
	
	$( "#mainload" ).progressbar({
		value: Math.round((i/(rowsData.length-1))*100)
	});
	$( "#subload" ).progressbar({
		value: 0
	});	
	if (i < rowsData.length) {		
		setTimeout(function() { processdotMarker(rowsData, i); }, 50 );		
	} else {	
		$( "#loadprocess" ).text('Loading : rectangles ...');	
		setTimeout(function() { processrectangle(rowsData, 1); }, 50 );
	}	
	
}

function processrectangle(rowsData, i) {
	var rd = rowsData[i].split(",");
	var dname = rd[0];				    					
	if (rd[2] == 'rectangle') {
		var dahada = false;
		for(var cid in MapToolbar.features['rectangleTab'] ) {
			if (MapToolbar.features['rectangleTab'][cid].uid == rd[1]) {
				dahada = true;
				break;
			}
		}	
		if (!dahada) {
			/*
				teks += ',' + rectangle.uid;
				teks += ',' + rectangle.ptype;
				teks += ',' + rectangle.note.replace(',','-');
				teks += ',' + rectangle.iwref;												
				teks += ',' + rectangle.data;
										
				teks += ',' + sw.lat() + ';' + sw.lng() + ',' + ne.lat() + ';' + ne.lng() + "\n";
			*/		
			
			var sw = new google.maps.LatLng(parseFloat(rd[6].split(';')[0]), parseFloat(rd[6].split(';')[1]));
			var ne = new google.maps.LatLng(parseFloat(rd[7].split(';')[0]), parseFloat(rd[7].split(';')[1]));
			var latLngBounds = new google.maps.LatLngBounds(sw, ne);
			
			var rect = new google.maps.Rectangle({
				strokeColor: MapToolbar.getColor(true),
				strokeOpacity: 0.8,
				strokeWeight: 1,
				bounds: latLngBounds,
				map: map,
				editable: true,
				fillOpacity: 0.0
			}),
			el = "rectangle_b";
				
				
			++MapToolbar["rectangleCounter"];
			 
			rect.id = 'rectangle_'+ MapToolbar["rectangleCounter"];
			rect.uid = rd[1]; //unique id  new feature start on 01/9/2014
			rect.ptype = 'rectangle';		
			rect.note = rd[3];
			rect.iwref = rd[4];
			rect.data = rd[5];
			rect.$el = MapToolbar.addFeatureEntry(rect.id);  	
			MapToolbar.features["rectangleTab"][rect.id] = rect;
			
			google.maps.event.addListener(rect, "click", function(mEvent){
				//alert(mEvent.latLng.toString());
				var sw = rect.getBounds().getSouthWest();
				var ne = rect.getBounds().getNorthEast();
								
				var trpoly = []; 
					
				trpoly.push(ne);
				trpoly.push(new google.maps.LatLng(ne.lat(), sw.lng()));
				trpoly.push(sw);
				trpoly.push(new google.maps.LatLng(sw.lat(), ne.lng()));
					
				var area = google.maps.geometry.spherical.computeArea(trpoly);
				var rheight = google.maps.geometry.spherical.computeDistanceBetween(ne, new google.maps.LatLng(sw.lat(), ne.lng()));
				var rwidth = google.maps.geometry.spherical.computeDistanceBetween(ne, new google.maps.LatLng(ne.lat(), sw.lng()));
				
				var infoWindowTxt = 'Rectangle Id : ' + rect.id + '<br />' + 'Area : ';
				var lat0 = mEvent.latLng.lat();
				var lng0 = mEvent.latLng.lng();
		
				if (area < 1000) {
					infoWindowTxt += area.toFixed(2) + ' m' + String.fromCharCode(178) ;
				} else {
					infoWindowTxt += (area/1000).toFixed(2) + ' km' + String.fromCharCode(178) ;
				}	
	
				infoWindowTxt += '<br />' + 'Width : ';
				
				if (rwidth < 1000) {
					infoWindowTxt += rwidth.toFixed(2) + ' m';
				} else {
					infoWindowTxt += (rwidth/1000).toFixed(6) + ' km';
				}
		
				infoWindowTxt += '<br />' + 'Height : ';
				
				if (rheight < 1000) {
					infoWindowTxt += rheight.toFixed(2) + ' m.';
				} else {
					infoWindowTxt += (rheight/1000).toFixed(6) + ' km.';
				}
				
				infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="3"><tr><td>';
				//infoWindowTxt += '<img src="images/rectangle_edit.png" title="Edit rectangle" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.setMapCenter(\'' + rect.id + '\');">' + 'Edit' + '</td><td>';
				infoWindowTxt += '<img src="images/rectangle_remove.png" title="Remove rectangle" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\'' + rect.id + '\');">' + 'Remove' + '</td><td>';
				infoWindowTxt += '<img src="images/note_todo_list.png" title="Properties" width="20" height="20" style="cursor: pointer;" onclick="alert(\'No code defined, this feature still not yet planned.\');">' + 'Properties' + '</td></tr></table>';

				var infowindow = new google.maps.InfoWindow({
				  content: infoWindowTxt,
					position: mEvent.latLng
				});
			
				infowindow.open(map);    
					//alert("Area : " + area + "\nWidth : " + rwidth + "\nHeight : " + rheight);
			});	
		}		
	}
	
	i++;
	
	$( "#mainload" ).progressbar({
		value: Math.round((i/(rowsData.length-1))*100)
	});
	$( "#subload" ).progressbar({
		value: 0
	});
	if (i < rowsData.length) {		
		setTimeout(function() { processrectangle(rowsData, i); }, 50 );		
	} else {			
		$( "#loadprocess" ).text('Loading : circles ...');	
		setTimeout(function() { processcircle(rowsData, 1); }, 50 );
	}	
}

function processcircle(rowsData, i) {
	var rd = rowsData[i].split(",");
	var dname = rd[0];				    					
	if (rd[2] == 'circle') {
		var dahada = false;
		for(var cid in MapToolbar.features['circleTab'] ) {
			if (MapToolbar.features['circleTab'][cid].uid == rd[1]) {
				dahada = true;
				break;
			}
		}	
		if (!dahada) {
			/*
				teks += ',' + circle.uid;
				teks += ',' + circle.ptype;
				teks += ',' + circle.note.replace(',','-');
				teks += ',' + circle.iwref;
										
				teks += ',' + radius + ',' + center.lat() + ';' + center.lng() + "\n";
			*/		
			var radius = parseFloat(rd[5]);
			var pusat = new google.maps.LatLng(parseFloat(rd[6].split(';')[0]), parseFloat(rd[6].split(';')[1]));
			
			var bulat = new google.maps.Circle({
				strokeColor: MapToolbar.getColor(true),
				strokeOpacity: 0.8,
				strokeWeight: 1,
				editable: true,
				map: map,
				fillOpacity: 0.0,
				center: pusat,
				radius: radius
			}),
			el = "circle_b";
			
			++MapToolbar["circleCounter"];
			 
			bulat.id = 'circle_'+ MapToolbar["circleCounter"];
			bulat.uid = rd[1]; //unique id  new feature start on 01/9/2014
			bulat.ptype = 'circle';
			bulat.note = rd[3];
			bulat.iwref = rd[4];
			bulat.$el = MapToolbar.addFeatureEntry(bulat.id);  	
			MapToolbar.features["circleTab"][bulat.id] = bulat;		 		

			   
			google.maps.event.addListener(bulat, "click", function(mEvent){		
				var infoWindowTxt = 'Circle Id : ' + bulat.id + '<br />' + 'Area : ';
				var lat0 = mEvent.latLng.lat();
				var lng0 = mEvent.latLng.lng();

				var area = Math.PI * bulat.getRadius() * bulat.getRadius();
				var radius = bulat.getRadius();
				var pusat = DecInDeg(bulat.getCenter());
				
				if (area < 1000) {
					infoWindowTxt += area.toFixed(2) + ' m' + String.fromCharCode(178) ;
				} else {
					infoWindowTxt += (area/1000).toFixed(2) + ' km' + String.fromCharCode(178) ;
				}	
			
				infoWindowTxt += '<br />' + 'Radius : ';
						
				if (radius < 1000) {
					infoWindowTxt += radius.toFixed(2) + ' m.';
				} else {
					infoWindowTxt += (radius/1000).toFixed(6) + ' km.';
				}
				 
				infoWindowTxt += '<br />' + 'Center : ' + pusat;
				
				infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="3"><tr><td>';
				//infoWindowTxt += '<img src="images/circle-edit.png" title="Edit circle" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.setMapCenter(\'' + bulat.id + '\');">' + 'Edit' + '</td><td>';
				infoWindowTxt += '<img src="images/circle-remove.png" title="Remove circle" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\'' + bulat.id + '\');">' + 'Remove' + '</td><td>';
				infoWindowTxt += '<img src="images/note_todo_list.png" title="Properties" width="20" height="20" style="cursor: pointer;" onclick="alert(\'No code defined, this feature still not yet planned.\');">' + 'Properties' + '</td></tr></table>';
			
				 var infowindow = new google.maps.InfoWindow({
						content: infoWindowTxt,
						position: mEvent.latLng
				 });
			
				 infowindow.open(map);  	    		
			});		
		}		
	}
	i++;

	$( "#mainload" ).progressbar({
		value: Math.round((i/(rowsData.length-1))*100)
	});
	$( "#subload" ).progressbar({
		value: 0
	});
	if (i < rowsData.length) {		
		setTimeout(function() { processcircle(rowsData, i); }, 50 );		
	} else {
		$( "#loadprocess" ).text('Loading : polygons ...');	
		setTimeout(function() { processshape(rowsData, 1); }, 50 );
	}	
	
}

function lineXslineRef() {
	var linekey = [];
	for (oName in MapToolbar.features['lineTab']) {
		linekey.push(oName);		
	}
	$( "#mainload" ).progressbar({
		value: 0
	});
	$( "#subload" ).progressbar({
		value: 0
	});		
	setTimeout(function() { sline_key(linekey,0); }, 100);
	//alert('m(^_^)m ... done loading, thank you for waiting. (4)');
}

function sline_key(linekey,k) {
	if (typeof MapToolbar.features["lineTab"][linekey[k]] != 'undefined') {
		var polyL = MapToolbar.features["lineTab"][linekey[k]];	
		$( "#mainload" ).progressbar({
			value: Math.round((k/(linekey.length-1))*100)
		});		
		setTimeout(function() { sline_upd(polyL,0,polyL.markers.getAt(0).sline,linekey,k); }, 100);	
		
	} else {
		k++;
		if (k < linekey.length) {

			setTimeout(function() { sline_key(linekey,k); }, 100);		
		} else {
			alert('m(^_^)m ... done loading, thank you for waiting.');
			//$( "#loadprocess" ).text('Finish.');
			$('#dialogLoadingData').dialog('close');
		}
	}
}

function sline_upd(polyL,i,sline,linekey,k) {
	if (sline != '') {
		var slineArr = sline.split('¤');
		polyL.markers.getAt(i).sline = '';
		
		for (s=0; s<slineArr.length; s++) {
			var snewId = '';
			var slinepart = slineArr[s].split(':');
			for (r=0;r<oldnewid.length;r++) {
				if (oldnewid[r][0] == slinepart[0]) {
					snewId = slinepart[0].replace(oldnewid[r][0],oldnewid[r][2]);
					break;
				}									
			}
			
			if (snewId !='') {
				if (polyL.markers.getAt(i).sline == '') {
					polyL.markers.getAt(i).sline +=  snewId + ':' + slinepart[1] + ':' + slinepart[2] + ':' + slinepart[3];
				} else {
					polyL.markers.getAt(i).sline += '¤' + snewId + ':' + slinepart[1] + ':' + slinepart[2] + ':' + slinepart[3];
				}
			} else {
				if (polyL.markers.getAt(i).sline == '') {
					polyL.markers.getAt(i).sline +=  slineArr[s];
				} else {
					polyL.markers.getAt(i).sline += '¤' + slineArr[s];
				}			
			}		
		}
	
	}

	i++
	if (i < polyL.markers.length) {
		$( "#subload" ).progressbar({
			value: Math.round((i/(polyL.markers.length-1))*100)
		});			
		setTimeout(function() { sline_upd(polyL,i,polyL.markers.getAt(i).sline,linekey,k); }, 100);
	} else {
		setTimeout(function() { sline_key(linekey,k+1); }, 100);
	}
}


//old data processing for backward compatibility

function processoldPolylineID(rowsData, i) {
	if(i < rowsData.length) {
		if (rowsData[i] != '') {
			//line_1,ptype,note,name,route,trackno,tracksection,trackbve,kit, 3.6975060399011115;101.50496006011963;note;pitch;bve;kit, ...
			var rd = rowsData[i].split(",");
			var dname = rd[0];				    					
			var otype = dname.split("_")[0];
			if (otype == 'line') {

				var loadPoly = null;
				MapToolbar.initFeature('line');
				MapToolbar.stopEditing(); 														
				var newPid = 'line_' + MapToolbar['lineCounter'];
				loadPoly = MapToolbar.features["lineTab"][newPid];
				
				if (typeof loadPoly != 'undefined') {
		
					if (rd[1] != '') { loadPoly.ptype = rd[1]; } else { loadPoly.ptype = ''; }
					if (rd[2] != '') { loadPoly.note = rd[2]; } else { loadPoly.note = ''; }
					if (rd[3] != '') { loadPoly.name = rd[3]; } else { loadPoly.name = ''; }
					if (rd[4] != '') { loadPoly.route = rd[4]; } else { loadPoly.route = ''; }
					//if (rd[5] != '') { loadPoly.trackno = rd[5]; } else { loadPoly.trackno = ''; }
					//if (rd[6] != '') { loadPoly.tracksection = rd[6]; } else { loadPoly.tracksection = ''; }
					//if (rd[7] != '') { loadPoly.trackbve = rd[7]; } else { loadPoly.trackbve = ''; }
					//if (rd[8] != '') { loadPoly.kit = rd[8]; } else { loadPoly.kit = ''; }
					
					$( "#mainload" ).progressbar({
						value: Math.round((i/(rowsData.length-1))*100)
					});
					$( "#subload" ).progressbar({
						value: Math.round((9/(rd.length-1))*100)
					});	
									
					setTimeout(function() { ReloadPolyline(loadPoly, rd, 9, rowsData, i); }, 100); 
				} else {
					setTimeout(function() { processoldPolylineID(rowsData, i+1); }, 100); 
				}
			} else {
				setTimeout(function() { processoldPolylineID(rowsData, i+1); }, 100);
			}
		} else {
			setTimeout(function() { processoldPolylineID(rowsData, i+1); }, 100);
		}
	} else {
		alert('m(^_^)m ... done loading, thank you for waiting.');
		//$( "#loadprocess" ).text('Finish.');
		$('#dialogLoadingData').dialog('close');
	
	}
}

function ReloadPolyline (loadPoly,rd, n, rowsData, i, quickScan) { 				    		
//poly marker coordinate start at 9

	var xD = rd[n].split(";");
	MapToolbar.addPoint(new google.maps.LatLng(xD[0], xD[1]), loadPoly, n-9);	
  
	if (xD[2] != '') { 
			loadPoly.markers.getAt(n-9).note = xD[2]; 
	} else {
		loadPoly.markers.getAt(n-9).note = ''; 
	} 
	/*
	if (xD[3] != '') {
		loadPoly.markers.getAt(n-9).pitch = xD[3]; 
	} else {
		loadPoly.markers.getAt(n-9).pitch = ''; 
	} 
	if (xD[4] != '') {
		loadPoly.markers.getAt(n-9).bdata = xD[4]; 
	} else {
		loadPoly.markers.getAt(n-9).bdata = ''; 
	} 
	
	if (xD[5] != '') {		
		loadPoly.markers.getAt(n-9).kit = xD[5]; 	
		if ((xD[5].indexOf('lastheight:') >=0) || (xD[5].indexOf('lastpitch:') >=0) || (xD[5].indexOf('lastheightratio:') >=0)) {
			loadPoly.markers.getAt(n-9).setIcon("images/marker_squared_edit.png");	
		}		
	} else {
		loadPoly.markers.getAt(n-9).kit = ''; 
	} */
	if (xD[6] != '') {
		//loadPoly.markers.getAt(n-9).curve = xD[6]; 
		//4 old prototype data
			/* 
			0	' curve:'+ curve.id + 
			1 '§radius:' + preR * dir + 
			2	'§cant:' + parseFloat($('#sBtnRCCant').val()) + 
			3	'§limit:' + parseFloat($('#sBtnRCDesignSpeed').val()) + 
			4	'§tlength:' + l2m1 + 
			5	'§clength:' + arcL + 
			6	'§center:' + Cc.lat() + '/' + Cc.lng() + 
			7	'§start_point:' + extp[0].lat() + '/' + extp[0].lng() + 
			8	'§end_point:' + extp[extp.length-1].lat() + '/' + extp[extp.length-1].lng()  + 
			9	'§h1:' + h1 + 
			10	'§h2:' + h2 + 
			11	'§forceSL:' + enforceSL; 
			*/
			
			var cuvarr = xD[6].split('§');
			var uid = rd[1];
			var ptype = 'curve';
			var pid = loadPoly.id;
			var mid = n-9;
			var Rc = parseFloat(cuvarr[1].split(':')[1]);
			var cant = parseFloat(cuvarr[2].split(':')[1]);
			var Vd = parseFloat(cuvarr[3].split(':')[1]);
			var Lt = parseFloat(cuvarr[4].split(':')[1]);
			var Lc = parseFloat(cuvarr[5].split(':')[1]);
			var Cc = new google.maps.LatLng(parseFloat(cuvarr[6].split(':')[1].split('/')[0]), parseFloat(cuvarr[6].split(':')[1].split('/')[1]));
			var st = new google.maps.LatLng(parseFloat(cuvarr[7].split(':')[1].split('/')[0]), parseFloat(cuvarr[7].split(':')[1].split('/')[1]));
			var ed = new google.maps.LatLng(parseFloat(cuvarr[8].split(':')[1].split('/')[0]), parseFloat(cuvarr[8].split(':')[1].split('/')[1]));
			var h1 = parseFloat(cuvarr[9].split(':')[1]);
			var h2 = parseFloat(cuvarr[10].split(':')[1]);
			var forceSL = (cuvarr[11].split(':')[1] == 'true')? true:false;
			
			var fic = intersection_angle(h1,h2);
			var theta = fic.angle;
			var delta = 180-theta ;
			
			var railIndex = 0;
			var route = '';
		
			var dir = (Rc < 0) ? -1: 1;
			var preR = Math.abs(Rc);

			var points = Math.ceil(Lc/25);
			var iB = google.maps.geometry.spherical.computeHeading(Cc,st);
			var fB = google.maps.geometry.spherical.computeHeading(Cc,ed);

			var extp = [];
			var br = null;
				
			br = fB - iB;
				
			if (br >  180) {br -= 360;}
			if (br < -180) {br += 360;}

			var deltaBearing = br/points;
		
			for (var b=0; (b < points+1); b++) {     
				extp.push(google.maps.geometry.spherical.computeOffset(Cc, preR, iB + b*deltaBearing)); 
			}
								
			var curve = new google.maps.Polyline({
				path: extp,
				strokeColor: "#FF0000",
				strokeOpacity: 0.7,
				geodesic: true,
				map: map,
				strokeWeight: 1
			});
			//curve.setMap(map);
			
			++MapToolbar["curveCounter"];
			curve.id = 'curve_'+ MapToolbar["curveCounter"];
			curve.pid = pid;
			curve.ptype = ptype;
			curve.uid = uid; //unique id - new feature start on 01/9/2014
			curve.mid = mid;
			curve.Rc = Rc * dir,
			curve.cant = cant;
			curve.Vd = Vd;
			curve.Lt = Lt;
			curve.Lc = Lc;
			curve.Cc = Cc;
			curve.st = st;
			curve.ed = ed;
			curve.h1 = h1;
			curve.h2 = h2;
			curve.forceSL = forceSL;
			curve.delta = delta;
			curve.theta = theta;
			curve.railindex = railIndex;
			curve.route = route;
			curve.$el = MapToolbar.addFeatureEntry(curve.id);
			curve.markers = new google.maps.MVCArray;	     
			MapToolbar.features['curveTab'][curve.id] = curve;
							
			MapToolbar.features["lineTab"][pid].markers.getAt(mid).bdata.curve = curve.id ;
			MapToolbar.features["lineTab"][pid].markers.getAt(mid).setDraggable(false);
													
			var imgurl = "images/curve-sign.png";
			var imgurl2 = "images/curve-sign2.png";
			var imgccurl = "images/bullet_white.png";
 
			var e1 = st,      
				image = new google.maps.MarkerImage(imgurl,
				new google.maps.Size(6, 6),
				new google.maps.Point(0, 0),
				new google.maps.Point(5, 5)), 
				index =0,
				marker = new google.maps.Marker({
					position: st,
					map: map,
					icon: image,
					title: '' ,
					note: '', // any extra note 
					bdata: {height:'',pitch:''},
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
					lineX: '',
					gdata: {lastpitch:'',lastheight:'',lastheightratio:''},
					ld:0, // distance on circumference from curve start point 
					pid:curve.id
				});

				marker.index = index;    
				curve.markers.insertAt(index, marker);
				curve.markers.getAt(index).title = curve.id + ' start point : ' + st;	

			var e2 = ed,      
				image= new google.maps.MarkerImage(imgurl2,
					new google.maps.Size(6, 6),
					new google.maps.Point(0, 0),
					new google.maps.Point(5, 5)), 
				index =1,
				marker = new google.maps.Marker({
					position: ed,
					map: map,
					icon: image,
					note: '', // any extra note 
					bdata: {height:'',pitch:''},
					title: '',
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
					lineX: '',
					gdata: {lastpitch:'',lastheight:'',lastheightratio:''},
					ld:Lc, // distance on circumference from curve start point 
					pid:curve.id
				});
				marker.index = index;    
				curve.markers.insertAt(index, marker);
				curve.markers.getAt(index).title = curve.id + ' end point : ' + ed;	
				
			var ec = Cc,      
				image= new google.maps.MarkerImage(imgccurl,
					new google.maps.Size(6, 6),
					new google.maps.Point(0, 0),
					new google.maps.Point(3, 3)), 
				index =2,
				marker = new google.maps.Marker({
					position: Cc,
					map: map,
					icon: image,
					note: '', // any extra note 
					bdata: {height:'',pitch:''},
					title: curve.id + ' center point : ' + Cc,
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
					lineX: '',
					gdata: {lastpitch:'',lastheight:'',lastheightratio:''},
					ld:null, // distance on circumference from curve start point 
					pid:curve.id
				});
			marker.index = index;    
			curve.markers.insertAt(index, marker);
			//curve.markers.getAt(index).title = curve.id + ' center point : ' + Cc;
	
			google.maps.event.addListener(curve, "click", function(mEvent){
				var infoWindowTxt = 'curve Id : ' + curve.id + '(' + uid + ')';
				infoWindowTxt += '<br><br>line id : ' + pid + ' mid : ' + mid; 
				infoWindowTxt += '<br>radius : ' + Rc + 'm<br>design speed : ' + Vd + ' km/h<br>cant : ' + cant + ' mm' + '<br>curve length : ' + (Math.round(Lc*10000)/10000) + '<br>tangent length : ' + (Math.round(Lt*10000)/10000) + ' m<br>';

				var lat0 = mEvent.latLng.lat();
				var lng0 = mEvent.latLng.lng();
				
				infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="2"><tr>' + '<td width="24"><img src="images/remove line.png" width="20" height="20" title="Remove line" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\''+ curve.id + '\');"></td><td>&nbsp;&nbsp;</td>'; 

				infoWindowTxt += '<td width="24"><img src="images/line+point.png" width="20" height="20" title="Add new point to current line" style="cursor: pointer;" onclick="btnAddMarker2Polyline(\''+ curve.id + '\',\'' + lat0 + '\',\'' + lng0 + '\');"></td>';
		
				infoWindowTxt += '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
			
				infoWindowTxt += '<td><img src="images/sticky_note_pencil.png" title="Add Note" width="16" height="16" style="cursor: pointer;" onclick="curveNote(\'' + curve.id + '\');"></td>';
			
				infoWindowTxt += '<td><img src="images/xfce4_settings.png" title="Setting" width="16" height="16" style="cursor: pointer;" onclick="curveSetting(\'' + curve.id + '\');"></td>';
			
				infoWindowTxt += '</tr></table>';    			
	
				var infowindow = new google.maps.InfoWindow({
					content: infoWindowTxt,
					position: mEvent.latLng
				});

				infowindow.open(map);	

			});					
	} 
	/*
	if (xD[7] != '') {
		loadPoly.markers.getAt(n-9).tcurve = xD[7]; 
	} else {
		loadPoly.markers.getAt(n-9).tcurve = ''; 
	}

	if (xD[8] != '') {
		loadPoly.markers.getAt(n-9).lineX = xD[8]; 
	} else {
		loadPoly.markers.getAt(n-9).lineX = ''; 
	} 
	
	if (xD[9] != '') {
		loadPoly.markers.getAt(n-9).turn = xD[9]; 
	} else {
		loadPoly.markers.getAt(n-9).turn = ''; 
	}
	
	if (xD[10] != '') {
		loadPoly.markers.getAt(n-9).sline = xD[10]; 
	} else {
		loadPoly.markers.getAt(n-9).sline = ''; 
	}
*/
											
	n++;
	
	if(n < rd.length) {
		$( "#subload" ).progressbar({
			value: Math.round((n/(rd.length-1))*100)
		});		
		setTimeout(function() { ReloadPolyline(loadPoly,rd, n, rowsData, i); }, 150);	
	} else {
		setTimeout(function() { processoldPolylineID(rowsData, i+1); }, 100);	
	}
}
