/*
GB Maps ギビマップ - © Karya IT (http://www.karyait.net.my/) 2012-2014. All rights reserved. 
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

GB Maps ギビマップ by Karya IT is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. Based on a work at https://code.google.com/p/gbmaps/. Permissions beyond the scope of this license may be available at https://developers.google.com/readme/terms. Google Maps - ©2014 Google.

Code license : Apache License 2.0

Main GB Maps ギビマップ Website : http://gbmaps.karyait.net.my/ or http://gbmaps.blogspot.com

Development site (programming) : https://github.com/karyait/gbmaps & https://code.google.com/p/gbmaps/
Personal blog for GB Maps ギビマップ (design algorithm) : http://blogkaryait.wordpress.com/tag/gbmaps/


File : gbm-jq-v1.js
purpose : gb maps functions based on jquery
type : release (under development)
version : 1.0.0
build : 
last update : 06 May 2014 12:00am (GMT 8+)

*/
	
	jQuery().ready(function($) {
		
		// Register an event listener to fire when the page finishes loading.
		//google.maps.event.addDomListener(window, 'load', initialize); 
		
		
		$("#switcher").themeswitcher({
    		imgpath: "images/",
    		loadTheme: "redmond"
    }); 
		
		$.lang.run();
		
		
		$( "input:submit, input:reset, button" ).button();
		$('#sBtnPLineOffset').spinner({step: 0.1, largeStep: 5, min: 3.8 });
		
		$('#pLstSwLength').spinner({step: 25, min: 25 });
		$('#pLedSwLength').spinner({step: 25, min: 25 });

		$('#sBtnRCDesignSpeed').spinner({
			step: 1,
			largeStep: 5,
			stop: function( event, ui ) { curveCalculator('RC',''); }
		});
		$('#sBtnRTCDesignSpeed').spinner({
			step: 1, 
			largeStep: 5,
			stop: function( event, ui ) { curveCalculator('TC',''); }
		});
		
		$('#sBtnRCGauge').spinner({
			step: 1,
			largeStep: 50,
			min: 1067,
			max: 3000, 
			stop: function( event, ui ) { curveCalculator('RC',''); }
		});
		$('#sRTCBtnGauge').spinner({
			step: 1,
			largeStep: 50,
			min: 1067,
			max: 3000,
			stop: function( event, ui ) { curveCalculator('TC',''); }
		});

		$('#BV4OBuildsGauge').spinner({step: 1, largeStep: 50, min: 1067, max: 3000 });
		$('#dtsv_trackGauge').spinner({step: 1, largeStep: 50, min: 1067, max: 3000 });
		$('#dbr_trackGauge').spinner({step: 1, largeStep: 50, min: 1067, max: 3000 });
				
		$('#sBtnRCCant').spinner({
			step: 1,
			largeStep: 10, 
			stop: function( event, ui ) { curveCalculator('RC',''); }
		});
		$('#sBtnRtCCant').spinner({
			step: 1,
			largeStep: 10 ,
			stop: function( event, ui ) { curveCalculator('TC',''); }
		});
		
		$('#sBtnCurveRadius').spinner({
			step: 1,
			largeStep: 10
		});
		$('#sBtnRTCCircularRadius').spinner({
			step: 1,
			largeStep: 10 ,
			stop: function( event, ui ) { curveCalculator('TC','lock'); }
		});
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

		$('#dInsR_width').spinner({step: 25, min: 25 }); 
		
		$('#sBtnSpeedLimit').spinner('disable'); 		

		$( "#accordion" ).accordion({
			heightStyle: "fill"
		});
		
		$( "#accordion-resizer" ).resizable({
			minHeight: 400,
			minWidth: 290,
			resize: function() {
				$( "#accordion" ).accordion( "refresh" );
			}
		});
				  					
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
			minWidth: 480,
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
			minWidth: 604,
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

		$( "#dialogCantSize" ).dialog({ 
			autoOpen: false, 
			minWidth: 500
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
			
		$( "#dialogInvertLine" ).dialog({ 
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
		
		$( "#dialogLinkLines" ).dialog({ 
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
			minWidth: 760,
			height: 520,
			//close: function(){
			//	dInsForm_pid
			//	dInsForm_pid2
			//}
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

    				if (MapToolbar.features[oType][oName].name != null) {
    					teks += ',' + MapToolbar.features[oType][oName].name;
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

 								if (polyL.markers.getAt(i).bdata != null) {
    							teks += ';' + polyL.markers.getAt(i).bdata;
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

 								if (polyL.markers.getAt(i).sline != null) {
    							teks += ';' + polyL.markers.getAt(i).sline;
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
					bdata: null, // various bve data
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

    					if ( cpoly.getAt(mi).bdata != null) {
    						teks += ';' +  cpoly.getAt(mi).bdata;
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
    					
    					if ( cpoly.getAt(mi).ld != null) {
    						teks += ';' +  cpoly.getAt(mi).ld;
    					} else {
    						teks += ';';
    					}
    					  					
    					if ( cpoly.getAt(mi).Lc != null) {
    						teks += ';' +  cpoly.getAt(mi).Lc;
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
  				//line_1,ptype,note,name,trackservice,trackno,tracksection,trackbve,kit, 3.6975060399011115;101.50496006011963;note;pitch;bve;kit, ...
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
	 					if (rd[3] != '') { loadPoly.name = rd[3]; } else { loadPoly.name = null; }
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
				$.cookie('defaultcenter', map.getCenter().lat()+','+map.getCenter().lng(), { expires: 365 });
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
  				    		//line_1,ptype,note,name,trackservice,trackno,tracksection,trackbve,kit, 3.6975060399011115;101.50496006011963;note;pitch;bve;kit, ...
  				    			var rd = rowsData[1].split(",");
  				    			var dname = rd[0];				    					
  				    			var otype = dname.split("_")[0];
  				    			if (otype == 'line') {
  				    				if (typeof MapToolbar.features["lineTab"][dname] == 'undefined') {
  				    					var loadPoly = null;
  				    					MapToolbar.initFeature('line');
	 											MapToolbar.stopEditing(); 												
	 											loadPoly = MapToolbar.features["lineTab"][dname];
	 											if (typeof loadPoly != 'undefined') {
	 												//2do		
	 												if (rd[1] != '') { loadPoly.ptype = rd[1]; } else { loadPoly.ptype = null; }
	 												if (rd[2] != '') { loadPoly.note = rd[2]; } else { loadPoly.note = null; }
	 												if (rd[3] != '') { loadPoly.name = rd[3]; } else { loadPoly.name = null; }
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
												}
					  					/* } else if (otype == 'curve') {
  											var polyL = MapToolbar.features['lineTab']['line_1'];
												setTimeout(function() { reloadCurve(polyL, 0, rowsData, quickScan); }, 100);
  											} else if (otype == 'tcurve') { 
  											var polyL = MapToolbar.features['lineTab']['line_1'];
  											setTimeout(function() { reloadTCurve(polyL, mi, rowsData, quickScan); }, 100 ); */
  										}
  									//
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
		
		$('#dInvLine_OK').click(function() {
			if (typeof $('#dInvLine_pid').val() != 'undefined') {
				invertpolyline($('#dInvLine_pid').val());
				$('#dialogInvertLine').dialog('close');
			} else {
				alert('Error! Unable to determine which line to invert.');
			}
		});

		$('#dInvLine_KO').click(function() {
			$('#dialogInvertLine').dialog('close');
		});

		$('#mOInvertLine').click(function() {
			$('#dialogInvertLine').dialog('open');
		});

		$('#mOParallel').click(function() {
			$('#dialogMakeItParallelBetween2Point').dialog('open');
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
	
	/*
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
		} */
		
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
						if (typeof arr0[3] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(miSt).bdata = arr0[3] }
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
						if (typeof arr0[3] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).bdata = arr0[3] }
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
										if (typeof arr0[3] != 'undefined') { MapToolbar.features["curveTab"][cuvid].markers.getAt(0).bdata = arr0[3]; }
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
											if (typeof arr0[3] != 'undefined') { MapToolbar.features["curveTab"][cuvid].markers.getAt(cendId).bdata = arr0[3]; }
											if (typeof arr0[4] != 'undefined') { MapToolbar.features["curveTab"][cuvid].markers.getAt(cendId).kit = arr0[4]; }
										}
									}
								} else if (cuvid.split('_')[0] == 'tcurve') {
									if (cuvmod == 'start') {
										if (typeof arr0[1] != 'undefined') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(0).note = arr0[1]; }
										if (typeof arr0[2] != 'undefined') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(0).pitch = arr0[2]; }
										if (typeof arr0[3] != 'undefined') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(0).bdata = arr0[3]; }
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
											if (typeof arr0[3] != 'undefined') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(cendId).bdata = arr0[3]; }
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
												if (typeof arr0[3] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).bdata = arr0[3]; }
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
													if (typeof arr0[3] != 'undefined') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).bdata = arr0[3]; }
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
														if (typeof cpoly.markers.getAt(c).ld != 'undefined')  { // marker on curve
															
															if (cpoly.markers.getAt(c).kit.indexOf('cmi:') >= 0) { // on current marker
																
																if (pitchStrdistance == Math.ceil(midxD - tL + parseFloat(cpoly.markers.getAt(c).ld))) {
																	if (typeof arr0[1] != 'undefined') { cpoly.markers.getAt(c).note = arr0[1]; }
																	if (typeof arr0[2] != 'undefined') { cpoly.markers.getAt(c).pitch = arr0[2]; }
																	if (typeof arr0[3] != 'undefined') { cpoly.markers.getAt(c).bdata = arr0[3]; }
																	if (typeof arr0[4] != 'undefined') { cpoly.markers.getAt(c).kit = arr0[4]; }
																	onCurveMarker = true;
																	break;	
																										
																} else {
																	//alert((pitchStrdistance/Math.ceil(midxD - tL + parseFloat(cpoly.markers.getAt(c).ld))));
																	
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
																if (typeof arr0[3] != 'undefined') { cpoly.markers.getAt(c).bdata = arr0[3]; }
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
			
			if ($('#dtsv_trackname').val() != '') { poly.name = $('#dtsv_trackname').val(); } else { poly.name = null; }
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
			//if (document.getElementById('dInsC_Crossing').value != '') {
				var pid = $('#dInsC_PID').val(); 
				var mIdx = parseInt($('#dInsC_MID').val());
				
				if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(mIdx) != 'undefined') {
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kdata.roadcross = $('#dInsC_Crossing').val();
					var image = new google.maps.MarkerImage('images/roadcross_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).setIcon(image);
					$('#dialogInsertCrossing').dialog('close');
				} else {
					alert("marker index not defined");				
				}
			//}
		});

		$('#dInsC_KO').click(function() {
			$('#dialogInsertCrossing').dialog('close');
		});			

		// dialog insert Bridge
		$('#dInsB_OK').click(function() {
			//if (document.getElementById('dInsB_bridge').value != '') {			
				var pid = $('#dInsB_PID').val(); 
				var mIdx = parseInt($('#dInsB_MID').val());
				
				if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(mIdx) != 'undefined') {
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
				
					var strType = (start) ? 0 : 1;	
				
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kdata.bridge = $('#dInsB_bridge').val() + ',' + strType + ',' + $('#dInsB_BL').val();
					var image = new google.maps.MarkerImage('images/bridge_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).setIcon(image);
					$('#dialogInsertBridge').dialog('close');				

				} else {
					alert("marker index not defined");				
				}
			//}
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
			//if (document.getElementById('dInsOb_overbridge').value != '') {
				var pid = $('#dInsOb_PID').val(); 
				var mIdx = parseInt($('#dInsOb_MID').val());
				var distance_correction =($('#dInsOb_Lm').val() != '')? $('#dInsOb_Lm').val() : 0;
				var height_correction =($('#dInsOb_Ht').val() != '')? $('#dInsOb_Ht').val() : 0;
				var angle_correction = ($('#dInsOb_RA').val() != '')? $('#dInsOb_RA').val() : 0;	
				
				if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(mIdx) != 'undefined') {
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kdata.overbridge = $('#dInsOb_overbridge').val() + ',' + distance_correction + ',' + height_correction + ',' + angle_correction;
					var image = new google.maps.MarkerImage('images/overbridge_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).setIcon(image);
					$('#dialogInsertOverbridge').dialog('close');					

				} else {
					alert("marker index not defined");				
				}				
			//}
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
			var rwidth = parseInt($('#dInsR_width').val());
			
			if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(mIdx) != 'undefined') {
				MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kdata.river = $('#dInsR_river').val() + ',' + rwidth;
				var image = new google.maps.MarkerImage('images/river_icon.png',
					new google.maps.Size(6, 6),
					new google.maps.Point(0, 0),
					new google.maps.Point(3, 3));
				MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).setIcon(image);
				$('#dialogInsertRiver').dialog('close');
			} else {
				alert("marker index not defined");				
			}
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
			
			if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(mIdx) != 'undefined') {
				MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kdata.ground = $('#dUpdG_object').val();
				var image = new google.maps.MarkerImage('images/ground8.png',
					new google.maps.Size(8, 8),
					new google.maps.Point(0, 0),
					new google.maps.Point(4, 4));
				MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).setIcon(image);
				$('#dialogUpdateGround').dialog('close');
			} else {
				alert("marker index not defined");				
			}
			
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
			
			
			var i1slope = wi1 / ti1;
			var i2slope = wi2 / ti2;
			var e1slope = we1 / te1;
			var e2slope = we2 / te2;
			
			var offset = 0;
			var ioffsset = null;
			var side;	
			
			for (var oi = wst; oi >= 0; oi--) {
				if (MapToolbar.features["lineTab"][pid1].markers.getAt(oi).sline != '') {
					if (MapToolbar.features["lineTab"][pid1].markers.getAt(oi).sline.indexOf($('#dpLTs_Line2').val()) >= 0) {
						
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
											offset = (side < 0)? (-1 * parseFloat(arrLineX[2])) : parseFloat(arrLineX[2]);
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
			
			var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).getPosition());
			
			if (i1slope != 0) {

			}
			
			if (e1slope != 0) {

			}

			if (i2slope != 0) {

			}

			if (e2slope != 0) {

			}	
			
			var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
			var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
			var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
			var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
			var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
			var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
			MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
			MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));		
				
			//alert((Math.round(google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(),MapToolbar.features["lineTab"][pid2].markers.getAt(wst2).getPosition())*100)/100) + ' <br /> ' + (Math.round(google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid1].markers.getAt(wed+2).getPosition(),MapToolbar.features["lineTab"][pid2].markers.getAt(wed2).getPosition())*100)/100) + ' <br /> ' + ioffsset + ' <br /> ' + offset);

			
			if (((Math.round(google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(),MapToolbar.features["lineTab"][pid2].markers.getAt(wst2).getPosition())*100)/100) <= Math.abs(offset)) && ((Math.round(google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid1].markers.getAt(wed+2).getPosition(),MapToolbar.features["lineTab"][pid2].markers.getAt(wed2).getPosition())*100)/100) <= Math.abs(offset))) {		
				
				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				MapToolbar.features["lineTab"][pid2].markers.getAt(wed2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';	
			
				var pxc = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2).getPosition() , ti2, h1);
				var pxd = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wed2).getPosition(), -te2, h1);

				var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
				var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
				MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], (wst2 + 1));
				MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], (wst2 + 2));
								
				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';
				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';
			
			} else {
				MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
				MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
				var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
				var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
				var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
				var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
				MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
				MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';				
					
			}
			/*
			MapToolbar.features["lineTab"][pid1].markers.getAt(wst).turn = -i1slope;
			MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).turn = i1slope;
			MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).turn = e1slope;
			MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).turn = -e1slope;
			*/
			
			$('#dialogWidenParallelGap').dialog('close');
		});

		$('#dpLTs_KO').click(function() {
			$('#dialogWidenParallelGap').dialog('close');
		});

		// dialog Insert Platform
		$('#form0_Insert').click(function() {
			var pid = $('#dInsForm_pid').val();
			var idx = parseInt($('#dInsForm_idx').val());
			var side = $('#form0_pos').val();				
			var platform_length = parseInt($('#platform_length').val());
			var howtoForm = parseInt($('#howtocreateform').val());	
			
			formMaker(pid,idx,platform_length,howtoForm,'form0');
					
			$('#dialogInsertPlatform').dialog('close');
		});
		
		$('#form1_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined')) {
				var pid = $('#dInsForm_pid').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var side = $('#form0_pos').val();				
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());	
								
				formMaker(pid,idx,platform_length,howtoForm,'form1');
				
				$('#dialogInsertPlatform').dialog('close');
			}
		});

		$('#form2_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				var ti1 = parseFloat($('#form2_ti1').val());
				var wi1 = parseFloat($('#form2_wi1').val());
				var ti2 = parseFloat($('#form2_ti2').val());
				var wi2 = parseFloat($('#form2_wi2').val());
				
				var te1 = parseFloat($('#form2_tf1').val());
				var we1 = parseFloat($('#form2_wf1').val());
				var te2 = parseFloat($('#form2_tf2').val());
				var we2 = parseFloat($('#form2_wf2').val());

				var ti = (ti1 >= ti2)? ti1 : ti2;
				var tf = (te1 >= te2)? te1 : te2;
				
				var sL = ti + platform_length + tf;
				
				var ptype = pid1.split('_')[0];
				if (ptype == 'line') {
					var form = testForm(pid1,pid2,idx,howtoForm,sL);
					
					if (!form.overlap) {
						var offset = form.offset;
						var side = form.side;	
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								var wst = idx;
								var wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var wst2 = formLineWidenAddAt(pid2,px0);
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								var wst = idx;
								var wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var wst2 = formLineWidenAddAt(pid2,px0);
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);
							}
						}
					}
				
				} else {
					alert('sorry! unable to create platform on curve.');
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}
		});

		$('#form3_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				var ti1 = parseFloat($('#form3_ti1').val());
				var wi1 = parseFloat($('#form3_wi1').val());
				var ti2 = parseFloat($('#form3_ti2').val());
				var wi2 = parseFloat($('#form3_wi2').val());
				
				var te1 = parseFloat($('#form3_tf1').val());
				var we1 = parseFloat($('#form3_wf1').val());
				var te2 = parseFloat($('#form3_tf2').val());
				var we2 = parseFloat($('#form3_wf2').val());

				var ti3 = parseFloat($('#form3_ti3').val());
				var wi3 = parseFloat($('#form3_wi3').val());
				var ti4 = parseFloat($('#form3_ti4').val());
				var wi4 = parseFloat($('#form3_wi4').val());
				
				var te3 = parseFloat($('#form3_tf3').val());
				var we3 = parseFloat($('#form3_wf3').val());
				var te4 = parseFloat($('#form3_tf4').val());
				var we4 = parseFloat($('#form3_wf4').val());				
				
				var ti = (ti3 >= ti4)? ti3 : ti4;
				var tf = (te3 >= te4)? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var ptype = pid1.split('_')[0];
				if (ptype == 'line') {
					var form = testForm(pid1,pid2,idx,howtoForm,sL);
					
					if (!form.overlap) {
						var offset = form.offset;
						var side = form.side;
						var h1;
						var wst;
						var wed;
						var wst2;
						var wed2;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst3 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								var pst1i = google.maps.geometry.spherical.computeOffset(pst3 , (ti3-ti1), h1);
								var pst1e = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -(te3-te1), h1);
								MapToolbar.addPoint(pst3, MapToolbar.features["lineTab"][pid1],idx);
								MapToolbar.addPoint(pst1i, MapToolbar.features["lineTab"][pid1],idx+1);
								MapToolbar.addPoint(pst1e, MapToolbar.features["lineTab"][pid1],idx+2);
								
								wst = idx + 1;
								wed = idx + 2;
								
								var pxa = google.maps.geometry.spherical.computeOffset(pst1i, ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(pst1e, -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(pst1i, offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(pst1i, offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);
															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								var pst3 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								var pst1i = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , (ti3-ti1), h1);
								var pst1e = google.maps.geometry.spherical.computeOffset(pst3 , -(te3-te1), h1);
								MapToolbar.addPoint(pst1i, MapToolbar.features["lineTab"][pid1],idx+1);
								MapToolbar.addPoint(pst1e, MapToolbar.features["lineTab"][pid1],idx+2);
								MapToolbar.addPoint(pst3, MapToolbar.features["lineTab"][pid1],idx+3);
								
								wst = idx + 1;
								wed = idx + 2;
								
								var pxa = google.maps.geometry.spherical.computeOffset(pst1i, ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(pst1e , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(pst1i , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(pst1i, offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);		
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
								
							}
						}
						
						//formCreateLine(pid1,pid2,side,h1,offset,wst,wst+3,wst2,wed2,ti1,ti2,ti3,ti4,te3,te4,wi3,wi4,we3,we4);
						
						var ti3a = ti3 - ti1;
								
						var px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , -ti3a, h1);
						var px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition() , ti3a, h1);
						var px3_a2 = google.maps.geometry.spherical.computeOffset(px3_a , ti3, h1);
						var px3_d2 = google.maps.geometry.spherical.computeOffset(px3_d , -te3, h1);	
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a2, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d2, -we3, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px3_a, newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
						MapToolbar.addPoint(px3_c, newPoly, 2);
						MapToolbar.addPoint(px3_d, newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0:' + te3;

	
						var wst_3i = formLineWidenAddAt(pid1,px3_a);
						//MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst_3i + 1);
	
						var wst_3f = formLineWidenAddAt(pid1,px3_d);
						//MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], wst_3f + 1);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).setDraggable(false);
	
						newPoly = null;

						var ti4a = ti4 - ti2;
	
						var px4_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition() , -ti4a, h1);
						var px4_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition() , ti4a, h1);
						var px4_a2 = google.maps.geometry.spherical.computeOffset(px4_a , ti4, h1);
						var px4_d2 = google.maps.geometry.spherical.computeOffset(px4_d , -te4, h1);	
						var px4_b = google.maps.geometry.spherical.computeOffset(px4_a2, wi4, h1+side);
						var px4_c = google.maps.geometry.spherical.computeOffset(px4_d2, -we4, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px4_a, newPoly, 0);
						MapToolbar.addPoint(px4_b, newPoly, 1);
						MapToolbar.addPoint(px4_c, newPoly, 2);
						MapToolbar.addPoint(px4_d, newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4)*1000))/1000) + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4)*1000))/1000) + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + te4;
	
						var wst_4i = formLineWidenAddAt(pid2,px4_a);
						MapToolbar.addPoint(px4_a, MapToolbar.features["lineTab"][pid2], wst_4i + 1);
	
						var wst_4f = formLineWidenAddAt(pid2,px4_d);
						MapToolbar.addPoint(px4_d, MapToolbar.features["lineTab"][pid2], wst_4f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4f + 1).setDraggable(false);
	
						newPoly = null;	
	
					}
				
				} else {
					alert('sorry! unable to create platform on curve.');
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form4_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				var ti1 = parseFloat($('#form4_ti1').val());
				var wi1 = parseFloat($('#form4_wi1').val());
				var ti2 = parseFloat($('#form4_ti2').val());
				var wi2 = parseFloat($('#form4_wi2').val());
				
				var te1 = parseFloat($('#form4_tf1').val());
				var we1 = parseFloat($('#form4_wf1').val());
				var te2 = parseFloat($('#form4_tf2').val());
				var we2 = parseFloat($('#form4_wf2').val());

				var ti3 = parseFloat($('#form4_ti3').val());
				var wi3 = parseFloat($('#form4_wi3').val());
				var ti4 = parseFloat($('#form4_ti4').val());
				var wi4 = parseFloat($('#form4_wi4').val());
				
				var te3 = parseFloat($('#form4_tf3').val());
				var we3 = parseFloat($('#form4_wf3').val());
				var te4 = parseFloat($('#form4_tf4').val());
				var we4 = parseFloat($('#form4_wf4').val());				
				
				var ti = (ti1 >= ti2)? ti1 : ti2;
				var tf = (te1 >= te2)? te1 : te2;
				
				var sL = ti + platform_length + tf;
				
				var ptype = pid1.split('_')[0];
				if (ptype == 'line') {
					var form = testForm(pid1,pid2,idx,howtoForm,sL);
					
					if (!form.overlap) {
						var offset = form.offset;
						var side = form.side;
						var h1;
						var wst;
						var wed;
						var wst2;
						var wed2;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);
															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);		
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
								
							}
						}
						
						
						var ti3a = ti1 - ti3;
								
						var px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3a, h1);
						var px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition() , -ti3a, h1);
						var px3_a2 = google.maps.geometry.spherical.computeOffset(px3_a , ti3, h1);
						var px3_d2 = google.maps.geometry.spherical.computeOffset(px3_d , -te3, h1);	
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a2, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d2, -we3, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_a, newPoly, 1);
						MapToolbar.addPoint(px3_b, newPoly, 2);
						MapToolbar.addPoint(px3_c, newPoly, 3);
						MapToolbar.addPoint(px3_d, newPoly, 4);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition(), newPoly, 5);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3a;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + (Math.round((wi1/ti1) * ti3a * 1000)/1000) + ':' + ti3;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':';
						newPoly.markers.getAt(4).lineX = pid1 + ':' + (-1*side) + ':' + (Math.round((we1/te1) * ti3a * 1000)/1000) + ':' + te3;
						newPoly.markers.getAt(5).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3a;

						var wst_3i = formLineWidenAddAt(pid1,px3_a);
						//MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst_3i + 1);
	
						var wst_3f = formLineWidenAddAt(pid1,px3_d);
						//MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], wst_3f + 1);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).setDraggable(false);
	
						newPoly = null;

						var ti4a = ti2 - ti4;
	
						var px4_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), ti4a, h1);
						var px4_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition() , -ti4a, h1);
						var px4_a2 = google.maps.geometry.spherical.computeOffset(px4_a , ti4, h1);
						var px4_d2 = google.maps.geometry.spherical.computeOffset(px4_d , -te4, h1);	
						var px4_b = google.maps.geometry.spherical.computeOffset(px4_a2, wi4, h1+side);
						var px4_c = google.maps.geometry.spherical.computeOffset(px4_d2, -we4, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px4_a, newPoly, 1);
						MapToolbar.addPoint(px4_b, newPoly, 2);
						MapToolbar.addPoint(px4_c, newPoly, 3);
						MapToolbar.addPoint(px4_d, newPoly, 4);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition(), newPoly, 5);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4a;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + (Math.round((wi2/ti2) * ti4a * 1000)/1000) + ':' + ti4;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4)*1000))/1000) + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4)*1000))/1000) + ':';
						newPoly.markers.getAt(4).lineX = pid1 + ':' + side + ':' + (Math.round((we2/te2) * ti4a * 1000)/1000) + ':' + te4;
						newPoly.markers.getAt(5).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4a;
	
						var wst_4i = formLineWidenAddAt(pid2,px4_a);
						//MapToolbar.addPoint(px4_a, MapToolbar.features["lineTab"][pid2], wst_4i + 1);
	
						var wst_4f = formLineWidenAddAt(pid2,px4_d);
						//MapToolbar.addPoint(px4_d, MapToolbar.features["lineTab"][pid2], wst_4f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4f + 1).setDraggable(false);
	
						newPoly = null;
						
					}
				
				} else {
					alert('sorry! unable to create platform on curve.');
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form5_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				var ti1 = parseFloat($('#form5_ti1').val());
				var wi1 = parseFloat($('#form5_wi1').val());
				var ti2 = parseFloat($('#form5_ti2').val());
				var wi2 = parseFloat($('#form5_wi2').val());
				
				var te1 = parseFloat($('#form5_tf1').val());
				var we1 = parseFloat($('#form5_wf1').val());
				var te2 = parseFloat($('#form5_tf2').val());
				var we2 = parseFloat($('#form5_wf2').val());
			
				var ti = (ti1 >= ti2)? ti1 : ti2;
				var tf = (te1 >= te2)? te1 : te2;
				
				var sL = ti + platform_length + tf;
				
				var ptype = pid1.split('_')[0];
				if (ptype == 'line') {
					var form = testForm(pid1,pid2,idx,howtoForm,sL);
					
					if (!form.overlap) {
						var offset = form.offset;
						var side = form.side;
						var h1;
						var wst;
						var wed;
						var wst2;
						var wed2;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);
															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);		
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
								
							}
						}
						
								
						var px3_b = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
						var px3_c = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition() , -te1, h1);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
						MapToolbar.addPoint(px3_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti1;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi1 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we1 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0:' + te1;

						//var wst_3i = formLineWidenAddAt(pid1,px3_a);
						//MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst_3i + 1);
	
						//var wst_3f = formLineWidenAddAt(pid1,px3_d);
						//MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], wst_3f + 1);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).setDraggable(false);
	
						newPoly = null;

						//var ti4a = ti2 - ti4;
	
						var px4_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), ti2, h1);
						var px4_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition() , -te2, h1);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px4_a, newPoly, 1);
						MapToolbar.addPoint(px4_d, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':0:' + ti2;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + wi2 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + we2 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':0:' + te2;

	
						//var wst_4i = formLineWidenAddAt(pid2,px4_a);
						//MapToolbar.addPoint(px4_a, MapToolbar.features["lineTab"][pid2], wst_4i + 1);
	
						//var wst_4f = formLineWidenAddAt(pid2,px4_d);
						//MapToolbar.addPoint(px4_d, MapToolbar.features["lineTab"][pid2], wst_4f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).setDraggable(false);
	
						newPoly = null;
						
					}
				
				} else {
					alert('sorry! unable to create platform on curve.');
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form6_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				var ti3 = parseFloat($('#form6_ti3').val());
				var wi3 = parseFloat($('#form6_wi3').val());
				var ti4 = parseFloat($('#form6_ti4').val());
				var wi4 = parseFloat($('#form6_wi4').val());
				
				var te3 = parseFloat($('#form6_tf3').val());
				var we3 = parseFloat($('#form6_wf3').val());
				var te4 = parseFloat($('#form6_tf4').val());
				var we4 = parseFloat($('#form6_wf4').val());				
				
				var ti = (ti3 >= ti4)? ti3 : ti4;
				var tf = (te3 >= te4)? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var ptype = pid1.split('_')[0];
				if (ptype == 'line') {
					var form = testForm(pid1,pid2,idx,howtoForm,sL);
					
					if (!form.overlap) {
						var offset = form.offset;
						var side = form.side;
						var h1;
						var wst;
						var wed;
						var wst2;
						var wed2;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setIcon(image);
															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setIcon(image);		
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
								
							}
						}
														
						var px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3, h1);
						var px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -ti3, h1);	
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d, -we3, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
						MapToolbar.addPoint(px3_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0:' + te3;
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setDraggable(false);
	
						newPoly = null;

						var px4_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition() , ti4, h1);
						var px4_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition() , -te4, h1);
						var px4_b = google.maps.geometry.spherical.computeOffset(px4_a, wi4, h1+side);
						var px4_c = google.maps.geometry.spherical.computeOffset(px4_d, -we4, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px4_b, newPoly, 1);
						MapToolbar.addPoint(px4_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4)*1000))/1000) + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4)*1000))/1000) + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + te4;
	
						//var wst_4i = formLineWidenAddAt(pid2,px4_a);
						//MapToolbar.addPoint(px4_a, MapToolbar.features["lineTab"][pid2], wst_4i + 1);
	
						//var wst_4f = formLineWidenAddAt(pid2,px4_d);
						//MapToolbar.addPoint(px4_d, MapToolbar.features["lineTab"][pid2], wst_4f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+1).sline += ',' + newPoly.id + ':0:0';
						}
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+2).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+2).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+2).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4f + 1).setDraggable(false);
	
						newPoly = null;	
						
					}
				
				} else {
					alert('sorry! unable to create platform on curve.');
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form7_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				var ti1 = parseFloat($('#form7_ti1').val());
				var wi1 = parseFloat($('#form7_wi1').val());
				var ti2 = parseFloat($('#form7_ti2').val());
				var wi2 = parseFloat($('#form7_wi2').val());
				
				var te1 = parseFloat($('#form7_tf1').val());
				var we1 = parseFloat($('#form7_wf1').val());
				var te2 = parseFloat($('#form7_tf2').val());
				var we2 = parseFloat($('#form7_wf2').val());
			
				var ti = (ti1 >= ti2)? ti1 : ti2;
				var tf = (te1 >= te2)? te1 : te2;
				
				var sL = ti + platform_length + tf;
				
				var ptype = pid1.split('_')[0];
				if (ptype == 'line') {
					var form = testForm(pid1,pid2,idx,howtoForm,sL);
					
					if (!form.overlap) {
						var offset = form.offset;
						var side = form.side;
						var h1;
						var wst;
						var wed;
						var wst2;
						var wed2;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);
															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);		
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
								
							}
						}
						
								
						var px3_b = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
						var px3_c = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition() , -te1, h1);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
						MapToolbar.addPoint(px3_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti1;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi1 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we1 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0:' + te1;

						//var wst_3i = formLineWidenAddAt(pid1,px3_a);
						//MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst_3i + 1);
	
						//var wst_3f = formLineWidenAddAt(pid1,px3_d);
						//MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], wst_3f + 1);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).setDraggable(false);
	
						newPoly = null;

						//var ti4a = ti2 - ti4;
	
						var px4_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), ti2, h1);
						var px4_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition() , -te2, h1);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px4_a, newPoly, 1);
						MapToolbar.addPoint(px4_d, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':0:' + ti2;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + wi2 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + we2 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':0:' + te2;

	
						//var wst_4i = formLineWidenAddAt(pid2,px4_a);
						//MapToolbar.addPoint(px4_a, MapToolbar.features["lineTab"][pid2], wst_4i + 1);
	
						//var wst_4f = formLineWidenAddAt(pid2,px4_d);
						//MapToolbar.addPoint(px4_d, MapToolbar.features["lineTab"][pid2], wst_4f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).setDraggable(false);
	
						newPoly = null;
						
					}
				
				} else {
					alert('sorry! unable to create platform on curve.');
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form8_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				var ti3 = parseFloat($('#form8_ti3').val());
				var wi3 = parseFloat($('#form8_wi3').val());
				var ti4 = parseFloat($('#form8_ti4').val());
				var wi4 = parseFloat($('#form8_wi4').val());
				
				var te3 = parseFloat($('#form8_tf3').val());
				var we3 = parseFloat($('#form8_wf3').val());
				var te4 = parseFloat($('#form8_tf4').val());
				var we4 = parseFloat($('#form8_wf4').val());				
				
				var ti = (ti3 >= ti4)? ti3 : ti4;
				var tf = (te3 >= te4)? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var ptype = pid1.split('_')[0];
				if (ptype == 'line') {
					var form = testForm(pid1,pid2,idx,howtoForm,sL);
					
					if (!form.overlap) {
						var offset = form.offset;
						var side = form.side;
						var h1;
						var wst;
						var wed;
						var wst2;
						var wed2;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setIcon(image);
															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setIcon(image);		
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
								
							}
						}
														
						var px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3, h1);
						var px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -ti3, h1);	
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d, -we3, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
						MapToolbar.addPoint(px3_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0:' + te3;
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setDraggable(false);
	
						newPoly = null;

						var px4_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition() , ti4, h1);
						var px4_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition() , -te4, h1);
						var px4_b = google.maps.geometry.spherical.computeOffset(px4_a, wi4, h1+side);
						var px4_c = google.maps.geometry.spherical.computeOffset(px4_d, -we4, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px4_b, newPoly, 1);
						MapToolbar.addPoint(px4_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4)*1000))/1000) + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4)*1000))/1000) + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + te4;
	
						//var wst_4i = formLineWidenAddAt(pid2,px4_a);
						//MapToolbar.addPoint(px4_a, MapToolbar.features["lineTab"][pid2], wst_4i + 1);
	
						//var wst_4f = formLineWidenAddAt(pid2,px4_d);
						//MapToolbar.addPoint(px4_d, MapToolbar.features["lineTab"][pid2], wst_4f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+1).sline += ',' + newPoly.id + ':0:0';
						}
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+2).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+2).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+2).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4f + 1).setDraggable(false);
	
						newPoly = null;	
						
					}
				
				} else {
					alert('sorry! unable to create platform on curve.');
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form9_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				var ti1 = parseFloat($('#form9_ti1').val());
				var wi1 = parseFloat($('#form9_wi1').val());
				var ti2 = parseFloat($('#form9_ti2').val());
				var wi2 = parseFloat($('#form9_wi2').val());
				
				var te1 = parseFloat($('#form9_tf1').val());
				var we1 = parseFloat($('#form9_wf1').val());
				var te2 = parseFloat($('#form9_tf2').val());
				var we2 = parseFloat($('#form9_wf2').val());

				var ti3 = parseFloat($('#form9_ti3').val());
				var wi3 = parseFloat($('#form9_wi3').val());
				var ti4 = parseFloat($('#form9_ti4').val());
				var wi4 = parseFloat($('#form9_wi4').val());
				
				var te3 = parseFloat($('#form9_tf3').val());
				var we3 = parseFloat($('#form9_wf3').val());
				var te4 = parseFloat($('#form9_tf4').val());
				var we4 = parseFloat($('#form9_wf4').val());				
				
				var ti = (ti1 >= ti2)? ti1 : ti2;
				var tf = (te1 >= te2)? te1 : te2;
				
				var sL = ti + platform_length + tf;
				
				var ptype = pid1.split('_')[0];
				if (ptype == 'line') {
					var form = testForm(pid1,pid2,idx,howtoForm,sL);
					
					if (!form.overlap) {
						var offset = form.offset;
						var side = form.side;
						var h1;
						var wst;
						var wed;
						var wst2;
						var wed2;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);
															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);		
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
								
							}
						}
						
					
						var ti3a = ti1 - ti3;
								
						var px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3a, h1);
						var px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition() , -ti3a, h1);
						var px3_a2 = google.maps.geometry.spherical.computeOffset(px3_a , ti3, h1);
						var px3_d2 = google.maps.geometry.spherical.computeOffset(px3_d , -te3, h1);	
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a2, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d2, -we3, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_a, newPoly, 1);
						MapToolbar.addPoint(px3_b, newPoly, 2);
						MapToolbar.addPoint(px3_c, newPoly, 3);
						MapToolbar.addPoint(px3_d, newPoly, 4);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition(), newPoly, 5);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3a;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + (Math.round((wi1/ti1) * ti3a * 1000)/1000) + ':' + ti3;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':';
						newPoly.markers.getAt(4).lineX = pid1 + ':' + (-1*side) + ':' + (Math.round((we1/te1) * ti3a * 1000)/1000) + ':' + te3;
						newPoly.markers.getAt(5).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3a;

						var wst_3i = formLineWidenAddAt(pid1,px3_a);
						//MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst_3i + 1);
	
						var wst_3f = formLineWidenAddAt(pid1,px3_d);
						//MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], wst_3f + 1);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).setDraggable(false);
	
						newPoly = null;
						
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px3_a, newPoly, 0);
						MapToolbar.addPoint(px3_d, newPoly, 1);
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':' + wi1 + ':';
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + we1 + ':';
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline += ',' + newPoly.id + ':0:0';
						}
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}									
						
						newPoly = null;

						var ti4a = ti2 - ti4;
	
						var px4_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), ti4a, h1);
						var px4_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition() , -ti4a, h1);
						var px4_a2 = google.maps.geometry.spherical.computeOffset(px4_a , ti4, h1);
						var px4_d2 = google.maps.geometry.spherical.computeOffset(px4_d , -te4, h1);	
						var px4_b = google.maps.geometry.spherical.computeOffset(px4_a2, wi4, h1+side);
						var px4_c = google.maps.geometry.spherical.computeOffset(px4_d2, -we4, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px4_a, newPoly, 1);
						MapToolbar.addPoint(px4_b, newPoly, 2);
						MapToolbar.addPoint(px4_c, newPoly, 3);
						MapToolbar.addPoint(px4_d, newPoly, 4);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition(), newPoly, 5);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4a;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + (Math.round((wi2/ti2) * ti4a * 1000)/1000) + ':' + ti4;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4)*1000))/1000) + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4)*1000))/1000) + ':';
						newPoly.markers.getAt(4).lineX = pid1 + ':' + side + ':' + (Math.round((we2/te2) * ti4a * 1000)/1000) + ':' + te4;
						newPoly.markers.getAt(5).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4a;
	
						var wst_4i = formLineWidenAddAt(pid2,px4_a);
						//MapToolbar.addPoint(px4_a, MapToolbar.features["lineTab"][pid2], wst_4i + 1);
	
						var wst_4f = formLineWidenAddAt(pid2,px4_d);
						//MapToolbar.addPoint(px4_d, MapToolbar.features["lineTab"][pid2], wst_4f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4f + 1).setDraggable(false);
	
						newPoly = null;
						
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px4_a, newPoly, 0);
						MapToolbar.addPoint(px4_d, newPoly, 1);
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + wi2 + ':';
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + we2 + ':';
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline += ',' + newPoly.id + ':0:0';
						}
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						newPoly = null;
					}
				
				} else {
					alert('sorry! unable to create platform on curve.');
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form10_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				var ti1 = parseFloat($('#form10_ti1').val());
				var wi1 = parseFloat($('#form10_wi1').val());
				var ti2 = parseFloat($('#form10_ti2').val());
				var wi2 = parseFloat($('#form10_wi2').val());
				
				var te1 = parseFloat($('#form10_tf1').val());
				var we1 = parseFloat($('#form10_wf1').val());
				var te2 = parseFloat($('#form10_tf2').val());
				var we2 = parseFloat($('#form10_wf2').val());

				var ti3 = parseFloat($('#form10_ti3').val());
				var wi3 = parseFloat($('#form10_wi3').val());
				var ti4 = parseFloat($('#form10_ti4').val());
				var wi4 = parseFloat($('#form10_wi4').val());
				
				var te3 = parseFloat($('#form10_tf3').val());
				var we3 = parseFloat($('#form10_wf3').val());
				var te4 = parseFloat($('#form10_tf4').val());
				var we4 = parseFloat($('#form10_wf4').val());				
				
				var ti = (ti3 >= ti4)? ti3 : ti4;
				var tf = (te3 >= te4)? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var ptype = pid1.split('_')[0];
				if (ptype == 'line') {
					var form = testForm(pid1,pid2,idx,howtoForm,sL);
					
					if (!form.overlap) {
						var offset = form.offset;
						var side = form.side;
						var h1;
						var wst;
						var wed;
						var wst2;
						var wed2;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst3 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								var pst1i = google.maps.geometry.spherical.computeOffset(pst3 , (ti3-ti1), h1);
								var pst1e = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -(te3-te1), h1);
								MapToolbar.addPoint(pst3, MapToolbar.features["lineTab"][pid1],idx);
								MapToolbar.addPoint(pst1i, MapToolbar.features["lineTab"][pid1],idx+1);
								MapToolbar.addPoint(pst1e, MapToolbar.features["lineTab"][pid1],idx+2);
								
								wst = idx + 1;
								wed = idx + 2;
								
								var pxa = google.maps.geometry.spherical.computeOffset(pst1i, ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(pst1e, -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(pst1i, offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(pst1i, offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);
															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								var pst3 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								var pst1i = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , (ti3-ti1), h1);
								var pst1e = google.maps.geometry.spherical.computeOffset(pst3 , -(te3-te1), h1);
								MapToolbar.addPoint(pst1i, MapToolbar.features["lineTab"][pid1],idx+1);
								MapToolbar.addPoint(pst1e, MapToolbar.features["lineTab"][pid1],idx+2);
								MapToolbar.addPoint(pst3, MapToolbar.features["lineTab"][pid1],idx+3);
								
								wst = idx + 1;
								wed = idx + 2;
								
								var pxa = google.maps.geometry.spherical.computeOffset(pst1i, ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(pst1e , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(pst1i , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(pst1i, offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);		
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
								
							}
						}
						
						var ti3a = ti3 - ti1;
								
						var px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , -ti3a, h1);
						var px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition() , ti3a, h1);
						var px3_a2 = google.maps.geometry.spherical.computeOffset(px3_a , ti3, h1);
						var px3_d2 = google.maps.geometry.spherical.computeOffset(px3_d , -te3, h1);	
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a2, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d2, -we3, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px3_a, newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
						MapToolbar.addPoint(px3_c, newPoly, 2);
						MapToolbar.addPoint(px3_d, newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0:' + te3;

	
						var wst_3i = formLineWidenAddAt(pid1,px3_a);
						//MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst_3i + 1);
	
						var wst_3f = formLineWidenAddAt(pid1,px3_d);
						//MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], wst_3f + 1);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).setDraggable(false);
	
						newPoly = null;
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 2).getPosition(), newPoly, 0);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 5).getPosition(), newPoly, 1);
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':' + wi1 + ':';
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + we1 + ':';
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline += ',' + newPoly.id + ':0:0';
						}
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}									
						
						newPoly = null;	

						var ti4a = ti4 - ti2;
	
						var px4_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition() , -ti4a, h1);
						var px4_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition() , ti4a, h1);
						var px4_a2 = google.maps.geometry.spherical.computeOffset(px4_a , ti4, h1);
						var px4_d2 = google.maps.geometry.spherical.computeOffset(px4_d , -te4, h1);	
						var px4_b = google.maps.geometry.spherical.computeOffset(px4_a2, wi4, h1+side);
						var px4_c = google.maps.geometry.spherical.computeOffset(px4_d2, -we4, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px4_a, newPoly, 0);
						MapToolbar.addPoint(px4_b, newPoly, 1);
						MapToolbar.addPoint(px4_c, newPoly, 2);
						MapToolbar.addPoint(px4_d, newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4)*1000))/1000) + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4)*1000))/1000) + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + te4;
	
						var wst_4i = formLineWidenAddAt(pid2,px4_a);
						MapToolbar.addPoint(px4_a, MapToolbar.features["lineTab"][pid2], wst_4i + 1);
	
						var wst_4f = formLineWidenAddAt(pid2,px4_d);
						MapToolbar.addPoint(px4_d, MapToolbar.features["lineTab"][pid2], wst_4f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4f + 1).setDraggable(false);
	
						newPoly = null;	
						
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst_4i+2).getPosition(), newPoly, 0);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst_4i+5).getPosition(), newPoly, 1);
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + wi2 + ':';
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + we2 + ':';
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline += ',' + newPoly.id + ':0:0';
						}
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						newPoly = null;						
						
					}
				
				} else {
					alert('sorry! unable to create platform on curve.');
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form11_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				var ti3 = parseFloat($('#form11_ti3').val());
				var wi3 = parseFloat($('#form11_wi3').val());
				var ti4 = parseFloat($('#form11_ti4').val());
				var wi4 = parseFloat($('#form11_wi4').val());
				
				var te3 = parseFloat($('#form11_tf3').val());
				var we3 = parseFloat($('#form11_wf3').val());
				var te4 = parseFloat($('#form11_tf4').val());
				var we4 = parseFloat($('#form11_wf4').val());				
				
				var ti5 = parseFloat($('#form11_ti5').val());
				var wi5 = parseFloat($('#form11_wi5').val());
				var ti6 = parseFloat($('#form11_ti6').val());
				var wi6 = parseFloat($('#form11_wi6').val());
				
				var te5 = parseFloat($('#form11_tf5').val());
				var we5 = parseFloat($('#form11_wf5').val());
				var te6 = parseFloat($('#form11_tf6').val());
				var we6 = parseFloat($('#form11_wf6').val());				
				
				var ti = (ti3 >= ti4)? ti3 : ti4;
				var tf = (te3 >= te4)? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var ptype = pid1.split('_')[0];
				if (ptype == 'line') {
					var form = testForm(pid1,pid2,idx,howtoForm,sL);
					
					if (!form.overlap) {
						var offset = form.offset;
						var side = form.side;
						var h1;
						var wst;
						var wed;
						var wst2;
						var wed2;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setIcon(image);
															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setIcon(image);		
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
								
							}
						}
														
						var px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3, h1);
						var px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te3, h1);	
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d, -we3, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
						MapToolbar.addPoint(px3_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0:' + te3;
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setDraggable(false);
	
						newPoly = null;
						
						var ti5a = ti3 -ti5;
						var te5a = te3 -te5;
						var px5_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti5a, h1);
						var px5_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te5a, h1);	
						var px5_a2 = google.maps.geometry.spherical.computeOffset(px5_a, ti5, h1);
						var px5_d2 = google.maps.geometry.spherical.computeOffset(px5_d, -te5, h1);	
						var px5_b = google.maps.geometry.spherical.computeOffset(px5_a2, wi5, h1-side);
						var px5_c = google.maps.geometry.spherical.computeOffset(px5_d2, -we5, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px5_a, newPoly, 0);
						MapToolbar.addPoint(px5_b, newPoly, 1);
						MapToolbar.addPoint(px5_c, newPoly, 2);
						MapToolbar.addPoint(px5_d, newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti5;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi5 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we5 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0:' + te5;
						
						//MapToolbar.addPoint(px5_a, MapToolbar.features["lineTab"][pid1], wst+1);
						//MapToolbar.addPoint(px5_d, MapToolbar.features["lineTab"][pid1], wed+2);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wed+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed+1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed+1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wed+1).setDraggable(false);
	
						newPoly = null;
						

						var px4_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition() , ti4, h1);
						var px4_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition() , -te4, h1);
						var px4_b = google.maps.geometry.spherical.computeOffset(px4_a, wi4, h1+side);
						var px4_c = google.maps.geometry.spherical.computeOffset(px4_d, -we4, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px4_b, newPoly, 1);
						MapToolbar.addPoint(px4_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4)*1000))/1000) + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4)*1000))/1000) + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + te4;
	
						//var wst_4i = formLineWidenAddAt(pid2,px4_a);
						//MapToolbar.addPoint(px4_a, MapToolbar.features["lineTab"][pid2], wst_4i + 1);
	
						//var wst_4f = formLineWidenAddAt(pid2,px4_d);
						//MapToolbar.addPoint(px4_d, MapToolbar.features["lineTab"][pid2], wst_4f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+1).sline += ',' + newPoly.id + ':0:0';
						}
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+2).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+2).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+2).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4f + 1).setDraggable(false);
	
						newPoly = null;	

						var ti6a = ti4 -ti6;
						var te6a = te4 -te6;
						var px6_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition() , ti6a, h1);
						var px6_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition() , -te6a, h1);
						var px6_a2 = google.maps.geometry.spherical.computeOffset(px6_a, ti6, h1);
						var px6_d2 = google.maps.geometry.spherical.computeOffset(px6_d, -te6, h1);
						var px6_b = google.maps.geometry.spherical.computeOffset(px6_a2, wi6, h1+side);
						var px6_c = google.maps.geometry.spherical.computeOffset(px6_d2, -we6, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px6_a, newPoly, 0);
						MapToolbar.addPoint(px6_b, newPoly, 1);
						MapToolbar.addPoint(px6_c, newPoly, 2);
						MapToolbar.addPoint(px6_d, newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti6;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi6)*1000))/1000) + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we6)*1000))/1000) + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + te6;
	
						var wst_6i = formLineWidenAddAt(pid2,px6_a);
						MapToolbar.addPoint(px6_a, MapToolbar.features["lineTab"][pid2], wst_6i + 1);
	
						var wst_6f = formLineWidenAddAt(pid2,px6_d);
						MapToolbar.addPoint(px6_d, MapToolbar.features["lineTab"][pid2], wst_6f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_6i+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_6i+1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_6i+1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_6i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_6f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_6f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_6f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_6f + 1).setDraggable(false);
	
						newPoly = null;							
						
					}
				
				} else {
					alert('sorry! unable to create platform on curve.');
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form12_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				var ti1 = parseFloat($('#form12_ti1').val());
				var wi1 = parseFloat($('#form12_wi1').val());
				var ti2 = parseFloat($('#form12_ti2').val());
				var wi2 = parseFloat($('#form12_wi2').val());
				
				var te1 = parseFloat($('#form12_tf1').val());
				var we1 = parseFloat($('#form12_wf1').val());
				var te2 = parseFloat($('#form12_tf2').val());
				var we2 = parseFloat($('#form12_wf2').val());

				var ti3 = parseFloat($('#form12_ti3').val());
				var wi3 = parseFloat($('#form12_wi3').val());
				var ti4 = parseFloat($('#form12_ti4').val());
				var wi4 = parseFloat($('#form12_wi4').val());
				
				var te3 = parseFloat($('#form12_tf3').val());
				var we3 = parseFloat($('#form12_wf3').val());
				var te4 = parseFloat($('#form12_tf4').val());
				var we4 = parseFloat($('#form12_wf4').val());	
				
				var ti = (ti1 >= ti2)? ti1 : ti2;
				var tf = (te1 >= te2)? te1 : te2;
				
				var sL = ti + platform_length + tf;
				
				var ptype = pid1.split('_')[0];
				if (ptype == 'line') {
					var form = testForm(pid1,pid2,idx,howtoForm,sL);
					
					if (!form.overlap) {
						var offset = form.offset;
						var side = form.side;
						var h1;
						var wst;
						var wed;
						var wst2;
						var wed2;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);
															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);		
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
								
							}
						}					
								
						var px3_a0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3, h1);
						var px3_a = google.maps.geometry.spherical.computeOffset(px3_a0, wi3, h1-side);
						var px3_b0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition() , -te3, h1);
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_b0, -we3, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px3_a, newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + ':';
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':';

						var wst_3i = formLineWidenAddAt(pid1,px3_a);
						MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst_3i + 1);
	
						var wst_3f = formLineWidenAddAt(pid1,px3_b);
						MapToolbar.addPoint(px3_b, MapToolbar.features["lineTab"][pid1], wst_3f + 1);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).setDraggable(false);
	
						newPoly = null;
						
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 2).getPosition(), newPoly, 1);
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + wi1 + ':' + ti1;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + we1 + ':' + te1;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 2).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 2).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 2).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 2).setDraggable(false);
						
						newPoly = null;

						//var ti4a = ti2 - ti4;
	
						var px4_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), ti4, h1);
						var px4_b = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition() , -te4, h1);
						
						var px4_a0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition() , ti4, h1);
						var px4_a = google.maps.geometry.spherical.computeOffset(px4_a0, wi4, h1+side);
						var px4_b0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition() , -te4, h1);
						var px4_b = google.maps.geometry.spherical.computeOffset(px4_b0, -we4, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px4_a, newPoly, 0);
						MapToolbar.addPoint(px4_b, newPoly, 1);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + wi4 + ':';
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + we4 + ':';
	
						var wst_4i = formLineWidenAddAt(pid2,px4_a);
						MapToolbar.addPoint(px4_a, MapToolbar.features["lineTab"][pid2], wst_4i + 1);
	
						var wst_4f = formLineWidenAddAt(pid2,px4_b);
						MapToolbar.addPoint(px4_b, MapToolbar.features["lineTab"][pid2], wst_4f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i+1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i+1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i+1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).setDraggable(false);
	
						newPoly = null;
						
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst_4i).getPosition(), newPoly, 0);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst_4f + 2).getPosition(), newPoly, 1);
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + wi2 + ':' + ti2;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + we2 + ':' + te2;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 2).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 2).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 2).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 2).setDraggable(false);
						
						newPoly = null;
						
					}
				
				} else {
					alert('sorry! unable to create platform on curve.');
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form13_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				var ti1 = parseFloat($('#form13_ti1').val());
				var wi1 = parseFloat($('#form13_wi1').val());
				var ti2 = parseFloat($('#form13_ti2').val());
				var wi2 = parseFloat($('#form13_wi2').val());
				
				var te1 = parseFloat($('#form13_tf1').val());
				var we1 = parseFloat($('#form13_wf1').val());
				var te2 = parseFloat($('#form13_tf2').val());
				var we2 = parseFloat($('#form13_wf2').val());

				var ti3 = parseFloat($('#form13_ti3').val());
				var wi3 = parseFloat($('#form13_wi3').val());
				var ti4 = parseFloat($('#form13_ti4').val());
				var wi4 = parseFloat($('#form13_wi4').val());
				
				var te3 = parseFloat($('#form13_tf3').val());
				var we3 = parseFloat($('#form13_wf3').val());
				var te4 = parseFloat($('#form13_tf4').val());
				var we4 = parseFloat($('#form13_wf4').val());	
				
				var ti = (ti3 >= ti4)? ti3 : ti4;
				var tf = (te3 >= te4)? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var ptype = pid1.split('_')[0];
				if (ptype == 'line') {
					var form = testForm(pid1,pid2,idx,howtoForm,sL);
					
					if (!form.overlap) {
						var offset = form.offset;
						var side = form.side;
						var h1;
						var wst;
						var wed;
						var wst2;
						var wed2;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);
															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);		
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':';
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2)*1000))/1000) + ':';
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2)*1000))/1000) + ':';	
								
							}
						}	

						var ti3a = ti3 - ti1;
						var te3a = te3 - te1;		
						var px3_a0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).getPosition(), ti3a, h1);
						var px3_a = google.maps.geometry.spherical.computeOffset(px3_a0, wi3, h1-side);
						var px3_b0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).getPosition(), -te3a, h1);
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_b0, -we3, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_a, newPoly, 1);
						MapToolbar.addPoint(px3_b, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3a;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0:' + te3a;

						//var wst_3i = formLineWidenAddAt(pid1,px3_a);
						//MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst_3i + 1);
	
						//var wst_3f = formLineWidenAddAt(pid1,px3_b);
						//MapToolbar.addPoint(px3_b, MapToolbar.features["lineTab"][pid1], wst_3f + 1);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).setDraggable(false);
	
						newPoly = null;
						
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition(), newPoly, 1);
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + wi1 + ':' + ti1;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + we1 + ':' + te1;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).setDraggable(false);
						
						newPoly = null;

						var ti4a = ti4 - ti2;
						var te4a = te4 - te2;
						var px4_a0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition(), ti4a, h1);
						var px4_b0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).getPosition(), -te4a, h1);
						var px4_a = google.maps.geometry.spherical.computeOffset(px4_a0, wi4, h1+side);
						var px4_b = google.maps.geometry.spherical.computeOffset(px4_b0, -we4, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px4_a, newPoly, 1);
						MapToolbar.addPoint(px4_b, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':0:' + ti4a;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + we4 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + wi4 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':0:' + te4a;
	
						//var wst_4i = formLineWidenAddAt(pid2,px4_a);
						//MapToolbar.addPoint(px4_a, MapToolbar.features["lineTab"][pid2], wst_4i + 1);
	
						//var wst_4f = formLineWidenAddAt(pid2,px4_b);
						//MapToolbar.addPoint(px4_b, MapToolbar.features["lineTab"][pid2], wst_4f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).setDraggable(false);
	
						newPoly = null;
						
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition(), newPoly, 1);
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + wi2 + ':' + ti2;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + we2 + ':' + te2;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).setDraggable(false);
						
						newPoly = null;
						
					}
				
				} else {
					alert('sorry! unable to create platform on curve.');
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form14_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				var ti3 = parseFloat($('#form14_ti3').val());
				var wi3 = parseFloat($('#form14_wi3').val());
				var ti4 = parseFloat($('#form14_ti4').val());
				var wi4 = parseFloat($('#form14_wi4').val());
				
				var te3 = parseFloat($('#form14_tf3').val());
				var we3 = parseFloat($('#form14_wf3').val());
				var te4 = parseFloat($('#form14_tf4').val());
				var we4 = parseFloat($('#form14_wf4').val());				
				
				var ti5 = parseFloat($('#form14_ti5').val());
				var wi5 = parseFloat($('#form14_wi5').val());
				var ti6 = parseFloat($('#form14_ti6').val());
				var wi6 = parseFloat($('#form14_wi6').val());
				
				var te5 = parseFloat($('#form14_tf5').val());
				var we5 = parseFloat($('#form14_wf5').val());
				var te6 = parseFloat($('#form14_tf6').val());
				var we6 = parseFloat($('#form14_wf6').val());				
				
				var ti = (ti3 >= ti4)? ti3 : ti4;
				var tf = (te3 >= te4)? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var ptype = pid1.split('_')[0];
				if (ptype == 'line') {
					var form = testForm(pid1,pid2,idx,howtoForm,sL);
					
					if (!form.overlap) {
						var offset = form.offset;
						var side = form.side;
						var h1;
						var wst;
						var wed;
						var wst2;
						var wed2;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setIcon(image);
															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								
								var px0 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0)? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setIcon(image);		
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
								
							}
						}
														
						var px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3, h1);
						var px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te3, h1);	
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d, -we3, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
						MapToolbar.addPoint(px3_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0:' + te3;
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setDraggable(false);
	
						newPoly = null;
						
						var px5_a0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti5, h1);
						var px5_b0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te5, h1);	
	
						var px5_a = google.maps.geometry.spherical.computeOffset(px5_a0, wi5, h1-side);
						var px5_b = google.maps.geometry.spherical.computeOffset(px5_b0, -we5, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px5_a, newPoly, 0);
						MapToolbar.addPoint(px5_b, newPoly, 1);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':' + wi5 + ':';
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + we5 + ':';
						
						var wst_5i = formLineWidenAddAt(pid1,px5_a);
						MapToolbar.addPoint(px5_a0, MapToolbar.features["lineTab"][pid1], wst_5i + 1);
	
						var wst_5f = formLineWidenAddAt(pid1,px5_b);
						MapToolbar.addPoint(px5_b0, MapToolbar.features["lineTab"][pid1], wst_5f + 1);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i + 1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i + 1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i + 1).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).setDraggable(false);
	
						newPoly = null;
						

						var px4_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition() , ti4, h1);
						var px4_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition() , -te4, h1);
						var px4_b = google.maps.geometry.spherical.computeOffset(px4_a, wi4, h1+side);
						var px4_c = google.maps.geometry.spherical.computeOffset(px4_d, -we4, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px4_b, newPoly, 1);
						MapToolbar.addPoint(px4_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition(), newPoly, 3);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4)*1000))/1000) + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4)*1000))/1000) + ':';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + te4;
	
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+1).sline += ',' + newPoly.id + ':0:0';
						}
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+2).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+2).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst2+2).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4f + 1).setDraggable(false);
	
						newPoly = null;	


						var px6_a0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition() , ti6, h1);
						var px6_b0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition() , -te6, h1);
						var px6_a = google.maps.geometry.spherical.computeOffset(px6_a0, wi6, h1+side);
						var px6_b = google.maps.geometry.spherical.computeOffset(px6_b0, -we6, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px6_a, newPoly, 0);
						MapToolbar.addPoint(px6_b, newPoly, 1);
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi6)*1000))/1000) + ':';
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we6)*1000))/1000) + ':';
	
						var wst_6i = formLineWidenAddAt(pid2,px6_a);
						MapToolbar.addPoint(px6_a0, MapToolbar.features["lineTab"][pid2], wst_6i + 1);
	
						var wst_6f = formLineWidenAddAt(pid2,px6_b);
						MapToolbar.addPoint(px6_b0, MapToolbar.features["lineTab"][pid2], wst_6f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i+1).sline = newPoly.id + ':0:0';
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i+1).sline += ',' + newPoly.id + ':0:0';
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1);
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).sline += ',' + newPoly.id + ':1:' + (newPoly.markers.length-1);
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).setDraggable(false);
	
						newPoly = null;							
						
					}
				
				} else {
					alert('sorry! unable to create platform on curve.');
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}
		});

		$('#form15_Insert').click(function() {
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined')) {
				var pid = $('#dInsForm_pid').val();
				var idxSt = parseInt($('#form15_st').val());
				var idxEd = parseInt($('#form15_ed').val());
				
				$('#dialogInsertPlatform').dialog('close');
			}
		});

		// dialog Switch Track
		$('#dInsSTC_OK').click(function() {
			if (($('#dInsSTC_T1').val() != '') && ($('#dInsSTC_T2').val() != '')) {
				var swL = parseInt($('#dInsSTC_swL').val());
				var pid = $('#dInsSTC_T1').val(); 
				var mIdx = parseInt($('#dInsSTC_t1mi').val());
				var offset = 0;
				var side = 0;
				
				for (var oi = 0; oi <= mIdx; oi++) {
					if (MapToolbar.features["lineTab"][pid].markers.getAt(oi).sline.indexOf($('#dInsSTC_T2').val()) >= 0) {
						
						var plines = MapToolbar.features["lineTab"][pid].markers.getAt(oi).sline.split(',');
						for (var a=0; a < plines.length;a++) {
							var ar1 = plines[a].split(':'); 
							if (ar1[0] == $('#dInsSTC_T2').val()) {
								if  (ar1[1] == '0') {
									if (typeof  MapToolbar.features["lineTab"][ar1[0]] != 'undefined') {
										var ino = parseInt(ar1[1] );
										var lineXdata = MapToolbar.features["lineTab"][ar1[0]].markers.getAt(ino).lineX;
										arrLineX = lineXdata.split(':'); 
										if (arrLineX[0] == pid) {
											side = parseInt(arrLineX[1] );
											offset = parseFloat(arrLineX[2]);
											break;
										}
									}
								}
								
							}
						}
						if (offset !== 0) { break; }
					}
				}
				
				switch (true) {
					case (document.getElementById('swtype12-21').checked):
						var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).getPosition());
						
						var odml = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), swL, h1); 
						MapToolbar.addPoint(odml, MapToolbar.features["lineTab"][pid], mIdx+1);
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).setDraggable(false);
										
						MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing();	
						
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), newPoly, 0); //1st point on track 1 to turnout
						var platLng = google.maps.geometry.spherical.computeOffset(odml, Math.abs(offset), h1 +  side);
						MapToolbar.addPoint(platLng, newPoly, 1);
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline = newPoly.id + ':0:0';
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline += ',' + newPoly.id + ':0:0';
						}
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline = newPoly.id + ':1:1' ;
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline += ',' + newPoly.id + ':1:1' ;
						}	
						
						newPoly.markers.getAt(0).lineX = pid + ':' + side + ':0:' + swL;
						newPoly.markers.getAt(1).lineX = pid + ':' + side + ':' + Math.abs(offset) + ':';					
						
						newPoly = null;

						MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing();	

						platLng = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), Math.abs(offset), h1 +  side);
						MapToolbar.addPoint(platLng, newPoly, 0);

						odml = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), swL, h1); 	 					
						MapToolbar.addPoint(odml, newPoly, 1); //1st point on track 2 to turnout
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline = newPoly.id + ':0:0';
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline += ',' + newPoly.id + ':0:0';
						}
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline = newPoly.id + ':1:1' ;
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline += ',' + newPoly.id + ':1:1' ;
						}	
						
						newPoly.markers.getAt(0).lineX = pid + ':' + side + ':' + Math.abs(offset) + ':' + swL;	
						newPoly.markers.getAt(1).lineX = pid + ':' + side + ':0:' ;
						
						
						newPoly = null;		

						break;
					case (document.getElementById('swtype12').checked):
						var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).getPosition());
						
						var odml = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), swL, h1); 
						MapToolbar.addPoint(odml, MapToolbar.features["lineTab"][pid], mIdx+1);
						
						MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing();	
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), newPoly, 0); //1st point on track 1 to turnout
						var platLng = google.maps.geometry.spherical.computeOffset(odml, Math.abs(offset), h1 +  side);
						MapToolbar.addPoint(platLng, newPoly, 1);
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline = newPoly.id + ':0:0';
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline += ',' + newPoly.id + ':0:0';
						}
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline = newPoly.id + ':1:1' ;
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline += ',' + newPoly.id + ':1:1' ;
						}	
						
						newPoly.markers.getAt(0).lineX = pid + ':' + side + ':0:' + swL;
						newPoly.markers.getAt(1).lineX = pid + ':' + side + ':' + Math.abs(offset) + ':';							
			
						newPoly = null;
						break;
						
					case (document.getElementById('swtype21').checked):
						var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx-1).getPosition());

						var odml = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), swL, h1); 
						MapToolbar.addPoint(odml, MapToolbar.features["lineTab"][pid], mIdx+1);
						
						MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing();	
						var platLng = google.maps.geometry.spherical.computeOffset(odml, Math.abs(offset), h1 +  side);
						MapToolbar.addPoint(platLng, newPoly, 0);
	 					
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), newPoly, 1); //1st point on track 2 to turnout
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline = newPoly.id + ':0:0';
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline += ',' + newPoly.id + ':0:0';
						}
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline = newPoly.id + ':1:1' ;
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline += ',' + newPoly.id + ':1:1' ;
						}	
						
						newPoly.markers.getAt(0).lineX = pid + ':' + side + ':' + Math.abs(offset) + ':' + swL;	
						newPoly.markers.getAt(1).lineX = pid + ':' + side + ':0:' ;					
						
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
				var pid = $('#dInsFO_PID').val(); 
				var mIdx = parseInt($('#dInsFO_MID').val());

				if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(mIdx) != 'undefined') {
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
					
					var strType = (start) ? 0 : 1;
					var theight = (start) ? parseFloat($('#dInsFO_Lm').val()) : parseFloat($('#dInsFO_Lm2').val());
					var pitch =(start) ? parseInt($('#dInsFO_P1').val()) : parseInt($('#dInsFO_P2').val());
					var slopelength = (pitch !== 0) ? Math.round(1000 * (theight / pitch)) : 0;

					//update flyover data
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kdata.flyover = $('#dInsFO_Fo').val() + ',' + strType;
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bdata.pitch = pitch;
					
					if (start) {
						if (slopelength !== 0) {
							var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).getPosition());
							var x1p = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), slopelength, h1);
							MapToolbar.addPoint(x1p, MapToolbar.features["lineTab"][pid], mIdx+1);		
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).bdata.height = theight;
						} else {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bdata.height = theight;						
						}
						var image = new google.maps.MarkerImage('images/flyover_icon.png',
							new google.maps.Size(6, 6),
							new google.maps.Point(0, 0),
							new google.maps.Point(3, 3));
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).setIcon(image); 
					} else {
						if (slopelength !== 0) {
							var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx-1).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition());
							var x1p = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), -1 * Math.abs(slopelength), h1);
							MapToolbar.addPoint(x1p, MapToolbar.features["lineTab"][pid], mIdx);		
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bdata.height = theight;
						} else {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).bdata.height = theight;
						}
						var image = new google.maps.MarkerImage('images/flyover_icon.png',
							new google.maps.Size(6, 6),
							new google.maps.Point(0, 0),
							new google.maps.Point(3, 3));
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).setIcon(image); 
					}					
					$('#dialogInsertFlyover').dialog('close');					

				} else {
					alert("marker index not defined");				
				}
			}			
				
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
			//if (document.getElementById('dInsTun_tun').value != '') {
				var pid = $('#dInsTun_PID').val(); 
				var mIdx = parseInt($('#dInsTun_MID').val());
				
				if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(mIdx) != 'undefined') {
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
					
					var strType = (start) ? 0: 1;
					
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kdata.tunnel = $('#dInsTun_tun').val() + ',' + strType;
					
					var image = new google.maps.MarkerImage('images/tunnel_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).setIcon(image); 	
			
					$('#dialogInsertTunnel').dialog('close');	
			
				} else {
					alert("marker index not defined");				
				}				
			//}
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

		// dialog Link between lines
		// 22 Mac 2014
		$('#dLinkLine_OK').click(function() {
			if (($('#dLL_Pid1').val() != '') && ($('#dLL_Pid2').val() != '')) {		
				if ((typeof MapToolbar.features["lineTab"][$('#dLL_Pid1').val()] != 'undefined' ) && (typeof MapToolbar.features["lineTab"][$('#dLL_Pid2').val()] != 'undefined')) {
					if (($('#dLL_Pid1m1').val() != '') && ($('#dLL_Pid1m2').val() != '') && ($('#dLL_Pid2m1').val() != '') && ($('#dLL_Pid2m2').val() != '')) {
						var pid1 = $('#dLL_Pid1').val();
						var  mi1L1= parseInt($('#dLL_Pid1m1').val());
						var  mi2L1= parseInt($('#dLL_Pid1m2').val());
						var  pid2 = $('#dLL_Pid2').val();
						var  mi1L2 = parseInt($('#dLL_Pid2m1').val());
						var  mi2L2 = parseInt($('#dLL_Pid2m2').val());
					
						//2do logik program - 22/3/2014
						//-detect susunan index line 2
						//perlukah tetapkan/calc dahulu nilai offset? atau auto calc kemudian?
						
						var markerDist;
						var addAtIndex1 = null;
						var addAtIndex2 = null;
						var side = 0;
						// modify code from http://jsfiddle.net/kjy112/NRafz/
						
						//1st point
						markerDist = {p1:'', p2:'', d:-1};

						var allPoints = MapToolbar.features["lineTab"][pid1].getPath().getArray();
    
						var e1 = MapToolbar.features["lineTab"][pid2].markers.getAt(mi1L2).position;

						for (var i = 0; i < allPoints.length - 1; i++) {
							var ab = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],e1); 
							var bc = google.maps.geometry.spherical.computeDistanceBetween(e1,allPoints[i + 1]); 
							var ac = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],allPoints[i + 1]); 
							//console.log(parseFloat(markerDist.d) + ' '+ Math.abs(ab+bc-ac));
      
							if ((parseFloat(markerDist.d) == -1) || parseFloat(markerDist.d) > parseFloat(Math.abs(ab + bc - ac))) {
								markerDist.p1 = allPoints[i];
								markerDist.p2 = allPoints[i + 1];
								markerDist.d = Math.abs(ab + bc - ac);
								addAtIndex1 = i+1;
							}
						}
						
						var Hca = google.maps.geometry.spherical.computeHeading(e1,allPoints[addAtIndex1-1]);
						var Hab = google.maps.geometry.spherical.computeHeading(allPoints[addAtIndex1-1],allPoints[addAtIndex1]);
						var Hcb = google.maps.geometry.spherical.computeHeading(e1,allPoints[addAtIndex1-1]);
						var Hba = google.maps.geometry.spherical.computeHeading(allPoints[addAtIndex1],allPoints[addAtIndex1-1]);
			
						var Xac = google.maps.geometry.spherical.computeDistanceBetween(allPoints[addAtIndex1-1],e1);
						var Xbc = google.maps.geometry.spherical.computeDistanceBetween(allPoints[addAtIndex1],e1);
						var Xab = google.maps.geometry.spherical.computeDistanceBetween(allPoints[addAtIndex1-1],allPoints[addAtIndex1]);
			
						var angleA = intersection_angle(Hca,Hab).angle ;
						var angleB = intersection_angle(Hcb,Hba).angle ; 
			
						var Xcc2a = Xac * Math.sin(angleA.toRad());
						var Xcc2b = Xbc * Math.sin(angleB.toRad()); 
			
						var Xac2 = Math.abs(Xac * Math.cos(angleA.toRad()));
						var Xbc2 = Math.abs(Xbc * Math.cos(angleB.toRad()));
			
						//if (Xac2 + Xbc2 != Xab) { alert('Xac2 : ' + Xac2 + ' + ' + 'Xbc2 : ' + Xbc2 + ' =\n' + (Xac2 + Xbc2) + ' != ' + Xab + '(Xab)'); };
				
						var ec1 = google.maps.geometry.spherical.computeOffset(allPoints[addAtIndex1-1], Xac2, Hab);
			
						MapToolbar.addPoint(ec1, MapToolbar.features["lineTab"][pid1], addAtIndex1);
						
						var Hcc2 = google.maps.geometry.spherical.computeHeading(ec1,e1);
						
						if (Math.round(Hab-90) == Math.round(Hcc2)) {
							side = -90;
						} else if (Math.round(Hab+90) == Math.round(Hcc2)) {
							side = 90;
						} else {
							alert(Hab + ' : ' + Hcc2 + '<br />' + (Hab-90) + ' : ' + Hcc2 + '<br />' + (Hab+90) + ' : ' + Hcc2);	
						}						
						
						//new format 4 v1.0.0
						MapToolbar.features["lineTab"][pid2].markers.getAt(mi1L2).lineX = pid1 + ':' + side + ':' + Xcc2a + ':';
						// data format lineX = (base line):(side direction):(offset distance):(switch length opsyenal)
						
						//2nd point
						markerDist = {p1:'', p2:'', d:-1};
						allPoints = MapToolbar.features["lineTab"][pid1].getPath().getArray();
						var e2 = MapToolbar.features["lineTab"][pid2].markers.getAt(mi2L2).position;

						for (var i = 0; i < allPoints.length - 1; i++) {
							var ab = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],e2); 
							var bc = google.maps.geometry.spherical.computeDistanceBetween(e2,allPoints[i + 1]); 
							var ac = google.maps.geometry.spherical.computeDistanceBetween(allPoints[i],allPoints[i + 1]); 
							//console.log(parseFloat(markerDist.d) + ' '+ Math.abs(ab+bc-ac));
      
							if ((parseFloat(markerDist.d) == -1) || parseFloat(markerDist.d) > parseFloat(Math.abs(ab + bc - ac))) {
								markerDist.p1 = allPoints[i];
								markerDist.p2 = allPoints[i + 1];
								markerDist.d = Math.abs(ab + bc - ac);
								addAtIndex2 = i+1;
							}
						}
						
						Hca = google.maps.geometry.spherical.computeHeading(e2,allPoints[addAtIndex2-1]);
						Hab = google.maps.geometry.spherical.computeHeading(allPoints[addAtIndex2-1],allPoints[addAtIndex2]);
						Hcb = google.maps.geometry.spherical.computeHeading(e2,allPoints[addAtIndex2-1]);
						Hba = google.maps.geometry.spherical.computeHeading(allPoints[addAtIndex2],allPoints[addAtIndex2-1]);
			
						Xac = google.maps.geometry.spherical.computeDistanceBetween(allPoints[addAtIndex2-1],e2);
						Xbc = google.maps.geometry.spherical.computeDistanceBetween(allPoints[addAtIndex2],e2);
						Xab = google.maps.geometry.spherical.computeDistanceBetween(allPoints[addAtIndex2-1],allPoints[addAtIndex2]);
			
						angleA = intersection_angle(Hca,Hab).angle ;
						angleB = intersection_angle(Hcb,Hba).angle ; 
			
						Xcc2a = Xac * Math.sin(angleA.toRad());
						Xcc2b = Xbc * Math.sin(angleB.toRad()); 
			
						Xac2 = Math.abs(Xac * Math.cos(angleA.toRad()));
						Xbc2 = Math.abs(Xbc * Math.cos(angleB.toRad()));
			
						//if (Xac2 + Xbc2 != Xab) { alert('Xac2 : ' + Xac2 + ' + ' + 'Xbc2 : ' + Xbc2 + ' =\n' + (Xac2 + Xbc2) + ' != ' + Xab + '(Xab)'); };
				
						var ec2 = google.maps.geometry.spherical.computeOffset(allPoints[addAtIndex2-1], Xac2, Hab);
				
						MapToolbar.addPoint(ec2, MapToolbar.features["lineTab"][pid1], addAtIndex2);
						
						Hcc2 = google.maps.geometry.spherical.computeHeading(ec2,e2);
						
						if (Math.round(Hab-90) == Math.round(Hcc2)) {
							side = -90;
						} else if (Math.round(Hab+90) == Math.round(Hcc2)) {
							side = 90;
						} else {
							alert(Hab + ' : ' + Hcc2 + '<br />' + (Hab-90) + ' : ' + Hcc2 + '<br />' + (Hab+90) + ' : ' + Hcc2);	
						}								
						//new format 4 v1.0.0
						MapToolbar.features["lineTab"][pid2].markers.getAt(mi2L2).lineX = pid1 + ':' + side + ':' + Xcc2a + ':';
						
						
						// data format sline = '(side line 1):(0=start,>0 end):index,(side line 1):(0=start,>0 end):index,,,,....';
						if (addAtIndex2 > addAtIndex1) {
							if (MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).sline == '') {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).sline = pid2 + ':0:' + mi1L2;
							} else {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).sline += ',' + pid2 + ':0:' + mi1L2;
							}							

							if (MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).sline == '') {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).sline = pid2 + ':1:' + mi2L2;
							} else {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).sline += ',' + pid2 + ':1:' + mi2L2;
							}
						} else {
							if (MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).sline == '') {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).sline = pid2 + ':0:' + mi2L2;
							} else {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).sline += ',' + pid2 + ':0:' + mi2L2;
							}							

							if (MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).sline == '') {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).sline = pid2 + ':1:' + mi1L2;
							} else {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).sline += ',' + pid2 + ':1:' + mi1L2;
							}							
						}
						
						MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).setDraggable(false);
						MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).setDraggable(false);		
						MapToolbar.features["lineTab"][pid2].markers.getAt(mi1L2).setDraggable(false);
						MapToolbar.features["lineTab"][pid2].markers.getAt(mi2L2).setDraggable(false);					
			
						$('#dialogLinkLines').dialog('close');
					} else {
						alert('Please state each line indexs');
					}
				} else {
					alert('Either lines is not valid.');
				}
			} else {
				alert('Please state each line.');
			}
		});

		$('#dLinkLine_KO').click(function() {
			$('#dialogLinkLines').dialog('close');
		});		
		
		//scriptLoaded();
				
	});