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
type : development release
version : 1.1.0
build : 
last update : 5 November 2014 9:05pm (GMT 8+)

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

		$('#op_DGauge').spinner({step: 1, largeStep: 50, min: 1067, max: 3000 });
		$('#op_Cant').spinner({step: 1, largeStep: 10, min: 0});
		$('#op_Offset').spinner({step: 0.1, largeStep: 10, min: 0});
		
		$('#colorR').spinner({
			step: 1,
			min: 0,
			max: 255,
			stop: function( event, ui ) {
				$( "#red" ).slider( "value", $('#colorR').spinner("value")); 
				refreshSwatch2;
			}, 
			change: function( event, ui ) {
				$( "#red" ).slider( "value", $('#colorR').spinner("value")); 
				refreshSwatch2;
			} 
		});
		$('#colorG').spinner({
			step: 1, 
			min: 0, 
			max: 255,
			stop: function( event, ui ) { 
				$( "#green" ).slider( "value", $('#colorG').spinner("value")); 
				refreshSwatch2; 
			},  
			change: function( event, ui ) { 
				$( "#green" ).slider( "value", $('#colorG').spinner("value")); 
				refreshSwatch2; 
			}  
		});
		$('#colorB').spinner({
			step: 1, 
			min: 0, 
			max: 255,
			stop: function( event, ui ) { 
				$( "#blue" ).slider( "value", $('#colorB').spinner("value")); 
				refreshSwatch2; 
			},  
			change: function( event, ui ) { 
				$( "#blue" ).slider( "value", $('#colorB').spinner("value")); 
				refreshSwatch2; 
			}  
		});

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
	  
	  $( "#red, #green, #blue" ).slider({
		orientation: "horizontal",
		range: "min",
		max: 255,
		value: 127,
		slide: refreshSwatch,
		change: refreshSwatch
	  });
	  $( "#red" ).slider( "value", 60 );
	  $( "#green" ).slider( "value", 120 );
	  $( "#blue" ).slider( "value", 180 );	  
	  	  
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
/*
		$( "#dialogSysReq" ).dialog({ 
			autoOpen: false, 
			minWidth: 500
			});
*/
		$( "#dialogCredits" ).dialog({ 
			autoOpen: false, 
			minWidth: 500
			});
/*			
		$( "#dialogTroubleshooting" ).dialog({ 
			autoOpen: false, 
			minWidth: 500
			});
			
		$( "#dialogManual" ).dialog({ 
			autoOpen: false, 
			minWidth: 500
			});						
*/		
		$( "#dialogAbout" ).dialog({ 
			autoOpen: false, 
			minWidth: 604,
			});	
			
		$( "#dialogBuildBVERoute" ).dialog({ 
			autoOpen: false, 
			minWidth: 800,
			//position: { my: "left top", at: "left bottom", of: window },
			close: function() {
				Rail = [];
				Pole = [];
				Dike = [];
				Wall = [];
				Ground = [];
				Beacon = [];
				Form = [];
				Roof = [];
				Crack = [];
				FreeObj = [];
				BackGround = [];
	
				GBtunnel = [];
				GBdike = [];
				GBcut = [];
				GBbridge = [];
				GBfo = [];
				GBform = [];
				GBug = [];
				GBcrack = [];
				
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
				},
			position: { my: "center top-5%", at: "center", of: "#drawingtools", collision : "flipfit"}	
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
			minWidth: 480,
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
			
		$( "#dialogRouteColor" ).dialog({ 
			autoOpen: false, 
			minWidth: 500
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

		$( "#dialogLoadingData" ).dialog({ 
			autoOpen: false,
			dialogClass: "no-close",			
			//modal: true,
			minWidth: 500
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
			minWidth: 620
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
			height: 460,
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
				
		
		$( "#dialogInsertDike" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});	
		
		$( "#dialogInsertCut" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});
		
		$( "#dialogPole" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});		
		$( "#dialogManualPitch" ).dialog({ 
			autoOpen: false, 
			minWidth: 480
		});
		
		$( "#dialogOptions" ).dialog({ 
			autoOpen: false, 
			minWidth: 440
		});		
		
		$( "#dialogUpdFormType" ).dialog({ 
			autoOpen: false, 
			minWidth: 440
		});		
// ****************************************************************************

	$( "#mainload").progressbar({
		value: false,
		change: function() {
			$( "#mainloadlabel").text( $( "#mainload").progressbar( "value" ) + "%" );
		},
		complete: function() {
			$( "#mainloadlabel").text( "Done!" );
		}
	});
	
	$( "#subload").progressbar({
		value: false,
		change: function() {
			$( "#subloadlabel").text( $( "#subload").progressbar( "value" ) + "%" );
		},
		complete: function() {
			$( "#subloadlabel").text( "Done!" );
		}
	});

// *****************************Dialog Operation ******************************					
		$('#mMexportMapData').click(function() {
			var teks = '';
			var routename = '';
			//alert(typeof map);
			try {
				teks = map.getCenter().lat() + "," + map.getCenter().lng() + "," + gbm_ver + "," + map.getMapTypeId() + "," + map.getZoom() + "," + gbmapdata + "," + defaultGauge + "," + defaultCant + "," + defaulOffset + "\n";	
				
				for (oName in MapToolbar.features['lineTab']) {

					//MapToolbar.currentFeature = MapToolbar.features[type + 'Tab'][featureName]; 
					//var point = MapToolbar.currentFeature.getPath().getAt(0);
					teks += oName;

					var allPoints = MapToolbar.features['lineTab'][oName].getPath().getArray();
					var polyL = MapToolbar.features['lineTab'][oName];
					
					teks += ',' + polyL.uid;
					teks += ',' + polyL.ptype;
					teks += ',' + polyL.note.replace(',','-').replace('\n',' - ');
					teks += ',' + polyL.name;
					teks += ',' + polyL.route;
					routename = (routename == '')? polyL.route : routename;
					teks += ',' + polyL.lineX;
					
					//bdata
					teks += ',' + polyL.bdata.devID + '§' + polyL.bdata.maxSpeed + '§' + polyL.bdata.simBVE + '§' + polyL.bdata.gauge + '§' + polyL.bdata.desc + '§' + polyL.bdata.train + '§' + polyL.bdata.railindex;
										
					for (var i = 0; i < allPoints.length; i++) {
						teks += ',' + allPoints[i].lat() + ";" + allPoints[i].lng();
						
						teks += ';' + polyL.markers.getAt(i).uid;
						//teks += ';' + polyL.markers.getAt(i).pid;
						teks += ';' + polyL.markers.getAt(i).note.replace(',','-').replace('\n',' - ');

						//bdata
						teks += ';' + polyL.markers.getAt(i).bdata.height;
						teks += '§' + polyL.markers.getAt(i).bdata.railindex;
						teks += '§' + polyL.markers.getAt(i).bdata.pitch;
						teks += '§' + polyL.markers.getAt(i).bdata.curve;
						teks += '§' + polyL.markers.getAt(i).bdata.tcurve;

						//kdata
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

						//gdata
						teks += ';' + polyL.markers.getAt(i).gdata.lastpitch;
						teks += '§' + polyL.markers.getAt(i).gdata.lastheight;
						teks += '§' + polyL.markers.getAt(i).gdata.lastheightratio;

						teks += ';' + polyL.markers.getAt(i).lineX;
						teks += ';' + polyL.markers.getAt(i).sline;
													
					}
					teks += "\n"; 

				}
				

				for (oType in MapToolbar.features) {
					var type = oType.replace('Tab',''); // oType.substring(0, oType.lastIndexOf('Tab;));
			
					for (oName in MapToolbar.features[oType]) {
						if (type == 'shape') {
							teks += oName;
							
							var allPoints = MapToolbar.features[oType][oName].getPath().getArray();
							var polyL = MapToolbar.features[oType][oName];
							
							teks += ',' + polyL.uid;
							teks += ',' + polyL.ptype;
							teks += ',' + polyL.note.replace(',','-').replace('\n',' - ');
							teks += ',' + polyL.name;
							
							for (var i = 0; i < allPoints.length; i++) {
								teks += ',' + allPoints[i].lat() + ";" + allPoints[i].lng();
								
								teks += ';' + polyL.markers.getAt(i).kit;
								teks += ';' + polyL.markers.getAt(i).note.replace(',','-').replace('\n',' - ');
															
							}
							teks += "\n"; 					
							
						}  else if (type == 'curve') {
							teks += oName
							var cpoly = MapToolbar.features[oType][oName];
							
							teks += ',' + cpoly.uid;
							teks += ',' + cpoly.ptype;
							teks += ',' + cpoly.pid;
							teks += ',' + cpoly.mid;
							teks += ',' + cpoly.Rc;
							teks += ',' + cpoly.cant;
							teks += ',' + cpoly.Vd;
							teks += ',' + cpoly.Lt;
							teks += ',' + cpoly.Lc;
							teks += ',' + cpoly.Cc.lat() + ';' + cpoly.Cc.lng();
							teks += ',' + cpoly.st.lat() + ';' + cpoly.st.lng();
							teks += ',' + cpoly.ed.lat() + ';' + cpoly.ed.lng();
							teks += ',' + cpoly.h1;
							teks += ',' + cpoly.h2;
							teks += ',' + cpoly.forceSL;
							teks += ',' + cpoly.delta;
							teks += ',' + cpoly.theta;
							teks += ',' + cpoly.railindex;
							teks += ',' + cpoly.route;
							
							
							for (mi = 0; mi < cpoly.markers.length; mi++) {
								teks += ',' + cpoly.markers.getAt(mi).getPosition().lat() + ";" +cpoly.markers.getAt(mi).getPosition().lng();

								//teks += ';' +  cpoly.markers.getAt(mi).pid;
								teks += ';' +  cpoly.markers.getAt(mi).index;								
								teks += ';' +  cpoly.markers.getAt(mi).note.replace(',','-').replace('\n',' - ');
								teks += ';' +  cpoly.markers.getAt(mi).ld;
								teks += ';' +  cpoly.markers.getAt(mi).title.replace(',',' ');
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

							}
												
							teks += "\n";

						} else if (type == 'tcurve') {
							teks += oName
							var cpoly = MapToolbar.features[oType][oName];
							
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
							
							
							for (mi = 0; mi < cpoly.markers.length; mi++) {
								teks += ',' + cpoly.markers.getAt(mi).getPosition().lat() + ";" +cpoly.markers.getAt(mi).getPosition().lng();

								//teks += ';' +  cpoly.markers.getAt(mi).pid;
								teks += ';' +  cpoly.markers.getAt(mi).index;
								teks += ';' +  cpoly.markers.getAt(mi).note.replace(',','-').replace('\n',' - ');
								teks += ';' +  cpoly.markers.getAt(mi).ld;
								teks += ';' +  cpoly.markers.getAt(mi).title.replace(',',' ');
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

							}
												
							teks += "\n";  
						
						} else if (type == 'dotMarker') {
							teks += oName;
							var dotMarker = MapToolbar.features[oType][oName]; 
							
							teks += ',' + dotMarker.uid;
							teks += ',' + dotMarker.ptype;
							teks += ',' + dotMarker.note.replace(',','-');
							teks += ',' + dotMarker.iwref;
							var point = dotMarker.getPosition();
							teks += ',' + point.lat() + ";" + point.lng() + "\n";  	
								
						} else if (type == 'circle') {
							teks += oName;
							var circle = MapToolbar.features[oType][oName];
							teks += ',' + circle.uid;
							teks += ',' + circle.ptype;
							teks += ',' + circle.note.replace(',','-');
							teks += ',' + circle.iwref;
													
							var center = circle.getCenter();
							var radius = circle.getRadius();
							teks += ',' + radius + ',' + center.lat() + ';' + center.lng() + "\n";
				
							//teks += "\n"; 
							
						} else if (type == 'rectangle') {
							teks += oName;
							var rectangle = MapToolbar.features[oType][oName];
							teks += ',' + rectangle.uid;
							teks += ',' + rectangle.ptype;
							teks += ',' + rectangle.note.replace(',','-');
							teks += ',' + rectangle.iwref;												
							teks += ',' + rectangle.data;
													
							var sw = rectangle.getBounds().getSouthWest();
							var ne = rectangle.getBounds().getNorthEast();
							teks += ',' + sw.lat() + ';' + sw.lng() + ',' + ne.lat() + ';' + ne.lng() + "\n";
				
							//teks += "\n"; 
						}
					}				
				} 			
			} catch(err) {
				teks += "[Error] : error in creating data list." + "\n" + err.message + ". \n";
			}

			$('#dex_filename').val(routename);
			$('#exportData').text(teks);
			$('#dialogExportData').dialog('open');
		});

		$('#dexSave').click(function() {
			try {
				var atxt = $('#exportData').val();	
				
				var blob = new Blob([atxt], {type: "text/plain;charset=utf-8"});
				saveAs(blob, $('#dex_filename').val() + '.txt');			
			} catch(err) {
				alert('[Error] : ' + err);
			}
			$('#dialogExportData').dialog('close');
		});	
		
		$('#dexClose').click(function() {
			$('#exportData').text('');
			$('#dialogExportData').dialog('close');
		});	
		
		$('#mMimportMapData').click(function() {
			$('#importDataText').text("paste text here ...");
			$('#dialogImportData').dialog('open');
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
									setTimeout(function() { preProcesOpenMapData(teksOP); }, 100);									
									
								}
			
							};
						})(f);

					  reader.readAsText(f);
					}
				}

				document.getElementById('fileOP').addEventListener('change', handleFileSelect, false);
			} else {
				alert($.lang.convert('The File APIs are not supported in this browser.'));
			}		
		});
		
		$('#mMGBMOptions').click(function() {
			
			$('#op_DevID').val($.cookie('developerID'));
			$('#op_DGauge').val($.cookie('defaulGauge'));
			$('#op_Cant').val($.cookie('defaulCant'));
			$('#op_Offset').val($.cookie('defaulOffset'));

			$("#op_gbmapdata").empty();
			
			if ($.cookie('gdatafiles') != null) {
				if ($.cookie('gdatafiles') != '') {
					var gdlist = document.getElementById('op_gbmapdata');
					
					var arrgdata = $.cookie('gdatafiles').split(',');
					var opt = document.createElement('option');
					if (gdlist.length == 0) {
						opt.value = '';
						opt.innerHTML = "- select -";
						gdlist.appendChild(opt);
					}
					for (i = 0; i<arrgdata.length; i++) {
						var inList = false;
						for (var j = 0; j < gdlist.length; j++) {
							if (gdlist.options[j].text == arrgdata[i]) {
								inList = true;
								break;
							}

						}
						if (!inList) {
							opt = document.createElement('option');
							opt.value = i;
							opt.innerHTML = arrgdata[i];
							if (arrgdata[i] == $.cookie('gbmapdata')) { opt.selected = "selected"; }
							gdlist.appendChild(opt);			
						}						
					}
					

				}
			}
			
			
			switch ($.cookie('api')) {
				case '3' :
					document.getElementById('op_api_3').checked = true;
					break;
				case '3.exp' :
					document.getElementById('op_api_3exp').checked = true;
					break;
				default :
					document.getElementById('op_api_custom').checked = true;
					$('#op_APIv').val($.cookie('api'));
					break;
			}
			
			var x = document.getElementById("op_addjsfile");
			x.addEventListener('change', addGBDataFile, false);
			
			$('#dialogOptions').dialog('open');
		});

		$('#op_cleargbdata').click(function() {
			//$.cookie('gdatafiles', '', { expires: 365 });
			$.removeCookie('gdatafiles');
			$("#op_gbmapdata").empty();
		});
		
		$('#btnImportData').click(function() {
			if ($('#importDataText').val() != '') {
				var teksOP = $('#importDataText').val();
				preProcesOpenMapData(teksOP);
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
			if (confirm($.lang.convert('Reload Map to default location?'))) {location.reload();}
		});
		
		$('#mMdefaultLocation').click(function() {
			if (confirm($.lang.convert('Set current map as default?'))) {
				$.cookie('defaultcenter', map.getCenter().lat()+','+map.getCenter().lng(), { expires: 365 });
				alert(map.getCenter() + " is set as default map center.");
			}
		});
		
		  
		$('#mMbuildBVE').click(function() { 
			
			$('#dialogBuildRoute').dialog('open');
		});
		
		$('#btnBuildRoute').click(function() { 
			if ($('#dbr_lineid').val() =='') {
				alert($.lang.convert('line id not defined'));
				return false;
			}
			
			if ($('#dbr_trackname').val() =='') {
				alert($.lang.convert('trackname not defined'));
				return false;
			}
			
			if ($('#dbr_route').val() =='') {
				alert($.lang.convert('route not defined'));
				return false;
			}
			
			if ($('#dbr_simBVE').val() =='') {
				alert($.lang.convert('please choose target simulator'));
				return false;
			}
			
			if ($('#dbr_trackGauge').val() =='') {
				alert($.lang.convert('gauge not defined'));
				return false;
			}
			
			if ($('#dbr_railtypedefault').val() =='none') {
				alert($.lang.convert('default rail type not defined'));
				return false;
			}
						
			$('#buildBVE').val('');
			var pid = $('#dbr_lineid').val();
			var routeId = $('#dbr_trackname').val();
			var routeName = $('#dbr_route').val();
			var gauge = $('#dbr_trackGauge').val();
			var railtype = $('#dbr_railtypedefault option:selected').val();
			var stIdx = -1;//($('#dbr_stationStart').val() != '')? : ;
			var edIdx = -1;//($('#dbr_stationEnd').val() != '')? : ;
			var train = $('#dbr_runningTrain').val();
			var maxspeed = $('#dbr_maxSpeed').val();
			var bg = $('#dbr_bg').val();
			var kmstone = (document.getElementById('dbr_kmstone').checked) ? true : false;
			var stsign = (document.getElementById('dbr_stnear_sign').checked) ? true : false;
			var devID = $('#dbr_devID').val();
			var desc = $('#dbr_desc').val();

			var polyL = MapToolbar.features['lineTab'][pid];
			var allPoints = polyL.getPath().getArray();		
				
			if ($('#dbr_stationStart').val() != '' && $('#dbr_stationEnd').val() != '') {
				for (var i = 0; i < allPoints.length; i++)  { 
					if (polyL.markers.getAt(i).kdata.form != '')  {
						var formData = polyL.markers.getAt(i).kdata.form.split(':');
						if (formData.length == 7) {
							if ($('#dbr_stationStart').val() == formArr[2]) {
								stIdx = i;
								break;
							}
						} 
					}
				}
				for (var i = 0; i < allPoints.length; i++)  { 
					if (polyL.markers.getAt(i).kdata.form != '')  {
						var formData = polyL.markers.getAt(i).kdata.form.split(':');
						if (formData.length == 7) {
							if ($('#dbr_stationEnd').val() == formArr[2]) {
								edIdx = i;
								break;
							}
						} 
					}
				}
				if (stIdx > edIdx) {
					var no = stIdx;					
					stIdx = edIdx;
					edIdx = no;
				} // correction st < ed always
			} else {
				stIdx = 0;
				edIdx = allPoints.length -1;
			}

			if ($('#dialogBuildRoute').dialog('isOpen') == true) {
				$('#dialogBuildRoute').dialog('close');
			}			
			
			$('#dbr_filename').val(routeName);
			
			$('#dialogBuildBVERoute').dialog('open');	
			if ($('#dbr_simBVE').val() =='bve5') {
				generateBVE5(pid,stIdx,edIdx,routeId,routeName,gauge,railtype,train,maxspeed,bg,kmstone,stsign,devID,desc);
			} else {
				generateOpenBVE(pid,stIdx,edIdx,routeId,routeName,gauge,railtype,train,maxspeed,bg,kmstone,stsign,devID,desc);	
			}
			
		});

		$('#dbr_Save').click(function() {
			try {
				var atxt = $('#buildBVE').val();
				
				var blob = new Blob([atxt], {type: "text/plain;charset=utf-8"});
				saveAs(blob, $('#dbr_filename').val() + $('#fileext').text());
			} catch (err) {
				alert('[Error] : ' + err);
			}
			$('#dialogBuildBVERoute').dialog('close');	
		});
		
		$('#dbr_Close').click(function() {
			
			$('#dialogBuildBVERoute').dialog('close');
		});
		
		$('#mMmanual').click(function() {
			//$('#dialogManual').dialog('open');
			window.open('doc/manual_' + $.lang.currentLang + '.html', '_blank');
		});

		$('#mMtroubleShooting').click(function() {
			//$('#dialogTroubleshooting').dialog('open');
			window.open('doc/fix_' + $.lang.currentLang + '.html', '_blank');
		});

		$('#mMsystemRequirents').click(function() {
			//$('#dialogSysReq').dialog('open');
			window.open('doc/sysreq_' + $.lang.currentLang + '.html', '_blank');
		});

		$('#mMCredits').click(function() {
			$('#dialogCredits').dialog('open');
		});

		$('#mMAbout').click(function() {	
			$("#dialogAbout" ).dialog( "option", "title", "GB Maps ギビマップ v"+gbm_ver );		
			$('#dialogAbout').dialog('open');
		});
		
		
		$('#mMaddPoints').click(function() {
			$('#dialogAddPoint').dialog('open');
		});
		
		$('#dInvLine_OK').click(function() {
			if (typeof MapToolbar.features["lineTab"][$('#dInvLine_pid').val()] != 'undefined') {
				invertpolyline($('#dInvLine_pid').val());
				$('#dialogInvertLine').dialog('close');
			} else {
				alert($.lang.convert('Error! Unable to determine which line to invert.'));
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
		
		$('#mMRouteColor').click(function() {
			$("#routeColor_Routes").empty();
			var svclist = document.getElementById('route_list');
			var select = document.getElementById('routeColor_Routes');
			
			if (svclist.childElementCount == 0) {
				alert($.lang.convert('Please define at least one route.\nConfigure line setting ...'));
				return false;
			}
			
			var op = document.createElement('option');
			op.value = '';
			op.innerHTML = "- select -";
			select.appendChild(op);
			
			for (var i = 0; i < svclist.childElementCount; i++) {
				var opt = document.createElement('option');
				opt.value = i;
				opt.innerHTML = svclist.children[i].firstElementChild.getAttribute("value");
				select.appendChild(opt);

			}
			$('#dialogRouteColor').dialog('open');
		});			

	function scriptLoaded() {
	//if (typeof 
    // do something
      for (var i=0; i < bverailobjArr.length; i++) {
      	$('#railindex').append($("<option></option>").attr("value", bverailobjArr[i][5]).text(bverailobjArr[i][2].substr(0, 25)));
      	if (bverailobjArr[i][3] == 'st') { 
			$('#dms_railindex').append($("<option></option>").attr("value", bverailobjArr[i][1]).text(bverailobjArr[i][2]));		
     		$('#dtsv_railtypedefault').append($("<option></option>").attr("value", bverailobjArr[i][1]).text(bverailobjArr[i][2]));
     		$('#dbr_railtypedefault').append($("<option></option>").attr("value", bverailobjArr[i][1]).text(bverailobjArr[i][2].substr(0, 20)));
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
    		$('#dbr_runningTrain').append($("<option></option>").attr("value", bvetrainDirArr[i][4]).text(bvetrainDirArr[i][2].substr(0, 15)));
    	}
    	
    	for (var i=0; i < bvetunnelObjArr.length; i++) {
    		$('#strBVE').append($("<option></option>").attr("value", bvetunnelObjArr[i][3]).text(bvetunnelObjArr[i][2].substr(0, 25)));
    		$('#dInsTun_tun').append($("<option></option>").attr("value", bvetunnelObjArr[i][1]).text(bvetunnelObjArr[i][2]));
    	}
    	
    	for (var i=0; i < bvebridgeObjArr.length; i++) {
    		$('#strBVE').append($("<option></option>").attr("value", bvebridgeObjArr[i][3]).text(bvebridgeObjArr[i][2].substr(0, 25)));
    		$('#dInsB_bridge').append($("<option></option>").attr("value", bvebridgeObjArr[i][1]).text(bvebridgeObjArr[i][2]));
    	}
    	
    	for (var i=0; i < bveFOObjArr.length; i++) {
    		$('#strBVE').append($("<option></option>").attr("value", bveFOObjArr[i][3]).text(bveFOObjArr[i][2].substr(0, 25)));
    		$('#dInsFO_Fo').append($("<option></option>").attr("value", bveFOObjArr[i][1]).text(bveFOObjArr[i][2]));
    	}    	

    	for (var i=0; i < bvecutObjArr.length; i++) {
    		$('#strBVE').append($("<option></option>").attr("value", bvecutObjArr[i][3]).text(bvecutObjArr[i][2].substr(0, 25)));
    		$('#dInsCut_str').append($("<option></option>").attr("value", bvecutObjArr[i][1]).text(bvecutObjArr[i][2].substr(0, 25)));
    	}
    	
    	for (var i=0; i < bvedikeObjArr.length; i++) {
    		$('#strBVE').append($("<option></option>").attr("value", bvedikeObjArr[i][3]).text(bvedikeObjArr[i][2].substr(0, 25)));
    		$('#dInsDike_str').append($("<option></option>").attr("value", bvedikeObjArr[i][1]).text(bvedikeObjArr[i][2].substr(0, 25)));
    	}
    	   	
    	for (var i=0; i < bveRCObjArr.length; i++) {
    		$('#sideObj').append($("<option></option>").attr("value", bveRCObjArr[i][3]).text(bveRCObjArr[i][2].substr(0, 25)));
    		$('#dInsC_Crossing').append($("<option></option>").attr("value", bveRCObjArr[i][1]).text(bveRCObjArr[i][2]));
    	}
    	
    	for (var i=0; i < bveplatformObjArr.length; i++) {
    		$('#strBVE').append($("<option></option>").attr("value", bveplatformObjArr[i][3]).text(bveplatformObjArr[i][2].substr(0, 25)));
    		$('#dInsForm_BVEStr').append($("<option></option>").attr("value", bveplatformObjArr[i][1]).text(bveplatformObjArr[i][2].substr(0, 25)));		
    		$('#dUpdFormType_str').append($("<option></option>").attr("value", bveplatformObjArr[i][1]).text(bveplatformObjArr[i][2].substr(0, 25)));			
    	}   
    	
    	for (var i=0; i < bvepoleObjArr.length; i++) {
		$('#strBVE').append($("<option></option>").attr("value", bvepoleObjArr[i][3]).text(bvepoleObjArr[i][2].substr(0, 25)));
		$('#dms_poleindex').append($("<option></option>").attr("value", bvepoleObjArr[i][1]).text(bvepoleObjArr[i][2]));
		$('#dInsPole_str').append($("<option></option>").attr("value", bvepoleObjArr[i][1]).text(bvepoleObjArr[i][2]));
    	}
    	
    	for (var i=0; i < bvecrackObjArr.length; i++) {
    		$('#grnObj').append($("<option></option>").attr("value", bvecrackObjArr[i][3]).text(bvecrackObjArr[i][2].substr(0, 25)));
    		$('#PLcrackID').append($("<option></option>").attr("value", bvecrackObjArr[i][1]).text(bvecrackObjArr[i][2].substr(0, 25)));
    		$('#formcrackID').append($("<option></option>").attr("value", bvecrackObjArr[i][1]).text(bvecrackObjArr[i][2].substr(0, 25)));
		if ( i == 0 ) { 
			$("#PLcrackID option[value=\'" + bvecrackObjArr[i][1] + "\']").attr("selected", "selected"); 
			$("#formcrackID option[value=\'" + bvecrackObjArr[i][1] + "\']").attr("selected", "selected"); 
			document.getElementById('PLcrackView').src='images/' + bvecrackObjArr[i][3];
		}
    	}
    	
    	for (var i=0; i < bvebveStrOjArr.length; i++) {
		$('#grnObj').append($("<option></option>").attr("value", bvebveStrOjArr[i][4]).text(bvebveStrOjArr[i][2].substr(0, 25)));
		
    		switch (bvebveStrOjArr[i][3]) {
			case 'Ground':
				$('#dUpdG_object').append($("<option></option>").attr("value", bvebveStrOjArr[i][1]).text(bvebveStrOjArr[i][2]));
				$('#dInsR_ground').append($("<option></option>").attr("value", bvebveStrOjArr[i][1]).text(bvebveStrOjArr[i][2]));
				break;
			case 'Background':
				$('#dbr_bg').append($("<option></option>").attr("value", bvebveStrOjArr[i][1]).text(bvebveStrOjArr[i][2].substr(0, 25)));
				break;
			case 'Beacon':
				break;
			case 'River':
				$('#dInsB_river').append($("<option></option>").attr("value", bvebveStrOjArr[i][1]).text(bvebveStrOjArr[i][2]));
				$('#dInsR_river').append($("<option></option>").attr("value", bvebveStrOjArr[i][1]).text(bvebveStrOjArr[i][2]));
				break;
			case 'RiverBank':
				$('#dInsR_riverBank').append($("<option></option>").attr("value", bvebveStrOjArr[i][1]).text(bvebveStrOjArr[i][2]));
				break;
																
			default:
		}
    	}

    	for (var i=0; i < bvefreeObjArr.length; i++) {
    		$('#sideObj').append($("<option></option>").attr("value", bvefreeObjArr[i][4]).text(bvefreeObjArr[i][2].substr(0, 25)));		
   		switch (bvefreeObjArr[i][3]) {
			case 'overbridge':
				$('#dInsOb_overbridge').append($("<option></option>").attr("value", bvefreeObjArr[i][1]).text(bvefreeObjArr[i][2]));
				break;
			case 'building':
				
				break;
			case 'house':
				
				break;
			case 'tree':
				
				break;
			case 'landscape':
				
				break;
			case 'road':
				
				break;
			case 'fence':
				
				break;
			case 'train':
				
				break;
			case 'others vehicle':
				
				break;
			case 'sign':
				
				break;
			case 'rail object':
				
				break;
			case 'structure':
				
				break;
			case 'machine':
				
				break;
			case 'station object':
				
				break;
			case 'others':
				
				break;
			default:
			
				break;
		}
	}

    	for (var i=0; i < bvetrainObjArr.length; i++) {
    		$('#dtsv_runningTrain').append($("<option></option>").attr("value", bvetrainObjArr[i][4]).text(bvetrainObjArr[i][2]));
    		$('#dbr_runningTrain').append($("<option></option>").attr("value", bvetrainObjArr[i][4]).text(bvetrainObjArr[i][2]));
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
 							if (td1[3] == '') { 								
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
 								if (td0[3] == '') { 								
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
 								if (td1[3] == '') { 								
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
 							if (td1[3] == '') { 								
 								td1[3] = 'height:' + h;
 								arrTE[j] = td1.join(',');
 								//arrTE[j] = arrTE[j].replace('undefined',''); 						
 								break; 								
 							} else {
 								if (td1[3].indexOf('height:') < 0) {
 									td1[3] += '§height:'+h; 
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
 						
 						if ((edH >= parseInt(td0[0])) && (edH <= parseInt(td1[0]))) {
 							if (edH == parseInt(td0[0])) {
 								if (td0[3] == '') { 								
 									td0[3] = 'height:' + h;
 									arrTE[j-1] = td0.join(',');
 									//arrTE[j-1] = arrTE[j-1].replace('undefined',''); 						
 									break; 								
 								} else {
 									if (td0[3].indexOf('height:') < 0) {
 										td0[3] += '§height:' + h; 
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
 								
 							} else if (edH == parseInt(td1[0])) {
 								if (td1[3] == '') { 								
 									td1[3] = 'height:' + h;
 									arrTE[j] = td1.join(',');
 									//arrTE[j] = arrTE[j].replace('undefined',''); 						
 									break; 								
 								} else {
 									if (td1[3].indexOf('height:') < 0) {
 										td1[3] += '§height:' + h; 
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
 								var artxt = edH.toString() + ',,,height:' + h + ',';
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
	  	  					if (td1[3] == '') { 								
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
					alert($.lang.convert('please select either start point or end point, tq'));
					return false;
			}
			var strPLIndex = $('#PLstrListIndex').val();
		  	var txtPitchDetails = $('#txtPitchDetails').val();
		  	var arrTE = txtPitchDetails.split('\n');
		    var cgsp = parseInt($('#txtPitchStrP').val());
		    
			var spm = false;
			if (typeof pitchStr == 'undefined') {
				alert($.lang.convert('please select the structure type'));
				return false;	
			}
	    	
	    	var strType = (start) ? pitchStr + '«start': pitchStr + '«end';
	    	
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
									var ar1_0 = ar1[0].split('«'); // jadi array [strA,start]
									
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
											var ar1_0 = ar1[0].split('«'); // jadi array [strA,start]
										
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
											var ar1_0 = ar1[a].split('«'); // jadi array [strA,start]
										
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
			/*			
			} else if ($('#railPitchStructure').val() == 'underground') {
			    	for (var i=0; i < bveUGObjArr.length; i++) {
					$strLIndex.append($("<option></option>").attr("value", bveUGObjArr[i][1]).text(bveUGObjArr[i][2]));
    				}
			*/			
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
		
		$('#rpM1').val('');
		$('#rpM2').val('');
			
		$('#dialogRailpitch').dialog('close');
		  var endLtLg = MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(miEd).getPosition();
	
			for (var i = 0; i < arrTE.length; i++) {
				if (arrTE[i] != '') {
					var arr0 = arrTE[i].split(','); // gnote.push([dis.toString(), note, pit, bdata, kit]);
					var pitchStrdistance = distanceAtStart + parseInt(arr0[0]);
					if (i == 0) {
						if (arr0[1] != '') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(miSt).note = arr0[1]; }
						if (arr0[2] != '') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(miSt).bdata.pitch = parseInt(arr0[2]); }
						if (arr0[3] != '') { 
							updateKdata("lineTab",polyIDtxt,miSt,arr0[3]);
						}
						if (arr0[4] != '') { 
							updateBdata("lineTab",polyIDtxt,miSt,arr0[4]);	
						}

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
						if (arr0[1] != '') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).note = arr0[1]; }
						if (arr0[2] != '') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).bdata.pitch = parseInt(arr0[2]); }
						if (arr0[3] != '') {
							updateKdata("lineTab",polyIDtxt,endidx,arr0[3]);					
						}
						if (arr0[4] != '') { 
							updateBdata("lineTab",polyIDtxt,endidx,arr0[4]);
						}
						
						if ($('#LLlastpitch').val() != '') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).gdata.lastpitch = ($('#LLlastpitch').val() != '') ? $('#LLlastpitch').val() : ''; }
						if ($('#LLlastheight').val() != '') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).gdata.lastheight = ($('#LLlastheight').val() != '') ? $('#LLlastheight').val() : ''; }
						if ($('#LLlastheightratio').val() != '') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).gdata.lastheightratio = ($('#LLlastheightratio').val() != '') ? $('#LLlastheightratio').val() : ''; }
						
						//MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).setIcon("images/marker_squared_edit.png");
						var hm = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx-1).getPosition(),MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).getPosition());
						var mm = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).getPosition(), 6, hm-90);

						var edit = new google.maps.Marker({
							position: mm,
							icon: "images/marker_squared_edit.png",
							draggable: false,
							map: map
						});
					
						++MapToolbar["dotMarkerCounter"];
						edit.id = 'dotMarker_'+ MapToolbar["dotMarkerCounter"];
						edit.ptype = 'dotMarker';
						edit.note = 'last point of polyline elevation editing';
						edit.iwref = '';
						edit.$el = MapToolbar.addFeatureEntry(edit.id);	     
						MapToolbar.features['dotMarkerTab'][edit.id] = edit;
						google.maps.event.addListener(edit, "click", function(mEvent){
							var DegMinSec = DecInDeg(mEvent.latLng);
							var infoWindowTxt = 'Marker Id : ' + edit.id;
							infoWindowTxt += '<br />' + 'Location : ';
							infoWindowTxt += DegMinSec + '<br />';
							infoWindowTxt += '<br />' + 'Note : ' + edit.note;
		
							var infowindow = new google.maps.InfoWindow({
								content: infoWindowTxt,
								position: mEvent.latLng
							});
        
							infowindow.open(map);		
						});
						MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(endidx).setDraggable(false);
	        //));
						
					} else {
						//detect current curve, if point on curve line create and set data
							if ((arr0[3].indexOf('curve') >= 0) || ((arr0[3].indexOf('tcurve') >= 0))){
								var arr1 = arr0[3].split('§');

								for (var a = 0; a < arr1.length; a++) {
									var arr2 = arr1[a].split(':');
									switch (arr2[0]) {
										case 'height' :
											MapToolbar.features["curveTab"][cuvid].markers.getAt(j).bdata.height = parseFloat(arr2[1]);
											break;
										case 'tcurve' :
											if (arr2[1] == 'startT') {
												cuvid = arr2[2];
												if (arr0[1] != '') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(0).note = arr0[1]; }
												if (arr0[2] != '') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(0).bdata.pitch = parseInt(arr0[2]); }
												if (arr0[3] != '') { 
													updateKdata("tcurveTab",cuvid,0,arr0[3]);
												}
												if (arr0[4] != '') { 
													updateBdata("tcurveTab",cuvid,0,arr0[4]);
												}												
											} else if (arr2[1] == 'endT') {
												cuvid = arr2[2];
												if (arr0[1] != '') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(1).note = arr0[1]; }
												if (arr0[2] != '') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(1).bdata.pitch = parseInt(arr0[2]); }
												if (arr0[3] != '') { 
													updateKdata("tcurveTab",cuvid,1,arr0[3]);
												}
												if (arr0[4] != '') { 
													updateBdata("tcurveTab",cuvid,1,arr0[4]);
												}												
												cuvid = '';
											} else if (arr2[1] == 'startC') {
												cuvid = arr2[2];
												if (arr0[1] != '') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(3).note = arr0[1]; }
												if (arr0[2] != '') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(3).bdata.pitch = parseInt(arr0[2]); }
												if (arr0[3] != '') { 
													updateKdata("tcurveTab",cuvid,3,arr0[3]);
												}
												if (arr0[4] != '') { 
													updateBdata("tcurveTab",cuvid,3,arr0[4]);
												}												
											} else if (arr2[1] == 'endC') {
												cuvid =  arr2[2];
												if (arr0[1] != '') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(4).note = arr0[1]; }
												if (arr0[2] != '') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(4).bdata.pitch = parseInt(arr0[2]); }
												if (arr0[3] != '') { 
													updateKdata("tcurveTab",cuvid,4,arr0[3]);
												}
												if (arr0[4] != '') { 
													updateBdata("tcurveTab",cuvid,4,arr0[4]);
												}												
											} else if (arr2[1] == 'ld') {
												cuvid =  arr2[2];
												var l = parseInt(arr2[3]);
												if (arr0[1] != '') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(l).note = arr0[1]; }
												if (arr0[2] != '') { MapToolbar.features["tcurveTab"][cuvid].markers.getAt(l).bdata.pitch = parseInt(arr0[2]); }
												if (arr0[3] != '') { 
													updateKdata("tcurveTab",cuvid,l,arr0[3]);
												}
												if (arr0[4] != '') { 
													updateBdata("tcurveTab",cuvid,l,arr0[4]);
												}												
											}							
											break;
										case 'curve' :
											if (arr2[1] == 'start') {
												cuvid = arr2[2];
												if (arr0[1] != '') { MapToolbar.features["curveTab"][cuvid].markers.getAt(0).note = arr0[1]; }
												if (arr0[2] != '') { MapToolbar.features["curveTab"][cuvid].markers.getAt(0).bdata.pitch = parseInt(arr0[2]); }
												if (arr0[3] != '') { 
													updateKdata("curveTab",cuvid,0,arr0[3]);
												}
												if (arr0[4] != '') { 
													updateBdata("curveTab",cuvid,0,arr0[4]);
												}
											} else if (arr2[1] == 'end') {
												if (arr0[1] != '') { MapToolbar.features["curveTab"][cuvid].markers.getAt(1).note = arr0[1]; }
												if (arr0[2] != '') { MapToolbar.features["curveTab"][cuvid].markers.getAt(1).bdata.pitch = parseInt(arr0[2]); }
												if (arr0[3] != '') { 
													updateKdata("curveTab",cuvid,1,arr0[3]);
												}
												if (arr0[4] != '') { 
													updateBdata("curveTab",cuvid,1,arr0[4]);
												}
												cuvid = '';
											} else if (arr2[1] == 'ld') {
												cuvid = arr2[2];
												var l = parseInt(arr2[3]);
												if (arr0[1] != '') { MapToolbar.features["curveTab"][cuvid].markers.getAt(l).note = arr0[1]; }
												if (arr0[2] != '') { MapToolbar.features["curveTab"][cuvid].markers.getAt(l).bdata.pitch = parseInt(arr0[2]); }
												if (arr0[3] != '') { 
													updateKdata("curveTab",cuvid,l,arr0[3]);
												}
												if (arr0[4] != '') { 
													updateBdata("curveTab",cuvid,l,arr0[4]);
												}
											}							
											break;

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
										var distancePrv = (j == 0) ? 0: Math.ceil(parseFloat(getTrackDistanceFromStart(polyIDtxt, j -1).LwCurve));
										var distanceNow = Math.ceil(parseFloat(getTrackDistanceFromStart(polyIDtxt, j).LwCurve));										
										if ((distancePrv <= pitchStrdistance) && (pitchStrdistance <= distanceNow)) {
											if (pitchStrdistance == distanceNow) {
												if (arr0[1] != '') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).note = arr0[1]; }
												if (arr0[2] != '') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).bdata.pitch = parseInt(arr0[2]); }
												if (arr0[3] != '') { 
													updateKdata("lineTab",polyIDtxt,j,arr0[3]);
												}
												if (arr0[4] != '') { 
													updateBdata("lineTab",polyIDtxt,j,arr0[4]); 
												}
												break;
											} else {
												//create new point
												//calc new point based on distance from previus point
												var newPoffset = pitchStrdistance - distancePrv;
												var hd = google.maps.geometry.spherical.computeHeading(allPoints[j-1],allPoints[j]);
												var newPLatLng = google.maps.geometry.spherical.computeOffset(allPoints[j-1], newPoffset, hd);	
												MapToolbar.addPoint(newPLatLng, bPoly, j);
												miEd++;
												if (allPoints.length <= MapToolbar.features["lineTab"][polyIDtxt].getPath().getArray().length) { //array checking
													// array expanded - OK
													if (arr0[1] != '') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).note = arr0[1]; }
													if (arr0[2] != '') { MapToolbar.features["lineTab"][polyIDtxt].markers.getAt(j).bdata.pitch = parseInt(arr0[2]); }
													if (arr0[3] != '') { 
														updateKdata("lineTab",polyIDtxt,j,arr0[3]);													 
													}
													if (arr0[4] != '') { 
														updateBdata("lineTab",polyIDtxt,j,arr0[4]);
													}
													
													break;
												} else {
													alert($.lang.convert('warning! array not updated!'));
													return false;
												}
											}
										}
									}
			
								} else {
									var bPoly = MapToolbar.features["lineTab"][polyIDtxt];
									var allPoints = bPoly.getPath().getArray();
									if (miEd >= allPoints.length ) { alert('over flow'); return false;}
									var cuvtype = cuvid.split('_')[0];
									
									if (cuvtype == 'curve') {
										var cR = Math.abs(MapToolbar.features['curveTab'][cuvid].Rc);
										var Lt = MapToolbar.features['curveTab'][cuvid].Lt ;
										var Lc = MapToolbar.features['curveTab'][cuvid].Lc ;
										var xpc = MapToolbar.features['curveTab'][cuvid].Cc;
										var xp1 = MapToolbar.features['curveTab'][cuvid].st;
										var xp2 = MapToolbar.features['curveTab'][cuvid].ed;
										var xh1 = MapToolbar.features['curveTab'][cuvid].h1;
										var xh2 = MapToolbar.features['curveTab'][cuvid].h2;
										var mid = MapToolbar.features['curveTab'][cuvid].mid;
										var dir = (MapToolbar.features['curveTab'][cuvid].Rc < 0) ? -1 : 1;
										var iB = google.maps.geometry.spherical.computeHeading(xpc,xp1);		
												
										var midxD = parseFloat(getTrackDistanceFromStart(polyIDtxt, mid).LwCurve);
										var cvStD = Math.ceil(midxD - Lt);
										var cvEdD = Math.ceil(midxD - Lt + Lc);
											
										if ((cvStD <= pitchStrdistance) && (pitchStrdistance <= cvEdD)) {
											var cpoly = MapToolbar.features["curveTab"][cuvid];
											var sL = pitchStrdistance - cvStD;
											var a_deg = (180 * sL) / (Math.PI * cR);
											var e1;
												
											if (dir  > 0) {
												var ha = (iB + a_deg <= 180) ? iB + a_deg : iB + a_deg - 360;
												e1 = google.maps.geometry.spherical.computeOffset(xpc, cR, ha);
												var addAt =  curveAddAt(cuvid,e1);	
												MapToolbar.addPoint(e1, MapToolbar.features['curveTab'][cuvid], addAt);
											} else {
												var ha = (iB - a_deg <= -180) ? iB - a_deg + 360 : iB - a_deg ;
												e1 = google.maps.geometry.spherical.computeOffset(xpc, cR, ha);
												var addAt =  curveAddAt(cuvid,e1);	
												MapToolbar.addPoint(e1, MapToolbar.features['curveTab'][cuvid], addAt);

											}
											var cuvNewIdx = MapToolbar.features["curveTab"][cuvid].markers.getLength()-1;
													
											if (arr0[1] != '') { cpoly.markers.getAt(cuvNewIdx).note = arr0[1]; }
											if (arr0[2] != '') { cpoly.markers.getAt(cuvNewIdx).bdata.pitch = parseInt(arr0[2]); }
											if (arr0[3] != '') { 
												updateKdata("curveTab",cuvid,cuvNewIdx,arr0[3]);
											}
											if (arr0[4] != '') { 
												updateBdata("curveTab",cuvid,cuvNewIdx,arr0[4]);
											}																	
										}
											
									} else if (cuvtype == 'tcurve') {
										var Rc = Math.abs(MapToolbar.features['tcurveTab'][cuvid].Rc);
										var Ls = MapToolbar.features['tcurveTab'][cuvid].Ls;
										var Lc = MapToolbar.features['tcurveTab'][cuvid].Lc;
										var Lt = Lc + 2*Ls;
										var Cc = MapToolbar.features['tcurveTab'][cuvid].Cc;
										var Ttst = MapToolbar.features['tcurveTab'][cuvid].Ttst;
										var Tted = MapToolbar.features['tcurveTab'][cuvid].Tted;
										var Tcst = MapToolbar.features['tcurveTab'][cuvid].Tcst;
										var Tced = MapToolbar.features['tcurveTab'][cuvid].Tced;
										var mid = MapToolbar.features['tcurveTab'][cuvid].mid;

										var TL = MapToolbar.features['tcurveTab'][cuvid].TL;
		
										var dir = (MapToolbar.features['tcurveTab'][cuvid].Rc < 0) ? -1 : 1;
									
										var midxD = parseFloat(getTrackDistanceFromStart(polyIDtxt, mid).LwCurve);
										var tcpoly = MapToolbar.features["tcurveTab"][cuvid];
										
										var iB = google.maps.geometry.spherical.computeHeading(Cc,Tcst);
										
										var tcTst = Math.ceil(midxD - TL);
										var tcCst = Math.ceil(midxD - TL + Ls);
										var tcCed = Math.ceil(midxD - TL + Ls + Lc);
										var tcTed = Math.ceil(midxD - TL + Lt);
																				
										if ((tcTst <= pitchStrdistance) && (pitchStrdistance <= tcCst)) {
											//approximation method
											var sL = pitchStrdistance - tcTst;											
											var allPoints = tcpoly.getPath().getArray();
											var arrD = [];
											var sIdx = null;
											var lastD; 
											
											for (var t = 0; t <= allPoints.length; t++) { 
												arrD.push(allPoints[t]);
												var curL = google.maps.geometry.spherical.computeLength(arrD);
												if (curL <= sL) {
													sIdx = t;
													lastD = curL;
													//console.log(t + ':' + curL + '=' + sL);
												} else {
													//console.log(t + ':' + curL + '=' + sL);
													if (sL - lastD > curL - sL) {
														sIdx = t;
														lastD = curL;													
													}
													break;
												}
											}
											
											var e1 = allPoints[sIdx];
											MapToolbar.addPoint(e1, tcpoly, sIdx);
											var cuvNewIdx = MapToolbar.features["tcurveTab"][cuvid].markers.getLength()-1;
													
											if (arr0[1] != '') { tcpoly.markers.getAt(cuvNewIdx).note = arr0[1]; }
											if (arr0[2] != '') { tcpoly.markers.getAt(cuvNewIdx).bdata.pitch = parseInt(arr0[2]); }
											if (arr0[3] != '') { 
												updateKdata("tcurveTab",cuvid,cuvNewIdx,arr0[3]);
											}
											if (arr0[4] != '') { 
												updateBdata("tcurveTab",cuvid,cuvNewIdx,arr0[4]);
											}
											
											
										} else if ((tcCst <= pitchStrdistance) && (pitchStrdistance <= tcCed)) {
											var sL = pitchStrdistance - tcCst;
											var a_deg = (180 * sL) / (Math.PI * Rc);
											var e1;
											if (dir  > 0) {
												var ha = (iB + a_deg <= 180) ? iB + a_deg : iB + a_deg - 360;
												e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
												var addAt =  curveAddAt(cuvid,e1);	
												MapToolbar.addPoint(e1, tcpoly, addAt);
											} else {
												var ha = (iB - a_deg <= -180) ? iB - a_deg + 360 : iB - a_deg ;
												e1 = google.maps.geometry.spherical.computeOffset(Cc, Rc, ha);
												var addAt =  curveAddAt(cuvid,e1);	
												MapToolbar.addPoint(e1, tcpoly, addAt);

											}
											var cuvNewIdx = MapToolbar.features["tcurveTab"][cuvid].markers.getLength()-1;
													
											if (arr0[1] != '') { tcpoly.markers.getAt(cuvNewIdx).note = arr0[1]; }
											if (arr0[2] != '') { tcpoly.markers.getAt(cuvNewIdx).bdata.pitch = parseInt(arr0[2]); }
											if (arr0[3] != '') { 
												updateKdata("tcurveTab",cuvid,cuvNewIdx,arr0[3]);
											}
											if (arr0[4] != '') { 
												updateBdata("tcurveTab",cuvid,cuvNewIdx,arr0[4]);
											}																	
										
										} else if ((tcCed <= pitchStrdistance) && (pitchStrdistance <= tcTed)) {
											//approximation method
											var sL = pitchStrdistance - tcTst;
											var allPoints = tcpoly.getPath().getArray();
											var arrD = [];
											var sIdx = null;
											var lastD; 
											
											for (var t = 0; t <= allPoints.length; t++) { 
												arrD.push(allPoints[t]);
												var curL = google.maps.geometry.spherical.computeLength(arrD);
												if (curL <= sL) {
													sIdx = t;
													lastD = curL;
													//console.log(t + ':' + curL + '=' + sL);
												} else {
													//console.log(t + ':' + curL + '=' + sL);
													if (sL - lastD > curL - sL) {
														sIdx = t;
														lastD = curL;													
													}
													break;
												}
											}
											
											var e1 = allPoints[sIdx];											
											MapToolbar.addPoint(e1, tcpoly, sIdx);
											var cuvNewIdx = MapToolbar.features["tcurveTab"][cuvid].markers.getLength()-1;
													
											if (arr0[1] != '') { tcpoly.markers.getAt(cuvNewIdx).note = arr0[1]; }
											if (arr0[2] != '') { tcpoly.markers.getAt(cuvNewIdx).bdata.pitch = parseInt(arr0[2]); }
											if (arr0[3] != '') { 
												updateKdata("tcurveTab",cuvid,cuvNewIdx,arr0[3]);
											}
											if (arr0[4] != '') { 
												updateBdata("tcurveTab",cuvid,cuvNewIdx,arr0[4]);
											}											
											
										}
	
									}
								}
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
			
			if ($('#dtsv_trackname').val() != '') { poly.name = $('#dtsv_trackname').val(); } else { poly.name = ''; }
			if ($('#dtsv_route').val() != '') { 
				poly.route = $('#dtsv_route').val(); 

				var svclist = document.getElementById('route_list');
				if (svclist.childElementCount > 0) {
					var dahada = false;
					for (var i = 0; i < svclist.childElementCount; i++) {
						if (svclist.children[i].firstElementChild.getAttribute("value") == poly.route) {
							dahada = true;
							break;
						}
					}
					if (dahada == false) {
						var slist = document.createElement('label');
						slist.id = poly.route;
						slist.innerHTML = '<input type="checkbox" value="' + poly.route + '" checked="checked" onClick="toggleRoute(\'' + poly.route + '\')">' + poly.route + '<br />';
						svclist.appendChild(slist);						
					}
				} else {
					var slist = document.createElement('label');
					slist.id = poly.route;
					slist.innerHTML = '<input type="checkbox" value="' + poly.route + '" checked="checked" onClick="toggleRoute(\'' + poly.route + '\')">' + poly.route + '<br />';
					svclist.appendChild(slist);
		
				}
				
			} else {
				poly.route = ''; 
			}
					
			if ($('#dtsv_devID').val() != '') { poly.bdata.devID = $('#dtsv_devID').val(); }
			if ($('#dtsv_maxSpeed').val() != '') { poly.bdata.maxSpeed = $('#dtsv_maxSpeed').val(); }
			if ($('#dtsv_simBVE').val() != '') { poly.bdata.simBVE = $('#dtsv_simBVE').val(); }
			if ($('#dtsv_trackGauge').val() != '') { poly.bdata.gauge = $('#dtsv_trackGauge').val(); }
			if ($('#dtsv_desc').val() != '') { poly.bdata.desc = $('#dtsv_desc').val(); }
			if ($('#dtsv_runningTrain').val() != '') { poly.bdata.train = $('#dtsv_runningTrain').val(); }			
			if ($('#dtsv_railtypedefault').val() != '') { poly.bdata.railindex = $('#dtsv_railtypedefault').val(); }			
	
			if ($('#dtsv_note').val() != '') { poly.note = $('#dtsv_note').val(); } else { poly.note = ''; }
			
			linesRoute(pid,poly.route);
			
			$('#dialogTrackSetting').dialog('close');
			alert($.lang.convert('track setting updated'));
			$('#dtsv_lineid').val('');
			$('#dtsv_trackname').val('');
			$('#dtsv_route').val('');
			$('#dtsv_trackGauge').val('');
			$('#dtsv_railtypedefault').val('');
			$('#dtsv_runningTrain').val('');
			$('#dtsv_devID').val('');
			$('#dtsv_note').val('');
		});
		
		$('#btnUpdateMarkerSetting').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			
			if ( $('#dms_railindex option:selected').val() != '') { MapToolbar.features[tab][pid].markers.getAt(mIdx).bdata.railindex = $('#dms_railindex option:selected').val(); }
			if ( $('#dms_height').val() != '') { MapToolbar.features[tab][pid].markers.getAt(mIdx).bdata.height = parseFloat($('#dms_height').val()); }
			if ( $('#dms_pitch').val() != '') { MapToolbar.features[tab][pid].markers.getAt(mIdx).bdata.pitch = parseFloat($('#dms_pitch').val()); }
			if ( $('#dms_note').val() != '') { MapToolbar.features[tab][pid].markers.getAt(mIdx).note = $('#dms_note').val(); }
	
			
			if (document.getElementById('lockedmarker').checked) {
				MapToolbar.features[tab][pid].markers.getAt(mIdx).setDraggable(false);
			} else {
				MapToolbar.features[tab][pid].markers.getAt(mIdx).setDraggable(true);
			}
			
			if (document.getElementById('poleOn').checked) {
				if (typeof $('#dms_poleindex option:selected').val() != 'undefined') {
					var start = null; 
					switch (true) {
						case (document.getElementById('dms_poleStart').checked):
							start = true;
							break;
						case (document.getElementById('dms_poleEnd').checked):
							start = false;
							break;
						default:
							start = true;
					}
				
					var strType = (start) ? 0 : 1;	
					
					if (MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.pole == '') {
						MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.pole = $('#dms_poleindex option:selected').val() + ':' + strType;
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.pole += '¤' + $('#dms_poleindex option:selected').val() + ':' + strType;
					}				
					//MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kdata.pole = $('#dms_poleindex option:selected').val();
				}				
				
			} else {
				MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.pole = '';
			}			
			$('#dialogMarkerSetting').dialog('close');
			alert($.lang.convert('marker setting updated'));
			
		});
		
		$('#btnAddPointsNDraw').click(function() {
			if ((($('#dap_1lat').val() !='') && ($('#dap_1lng').val() !='')) && (($('#dap_2lat').val() !='') && ($('#dap_2lng').val() !=''))) {
				var lat1 = parseFloat($('#dap_1lat').val());
				var lng1 = parseFloat($('#dap_1lng').val());
				var lat2 = parseFloat($('#dap_2lat').val());
				var lng2 = parseFloat($('#dap_2lng').val());
				var checkOK = (((lat1 != NaN) && (lng1 != NaN)) && ((lat2 != NaN) &&  (lng2 != NaN))) ? true : false;
				
				if (checkOK) {
					var pointA =  new google.maps.LatLng(lat1,lng1);
					var pointB = new google.maps.LatLng(lat2,lng2);
									
					MapToolbar.initFeature('line');
					MapToolbar.stopEditing();
					
					var no = MapToolbar['lineCounter'];
					var pno = 'line_' + no;
					//alert('pno : '+pno);
					var poly = MapToolbar.features["lineTab"][pno];
					//alert(poly.id);
					MapToolbar.addPoint(pointA, poly, 0); 
					MapToolbar.addPoint(pointB, poly, 1); 
	 				
	 				//alert(MapToolbar.features["lineTab"][pno].markers.length);
	 				jQuery('#dialogAddPoint').dialog('close');
	 				
				} else {
					alert($.lang.convert('please enter latitude and longitude value properlly! NaN error, unable to translate inputs to numbers.'));	
				}
				
			} else {
				alert($.lang.convert('please fill all fields with appropriate latitude and longitude value!'));
			}
		});
		
		// dialog insert crossing
		$('#dInsC_OK').click(function() {		
			//if (document.getElementById('dInsC_Crossing').value != '') {
				var pid = $('#dInsC_PID').val(); 
				var mIdx = parseInt($('#dInsC_MID').val());
				var tab = pid.split('_')[0]+ 'Tab';
				
				if (typeof MapToolbar.features[tab][pid].markers.getAt(mIdx) != 'undefined') {
					MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.roadcross = $('#dInsC_Crossing').val();
					var image = new google.maps.MarkerImage('images/roadcross_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features[tab][pid].markers.getAt(mIdx).setIcon(image);
					$('#dialogInsertCrossing').dialog('close');
				} else {
					alert($.lang.convert('marker index not defined'));				
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
				var tab = pid.split('_')[0]+ 'Tab';
				
				if (typeof MapToolbar.features[tab][pid].markers.getAt(mIdx) != 'undefined') {
					var start = null; 
					switch (true) {
						case (document.getElementById('dInsB_start').checked):
							start = true;
							break;
						case (document.getElementById('dInsB_end').checked):
							start = false;
							break;
						default:
							alert($.lang.convert('please select either start point or end point, tq'));
							return false;
					}
				
					var strType = (start) ? 0 : 1;	
				
					MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.bridge = $('#dInsB_bridge').val() + ':' + strType + ':' + $('#dInsB_BL').val();
					var image = new google.maps.MarkerImage('images/bridge_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features[tab][pid].markers.getAt(mIdx).setIcon(image);
					$('#dialogInsertBridge').dialog('close');				

				} else {
					alert($.lang.convert('marker index not defined'));				
				}
			//}
		});

		$('#dInsB_KO').click(function() {
			$('#dialogInsertBridge').dialog('close');
		});
		
		$('#dInsB_bridge').change(function() {
			if (document.getElementById('dInsB_bridge').value != '') {
				var src = getObjectImage('bridge',$('#dInsB_bridge').val());
				document.getElementById('bridgeImg').src='images/' + src;
			}
		});
		
		$('#dInsB_river').change(function() {
			if (document.getElementById('dInsB_river').value != '') {
				var src = getObjectImage('river',$('#dInsB_river').val());
				document.getElementById('bridgeRiverImg').src='images/' + src;
			}
		});

		// dialog insert overbridge
		$('#dInsOb_OK').click(function() {
			//if (document.getElementById('dInsOb_overbridge').value != '') {
				var pid = $('#dInsOb_PID').val(); 
				var mIdx = parseInt($('#dInsOb_MID').val());
				var distance_correction =($('#dInsOb_Lm').val() != '') ? $('#dInsOb_Lm').val() : 0;
				var height_correction =($('#dInsOb_Ht').val() != '') ? $('#dInsOb_Ht').val() : 0;
				var angle_correction = ($('#dInsOb_RA').val() != '') ? $('#dInsOb_RA').val() : 0;	
				var tab = pid.split('_')[0]+ 'Tab';
				
				if (typeof MapToolbar.features[tab][pid].markers.getAt(mIdx) != 'undefined') {
					MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.overbridge = $('#dInsOb_overbridge').val() + '¤' + distance_correction + '¤' + height_correction + '¤' + angle_correction;
					var image = new google.maps.MarkerImage('images/overbridge_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features[tab][pid].markers.getAt(mIdx).setIcon(image);
					$('#dialogInsertOverbridge').dialog('close');					

				} else {
					alert($.lang.convert('marker index not defined'));				
				}				
			//}
		});

		$('#dInsOb_KO').click(function() {
			$('#dialogInsertOverbridge').dialog('close');
		});
		
		$('#dInsOb_overbridge').change(function() {
			if (document.getElementById('dInsOb_overbridge').value != '') {
				var src = getObjectImage('overbridge',$('#dInsOb_overbridge').val());
				document.getElementById('overbridgeImg').src='images/' + src;

			}
		});		

		// dialog insert river
		$('#dInsR_OK').click(function() {
			var pid = $('#dInsR_PID').val(); 
			var mIdx = parseInt($('#dInsR_MID').val());
			var hwidth = parseInt($('#dInsR_width').val())/2;
			var hh = 0;
			if (pid.split('_')[0] == 'line') {
				if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(mIdx-1) != 'undefined') { 
					hh = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx-1).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition());;
				} else if (typeof MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1) != 'undefined') {
					hh = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).getPosition());;
				}
				
				var r0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), -hwidth, hh);
				var r1 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), hwidth, hh);
				var r2 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), hwidth+25, hh);
				
				MapToolbar.addPoint(r0, MapToolbar.features["lineTab"][pid], mIdx);
				MapToolbar.addPoint(r1, MapToolbar.features["lineTab"][pid], mIdx+2);
				MapToolbar.addPoint(r2, MapToolbar.features["lineTab"][pid], mIdx+3);
				
				MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).kdata.ground = $('#dInsR_river').val();
				MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).note = 'river ' + $('#dInsR_width').val() + ' m';
				MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+2).kdata.ground = $('#dInsR_riverBank').val();
				MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+3).kdata.ground = $('#dInsR_ground').val();
				
				var image = new google.maps.MarkerImage('images/river_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
				MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).setIcon(image);
				var image = new google.maps.MarkerImage('images/ground8.png',
						new google.maps.Size(8, 8),
						new google.maps.Point(0, 0),
						new google.maps.Point(4, 4));
				MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+2).setIcon(image);
				var image = new google.maps.MarkerImage('images/ground8.png',
						new google.maps.Size(8, 8),
						new google.maps.Point(0, 0),
						new google.maps.Point(4, 4));
				MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+3).setIcon(image);

			} else {
				alert('Please create river manually on BVE code, leave a note as a remark here.');
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

		$('#dInsR_riverBank').change(function() {
			if (document.getElementById('dInsR_riverBank').value != '') {
				for (i = 0; i < bvebveStrOjArr.length; i++) {					
					if (bvebveStrOjArr[i][3] == 'RiverBank') {
						if (bvebveStrOjArr[i][1] == document.getElementById('dInsR_riverBank').value) {
							document.getElementById('dInsR_riverBankImg').src = 'images/' + bvebveStrOjArr[i][4];
							break;
						} 
					}					
				}
			}
		});		

		$('#dInsR_ground').change(function() {
			if (document.getElementById('dInsR_ground').value != '') {
				for (i = 0; i < bvebveStrOjArr.length; i++) {					
					if (bvebveStrOjArr[i][3] == 'Ground') {
						if (bvebveStrOjArr[i][1] == document.getElementById('dInsR_ground').value) {
							document.getElementById('dInsR_groundImg').src = 'images/' + bvebveStrOjArr[i][4];
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
			var tab = pid.split('_')[0]+ 'Tab';
			
			if (typeof MapToolbar.features[tab][pid].markers.getAt(mIdx) != 'undefined') {
				MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.ground = $('#dUpdG_object').val();
				var image = new google.maps.MarkerImage('images/ground8.png',
					new google.maps.Size(8, 8),
					new google.maps.Point(0, 0),
					new google.maps.Point(4, 4));
				MapToolbar.features[tab][pid].markers.getAt(mIdx).setIcon(image);
				$('#dialogUpdateGround').dialog('close');
			} else {
				alert($.lang.convert('marker index not defined'));				
			}
			
		});

		$('#dUpdG_KO').click(function() {
			$('#dialogUpdateGround').dialog('close');
		});
		
		$('#dUpdG_object').change(function() {
			if (document.getElementById('dUpdG_object').value != '') {
				var src = getObjectImage('ground',$('#dUpdG_object').val());
				document.getElementById('groundImg').src='images/' + src;

			}
		});
		
		$('#mOClearAll').click(function() {
			if (confirm($.lang.convert('Clear all items?'))) {
				//alert('Sorry! no code defined yet.');
				
				for (oType in MapToolbar.features) {
					var type = oType.replace('Tab','');
					
					for (oName in MapToolbar.features[oType]) {
						var feature = MapToolbar.features[oType][oName];
						feature.$el.row.parentNode.removeChild(feature.$el.row);
						delete  MapToolbar.features[oType][oName];
						
						switch(type){
							case "dotMarker":
								feature.setMap(null);
								break;
							case "circle":
								feature.setMap(null);
								break;
							case "curve":
								/* var pid = feature.pid;
								var Mid = feature.mid;
								
								MapToolbar.features['lineTab'][pid].markers.getAt(Mid).bdata.curve = '';
								MapToolbar.features['lineTab'][pid].markers.getAt(Mid).setDraggable(true);
								
								if (typeof MapToolbar.features['lineTab'][pid].markers.getAt(Mid-1) != 'undefined') {
									MapToolbar.features['lineTab'][pid].markers.getAt(Mid-1).setDraggable(true);
								}
								
								if (typeof MapToolbar.features['lineTab'][pid].markers.getAt(Mid+1) != 'undefined') {
									MapToolbar.features['lineTab'][pid].markers.getAt(Mid+1).setDraggable(true);
								}
								*/				
								feature.markers.forEach(function(marker, index){
									marker.setMap(null);
								});		     
								feature.setMap(null);
								
								break;
							case "tcurve":
								/*var pid = feature.pid;
								var Mid = feature.mid;
								
								MapToolbar.features['lineTab'][pid].markers.getAt(Mid).bdata.tcurve = '';
								MapToolbar.features['lineTab'][pid].markers.getAt(Mid).setDraggable(true);
								
								if (typeof MapToolbar.features['lineTab'][pid].markers.getAt(Mid-1) != 'undefined') {
									MapToolbar.features['lineTab'][pid].markers.getAt(Mid-1).setDraggable(true);
								}
								
								if (typeof MapToolbar.features['lineTab'][pid].markers.getAt(Mid+1) != 'undefined') {
									MapToolbar.features['lineTab'][pid].markers.getAt(Mid+1).setDraggable(true);
								}				
							*/
								feature.markers.forEach(function(marker, index){
									marker.setMap(null);
								});		     
								feature.setMap(null);
								
								break;
							case "rectangle":
								feature.setMap(null);
								break;
							case "ruler":
								feature.markers.forEach(function(marker, index){
									marker.setMap(null);
								});			
								feature.setMap(null);
								break;
							case "protractor":
								feature.markers.forEach(function(marker, index){
									marker.setMap(null);
								});	
								feature.setMap(null);
								break;
							default:
								feature.markers.forEach(function(marker, index){
								/*if (type == 'line') {
									//2do remove parallel line, tcurve, curve and all reference including object that created
									if (marker.sline != '') {
										if (marker.sline.indexOf('¤') == 0) { 
										marker.sline = marker.sline.substring(1,marker.sline.length);
										}
										var arrLine = marker.sline.split('¤');
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
								}*/
									marker.setMap(null);
								});
								if (type == 'line') { 
									var route = feature.route;
									removeRoute(route);
								}
								feature.setMap(null);
							
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
			var ti2 = (document.getElementById('dpLTs_chkDifSlRatio1').checked) ? parseFloat($('#dpLTs_iToL2').val()) : ti1;
			var wi2 = (document.getElementById('dpLTs_chkDifSlRatio1').checked) ? parseFloat($('#dpLTs_iToW2').val()) : wi1;
			
			var wst = parseInt($('#dpLTs_stIdx').val());
			var wed = parseInt($('#dpLTs_edIdx').val());
			var wst2 = parseInt($('#dpLTs_stIdx2').val());
			var wed2 = parseInt($('#dpLTs_edIdx2').val());
			
			
			var te1 = parseFloat($('#dpLTs_eToL1').val());
			var we1 = parseFloat($('#dpLTs_eToW1').val());
			var te2 = (document.getElementById('dpLTs_chkDifSlRatio2').checked) ? parseFloat($('#dpLTs_eToL2').val()) : te1;
			var we2 = (document.getElementById('dpLTs_chkDifSlRatio2').checked) ? parseFloat($('#dpLTs_eToW2').val()) : we1;
			
			
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
			var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
			var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
			var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
			var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
			MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
			MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));		
				
			//alert((Math.round(google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(),MapToolbar.features["lineTab"][pid2].markers.getAt(wst2).getPosition())*100)/100) + ' <br /> ' + (Math.round(google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid1].markers.getAt(wed+2).getPosition(),MapToolbar.features["lineTab"][pid2].markers.getAt(wed2).getPosition())*100)/100) + ' <br /> ' + ioffsset + ' <br /> ' + offset);

			
			if (((Math.round(google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(),MapToolbar.features["lineTab"][pid2].markers.getAt(wst2).getPosition())*1000)/1000) <= Math.abs(offset)) && ((Math.round(google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features["lineTab"][pid1].markers.getAt(wed+2).getPosition(),MapToolbar.features["lineTab"][pid2].markers.getAt(wed2).getPosition())*1000)/1000) <= Math.abs(offset))) {		
				
				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2).lineX = pid1 + ':' + side + ':' + (Math.round(Math.abs(offset)*1000)/1000) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
				MapToolbar.features["lineTab"][pid2].markers.getAt(wed2).lineX = pid1 + ':' + side + ':' + (Math.round(Math.abs(offset)*1000)/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;	
			
				var pxc = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2).getPosition() , ti2, h1);
				var pxd = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wed2).getPosition(), -te2, h1);

				var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
				var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
				MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], (wst2 + 1));
				MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], (wst2 + 2));
								
				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
			
			} else {
				MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
				MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + (Math.round(Math.abs(offset)*1000)/1000) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + (Math.round(Math.abs(offset)*1000)/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
				var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
				var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
				var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
				var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
				MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
				MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
				MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;				
					
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
			
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}

			var formSide = ($('#form0_pos').val() == 'L')?  pid + ':L' : pid + ':R';			
			
			formMaker(pid,idx,platform_length,howtoForm,'form0',formSide);
								
			$('#dialogInsertPlatform').dialog('close');
		});
		
		$('#form1_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
		
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined')) {
				var pid = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var side = $('#form0_pos').val();				
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
				var formSide  =  pid + ':L' + '/' + pid2 + ':R';
								
				formMaker(pid,idx,platform_length,howtoForm,'form1',formSide);
				
				$('#dialogInsertPlatform').dialog('close');
			}
		});

		$('#form2_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
				var ti1 = parseFloat($('#form2_ti1').val());
				var wi1 = parseFloat($('#form2_wi1').val());
				var ti2 = parseFloat($('#form2_ti2').val());
				var wi2 = parseFloat($('#form2_wi2').val());
				
				var te1 = parseFloat($('#form2_tf1').val());
				var we1 = parseFloat($('#form2_wf1').val());
				var te2 = parseFloat($('#form2_tf2').val());
				var we2 = parseFloat($('#form2_wf2').val());

				var ti = (ti1 >= ti2) ? ti1 : ti2;
				var tf = (te1 >= te2) ? te1 : te2;
				
				var sL = ti + platform_length + tf;

				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide;
				
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
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var uidSt = MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								var uidEd = MapToolbar.features["lineTab"][pid1].markers.getAt(wed).uid;
								
								var pxa = (ti1 == 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti, h1) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = (te1 == 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -tf, h1) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var wst2 = formLineWidenAddAt(pid2,px0);
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + uidSt;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + uidEd;
				
								var pxc = (ti2 == 0) ? google.maps.geometry.spherical.computeOffset(px0, ti, h1) : google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = (te2 == 0) ? google.maps.geometry.spherical.computeOffset(px1, -tf, h1) : google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).uid;	
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);
								
								formSide = pid1 + ':' + pid2;

								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).kdata.form = stopS + '¤' + stopO;
								addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).getPosition());
														
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								var wst = idx;
								var wed = idx + 1;
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}

								var uidSt = MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								var uidEd = MapToolbar.features["lineTab"][pid1].markers.getAt(wed).uid;
								
								var pxa = (ti1 == 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti, h1) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = (te1 == 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -tf, h1) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								var wst2 = formLineWidenAddAt(pid2,px0);
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + uidSt;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + uidEd;
				
								var pxc = (ti2 == 0) ? google.maps.geometry.spherical.computeOffset(px0, ti, h1) :  google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = (te2 == 0) ? google.maps.geometry.spherical.computeOffset(px1, -tf, h1) :  google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).uid;	
								
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);
								
								formSide = pid1 + ':' + pid2;

								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).kdata.form = stopS + '¤' + stopO;
								addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).getPosition());

							}
						}
					}
				
				} else {
					alert($.lang.convert('sorry! unable to create platform on curve.'));
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}
		});

		$('#form3_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
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
				
				var ti = (ti3 >= ti4) ? ti3 : ti4;
				var tf = (te3 >= te4) ? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide;				
				
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
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(pst1i, offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(pst1i, offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 + side));
			
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
								
								formSide = pid1 + ':' + pid2;

								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).kdata.form = stopS + '¤' + stopO;
								addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).getPosition());
								
															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst3 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								var pst1i = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , (ti3-ti1), h1);								
								var pst1e = google.maps.geometry.spherical.computeOffset(pst3 , -(te3-te1), h1);
								
								MapToolbar.addPoint(pst3, MapToolbar.features["lineTab"][pid1], idx+1);
								MapToolbar.addPoint(pst1i, MapToolbar.features["lineTab"][pid1],idx+1);
								MapToolbar.addPoint(pst1e, MapToolbar.features["lineTab"][pid1],idx+2);
								//MapToolbar.addPoint(pst3, MapToolbar.features["lineTab"][pid1],idx+3);
								
								wst = idx + 1;
								wed = idx + 2;
								
								var pxa = google.maps.geometry.spherical.computeOffset(pst1i, ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(pst1e , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(pst1i , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(pst1i, offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 + side));
			
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

								formSide = pid1 + ':' + pid2;

								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).kdata.form = stopS + '¤' + stopO;
								addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).getPosition());
								
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
								
							}
						}
						
						//formCreateLine(pid1,pid2,side,h1,offset,wst,wst+3,wst2,wed2,ti1,ti2,ti3,ti4,te3,te4,wi3,wi4,we3,we4);
						if (document.getElementById('formcrackOp').checked) {
							var crack = $('#formcrackID option:selected').val();
							if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst-1).kdata.crack = crack; }
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + (ti3-ti1) + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst-1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + (wi3-wi1) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + (we3-we1) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;

						var hb3 = google.maps.geometry.spherical.computeHeading(px3_a,px3_b);
						var mb3 = wi3/ti3;
						var dt3 = Math.atan(mb3);
						var tc3 = (ti3-ti1) / Math.cos(dt3);
						var ta3 = (ti3-ti1) * mb3;
						var np3 = google.maps.geometry.spherical.computeOffset(px3_a, tc3, hb3);
						
						var hb4 = google.maps.geometry.spherical.computeHeading(px3_d,px3_c);
						var mb4 = we3/te3;
						var dt4 = Math.atan(mb4);
						var tc4 = (te3-te1) / Math.cos(dt4);
						var ta4 = (te3-te1) * mb4;
						var np4 = google.maps.geometry.spherical.computeOffset(px3_d, tc4, hb4);
	
						MapToolbar.addPoint(np3, newPoly, 1);
						MapToolbar.addPoint(np4, newPoly, 4);

						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + (Math.round(ta3*1000)/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;						
						newPoly.markers.getAt(4).lineX = pid1 + ':' + (-1*side) + ':' + (Math.round(ta4*1000)/1000) + ':' + (te3-te1) + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;						
							
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst - 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst - 1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst - 1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).setDraggable(false);
	
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + (ti4-ti2) + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst-1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4+we1)*1000))/1000) + ':' + (te4-te2) + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
						
						//marker on line 4
						var hb1 = google.maps.geometry.spherical.computeHeading(px4_a,px4_b);
						var hb2 = google.maps.geometry.spherical.computeHeading(px4_d,px4_c);
						var ma1 = wi4/ti4;
						var ma2 = we4/te4;
						var dt1 = Math.atan(ma1);
						var dt2 = Math.atan(ma2);
						var tc1 = (ti4-ti2) / Math.cos(dt1);
						var tc2 = (te4-te2) / Math.cos(dt2);
						var ta1 = (ti4-ti2) * ma1;
						var ta2 = (te4-te2) * ma2;
						var np1 = google.maps.geometry.spherical.computeOffset(px4_a, tc1, hb1);
						var np2 = google.maps.geometry.spherical.computeOffset(px4_d, tc2, hb2);
	
						//var wst_4i = formLineWidenAddAt(newPoly.id,px4_a);
						MapToolbar.addPoint(np1, newPoly, 1);
	
						//var wst_4f = formLineWidenAddAt(newPoly.id,px4_d);
						MapToolbar.addPoint(np2, newPoly, 4);

						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset)+Math.abs(ta1))*1000)/1000) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(4).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset)+Math.abs(ta2))*1000)/1000) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst - 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst - 1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst - 1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4f + 1).setDraggable(false);
	
						newPoly = null;	
	
					}
				
				} else {
					alert($.lang.convert('sorry! unable to create platform on curve.'));
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form4_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
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
				
				var ti = (ti1 >= ti2) ? ti1 : ti2;
				var tf = (te1 >= te2) ? te1 : te2;
				
				var sL = ti + platform_length + tf;

				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide;
				
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
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
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
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
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
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::'  + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::'  + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':'  + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
								
							}
						}
						
						var pid3,pid4;
						
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':0:' + ti3a + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + (Math.round((wi1/ti1) * ti3a * 1000)/1000) + '::';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + (wi1-wi3) + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + (we1-we3) + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(4).lineX = pid1 + ':' + side + ':' + (Math.round((we1/te1) * ti3a * 1000)/1000) + ':' + (te1-te3) + ':';
						newPoly.markers.getAt(5).lineX = pid1 + ':' + side + ':0::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;

						var wst_3i = formLineWidenAddAt(pid1,px3_a);
						//MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst_3i + 1);
	
						var wst_3f = formLineWidenAddAt(pid1,px3_d);
						//MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], wst_3f + 1);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).setDraggable(false);
						
						pid3 = newPoly.id;
	
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4a + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset)+(wi2/ti2) * ti4a) * 1000)/1000) + ':' + ti4 + ':';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset)+wi4+wi1)*1000)/1000) + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset)+we4+wi1)*1000)/1000) + ':' + te4 + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(4).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset)+(we2/te2) * ti4a) * 1000)/1000) + ':' + (te2-te4) + ':';
						newPoly.markers.getAt(5).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
	
						var wst_4i = formLineWidenAddAt(pid2,px4_a);
						//MapToolbar.addPoint(px4_a, MapToolbar.features["lineTab"][pid2], wst_4i + 1);
	
						var wst_4f = formLineWidenAddAt(pid2,px4_d);
						//MapToolbar.addPoint(px4_d, MapToolbar.features["lineTab"][pid2], wst_4f + 1);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4f + 1).setDraggable(false);
						
						pid4 = newPoly.id;
						
						formSide = pid3 + ':' + pid4;

						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).kdata.form = stopS + '¤' + stopO;
						addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).getPosition());
							
						newPoly = null;
						
					}
				
				} else {
					alert($.lang.convert('sorry! unable to create platform on curve.'));
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form5_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
				var ti1 = parseFloat($('#form5_ti1').val());
				var wi1 = parseFloat($('#form5_wi1').val());
				var ti2 = parseFloat($('#form5_ti2').val());
				var wi2 = parseFloat($('#form5_wi2').val());
				
				var te1 = parseFloat($('#form5_tf1').val());
				var we1 = parseFloat($('#form5_wf1').val());
				var te2 = parseFloat($('#form5_tf2').val());
				var we2 = parseFloat($('#form5_wf2').val());
			
				var ti = (ti1 >= ti2) ? ti1 : ti2;
				var tf = (te1 >= te2) ? te1 : te2;
				
				var sL = ti + platform_length + tf;
				
				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide ;
				
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
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
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
								
								formSide = pid1+ ':L' + '/' + pid2 + ':R';

								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).kdata.form = stopS + '¤' + stopO;
								addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).getPosition());

															
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+wi1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
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

								formSide = pid1 + ':L' + '/' + pid2 + ':R';

								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).kdata.form = stopS + '¤' + stopO;
								addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).getPosition());
								
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+wi1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
								
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':0:' + ti2 +  ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + wi1 + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + we1 + ':' + te2 + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':0:' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;

	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset)+wi1)*1000)/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset)+we1)*1000)/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).setDraggable(false);
	
						newPoly = null;
						
					}
				
				} else {
					alert($.lang.convert('sorry! unable to create platform on curve.'));
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form6_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
				var ti3 = parseFloat($('#form6_ti3').val());
				var wi3 = parseFloat($('#form6_wi3').val());
				var ti4 = parseFloat($('#form6_ti4').val());
				var wi4 = parseFloat($('#form6_wi4').val());
				
				var te3 = parseFloat($('#form6_tf3').val());
				var we3 = parseFloat($('#form6_wf3').val());
				var te4 = parseFloat($('#form6_tf4').val());
				var we4 = parseFloat($('#form6_wf4').val());				
				
				var ti = (ti3 >= ti4) ? ti3 : ti4;
				var tf = (te3 >= te4) ? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide;
				
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
						var px3_a;
						var px3_d;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));

								px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3, h1);
								px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -ti3, h1);	
						
								MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst+1);
								MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], wst+2);
						
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).setIcon(image);								
								
																															
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
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));

								px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3, h1);
								px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -ti3, h1);	
						
								MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst+1);
								MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], wst+2);
						
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).setIcon(image);								
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
								
							}
						}
						
						var pid3,pid4;
														
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d, -we3, h1+side);
								
						wst = idx;
						wed = idx + 3;
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
						MapToolbar.addPoint(px3_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition(), newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':' + te3 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).setDraggable(false);
						
						pid3 = newPoly.id;
	
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4)*1000))/1000) + ':' + te4 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
	
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						
						pid4 = newPoly.id;
						
						formSide = pid3+ ':L' + '/' + pid4 + ':R';

						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).kdata.form = stopS + '¤' + stopO;
						addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).getPosition());
	
						newPoly = null;	
						
					}
				
				} else {
					alert($.lang.convert('sorry! unable to create platform on curve.'));
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form7_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
				var ti1 = parseFloat($('#form7_ti1').val());
				var wi1 = parseFloat($('#form7_wi1').val());
				var ti2 = parseFloat($('#form7_ti2').val());
				var wi2 = parseFloat($('#form7_wi2').val());
				
				var te1 = parseFloat($('#form7_tf1').val());
				var we1 = parseFloat($('#form7_wf1').val());
				var te2 = parseFloat($('#form7_tf2').val());
				var we2 = parseFloat($('#form7_wf2').val());
			
				var ti = (ti1 >= ti2) ? ti1 : ti2;
				var tf = (te1 >= te2) ? te1 : te2;
				
				var sL = ti + platform_length + tf;
				
				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide;
				
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
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
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
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
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
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
								
							}
						}
						var pid3, pid4;
								
						var px3_b = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
						var px3_c = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition() , -te1, h1);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
						MapToolbar.addPoint(px3_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition(), newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':0:' + ti1 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + wi1 + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + we1 + ':' + te1 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':0::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;


						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).setDraggable(false);
						
						pid3 = newPoly.id;
	
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + (Math.abs(offset) + wi1) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + (Math.abs(offset) + we1) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).setDraggable(false);
						
						pid4 = newPoly.id;
						
						formSide = pid1 + ':'+ pid3 + '/' + pid4 + ':' + pid2;

						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).kdata.form = stopS + '¤' + stopO;
						addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).getPosition());

						newPoly = null;
						
					}
				
				} else {
					alert($.lang.convert('sorry! unable to create platform on curve.'));
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form8_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
				var ti3 = parseFloat($('#form8_ti3').val());
				var wi3 = parseFloat($('#form8_wi3').val());
				var ti4 = parseFloat($('#form8_ti4').val());
				var wi4 = parseFloat($('#form8_wi4').val());
				
				var te3 = parseFloat($('#form8_tf3').val());
				var we3 = parseFloat($('#form8_wf3').val());
				var te4 = parseFloat($('#form8_tf4').val());
				var we4 = parseFloat($('#form8_wf4').val());				
				
				var ti = (ti3 >= ti4) ? ti3 : ti4;
				var tf = (te3 >= te4) ? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide;
				
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
						var px3_a;
						var px3_d;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
								
								px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3, h1);
								px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -ti3, h1);	
						
								MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst+1);
								MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], wst+2);
						
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).setIcon(image);								
															
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
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
								
								px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3, h1);
								px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -ti3, h1);	
						
								MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst+1);
								MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], wst+2);
						
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).setIcon(image);								
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
								
							}
						}
						
						var pid3, pid4;
														
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d, -we3, h1+side);
						
						wst = idx;
						wed = idx + 3;
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
						MapToolbar.addPoint(px3_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition(), newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':' + te3 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setDraggable(false);
						
						pid3 = newPoly.id;
	
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4)*1000))/1000) + ':' + te4 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
			
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4f + 1).setDraggable(false);

						pid4 = newPoly.id;
						
						formSide = pid3 + ':'+ pid1 + '/' + pid2 + ':' + pid4;

						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).kdata.form = stopS + '¤' + stopO;
						addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition());
						
						newPoly = null;	
						
					}
				
				} else {
					alert($.lang.convert('sorry! unable to create platform on curve.'));
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form9_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
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
				
				var ti = (ti1 >= ti2) ? ti1 : ti2;
				var tf = (te1 >= te2) ? te1 : te2;
				
				var sL = ti + platform_length + tf;
				
				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide;
				
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
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
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
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
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
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
								
							}
						}
						
						var pid3, pid4;
					
						var ti3a = ti1 - ti3;
								
						var px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3a, h1);
						var px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition() , -ti3a, h1);
						var px3_a2 = google.maps.geometry.spherical.computeOffset(px3_a , ti3, h1);
						var px3_d2 = google.maps.geometry.spherical.computeOffset(px3_d , -te3, h1);	
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a2, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d2, -we3, h1+side);
						
						var nIdx1 = AddMarker2Polyline(pid1,px3_a);
						var nIdx2 = AddMarker2Polyline(pid1,px3_d);						
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_a, newPoly, 1);
						MapToolbar.addPoint(px3_b, newPoly, 2);
						MapToolbar.addPoint(px3_c, newPoly, 3);
						MapToolbar.addPoint(px3_d, newPoly, 4);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).getPosition(), newPoly, 5);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':0:' + ti3a + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + (Math.round((wi1/ti1) * ti3a * 1000)/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + (Math.round((wi1-wi3)*1000)/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + (Math.round((we1-we3)*1000)/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(4).lineX = pid1 + ':' + side + ':' + (Math.round((we1/te1) * ti3a * 1000)/1000) + ':' + (te1 - te3) + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
						newPoly.markers.getAt(5).lineX = pid1 + ':' + side + ':0::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).uid;

						var wst_3i = formLineWidenAddAt(pid1,px3_a);
	
						var wst_3f = formLineWidenAddAt(pid1,px3_d);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i + 1).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						
						pid3 = newPoly.id;
	
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4a + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset) + ((wi1/ti1) * ti3a)) * 1000)/1000) + ':' + ti4 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4+we1)*1000))/1000) + ':' + te4 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(4).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset) + ((we1/te1) * (te1-te3))) * 1000)/1000) + ':' + (te2-te4) + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
						newPoly.markers.getAt(5).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).uid;
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3i).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_3f + 1).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4f + 1).setDraggable(false);
						
						pid4 = newPoly.id;
						
						formSide = pid1 + ':'+ pid3 + '/' + pid4 + ':' + pid2;

						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).kdata.form = stopS + '¤' + stopO;
						addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).getPosition());						
	
						newPoly = null;

						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px3_a, newPoly, 0);
						MapToolbar.addPoint(px3_a2, newPoly, 1);
						MapToolbar.addPoint(px3_d2, newPoly, 2);
						MapToolbar.addPoint(px3_d, newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + (Math.round((wi1/ti1) * (ti1-ti3) * 1000)/1000) + ':' + ti3 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + wi1 + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + we1 + ':' + te3 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + (Math.round((we1/te1) * (te1-te3) * 1000)/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(nIdx1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(nIdx1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(nIdx1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(nIdx2).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(nIdx2).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(nIdx2).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}	
						
						newPoly = null;						
						
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px4_a, newPoly, 0);
						MapToolbar.addPoint(px4_a2, newPoly, 1);
						MapToolbar.addPoint(px4_d2, newPoly, 2);
						MapToolbar.addPoint(px4_d, newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset) + (wi2/ti2) * (ti2-ti4)) * 1000)/1000)  + ':' + ti4 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + (Math.abs(offset) + wi1) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + (Math.abs(offset) + we1) + ':' + te4 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' +  (Math.round((Math.abs(offset) + (we2/te2) * (te2-te4)) * 1000)/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(nIdx1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(nIdx1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(nIdx1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(nIdx2).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(nIdx2).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(nIdx2).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						newPoly = null;
					}
				
				} else {
					alert($.lang.convert('sorry! unable to create platform on curve.'));
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form10_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
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
				
				var ti = (ti3 >= ti4) ? ti3 : ti4;
				var tf = (te3 >= te4) ? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide;				
				
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
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(pst1i, offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(pst1i, offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 + side));
			
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
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								//var pst3 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								var pst1i = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , (ti3-ti1), h1);
								var pst1e = google.maps.geometry.spherical.computeOffset(pst , -(te3-te1), h1);
								MapToolbar.addPoint(pst1i, MapToolbar.features["lineTab"][pid1],idx+1);
								MapToolbar.addPoint(pst1e, MapToolbar.features["lineTab"][pid1],idx+2);
								//MapToolbar.addPoint(pst3, MapToolbar.features["lineTab"][pid1],idx+3);
								
								wst = idx + 1;
								wed = idx + 2;
								
								var pxa = google.maps.geometry.spherical.computeOffset(pst1i, ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(pst1e , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(pst1i , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(pst1i, offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(pst1e, offset, (h1 + side));
			
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
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
								
							}
						}
						
						var pid3,pid4;
						
						var ti3a = ti3 - ti1;
								
						var px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , -ti3a, h1);
						var px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition() , ti3a, h1);
						var px3_a2 = google.maps.geometry.spherical.computeOffset(px3_a , ti3, h1);
						var px3_d2 = google.maps.geometry.spherical.computeOffset(px3_d , -te3, h1);	
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a2, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d2, -we3, h1+side);
						
						var hb1 = google.maps.geometry.spherical.computeHeading(px3_a,px3_b);
						var hb2 = google.maps.geometry.spherical.computeHeading(px3_d,px3_c);
						var ma1 = wi3/ti3;
						var ma2 = we3/te3;
						var dt1 = Math.atan(ma1);
						var dt2 = Math.atan(ma2);
						var tc1 = (ti3-ti1) / Math.cos(dt1);
						var tc2 = (te3-te1) / Math.cos(dt2);
						var ta1 = (ti3-ti1) * ma1;
						var ta2 = (te3-te1) * ma2;
						var np1 = google.maps.geometry.spherical.computeOffset(px3_a, tc1, hb1);
						var np2 = google.maps.geometry.spherical.computeOffset(px3_d, tc2, hb2);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px3_a, newPoly, 0);
						MapToolbar.addPoint(np1, newPoly, 1);
						MapToolbar.addPoint(px3_b, newPoly, 2);
						MapToolbar.addPoint(px3_c, newPoly, 3);
						MapToolbar.addPoint(np2, newPoly, 4);
						MapToolbar.addPoint(px3_d, newPoly, 5);
						
					
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3a + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst-1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + ta1 + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + (Math.round((wi3-wi1)*1000)/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':' + (Math.round((we3-we1)*1000)/1000) + ':' + te1 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(4).lineX = pid1 + ':' + (-1*side) + ':' + ta2 + ':' + (te3 - te1) + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(5).lineX = pid1 + ':' + (-1*side) + ':0::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst-1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst-1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst-1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						
						if (document.getElementById('formcrackOp').checked) {
							var crack = $('#formcrackID option:selected').val();
							if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst-1).kdata.crack = crack; }
						}
						
						pid3 = newPoly.id;
	
						newPoly = null;
	
						var ti4a = ti4 - ti2;
	
						var px4_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition() , -ti4a, h1);
						var px4_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition() , ti4a, h1);
						var px4_a2 = google.maps.geometry.spherical.computeOffset(px4_a , ti4, h1);
						var px4_d2 = google.maps.geometry.spherical.computeOffset(px4_d , -te4, h1);	
						var px4_b = google.maps.geometry.spherical.computeOffset(px4_a2, wi4, h1+side);
						var px4_c = google.maps.geometry.spherical.computeOffset(px4_d2, -we4, h1-side);

						var hb3 = google.maps.geometry.spherical.computeHeading(px4_a,px4_b);
						var hb4 = google.maps.geometry.spherical.computeHeading(px4_d,px4_c);
						var ma3 = wi4/ti4;
						var ma4 = we4/te4;
						var dt3 = Math.atan(ma3);
						var dt4 = Math.atan(ma4);
						var tc3 = (ti4-ti2) / Math.cos(dt3);
						var tc4 = (te4-te2) / Math.cos(dt4);
						var ta3 = (ti4-ti2) * ma3;
						var ta4 = (te4-te2) * ma4;
						var np3 = google.maps.geometry.spherical.computeOffset(px4_a, tc3, hb3);
						var np4 = google.maps.geometry.spherical.computeOffset(px4_d, tc4, hb4);
						
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px4_a, newPoly, 0);
						MapToolbar.addPoint(np3, newPoly, 1);
						MapToolbar.addPoint(px4_b, newPoly, 2);
						MapToolbar.addPoint(px4_c, newPoly, 3);
						MapToolbar.addPoint(np4, newPoly, 4);
						MapToolbar.addPoint(px4_d, newPoly, 5);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4)*1000))/1000) + '::';
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4)*1000))/1000) + '::';
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + te4;
	
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4a + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst-1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + (Math.abs(offset)+ta3) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset)+wi1+wi4)*1000)/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset)+we1+we4)*1000)/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(4).lineX = pid1 + ':' + side + ':' + (Math.abs(offset)+ta4) + ':' + (te4 - te2) + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(5).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;

	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst-1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst-1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst-1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						

						pid4 = newPoly.id;
						
						newPoly = null;							
						
						formSide = pid3 + ':'+ pid1 + '/' + pid2 + ':' + pid4;

						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).kdata.form = stopS + '¤' + stopO;
						addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).getPosition());					
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_a2, newPoly, 1);
						MapToolbar.addPoint(px3_d2, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition(), newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':0:' + ti1 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + wi1 + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + we1 + ':' + te1 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':0::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}									
						
						newPoly = null;	
												
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px4_a2, newPoly, 1);
						MapToolbar.addPoint(px4_d2, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition(), newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset)+wi1)*1000)/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + (Math.round((Math.abs(offset)+wi1)*1000)/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						newPoly = null;						
						
					}
				
				} else {
					alert($.lang.convert('sorry! unable to create platform on curve.'));
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form11_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
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
				
				var ti = (ti3 >= ti4) ? ti3 : ti4;
				var tf = (te3 >= te4) ? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide;
				
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
						var px3_a;
						var px3_d;
					
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
								
								px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3, h1);
								px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -ti3, h1);	
						
								MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst+1);
								MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], wst+2);
						
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).setIcon(image);								
															
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
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
								
								px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3, h1);
								px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -ti3, h1);	
						
								MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst+1);
								MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], wst+2);
						
								var image = new google.maps.MarkerImage('images/form_icon.png',
									new google.maps.Size(6, 6),
									new google.maps.Point(0, 0),
									new google.maps.Point(3, 3));
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).setIcon(image);
								MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).setIcon(image);								
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
								
							}
						}
						
						var pid3,pid4,pid5,pid6;

						wst = idx;
						wed = idx + 3;
																			
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d, -we3, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
						MapToolbar.addPoint(px3_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition(), newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':' + te3 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wed).setDraggable(false);
						
						pid3 = newPoly.id;
	
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4)*1000))/1000) + ':' + te4 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
			
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						//MapToolbar.features["lineTab"][pid1].markers.getAt(wst_4i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wed).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						
						pid4 = newPoly.id;
	
						newPoly = null;	
											
						var ti5a = ti3 -ti5;
						var te5a = te3 -te5;
						
						var px5_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti5a, h1);
						var px5_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te5a, h1);	
						
						MapToolbar.addPoint(px5_a, MapToolbar.features["lineTab"][pid1], wst+1);
						MapToolbar.addPoint(px5_d, MapToolbar.features["lineTab"][pid1], wst+4);
						
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti5 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi5 + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we5 + ':' + te5 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
							
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).setDraggable(false);
						
						pid5 = newPoly.id;
	
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti6 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi6)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we6)*1000))/1000) + ':' + te6 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
	
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).setDraggable(false);
						
						pid6 = newPoly.id;
						
						formSide = pid3 + ':'+ pid5 + '/' + pid6 + ':' + pid4;

						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).kdata.form = stopS + '¤' + stopO;
						addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).getPosition());
						
	
						newPoly = null;							
						
					}
				
				} else {
					alert($.lang.convert('sorry! unable to create platform on curve.'));
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form12_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
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
				
				var ti = (ti1 >= ti2) ? ti1 : ti2;
				var tf = (te1 >= te2) ? te1 : te2;
				
				var sL = ti + platform_length + tf;
				
				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide;
				
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
						var pxa;
						var pxb;
						var pxc;
						var pxd;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
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
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti1 + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+ wi1)*1000))/1000) + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+ we1)*1000))/1000) + ':' + te1 + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
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
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti1 + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+ wi1)*1000))/1000) + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+ we1)*1000))/1000) + ':' + te1 + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
								
							}
						}

						var pid3, pid4;
								
						var px3_a0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3, h1);
						var px3_a = google.maps.geometry.spherical.computeOffset(px3_a0, wi3, h1-side);
						var px3_b0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition() , -te3, h1);
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_b0, -we3, h1+side);
						
						var px4_a0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition() , ti4, h1);
						var px4_a = google.maps.geometry.spherical.computeOffset(px4_a0, wi4, h1+side);
						var px4_b0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition() , -te4, h1);
						var px4_b = google.maps.geometry.spherical.computeOffset(px4_b0, -we4, h1-side);
						
						var px4_a1 = google.maps.geometry.spherical.computeOffset(px4_a, ti2-ti4, h1);
						var px4_b1 = google.maps.geometry.spherical.computeOffset(px4_b, te4-te2, h1);						
						
						MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], wst + 1);					
						MapToolbar.addPoint(px3_b, MapToolbar.features["lineTab"][pid1], wst + 4);
						

						var px3_a1 = google.maps.geometry.spherical.computeOffset(px3_a, ti1-ti3, h1);
						var px3_b1 = google.maps.geometry.spherical.computeOffset(px3_b, te3-te1, h1);

						
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px3_a, newPoly, 0);
						MapToolbar.addPoint(px3_a1, newPoly, 1);
						MapToolbar.addPoint(px3_b1, newPoly, 2);
						MapToolbar.addPoint(px3_b, newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':0:' + (ti1-ti3) + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + (Math.round((wi1-wi3)*1000)/1000) + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + (Math.round((we1-we3)*1000)/1000) + ':' + (te1-te3) + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':0::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;

	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).setDraggable(false);
						
						pid3 = newPoly.id;
	
						newPoly = null;
						
						//var ti4a = ti2 - ti4;
	
						//var px4_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), ti4, h1);
						//var px4_b = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition() , -te4, h1);
							
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px4_a, newPoly, 0);
						MapToolbar.addPoint(px4_a1, newPoly, 1);
						MapToolbar.addPoint(px4_b1, newPoly, 2);
						MapToolbar.addPoint(px4_b, newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + ((Math.round(Math.abs(offset)+wi3+wi4)*1000)/1000) + ':' + (ti2-ti4) + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round(Math.abs(offset)+wi1+wi4)*1000)/1000) + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round(Math.abs(offset)+we1+wi4)*1000)/1000) + ':' + (te2-te4) + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + ((Math.round(Math.abs(offset)+we3+we4)*1000)/1000) + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
	

		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 4).setDraggable(false);
						
						pid4 = newPoly.id;
						
						formSide = pid1 + ':'+ pid3 + '/' + pid4 + ':' + pid2;

						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).kdata.form = stopS + '¤' + stopO;
						addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).getPosition());
						
						newPoly = null;

						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(pxa, newPoly, 1);
						MapToolbar.addPoint(pxb, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 5).getPosition(), newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':0:' + ti1 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + we1 + ':' + te1 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + wi1 + ':' + ti1 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':0::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).uid;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 5).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 5).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 5).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 5).setDraggable(false);
						
						newPoly = null;
						
						
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(pxc, newPoly, 1);
						MapToolbar.addPoint(pxd, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition(), newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round(Math.abs(offset)+wi1)*1000)/1000) + '::' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round(Math.abs(offset)+we1)*1000)/1000) + ':' + ti2 + ':' +  MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).uid;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 5).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 5).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 5).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 5).setDraggable(false);
						
						newPoly = null;
						
					}
				
				} else {
					alert($.lang.convert('sorry! unable to create platform on curve.'));
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form13_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());

				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
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
				
				var ti = (ti3 >= ti4) ? ti3 : ti4;
				var tf = (te3 >= te4) ? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide;
				
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
						
						var px3_a;
						var px3_d;
						
						if (howtoForm < 0 ) {
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1) != 'undefined') {
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx-1).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , -sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx));
								
								wst = idx;
								wed = idx + 1;
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
																							
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+ wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+ we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
							
							}
						
						} else {
					
							if (typeof MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1) != 'undefined') {
							
								h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition(),MapToolbar.features["lineTab"][pid1].markers.getAt(idx+1).getPosition());	
								var pst = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(idx).getPosition() , sL, h1);
								MapToolbar.addPoint(pst, MapToolbar.features["lineTab"][pid1], (idx+1));
								
								wst = idx;
								wed = idx + 1;
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var pxa = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti1, h1);
								var pxb = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te1, h1);
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
			
								var pxa2 = google.maps.geometry.spherical.computeOffset(pxa, wi1, h1-side);
								var pxb2 = google.maps.geometry.spherical.computeOffset(pxb, -we1, h1+side);
			
								MapToolbar.addPoint(pxa2, MapToolbar.features["lineTab"][pid1], (wst + 1));
								MapToolbar.addPoint(pxb2, MapToolbar.features["lineTab"][pid1], (wst + 2));
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
				
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
				
								var pxc = google.maps.geometry.spherical.computeOffset(px0, ti2, h1);
								var pxd = google.maps.geometry.spherical.computeOffset(px1, -te2, h1);
			
								var pxc2 = google.maps.geometry.spherical.computeOffset(pxc, wi2, h1+side);
								var pxd2 = google.maps.geometry.spherical.computeOffset(pxd, -we2, h1-side);
				
								MapToolbar.addPoint(pxc2, MapToolbar.features["lineTab"][pid2], wst2 + 2);
								MapToolbar.addPoint(pxd2, MapToolbar.features["lineTab"][pid2], wst2 + 3);		

								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi2+ wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
								MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we2+ we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;	
								
							}
						}	
						
						var pid3,pid4;

						var ti3a = ti3 - ti1;
						var te3a = te3 - te1;	
						var wi3a = wi3 - wi1;
						var we3a = we3 - we1;
						
						var px3_a0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).getPosition(), ti3a, h1);
						var px3_b0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).getPosition(), -te3a, h1);
						
						MapToolbar.addPoint(px3_a0, MapToolbar.features["lineTab"][pid1], (wst + 2));
						MapToolbar.addPoint(px3_b0, MapToolbar.features["lineTab"][pid1], (wst + 3));
						
						var px3_a = google.maps.geometry.spherical.computeOffset(px3_a0, wi3a, h1-side);
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_b0, -we3a, h1+side);

						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_a, newPoly, 1);
						MapToolbar.addPoint(px3_b, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).getPosition(), newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3a + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + ((Math.round((wi3 - wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + ((Math.round((we3 - we1)*1000))/1000) + ':' + te3a + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).setDraggable(false);
						
						pid3 = newPoly.id;
	
						newPoly = null;
						
						var ti4a = ti4 - ti2;
						var te4a = te4 - te2;
						var wi4a = wi4 - wi2;
						var we4a = we4 - we2;
						var px4_a0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition(), ti4a, h1);
						var px4_b0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).getPosition(), -te4a, h1);
						var px4_a = google.maps.geometry.spherical.computeOffset(px4_a0, wi4a, h1+side);
						var px4_b = google.maps.geometry.spherical.computeOffset(px4_b0, -we4a, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px4_a, newPoly, 1);
						MapToolbar.addPoint(px4_b, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+3).getPosition(), newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset) + wi1 + wi2)*1000))/1000) + ':' + ti4a + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset) + wi1 + wi4)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset) + we1 + wi4)*1000))/1000) + ':' + te4a + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset) + we1 + we2)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
	
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).setDraggable(false);
						
						pid4 = newPoly.id;
												
						newPoly = null;
						
						//pid5
						
						var px5_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), ti1, h1);
						var px5_b = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).getPosition(), -te1, h1);
						
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px5_a, newPoly, 1);
						MapToolbar.addPoint(px5_b, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).getPosition(), newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':0:' + ti1 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + wi1 + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + we1 + ':' + te1 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':0::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).uid;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).setDraggable(false);
	
						newPoly = null;
						
						//pid6
						var px6_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), ti2, h1);
						var px6_b = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition(), -te2, h1);
						
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px6_a, newPoly, 1);
						MapToolbar.addPoint(px6_b, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+4).getPosition(), newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset) + wi1)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset) + we1)*1000))/1000) + ':' + te2 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).uid;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+5).setDraggable(false);
						
						newPoly = null;
						
						formSide = pid3 + ':'+ pid1 + '/' + pid2 + ':' + pid4;
						
						var image = new google.maps.MarkerImage('images/form_icon.png',
								new google.maps.Size(6, 6),
								new google.maps.Point(0, 0),
								new google.maps.Point(3, 3));
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).setIcon(image);						

						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).kdata.form = stopS + '¤' + stopO;
						addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).getPosition());
						
					}
				
				} else {
					alert($.lang.convert('sorry! unable to create platform on curve.'));
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}

		});

		$('#form14_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined') && (typeof $('#dInsForm_pid2').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = $('#dInsForm_pid2').val();
				var idx = parseInt($('#dInsForm_idx').val());
				var platform_length = parseInt($('#platform_length').val());
				var howtoForm = parseInt($('#howtocreateform').val());

				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
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
				
				var ti = (ti3 >= ti4) ? ti3 : ti4;
				var tf = (te3 >= te4) ? te3 : te4;
				
				var sL = ti + platform_length + tf;
				
				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide;
				
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
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
															
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
								if (document.getElementById('formcrackOp').checked) {
									var crack = $('#formcrackID option:selected').val();
									if (crack != '- select -') { MapToolbar.features["lineTab"][pid1].markers.getAt(wst).kdata.crack = crack; }
								}
								
								var px0 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 - side)) : google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , offset, (h1 + side));
								var px1 = (offset < 0) ? google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 - side)): google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , offset, (h1 + side));
								
								wst2 = formLineWidenAddAt(pid2,px0);
								
								MapToolbar.addPoint(px0, MapToolbar.features["lineTab"][pid2], wst2+1);
								MapToolbar.addPoint(px1, MapToolbar.features["lineTab"][pid2], wst2+2);
								
							}
						}
						
						var pid3, pid4, pid5, pid6;
						
						var px3_a = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti3, h1);
						var px3_d = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wed).getPosition() , -te3, h1);	
						var px3_b = google.maps.geometry.spherical.computeOffset(px3_a, wi3, h1-side);
						var px3_c = google.maps.geometry.spherical.computeOffset(px3_d, -we3, h1+side);

						MapToolbar.addPoint(px3_a, MapToolbar.features["lineTab"][pid1], (wst + 1));
						MapToolbar.addPoint(px3_d, MapToolbar.features["lineTab"][pid1], (wst + 2));		

						var image = new google.maps.MarkerImage('images/form_icon.png',
							new google.maps.Size(6, 6),
							new google.maps.Point(0, 0),
							new google.maps.Point(3, 3));
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 1).setIcon(image);
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).setIcon(image);							
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition(), newPoly, 0);
						MapToolbar.addPoint(px3_b, newPoly, 1);
						MapToolbar.addPoint(px3_c, newPoly, 2);
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition(), newPoly, 3);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + (-1*side) + ':' + we3 + ':' + te3 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + (-1*side) + ':0::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst).setDraggable(false);
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).setDraggable(false);
						
						pid3 = newPoly.id;
						
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
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + ':' + ti4 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi4)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(2).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we4)*1000))/1000) + ':' + te4 + ':' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+2).uid;
						newPoly.markers.getAt(3).lineX = pid1 + ':' + side + ':' + Math.abs(offset) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).uid;
	
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						
						pid4 = newPoly.id;
						
						newPoly = null;	
						
						var px5_a0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst).getPosition() , ti5, h1);
						var px5_b0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid1].markers.getAt(wst+3).getPosition() , -te5, h1);	
	
						var px5_a = google.maps.geometry.spherical.computeOffset(px5_a0, wi5, h1-side);
						var px5_b = google.maps.geometry.spherical.computeOffset(px5_b0, -we5, h1+side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px5_a, newPoly, 0);
						MapToolbar.addPoint(px5_b, newPoly, 1);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						
						var wst_5i = formLineWidenAddAt(pid1,px5_a);
						MapToolbar.addPoint(px5_a0, MapToolbar.features["lineTab"][pid1], wst_5i + 1);
	
						var wst_5f = formLineWidenAddAt(pid1,px5_b);
						MapToolbar.addPoint(px5_b0, MapToolbar.features["lineTab"][pid1], wst_5f + 1);
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + (-1*side) + ':' + wi5 + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i + 1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + we5 + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).uid;
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i + 1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i + 1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i + 1).setDraggable(false);
						
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).setDraggable(false);
						
						pid5 = newPoly.id;
	
						newPoly = null;
						
						var px6_a0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+1).getPosition() , ti6, h1);
						var px6_b0 = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid2].markers.getAt(wst2+2).getPosition() , -te6, h1);
						var px6_a = google.maps.geometry.spherical.computeOffset(px6_a0, wi6, h1+side);
						var px6_b = google.maps.geometry.spherical.computeOffset(px6_b0, -we6, h1-side);
	
						MapToolbar.initFeature('line');
						MapToolbar.stopEditing();
						MapToolbar.addPoint(px6_a, newPoly, 0);
						MapToolbar.addPoint(px6_b, newPoly, 1);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid1].route != '') ? MapToolbar.features["lineTab"][pid1].route : '';
						newPoly.lineX = pid1;
						
						newPoly.markers.getAt(0).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+wi6)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+1).uid;
						newPoly.markers.getAt(1).lineX = pid1 + ':' + side + ':' + ((Math.round((Math.abs(offset)+we6)*1000))/1000) + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(wst+4).uid;
	
						var wst_6i = formLineWidenAddAt(pid2,px6_a);
	
						var wst_6f = formLineWidenAddAt(pid2,px6_b);
		
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i+1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i+1).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i+1).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5i + 1).setDraggable(false);
	
						if (MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).sline == '') {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).sline = newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						} else {
							MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).sline += '¤' + newPoly.id + ':1:' + (newPoly.markers.length-1) + ':' + newPoly.markers.getAt(newPoly.markers.length-1).uid;
						}						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst_5f + 1).setDraggable(false);
						
						pid6 = newPoly.id;
						
						formSide = pid3 + ':'+ pid5 + '/' + pid6 + ':' + pid4;
						
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
						MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 3).kdata.form = stopS + '¤' + stopO;
						addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(wst + 2).getPosition());
	
						newPoly = null;							
						
					}
				
				} else {
					alert($.lang.convert('sorry! unable to create platform on curve.'));
				}
				
				$('#dialogInsertPlatform').dialog('close');
			}
		});

		$('#form15_Insert').click(function() {
			if (cekStaID($('#dInsForm_StaID').val())) {
				alert($.lang.convert('Station ID already exists.'));
				return false;
			}
			if ((typeof $('#dInsForm_pid').val() != 'undefined') && (typeof $('#dInsForm_idx').val() != 'undefined')) {
				var pid1 = $('#dInsForm_pid').val();
				var pid2 = ($('#dInsForm_pid2').val() != '') ? $('#dInsForm_pid2').val() : '';
				var idxSt = parseInt($('#form15_st').val());
				var idxEd = parseInt($('#form15_ed').val());
				
				var formstr = ($('#dInsForm_BVEStr').val() != '- select -')? $('#dInsForm_BVEStr').val() : '';
				var staName = $('#dInsForm_StaName').val();
				var staID = $('#dInsForm_StaID').val();
				var stopD = $('#dInsForm_StopDuration').val();
				var stopS = (document.getElementById('dInsForm_StopSign').checked)? 1 : 0;
				var fcar = $('#dInsForm_Cars').val();
				var stopO = $('#dInsForm_StopOffset').val();
				var stopT = (document.getElementById('dInsForm_TrainStop').checked)? 1 : 0;
			
				var formSide; 
				
				if (typeof MapToolbar.features["lineTab"][pid2] == 'undefined') {
					alert($.lang.convert('invalid 2nd line! please choose a valid parallel line.'));
					return;
				}
				
				if (MapToolbar.features["lineTab"][pid2].lineX != pid1) {
					alert($.lang.convert('invalid 2nd line! the 2nd line is not parallel with main line.'));
					return;
				}				
				
				if (pid2 != '') {
					var formSide  =  pid1 + ':L' + '/' + pid2 + ':R';
				} else {
					formSide = ($('#form15_pos').val() == 'L')?  pid1 + ':L' : pid1 + ':R';
				}
				
				var image = new google.maps.MarkerImage('images/form_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
				MapToolbar.features["lineTab"][pid1].markers.getAt(idxSt).setIcon(image); // end
				MapToolbar.features["lineTab"][pid1].markers.getAt(idxEd).setIcon(image); // st
				
				MapToolbar.features["lineTab"][pid1].markers.getAt(idxSt).kdata.form = formstr + '¤' + staName + '¤' + staID + '¤' + stopD + '¤' + stopT + '¤' + fcar + '¤' + formSide + '¤' + platform_length;
				MapToolbar.features["lineTab"][pid1].markers.getAt(idxEd).kdata.form = stopS + '¤' + stopO;
				addStation (staName,staID,MapToolbar.features["lineTab"][pid1].markers.getAt(idxSt).getPosition());
				
				
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
						
						var plines = MapToolbar.features["lineTab"][pid].markers.getAt(oi).sline.split('¤');
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
				var uidSt = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).uid;
				switch (true) {
					case (document.getElementById('swtype12-21').checked):
						var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).getPosition());
						
						var odml = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), swL, h1); 
						MapToolbar.addPoint(odml, MapToolbar.features["lineTab"][pid], mIdx+1);
						MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).setDraggable(false);
						
						var uidEd = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).uid;
										
						MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing();	
						
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), newPoly, 0); //1st point on track 1 to turnout
						var platLng = google.maps.geometry.spherical.computeOffset(odml, Math.abs(offset), h1 +  side);
						MapToolbar.addPoint(platLng, newPoly, 1);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid].route != '') ? MapToolbar.features["lineTab"][pid].route : '';
						newPoly.lineX = pid;
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline = newPoly.id + ':1:1:' + newPoly.markers.getAt(1).uid;
						} else {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline += '¤' + newPoly.id + ':1:1:' + newPoly.markers.getAt(1).uid;
						}	
						
						newPoly.markers.getAt(0).lineX = pid + ':' + side + ':0:' + swL + ':' + uidSt;
						newPoly.markers.getAt(1).lineX = pid + ':' + side + ':' + Math.abs(offset) + '::' + uidEd;					
						
						newPoly = null;

						MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing();	

						platLng = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), Math.abs(offset), h1 +  side);
						MapToolbar.addPoint(platLng, newPoly, 0);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid].route != '') ? MapToolbar.features["lineTab"][pid].route : '';
						newPoly.lineX = pid;
						odml = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), swL, h1); 	 					
						MapToolbar.addPoint(odml, newPoly, 1); //1st point on track 2 to turnout
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline = newPoly.id + ':1:1:' + newPoly.markers.getAt(1).uid;
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline += '¤' + newPoly.id + ':1:1:' + newPoly.markers.getAt(1).uid;
						}	
						
						newPoly.markers.getAt(0).lineX = pid + ':' + side + ':' + Math.abs(offset) + ':' + swL + ':' + uidSt;	
						newPoly.markers.getAt(1).lineX = pid + ':' + side + ':0::' + uidEd;
						
						
						newPoly = null;		

						break;
					case (document.getElementById('swtype12').checked):
						var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).getPosition());
						
						var odml = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), swL, h1); 
						MapToolbar.addPoint(odml, MapToolbar.features["lineTab"][pid], mIdx+1);
						
						var uidEd = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).uid;
						
						MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing();	
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), newPoly, 0); //1st point on track 1 to turnout
						var platLng = google.maps.geometry.spherical.computeOffset(odml, Math.abs(offset), h1 +  side);
						MapToolbar.addPoint(platLng, newPoly, 1);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid].route != '') ? MapToolbar.features["lineTab"][pid].route : '';
						newPoly.lineX = pid;
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline = newPoly.id + ':1:1:' + newPoly.markers.getAt(1).uid;
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline += '¤' + newPoly.id + ':1:1:' + newPoly.markers.getAt(1).uid;
						}	
						
						newPoly.markers.getAt(0).lineX = pid + ':' + side + ':0:' + swL + ':' + uidSt;
						newPoly.markers.getAt(1).lineX = pid + ':' + side + ':' + Math.abs(offset) + '::' + uidEd;
						
						newPoly = null;
						break;
						
					case (document.getElementById('swtype21').checked):
						var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(),MapToolbar.features["lineTab"][pid].markers.getAt(mIdx-1).getPosition());

						var odml = google.maps.geometry.spherical.computeOffset(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), swL, h1); 
						MapToolbar.addPoint(odml, MapToolbar.features["lineTab"][pid], mIdx+1);
						
						var uidEd = MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).uid;
						
						MapToolbar.initFeature('line');
	 					MapToolbar.stopEditing();	
						var platLng = google.maps.geometry.spherical.computeOffset(odml, Math.abs(offset), h1 +  side);
						MapToolbar.addPoint(platLng, newPoly, 0);
						
						newPoly.route = (MapToolbar.features["lineTab"][pid].route != '') ? MapToolbar.features["lineTab"][pid].route : '';
	 					newPoly.lineX = pid;
						MapToolbar.addPoint(MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).getPosition(), newPoly, 1); //1st point on track 2 to turnout
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline = newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx).sline += '¤' + newPoly.id + ':0:0:' + newPoly.markers.getAt(0).uid;
						}
						
						if (MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline == '') {
							MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline = newPoly.id + ':1:1:' + newPoly.markers.getAt(1).uid;
						} else {
								MapToolbar.features["lineTab"][pid].markers.getAt(mIdx+1).sline += '¤' + newPoly.id + ':1:1:' + newPoly.markers.getAt(1).uid;
						}	
						
						newPoly.markers.getAt(0).lineX = pid + ':' + side + ':' + Math.abs(offset) + ':' + swL + ':' + uidSt;	
						newPoly.markers.getAt(1).lineX = pid + ':' + side + ':0::' + uidEd;					
						
						
						newPoly = null;						
						break;
					default:
						alert($.lang.convert('please select either start point or end point, tq'));
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
				var tab = pid.split('_')[0]+ 'Tab';
				
				if (typeof MapToolbar.features[tab][pid].markers.getAt(mIdx) != 'undefined') {
					var start = null; 
					switch (true) {
						case (document.getElementById('dInsFO_start').checked):
							start = true;
							break;
						case (document.getElementById('dInsFO_end').checked):
							start = false;
							break;
						default:
							alert($.lang.convert('please select either start point or end point, tq'));
							return false;
					}
					
					var strType = (start) ? 0 : 1;
					var theight = (start) ? parseFloat($('#dInsFO_Lm').val()) : parseFloat($('#dInsFO_Lm2').val());
					var pitch =(start) ? parseInt($('#dInsFO_P1').val()) : parseInt($('#dInsFO_P2').val());
					var slopelength = (pitch !== 0 && typeof theight == 'number') ? Math.round(1000 * (theight / pitch)) : 0;

					//update flyover data
					MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.flyover = $('#dInsFO_Fo').val() + ':' + strType;
					
					
					if (start) {
						if (slopelength !== 0) {
							var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features[tab][pid].markers.getAt(mIdx).getPosition(),MapToolbar.features[tab][pid].markers.getAt(mIdx+1).getPosition());
							var x1p = google.maps.geometry.spherical.computeOffset(MapToolbar.features[tab][pid].markers.getAt(mIdx).getPosition(), Math.abs(slopelength), h1);
							MapToolbar.addPoint(x1p, MapToolbar.features[tab][pid], mIdx+1);		
							if ($('#dInsFO_Lm').val() !='') { MapToolbar.features[tab][pid].markers.getAt(mIdx+1).bdata.height = theight; }
							if ($('#dInsFO_P1').val() !='') { 
								MapToolbar.features[tab][pid].markers.getAt(mIdx).bdata.pitch = pitch;
								MapToolbar.features[tab][pid].markers.getAt(mIdx+1).bdata.pitch = 0;
							}
						} else {
							MapToolbar.features[tab][pid].markers.getAt(mIdx).bdata.height = theight;						
						}
						var image = new google.maps.MarkerImage('images/flyover_icon.png',
							new google.maps.Size(6, 6),
							new google.maps.Point(0, 0),
							new google.maps.Point(3, 3));
						MapToolbar.features[tab][pid].markers.getAt(mIdx).setIcon(image); 
					} else {
						var image = new google.maps.MarkerImage('images/flyover_icon.png',
							new google.maps.Size(6, 6),
							new google.maps.Point(0, 0),
							new google.maps.Point(3, 3));					
						if (slopelength !== 0) {
							var h1 = google.maps.geometry.spherical.computeHeading(MapToolbar.features[tab][pid].markers.getAt(mIdx-1).getPosition(),MapToolbar.features[tab][pid].markers.getAt(mIdx).getPosition());
							var x1p = google.maps.geometry.spherical.computeOffset(MapToolbar.features[tab][pid].markers.getAt(mIdx).getPosition(), -1 * Math.abs(slopelength), h1);
							MapToolbar.addPoint(x1p, MapToolbar.features[tab][pid], mIdx);
							if ($('#dInsFO_Lm2').val() != '') {
								MapToolbar.features[tab][pid].markers.getAt(mIdx).bdata.height = theight;
								MapToolbar.features[tab][pid].markers.getAt(mIdx+1).bdata.height = 1;							
							}
							if ($('#dInsFO_P2').val() != '') {
								MapToolbar.features[tab][pid].markers.getAt(mIdx).bdata.pitch = pitch;
								MapToolbar.features[tab][pid].markers.getAt(mIdx+1).bdata.pitch = 0;							
							}
							MapToolbar.features[tab][pid].markers.getAt(mIdx+1).setIcon(image); 
						} else {
							MapToolbar.features[tab][pid].markers.getAt(mIdx).bdata.height = theight;
							MapToolbar.features[tab][pid].markers.getAt(mIdx).setIcon(image); 
						}						
					}					
					$('#dialogInsertFlyover').dialog('close');					

				} else {
					alert($.lang.convert('marker index not defined'));				
				}
			}			
				
		});

		$('#dInsFO_KO').click(function() {
			$('#dialogInsertFlyover').dialog('close');
		});
		
		$('#dInsFO_Fo').change(function() {
			if (document.getElementById('dInsFO_Fo').value != '') {
				var src = getObjectImage('flyover',$('#dInsFO_Fo').val());
				document.getElementById('dInsFO_foimg').src='images/' + src;
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
				var tab = pid.split('_')[0]+ 'Tab';
				
				if (typeof MapToolbar.features[tab][pid].markers.getAt(mIdx) != 'undefined') {
					var start = null; 
					switch (true) {
						case (document.getElementById('dInsTun_tunStart').checked):
							start = true;
							break;
						case (document.getElementById('dInsTun_TunEnd').checked):
							start = false;
							break;
						default:
							alert($.lang.convert('please select either start point or end point, tq'));
							return false;
					}
					
					var strType = (start) ? 0: 1;
					
					MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.tunnel = $('#dInsTun_tun').val() + ':' + strType;
					
					var image = new google.maps.MarkerImage('images/tunnel_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features[tab][pid].markers.getAt(mIdx).setIcon(image); 	
			
					$('#dialogInsertTunnel').dialog('close');	
			
				} else {
					alert($.lang.convert('marker index not defined'));				
				}				
			//}
		});

		$('#dInsTun_KO').click(function() {
			$('#dialogInsertTunnel').dialog('close');
		});
		
		$('#dInsTun_tun').change(function() {
			if (document.getElementById('dInsTun_tun').value != '') {
				var src = getObjectImage('tunnel',$('#dInsTun_tun').val());
				document.getElementById('dInsTun_tunImg').src='images/' + src;
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
						
						MapToolbar.features["lineTab"][pid2].markers.getAt(mi1L2).lineX = pid1 + ':' + side + ':' + Xcc2a + '::' +  + MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).uid;
						
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

						MapToolbar.features["lineTab"][pid2].markers.getAt(mi2L2).lineX = pid1 + ':' + side + ':' + Xcc2a + '::' + MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).uid;
						
						
						// data format sline = '(side line 1):(0=start,>0 end):index,(side line 1):(0=start,>0 end):index,,,,....';
						if (addAtIndex2 > addAtIndex1) {
							if (MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).sline == '') {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).sline = pid2 + ':0:' + mi1L2 + ':' + MapToolbar.features["lineTab"][pid2].markers.getAt(mi1L2).uid;
							} else {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).sline += '¤' + pid2 + ':0:' + mi1L2 + ':' + MapToolbar.features["lineTab"][pid2].markers.getAt(mi1L2).uid;
							}							

							if (MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).sline == '') {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).sline = pid2 + ':1:' + mi2L2 + ':' + MapToolbar.features["lineTab"][pid2].markers.getAt(mi2L2).uid;
							} else {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).sline += '¤' + pid2 + ':1:' + mi2L2 + ':' + MapToolbar.features["lineTab"][pid2].markers.getAt(mi2L2).uid;
							}
						} else {
							if (MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).sline == '') {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).sline = pid2 + ':0:' + mi2L2 + ':' + MapToolbar.features["lineTab"][pid2].markers.getAt(mi2L2).uid;
							} else {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).sline += '¤' + pid2 + ':0:' + mi2L2 + ':' + MapToolbar.features["lineTab"][pid2].markers.getAt(mi2L2).uid;
							}							

							if (MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).sline == '') {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).sline = pid2 + ':1:' + mi1L2 + ':' + MapToolbar.features["lineTab"][pid2].markers.getAt(mi1L2).uid;
							} else {
								MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).sline += '¤' + pid2 + ':1:' + mi1L2 + ':' + MapToolbar.features["lineTab"][pid2].markers.getAt(mi1L2).uid;
							}							
						}
						
						MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex1).setDraggable(false);
						MapToolbar.features["lineTab"][pid1].markers.getAt(addAtIndex2).setDraggable(false);		
						MapToolbar.features["lineTab"][pid2].markers.getAt(mi1L2).setDraggable(false);
						MapToolbar.features["lineTab"][pid2].markers.getAt(mi2L2).setDraggable(false);							
						 
						if (MapToolbar.features['lineTab'][pid2].lineX != '') {
							MapToolbar.features["lineTab"][pid2].lineX += '¤' + pid1;
						} else {
							MapToolbar.features["lineTab"][pid2].lineX = pid1;
						}
						
						$('#dialogLinkLines').dialog('close');
					} else {
						alert($.lang.convert('Please state each line indexes'));
					}
				} else {
					alert($.lang.convert('Either lines is not valid.'));
				}
			} else {
				alert($.lang.convert('Please state each line.'));
			}
		});

		$('#dLinkLine_KO').click(function() {
			$('#dialogLinkLines').dialog('close');
		});	

		$('#op_Update').click(function() {
			//2do
			if ($('#op_DevID').val() != '') {
				$.cookie('developerID', $('#op_DevID').val(), { expires: 365 });
				devID = $('#op_DevID').val();
			} else {
				$.cookie('developerID', "GB Maps", { expires: 365 });
				devID = "GB Maps";
			}
			if ($('#op_DGauge').val() != '') {
				$.cookie('defaulGauge', $('#op_DGauge').val(), { expires: 365 });
				defaultGauge = parseInt($('#op_DGauge').val());
			} else {
				$.cookie('defaulGauge', "1067", { expires: 365 });
				defaultGauge = 1067;
			}
			if ($('#op_Cant').val() != '') {
				$.cookie('defaulCant', $('#op_Cant').val(), { expires: 365 });
				defaultCant = parseInt($('#op_Cant').val());
			} else {
				$.cookie('defaulCant', "105", { expires: 365 });
				defaultCant = 105;
			}

			if ($('#op_Offset').val() != '') {
				$.cookie('defaulOffset', $('#op_Offset').val(), { expires: 365 });
				defaulOffset = parseFloat($('#op_Offset').val());
			} else {
				$.cookie('defaulOffset', "3.8", { expires: 365 });
				defaulOffset = 3.8;
			}

			var gbdata = $('#op_gbmapdata option:selected').text();
			if (gbdata.indexOf('.js') > -1) {
				$.cookie('gbmapdata', gbdata , { expires: 365 });
				gbmapdata = gbdata;
			} else {
				$.cookie('gbmapdata', "", { expires: 365 });
				gbmapdata = '';
				//alert($.lang.convert(''));
			}

			if (document.getElementById('op_api_3').checked) {
				$.cookie('api', '3', { expires: 365 });	
			} else if (document.getElementById('op_api_3exp').checked) {
				$.cookie('api', '3.exp', { expires: 365 });	
			} else if (document.getElementById('op_api_custom').checked) {
				if ($('#op_APIv').val() != '') { 
					$.cookie('api', $('#op_APIv').val(), { expires: 365 });	
				} else {
					$.cookie('api', "3.exp", { expires: 365 });
				}
			} else {
				$.cookie('api', "3.exp", { expires: 365 });				
			}
			 
			alert($.lang.convert('Setting updated.'));
			$('#dialogOptions').dialog('close');
		});

		$('#op_Cancel').click(function() {
			$('#dialogOptions').dialog('close');
		});	

		$('#op_RouteColorUpdate').click(function() {
			var color = $('#colorCodeHex').val();
			var route = $('#routeColor_Routes option:selected').text();
			
			for(var pid in MapToolbar.features['lineTab'] ) {
				if (typeof MapToolbar.features['lineTab'][pid].route != 'undefined') {
					if (MapToolbar.features['lineTab'][pid].route == route) {
						MapToolbar.features['lineTab'][pid].setOptions( {strokeColor: color} );

					}
				}
			}			
			
			$('#dialogRouteColor').dialog('close');
		});	

		$('#op_RouteColorCancel').click(function() {
			$('#dialogRouteColor').dialog('close');
		});	
		
		$('#PLcrackID').change(function() {
			var src = getObjectImage('crack',this.options[this.selectedIndex].value);
			document.getElementById('PLcrackView').src='images/' + src;
		});	

		$('#PLcrackOp').click(function() {
			if (document.getElementById('PLcrackOp').checked) {
				$('#PLcrackID').prop('disabled', false);
				var src = getObjectImage('crack',$('#PLcrackID').val());
				document.getElementById('PLcrackView').src='images/' + src;
			} else {
				$('#PLcrackID').prop('disabled', true);
				document.getElementById('PLcrackView').src= "images/transparent.png";
			}
		});	
		
		$('#poleOn').click(function() {
			if (document.getElementById('poleOn').checked) {
				$('#dms_poleindex').prop('disabled', false);
				var pid = $('#dms_lineid').val(); // $('#').val();
				var mIdx = $('#dms_markerindex').val();
				var tab = pid.split('_')[0]+ 'Tab';
				var poleArr = MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.pole.split(':');
				var x = document.getElementById("dms_poleindex");
				for (var i = 0; i < x.length; i++) {

					if (poleArr[0] == x.options[i].value) {
						$("#dms_poleindex option[value=\'" + x.options[i].value + "\']").attr("selected", "selected");
						break;
					}
				}
				$('#dms_poleStart').prop('disabled', false);
				$('#dms_poleEnd').prop('disabled', false);
			} else {
				$('#dms_poleindex').prop('disabled', true);
				$('#dms_poleStart').prop('disabled', true);
				$('#dms_poleEnd').prop('disabled', true);
			}			
		});			

		$('#dms_lineX_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).lineX = $('#dms_lineX').val();
			alert('lineX data at index ' + mIdx + ' on ' + pid + ' updated.');
		});			
		
		$('#dms_sline_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).sline = $('#dms_sline').val();
			alert('sline data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		
		$('#dms_curve_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).bdata.curve = $('#dms_curve').val();
			alert('bdata.curve data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		
		$('#dms_tcurve_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).bdata.tcurve = $('#dms_tcurve').val();
			alert('bdata.tcurve data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		
		$('#dms_bridge_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.bridge = $('#dms_bridge').val();
			alert('kdata.bridge data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		
		$('#dms_overbridge_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.overbridge = $('#dms_overbridge').val();
			alert('kdata.overbridge data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		/*
		$('#dms_river_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.river = $('#dms_river').val();
			alert('lineX data at ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		*/
		$('#dms_ground_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.ground = $('#dms_ground').val();
			alert('kdata.ground data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		
		$('#dms_flyover_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.flyover = $('#dms_flyover').val();
			alert('kdata.flyover data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		
		$('#dms_tunnel_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.tunnel = $('#dms_tunnel').val();
			alert('kdata.tunnel data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		
		$('#dms_pole_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.pole = $('#dms_pole').val();
			alert('kdata.pole data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		
		$('#dms_dike_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.dike = $('#dms_dike').val();
			alert('kdata.dike data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		
		$('#dms_cut_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.cut = $('#dms_cut').val();
			alert('kdata.cut data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		
		$('#dms_form_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.form = $('#dms_form').val();
			alert('kdata.form data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		
		$('#dms_roadcross_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.roadcross = $('#dms_roadcross').val();
			alert('kdata.roadcross data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		
		$('#dms_crack_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.crack = $('#dms_crack').val();
			alert('kdata.crack data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
		
		$('#dms_beacon_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.beacon = $('#dms_beacon').val();
			alert('kdata.beacon data at index ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
	/*	
		$('#dms_underground_Upd').click(function() {
			var pid = $('#dms_lineid').val(); // $('#').val();
			var mIdx = $('#dms_markerindex').val();
			var tab = pid.split('_')[0]+ 'Tab';
			MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.underground = $('#dms_underground').val();
			alert('kdata.underground data at ' + mIdx + ' on ' + pid + ' updated.');
			
		});			
	*/

		// dialog dike
		$('#dInsDike_OK').click(function() {		
			//if (document.getElementById('dInsC_Crossing').value != '') {
				var pid = $('#dInsDike_PID').val(); 
				var mIdx = parseInt($('#dInsDike_MID').val());
				var tab = pid.split('_')[0]+ 'Tab';
				
				if (typeof MapToolbar.features[tab][pid].markers.getAt(mIdx) != 'undefined') {
					var start = null; 
					switch (true) {
						case (document.getElementById('dInsDike_Start').checked):
							start = true;
							break;
						case (document.getElementById('dInsDike_End').checked):
							start = false;
							break;
						default:
							alert($.lang.convert('please select either start point or end point, tq'));
							return false;
					}
				
					var strType = (start) ? 0 : 1;	
					
					if (MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.dike == '') {
						MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.dike = $('#dInsDike_str').val() + ':' + strType;
					} else {
						MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.dike += '¤' + $('#dInsDike_str').val() + ':' + strType;
					}					
					
					var image = new google.maps.MarkerImage('images/dike_icon.png',
						new google.maps.Size(6, 6),
						new google.maps.Point(0, 0),
						new google.maps.Point(3, 3));
					MapToolbar.features[tab][pid].markers.getAt(mIdx).setIcon(image);
					$('#dialogInsertDike').dialog('close');
				} else {
					alert($.lang.convert('marker index not defined'));				
				}
			//}
		});

		$('#dInsDike_KO').click(function() {
			$('#dialogInsertDike').dialog('close');
		});	
		
		$('#dInsDike_str').change(function() {
			if (document.getElementById('dInsDike_str').value != '') {
				var src = getObjectImage('dike',$('#dInsDike_str').val());
				document.getElementById('dInsDike_Img').src='images/' + src;
			}
		});		

		// dialog cut
		$('#dInsCut_OK').click(function() {		
		
			var pid = $('#dInsCut_PID').val(); 
			var mIdx = parseInt($('#dInsCut_MID').val());
			var tab = pid.split('_')[0]+ 'Tab';
			
			if (typeof MapToolbar.features[tab][pid].markers.getAt(mIdx) != 'undefined') {
				var start = null; 
				switch (true) {
					case (document.getElementById('dInsCut_Start').checked):
						start = true;
						break;
					case (document.getElementById('dInsCut_End').checked):
						start = false;
						break;
					default:
						alert($.lang.convert('please select either start point or end point, tq'));
						return false;
				}
			
				var strType = (start) ? 0 : 1;	
				
				if (MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.cut == '') {
					MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.cut = $('#dInsCut_str').val() + ':' + strType;
				} else {
					MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.cut += '¤' + $('#dInsCut_str').val() + ':' + strType;
				}					
				
				var image = new google.maps.MarkerImage('images/hillcut_icon.png',
					new google.maps.Size(6, 6),
					new google.maps.Point(0, 0),
					new google.maps.Point(3, 3));
				MapToolbar.features[tab][pid].markers.getAt(mIdx).setIcon(image);
				$('#dialogInsertCut').dialog('close');
			} else {
				alert($.lang.convert('marker index not defined'));				
			}
			
		});

		$('#dInsCut_KO').click(function() {
			$('#dialogInsertCut').dialog('close');
		});	
		
		$('#dInsCut_str').change(function() {
			if (document.getElementById('dInsCut_str').value != '') {
				var src = getObjectImage('cut',$('#dInsCut_str').val());
				document.getElementById('dInsCut_Img').src='images/' + src;
			}
		});		

		// dialog pole
		$('#dInsPole_OK').click(function() {		
		
			var pid = $('#dInsPole_PID').val(); 
			var mIdx = parseInt($('#dInsPole_MID').val());
			var tab = pid.split('_')[0]+ 'Tab';
			
			if (typeof MapToolbar.features[tab][pid].markers.getAt(mIdx) != 'undefined') {
				var start = null; 
				switch (true) {
					case (document.getElementById('dInsPole_Start').checked):
						start = true;
						break;
					case (document.getElementById('dInsPole_End').checked):
						start = false;
						break;
					default:
						alert($.lang.convert('please select either start point or end point, tq'));
						return false;
				}
			
				var strType = (start) ? 0 : 1;	
				
				if (MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.pole == '') {
					MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.pole = $('#dInsPole_str').val() + ':' + strType;
				} else {
					MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.pole += '¤' + $('#dInsPole_str').val() + ':' + strType;
				}				
				
				//MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.pole = $('#dInsPole_str').val();
				var image = new google.maps.MarkerImage('images/pole_icon.png',
					new google.maps.Size(6, 6),
					new google.maps.Point(0, 0),
					new google.maps.Point(3, 3));
				MapToolbar.features[tab][pid].markers.getAt(mIdx).setIcon(image);
				$('#dialogPole').dialog('close');
			} else {
				alert($.lang.convert('marker index not defined'));				
			}
			
		});

		$('#dInsPole_KO').click(function() {
			$('#dialogPole').dialog('close');
		});	
		
		$('#dInsPole_str').change(function() {
			if (document.getElementById('dInsPole_str').value != '') {
				var src = getObjectImage('pole',$('#dInsPole_str').val());
				document.getElementById('dInsPole_Img').src='images/' + src;
			}
		});	
		
		// dialog update form
		$('#dUpdFormType_OK').click(function() {		
		
			var pid = $('#dUpdFormType_PID').val(); 
			var mIdx = parseInt($('#dUpdFormType_MID').val());
			var tab = pid.split('_')[0]+ 'Tab';
			
			if (typeof MapToolbar.features[tab][pid].markers.getAt(mIdx) != 'undefined') {
				if (MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.form != '') {

					var formArr = MapToolbar.features[tab][pid].markers.getAt(mIdx).kdata.form.split('¤');
					if (formArr.length > 2) {
						MapToolbar.features["lineTab"][line_pid].markers.getAt(mIdx).kdata.form = $('#dUpdFormType_str').val() + '¤' + formArr[1] + '¤' + formArr[2] + '¤' + formArr[3] + '¤' + formArr[4] + '¤' + formArr[5] + '¤' + formArr[6] + '¤' + formArr[7];
						alert($.lang.convert('form type updated.'));
					} else {
						
					}
				} else {
					
				}
				$('#dialogUpdFormType').dialog('close');
			} else {
				alert($.lang.convert('marker index not defined'));				
			}
			
		});

		$('#dUpdFormType_KO').click(function() {
			$('#dialogUpdFormType').dialog('close');
		});	
		
		$('#dUpdFormType_str').change(function() {
			if (document.getElementById('dUpdFormType_str').value != '') {
				var src = getObjectImage('form',$('#dUpdFormType_str').val());
				document.getElementById('dUpdFormType_Img').src='images/' + src;
			}
		});	
		
		// dialog pitch
		$('#dInsPitch_OK').click(function() {		
		
			var pid = $('#dInsPitch_PID').val(); 
			var mIdx = parseInt($('#dInsPitch_MID').val());
			var tab = pid.split('_')[0]+ 'Tab';
			var pitch = parseInt($('#dInsPitch_val').val());
			
			if (typeof MapToolbar.features[tab][pid].markers.getAt(mIdx) != 'undefined') {		
				MapToolbar.features[tab][pid].markers.getAt(mIdx).bdata.pitch = pitch;
				var image = new google.maps.MarkerImage('images/pitch_icon.png',
					new google.maps.Size(6, 6),
					new google.maps.Point(0, 0),
					new google.maps.Point(3, 3));
				MapToolbar.features[tab][pid].markers.getAt(mIdx).setIcon(image);
				$('#dialogManualPitch').dialog('close');
			} else {
				alert($.lang.convert('marker index not defined'));				
			}
			
		});

		$('#dInsPitch_KO').click(function() {
			$('#dialogManualPitch').dialog('close');
		});	
					
		
		setTimeout(function() { scriptLoaded(); }, 500 );
		
		setTimeout(function() { startupCheck(); }, 1000 );
				
	});