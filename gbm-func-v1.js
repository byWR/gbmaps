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
last update : 04 July 2014 07:01am (GMT 8+)

*/

var currMarker = null;
var newPoly = null;
var currMod = '';
var wd = 0;
var data = null;
var defaultGauge = (typeof $.cookie('defaulGauge') != 'undefined') ? parseInt($.cookie('defaulGauge')) : 1067;
var defaultCant = (typeof $.cookie('defaulCant') != 'undefined') ? parseInt($.cookie('defaulCant')) : 0;
var devID = $.cookie('developerID');

function btnAddMarker2Polyline(polyid,tmpLat,tmpLng) {
	// by : Karya IT (Mac 2012) 
	// based on : http://jsfiddle.net/kjy112/NRafz/
	// url : http://www.karyait.net.my/
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
	// url : http://www.karyait.net.my/
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
	// url : http://www.karyait.net.my/
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
			if (poly2split.markers.getAt(i).sline != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).sline = poly2split.markers.getAt(i).sline;}
			if (poly2split.markers.getAt(i).pid != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).pid = pno;}
			 
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
				if (poly2split.markers.getAt(i).sline != null) {MapToolbar.features["lineTab"][pno].markers.getAt(j+1).sline = poly2split.markers.getAt(i).sline;}
				if (poly2split.markers.getAt(i).pid != null) {MapToolbar.features["lineTab"][pno].markers.getAt(j+1).pid = pno;}			
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
	// url : http://www.karyait.net.my/
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
				if (poly1.markers.getAt(i).sline != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).sline = poly1.markers.getAt(i).sline;}
				if (poly1.markers.getAt(i).pid != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).pid = pno;}	
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
					if (poly2.markers.getAt(i).sline != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).sline = poly2.markers.getAt(i).sline;}
					if (poly2.markers.getAt(i).pid != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).pid = pno;}						
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
	if (pid !== undefined) {
		var poly = null;
		if (MapToolbar.features["lineTab"][pid] != null) {
			poly = MapToolbar.features["lineTab"][pid];
			
			var polyPath = poly.getPath().getArray();
			var tmpEP = new Array(3);			
			
			MapToolbar.initFeature('line');
	 		MapToolbar.stopEditing();
			
			var no = MapToolbar['lineCounter'];
			var pno = 'line_' + no;
			var polyR = MapToolbar.features["lineTab"][pno];
			
			for (var i = 0; i < polyPath.length ; i++) {
				var tmpL = polyPath[polyPath.length-1-i];
				MapToolbar.addPoint(tmpL, polyR, i); 
			}
						
			for (var i = polyPath.length-1; i >= 0; i--) {
				if (poly.markers.getAt(i).note != '') {polyR.markers.getAt(polyPath.length-1-i).note = poly.markers.getAt(i).note;}  
				
				$.each(poly.markers.getAt(i).bdata, function(key, value){
					if (poly.markers.getAt(i).bdata[key] != '') {
						polyR.markers.getAt(polyPath.length-1-i).bdata.key = poly.markers.getAt(i).bdata[key];
					}
				});

				$.each(poly.markers.getAt(i).kdata, function(key, value){
					if (poly.markers.getAt(i).kdata[key] != '') {
						polyR.markers.getAt(polyPath.length-1-i).kdata.key = poly.markers.getAt(i).kdata[key];
					}
				});	

				if (poly.markers.getAt(i).bdata.curve != '') {
					polyR.markers.getAt(polyPath.length-1-i).bdata.curve = poly.markers.getAt(i).bdata.curve;				
					var cid = poly.markers.getAt(i).bdata.curve; 
					MapToolbar.features['curveTab'][cid].pid = pno;
					MapToolbar.features['curveTab'][cid].mid = polyPath.length-1-i;
					poly.markers.getAt(i).bdata.curve = '';
				} 
				if (poly.markers.getAt(i).bdata.tcurve != '') {
					polyR.markers.getAt(polyPath.length-1-i).bdata.tcurve = poly.markers.getAt(i).bdata.tcurve;
					var cid = poly.markers.getAt(i).bdata.tcurve; 
					MapToolbar.features['tcurveTab'][cid].pid = pno;
					MapToolbar.features['tcurveTab'][cid].mid = polyPath.length-1-i;
					poly.markers.getAt(i).bdata.tcurve = '';
				} 
				if (poly.markers.getAt(i).sline != null) {polyR.markers.getAt(polyPath.length-1-i).sline = poly.markers.getAt(i).sline;}
				if (poly.markers.getAt(i).pid != null) {polyR.markers.getAt(polyPath.length-1-i).pid = pno;}	
			}
	
			MapToolbar.removeFeature(poly.id);
			polyR = null;					
		}
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
	// url : http://www.karyait.net.my/
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
						
						if (startOffset != null) {
							MapToolbar.addPoint(polyPath[i-1], newPoly, 0);
							var odml = google.maps.geometry.spherical.computeOffset(polyPath[i-1], stSwlength, h1);
							platLng = google.maps.geometry.spherical.computeOffset(odml, offset, h1 +  side);
							MapToolbar.addPoint(platLng, newPoly, 1);
							
							//new format 4 v1.0.0
							newPoly.markers.getAt(0).lineX = polyid + ':' + side + ':' + startOffset + ':' + stSwlength + ':0';
							newPoly.markers.getAt(1).lineX = polyid + ':' + side + ':' + offset + '::';
						} else {
							platLng = google.maps.geometry.spherical.computeOffset(polyPath[i-1], offset, h1 +  side);
							MapToolbar.addPoint(platLng, newPoly, 0);
							//new format 4 v1.0.0
							newPoly.markers.getAt(0).lineX = polyid + ':' + side + ':' + offset + '::0';
						}
						// data format lineX = (base line):(side direction):(offset distance):(switch length opsyenal)

						
						if (polyBaseLine.markers.getAt(i-1).sline == '') {
							polyBaseLine.markers.getAt(i-1).sline = newPoly.id + ':0:' + 0;
						} else {
							polyBaseLine.markers.getAt(i-1).sline += ',' + newPoly.id + ':0:' + 0;
						}
						// data format sline = '(side line 1):(0=start,>0 end):index,(side line 1):(0=start,>0 end):index,,,,....';
						
						polyBaseLine.markers.getAt(i-1).setDraggable(false);
	 				}
					
					if (i == eP) {
						//2do : double check 14/12/2012	
						var endOffset = null;
						if (document.getElementById('plswAtEnd').checked) { endOffset = 0; }
						var edSwlength = null;
						if (document.getElementById('plswAtEnd').checked) { edSwlength = parseFloat($('#pLedSwLength').val()); }
		 						 				
		 				if (endOffset != null) {
							var odml = google.maps.geometry.spherical.computeOffset(polyPath[i], -edSwlength, h1);
														
							platLng = google.maps.geometry.spherical.computeOffset(odml, offset, h1 +  side);
							var plength = newPoly.markers.length;
							MapToolbar.addPoint(platLng, newPoly, plength);
		 					MapToolbar.addPoint(polyPath[i], newPoly, plength+1);
							
							//new format 4 v1.0.0
							newPoly.markers.getAt(newPoly.markers.length-2).lineX = polyid + ':' + side + ':' + offset + '::';
							newPoly.markers.getAt(newPoly.markers.length-1).lineX = polyid + ':' + side + ':' + endOffset + ':' + edSwlength + ':1';
								
						} else {
							platLng = google.maps.geometry.spherical.computeOffset(polyPath[i], offset, h1 + side);
		 					MapToolbar.addPoint(platLng, newPoly, newPoly.markers.length);	
							//new format 4 v1.0.0
							newPoly.markers.getAt(newPoly.markers.length-1).lineX = polyid + ':' + side + ':' + offset + '::1';
						}
							
						if (polyBaseLine.markers.getAt(i).sline == '') {
							polyBaseLine.markers.getAt(i).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							polyBaseLine.markers.getAt(i).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}
						// data format sline = '(side line 1):(0=start,>0 end):index,(side line 1):(0=start,>0 end):index,,,,....';
						
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
			var path = new Array();
			var gnote = new Array();    	   	
    	
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
						/*	if (key = 'lastpitch') {
								pit = epoly.markers.getAt(k).gdata[key];
							} 
							if (key = 'lastheight') {
								if (bdata == '') {
									bdata = "height:" + epoly.markers.getAt(k).gdata[key];
								} else {
									bdata += "§height:" + epoly.markers.getAt(k).gdata[key];
								}
							}	*/						
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

					var extp = new Array();
					var br = null;
				
					br = fB - iB;
				
					if (br >  180) {br -= 360;}
					if (br < -180) {br += 360;}
				
					var deltaBearing = br/points;
				
					for (var i=0; (i < points+1); i++) {     
						extp.push(google.maps.geometry.spherical.computeOffset(Cc, Rc, iB + i*deltaBearing)); 
					}
										
					var color = MapToolbar.getColor(true),
					curve = new google.maps.Polyline({
						path: [extp],
						strokeColor: "#FF0000",
						strokeOpacity: 0.7,
						geodesic: true,
						map: map,
						strokeWeight: 1
					});
					
					++MapToolbar["curveCounter"];
					curve.id = 'curve_'+ MapToolbar["curveCounter"];
					curve.pid = polyL.id;
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
					MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx-1).setDraggable(false);
					MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx+1).setDraggable(false);
															
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
					bdata: {height:'',pitch:''},
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
					sline: '',
				
					ld:null, // distance on circumference from curve start point 
					pid:curve.id
	        });
	        marker.index = index;    
	        curve.markers.insertAt(index, marker)
	        
					google.maps.event.addListener(curve, "click", function(mEvent){
						var infoWindowTxt = 'curve Id : ' + curve.id;
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
             
		var tarr = new Array();
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
			path: [tarr],
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
             
		var tarr = new Array();
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
			path: [tarr],
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
	tcurve.pid = pid;
	tcurve.mid = mid;
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
 	//tcurve.railindex = railIndex;	
	tcurve.route = (polyL.route != '') ? polyL.route : '';	
	tcurve.$el = MapToolbar.addFeatureEntry(tcurve.id);
	tcurve.markers = new google.maps.MVCArray;	 
	
	MapToolbar.features['tcurveTab'][tcurve.id] = tcurve;

	
	MapToolbar.features["lineTab"][pid].markers.getAt(mid).note = '' ;
	MapToolbar.features["lineTab"][pid].markers.getAt(mid).bdata.tcurve = tcurve.id; 
	
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
			bdata: {height:'',pitch:''},
			kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
			sline: '',
				
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
			bdata: {height:'',pitch:''},
			kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
			sline: '',
				
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
			bdata: {height:'',pitch:''},
			kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
			sline: '',
				
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
			bdata: {height:'',pitch:''},
			kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
			sline: '',
				
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
			bdata: {height:'',pitch:''},
			kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''}, // various bve data
			sline: '',
				
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
	// url : http://www.karyait.net.my/
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
/*
var reader = new FileReader();

function readTxtFile(file)
{
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		
	// Great success! All the File APIs are supported.
		//if(file.files && file.files[0]){
			var reader = new FileReader();
			reader.onload = function (e) {  
				var output=e.target.result;
				
				return output;  
			};//end onload()
			reader.readAsText(file);
		//}//end if html5 filelist support
	
	} else {
		alert('Sorry, the HTML5 File APIs are not fully supported in this browser.');
		return '';
	}
} 
*/

function ReloadPolyline (loadPoly,rd, n, rowsData, i, quickScan) { 				    		
//poly marker coordinate start at 9

	var xD = rd[n].split(";");
	MapToolbar.addPoint(new google.maps.LatLng(xD[0], xD[1]), loadPoly, n-9);	
  
  if (xD[2] != '') { 
 		loadPoly.markers.getAt(n-9).note = xD[2]; 
  } else {
  	loadPoly.markers.getAt(n-9).note = ''; 
  } 
  if (xD[3] != '') {
  	loadPoly.markers.getAt(n-9).pitch = xD[3]; 
  } else {
  	loadPoly.markers.getAt(n-9).pitch = ''; 
  }
  if (xD[4] != '') {
  	loadPoly.markers.getAt(n-9).bdata = xD[4]; 
  } else {
  	loadPoly.markers.getAt(n-9).bdata = null; 
  }
  if (xD[5] != '') {
  	loadPoly.markers.getAt(n-9).kit = xD[5];   	
		if ((xD[5].indexOf('lastheight:') >=0) || (xD[5].indexOf('lastpitch:') >=0) || (xD[5].indexOf('lastheightratio:') >=0)) {
			loadPoly.markers.getAt(n-9).setIcon("images/marker_squared_edit.png");  	
		}
  } else {
  	loadPoly.markers.getAt(n-9).kit = null; 
  }
  if (xD[6] != '') {
  	loadPoly.markers.getAt(n-9).curve = xD[6]; 
  } else {
  	loadPoly.markers.getAt(n-9).curve = null; 
  }
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


  				    							
	n++;
  if(n < rd.length) {
  	// update progressbar
  	setTimeout(function() { ReloadPolyline(loadPoly,rd, n, rowsData, i, quickScan); }, 100);	
  } else {
  	i++;
  	if(i < rowsData.length) {
  		if (rowsData[i] != '') {
  			//line_1,ptype,note,name,route,trackno,tracksection,trackbve,kit, 3.6975060399011115;101.50496006011963;note;pitch;bve;kit, ...
  			var rd = rowsData[i].split(",");
  			var dname = rd[0];				    					
  			var otype = dname.split("_")[0];
  			//alert('otype : ' + otype);
  			if (otype == 'line') {
  				var loadNextPoly = null; 				
					MapToolbar.initFeature('line');
					MapToolbar.stopEditing();
					var newPID = 'line_'+ MapToolbar['lineCounter'];
					loadNextPoly = MapToolbar.features["lineTab"][newPID];
	 													
					if (rd[1] != '') { loadNextPoly.ptype = rd[1]; } else { loadNextPoly.ptype = null; }
					if (rd[2] != '') { loadNextPoly.note = rd[2]; } else { loadNextPoly.note = ''; }
	 				if (rd[3] != '') { loadNextPoly.name = rd[3]; } else { loadNextPoly.name = ''; }
	 				if (rd[4] != '') { loadNextPoly.route = rd[4]; } else { loadNextPoly.route = ''; }
	 				if (rd[5] != '') { loadNextPoly.trackno = rd[5]; } else { loadNextPoly.trackno = ''; }
	 				if (rd[6] != '') { loadNextPoly.tracksection = rd[6]; } else { loadNextPoly.tracksection = ''; }
	 				if (rd[7] != '') { loadNextPoly.trackbve = rd[7]; } else { loadNextPoly.trackbve = ''; }
	 				if (rd[8] != '') { loadNextPoly.kit = rd[8]; } else { loadNextPoly.kit = ''; }
	 															
	 				//2do nanti
	 				if (rd[1] == 'pl_rail') {
						loadNextPoly.setOptions({strokeColor: "#06C"});
					} else if (rd[1] == 'pl_road') {
						loadNextPoly.setOptions({strokeColor: "#666",strokeOpacity:0.5});
					} else if (rd[1] == 'pl_sideobj') {
						loadNextPoly.setOptions({strokeColor: "#060",strokeOpacity:0.3});
					} else {
						loadNextPoly.setOptions({strokeColor: "#000"});
					}	
	 													
					setTimeout(function() { ReloadPolyline(loadNextPoly,rd, 9, rowsData, i, quickScan); }, 100);
					//alert("reload nex line");
  			} else {
  				
					var polyL = MapToolbar.features['lineTab']['line_1'];
					setTimeout(function() { reloadShape(polyL, i, rowsData, quickScan); }, 50);
			
				}
			/*else if (otype == 'curve') {
  				var polyL = MapToolbar.features['lineTab']['line_1'];
				setTimeout(function() { reloadCurve(polyL, 0, rowsData); }, 100);
  			} else if (otype == 'tcurve') { 
  				var polyL = MapToolbar.features['lineTab']['line_1'];
  				setTimeout(function() { reloadTCurve(polyL, 0, rowsData); }, 100 );
  			} else if (otype == 'circle') {
  				setTimeout(function() { reloadCircle(rowsData, i); }, 100 );
  			} else if (otype == 'shape') {
  				var polyL = MapToolbar.features['lineTab']['line_1'];
				setTimeout(function() { reloadShape(polyL, i, rowsData); }, 100);
  			}*/
  		}
  	} else {
		alert('m(^_^)m ... done loading, thank you for waiting.');
  	}
  }
}

var curveRef = [];

function reloadCurve(polyL,mi,rowsData, i, quickScan) {
	if ((typeof polyL.markers.getAt(mi).curve != 'undefined') && quickScan[4]) {
		if ((polyL.markers.getAt(mi).curve != '') && (polyL.markers.getAt(mi).curve != '')) {
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
			
			var cuvarr = polyL.markers.getAt(mi).curve.split('§');
			var cuvid = cuvarr[0].split(':')[1];
			var cR = parseFloat(cuvarr[1].split(':')[1]);
			var cant = parseFloat(cuvarr[2].split(':')[1]);
			var vL = parseFloat(cuvarr[3].split(':')[1]);
			var tL = parseFloat(cuvarr[4].split(':')[1]);
			var arcL = parseFloat(cuvarr[5].split(':')[1]);
			var Cc = new google.maps.LatLng(parseFloat(cuvarr[6].split(':')[1].split('/')[0]), parseFloat(cuvarr[6].split(':')[1].split('/')[1]));
			var np1 = new google.maps.LatLng(parseFloat(cuvarr[7].split(':')[1].split('/')[0]), parseFloat(cuvarr[7].split(':')[1].split('/')[1]));
			var np2 = new google.maps.LatLng(parseFloat(cuvarr[8].split(':')[1].split('/')[0]), parseFloat(cuvarr[8].split(':')[1].split('/')[1]));
			var h1 = parseFloat(cuvarr[9].split(':')[1]);
			var h2 = parseFloat(cuvarr[10].split(':')[1]);
			var efvL = cuvarr[11].split(':')[1];
						
			var dir = (cR < 0) ? -1: 1;
			var preR = Math.abs(cR);

			var points = Math.ceil(arcL/25);
			var iB = google.maps.geometry.spherical.computeHeading(Cc,np1);
			var fB = google.maps.geometry.spherical.computeHeading(Cc,np2);

			var extp = new Array();
			var br = null;
				
			br = fB - iB;
				
			if (br >  180) {br -= 360;}
			if (br < -180) {br += 360;}
			
			var deltaBearing = br/points;
			for (var ci=0; (ci < points+1); ci++) {     
				extp.push(google.maps.geometry.spherical.computeOffset(Cc, preR, iB + ci*deltaBearing));				
			}
			
										
			var color = MapToolbar.getColor(true),
				curve = new google.maps.Polyline({
					path: [extp],
					strokeColor: "#FF0000",
					strokeOpacity: 0.7,
					geodesic: true,
					map: map,
					strokeWeight: 1
				});
								
			++MapToolbar["curveCounter"];
			curve.id = 'curve_'+ MapToolbar["curveCounter"];
			curve.pid = polyL.id;
			curve.mid = mi;
			curve.ctype = null;
			curve.note = ''; 
			curve.$el = MapToolbar.addFeatureEntry(curve.id);
			curve.markers = new google.maps.MVCArray;	     
			MapToolbar.features['curveTab'][curve.id] = curve;
												
			polyL.markers.getAt(mi).setDraggable(false);
			polyL.markers.getAt(mi-1).setDraggable(false);
			polyL.markers.getAt(mi+1).setDraggable(false);
			
			curveRef.push([cuvid,curve.id]);
			polyL.markers.getAt(mi).curve = polyL.markers.getAt(mi).curve.replace('curve:' + cuvid, 'curve:' + curve.id);
															
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
					pitch: '', // track pitch
					bdata: null, // various bve data
					lineX:'', // non parallel line distance
					turn:'', // main line non curve turning
					kit:'curve:start:'+curve.id, // others data (reserved) by Karya IT
					pid: curve.id
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
					title: curve.id + ' end point : ' + extp[extp.length-1] ,
					note: '', // any extra note 
					pitch: '', // track pitch
					bdata: null, // various bve data
					lineX:'', // non parallel line distance
					turn:'', // main line non curve turning
					kit:'curve:end:'+curve.id, // others data (reserved) by Karya IT
					pid: curve.id
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
					kit:'curve:center:'+curve.id, // others data (reserved) by Karya IT
					pid: curve.id
				});

			marker.index = index;    
			curve.markers.insertAt(index, marker)	    
	        
			google.maps.event.addListener(curve, "click", function(mEvent){
					//alert(mEvent.latLng.toString());
					var infoWindowTxt = 'curve Id : ' + curve.id + '<br>curve length : ' + arcL + ' m<br>';
					infoWindowTxt += '<br>line id : ' + curve.pid + ' mid : ' + curve.mid; 										// warning : marker ID sentiasa berubah2, reference ke marker index tak boleh digunakan
					infoWindowTxt += '<br>radius : ' + cR + 'm<br>design speed : ' + vL + ' km/h<br>cant : ' + cant + ' mm';
					infoWindowTxt += '<br><br>start point : ' + extp[0] + '<br>end point : ' + extp[extp.length-1];
					infoWindowTxt += '<br>curve center : ' + Cc;
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
	}
	mi++;
	if ((mi < polyL.markers.length) && quickScan[4]) {		
		setTimeout(function() { reloadCurve(polyL, mi, rowsData,i, quickScan); }, 50 );		
	} else {			
		setTimeout(function() { reloadTCurve(polyL, 0, rowsData,i, quickScan); }, 50 );
	}	
}

function reloadTCurve(polyL,mi,rowsData, i, quickScan) {
	//alert("m(- -)m ... sorry, this feature (reloadTCurve) is not available in this release. ie. no code defined yet.");
	
	if ((typeof polyL.markers.getAt(mi).tcurve != 'undefined') && quickScan[5]) {
		if ((polyL.markers.getAt(mi).tcurve != '') && (polyL.markers.getAt(mi).tcurve != '')) {
			// 2 do in future
		}
	}	
	mi++;
	if ((mi < polyL.markers.length) && quickScan[5]) {		
		setTimeout(function() { reloadTCurve(polyL, mi, rowsData, i, quickScan); }, 50 );
		
	} else {	
		setTimeout(function() { reloadCircle(rowsData, i, polyL, quickScan); }, 50 );
	}	
	
	
}

function reloadCircle(rowsData, i, polyL, quickScan) {
	//circle_name,ptype,note,radius,center.lat;center.lng
	if (rowsData[i] != '') {
		var rd = rowsData[i].split(",");
		var dname = rd[0];				    					
		var otype = dname.split("_")[0];
		if (otype == 'circle') {
			var cdat = rowsData[i].split(",");
			var pTy = (cdat[1] == '') ? null : cdat[1];
			var nte = (cdat[2] == '') ? null : cdat[2];
			var cRd = parseFloat(cdat[2]);
			var cCt = new google.maps.LatLng(parseFloat(cdat[3].split(';')[0]), parseFloat(cdat[3].split(';')[1]));
	
			var bulat = new google.maps.Circle({
				//strokeColor: "#0FF000",
    		strokeOpacity: 0.8,
    		strokeWeight: 1,
    		editable: false,
    		fillOpacity: 0.0,
    		center: cCt,
    		radius: cRd,
      	map: map
    	});

			var color = MapToolbar.getColor(false),
				bulat,
				self = this,
				el = "circle_b";
			
			++MapToolbar["circleCounter"];
			 
			bulat.id = 'circle_'+ MapToolbar["circleCounter"];
			bulat.ptype = pTy;
			bulat.note = nte;
			bulat.iwref = null;
			bulat.$el = MapToolbar.addFeatureEntry(bulat.id);  	
			MapToolbar.features["circleTab"][bulat.id] = bulat;		 		

			google.maps.event.addListener(bulat, "click", function(mEvent){
				//alert(mEvent.latLng.toString());
	    	//alert(bulat.getRadius() + "\n" + bulat.getCenter().toString());
	    	//alert("jejari : " + bulat.getRadius() + "\n" + "luas : " + (Math.PI * bulat.getRadius() * bulat.getRadius()));
	    		
				var infoWindowTxt = 'Circle Id : ' + bulat.id + '&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;Area : ';
				var lat0 = mEvent.latLng.lat();
				var lng0 = mEvent.latLng.lng();

				var area = Math.PI * bulat.getRadius() * bulat.getRadius();
				var radius = bulat.getRadius();
			
				if (area < 1000) {
					infoWindowTxt += area.toFixed(2) + ' m' + String.fromCharCode(178) ;
				} else {
					infoWindowTxt += (area/1000).toFixed(2) + ' km' + String.fromCharCode(178) ;
				}	
		
				infoWindowTxt += '&nbsp&nbsp;&nbsp&nbsp;&nbsp&nbsp;Radius : ';
					
				if (radius < 1000) {
					infoWindowTxt += radius.toFixed(2) + ' m.';
				} else {
					infoWindowTxt += (radius/1000).toFixed(6) + ' km.';
				}
			
				infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="3"><tr><td>';
				infoWindowTxt += '<img src="images/circle-edit.png" title="Edit circle" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.setMapCenter(\'' + bulat.id + '\');"></td><td>';
				infoWindowTxt += '<img src="images/circle-remove.png" title="Remove circle" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\'' + bulat.id + '\');"></td></tr></table>';
				infoWindowTxt += '<select name="menu_cc_type" id="menu_cc_type" style="font-size:10px" onchange="setRectangleType(\''+ bulat.id + '\');"><option> - select - </option>';
				if (bulat.ptype == 'cc_building') {infoWindowTxt += '<option value="cc_building" selected>Building</option>'; } else {infoWindowTxt += '<option value="cc_building">Building</option>';}
				if (bulat.ptype == 'cc_house') {infoWindowTxt += '<option value="cc_house" selected>House</option>'; } else {infoWindowTxt += '<option value="cc_house">House</option>'; }
				if (bulat.ptype == 'cc_landscape') {infoWindowTxt += '<option value="cc_landscape" selected>Landscape</option>'; } else {infoWindowTxt += '<option value="cc_landscape">Landscape</option>'; }
				if (bulat.ptype == 'cc_field') {infoWindowTxt += '<option value="cc_field" selected>Field</option>'; } else {infoWindowTxt += '<option value="cc_field">Field</option>'; }
				if (bulat.ptype == 'cc_structure') {infoWindowTxt += '<option value="cc_structure" selected>Structure</option>'; } else {infoWindowTxt += '<option value="cc_structure">Structure</option>'; }
				if (bulat.ptype == 'cc_object') {infoWindowTxt += '<option value="cc_object" selected>Custom Object</option>'; } else {infoWindowTxt += '<option value="cc_object">Custom Object</option>'; }
				infoWindowTxt += '</select>';
	   	
				var infowindow = new google.maps.InfoWindow({
					content: infoWindowTxt,
					position: mEvent.latLng
				});
        
				infowindow.open(map);  	    		
	  	});		
		}
	}	
	
	i++;   
	if (i < rowsData.length) {
		//2do		
		setTimeout(function() { reloadCircle(rowsData, i, polyL, quickScan); }, 50 );	
	} else {
		if (curveRef.length > 0 ) {
			if (confirm('load data on curve? this may take a a few minutes.')) {
				setTimeout(function() { trimRowData(polyL,1,rowsData); }, 50 );
			}
		} else {
			alert('m(^_^)m ... done loading, thank you for waiting.');
		}
	}		
}

function reloadShape(polyL,mi,rowsData, quickScan) {
	//alert("m(- -)m ... sorry, this feature (reloadShape) is not available in this release. ie. no code defined yet.");

	if (rowsData[mi] != '') {
		var rd = rowsData[mi].split(",");
		var dname = rd[0];				    					
		var otype = dname.split("_")[0];
		if (otype == 'shape') {
				
		} else {
			setTimeout(function() { reloadCurve(polyL, 0, rowsData, mi, quickScan); }, 100);
			return true;
		}
	}	
	
	mi++;	
	if (mi < rowsData.length) {
		setTimeout(function() { reloadShape(polyL, mi, rowsData, quickScan); }, 100 );		
	} else {
		alert('m(^_^)m ... done loading, thank you for waiting.');
	}
}

function reloaddotMarker(rowsData,i, quickScan) {
	//alert("m(- -)m ... sorry, this feature (reloaddotMarker) is not available in this release. ie. no code defined yet.");
	if(i < rowsData.length) {
		if (rowsData[i] != '') {
			
			var rd = rowsData[i].split(",");
			var dname = rd[0];				    					
			var otype = dname.split("_")[0];
			
			if (otype == 'dotMarker') {
				//marker_name,ptype,note,lat;lng
				var ddat = rowsData[i].split(",");
				var pTy = (ddat[1] == '') ? null : ddat[1];
				var nte = (ddat[2] == '') ? null : ddat[2];
				var pos = new google.maps.LatLng(parseFloat(ddat[2].split(';')[0]), parseFloat(ddat[2].split(';')[1]));

				var color = MapToolbar.getColor(true),
					marker = new google.maps.Marker({
					position: pos, 
					map: map, 
					draggable: true,
					flat: true
				}); 
		    
				++MapToolbar["dotMarkerCounter"];
				marker.id = 'dotMarker_'+ MapToolbar["dotMarkerCounter"];
				marker.ptype = pTy;
				marker.note = nte;
				marker.iwref = null;
				marker.$el = MapToolbar.addFeatureEntry(marker.id);	     
				MapToolbar.updateMarker(marker, marker.$el, color);
				MapToolbar.features['dotMarkerTab'][marker.id] = marker;

				google.maps.event.addListener(marker, "dragend", function() {
					MapToolbar.updateMarker(marker, marker.$el);
				}); 
	
				google.maps.event.addListener(marker, "click", function(mEvent){
					//alert(mEvent.latLng.toString());
					var infoWindowTxt = 'Marker Id : ' + marker.id;
					var lat0 = mEvent.latLng.lat();
					var lng0 = mEvent.latLng.lng();
		
					infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="3"><tr><td>';
					infoWindowTxt += '<img src="images/marker_remove.png" title="Remove marker" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\'' + marker.id + '\');"></td><td>&nbsp;</td><td>';
  
					infoWindowTxt += '<select name="menu_m_type" id="menu_m_type" style="font-size:10px" onchange="setMarkerType(\''+ marker.id + '\');"><option> - select - </option>';
					if (marker.ptype == 'm_stopsign') {infoWindowTxt += '<option value="m_stopsign" selected>Stop Sign</option>'; } else {infoWindowTxt += '<option value="m_stopsign">Stop Sign</option>';}
					if (marker.ptype == 'm_rail_start') {infoWindowTxt += '<option value="m_rail_start" selected>Rail Start</option>'; } else {infoWindowTxt += '<option value="m_rail_start">Rail Start</option>'; }
					if (marker.ptype == 'm_rail_end') {infoWindowTxt += '<option value="m_rail_end" selected>Rail End</option>'; } else {infoWindowTxt += '<option value="m_rail_end">Rail End</option>'; }
					if (marker.ptype == 'm_tree') {infoWindowTxt += '<option value="m_tree" selected>Tree</option>'; } else {infoWindowTxt += '<option value="m_tree">Tree</option>'; }
					if (marker.ptype == 'm_traffic_signal') {infoWindowTxt += '<option value="m_traffic_signal" selected>Traffic Signal</option>'; } else {infoWindowTxt += '<option value="m_traffic_signal">Traffic Signal</option>'; }
					if (marker.ptype == 'm_object') {infoWindowTxt += '<option value="m_object" selected>Custom Object</option>'; } else {infoWindowTxt += '<option value="m_object">Custom Object</option>'; }
  		
					infoWindowTxt += '</select></td></tr></table>';
	   	
					var infowindow = new google.maps.InfoWindow({
						content: infoWindowTxt,
						position: mEvent.latLng
					});
        
					infowindow.open(map);		
				});	
	
			} else {
			
				if (otype == 'line') {
					var loadPoly = null;
					MapToolbar.initFeature('line');
					MapToolbar.stopEditing(); 												
					var newPID = 'line_'+ MapToolbar['lineCounter'];
					loadPoly = MapToolbar.features["lineTab"][newPID];
	 													
	 				if (rd[1] != '') { loadPoly.ptype = rd[1]; } else { loadPoly.ptype = null; }
	 				if (rd[2] != '') { loadPoly.note = rd[2]; } else { loadPoly.note = ''; }
	 				if (rd[3] != '') { loadPoly.name = rd[3]; } else { loadPoly.name = ''; }
	 				if (rd[4] != '') { loadPoly.route = rd[4]; } else { loadPoly.route = ''; }
	 				if (rd[5] != '') { loadPoly.trackno = rd[5]; } else { loadPoly.trackno = ''; }
	 				if (rd[6] != '') { loadPoly.tracksection = rd[6]; } else { loadPoly.tracksection = ''; }
	 				if (rd[7] != '') { loadPoly.trackbve = rd[7]; } else { loadPoly.trackbve = ''; }
	 				if (rd[8] != '') { loadPoly.kit = rd[8]; } else { loadPoly.kit = ''; }
	 															
	 				//2do nanti
	 				if (rd[1] == 'pl_rail') {
						loadPoly.setOptions({strokeColor: "#06C"});
					} else if (rd[1] == 'pl_road') {
						loadPoly.setOptions({strokeColor: "#666",strokeOpacity:0.5});
					} else if (rd[1] == 'pl_sideobj') {
						loadPoly.setOptions({strokeColor: "#060",strokeOpacity:0.3});
					} else {
						loadPoly.setOptions({strokeColor: "#000"});
					}	
	 													
					setTimeout(function() { ReloadPolyline(loadPoly, rd, 9, rowsData, i, quickScan); }, 50);									
					return true;
				} else if (otype == 'circle') {
  				setTimeout(function() { reloadCircle(rowsData, i, quickScan); }, 50 );
					return true;
  			} else if (otype == 'shape') {
  				var polyL = MapToolbar.features['lineTab']['line_1'];
  				setTimeout(function() { reloadShape(polyL, i, rowsData, quickScan); }, 50 );
  			}
			}
		}
	}

	i++;   
	if (i < rowsData.length) {
		setTimeout(function() { reloaddotMarker(rowsData,i, quickScan); }, 50 );		
	} else {
		alert('m(^_^)m ... done loading, thank you for waiting.');
	}
}

function trimRowData(polyL,i,rowsData) {
	if (rowsData[i] != '') {
		var rd = rowsData[i].split(",");
		var dname = rd[0];				    					
		var otype = dname.split("_")[0];		
		if (otype != 'curve') {
			rowsData.splice(i,1); 
			i=-1;
		}	
	}	
	
	i++;   
	if (i < rowsData.length) {
		//2do		
		setTimeout(function() { trimRowData(polyL,i,rowsData); }, 50 );	
	} else {
		setTimeout(function() { updateMarkerOnCurve(polyL,1,rowsData); }, 100 );
	}		
}

function updateMarkerOnCurve(polyL,i,rowsData) {
	//restore old curve data
	// 'curve:'+ curve.id + '§radius:' + preR * dir + '§cant:' + parseFloat($('#sBtnRCCant').val()) + '§limit:' + parseFloat($('#sBtnRCDesignSpeed').val()) + '§tlength:' + l2m1 + '§clength:' + arcL + '§center:' + Cc.lat() + '/' + Cc.lng() + '§start_point:' + extp[0].lat() + '/' + extp[0].lng() + '§end_point:' + extp[extp.length-1].lat() + '/' + extp[extp.length-1].lng()  + '§h1:' + h1 + '§h2:' + h2 + '§forceSL:' + enforceSL; 
	if (typeof polyL.markers.getAt(i).curve != 'undefined') {
		if ((polyL.markers.getAt(i).curve != null) && (polyL.markers.getAt(i).curve != '')) {			
			var cuvarr = polyL.markers.getAt(i).curve.split('§');
			var cuvid = cuvarr[0].split(':')[1];
			var oldid = null;
			var xc = cuvarr[6].replace('center:','').split('/');
			var xc0 = new google.maps.LatLng(parseFloat(xc[0]),parseFloat(xc[1])); // start point
			xc = cuvarr[7].replace('start_point:','').split('/');
			var xc1 = new google.maps.LatLng(parseFloat(xc[0]),parseFloat(xc[1])); // end point
			xc = cuvarr[8].replace('end_point:','').split('/');
			var xcC = new google.maps.LatLng(parseFloat(xc[0]),parseFloat(xc[1])); // center point
			
			for (f = 0; f < curveRef.length; f++) {
				if (cuvid == curveRef[f][1]) {
					oldid = curveRef[f][0];
					curveRef.splice(f,1)
					break;
				}
			}
			
			if (oldid != null) {
				var curve = MapToolbar.features['curveTab'][cuvid];
				
				for (r = 0; r < rowsData.length; r++) {
					if (typeof rowsData[r] != 'undefined') {
						if (rowsData[r] != '') {
							var oData = rowsData[r].split(",");		    					
							var otype = oData[0].split("_")[0];		
							
							if (otype == 'curve') {
								if (oData[0] == oldid) {							
							
									if (oData[1] !='') { curve.ctype = oData[1]; }
									if (oData[4] !='') { curve.note = oData[4]; }
					
									for (rj = 5; rj < oData.length; rj++){
										var cmdata = oData[rj].split(";");
										var cpltlg = new google.maps.LatLng(cmdata[0],cmdata[1]);
										
										if (cpltlg.equals(xc0) || cpltlg.equals(xc1) || cpltlg.equals(xcC)) {
											if ( cmdata[3] != '' ) { curve.markers.getAt(rj-5).note = cmdata[3]; } else { curve.markers.getAt(rj-5).note = null; }
											if ( cmdata[4] != '' ) { curve.markers.getAt(rj-5).pitch = cmdata[4]; } else { curve.markers.getAt(rj-5).pitch = null; }
											if ( cmdata[5] != '' ) { curve.markers.getAt(rj-5).bdata = cmdata[5]; } else { curve.markers.getAt(rj-5).bdata = null; }    					
											if ( cmdata[6] != '' ) { curve.markers.getAt(rj-5).lineX = cmdata[6]; } else { curve.markers.getAt(rj-5).lineX = null; }    					
											if ( cmdata[7] != '' ) { curve.markers.getAt(rj-5).turn = cmdata[7]; } else { curve.markers.getAt(rj-5).turn = null;}
											if ( cmdata[8] != '' ) { curve.markers.getAt(rj-5).kit = cmdata[8]; } else { curve.markers.getAt(rj-5).kit = null; }   					
											if ( cmdata[9] != '' ) { curve.markers.getAt(rj-5).ld = cmdata[9]; } else { curve.markers.getAt(rj-5).ld = null; }
											if ( cmdata[11] != '' ) { curve.markers.getAt(rj-5).Lc = cmdata[11]; } else { curve.markers.getAt(rj-5).Lc = null; }	
											if ( cmdata[12] != '' ) { curve.markers.getAt(rj-5).title = cmdata[12]; } else { curve.markers.getAt(rj-5).title = null; }   					
										
										} else {
											
											btnAddMarker2Polyline(cuvid,cmdata[0],cmdata[1]);
											//MapToolbar.addPoint(cpltlg, curve, rj-5);
											//curve.markers.insertAt(index, marker)
											
											//var c = curve.markers.length -1;
											for (c=0; c < MapToolbar.features['curveTab'][cuvid].markers.length; c++) {
												if (MapToolbar.features['curveTab'][cuvid].markers.getAt(c).getPosition().equals(cpltlg) ) {
													/* enable this code to pause program cycle manually if your notebook get overheated and notebook tend to restart.
													alert(cpltlg + '\n' + cmdata[2] + '\n' + cmdata[3] + '\n' + cmdata[4] + '\n' + cmdata[5] + '\n' + cmdata[6] + '\n' + cmdata[7] + '\n' + cmdata[8] + '\n' + cmdata[9] + '\n' + cmdata[10] + '\n' + cmdata[11] + '\n' + cmdata[12]);
													*/
													if ( cmdata[2] != '') { curve.markers.getAt(c).pid = cmdata[2]; } else { curve.markers.getAt(c).pid = null; }
													if ( cmdata[3] != '' ) { curve.markers.getAt(c).note = cmdata[3]; } else { curve.markers.getAt(c).note = null; }
													if ( cmdata[4] != '' ) { curve.markers.getAt(c).pitch = cmdata[4]; } else { curve.markers.getAt(c).pitch = null; }
													if ( cmdata[5] != '' ) { curve.markers.getAt(c).bdata = cmdata[5]; } else { curve.markers.getAt(c).bdata = null; }
													if ( cmdata[6] != '' ) { curve.markers.getAt(c).lineX = cmdata[6]; } else { curve.markers.getAt(c).lineX = null; }    					
													if ( cmdata[7] != '' ) { curve.markers.getAt(c).turn = cmdata[7]; } else { curve.markers.getAt(c).turn = null; }    					
													if ( cmdata[8] != '' ) { curve.markers.getAt(c).kit = cmdata[8]; } else { curve.markers.getAt(c).kit = null; }
													if ( cmdata[9] != '' ) { curve.markers.getAt(c).ld = cmdata[9]; } else { curve.markers.getAt(c).ld = null; }
													if ( cmdata[11] != '' ) { curve.markers.getAt(c).Lc = cmdata[11]; } else { curve.markers.getAt(c).Lc = null; }	    					
													if ( cmdata[12] != '' ) { curve.markers.getAt(c).title = cmdata[12]; } else { curve.markers.getAt(c).title = null; }
														
													break; 													
												} else {
													var dPx = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features['curveTab'][cuvid].markers.getAt(c).getPosition(),cpltlg);
													dPx = Math.abs(dPx);
													if ((dPx * 1000 > 0) && (dPx * 1000 < 1)) {
														alert('markers = ' + c  + '\npos=' + MapToolbar.features['curveTab'][cuvid].markers.getAt(c).getPosition() + '\n!=' + cpltlg + '\ndPx = ' + dPx);
													}
												}
											}
																
										}
									}
									rowsData.splice(r,1);
									break;
								} else {
									//alert(oData[0] + ' != ' + oldid);
								}								
							}	
							
						}
				
					}
				}				
			}
			
		}
	}
	

	i++;
	if (i < polyL.markers.length) {		
		setTimeout(function() { updateMarkerOnCurve(polyL,i,rowsData); }, 1000 );		
	} else {	
		alert('m(^_^)m ... done loading, thank you for waiting.');
	}	
}

function getTrackDistanceFromStart(pid,index) {
	if (pid.split('_')[0] != 'line') { alert('warning! not a line type polyline.'); return false; }
	var pLM = MapToolbar.features['lineTab'][pid].markers;
	var allPoints = MapToolbar.features['lineTab'][pid].getPath().getArray();	    		
	var arrD = new Array();
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
	$('#dialogParalelLine').dialog('open');
} 

function curveSetting(pid) {
	$('#dialogParalelLine').dialog('open');
} 

function curveRailRefresh() {
	if (typeof $('#DCbasePolyID').val() != 'undefined') {
		var dir = 0;
		if (MapToolbar.features["lineTab"][$('#DCbasePolyID').val()] != null) {
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

	for (var i = 0; i < MapToolbar.features["lineTab"][pid].markers.length; i++) {
		if (MapToolbar.features["lineTab"][pid].markers.getAt(i).sline !='') {
			var lines = MapToolbar.features["lineTab"][pid].markers.getAt(i).sline.split(',');
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
						
				var plines = MapToolbar.features["lineTab"][pid1].markers.getAt(oi).sline.split(',');
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
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.tunnel += ',' + arr3[1] + ':0'; 
					}

				} else {				
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.tunnel == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.tunnel = arr3[1] + ':1'; 
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.tunnel += ',' + arr3[1] + ':1'; 
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
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.bridge += ',' + arr3[1] + ':0'; 
					}
				} else {
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.bridge == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.bridge = arr3[1] + ':1'; 
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.bridge += ',' + arr3[1] + ':1';
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
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.cut += ',' + arr3[1] + ':0';
					}
				} else {
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.cut == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.cut = arr3[1] + ':1';
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.cut += ',' + arr3[1] + ':1';
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
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.dike += ',' + arr3[1] + ':0';
					}
				} else {					 
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.dike == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.dike = arr3[1] + ':1';
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.dike += ',' + arr3[1] + ':1';
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
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.flyover += ',' + arr3[1] + ':0';
					}
				} else {					 
					if (MapToolbar.features[tab][pid].markers.getAt(mid).kdata.flyover == '') {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.flyover = arr3[1] + ':1';
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mid).kdata.flyover += ',' + arr3[1] + ':1';
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