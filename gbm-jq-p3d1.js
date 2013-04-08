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


File : gbm-jq-p3d1.js
purpose : gb maps functions based on jquery
type : prototype system (experimental Or still under R&D)
version : prototype 3
build : 120+
last update : 3 April 2013 11:00am (GMT 8+)

*/
	
	jQuery().ready(function($) {
		
		// Register an event listener to fire when the page finishes loading.
		google.maps.event.addDomListener(window, 'load', initialize);   
		
		$( "input:submit, input:reset, button" ).button();
		$('#sBtnPLineOffset').spinner({step: 0.1, largeStep: 5, min: 3.8 });
		
		$('#pLstSwLength').spinner({step: 25, min: 25 });
		$('#pLedSwLength').spinner({step: 25, min: 25 });

		$('#sBtnRCDesignSpeed').spinner({step: 1, largeStep: 5 });
		$('#sBtnRTCDesignSpeed').spinner({step: 1, largeStep: 5 });
		
		$('#sBtnRCGauge').spinner({step: 1, largeStep: 50, min: 1067, max: 3000 });
		$('#sRTCBtnGauge').spinner({step: 1, largeStep: 50, min: 1067, max: 3000 });
		$('#BV4OBuildsGauge').spinner({step: 1, largeStep: 50, min: 1067, max: 3000 });
		$('#dtsv_trackGauge').spinner({step: 1, largeStep: 50, min: 1067, max: 3000 });
		$('#dbr_trackGauge').spinner({step: 1, largeStep: 50, min: 1067, max: 3000 });
				
		$('#sBtnRCCant').spinner({step: 1, largeStep: 10 });
		$('#sBtnRtCCant').spinner({step: 1, largeStep: 10 });
		
		$('#sBtnCurveRadius').spinner({step: 1, largeStep: 10 });
		$('#sBtnRTCCircularRadius').spinner({step: 1, largeStep: 10 });
		$('#sBtnLargeCircularRadius').spinner({step: 100, largeStep: 500, min: 1000 });
				
		//$('#sBtnXdistance').spinner({step: 0.01, largeStep: 1 });
				
		$('#sBtnpitchRatio').spinner({step: 1, largeStep: 10, min: -60, max: 60 }); // JTS Standard
		$('#sBtnSwLength').spinner({step: 1, largeStep: 5, min: 0 });
		$('#sBtnSwXOffset').spinner({step: 1, largeStep: 5, min: 0 });
		
		$('#setPtHeight').spinner({step: 0.1, largeStep: 5 });
		
		$('#dInsFO_P1').spinner({step: 1, largeStep: 10, min: -60, max: 60 }); // JTS Standard 
		$('#dInsFO_P2').spinner({step: 1, largeStep: 10, min: -60, max: 60 }); // JTS Standard
		$('#dInsFO_Lm').spinner({step: 0.01, largeStep: 5 });
		$('#dInsFO_Lm2').spinner({step: 0.01, largeStep: 5 });
		
		$('#dInsSTC_swL').spinner({step: 25 }); // either +25 increment / -25 decrement
		$('#dpLTs_iToL1').spinner({step: 25, min: 25 }); 
		$('#dpLTs_iToL2').spinner({step: 25, min: 25 }); 
		$('#dpLTs_eToL1').spinner({step: 25, min: 25 }); 
		$('#dpLTs_eToL2').spinner({step: 25, min: 25 }); 
		
		$('#sBtnSpeedLimit').spinner('disable'); 		

		$( "#accordion" ).accordion();
				  					
	  $('#sBtnRCDesignSpeed').change(function() {
			curveCalculator('RC','');
	  });

	  $('#sBtnRCCant').change(function() {
			curveCalculator('RC','');
	  });
	  
	  $('#sBtnRCGauge').change(function() {
			curveCalculator('RC','');
	  });	  		
		
	  $('#sBtnRTCDesignSpeed').change(function() {
			curveCalculator('TC','');
	  });

	  $('#sBtnRtCCant').change(function() {
			curveCalculator('TC','');
	  });
	  
	  $('#sRTCBtnGauge').change(function() {
			curveCalculator('TC','');
	  });	

	  $('#sBtnRTCCircularRadius').change(function() {
			curveCalculator('TC','lock');
	  });		  

	  $('#TLcalcbasedOn').change(function() {
			curveCalculator('TC','');
	  });	
	  	  
// ******************************* Dialog Start ********************************************
		
		$( "#dialogOpenFile" ).dialog({ 
			autoOpen: false, 
			minWidth: 550
			});
		
		$( "#dialogExportData" ).dialog({ 
			autoOpen: false, 
			minWidth: 600
			});
			
		$( "#dialogImportData" ).dialog({ 
			autoOpen: false, 
			minWidth: 600
			});	

		$( "#dialogGFinder" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});	

		$( "#dialogSysReq" ).dialog({ 
			autoOpen: false, 
			minWidth: 500
			});

		$( "#dialogCredits" ).dialog({ 
			autoOpen: false, 
			minWidth: 500
			});
			
		$( "#dialogTroubleshooting" ).dialog({ 
			autoOpen: false, 
			minWidth: 500
			});
			
		$( "#dialogManual" ).dialog({ 
			autoOpen: false, 
			minWidth: 500
			});						
		
		$( "#dialogAbout" ).dialog({ 
			autoOpen: false, 
			minWidth: 604
			});	
			
		$( "#dialogBuildBVERoute" ).dialog({ 
			autoOpen: false, 
			minWidth: 800,
			close: function() {
				Rail = [];
				Pole = [];
				DikeL = [];
				DikeR = [];
				WallL = [];
				WallR = [];
				Ground = [];
				Beacon = [];
				FormL = [];
				FormR = [];
				FormCL = [];
				FormCR = [];
				RoofL = [];
				RoofR = [];
				RoofCL = [];
				RoofCR = [];
				CrackL = [];
				CrackR = [];
				FreeObj = [];
				BackGround = [];
	
				GBtunnel = [];
				GBdike = [];
				GBcut = [];
				GBbridge = [];
				GBfo = [];
				GBform = [];
				GBug = [];
	
				paralellTrack = [];
				teks = '';
				defaultRailIndex = 0;
				pitchRatio = 0;
				mainTrkArr = [];
				subTrkArr = [];
				noteTrkArr = []; 
				}
			});			

		$( "#dialogRailpitch" ).dialog({ 
			autoOpen: false, 
			minWidth: 800,
			close: function(){
				//chart.setSelection([]);
				chart.clearChart;
				data = null;
				//document.getElementById('elevation_chart').innerHTML = '';
				//google.visualization.events.removeListener(chartListener);
				//chartListener = null;
				//alert('chart clear');
				}
			});	
			
		$( "#dialogRailCurve" ).dialog({ 
			autoOpen: false, 
			minWidth: 600
			});	
			
		$( "#dialogRailTransitionCurve" ).dialog({ 
			autoOpen: false, 
			minWidth: 600
			});				
/*
		$( "#dialogRailSwitch" ).dialog({ 
			autoOpen: false, 
			minWidth: 500
			});	
		*/	
		$( "#dialogParalelLine" ).dialog({ 
			autoOpen: false, 
			minWidth: 550
			});	
			
		$( "#dialogCombinePolyline" ).dialog({ 
			autoOpen: false, 
			minWidth: 330
			});	

		$( "#dialogpreRailpitch" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});	
			
		$( "#dialogInsertNoteAtMarker" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});					

		$( "#dialogRailtype" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});	
																																									
		$( "#dialogStrObject" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});	
			
		$( "#dialogLSObj" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});	
			
		$( "#dialogBuilObj" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});	
			
		$( "#dialogROObj" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});	
			
		$( "#dialogAudio" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});	
			
		$( "#dialogOptions" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});	

		$( "#dialogBVEOptions" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});	
			
		$( "#dialogBVETrains" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});	
			
		$( "#dialogBVEAdd-on" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});																									

		$( "#dialogImportSetting" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});																									

		$( "#dialogExportSetting" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});																									

		$( "#dialogSaveCookie" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});																									

		$( "#dialogLoadCookie" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
			});	
			
		$( "#dialogImportObjects" ).dialog({ 
			autoOpen: false, 
			minWidth: 640
		});	
		
		$( "#dialogTrackSetting" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});	

		$( "#dialogMarkerSetting" ).dialog({ 
			autoOpen: false, 
			minWidth: 550
		});	

		$( "#dialogBuildRoute" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});	
				
		$( "#dialogAddPoint" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});
		
		$( "#dialogInsertCrossing" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});
		
		$( "#dialogInsertOverbridge" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});
		
		$( "#dialogInsertBridge" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});
		
		$( "#dialogInsertRiver" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});
		
		$( "#dialogUpdateGround" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});
		
		$( "#dialogNonParallelTurnOut" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});
		
		$( "#dialogWidenParallelGap" ).dialog({ 
			autoOpen: false, 
			maxHeight:480,
			minWidth: 640
		});
		
		$( "#dialogInsertPlatform" ).dialog({ 
			autoOpen: false, 
			minWidth: 760
		});
		
		$( "#dialogSwitchTrack" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});
		
		$( "#dialogInsertFlyover" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});
		
		$( "#dialogInsertTunnel" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});
		
		$( "#dialogMakeItParallelBetween2Point" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});
				
		/*
		$( "#dialogAddPoint" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});*/
// ****************************************************************************

// *****************************Dialog Operation ******************************					
		$('#mMexportMapData').click(function() {
			var teks = map.getCenter().lat() + "," + map.getCenter().lng() + "\n";	// format : lat(),lng()
			
			for (oType in MapToolbar.features) {
				var type = oType.replace('Tab',''); // oType.substring(0, oType.lastIndexOf('Tab;));
    	
				for (oName in MapToolbar.features[oType]) {
    			if(type == 'shape' || type=='line') {
    				//MapToolbar.currentFeature = MapToolbar.features[type + 'Tab'][featureName]; 
    				//var point = MapToolbar.currentFeature.getPath().getAt(0);
    				teks += oName;
    				
    				if (MapToolbar.features[oType][oName].ptype != null) {
    					teks += ',' + MapToolbar.features[oType][oName].ptype;
    				} else {
    					teks += ',';
    				}
    				
    				if (MapToolbar.features[oType][oName].note != null) {
    					teks += ',' + MapToolbar.features[oType][oName].note.replace(',','-').replace('\n',' - ');
    				} else {
    					teks += ',';
    				}

    				if (MapToolbar.features[oType][oName].trackname != null) {
    					teks += ',' + MapToolbar.features[oType][oName].trackname;
    				} else {
    					teks += ',';
    				}

    				if (MapToolbar.features[oType][oName].trackservice != null) {
    					teks += ',' + MapToolbar.features[oType][oName].trackservice;
    				} else {
    					teks += ',';
    				}

    				if (MapToolbar.features[oType][oName].trackno != null) {
    					teks += ',' + MapToolbar.features[oType][oName].trackno;
    				} else {
    					teks += ',';
    				}

    				if (MapToolbar.features[oType][oName].tracksection != null) {
    					teks += ',' + MapToolbar.features[oType][oName].tracksection;
    				} else {
    					teks += ',';
    				}

    				if (MapToolbar.features[oType][oName].trackbve != null) {
    					teks += ',' + MapToolbar.features[oType][oName].trackbve;
    				} else {
    					teks += ',';
    				}

    				if (MapToolbar.features[oType][oName].kit != null) {
    					teks += ',' + MapToolbar.features[oType][oName].kit;
    				} else {
    					teks += ',';
    				}
    				
    				var allPoints = MapToolbar.features[oType][oName].getPath().getArray();
    				var polyL = MapToolbar.features[oType][oName];

/*line
					note: null, // any extra note 
					curve: null,	// circullar curve
					tcurve: null, // transition curve
					pitch: null, // track pitch
					bve: null, // various bve data
					lineX:null, // non parallel line distance
					turn:null, // main line non curve turning
					prln:null, // parallel line with
					kit:null, // others data (reserved) by Karya IT
					pid: poly.id
					*/
   				
    			for (var i = 0; i < allPoints.length; i++) 
    				{
    						teks += ',' + allPoints[i].lat() + ";" + allPoints[i].lng();
    						
 								if (polyL.markers.getAt(i).note != null) {
    							teks += ';' + polyL.markers.getAt(i).note.replace(',','-').replace('\n',' - ');
    						} else {
    							teks += ';';
    						}
    						
 								if (polyL.markers.getAt(i).pitch != null) {
    							teks += ';' + polyL.markers.getAt(i).pitch;
    						} else {
    							teks += ';';
    						}

 								if (polyL.markers.getAt(i).bve != null) {
    							teks += ';' + polyL.markers.getAt(i).bve;
    						} else {
    							teks += ';';
    						}

 								if (polyL.markers.getAt(i).kit != null) {
    							teks += ';' + polyL.markers.getAt(i).kit;
    						} else {
    							teks += ';';
    						}

 								if (polyL.markers.getAt(i).curve != null) {
    							teks += ';' + polyL.markers.getAt(i).curve;
    						} else {
    							teks += ';';
    						}

 								if (polyL.markers.getAt(i).tcurve != null) {
    							teks += ';' + polyL.markers.getAt(i).tcurve;
    						} else {
    							teks += ';';
    						}

 								if (polyL.markers.getAt(i).lineX != null) {
    							teks += ';' + polyL.markers.getAt(i).lineX;
    						} else {
    							teks += ';';
    						}

 								if (polyL.markers.getAt(i).turn != null) {
    							teks += ';' + polyL.markers.getAt(i).turn;
    						} else {
    							teks += ';';
    						}

 								if (polyL.markers.getAt(i).prln != null) {
    							teks += ';' + polyL.markers.getAt(i).prln;
    						} else {
    							teks += ';';
    						}
    						
    					}
    				teks += "\n"; 
    				
    			}  else if (type == 'curve') {
    				teks += oName
    				
    				if (MapToolbar.features[oType][oName].ctype != null) {
    					teks += ',' + MapToolbar.features[oType][oName].ctype;
    				} else {
    					teks += ',';
    				}
    				
    				if (MapToolbar.features[oType][oName].pid != null) {
    					teks += ',' + MapToolbar.features[oType][oName].pid;
    				} else {
    					teks += ',';
    				}

    				if (MapToolbar.features[oType][oName].mid != null) {
    					teks += ',' + MapToolbar.features[oType][oName].mid;
    				} else {
    					teks += ',';
    				}
    				
    				if (MapToolbar.features[oType][oName].note != null) {
    					teks += ',' + MapToolbar.features[oType][oName].note.replace(',','-').replace('\n',' - ');
    				} else {
    					teks += ',';
    				}
/*curve
					note: null, // any extra note 
					pitch: null, // track pitch
					bve: null, // various bve data
					lineX:null, // non parallel line distance
					turn:null, // main line non curve turning
					kit:null, // others data (reserved) by Karya IT
					ld1:null, // distance on circumference from curve start point l1, total arc length = ld1 + ld2
					ld2:null, // distance on circumference from curve end point l2, total arc length = ld1 + ld2
					arc:null,
					pid: poly.id
*/				

    				var cpoly = MapToolbar.features[oType][oName].markers;
    				
    				for (mi = 0; mi < cpoly.length; mi++) {
    					teks += ',' + cpoly.getAt(mi).getPosition().lat() + ";" +cpoly.getAt(mi).getPosition().lng();
    					
    					if ( cpoly.getAt(mi).pid != null) {
    						teks += ';' +  cpoly.getAt(mi).pid;
    					} else {
    						teks += ';';
    					}
    					
    					if ( cpoly.getAt(mi).note != null) {
    						teks += ';' +  cpoly.getAt(mi).note.replace(',','-').replace('\n',' - ');
    					} else {
    						teks += ';';
    					}

    					if ( cpoly.getAt(mi).pitch != null) {
    						teks += ';' +  cpoly.getAt(mi).pitch;
    					} else {
    						teks += ';';
    					}

    					if ( cpoly.getAt(mi).bve != null) {
    						teks += ';' +  cpoly.getAt(mi).bve;
    					} else {
    						teks += ';';
    					}
    					
    					if ( cpoly.getAt(mi).lineX != null) {
    						teks += ';' +  cpoly.getAt(mi).lineX;
    					} else {
    						teks += ';';
    					}
    					
    					if ( cpoly.getAt(mi).turn != null) {
    						teks += ';' +  cpoly.getAt(mi).turn;
    					} else {
    						teks += ';';
    					}
    					
    					if ( cpoly.getAt(mi).kit != null) {
    						teks += ';' +  cpoly.getAt(mi).kit;
    					} else {
    						teks += ';';
    					}
    					
    					if ( cpoly.getAt(mi).ld1 != null) {
    						teks += ';' +  cpoly.getAt(mi).ld1;
    					} else {
    						teks += ';';
    					}
    					
    					if ( cpoly.getAt(mi).ld2 != null) {
    						teks += ';' +  cpoly.getAt(mi).ld2;
    					} else {
    						teks += ';';
    					}
    					
    					if ( cpoly.getAt(mi).arc != null) {
    						teks += ';' +  cpoly.getAt(mi).arc;
    					} else {
    						teks += ';';
    					}	
    					
    					if ( cpoly.getAt(mi).title != null) {
    						teks += ';' +  cpoly.getAt(mi).title;
    					} else {
    						teks += ';';
    					}      							    					    					    					    					    					
    				}
    				    				
    				teks += "\n";

    			} else if (type == 'tcurve') {
/*tcurve
	note: null, // any extra note 
	pitch: null, // track pitch
	bve: null, // various bve data
	lineX:null, // non parallel line distance
	turn:null, // main line non curve turning
	kit:null, // others data (reserved) by Karya IT
	pid: poly.id
*/    				
    				teks += oName;
    				
    				if (MapToolbar.features[oType][oName].ptype != null) {
    					teks += ',' + MapToolbar.features[oType][oName].ptype;
    				} else {
    					teks += ',';
    				}
    				
    				if (MapToolbar.features[oType][oName].note != null) {
    					teks += ',' + MapToolbar.features[oType][oName].note.replace(',','-');
    				} else {
    					teks += ',';
    				}
    				
    				teks += "\n";  
    			
    			} else if (type == 'dotMarker') {
    				teks += oName;
    				
    				if (MapToolbar.features[oType][oName].ptype != null) {
    					teks += ',' + MapToolbar.features[oType][oName].ptype;
    				} else {
    					teks += ',';
    				}
    				
    				if (MapToolbar.features[oType][oName].note != null) {
    					teks += ',' + MapToolbar.features[oType][oName].note.replace(',','-');
    				} else {
    					teks += ',';
    				}
    				
 						var point = MapToolbar.features[oType][oName].getPosition(); 
 						teks += point.lat() + ";" + point.lng() + "\n";  	// format : line_id,prop1;prop2;prop3;...;remark,lat();lng()
 						
    			} else if (type == 'circle') {
    				teks += oName;
    				
    				if (MapToolbar.features[oType][oName].ptype != null) {
    					teks += ',' + MapToolbar.features[oType][oName].ptype;
    				} else {
    					teks += ',';
    				}
    				
    				if (MapToolbar.features[oType][oName].note != null) {
    					teks += ',' + MapToolbar.features[oType][oName].note.replace(',','-');
    				} else {
    					teks += ',';
    				}
    				
    				var center = MapToolbar.features[oType][oName].getCenter();
    				var radius = MapToolbar.features[oType][oName].getRadius();
    				teks += radius + ',' + center.lat() + ';' + center.lng() + "\n";
  		
  					teks += "\n"; 
    			}
				}				
			}
			
			$('#exportData').text(teks);
			$('#dialogExportData').dialog('open');
		});

		$('#mMimportMapData').click(function() {
			$('#importDataText').text("paste text here ...");
			$('#dialogImportData').dialog('open');
		});
		
		$('#btnImportData').click(function() {
			if ($('#importDataText').val() != '') {
				var teksIm = $('#importDataText').val();
				var rowsData = teksIm.split("\n"); // split rows to array
  			var kood = rowsData[0].split(",");
  			map.setCenter(new google.maps.LatLng(kood[0],kood[1])); // recenter map
  			map.setZoom(11);
  			if (rowsData[1] != '') {
  				//line_1,ptype,note,trackname,trackservice,trackno,tracksection,trackbve,kit, 3.6975060399011115;101.50496006011963;note;pitch;bve;kit, ...
  				var rd = rowsData[1].split(",");
  				var dname = rd[0];				    					
  				var otype = dname.split("_")[0];
  				if (otype == 'line') {
  					var loadPoly = null;
  				  MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing(); 												
	 					loadPoly = MapToolbar.features["lineTab"][dname];
	 													
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
	 													
						setTimeout(function() { ReloadPolyline(loadPoly, rd, 9, rowsData, 1); }, 100);
											
					} else if (otype == 'curve') {
  					var polyL = MapToolbar.features['lineTab']['line_1'];
						setTimeout(function() { reloadCurve(polyL, 0, rowsData); }, 100);
  				} else if (otype == 'tcurve') { 
  					var polyL = MapToolbar.features['lineTab']['line_1'];
  					setTimeout(function() { reloadTCurve(polyL, mi, rowsData); }, 100 );
  				} else if (otype == 'circle') {
  					setTimeout(function() { reloadCircle(rowsData, 1); }, 100 );
  				} else if (otype == 'shape') {
  				
  				} else if (otype == 'dotMarker') {
  					setTimeout(function() { reloaddotMarker(rowsData,1); }, 100 );
  				}  				    			
  			}
  				    		  									
  			$('#dialogImportData').dialog('close');
  			return;
			}			
		});		
		
		$('#mMGFinder').click(function() {
			$('#address').text("type place here ...");
			$('#dialogGFinder').dialog('open');
			
			$('#btnFinder').click(function() {
				codeAddress();				
			});	
			
			$('#address').keypress(function(event) {
				var keycode = (event.keyCode ? event.keyCode : event.which);
				if(keycode == '13'){ codeAddress();	}
			});	
		});
		
		$('#mMnewMap').click(function() {
			if (confirm('Reload Map to default location?')) {location.reload();}
		});
		
		$('#mMdefaultLocation').click(function() {
			if (confirm('Set current map as default?')) {
				setCookie("defaultcenter",map.getCenter().lat()+','+map.getCenter().lng(),365)
				alert(map.getCenter() + " is set as default map center.");
			}
		});
		
		$('#mMopenFile').click(function() {
			// Check for the various File API support.
			if (window.File && window.FileReader && window.FileList && window.Blob) {
  			// Great success! All the File APIs are supported.
  			$( "#dialogOpenFile" ).dialog('open');
  			
  			var teksOP = '';
  			
  			function handleFileSelect(evt) {
  			    var files = evt.target.files; // FileList object

  			    // Loop through the FileList and render image files as thumbnails.
  			    for (var i = 0, f; f = files[i]; i++) {

  			      // Only process text files.
  			      if (!f.type.match('text.*')) {
  			        continue;
  			      }

  			      var reader = new FileReader();

  			      // Closure to capture the file information.
  			      reader.onload = (function(theFile) {
   			       return function(e) {
  							teksOP = e.target.result;  							

  			  	    if (teksOP !=='') {
  			  	    	var quickScan = [];
  			  	    	if (teksOP.indexOf('line') > 0) { quickScan[0] = true; } else { quickScan[0] = false; }
  			  	    	if (teksOP.indexOf('circle') > 0) { quickScan[1] = true; } else { quickScan[1] = false; }
  			  	    	if (teksOP.indexOf('shape') > 0) { quickScan[2] = true; } else { quickScan[2] = false; }
  			  	    	if (teksOP.indexOf('dotMarker') > 0) { quickScan[3] = true; } else { quickScan[3] = false; }	
  			  	    	if (teksOP.indexOf('curve') > 0) { quickScan[4] = true; } else { quickScan[4] = false; }
  			  	    	if (teksOP.indexOf('tcurve') > 0) { quickScan[5] = true; } else { quickScan[5] = false; }
  			  	    	
  				    		var rowsData = teksOP.split("\n"); // split rows to array
  				    		var kood = rowsData[0].split(",");
  				    		map.setCenter(new google.maps.LatLng(kood[0],kood[1])); // recenter map
  				    		map.setZoom(11);
  				    		if (rowsData[1] != '') {
  				    		//line_1,ptype,note,trackname,trackservice,trackno,tracksection,trackbve,kit, 3.6975060399011115;101.50496006011963;note;pitch;bve;kit, ...
  				    			var rd = rowsData[1].split(",");
  				    			var dname = rd[0];				    					
  				    			var otype = dname.split("_")[0];
  				    			if (otype == 'line') {
  				    				var loadPoly = null;
  				    				MapToolbar.initFeature('line');
	 										MapToolbar.stopEditing(); 												
	 										loadPoly = MapToolbar.features["lineTab"][dname];
	 													
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
	 													
											setTimeout(function() { ReloadPolyline(loadPoly, rd, 9, rowsData, 1, quickScan); }, 100);
											
					  				/* } else if (otype == 'curve') {
  										var polyL = MapToolbar.features['lineTab']['line_1'];
											setTimeout(function() { reloadCurve(polyL, 0, rowsData, quickScan); }, 100);
  									} else if (otype == 'tcurve') { 
  										var polyL = MapToolbar.features['lineTab']['line_1'];
  										setTimeout(function() { reloadTCurve(polyL, mi, rowsData, quickScan); }, 100 ); */
  									} else if (otype == 'circle') {
  										setTimeout(function() { reloadCircle(rowsData, 1, quickScan); }, 100 );
  									} else if (otype == 'shape') {
  										alert('warning! no code defined. a shape object without any line?');
  									} else if (otype == 'dotMarker') {
  										setTimeout(function() { reloaddotMarker(rowsData,1, quickScan); }, 100 );
  									}  				    			
  				    		}
  				    		  									
  								$( "#dialogOpenFile" ).dialog('close');
  								return;
  				    	}		
  							};
  			      })(f);

  			      reader.readAsText(f);
  			    }
  			}

  			document.getElementById('fileOP').addEventListener('change', handleFileSelect, false);
			} else {
  			alert('The File APIs are not fully supported in this browser.');
			}
		
		});
		  
		$('#mMbuildBVE').click(function() { 

			$('#dialogBuildRoute').dialog('open');
		});
		
		$('#btnBuildRoute').click(function() { 
			$('#buildBVE').val('');
			$('#dialogBuildBVERoute').dialog('open');	
			var polyid = $('#dbr_lineid').val();
			if (typeof polyid != 'undefined') {
				if (polyid != '') {
					generateRouteBVE4_OpenBVE(polyid);					
				}
			}			
		});

		$('#mMmanual').click(function() {
			$('#dialogManual').dialog('open');
		});

		$('#mMtroubleShooting').click(function() {
			$('#dialogTroubleshooting').dialog('open');
		});

		$('#mMsystemRequirents').click(function() {
			$('#dialogSysReq').dialog('open');
		});

		$('#mMCredits').click(function() {
			$('#dialogCredits').dialog('open');
		});

		$('#mMAbout').click(function() {			
			$('#dialogAbout').dialog('open');
		});
		
		$('#mOImports').click(function() {
			$('#dialogImportObjects').dialog('open');
			
			// Check for the various File API support.
			if (window.File && window.FileReader && window.FileList && window.Blob) {
  			// Great success! All the File APIs are supported.
  			
  			var teksOP = '';
  			
  			function handleFileSelect(evt) {
  			    var files = evt.target.files; // FileList object

  			    // Loop through the FileList and render image files as thumbnails.
  			    for (var i = 0, f; f = files[i]; i++) {

  			      // Only process text files.
  			      if (!f.type.match('text.*')) {
  			        continue;
  			      }

  			      var reader = new FileReader();

  			      // Closure to capture the file information.
  			      reader.onload = (function(theFile) {
   			       return function(e) {
  							teksOP = e.target.result;

  			  	    if (teksOP !=='') {
  				    		var rowsData = teksOP.split("\n");
  				    		for (var i=0; i < rowsData.length; i++) {
// 2do ********************************************************************************
										
  				    		}
  									
  								$( "#dialogImportObjects" ).dialog('close');
  								return;
  				    	}		
  							};
  			      })(f);

  			      reader.readAsText(f,'UTF-8');
  			    }
  			}

  			document.getElementById('fileGBMObj').addEventListener('change', handleFileSelect, false);
			} else {
  			alert('The File APIs are not fully supported in this browser.');
			}
			
			$('#btnimportGBMapObjDataText').click(function() {
				var teksGBMo = $('#importGBMapObjDataText').val();
				if (teksGBMo !=='') {
  				var rowsData = teksGBMo.split("\n");
  				for (var i=0; i < rowsData.length; i++) {
						// 2do ********************************************************************************
						var coldata = rowsData[i].split(",");
						switch (coldata[0]) {
							case 'rail':
								// statements
								//$('#railindex').empty().append('<option selected>- select -</option>');
								$('#railindex').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
								gbmStrArr.push(coldata);
								break;
							case 'gbmap':
								// statements
								
								switch (coldata[4]) {
									case 'Bridge':
										$('#strobjBridge').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'Flyover':
										$('#strobjflyover').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'Tunnel':
										$('#strobjTunnel').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'Dike':
										$('#strobjDike').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'Hill Cut':
									$('#strobjCut').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'Underground':
									$('#strobjunderground').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'Platform Base':
									$('#strobjformbase').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'Platform Building':
									$('#strobjformbuil').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'Platform Item 1':
									$('#strobjformO1').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'Platform Item 2':
									$('#strobjformO2').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'Road Crossing':
									$('#strobjroadcross').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									default:
								}
								gbmStrArr.push(coldata);								
								break;
							case 'bvestr':
								// statements								
								switch (coldata[4]) {
									case 'Pole':
										$('#poleindex').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'CrackL': case 'CrackR':
										$('#crackindex').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'FormL': case 'FormR': case 'FormCL': case 'FormCR':
										$('#formindex').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'RoofL' : case 'RoofR': case 'RoofCL': case 'RoofCR':
										$('#roofindex').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'WallL' : case 'WallR':
										$('#wallindex').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'DikeL': case 'DikeR':
										$('#strobjDike').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'Ground':
										$('#groundindex').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'Background':
										$('#backgroundindex').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
									case 'Beacon':
										$('#beconindex').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
										break;
										
									default:
								}
								
								gbmStrArr.push(coldata);
								break;
							case 'fobj':
								// statements
								$('#freeobjectid').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
								gbmStrArr.push(coldata);								
								break;
							case 'train':
								// statements
								$('#denshaobj').append($("<option></option>").attr("value", coldata[5]).text(coldata[3]));
								gbmStrArr.push(coldata);								
								break;
							case 'wav':
								// statements
								switch (coldata[4]) {
									case 'Announce':
										// statements
										$('#annouceindex').append($("<option></option>").attr("value", coldata[6]).text(coldata[3]));
										break;
									case 'Melody':
										// statements
										$('#melodyindex').append($("<option></option>").attr("value", coldata[6]).text(coldata[3]));
										break;
									case 'Dopler':
										// statements
										$('#doplerindex').append($("<option></option>").attr("value", coldata[6]).text(coldata[3]));
										break;
									case 'Flange':
										// statements
										$('#flangeindex').append($("<option></option>").attr("value", coldata[6]).text(coldata[3]));
										break;
									default:
										// default statements
								}
								
								gbmStrArr.push(coldata);								
								break;
							default:
								// default statements
								
						} 
  				}  				
  				$( "#dialogImportObjects" ).dialog('close');
  				alert('data import done');
  				return;
  			}	
			});	
		});
		
		$('#mMaddPoints').click(function() {
			$('#dialogAddPoint').dialog('open');
		});
		
		/*
		$.rloader({defaultcache:false});
		$.rloader({src:'script/bveobjects.js', callback:scriptLoaded});
		*/
		/*
		$.ajaxSetup({async:false});
		var currentTime = new Date();
		
		$.getScript('script/test.js?time=' + currentTime.getSeconds(), function() {
 	    //scriptLoaded();
		});
		*/
		/*
		$.ajax({
    	url: 'script/bveobjects.js',
    	dataType: 'script',
   		success: scriptLoaded()
		});
		*/
				
		function scriptLoaded() {
    // do something
      for (var i=0; i < bverailobjArr.length; i++) {
      	$('#railindex').append($("<option></option>").attr("value", bverailobjArr[i][5]).text(bverailobjArr[i][2]));
      	if (bverailobjArr[i][3] == 'st') {      			
     			$('#dms_railindex').append($("<option></option>").attr("value", bverailobjArr[i][1]).text(bverailobjArr[i][2])); 
     			$('#dtsv_railtypedefault').append($("<option></option>").attr("value", bverailobjArr[i][1]).text(bverailobjArr[i][2]));
     			$('#dbr_railtypedefault').append($("<option></option>").attr("value", bverailobjArr[i][1]).text(bverailobjArr[i][2]));
      	} 
      	if (bverailobjArr[i][3] == 'cv') {
     			$('#ddc_railindex').append($("<option></option>").attr("value", bverailobjArr[i][1]).text(bverailobjArr[i][2]));
      	}
      	if (bverailobjArr[i][3] == 'sw') {
     			$('#swrailtype').append($("<option></option>").attr("value", bverailobjArr[i][1]).text(bverailobjArr[i][2]));
     			//alert($('#swrailtype').text());
      	} 
    	}
    	
    	for (var i=0; i < bvetrainDirArr.length; i++) {
    		$('#dtsv_runningTrain').append($("<option></option>").attr("value", bvetrainDirArr[i][4]).text(bvetrainDirArr[i][2]));
    		$('#dbr_runningTrain').append($("<option></option>").attr("value", bvetrainDirArr[i][4]).text(bvetrainDirArr[i][2]));
    	}
    	
    	for (var i=0; i < bvetunnelObjArr.length; i++) {
    		$('#strobjTunnel').append($("<option></option>").attr("value", bvetunnelObjArr[i][3]).text(bvetunnelObjArr[i][2]));
    		$('#dms_GBstr').append($("<option></option>").attr("value", bvetunnelObjArr[i][1]).text(bvetunnelObjArr[i][2]));
    		$('#dInsTun_tun').append($("<option></option>").attr("value", bvetunnelObjArr[i][1]).text(bvetunnelObjArr[i][2]));
    	}
    	
    	for (var i=0; i < bvebridgeObjArr.length; i++) {
    		$('#strobjBridge').append($("<option></option>").attr("value", bvebridgeObjArr[i][3]).text(bvebridgeObjArr[i][2]));
    		$('#dms_GBstr').append($("<option></option>").attr("value", bvebridgeObjArr[i][1]).text(bvebridgeObjArr[i][2]));
    		$('#dInsB_bridge').append($("<option></option>").attr("value", bvebridgeObjArr[i][1]).text(bvebridgeObjArr[i][2]));
    	}
    	
    	for (var i=0; i < bveFOObjArr.length; i++) {
    		$('#strobjflyover').append($("<option></option>").attr("value", bveFOObjArr[i][3]).text(bveFOObjArr[i][2]));
    		$('#dms_GBstr').append($("<option></option>").attr("value", bveFOObjArr[i][1]).text(bveFOObjArr[i][2]));
    		$('#dInsFO_Fo').append($("<option></option>").attr("value", bveFOObjArr[i][1]).text(bveFOObjArr[i][2]));
    	}    	

    	for (var i=0; i < bvecutObjArr.length; i++) {
    		$('#strobjCut').append($("<option></option>").attr("value", bvecutObjArr[i][3]).text(bvecutObjArr[i][2]));
    		$('#dms_GBstr').append($("<option></option>").attr("value", bvecutObjArr[i][1]).text(bvecutObjArr[i][2]));
    	}
    	
    	for (var i=0; i < bvedikeObjArr.length; i++) {
    		$('#strobjDike').append($("<option></option>").attr("value", bvedikeObjArr[i][3]).text(bvedikeObjArr[i][2]));
    		$('#dms_GBstr').append($("<option></option>").attr("value", bvedikeObjArr[i][1]).text(bvedikeObjArr[i][2]));
    	}
    	
    	for (var i=0; i < bveUGObjArr.length; i++) {
    		$('#strobjunderground').append($("<option></option>").attr("value", bveUGObjArr[i][3]).text(bveUGObjArr[i][2]));
    		$('#dms_GBstr').append($("<option></option>").attr("value", bveUGObjArr[i][1]).text(bveUGObjArr[i][2]));
    	}
    	
    	for (var i=0; i < bveRCObjArr.length; i++) {
    		$('#strobjroadcross').append($("<option></option>").attr("value", bveRCObjArr[i][3]).text(bveRCObjArr[i][2]));
    		$('#dms_GBstr').append($("<option></option>").attr("value", bveRCObjArr[i][1]).text(bveRCObjArr[i][2]));
    		$('#dInsC_Crossing').append($("<option></option>").attr("value", bveRCObjArr[i][1]).text(bveRCObjArr[i][2]));
    	}
    	
    	for (var i=0; i < bveplatformObjArr.length; i++) {
    		$('#strobjformbase').append($("<option></option>").attr("value", bveplatformObjArr[i][3]).text(bveplatformObjArr[i][2]));
    		$('#dms_GBstr').append($("<option></option>").attr("value", bveplatformObjArr[i][1]).text(bveplatformObjArr[i][2]));
    	}   
    	
    	for (var i=0; i < bvepoleObjArr.length; i++) {
				$('#poleindex').append($("<option></option>").attr("value", bvepoleObjArr[i][3]).text(bvepoleObjArr[i][2]));
				$('#dms_poleindex').append($("<option></option>").attr("value", bvepoleObjArr[i][1]).text(bvepoleObjArr[i][2]));
    	}
    	
    	for (var i=0; i < bvecrackObjArr.length; i++) {
    		$('#crackindex').append($("<option></option>").attr("value", bvecrackObjArr[i][3]).text(bvecrackObjArr[i][2]));
    	}
    	
    	for (var i=0; i < bvebveStrOjArr.length; i++) {
    		switch (bvebveStrOjArr[i][3]) {
					case 'Ground':
						$('#groundindex').append($("<option></option>").attr("value", bvebveStrOjArr[i][4]).text(bvebveStrOjArr[i][2]));
						$('#dUpdG_object').append($("<option></option>").attr("value", bvebveStrOjArr[i][1]).text(bvebveStrOjArr[i][2]));
						break;
					case 'Background':
						$('#backgroundindex').append($("<option></option>").attr("value", bvebveStrOjArr[i][4]).text(bvebveStrOjArr[i][2]));
						break;
					case 'Beacon':
						$('#beconindex').append($("<option></option>").attr("value", bvebveStrOjArr[i][4]).text(bvebveStrOjArr[i][2]));
						break;
					case 'River':
						$('#dInsB_river').append($("<option></option>").attr("value", bvebveStrOjArr[i][1]).text(bvebveStrOjArr[i][2]));
						$('#dInsR_river').append($("<option></option>").attr("value", bvebveStrOjArr[i][1]).text(bvebveStrOjArr[i][2]));
						break;
																
					default:
				}
    	}

    	for (var i=0; i < bvefreeObjArr.length; i++) {
    		$('#freeobjectid').append($("<option></option>").attr("value", bvefreeObjArr[i][4]).text(bvefreeObjArr[i][2]));
    		if (bvefreeObjArr[i][3] == 'Structure') {
    			if (bvefreeObjArr[i][1].indexOf('overbridge') == 0) {
    				$('#dInsOb_overbridge').append($("<option></option>").attr("value", bvefreeObjArr[i][1]).text(bvefreeObjArr[i][2]));
    			}
    		}
    	}

    	for (var i=0; i < bvetrainObjArr.length; i++) {
    		$('#denshaobj').append($("<option></option>").attr("value", bvetrainObjArr[i][4]).text(bvetrainObjArr[i][2]));
    		$('#dtsv_runningTrain').append($("<option></option>").attr("value", bvetrainObjArr[i][4]).text(bvetrainObjArr[i][2]));
    		$('#dbr_runningTrain').append($("<option></option>").attr("value", bvetrainObjArr[i][4]).text(bvetrainObjArr[i][2]));
    	}    	    	    	

    	for (var i=0; i < bveaudioObjArr.length; i++) {
    		switch (bveaudioObjArr[i][3]) {
					case 'Announce':
						// statements
						$('#annouceindex').append($("<option></option>").attr("value", bveaudioObjArr[i][5]).text(bveaudioObjArr[i][2]));
						break;
					case 'Melody':
						// statements
						$('#melodyindex').append($("<option></option>").attr("value", bveaudioObjArr[i][5]).text(bveaudioObjArr[i][2]));
						break;
					case 'Dopler':
						// statements
						$('#doplerindex').append($("<option></option>").attr("value", bveaudioObjArr[i][5]).text(bveaudioObjArr[i][2]));
						break;
					case 'Flange':
						// statements
						$('#flangeindex').append($("<option></option>").attr("value", bveaudioObjArr[i][5]).text(bveaudioObjArr[i][2]));
						break;
					default:
						// default statements
				}
    	}   
		}
		
		$('#accordion').accordion( "option", "disabled", false );
		
		$( "#tabsRailPitchDialog" ).tabs();
		$( "#tabsMarkerSettingDialog" ).tabs();
		$( "#tabsInsertPlatformDialog" ).tabs();
				   		
		$('#setTHeight').click(function() {
		  	var h = parseFloat($('#setPtHeight').val());
		  	var txtPitchDetails = $('#txtPitchDetails').val();
		  	var stH = parseInt($('#setPHeightSt').val());
		  	var edH = parseInt($('#setPHeightEd').val());
		  	var arrTE = txtPitchDetails.split('\n');
		    //var cgsp = parseInt($('#setPHeightSt').val());
		    
		    for (i = 0; i < data.getNumberOfRows(); i++) {
	  	  	if ((stH <= parseInt(data.getValue(i, 0))) && (edH >= parseInt(data.getValue(i, 0)))) {	  	  		 
	  	  		if (document.getElementById('LPfixedHeight').checked) {
	  	  			var nv = parseFloat(data.getValue(i, 2)) + h;
	  	  			data.setValue(i, 2, nv);
	  	  			if (i == data.getNumberOfRows() -1) {
	  	  				$('#LLlastheight').val(nv);
	  	  				$('#LLlastheightratio').val(h);
	  					}	  	  			
	  	  		}	  	  		 	  		
	  	  	}    					
	    	}
	    		    	
	    	if (document.getElementById('LPfixedHeight').checked) {
	    		// start point
	    		for (j = 0; j < arrTE.length; j++) {
	    		var td1 = arrTE[j].split(',');
 					
 					if (parseInt(td1[0]) == 0) {
 						if (stH == parseInt(td1[0])) {
 							if (typeof td1[3] == 'undefined') { 								
 								td1[3] = 'height:' + h;
 								arrTE[j] = td1.join(',');
 								//arrTE[j] = arrTE[j].replace('undefined',''); 						
 								break; 								
 							} else {
 								if (td1[3].indexOf('height:') < 0) {
 									td1[3] += 'height:' + h; 
 								} else {
 									var ar0 = td1[3].split('§');
									for (var a=0; a < ar0.length;a++) {
										var ar1 = ar0[a].split(':');
										if (ar1[0] == 'height') {
											ar1[1] = h; 
											ar0[a] = ar1.join(':');
											break;
										}
									}
									td1[3] = ar0.join('§');
									arrTE[j] = td1.join(',');
 									//arrTE[j] = arrTE[j].replace('undefined','');
 									break;
 								}
 							}
 						}
 					
 					} else {
 						var td0 = arrTE[j-1].split(',');
 						
 						if ((stH >= parseInt(td0[0])) && (stH <= parseInt(td1[0]))) {
 							if (stH == parseInt(td0[0])) {
 								if (typeof td0[3] == 'undefined') { 								
 									td0[3] = 'height:' + h;
 									arrTE[j-1] = td0.join(',');
 									//arrTE[j-1] = arrTE[j-1].replace('undefined',''); 						
 									break; 								
 								} else {
 									if (td0[3].indexOf('height:') < 0) {
 										td0[3] += 'height:' + h; 
 									} else {
 										var ar0 = td0[3].split('§');
										for (var a=0; a < ar0.length;a++) {
											var ar1 = ar0[a].split(':');
											if (ar1[0] == 'height') {
												ar1[1] = h; 
												ar0[a] = ar1.join(':');
												break;
											}
										}
										td0[3] = ar0.join('§');
										arrTE[j-1] = td0.join(',');
 										//arrTE[j-1] = arrTE[j-1].replace('undefined','');
 										break;
 									}
 								}
 								
 							} else if (stH == parseInt(td1[0])) {
 								if (typeof td1[3] == 'undefined') { 								
 									td1[3] = 'height:' + h;
 									arrTE[j] = td1.join(',');
 									//arrTE[j] = arrTE[j].replace('undefined',''); 						
 									break; 								
 								} else {
 									if (td1[3].indexOf('height:') < 0) {
 										td1[3] += 'height:' + h; 
 									} else {
 										var ar0 = td1[3].split('§');
										for (var a=0; a < ar0.length;a++) {
											var ar1 = ar0[a].split(':');
											if (ar1[0] == 'height') {
												ar1[1] = h; 
												ar0[a] = ar1.join(':');
												break;
											}
										}
										td1[3] = ar0.join('§');
										arrTE[j] = td1.join(',');
 										//arrTE[j] = arrTE[j].replace('undefined','');
 										break;
 									}
 								} 
 								
 							} else {
 								var artxt = stH.toString() + ',,,height:' + h + ',';
 								arrTE.splice(j,0,artxt);
 								break;
 							
							}
 						} 						
 					}
	    		}
	    		
	    		//end point
	    		for (j = 0; j < arrTE.length; j++) {
	    		var td1 = arrTE[j].split(',');
 					
 					if (parseInt(td1[0]) == 0) {
 						if (edH == parseInt(td1[0])) {
 							if (typeof td1[3] == 'undefined') { 								
 								td1[3] = 'height:0';
 								arrTE[j] = td1.join(',');
 								//arrTE[j] = arrTE[j].replace('undefined',''); 						
 								break; 								
 							} else {
 								if (td1[3].indexOf('height:') < 0) {
 									td1[3] += '§height:0'; 
 								} else {
 									var ar0 = td1[3].split('§');
									for (var a=0; a < ar0.length;a++) {
										var ar1 = ar0[a].split(':');
										if (ar1[0] == 'height') {
											ar1[1] = 0; 
											ar0[a] = ar1.join(':');
											break;
										}
									}
									td1[3] = ar0.join('§');
									arrTE[j] = td1.join(',');
 									//arrTE[j] = arrTE[j].replace('undefined','');
 									break;
 								}
 							}
 						}
 					
 					} else {
 						var td0 = arrTE[j-1].split(',');
 						
 						if ((edH >= parseInt(td0[0])) && (edH <= parseInt(td1[0]))) {
 							if (edH == parseInt(td0[0])) {
 								if (typeof td0[3] == 'undefined') { 								
 									td0[3] = 'height:0';
 									arrTE[j-1] = td0.join(',');
 									//arrTE[j-1] = arrTE[j-1].replace('undefined',''); 						
 									break; 								
 								} else {
 									if (td0[3].indexOf('height:') < 0) {
 										td0[3] += '§height:0'; 
 									} else {
 										var ar0 = td0[3].split('§');
										for (var a=0; a < ar0.length;a++) {
											var ar1 = ar0[a].split(':');
											if (ar1[0] == 'height') {
												ar1[1] = 0; 
												ar0[a] = ar1.join(':');
												break;
											}
										}
										td0[3] = ar0.join('§');
										arrTE[j-1] = td0.join(',');
 										//arrTE[j-1] = arrTE[j-1].replace('undefined','');
 										break;
 									}
 								}
 								
 							} else if (edH == parseInt(td1[0])) {
 								if (typeof td1[3] == 'undefined') { 								
 									td1[3] = 'height:0';
 									arrTE[j] = td1.join(',');
 									//arrTE[j] = arrTE[j].replace('undefined',''); 						
 									break; 								
 								} else {
 									if (td1[3].indexOf('height:') < 0) {
 										td1[3] += '§height:0'; 
 									} else {
 										var ar0 = td1[3].split('§');
										for (var a=0; a < ar0.length;a++) {
											var ar1 = ar0[a].split(':');
											if (ar1[0] == 'height') {
												ar1[1] = 0; 
												ar0[a] = ar1.join(':');
												break;
											}
										}
										td1[3] = ar0.join('§');
										arrTE[j] = td1.join(',');
 										//arrTE[j] = arrTE[j].replace('undefined','');
 										break;
 									}
 								} 
 								
 							} else {
 								var artxt = edH.toString() + ',,,height:0,';
 								arrTE.splice(j,0,artxt);
 								break;
 							
							}
 						} 						
 					}
	    		}   
	    				
	    	} else if (document.getElementById('LPAutoHeight').checked) {
	    		
	    		for (i = 0; i < data.getNumberOfRows(); i++) {
	  	  		if ((stH <= parseInt(data.getValue(i, 0))) && (edH >= parseInt(data.getValue(i, 0)))) {
	  	  			var newPoint = true;
	  	  			var th = parseFloat(data.getValue(i, 2)) - parseFloat(data.getValue(i, 1));
	  	  			th = Math.round(th*10)/10;
	  	  			
	  	  			for (j = 0; j < arrTE.length; j++) {
	  	  				var td1 = arrTE[j].split(',');
	  	  				if (parseInt(data.getValue(i, 0)) == parseInt(td1[0])) {
	  	  					if (typeof td1[3] == 'undefined') { 								
 										td1[3] = 'height:' + th;
 										arrTE[j] = td1.join(',');
 										newPoint = false;					
 										break; 								
 									} else {
 										if (td1[3].indexOf('height:') < 0) {
 											td1[3] += '§height:' + th; 
 										} else {
 											var ar0 = td1[3].split('§');
											for (var a=0; a < ar0.length;a++) {
												var ar1 = ar0[a].split(':');
												if (ar1[0] == 'height') {
													ar1[1] = th; 
													ar0[a] = ar1.join(':');
													break;
												}
											}
											td1[3] = ar0.join('§');
											arrTE[j] = td1.join(',');
	 										newPoint = false;
 											break;
 										}
 									} 	  	  					
	  	  				}	  	  				
	  	  			}
	  	  			if (newPoint) {
	  	  				var artxt = data.getValue(i, 0) + ',,,height:' + th + ',';
	  	  				for (j = 1; j < arrTE.length; j++) {
	  	  					var td1 = arrTE[j].split(',');
	  	  					var td0 = arrTE[j-1].split(',');
	  	  					if ((parseInt(data.getValue(i, 0)) > parseInt(td0[0])) && (parseInt(data.getValue(i, 0)) < parseInt(td1[0]))) {
	  	  						arrTE.splice(j,0,artxt);
	  	  						break;
	  	  					}
	  	  				}
	  	  			}
	  	  		}
	    		}	
				}
	    	
	    	$('#txtPitchDetails').val(arrTE.join('\n'));
	    	//var cw = chart.chartArea.width; 
  			chart.draw(data, {
      		width: wd,
        	height: 200,
        	legend: 'none',
        	titleY: 'Elevation (m)',
        	titleX: 'Distance (m) + ' + $('#txtPitchStartPointAtM').val() + ' m'
     		});	
     						
			});
		    		
		$('#resetTHeight').click(function() {
			$('#setPtHeight').val('');
		 	$('#setPHeightSt').val('');
		 	for (i = 0; i < data.getNumberOfRows(); i++) {
  	 		var nv = parseFloat(data.getValue(i, 1));
  	 		data.setValue(i, 2, nv);
	  	}
	    				
  		chart.draw(data, {
      	width: wd,
        height: 200,
        legend: 'none',
        titleY: 'Elevation (m)',
        titleX: 'Distance (m) + ' + $('#txtPitchStartPointAtM').val() + ' m' 
     	});
		 });

	  $('#setPitchAuto').click(function() {
		  	var pitchA = parseFloat($('#txtCalculatedPitch').val())/1000;
		  	var txtPitchDetails = $('#txtPitchDetails').val();
		  	var arrTE = txtPitchDetails.split('\n');
		    var y1; 
		    var y2;
		    var cgsp = parseInt($('#cgsp').val());
		    var cgep = parseInt($('#cgep').val());
		    			
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
	    	
				// 4 start point    		
	    	
	    	for (j = 0; j < arrTE.length; j++) {
	    		var td1 = arrTE[j].split(',');
 					
 					if (j == 0) {
 						if (cgsp == j) {
 							td1[2] = $('#txtCalculatedPitch').val();
 							arrTE[j] = td1.join(',');
 							arrTE[j] = arrTE[j].replace('undefined',''); 						
 							break;
 						}
 					
 					} else {
 						var td0 = arrTE[j-1].split(',');
 						
 						if ((cgsp >= parseInt(td0[0])) && (cgsp <= parseInt(td1[0]))) {
 							if (cgsp == parseInt(td0[0])) {
 								td0[2] = $('#txtCalculatedPitch').val();
 								arrTE[j-1] = td0.join(',');
 								arrTE[j-1] = arrTE[j-1].replace('undefined','');
 								break;

 							} else if (cgsp == parseInt(td1[0])) {
 								td1[2] = $('#txtCalculatedPitch').val();
 								arrTE[j] = td1.join(',');
 								arrTE[j] = arrTE[j].replace('undefined','');
 								break;
 								
 							} else {
 								var artxt = cgsp.toString() + ',,' + $('#txtCalculatedPitch').val() + ',,';
 								artxt = artxt.replace('undefined','');
 								arrTE.splice(j,0,artxt);
 								break;
 							
							}
 						} 						
 					}
	    	}
	    	
	    	// 4 end point, reset pitch to 0

		    for (j = 0; j < arrTE.length; j++) {
		    	var td1 = arrTE[j].split(',');

 					if (j == 0) {
 						if (cgep == j) {
 							td1[2] = '0';
 							arrTE[j] = td1.join(',');
 							arrTE[j] = arrTE[j].replace('undefined',''); 						
 							break;
 						}
 					
 					} else {
 						var td0 = arrTE[j-1].split(',');
 						
 						if ((cgep >= parseInt(td0[0])) && (cgep <= parseInt(td1[0]))) {
 							if (cgep == parseInt(td0[0])) {
 								td0[2] = '0';
 								arrTE[j-1] = td0.join(',');
 								arrTE[j-1] = arrTE[j-1].replace('undefined','');
 								break;

 							} else if (cgep == parseInt(td1[0])) {
 								td1[2] = '0';
 								arrTE[j] = td1.join(',');
 								arrTE[j] = arrTE[j].replace('undefined','');
 								break;
 								
 							} else {
 								var artxt = cgep.toString() + ',,0,,';
 								artxt = artxt.replace('undefined','');
 								arrTE.splice(j,0,artxt);
 								break;
 							
							}
 						} 						
 					}  					
 				}
							
				$('#txtPitchDetails').val(arrTE.join('\n'));
	    				 
  			chart.draw(data, {
         	width: wd,
          height: 200,
          legend: 'none',
          titleY: 'Elevation (m)',
          titleX: 'Distance (m) + ' + $('#txtPitchStartPointAtM').val() + ' m' 
        });	
	  });		
		  
	  $('#resetPitchAuto').click(function() {
		  	$('#cgsp').val('');
		  	$('#cgep').val('');
		  	$('#txtCalculatedPitch').val('');
		  	var txtPitchDetails = $('#txtPitchDetails').val();
		  	var arrTE = txtPitchDetails.split('\n');

	  });    		
		    		
	  $('#setPitch').click(function() {
		  	var pitchD = parseFloat($('#sBtnpitchRatio').val())/1000;
		  	var txtPitchDetails = $('#txtPitchDetails').val();
		  	var arrTE = txtPitchDetails.split('\n');
		    var cgsp = parseInt($('#setPPoint').val());
		    
		  	var y1; var y2;
		  	for (i = 0; i < data.getNumberOfRows(); i++) {
		  		if (parseInt($('#setPPoint').val()) == parseInt(data.getValue(i, 0))) { 
		  			y1 = parseFloat(data.getValue(i, 2)); 		    				
		  		}
	  			if (parseInt($('#setPPoint').val()) <= parseInt(data.getValue(i, 0))) { 
	  				var y2 = pitchD*(parseInt(data.getValue(i, 0)) - parseInt($('#setPPoint').val())) + y1; 
	  				data.setValue(i, 2, y2);
	  				if (i == data.getNumberOfRows() -1) {
	  	  			$('#LLlastheight').val(y2);
	  	  			$('#LLlastpitch').val(pitchD*1000);
	  				}
	  			}    					
	    	}
	    	
	    	for (j = 0; j < arrTE.length; j++) {
 					var td1 = arrTE[j].split(',');
 					
 					if (j == 0) {
 						if (cgsp == 0) {
 							td1[2] = $('#sBtnpitchRatio').val();
 							arrTE[0] = td1.join(',');
 							arrTE[0] = arrTE[0].replace('undefined','');
 							break;
 						}
 					} else {
 						var td0 = arrTE[j-1].split(',');
 						
 						if ((cgsp >= parseInt(td0[0])) && (cgsp <= parseInt(td1[0]))) {
 							if (cgsp == parseInt(td0[0])) {
 								td0[2] = $('#sBtnpitchRatio').val();
 								arrTE[j-1] = td0.join(',');
 								arrTE[j-1] = arrTE[j-1].replace('undefined','');
 								break;

 							} else if (cgsp == parseInt(td1[0])) {
 								td1[2] = $('#sBtnpitchRatio').val();
 								arrTE[j] = td1.join(',');
 								arrTE[j] = arrTE[j].replace('undefined','');
 								break;
 								
 							} else {
 								var artxt = cgsp.toString() + ',,' + $('#sBtnpitchRatio').val() + ',,';
 								artxt = artxt.replace('undefined','');
 								arrTE.splice(j,0,artxt);
 								break;
 							
							}
 						} 						
 					}

	    	}
	    	
	    	$('#txtPitchDetails').val(arrTE.join('\n'));
	    				 
  			chart.draw(data, {
        	width: wd,
        	height: 200,
        	legend: 'none',
        	titleY: 'Elevation (m)',
        	titleX: 'Distance (m) + ' + $('#txtPitchStartPointAtM').val() + ' m' 
        });	
	  });
		    		
		$('#resetPitch').click(function() {
		   	$('#sBtnpitchRatio').val('0');
		    $('#setPPoint').val('');
		   	for (i = 0; i < data.getNumberOfRows(); i++) {
  	  		var nv = parseFloat(data.getValue(i, 1));
  	  		data.setValue(i, 2, nv);
	    	}
	    	//var cw = chart.chartArea.width; 
  			chart.draw(data, {
        	width: wd,
          height: 200,
          legend: 'none',
          titleY: 'Elevation (m)',
          titleX: 'Distance (m) + ' + $('#txtPitchStartPointAtM').val() + ' m' 
        });
		});	    		

		$('#setPitchStr').click(function() {
				var pitchStr = $('#railPitchStructure').val();
				var start = null; //($("input[@id=pitchStr_Start]:checked")) ? true : false;
//alert(document.getElementById('pitchStr_Start').checked + "\n" + document.getElementById('pitchStr_End').checked);
				switch (true) {
					case (document.getElementById('pitchStr_Start').checked):
						start = true;
						break;
					case (document.getElementById('pitchStr_End').checked):
						start = false;
						break;
					default:
						alert('please select either structure start point or end point, tq');
						return false;
				}
				var strPLIndex = $('#PLstrListIndex').val();
		  	var txtPitchDetails = $('#txtPitchDetails').val();
		  	var arrTE = txtPitchDetails.split('\n');
		    var cgsp = parseInt($('#txtPitchStrP').val());
		    
	    	var spm = false;
	    	if (typeof pitchStr == 'undefined') {
	    		alert('please select the structure type');
	    		return false;	
	    	}
	    	
	    	var strType = (start) ? pitchStr + '_start': pitchStr + '_end';
	    	
	    	for (j = 0; j < arrTE.length; j++) {
	    		var td = arrTE[j].split(',');
 					//update value
 					if (parseInt(td[0]) == cgsp) { 						
 						// 2 do>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
						if (typeof td[4] == 'undefined') { // section no str data - ok
							td[4] = strType + ':' + strPLIndex;
						} else {							
							if (td[4] == '') {
								td[4] = strType + ':' + strPLIndex;	
							} else if (td[4].indexOf(pitchStr) < 0) { // section other str exist but current str not exist
								td[4] += '§' + strType + ':' + strPLIndex;
							} else {								
								// nilai telah sedia wujud, maka buat replacement, cth : strB_start:B2;strA_start:A1;strC_start:C1;
								var ar0 = td[4].split('§'); // jadi array [strB_start:B2,strA_start:A1,strC_start:C1;]
								for (var a=0; a < ar0.length;a++) {
									var ar1 = ar0[a].split(':'); // jadi array [strA_start,A1]
									var ar1_0 = ar1[0].split('_'); // jadi array [strA,start]
									
									if (ar1_0[0] == pitchStr) {
										if (((ar1_0[1] == 'start') && start) || ((ar1_0[1] == 'end') && (!start))) {
											ar1[1] = strPLIndex; 
											ar0[a] = ar1.join(':');
											spm = true;
											break;											
										}
									}
								}
								td[4] = ar0.join('§');
							}								
						}
 						arrTE[j] = td.join(',');
 						arrTE[j] = arrTE[j].replace('undefined','');
 						spm = true;
 						break; 						
 					}
	    	}
	    	
				if (!spm) {
				//insert between 2 value				
 					for (j = 1; j < arrTE.length; j++) {
 						var td0 = arrTE[j-1].split(',');
 						var td1 = arrTE[j].split(',');
 						if ((cgsp >= parseInt(td0[0])) && (cgsp <= parseInt(td1[0]))) {
 							if (cgsp == parseInt(td0[0])) {
								if (typeof td0[4] == 'undefined') {
									td0[4] = strType + ':' + strPLIndex; // section no str data - ok
								} else {
									if (td0[4] == '') {
										td0[4] = strType + ':' + strPLIndex;
									} else if (td0[4].indexOf(pitchStr) < 0) {
										td0[4] += '§' + strType + ':' + strPLIndex; 	// section other str exist but current str not exist
									} else {
										// nilai telah sedia wujud, maka buat replacement, cth : strB_start:B2;strA_start:A1;strC_start:C1;
										var ar0 = td0[4].split('§');  	// jadi array [strB_start:B2,strA_start:A1,strC_start:C1;]
										for (var a=0; a < ar0.length;a++) {
											var ar1 = ar0[a].split(':');	// jadi array [strA_start,A1]
											var ar1_0 = ar1[0].split('_'); // jadi array [strA,start]
										
											if (ar1_0[0] == pitchStr) {
												if (((ar1_0[1] == 'start') && start) || ((ar1_0[1] == 'end') && (!start))) {
													ar1[1] = strPLIndex; 
													ar0[a] = ar1.join(':');
													break;
												}
											}
										}
										td0[4] = ar0.join('§');
									}							
								} 
 								arrTE[j-1] = td0[0] + ',' + td0[1] + ',' + td0[2] + ',' + td0[3] + ',' + td0[4];
 								arrTE[j-1] = arrTE[j-1].replace('undefined','');								
 								break;							 								
 							} else if (cgsp == parseInt(td1[0])) {
								if (typeof td1[4] == 'undefined') {
									td1[4] = strType + ':' + strPLIndex; // section no str data - ok
								} else {
									if (td1[4] == '') {
										td1[4] = strType + ':' + strPLIndex;
									} else if (td1[4].indexOf(pitchStr) < 0) {
										td1[4] += '§' + strType + ':' + strPLIndex; 	// section other str exist but current str not exist
									} else {
										// nilai telah sedia wujud, maka buat replacement, cth : strB_start:B2;strA_start:A1;strC_start:C1;
										var ar0 = td1[4].split('§');  	// jadi array [strB_start:B2,strA_start:A1,strC_start:C1;]
										for (var a=0; a < ar0.length;a++) {
											var ar1 = ar0[a].split(':');	// jadi array [strA_start,A1]
											var ar1_0 = ar1[a].split('_'); // jadi array [strA,start]
										
											if (ar1_0[0] == pitchStr) {
												if (((ar1_0[1] == 'start') && start) || ((ar1_0[1] == 'end') && (!start))) {
													ar1[1] = strPLIndex; 
													ar0[a] = ar1.join(':');
													break;
												}
											}
										}
										td1[4] = ar0.join('§');
									}							
								} 
 								arrTE[j] = td1[0] + ',' + td1[1] + ',' + td1[2] + ',' + td1[3] + ',' + td1[4];
 								arrTE[j] = arrTE[j].replace('undefined','');								
 								break;	 								
 							} else {
 								//2 do
 								var artxt = cgsp.toString() + ',,,,' + strType + ':' + strPLIndex;
 								arrTE.splice(j,0,artxt);
 								break;
 							}
 						}
 					}
				}

	    	$('#txtPitchDetails').val(arrTE.join('\n'));
	    		    
		});
		    		
		$('#resetPitchStr').click(function() {
		  	var txtPitchDetails = $('#txtPitchDetails').val();
		  	var arrTE = txtPitchDetails.split('\n');
		    
		});	
		    	
		$('#railPitchStructure').change(function() {
    		if (typeof $('#railPitchStructure').val() != 'undefined') {
    			var $strLIndex = $('#PLstrListIndex');
    			$strLIndex.empty().append('<option selected>- select structure -</option>');
    			
    			if ($('#railPitchStructure').val() == 'cut') {								
						for (var i=0; i < bvecutObjArr.length; i++) {
    					$strLIndex.append($("<option></option>").attr("value", bvecutObjArr[i][1]).text(bvecutObjArr[i][2]));
    				}
    				
					} else if ($('#railPitchStructure').val() == 'dike') {
						for (var i=0; i < bvedikeObjArr.length; i++) {
    					$strLIndex.append($("<option></option>").attr("value", bvedikeObjArr[i][1]).text(bvedikeObjArr[i][2]));
    				}								
					
					} else if ($('#railPitchStructure').val() == 'bridge') {
			    	for (var i=0; i < bvebridgeObjArr.length; i++) {
							$strLIndex.append($("<option></option>").attr("value", bvebridgeObjArr[i][1]).text(bvebridgeObjArr[i][2]));
    				}								
					
					} else if ($('#railPitchStructure').val() == 'tunnel') {
			    	for (var i=0; i < bvetunnelObjArr.length; i++) {
							$strLIndex.append($("<option></option>").attr("value", bvetunnelObjArr[i][1]).text(bvetunnelObjArr[i][2]));
    				}
						
					} else if($('#railPitchStructure').val() == 'flyover') {
			    	for (var i=0; i < bveFOObjArr.length; i++) {
							$strLIndex.append($("<option></option>").attr("value", bveFOObjArr[i][1]).text(bveFOObjArr[i][2]));
    				} 
						
					} else if ($('#railPitchStructure').val() == 'underground') {
			    	for (var i=0; i < bveUGObjArr.length; i++) {
							$strLIndex.append($("<option></option>").attr("value", bveUGObjArr[i][1]).text(bveUGObjArr[i][2]));
    				}
						
					} else if ($('#railPitchStructure').val() == 'form') {
						for (var i=0; i < bveplatformObjArr.length; i++) {
    					$strLIndex.append($("<option></option>").attr("value", bveplatformObjArr[i][1]).text(bveplatformObjArr[i][2]));
    				}
					
					} else if ($('#railPitchStructure').val() == 'roadcross') {
						for (var i=0; i < bveRCObjArr.length; i++) {
    					$strLIndex.append($("<option></option>").attr("value", bveRCObjArr[i][1]).text(bveRCObjArr[i][2]));
    				}
					
					} 
    	    			
    		}
    });	

		$('#btnSetpitchOp').click(function() {
			var txtPitchDetails = $('#txtPitchDetails').val();
		  var arrTE = txtPitchDetails.split('\n');
		  var miSt = parseInt($('#LLmidxSt').val());
		  var miEd = parseInt($('#LLmidxEd').val());
		  var distanceAtStart = parseInt($('#txtPitchStartPointAtM').val());
		  var polyIDtxt = $('#LLbasePolyID').val();
			var cuvid = '';
			
			$('#dialogRailpitch').dialog('close');
		  var endLtLg = MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(miEd).getPosition();
	
			for (var i = 0; i < arrTE.length; i++) {
				if (arrTE[i] != '') {
					var arr0 = arrTE[i].split(',');
					var pitchStrdistance = distanceAtStart + parseInt(arr0[0]);
					if (i == 0) {
						if (typeof arr0[1] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(miSt).note = arr0[1] }
						if (typeof arr0[2] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(miSt).pitch = arr0[2] }
						if (typeof arr0[3] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(miSt).bve = arr0[3] }
						if (typeof arr0[4] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(miSt).kit = arr0[4] }

					} else if (i == (arrTE.length - 1)) {
						var endidx;
						for (var ei = 0; ei < MapToolbar.features["lineTab"][polyIDtxt].markers.length; ei++) {
							if (MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(ei).getPosition().equals(endLtLg)) {
								endidx = ei;
								break;
							}
						}
						if (typeof endidx == 'undefined') {
							alert('unable to detect end index after reconstruction ...');
							break;
						} 
						if (typeof arr0[1] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).note = arr0[1] }
						if (typeof arr0[2] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).pitch = arr0[2] }
						if (typeof arr0[3] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).bve = arr0[3] }
						if (typeof arr0[4] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).kit = arr0[4] }
						
						if ((typeof $('#LLlastpitch').val() != 'undefined') && (typeof $('#LLlastheight').val() != 'undefined') && (typeof $('#LLlastheightratio').val() != 'undefined')) {
							if (($('#LLlastpitch').val() != '') && ($('#LLlastheight').val() != '') && ($('#LLlastheightratio').val() != '')) {
								if ((MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).kit == null) || (MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).kit =='')) {
									MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).kit += 'lastpitch:' + $('#LLlastpitch').val();
									MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).kit += '§lastheight:' + $('#LLlastheight').val();
									MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).kit += '§lastheightratio:' + $('#LLlastheightratio').val();

								} else {
										if (MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).kit.indexOf('lastpitch:') < 0) {
											MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).kit += '§lastpitch:' + $('#LLlastpitch').val();
											MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).kit += '§lastheight:' + $('#LLlastheight').val();
											MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).kit += '§lastheightratio:' + $('#LLlastheightratio').val();

										} else {
											var kitArr = MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).kit.split('§');
											for (kI = 0; kI < kitArr.length; kI++) {
												//2do
												if (kitArr[kI].indexOf('lastpitch:') >= 0) {
													var kitPart = kitArr[kI].split(':');
													kitPart[1] = $('#LLlastpitch').val();
													kitArr[kI] = kitPart[0] + ':' + kitPart[1];
												}
												if (kitArr[kI].indexOf('lastheight:') >= 0) {
													var kitPart = kitArr[kI].split(':');
													kitPart[1] = $('#LLlastheight').val();
													kitArr[kI] = kitPart[0] + ':' + kitPart[1];
												}
												if (kitArr[kI].indexOf('lastheightratio:') >= 0) {
													var kitPart = kitArr[kI].split(':');
													kitPart[1] = $('#LLlastheightratio').val();
													kitArr[kI] = kitPart[0] + ':' + kitPart[1];
												}												
											}
											MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).kit = kitArr.join('§');
										}
																	
								}
							}
						}

						MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).setIcon("images/marker_squared_edit.png");
						
						MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).setDraggable(false);
	        //));
						
					} else {
						//2 do detect current curve, if point on curve line create and set data
						if (typeof arr0[4] != 'undefined') {
							if ((arr0[4].indexOf('curve') >= 0) || ((arr0[4].indexOf('tcurve') >= 0))){
								var arrOnC = arr0[4].split('§');
								var cuvmod = '';
								for (var k =0; k< arrOnC.length; k++) {
									if ((arrOnC[k].indexOf('curve') == 0) || ((arrOnC[k].indexOf('tcurve') == 0))){
										var arrcuv = arrOnC[k].split(':');									
										if (arrcuv[1] == 'start') {
											cuvid = arrcuv[2];
											cuvmod = arrcuv[1];
										} else if (arrcuv[1] == 'end') {
											cuvid = '';
											cuvmod = arrcuv[1];
										}
									}
								}
								//2 do get curve and update edge marker
								if (cuvid.split('_')[0] == 'curve') {
									if (cuvmod == 'start') {
										if (typeof arr0[1] != 'undefined') { MapToolbar.features["curveTab"][cuvid].markers.getAt(0).note = arr0[1]; }
										if (typeof arr0[2] != 'undefined') { MapToolbar.features["curveTab"][cuvid].markers.getAt(0).pitch = arr0[2]; }
										if (typeof arr0[3] != 'undefined') { MapToolbar.features["curveTab"][cuvid].markers.getAt(0).bve = arr0[3]; }
										if (typeof arr0[4] != 'undefined') { MapToolbar.features["curveTab"][cuvid].markers.getAt(0).kit = arr0[4]; }
									} else if (cuvmod == 'end') {
										var cendId = -1;
										for (var f = 1; f < MapToolbar.features["curveTab"][cuvid].markers.length; f++) {
											if (MapToolbar.features["curveTab"][cuvid].markers.getAt(f).kit.indexOf('curve:end:'+cuvid) >= 0) {
												cendId = f;
												break;
											}
										}
										if (cendId > 0) {
											if (typeof arr0[1] != 'undefined') { MapToolbar.features["curveTab"][cuvid].markers.getAt(cendId).note = arr0[1]; }
											if (typeof arr0[2] != 'undefined') { MapToolbar.features["curveTab"][cuvid].markers.getAt(cendId).pitch = arr0[2]; }
											if (typeof arr0[3] != 'undefined') { MapToolbar.features["curveTab"][cuvid].markers.getAt(cendId).bve = arr0[3]; }
											if (typeof arr0[4] != 'undefined') { MapToolbar.features["curveTab"][cuvid].markers.getAt(cendId).kit = arr0[4]; }
										}
									}
								} else if (cuvid.split('_')[0] == 'tcurve') {
									if (cuvmod == 'start') {
										if (typeof arr0[1] != 'undefined') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(0).note = arr0[1]; }
										if (typeof arr0[2] != 'undefined') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(0).pitch = arr0[2]; }
										if (typeof arr0[3] != 'undefined') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(0).bve = arr0[3]; }
										if (typeof arr0[4] != 'undefined') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(0).kit = arr0[4]; }
									} else if (cuvmod == 'end') {
										var cendId = -1;
										for (var f = 1; f < MapToolbar.features["tcurveTab"][cuvid].markers.length; f++) {
											if (MapToolbar.features["tcurveTab"][cuvid].markers.getAt(f).kit.indexOf('tcurve:end:'+cuvid) >= 0) {
												cendId = f;
												break;
											}
										}
										if (cendId > 0) {
											if (typeof arr0[1] != 'undefined') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(cendId).note = arr0[1]; }
											if (typeof arr0[2] != 'undefined') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(cendId).pitch = arr0[2]; }
											if (typeof arr0[3] != 'undefined') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(cendId).bve = arr0[3]; }
											if (typeof arr0[4] != 'undefined') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(cendId).kit = arr0[4]; }
										}
									}
								}

							} else {
								if (cuvid == '') {
									
									var bPoly = MapToolbar.features["lineTab"][polyIDtxt];
									var allPoints = bPoly.getPath().getArray();
									if (miEd >= allPoints.length ) { alert('over flow'); return false;}
									for (var j= miSt; j <= miEd; j++) {
										//cek, debug dan rebuild algoritma kat sini
										// ok kalau tengah line, tapi ko bila 2 point saja
										var distancePrv = (j == 0)? 0: Math.ceil(parseFloat(getTrackDistanceFromStart(polyIDtxt, j -1).line));
										var distanceNow = Math.ceil(parseFloat(getTrackDistanceFromStart(polyIDtxt, j).line));										
										if ((distancePrv <= pitchStrdistance) && (pitchStrdistance <= distanceNow)) {
											if (pitchStrdistance == distanceNow) {
												if (typeof arr0[1] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).note = arr0[1]; }
												if (typeof arr0[2] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).pitch = arr0[2]; }
												if (typeof arr0[3] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).bve = arr0[3]; }
												if (typeof arr0[4] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).kit = arr0[4]; }
												break;
											} else {
												//2 create new point
												//calc new point based on distance from previus point
												var newPoffset = pitchStrdistance - distancePrv;
												var hd = google.maps.geometry.spherical.computeHeading(allPoints[j-1],allPoints[j]);
												var newPLatLng = google.maps.geometry.spherical.computeOffset(allPoints[j-1], newPoffset, hd);	
												MapToolbar.addPoint(newPLatLng, bPoly, j);
												miEd++;
												if (allPoints.length <= MapToolbar.features["lineTab"][polyIDtxt].getPath().getArray().length) { //array checking
													// array expanded - OK
													if (typeof arr0[1] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).note = arr0[1]; }
													if (typeof arr0[2] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).pitch = arr0[2]; }
													if (typeof arr0[3] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).bve = arr0[3]; }
													if (typeof arr0[4] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).kit = arr0[4]; }
													
													break;
												} else {
													alert("warning array not updated!");
													return false;
												}
											}
										}
									}
			
								} else {
									// first get curve details and curve starting point
									var bPoly = MapToolbar.features["lineTab"][polyIDtxt];
									var allPoints = bPoly.getPath().getArray();
									if (miEd >= allPoints.length ) { alert('over flow'); return false;}
									var midx;
									var cuvtype = cuvid.split('_')[0];
									//get curve line index
									for (var j= miSt; j <= miEd; j++) {    		
									/* 'curve:'+ curve.id + '§radius:' + preR * dir + '§cant:' + parseFloat($('#sBtnRCCant').val()) + '§limit:' + parseFloat($('#sBtnRCDesignSpeed').val()) + '§tlength:' + l2m1 + '§clength:' + arcL + '§center:' + Cc.lat() + '/' + Cc.lng() + '§start_point:' + extp[0].lat() + '/' + extp[0].lng() + '§end_point:' + extp[extp.length-1].lat() + '/' + extp[extp.length-1].lng()  + '§h1:' + h1 + '§h2:' + h2 + '§forceSL:' + enforceSL; */
										if (bPoly.markers.getAt(j).curve != null) {
							    		var arr = bPoly.markers.getAt(j).curve.split('§');
							    		if (arr[0].split(':')[1] == cuvid){ midx = j; break;}
										} else if  (bPoly.markers.getAt(j).tcurve != null) {
											var arr = bPoly.markers.getAt(j).tcurve.split('§');
							    		if (arr[0].split(':')[1] == cuvid){ midx = j; break; }
										}
									}
									if (typeof midx != 'undefined') {
										if (cuvtype == 'curve') {
											var arr = bPoly.markers.getAt(midx).curve.split('§');
											var cR = Math.abs(parseFloat(arr[1].split(':')[1]));
											var tL = parseFloat(arr[4].split(':')[1]);
											var cL = parseFloat(arr[5].split(':')[1]);
											var xpc = new google.maps.LatLng(parseFloat(arr[6].split(':')[1].split('/')[0]), parseFloat(arr[6].split(':')[1].split('/')[1]));
											var xp1 = new google.maps.LatLng(parseFloat(arr[7].split(':')[1].split('/')[0]), parseFloat(arr[7].split(':')[1].split('/')[1]));
											var xp2 = new google.maps.LatLng(parseFloat(arr[8].split(':')[1].split('/')[0]), parseFloat(arr[8].split(':')[1].split('/')[1]));
											var xh1 = parseFloat(arr[9].split(':')[1]);
											var xh2 = parseFloat(arr[10].split(':')[1]);

											//2do calc distance etc .... 4/12/2012
											var midxD = parseFloat(getTrackDistanceFromStart(polyIDtxt, j).line);
											var cvStD = Math.ceil(midxD - tL);
											var cvEdD = Math.ceil(midxD - tL + cL);
											
											if ((cvStD <= pitchStrdistance) && (pitchStrdistance <= cvEdD)) {
												//cek adakah ia jatuh pada marker sedia ada????
												
												if (pitchStrdistance == cvStD) {
													// sepatutnya tak sampai ke sini lagi dah, tapi kalau sampai gak ...
													alert('repeating ending ????');

												} else if (pitchStrdistance == cvEdD) {
													// sepatutnya tak sampai ke sini lagi dah, tapi kalau sampai gak ...
													alert('repeating ending ????');
												
												} else {
													var cpoly = MapToolbar.features["curveTab"][cuvid];
													var onCurveMarker = false;
													
													for (var c = 1; c < cpoly.markers.length; c++) {									
														if ((typeof cpoly.markers.getAt(c).ld1 != 'undefined') || (typeof cpoly.markers.getAt(c).ld2 != 'undefined' )) { // marker on curve
															
															if (cpoly.markers.getAt(c).kit.indexOf('cmi:') >= 0) { // on current marker
																
																if (pitchStrdistance == Math.ceil(midxD - tL + parseFloat(cpoly.markers.getAt(c).ld1))) {
																	if (typeof arr0[1] != 'undefined') { cpoly.markers.getAt(c).note = arr0[1]; }
																	if (typeof arr0[2] != 'undefined') { cpoly.markers.getAt(c).pitch = arr0[2]; }
																	if (typeof arr0[3] != 'undefined') { cpoly.markers.getAt(c).bve = arr0[3]; }
																	if (typeof arr0[4] != 'undefined') { cpoly.markers.getAt(c).kit = arr0[4]; }
																	onCurveMarker = true;
																	break;	
																										
																} else {
																	//alert((pitchStrdistance/Math.ceil(midxD - tL + parseFloat(cpoly.markers.getAt(c).ld1))));
																	
																}																
															}
														}
													}
													
													if (!onCurveMarker) {
														//2 create new point
														
														var sL = pitchStrdistance - cvStD;
														var segA = (360 * sL) / (2 * Math.PI * cR);
														var cStH = google.maps.geometry.spherical.computeHeading(xpc,xp1);
														var cEdH = google.maps.geometry.spherical.computeHeading(xpc,xp2);
														var cXxH;
														
														var nwP;
	
	// sorry for a long code, i just want to make sure that i dont get confuse and the algorithm is mess up
	// this algorithm will be simplified (إن شاء الله) if every thing running as OK without any error and running as expected
	if (cStH >= 0) { // +ve bearing cStH
		if ((cStH > 0) && (cStH < 90)) {
			// ****************** cStH 0 ~ 90
			if (cEdH < 0) {
				switch (true) {
  				case (cEdH == -180):
    				nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
    				break;
  				case (cEdH == -90):
    				nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
    				break;
  				case (cEdH >-90):
    				nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
    				break;
  				case (cEdH > -180):    				
    				if (cEdH > cStH - 180) { 
    					nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);	
    				} else {
    					var cxH = cStH + segA;
    					if (cxH > 180) {
    						cxH -=360;
    					}
    					nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cxH);    					
    				}    		
    				break;    						
				}				
			} else {
				switch (true) {
					case (cEdH == 0):
  					nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
  					break;
					case (cEdH < 90):
  					if (cEdH < cStH) { 
  						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
  					} else {
  						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
  					}
  					break;
  				case (cEdH == 90):
    				nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
  		  		break;
  				case (cEdH < 180):
    				nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
    				break;
  				case (cEdH == 180):
    				nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
    				break;
  			}				
			}
			
		} else if (cStH == 90) {
			// *********************** cStH 90			
			if (cEdH < 0) {
				switch (true) {
  				case (cEdH == -180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
    				break;
  				case (cEdH == -90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
    				break;
  				case (cEdH >-90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
    				break;
  				case (cEdH > -180):
  					var cxH = cStH + segA;
    					if (cxH > 180) {
    						cxH -=360;
    					}
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cxH);
    				break;
				}
			} else {
				switch (true) {
					case (cEdH == 0):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
  					break;
					case (cEdH < 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
  					break;
  				case (cEdH == 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
  		  		break;
  				case (cEdH < 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
    				break;
  				case (cEdH == 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
    				break;
  			}			 		 				
			}
			
		} else if ((cStH > 90) && (cStH < 180)) {
			// **************** cStH 90 ~ 180
			
			if (cEdH < 0) {			
				switch (true) {
  				case (cEdH ==-180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
    				break;
  				case (cEdH == -90):
  				
						var cxH = cStH + segA;
    					if (cxH > 180) {
    						cxH -=360;
    					}
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cxH);
    				break;
  				case (cEdH >-90):						
						if ( cEdH >= cStH - 180) {
							nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
						} else {
					 		var cxH = cStH + segA;
    					if (cxH > 180) {
    						cxH -=360;
    					}
							nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cxH);
						} 
    				break;
  				case (cEdH >-180):
						var cxH = cStH + segA;
    				if (cxH > 180) {
    					cxH -=360;
    				}
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cxH);
    				break;
				}
			} else {
				switch (true) {
					case (cEdH == 0):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
  					break;
					case (cEdH < 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
  					break;
  				case (cEdH == 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
  		  		break;
  				case (cEdH < 180):						
						if (cEdH < cStH) {
							nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
						} else {
							nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
						}
    				break;
  				case (cEdH == 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
    				break;
  			}				
			}			
		
		} else if (cStH == 180) {
			// *********************** cStH : 180
			
			if (cEdH < 0) {			
				switch (true) {
  				case (cEdH ==-180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
    				break;
  				case (cEdH == -90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
    				break;
  				case (cEdH >-90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
    				break;	
  				case (cEdH >-180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
    				break;
    		}		
			} else {
				switch (true) {	
					case (cEdH == 0):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
  					break;
					case (cEdH < 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
  					break;
		  		case (cEdH == 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		  		  break;
  				case (cEdH < 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
    				break;
		  		case (cEdH == 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
    				break;
 		 		}
			}
		
		} else {
			// *********************** cStH 0
			
			if (cEdH < 0) {			
				switch (true) {
  				case (cEdH ==-180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
  				case (cEdH == -90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
		  		case (cEdH > -90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
    				break;
		  		case (cEdH > -180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
    				break;
				}
			} else {
				switch (true) {
					case (cEdH == 0):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
  					break;
					case (cEdH < 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
  					break;
		  		case (cEdH == 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
  		  		break;
		  		case (cEdH < 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
    				break;
		  		case (cEdH == 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
    				break;
  			}	
			}
		
		}
	} else {  // *************************************************************************** -ve bearing cStH *****************************
		if ((cStH < 0) && (cStH > -90)) {
			// *********************** cStH 0 ~ -90
			
			if (cEdH < 0) {
				switch (true) {
  				case (cEdH ==-180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
  				case (cEdH == -90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
		  		case (cEdH > -90):						
						if (cEdH < cStH) {
							nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
						} else {
							nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
						}	
    				break;
  				case (cEdH >-180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
				}			
			} else {
				switch (true) {
					case (cEdH == 0):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
  					break;
  				case (cEdH == 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
  		  		break;
					case (cEdH < 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
  					break;
  				case (cEdH < 180):						
						if (cEdH < cStH + 180) {
							nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
						} else {
							var cxH = cStH - segA;
    					if (cxH < -180) {
    						cxH +=360;
    					}
							nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cxH);
						}
    				break;
  				case (cEdH == 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
    				break;
  			}				
			}

		} else if (cStH == -90) {
			// *********************** cStH -90
			
			if (cEdH < 0) {			
				switch (true) {
  				case (cEdH ==-180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
  				case (cEdH == -90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
  				case (cEdH >-90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		    		break;	
		  		case (cEdH >-180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
    				break;
    		}		
			} else {
				switch (true) {
					case (cEdH == 0):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		  			break;
					case (cEdH < 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		  			break;
  				case (cEdH == 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		  		  break;
		  		case (cEdH < 180):
		  			var cxH = cStH - segA;
    				if (cxH < -180) {
    					cxH +=360;
    				}
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cxH);						
		    		break;
		  		case (cEdH == 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
  			}				
			}
				  					
		} else if ((cStH < -90) && (cStH > -180)) {
			// *********************** cStH -90 ~ 180
			
			if (cEdH < 0) {			
				switch (true) {
  				case (cEdH ==-180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
		  		case (cEdH == -90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		    		break;
		  		case (cEdH >-90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		    		break;
  				case (cEdH >-180):						
						if (cEdH < cStH) {
							nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
						} else {
							nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
						}
    				break;
				}
			} else {
				switch (true) {
					case (cEdH == 0):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		  			break;
					case (cEdH < 90):						
						if (cEdH < cStH + 180) {
							nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
						} else {
							var cxH = cStH - segA;
    					if (cxH < -180) {
    						cxH +=360;
    					}
							nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cxH);
						}
		  			break;
  				case (cEdH == 90):
						var cxH = cStH - segA;
    				if (cxH < -180) {
    					cxH +=360;
    				}
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cxH);
		  		  break;
		  		case (cEdH < 180):
						var cxH = cStH - segA;
    				if (cxH < -180) {
    					cxH +=360;
    				}
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cxH);
		    		break;
		  		case (cEdH == 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
  			}			
			}
							
		} else if (cStH == -180) {
			// *********************** cStH ~180/180
			
			if (cEdH < 0) {			
				switch (true) {
		  		case (cEdH ==-180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		    		break;
		  		case (cEdH == -90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		    		break;
		  		case (cEdH >-90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		    		break;
		  		case (cEdH >-180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		    		break;
    		}			
			} else {
				switch (true) {
					case (cEdH == 0):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, -cStH - segA);
  					break;
					case (cEdH < 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, -cStH - segA);
		  			break;
  				case (cEdH == 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, -cStH - segA);
		  		  break;
  				case (cEdH < 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, -cStH - segA);
		    		break;
  				case (cEdH == 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, -cStH - segA);
		    		break;
  			}							
			}
			
		} else {
			// *********************** cStH 0
			
			if (cEdH < 0) {			
				switch (true) {
		  		case (cEdH ==-180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
		  		case (cEdH == -90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
		  		case (cEdH >-90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
  				case (cEdH >-180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH - segA);
		    		break;
				}
			} else {
				switch (true) {
					case (cEdH == 0):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		  			break;
					case (cEdH < 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		  			break;
		  		case (cEdH == 90):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		  		  break;
		  		case (cEdH < 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		    		break;
		  		case (cEdH == 180):
						nwP = google.maps.geometry.spherical.computeOffset(xpc, cR, cStH + segA);
		    		break;
  			}				
			}
			
		}		
	}														

														btnAddMarker2Polyline(cuvid,nwP.lat(),nwP.lng());
														for (var c = 1; c < cpoly.markers.length; c++) {									
															if (cpoly.markers.getAt(c).getPosition().equals(nwP)) {
																if (typeof arr0[1] != 'undefined') { cpoly.markers.getAt(c).note = arr0[1]; }
																if (typeof arr0[2] != 'undefined') { cpoly.markers.getAt(c).pitch = arr0[2]; }
																if (typeof arr0[3] != 'undefined') { cpoly.markers.getAt(c).bve = arr0[3]; }
																if (typeof arr0[4] != 'undefined') { cpoly.markers.getAt(c).kit = arr0[4]; }																	
															}
														}															
													}
													
												}
											}
											
										} else if (cuvtype == 'tcurve') {
											var arr = bPoly.markers.getAt(midx).tcurve.split('§');
											
											
										}
									} else {
										alert('unable to get curve reference');
									}
								}
							}
						} else {
							
						}
					}
				}
			}
			
		});	
		  
		$('#resetPitchAll').click(function() {
		  	var txtPitchDetails = $('#txtPitchDetails').val();
		  	var arrTE = txtPitchDetails.split('\n');
		    
		});		
				
		$('#btnUpdateTrackSetting').click(function() {
		  var pid = $('#dtsv_lineid').val();
			var poly = MapToolbar.features["lineTab"][pid];
			
			if ($('#dtsv_trackname').val() != '') { poly.trackname = $('#dtsv_trackname').val(); } else { poly.trackname = null; }
			if ($('#dtsv_trackservice').val() != '') { 
				poly.trackservice = $('#dtsv_trackservice').val(); 
				//2do 
				//'track_services'
				//kalau servis tiada dalam senarai, add kalau dah ada x perlu add
			} else {
				poly.trackservice = null; 
			}
			if ($('#dtsv_tracknumber').val() != '') { poly.trackno = $('#dtsv_tracknumber').val(); } else { poly.trackno = null; }
			if ($('#dtsv_trackSection').val() != '') { poly.tracksection = $('#dtsv_trackSection').val(); } else { poly.tracksection = null; }

			var arrTxt = '';
			
			if ($('#dtsv_trackGauge').val() != '') { 
				arrTxt += 'gauge:' + $('#dtsv_trackGauge').val() + '§';
			} 

			if ($('#dtsv_runningTrain').val() != '') { 
				arrTxt += 'train:' + $('#dtsv_runningTrain').val() + '§';
			} 
			
			if ($('#dtsv_railtypedefault').val() != '') { 
				arrTxt += 'defaultrailindex:' + $('#dtsv_railtypedefault').val() + '§';
			} 			

			if ($('#dtsv_devID').val() != '') { 
				arrTxt += 'devID:' + $('#dtsv_devID').val();
			}

			if (arrTxt != '') { poly.trackbve = arrTxt; } else { poly.trackbve = null;}
	
			if ($('#dtsv_note').val() != '') { poly.note = $('#dtsv_note').val(); } else { poly.note = null; }
			
			$('#dialogTrackSetting').dialog('close');
			alert('track setting updated');
			$('#dtsv_lineid').val('');
			$('#dtsv_trackname').val('');
			$('#dtsv_trackservice').val('');
			$('#dtsv_tracknumber').val('');
			$('#dtsv_trackSection').val('');
			$('#dtsv_trackGauge').val('');
			$('#dtsv_railtypedefault').val('');
			$('#dtsv_runningTrain').val('');
			$('#dtsv_devID').val('');
			$('#dtsv_note').val('');
		});
		
		$('#btnUpdateMarkerSetting').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var dms_service = $('#dms_service').val();
			var lockedmarker = (document.getElementById('pitchStr_End').checked)? true : false;
			var dms_railindex;
			
			for (i = 0; i < bverailobjArr.length; i++) {
				if (typeof $('#dms_railindex option:selected').val() != 'undefined') {
					var defaultRail = $('#dms_railindex option:selected').text();
					if ( defaultRail == bverailobjArr[i][2] ) { 
						dms_railindex = i; 
						break;
					}
				}	
			}
			
			var dms_poleindex = $('#').val();
			var dms_GBstr = $('#').val();
			var dms_objtype = $('#').val();
			var dms_objindex = $('#').val();
			var dms_leftX = $('#dms_leftX').val();
			var dms_rightX = $('#dms_rightX').val();
			var dms_heightX = $('#dms_heightX').val();
			var dms_repeatCount = $('#dms_repeatCount').val();
			var dms_repeatX = $('#dms_repeatX').val();
			var dms_note = $('#dms_note').val();
			
		});
		
		$('#btnAddPointsNDraw').click(function() {
			if ((($('#dap_1lat').val() !='') && ($('#dap_1lng').val() !='')) && (($('#dap_2lat').val() !='') && ($('#dap_2lng').val() !=''))) {
				var lat1 = parseFloat($('#dap_1lat').val());
				var lng1 = parseFloat($('#dap_1lng').val());
				var lat2 = parseFloat($('#dap_2lat').val());
				var lng2 = parseFloat($('#dap_2lng').val());
				var checkOK = (((lat1 != NaN) && (lng1 != NaN)) && ((lat2 != NaN) &&  (lng2 != NaN)))? true : false;
				
				if (checkOK) {
					var pointA =  new google.maps.LatLng(lat1,lng1);
					var pointB = new google.maps.LatLng(lat2,lng2);
									
					MapToolbar.initFeature('line');
					MapToolbar.stopEditing();
					
					var no = MapToolbar['lineCounter'];
					var pno = 'line_' + no;
					alert('pno : '+pno);
					var poly = MapToolbar.features["lineTab"][pno];
					alert(poly.id);
					MapToolbar.addPoint(pointA, poly, 0); 
					MapToolbar.addPoint(pointB, poly, 1); 
	 				
	 				alert(MapToolbar.features["lineTab"][pno].markers.length);
	 				jQuery('#dialogAddPoint').dialog('close');
	 				
				} else {
					alert('please enter latitude and longitude value properlly! NaN error, unable to translate inputs to numbers.');	
				}
				
			} else {
				alert('please fill all fields with appropriate latitude and longitude value!');
			}
		});
		
		// dialog insert crossing
		$('#dInsC_OK').click(function() {		
			if (document.getElementById('dInsC_Crossing').value != '') {
				var pid = $('#dInsC_PID').val(); 
				var mIdx = parseInt($('#dInsC_MID').val());
				var kitdata  = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit;
				
				if (typeof kitdata == 'undefined') {
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = 'roadcross_start' + ':' + $('#dInsC_Crossing').val();
				} else {
					if ((kitdata == null) || (kitdata == '')) {
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = 'roadcross_start' + ':' + $('#dInsC_Crossing').val();
					} else if (kitdata.indexOf('roadcross') < 0) { // section other str exist but current str not exist
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit += '§' + 'roadcross_start' + ':' + $('#dInsC_Crossing').val();
					} else {
						// nilai telah sedia wujud, maka buat replacement, cth : strB_start:B2;strA_start:A1;strC_start:C1;
						var ar0 = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit.split('§'); // jadi array [strB_start:B2,strA_start:A1,strC_start:C1;]
						
						for (var a=0; a < ar0.length;a++) {
							var ar1 = ar0[a].split(':'); // jadi array [strA_start,A1]
							var ar1_0 = ar1[0].split('_'); // jadi array [strA,start]
									
							if (ar1_0[0] == 'roadcross') {
								ar1[1] = $('#dInsC_Crossing').val(); 
								ar0[a] = ar1.join(':');
								break;
							}
						}
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = ar0.join('§');						 
					}
				}
			}
			alert('road crossing ' + $('#dInsC_Crossing').val() + ' was inserted at ' + pid + '(' + mIdx + ')');
			$('#dialogInsertCrossing').dialog('close');
		});

		$('#dInsC_KO').click(function() {
			$('#dialogInsertCrossing').dialog('close');
		});			

		// dialog insert Bridge
		$('#dInsB_OK').click(function() {
			if (document.getElementById('dInsB_bridge').value != '') {
				var pitchStr = 'bridge';
				var pid = $('#dInsB_PID').val(); 
				var mIdx = parseInt($('#dInsB_MID').val());
				var kitdata  = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit;
				var start = null; 
				switch (true) {
					case (document.getElementById('dInsB_start').checked):
						start = true;
						break;
					case (document.getElementById('dInsB_end').checked):
						start = false;
						break;
					default:
						alert('please select either structure start point or end point, tq');
						return false;
				}
				
				var strType = (start) ? pitchStr + '_start': pitchStr + '_end';
					
				if (typeof kitdata == 'undefined') {
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = strType + ':' + $('#dInsB_bridge').val() + ':' + $('#dInsB_BL').val();
				} else {
					if ((kitdata == null) || (kitdata == '')) {
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = strType + ':' + $('#dInsB_bridge').val() + ':' + $('#dInsB_BL').val() ;
					} else if (kitdata.indexOf(pitchStr) < 0) { // section other str exist but current str not exist
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit += '§' + strType + ':' + $('#dInsB_bridge').val() + ':' + $('#dInsB_BL').val() ;
					} else {
						// nilai telah sedia wujud, maka buat replacement, cth : strB_start:B2;strA_start:A1;strC_start:C1;
						var ar0 = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit.split('§'); // jadi array [strB_start:B2,strA_start:A1:A2:A3,strC_start:C1;]
						
						for (var a=0; a < ar0.length;a++) {
							var ar1 = ar0[a].split(':'); // jadi array [strA_start,A1,A2,A3]
							var ar1_0 = ar1[0].split('_'); // jadi array [strA,start]
									
							if (ar1_0[0] == pitchStr) {
								if (((ar1_0[1] == 'start') && start) || ((ar1_0[1] == 'end') && (!start))) {
									ar1[1] = $('#dInsB_bridge').val(); 
									ar1[2] = $('#dInsB_BL').val();
									ar0[a] = ar1.join(':');
									break;
								}
							}
						}
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = ar0.join('§');						 
					}
				}
				
				if (document.getElementById('dInsB_incRiver').checked == true) {
					var bvedata  = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve;
				
					if (typeof bvedata == 'undefined') {
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve =  'river:' + $('#dInsB_river').val() ;
					} else {
						if ((bvedata == null) || (bvedata == '')) {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve = 'river:' + $('#dInsB_river').val() ;
						} else if (bvedata.indexOf('river') < 0) { // section other str exist but current str not exist
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve += '§' + 'river:' + $('#dInsB_river').val() ;
						} else {
							// nilai telah sedia wujud, maka buat replacement, cth : strB_start:B2;strA_start:A1;strC_start:C1;
							var ar0 = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve.split('§'); // jadi array [strB:B2,strA:A1,strC:C1;]
						
							for (var a=0; a < ar0.length;a++) {
								var ar1 = ar0[a].split(':'); // jadi array [strA,A1]
									
								if (ar1[0] == 'river') {
									ar1[1] = $('#dInsB_river').val(); 
									ar0[a] = ar1.join(':');
									break;
								}
							}
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve = ar0.join('§');						 
						}
					}					
				}

			}
			alert('bridge ' + $('#dInsB_bridge').val() + ' was inserted at ' + pid + '(' + mIdx + ')');	
			$('#dialogInsertBridge').dialog('close');
		});

		$('#dInsB_KO').click(function() {
			$('#dialogInsertBridge').dialog('close');
		});
		
		$('#dInsB_bridge').change(function() {
			if (document.getElementById('dInsB_bridge').value != '') {
				for (i = 0; i < bvebridgeObjArr.length; i++) {					
					if (bvebridgeObjArr[i][1] == document.getElementById('dInsB_bridge').value) {
						$('#dInsB_BL').val(bvebridgeObjArr[i][9]);
						document.getElementById('bridgeImg').src = 'images/' + bvebridgeObjArr[i][3];
						break;
					}					
				}
			}
		});
		
		$('#dInsB_river').change(function() {
			if (document.getElementById('dInsB_river').value != '') {
				for (i = 0; i < bvebveStrOjArr.length; i++) {					
					if (bvebveStrOjArr[i][3] == 'River') {
						if (bvebveStrOjArr[i][1] == document.getElementById('dInsB_river').value) {
							document.getElementById('bridgeRiverImg').src = 'images/' + bvebveStrOjArr[i][4];
							break;
						} 
					}					
				}
			}
		});

		// dialog insert overbridge
		$('#dInsOb_OK').click(function() {
			if (document.getElementById('dInsOb_overbridge').value != '') {
				var pid = $('#dInsOb_PID').val(); 
				var mIdx = parseInt($('#dInsOb_MID').val());
				var kitdata  = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit;
				var distance_correction =($('#dInsOb_Lm').val() != '')? $('#dInsOb_Lm').val() : 0;
				var angle_correction = ($('#dInsOb_RA').val() != '')? $('#dInsOb_RA').val() : 0;
				
				if (typeof kitdata == 'undefined') {
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = 'overbridge_start' + ':' + $('#dInsOb_overbridge').val() + ':' + distance_correction + ':' + angle_correction;
				} else {
					if ((kitdata == null) || (kitdata == '')) {
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = 'overbridge_start' + ':' + $('#dInsOb_overbridge').val() + ':' + distance_correction + ':' + angle_correction;
					} else if (kitdata.indexOf('overbridge') < 0) { // section other str exist but current str not exist
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit += '§' + 'overbridge_start' + ':' + $('#dInsOb_overbridge').val() + ':' + distance_correction + ':' + angle_correction;
					} else {
						// nilai telah sedia wujud, maka buat replacement, cth : strB_start:B2;strA_start:A1;strC_start:C1;
						var ar0 = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit.split('§'); // jadi array [strB_start:B2,strA_start:A1:A2:A3,strC_start:C1;]
						
						for (var a=0; a < ar0.length;a++) {
							var ar1 = ar0[a].split(':'); // jadi array [strA_start,A1,A2,A3]
							var ar1_0 = ar1[0].split('_'); // jadi array [strA,start]
									
							if (ar1_0[0] == 'overbridge') {
								ar1[1] = $('#dInsOb_overbridge').val(); 
								ar0[a] = ar1.join(':');
								break;
							}
						}
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = ar0.join('§');						 
					}
				}
			}
			alert('overbridge ' + $('#dInsOb_overbridge').val() + ' was inserted at ' + pid + '(' + mIdx + ')');			
			$('#dialogInsertOverbridge').dialog('close');
		});

		$('#dInsOb_KO').click(function() {
			$('#dialogInsertOverbridge').dialog('close');
		});
		
		$('#dInsOb_overbridge').change(function() {
			if (document.getElementById('dInsOb_overbridge').value != '') {
				for (i = 0; i < bvefreeObjArr.length; i++) {					
					if (bvefreeObjArr[i][3] == 'Structure') {
						if (bvefreeObjArr[i][1] == document.getElementById('dInsOb_overbridge').value) {
							document.getElementById('overbridgeImg').src = 'images/' + bvefreeObjArr[i][4];
							break;
						} 
					}					
				}
			}
		});		

		// dialog insert river
		$('#dInsR_OK').click(function() {
			var pid = $('#dInsR_PID').val(); 
			var mIdx = parseInt($('#dInsR_MID').val());
			var bvedata  = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve;
				
			if (typeof bvedata == 'undefined') {
				MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve =  'river:' + $('#dInsR_river').val() ;
			} else {
				if ((bvedata == null) || (bvedata == '')) {
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve = 'river:' + $('#dInsR_river').val() ;
				} else if (bvedata.indexOf('river') < 0) { // section other str exist but current str not exist
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve += '§' + 'river:' + $('#dInsR_river').val() ;
				} else {
					// nilai telah sedia wujud, maka buat replacement, cth : strB_start:B2;strA_start:A1;strC_start:C1;
					var ar0 = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve.split('§'); // jadi array [strB:B2,strA:A1,strC:C1;]
						
					for (var a=0; a < ar0.length;a++) {
						var ar1 = ar0[a].split(':'); // jadi array [strA,A1]
									
						if (ar1[0] == 'river') {
							ar1[1] = $('#dInsR_river').val(); 
							ar0[a] = ar1.join(':');
							break;
						}
					}
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve = ar0.join('§');						 
				}
			}					

			$('#dialogInsertRiver').dialog('close');
		});

		$('#dInsR_KO').click(function() {
			$('#dialogInsertRiver').dialog('close');
		});
		
		$('#dInsR_river').change(function() {
			if (document.getElementById('dInsR_river').value != '') {
				for (i = 0; i < bvebveStrOjArr.length; i++) {					
					if (bvebveStrOjArr[i][3] == 'River') {
						if (bvebveStrOjArr[i][1] == document.getElementById('dInsR_river').value) {
							document.getElementById('dInsR_riverImg').src = 'images/' + bvebveStrOjArr[i][4];
							break;
						} 
					}					
				}
			}
		});		

		// dialog Update Ground
		$('#dUpdG_OK').click(function() {
			var pid = $('#dUpdG_PID').val(); 
			var mIdx = parseInt($('#dUpdG_MID').val());
			var bvedata  = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve;
				
			if (typeof bvedata == 'undefined') {
				MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve =  'ground:' + $('#dUpdG_object').val() ;
			} else {
				if ((bvedata == null) || (bvedata == '')) {
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve = 'ground:' + $('#dUpdG_object').val() ;
				} else if (bvedata.indexOf('ground') < 0) { // section other str exist but current str not exist
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve += '§' + 'ground:' + $('#dUpdG_object').val() ;
				} else {
					// nilai telah sedia wujud, maka buat replacement, cth : strB_start:B2;strA_start:A1;strC_start:C1;
					var ar0 = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve.split('§'); // jadi array [strB:B2,strA:A1,strC:C1;]
						
					for (var a=0; a < ar0.length;a++) {
						var ar1 = ar0[a].split(':'); // jadi array [strA,A1]
									
						if (ar1[0] == 'ground') {
							ar1[1] = $('#dUpdG_object').val(); 
							ar0[a] = ar1.join(':');
							break;
						}
					}
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve = ar0.join('§');						 
				}
			}
			$('#dialogUpdateGround').dialog('close');
		});

		$('#dUpdG_KO').click(function() {
			$('#dialogUpdateGround').dialog('close');
		});
		
		$('#dUpdG_object').change(function() {
			if (document.getElementById('dUpdG_object').value != '') {
				for (i = 0; i < bvebveStrOjArr.length; i++) {					
					if (bvebveStrOjArr[i][3] == 'Ground') {
						if (bvebveStrOjArr[i][1] == document.getElementById('dUpdG_object').value) {
							document.getElementById('groundImg').src = 'images/' + bvebveStrOjArr[i][4];
							break;
						} 
					}					
				}
			}
		});			

		// dialog Non Parallel TurnOut
		$('#dInsNpLTo_OK').click(function() {

			$('#dialogNonParallelTurnOut').dialog('close');
		});

		$('#dInsNpLTo_KO').click(function() {
			$('#dialogNonParallelTurnOut').dialog('close');
		});

		// dialog Widen Parallel Gap
		$('#dpLTs_OK').click(function() {
			var pid1 = $('#dpLTs_Line1').val(); 
			var pid2 = $('#dpLTs_Line2').val(); 

			var ti1 = parseFloat($('#dpLTs_iToL1').val());			
			var wi1 = parseFloat($('#dpLTs_iToW1').val());
			var ti2 = (document.getElementById('dpLTs_chkDifSlRatio1').checked)? parseFloat($('#dpLTs_iToL2').val()) : ti1;
			var wi2 = (document.getElementById('dpLTs_chkDifSlRatio1').checked)? parseFloat($('#dpLTs_iToW2').val()) : wi1;
			
			var wst = parseInt($('#dpLTs_stIdx').val());
			var wed = parseInt($('#dpLTs_edIdx').val());
			var wst2 = parseInt($('#dpLTs_stIdx2').val());
			var wed2 = parseInt($('#dpLTs_edIdx2').val());
			
			
			var te1 = parseFloat($('#dpLTs_eToL1').val());
			var we1 = parseFloat($('#dpLTs_eToW1').val());
			var te2 = (document.getElementById('dpLTs_chkDifSlRatio2').checked)? parseFloat($('#dpLTs_eToL2').val()) : te1;
			var we2 = (document.getElementById('dpLTs_chkDifSlRatio2').checked)? parseFloat($('#dpLTs_eToW2').val()) : we1;
			//var  = $('#').val();
			//var  = $('#').val();
			var i1slope = wi1 / ti1;
			var i2slope = wi2 / ti2;
			var e1slope = we1 / te1;
			var e2slope = we2 / te2;
			
			var offset = 0;
			var ioffsset = null;
				
			for (var oi = wst; oi >= 0; oi--) {
				if (MapToolbar.features["lineTab"][pid1].markers.getAt(oi).prln != null) {
					if (MapToolbar.features["lineTab"][pid1].markers.getAt(oi).prln.indexOf($('#dpLTs_Line2').val()) >= 0) {
						//.prln = '§' + newPoly.id + ':' + kodOffset + ':start:' + startOffset + ':' + stSwlength;
						var plines = MapToolbar.features["lineTab"][pid1].markers.getAt(oi).prln.split('§');
						for (var a=0; a < plines.length;a++) {
							var ar1 = plines[a].split(':'); // jadi array [strA_start,A1,A2,A3]
							if (ar1[0] == pid2) {
								offset = parseFloat(ar1[1]);
								if (ar1[3] == '0') {
									ioffsset = 0;
								}
								break;
							}
						}
						if (offset !== 0) { break; }
					}
				}
			}
			
			var side;
			if (offset < 0) {
				side = 90;
			} else {
				side = -90;
			}
									
			
			var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).getPosition());
			
			var px0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + 90));
			var px1 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + 90));			// wed+2
			
			var npwi10 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), ti1, h1);
			var npwi11 = google.maps.geometry.spherical.computeOffset(npwi10, wi1, (h1 +  side));			 
			MapToolbar.addPoint(npwi11, MapToolbar.features["lineTab"][pid1], (wst + 1));
			
			h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition());
			var npwe10 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed+1).getPosition(), te1, h1);
			//MapToolbar.addPoint(npwe10, MapToolbar.features["lineTab"][pid1], (wst + 2));
			var npwe11 = google.maps.geometry.spherical.computeOffset(npwe10, we1, (h1 -  side));			 
			MapToolbar.addPoint(npwe11, MapToolbar.features["lineTab"][pid1], (wst+2));
					
			
			if (px0.equals(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2).getPosition())) {
				//2 do non uniform branch
				var h2 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2).getPosition(),MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition());
			
				var npwi20 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2).getPosition(), ti2, h2);
				var npwi21 = google.maps.geometry.spherical.computeOffset(npwi20, (wi2 + offset), (h2 -  side));			 
				MapToolbar.addPoint(npwi21, MapToolbar.features["lineTab"][pid2], (wst2 + 1));
				
				if (px1.equals(MapToolbar.features["lineTab"][pid2].markers.getAt(wed2+1).getPosition())) {
					var npwe20 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wed2+1).getPosition(), -te2, (180-h2));
					var npwe21 = google.maps.geometry.spherical.computeOffset(npwe20, we2, (180 - h2 -  side));			 
					MapToolbar.addPoint(npwe21, MapToolbar.features["lineTab"][pid2], (wed2 + 1));
				} else {
					MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
					var h2 = google.maps.geometry.spherical.computeHeading(px0, px1);
					var npwe20 = google.maps.geometry.spherical.computeOffset(px1, -te2, (180 - h2));
					var npwe21 = google.maps.geometry.spherical.computeOffset(npwe20, we2, (180 - h2 - side));
					MapToolbar.addPoint(npwe21, MapToolbar.features["lineTab"][pid2], (wst2 + 3));
				}
			
			} else {
				MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
				MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
				var h2 = google.maps.geometry.spherical.computeHeading(px0, px1);
					
				var npwi20 = google.maps.geometry.spherical.computeOffset(px0, ti2, h2);
				var npwi21 = google.maps.geometry.spherical.computeOffset(npwi20, wi2 + offset, h2 - side);
				MapToolbar.addPoint(npwi21, MapToolbar.features["lineTab"][pid2], wst2 + 2);
			
				var npwe20 = google.maps.geometry.spherical.computeOffset(px1, -te2, (180 - h2));
				var npwe21 = google.maps.geometry.spherical.computeOffset(npwe20, we2, (180 - h2 - side));
				MapToolbar.addPoint(npwe21, MapToolbar.features["lineTab"][pid2], (wst2 + 3));				
			}

			MapToolbar.features["lineTab"][pid1].markers.getAt(wst).turn = -i1slope;
			MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).turn = i1slope;
			MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).turn = e1slope;
			MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).turn = -e1slope;
			
			//MapToolbar.features["lineTab"][pid1].markers.getAt(wst).lineX = pid2 : rail length 25 m default : xd1 : xd2 : xd3 : xd4 : ....
			//widening start
			if (!document.getElementById('dpLTs_chkDifSlRatio1').checked) {
				var xdat = pid2 + ':start:25';
				for (xd = 0; xd <= ti1; xd+=25) {
					var ix1 = Math.round(i1slope * xd * 100) / 100;
					var ix2 = Math.round(i2slope * xd * 100) / 100;
					var ixd = ix1 + Math.abs(offset) + ix2; 
					xdat += ':' + ixd;
				}
				MapToolbar.features["lineTab"][pid1].markers.getAt(wst).lineX = xdat;				
			} else {
				var xdat = pid2 + ':start:25';
				var tL = 0;
				var ix1 = 0;
				var ix2 = 0;
				do {
					ix1 = (tL <= ti1)? Math.round(i1slope * tL * 100) / 100 : ix1;
					ix2 = (tL <= ti2)? Math.round(i2slope * tL * 100) / 100 : ix2;
					var ixd = ix1 + Math.abs(offset) + ix2; 
					xdat += ':' + ixd;
					tL +=25;
				} while ((tL < ti1) || (tL < ti2));
				MapToolbar.features["lineTab"][pid1].markers.getAt(wst).lineX = xdat;
			}
			
			//widening close
			if (!document.getElementById('dpLTs_chkDifSlRatio2').checked) {
				var xdat = pid2 + ':close:25';
				for (xd = 0; xd <= ti2; xd+=25) {
					var ex1 = Math.round(e1slope * xd * 100) / 100;
					var ex2 = Math.round(e2slope * xd * 100) / 100;
					var exd = ex1 + Math.abs(offset) + ex2; 
					xdat += ':' + exd;
				}
				MapToolbar.features["lineTab"][pid1].markers.getAt(wed+2).lineX = xdat;				
			} else {
				var xdat = pid2 + ':close:25';
				var tL = 0;
				var ex1 = 0;
				var ex2 = 0;
				do {
					ex1 = Math.round(e1slope * tL * 100) / 100;
					ex2 = Math.round(e2slope * tL * 100) / 100;
					var exd = ex1 + Math.abs(offset) + ex2; 
					xdat += ':' + exd;
					tL +=25;
				} while ((tL <= te1) || (tL <= te2));
				MapToolbar.features["lineTab"][pid1].markers.getAt(wed+2).lineX = xdat;
			}

			$('#dialogWidenParallelGap').dialog('close');
		});

		$('#dpLTs_KO').click(function() {
			$('#dialogWidenParallelGap').dialog('close');
		});

		// dialog Insert Platform
		$('#dInsC_OK').click(function() {
			//dIns_Crossbar
			//dInsC_Crossing
			//dInsC_RoadAtCrossing
			//dInsC_LLm
			//dInsC_LAd
			//dInsC_RLm
			//dInsC_RAd
			$('#dialogInsertPlatform').dialog('close');
		});

		$('#dInsC_KO').click(function() {
			$('#dialogInsertPlatform').dialog('close');
		});

		// dialog Switch Track
		$('#dInsSTC_OK').click(function() {
			if (($('#dInsSTC_T1').val() != '') && ($('#dInsSTC_T2').val() != '')) {
				var swL = parseInt($('#dInsSTC_swL').val());
				var pid = $('#dInsSTC_T1').val(); 
				var mIdx = parseInt($('#dInsSTC_t1mi').val());
				var offset = 0;
				
				for (var oi = 0; oi <= mIdx; oi++) {
					if (MapToolbar.features["lineTab"][pid].markers.getAt(oi).prln.indexOf($('#dInsSTC_T2').val()) >= 0) {
						//.prln = '§' + newPoly.id + ':' + kodOffset + ':start:' + startOffset + ':' + stSwlength;
						var plines = MapToolbar.features["lineTab"][pid].markers.getAt(oi).prln.split('§');
						for (var a=0; a < plines.length;a++) {
							var ar1 = plines[a].split(':'); // jadi array [strA_start,A1,A2,A3]
							if (ar1[0] == $('#dInsSTC_T2').val()) {
								offset = parseFloat(ar1[1]);
								break;
							}
						}
						if (offset !== 0) { break; }
					}
				}
				
			
				switch (true) {
					case (document.getElementById('swtype12-21').checked):
						var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).getPosition());
						var side;
						if (offset < 0) {
							side = -90;
						} else {
							side = 90;
						}
						
						var odml = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), swL, h1); 
						MapToolbar.addPoint(odml, MapToolbar.features["lineTab"][pid], mIdx+1);
						
						MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing();	
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), newPoly, 0); //1st point on track 1 to turnout
						var platLng = google.maps.geometry.spherical.computeOffset(odml, Math.abs(offset), h1 +  side);
						MapToolbar.addPoint(platLng, newPoly, 1);
						//newPoly.markers.getAt(0).lineX = pid + ':' + mIdx;
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln == null) {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln = newPoly.id + ':' + offset + ':start:0:' + swL;
						} else {
							if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln == '') {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln = newPoly.id + ':' + offset + ':start:0:' + swL;
							} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln += '§' + newPoly.id + ':' + offset + ':start:0:' + swL;
							}
						}
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln == null) {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln = newPoly.id + ':' + offset + ':end:null:' + swL;
						} else {
							if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln == '') {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln = newPoly.id + ':' + offset + ':end:null:' + swL;	
							} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln += '§' + newPoly.id + ':' + offset + ':end:null:' + swL;	
							}
						}						
						
						newPoly = null;

						MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing();	

						platLng = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), Math.abs(offset), h1 +  side);
						MapToolbar.addPoint(platLng, newPoly, 0);

						odml = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), swL, h1); 	 					
						MapToolbar.addPoint(odml, newPoly, 1); //1st point on track 2 to turnout
						//newPoly.markers.getAt(1).turn = pid + ':' + mIdx+1;
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln == null) {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln = newPoly.id + ':' + offset + ':start:null:' + swL;
						} else {
							if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln == '') {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln = newPoly.id + ':' + offset + ':start:null:' + swL;
							} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln += '§' + newPoly.id + ':' + offset + ':start:null:' + swL;
							}
						}
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln == null) {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln = newPoly.id + ':' + offset + ':end:0:' + swL;
						} else {
							if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln == '') {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln = newPoly.id + ':' + offset + ':end:0:' + swL;	
							} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln += '§' + newPoly.id + ':' + offset + ':end:0:' + swL;	
							}
						}							
						
						newPoly = null;		

						break;
					case (document.getElementById('swtype12').checked):
						var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).getPosition());
						var side;
						if (offset < 0) {
							side = -90;
						} else {
							side = 90;
						}
						
						var odml = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), swL, h1); 
						MapToolbar.addPoint(odml, MapToolbar.features["lineTab"][pid], mIdx+1);
						
						MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing();	
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), newPoly, 0); //1st point on track 1 to turnout
						var platLng = google.maps.geometry.spherical.computeOffset(odml, Math.abs(offset), h1 +  side);
						MapToolbar.addPoint(platLng, newPoly, 1);
						newPoly.markers.getAt(0).lineX = pid + ':' + mIdx;
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln == null) {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln = newPoly.id + ':' + offset + ':start:0:' + swL;
						} else {
							if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln == '') {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln = newPoly.id + ':' + offset + ':start:0:' + swL;
							} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln += '§' + newPoly.id + ':' + offset + ':start:0:' + swL;
							}
						}
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln == null) {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln = newPoly.id + ':' + offset + ':end:null:' + swL;
						} else {
							if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln == '') {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln = newPoly.id + ':' + offset + ':end:null:' + swL;	
							} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln += '§' + newPoly.id + ':' + offset + ':end:null:' + swL;	
							}
						}						
						
						newPoly = null;
						break;
					case (document.getElementById('swtype21').checked):
						var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx-1).getPosition());
						var side;
						if (offset < 0) {
							side = 90;
						} else {
							side = -90;
						}

						var odml = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), swL, h1); 
						MapToolbar.addPoint(odml, MapToolbar.features["lineTab"][pid], mIdx+1);
						
						MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing();	
						var platLng = google.maps.geometry.spherical.computeOffset(odml, Math.abs(offset), h1 +  side);
						MapToolbar.addPoint(platLng, newPoly, 0);
	 					
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), newPoly, 1); //1st point on track 2 to turnout
						//newPoly.markers.getAt(1).turn = pid + ':' + mIdx;
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln == null) {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln = newPoly.id + ':' + offset + ':start:null:' + swL;
						} else {
							if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln == '') {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln = newPoly.id + ':' + offset + ':start:null:' + swL;
							} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).prln += '§' + newPoly.id + ':' + offset + ':start:null:' + swL;
							}
						}
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln == null) {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln = newPoly.id + ':' + offset + ':end:0:' + swL;
						} else {
							if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln == '') {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln = newPoly.id + ':' + offset + ':end:0:' + swL;	
							} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).prln += '§' + newPoly.id + ':' + offset + ':end:0:' + swL;	
							}
						}						
						
						newPoly = null;						
						break;
					default:
						alert('please select either structure start point or end point, tq');
						return false;
				}
				
			} else {
				
			}
			$('#dialogSwitchTrack').dialog('close');
		});

		$('#dInsSTC_K0').click(function() {
			$('#dialogSwitchTrack').dialog('close');
		});

		// dialog Insert Flyover
		$('#dInsFO_OK').click(function() {
			if (document.getElementById('dInsFO_Fo').value != '') {			
				var pitchStr = 'flyover';
				var pid = $('#dInsFO_PID').val(); 
				var mIdx = parseInt($('#dInsFO_MID').val());
				var kitdata  = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit;
				var start = null; 
				switch (true) {
					case (document.getElementById('dInsFO_start').checked):
						start = true;
						break;
					case (document.getElementById('dInsFO_end').checked):
						start = false;
						break;
					default:
						alert('please select either structure start point or end point, tq');
						return false;
				}
				
				var strType = (start) ? pitchStr + '_start': pitchStr + '_end';
				var theight = (start) ? parseFloat($('#dInsFO_Lm').val()) : parseFloat($('#dInsFO_Lm2').val());
				var pitch =(start) ? parseInt($('#dInsFO_P1').val()) : parseInt($('#dInsFO_P2').val());
				var slopelength = (pitch !== 0) ? Math.round(1000 * (theight / pitch)) : 0;

				var bvedata  = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve;

				if (typeof kitdata == 'undefined') {
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = strType + ':' + $('#dInsFO_Fo').val();
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).pitch = pitch;

				} else {
					if ((kitdata == null) || (kitdata == '')) {
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = strType + ':' + $('#dInsFO_Fo').val() ;
					} else if (kitdata.indexOf(pitchStr) < 0) { // section other str exist but current str not exist
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit += '§' + strType + ':' + $('#dInsFO_Fo').val();
					} else {
						// nilai telah sedia wujud, maka buat replacement, cth : strB_start:B2;strA_start:A1;strC_start:C1;
						var ar0 = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit.split('§'); // jadi array [strB_start:B2,strA_start:A1:A2:A3,strC_start:C1;]
						
						for (var a=0; a < ar0.length;a++) {
							var ar1 = ar0[a].split(':'); // jadi array [strA_start,A1,A2,A3]
							var ar1_0 = ar1[0].split('_'); // jadi array [strA,start]
									
							if (ar1_0[0] == pitchStr) {
								if (((ar1_0[1] == 'start') && start) || ((ar1_0[1] == 'end') && (!start))) {
									ar1[1] = $('#dInsFO_Fo').val(); 
									ar0[a] = ar1.join(':');
									break;
								}
							}
						}
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = ar0.join('§');						 
					}
				}
				
				if (start) {
					if (slopelength !== 0) {
						var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).getPosition());
						var x1p = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), slopelength, h1);
						MapToolbar.addPoint(x1p, MapToolbar.features["lineTab"][pid], mIdx+1);		
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).bve =  'height:' + theight;
					} else {
						if (typeof bvedata == 'undefined') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve =  'height:' + theight;
						} else {
							if ((bvedata == null) || (bvedata == '')) {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve = 'height:' + theight;
							} else if (bvedata.indexOf('height:') < 0) { // section other str exist but current str not exist
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve += '§' + 'height:' + theight ;
							} else {
								// nilai telah sedia wujud, maka buat replacement, cth : strB_start:B2;strA_start:A1;strC_start:C1;
								var ar0 = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve.split('§'); // jadi array [strB:B2,strA:A1,strC:C1;]
						
								for (var a=0; a < ar0.length;a++) {
									var ar1 = ar0[a].split(':'); // jadi array [strA,A1]
									
									if (ar1[0] == 'height') {
										ar1[1] = theight; 
										ar0[a] = ar1.join(':');
										break;
									}
								}
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve = ar0.join('§');						 
							}
						}
					}
				} else {
					if (slopelength !== 0) {
						var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx-1).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition());
						var x1p = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), -1 * Math.abs(slopelength), h1);
						MapToolbar.addPoint(x1p, MapToolbar.features["lineTab"][pid], mIdx);		
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve =  'height:' + theight;
					} else {
						if (typeof bvedata == 'undefined') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve =  'height:' + theight;
						} else {
							if ((bvedata == null) || (bvedata == '')) {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve = 'height:' + theight;
							} else if (bvedata.indexOf('height:') < 0) { // section other str exist but current str not exist
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve += '§' + 'height:' + theight ;
							} else {
								// nilai telah sedia wujud, maka buat replacement, cth : strB_start:B2;strA_start:A1;strC_start:C1;
								var ar0 = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve.split('§'); // jadi array [strB:B2,strA:A1,strC:C1;]
						
								for (var a=0; a < ar0.length;a++) {
									var ar1 = ar0[a].split(':'); // jadi array [strA,A1]
									
									if (ar1[0] == 'height') {
										ar1[1] = theight; 
										ar0[a] = ar1.join(':');
										break;
									}
								}
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bve = ar0.join('§');						 
							}
						}
					}					
				}

			}
			alert('flyover ' + $('#dInsFO_Fo').val() + ' was inserted at ' + pid + '(' + mIdx + ')');	
			$('#dialogInsertFlyover').dialog('close');
		});

		$('#dInsFO_KO').click(function() {
			$('#dialogInsertFlyover').dialog('close');
		});
		
		$('#dInsFO_Fo').change(function() {
			if (document.getElementById('dInsFO_Fo').value != '') {
				for (i = 0; i < bveFOObjArr.length; i++) {					
					if (bveFOObjArr[i][1] == document.getElementById('dInsFO_Fo').value) {
						document.getElementById('dInsFO_foimg').src = 'images/' + bveFOObjArr[i][3];
						break;
					}					
				}
			}
		});	
		
		$('#dInsFO_P1').change(function() {	
			var pitch = parseFloat($('#dInsFO_P1').val());
			var theight = parseFloat($('#dInsFO_Lm').val());
			var slopelength = 1000 * (theight / pitch);
			
			document.getElementById('dInsFO_sL1').innerHTML = Math.round(slopelength);
		});

		$('#dInsFO_P2').change(function() {	
			var pitch = parseFloat($('#dInsFO_P2').val());
			var theight = parseFloat($('#dInsFO_Lm2').val());
			var slopelength = 1000 * (theight / pitch);
			
			document.getElementById('dInsFO_sL2').innerHTML = Math.round(slopelength);		
		});
		
		$('#dInsFO_Lm').change(function() {	
			var pitch = parseFloat($('#dInsFO_P1').val());
			var theight = parseFloat($('#dInsFO_Lm').val());
			var slopelength = 1000 * (theight / pitch);
			
			document.getElementById('dInsFO_sL1').innerHTML = Math.round(slopelength);
		});

		$('#dInsFO_Lm2').change(function() {	
			var pitch = parseFloat($('#dInsFO_P2').val());
			var theight = parseFloat($('#dInsFO_Lm2').val());
			var slopelength = 1000 * (theight / pitch);
			
			document.getElementById('dInsFO_sL2').innerHTML = Math.round(slopelength);		
		});		

		// dialog Insert Tunnel
		$('#dInsTun_OK').click(function() {
			if (document.getElementById('dInsTun_tun').value != '') {
				var pitchStr = 'tunnel';
				var pid = $('#dInsTun_PID').val(); 
				var mIdx = parseInt($('#dInsTun_MID').val());
				var kitdata  = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit;
				var start = null; 
				switch (true) {
					case (document.getElementById('dInsTun_tunStart').checked):
						start = true;
						break;
					case (document.getElementById('dInsTun_TunEnd').checked):
						start = false;
						break;
					default:
						alert('please select either structure start point or end point, tq');
						return false;
				}
				
				var strType = (start) ? pitchStr + '_start': pitchStr + '_end';
					
				if (typeof kitdata == 'undefined') {
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = strType + ':' + $('#dInsTun_tun').val();
				} else {
					if ((kitdata == null) || (kitdata == '')) {
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = strType + ':' + $('#dInsTun_tun').val();
					} else if (kitdata.indexOf(pitchStr) < 0) { // section other str exist but current str not exist
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit += '§' + strType + ':' + $('#dInsTun_tun').val();
					} else {
						// nilai telah sedia wujud, maka buat replacement, cth : strB_start:B2;strA_start:A1;strC_start:C1;
						var ar0 = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit.split('§'); // jadi array [strB_start:B2,strA_start:A1:A2:A3,strC_start:C1;]
						
						for (var a=0; a < ar0.length;a++) {
							var ar1 = ar0[a].split(':'); // jadi array [strA_start,A1,A2,A3]
							var ar1_0 = ar1[0].split('_'); // jadi array [strA,start]
									
							if (ar1_0[0] == pitchStr) {
								if (((ar1_0[1] == 'start') && start) || ((ar1_0[1] == 'end') && (!start))) {
									ar1[1] = $('#dInsTun_tun').val(); 
									ar0[a] = ar1.join(':');
									break;
								}
							}
						}
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kit = ar0.join('§');						 
					}
				}
				
			}
			alert('tunnel ' + $('#dInsTun_tun').val() + ' was inserted at ' + pid + '(' + mIdx + ')');	
			
			$('#dialogInsertTunnel').dialog('close');
		});

		$('#dInsTun_KO').click(function() {
			$('#dialogInsertTunnel').dialog('close');
		});
		
		$('#dInsTun_tun').change(function() {
			if (document.getElementById('dInsTun_tun').value != '') {
				for (i = 0; i < bvetunnelObjArr.length; i++) {					
					if (bvetunnelObjArr[i][1] == document.getElementById('dInsTun_tun').value) {
						document.getElementById('dInsTun_tunImg').src = 'images/' + bvetunnelObjArr[i][3];
						break;
					}
				}
			}
		});		

		// dialog Make It Parallel Between 2 Point
		$('#dMkPl2p_OK').click(function() {
			//dIns_Crossbar
			//dInsC_Crossing
			//dInsC_RoadAtCrossing
			//dInsC_LLm
			//dInsC_LAd
			//dInsC_RLm
			//dInsC_RAd
			$('#dialogMakeItParallelBetween2Point').dialog('close');
		});

		$('#dMkPl2p_KO').click(function() {
			$('#dialogMakeItParallelBetween2Point').dialog('close');
		});

		scriptLoaded();
				
	});