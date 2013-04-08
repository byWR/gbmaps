/*
GB Maps ギビマップ - © Karya IT (http://www.karyait.net.my/) 2012-2013. All rights reserved. 
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

GB Maps ギビマップ by Karya IT (http://www.karyait.net.my/) is licensed under a 
Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US 

Based on a work at Google Developers (https://developers.google.com/maps/). Permissions beyond 
the scope of this license may be available at https://developers.google.com/readme/terms. 

Google Maps - ©2012-2013 Google.

Main GB Maps ギビマップ Website : http://gbmaps.karyait.net.my/ or http://gbmaps.blogspot.com

Development site (programming) : https://github.com/karyait/gbmaps
Personal blog for GB Maps ギビマップ (design algorithm) : http://blogkaryait.wordpress.com/tag/gbmaps/

File : gbm-func-p3d1.js
purpose : gb maps function library
type : prototype system (experimental Or still under R&D)
version : prototype 3
build : 120+
last update : 3 April 2013 11:00am (GMT 8+)

*/

var currMarker = null;
var newPoly = null;
var currMod = '';
var wd = 0;
var data = null;

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
			if (typeof MapToolbar.features["transcurveTab"][polyid] != 'undefined') {
				polyAddMarker = MapToolbar.features["transcurveTab"][polyid];
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
      console.log(parseFloat(markerDist.d) + ' '+ Math.abs(ab+bc-ac));
      
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

function setLineType(polyid) {
	// by : Karya IT (Mac 2012)
	// url : http://www.karyait.net.my/
	// ver. : 1.0.0
	// purpose : set line properties
	if (typeof polyid != 'undefined') {
		var polyT = null;
		if (MapToolbar.features["lineTab"][polyid] != null) {
			polyT = MapToolbar.features["lineTab"][polyid];
		}	
		if (typeof polyT != 'undefined') {
			if ($('#menu_pl_type').val() != '') {
				polyT.ptype = $('#menu_pl_type').val();
				
				if ($('#menu_pl_type').val() == 'pl_rail') {
					polyT.setOptions({strokeColor: "#06C"});
				} else if ($('#menu_pl_type').val() == 'pl_road') {
					polyT.setOptions({strokeColor: "#666",strokeOpacity:0.5});
				} else if ($('#menu_pl_type').val() == 'pl_sideobj') {
					polyT.setOptions({strokeColor: "#060",strokeOpacity:0.3});
				} else if ($('#menu_pl_type').val() == 'pl_platform') {
					polyT.setOptions({strokeColor: "#e0e0e0",strokeOpacity:0.3});
				} else {
					
				}			
			}
		}		
	}
}

function setPolyType(polyid) {
	// by : Karya IT (Mac 2012)
	// url : http://www.karyait.net.my/
	// ver. : 1.0.0
	// purpose : set polygon properties
	if (typeof polyid != 'undefined') {
		var polyT = null;
		if (MapToolbar.features["shapeTab"][polyid] != null) {
			polyT = MapToolbar.features["shapeTab"][polyid];
		}	
		if (typeof polyT != 'undefined') {
			if (document.getElementById('menu_pg_type').value != '') {
				polyT.ptype = document.getElementById('menu_pg_type').value;
			}
		}		
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
		
	if (MapToolbar.features["lineTab"][polyid] != null) {
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
    console.log(parseFloat(markerDist.d) + ' '+ Math.abs(ab+bc-ac));
      
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
			if (poly2split.markers.getAt(i).note != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).note = poly2split.markers.getAt(i).note;}  
			if (poly2split.markers.getAt(i).pitch != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).pitch = poly2split.markers.getAt(i).pitch;} 
			if (poly2split.markers.getAt(i).bve != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).bve = poly2split.markers.getAt(i).bve;} 
			if (poly2split.markers.getAt(i).lineX != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).lineX = poly2split.markers.getAt(i).lineX;} 
			if (poly2split.markers.getAt(i).turn != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).turn = poly2split.markers.getAt(i).turn;} 
			if (poly2split.markers.getAt(i).kit != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).kit = poly2split.markers.getAt(i).kit;} 
			if (poly2split.markers.getAt(i).curve != null) {
				MapToolbar.features["lineTab"][pno].markers.getAt(i).curve = poly2split.markers.getAt(i).curve;				
				var cid = poly2split.markers.getAt(i).curve.split('§')[0].split(':')[1]; 
				MapToolbar.features['curveTab'][cid].pid = pno;
				MapToolbar.features['curveTab'][cid].mid = i;
			} 
			if (poly2split.markers.getAt(i).tcurve != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).tcurve = poly2split.markers.getAt(i).tcurve;} 
			if (poly2split.markers.getAt(i).prln != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).prln = poly2split.markers.getAt(i).prln;}
			if (poly2split.markers.getAt(i).pid != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).pid = pno;}
			
								
			//MapToolbar.features["lineTab"][polyid].getAt(i). 
		} else {
			var j = i - tmppolypath1.length; // double cek
			var pno = 'line_' + (no + 1);
			if (i < currPolyPathLength+1 ) {
				if (poly2split.markers.getAt(i).note != null) {MapToolbar.features["lineTab"][pno].markers.getAt(j+1).note = poly2split.markers.getAt(i).note;}  
				if (poly2split.markers.getAt(i).pitch != null) {MapToolbar.features["lineTab"][pno].markers.getAt(j+1).pitch = poly2split.markers.getAt(i).pitch;} 
				if (poly2split.markers.getAt(i).bve != null) {MapToolbar.features["lineTab"][pno].markers.getAt(j+1).bve = poly2split.markers.getAt(i).bve;} 
				if (poly2split.markers.getAt(i).lineX != null) {MapToolbar.features["lineTab"][pno].markers.getAt(j+1).lineX = poly2split.markers.getAt(i).lineX;} 
				if (poly2split.markers.getAt(i).turn != null) {MapToolbar.features["lineTab"][pno].markers.getAt(j+1).turn = poly2split.markers.getAt(i).turn;} 
				if (poly2split.markers.getAt(i).kit != null) {MapToolbar.features["lineTab"][pno].markers.getAt(j+1).kit = poly2split.markers.getAt(i).kit;} 
				if (poly2split.markers.getAt(i).curve != null) {
					MapToolbar.features["lineTab"][pno].markers.getAt(j+1).curve = poly2split.markers.getAt(i).curve;
					var cid = poly2split.markers.getAt(i).curve.split('§')[0].split(':')[1]; 
					MapToolbar.features['curveTab'][cid].pid = pno;
					MapToolbar.features['curveTab'][cid].mid = j+1;
				} 
				if (poly2split.markers.getAt(i).tcurve != null) {MapToolbar.features["lineTab"][pno].markers.getAt(j+1).tcurve = poly2split.markers.getAt(i).tcurve;} 
				if (poly2split.markers.getAt(i).prln != null) {MapToolbar.features["lineTab"][pno].markers.getAt(j+1).prln = poly2split.markers.getAt(i).prln;}
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
	
	if ((document.getElementById('pline1name').value !== undefined) && (document.getElementById('pline2name').value !== undefined)) {
		var poly1 = null; var poly2 = null;
		
		if (MapToolbar.features["lineTab"][document.getElementById('pline1name').value] != null) {
			poly1 = MapToolbar.features["lineTab"][document.getElementById('pline1name').value];
		}
		
		if (MapToolbar.features["lineTab"][document.getElementById('pline2name').value] != null) {
			poly2 = MapToolbar.features["lineTab"][document.getElementById('pline2name').value];
		}
		
		if ((poly1 != null) && (poly2 != null)) {
			var poly1Path = poly1.getPath().getArray();
			var poly2Path = poly2.getPath().getArray();
		
			var tmpEP = new Array(3);;
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
				if (poly1.markers.getAt(i).note != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).note = poly1.markers.getAt(i).note;}  
				if (poly1.markers.getAt(i).pitch != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).pitch = poly1.markers.getAt(i).pitch;} 
				if (poly1.markers.getAt(i).bve != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).bve = poly1.markers.getAt(i).bve;} 
				if (poly1.markers.getAt(i).lineX != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).lineX = poly1.markers.getAt(i).lineX;} 
				if (poly1.markers.getAt(i).turn != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).turn = poly1.markers.getAt(i).turn;} 
				if (poly1.markers.getAt(i).kit != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).kit = poly1.markers.getAt(i).kit;} 
				if (poly1.markers.getAt(i).curve != null) {
					MapToolbar.features["lineTab"][pno].markers.getAt(i).curve = poly1.markers.getAt(i).curve;				
					var cid = poly1.markers.getAt(i).curve.split('§')[0].split(':')[1]; 
					MapToolbar.features['curveTab'][cid].pid = pno;
					MapToolbar.features['curveTab'][cid].mid = i;
				} 
				if (poly1.markers.getAt(i).tcurve != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).tcurve = poly1.markers.getAt(i).tcurve;} 
				if (poly1.markers.getAt(i).prln != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).prln = poly1.markers.getAt(i).prln;}
				if (poly1.markers.getAt(i).pid != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i).pid = pno;}	
				ix = i;		
			}
	
			for (var i = 0; i < poly2Path.length; i++) {
				if (i+ix < newPLength ) {
					if (poly2.markers.getAt(i).note != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).note = poly2.markers.getAt(i).note;}  
					if (poly2.markers.getAt(i).pitch != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).pitch = poly2.markers.getAt(i).pitch;} 
					if (poly2.markers.getAt(i).bve != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).bve = poly2.markers.getAt(i).bve;} 
					if (poly2.markers.getAt(i).lineX != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).lineX = poly2.markers.getAt(i).lineX;} 
					if (poly2.markers.getAt(i).turn != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).turn = poly2.markers.getAt(i).turn;} 
					if (poly2.markers.getAt(i).kit != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).kit = poly2.markers.getAt(i).kit;} 
					if (poly2.markers.getAt(i).curve != null) {
						MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).curve = poly2.markers.getAt(i).curve;				
						var cid = poly2.markers.getAt(i).curve.split('§')[0].split(':')[1]; 
						MapToolbar.features['curveTab'][cid].pid = pno;
						MapToolbar.features['curveTab'][cid].mid = i+ix+1;
					} 
					if (poly2.markers.getAt(i).tcurve != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).tcurve = poly2.markers.getAt(i).tcurve;} 
					if (poly2.markers.getAt(i).prln != null) {MapToolbar.features["lineTab"][pno].markers.getAt(i+ix+1).prln = poly2.markers.getAt(i).prln;}
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
	// by : Karya IT (Mac 2012)
	// url : http://www.karyait.net.my/
	// ver. : 1.0.0
	// purpose : generate parallel line based on selected line
	
	if (document.getElementById('PLbasePolyID').value != "") {
		var polyid = document.getElementById('PLbasePolyID').value;
		var polyBaseLine = null;
		if (MapToolbar.features["lineTab"][polyid] != null) {
			polyBaseLine = MapToolbar.features["lineTab"][polyid];
		}
				
		if ((currMod == 'parallel_line') && (polyBaseLine.id.split('_')[0] == 'line')) {		
			var side = -90; // default value, left
			var offset = parseFloat(document.getElementById('sBtnPLineOffset').value); // default value
			
			if (document.getElementById('sBtnPLineOffset').value > 0) {
				if (document.getElementById('Right2Line').checked) {
					side = 90; 
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
	 			
				for (var i = sP; i <= eP; i++) {
	 				var h1 = google.maps.geometry.spherical.computeHeading(polyPath[i-1],polyPath[i]);
	 				var platLng;
	 				//2do : double check 14/12/2012
	 				if (i == sP) {	 										
						var kodOffset = (side < 0)?  -offset : offset;
						var startOffset = null;
						if (document.getElementById('plswAtStart').checked) { startOffset = 0; }
						var stSwlength = null; 
						if (document.getElementById('plswAtStart').checked) { stSwlength = parseFloat($('#pLstSwLength').val()); }
						
						if (startOffset != null) {
							MapToolbar.addPoint(polyPath[i-1], newPoly, 0);
							var odml = google.maps.geometry.spherical.computeOffset(polyPath[i-1], stSwlength, h1);
							platLng = google.maps.geometry.spherical.computeOffset(odml, offset, h1 +  side);
							MapToolbar.addPoint(platLng, newPoly, 1);
							newPoly.markers.getAt(0).lineX = null;
						} else {
							platLng = google.maps.geometry.spherical.computeOffset(polyPath[i-1], offset, h1 +  side);
							MapToolbar.addPoint(platLng, newPoly, 0);
							newPoly.markers.getAt(0).lineX = null;
						}
						
						if (polyBaseLine.markers.getAt(i-1).prln == null) {
							polyBaseLine.markers.getAt(i-1).prln = newPoly.id + ':' + kodOffset + ':start:' + startOffset + ':' + stSwlength;
						} else {
							if (polyBaseLine.markers.getAt(i-1).prln == '') {
								polyBaseLine.markers.getAt(i-1).prln = newPoly.id + ':' + kodOffset + ':start:' + startOffset + ':' + stSwlength;
							} else {
								polyBaseLine.markers.getAt(i-1).prln += '§' + newPoly.id + ':' + kodOffset + ':start:' + startOffset + ':' + stSwlength;
							}
						}
						//.prln = '§' + newPoly.id + ':' + kodOffset + ':start:' + startOffset + ':' + stSwlength;
	 				}
					
					if (i == eP) {
						//2do : double check 14/12/2012	
						var kodOffset = (side < 0)?  -offset : offset;
						var endOffset = null;
						if (document.getElementById('plswAtEnd').checked) { endOffset = 0; }
						var edSwlength = null;
						if (document.getElementById('plswAtEnd').checked) { edSwlength = parseFloat($('#pLedSwLength').val()); }
		 						 				
		 				if (endOffset != null) {
							var odml = google.maps.geometry.spherical.computeOffset(polyPath[i], -edSwlength, h1);
														
							platLng = google.maps.geometry.spherical.computeOffset(odml, offset, h1 +  side);
							var plength = newPoly.markers.length;
							//alert(newPoly.markers.length);
							MapToolbar.addPoint(platLng, newPoly, plength);
							//alert(newPoly.markers.length);
		 					MapToolbar.addPoint(polyPath[i], newPoly, plength+1);
		 					//alert(newPoly.markers.length);
		 					//newPoly.markers.getAt(0).lineX = polyid + ':' + eP;
						} else {
							platLng = google.maps.geometry.spherical.computeOffset(polyPath[i], offset, h1 + side);
		 					MapToolbar.addPoint(platLng, newPoly, newPoly.markers.length);	
		 					//newPoly.markers.getAt(0).lineX = polyid + ':' + eP;
						}
						
						if (polyBaseLine.markers.getAt(i).prln == null) {
							polyBaseLine.markers.getAt(i).prln = newPoly.id + ':' + kodOffset + ':end:' + endOffset + ':' + edSwlength;
						} else {
							if (polyBaseLine.markers.getAt(i).prln == '') {
								polyBaseLine.markers.getAt(i).prln = newPoly.id + ':' + kodOffset + ':end:' + endOffset + ':' + edSwlength;	
							} else {
								polyBaseLine.markers.getAt(i).prln += '§' + newPoly.id + ':' + kodOffset + ':end:' + endOffset + ':' + edSwlength;	
							}
						}
						//.prln = '§' + newPoly.id + ':' + kodOffset + ':end:' + endOffset + ':' + edSwlength;
					} else {
						var h2 = google.maps.geometry.spherical.computeHeading(polyPath[i],polyPath[i+1]);
						//alert(h1 + ' / ' + h2 + ' = ' + intersection_angle(h1, h2)); 
						var fic = intersection_angle(h1, h2);
						var s12 = fic.angle;
						var sdir = fic.direction;
						//alert('s12 : ' + s12);
						
						//if (s12 >= 0) {
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

							}	else { // > 90
								//alert('s12 > 180 : ' + s12);
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
				if ((epoly.markers.getAt(k).curve == null) && (epoly.markers.getAt(k).tcurve == null)) {
					path.push(allPoints[k]);
					
					var note = '', pit = '', bve = '', kit = '';
					if (epoly.markers.getAt(k).note != null) { note = epoly.markers.getAt(k).note; } 
					if (epoly.markers.getAt(k).pitch != null) { pit = epoly.markers.getAt(k).pitch; }
					if (epoly.markers.getAt(k).bve != null) { bve = epoly.markers.getAt(k).bve; }
					if (epoly.markers.getAt(k).kit != null) { kit = epoly.markers.getAt(k).kit; }
					
					var dis =  google.maps.geometry.spherical.computeLength(path);
					
					gnote.push([Math.ceil(dis.toString()), note, pit, bve, kit]); 
					
				} else {
					if ((epoly.markers.getAt(k).curve != null) || (epoly.markers.getAt(k).tcurve == null)) {
						if (epoly.markers.getAt(k).curve != '') {
							// 'curve:'+ curve.id + '§radius:' + preR * dir + '§cant:' + parseFloat($('#sBtnRCCant').val()) + '§limit:' + parseFloat($('#sBtnRCDesignSpeed').val()) + '§tlength:' + l2m1 + '§clength:' + arcL + '§center:' + Cc.lat() + '/' + Cc.lng() + '§start_point:' + extp[0].lat() + '/' + extp[0].lng() + '§end_point:' + extp[extp.length-1].lat() + '/' + extp[extp.length-1].lng()  + '§h1:' + h1 + '§h2:' + h2 + '§forceSL:' + enforceSL; 
							var cuvarr = epoly.markers.getAt(k).curve.split('§');
							var cuvid =cuvarr[0].split(':')[1];
							var cR = Math.abs(parseFloat(cuvarr[1].split(':')[1]));
							var tL = parseFloat(cuvarr[4].split(':')[1]);
							var cL = parseFloat(cuvarr[5].split(':')[1]);
							var xpc = new google.maps.LatLng(parseFloat(cuvarr[6].split(':')[1].split('/')[0]), parseFloat(cuvarr[6].split(':')[1].split('/')[1]));
							var xp1 = new google.maps.LatLng(parseFloat(cuvarr[7].split(':')[1].split('/')[0]), parseFloat(cuvarr[7].split(':')[1].split('/')[1]));
							var xp2 = new google.maps.LatLng(parseFloat(cuvarr[8].split(':')[1].split('/')[0]), parseFloat(cuvarr[8].split(':')[1].split('/')[1]));
							var xh1 = parseFloat(cuvarr[9].split(':')[1]);
							var xh2 = parseFloat(cuvarr[10].split(':')[1]);
							
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

							var note = '', pit = '', bve = '', kit = '';
							if (cpoly.markers.getAt(0).note != null) { note = cpoly.markers.getAt(0).note; } 
							if (cpoly.markers.getAt(0).pitch != null) { pit = cpoly.markers.getAt(0).pitch; }
							if (cpoly.markers.getAt(0).bve != null) { 
								if (cpoly.markers.getAt(0).bve.indexOf('curve:' + cuvid) < 0 ) {	bve = cpoly.markers.getAt(0).bve + '§curve:' + cuvid; }
							} else {
								bve = "curve:" + cuvid; 
							}
							if (cpoly.markers.getAt(0).kit != null) { kit = cpoly.markers.getAt(0).kit; }
							
							gnote.push([Math.ceil(cuvstart).toString(), note , pit, bve, kit]); 
							var cuvendidx =-1;
														
							for (var c = 1; c < cpoly.markers.length; c++) {									
								if ((typeof cpoly.markers.getAt(c).ld1 != 'undefined') || (typeof cpoly.markers.getAt(c).ld2 != 'undefined' )) {
									var note = '', pit = '', bve = '', kit = '';
									if (cpoly.markers.getAt(c).note != null) { note = cpoly.markers.getAt(c).note; } 
									if (cpoly.markers.getAt(c).pitch != null) { pit = cpoly.markers.getAt(c).pitch; }
									if (cpoly.markers.getAt(c).bve != null) { bve = cpoly.markers.getAt(c).bve; }
									if (cpoly.markers.getAt(c).kit != null) { kit = cpoly.markers.getAt(c).kit; }
					
									var dis = Math.ceil(parseFloat(cpoly.markers.getAt(c).ld1) + cuvstart);
									gnote.push([dis.toString(), note, pit, bve, kit]);
																													
								} else if (cpoly.markers.getAt(c).kit != null){
									if (cpoly.markers.getAt(c).kit.indexOf('curve:end') >= 0) {
										cuvendidx = c;
									}
								}
							} 
							
							if (cuvendidx > 0){
								if (cpoly.markers.getAt(cuvendidx).kit.indexOf('curve:end') >= 0) {
									var note = '', pit = '', bve = '', kit = '';
									if (cpoly.markers.getAt(cuvendidx).note != null) { note = cpoly.markers.getAt(cuvendidx).note; } 
									if (cpoly.markers.getAt(cuvendidx).pitch != null) { pit = cpoly.markers.getAt(cuvendidx).pitch; }
									if (cpoly.markers.getAt(cuvendidx).bve != null) { bve = cpoly.markers.getAt(cuvendidx).bve; }
									if (cpoly.markers.getAt(cuvendidx).kit != null) { kit = cpoly.markers.getAt(cuvendidx).kit; }
									var cuvend = Math.ceil(cuvstart + cL);
									gnote.push([cuvend.toString(), note, pit, bve, kit]); 									
								}
							} else {
								alert('unable to detect end of ' + cuvid);
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
							
							for (var i=0; (i < points+1); i++) 
  						{     
    	  				path.push(google.maps.geometry.spherical.computeOffset(xpc, cR, iB + i*deltaBearing)); 
							}
							path.push(xp2);
							
							
						}
					} else if ((epoly.markers.getAt(k).curve == null) || (epoly.markers.getAt(k).tcurve != null)) {
						if (epoly.markers.getAt(k).tcurve != '') {
							//2do
						}
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
			var startdistance = Math.round(parseFloat(getTrackDistanceFromStart(polyid,rpm1).line));
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
	$('#dialogRailCurve').dialog('open');
	curveCalculator('RC','');
}

function drawRailCurve() {
	if (typeof $('#DCbasePolyID').val() != 'undefined') {
		var polyL = null;
		if (MapToolbar.features["lineTab"][$('#DCbasePolyID').val()] != null) {
			polyL = MapToolbar.features["lineTab"][$('#DCbasePolyID').val()];
			var currIdx = parseInt($('#DCmarkerIndex').val());
			var enforceSL = (document.getElementById('enforceSpeedLimit').checked)? true : false;
			var railIndex = 0;
			//alert($('#ddc_railindex option:selected').text());
			for (r = 0; r < bverailobjArr.length; r++) {
				if (bverailobjArr[r][2] == $('#ddc_railindex option:selected').text()) {
					railIndex = r;
					break;
				}
			}
			if (polyL.markers.getAt(currIdx).curve != null) {
				if (polyL.markers.getAt(currIdx).curve != '') {
					var arr = polyL.markers.getAt(currIdx).split('§');
					alert('Please remove the current curve (' + arr[0].split(':')[1]+ ') at this point.');
					$('#dialogRailCurve').dialog('close');					
					return;
				}
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
				var intAngleDeg = fic.angle;
				var dir = fic.direction;
				
				if (dir == 0) {
					alert('sorry, unable to draw curve on stright line');
					$('#dialogRailCurve').dialog('close');	
				} else {
					var curveAngleDeg = 180-intAngleDeg ; 
					var curveAngleRad = curveAngleDeg.toRad();
					var preR = (typeof $('#sBtnCurveRadius').val() != 'undefined')? parseFloat($('#sBtnCurveRadius').val()) : 160;
					var l2m1 = preR /(Math.tan((intAngleDeg/2).toRad())); // length@distance to m1 point
					var np1 = google.maps.geometry.spherical.computeOffset(m1, -l2m1, h1);
					var np2 = google.maps.geometry.spherical.computeOffset(m1, l2m1, h2);
					var arcL = (curveAngleDeg/360) * 2 * Math.PI * preR;

					var cc1a = google.maps.geometry.spherical.computeOffset(np1, preR, h1 + (90 * dir));
					var cc1b = google.maps.geometry.spherical.computeOffset(np1, preR, h1 - (90 * dir));
					var cc2a = google.maps.geometry.spherical.computeOffset(np2, preR, h2 + (90 * dir));
					var cc2b = google.maps.geometry.spherical.computeOffset(np2, preR, h2 - (90 * dir));	

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
							
					var points = Math.ceil(arcL/25);
					var iB = google.maps.geometry.spherical.computeHeading(Cc,np1);
					var fB = google.maps.geometry.spherical.computeHeading(Cc,np2);

					var extp = new Array();
					var br = null;
				
					br = fB - iB;
				
					if (br >  180) {br -= 360;}
					if (br < -180) {br += 360;}
				
					var deltaBearing = br/points;
				
					for (var i=0; (i < points+1); i++) 
  				{     
    	  		extp.push(google.maps.geometry.spherical.computeOffset(Cc, preR, iB + i*deltaBearing)); 
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
					curve.ctype = null;
					curve.note = null; 
					curve.$el = MapToolbar.addFeatureEntry(curve.id);
					curve.markers = new google.maps.MVCArray;	     
					MapToolbar.features['curveTab'][curve.id] = curve;
									
							
 					MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx).note = null ;
 					MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx).curve = 'curve:'+ curve.id + '§radius:' + preR * dir + '§cant:' + parseFloat($('#sBtnRCCant').val()) + '§limit:' + parseFloat($('#sBtnRCDesignSpeed').val()) + '§tlength:' + l2m1 + '§clength:' + arcL + '§center:' + Cc.lat() + '/' + Cc.lng() + '§start_point:' + extp[0].lat() + '/' + extp[0].lng() + '§end_point:' + extp[extp.length-1].lat() + '/' + extp[extp.length-1].lng()  + '§h1:' + h1 + '§h2:' + h2 + '§forceSL:' + enforceSL; 
 					if ((MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx).bve != null) && (MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx).bve != '')) {
 						if (MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx).bve.indexOf('railindex:') >= 0) {
 							var arrCur = MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx).bve.split('§');
 							for (h = 0; h < arrCur.length; h++) {
 								if (arrCur[h].split(':')[0] = 'railindex') {
 									arrCur[h] = '§railindex:' + railIndex;
 									MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx).bve = arrCur.join('§');
 									break;
 								}
 							}
 						} else {
	 						MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx).bve += '§railindex:' + railIndex;
 						}
 					} else {
 						MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx).bve = 'railindex:' + railIndex;
 					}

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
				    note: null, // any extra note 
   					pitch: null, // track pitch
						bve: null, // various bve data
						lineX:null, // non parallel line distance
						turn:null, // main line non curve turning
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
				    title: curve.id + ' end point : ' + extp[extp.length-1],
				    note: null, // any extra note 
   					pitch: null, // track pitch
						bve: null, // various bve data
						lineX:null, // non parallel line distance
						turn:null, // main line non curve turning
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
					infoWindowTxt += '<br>line id : ' + curve.pid + ' mid : ' + curve.mid; 																	// warning : marker ID sentiasa berubah2, reference ke marker index tak boleh digunakan
					infoWindowTxt += '<br>radius : ' + (preR * dir) + 'm<br>design speed : ' + parseFloat($('#sBtnRCDesignSpeed').val()) + ' km/h<br>cant : ' + parseFloat($('#sBtnRCCant').val()) + ' mm';
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
					/*
					if ($('#dialogRailSwitch').dialog('isOpen')) {
						if ($('#railend_pid').val() != curve.id) {
							$('#railbase_sw').val(curve.id);
						}
					}	
					*/
					});
					$('#dialogRailCurve').dialog('close');	     							
				}
		}
	}
}

function predrawRailTransitionCurve(polyid,mindex) {
	$('#DtCbasePolyID').prop("value", polyid);
	$('#DtCmarkerIndex').prop("value", mindex);
	$('#dialogRailTransitionCurve').dialog('open');
	curveCalculator('TC','');
}

function drawRailTransitionCurve() {
	if (typeof $('#DtCbasePolyID').val() != 'undefined') {
		var polyL = null;
		if (MapToolbar.features["lineTab"][$('#DtCbasePolyID').val()] != null) {
			polyL = MapToolbar.features["lineTab"][$('#DtCbasePolyID').val()];
			var currIdx = parseInt($('#DtCmarkerIndex').val());
			
			if ((polyL.markers.getAt(currIdx).note != '') && (polyL.markers.getAt(currIdx).note != null)) {
				var str = polyL.markers.getAt(currIdx).note;				
				if (str.indexOf('curve') >= 0) {
					var arr = str.split('§');
					for (x=0; x < arr.length; x++) {
						if (arr[x].indexOf('curve') >= 0) {
							alert('Please remove the current curve (' + arr[x].split(':')[1]+ ') at this point.');
							break;
						}
					}
					$('#dialogRailTransitionCurve').dialog('close');					
					return;
				}
			}
			
			if ((typeof polyL.markers.getAt(currIdx - 1).index != 'undefined') && (typeof polyL.markers.getAt(currIdx + 1).index != 'undefined')) {
				var cant = parseFloat($('#sBtnRtCCant').val()); // mm unit
				var gauge = parseFloat($('#sRTCBtnGauge').val()); // mm unit
				var v_ds = parseFloat($('#sBtnRTCDesignSpeed').val()); // kph unit
				var TcL =  parseFloat($('#sBtnTCLength').val());
				var _shift = parseFloat($('#sBtnTCShift').val());
				
				var m0 = polyL.markers.getAt(currIdx-1).getPosition();
				var m1 = polyL.markers.getAt(currIdx).getPosition();
				var m2 = polyL.markers.getAt(currIdx+1).getPosition();
				var h1 = google.maps.geometry.spherical.computeHeading(m0,m1);
				var h2 = google.maps.geometry.spherical.computeHeading(m1,m2);
				var fic = intersection_angle(h1,h2);
				var intAngleDeg = fic.angle;
				var dir = fic.direction;
				
				if (dir == 0) {
					alert('sorry, unable to draw curve or transition curve on stright line');
					$('#dialogRailTransitionCurve').dialog('close');	
					
				} else {
					
				var curveAngleDeg = intAngleDeg ; //180 - intAngleDeg ; 
				var curveAngleRad = curveAngleDeg.toRad();
				var preR = (typeof $('#sBtnRTCCircularRadius').val() != 'undefined')? parseFloat($('#sBtnRTCCircularRadius').val()) : 160;
				//var l2m1 = preR /(Math.tan((intAngleDeg.toRad()/2))); // length@distance to m1 point
				
				var rmin = 1.39 * Math.sqrt(preR * TcL);
				
				if (preR < rmin) {				
					alert('Warning: Minimum radius for this transition curve is ' + rmin + ' m.'); 
					return;
				}	

			
				var tlen = ((preR + _shift)/(Math.tan(curveAngleRad/2)))+ (TcL/2); // tangent length from intersection point to transition start/end point
				var ntp1 = google.maps.geometry.spherical.computeOffset(m1, -tlen, h1); //point 1 : transition start
				var ntp2 = google.maps.geometry.spherical.computeOffset(m1, tlen, h2); //point 2 : transition end
								
				var Xb = (TcL/2)*(1/(Math.sqrt(1+Math.pow((TcL/(2*preR)),2))));								
				var tditcl = (preR + _shift)/(Math.tan(curveAngleRad/2));			
				var tditc0 = google.maps.geometry.spherical.computeOffset(m1, -tditcl, h1);
				var tditc1 = google.maps.geometry.spherical.computeOffset(m1, tditcl, h2);
				
				var im1 = new google.maps.Marker({
				    position: tditc0,
				    map: map,
				    icon: 'images/bullet_grey.png'
	        });
	        
				var im1 = new google.maps.Marker({
				    position: tditc1,
				    map: map,
				    icon: 'images/bullet_grey.png'
	        });					
				
				var nscc1 = google.maps.geometry.spherical.computeOffset(tditc0, (preR+_shift), h1 + (90 * dir));
				var nscc2 = google.maps.geometry.spherical.computeOffset(tditc0, (preR+_shift), h1 - (90 * dir));
				var nscc3 = google.maps.geometry.spherical.computeOffset(tditc1, (preR+_shift), h2 + (90 * dir));
				var nscc4 = google.maps.geometry.spherical.computeOffset(tditc1, (preR+_shift), h2 - (90 * dir));	
				
				var Cc = null;
				
					if (google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc3) <= 1) {
						Cc = nscc1;
						//alert('center match : \n' + google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc3) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc4) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc3) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc4));
						//var Cc = google.maps.geometry.spherical.computeOffset(np1, preR, h1 + (90 * dir));
					} else if (google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc4) <= 1) {
						Cc = nscc2;
						//alert('center match : \n' + google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc3) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc4) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc3) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc4));
						//var Cc = google.maps.geometry.spherical.computeOffset(np1, preR, h1 + (90 * dir));
					} else if (google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc3) <= 1) {
						Cc = nscc3;
						//alert('center match : \n' + google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc3) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc4) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc3) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc4));
						//var Cc = google.maps.geometry.spherical.computeOffset(np1, preR, h1 + (90 * dir));
					} else if (google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc4) <= 1) {
						Cc = nscc4;
						//alert('center match : \n' + google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc3) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc4) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc3) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc4));
						//var Cc = google.maps.geometry.spherical.computeOffset(np1, preR, h1 + (90 * dir));
					} else {
						//alert('center satu pun tak match : \n' + google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc3) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc1,nscc4) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc3) + '\n' + google.maps.geometry.spherical.computeDistanceBetween(nscc2,nscc4));
							Cc = nscc1;
					}		
							
				var cm1 = new google.maps.Marker({
				    position: Cc,
				    map: map,
				    icon: 'images/bullet_white.png'
	        });

				var parts = 30; // any value, higher = more precision on plotting
				var ts = TcL / parts; // TotalX = full length of transition by assumption (see Cubic Parabola calculation), ntc new transition segment divided by any value
				var TotalY = (Math.pow(TcL,2))/(6*preR); //(Math.pow(TcL,2)/(6*preR)) - (preR*(1-(1/(Math.sqrt(1+Math.pow((TcL/(2*preR)),2)))))); //4 * _shift;//(TcL*TcL)/(6*preR);
             
				var tarr = new Array();
				var scp1;
				var scp2;
				
				
				
				for (var i=0; (i <= parts); i++) 
  			{     
    	  	if (i == 0) 
    	  	{
    	  		tarr.push(ntp1);
    	  		var mmx = new google.maps.Marker({
				    position: tarr[tarr.length-1],
				    map: map,
				    icon: 'images/gbm-m_curve.png'
	        });	
    	  		 
    	  	} 
    	  	else if (i== parts) 
    	  	{
    	  		var scp1x = google.maps.geometry.spherical.computeOffset(ntp1, TcL, h1);
						var scp1y = google.maps.geometry.spherical.computeOffset(scp1x, TotalY, h1+(90 * dir));
						var xo = google.maps.geometry.spherical.computeHeading(tarr[i-1],scp1y);
						var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[i-1],scp1y);
						scp1 = google.maps.geometry.spherical.computeOffset(tarr[i-1], xd, xo);
						tarr.push(xi);   	  		 
    	  	}
    	  	else 
    	  	{
    	  		var yi = google.maps.geometry.spherical.computeOffset(ntp1, ts * i, h1);
    	  		var ycd = (Math.pow((ts * i),3))/(6 * preR * TcL);
    	  		var yd = google.maps.geometry.spherical.computeOffset(yi, ycd , h1+(90 * dir));
    	  		var xo = google.maps.geometry.spherical.computeHeading(tarr[i-1],yd);
    	  		var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[i-1],yd);
    	  		var xi = google.maps.geometry.spherical.computeOffset(tarr[i-1], xd, xo);
    	  		tarr.push(xi);
    	  	}
				}		

    	  var scp2x = google.maps.geometry.spherical.computeOffset(ntp2, -TcL, h2);
				var scp2y = google.maps.geometry.spherical.computeOffset(scp2x, -TotalY, h2-(90 * dir));
				var xo = google.maps.geometry.spherical.computeHeading(tarr[tarr.length-1],scp2y);
				var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[tarr.length-1],scp2y);
				scp2 = google.maps.geometry.spherical.computeOffset(tarr[tarr.length-1], xd, xo);
			
				var arcL = preR*curveAngleRad - tlen; //(curveAngleDeg/360) * 2 * Math.PI * preR;
					
				var points = Math.ceil(arcL/25);
				var iB = google.maps.geometry.spherical.computeHeading(Cc,scp1);
				var fB = google.maps.geometry.spherical.computeHeading(Cc,scp2);
	
				var br = null;
				
				br = fB - iB;
				if (br >  180) {br -= 360;}
				if (br < -180) {br += 360;}
				
				var deltaBearing = br/points;

					for (var i=0; (i < points+1); i++) 
  				{     
    	  		tarr.push(google.maps.geometry.spherical.computeOffset(Cc, preR, iB + i*deltaBearing)); 
    	  		if (i == 0) {  						
							var mmx = new google.maps.Marker({
						    position: tarr[tarr.length-1],
						    map: map,
						    icon: 'images/curve-sign.png'
	        		});	
  					} else if (i == points) {
							var mmx = new google.maps.Marker({
						    position: tarr[tarr.length-1],
						    map: map,
						    icon: 'images/curve-sign.png'
	        		});	 						
  					}
					}				
				
				for (var i=parts; (i >= 0); i--) 
  			{     
    	  	if (i == 0) 
    	  	{
    	  		tarr.push(ntp2); 
    	  		var mmx = new google.maps.Marker({
				    position: tarr[tarr.length-1],
				    map: map,
				    icon: 'images/gbm-m_curve.png'
	        });		  		 	 
    	  	} 
    	  	else if (i== parts) 
    	  	{		
						tarr.push(scp2);  	  		 
    	  	}
    	  	else 
    	  	{
    	  		var yi = google.maps.geometry.spherical.computeOffset(ntp2, -ts * i, h2);
    	  		var ycd = (Math.pow((ts * i),3))/(6 * preR * TcL);
    	  		var yd = google.maps.geometry.spherical.computeOffset(yi, -ycd , h2-(90 * dir));
    	  		var xo = google.maps.geometry.spherical.computeHeading(tarr[i-1],yd);
    	  		var xd = google.maps.geometry.spherical.computeDistanceBetween(tarr[i-1],yd);
    	  		var xi = google.maps.geometry.spherical.computeOffset(tarr[i-1], xd, xo);
    	  		tarr.push(xi);
    	  	}
				}				

				var tcurve = new google.maps.Polyline({
						path: [tarr],
           	strokeColor: "#FF0FF0",
           	strokeOpacity: 0.7,
						geodesic: true,
						map: map,
           	strokeWeight: 1
					});
									
					++MapToolbar["transcurveCounter"];
					tcurve.id = 'tcurve_'+ MapToolbar["transcurveCounter"];
					tcurve.pid = polyL.id;
					tcurve.mid = currIdx;
					tcurve.tctype = null;
					tcurve.note = null; 
					tcurve.$el = MapToolbar.addFeatureEntry(tcurve.id);
					tcurve.markers = new google.maps.MVCArray;	     
					MapToolbar.features['tcurveTab'][tcurve.id] = tcurve;
									
							
 					MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx).note = null ;
 					MapToolbar.features["lineTab"][polyL.id].markers.getAt(currIdx).tcurve = 'curve:'+ tcurve.id + '§radius:' + preR * dir + '§cant:' + parseFloat($('#sBtnRCCant').val()) + '§limit:' + parseFloat($('#sBtnRCDesignSpeed').val()) + '§tlength:' + l2m1 + '§clength:' + arcL + '§center:' + Cc.lat() + '/' + Cc.lng() + '§start_point:' + extp[0].lat() + '/' + extp[0].lng() + '§end_point:' + extp[extp.length-1].lat() + '/' + extp[extp.length-1].lng()  + '§h1:' + h1 + '§h2:' + h2 + '§forceSL:' + enforceSL; 
										
					
				google.maps.event.addListener(tcurve, "click", function(mEvent){
					//alert(mEvent.latLng.toString());
					var infoWindowTxt = 'curve Id : ' + tcurve.id + '<br>curve length : ' + arcL;
					infoWindowTxt += '<br>start point : ' + extp[0] + '<br>end point : ' + extp[extp.length-1];
					infoWindowTxt += '<br>curve center : ' + Cc;
					var lat0 = mEvent.latLng.lat();
					var lng0 = mEvent.latLng.lng();
		
					infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="3"><tr><td>';
					infoWindowTxt += '<img src="images/marker_remove.png" title="Remove marker" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\'' + tcurve.id + '\');"></td><td>&nbsp;</td><td>';
  
					infoWindowTxt += '<select name="menu_m_type" id="menu_m_type" style="font-size:10px" onchange="setMarkerType(\''+ tcurve.id + '\');"><option> - select - </option>';
					if (tcurve.tctype == 'm_stopsign') {infoWindowTxt += '<option value="m_stopsign" selected>Stop Sign</option>'; } else {infoWindowTxt += '<option value="m_stopsign">Stop Sign</option>';}
					if (tcurve.tctype == 'm_rail_start') {infoWindowTxt += '<option value="m_rail_start" selected>Rail Start</option>'; } else {infoWindowTxt += '<option value="m_rail_start">Rail Start</option>'; }
					if (tcurve.tctype == 'm_rail_end') {infoWindowTxt += '<option value="m_rail_end" selected>Rail End</option>'; } else {infoWindowTxt += '<option value="m_rail_end">Rail End</option>'; }
					if (tcurve.tctype == 'm_tree') {infoWindowTxt += '<option value="m_tree" selected>Tree</option>'; } else {infoWindowTxt += '<option value="m_tree">Tree</option>'; }
					if (tcurve.tctype == 'm_traffic_signal') {infoWindowTxt += '<option value="m_traffic_signal" selected>Traffic Signal</option>'; } else {infoWindowTxt += '<option value="m_traffic_signal">Traffic Signal</option>'; }
					if (tcurve.tctype == 'm_object') {infoWindowTxt += '<option value="m_object" selected>Custom Object</option>'; } else {infoWindowTxt += '<option value="m_object">Custom Object</option>'; }
  		
					infoWindowTxt += '</select></td></tr></table>';
	   	
					var infowindow = new google.maps.InfoWindow({
						content: infoWindowTxt,
						position: mEvent.latLng
						});
        
					infowindow.open(map);	
					/*
					if ($('#dialogRailSwitch').dialog('isOpen')) {
						if ($('#railend_pid').val() != curve.id) {
							$('#railbase_sw').val(curve.id);
						}
					} */		
					});
					
					
				}
        $('#dialogRailTransitionCurve').dialog('close');
				$('#tnote').html('');
								
				
			}
		}
	}
}

function intersection_angle(h1,h2) {
	// by : Karya IT (Mac 2012)
	// url : http://www.karyait.net.my/
	// ver. : 1.0.0
	// purpose : angle and direction between two line @ bearing
	
	var angle = 0;
	var hd = 0; // 0 - error, -ve left, +ve right
	
	var lineratio = h1 / h2;
	
	if ((Math.round(lineratio*1000)/1000) == 1) {
		return {'angle': angle, 'direction':hd};
	}
	
	if (h1 >= 0) { // +ve bearing H1
		if ((h1 > 0) && (h1 < 90)) {
			// ****************** h1 0 ~ 90
			
			if (h2 < 0) {
				switch (true) {
  				case (h2 == -180):
    				angle = h1; // cek - ok 13/10/12
    				hd = 1;
    				break;
  				case (h2 == -90):
    				angle = 180 - h1 + h2; // cek - ok 13/10/12
    				hd = -1;   		
    				break;
  				case (h2 >-90):
    				angle = 180 - h1 + h2; // cek - ok 13/10/12
    				hd = -1;
    				break;
  				case (h2 > -180):
    				//2/4 kes
    				angle = 180 - h1 + h2; // cek - ok 13/10/12
    				if ( angle >= 0) { 
    					hd = -1; 
    				} else {
    					hd = 1; 
    					angle *= -1;
    				}    		
    				break;    						
				}				
			} else {
				switch (true) {
					case (h2 == 0):
  					angle = 180 - h1; // cek - ok 13/10/12
  					hd = -1;
  					break;
					case (h2 < 90):
  					//2/4 kes
  					angle = 180 - h2 + h1;
  					if (angle < 180) { 
  						hd = 1; 
  					} else {
  						hd = -1;
  						angle = 180 - h1 + h2; // angle correction
  					}
  					break;
  				case (h2 == 90):
    				angle = h1 + h2; // cek - ok 13/10/12
    				hd = 1;
  		  		break;
  				case (h2 < 180):
    				angle = 180 - h2 + h1; // cek - ok 13/10/12
    				hd = 1;
    				break;
  				case (h2 == 180):
    				angle = h1; // cek - ok 13/10/12
    				hd = 1;
    				break;
  			}				
			}
			
		} else if (h1 == 90) {
			// *********************** h1 90
			
			if (h2 < 0) {
				switch (true) {
  				case (h2 == -180):
						angle = -h1 - h2; // -90 - -x
						hd = 1;			
    				break;
  				case (h2 == -90):
						angle = 0; // 90 - 90
						hd = 0;
    				break;
  				case (h2 >-90):
						angle = h1 + h2; // 90 + -x
						hd = -1;			
    				break;
  				case (h2 > -180):
						angle = -h1 - h2; // -90 - -x
						hd = -1;			
    				break;
				}
			} else {
				switch (true) {
					case (h2 == 0):
						angle = h1;
						hd = -1;
  					break;
					case (h2 < 90):
						angle = h1 + h2;
						hd = -1;
  					break;
  				case (h2 == 90):
						angle = h1 + h2; // 180o
						hd = 0;
  		  		break;
  				case (h2 < 180):
						angle = h1 + 180 - h2;
						hd = 1;
    				break;
  				case (h2 == 180):
						angle = h1; // h1 + 180 - 180
						hd = 1;
    				break;
  			}			 		 				
			}
			
		} else if ((h1 > 90) && (h1 < 180)) {
			// **************** h1 90 ~ 180
			
			if (h2 < 0) {			
				switch (true) {
  				case (h2 ==-180):
						angle = h1;
						hd = 1;
    				break;
  				case (h2 == -90):
						angle = h1 - 180 - h2;
						hd = 1;
    				break;
  				case (h2 >-90):
						angle = 180 - h1 + h2;
						if ( angle >= 0) { 
							hd = -1; 
						} else {
					 		hd = 1;
					 		angle *= -1;
						} 
    				break;
  				case (h2 >-180):
						angle = h1 - 180 - h2;
						hd = 1;
    				break;
				}
			} else {
				switch (true) {
					case (h2 == 0):
						angle = 180 - h1;
						hd = -1;
  					break;
					case (h2 < 90):
						angle = 180 - h1 + h2;
						hd = -1;
  					break;
  				case (h2 == 90):
						angle = 180 - h1 + h2;
						hd = -1;
  		  		break;
  				case (h2 < 180):
						angle = 180 - h1 + h2;
						if (angle < 180) {
							hd = -1;
						} else {
							hd = 1;
							angle = h1 + 180 - h2;
						}
    				break;
  				case (h2 == 180):
						angle = h1;
						hd = 1;
    				break;
  			}				
			}			
		
		} else if (h1 == 180) {
			// *********************** h1 : 180
			
			if (h2 < 0) {			
				switch (true) {
  				case (h2 ==-180):
						angle = 0; // line stright
						hd = 0;
    				break;
  				case (h2 == -90):
						angle = -h2;
						hd = 1;
    				break;
  				case (h2 >-90):
						angle = -h2;
						hd = 1;
    				break;	
  				case (h2 >-180):
						angle = -h2;
						hd = 1;
    				break;
    		}		
			} else {
				switch (true) {	
					case (h2 == 0):
						angle = 0; // not possible
						hd = 0;
  					break;
					case (h2 < 90):
						angle = h2;
						hd = -1;
  					break;
		  		case (h2 == 90):
						angle = h2;
						hd = -1;
		  		  break;
  				case (h2 < 180):
						angle = h2;
						hd = -1;
    				break;
		  		case (h2 == 180):
						angle = 0; // line stright
						hd = 0;
    				break;
 		 		}
			}
		
		} else {
			// *********************** h1 0
			
			if (h2 < 0) {			
				switch (true) {
  				case (h2 ==-180):
						angle = 0;
						hd = 0;
		    		break;
  				case (h2 == -90):
						angle = 180 + h2;
						hd = -1;
		    		break;
		  		case (h2 > -90):
						angle = 180 + h2;
						hd = -1;
    				break;
		  		case (h2 > -180):
						angle = 180 + h2;
						hd = -1;
    				break;
				}
			} else {
				switch (true) {
					case (h2 == 0):
						angle = 180;
						hd = 0;
  					break;
					case (h2 < 90):
						angle = 180 - h2;
						hd = 1;
  					break;
		  		case (h2 == 90):
						angle = 180 - h2;
						hd = 1;
  		  		break;
		  		case (h2 < 180):
						angle = 180 - h2;
						hd = 1;
    				break;
		  		case (h2 == 180):
						angle = 180 - h2;
						hd = 0;
    				break;
  			}	
			}
			
		}
	} else {  // *************************************************************************** -ve bearing H1 *****************************
		if ((h1 < 0) && (h1 > -90)) {
			// *********************** h1 0 ~ -90
			
			if (h2 < 0) {
				switch (true) {
  				case (h2 ==-180):
						angle = -h1;
						hd = -1;
		    		break;
  				case (h2 == -90):
						angle = 180 + h1 - h2;
						hd = -1;
		    		break;
		  		case (h2 > -90):
						angle = 180 + h1 - h2;
						if (angle < 180) {
							hd = 1;
						} else {
							hd = -1;
							angle = 180 - h1 + h2;
						}	
    				break;
  				case (h2 >-180):
						angle = 180 - h1 + h2;
						hd = -1;
		    		break;
				}			
			} else {
				switch (true) {
					case (h2 == 0):
						angle = 180 + h1;
						hd = 1;
  					break;
  				case (h2 == 90):
						angle = 180 + h1 - h2;
						hd = 1;
  		  		break;
					case (h2 < 90):
						angle = 180 + h1 - h2;
						hd = 1;
  					break;
  				case (h2 < 180):
						angle = 180 + h1 - h2;
						if (angle >= 0) {
							hd = 1;
						} else {
							hd = -1;
							angle *= -1;
						}
    				break;
  				case (h2 == 180):
						angle = -h1;
						hd = -1;
    				break;
  			}				
			}

		} else if (h1 == -90) {
			// *********************** h1 -90
			
			if (h2 < 0) {			
				switch (true) {
  				case (h2 ==-180):
						angle = -h1;
						hd = -1;
		    		break;
  				case (h2 == -90):
						angle = 180;
						hd = 0;
		    		break;
  				case (h2 >-90):
						angle = 180 + h1 - h2;
						hd = 1;
		    		break;	
		  		case (h2 >-180):
						angle = 180 + h1 + 180 + h2;
						hd = -1;
    				break;
    		}		
			} else {
				switch (true) {
					case (h2 == 0):
						angle = 180 + h1;
						hd = 1;
		  			break;
					case (h2 < 90):
						angle = 180 + h1 - h2;
						hd = 1;
		  			break;
  				case (h2 == 90):
						angle = 0;
						hd = 0;
		  		  break;
		  		case (h2 < 180):
						angle = h1 + h2;
						hd = -1;
		    		break;
		  		case (h2 == 180):
						angle = -h1;
						hd = -1;
		    		break;
  			}				
			}
				  					
		} else if ((h1 < -90) && (h1 > -180)) {
			// *********************** h1 -90 ~ 180
			
			if (h2 < 0) {			
				switch (true) {
  				case (h2 ==-180):
						angle = -h1;
						hd = -1;				
		    		break;
		  		case (h2 == -90):
						angle = 180 + h1 - h2;
						hd = 1;				
		    		break;
		  		case (h2 >-90):
						angle = 180 + h1 - h2;
						hd = 1;				
		    		break;
  				case (h2 >-180):
						angle = 180 + h1 - h2;
						if (angle <= 180) {
							hd = 1;
						} else {
							hd = -1;
							angle = 180 - h1 + h2;
						}
    				break;
				}
			} else {
				switch (true) {
					case (h2 == 0):
						angle = 180 + h1 - h2;
						hd = 1;
		  			break;
					case (h2 < 90):
						angle = 180 + h1 - h2;
						if (angle >= 0) {
							hd = 1;
						} else {
							hd = -1;
							angle *=-1;
						}
		  			break;
  				case (h2 == 90):
						angle = h2 - (180 + h1);
						hd = -1;				
		  		  break;
		  		case (h2 < 180):
						angle = h2 - (180 + h1);
						hd = -1;				
		    		break;
		  		case (h2 == 180):
						angle = h2 - (180 + h1);
						hd = -1;				
		    		break;
  			}			
			}
							
		} else if (h1 == -180) {
			// *********************** h1 ~180/180
			
			if (h2 < 0) {			
				switch (true) {
		  		case (h2 ==-180):
						angle = 180;
						hd = 0;
		    		break;
		  		case (h2 == -90):
						angle = 180 + h1 - h2;
						hd = 1;
		    		break;
		  		case (h2 >-90):
						angle = 180 + h1 - h2;
						hd = 1;
		    		break;
		  		case (h2 >-180):
						angle = 180 + h1 - h2;
						hd = -1;
		    		break;
    		}			
			} else {
				switch (true) {
					case (h2 == 0):
						angle = 0;
						hd = 0;
  					break;
					case (h2 < 90):
						angle = 180 + h1 + h2;
						hd = -1;
		  			break;
  				case (h2 == 90):
						angle = 180 + h1 + h2;
						hd = -1;
		  		  break;
  				case (h2 < 180):
						angle = 180 + h1 + h2;
						hd = -1;
		    		break;
  				case (h2 == 180):
						angle = 180;
						hd = 0;			
		    		break;
  			}							
			}
			
		} else {
			// *********************** h1 0
			
			if (h2 < 0) {			
				switch (true) {
		  		case (h2 ==-180):
						angle = 0;
						hd = 0;
		    		break;
		  		case (h2 == -90):
						angle = 180 + h2;
						hd = -1;
		    		break;
		  		case (h2 >-90):
						angle = 180 + h2;
						hd = -1;
		    		break;
  				case (h2 >-180):
						angle = 180 + h2;
						hd = -1;
		    		break;
				}
			} else {
				switch (true) {
					case (h2 == 0):
						angle = 180;
						hd = 0;
		  			break;
					case (h2 < 90):
						angle = 180 - h2;
						hd = 1;
		  			break;
		  		case (h2 == 90):
						angle = 180 - h2;
						hd = 1;
		  		  break;
		  		case (h2 < 180):
						angle = 180 - h2;
						hd = 1;
		    		break;
		  		case (h2 == 180):
						angle = 0;
						hd = 0;
		    		break;
  			}				
			}
			
		}		
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

function getCookie(c_name){
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function setCookie(c_name,value,exdays) {
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function curveCalculator(mod, lock) {
	if (mod =='RC') 
	{
		var cant = parseFloat($('#sBtnRCCant').val()); // mm unit
		var gauge = parseFloat($('#sBtnRCGauge').val()); // mm unit
		var v_ds = parseFloat($('#sBtnRCDesignSpeed').val()); // kph unit
		//2do
  	var srad = Math.round((gauge * v_ds * v_ds) / (127 * cant));
  	
		$('#sBtnCurveRadius').val(srad);
		
	} 
	else 
	{
		var cant = parseFloat($('#sBtnRtCCant').val()); // mm unit
		var gauge = parseFloat($('#sRTCBtnGauge').val()); // mm unit
		var v_ds = parseFloat($('#sBtnRTCDesignSpeed').val()); // kph unit
		//2do
  	var srad = 0;
  	
  	if (lock =='') {
			srad = Math.round((gauge * v_ds * v_ds) / (127 * cant));
		} else {
			srad = parseFloat($('#sBtnRTCCircularRadius').val());
		}
  				
		$('#sBtnRTCCircularRadius').val(srad);
		
		var TcL = 0;
		var acc = 0;
		
		if ((v_ds >= 40) && (v_ds < 80)) {
			acc = 0.6;
		} else if ((v_ds >= 80) && (v_ds <= 120)) {
			acc = 0.45;
		} else if (v_ds > 120) {
			acc = 0.3;
		} else {
			acc = 0.6; // guess value
		}	
		
		TcL = (v_ds*v_ds*v_ds)/(46.73 * srad * acc);

		$('#sBtnTCLength').val(TcL);
		var _shift = (TcL * TcL) /(24 * srad);
		$('#sBtnTCShift').val(_shift);
		
		var msgTxt = '';
		
		if (_shift < 0.25) {
			msgTxt = '<span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>Transition curve is not required for this setting.';
		} else {
			msgTxt = '<img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong>Note:</strong> Transition curve is required for this setting.';			
		}
		
		var rmin = 1.39 * Math.sqrt(srad * TcL);
		
		if (srad < rmin) { msgTxt += '<br /><img src="images/warning.png" width="16" height="16" align="left">&nbsp;<strong>Warning:</strong> Minimum radius for this transition curve is ' + rmin + ' m.'; }
		
		if (msgTxt != '') { $('#tdata').html(msgTxt); }
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
  	loadPoly.markers.getAt(n-9).note = null; 
  } 
  if (xD[3] != '') {
  	loadPoly.markers.getAt(n-9).pitch = xD[3]; 
  } else {
  	loadPoly.markers.getAt(n-9).pitch = null; 
  }
  if (xD[4] != '') {
  	loadPoly.markers.getAt(n-9).bve = xD[4]; 
  } else {
  	loadPoly.markers.getAt(n-9).bve = null; 
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
  	loadPoly.markers.getAt(n-9).tcurve = null; 
  }
  
  if (xD[8] != '') {
  	loadPoly.markers.getAt(n-9).lineX = xD[8]; 
  } else {
  	loadPoly.markers.getAt(n-9).lineX = null; 
  }
  if (xD[9] != '') {
  	loadPoly.markers.getAt(n-9).turn = xD[9]; 
  } else {
  	loadPoly.markers.getAt(n-9).turn = null; 
  }
  
  if (xD[10] != '') {
  	loadPoly.markers.getAt(n-9).prln = xD[10]; 
  } else {
  	loadPoly.markers.getAt(n-9).prln = null; 
  }


  				    							
	n++;
  if(n < rd.length) {
  	// update progressbar
  	setTimeout(function() { ReloadPolyline(loadPoly,rd, n, rowsData, i, quickScan); }, 50);	
  } else {
  	i++;
  	if(i < rowsData.length) {
  		if (rowsData[i] != '') {
  			//line_1,ptype,note,trackname,trackservice,trackno,tracksection,trackbve,kit, 3.6975060399011115;101.50496006011963;note;pitch;bve;kit, ...
  			var rd = rowsData[i].split(",");
  			var dname = rd[0];				    					
  			var otype = dname.split("_")[0];
  			if (otype == 'line') {
  				var loadPoly = null; 				
					MapToolbar.initFeature('line');
					MapToolbar.stopEditing();
					var newPID = 'line_'+ MapToolbar['lineCounter'];
					loadPoly = MapToolbar.features["lineTab"][newPID];
	 													
					if (rd[1] != '') { loadPoly.ptype = rd[1]; } else { loadPoly.ptype = null; }
					if (rd[2] != '') { loadPoly.note = rd[2]; } else { loadPoly.note = null; }
	 				if (rd[3] != '') { loadPoly.trackname = rd[3]; } else { loadPoly.trackname = null; }
	 				if (rd[4] != '') { loadPoly.trackservice = rd[4]; } else { loadPoly.trackservice = null; }
	 				if (rd[5] != '') { loadPoly.trackno = rd[5]; } else { loadPoly.trackno = null; }
	 				if (rd[6] != '') { loadPoly.tracksection = rd[6]; } else { loadPoly.tracksection = null; }
	 				if (rd[7] != '') { loadPoly.trackbve = rd[7]; } else { loadPoly.trackbve = null; }
	 				if (rd[8] != '') { loadPoly.kit = rd[8]; } else { loadPoly.kit = null; }
	 															
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
	 													
					setTimeout(function() { ReloadPolyline(loadPoly,rd, 9, rowsData, i, quickScan); }, 50);
				
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
		if ((polyL.markers.getAt(mi).curve != null) && (polyL.markers.getAt(mi).curve != '')) {
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
						
			var dir = (cR < 0)? -1: 1;
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
			curve.note = null; 
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
					note: null, // any extra note 
					pitch: null, // track pitch
					bve: null, // various bve data
					lineX:null, // non parallel line distance
					turn:null, // main line non curve turning
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
					note: null, // any extra note 
					pitch: null, // track pitch
					bve: null, // various bve data
					lineX:null, // non parallel line distance
					turn:null, // main line non curve turning
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
		if ((polyL.markers.getAt(mi).tcurve != null) && (polyL.markers.getAt(mi).tcurve != '')) {
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
			var pTy = (cdat[1] == '')? null : cdat[1];
			var nte = (cdat[2] == '')? null : cdat[2];
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
				var pTy = (ddat[1] == '')? null : ddat[1];
				var nte = (ddat[2] == '')? null : ddat[2];
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
	 				if (rd[2] != '') { loadPoly.note = rd[2]; } else { loadPoly.note = null; }
	 				if (rd[3] != '') { loadPoly.trackname = rd[3]; } else { loadPoly.trackname = null; }
	 				if (rd[4] != '') { loadPoly.trackservice = rd[4]; } else { loadPoly.trackservice = null; }
	 				if (rd[5] != '') { loadPoly.trackno = rd[5]; } else { loadPoly.trackno = null; }
	 				if (rd[6] != '') { loadPoly.tracksection = rd[6]; } else { loadPoly.tracksection = null; }
	 				if (rd[7] != '') { loadPoly.trackbve = rd[7]; } else { loadPoly.trackbve = null; }
	 				if (rd[8] != '') { loadPoly.kit = rd[8]; } else { loadPoly.kit = null; }
	 															
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
											if ( cmdata[5] != '' ) { curve.markers.getAt(rj-5).bve = cmdata[5]; } else { curve.markers.getAt(rj-5).bve = null; }    					
											if ( cmdata[6] != '' ) { curve.markers.getAt(rj-5).lineX = cmdata[6]; } else { curve.markers.getAt(rj-5).lineX = null; }    					
											if ( cmdata[7] != '' ) { curve.markers.getAt(rj-5).turn = cmdata[7]; } else { curve.markers.getAt(rj-5).turn = null;}
											if ( cmdata[8] != '' ) { curve.markers.getAt(rj-5).kit = cmdata[8]; } else { curve.markers.getAt(rj-5).kit = null; }   					
											if ( cmdata[9] != '' ) { curve.markers.getAt(rj-5).ld1 = cmdata[9]; } else { curve.markers.getAt(rj-5).ld1 = null; }
											if ( cmdata[10] != '' ) { curve.markers.getAt(rj-5).ld2 = cmdata[10]; } else { curve.markers.getAt(rj-5).ld2 = null; }
											if ( cmdata[11] != '' ) { curve.markers.getAt(rj-5).arc = cmdata[11]; } else { curve.markers.getAt(rj-5).arc = null; }	
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
													if ( cmdata[5] != '' ) { curve.markers.getAt(c).bve = cmdata[5]; } else { curve.markers.getAt(c).bve = null; }
													if ( cmdata[6] != '' ) { curve.markers.getAt(c).lineX = cmdata[6]; } else { curve.markers.getAt(c).lineX = null; }    					
													if ( cmdata[7] != '' ) { curve.markers.getAt(c).turn = cmdata[7]; } else { curve.markers.getAt(c).turn = null; }    					
													if ( cmdata[8] != '' ) { curve.markers.getAt(c).kit = cmdata[8]; } else { curve.markers.getAt(c).kit = null; }
													if ( cmdata[9] != '' ) { curve.markers.getAt(c).ld1 = cmdata[9]; } else { curve.markers.getAt(c).ld1 = null; }
													if ( cmdata[10] != '' ) { curve.markers.getAt(c).ld2 = cmdata[10]; } else { curve.markers.getAt(c).ld2 = null; }    					
													if ( cmdata[11] != '' ) { curve.markers.getAt(c).arc = cmdata[11]; } else { curve.markers.getAt(c).arc = null; }	    					
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
	var polylength = 0;
	var tCuvlength = 0;
	// 'curve:'+ curve.id + '§radius:' + preR * dir + '§cant:' + parseFloat($('#sBtnRCCant').val()) + '§limit:' + parseFloat($('#sBtnRCDesignSpeed').val()) + '§tlength:' + l2m1 + '§clength:' + arcL + '§center:' + Cc.lat() + '/' + Cc.lng() + '§start_point:' + extp[0].lat() + '/' + extp[0].lng() + '§end_point:' + extp[extp.length-1].lat() + '/' + extp[extp.length-1].lng()  + '§h1:' + h1 + '§h2:' + h2 + '§forceSL:' + enforceSL; 
	
	if (typeof pLM == 'undefined') { alert('polyline not exist.'); return false; }
	if (index > allPoints.length) { alert('getTrackDistanceFromStart - index over flow.'); return false; }
	
  for (var i = 1; i <= index; i++) 
  {  	
	  if (i == 1) { arrD.push(allPoints[0]); } // add first point i = 0
  	arrD.push(allPoints[i]); // collect distance up to point i on polyline	
  	
  	//if (typeof pLM.getAt(i-1) != 'undefined')  {
  		//alert(pLM.getAt(i-1).curve.length);
  		if ((pLM.getAt(i-1).curve == null) && (pLM.getAt(i-1).tcurve == null)) {
  			
  			tCuvlength += google.maps.geometry.spherical.computeDistanceBetween(allPoints[i-1], allPoints[i]);
  		  		
  		} else {
  		
  			if ((pLM.getAt(i-1).curve != null) && (pLM.getAt(i-1).tcurve == null)) {
  				if (pLM.getAt(i-1).curve != '') {
  				
  					tCuvlength += google.maps.geometry.spherical.computeDistanceBetween(allPoints[i-1], allPoints[i]);
  			
  					var cuvarr = pLM.getAt(i-1).curve.split('§');
  					var tL = parseFloat(cuvarr[4].split(':')[1]);
  					var cL = parseFloat(cuvarr[5].split(':')[1]); 
  				
						tCuvlength += (-2 * tL) + cL;
  				}
  				
  			} else if ((pLM.getAt(i-1).curve == null) && (pLM.getAt(i-1).tcurve != null)) {
					//2do reserved for transition curve
					if (pLM.getAt(i-1).tcurve != '') {
					}
					
  			} /* else {
  				tCuvlength += google.maps.geometry.spherical.computeDistanceBetween(allPoints[i-1], allPoints[i]);
  			} */
  		}  	
  	/*}	else {
  		console.log('getTrackDistanceFromStart - pLM.getAt(i) undefined i = ' + i);
		}*/
	}
	polylength = google.maps.geometry.spherical.computeLength(arrD);

	return { 'polyline':polylength, 'line':tCuvlength };
}

function getElevation(event) {
	var locations = [];

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
    //[X, note, pitch, bve, kit]
    var arrElv0 =  $('#txtPitchDetails').val().split('\n');
    var arrElv = [];
    for (var ei=0; ei < arrElv0.length; ei++) {
    	arrElv.push(arrElv0[ei].split(','));
    }
    
		//reload last point
		var pitch0 = null; var Xd0 = 0;
		
		var arrlast = arrElv[0][4].split('§');
		console.log(arrlast);
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
		
		if (poli.markers.getAt(mid).note != null) {
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
				if (confirm('remove note from this point?')) { MapToolbar.features["lineTab"][pid].markers.getAt(midx).note = null; alert('done');}
				break;
			case 'curve':
				if (confirm('remove note from this point?')) { MapToolbar.features["curveTab"][pid].markers.getAt(midx).note = null; alert('done');}
				break;
			case 'tcurve':
				if (confirm('remove note from this point?')) { MapToolbar.features["tcurveTab"][pid].markers.getAt(midx).note = null; alert('done');}
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
				if (confirm('remove note from this point?')) { MapToolbar.features["lineTab"][pid].markers.getAt(midx).note = null; alert('note has be remove from point ' + midx + ' on line ' + pid + '.');}
				break;
			case 'curve':
				if (confirm('remove note from this point?')) { MapToolbar.features["curveTab"][pid].markers.getAt(midx).note = null; alert('note has be remove from point ' + midx + ' on line ' + pid + '.');}
				break;
			case 'tcurve':
				if (confirm('remove note from this point?')) { MapToolbar.features["tcurveTab"][pid].markers.getAt(midx).note = null; alert('note has be remove from point ' + midx + ' on line ' + pid + '.');}
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
	var iid = '';
	
	switch (otype)
	{
		case 'railobj' :
			iid = 'railobjpx';
			break;
		case 'strobj' :
			iid = 'strobjpx';
			break;			
		case 'sideobj' :
			iid = 'sideobjpx';
			break;
		case 'densha' :
			iid = 'denshapx';
			break;		
	}
  document.getElementById(iid).src='images/' + src;
}

function markerSetting(pid,midx) {
	$('#dms_lineid').val(pid);
	$('#dms_markerindex').val(midx);
	if (!MapToolbar.features["lineTab"][pid].markers.getAt(midx).getDraggable()) {
		document.getElementById('lockedmarker').checked = true;
	} else {
		document.getElementById('lockedmarker').checked = false;
	}
	
	$('#dialogMarkerSetting').dialog('open');
} 

function polylineSetting(pid) {
	$('#dtsv_lineid').val(pid);
	var poly = MapToolbar.features["lineTab"][pid];
	if ((poly.trackname != null) && (poly.trackname != '')) { $('#dtsv_trackname').val(poly.trackname); }
	if ((poly.trackservice != null) && (poly.trackservice != '')) { $('#dtsv_trackservice').val(poly.trackservice); }
	if ((poly.trackno != null) && (poly.trackno != '')) { $('#dtsv_tracknumber').val(poly.trackno); }
	if ((poly.tracksection != null) && (poly.tracksection != '')) { $('#dtsv_trackSection').val(poly.tracksection); }

	if ((poly.trackbve != null) && (poly.trackbve != '')) {
		// data format :-> gauge: §train: §devID: 
		var arrTB = poly.trackbve.split('§');
		$('#dtsv_trackGauge').val(arrTB[0].split(':')[1]); 
		$('#dtsv_runningTrain').val(arrTB[1].split(':')[1]);
		$('#dtsv_devID').val(arrTB[2].split(':')[1]);
	}
	
	if ((poly.kit != null) && (poly.kit != '')) { /* 2 do what ??? */ }	
	if ((poly.note != null) && (poly.note != '')) { $('#dtsv_note').val(poly.note); }
	
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

function fI_To(pid,idx) {
	$('#dInsNpLTo_PID').val(pid);
	$('#dInsNpLTo_MID').val(idx);
	$('#dialogNonParallelTurnOut').dialog('open');
}

function fI_Pform(pid,idx) {
	$('#').val(pid);
	$('#').val(idx);
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
