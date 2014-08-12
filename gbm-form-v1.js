/*
GB Maps ギビマップ - © Karya IT (http://www.karyait.net.my/) 2012-2014. All rights reserved. 
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

GB Maps ギビマップ by Karya IT is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. Based on a work at https://code.google.com/p/gbmaps/. Permissions beyond the scope of this license may be available at https://developers.google.com/readme/terms. Google Maps - ©2014 Google.

Code license : Apache License 2.0

Main GB Maps ギビマップ Website : http://gbmaps.karyait.net.my/ or http://gbmaps.blogspot.com

Development site (programming) : https://github.com/karyait/gbmaps & https://code.google.com/p/gbmaps/
Personal blog for GB Maps ギビマップ (design algorithm) : http://blogkaryait.wordpress.com/tag/gbmaps/

File : gbm-form-v1.js
purpose : gb maps form generator
type : release (under development)
version : 1.0.0
build : 
last update : 05 July 2014 03:21pm (GMT 8+)

*/

function formMaker(pid,idx,platform_length,howtoForm,formType,formSide) {

	var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
	var staName = $('#dInsForm_StaName').val();
	var staID = $('#dInsForm_StaID').val();
	var stopD = $('#dInsForm_StopDuration').val();
	var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
	var fcar = $('#dInsForm_Cars').val();
	var stopO = $('#dInsForm_StopOffset').val();
	var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
				
//	if (!cekFormInput(formType)) {
//		return false;
//	}

	var ptype = pid.split('_')[0];
	if (ptype != 'line') {
		if (ptype == 'curve') {
			var T = MapToolbar.features['curveTab'][pid].Lt;
			var Lc = MapToolbar.features['curveTab'][pid].Lc;
			var ld = MapToolbar.features['curveTab'][pid].markers.getAt(idx).ld;
			var Rc = Math.abs(MapToolbar.features['curveTab'][pid].Rc);
			var Cc = MapToolbar.features['curveTab'][pid].Cc;
			var st = MapToolbar.features['curveTab'][pid].st;
			var ed = MapToolbar.features['curveTab'][pid].ed;
			var h1 = MapToolbar.features['curveTab'][pid].h1;
			var h2 = MapToolbar.features['curveTab'][pid].h2;
			var line_pid = MapToolbar.features['curveTab'][pid].pid;
			var line_mid = MapToolbar.features['curveTab'][pid].mid;
			var dir = (MapToolbar.features['curveTab'][pid].Rc < 0) ? -1 : 1;
			var iB = google.maps.geometry.spherical.computeHeading(Cc,st);
		
			if (howtoForm < 0 ) {
				if (platform_length > ld) {
					var l_st = platform_length - ld + T;
					var p_st = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid).getPosition(), -l_st, h1);

					MapToolbar.addPoint(p_st, MapToolbar.features["lineTab"][line_pid], line_mid);
					var image = new google.maps.MarkerImage('images/form_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features["curveTab"][pid].markers.getAt(idx).setIcon(image); // end
					MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid).setIcon(image); // st
					
					MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
					MapToolbar.features["curveTab"][pid].markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
					addStation (staName,staID,MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid).getPosition());

				} else {
					var l_st = ld - platform_length;
					var a_deg = (180 * l_st) / (Math.PI * Rc);

					if (dir  > 0) {
						var ha = (iB + a_deg <= 180) ? iB + a_deg : iB + a_deg - 360;
						var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
						var addAt =  curveAddAt(pid,e1);	
						MapToolbar.addPoint(e1, MapToolbar.features['curveTab'][pid], addAt);
					} else {
						var ha = (iB - a_deg <= -180) ? iB - a_deg + 360 : iB - a_deg ;
						var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
						var addAt =  curveAddAt(pid,e1);	
						MapToolbar.addPoint(e1, MapToolbar.features['curveTab'][pid], addAt);
	
					}

					var image = new google.maps.MarkerImage('images/form_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					var cuvNewIdx = MapToolbar.features["curveTab"][pid].markers.getLength()-1;
					MapToolbar.features["curveTab"][pid].markers.getAt(idx).setIcon(image); // end
					MapToolbar.features["curveTab"][pid].markers.getAt(cuvNewIdx).setIcon(image); // st

					MapToolbar.features["curveTab"][pid].markers.getAt(cuvNewIdx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
					MapToolbar.features["curveTab"][pid].markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
					addStation (staName,staID,MapToolbar.features["curveTab"][pid].markers.getAt(idx).getPosition());
				}
			} else {
				if (platform_length > (Lc-ld)) {
					var l_ed = platform_length - Lc + ld + T;
					var p_st = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid).getPosition(), l_ed, h2);
					MapToolbar.addPoint(p_st, MapToolbar.features["lineTab"][line_pid], line_mid+1);
					var image = new google.maps.MarkerImage('images/form_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features["curveTab"][pid].markers.getAt(idx).setIcon(image);
					MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid+1).setIcon(image);	

					MapToolbar.features["curveTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
					MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid+1).kdata.form = stopS + ',' + stopO;;					
					addStation (staName,staID,MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid+1).getPosition());
				} else {
					var l_ed = ld + platform_length;
					var a_deg = (180 * l_ed) / (Math.PI * Rc);

					if (dir  > 0) {
						var ha = (iB + a_deg <= 180) ? iB + a_deg : iB + a_deg - 360;
						var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
						var addAt =  curveAddAt(pid,e1);	
						MapToolbar.addPoint(e1, MapToolbar.features['curveTab'][pid], addAt);
					} else {
						var ha = (iB - a_deg <= -180) ? iB - a_deg + 360 : iB - a_deg ;
						var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
						var addAt =  curveAddAt(pid,e1);	
						MapToolbar.addPoint(e1, MapToolbar.features['curveTab'][pid], addAt);
					}	
	
					var image = new google.maps.MarkerImage('images/form_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					var cuvNewIdx = MapToolbar.features["curveTab"][pid].markers.getLength()-1;
					MapToolbar.features["curveTab"][pid].markers.getAt(idx).setIcon(image);
					MapToolbar.features["curveTab"][pid].markers.getAt(cuvNewIdx).setIcon(image);

					MapToolbar.features["curveTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
					MapToolbar.features["curveTab"][pid].markers.getAt(cuvNewIdx).markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
					addStation (staName,staID,MapToolbar.features["curveTab"][pid].markers.getAt(cuvNewIdx).markers.getAt(idx).getPosition());
				}
			}
	
		} else if (ptype == 'tcurve') {
	
			var line_pid = MapToolbar.features['tcurveTab'][pid].pid;
			var line_mid = MapToolbar.features['tcurveTab'][pid].mid;
			var tctype = MapToolbar.features['tcurveTab'][pid].tctype;
			var Rc = Math.abs(MapToolbar.features['tcurveTab'][pid].Rc);
			var Ls = MapToolbar.features['tcurveTab'][pid].Ls;
			var Lc = MapToolbar.features['tcurveTab'][pid].Lc;
			var Lt = Lc + 2*Ls;
			var K = MapToolbar.features['tcurveTab'][pid].K;
			var TotalX = MapToolbar.features['tcurveTab'][pid].TotalX;
			var TotalY = MapToolbar.features['tcurveTab'][pid].TotalY;
			var Cc = MapToolbar.features['tcurveTab'][pid].Cc;
			var Ttst = MapToolbar.features['tcurveTab'][pid].Ttst;
			var Tted = MapToolbar.features['tcurveTab'][pid].Tted;
			var Tcst = MapToolbar.features['tcurveTab'][pid].Tcst;
			var Tced = MapToolbar.features['tcurveTab'][pid].Tced;

			var h1 = MapToolbar.features['tcurveTab'][pid].h1;
			var h2 = MapToolbar.features['tcurveTab'][pid].h2;

			var TL = MapToolbar.features['tcurveTab'][pid].TL;
			var shift = MapToolbar.features['tcurveTab'][pid].shift;
 	 	
			var delta = MapToolbar.features['tcurveTab'][pid].delta;
			var theta = MapToolbar.features['tcurveTab'][pid].theta;
 
			var deltaS = MapToolbar.features['tcurveTab'][pid].deltaS;
			var deltaC = MapToolbar.features['tcurveTab'][pid].deltaC;
		
			var ld = MapToolbar.features['tcurveTab'][pid].markers.getAt(idx).ld;
		
			var dir = (MapToolbar.features['tcurveTab'][pid].Rc < 0) ? -1 : 1;
			
			if (howtoForm < 0 ) {
				if (platform_length > ld) {
					var l_st = platform_length - ld + TL;
					var p_st = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid).getPosition(), -l_st, h1);

					MapToolbar.addPoint(p_st, MapToolbar.features["lineTab"][line_pid], line_mid);
					var image = new google.maps.MarkerImage('images/form_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).setIcon(image);
					MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid).setIcon(image);

					MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
					MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
					addStation (staName,staID,MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid).getPosition());

				} else {
					if (ld <= Ls) { // on 1st spiral curve start/end
						var lenOnSpC = ld - platform_length;
						
						var allPoints = MapToolbar.features['tcurveTab'][pid].getPath().getArray();
						var arrD = new Array();
						var sIdx = null;
						var lastD; 
											
						for (var t = 0; t <= allPoints.length; t++) { 
							arrD.push(allPoints[t]);
							var curL = google.maps.geometry.spherical.computeLength(arrD);
							if (curL <= lenOnSpC) {
								sIdx = t;
								lastD = curL;
								//console.log(t + ':' + curL + '=' + lenOnSpC);
							} else {
								//console.log(t + ':' + curL + '=' + lenOnSpC);
								if (lenOnSpC - lastD > curL - lenOnSpC) {
									sIdx = t;
									lastD = curL;													
								}
								break;
							}
						}
											
						var e1 = allPoints[sIdx];

						MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][pid], sIdx);
						
						var image = new google.maps.MarkerImage('images/form_icon.png',
								new google.maps.Size(6, 6),
								new google.maps.Point(0, 0),
								new google.maps.Point(3, 3));
						var cuvNewIdx = MapToolbar.features["tcurveTab"][pid].markers.getLength()-1;
						MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).setIcon(image);
						MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).setIcon(image);
						
						MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
						MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
						addStation (staName,staID,MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).getPosition());
											
						//alert('AAA.');

					} else if (ld > Ls && ld < (Ls + Lc)) { // on circular curve start
	
						if (ld - platform_length > Ls) {
							//form on circular curve only start/end
							var iB = google.maps.geometry.spherical.computeHeading(Cc,Tcst);
		
							var l_st = ld - Ls- platform_length;
							var a_deg = (180 * l_st) / (Math.PI * Rc);

							if (dir  > 0) {
								var ha = (iB + a_deg <= 180) ? iB + a_deg : iB + a_deg - 360;
								var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
								var addAt =  curveAddAt(pid,e1);	
	
								MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][pid], addAt);
	
							} else {
								var ha = (iB - a_deg <= -180) ? iB - a_deg + 360 : iB - a_deg ;
								var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
								var addAt =  curveAddAt(pid,e1);	
	
								MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][pid], addAt);
	
							}

							var image = new google.maps.MarkerImage('images/form_icon.png',
								new google.maps.Size(6, 6),
								new google.maps.Point(0, 0),
								new google.maps.Point(3, 3));
							var cuvNewIdx = MapToolbar.features["tcurveTab"][pid].markers.getLength()-1;
							MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).setIcon(image);
							MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).setIcon(image);	

							MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
							MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
							addStation (staName,staID,MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).getPosition());
		
						} else {
							//form cross between circular and spiral curve start on curve/end on 1 st spiral
							var lenOnSpC = ld - platform_length;

							var allPoints = MapToolbar.features['tcurveTab'][pid].getPath().getArray();
							var arrD = new Array();
							var sIdx = null;
							var lastD; 
											
							for (var t = 0; t <= allPoints.length; t++) { 
								arrD.push(allPoints[t]);
								var curL = google.maps.geometry.spherical.computeLength(arrD);
								if (curL <= lenOnSpC) {
									sIdx = t;
									lastD = curL;
									//console.log(t + ':' + curL + '=' + lenOnSpC);
								} else {
									//console.log(t + ':' + curL + '=' + lenOnSpC);
									if (lenOnSpC - lastD > curL - lenOnSpC) {
										sIdx = t;
										lastD = curL;													
									}
									break;
								}
							}
											
							var e1 = allPoints[sIdx];
							MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][pid], sIdx);
						
							var image = new google.maps.MarkerImage('images/form_icon.png',
								new google.maps.Size(6, 6),
								new google.maps.Point(0, 0),
								new google.maps.Point(3, 3));
							var cuvNewIdx = MapToolbar.features["tcurveTab"][pid].markers.getLength()-1;
							MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).setIcon(image);
							MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).setIcon(image);
							
							MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
							MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
							addStation (staName,staID,MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).getPosition());
							//alert('BBB.');
						}
	
					} else { // start on 2nd spiral curve
						var lenOnSpC = ld - platform_length;
	
						if (lenOnSpC < Lc + Ls) { 
							if (lenOnSpC < Ls) {  //end on 1 spiral
														
								var allPoints = MapToolbar.features['tcurveTab'][pid].getPath().getArray();
								var arrD = new Array();
								var sIdx = null;
								var lastD; 
											
								for (var t = 0; t <= allPoints.length; t++) { 
									arrD.push(allPoints[t]);
									var curL = google.maps.geometry.spherical.computeLength(arrD);
									if (curL <= lenOnSpC) {
										sIdx = t;
										lastD = curL;
										//console.log(t + ':' + curL + '=' + lenOnSpC);
									} else {
										//console.log(t + ':' + curL + '=' + lenOnSpC);
										if (lenOnSpC - lastD > curL - lenOnSpC) {
											sIdx = t;
											lastD = curL;													
										}
										break;
									}
								}
											
								var e1 = allPoints[sIdx];

								MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][pid], sIdx);
						
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								var cuvNewIdx = MapToolbar.features["tcurveTab"][pid].markers.getLength()-1;
								MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).setIcon(image);
								MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).setIcon(image);

								MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
								MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
								addStation (staName,staID,MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).getPosition());
								//alert('CCCC.');
								
							} else {
								//end on circular curve
								var iB = google.maps.geometry.spherical.computeHeading(Cc,Tcst);
		
								var l_st = lenOnSpC - Ls;
								var a_deg = (180 * l_st) / (Math.PI * Rc);

								if (dir  > 0) {
									var ha = (iB + a_deg <= 180) ? iB + a_deg : iB + a_deg - 360;
									var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
									var addAt =  curveAddAt(pid,e1);	
	
									MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][pid], addAt);
	
								} else {
									var ha = (iB - a_deg <= -180) ? iB - a_deg + 360 : iB - a_deg ;
									var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
									var addAt =  curveAddAt(pid,e1);	
	
									MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][pid], addAt);
								}

								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								var cuvNewIdx = MapToolbar.features["tcurveTab"][pid].markers.getLength()-1;
								MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).setIcon(image);
								MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).setIcon(image);	
								
								MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
								MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
								addStation (staName,staID,MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).getPosition());
							}
	
						} else {
							// start & end at 2 spiral
								var allPoints = MapToolbar.features['tcurveTab'][pid].getPath().getArray();
								var arrD = new Array();
								var sIdx = null;
								var lastD; 
											
								for (var t = 0; t <= allPoints.length; t++) { 
									arrD.push(allPoints[t]);
									var curL = google.maps.geometry.spherical.computeLength(arrD);
									if (curL <= lenOnSpC) {
										sIdx = t;
										lastD = curL;
										//console.log(t + ':' + curL + '=' + lenOnSpC);
									} else {
										//console.log(t + ':' + curL + '=' + lenOnSpC);
										if (lenOnSpC - lastD > curL - lenOnSpC) {
											sIdx = t;
											lastD = curL;													
										}
										break;
									}
								}
											
								var e1 = allPoints[sIdx];

								MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][pid], sIdx);
						
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								var cuvNewIdx = MapToolbar.features["tcurveTab"][pid].markers.getLength()-1;
								MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).setIcon(image);
								MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).setIcon(image);	
								
								MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
								MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
								addStation (staName,staID,MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).getPosition());
							//alert('DDDD.');
						}
					}
				}
			
			} else {
		
				if (platform_length > (Lt -ld)) {
					var l_ed = platform_length - (Lc + 2*Ls -ld) + TL;
					var p_ed = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid).getPosition(), l_ed, h2);

					MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][line_pid], line_mid+1);
					var image = new google.maps.MarkerImage('images/form_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).setIcon(image);
					MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid+1).setIcon(image);	
					
					MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
					MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid+1).kdata.form = stopS + ',' + stopO;;
					addStation (staName,staID,MapToolbar.features["lineTab"][line_pid].markers.getAt(line_mid+1).getPosition());

				} else {
					if (ld + platform_length < Ls) {
						//start & end on 1st spiral curve
						var lenOnSpC = ld + platform_length;
						
						var allPoints = MapToolbar.features['tcurveTab'][pid].getPath().getArray();
						var arrD = new Array();
						var sIdx = null;
						var lastD; 
											
						for (var t = 0; t <= allPoints.length; t++) { 
							arrD.push(allPoints[t]);
							var curL = google.maps.geometry.spherical.computeLength(arrD);
							if (curL <= lenOnSpC) {
								sIdx = t;
								lastD = curL;
								//console.log(t + ':' + curL + '=' + lenOnSpC);
							} else {
								//console.log(t + ':' + curL + '=' + lenOnSpC);
								if (lenOnSpC - lastD > curL - lenOnSpC) {
									sIdx = t;
									lastD = curL;													
								}
								break;
							}
						}
											
						var e1 = allPoints[sIdx];

						MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][pid], sIdx);
						
						var image = new google.maps.MarkerImage('images/form_icon.png',
								new google.maps.Size(6, 6),
								new google.maps.Point(0, 0),
								new google.maps.Point(3, 3));
						var cuvNewIdx = MapToolbar.features["tcurveTab"][pid].markers.getLength()-1;
						MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).setIcon(image);
						MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).setIcon(image);
						
						MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
						MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).kdata.form = stopS + ',' + stopO;;
						addStation (staName,staID,MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).getPosition());

						//alert('EEEE.');
	
					} else if (ld + platform_length <= Ls + Lc) {
						
						var iB = google.maps.geometry.spherical.computeHeading(Cc,Tcst);
						var l_st = ld - Ls + platform_length;
						var a_deg = (180 * l_st) / (Math.PI * Rc);

						if (dir  > 0) {
							var ha = (iB + a_deg <= 180) ? iB + a_deg : iB + a_deg - 360;
							var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
							var addAt =  curveAddAt(pid,e1);	
							MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][pid], addAt);
	
						} else {
							var ha = (iB - a_deg <= -180) ? iB - a_deg + 360 : iB - a_deg ;
							var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
							var addAt =  curveAddAt(pid,e1);	
							MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][pid], addAt);
	
						}

						var image = new google.maps.MarkerImage('images/form_icon.png',
							new google.maps.Size(6, 6),
							new google.maps.Point(0, 0),
							new google.maps.Point(3, 3));
						var cuvNewIdx = MapToolbar.features["tcurveTab"][pid].markers.getLength()-1;
						MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).setIcon(image);
						MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).setIcon(image);	

						MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
						MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).kdata.form = stopS + ',' + stopO;;
						addStation (staName,staID,MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).getPosition());
		
					} else if (ld + platform_length < Lt) {
						//end on 2nd spiral curve
						var lenOnSpC = ld + platform_length;
						
						var allPoints = MapToolbar.features['tcurveTab'][pid].getPath().getArray();
						var arrD = new Array();
						var sIdx = null;
						var lastD; 
											
						for (var t = 0; t <= allPoints.length; t++) { 
							arrD.push(allPoints[t]);
							var curL = google.maps.geometry.spherical.computeLength(arrD);
							if (curL <= lenOnSpC) {
								sIdx = t;
								lastD = curL;
								//console.log(t + ':' + curL + '=' + lenOnSpC);
							} else {
								//console.log(t + ':' + curL + '=' + lenOnSpC);
								if (lenOnSpC - lastD > curL - lenOnSpC) {
									sIdx = t;
									lastD = curL;													
								}
								break;
							}
						}
											
						var e1 = allPoints[sIdx];

						MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][pid], sIdx);
						
						var image = new google.maps.MarkerImage('images/form_icon.png',
								new google.maps.Size(6, 6),
								new google.maps.Point(0, 0),
								new google.maps.Point(3, 3));
						var cuvNewIdx = MapToolbar.features["tcurveTab"][pid].markers.getLength()-1;
						MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).setIcon(image);
						MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).setIcon(image);

						MapToolbar.features["tcurveTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
						MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).kdata.form = stopS + ',' + stopO;;
						addStation (staName,staID,MapToolbar.features["tcurveTab"][pid].markers.getAt(cuvNewIdx).getPosition());
						//alert('FFFF.');

					}
				}
			}
		}

	} else {
		var sidecurve = false;
	
		if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(idx-1) != 'undefined') {
			if (MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).bdata.tcurve != '' || MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).bdata.curve != '') { sidecurve = true; }
		}
		if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(idx+1) != 'undefined') {
			if (MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).bdata.tcurve != '' || MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).bdata.curve != '') { sidecurve = true; }
		}
	
		if (!sidecurve) {
			if (howtoForm < 0 ) {
				if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(idx-1) != 'undefined') {
					var hh = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
					var p_st = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(), -platform_length, hh);

					MapToolbar.addPoint(p_st, MapToolbar.features["lineTab"][pid], idx);
					var image = new google.maps.MarkerImage('images/form_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
					MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);
					
					MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
					MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
					addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition());
				} else {
					alert('unable to create platform');
				}

			} else {
				if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(idx+1) != 'undefined') {
					var hh = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition());
					var p_st = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(), platform_length, hh);

					MapToolbar.addPoint(p_st, MapToolbar.features["lineTab"][pid], idx+1);
					var image = new google.maps.MarkerImage('images/form_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
					MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);

					MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
					MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
					addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition());

				} else {
					alert('unable to create platform');
				}
			}
			
		} else {
		
			if (howtoForm < 0 ) {
				
				if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(idx-1) != 'undefined') {
					if (MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).bdata.tcurve != '') {
						var tcv_pid = MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).bdata.tcurve;
						var pform_x0 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition()) - platform_length; //getTrackDistanceFromStart(pid,idx).line - platform_length;
						var cuvEdX = MapToolbar.features['tcurveTab'][tcv_pid].TL;
	
						if (pform_x0 >= cuvEdX) {
							var p_st = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(), -platform_length, MapToolbar.features['tcurveTab'][tcv_pid].h2);
							MapToolbar.addPoint(p_st, MapToolbar.features["lineTab"][pid], idx);
							var image = new google.maps.MarkerImage('images/form_icon.png',
								new google.maps.Size(6, 6),
								new google.maps.Point(0, 0),
								new google.maps.Point(3, 3));
							MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
							MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);
							
							MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
							MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
							addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
							
						} else {
							//overlapped with previous tcurve
							
							var tctype = MapToolbar.features['tcurveTab'][tcv_pid].tctype;
							var Rc = Math.abs(MapToolbar.features['tcurveTab'][tcv_pid].Rc);
							var Ls = MapToolbar.features['tcurveTab'][tcv_pid].Ls;
	 						var Lc = MapToolbar.features['tcurveTab'][tcv_pid].Lc;
							var Lt = Lc + 2*Ls;
 							var K = MapToolbar.features['tcurveTab'][tcv_pid].K;
							var TotalX = MapToolbar.features['tcurveTab'][tcv_pid].TotalX;
							var TotalY = MapToolbar.features['tcurveTab'][tcv_pid].TotalY;
 							var Cc = MapToolbar.features['tcurveTab'][tcv_pid].Cc;
 							var Ttst = MapToolbar.features['tcurveTab'][tcv_pid].Ttst;
 							var Tted = MapToolbar.features['tcurveTab'][tcv_pid].Tted;
 							var Tcst = MapToolbar.features['tcurveTab'][tcv_pid].Tcst;
 							var Tced = MapToolbar.features['tcurveTab'][tcv_pid].Tced;

 							var h1 = MapToolbar.features['tcurveTab'][tcv_pid].h1;
 							var h2 = MapToolbar.features['tcurveTab'][tcv_pid].h2;

 							var TL = MapToolbar.features['tcurveTab'][tcv_pid].TL;
 							var shift = MapToolbar.features['tcurveTab'][tcv_pid].shift;
 	 	
 							var delta = MapToolbar.features['tcurveTab'][tcv_pid].delta;
 							var theta = MapToolbar.features['tcurveTab'][tcv_pid].theta;
 
 							var deltaS = MapToolbar.features['tcurveTab'][tcv_pid].deltaS;
 							var deltaC = MapToolbar.features['tcurveTab'][tcv_pid].deltaC;
		 
							var dir = (MapToolbar.features['tcurveTab'][tcv_pid].Rc < 0) ? -1 : 1;
							
							var lenOnLine = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(),Tted);
							var lenOnC = platform_length - lenOnLine;

							if (lenOnC >= Lt) {
							
								if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(idx-2) != 'undefined') {
									if (MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).bdata.tcurve != '') {
										var tcv_pid2 = MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).bdata.tcurve;
										var xLen = lenOnC - Lt; // baki lebihan panjang
										var xLD = MapToolbar.features['tcurveTab'][tcv_pid].TL + xLen;
										var cuvEdx2 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition(),MapToolbar.features['tcurveTab'][tcv_pid2].Ttst);
	
										if (xLD <= cuvEdx2) {
											//2do
											var p_ed = google.maps.geometry.spherical.computeOffset(Ttst, -xLen, h1);

											MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx-1);
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);
											
											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition());
		
										} else {
											alert('platform cross multi curve is not supported, please create platform manually');
										}
	

									} else if (MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).bdata.curve != '') {
										var cv_pid2 = MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).bdata.curve;
										var xLen = lenOnC - Lt; // baki lebihan panjang
										var xLD = MapToolbar.features['tcurveTab'][tcv_pid].TL + xLen;
										var cuvEdx2 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition(),MapToolbar.features['curveTab'][cv_pid2].st);
	
										if (xLD <= cuvEdx2) {

											var p_ed = google.maps.geometry.spherical.computeOffset(Ttst, -xLen, h1);
											MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx-1);
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);
											
											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition());
		
										} else {
											alert('platform cross multi curve is not supported, please create platform manually');
										}
	
									} else {
										var nextLen = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).getPosition());;
										var xLen = lenOnC - Lt; // baki lebihan panjang
										var xLD = MapToolbar.features['tcurveTab'][tcv_pid].TL + xLen;
	
										if (xLD <= nextLen) {
											var p_ed = google.maps.geometry.spherical.computeOffset(Ttst, -xLen, h1);
											MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx-1);
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);
											
											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition());
		
										} else {
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);
											
											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition());
										}
									}
			
								} else {
									var nextLen = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).getPosition());;
									var xLen = lenOnC - Lt; // baki lebihan panjang
									var xLD = MapToolbar.features['tcurveTab'][tcv_pid].TL + xLen;
	
									if (xLD < nextLen) {
										var p_ed = google.maps.geometry.spherical.computeOffset(Ttst, -xLen, h1);

										MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx-1);
										var image = new google.maps.MarkerImage('images/form_icon.png',
											new google.maps.Size(6, 6),
											new google.maps.Point(0, 0),
											new google.maps.Point(3, 3));
										MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).setIcon(image);
										MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);
										
										MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
										MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
										addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition());
		
									} else {
										var image = new google.maps.MarkerImage('images/form_icon.png',
											new google.maps.Size(6, 6),
											new google.maps.Point(0, 0),
											new google.maps.Point(3, 3));
										MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
										MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).setIcon(image);
										
										MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
										MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
										addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition());
									}
								}
								
							} else if (Lt - lenOnC < Ls) {
								//end on 2nd spiral of prev trans curve
								var allPoints = MapToolbar.features['tcurveTab'][tcv_pid].getPath().getArray();
								var arrD = new Array();
								var sIdx = null;
								var lastD; 
								var lenOnSpC = Lt - lenOnC;
										
								for (var t = 0; t <= allPoints.length; t++) { 
									arrD.push(allPoints[t]);
									var curL = google.maps.geometry.spherical.computeLength(arrD);
									if (curL <= lenOnSpC) {
										sIdx = t;
										lastD = curL;
										//console.log(t + ':' + curL + '=' + lenOnSpC);
									} else {
										//console.log(t + ':' + curL + '=' + lenOnSpC);
										if (lenOnSpC - lastD > curL - lenOnSpC) {
											sIdx = t;
											lastD = curL;													
										}
										break;
									}
								}
											
								var e1 = allPoints[sIdx];

								MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][tcv_pid], sIdx);
						
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								var cuvNewIdx = MapToolbar.features["tcurveTab"][tcv_pid].markers.getLength()-1;
								MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
								MapToolbar.features["tcurveTab"][tcv_pid].markers.getAt(cuvNewIdx).setIcon(image);							
							
								MapToolbar.features["tcurveTab"][tcv_pid].markers.getAt(cuvNewIdx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
								MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
								addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
								//alert('GGGG.');
			
							} else if (Lt - lenOnC <= Ls + Lc) {
								var lenOnCC = lenOnC - Ls;
								var l_st = Lc - lenOnCC;
								var iB = google.maps.geometry.spherical.computeHeading(Cc,Tcst);
								var a_deg = (180 * l_st) / (Math.PI * Rc);

								if (dir  > 0) {
									var ha = (iB + a_deg <= 180) ? iB + a_deg : iB + a_deg - 360;
									var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
									var addAt =  curveAddAt(tcv_pid,e1);	
									MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][tcv_pid], addAt);
	
								} else {
									var ha = (iB - a_deg <= -180) ? iB - a_deg + 360 : iB - a_deg ;
									var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
									var addAt =  curveAddAt(tcv_pid,e1);		
									MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][tcv_pid], addAt);
	
								}

								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								var cuvNewIdx = MapToolbar.features["tcurveTab"][tcv_pid].markers.getLength()-1;
								MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
								MapToolbar.features["tcurveTab"][tcv_pid].markers.getAt(cuvNewIdx).setIcon(image);
								
								MapToolbar.features["tcurveTab"][tcv_pid].markers.getAt(cuvNewIdx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
								MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
								addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());

							} else {
								//end on 1st spiral of prev trans curve
								var allPoints = MapToolbar.features['tcurveTab'][tcv_pid].getPath().getArray();
								var arrD = new Array();
								var sIdx = null;
								var lastD; 
								var lenOnSpC = Lt - lenOnC;
								
								for (var t = 0; t <= allPoints.length; t++) { 
									arrD.push(allPoints[t]);
									var curL = google.maps.geometry.spherical.computeLength(arrD);
									if (curL <= lenOnSpC) {
										sIdx = t;
										lastD = curL;
										//console.log(t + ':' + curL + '=' + lenOnSpC);
									} else {
										//console.log(t + ':' + curL + '=' + lenOnSpC);
										if (lenOnSpC - lastD > curL - lenOnSpC) {
											sIdx = t;
											lastD = curL;													
										}
										break;
									}
								}
											
								var e1 = allPoints[sIdx];

								MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][tcv_pid], sIdx);
						
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								var cuvNewIdx = MapToolbar.features["tcurveTab"][tcv_pid].markers.getLength()-1;
								MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
								MapToolbar.features["tcurveTab"][tcv_pid].markers.getAt(cuvNewIdx).setIcon(image);							

								MapToolbar.features["tcurveTab"][tcv_pid].markers.getAt(cuvNewIdx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
								MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
								addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
								//alert('HHHH.');
			
							}
						}	

					} else if (MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).bdata.curve != '') {
						var cuv_pid = MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).bdata.curve;
						var pform_x0 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition()) - platform_length;
						var cuvEdX = MapToolbar.features['curveTab'][cuv_pid].Lt;
	
						if (pform_x0 >= cuvEdX) {
							var p_ed = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(), -platform_length, MapToolbar.features['curveTab'][cuv_pid].h2);
							MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx);
							var image = new google.maps.MarkerImage('images/form_icon.png',
								new google.maps.Size(6, 6),
								new google.maps.Point(0, 0),
								new google.maps.Point(3, 3));
							MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
							MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);	

							MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
							MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
							addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
	
						} else {
		
							var T = MapToolbar.features['curveTab'][cuv_pid].Lt;
							var Lc = MapToolbar.features['curveTab'][cuv_pid].Lc;							
							var Rc = Math.abs(MapToolbar.features['curveTab'][cuv_pid].Rc);
							var Cc = MapToolbar.features['curveTab'][cuv_pid].Cc;
							var st = MapToolbar.features['curveTab'][cuv_pid].st;
							var ed = MapToolbar.features['curveTab'][cuv_pid].ed;
							var h1 = MapToolbar.features['curveTab'][cuv_pid].h1;
							var h2 = MapToolbar.features['curveTab'][cuv_pid].h2;
							var dir = (MapToolbar.features['curveTab'][cuv_pid].Rc < 0) ? -1 : 1;
							var fB = google.maps.geometry.spherical.computeHeading(Cc,ed);
							var lenOnLine = google.maps.geometry.spherical.computeDistanceBetween(ed,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
							var lenOnCuv = platform_length - lenOnLine ;
		
							if (lenOnCuv <= Lc) {
								var a_deg = (180 * lenOnCuv) / (Math.PI * Rc);

								if (dir  > 0) {
									var ha = (fB - a_deg >= -180) ? fB - a_deg : fB - a_deg + 360;
									var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
									var addAt =  curveAddAt(cuv_pid,e1);	
									MapToolbar.addPoint(e1, MapToolbar.features['curveTab'][cuv_pid], addAt);
	
								} else {
									var ha = (fB + a_deg > 180) ? fB + a_deg - 360 : fB + a_deg ;
									var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
									var addAt =  curveAddAt(cuv_pid,e1);	
									MapToolbar.addPoint(e1, MapToolbar.features['curveTab'][cuv_pid], addAt);
	
								}	
			
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								var cuvNewIdx = MapToolbar.features["curveTab"][cuv_pid].markers.getLength()-1;
								MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
								MapToolbar.features["curveTab"][cuv_pid].markers.getAt(cuvNewIdx).setIcon(image);
								
								MapToolbar.features["curveTab"][cuv_pid].markers.getAt(cuvNewIdx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
								MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = stopS + ',' + stopO;;
								addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
			
							} else {
								if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(idx-2) != 'undefined') {
									if (MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).bdata.tcurve != '') {
										var tcv_pid2 = MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).bdata.tcurve;
										var xLen = lenOnCuv - Lc; // baki lebihan panjang
										var xLD = MapToolbar.features['curveTab'][cuv_pid].Lt + xLen;
										var cuvStx2 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition(),MapToolbar.features['tcurveTab'][tcv_pid2].Tted);
	
										if (xLD <= cuvStx2) {
										//2do
											var p_ed = google.maps.geometry.spherical.computeOffset(st, -xLen, h1);
											MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx-1);
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);

											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition());
		
										} else {
											alert('platform cross multi curve is not supported, please create platform manually');
										}
	
									} else if (MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).bdata.curve != '') {
										var cuv_pid2 = MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).bdata.curve;
										var xLen = lenOnCuv - Lc; // baki lebihan panjang
										var xLD = MapToolbar.features['curveTab'][cuv_pid].Lt + xLen;
										var cuvStx2 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition(),MapToolbar.features['curveTab'][cuv_pid2].st);
	
										if (xLD <= cuvStx2) {
											var p_ed = google.maps.geometry.spherical.computeOffset(st, -xLen, h1);
											MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx-1);
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);

											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition());
		
										} else {
											alert('platform cross multi curve is not supported, please create platform manually');
										}
									} else {
										var xLen = lenOnCuv - Lc; // baki lebihan panjang
										var xLD = MapToolbar.features['curveTab'][cuv_pid].Lt + xLen;
										var LEdx2 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).getPosition());
	
										if (xLD <= LEdx2) {
											var p_ed = google.maps.geometry.spherical.computeOffset(st, -xLen, h1);
											MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx-1);
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);
											
											MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition());
		
										} else {
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);

											MapToolbar.features["lineTab"][pid].markers.getAt(idx-2).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition());
										}
	
									}
								}			
							}
		
						}
					} else {
						if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(idx-1) != 'undefined') {
							var hh = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
							var p_st = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(), -platform_length, hh);

							MapToolbar.addPoint(p_st, MapToolbar.features["lineTab"][pid], idx);
							var image = new google.maps.MarkerImage('images/form_icon.png',
								new google.maps.Size(6, 6),
								new google.maps.Point(0, 0),
								new google.maps.Point(3, 3));
							MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
							MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);
							
							MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
							MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
							addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
							
						} else {
							alert('unable to create platform')
						}

					}
				}
		
			} else {
			
				if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(idx+1) != 'undefined') {
					if (MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).bdata.tcurve != '') {
						var tcv_pid = MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).bdata.tcurve;
						var cuvStX = MapToolbar.features['tcurveTab'][tcv_pid].TL;
						var pform_x0 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition()) - platform_length;
	
						if (pform_x0 >= cuvStX) {
							var p_ed = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(), platform_length, MapToolbar.features['tcurveTab'][tcv_pid].h1);
							MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx+1);
							var image = new google.maps.MarkerImage('images/form_icon.png',
								new google.maps.Size(6, 6),
								new google.maps.Point(0, 0),
								new google.maps.Point(3, 3));
							MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
							MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);

							MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
							MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
							addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
							
						} else {
							//overlapped with next tcurve
							var tctype = MapToolbar.features['tcurveTab'][tcv_pid].tctype;
							var Rc = Math.abs(MapToolbar.features['tcurveTab'][tcv_pid].Rc);
							var Ls = MapToolbar.features['tcurveTab'][tcv_pid].Ls;
	 						var Lc = MapToolbar.features['tcurveTab'][tcv_pid].Lc;
							var Lt = Lc + 2*Ls;
 							var K = MapToolbar.features['tcurveTab'][tcv_pid].K;
							var TotalX = MapToolbar.features['tcurveTab'][tcv_pid].TotalX;
							var TotalY = MapToolbar.features['tcurveTab'][tcv_pid].TotalY;
 							var Cc = MapToolbar.features['tcurveTab'][tcv_pid].Cc;
 							var Ttst = MapToolbar.features['tcurveTab'][tcv_pid].Ttst;
 							var Tted = MapToolbar.features['tcurveTab'][tcv_pid].Tted;
 							var Tcst = MapToolbar.features['tcurveTab'][tcv_pid].Tcst;
 							var Tced = MapToolbar.features['tcurveTab'][tcv_pid].Tced;
 							var h1 = MapToolbar.features['tcurveTab'][tcv_pid].h1;
 							var h2 = MapToolbar.features['tcurveTab'][tcv_pid].h2;

 							var TL = MapToolbar.features['tcurveTab'][tcv_pid].TL;
 							var shift = MapToolbar.features['tcurveTab'][tcv_pid].shift;
 	 	
 							var delta = MapToolbar.features['tcurveTab'][tcv_pid].delta;
 							var theta = MapToolbar.features['tcurveTab'][tcv_pid].theta;
 
 							var deltaS = MapToolbar.features['tcurveTab'][tcv_pid].deltaS;
 							var deltaC = MapToolbar.features['tcurveTab'][tcv_pid].deltaC;
		 
							var dir = (MapToolbar.features['tcurveTab'][tcv_pid].Rc < 0) ? -1 : 1;

							var lenOnLine = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(),Ttst);
							var lenOnC = platform_length - lenOnLine;
		
							if (lenOnC > Lt) {
								if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(idx+2) != 'undefined') {
									if (MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).bdata.tcurve != '') {
										var tcv_pid2 = MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).bdata.tcurve;
										var xLen = lenOnC - Lt; // baki lebihan panjang
										var xLD = MapToolbar.features['tcurveTab'][tcv_pid].TL + xLen;
										var cuvEdx2 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition(),MapToolbar.features['tcurveTab'][tcv_pid2].Ttst);
	
										if (xLD <= cuvEdx2) {
										//2do
											var p_ed = google.maps.geometry.spherical.computeOffset(Tted, xLen, MapToolbar.features['tcurveTab'][tcv_pid].h2);
											MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx+2);
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).setIcon(image);

											MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
		
										} else {
											alert('platform cross multi curve is not supported, please create platform manually');
										}

									} else if (MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).bdata.curve != '') {
										var cv_pid2 = MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).bdata.curve;
										var xLen = lenOnC - Lt; // baki lebihan panjang
										var xLD = MapToolbar.features['tcurveTab'][tcv_pid].TL + xLen;
										var cuvEdx2 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition(),MapToolbar.features['curveTab'][cv_pid2].st);
	
										if (xLD <= cuvEdx2) {

											var p_ed = google.maps.geometry.spherical.computeOffset(Tted, xLen, MapToolbar.features['tcurveTab'][tcv_pid].h2);
											MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx+2);
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).setIcon(image);

											MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
		
										} else {
											alert('platform cross multi curve is not supported, please create platform manually');
										}
	
									} else {
										var nextLen = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).getPosition());;
										var xLen = lenOnC - Lt; // baki lebihan panjang
										var xLD = MapToolbar.features['tcurveTab'][tcv_pid].TL + xLen;
	
										if (xLD <= nextLen) {
											var p_ed = google.maps.geometry.spherical.computeOffset(Tted, xLen, MapToolbar.features['tcurveTab'][tcv_pid].h2);

											MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx+2);
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).setIcon(image);
											
											MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
		
										} else {
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).setIcon(image);
											
											MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
										}
									}
			
								} else {
									var nextLen = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).getPosition());;
									var xLen = lenOnC - Lt; // baki lebihan panjang
									var xLD = MapToolbar.features['tcurveTab'][tcv_pid].TL + xLen;
	
									if (xLD < nextLen) {
										var p_ed = google.maps.geometry.spherical.computeOffset(Tted, xLen, MapToolbar.features['tcurveTab'][tcv_pid].h2);
										MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx+2);
										var image = new google.maps.MarkerImage('images/form_icon.png',
											new google.maps.Size(6, 6),
											new google.maps.Point(0, 0),
											new google.maps.Point(3, 3));
										MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
										MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).setIcon(image);
										
										MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
										MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).kdata.form = stopS + ',' + stopO;;
										addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
		
									} else {
										var image = new google.maps.MarkerImage('images/form_icon.png',
											new google.maps.Size(6, 6),
											new google.maps.Point(0, 0),
											new google.maps.Point(3, 3));
										MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
										MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).setIcon(image);
										
										MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
										MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).kdata.form = stopS + ',' + stopO;;
										addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
									}
			
								}
		
							} else if (lenOnC < Ls) {

								//end on 1st spiral of next trans curve
								var allPoints = MapToolbar.features['tcurveTab'][tcv_pid].getPath().getArray();
								var arrD = new Array();
								var sIdx = null;
								var lastD; 
								//var lenOnSpC = Lt - lenOnC;
								
								for (var t = 0; t <= allPoints.length; t++) { 
									arrD.push(allPoints[t]);
									var curL = google.maps.geometry.spherical.computeLength(arrD);
									if (curL <= lenOnC) {
										sIdx = t;
										lastD = curL;
										//console.log(t + ':' + curL + '=' + lenOnC);
									} else {
										//console.log(t + ':' + curL + '=' + lenOnC);
										if (lenOnC - lastD > curL - lenOnC) {
											sIdx = t;
											lastD = curL;													
										}
										break;
									}
								}
											
								var e1 = allPoints[sIdx];

								MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][tcv_pid], sIdx);
						
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								var cuvNewIdx = MapToolbar.features["tcurveTab"][tcv_pid].markers.getLength()-1;
								MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
								MapToolbar.features["tcurveTab"][tcv_pid].markers.getAt(cuvNewIdx).setIcon(image);

								MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
								MapToolbar.features["tcurveTab"][tcv_pid].markers.getAt(cuvNewIdx).kdata.form = stopS + ',' + stopO;;
								addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
							
								///alert('IIII.');
			
							} else if (lenOnC <= Ls + Lc) {
								var l_ed = lenOnC - Ls;
								var iB = google.maps.geometry.spherical.computeHeading(Cc,Tcst);
								var a_deg = (180 * l_ed) / (Math.PI * Rc);

								if (dir  > 0) {
									var ha = (iB + a_deg <= 180) ? iB + a_deg : iB + a_deg - 360;
									var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
									var addAt =  curveAddAt(tcv_pid,e1);	
									MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][tcv_pid], addAt);
	
								} else {
									var ha = (iB - a_deg <= -180) ? iB - a_deg + 360 : iB - a_deg ;
									var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
									var addAt =  curveAddAt(tcv_pid,e1);	
									MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][tcv_pid], addAt);
	
								}

								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								var cuvNewIdx = MapToolbar.features["tcurveTab"][tcv_pid].markers.getLength()-1;
								MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
								MapToolbar.features["tcurveTab"][tcv_pid].markers.getAt(cuvNewIdx).setIcon(image);	

								MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
								MapToolbar.features["tcurveTab"][tcv_pid].markers.getAt(cuvNewIdx).kdata.form = stopS + ',' + stopO;;
								addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
			
							} else if (lenOnC <= Lt) {

								var allPoints = MapToolbar.features['tcurveTab'][tcv_pid].getPath().getArray();
								var arrD = new Array();
								var sIdx = null;
								var lastD; 
								//var lenOnSpC = Lt - lenOnC;
								
								for (var t = 0; t <= allPoints.length; t++) { 
									arrD.push(allPoints[t]);
									var curL = google.maps.geometry.spherical.computeLength(arrD);
									if (curL <= lenOnC) {
										sIdx = t;
										lastD = curL;
										//console.log(t + ':' + curL + '=' + lenOnC);
									} else {
										//console.log(t + ':' + curL + '=' + lenOnC);
										if (lenOnC - lastD > curL - lenOnC) {
											sIdx = t;
											lastD = curL;													
										}
										break;
									}
								}
											
								var e1 = allPoints[sIdx];

								MapToolbar.addPoint(e1, MapToolbar.features['tcurveTab'][tcv_pid], sIdx);
						
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								var cuvNewIdx = MapToolbar.features["tcurveTab"][tcv_pid].markers.getLength()-1;
								MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
								MapToolbar.features["tcurveTab"][tcv_pid].markers.getAt(cuvNewIdx).setIcon(image);	

								MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
								MapToolbar.features["tcurveTab"][tcv_pid].markers.getAt(cuvNewIdx).kdata.form = stopS + ',' + stopO;;
								
								addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
								//alert('JJJJ.');
			
							} else {
								alert('Sorry, please create platform manually.');
			
							}
						}	

					} else if (MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).bdata.curve != '') {
						var cuv_pid = MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).bdata.curve;
						var pform_x0 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition())-platform_length; //getTrackDistanceFromStart(pid,idx).line + platform_length;
						var cuvStX = MapToolbar.features['curveTab'][cuv_pid].Lt;
	
						if (pform_x0 >= cuvStX) {
							var p_ed = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(), platform_length, MapToolbar.features['curveTab'][cuv_pid].h1);
							MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx+1);
							var image = new google.maps.MarkerImage('images/form_icon.png',
								new google.maps.Size(6, 6),
								new google.maps.Point(0, 0),
								new google.maps.Point(3, 3));
							MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
							MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);

							MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
							MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
							addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
	
						} else {
		
							var T = MapToolbar.features['curveTab'][cuv_pid].Lt;
							var Lc = MapToolbar.features['curveTab'][cuv_pid].Lc;
							var Rc = Math.abs(MapToolbar.features['curveTab'][cuv_pid].Rc);
							var Cc = MapToolbar.features['curveTab'][cuv_pid].Cc;
							var st = MapToolbar.features['curveTab'][cuv_pid].st;
							var ed = MapToolbar.features['curveTab'][cuv_pid].ed;
							var h1 = MapToolbar.features['curveTab'][cuv_pid].h1;
							var h2 = MapToolbar.features['curveTab'][cuv_pid].h2;
							var dir = (MapToolbar.features['curveTab'][cuv_pid].Rc < 0) ? -1 : 1;
							var iB = google.maps.geometry.spherical.computeHeading(Cc,st);		
		
							var lenOnLine = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(),st);
							var lenOnCuv = platform_length - lenOnLine;
		
							if (lenOnCuv <= Lc) {
								var a_deg = (180 * lenOnCuv) / (Math.PI * Rc);

								if (dir  > 0) {
									var ha = (iB + a_deg <= 180) ? iB + a_deg : iB + a_deg - 360;
									var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
									var addAt =  curveAddAt(cuv_pid,e1);	
									MapToolbar.addPoint(e1, MapToolbar.features['curveTab'][cuv_pid], addAt);
	
								} else {
									var ha = (iB - a_deg <= -180) ? iB - a_deg + 360 : iB - a_deg ;
									var e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
									var addAt =  curveAddAt(cuv_pid,e1);	
									MapToolbar.addPoint(e1, MapToolbar.features['curveTab'][cuv_pid], addAt);
	
								}	
			
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								var cuvNewIdx = MapToolbar.features["curveTab"][cuv_pid].markers.getLength()-1;
								MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
								MapToolbar.features["curveTab"][cuv_pid].markers.getAt(cuvNewIdx).setIcon(image);
								
								MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
								MapToolbar.features["curveTab"][cuv_pid].markers.getAt(cuvNewIdx).kdata.form = stopS + ',' + stopO;;
								addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
			
							} else {
								if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(idx+2) != 'undefined') {
									if (MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).bdata.tcurve != '') {
										var tcv_pid2 = MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).bdata.tcurve;
										var xLen = lenOnCuv - Lc; // baki lebihan panjang
										var xLD = MapToolbar.features['curveTab'][cuv_pid].Lt + xLen;
										var cuvEdx2 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition(),MapToolbar.features['tcurveTab'][tcv_pid2].Ttst);
	
										if (xLD <= cuvEdx2) {
										//2do
											var p_ed = google.maps.geometry.spherical.computeOffset(ed, xLen, h2);
											MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx+2);
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).setIcon(image);
											
											MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
		
										} else {
											alert('platform cross multi curve is not supported, please create platform manually');
										}
	
									} else if (MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).bdata.curve != '') {
										var cuv_pid2 = MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).bdata.curve;
										var xLen = lenOnCuv - Lc; // baki lebihan panjang
										var xLD = MapToolbar.features['curveTab'][cuv_pid].Lt + xLen;
										var cuvEdx2 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition(),MapToolbar.features['curveTab'][cuv_pid2].st);
	
										if (xLD <= cuvEdx2) {
											var p_ed = google.maps.geometry.spherical.computeOffset(ed, xLen, h2);
											MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx+2);
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).setIcon(image);
											
											MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
		
										} else {
											alert('platform cross multi curve is not supported, please create platform manually');
										}
									} else {
										var xLen = lenOnCuv - Lc; // baki lebihan panjang
										var xLD = MapToolbar.features['curveTab'][cuv_pid].Lt + xLen;
										var LEdx2 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).getPosition());
	
										if (xLD <= LEdx2) {
											var p_ed = google.maps.geometry.spherical.computeOffset(ed, xLen, h2);

											MapToolbar.addPoint(p_ed, MapToolbar.features["lineTab"][pid], idx+2);
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).setIcon(image);

											MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
		
										} else {
											var image = new google.maps.MarkerImage('images/form_icon.png',
												new google.maps.Size(6, 6),
												new google.maps.Point(0, 0),
												new google.maps.Point(3, 3));
											MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).setIcon(image);
											
											MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
											MapToolbar.features["lineTab"][pid].markers.getAt(idx+2).kdata.form = stopS + ',' + stopO;;
											addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());
										}
	
									}
								}	
							}
						}
						
					} else {
						if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(idx+1) != 'undefined') {
							var hh = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).getPosition());
							var p_st = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition(), platform_length, hh);
							MapToolbar.addPoint(p_st, MapToolbar.features["lineTab"][pid], idx+1);
							var image = new google.maps.MarkerImage('images/form_icon.png',
								new google.maps.Size(6, 6),
								new google.maps.Point(0, 0),
								new google.maps.Point(3, 3));
							MapToolbar.features["lineTab"][pid].markers.getAt(idx).setIcon(image);
							MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).setIcon(image);
							
							MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
							MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;;
							addStation (staName,staID,MapToolbar.features["lineTab"][pid].markers.getAt(idx).getPosition());

						} else {
							alert('unable to create platform')
						}
					}
				}
			}
		}
	}
}


function testForm(pid1,pid2,idx,howtoForm,sL) {

	var offset = 0;
	var side;	
					
	if (howtoForm < 0 ) {
		if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
			if (MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).bdata.tcurve != '') {
				var tcv_pid = MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).bdata.tcurve;
				var pform_x0 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition()) - sL; //getTrackDistanceFromStart(pid,idx).line - sL;
				var cuvEdX = MapToolbar.features['tcurveTab'][tcv_pid].TL;
								
				if (pform_x0 < cuvEdX) {
					alert('sorry! unable to create this type of platform on curve.');
					return { 'overlap' : true,'side': null,'offset': null };
				}

			} else if (MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).bdata.curve != '') {
				var cuv_pid = MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).bdata.curve;
				var pform_x0 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition()) - sL;
				var cuvEdX = MapToolbar.features['curveTab'][cuv_pid].Lt;
	
				if (pform_x0 < cuvEdX) {
					alert('sorry! unable to create this type of platform on curve.');
					return { 'overlap' : true,'side': null,'offset': null };
				}
			}							
		}
						
	} else {
					
		if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
			if (MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).bdata.tcurve != '') {
				var tcv_pid = MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).bdata.tcurve;
				var pform_x0 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition())-sL;
				var cuvStX = MapToolbar.features['tcurveTab'][tcv_pid].TL;
	
				if (pform_x0 < cuvStX) {
					alert('sorry! unable to create this type of platform on curve.');
					return { 'overlap' : true,'side': null,'offset': null };
				}

			} else if (MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).bdata.curve != '') {
				var cuv_pid = MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).bdata.curve;
				var pform_x0 = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition())-sL; //getTrackDistanceFromStart(pid,idx).line + sL;
				var cuvStX = MapToolbar.features['curveTab'][cuv_pid].Lt;
	
				if (pform_x0 < cuvStX) {
					alert('sorry! unable to create this type of platform on curve.');
					return { 'overlap' : true,'side': null,'offset': null };
				}
			}
		}
	}

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
	
	return { 'overlap' : false,'side': side,'offset':offset };
}


