/*
GB Maps ギビマップ - © Karya IT (http://www.karyait.net.my/) 2012-2014. All rights reserved. 
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

GB Maps ギビマップ by Karya IT is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. Based on a work at https://code.google.com/p/gbmaps/. Permissions beyond the scope of this license may be available at https://developers.google.com/readme/terms. Google Maps - ©2014 Google.

Code license : Apache License 2.0

Main GB Maps ギビマップ Website : http://gbmaps.karyait.net.my/ or http://gbmaps.blogspot.com

Development site (programming) : https://github.com/karyait/gbmaps & https://code.google.com/p/gbmaps/
Personal blog for GB Maps ギビマップ (design algorithm) : http://blogkaryait.wordpress.com/tag/gbmaps/

File : gbm-base-v1.js
purpose : google maps drawing logic
type : release (under development)
version : 1.0.0
build : 
last update : 18 Dec 2013 12:00am (GMT 8+)

*/

/*
 * MapToolbar
 * a literal object
 *  - act as a container that will share one or more Feature instance
 *  - act as a namespace
 */ 
 
 /* CREDIT
  * Google Maps API v3
  * http://jsfiddle.net
  * http://nettique.free.fr/gmap/toolbar.html
  * https://developers.google.com/maps/documentation/javascript/reference
  */
  
 /* Drawing Parallel Line
  * Calculus And Analytic Geometry, Thomas/Finney, 8th Edition
  * http://www.karyait.net.my
  */

 /* jquery ThemeUI
  * http://jquery.org/
  * http://jqueryui.com/about
  */

 /* jquery
  * 
  * http://jquery.org/
  */

 /* BVE Trainsim
  * 
  * http://bvets.net/
  */

 /* OpenBVE
  * http://odakyufan.zxq.net/openbve/index.html
  * http://www.openbve.org/
  */
  
 /* Reading Data File with HTML5
  * http://www.html5rocks.com/en/tutorials/file/dndfiles/
  * http://www.karyait.net.my
  */

 /* JavaScript & HTML References
  * http://www.w3schools.com/html/default.asp
  * http://www.w3schools.com/js/default.asp
  * http://www.w3schools.com/jquery/default.asp
  * https://developer.mozilla.org/en-US/docs/JavaScript/Guide
  * http://docs.oracle.com/cd/E19957-01/816-6408-10/contents.htm
  * http://htmlhelp.com/reference/html40/
  * http://www.w3schools.com/html/html5_intro.asp
  * http://dev.w3.org/html5/html-author/
  * https://developer.mozilla.org/en-US/docs/Canvas_tutorial
  * http://diveintohtml5.info/
  */
$('#accordion').accordion({ disabled: true });	
var map;
var geocoder;
var elevator;

var chart;
var gbmStrArr = new Array();
//google.maps.visualRefresh = true;

$.lang = new jquery_lang_js();

// Load the Visualization API and the columnchart package.
google.load('visualization', '1', {packages: ['columnchart']});

var degreeChr = String.fromCharCode(176);

var MapToolbar = {

//reorder index of a poly markers array

reindex:function(markers){
	markers.forEach(function(marker, index){
		marker.index = index;
		marker.title = marker.pid + '(' + index + ')';
		// 2 test (14/1/2013)
		if (marker.bdata.curve != '') {
			var cuvid = marker.bdata.curve;
			if (typeof MapToolbar.features['curveTab'][cuvid] != 'undefined') {MapToolbar.features['curveTab'][cuvid].mid = index; }

		}
		if (marker.bdata.tcurve != '') {
			var tcuvid = marker.bdata.tcurve;
			if (typeof MapToolbar.features['tcurveTab'][tcuvid] != 'undefined') {MapToolbar.features['tcurveTab'][tcuvid].mid = index; }
		}
		if (typeof marker.sline != 'undefined') {
			if (marker.sline != '') {
				/*
				alert(marker.sline);
				alert(typeof marker.sline);
				if (marker.sline.indexOf(",") == 0) { 
  					marker.sline = marker.sline.substring(1,marker.sline.length);
  			}
				*/
  					/*
  						var arrLine = marker.sline.split('§');
  						for (p = 0; p < arrLine.length; p++) {
  							var subArrL = arrLine[p].split(':');
  							var lineName = subArrL[0];
  							if (subArrL[2] == '0') {
  							if (typeof MapToolbar.features["lineTab"][lineName] != 'undefined') { MapToolbar.features["lineTab"][lineName].markers.getAt(0).lineX = marker.pid + ':' + index; }
  							} else if (subArrL[2] == '1') {
  							if (typeof MapToolbar.features["lineTab"][lineName] != 'undefined') { MapToolbar.features["lineTab"][lineName].markers.getAt(MapToolbar.features["lineTab"][lineName].markers.length-1).turn = marker.pid + ':' + index; }
  							}
  						}
  					*/			    		
			}
		}			    
	});			
},

//get point at middle distance between 2 point

getMidPoint: function(){
	var lat = (arguments[0].lat() + arguments[1].lat()) / 2;
	var lng = (arguments[0].lng() + arguments[1].lng()) / 2;		
	return new google.maps.LatLng(lat, lng);		
},

//currently edited feature

currentFeature: null,

//add a point to a poly, 'e' can be a click event or a latLng object

    addPoint : function(e, poly, index) {
    	var ptype = poly.id.split('_')[0];
    	
    	if (ptype == 'line') {
				var e = (typeof e.latLng != 'undefined')? e.latLng : e,
			    image = new google.maps.MarkerImage('images/square.png',
					new google.maps.Size(7, 7),
					new google.maps.Point(0, 0),
					new google.maps.Point(3, 3)), 
					path = poly.getPath(),
					index = (typeof index != 'undefined')? index : path.length,
					markers = (poly.markers)? poly.markers : new google.maps.MVCArray, 
				marker = new google.maps.Marker({
					position: e,
					title: poly.id + '(' + index + ')',
					map: map,
					draggable: true,
					icon: image,
					note: null, // any extra note 
					bdata: {height:'',railindex:'',pitch:'',curve:'',tcurve:''},
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:''}, // various bve data
					sline: '',
					lineX: '',
					pid: poly.id
		    });
	  	  marker.index = index;    
	    	path.insertAt(index, e);
	    	markers.insertAt(index, marker)
	    	if(arguments[2]){
		    	MapToolbar.reindex(markers);	
	    	}
    	} else if (ptype == 'ruler' || ptype == 'protractor') {
			var e = (typeof e.latLng != 'undefined')? e.latLng : e,
			    image = new google.maps.MarkerImage('images/ruler-marker.png',
			    new google.maps.Size(7, 7),
				new google.maps.Point(0, 0),
			    new google.maps.Point(3, 3)), 
				path = poly.getPath(),
				index = (typeof index != 'undefined')? index : path.length,
				markers = (poly.markers)? poly.markers : new google.maps.MVCArray, 
				marker = new google.maps.Marker({
					position: e,
					title: poly.id + '(' + index + ')',
					map: map,
					draggable: true,
					icon: image,
					pid: poly.id
				});
			marker.index = index;    
	    	path.insertAt(index, e);
	    	markers.insertAt(index, marker)
	    	if(arguments[2]){
		    	MapToolbar.reindex(markers);	
	    	}
			
			if (ptype == 'ruler') {
				if (markers.length >=2) {
					MapToolbar.select("hand_b");
				}
			} else {
				if (markers.length >=3) {
					MapToolbar.select("hand_b");
					var image = {					
						path: google.maps.SymbolPath.CIRCLE,
						scale: 8,
						strokeColor: '#C80000',
						strokeWeight: 2};
					markers.getAt(1).setIcon(image); 
				}
			}
			
		} else if (ptype == 'curve') {
			var e = (typeof e.latLng != 'undefined')? e.latLng : e,
				image = new google.maps.MarkerImage('images/bullet_add.png',
				new google.maps.Size(5, 5),
				new google.maps.Point(0, 0),
				new google.maps.Point(3, 3)), 
				path = poly.getPath(),
				index = (typeof index != 'undefined')? index : path.length,
				markers = (poly.markers)? poly.markers : new google.maps.MVCArray, 
				marker = new google.maps.Marker({
					position: e,
					map: map,
					title: poly.id + '(' + index + ')',
					draggable: false,
					icon: image,
					note: null, // any extra note 
					bdata: {height:'',pitch:''},
					kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:''}, // various bve data
					sline: '',
					lineX: '',
					ld:null, // distance on circumference from curve start point 
					pid:poly.id
				});
			
			marker.index = index;    
	    	path.insertAt(index, e);
	    	markers.insertAt(index, marker)
	    	if(arguments[2]){
		    	MapToolbar.reindex(markers);	
	    	}

	    	//for (i=0; i < MapToolbar.features["lineTab"][poly.pid].markers.length; i++){
	    		// if ((MapToolbar.features["lineTab"][poly.pid].markers.getAt(i).bdata.curve) != '') {
	    			
	    			
	    			//if (MapToolbar.features["lineTab"][poly.pid].markers.getAt(i).bdata.curve == poly.id) {
		
			var rd = poly.Rc;  // retrive curve radius
			var Cc = poly.Cc;  // retrive curve center coordinate
			var arL = poly.Lc; // retrive arc length
			var x1 = poly.st;  // retrive curve start coordinate
			var ch1 = google.maps.geometry.spherical.computeHeading(x1,Cc);
			var ch2 = google.maps.geometry.spherical.computeHeading(Cc,e);
			var anC = intersection_angle(ch1,ch2).angle;
	 		   	
	 		var xL = Math.abs((anC/360) * 2 * Math.PI * rd); //anC.toRad() * Math.PI * rd;
	 		marker.ld = xL;
	 		marker.note = 'cmi:'+ index; // curve marker @ marker id on curve
	    				//break;
	    			//}
	    		//}
	    	// }
	    	
		} else if (ptype == 'tcurve') {
			var e = (typeof e.latLng != 'undefined')? e.latLng : e,
			    image = new google.maps.MarkerImage('images/bullet_add_2.png',
			    new google.maps.Size(5, 5),
				new google.maps.Point(0, 0),
			    new google.maps.Point(3, 3)), 
				path = poly.getPath(),
				index = (typeof index != 'undefined')? index : path.length,
				markers = (poly.markers)? poly.markers : new google.maps.MVCArray, 
				marker = new google.maps.Marker({
				position: e,
				map: map,
				draggable: false,
				icon: image,
				title: poly.id + '(' + index + ')',
				note: null, // any extra note 
				bdata: {height:'',pitch:''},
				kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:''}, // various bve data
				sline: '',
				lineX: '',
				pid: poly.id
		    });
			marker.index = index;    
	    	path.insertAt(index, e);
	    	markers.insertAt(index, marker)
	    	if(arguments[2]){
		    	MapToolbar.reindex(markers);	
	    	}
			//2do 4Feb2014************************************
			var Rc = poly.Rc;  // retrive curve radius
			var Cc = poly.Cc;  // retrive curve center coordinate
			var Ls = poly.Ls;
			var Lc = poly.Lc;
			var K = poly.K;
			var Lt = Lc + 2 * Ls; // retrive arc length
			
			var ts1 = poly.Ttst;  // retrive curve coordinate
			var tc1 = poly.Tcst;  // retrive curve coordinate
			var tc2 = poly.Tced;  // retrive curve coordinate
			var ts2 = poly.Tted;  // retrive curve coordinate
			var h1 = poly.h1;
			var h2 = poly.h2;
			
			var kp1 = google.maps.geometry.spherical.computeOffset(ts1, K, h1);
			var kp2 = google.maps.geometry.spherical.computeOffset(ts2, -K, h2);
			
			var delta0 = poly.delta;
			var theta0 = poly.theta;
			var deltaS0 = poly.deltaS;
			var deltaC0 = poly.deltaC;
			var tctype = poly.tctype;
			var lineId = poly.pid;
			var l_idx = poly.mid;
			var TotalX = poly.TotalX;
			var TotalY = poly.TotalY;
			
			var ch1 = google.maps.geometry.spherical.computeHeading(kp1,Cc);
			var ch2 = google.maps.geometry.spherical.computeHeading(Cc,e);
			var delta = intersection_angle(ch1,ch2).angle;
			
			var xL = 0;
			
			var biP = MapToolbar.features["lineTab"][lineId].markers.getAt(l_idx-1).position;
			var isP = MapToolbar.features["lineTab"][lineId].markers.getAt(l_idx).position;
			var aiP = MapToolbar.features["lineTab"][lineId].markers.getAt(l_idx+1).position;
			
			if (delta <= deltaS0) {
				var h_ac = google.maps.geometry.spherical.computeHeading(e,ts1);
				var h_ab = google.maps.geometry.spherical.computeHeading(ts1,isP);
				var alfa = intersection_angle(h_ac,h_ab).angle;
				var x_ac = google.maps.geometry.spherical.computeDistanceBetween(e,ts1);
				
				if (tctype == 'cubic') {
					xL = x_ac * Math.cos(alfa.toRad()); //base on assumption x=l	
				} else {
				//base on assumption x/X = l/L
					var x = x_ac * Math.cos(alfa.toRad()); 
					xL = (x * Ls)/ TotalX;
				}
				marker.ld = xL;	
				
			} else if (delta <= deltaS0 + deltaC0) {
			
				var delta1 = delta - deltaS0;
				xL = Math.abs((delta1/360) * 2 * Math.PI * Rc); //anC.toRad() * Math.PI * rd;
				marker.ld = xL + Ls;
				
			} else {
				var h_ac = google.maps.geometry.spherical.computeHeading(e,ts2);
				var h_ab = google.maps.geometry.spherical.computeHeading(ts2,isP);
				var alfa = intersection_angle(h_ac,h_ab).angle;
				var x_ac = google.maps.geometry.spherical.computeDistanceBetween(e,ts2);				
			
				if (tctype == 'cubic') {
					xL = x_ac * Math.cos(alfa.toRad()); //base on assumption x=l					
				} else {
					//base on assumption x/X = l/L
					var x = x_ac * Math.cos(alfa.toRad()); 
					xL = (x * Ls)/ TotalX;		
				}
				marker.ld = Lt - xL;
			}

	 		marker.note = 'cmi:'+ index; // curve marker @ marker id on curve
			
	    } else if (ptype == 'shape') {
			var e = (typeof e.latLng != 'undefined')? e.latLng : e,
			image = new google.maps.MarkerImage('images/square.png',
			new google.maps.Size(7, 7),
		  	new google.maps.Point(0, 0),
			new google.maps.Point(3, 3)), 
			path = poly.getPath(),
			index = (typeof index != 'undefined')? index : path.length,
			markers = (poly.markers)? poly.markers : new google.maps.MVCArray, 
		    marker = new google.maps.Marker({
			position: e,
			//title: poly.id + '(' + index + ')',
			map: map,
			draggable: true,
			icon: image,
			note: null, // any extra note 
			kit:null // others data (reserved) by Karya IT
		});
	  	marker.index = index;    
	    path.insertAt(index, e);
	    markers.insertAt(index, marker)
	    if(arguments[2]){
		    MapToolbar.reindex(markers);	
	    }				
	} else {
		alert('no code defined...');
	}


//right click on a polymarker will delete it

	google.maps.event.addListener(marker, 'rightclick', function() {
		if (!(marker.pid.split('_')[0] == 'ruler' || marker.pid.split('_')[0] == 'protractor')) {
			marker.setMap(null);
			markers.removeAt(marker.index);
			path.removeAt(marker.index);
			MapToolbar.reindex(markers);				
			if(markers.getLength() == 0){
				MapToolbar.removeFeature(poly.id); 
				// cadangan store data parallelto line apa pada index x dan y
				// gunakan data ini utk update attribut .sline pada polyline asal
			}	
		}
	});
	    
	    
	google.maps.event.addListener(marker, 'click', function(mEvent) {
	   
		if ((marker.pid.split('_')[0] == 'curve') || (marker.pid.split('_')[0] == 'tcurve')) {
			//var distance = getTrackDistanceFromStart(marker.pid,marker.index);
			//var length = distance.polyline;
			//var actual = distance.line;
   		
			var infoWindowTxt = 'Line ID : ' + marker.pid + '    Marker index : ' + marker.index; // + '<br>Distance from start : ' + Math.round(length) + 'm (polyline) / ' + Math.round(actual) + ' m (actual).';
			infoWindowTxt += (marker.pid.split('_')[0] == 'curve') ?'<br />arc length : ' + MapToolbar.features['curveTab'][marker.pid].Lc + '<br />x distance : ' + marker.ld + '\n' : '<br />arc length : ' + (MapToolbar.features['tcurveTab'][marker.pid].Lc + 2 * MapToolbar.features['tcurveTab'][marker.pid].Ls) + '<br />x distance : ' + marker.ld + '\n';
				
			var t_x = (marker.pid.split('_')[0] == 'curve') ? getTrackDistanceFromStart(MapToolbar.features['curveTab'][marker.pid].pid, MapToolbar.features['curveTab'][marker.pid].mid).line : getTrackDistanceFromStart(MapToolbar.features['tcurveTab'][marker.pid].pid, MapToolbar.features['tcurveTab'][marker.pid].mid).line;
			var t_0 = (marker.pid.split('_')[0] == 'curve') ? t_x - MapToolbar.features['curveTab'][marker.pid].Lt : t_x - MapToolbar.features['tcurveTab'][marker.pid].TL;
			var t_1 = Math.round((t_0 + marker.ld)*1000)/1000;
				
			//alert(t_x + '<br>' + t_0 + '<br' + t_1);
			infoWindowTxt += '<br />total distance : ' + t_1 + ' m';
				
			var lat0 = mEvent.latLng.lat();
			var lng0 = mEvent.latLng.lng();
		
			infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="3"><tr>';
			//infoWindowTxt += '<td><img src="images/gbm-gradient.png" title="Rail pitch (uphill, downhill, level)" width="20" height="20" style="cursor: pointer;" onclick="prelinepitch(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/crossing-icon.png" title="Insert Crossing" width="20" height="20" style="cursor: pointer;" onclick="fI_RC(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/bridge.png" title="Insert Bridge" width="20" height="20" style="cursor: pointer;" onclick="fI_Br(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/bridge2.png" title="Insert Overbridge" width="20" height="20" style="cursor: pointer;" onclick="fI_Ov(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/platform-icon.png" title="Insert Platform@Station" width="20" height="20" style="cursor: pointer;" onclick="fI_Pform(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/tunnel.png" title="Insert Tunnel" width="20" height="20" style="cursor: pointer;" onclick="fI_Tu(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/flyover2.png" title="Insert Flyover" width="20" height="20" style="cursor: pointer;" onclick="fI_Fyo(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/river-icon.png" title="Insert River" width="20" height="20" style="cursor: pointer;" onclick="fI_Rv(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/ground.png" title="Update ground" width="20" height="20" style="cursor: pointer;" onclick="fu_Gd(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td>&nbsp;&nbsp;&nbsp;</td>';
			infoWindowTxt += '<td><img src="images/sticky_note_pencil.png" title="Add Note" width="16" height="16" style="cursor: pointer;" onclick="presetMarkerNote(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/xfce4_settings.png" title="Setting" width="16" height="16" style="cursor: pointer;" onclick="markerSetting(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '</tr></table>';
				
				if (marker.note != null) { 
					if (marker.note != '') {
						infoWindowTxt += '<br />Note : ' + marker.note;
					}
				}
					
				
				if (marker.bdata.pitch != '') { 
					infoWindowTxt += '<br />Pitch : ' + marker.bdata.pitch;
				} 
				if (marker.bdata.height != '') { 
						infoWindowTxt += '<br />Height : ' + marker.bdata.height;
				}

				$.each(marker.kdata, function(key, value){
					if (marker.kdata[key] != '') {
						infoWindowTxt += '<br />' + key + " : " + marker.kdata[key];
					}
				});
     	
				var infowindow = new google.maps.InfoWindow({
					content: infoWindowTxt,
					position: mEvent.latLng
				});
        
				infowindow.open(map);	
				
		} else if (marker.pid.split('_')[0] == 'line') {
	    	if ($('#dialogParalelLine').dialog('isOpen') == true) {
	    		if (document.getElementById('PLCopyType_0').checked) {
	    			if ($('#m1').val() != '') { $('#m1').val(''); }
	    			if ($('#m2').val() != '') { $('#m2').val(''); }
	    		} else {
	    			if (marker.pid == $('#PLbasePolyID').val()) {
	    				if ($('#m1').val() == '') {
	    					$('#m1').val(marker.index);
	    				} else {
	    					$('#m2').val(marker.index);
	    					if (parseInt($('#m2').val()) < parseInt($('#m1').val())) {
	    						var no1 = parseInt($('#m1').val());
	    						var no2 = parseInt($('#m2').val());
	    						$('#m1').val(no2);
	    						$('#m2').val(no1);
	    					}	    					
	    				}		    					
	    			}
	    		}
	    		return;
	    	}

	    	if ($('#dialogpreRailpitch').dialog('isOpen') == true) {
	    		if (marker.pid == $('#RPbasePolyID').val()) {
	    			if ($('#rpM1').val() == '') {
	    				$('#rpM1').val(marker.index);
	    			} else {
	    				$('#rpM2').val(marker.index);
	    				if (parseInt($('#rpM2').val()) < parseInt($('#rpM1').val())) {
	    					var no1 = parseInt($('#rpM1').val());
	    					var no2 = parseInt($('#rpM2').val());
	    					$('#rpM1').val(no2);
	    					$('#rpM2').val(no1);
	    				}	    					
	    			}		    					
	    		} 
	    		return;  			
	    	}
	    		
	    	if ($('#dialogWidenParallelGap').dialog('isOpen') == true) {
	    		if (marker.pid == $('#dpLTs_Line1').val()) {
	    			if ($('#dpLTs_stIdx').val() == '') {
	    				$('#dpLTs_stIdx').val(marker.index);
	    			} else {
	    				$('#dpLTs_edIdx').val(marker.index);
	    				if (parseInt($('#dpLTs_edIdx').val()) < parseInt($('#dpLTs_stIdx').val())) {
	    					var no1 = parseInt($('#dpLTs_stIdx').val());
	    					var no2 = parseInt($('#dpLTs_edIdx').val());
	    					$('#dpLTs_stIdx').val(no2);
	    					$('#dpLTs_edIdx').val(no1);
	    				}	    					
	    			}		    					
	    		}
	    		if (marker.pid == $('#dpLTs_Line2').val()) {
	    			if ($('#dpLTs_stIdx2').val() == '') {
	    				$('#dpLTs_stIdx2').val(marker.index);
	    			} else {
	    				$('#dpLTs_edIdx2').val(marker.index);
	    				if (parseInt($('#dpLTs_edIdx2').val()) < parseInt($('#dpLTs_stIdx2').val())) {
	    					var no1 = parseInt($('#dpLTs_stIdx2').val());
	    					var no2 = parseInt($('#dpLTs_edIdx2').val());
	    					$('#dpLTs_stIdx2').val(no2);
	    					$('#dpLTs_edIdx2').val(no1);
	    				}	    					
	    			}		    					
	    		}	    			 
	    		return;  			
	    	}	
   
	    	if ($('#dialogLinkLines').dialog('isOpen') == true) {
	    		if (marker.pid == $('#dLL_Pid1').val()) {
	    			if ($('#dLL_Pid1m1').val() == '') {
	    				$('#dLL_Pid1m1').val(marker.index);
	    			} else {
	    				$('#dLL_Pid1m2').val(marker.index);
	    				if (parseInt($('#dLL_Pid1m2').val()) < parseInt($('#dLL_Pid1m1').val())) {
	    					var no1 = parseInt($('#dLL_Pid1m1').val());
	    					var no2 = parseInt($('#dLL_Pid1m2').val());
	    					$('#dLL_Pid1m1').val(no2);
	    					$('#dLL_Pid1m2').val(no1);
	    				}	    					
	    			}		    					
	    		} 
	    		if (marker.pid == $('#dLL_Pid2').val()) {
	    			if ($('#dLL_Pid2m1').val() == '') {
	    				$('#dLL_Pid2m1').val(marker.index);
	    			} else {
	    				$('#dLL_Pid2m2').val(marker.index);
	    				if (parseInt($('#dLL_Pid2m2').val()) < parseInt($('#dLL_Pid2m1').val())) {
	    					var no1 = parseInt($('#dLL_Pid2m1').val());
	    					var no2 = parseInt($('#dLL_Pid2m2').val());
	    					$('#dLL_Pid2m1').val(no2);
	    					$('#dLL_Pid2m2').val(no1);
	    				}	    					
	    			}		    					
	    		}				
	    		return;  			
	    	} 		

	    	var distance = getTrackDistanceFromStart(marker.pid,marker.index);
			var length = distance.polyline;
			var actual = distance.line;
			var polyMaxindex =MapToolbar.features['lineTab'][marker.pid].getPath().length-1;
					
			var infoWindowTxt = 'Line ID : ' + marker.pid + '    Marker index : ' + marker.index + '<br>Distance from start : ' + Math.round(length) + 'm (polyline) / ' + Math.round(actual) + ' m (actual).';	    		
			var lat0 = mEvent.latLng.lat();
			var lng0 = mEvent.latLng.lng();
				
			if (marker.index > 0 ) {
				var polyL = MapToolbar.features["lineTab"][marker.pid];
				if (typeof polyL.markers.getAt(marker.index + 1) != 'undefined') {						
					var m0 = polyL.markers.getAt(marker.index-1).getPosition();
					var m1 = polyL.markers.getAt(marker.index).getPosition();
					var m2 = polyL.markers.getAt(marker.index+1).getPosition();
					var h1 = google.maps.geometry.spherical.computeHeading(m0,m1);
					var h2 = google.maps.geometry.spherical.computeHeading(m1,m2);
					var fic = intersection_angle(h1,h2);
					var intAngleDeg = fic.angle;
					var dir = fic.direction;
					var delta = 180 - intAngleDeg;
						
					infoWindowTxt += '<br>intersection angle θ : ' + intAngleDeg + '&deg;';
					infoWindowTxt += '<br>deflection angle Δ : ' + delta + '&deg;';
				}
			}				
		
			infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="3"><tr>';
			
			if ((marker.index != 0) && (marker.index != polyMaxindex)) {
				infoWindowTxt += '<td><img src="images/curve.png" title="Circular curve" width="20" height="20" style="cursor: pointer;" onclick="predrawRailCurve(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
				infoWindowTxt += '<td><img src="images/trans-curve.png" title="Transition@relexation curve (BVE 5 only)" width="20" height="20" style="cursor: pointer;" onclick="predrawRailTransitionCurve(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';					
			}
			/*
			if ((marker.index == 0) || (marker.index == polyMaxindex)) {
				infoWindowTxt += '<td><img src="images/switch_2.png" title="Rail switch" width="20" height="20" style="cursor: pointer;" onclick="prerailSwitch(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';						
			}
			*/
					
			infoWindowTxt += '<td><img src="images/expand-turnout.png" title="Insert Distance between track center widening" width="20" height="20" style="cursor: pointer;" onclick="fI_DTCWd(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/line_link.png" title="Link between lines" width="20" height="20" style="cursor: pointer;" onclick="fI_Link(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/cross_2.png" title="Insert Track Cross Turnout" width="20" height="20" style="cursor: pointer;" onclick="fI_ToC(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			/*
			infoWindowTxt += '<td><img src="images/arrow_join.png" title="Make nearest track parallel" width="20" height="20" style="cursor: pointer;" onclick="fI_MakePL(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td>&nbsp;&nbsp;&nbsp;</td>'; */
			infoWindowTxt += '<td><img src="images/crossing-icon.png" title="Insert Crossing" width="20" height="20" style="cursor: pointer;" onclick="fI_RC(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/bridge.png" title="Insert Bridge" width="20" height="20" style="cursor: pointer;" onclick="fI_Br(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/bridge2.png" title="Insert Overbridge" width="20" height="20" style="cursor: pointer;" onclick="fI_Ov(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/platform-icon.png" title="Insert Platform@Station" width="20" height="20" style="cursor: pointer;" onclick="fI_Pform(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/tunnel.png" title="Insert Tunnel" width="20" height="20" style="cursor: pointer;" onclick="fI_Tu(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/flyover2.png" title="Insert Flyover" width="20" height="20" style="cursor: pointer;" onclick="fI_Fyo(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/river-icon.png" title="Insert River" width="20" height="20" style="cursor: pointer;" onclick="fI_Rv(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/ground.png" title="Update ground" width="20" height="20" style="cursor: pointer;" onclick="fu_Gd(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td>&nbsp;&nbsp;&nbsp;</td>';
			infoWindowTxt += '<td><img src="images/sticky_note_pencil.png" title="Add Note" width="16" height="16" style="cursor: pointer;" onclick="presetMarkerNote(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '<td><img src="images/xfce4_settings.png" title="Setting" width="16" height="16" style="cursor: pointer;" onclick="markerSetting(\'' + marker.pid + '\',\''+ marker.index +'\');"></td>';
			infoWindowTxt += '</tr></table>';
				
			if (marker.note != null) { 
				if (marker.note != '') { 
					infoWindowTxt += 'Note : ' + marker.note;
				}
			}
			if (marker.bdata.curve != '') {
				infoWindowTxt += '<br />Curve : ' + marker.bdata.curve;
			}
			if (marker.bdata.tcurve != '') { 
				infoWindowTxt += '<br />Trans. Curve : ' + marker.bdata.tcurve;
			}
			if (marker.lineX != '') { 
				infoWindowTxt += '<br />Side line(s) : ' + marker.lineX;
			}
/*
			if (marker.turn != null) { 
				if (marker.turn != '') { 
					infoWindowTxt += '<br />Turning : ' + marker.turn;
				}
			}
*/					

			if (marker.bdata.pitch != '') { 
				infoWindowTxt += '<br />Pitch : ' + marker.bdata.pitch;
			}

			if (marker.sline != '') { 
				infoWindowTxt += '<br />paralell line data : ' + marker.sline;
			}
										     	
			var infowindow = new google.maps.InfoWindow({
				content: infoWindowTxt,
				position: mEvent.latLng
			});
        
			infowindow.open(map);	

		} else if (marker.pid.split('_')[0] == 'ruler') { 
		
			var poly =MapToolbar.features['rulerTab'][marker.pid];
			var length = google.maps.geometry.spherical.computeLength(poly.getPath());;
			var infoWindowTxt = 'Distance : ';
			if (length < 1000) {
				infoWindowTxt += length.toFixed(2) + ' m.<br />';
			} else {
				infoWindowTxt += (length/1000).toFixed(6) + ' km.<br />';
			}
			var infowindow = new google.maps.InfoWindow({
				content: infoWindowTxt,
				position: mEvent.latLng
			});
			
			infowindow.open(map);
				
		} else if (marker.pid.split('_')[0] == 'protractor') {
			if (marker.index = 1) {
				var poly =MapToolbar.features['protractorTab'][marker.pid];
				var m0 = poly.markers.getAt(0).getPosition();
				var m1 = poly.markers.getAt(1).getPosition();
				var m2 = poly.markers.getAt(2).getPosition();				
				var h1 = google.maps.geometry.spherical.computeHeading(m0,m1);
				var h2 = google.maps.geometry.spherical.computeHeading(m1,m2);
				var fic = intersection_angle(h1,h2);
				var intAngleDeg = Math.round(fic.angle*1000)/1000;
				
				var infoWindowTxt = 'Intersection Angle : ' + intAngleDeg + '&deg;';
				var infowindow = new google.maps.InfoWindow({
					content: infoWindowTxt,
					position: mEvent.latLng
				});
				infowindow.open(map);						
			}
		} 
	});
			
/*
      google.maps.event.addListener(marker, 'dragstart', function() {
				MapToolbar.currentlyDragging = true;
	  	})
*/		
      google.maps.event.addListener(marker, 'position_changed', function() {
 				path.setAt(marker.index, marker.getPosition());

				//2do testing removing unalign curve, tcurve n sline : 21/3/2014 				
			  if (marker.bdata.curve != '') {
					var cuvid = marker.bdata.curve;
					if (typeof MapToolbar.features["curveTab"][cuvid] != 'undefined') { MapToolbar.removeFeature(cuvid); }
			  }
			  if (marker.bdata.tcurve != '') {
 					var tcuvid = marker.bdata.tcurve;								
					if (typeof MapToolbar.features["tcurveTab"][tcuvid] != 'undefined') { MapToolbar.removeFeature(tcuvid); }
			  } 
			  /*
		    if (marker.sline != '') {
			  	if (marker.sline.indexOf(',') == 0) { 
 						marker.sline = marker.sline.substring(1,marker.sline.length);
 					}
 					var arrLine = marker.sline.split(',');
 					for (p = 0; p < arrLine.length; p++) {
 						var subArrL = arrLine[p].split(':');
 						var lineID = subArrL[0];
 						if (typeof MapToolbar.features["lineTab"][lineID] != 'undefined') { MapToolbar.removeFeature(lineID); }
 					}			    		
		    }
			  */ 
			  if (typeof MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index-1) != 'undefined') { 					
 					if (MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index-1).bdata.curve != '') {
 						var cuvid = MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index-1).bdata.curve;
						if (typeof MapToolbar.features["curveTab"][cuvid] != 'undefined') { MapToolbar.removeFeature(cuvid); }
 			  	}
 					if (MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index-1).bdata.tcurve != '') {
 						var tcuvid = MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index-1).bdata.tcurve;
						if (typeof MapToolbar.features["tcurveTab"][tcuvid] != 'undefined') { MapToolbar.removeFeature(tcuvid); }
 			  	}
 			  	/*
		    	if (MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index-1).sline != '') {
			  		if (MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index-1).sline.indexOf(',') == 0) { 
 							MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index-1).sline = MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index-1).sline.substring(1,marker.sline.length);
 						}
 						var arrLine = MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index-1).sline.split(',');
 						for (p = 0; p < arrLine.length; p++) {
 							var subArrL = arrLine[p].split(':');
 							var lineID = subArrL[0];
 							if (typeof MapToolbar.features["lineTab"][lineID] != 'undefined') { MapToolbar.removeFeature(lineID); }
 						}			    		
		    	} 	
		    	*/		  
				}
 			  if (typeof MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index+1) != 'undefined') {
 			  	if (MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index+1).bdata.curve != '') {
 						var cuvid = MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index+1).bdata.curve;
						if (typeof MapToolbar.features["curveTab"][cuvid] != 'undefined') { MapToolbar.removeFeature(cuvid); }
 			  	}  			  	
 			  	if (MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index+1).bdata.tcurve != '') {
 						var tcuvid = MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index+1).bdata.tcurve;
						if (typeof MapToolbar.features["tcurveTab"][tcuvid] != 'undefined') { MapToolbar.removeFeature(tcuvid); }
 			  	}
 			  	/*
		    	if (MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index+1).sline != '') {
			  		if (MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index+1).sline.indexOf(',') == 0) { 
 							MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index+1).sline = MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index+1).sline.substring(1,marker.sline.length);
 						}
 						var arrLine = MapToolbar.features['lineTab'][marker.pid].markers.getAt(marker.index+1).sline.split(',');
 						for (p = 0; p < arrLine.length; p++) {
 							var subArrL = arrLine[p].split(':');
 							var lineID = subArrL[0];
 							if (typeof MapToolbar.features["lineTab"][lineID] != 'undefined') { MapToolbar.removeFeature(lineID); }
 						}			    		
		    	} 	
		    	*/		  	
 			  }			  
 			  
	  	})
				
	    google.maps.event.addListener(marker, 'dragend', function() {
			//MapToolbar.currentlyDragging = false;
			if (!(marker.pid.split('_')[0] == 'ruler' || marker.pid.split('_')[0] == 'protractor')) {
		    path.setAt(marker.index, marker.getPosition());
		    var position = marker.getPosition(),
			p;
			//get previous point
		    if(typeof path.getAt(marker.index-1) != 'undefined'){
			    var m1 = path.getAt(marker.index -1);
				p = MapToolbar.getMidPoint(position, m1);		
				MapToolbar.addPoint(p, poly, marker.index);						
		    }
			// get next point
		    if(typeof path.getAt(marker.index+1) != 'undefined'){
			    var m2 = path.getAt(marker.index+1);
				p = MapToolbar.getMidPoint(position, m2);		
				MapToolbar.addPoint(p, poly, marker.index+1);						
		    }			
			}
			
	    });

    },	
    

//append a DOM node to $featureTable

    addFeatureEntry: function(name) {
		currentRow_ = document.createElement("tr");
	
		var visibleCell = document.createElement('td');
		visibleCell.id = name;
		visibleCell.onclick = new Function("MapToolbar.showhideFeature('"+name+"')");
		visibleCell.width =16;
		visibleCell.innerHTML = '<img src="images/14_layer_visible.png" width="16" height="16" />';
		currentRow_.appendChild(visibleCell);
		this.$featureTable.appendChild(currentRow_);
	
		var deleteCell = document.createElement('td');
		deleteCell.id = name;
		deleteCell.width=16;
		deleteCell.onclick = new Function("MapToolbar.removeFeature('"+name+"')");
		deleteCell.innerHTML = '<img src="images/delete_icon_16.png" width="16" height="16" />';
		currentRow_.appendChild(deleteCell);
		this.$featureTable.appendChild(currentRow_);	    

		var nameCell = document.createElement('td');
		currentRow_.appendChild(nameCell);
		nameCell.innerHTML = name;
		nameCell.onclick = new Function("MapToolbar.setMapCenter('"+name+"')");
					
		return {row:currentRow_};
    },
	    
//edition buttons
 
    buttons: {
		$hand: null,
		$shape: null,
		$line: null,
		$circle: null,
		$rectangle: null,
		$ruler: null,
		$dotMarker: null,
		$protractor: null,
		$curve: null
    },

//click event for line and shape edition

    polyClickEvent: null,

//an array of predefined colors

    colors:[["red", "#ff0000"], ["orange", "#e88800"], ["green","#00ff00"], ["blue", "#0000ff"], ["violet", "#7d00d6"], 
    ["grey_1", "#ededed"], ["grey_3", "#818181"], ["grey_4", "#464646"], ["grey_5", "#0d0d0d"], ["light_blue", "#009cd6"], 
    ["yellow", "#e8e500"], ["yellow_green", "#a3e800"], ["yellow_orange", "#e8b900"], ["pink", "#ff99cc"]],
    colorIndex: 0,

//contains list of overlay that were added to the map
//and that are displayed on the sidebar

    $featureTable: document.getElementById("featuretbody"),

    Feature: function(type){
		if(type == "shape" || type == "line" || type == "ruler" || type == "protractor"){
			this['poly'](type);
		} else {
			this[type]();
		}
    },

//contains reference for all features added on the map

    features:{
		dotMarkerTab: {},
		lineTab: {},
		shapeTab: {},
		curveTab: {},
		tcurveTab: {},
		circleTab: {},
		rectangleTab: {},
		rulerTab: {},
		protractorTab: {},
		overlayTab:{}
    },
    
    getColor: function(named) {
		var R = Math.floor((Math.random()*256)); 
		var G = Math.floor((Math.random()*256));
		var B = Math.floor((Math.random()*256));
		return rgbToHex(R, G, B);
  		//return this.colors[(this.colorIndex++) % this.colors.length][named ? 0 : 1];
  		//return this.colors[9][0];
	},
	
	getColor2: function(named) {
  		return this.colors[(this.colorIndex++) % this.colors.length][named ? 0 : 1];
  		//return this.colors[9][0];
	},
    
    getIcon: function(color) { 
		var icon = new google.maps.MarkerImage( "images/marker_rounded_" + color + ".png",
		  new google.maps.Size(16, 16),
	          new google.maps.Point(0,0),
	          new google.maps.Point(7, 16)
	        );
		return icon;
    },
    
//instanciate a new Feature instance and create a reference 

    initFeature: function(type){
		new MapToolbar.Feature(type);
    },

//check if a toolbar button is selected

	isSelected: function(el){
	   return (el.className == "selected"); 
	},
 
//the map DOM node container

    dotMarkerCounter: 0,
    lineCounter:0,
    shapeCounter:0,
    circleCounter:0,
    curveCounter:0,
    tcurveCounter:0,
    rectangleCounter:0,
    rulerCounter:0,
    protractorCounter:0,
    
//remove click events used for poly edition/update

    removeClickEvent: function(){   
    },

// remove feature from map

    removeFeature : function(id){
	    var type  = id.split('_')[0];
	    var feature = MapToolbar.features[type+'Tab'][id];
	    feature.$el.row.parentNode.removeChild(feature.$el.row);
	    delete  MapToolbar.features[type+'Tab'][id];
	    switch(type){
		    case "dotMarker":
			    feature.setMap(null);
		    break;
		    case "circle":
			    feature.setMap(null);
		    break;
		    case "curve":
		    	var pid = feature.pid;
		    	var Mid = feature.mid;
		    	
		    	MapToolbar.features['lineTab'][pid].markers.getAt(Mid).bdata.curve = '';
		    	MapToolbar.features['lineTab'][pid].markers.getAt(Mid).setDraggable(true);
		    	
		    	if (typeof MapToolbar.features['lineTab'][pid].markers.getAt(Mid-1) != 'undefined') {
		    		MapToolbar.features['lineTab'][pid].markers.getAt(Mid-1).setDraggable(true);
		    	}
		    	
		    	if (typeof MapToolbar.features['lineTab'][pid].markers.getAt(Mid+1) != 'undefined') {
		    		MapToolbar.features['lineTab'][pid].markers.getAt(Mid+1).setDraggable(true);
		    	}
		    			    	
		      feature.markers.forEach(function(marker, index){
				    marker.setMap(null);
			    });		     
			    feature.setMap(null);
			    
		    	break;
		    case "tcurve":
		    	var pid = feature.pid;
		    	var Mid = feature.mid;
		    	
		    	MapToolbar.features['lineTab'][pid].markers.getAt(Mid).bdata.tcurve = '';
		    	MapToolbar.features['lineTab'][pid].markers.getAt(Mid).setDraggable(true);
				
		    	if (typeof MapToolbar.features['lineTab'][pid].markers.getAt(Mid-1) != 'undefined') {
		    		MapToolbar.features['lineTab'][pid].markers.getAt(Mid-1).setDraggable(true);
		    	}
		    	
		    	if (typeof MapToolbar.features['lineTab'][pid].markers.getAt(Mid+1) != 'undefined') {
		    		MapToolbar.features['lineTab'][pid].markers.getAt(Mid+1).setDraggable(true);
		    	}				
			
				feature.markers.forEach(function(marker, index){
				    marker.setMap(null);
			    });		     
			    feature.setMap(null);
			    
		    	break;
		    case "rectangle":
			    feature.setMap(null);
				break;
			case "ruler":
				feature.setMap(null);
		    	break;
			case "protractor":
				feature.setMap(null);
		    	break;
		  default:
			  feature.markers.forEach(function(marker, index){
			    	//2do remove parallel line, tcurve, curve and all reference including object that created
		    		if (marker.sline != '') {
			    		if (marker.sline.indexOf(',') == 0) { 
 								marker.sline = marker.sline.substring(1,marker.sline.length);
 							}
 							var arrLine = marker.sline.split(',');
 							for (p = 0; p < arrLine.length; p++) {
 								var subArrL = arrLine[p].split(':');
 								var lineName = subArrL[0];
 								if (subArrL[1] == '0') {
 									if (typeof MapToolbar.features["lineTab"][lineName] != 'undefined') { MapToolbar.removeFeature(lineName); }
 								} else if (subArrL[1] == '1') {
 									// do nothing
 								}
 							}			    		
		    		}
			    	
			    	if (marker.bdata.curve != '') {
								var cuvid = marker.bdata.curve;
								if (typeof MapToolbar.features["curveTab"][cuvid] != 'undefined') { MapToolbar.removeFeature(cuvid); }
			    	}
			    	if (marker.bdata.tcurve != '') {
 								var tcuvid = marker.bdata.tcurve;								
								if (typeof MapToolbar.features["tcurveTab"][tcuvid] != 'undefined') { MapToolbar.removeFeature(tcuvid); }
			    	}
			    	
				    marker.setMap(null);
			    });
			    feature.setMap(null);	
		    break;
	    }
	    MapToolbar.select('hand_b');

    },

 	showhideFeature : function(id){
	    var type  = id.split('_')[0];
	    var feature = MapToolbar.features[type+'Tab'][id];
	    
	    if (feature.getVisible()) {
	    	feature.setVisible(false); 
	    	if(type == "shape" || type == "line" || type == "curve" || type == "tcurve" || type == "ruler" || type == "protractor"){
	    		feature.markers.forEach(function(marker, index){
				    marker.setVisible(false);
			  	});
			}
			  	
	    	var itemListTable = document.getElementById("featuretable");
	    	for (var r = 0, n = itemListTable.rows.length; r < n; r++) {
	    		if (itemListTable.rows[r].cells[2].innerHTML == id) {
	    	 		itemListTable.rows[r].cells[0].innerHTML = '<img src="images/hide.png" width="16" height="16" />';
	    	 	}
			}
	    	
	    } else {
	    	feature.setVisible(true);
	    	if(type == "shape" || type == "line" || type == "curve" || type == "tcurve" || type == "ruler" || type == "protractor"){
	    		feature.markers.forEach(function(marker, index){
				    marker.setVisible(true);
			  	});
			}
				
	    	var itemListTable = document.getElementById("featuretable");
	    	for (var r = 0, n = itemListTable.rows.length; r < n; r++) {
	    		if (itemListTable.rows[r].cells[2].innerHTML == id) {
	    	 		itemListTable.rows[r].cells[0].innerHTML = '<img src="images/14_layer_visible.png" width="16" height="16" />';
	    	 	}
			}	    	
	    }
 		},
//toolbar buttons selection

    select: function (buttonId){ // tak compitable dengan Chrome dsb
	    MapToolbar.buttons.$hand.className="unselected";
	    MapToolbar.buttons.$shape.className="unselected";
	    MapToolbar.buttons.$line.className="unselected";
	    MapToolbar.buttons.$dotMarker.className="unselected";
	    MapToolbar.buttons.$circle.className="unselected";
			MapToolbar.buttons.$rectangle.className="unselected";
			MapToolbar.buttons.$ruler.className="unselected";
			MapToolbar.buttons.$protractor.className="unselected";
	    document.getElementById(buttonId).className="selected";
    },

    setMapCenter: function(featureName){
    	var type = featureName.split('_')[0];
    	if(type == 'shape' || type=='line' || type == 'ruler' || type == 'protractor'){
    		MapToolbar.currentFeature = MapToolbar.features[type + 'Tab'][featureName]; 
    		var point = MapToolbar.currentFeature.getPath().getAt(MapToolbar.currentFeature.getPath().length-1);
    	}else if(type == 'dotMarker'){
    		MapToolbar.currentFeature = null;
 			var point = MapToolbar.features[type + 'Tab'][featureName].getPosition();   		
    	}else if(type == 'circle' || type == 'rectangle'){
    		MapToolbar.currentFeature = null;
    		var RCobj = MapToolbar.features[type + 'Tab'][featureName];
    		RCobj.setEditable(true);    		 
    		google.maps.event.addListenerOnce(RCobj, 'bounds_changed', function(mEvent) {
    			RCobj.setEditable(false);
   			});
    	}
    	MapToolbar.select(type + '_b');
			map.setCenter(point);
			
    },

//select hand button

    stopEditing: function() {
      this.removeClickEvent();
      this.select("hand_b");
    },

//change marker icon 

    updateMarker: function(marker, cells, color) {
      if (color) {
	  marker.setIcon( MapToolbar.getIcon(color) );
      }
      var latlng = marker.getPosition();
      //cells.desc.innerHTML = "(" + Math.round(latlng.lat() * 100) / 100 + ", " + Math.round(latlng.lng() * 100) / 100 + ")";
    }
}

MapToolbar.Feature.prototype.poly = function(type) {
	var color = MapToolbar.getColor(false), //"black",
		path = new google.maps.MVCArray,
		poly,
		self = this,
		el = type + "_b";
	

	if(type=="shape"){
		poly = self.createShape( {strokeWeight: 1, fillColor: color, fillOpacity: 0.0}, path );
	}else if(type=="line"){
		poly = self.createLine( {strokeWeight: 1, strokeColor: color }, path );
	}else if(type=="ruler" || type=="protractor"){
		poly = self.createLine( {strokeWeight: 1, strokeColor: '#C80000', strokeOpacity: 0.3 }, path );
	}
	
	poly.markers = new google.maps.MVCArray; 

	google.maps.event.addListener(poly, "mouseover", function(){
		if (type=='line' || type=='ruler' || type=='protractor') {
			poly.setOptions( {strokeWeight: 4} );	
		}
	});

	google.maps.event.addListener(poly, "mouseout", function(){
    if (MapToolbar.currentlyDragging) return;
    if (type=='line' || type=='ruler' || type=='protractor') {
			poly.setOptions( {strokeWeight: 1} );
		}
	});	
	
	google.maps.event.addListener(poly, "click", function(mEvent){
		
		if (type=='line') {

			if ($('#dialogSwitchTrack').dialog('isOpen')) {
				if ($('#dInsSTC_T2').val() != $('#dInsSTC_T1').val()) {
					$('#dInsSTC_T2').val(poly.id);
					return false;
				} else {
					$('#dInsSTC_T2').val('');
					return false;
				}
			}
			
			if ($('#dialogWidenParallelGap').dialog('isOpen')) {
				if ($('#dpLTs_Line2').val() != $('#dpLTs_Line1').val()) {
					$('#dpLTs_Line2').val(poly.id);
					return false;
				} else {
					$('#dpLTs_Line2').val('');
					return false;
				}
			}
			
			if ($('#dialogInsertPlatform').dialog('isOpen') == true) {
				if (poly.id != $('#dInsForm_pid').val()) {
					$('#dInsForm_pid2').val(poly.id);	
				}				
				return false;  			
			}			
			
			if ($('#dialogInvertLine').dialog('isOpen')) {
				if ($('#dInvLine_pid').val() != poly.id) {
					$('#dInvLine_pid').val(poly.id);				
				}
				return false;
			}			
			
			if ($('#dialogBuildRoute').dialog('isOpen')) {
				if ($('#dbr_lineid').val() != poly.id) {
					$('#dbr_lineid').val(poly.id);
				}
				if (poly.name != '') { $('#dbr_trackname').val(poly.name); }

				if (poly.trackbve != '') {
					// data format :-> gauge: §train: §devID: 
					var arrTB = poly.trackbve.split('§');
					$('#dbr_trackGauge').val(arrTB[0].split(':')[1]); 
					$('#dbr_runningTrain').val(arrTB[1].split(':')[1]);
					$('#dbr_devID').val(arrTB[3].split(':')[1]);
				}
	
				if ((poly.note != null) && (poly.note != '')) { $('#dbr_note').val(poly.note); }
				return false;
			}
			
			if ($('#dialogLinkLines').dialog('isOpen') == true) {
				if ($('#dLL_Pid2').val() != $('#dLL_Pid1').val()) {
					$('#dLL_Pid2').val(poly.id);
					return false;
				} else {
					$('#dLL_Pid2').val('');
					return false;
				}
			}
			
			var path = poly.getPath();
			var midx = path.length;
			
			var distance = getTrackDistanceFromStart(poly.id,midx -1);
			
			var length = distance.polyline;
			var actual = distance.line;
			
			var infoWindowTxt = 'Line Id : ' + poly.id + '<br />Polyline Length : ';
			if (length < 1000) {
				infoWindowTxt += length.toFixed(2) + ' m.<br />';
			} else {
				infoWindowTxt += (length/1000).toFixed(6) + ' km.<br />';
			}
			infoWindowTxt += 'Actual distance : ';
			if (actual < 1000) {
				infoWindowTxt += actual.toFixed(2) + ' m.<br />';
			} else {
				infoWindowTxt += (actual/1000).toFixed(6) + ' km.<br />';
			}
			
			var lat0 = mEvent.latLng.lat();
			var lng0 = mEvent.latLng.lng();
			
		infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="2"><tr>' +
    	'<td width="24"><img src="images/edit-line.png" width="20" height="20" title="Edit line" style="cursor: pointer;" onclick="MapToolbar.setMapCenter(\'' + poly.id + '\');"></td>';
    	 
    	infoWindowTxt += '<td width="24"><img src="images/remove line.png" width="20" height="20" title="Remove line" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\''+ poly.id + '\');"></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td>'; 
    	
    	infoWindowTxt += '<td width="24"><img src="images/line+point.png" width="20" height="20" title="Add new point to current line" style="cursor: pointer;" onclick="btnAddMarker2Polyline(\''+ poly.id + '\',\'' + lat0 + '\',\'' + lng0 + '\');"></td>';
    	 
    	infoWindowTxt += '<td width="24"><img src="images/split line.png" width="20" height="20" title="Split line" style="cursor: pointer;" onclick="splitPolyline(\''+ poly.id + '\',\'' + lat0 + '\',\'' + lng0 + '\');"></td><td width="24">';
    	
    	infoWindowTxt += '<img src="images/join2line.png" width="20" height="20" title="Join @ combine two lines" style="cursor: pointer;" onclick="precombine2polyline(\''+ poly.id + '\');"></td>';
    	
    	infoWindowTxt += '<td width="24"><img src="images/+ paralel line.png" width="20" height="20" title="Add new parallel line (copy)" style="cursor: pointer;" onclick="preparallel_line(\''+ poly.id + '\');"></td>';
    	
		infoWindowTxt += '<td><img src="images/gbm-gradient.png" title="Line pitch @ gradient" width="20" height="20" style="cursor: pointer;" onclick="prelinepitch(\'' + poly.id  +'\');"></td>';
  	      
		infoWindowTxt += '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
			
		infoWindowTxt += '<td><img src="images/xfce4_settings.png" title="Setting" width="16" height="16" style="cursor: pointer;" onclick="polylineSetting(\'' + poly.id + '\');"></td>';
			
		infoWindowTxt += '</tr></table>';
    	/*
    	infoWindowTxt += 'Line type : <select name="menu_pl_type" id="menu_pl_type" style="font-size:10px" onchange="setLineType(\''+ poly.id + '\');">' +
  		'<option> - select - </option><option value="pl_rail">Railway track</option><option value="pl_road">Road/Highway</option><option value="pl_sideobj">Side object</option></select>'; 
  		*/
  		var moreOptionTxt = '';
  		
  		if (poly.ptype =='pl_rail') 
  			{   				  				
  				//moreOptionTxt += 'Rail index : <select name="menu_LRO_railIndex" id="menu_LRO_railIndex" style="font-size:10px" onchange="setRailIndex(\''+ poly.id + '\');"><option> - select - </option>';  //2 do rail option
  				//moreOptionTxt += '<option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option></select> (0 - running line)';  				
  			} 

  		if (poly.ptype =='pl_road') 
  			{ 
  				moreOptionTxt += ''; //2 do road option
  			} 
  		  		
  		if (poly.ptype =='pl_sideobj') 
  			{ 
  				moreOptionTxt += ''; //2 do road option
  			}

  		if (poly.ptype =='pl_platform') 
  			{ 
  				moreOptionTxt += ''; //2 do road option
  			}
  		
  		if (moreOptionTxt != '') {
  			infoWindowTxt += '<br />' + moreOptionTxt;
  		}

			var infowindow = new google.maps.InfoWindow({
            content: infoWindowTxt,
            position: mEvent.latLng
        });
        
      infowindow.open(map);   
      
      if (poly.ptype =='pl_rail') {
      	$("#menu_pl_type option[value='pl_rail']").attr("selected", "selected");
      } else if (poly.ptype =='pl_road') {
      	$("#menu_pl_type option[value='pl_road']").attr("selected", "selected");
      } else if (poly.ptype =='pl_sideobj') {
      	$("#menu_pl_type option[value='pl_sideobj']").attr("selected", "selected");
      } else {
      	
      }
		
		}else if(type=="ruler" || type=="protractor"){
			if (type == 'ruler') {
				var length = google.maps.geometry.spherical.computeLength(poly.getPath());;
				var infoWindowTxt = 'Distance : ';
				if (length < 1000) {
					infoWindowTxt += length.toFixed(2) + ' m.<br />';
				} else {
					infoWindowTxt += (length/1000).toFixed(6) + ' km.<br />';
				}
				var infowindow = new google.maps.InfoWindow({
					content: infoWindowTxt,
					position: mEvent.latLng
				});
				infowindow.open(map);
				
			} else {
				var m0 = poly.markers.getAt(0).getPosition();
				var m1 = poly.markers.getAt(1).getPosition();
				var m2 = poly.markers.getAt(2).getPosition();				
				var h1 = google.maps.geometry.spherical.computeHeading(m0,m1);
				var h2 = google.maps.geometry.spherical.computeHeading(m1,m2);
				var fic = intersection_angle(h1,h2);
				var intAngleDeg = Math.round(fic.angle*1000)/1000;
				
				var infoWindowTxt = 'Intersection Angle : ' + intAngleDeg + '&deg;';
				var infowindow = new google.maps.InfoWindow({
					content: infoWindowTxt,
					position: mEvent.latLng
				});
				infowindow.open(map);
			}
		
		} else {
			var path = poly.getPath();
			var area = google.maps.geometry.spherical.computeArea(path);
			
			var infoWindowTxt = 'Polygon Id : ' + poly.id + '<br />' + 'Area : ';
			
			if (area < 1000) {
				infoWindowTxt += area.toFixed(2) + ' m' + String.fromCharCode(178) + ".";
			} else {
				infoWindowTxt += (area/1000).toFixed(2) + ' km' + String.fromCharCode(178) + ".";
			}	
		
			var lat0 = mEvent.latLng.lat();
			var lng0 = mEvent.latLng.lng();
				   	
	   	infoWindowTxt += '<table border="0" cellspacing="0" cellpadding="3"><tr><td><img src="images/polygon-edit.png" title="Edit polygon" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.setMapCenter(\'' + poly.id + '\');">' + ' Edit' + '</td>';
	   	infoWindowTxt += '<td><img src="images/polygon-remove.png" title="Remove line" style="cursor: pointer;" width="20" height="20" onclick="MapToolbar.removeFeature(\''+ poly.id + '\');">' + ' Remove' + '</td>';
	   	infoWindowTxt += '<td><img src="images/note_todo_list.png" title="Properties" style="cursor: pointer;" width="16" height="16" onclick="alert(\''+ poly.id + '\');">' + ' Properties' + '</td></tr></table>';
	   	/*
	   	infoWindowTxt += '<select name="menu_pg_type" id="menu_pg_type" style="font-size:10px" onchange="setPolyType(\''+ poly.id + '\');"><option> - select - </option>';
  		if (poly.ptype == 'pg_building') {infoWindowTxt += '<option value="pg_building" selected>Building</option>'; } else {infoWindowTxt += '<option value="pg_building">Building</option>';}
  		if (poly.ptype == 'pg_house') {infoWindowTxt += '<option value="pg_house" selected>House</option>'; } else {infoWindowTxt += '<option value="pg_house">House</option>'; }
  		if (poly.ptype == 'pg_landscape') {infoWindowTxt += '<option value="pg_landscape" selected>Landscape</option>'; } else {infoWindowTxt += '<option value="pg_landscape">Landscape</option>'; }
  		if (poly.ptype == 'pg_hill') {infoWindowTxt += '<option value="pg_hill" selected>Hill</option>'; } else {infoWindowTxt += '<option value="pg_hill">Hill</option>'; }
  		if (poly.ptype == 'pg_field') {infoWindowTxt += '<option value="pg_field" selected>Field</option>'; } else {infoWindowTxt += '<option value="pg_field">Field</option>'; }
  		if (poly.ptype == 'pg_structure') {infoWindowTxt += '<option value="pg_structure" selected>Structure</option>'; } else {infoWindowTxt += '<option value="pg_structure">Structure</option>'; }
  		if (poly.ptype == 'pg_object') {infoWindowTxt += '<option value="pg_object" selected>Custom Object</option>'; } else {infoWindowTxt += '<option value="pg_object">Custom Object</option>'; }
  		
  		infoWindowTxt += '</select>';
	   	*/
	   	var infowindow = new google.maps.InfoWindow({
            content: infoWindowTxt,
            position: mEvent.latLng
        });
        
      infowindow.open(map);   
		}
		
		
		if ( currMod == 'join_line') {
			if (typeof $('#pline1name').val() == 'undefined') {
				$('#pline1name').val(poly.id);	
			} else {
				if ($('#pline1name').val() != poly.id) {
					$('#pline2name').val(poly.id);
				}
			}
		} 

		
	});  

			
	if(MapToolbar.isSelected(document.getElementById(el))) return;
	MapToolbar.select(el);
	MapToolbar.currentFeature = poly;	
	poly.setMap(map);	  
	if(!poly.$el){
		++MapToolbar[type+"Counter"];
		poly.id = type + '_'+ MapToolbar[type+"Counter"];
		poly.ptype = null;
		poly.note = null;
		poly.name = null;
		poly.trackservice = null;
		poly.trackno = null;
		poly.tracksection = null;
		poly.trackbve = null;
		poly.kit = null;
		poly.$el = MapToolbar.addFeatureEntry(poly.id);  	
		MapToolbar.features[type+"Tab"][poly.id] = poly;		
		newPoly = poly; 
	}
}

MapToolbar.Feature.prototype.dotMarker = function() {
		var marker,	
		self = this;    
  	if(MapToolbar.isSelected(MapToolbar.buttons.$dotMarker)) return;
  	MapToolbar.select("dotMarker_b"); 
		var listener = google.maps.event.addListener(map, "click", function(arg) {
     console.log(MapToolbar.currentFeature);
	  if (arg && arg.latLng) {
	    MapToolbar.select("hand_b");
	    google.maps.event.removeListener(listener);
	    self.createMarker(arg.latLng, true);
	  }
	});
}

var bucu = 0;
var rect;
var latlng1, latlng2;

MapToolbar.Feature.prototype.rectangle = function() {  
	// by : Karya IT (Mac 2012), Okt 2012 
	// based on : Google Maps API v3
	// url : http://www.karyait.net.my/
	// ver. : 1.5.0
	// purpose : draw rectengle
	
  	if(MapToolbar.isSelected(MapToolbar.buttons.$rectangle)) return;
  	MapToolbar.select("rectangle_b");  	
        
  	console.log(MapToolbar.currentFeature);

	var listener = google.maps.event.addListener(map, 'click', function(mEvent) {
			
		if (bucu == 0) {
			bucu ++;
			latlng1 = mEvent.latLng;
			//tandakan marker
		} else if (bucu == 1) {
			bucu ++;
			latlng2 = mEvent.latLng;
   	    
			if (latlng1.lng() < mEvent.latLng.lng()) {						
				
			} else {
					var tlng1 = latlng2; //xchange coordinate
					var tlng2 = latlng1;
					latlng1 = tlng1;
					latlng2 = tlng2;
			}
				
  			var rect = new google.maps.Rectangle({
	     		strokeColor: "#FF0000",
       		strokeOpacity: 0.8,
       		strokeWeight: 1,
       		editable: false,
       		fillOpacity: 0.0,
       		map: map
       	});
     	 			
 		var latLngBounds = new google.maps.LatLngBounds(latlng1, latlng2);
 		rect.setBounds(latLngBounds);
	
		var color = MapToolbar.getColor(false),
					rect,
					self = this,
					el = "rectangle_b";
			
		++MapToolbar["rectangleCounter"];
			 
		rect.id = 'rectangle_'+ MapToolbar["rectangleCounter"];
		rect.ptype = null;
		rect.iwref = null;
		rect.data = null;
		rect.$el = MapToolbar.addFeatureEntry(rect.id);  	
		MapToolbar.features["rectangleTab"][rect.id] = rect;		 		


		MapToolbar.select("hand_b");
		google.maps.event.removeListener(listener);
		bucu = 0;
		    
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
					infoWindowTxt += '<img src="images/rectangle_edit.png" title="Edit rectangle" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.setMapCenter(\'' + rect.id + '\');">' + 'Edit' + '</td><td>';
					infoWindowTxt += '<img src="images/rectangle_remove.png" title="Remove rectangle" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\'' + rect.id + '\');">' + 'Remove' + '</td><td>';
					infoWindowTxt += '<img src="images/note_todo_list.png" title="Properties" width="20" height="20" style="cursor: pointer;" onclick="alert(\'' + rect.id + '\');">' + 'Properties' + '</td></tr></table>';
  /*
	   			infoWindowTxt += '<select name="menu_rc_type" id="menu_rc_type" style="font-size:10px" onchange="setRectangleType(\''+ rect.id + '\');"><option> - select - </option>';
  				if (rect.ptype == 'rc_building') {infoWindowTxt += '<option value="rc_building" selected>Building</option>'; } else {infoWindowTxt += '<option value="rc_building">Building</option>';}
  				if (rect.ptype == 'rc_house') {infoWindowTxt += '<option value="rc_house" selected>House</option>'; } else {infoWindowTxt += '<option value="rc_house">House</option>'; }
  				if (rect.ptype == 'rc_landscape') {infoWindowTxt += '<option value="rc_landscape" selected>Landscape</option>'; } else {infoWindowTxt += '<option value="rc_landscape">Landscape</option>'; }
  				if (rect.ptype == 'rc_field') {infoWindowTxt += '<option value="rc_field" selected>Field</option>'; } else {infoWindowTxt += '<option value="rc_field">Field</option>'; }
  				if (rect.ptype == 'rc_structure') {infoWindowTxt += '<option value="rc_structure" selected>Structure</option>'; } else {infoWindowTxt += '<option value="rc_structure">Structure</option>'; }
  				if (rect.ptype == 'rc_object') {infoWindowTxt += '<option value="rc_object" selected>Custom Object</option>'; } else {infoWindowTxt += '<option value="rc_object">Custom Object</option>'; }
  		
  				infoWindowTxt += '</select>';
	   	*/
	   			var infowindow = new google.maps.InfoWindow({
          		  content: infoWindowTxt,
            		position: mEvent.latLng
        		});
        
      		infowindow.open(map);    
	    		//alert("Area : " + area + "\nWidth : " + rwidth + "\nHeight : " + rheight);
	     });
		 
		 google.maps.event.addListener(rect, "bounds_changed", function(mEvent){
			MapToolbar.select("hand_b");
	     });
		 
			} else {
		    MapToolbar.select("hand_b");
		    google.maps.event.removeListener(listener);				
			}
    });

}

MapToolbar.Feature.prototype.circle = function() {
	// by : Karya IT (Mac 2012) 
	// based on : Google Maps API v3
	// url : http://www.karyait.net.my/
	// ver. : 1.0.0
	// purpose : draw circle
	
  	if(MapToolbar.isSelected(MapToolbar.buttons.$circle)) return;
  	MapToolbar.select("circle_b"); 
  	//MapToolbar.currentFeature = circle;	
  	      
  	console.log(MapToolbar.currentFeature);

		var listener = google.maps.event.addListener(map, 'click', function(mEvent) {
			var bulat = new google.maps.Circle({
	    	//strokeColor: "#0FF000",
      	strokeOpacity: 0.8,
       	strokeWeight: 1,
       	editable: false,
       	fillOpacity: 0.0,
       	center: mEvent.latLng,
       	radius: 100,
       	map: map
       });

			var color = MapToolbar.getColor(false),
				bulat,
				self = this,
				el = "circle_b";
			
			 ++MapToolbar["circleCounter"];
			 
			 bulat.id = 'circle_'+ MapToolbar["circleCounter"];
			 bulat.ptype = null;
			 bulat.note = null;
			 bulat.iwref = null;
			 bulat.$el = MapToolbar.addFeatureEntry(bulat.id);  	
			 MapToolbar.features["circleTab"][bulat.id] = bulat;		 		

		   MapToolbar.select("hand_b");
		   google.maps.event.removeListener(listener);
		   
		   google.maps.event.addListener(bulat, "click", function(mEvent){
	     		//alert(mEvent.latLng.toString());
	    		//alert(bulat.getRadius() + "\n" + bulat.getCenter().toString());
	    		//alert("jejari : " + bulat.getRadius() + "\n" + "luas : " + (Math.PI * bulat.getRadius() * bulat.getRadius()));
	    		
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
			 infoWindowTxt += '<img src="images/circle-edit.png" title="Edit circle" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.setMapCenter(\'' + bulat.id + '\');">' + 'Edit' + '</td><td>';
			 infoWindowTxt += '<img src="images/circle-remove.png" title="Remove circle" width="20" height="20" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\'' + bulat.id + '\');">' + 'Remove' + '</td><td>';
			 infoWindowTxt += '<img src="images/note_todo_list.png" title="Properties" width="20" height="20" style="cursor: pointer;" onclick="alert(\'' + bulat.id + '\');">' + 'Properties' + '</td></tr></table>';
  /*
			 infoWindowTxt += '<select name="menu_cc_type" id="menu_cc_type" style="font-size:10px" onchange="setRectangleType(\''+ bulat.id + '\');"><option> - select - </option>';
			 if (bulat.ptype == 'cc_building') {infoWindowTxt += '<option value="cc_building" selected>Building</option>'; } else {infoWindowTxt += '<option value="cc_building">Building</option>';}
			 if (bulat.ptype == 'cc_house') {infoWindowTxt += '<option value="cc_house" selected>House</option>'; } else {infoWindowTxt += '<option value="cc_house">House</option>'; }
			 if (bulat.ptype == 'cc_landscape') {infoWindowTxt += '<option value="cc_landscape" selected>Landscape</option>'; } else {infoWindowTxt += '<option value="cc_landscape">Landscape</option>'; }
			 if (bulat.ptype == 'cc_field') {infoWindowTxt += '<option value="cc_field" selected>Field</option>'; } else {infoWindowTxt += '<option value="cc_field">Field</option>'; }
			 if (bulat.ptype == 'cc_structure') {infoWindowTxt += '<option value="cc_structure" selected>Structure</option>'; } else {infoWindowTxt += '<option value="cc_structure">Structure</option>'; }
			 if (bulat.ptype == 'cc_object') {infoWindowTxt += '<option value="cc_object" selected>Custom Object</option>'; } else {infoWindowTxt += '<option value="cc_object">Custom Object</option>'; }
  		*/
			 infoWindowTxt += '</select>';
	   	
			 var infowindow = new google.maps.InfoWindow({
			 		content: infoWindowTxt,
			 		position: mEvent.latLng
			 });
        
			 infowindow.open(map);  	    		
	     });	

		 google.maps.event.addListener(bulat, "radius_changed", function(mEvent){
			MapToolbar.select("hand_b");
	     });
		 
		 google.maps.event.addListener(bulat, "center_changed", function(mEvent){
			MapToolbar.select("hand_b");
	     });		 
    });
}

MapToolbar.Feature.prototype.ruler = function() {

}

MapToolbar.Feature.prototype.protractor = function() {

}

MapToolbar.Feature.prototype.createMarker = function(point) {
	var color = MapToolbar.getColor2(true),
	  marker = new google.maps.Marker({
		position: point, 
		map: map, 
		draggable: true,
		flat: true
	}); 
		    
	++MapToolbar["dotMarkerCounter"];
	marker.id = 'dotMarker_'+ MapToolbar["dotMarkerCounter"];
	marker.ptype = null;
	marker.note = null;
	marker.iwref = null;
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
		infoWindowTxt += '<img src="images/note_todo_list.png" title="Properties" width="16" height="16" style="cursor: pointer;" onclick="MapToolbar.removeFeature(\'' + marker.id + '\');">' + 'Properties' + '</td><td>&nbsp;</td><td>';
  /*
		infoWindowTxt += '<select name="menu_m_type" id="menu_m_type" style="font-size:10px" onchange="setMarkerType(\''+ marker.id + '\');"><option> - select - </option>';
		if (marker.ptype == 'm_stopsign') {infoWindowTxt += '<option value="m_stopsign" selected>Stop Sign</option>'; } else {infoWindowTxt += '<option value="m_stopsign">Stop Sign</option>';}
		if (marker.ptype == 'm_rail_start') {infoWindowTxt += '<option value="m_rail_start" selected>Rail Start</option>'; } else {infoWindowTxt += '<option value="m_rail_start">Rail Start</option>'; }
		if (marker.ptype == 'm_rail_end') {infoWindowTxt += '<option value="m_rail_end" selected>Rail End</option>'; } else {infoWindowTxt += '<option value="m_rail_end">Rail End</option>'; }
		if (marker.ptype == 'm_tree') {infoWindowTxt += '<option value="m_tree" selected>Tree</option>'; } else {infoWindowTxt += '<option value="m_tree">Tree</option>'; }
		if (marker.ptype == 'm_traffic_signal') {infoWindowTxt += '<option value="m_traffic_signal" selected>Traffic Signal</option>'; } else {infoWindowTxt += '<option value="m_traffic_signal">Traffic Signal</option>'; }
		if (marker.ptype == 'm_object') {infoWindowTxt += '<option value="m_object" selected>Custom Object</option>'; } else {infoWindowTxt += '<option value="m_object">Custom Object</option>'; }
  		*/
		//infoWindowTxt += '</select></td></tr></table>';
	   	infoWindowTxt += '</td></tr></table>';
		var infowindow = new google.maps.InfoWindow({
			content: infoWindowTxt,
			position: mEvent.latLng
		});
        
		infowindow.open(map);		
	});
	    
	return marker;
}

MapToolbar.Feature.prototype.createShape = function(opts, path) {
	var poly;
	poly = new google.maps.Polygon({
	    strokeWeight: opts.strokeWeight,
	    fillColor: opts.fillColor
	});
	poly.setPaths(new google.maps.MVCArray([path]));
	return poly;
}

MapToolbar.Feature.prototype.createLine = function(opts, path) {
	var poly = new google.maps.Polyline({
	    strokeWeight: opts.strokeWeight,
	    strokeColor: opts.strokeColor,
	    geodesic: true
	}), self = this;  
	poly.setPath(new google.maps.MVCArray(path));
	return poly;
}

MapToolbar.Feature.prototype.createruler = function(opts, path) {
	var poly = new google.maps.Polyline({
	    strokeWeight: opts.strokeWeight,
	    strokeColor: opts.strokeColor,
	    geodesic: true
	}), self = this;  
	poly.setPath(new google.maps.MVCArray(path));
	return poly;
}

MapToolbar.Feature.prototype.createprotractor = function(opts, path) {
	var poly = new google.maps.Polyline({
	    strokeWeight: opts.strokeWeight,
	    strokeColor: opts.strokeColor,
	    geodesic: true
	}), self = this;  
	poly.setPath(new google.maps.MVCArray(path));
	return poly;
}

// ****************************************************************************

if (typeof Number.prototype.toRad == 'undefined') {
    Number.prototype.toRad = function() {
        return this * (Math.PI / 180);
    }
}

if (typeof Number.prototype.toDeg == 'undefined') {
    Number.prototype.toDeg = function() {
        return this * (180 / Math.PI);
    }
}

// ****************************************************************************

function initialize(container) {
	var options = {
		mapTypeControl: true,
	  mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID],
			style: google.maps.MapTypeControlStyle.DEFAULT,
			position: google.maps.ControlPosition.TOP_LEFT
	  },
    panControl: true,
    panControlOptions: {
       position: google.maps.ControlPosition.LEFT_TOP
    },
    zoomControl: true,
    zoomControlOptions: {
       style: google.maps.ZoomControlStyle.LARGE,
       position: google.maps.ControlPosition.LEFT_TOP
    },
    scaleControl: true,
    scaleControlOptions: {
       position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    streetViewControl: true,
    streetViewControlOptions: {
       position: google.maps.ControlPosition.LEFT_TOP
    }

	}
	
	map = new google.maps.Map(document.getElementById('map'));	
	map.setOptions(options);
	map.setZoom(18);
	map.setMapTypeId( google.maps.MapTypeId.TERRAIN );
	geocoder = new google.maps.Geocoder();
	
	// Create an ElevationService
	elevator = new google.maps.ElevationService();
	
	

	// Create a new chart in the elevation_chart DIV.
	chart = new google.visualization.ColumnChart(document.getElementById('elevation_chart'));

	var defaultlocation = $.cookie('defaultcenter'); 

	if ((defaultlocation != null && defaultlocation != "") && (typeof defaultlocation != "undefined")) {
		//cek if defaultlocation cookie available
		var kood = defaultlocation.split(",");
		map.setCenter(new google.maps.LatLng(kood[0],kood[1]));
	} else {
		//try locate by google
		if(google.loader.ClientLocation) {
			visitor_lat = google.loader.ClientLocation.latitude;
			visitor_lon = google.loader.ClientLocation.longitude;
			visitor_city = google.loader.ClientLocation.address.city;
			visitor_region = google.loader.ClientLocation.address.region;
			visitor_country = google.loader.ClientLocation.address.country;
			visitor_countrycode = google.loader.ClientLocation.address.country_code;
			codeAddress(visitor_city + ', ' + visitor_region + ', ' + visitor_country);
			map.setCenter(new google.maps.LatLng(visitor_lat,visitor_lon));
  	} else { 
		map.setCenter(new google.maps.LatLng(3.39142,101.5587));
		map.setZoom(6);
    }
  }
	
	document.getElementById("map_lokasi").innerHTML = " ( " + (map.getCenter().lat()) + degreeChr + " , " + (map.getCenter().lng()) + degreeChr + " ) "; 

// Check for the various File API support.
/* if (window.File && window.FileReader && window.FileList && window.Blob) {
  alert('Great success! All the File APIs are supported.');
} else {
  alert('The File APIs are not fully supported in this browser.');
} */

	with(MapToolbar){
	    with(buttons){
				$hand = document.getElementById("hand_b");
				$shape = document.getElementById("shape_b");
				$line = document.getElementById("line_b");
				$circle = document.getElementById("circle_b");
				$rectangle = document.getElementById("rectangle_b");
				$curve = document.getElementById("curve_b");
				$ruler = document.getElementById("ruler_b");
				$protractor = document.getElementById("protractor_b");
				$dotMarker = document.getElementById("dotMarker_b");
	    }
	    $featureTable = document.getElementById("featuretbody");
	    select("hand_b");
	}
	
	MapToolbar.polyClickEvent = google.maps.event.addListener(map, 'click',  function(event){
  	if( !MapToolbar.isSelected(MapToolbar.buttons.$shape) && !MapToolbar.isSelected(MapToolbar.buttons.$line) && !MapToolbar.isSelected(MapToolbar.buttons.$ruler) && !MapToolbar.isSelected(MapToolbar.buttons.$protractor)) return;
	    if(MapToolbar.currentFeature){
			if (MapToolbar.isSelected(MapToolbar.buttons.$ruler) || MapToolbar.isSelected(MapToolbar.buttons.$protractor)) {
				if (MapToolbar.isSelected(MapToolbar.buttons.$ruler)) {
					if (MapToolbar.currentFeature.markers.length < 2) {
						MapToolbar.addPoint(event, MapToolbar.currentFeature);
					}
				} else {
					if (MapToolbar.currentFeature.markers.length < 3) {
						MapToolbar.addPoint(event, MapToolbar.currentFeature);
					}				
				}
			} else{
				MapToolbar.addPoint(event, MapToolbar.currentFeature);
			}
	    }
	});
	
	// Register event listeners
  google.maps.event.addListener(map, 'mousemove', function(mEvent) {
  	document.getElementById("map_lokasi").innerHTML = " ( " + (mEvent.latLng.lat()) + degreeChr + " , " + (mEvent.latLng.lng()) + degreeChr + " ) ";  	
  });
  
  // Add a listener for the click event and call getElevation on that location
  //google.maps.event.addListener(map, 'rightclick', getElevation);
  google.maps.event.addListener(map, 'rightclick', function(mEvent) {
	getElevation(mEvent);
  });
  
	google.visualization.events.addListener(chart, 'select', function() {
  	var row = chart.getSelection()[0].row;
	  $('#setPPoint').val(data.getValue(row, 0));	  
	  $('#txtPitchStrP').val(data.getValue(row, 0));
	  
	  
	  				   					
  	if ($('#cgsp').val() == '') {
	   	$('#cgsp').val(data.getValue(row, 0).toString());
	   	$('#setPHeightSt').val(data.getValue(row, 0));
	   	return;
	  } else { 
	   	if ($('#cgep').val().trim() == '') {
	    		$('#cgep').val(data.getValue(row, 0).toString());
	    		$('#setPHeightEd').val(data.getValue(row, 0));
	    		var tep = parseInt($('#cgep').val());
	    		var tsp = parseInt($('#cgsp').val());
	    		if (tep < tsp) {
	    			var no1 = $('#cgsp').val();
	    			var no2 = $('#cgep').val();
	    			$('#cgsp').val(no2);
	    			$('#cgep').val(no1);	    		
	    			$('#setPHeightSt').val(no2);
	    			$('#setPHeightEd').val(no1);
	    		}
	    	} else {
	    		$('#cgsp').val('');
	    		$('#cgep').val('');
	    		$('#setPHeightSt').val('');
	    		$('#setPHeightEp').val('');
	    		$('#txtCalculatedPitch').val('');
	    		$('#cgsp').val(data.getValue(row, 0));	   
	    		$('#setPHeightSt').val(data.getValue(row, 0)); 		
	    		return false; // cek
	    	}
	    } 			
	    			
	    if (($('#cgsp').val() != '') && ($('#cgep').val() != ''))  {
		  	var y1 = 0; 
		    var y2 = 0;	
		    			    			
		    for (i = 0; i < data.getNumberOfRows(); i++) {
	  	  	if (parseInt($('#cgsp').val()) == parseInt(data.getValue(i, 0))) {
	    			y1 = parseFloat(data.getValue(i, 2));
	    		}
	    					
	    		if (parseInt($('#cgep').val()) == parseInt(data.getValue(i, 0))) {
	    			y2 = parseFloat(data.getValue(i, 2));
	    		}
	    	}
	    	var xd = parseInt($('#cgep').val()) - parseInt($('#cgsp').val());
	    	var yd = y2 - y1;
	    	var m = yd / xd;
	    	
	    	if (m >= 0) {
	    		$('#txtCalculatedPitch').val(Math.ceil(m*1000));	
	    	} else {
	    		$('#txtCalculatedPitch').val(Math.floor(m*1000));
	    	}	    				
		  }
    				
  	}); 
  	
$('ul.langmenu li ul li').each(function(i){
	if ($.lang.currentLang == $(this).attr('id')) {
		$("#bahasa").text($(this).text());
	}
});
}

function loadScript(maplang,uilang,langtxt) {
/*
	oldScript = document.getElementById("google-maps-script");
    oldScript.parentNode.removeChild(oldScript);

	if (maplang != "en") {
		var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.google.com/maps/api/js?v=3&sensor=false&libraries=geometry&key='+'AIzaSyB4aJCgrrHzuiEvnTS6mUZVyK7qOKvlLgA&language=' + maplang + '&callback=initialize';
	script.id = "google-maps-script";
	document.body.appendChild(script);	
	} else {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.google.com/maps/api/js?v=3&sensor=false&libraries=geometry&key='+'AIzaSyB4aJCgrrHzuiEvnTS6mUZVyK7qOKvlLgA&callback=initialize';
	script.id = "google-maps-script";
	document.body.appendChild(script);		
	}
*/ // important, fix 3/12/2013 12:20am gmt: 8+ : issue : teks dialog ui tak auto update 
	$.lang.change(uilang);
	$.cookie('defaultlang', maplang + ',' + uilang, { expires: 365 });
	location.reload(); // important, fix 3/12/2013 12:20am gmt: 8+
	//$("#bahasa").text(langtxt);
	//setTimeout('$.lang.run()', 5000);
	//alert($("#dialogGFinder").dialog( "option", "title" ));
}


