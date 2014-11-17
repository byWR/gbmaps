/*
GB Maps ギビマップ - © Karya IT (http://www.karyait.net.my/) 2012-2014. All rights reserved. 
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

GB Maps ギビマップ by Karya IT is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. Based on a work at https://code.google.com/p/gbmaps/. Permissions beyond the scope of this license may be available at https://developers.google.com/readme/terms. Google Maps - ©2014 Google.

Code license : Apache License 2.0

Main GB Maps ギビマップ Website : http://gbmaps.karyait.net.my/ or http://gbmaps.blogspot.com

Development site (programming) : https://github.com/karyait/gbmaps & https://code.google.com/p/gbmaps/
Personal blog for GB Maps ギビマップ (design algorithm) : http://blogkaryait.wordpress.com/tag/gbmaps/


File : gbm-conv-bve5-v1.js
purpose : open bve route builder, data conversion function
type : development release
version : 1.1.5
build : 
last update : 5 November 2014 8:46pm (GMT 8+)

*/
	//bve5 list
	var scenario = []; // structure[key] = ['fileXXX.x',count,'type',repeat_length]; 
	var structure = [];
	var map = [];
	var station = [];
	var signal = [];
	var sound = [];	
	var sound3d = [];	
	var curSta = [];
	
	// BVE route structure
	/*
	var paralellTrack = [];   // paralellTrack[0] = [RailIndex,X,Y,pid,bsti]; // data : railindex, x-distance from main track, y-height, pid (sideline pid), bsti : index on base line where sideline start (new 08-08-2014)
	var teks = '';
	var defaultRailIndex = 0;
	var mainTrkArr = [];
	var subTrkArr = [];
	var noteTrkArr = []; 
	var pitchRatio = 0;
	*/

	var defaultrailLkey,defaultrailRkey,defaultrailbasekey,defaultohwirekey,joinkey,flangekey;
	var lastheight = -0.5;
		
function generateBVE5(pid,stIdx,edIdx,routeId,routeName,gauge,railtype,train,maxspeed,bg,kmstone,stsign,devID,desc)
{
	//alert('ｍ（．＿．）ｍ .................\n\nSorry! work in progress.\nすみません！進行中の作品。\nHarap Maaf! Kerja-kerja sedang dijalankan.');
	gauge = gauge/1000; // convert mm to meters
	
	teks = '<?xml version="1.0" encoding="utf-8"?>\n';
	teks += '<bve>\n';
	teks += '<gbm>\n';
	teks += '<gver>1.0.0</gver>\n';
	teks += '<bver>5.0</bver>\n';
	teks += '<route_id>' + routeId + '</route_id>\n';
	teks += '<route_name>' + routeName + '</route_name>\n';
	teks += '<train>' + train + '</train>\n';
	teks += '</gbm>\n';
	teks += '<scenario>\n';
	teks += 'BveTs Scenario 2.00:UTF-8\n';	
	teks += 'Route = ' + routeName + '\\map.txt\n';
	teks += 'Vehicle = ' + routeName + '\\' + train + '\\vehicle.txt\n';
	teks += 'Title = ' + routeId + '\n';
	teks += 'RouteTitle = ' + routeName + '\n';
	teks += 'VehicleTitle = ' + train + '\n';
	teks += 'Author = ' + devID + '\n';
	teks += 'Comment = ' + desc + '\n';
	teks += 'Image = ' + routeName + '\\train.jpg\n';
	teks += '</scenario>\n';
	
	
	
	structure['sign_m_curve'] = ['shared\\freeobj\\km_p\\m_curve.x',0,'sign',0]; //curve sign
	
	structure['sign_sloop_down-up'] = ['shared\\freeobj\\km_p\\sloop_down-up.x',0,'sign',0]; //menurun opp. mendaki
	structure['sign_sloop_level-up'] = ['shared\\freeobj\\km_p\\sloop_level-up.x',0,'sign',0]; //level opp. mendaki
	structure['sign_sloop_down-level'] = ['shared\\freeobj\\km_p\\sloop_down-level.x',0,'sign',0]; //menurun opp. level
	structure['sign_sloop_up-level'] = ['shared\\freeobj\\km_p\\sloop_up-level.x',0,'sign',0]; //mendaki opp. level
	structure['sign_sloop_level-down'] = ['shared\\freeobj\\km_p\\sloop_level-down.x',0,'sign',0]; //level opp. menurun
	structure['sign_sloop_up-down'] = ['shared\\freeobj\\km_p\\sloop_up-down.x',0,'sign',0]; //mendaki opp. menurun
	structure['sign_sloop_up-up'] = ['shared\\freeobj\\km_p\\sloop_up-up.x',0,'sign',0]; //mendaki-mendaki, lain2 ratio
	structure['sign_sloop_down-down'] = ['shared\\freeobj\\km_p\\sloop_down-down.x',0,'sign',0]; //menurun-menurun, lain2 ratio
	
	structure['sign_kmp'] = ['shared\\freeobj\\km_p\\kmp.x',0,'sign',0]; //kilometer mark
	structure['sign_500mp'] = ['shared\\freeobj\\km_p\\500mp.x',0,'sign',0]; //500 meter mark
	structure['sign_100mp'] = ['shared\\freeobj\\km_p\\100mp.x',0,'sign',0]; //100 meter mark
	
	structure['sign_s_begin'] = ['shared\\freeobj\\sign\\s_begin.x',0,'sign',0]; //S start sign
	structure['sign_s_cancel'] = ['shared\\freeobj\\sign\\s_cancel.x',0,'sign',0]; //S cancel sign
	structure['sign_stap'] = ['shared\\freeobj\\sign\\stap.x',0,'sign',0]; //station near sign
	structure['sign_start_wr'] = ['shared\\freeobj\\sign\\start_wr.x',0,'sign',0]; //
	structure['sign_stop_through'] = ['shared\\freeobj\\sign\\stop_through.x',0,'sign',0]; //
	structure['sign_whistle'] = ['shared\\freeobj\\sign\\whistle.x',0,'sign',0]; //whistle sign
	
	structure['sign_stop_01'] = ['shared\\freeobj\\stop\\stop_01.x',0,'sign',0]; //stop mark
	structure['sign_stop_02'] = ['shared\\freeobj\\stop\\stop_02.x',0,'sign',0]; //stop mark
	structure['sign_stop_03'] = ['shared\\freeobj\\stop\\stop_03.x',0,'sign',0]; //stop ballast
	
	structure['sign_stop'] = ['shared\\default\\stop.x',0,'sign',0]; //stop sign
	
	structure['sign_spl_pole'] = ['shared\\default\\SpeedLimPole.x',0,'sign',0]; //speed limit sign pole
	structure['sign_spl_back'] = ['shared\\default\\SpeedLim.x',0,'sign',0]; //speed limit sign back
	structure['sign_spl_L'] = ['shared\\default\\SpeedLimL.x',0,'sign',0]; //speed limit sign L
	structure['sign_spl_R'] = ['shared\\default\\SpeedLimR.x',0,'sign',0]; //speed limit sign R
	structure['sign_spl_End'] = ['shared\\default\\SpeedLimEnd.x',0,'sign',0]; //speed limit sign end
	structure['sign_spl_0'] = ['shared\\default\\SpeedLim0.x',0,'sign',0]; //speed limit sign 0
	structure['sign_spl_1'] = ['shared\\default\\SpeedLim1.x',0,'sign',0]; //speed limit sign 1
	structure['sign_spl_2'] = ['shared\\default\\SpeedLim2.x',0,'sign',0]; //speed limit sign 2
	structure['sign_spl_3'] = ['shared\\default\\SpeedLim3.x',0,'sign',0]; //speed limit sign 3
	structure['sign_spl_4'] = ['shared\\default\\SpeedLim4.x',0,'sign',0]; //speed limit sign 4
	structure['sign_spl_5'] = ['shared\\default\\SpeedLim5.x',0,'sign',0]; //speed limit sign 5
	structure['sign_spl_6'] = ['shared\\default\\SpeedLim6.x',0,'sign',0]; //speed limit sign 6
	structure['sign_spl_7'] = ['shared\\default\\SpeedLim7.x',0,'sign',0]; //speed limit sign 7
	structure['sign_spl_8'] = ['shared\\default\\SpeedLim8.x',0,'sign',0]; //speed limit sign 8
	structure['sign_spl_9'] = ['shared\\default\\SpeedLim9.x',0,'sign',0]; //speed limit sign 9
	
	
	
	try {
		for (i = 0; i < bvebveStrOjArr.length; i++) {		
			if (typeof bvebveStrOjArr[i][5] != 'undefined') { 
				if (bvebveStrOjArr[i][5] != '') {
					if (bvebveStrOjArr[i][3] != 'Wall') {
						var xfile = bvebveStrOjArr[i][5].replace(/[/]/g,'\\');
						structure[bvebveStrOjArr[i][1]] = [xfile,0,bvebveStrOjArr[i][3],0];			
					}
				}
			}

		}			
	}
	catch(err) {
		teks += "[Error] : error retrieving bvebveStrOjArr list." + "\n" + err.message + ". \n";
	}	
		
	try {
		var RailB = []; 
		var RailL = []; 
		var RailR = []; 
		var OHwire = [];
		var defaultrailLx,defaultrailRx,defaultrailbaseX,defaultohwireX;

		
		for (i = 0; i < bverailobjArr.length; i++) {
			if (typeof bverailobjArr[i][6] != 'undefined') { 
				if (bverailobjArr[i][6] != '') {
					var xfileRB = bverailobjArr[i][6].replace(/[/]/g,'\\');
					var xfileRL = bverailobjArr[i][12].replace(/[/]/g,'\\');
					var xfileRR = bverailobjArr[i][13].replace(/[/]/g,'\\');
					var xfileOH = bverailobjArr[i][14].replace(/[/]/g,'\\');					
					
					if (RailB.length == 0) {
						structure['railbase_'+i] = [xfileRB,0,'rail',bverailobjArr[i][11]];
						RailB.push(xfileRB);
					} else {
						var cek = true;
						for (j=0;j<RailB.length;j++) {
							if (RailB[j] == xfileRB) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['railbase_'+i] = [xfileRB,0,'rail',bverailobjArr[i][11]];
							RailB.push(xfileRB);
						}
					}
					
					if (RailL.length == 0) {
						structure['railL_'+i] = [xfileRL,0,'rail',bverailobjArr[i][11]];
						RailL.push(xfileRL);
					} else {
						var cek = true;
						for (j=0;j<RailL.length;j++) {
							if (RailL[j] == xfileRL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['railL_'+i] = [xfileRL,0,'rail',bverailobjArr[i][11]];
							RailL.push(xfileRL);
						}						
					}
					
					if (RailR.length == 0) {
						structure['railR_'+i] = [xfileRR,0,'rail',bverailobjArr[i][11]];
						RailR.push(xfileRR);
					} else {
						var cek = true;
						for (j=0;j<RailR.length;j++) {
							if (RailR[j] == xfileRR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['railR_'+i] = [xfileRR,0,'rail',bverailobjArr[i][11]];
							RailR.push(xfileRR);
						}						
					}
					
					if (OHwire.length == 0) {
						structure['ohwire_'+i] = [xfileOH,0,'rail',bverailobjArr[i][15]];
						OHwire.push(xfileOH);
					} else {
						var cek = true;
						for (j=0;j<OHwire.length;j++) {
							if (OHwire[j] == xfileOH) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['ohwire_'+i] = [xfileOH,0,'rail',bverailobjArr[i][15]];
							OHwire.push(xfileOH);
						}						
					}

				}
			}

			if (bverailobjArr[i][1] == railtype) {
				defaultrailbaseX = xfileRB;
				defaultrailLx = xfileRL;
				defaultrailRx = xfileRR;
				defaultohwireX = xfileOH;
				//break;
			}			
		}
		
		for (key in structure) {
			if (structure[key][0] == defaultrailbaseX) {
				defaultrailbasekey = key;
				structure[key][1]++;
			}
			if (structure[key][0] == defaultrailLx) {
				defaultrailLkey = key;
				structure[key][1]++;
			}
			if (structure[key][0] == defaultrailRx) {
				defaultrailRkey = key;
				structure[key][1]++;
			}
			if (structure[key][0] == defaultohwireX) {
				defaultohwirekey = key;
				structure[key][1]++;
			}
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating rail list." + "\n" + err.message + ". \n";
	}	

	try {
		var DikeL = [];
		var DikeR = [];		
		for (var i=0; i < bvedikeObjArr.length; i++) {
			if (typeof bvedikeObjArr[i][4] != 'undefined' && typeof bvedikeObjArr[i][5] != 'undefined') {
				if (bvedikeObjArr[i][4] != '' || bvedikeObjArr[i][5] != '') {
					var xfileL = bvedikeObjArr[i][4].replace(/[/]/g,'\\');
					var xfileR = bvedikeObjArr[i][5].replace(/[/]/g,'\\');
					
					if (DikeL.length == 0) {
						structure['dikeL_'+i] = [xfileL,0,'dike',bvedikeObjArr[i][6]];
						DikeL.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<DikeL.length;j++) {
							if (DikeL[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['dikeL_'+i] = [xfileL,0,'dike',bvedikeObjArr[i][6]];
							DikeL.push(xfileL);
						}
					}
					
					if (DikeR.length == 0) {
						structure['dikeR_'+i] = [xfileR,0,'dike',bvedikeObjArr[i][6]];
						DikeR.push(xfileR);
					} else {
						var cek = true;
						for (j=0;j<DikeR.length;j++) {
							if (DikeR[j] == xfileR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['dikeR_'+i] = [xfileR,0,'dike',bvedikeObjArr[i][6]];
							DikeR.push(xfileR);
						}
					}
										
				}									
			}
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating dike list." + "\n" + err.message + ". \n";
	}	
	
	try {
		var FoO = [];
		var WallL = [];
		var WallR = [];
		
		for (var i=0; i < bvetunnelObjArr.length; i++) {
	
			if (typeof bvetunnelObjArr[i][4] != 'undefined') { //tunnel entrance
				if (bvetunnelObjArr[i][4] != '') {
					var xfile = bvetunnelObjArr[i][4].replace(/[/]/g,'\\');
					
					if (FoO.length == 0) {
						structure['TunS_'+bvetunnelObjArr[i][1]] = [xfile,0,'tunnel',0];
						FoO.push(xfile);
					} else {
						var cek = true;
						for (j=0;j<FoO.length;j++) {
							if (FoO[j] == xfile) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['TunS_'+bvetunnelObjArr[i][1]] = [xfile,0,'tunnel',0];
							FoO.push(xfile);
						}
					} 							
				}							
			}
			if (typeof bvetunnelObjArr[i][5] != 'undefined') { //tunnel exit
				if (bvetunnelObjArr[i][5] != '') {
					var xfile = bvetunnelObjArr[i][5].replace(/[/]/g,'\\');
					
					if (FoO.length == 0) {
						structure['TunE_'+bvetunnelObjArr[i][1]] = [xfile,0,'tunnel',0];
						FoO.push(xfile);
					} else {
						var cek = true;
						for (j=0;j<FoO.length;j++) {
							if (FoO[j] == xfile) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['TunE_'+bvetunnelObjArr[i][1]] = [xfile,0,'tunnel',0];
							FoO.push(xfile);
						}
					}
				}							
			}
		
			if (typeof bvetunnelObjArr[i][6] != 'undefined' && typeof bvetunnelObjArr[i][7] != 'undefined') {
				if (bvetunnelObjArr[i][6] != '' || bvetunnelObjArr[i][7] != '') {
					var xfileL = bvetunnelObjArr[i][6].replace(/[/]/g,'\\');
					var xfileR = bvetunnelObjArr[i][7].replace(/[/]/g,'\\');
					
					if (WallL.length == 0) {
						structure['TunL1_'+i] = [xfileL,0,'tunnel',0];
						WallL.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<WallL.length;j++) {
							if (WallL[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['TunL1_'+i] = [xfileL,0,'tunnel',0];
							WallL.push(xfileL);
						}
					}
					
					if (WallR.length == 0) {
						structure['TunR1_'+i] = [xfileR,0,'tunnel',0];
						WallR.push(xfileR);
					} else {
						var cek = true;
						for (j=0;j<WallR.length;j++) {
							if (WallR[j] == xfileR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['TunR1_'+i] = [xfileR,0,'tunnel',0];
							WallR.push(xfileR);
						}
					}					
				}									
			}
			
			WallL = [];
			WallR = [];
			
			if (typeof bvetunnelObjArr[i][8] != 'undefined' && typeof bvetunnelObjArr[i][9] != 'undefined') {
				if (bvetunnelObjArr[i][8] != '' || bvetunnelObjArr[i][9] != '') {
					var xfileL = bvetunnelObjArr[i][8].replace(/[/]/g,'\\');
					var xfileR = bvetunnelObjArr[i][9].replace(/[/]/g,'\\');
					
					if (WallL.length == 0) {
						structure['TunL2_'+i] = [xfileL,0,'tunnel',bvetunnelObjArr[i][10]];
						WallL.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<WallL.length;j++) {
							if (WallL[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['TunL2_'+i] = [xfileL,0,'tunnel',bvetunnelObjArr[i][10]];
							WallL.push(xfileL);
						}
					}
					
					if (WallR.length == 0) {
						structure['TunR2_'+i] = [xfileR,0,'tunnel',bvetunnelObjArr[i][10]];
						WallR.push(xfileR);
					} else {
						var cek = true;
						for (j=0;j<WallR.length;j++) {
							if (WallR[j] == xfileR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['TunR2_'+i] = [xfileR,0,'tunnel',bvetunnelObjArr[i][10]];
							WallR.push(xfileR);
						}
					}					
				}									
			}
			
			WallL = [];
			WallR = [];			
			
			if (typeof bvetunnelObjArr[i][11] != 'undefined' && typeof bvetunnelObjArr[i][12] != 'undefined') {
				if (bvetunnelObjArr[i][11] != '' || bvetunnelObjArr[i][12] != '') {
					var xfileL = bvetunnelObjArr[i][11].replace(/[/]/g,'\\');
					var xfileR = bvetunnelObjArr[i][12].replace(/[/]/g,'\\');
					
					if (WallL.length == 0) {
						structure['TunL3_'+i] = [xfileL,0,'tunnel',bvetunnelObjArr[i][13]];
						WallL.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<WallL.length;j++) {
							if (WallL[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['TunL3_'+i] = [xfileL,0,'tunnel',bvetunnelObjArr[i][13]];
							WallL.push(xfileL);
						}
					}
					
					if (WallR.length == 0) {
						structure['TunR3_'+i] = [xfileR,0,'tunnel',bvetunnelObjArr[i][13]];
						WallR.push(xfileR);
					} else {
						var cek = true;
						for (j=0;j<WallR.length;j++) {
							if (WallR[j] == xfileR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['TunR3_'+i] = [xfileR,0,'tunnel',bvetunnelObjArr[i][13]];
							WallR.push(xfileR);
						}
					}					
				}									
			}
			
			WallL = [];
			WallR = [];			
			
			if (typeof bvetunnelObjArr[i][14] != 'undefined' && typeof bvetunnelObjArr[i][15] != 'undefined') {
				if (bvetunnelObjArr[i][14] != '' || bvetunnelObjArr[i][15] != '') {
					var xfileL = bvetunnelObjArr[i][14].replace(/[/]/g,'\\');
					var xfileR = bvetunnelObjArr[i][15].replace(/[/]/g,'\\');
					
					if (WallL.length == 0) {
						structure['TunL4_'+i] = [xfileL,0,'tunnel',0];
						WallL.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<WallL.length;j++) {
							if (WallL[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['TunL4_'+i] = [xfileL,0,'tunnel',0];
							WallL.push(xfileL);
						}
					}
					
					if (WallR.length == 0) {
						structure['TunR4_'+i] = [xfileR,0,'tunnel',0];
						WallR.push(xfileR);
					} else {
						var cek = true;
						for (j=0;j<WallR.length;j++) {
							if (WallR[j] == xfileR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['TunR4_'+i] = [xfileR,0,'tunnel',0];
							WallR.push(xfileR);
						}
					}					
				}									
			}
			
			WallL = [];
			WallR = [];
			
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating tunnel list." + "\n" + err.message + ". \n";
	}	
	
	FoO = [];
	try {
		//['1','Flyover02','Flyover 2','fo02.png','seto_down/wall/walll.csv','seto_down/wall/wallr.csv','pierdbll.csv','50','']
		var FoL = [];
		var FoR = [];
		
		for (var i=0; i < bveFOObjArr.length; i++) {
			if ((typeof bveFOObjArr[i][4] != 'undefined') && (typeof bveFOObjArr[i][5] != 'undefined'))  { 
				if ((bveFOObjArr[i][4] != '') || (bveFOObjArr[i][5] != '')) {
					var xfileL = bveFOObjArr[i][4].replace(/[/]/g,'\\');
					var xfileR = bveFOObjArr[i][5].replace(/[/]/g,'\\');
					
					if (FoL.length == 0) {
						structure['FoL_'+i] = [xfileL,0,'flyover',bveFOObjArr[i][8]];
						FoL.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<FoL.length;j++) {
							if (FoL[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['FoL_'+i] = [xfileL,0,'flyover',bveFOObjArr[i][8]];
							FoL.push(xfileL);
						}
					}
					
					if (FoR.length == 0) {
						structure['FoR_'+i] = [xfileR,0,'flyover',bveFOObjArr[i][8]];
						FoR.push(xfileR);
					} else {
						var cek = true;
						for (j=0;j<FoR.length;j++) {
							if (FoR[j] == xfileR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['FoR_'+i] = [xfileR,0,'flyover',bveFOObjArr[i][8]];
							FoR.push(xfileR);
						}
					}
					
				}
			}
			if (typeof bveFOObjArr[i][6] != 'undefined') { //pier
				if (bveFOObjArr[i][6] != '') {
					var xfileL = bveFOObjArr[i][6].replace(/[/]/g,'\\');
					
					if (FoO.length == 0) {
						structure['FoP_'+bveFOObjArr[i][1]] = [xfileL,0,'flyover',bveFOObjArr[i][7]];
						FoO.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<FoO.length;j++) {
							if (FoO[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['FoP_'+bveFOObjArr[i][1]] = [xfileL,0,'flyover',bveFOObjArr[i][7]];
							FoO.push(xfileL);
						}
					}							
				}							
			}
		} 		
	}
	catch(err) {
		teks += "[Error] : error in creating flyover list." + "\n" + err.message + ". \n";
	}	
	
	FoO = [];
	try {
		//['0','concreteB1','Concrete Bridge 1','concrete-bridge-01.png','bridgel.csv','<center>','bridger.csv','<pier>','0','type']
		var bridgeL = [];
		var bridgeR = [];
		
		for (var i=0; i < bvebridgeObjArr.length; i++) { 
			if (typeof bvebridgeObjArr[i][4] != 'undefined') { 
				if (bvebridgeObjArr[i][4] != '') {
					var xfileL = bvebridgeObjArr[i][4].replace(/[/]/g,'\\');						
					if (bridgeL.length == 0) {
						structure['bridgeL_'+i] = [xfileL,0,'bridge',bvebridgeObjArr[i][10]];
						bridgeL.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<bridgeL.length;j++) {
							if (bridgeL[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['bridgeL_'+i] = [xfileL,0,'bridge',bvebridgeObjArr[i][10]];
							bridgeL.push(xfileL);
						}
					}
				}
			}	
			if (typeof bvebridgeObjArr[i][5] != 'undefined') { 	
				if (bvebridgeObjArr[i][5] != '') {	
					var xfileR = bvebridgeObjArr[i][5].replace(/[/]/g,'\\');
					if (bridgeR.length == 0) {
						structure['bridgeR_'+i] = [xfileR,0,'bridge',bvebridgeObjArr[i][10]];
						bridgeR.push(xfileR);
					} else {
						var cek = true;
						for (j=0;j<bridgeR.length;j++) {
							if (bridgeR[j] == xfileR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['bridgeR_'+i] = [xfileR,0,'bridge',bvebridgeObjArr[i][10]];
							bridgeR.push(xfileR);
						}
					}									
				}
			}
			if (typeof bvebridgeObjArr[i][6] != 'undefined') { //pier
				if (bvebridgeObjArr[i][6] != '') {
					var xfileL = bvebridgeObjArr[i][6].replace(/[/]/g,'\\');
					
					if (FoO.length == 0) {
						structure['bridgeP_'+bvebridgeObjArr[i][1]] = [xfileL,0,'bridge',bvebridgeObjArr[i][7]];
						FoO.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<FoO.length;j++) {
							if (FoO[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['bridgeP_'+bvebridgeObjArr[i][1]] = [xfileL,0,'bridge',bvebridgeObjArr[i][7]];
							FoO.push(xfileL);
						}
					}
				}							
			}			
						
		}
	}
	catch(err) {
		teks += "[Error] : error in creating bridge list." + "\n" + err.message + ". \n";
	}	
	
/*	
	try {
		//0~3 ['0','ug1','UG1','ctunnel3.png',
		//4~5 'test_route/tunnel_sikaku/tunnel_sikakuentl.csv','test_route/tunnel_sikaku/tunnel_sikakuentr.csv',
		//6~8 'test_route/tunnel_sikaku/tunnel_sikakul.csv','test_route/tunnel_sikaku/tunnel_sikakur.csv','25',
		//9~11 '','','0',
		//12~13 'test_route/tunnel_sikaku/tunnel_sikakuendl.csv','test_route/tunnel_sikaku/tunnel_sikakuendr.csv']
		for (var i=0; i < bveUGObjArr.length; i++) {
			if ((typeof bveUGObjArr[i][4] != 'undefined') && (typeof bveUGObjArr[i][5] != 'undefined'))  { 
				if ((bveUGObjArr[i][4] != '') || (bveUGObjArr[i][5] != '')) {
					var WallL = bveUGObjArr[i][4].replace(/[/]/g,'\\');
					var WallR = bveUGObjArr[i][5].replace(/[/]/g,'\\');
					var add = true;
					for (j=0;j<Wall.length;j++) {
						if (Wall[j][0] == WallL && Wall[j][1] == WallR) {
							add = false;
							break;
						}
					}
					if (add) {
						Wall.push([WallL,WallR,0,-1]);
					}									
				}
			}

			if ((typeof bveUGObjArr[i][6] != 'undefined') && (typeof bveUGObjArr[i][7] != 'undefined'))  { 
				if ((bveUGObjArr[i][6] != '') || (bveUGObjArr[i][7] != '')) {
					var WallL = bveUGObjArr[i][6].replace(/[/]/g,'\\');
					var WallR = bveUGObjArr[i][7].replace(/[/]/g,'\\');
					var add = true;
					for (j=0;j<Wall.length;j++) {
						if (Wall[j][0] == WallL && Wall[j][1] == WallR) {
							add = false;
							break;
						}
					}
					if (add) {
						Wall.push([WallL,WallR,0,-1]);
					}									
				}
			}

			if ((typeof bveUGObjArr[i][9] != 'undefined') && (typeof bveUGObjArr[i][10] != 'undefined'))  { 
				if ((bveUGObjArr[i][9] != '') || (bveUGObjArr[i][10] != '')) {
					var WallL = bveUGObjArr[i][9].replace(/[/]/g,'\\');
					var WallR = bveUGObjArr[i][10].replace(/[/]/g,'\\');
					var add = true;
					for (j=0;j<Wall.length;j++) {
						if (Wall[j][0] == WallL && Wall[j][1] == WallR) {
							add = false;
							break;
						}
					}
					if (add) {
						Wall.push([WallL,WallR,0,-1]);
					}									
				
				}
			}

			if ((typeof bveUGObjArr[i][12] != 'undefined') && (typeof bveUGObjArr[i][13] != 'undefined'))  { 
				if ((bveUGObjArr[i][12] != '') || (bveUGObjArr[i][13] != '')) {
					var WallL = bveUGObjArr[i][12].replace(/[/]/g,'\\');
					var WallR = bveUGObjArr[i][13].replace(/[/]/g,'\\');
					var add = true;
					for (j=0;j<Wall.length;j++) {
						if (Wall[j][0] == WallL && Wall[j][1] == WallR) {
							add = false;
							break;
						}
					}
					if (add) {
						Wall.push([WallL,WallR,0,-1]);
					}									
				}
			}
		} 			
	}
	catch(err) {
		teks += "[Error] : error in creating underground list." + "\n" + err.message + ". \n";
	}	
 */
 	try {
		// ['2','LeftRight1','Left Right 1','cut03.png','seto_down/dike/diker.csv','seto_down/dike/dikel.csv']
		var CutL = [];
		var CutR = [];
		for (var i=0; i < bvecutObjArr.length; i++) {
			if ((typeof bvecutObjArr[i][4] != 'undefined') && (typeof bvecutObjArr[i][5] != 'undefined'))  { 
				if ((bvecutObjArr[i][4] != '') || (bvecutObjArr[i][5] != '')) {
					var xfileL = bvecutObjArr[i][4].replace(/[/]/g,'\\');
					var xfileR = bvecutObjArr[i][5].replace(/[/]/g,'\\');
					
					if (CutL.length == 0) {
						structure['CutL_'+i] = [xfileL,0,'cut',bvecutObjArr[i][8]];
						CutL.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<CutL.length;j++) {
							if (CutL[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['CutL_'+i] = [xfileL,0,'cut',bvecutObjArr[i][8]];
							CutL.push(xfileL);
						}
					}
					
					if (CutR.length == 0) {
						structure['CutR_'+i] = [xfileR,0,'cut',bvecutObjArr[i][8]];
						CutR.push(xfileR);
					} else {
						var cek = true;
						for (j=0;j<CutR.length;j++) {
							if (CutR[j] == xfileR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['CutR_'+i] = [xfileR,0,'cut',bvecutObjArr[i][8]];
							CutR.push(xfileR);
						}
					}									
				}
			}		

		}  		
	}
	catch(err) {
		teks += "[Error] : error in creating hill cut list." + "\n" + err.message + ". \n";
	}
	
	try {
		var crackL = [];
		var crackR = [];
		for (i = 0; i < bvecrackObjArr.length; i++) {	
			if ((typeof bvecrackObjArr[i][4] != 'undefined') && (typeof bvecrackObjArr[i][5] != 'undefined'))  { 
				if ((bvecrackObjArr[i][4] != '') || (bvecrackObjArr[i][5] != '')) {
					var xfileL = bvecrackObjArr[i][4].replace(/[/]/g,'\\');
					var xfileR = bvecrackObjArr[i][5].replace(/[/]/g,'\\');
					
					if (crackL.length == 0) {
						structure['crackL_'+i] = [xfileL,0,'crack',bvecrackObjArr[i][8]];
						crackL.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<crackL.length;j++) {
							if (crackL[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['crackL_'+i] = [xfileL,0,'crack',bvecrackObjArr[i][8]];
							crackL.push(xfileL);
						}
					}
					
					if (crackR.length == 0) {
						structure['crackR_'+i] = [xfileR,0,'crack',bvecrackObjArr[i][8]];
						crackR.push(xfileR);
					} else {
						var cek = true;
						for (j=0;j<crackR.length;j++) {
							if (crackR[j] == xfileR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['crackR_'+i] = [xfileR,0,'crack',bvecrackObjArr[i][8]];
							crackR.push(xfileR);
						}
					}
														
				}
			}		

		}		
	}
	catch(err) {
		teks += "[Error] : error in creating crack list." + "\n" + err.message + ". \n";
	}	
	
	try {
		var Pole5 = [];
		for (i = 0; i < bvepoleObjArr.length; i++) {
			if ((typeof bvepoleObjArr[i][4] != 'undefined'))  { 
				if ((bvepoleObjArr[i][4] != '')) {
					var xfileL = bvepoleObjArr[i][4].replace(/[/]/g,'\\');
					
					if (Pole5.length == 0) {
						structure['Pole_'+i] = [xfileL,0,'pole',bvepoleObjArr[i][5]];
						Pole5.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<Pole5.length;j++) {
							if (Pole5[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['Pole_'+i] = [xfileL,0,'pole',bvepoleObjArr[i][5]];
							Pole5.push(xfileL);
						}
					}
										
				}
			}
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating pole list." + "\n" + err.message + ". \n";
	}	

	try {
		//0~3 ['4','middleFormwR','Middle with Roof','middlepform.png',
		//4~7 'forml.csv','formcls.csv','formcrs.csv','formr.csv',
		//8~11 'roofl.csv','roofcl.csv','roofcr.csv','roofr.csv']
		var FormL = [];
		var FormCL = [];
		var FormCR = [];
		var FormR = [];
		
		var RoofL = [];
		var RoofCL = [];
		var RoofCR = [];
		var RoofR = [];
					
		for (var i=0; i < bveplatformObjArr.length; i++) {
			if (typeof bveplatformObjArr[i][4] != 'undefined') { 
				if (bveplatformObjArr[i][4] != '') {
					var xfileL = bveplatformObjArr[i][4].replace(/[/]/g,'\\');	
					if (FormL.length == 0) {
						structure['FormL_'+i] = [xfileL,0,'form',bveplatformObjArr[i][12]];
						FormL.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<FormL.length;j++) {
							if (FormL[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['FormL_'+i] = [xfileL,0,'form',bveplatformObjArr[i][12]];
							FormL.push(xfileL);
						}
					}					
				}
			}		

			if (typeof bveplatformObjArr[i][5] != 'undefined') { 
				if (bveplatformObjArr[i][5] != '') {
					var xfileCL = bveplatformObjArr[i][5].replace(/[/]/g,'\\');
					if (FormCL.length == 0) {
						structure['FormCL_'+i] = [xfileCL,0,'form',bveplatformObjArr[i][12]];
						FormCL.push(xfileCL);
					} else {
						var cek = true;
						for (j=0;j<FormCL.length;j++) {
							if (FormCL[j] == xfileCL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['FormCL_'+i] = [xfileCL,0,'form',bveplatformObjArr[i][12]];
							FormCL.push(xfileCL);
						}
					}									
				}
			}		

			if (typeof bveplatformObjArr[i][6] != 'undefined') { 
				if (bveplatformObjArr[i][6] != '') {
					var xfileCR = bveplatformObjArr[i][6].replace(/[/]/g,'\\');
					if (FormCR.length == 0) {
						structure['FormCR_'+i] = [xfileCR,0,'form',bveplatformObjArr[i][12]];
						FormCR.push(xfileCR);
					} else {
						var cek = true;
						for (j=0;j<FormCR.length;j++) {
							if (FormCR[j] == xfileCR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['FormCR_'+i] = [xfileCR,0,'form',bveplatformObjArr[i][12]];
							FormCR.push(xfileCR);
						}
					}					
				}
			}		

			if (typeof bveplatformObjArr[i][7] != 'undefined')  { 
				if (bveplatformObjArr[i][7] != '') {
					var xfileR = bveplatformObjArr[i][7].replace(/[/]/g,'\\');	
					if (FormR.length == 0) {
						structure['FormR_'+i] = [xfileR,0,'form',bveplatformObjArr[i][12]];
						FormR.push(xfileR);
					} else {
						var cek = true;
						for (j=0;j<FormR.length;j++) {
							if (FormR[j] == xfileR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['FormR_'+i] = [xfileR,0,'form',bveplatformObjArr[i][12]];
							FormR.push(xfileR);
						}
					}					
				}
			}	

			if (typeof bveplatformObjArr[i][8] != 'undefined') { 
				if (bveplatformObjArr[i][8] != '') {
					var xfileL = bveplatformObjArr[i][8].replace(/[/]/g,'\\');	
					if (RoofL.length == 0) {
						structure['RoofL_'+i] = [xfileL,0,'roof',bveplatformObjArr[i][12]];
						RoofL.push(xfileL);
					} else {
						var cek = true;
						for (j=0;j<RoofL.length;j++) {
							if (RoofL[j] == xfileL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['RoofL_'+i] = [xfileL,0,'roof',bveplatformObjArr[i][12]];
							RoofL.push(xfileL);
						}
					}
					
				}
			}		
			
			if (typeof bveplatformObjArr[i][9] != 'undefined') { 
				if (bveplatformObjArr[i][9] != '') {
					var xfileCL = bveplatformObjArr[i][9].replace(/[/]/g,'\\');
					if (RoofCL.length == 0) {
						structure['RoofCL_'+i] = [xfileCL,0,'roof',bveplatformObjArr[i][12]];
						RoofCL.push(xfileCL);
					} else {
						var cek = true;
						for (j=0;j<RoofCL.length;j++) {
							if (RoofCL[j] == xfileCL) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['RoofCL_'+i] = [xfileCL,0,'roof',bveplatformObjArr[i][12]];
							RoofCL.push(xfileCL);
						}
					}
					
				}
			}		
			
			if (typeof bveplatformObjArr[i][10] != 'undefined') { 
				if (bveplatformObjArr[i][10] != '') {
					var xfileCR = bveplatformObjArr[i][10].replace(/[/]/g,'\\');		
					if (RoofCR.length == 0) {
						structure['RoofCR_'+i] = [xfileCR,0,'roof',bveplatformObjArr[i][12]];
						RoofCR.push(xfileCR);
					} else {
						var cek = true;
						for (j=0;j<RoofCR.length;j++) {
							if (RoofCR[j] == xfileCR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['RoofCR_'+i] = [xfileCR,0,'roof',bveplatformObjArr[i][12]];
							RoofCR.push(xfileCR);
						}
					}					
				}
			}		
			
			if (typeof bveplatformObjArr[i][11] != 'undefined')  { 
				if (bveplatformObjArr[i][11] != '') {
					var xfileR = bveplatformObjArr[i][11].replace(/[/]/g,'\\');
					if (RoofR.length == 0) {
						structure['RoofR_'+i] = [xfileR,0,'roof',bveplatformObjArr[i][12]];
						RoofR.push(xfileR);
					} else {
						var cek = true;
						for (j=0;j<RoofR.length;j++) {
							if (RoofR[j] == xfileR) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['RoofR_'+i] = [xfileR,0,'roof',bveplatformObjArr[i][12]];
							RoofR.push(xfileR);
						}
					}					
				}
			}		
			
		}	
		
	}
	catch(err) {
		teks += "[Error] : error in creating platform list." + "\n" + err.message + ". \n";
	}

			
	
	try {
		for (i = 0; i < bvebveStrOjArr.length; i++) {
			if (bvebveStrOjArr[i][3] == 'Wall') {
				if ((typeof bvebveStrOjArr[i][6] != 'undefined') && (typeof bvebveStrOjArr[i][7] != 'undefined'))  { 
					if ((bvebveStrOjArr[i][6] != '') || bvebveStrOjArr([i][7] != '')) {
						var xfileL = bvebveStrOjArr[i][6].replace(/[/]/g,'\\');
						var xfileR = bvebveStrOjArr[i][7].replace(/[/]/g,'\\');
						
						if (WallL.length == 0) {
							structure['WallL_'+i] = [xfileL,0,bvebveStrOjArr[i][3],0];
							WallL.push(xfileL);
						} else {
							var cek = true;
							for (j=0;j<WallL.length;j++) {
								if (WallL[j] == xfileL) {
									cek = false;
									break;
								}
							}
							if (cek) {
								structure['WallL_'+i] = [xfileL,0,bvebveStrOjArr[i][3],0];
								WallL.push(xfileL);
							}
						}
						
						if (WallR.length == 0) {
							structure['WallR_'+i] = [xfileR,0,bvebveStrOjArr[i][3],0];
							WallR.push(xfileR);
						} else {
							var cek = true;
							for (j=0;j<WallR.length;j++) {
								if (WallR[j] == xfileR) {
									cek = false;
									break;
								}
							}
							if (cek) {
								structure['WallR_'+i] = [xfileR,0,bvebveStrOjArr[i][3],0];
								WallR.push(xfileR);
							}
						}									
					}
				}
			}		
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating wallL and wallR list." + "\n" + err.message + ". \n";
	}	
	FoO = [];
	var snd3d = [];
	try {
		//['1','rcD1','Road crossing D 1','toolbar.png','tollbardl.csv','crossingd.csv','tollbardr.csv']
		for (var i=0; i < bveRCObjArr.length; i++) {
			if (typeof bveRCObjArr[i][4] != 'undefined') {
				if (bveRCObjArr[i][4] != '') {
					var xfile = bveRCObjArr[i][4].replace(/[/]/g,'\\');
					
					if (FoO.length == 0) {
						structure['Rc0_'+i] = [xfile,0,'rc',0];
						FoO.push(xfile);
					} else {
						var cek = true;
						for (j=0;j<FoO.length;j++) {
							if (FoO[j] == xfile) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['Rc0_'+i] = [xfile,0,'rc',0];
							FoO.push(xfile);
						}
					} 							
				}									
			}
			if (typeof bveRCObjArr[i][5] != 'undefined') {
				if (bveRCObjArr[i][5] != '') {
					var xfile = bveRCObjArr[i][5].replace(/[/]/g,'\\');
					
					if (FoO.length == 0) {
						structure['Rc1_'+i] = [xfile,0,'rc',0];
						FoO.push(xfile);
					} else {
						var cek = true;
						for (j=0;j<FoO.length;j++) {
							if (FoO[j] == xfile) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['Rc1_'+i] = [xfile,0,'rc',0];
							FoO.push(xfile);
						}
					} 							
				}									
			}
			if (typeof bveRCObjArr[i][6] != 'undefined') {
				if (bveRCObjArr[i][6] != '') {
					var xfile = bveRCObjArr[i][6].replace(/[/]/g,'\\');
					
					if (FoO.length == 0) {
						structure['Rc2_'+i] = [xfile,0,'rc',0];
						FoO.push(xfile);
					} else {
						var cek = true;
						for (j=0;j<FoO.length;j++) {
							if (FoO[j] == xfile) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure['Rc2_'+i] = [xfile,0,'rc',0];
							FoO.push(xfile);
						}
					} 							
							
				}									
			}		
			if (typeof bveRCObjArr[i][7] != 'undefined') {
				if (bveRCObjArr[i][7] != '') {
					var xfile = bveRCObjArr[i][7].replace(/[/]/g,'\\');
					
					if (snd3d.length == 0) {
						sound3d['Rc4_'+i] = [xfile,0,'rc',0];
						snd3d.push(xfile);
					} else {
						var cek = true;
						for (j=0;j<snd3d.length;j++) {
							if (snd3d[j] == xfile) {
								cek = false;
								break;
							}
						}
						if (cek) {
							sound3d['Rc4_'+i] = [xfile,0,'rc',0];
							snd3d.push(xfile);
						}
					} 							
							
				}									
			}		
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating road crossing list." + "\n" + err.message + ". \n";
	} 
  	FoO = [];
	try {
		for (i = 0; i < bvefreeObjArr.length; i++) {
			if (typeof bvefreeObjArr[i][5] != 'undefined') {
				if (bvefreeObjArr[i][5] != '') {
					var xfile = bvefreeObjArr[i][5].replace(/[/]/g,'\\');
					
					if (FoO.length == 0) {
						structure[bvefreeObjArr[i][1]] = [xfile,0,bvefreeObjArr[i][3],0];
						FoO.push(xfile);
					} else {
						var cek = true;
						for (j=0;j<FoO.length;j++) {
							if (FoO[j] == xfile) {
								cek = false;
								break;
							}
						}
						if (cek) {
							structure[bvefreeObjArr[i][1]] = [xfile,0,bvefreeObjArr[i][3],0];
							FoO.push(xfile);
						}
					}							
				}									
			}		
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating FreeObj list." + "\n" + err.message + ". \n";
	}
	
	var snd = [];
	try {
		for (i = 0; i < bveaudioObjArr.length; i++) {
			if (typeof bveaudioObjArr[i][4] != 'undefined') {
				if (bveaudioObjArr[i][4] != '') {
					var xfile = bveaudioObjArr[i][4].replace(/[/]/g,'\\');
					
					if (bveaudioObjArr[i][3] == 'Dopler') {
						if (snd3d.length == 0) {
							sound3d['Wav_'+i] = [xfile,0,'wav',0];
							snd3d.push(xfile);
						} else {
							var cek = true;
							for (j=0;j<snd3d.length;j++) {
								if (snd3d[j] == xfile) {
									cek = false;
									break;
								}
							}
							if (cek) {
								sound3d['Wav_'+i] = [xfile,0,'wav',0];
								snd3d.push(xfile);
							}
						} 					
					} else {
					
						if (snd.length == 0) {
							sound['Wav_'+i] = [xfile,0,'wav',0];
							snd.push(xfile);
							//if (bveaudioObjArr[i][3] == 'JointNoise' && typeof joinkey =='undefined') {
							//	joinkey ='Wav_'+i;
							//}					
							//if (bveaudioObjArr[i][3] == 'FlangeNoise' && typeof flangekey =='undefined') {
							//	flangekey ='Wav_'+i;
							//}							
						} else {
							var cek = true;
							for (j=0;j<snd.length;j++) {
								if (snd[j] == xfile) {
									cek = false;
									break;
								}
							}
							if (cek) {
								sound['Wav_'+i] = [xfile,0,'wav',0];
								snd.push(xfile);
								//if (bveaudioObjArr[i][3] == 'JointNoise' && typeof joinkey =='undefined') {
								//	joinkey ='Wav_'+i;
								//}					
								//if (bveaudioObjArr[i][3] == 'FlangeNoise' && typeof flangekey =='undefined') {
								//	flangekey ='Wav_'+i;
								//}								
							}
						} 					
					
					}
							
				}									
			}		
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating Audio list." + "\n" + err.message + ". \n";
	}
	
	
	var polyL = MapToolbar.features['lineTab'][pid];
	var allPoints = polyL.getPath().getArray();

	if (typeof polyL == 'undefined') {
		alert('unknown line (' + pid + '). BVE route building terminated by system');
		return false;
	}

	var persen = 0;
	var distance = 0;

	//main data conversion logic
	for (var i = 0; i < allPoints.length; i++)   { 
		var x = getTrackDistanceFromStart(pid,i);  //distance { 'Lpoly' : Lpoly, 'LwCurve' : LwCurve, 'LwPitch' : LwPitch}	
		var currX = x.LwPitch; 
	
		//bdata: {height:'',railindex:'',pitch:'',curve:'',tcurve:''},
	
		if (polyL.markers.getAt(i).sline != '') {
			ProcessSLine5(polyL.markers.getAt(i).sline, Math.round(currX),stIdx,edIdx,i,gauge);		
		}	
				
		//try {
			if (polyL.markers.getAt(i).bdata.tcurve != '') {
				if (i >= stIdx && i <= edIdx) {
					var tPoly = MapToolbar.features['tcurveTab'][polyL.markers.getAt(i).bdata.tcurve];			
					var tL = tPoly.TL;
					var cL = tPoly.Lc + 2*tPoly.Ls;
					var Rc = tPoly.Rc;
					var dir = (Rc < 0)? -1 : 1;
					var cant = dir * (tPoly.cant/1000);
					var Vd = tPoly.Vd;
					var forceSL = tPoly.forceSL;
					var Crailindex = tPoly.railindex;
					
					var railLx,railRx,railbaseX,ohwireX;
					var railLkey,railRkey,railbasekey,ohwirekey;
					
					//for (i = 0; i < bverailobjArr.length; i++) {
						//if (bverailobjArr[i][1] == tPoly.railindex) {
							railbaseX = bverailobjArr[Crailindex][6].replace(/[/]/g,'\\');
							railLx = bverailobjArr[Crailindex][12].replace(/[/]/g,'\\');
							railRx = bverailobjArr[Crailindex][13].replace(/[/]/g,'\\');
							ohwireX = bverailobjArr[Crailindex][14].replace(/[/]/g,'\\');
							//break;
						//}
					//}
					
					for (key in structure) {
						//if (structure[key][0] == railbaseX) {
						//	railbasekey = key;
						//	structure[key][1]++;
						//}
						if (structure[key][0] == railLx) {
							railLkey = key;
							structure[key][1]++;
						}
						if (structure[key][0] == railRx) {
							railRkey = key;
							structure[key][1]++;
						}
						//if (structure[key][0] == ohwireX) {
						//	ohwirekey = key;
						//	structure[key][1]++;
						//}
					}					
					

					currX -= tL;
				
					for (var ci=0; ci < tPoly.markers.getLength(); ci++) {
						if (ci != 2) {
							var cX = currX + tPoly.markers.getAt(ci).ld;
						
							if (ci == 0) { //transition start
						
								var tmpTxt = '\tCurve.BeginTransition();\n\tStructure[\'sign_m_curve\'].Put(0, -2.4, 0.5, 0, 0, 0, 0, 0, 0);\n';
								structure['sign_m_curve'][1]++;
								
								if (forceSL == true) {
									tmpTxt += '\tSpeedLimit.Begin(' + Vd + ');\n';
									
									tmpTxt += speedlimitSign(Vd); //speedlimit sign
									
								}

								mainTrkArr.push([Math.round(cX),tmpTxt]);
								
							} else if (ci == 1) {	//transition end			
								var tmpTxt = '\tCurve.End();\n';
							
								if (forceSL == true) {
									tmpTxt += '\tSpeedLimit.End();\n';
									tmpTxt += '\tStructure[\'sign_spl_pole\'].Put(0, -2.5, -0.2, 0, 0, 0, 0, 0, 0);\n'; //speedlimit end sign
									tmpTxt += '\tStructure[\'sign_spl_End\'].Put(0, -2.5, -0.2, 0, 0, 0, 0, 0, 0);\n'; //speedlimit end sign
									structure['sign_spl_pole'][1]++;
									structure['sign_spl_End'][1]++;									
								}

								mainTrkArr.push([Math.round(cX),tmpTxt]);
							
							} else if (ci == 3) { // circular start
								var tmpTxt = '\tCurve.BeginCircular(' + Rc + ',' + cant+');\n';

								//tmpTxt += '   .RailType 0;' + Crailindex;
								tmpTxt += '\tRepeater[\'railL_0\'].Begin0(0, 3, 5, 5,\''+railLkey+'\');\n';
								tmpTxt += '\tRepeater[\'railR_0\'].Begin0(0, 3, 5, 5,\''+railRkey+'\');\n';

								for (p = 0; p < paralellTrack.length; p++) {
									//tmpTxt += ',.RailType ' + paralellTrack[p][0] + ';' + Crailindex;  													
									tmpTxt += '\tRepeater[\'railL_' + paralellTrack[p][0] + '\'].Begin0(' + paralellTrack[p][0] + ', 3, 5, 5,\''+railLkey+'\');\n';
									tmpTxt += '\tRepeater[\'railR_' + paralellTrack[p][0] + '\'].Begin0(' + paralellTrack[p][0] + ', 3, 5, 5,\''+railRkey+'\');\n';
								}
								mainTrkArr.push([Math.round(cX),tmpTxt]);
								
							} else if (ci == 4) { // circular end
								var tmpTxt = '\tCurve.BeginTransition();\n ';
							
								tmpTxt += '\tRepeater[\'railL_0\'].Begin0(0, 3, 5, 5,\''+defaultrailLkey+'\');\n';
								tmpTxt += '\tRepeater[\'railR_0\'].Begin0(0, 3, 5, 5,\''+defaultrailRkey+'\');\n';
								
								for (p = 0; p < paralellTrack.length; p++) {
									tmpTxt += '\tRepeater[\'railL_' + paralellTrack[p][0] + '\'].Begin0(' + paralellTrack[p][0] + ', 3, 5, 5,\''+defaultrailLkey+'\');\n';
									tmpTxt += '\tRepeater[\'railR_' + paralellTrack[p][0] + '\'].Begin0(' + paralellTrack[p][0] + ', 3, 5, 5,\''+defaultrailRkey+'\');\n';
								}

								mainTrkArr.push([Math.round(cX),tmpTxt]);
								//Rail[Crailindex][1]++;
							}
						
							// ######### data on point start ##########

							if ($.isNumeric(tPoly.markers.getAt(ci).bdata.height) || $.isNumeric(tPoly.markers.getAt(ci).bdata.pitch)){
								ProcessbData5(tPoly.markers.getAt(ci).bdata, Math.round(cX));
							}	
				
							if (tPoly.markers.getAt(ci).note != ''){
								noteTrkArr.push([ Math.round(cX),tPoly.markers.getAt(ci).note]);
							}
				
							//kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''},
							if (tPoly.markers.getAt(ci).kdata.bridge != '' || tPoly.markers.getAt(ci).kdata.overbridge != '' || tPoly.markers.getAt(ci).kdata.river != '' || tPoly.markers.getAt(ci).kdata.ground != '' || tPoly.markers.getAt(ci).kdata.flyover != '' || tPoly.markers.getAt(ci).kdata.tunnel != '' || tPoly.markers.getAt(ci).kdata.pole != '' || tPoly.markers.getAt(ci).kdata.dike != '' || tPoly.markers.getAt(ci).kdata.cut != '' || tPoly.markers.getAt(ci).kdata.underground != '' || tPoly.markers.getAt(ci).kdata.form != '' || tPoly.markers.getAt(ci).kdata.roadcross != '' || tPoly.markers.getAt(ci).kdata.crack != '' || tPoly.markers.getAt(ci).kdata.beacon != ''){  			
								ProcesskData5(tPoly.markers.getAt(ci).kdata,Math.round(cX),polyL.markers.getAt(i).bdata.curve,ci,stsign,maxspeed);
							}			
							// ######### data on point end ##########					
						}
					}					
				}					
			} else if (polyL.markers.getAt(i).bdata.curve != '') {
			// ************ on curve section ************
				if (i >= stIdx && i <= edIdx) {
					var cPoly = MapToolbar.features['curveTab'][polyL.markers.getAt(i).bdata.curve];			
					var tL = cPoly.Lt;
					var cL = cPoly.Lc;
					var Rc = cPoly.Rc;
					var dir = (Rc < 0)? -1 : 1;
					var cant = dir * (cPoly.cant/1000);
					var Vd = cPoly.Vd;
					var forceSL = cPoly.forceSL;
					var Crailindex = cPoly.railindex;
					
					var railLx,railRx,railbaseX,ohwireX;
					var railLkey,railRkey,railbasekey,ohwirekey;
					
					//for (i = 0; i < bverailobjArr.length; i++) {
						//if (bverailobjArr[i][1] == cPoly.railindex) {
							railbaseX = bverailobjArr[Crailindex][6].replace(/[/]/g,'\\');
							railLx = bverailobjArr[Crailindex][12].replace(/[/]/g,'\\');
							railRx = bverailobjArr[Crailindex][13].replace(/[/]/g,'\\');
							ohwireX = bverailobjArr[Crailindex][14].replace(/[/]/g,'\\');
							//break;
						//}
					//}
					
					for (key in structure) {
						//if (structure[key][0] == railbaseX) {
						//	railbasekey = key;
						//	structure[key][1]++;
						//}
						if (structure[key][0] == railLx) {
							railLkey = key;
							structure[key][1]++;
						}
						if (structure[key][0] == railRx) {
							railRkey = key;
							structure[key][1]++;
						}
						//if (structure[key][0] == ohwireX) {
						//	ohwirekey = key;
						//	structure[key][1]++;
						//}
					}				
					currX -= tL;
				
					for (var ci=0; ci < cPoly.markers.getLength(); ci++) {
						if (ci != 2) {
							var cX = currX + cPoly.markers.getAt(ci).ld;
						
							if (ci == 0) {
						
								var tmpTxt = '\tLegacy.Curve(' + Rc + ',' + cant+');\n\tStructure[\'sign_m_curve\'].Put(0, -2.4, 0.5, 0, 0, 0, 0, 0, 0);\n';
								structure['sign_m_curve'][1]++;
							
								if (forceSL == true) {
									tmpTxt += '\tSpeedLimit.Begin(' + Vd + ');\n';
									
									tmpTxt += speedlimitSign(Vd); //speedlimit sign
								}
								//tmpTxt += '   .RailType 0;' + Crailindex;
								tmpTxt += '\tRepeater[\'railL_0\'].Begin0(0, 3, 5, 5,\''+railLkey+'\');\n';
								tmpTxt += '\tRepeater[\'railR_0\'].Begin0(0, 3, 5, 5,\''+railRkey+'\');\n';

								for (p = 0; p < paralellTrack.length; p++) {
									//tmpTxt += ',.RailType ' + paralellTrack[p][0] + ';' + Crailindex;  													
									tmpTxt += '\tRepeater[\'railL_' + paralellTrack[p][0] + '\'].Begin0(' + paralellTrack[p][0] + ', 3, 5, 5,\''+railLkey+'\');\n';
									tmpTxt += '\tRepeater[\'railR_' + paralellTrack[p][0] + '\'].Begin0(' + paralellTrack[p][0] + ', 3, 5, 5,\''+railRkey+'\');\n';
								}
								mainTrkArr.push([Math.round(cX),tmpTxt]);
								//Rail[Crailindex][1]++;
								
							} else if (ci == 1) {					
								var tmpTxt = 'Legacy.Curve(0,0);\n';
							
								if (forceSL == true) {
									tmpTxt += '\tSpeedLimit.End();\n';
									tmpTxt += '\tStructure[\'sign_spl_pole\'].Put(0, -2.5, -0.2, 0, 0, 0, 0, 0, 0);\n'; //speedlimit end sign
									tmpTxt += '\tStructure[\'sign_spl_End\'].Put(0, -2.5, -0.2, 0, 0, 0, 0, 0, 0);\n'; //speedlimit end sign
									structure['sign_spl_pole'][1]++;
									structure['sign_spl_End'][1]++;
								}
								
								tmpTxt += '\tRepeater[\'railL_0\'].Begin0(0, 3, 5, 5,\''+defaultrailLkey+'\');\n';
								tmpTxt += '\tRepeater[\'railR_0\'].Begin0(0, 3, 5, 5,\''+defaultrailRkey+'\');\n';

								for (p = 0; p < paralellTrack.length; p++) {
									tmpTxt += '\tRepeater[\'railL_' + paralellTrack[p][0] + '\'].Begin0(' + paralellTrack[p][0] + ', 3, 5, 5,\''+defaultrailLkey+'\');\n';
									tmpTxt += '\tRepeater[\'railR_' + paralellTrack[p][0] + '\'].Begin0(' + paralellTrack[p][0] + ', 3, 5, 5,\''+defaultrailRkey+'\');\n';
								}
								mainTrkArr.push([Math.round(cX),tmpTxt]);
							
							} else {
								//
							}
						
							// ######### data on point start ##########

							if ($.isNumeric(cPoly.markers.getAt(ci).bdata.height) || $.isNumeric(cPoly.markers.getAt(ci).bdata.pitch)){
								ProcessbData5(cPoly.markers.getAt(ci).bdata, Math.round(cX));
							}	
				
							if (cPoly.markers.getAt(ci).note != ''){
								noteTrkArr.push([ Math.round(cX),cPoly.markers.getAt(ci).note]);
							}
				
							//kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''},
							if (cPoly.markers.getAt(ci).kdata.bridge != '' || cPoly.markers.getAt(ci).kdata.overbridge != '' || cPoly.markers.getAt(ci).kdata.river != '' || cPoly.markers.getAt(ci).kdata.ground != '' || cPoly.markers.getAt(ci).kdata.flyover != '' || cPoly.markers.getAt(ci).kdata.tunnel != '' || cPoly.markers.getAt(ci).kdata.pole != '' || cPoly.markers.getAt(ci).kdata.dike != '' || cPoly.markers.getAt(ci).kdata.cut != '' || cPoly.markers.getAt(ci).kdata.underground != '' || cPoly.markers.getAt(ci).kdata.form != '' || cPoly.markers.getAt(ci).kdata.roadcross != '' || cPoly.markers.getAt(ci).kdata.crack != '' || cPoly.markers.getAt(ci).kdata.beacon != ''){  			
								ProcesskData5(cPoly.markers.getAt(ci).kdata,Math.round(cX),polyL.markers.getAt(i).bdata.curve,ci,stsign,maxspeed);
							}			
							// ######### data on point end ##########					
						}
					}		
				}
			} else {
				// ************ on straight line section ************	
				if (i > 0 && i < allPoints.length-1) {
					var m0 = polyL.markers.getAt(i-1).getPosition();
					var m1 = polyL.markers.getAt(i).getPosition();
					var m2 = polyL.markers.getAt(i+1).getPosition();
					var h1 = google.maps.geometry.spherical.computeHeading(m0,m1);
					var h2 = google.maps.geometry.spherical.computeHeading(m1,m2);
					var fic = intersection_angle(h1,h2);
					var intAngleDeg = fic.angle;
					var dir = fic.direction;
					var delta = 180 - intAngleDeg;
					var ratio = dir * Math.tan(delta.toRad());
					turnTxt5(ratio,currX);
				}


				if (i >= stIdx && i <= edIdx) {
					if (i == stIdx) {
						var tmpTxt = '\tCurve.Gauge('+gauge+');;\n';
						tmpTxt += '\tIrregularity.Change(0.002009509, 0.001255943, 0.0007912442, 50, 50, 50);\n';
						tmpTxt += '\tRepeater[\'railbase_0\'].Begin(0, 0, 0, 0, 0, 0, 0, 3, 5, 5,\'' + defaultrailbasekey + '\');\n';
						tmpTxt += '\tRepeater[\'railL_0\'].Begin(0, 0, 0, 0, 0, 0, 0, 3, 5, 5,\'' + defaultrailLkey + '\');\n';
						tmpTxt += '\tRepeater[\'railR_0\'].Begin(0, 0, 0, 0, 0, 0, 0, 3, 5, 5,\'' + defaultrailRkey + '\');\n';
						tmpTxt += '\tRepeater[\'ohwire_0\'].Begin(0, 0, 0, 0, 0, 0, 0, 0, 25, 25,\'' + defaultohwirekey + '\');\n';
						//tmpTxt += '\tRollingNoise.Change(0);\n';
						//tmpTxt += '\tFlangeNoise.Change(0);\n';
						tmpTxt += '\tAdhesion.Change (0.351, 0, 0.009496677);\n';
						tmpTxt += '\tFog.Set(0.0004, 0.875, 0.9375, 1);\n';
						
						var bGkey;
						
						if (bg != '') { 
							bGkey = bg; 
							structure[bGkey][1]++;
						}
						if (typeof bGkey != 'undefined') {
							tmpTxt += '\tBackground.Change(\'' + bGkey + '\');\n';
						}
						
						var iGx,iGkey;
						//choose 1st ground
						for (i = 0; i < bvebveStrOjArr.length; i++) {
							if (bvebveStrOjArr[i][3] == 'Ground') {
								iGx = bvebveStrOjArr[i][5].replace(/[/]/g,'\\');
								break;
							}
						}
						
						for (key in structure) {
							if (structure[key][0] == iGx) {
								iGkey = key;
								structure[key][1]++;
								break;
							}
						}	

						if (typeof iGkey != 'undefined') {
							tmpTxt += '\tRepeater[\'Ground\'].Begin(, 0, -0.45, 0, 0, 0, 0, 1, 25, 25,\'' + iGkey + '\');\n';
						}	
						
						noteTrkArr.push([Math.round(currX),'# Irregularity.Change(0.0008, 0.0005, 0.000315, 50, 50, 50); # Track.Accuracy(0) perfect accuracy (no inaccuracy at all)\n']);						
						noteTrkArr.push([Math.round(currX),'# Irregularity.Change(0.001267915, 0.0007924467, 0.0004992414, 50, 50, 50); # Track.Accuracy(1) very good accuracy (high speed lines)\n']);						
						noteTrkArr.push([Math.round(currX),'# Irregularity.Change(0.002009509, 0.001255943, 0.0007912442, 50, 50, 50); # Track.Accuracy(2) means good accuracy (default for conventional line)\n']);						
						noteTrkArr.push([Math.round(currX),'# Irregularity.Change(0.003184857, 0.001990536, 0.001254038, 50, 50, 50); # Track.Accuracy(3) mediocre accuracy\n']);						
						noteTrkArr.push([Math.round(currX),'# Irregularity.Change(0.005047659, 0.003154787, 0.001987516, 50, 50, 50); # Track.Accuracy(4) poor accuracy\n']);						
						noteTrkArr.push([Math.round(currX),'# Adhesion.Change (0.35, 0, 0.01); # the train will not be able to move at all\n']);						
						noteTrkArr.push([Math.round(currX),'# Adhesion.Change (0.351, 0, 0.009496677); # Track.Adhesion(135) Drying\n']);						
						noteTrkArr.push([Math.round(currX),'# Adhesion.Change (0.2418, 0, 0.0137855); # Track.Adhesion(93) Wet\n']);						
						noteTrkArr.push([Math.round(currX),'# Adhesion.Change (0.221, 0, 0.01508296); # Track.Adhesion(85) Frost\n']);						
						noteTrkArr.push([Math.round(currX),'# Adhesion.Change (0.13, 0, 0.02564103); # Track.Adhesion(50) Snow\n']);						

						//mainTrkArr.push([Math.round(currX),';']);
						mainTrkArr.push([Math.round(currX),tmpTxt]);

				
					} else if (i == edIdx) {
						var crX = Math.round(currX/25)*25;
						mainTrkArr.push([crX,'']);
						if (kmstone) { stoneMark5(crX); }
						noteTrkArr.push([crX,'************ End of Track ************']);
				
					} else {
			
					}	
					
					// ######### data on point start ##########

					if ($.isNumeric(polyL.markers.getAt(i).bdata.height) || polyL.markers.getAt(i).bdata.railindex != '' || $.isNumeric(polyL.markers.getAt(i).bdata.pitch)){
						ProcessbData5(polyL.markers.getAt(i).bdata, Math.round(currX));
					}	
				
					if (polyL.markers.getAt(i).note != ''){
						noteTrkArr.push([ Math.round(currX),polyL.markers.getAt(i).note]);
					}
				
					//kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''},
					if (polyL.markers.getAt(i).kdata.bridge != '' || polyL.markers.getAt(i).kdata.overbridge != '' || polyL.markers.getAt(i).kdata.river != '' || polyL.markers.getAt(i).kdata.ground != '' || polyL.markers.getAt(i).kdata.flyover != '' || polyL.markers.getAt(i).kdata.tunnel != '' || polyL.markers.getAt(i).kdata.pole != '' || polyL.markers.getAt(i).kdata.dike != '' || polyL.markers.getAt(i).kdata.cut != '' || polyL.markers.getAt(i).kdata.underground != '' || polyL.markers.getAt(i).kdata.form != '' || polyL.markers.getAt(i).kdata.roadcross != '' || polyL.markers.getAt(i).kdata.crack != '' || polyL.markers.getAt(i).kdata.beacon != ''){  			
						ProcesskData5(polyL.markers.getAt(i).kdata,Math.round(currX),pid,i,stsign,maxspeed);
					}			
					// ######### data on point end ##########
				}
			
			}
			
		//}
		//catch(err) {
		//	teks += "[Error] : error in creating track at distance " + Math.round(currX) + "\n" + err.message + ". \n";
		//}		
 	    
		persen = Math.round(((i+1)/allPoints.length)*100);
		$( "#progressbarBuildBVE4O" ).progressbar({
			value: persen
		});
  	
	} 


	var tmpTrkStrArr = [];
	//array sorting by first key
	for (m = 0; m < mainTrkArr.length; m++) {
		try {
			if (tmpTrkStrArr.length == 0) {
				tmpTrkStrArr.push(mainTrkArr[m]);
			} else {
				if (parseInt(mainTrkArr[m][0]) > parseInt(tmpTrkStrArr[tmpTrkStrArr.length-1][0])) {
					tmpTrkStrArr.push(mainTrkArr[m]);
				} else {
					var inArr = false;
					for (t=0; t < tmpTrkStrArr.length; t++) {
						if (parseInt(mainTrkArr[m][0]) == parseInt(tmpTrkStrArr[t][0])) {
							//.Rail .RailEnd / .Pole .PoleEnd / .Dike  .DikeEnd / .Wall .WallEnd
							/*
							if (((mainTrkArr[m][1].indexOf('.RailEnd') > -1) && (tmpTrkStrArr[t][1].indexOf('.Rail') > -1)) || ((mainTrkArr[m][1].indexOf('.PoleEnd') > -1) && (tmpTrkStrArr[t][1].indexOf('.Pole') > -1)) || ((mainTrkArr[m][1].indexOf('.DikeEnd') > -1) && (tmpTrkStrArr[t][1].indexOf('.Dike') > -1)) || ((mainTrkArr[m][1].indexOf('.WallEnd') > -1) && (tmpTrkStrArr[t][1].indexOf('.Wall') > -1))) {
								tmpTrkStrArr[t][1] = mainTrkArr[m][1] + ';\n' + tmpTrkStrArr[t][1];							
							} else {
								tmpTrkStrArr[t][1] += mainTrkArr[m][1];
							} */	
							tmpTrkStrArr[t][1] += mainTrkArr[m][1];
							inArr = true;
							break;
						}					
					}
					if (!inArr) {
						for (t=1; t < tmpTrkStrArr.length; t++) {
							if ((parseInt(mainTrkArr[m][0]) > parseInt(tmpTrkStrArr[t-1][0])) && (parseInt(mainTrkArr[m][0]) < parseInt(tmpTrkStrArr[t][0]))) {
								tmpTrkStrArr.splice(t-1,0,mainTrkArr[m]);
								break;
							} else if (parseInt(mainTrkArr[m][0]) < parseInt(tmpTrkStrArr[t-1][0])) {
								if (t == 1) {
									tmpTrkStrArr.unshift(mainTrkArr[m]);
									break;
								} else {
									tmpTrkStrArr.splice(t-2,0,mainTrkArr[m]);
									break;
								}							
							}
						}
					}
				}
			}
			
		}
		catch(err) {
			teks += "[Error] : error updating main track item." + "\n" + err.message + ". \n";
		}	
		persen = Math.round((m/mainTrkArr.length-1)*100);
		$( "#progressbarBuildBVE4O" ).progressbar({
		  value: persen
		});
	}
	
	for (s = 0; s < subTrkArr.length; s++) {
		try {
			if (parseInt(subTrkArr[s][0]) > parseInt(tmpTrkStrArr[tmpTrkStrArr.length-1][0])) {
				tmpTrkStrArr.push(subTrkArr[s]);
			} else {
				var inArr = false;
				for (t=0; t < tmpTrkStrArr.length; t++) {
					if (parseInt(subTrkArr[s][0]) == parseInt(tmpTrkStrArr[t][0])) {
						//.Rail .RailEnd / .Pole .PoleEnd / .Dike  .DikeEnd / .Wall .WallEnd
						/*
						if (((subTrkArr[s][1].indexOf('.RailEnd') > -1) && (tmpTrkStrArr[t][1].indexOf('.Rail') > -1)) || ((subTrkArr[s][1].indexOf('.PoleEnd') > -1) && (tmpTrkStrArr[t][1].indexOf('.Pole') > -1)) || ((subTrkArr[s][1].indexOf('.DikeEnd') > -1) && (tmpTrkStrArr[t][1].indexOf('.Dike') > -1)) || ((subTrkArr[s][1].indexOf('.WallEnd') > -1) && (tmpTrkStrArr[t][1].indexOf('.Wall') > -1))) {
							tmpTrkStrArr[t][1] = subTrkArr[s][1] + ';\n' + tmpTrkStrArr[t][1];							
						} else {
							tmpTrkStrArr[t][1] += subTrkArr[s][1];
						} */
						tmpTrkStrArr[t][1] += subTrkArr[s][1];
						inArr = true;
						break;
					}					
				}
				if (!inArr) {
					for (t=1; t < tmpTrkStrArr.length; t++) {
						if ((parseInt(subTrkArr[s][0]) > parseInt(tmpTrkStrArr[t-1][0])) && (parseInt(subTrkArr[s][0]) < parseInt(tmpTrkStrArr[t][0]))) {
							tmpTrkStrArr.splice(t-1,0,subTrkArr[s]);
							break;
						} else if (parseInt(subTrkArr[s][0]) < parseInt(tmpTrkStrArr[t-1][0])) {
							if (t == 1) {
								tmpTrkStrArr.unshift(subTrkArr[s]);
								break;
							} else {
								tmpTrkStrArr.splice(t-2,0,subTrkArr[s]);
								break;
							}							
						}
					}
				}
			}			
		}
		catch(err) {
			teks += "[Error] : error in pre sorting main track." + "\n" + err.message + ". \n";
		}	

		persen = Math.round((s/subTrkArr.length-1)*100);
		$( "#progressbarBuildBVE4O" ).progressbar({
		  value: persen
		});
	}

	try {
		for (n = 0; n < noteTrkArr.length; n++) {
			if (parseInt(noteTrkArr[n][0]) > parseInt(tmpTrkStrArr[tmpTrkStrArr.length-1][0])) {
				tmpTrkStrArr.push([noteTrkArr[n][0], '\t# ' + noteTrkArr[n][1]]);
			} else {
				var inArr = false;
				for (t=0; t < tmpTrkStrArr.length; t++) {
					if (parseInt(noteTrkArr[n][0]) == parseInt(tmpTrkStrArr[t][0])) {
						tmpTrkStrArr[t][1] += '\t# ' + noteTrkArr[n][1];
						inArr = true;
						break;
					}					
				}
				if (!inArr) {
					for (t=1; t < tmpTrkStrArr.length; t++) {
						if ((parseInt(noteTrkArr[n][0]) > parseInt(tmpTrkStrArr[t-1][0])) && (parseInt(noteTrkArr[n][0]) < parseInt(tmpTrkStrArr[t][0]))) {
							tmpTrkStrArr.splice(t-1,0,[noteTrkArr[n][0], '\t# ' + noteTrkArr[n][1]]);
							break;
						} else if (parseInt(noteTrkArr[n][0]) < parseInt(tmpTrkStrArr[t-1][0])) {
							if (t == 1) {
								tmpTrkStrArr.unshift([noteTrkArr[n][0], '\t# ' + noteTrkArr[n][1]]);
								break;
							} else {
								tmpTrkStrArr.splice(t-2,0,[noteTrkArr[n][0], '\t# ' + noteTrkArr[n][1]]);
								break;
							}							
						}
					}
				}
			}
			persen = Math.round((s/subTrkArr.length-1)*100);
			$( "#progressbarBuildBVE4O" ).progressbar({
			  value: persen
			});
		}
		
	}
	catch(err) {
		teks += "[Error] : error in inserting note to distance." + "\n" + err.message + ". \n";
	}	
	
	//final sort if above failed
	var sorted;
	try {
		do {
			sorted = 0;
			for (d = 1; d < tmpTrkStrArr.length; d++) {
				if (parseInt(tmpTrkStrArr[d][0]) < parseInt(tmpTrkStrArr[d-1][0])) {
					var tar0 = tmpTrkStrArr[d];
					tmpTrkStrArr.splice(d,1);
					tmpTrkStrArr.splice(d-1,0,tar0);
				} else {
					sorted++;
				}
			}
			persen = Math.round((sorted/tmpTrkStrArr.length-1)*100);
			$( "#progressbarBuildBVE4O" ).progressbar({
			  value: persen
			});
		} while (sorted < tmpTrkStrArr.length -1);		
	}
	catch(err) {
		teks += "[Error] : error in sorting track section." + "\n" + err.message + ". \n";
	}	

							
	var maptxt = '';
	
	if (tmpTrkStrArr.length > 0) {
		for (t = 0; t < tmpTrkStrArr.length; t++){
			maptxt += tmpTrkStrArr[t][0] + ';\n' + tmpTrkStrArr[t][1] + '\n';
			persen = Math.round((t/tmpTrkStrArr.length-1)*100);
			$( "#progressbarBuildBVE4O" ).progressbar({
			value: persen
			});
		}
	} 

	teks += '<map>\n';
	teks += 'BveTs Map 2.00:UTF-8\n\n';
	teks += 'Structure.Load(\'structures\\structures.txt\');\n';

	teks += 'Signal.Load(\'Signals.txt\');\n';
	teks += 'Signal.SpeedLimit(0, 25, 40, 70, 100, );\n';

	teks += 'Sound.Load(\'sounds.txt\');\n';

	teks += 'Sound3D.Load(\'sounds3d.txt\');\n';

	teks += 'Station.Load(\'stations.txt\');\n';
	
	teks += 'Gauge.Set(' + gauge + ');\n\n\n';
	
	teks += maptxt;
	teks += '</map>\n';
	

	var strtxt = '';
	for (key in structure) {
		if (structure[key] != '') {
			if (structure[key][1] > 0) {
				strtxt += key + ',' + structure[key][0] + '\n';
			}
		}
	}

	var s3dtxt = '';
	for (key in sound3d) {
		if (sound3d[key] != '') {
			if (sound3d[key][1] > 0) {
				s3dtxt += key + ',' + sound3d[key][0] + ',5\n';
			}
		}
	}

	var sndtxt = '';
	for (key in sound) {
		if (sound[key] != '') {
			if (sound[key][1] > 0) {
				sndtxt += key + ',' + sound[key][0] + '\n';
			}
		}
	}

	var statxt = '';
	for (key in station) {
		if (station[key] != '') {
			if (station[key][1] > 0) {
				statxt += key + ',' + station[key][0] + '\n';
			}
		}
	}

	var sgntxt = '';
	for (key in signal) {
		if (signal[key] != '') {
			if (signal[key][1] > 0) {
				sgntxt += key + ',' + signal[key][0] + '\n';
			}
		}
	}

	teks += '<structure>\n';
	teks += 'BveTs Structure List 2.00:UTF-8\n';
	teks += strtxt;
	teks += '</structure>\n';
	
	teks += '<sound3d>\n';
	teks += 'BveTs Sound List 2.00:UTF-8\n';
	teks += s3dtxt;
	teks += '</sound3d>\n';
	
	teks += '<sound>\n';
	teks += 'BveTs Sound List 2.00:UTF-8\n';
	teks += sndtxt;
	teks += '</sound>\n';
	
	teks += '<station>\n';
	teks += 'BveTs Station List 2.00:UTF-8\n';
	teks += statxt;
	teks += '</station>\n';
	
	teks += '<signal>\n';
	teks += 'BveTs Signal Aspects List 2.00:UTF-8\n';
	teks += sgntxt;
	teks += '</signal>\n';
	
	

	teks += '</bve>\n';
	
	$('#fileext').text('.xml');
	$('#buildBVE').val(teks);
}


function ProcessbData5(bdata,currX) {
//bdata: {height:'',railindex:'',pitch:'',curve:''},	
	if ($.isNumeric(bdata.height)) {
		var iGx,iGkey;
		lastheight = (-1*bdata.height);
		for (i = 0; i < bvebveStrOjArr.length; i++) {
			if (bvebveStrOjArr[i][3] == 'Ground') {
				iGx = bvebveStrOjArr[i][5].replace(/[/]/g,'\\');
				break;
			}
		}
		
		for (key in structure) {
			if (structure[key][0] == iGx) {
				iGkey = key;
				structure[key][1]++;
				break;
			}
		}	

		if (typeof iGkey != 'undefined') {
			subTrkArr.push([ currX, '\tRepeater[\'Ground\'].Begin(0, 0, ' + lastheight + ', 0, 0, 0, 0, 1, 25, 25,\'' + iGkey + '\');\n']);
			//subTrkArr.push([ currX, '\tRepeater[\'Ground\'].Begin(0, 0, ' + (-1*bdata.height) + ', 0, 0, 0, 0, 1, 25, 25,);\n']);
		}	
	
		
	}
	
	if ($.isNumeric(bdata.pitch)) {
		var rpit = parseInt(bdata.pitch);
		if (isNaN(rpit)) { alert(bdata.pitch);}
  
		var tmpTxt = '\tLegacy.Pitch(' + rpit + ');\n';
		if (pitchRatio == 0)  { 
			if (rpit < pitchRatio)  { 
				tmpTxt += '\tStructure[\'sign_sloop_down-level\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n'; 	//menurun opp. level 
				structure['sign_sloop_down-level'][1]++;
			} else if (rpit > pitchRatio) { 
				tmpTxt += '\tStructure[\'sign_sloop_up-level\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n';	//mendaki opp. level
				structure['sign_sloop_up-level'][1]++;
			} else {
				// line level ... (^x^)
			}
		} else if (pitchRatio > 0)  {
			if (rpit == 0) {
				tmpTxt += '\tStructure[\'sign_sloop_level-up\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n'; 	//level opp. mendaki
				structure['sign_sloop_level-up'][1]++;
			} else if (rpit > 0) {
				//tmpTxt += '\tStructure[\'sign_sloop_up-up\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n';		//mendaki-mendaki, lain ratio
				//structure['sign_sloop_up-up'][1]++;
				tmpTxt += '\tStructure[\'sign_sloop_up-down\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n';		//mendaki opp. menurun
				structure['sign_sloop_up-down'][1]++;
			} else {
				tmpTxt += '\tStructure[\'sign_sloop_down-up\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n';    //menurun opp. mendaki	
				structure['sign_sloop_down-up'][1]++;
			}
		} else {
			if (rpit == 0) { 
				tmpTxt += '\tStructure[\'sign_sloop_level-down\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n';	//level opp. menurun
				structure['sign_sloop_level-down'][1]++;
			} else if (rpit < 0) {
				//tmpTxt += '\tStructure[\'sign_sloop_down-down\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n';		//menurun-menurun, lain ratio
				//structure['sign_sloop_down-down'][1]++;
				tmpTxt += '\tStructure[\'sign_sloop_down-up\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n';    //menurun opp. mendaki	
				structure['sign_sloop_down-up'][1]++;				
			} else {
				tmpTxt += '\tStructure[\'sign_sloop_up-down\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n';		//mendaki opp. menurun
				structure['sign_sloop_up-down'][1]++;
			}
		}	
		
		pitchRatio = rpit; 
		subTrkArr.push([currX, tmpTxt]);
	}

	if (typeof bdata.railindex != 'undefined') {
		if (bdata.railindex !== '') {
			var railLx,railRx,railbaseX;
			var railLkey,railRkey,railbasekey;
			
			for (i = 0; i < bverailobjArr.length; i++) {
				if (bverailobjArr[i][1] == bdata.railindex) {
					railbaseX = bverailobjArr[i][6].replace(/[/]/g,'\\');
					railLx = bverailobjArr[i][12].replace(/[/]/g,'\\');
					railRx = bverailobjArr[i][13].replace(/[/]/g,'\\');
					break;
				}
			}
			
			for (key in structure) {
				if (structure[key][0] == railbaseX) {
					railbasekey = key;
					structure[key][1]++;
				}
				if (structure[key][0] == railLx) {
					railLkey = key;
					structure[key][1]++;
				}
				if (structure[key][0] == railRx) {
					railRkey = key;
					structure[key][1]++;
				}
			}

			var tmpTxt = '';
			
			tmpTxt += '\tRepeater[\'railL_0\'].Begin0(0, 3, 5, 5,\''+railLkey+'\');\n';
			tmpTxt += '\tRepeater[\'railR_0\'].Begin0(0, 3, 5, 5,\''+railRkey+'\');\n';
			tmpTxt += '\tRepeater[\'railbase_0\'].Begin0(0, 3, 5, 5,\''+railbasekey+'\');\n';
			

			for (p = 0; p < paralellTrack.length; p++) {
				tmpTxt += '\tRepeater[\'railL_' + paralellTrack[p][0] + '\'].Begin0(' + paralellTrack[p][0] + ', 3, 5, 5,\''+railLkey+'\');\n';
				tmpTxt += '\tRepeater[\'railR_' + paralellTrack[p][0] + '\'].Begin0(' + paralellTrack[p][0] + ', 3, 5, 5,\''+railRkey+'\');\n';
				tmpTxt += '\tRepeater[\'railbase_' + paralellTrack[p][0] + '\'].Begin0(' + paralellTrack[p][0] + ', 3, 5, 5,\''+railbasekey+'\');\n';
			}
	
			subTrkArr.push([ currX, tmpTxt]);
				
		}	
	}
	
}

function ProcesskData5(kdata,currX,pid,idx,stsign,maxspeed) {
//kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''},
	var crX = Math.round(currX/25)*25;

	if ( kdata.bridge != '' ) {
		noteTrkArr.push([ crX,'bridge']);
		var arrK = kdata.bridge.split('¤');
		for (k = 0; k < arrK.length; k++) {
			var arrK_1 = arrK[k].split(':');
			if (arrK_1[1] == '0') {
				for (g = 0; g < bvebridgeObjArr.length; g++) {
					if (bvebridgeObjArr[g][1] == arrK_1[0]) {
					
						var bridgeLkey,bridgeRkey,bridgePkey;
						
						var bridgeLx = bvebridgeObjArr[g][4].replace(/[/]/g,'\\');
						var bridgeRx = bvebridgeObjArr[g][5].replace(/[/]/g,'\\');
						var bridgePX = bvebridgeObjArr[g][6].replace(/[/]/g,'\\');
						var pRpt = (parseInt(bvebridgeObjArr[g][7]) > 0)? parseInt(bvebridgeObjArr[g][7]) : 50;			
						var bLen = (parseInt(bvebridgeObjArr[g][8]) > 0)? parseInt(bvebridgeObjArr[g][8]) : 25;
						
						for (key in structure) {
							if (structure[key][0] == bridgeLx) {
								bridgeLkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == bridgeRx) {
								bridgeRkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == bridgePX) {
								bridgePkey = key;
								structure[key][1]++;
							}
						}
						
						var tmpTxt = '';

						//algoritma utk wall type
						if (paralellTrack.length == 0) {
							
							if (typeof bridgeLkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+bridgeLkey+'\'].Begin0(0, 1, '+bLen+', '+bLen+',\''+bridgeLkey+'\');\n';
																
							}
							if (typeof bridgeRkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+bridgeRkey+'\'].Begin0(0, 1, '+bLen+', '+bLen+',\''+bridgeRkey+'\');\n';
								
							}
							
						} else {
							//parallel track, cek trek terkanan atau terkiri
							var leftestIndex = 0; var rightestIndex = 0;
							var leftestX = 0; var rightestX = 0;
							for (pTi = 0; pTi < paralellTrack.length; pTi++) {
								if (paralellTrack[pTi][1] <= leftestX) {
									leftestX = paralellTrack[pTi][1];
									leftestIndex = paralellTrack[pTi][0];
								}
								if (paralellTrack[pTi][1] >= rightestX) {
									rightestX = paralellTrack[pTi][1];
									rightestIndex = paralellTrack[pTi][0];
								}
							}
					
							if (typeof bridgeLkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+bridgeLkey+'\'].Begin0(' + leftestIndex + ', 1, '+bLen+', '+bLen+',\''+bridgeLkey+'\');\n';
																
							}
							if (typeof bridgeRkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+bridgeRkey+'\'].Begin0(' + rightestIndex + ', 1, '+bLen+', '+bLen+',\''+bridgeRkey+'\');\n';
								
							}								
						}
						
						if (typeof bridgePkey != 'undefined') {
							tmpTxt += '\tRepeater[\''+bridgePkey+'\'].Begin0(0, 0, 0, '+pRpt+',\''+bridgePkey+'\');\n';
							
						}	

						tmpTxt += '\tRollingNoise.Change(2);\n';

						subTrkArr.push([crX, tmpTxt]);
						
						break;	
					
					}
				}
  			} else {
				for (g = 0; g < bvebridgeObjArr.length; g++) {
					if (bvebridgeObjArr[g][1] == arrK_1[0]) {
					
						var bridgeLkey,bridgeRkey,bridgePkey;
						
						var bridgeLx = bvebridgeObjArr[g][4].replace(/[/]/g,'\\');
						var bridgeRx = bvebridgeObjArr[g][5].replace(/[/]/g,'\\');
						var bridgePX = bvebridgeObjArr[g][6].replace(/[/]/g,'\\');
						var pRpt = parseInt(bvebridgeObjArr[g][7]);			
						var bLen = parseInt(bvebridgeObjArr[g][8]);
						
						for (key in structure) {
							if (structure[key][0] == bridgeLx) {
								bridgeLkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == bridgeRx) {
								bridgeRkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == bridgePX) {
								bridgePkey = key;
								structure[key][1]++;
							}
						}

						var tmpTxt = '';
						
						if (typeof bridgeLkey != 'undefined') {
							tmpTxt += '\tRepeater[\''+bridgeLkey+'\'].End();\n';
															
						}
						if (typeof bridgeRkey != 'undefined') {
							tmpTxt += '\tRepeater[\''+bridgeRkey+'\'].End();\n';
							
						}						
						if (typeof bridgePkey != 'undefined') {
							tmpTxt += '\tRepeater[\''+bridgePkey+'\'].End();\n';
							
						}
						
						tmpTxt += '\tRollingNoise.Change(0);\n';
						
						subTrkArr.push([crX, tmpTxt]);
						
						break;						
					}
				}
			}
		}			
	}
	
	if (kdata.overbridge != '') {
		var obname = kdata.overbridge.split('¤');
		noteTrkArr.push([ currX,'overbridge']);
		
		subTrkArr.push([currX, '\tStructure[\'' + obname[0] + '\'].Put(0,'+ obname[1]+','+obname[2]+', 0, '+obname[3]+', 0, 0, 0, 0);\n']);	
		structure[obname[0]][1]++;			
		subTrkArr.push([ currX-1, '\tCabIlluminance.Set(1);\n']);		
		subTrkArr.push([ currX, '\tCabIlluminance.Set(0.875);\n']);		
		subTrkArr.push([ currX+12, '\tCabIlluminance.Set(0.875);\n']);		
		subTrkArr.push([ currX+13, '\tCabIlluminance.Set(1);\n']);		
		
	}
	
	if (kdata.ground != '') {		
		for (g1 = 0; g1 < bvebveStrOjArr.length; g1++) {
  			if (bvebveStrOjArr[g1][1] == kdata.ground) {
				var iGx,iGkey;
				iGx = bvebveStrOjArr[g1][5].replace(/[/]/g,'\\');
				
				for (key in structure) {
					if (structure[key][0] == iGx) {
						iGkey = key;
						structure[key][1]++;
						break;
					}
				}	

				if (typeof iGkey != 'undefined') {
					subTrkArr.push([ crX, '\tRepeater[\'Ground\'].Begin(0, 0, ' + lastheight + ', 0, 0, 0, 0, 1, 25, 25,\'' + iGkey + '\');\n']);
				}			
			
  			}
		}
	}
	
	if (kdata.flyover != '') {
		var arrK = kdata.flyover.split('¤');
		noteTrkArr.push([ crX,'flyover']);
		
		for (k = 0; k < arrK.length; k++) {
			var arrK_1 = arrK[k].split(':');
			if (arrK_1[1] == '0') {
				for (g = 0; g < bveFOObjArr.length; g++) {
					if (bveFOObjArr[g][1] == arrK_1[0]) {
					
						var FoLkey,FoRkey,FoPkey;
						
						var FoLx = bveFOObjArr[g][4].replace(/[/]/g,'\\');
						var FoRx = bveFOObjArr[g][5].replace(/[/]/g,'\\');
						var FoPX = bveFOObjArr[g][6].replace(/[/]/g,'\\');
						var pRpt = parseInt(bveFOObjArr[g][7]);			
						var bLen = parseInt(bveFOObjArr[g][8]);
						
						for (key in structure) {
							if (structure[key][0] == FoLx) {
								FoLkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == FoRx) {
								FoRkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == FoPX) {
								FoPkey = key;
								structure[key][1]++;
							}
						}
						
						var tmpTxt = '';

						//algoritma utk wall type
						if (paralellTrack.length == 0) {
							
							if (typeof FoLkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+FoLkey+'\'].Begin0(0, 1, '+bLen+', '+bLen+',\''+FoLkey+'\');\n';
																
							}
							if (typeof FoRkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+FoRkey+'\'].Begin0(0, 1, '+bLen+', '+bLen+',\''+FoRkey+'\');\n';
								
							}
							
						} else {
							//parallel track, cek trek terkanan atau terkiri
							var leftestIndex = 0; var rightestIndex = 0;
							var leftestX = 0; var rightestX = 0;
							for (pTi = 0; pTi < paralellTrack.length; pTi++) {
								if (paralellTrack[pTi][1] <= leftestX) {
									leftestX = paralellTrack[pTi][1];
									leftestIndex = paralellTrack[pTi][0];
								}
								if (paralellTrack[pTi][1] >= rightestX) {
									rightestX = paralellTrack[pTi][1];
									rightestIndex = paralellTrack[pTi][0];
								}
							}
					
							if (typeof FoLkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+FoLkey+'\'].Begin0(' + leftestIndex + ', 1, '+bLen+', '+bLen+',\''+FoLkey+'\');\n';
																
							}
							if (typeof FoRkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+FoRkey+'\'].Begin0(' + rightestIndex + ', 1, '+bLen+', '+bLen+',\''+FoRkey+'\');\n';
								
							}								
						}
						
						if (typeof FoPkey != 'undefined') {
							tmpTxt += '\tRepeater[\''+FoPkey+'\'].Begin0(0, 0, 0, '+pRpt+',\''+FoPkey+'\');\n';
							
						}		

						subTrkArr.push([crX, tmpTxt]);
						
						break;	
					
					}
				}
  			} else {
				for (g = 0; g < bveFOObjArr.length; g++) {
					if (bveFOObjArr[g][1] == arrK_1[0]) {
					
						var FoLkey,FoRkey,FoPkey;
						
						var FoLx = bveFOObjArr[g][4].replace(/[/]/g,'\\');
						var FoRx = bveFOObjArr[g][5].replace(/[/]/g,'\\');
						var FoPX = bveFOObjArr[g][6].replace(/[/]/g,'\\');
						var pRpt = parseInt(bveFOObjArr[g][7]);			
						var bLen = parseInt(bveFOObjArr[g][8]);
						
						for (key in structure) {
							if (structure[key][0] == FoLx) {
								FoLkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == FoRx) {
								FoRkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == FoPX) {
								FoPkey = key;
								structure[key][1]++;
							}
						}

						var tmpTxt = '';
						
						if (typeof FoLkey != 'undefined') {
							tmpTxt += '\tRepeater[\''+FoLkey+'\'].End();\n';
															
						}
						if (typeof FoRkey != 'undefined') {
							tmpTxt += '\tRepeater[\''+FoRkey+'\'].End();\n';
							
						}						
						if (typeof FoPkey != 'undefined') {
							tmpTxt += '\tRepeater[\''+FoPkey+'\'].End();\n';
							
						}
						
						subTrkArr.push([crX, tmpTxt]);
						
						break;
					}
				}
			}
		}
 	}
	
	if (kdata.tunnel != '') {
		var arrK = kdata.tunnel.split('¤');
		noteTrkArr.push([ crX,'tunnel']);
		
		for (k = 0; k < arrK.length; k++) {
			var arrK_1 = arrK[k].split(':');
			if (arrK_1[1] == '0') {
				for (g = 0; g < bvetunnelObjArr.length; g++) {
					if (bvetunnelObjArr[g][1] == arrK_1[0]) {
					
						var tunStkey,tunEdkey,tunSLkey,tunSRkey,tunM1Lkey,tunM1Rkey,tunM2Lkey,tunM2Rkey,tunELkey,tunERkey;
						
						var tunStx = bvetunnelObjArr[g][4].replace(/[/]/g,'\\');
						var tunEdx = bvetunnelObjArr[g][5].replace(/[/]/g,'\\');
						
						var tunSLx = bvetunnelObjArr[g][6].replace(/[/]/g,'\\');
						var tunSRx = bvetunnelObjArr[g][7].replace(/[/]/g,'\\');
						
						var tunM1Lx = bvetunnelObjArr[g][8].replace(/[/]/g,'\\');
						var tunM1Rx = bvetunnelObjArr[g][9].replace(/[/]/g,'\\');
						var tunM1Rp = (parseInt(bvetunnelObjArr[g][10])>0)? bvetunnelObjArr[g][10] : '25';
						
						var tunM2Lx = bvetunnelObjArr[g][11].replace(/[/]/g,'\\');
						var tunM2Rx = bvetunnelObjArr[g][12].replace(/[/]/g,'\\');
						var tunM2Rp = (parseInt(bvetunnelObjArr[g][13])>0)? bvetunnelObjArr[g][13] : '25';
						
						var tunELx = bvetunnelObjArr[g][14].replace(/[/]/g,'\\');
						var tunERx = bvetunnelObjArr[g][15].replace(/[/]/g,'\\');
					
						for (key in structure) {
							if (structure[key][0] == tunStx) {
								tunStkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == tunEdx) {
								tunEdkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == tunSLx) {
								tunSLkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == tunSRx) {
								tunSRkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == tunM1Lx) {
								tunM1Lkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == tunM1Rx) {
								tunM1Rkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == tunM2Lx) {
								tunM2Lkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == tunM2Rx) {
								tunM2Rkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == tunELx) {
								tunELkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == tunERx) {
								tunERkey = key;
								structure[key][1]++;
							}
						}
												
						subTrkArr.push([crX-1, '\tCabIlluminance.Set(1);\n']);
						subTrkArr.push([crX, '\tCabIlluminance.Set(0);\n']);

						//algoritma utk wall type
						if (paralellTrack.length == 0) {
							if (typeof tunStkey != 'undefined') { // tunnel entrance
								subTrkArr.push([crX, '\tStructure[\''+tunStkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n']);							
							} 							
							if (typeof tunSLkey != 'undefined') {
								subTrkArr.push([crX, '\tStructure[\''+tunSLkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n']);
								subTrkArr.push([crX, '\tStructure[\''+tunSRkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n']);
								if (typeof tunM2Lkey != 'undefined') {
									subTrkArr.push([crX+25, '\tRepeater[\''+tunM1Lkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM1Lkey+'\');\n']);
									subTrkArr.push([crX+25, '\tRepeater[\''+tunM1Rkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM1Rkey+'\');\n']);								
									subTrkArr.push([crX+tunM2Rp+25, '\tRepeater[\''+tunM2Lkey+'\'].Begin0(0, 1, '+tunM2Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM2Lkey+'\');\n']);
									subTrkArr.push([crX+tunM2Rp+25, '\tRepeater[\''+tunM2Rkey+'\'].Begin0(0, 1, '+tunM2Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM2Rkey+'\');\n']);								
								} else {
									subTrkArr.push([crX+25, '\tRepeater[\''+tunM1Lkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+tunM1Rp+',\''+tunM1Lkey+'\');\n']);
									subTrkArr.push([crX+25, '\tRepeater[\''+tunM1Rkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+tunM1Rp+',\''+tunM1Rkey+'\');\n']);								
								}								
							} else {
								if (typeof tunM2Lkey != 'undefined') {
									subTrkArr.push([crX, '\tRepeater[\''+tunM1Lkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM1Lkey+'\');\n']);
									subTrkArr.push([crX, '\tRepeater[\''+tunM1Rkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM1Rkey+'\');\n']);								
									subTrkArr.push([crX+tunM2Rp, '\tRepeater[\''+tunM2Lkey+'\'].Begin0(0, 1, '+tunM2Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM2Lkey+'\');\n']);
									subTrkArr.push([crX+tunM2Rp, '\tRepeater[\''+tunM2Rkey+'\'].Begin0(0, 1, '+tunM2Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM2Rkey+'\');\n']);								
								} else {
									subTrkArr.push([crX, '\tRepeater[\''+tunM1Lkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+tunM1Rp+',\''+tunM1Lkey+'\');\n']);
									subTrkArr.push([crX, '\tRepeater[\''+tunM1Rkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+tunM1Rp+',\''+tunM1Rkey+'\');\n']);								
								}
							}
							
							
						} else if (paralellTrack.length == 1) {
						
							var leftestIndex = 0; var rightestIndex = 0;
							var leftestX = 0; var rightestX = 0;
							for (pTi = 0; pTi < paralellTrack.length; pTi++) {
								if (paralellTrack[pTi][1] <= leftestX) {
									leftestX = paralellTrack[pTi][1];
									leftestIndex = paralellTrack[pTi][0];
								}
								if (paralellTrack[pTi][1] >= rightestX) {
									rightestX = paralellTrack[pTi][1];
									rightestIndex = paralellTrack[pTi][0];
								}
							}
							
							if (rightestX > defaulOffset || (leftestX < -1*defaulOffset)) {
								if (typeof tunStkey != 'undefined') { // tunnel entrance
									subTrkArr.push([crX, '\tStructure[\''+tunStkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n']);							
								} 							
							
								if (typeof tunSLkey != 'undefined') {
									subTrkArr.push([crX, '\tStructure[\''+tunSLkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n']);
									subTrkArr.push([crX, '\tStructure[\''+tunSRkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n']);								
									if (typeof tunM2Lkey != 'undefined') {
										subTrkArr.push([crX+25, '\tRepeater[\''+tunM1Lkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM1Lkey+'\');\n']);
										subTrkArr.push([crX+25, '\tRepeater[\''+tunM1Rkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM1Rkey+'\');\n']);								
										subTrkArr.push([crX+tunM2Rp+25, '\tRepeater[\''+tunM2Lkey+'\'].Begin0(0, 1, '+tunM2Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM2Lkey+'\');\n']);
										subTrkArr.push([crX+tunM2Rp+25, '\tRepeater[\''+tunM2Rkey+'\'].Begin0(0, 1, '+tunM2Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM2Rkey+'\');\n']);								
									} else {
										subTrkArr.push([crX+25, '\tRepeater[\''+tunM1Lkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+tunM1Rp+',\''+tunM1Lkey+'\');\n']);
										subTrkArr.push([crX+25, '\tRepeater[\''+tunM1Rkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+tunM1Rp+',\''+tunM1Rkey+'\');\n']);								
									}								
								} else {
									if (typeof tunM2Lkey != 'undefined') {
										subTrkArr.push([crX, '\tRepeater[\''+tunM1Lkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM1Lkey+'\');\n']);
										subTrkArr.push([crX, '\tRepeater[\''+tunM1Rkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM1Rkey+'\');\n']);								
										subTrkArr.push([crX+tunM2Rp, '\tRepeater[\''+tunM2Lkey+'\'].Begin0(0, 1, '+tunM2Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM2Lkey+'\');\n']);
										subTrkArr.push([crX+tunM2Rp, '\tRepeater[\''+tunM2Rkey+'\'].Begin0(0, 1, '+tunM2Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM2Rkey+'\');\n']);								
									} else {
										subTrkArr.push([crX, '\tRepeater[\''+tunM1Lkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+tunM1Rp+',\''+tunM1Lkey+'\');\n']);
										subTrkArr.push([crX, '\tRepeater[\''+tunM1Rkey+'\'].Begin0(0, 1, '+tunM1Rp+', '+tunM1Rp+',\''+tunM1Rkey+'\');\n']);								
									}
								}							
							} else {
								if (typeof tunStkey != 'undefined') { // tunnel entrance
									subTrkArr.push([crX, '\tStructure[\''+tunStkey+'\'].Put(' + leftestIndex + ', 0, 0, 0, 0, 0, 0, 0, 0);\n']);							
								} 							
							
								if (typeof tunSLkey != 'undefined') {
									subTrkArr.push([crX, '\tStructure[\''+tunSLkey+'\'].Put(' + leftestIndex + ', 0, 0, 0, 0, 0, 0, 0, 0);\n']);
									subTrkArr.push([crX, '\tStructure[\''+tunSRkey+'\'].Put(' + rightestIndex + ', 0, 0, 0, 0, 0, 0, 0, 0);\n']);
									if (typeof tunM2Lkey != 'undefined') {
										subTrkArr.push([crX+25, '\tRepeater[\''+tunM1Lkey+'\'].Begin0('+leftestIndex+', 1, '+tunM1Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM1Lkey+'\');\n']);
										subTrkArr.push([crX+25, '\tRepeater[\''+tunM1Rkey+'\'].Begin0('+rightestIndex+', 1, '+tunM1Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM1Rkey+'\');\n']);								
										subTrkArr.push([crX+tunM2Rp+25, '\tRepeater[\''+tunM2Lkey+'\'].Begin0('+leftestIndex+', 1, '+tunM2Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM2Lkey+'\');\n']);
										subTrkArr.push([crX+tunM2Rp+25, '\tRepeater[\''+tunM2Rkey+'\'].Begin0('+rightestIndex+', 1, '+tunM2Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM2Rkey+'\');\n']);								
									} else {
										subTrkArr.push([crX+25, '\tRepeater[\''+tunM1Lkey+'\'].Begin0('+leftestIndex+', 1, '+tunM1Rp+', '+tunM1Rp+',\''+tunM1Lkey+'\');\n']);
										subTrkArr.push([crX+25, '\tRepeater[\''+tunM1Rkey+'\'].Begin0('+rightestIndex+', 1, '+tunM1Rp+', '+tunM1Rp+',\''+tunM1Rkey+'\');\n']);								
									}								
								} else {
									if (typeof tunM2Lkey != 'undefined') {
										subTrkArr.push([crX, '\tRepeater[\''+tunM1Lkey+'\'].Begin0('+leftestIndex+', 1, '+tunM1Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM1Lkey+'\');\n']);
										subTrkArr.push([crX, '\tRepeater[\''+tunM1Rkey+'\'].Begin0('+rightestIndex+', 1, '+tunM1Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM1Rkey+'\');\n']);								
										subTrkArr.push([crX+tunM2Rp, '\tRepeater[\''+tunM2Lkey+'\'].Begin0('+leftestIndex+', 1, '+tunM2Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM2Lkey+'\');\n']);
										subTrkArr.push([crX+tunM2Rp, '\tRepeater[\''+tunM2Rkey+'\'].Begin0('+rightestIndex+', 1, '+tunM2Rp+', '+(tunM1Rp+tunM2Rp)+',\''+tunM2Rkey+'\');\n']);								
									} else {
										subTrkArr.push([crX, '\tRepeater[\''+tunM1Lkey+'\'].Begin0('+leftestIndex+', 1, '+tunM1Rp+', '+tunM1Rp+',\''+tunM1Lkey+'\');\n']);
										subTrkArr.push([crX, '\tRepeater[\''+tunM1Rkey+'\'].Begin0('+rightestIndex+', 1, '+tunM1Rp+', '+tunM1Rp+',\''+tunM1Rkey+'\');\n']);								
									}
								}							
							}
								
						} else {
							//not supported, please create manually
						}
						
						subTrkArr.push([crX, '\tRollingNoise.Change(4);\n']);
						break;	
					}
				}
  			} else {
				for (g = 0; g < bvetunnelObjArr.length; g++) {
					if (bvetunnelObjArr[g][1] == arrK_1[0]) {
						if (bvetunnelObjArr[g][1] == arrK_1[0]) {
						
							var tunStkey,tunEdkey,tunSLkey,tunSRkey,tunM1Lkey,tunM1Rkey,tunM2Lkey,tunM2Rkey,tunELkey,tunERkey;
							
							var tunStx = bvetunnelObjArr[g][4].replace(/[/]/g,'\\');
							var tunEdx = bvetunnelObjArr[g][5].replace(/[/]/g,'\\');
							
							var tunSLx = bvetunnelObjArr[g][6].replace(/[/]/g,'\\');
							var tunSRx = bvetunnelObjArr[g][7].replace(/[/]/g,'\\');
							
							var tunM1Lx = bvetunnelObjArr[g][8].replace(/[/]/g,'\\');
							var tunM1Rx = bvetunnelObjArr[g][9].replace(/[/]/g,'\\');
							var tunM1Rp = (parseInt(bvetunnelObjArr[g][10])>0)? bvetunnelObjArr[g][10] : '25';
							
							var tunM2Lx = bvetunnelObjArr[g][11].replace(/[/]/g,'\\');
							var tunM2Rx = bvetunnelObjArr[g][12].replace(/[/]/g,'\\');
							var tunM2Rp = (parseInt(bvetunnelObjArr[g][13])>0)? bvetunnelObjArr[g][13] : '25';
							
							var tunELx = bvetunnelObjArr[g][14].replace(/[/]/g,'\\');
							var tunERx = bvetunnelObjArr[g][15].replace(/[/]/g,'\\');
						
							for (key in structure) {
								if (structure[key][0] == tunStx) {
									tunStkey = key;
									structure[key][1]++;
								}
								if (structure[key][0] == tunEdx) {
									tunEdkey = key;
									structure[key][1]++;
								}
								if (structure[key][0] == tunSLx) {
									tunSLkey = key;
									structure[key][1]++;
								}
								if (structure[key][0] == tunSRx) {
									tunSRkey = key;
									structure[key][1]++;
								}
								if (structure[key][0] == tunM1Lx) {
									tunM1Lkey = key;
									structure[key][1]++;
								}
								if (structure[key][0] == tunM1Rx) {
									tunM1Rkey = key;
									structure[key][1]++;
								}
								if (structure[key][0] == tunM2Lx) {
									tunM2Lkey = key;
									structure[key][1]++;
								}
								if (structure[key][0] == tunM2Rx) {
									tunM2Rkey = key;
									structure[key][1]++;
								}
								if (structure[key][0] == tunELx) {
									tunELkey = key;
									structure[key][1]++;
								}
								if (structure[key][0] == tunERx) {
									tunERkey = key;
									structure[key][1]++;
								}
							}
													
							subTrkArr.push([crX-1, '\tCabIlluminance.Set(0);\n']);
							subTrkArr.push([crX, '\tCabIlluminance.Set(1);\n']);

							//algoritma utk wall type
							if (paralellTrack.length == 0) {
								if (typeof tunEdkey != 'undefined') { // tunnel exit
									subTrkArr.push([crX, '\tStructure[\''+tunEdkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n']);							
								}
								if (typeof tunELkey != 'undefined') {
									subTrkArr.push([crX, '\tStructure[\''+tunELkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n']);
									subTrkArr.push([crX, '\tStructure[\''+tunERkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n']);
									if (typeof tunM2Lkey != 'undefined') {
										subTrkArr.push([crX-25, '\tRepeater[\''+tunM1Lkey+'\'].End();\n']);
										subTrkArr.push([crX-25, '\tRepeater[\''+tunM1Rkey+'\'].End();\n']);								
										subTrkArr.push([crX-25, '\tRepeater[\''+tunM2Lkey+'\'].End();\n']);
										subTrkArr.push([crX-25, '\tRepeater[\''+tunM2Rkey+'\'].End();\n']);								
									} else {
										subTrkArr.push([crX-25, '\tRepeater[\''+tunM1Lkey+'\'].End();\n']);
										subTrkArr.push([crX-25, '\tRepeater[\''+tunM1Rkey+'\'].End();\n']);								
									}								
								} else {
									if (typeof tunM2Lkey != 'undefined') {
										subTrkArr.push([crX, '\tRepeater[\''+tunM1Lkey+'\'].End();\n']);
										subTrkArr.push([crX, '\tRepeater[\''+tunM1Rkey+'\'].End();\n']);								
										subTrkArr.push([crX, '\tRepeater[\''+tunM2Lkey+'\'].End();\n']);
										subTrkArr.push([crX, '\tRepeater[\''+tunM2Rkey+'\'].End();\n']);								
									} else {
										subTrkArr.push([crX, '\tRepeater[\''+tunM1Lkey+'\'].End();\n']);
										subTrkArr.push([crX, '\tRepeater[\''+tunM1Rkey+'\'].End();\n']);								
									}
								}
								
								
							} else if (paralellTrack.length == 1) {
							
								var leftestIndex = 0; var rightestIndex = 0;
								var leftestX = 0; var rightestX = 0;
								for (pTi = 0; pTi < paralellTrack.length; pTi++) {
									if (paralellTrack[pTi][1] <= leftestX) {
										leftestX = paralellTrack[pTi][1];
										leftestIndex = paralellTrack[pTi][0];
									}
									if (paralellTrack[pTi][1] >= rightestX) {
										rightestX = paralellTrack[pTi][1];
										rightestIndex = paralellTrack[pTi][0];
									}
								}
								
								if (rightestX > defaulOffset || (leftestX < -1*defaulOffset)) {
									if (typeof tunEdkey != 'undefined') { // tunnel exit
										subTrkArr.push([crX, '\tStructure[\''+tunEdkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n']);							
									}
									if (typeof tunELkey != 'undefined') {
										subTrkArr.push([crX, '\tStructure[\''+tunELkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n']);
										subTrkArr.push([crX, '\tStructure[\''+tunERkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n']);								
										if (typeof tunM2Lkey != 'undefined') {
											subTrkArr.push([crX-25, '\tRepeater[\''+tunM1Lkey+'\'].End();\n']);
											subTrkArr.push([crX-25, '\tRepeater[\''+tunM1Rkey+'\'].End();\n']);								
											subTrkArr.push([crX-25, '\tRepeater[\''+tunM2Lkey+'\'].End();\n']);
											subTrkArr.push([crX-25, '\tRepeater[\''+tunM2Rkey+'\'].End();\n']);								
										} else {
											subTrkArr.push([crX-25, '\tRepeater[\''+tunM1Lkey+'\'].End();\n']);
											subTrkArr.push([crX-25, '\tRepeater[\''+tunM1Rkey+'\'].End();\n']);								
										}								
									} else {
										if (typeof tunM2Lkey != 'undefined') {
											subTrkArr.push([crX, '\tRepeater[\''+tunM1Lkey+'\'].End();\n']);
											subTrkArr.push([crX, '\tRepeater[\''+tunM1Rkey+'\'].End();\n']);								
											subTrkArr.push([crX, '\tRepeater[\''+tunM2Lkey+'\'].End();\n']);
											subTrkArr.push([crX, '\tRepeater[\''+tunM2Rkey+'\'].End();\n']);								
										} else {
											subTrkArr.push([crX, '\tRepeater[\''+tunM1Lkey+'\'].End();\n']);
											subTrkArr.push([crX, '\tRepeater[\''+tunM1Rkey+'\'].End();\n']);								
										}
									}							
								} else {
									if (typeof tunEdkey != 'undefined') { // tunnel exit
										subTrkArr.push([crX, '\tStructure[\''+tunEdkey+'\'].Put(' + leftestIndex + ', 0, 0, 0, 0, 0, 0, 0, 0);\n']);							
									}
								
									if (typeof tunELkey != 'undefined') {
										subTrkArr.push([crX, '\tStructure[\''+tunELkey+'\'].Put(' + leftestIndex + ', 0, 0, 0, 0, 0, 0, 0, 0);\n']);
										subTrkArr.push([crX, '\tStructure[\''+tunSRkey+'\'].Put(' + rightestIndex + ', 0, 0, 0, 0, 0, 0, 0, 0);\n']);
										if (typeof tunM2Lkey != 'undefined') {
											subTrkArr.push([crX-25, '\tRepeater[\''+tunM1Lkey+'\'].End();\n']);
											subTrkArr.push([crX-25, '\tRepeater[\''+tunM1Rkey+'\'].End();\n']);								
											subTrkArr.push([crX-25, '\tRepeater[\''+tunM2Lkey+'\'].End();\n']);
											subTrkArr.push([crX-25, '\tRepeater[\''+tunM2Rkey+'\'].End();\n']);								
										} else {
											subTrkArr.push([crX-25, '\tRepeater[\''+tunM1Lkey+'\'].End();\n']);
											subTrkArr.push([crX-25, '\tRepeater[\''+tunM1Rkey+'\'].End();\n']);								
										}								
									} else {
										if (typeof tunM2Lkey != 'undefined') {
											subTrkArr.push([crX, '\tRepeater[\''+tunM1Lkey+'\'].End();\n']);
											subTrkArr.push([crX, '\tRepeater[\''+tunM1Rkey+'\'].End();\n']);								
											subTrkArr.push([crX, '\tRepeater[\''+tunM2Lkey+'\'].End();\n']);
											subTrkArr.push([crX, '\tRepeater[\''+tunM2Rkey+'\'].End();\n']);								
										} else {
											subTrkArr.push([crX, '\tRepeater[\''+tunM1Lkey+'\'].End();\n']);
											subTrkArr.push([crX, '\tRepeater[\''+tunM1Rkey+'\'].End();\n']);								
										}
									}							
								}
									
							} else {
								//not supported, please create manually
							}
							subTrkArr.push([crX, '\tRollingNoise.Change(0);\n']);					
							break;	
						}
					}
				}
			}

		}
	}
		
	if (kdata.dike != '') {
		var arrK = kdata.dike.split('¤');
			
		for (k = 0; k < arrK.length; k++) {
			var arrK_1 = arrK[k].split(':');
			if (arrK_1[1] == '0') {
				for (g = 0; g < bvedikeObjArr.length; g++) {
					if (bvedikeObjArr[g][1] == arrK_1[0]) {
					
						var dikeLkey,dikeRkey;
						
						var dikeLx = bvedikeObjArr[g][4].replace(/[/]/g,'\\');
						var dikeRx = bvedikeObjArr[g][5].replace(/[/]/g,'\\');
						var bLen = bvedikeObjArr[g][6];
						
						for (key in structure) {
							if (structure[key][0] == dikeLx) {
								dikeLkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == dikeRx) {
								dikeRkey = key;
								structure[key][1]++;
							}
						}
						
						var tmpTxt = '';

						//algoritma utk wall type
						if (paralellTrack.length == 0) {
							
							if (typeof dikeLkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+dikeLkey+'\'].Begin0(0, 1, '+bLen+', '+bLen+',\''+dikeLkey+'\');\n';
																
							}
							if (typeof dikeRkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+dikeRkey+'\'].Begin0(0, 1, '+bLen+', '+bLen+',\''+dikeRkey+'\');\n';
								
							}
							
						} else {
							//parallel track, cek trek terkanan atau terkiri
							var leftestIndex = 0; var rightestIndex = 0;
							var leftestX = 0; var rightestX = 0;
							for (pTi = 0; pTi < paralellTrack.length; pTi++) {
								if (paralellTrack[pTi][1] <= leftestX) {
									leftestX = paralellTrack[pTi][1];
									leftestIndex = paralellTrack[pTi][0];
								}
								if (paralellTrack[pTi][1] >= rightestX) {
									rightestX = paralellTrack[pTi][1];
									rightestIndex = paralellTrack[pTi][0];
								}
							}
					
							if (typeof dikeLkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+dikeLkey+'\'].Begin0(' + leftestIndex + ', 1, '+bLen+', '+bLen+',\''+dikeLkey+'\');\n';
																
							}
							if (typeof dikeRkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+dikeRkey+'\'].Begin0(' + rightestIndex + ', 1, '+bLen+', '+bLen+',\''+dikeRkey+'\');\n';
								
							}								
						}

						subTrkArr.push([crX, tmpTxt]);
						
						break;	
					
					}
				}
  			} else {
				for (g = 0; g < bvedikeObjArr.length; g++) {
					if (bvedikeObjArr[g][1] == arrK_1[0]) {
					
						var dikeLkey,dikeRkey;
						
						var dikeLx = bvedikeObjArr[g][4].replace(/[/]/g,'\\');
						var dikeRx = bvedikeObjArr[g][5].replace(/[/]/g,'\\');
						
						for (key in structure) {
							if (structure[key][0] == dikeLx) {
								dikeLkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == dikeRx) {
								dikeRkey = key;
								structure[key][1]++;
							}
						}

						var tmpTxt = '';
						
						if (typeof dikeLkey != 'undefined') {
							tmpTxt += '\tRepeater[\''+dikeLkey+'\'].End();\n';
															
						}
						if (typeof dikeRkey != 'undefined') {
							tmpTxt += '\tRepeater[\''+dikeRkey+'\'].End();\n';
							
						}						

						subTrkArr.push([crX, tmpTxt]);
						
						break;
					}
				}
			}		
		}		
	}
	
	if (kdata.cut != '') {
		var arrK = kdata.cut.split('¤');
		noteTrkArr.push([ crX,'cut']);
		
		for (k = 0; k < arrK.length; k++) {
			var arrK_1 = arrK[k].split(':');
			if (arrK_1[1] == '0') {
				for (g = 0; g < bvecutObjArr.length; g++) {
					if (bvecutObjArr[g][1] == arrK_1[0]) {
					
						var cutLkey,cutRkey;
						
						var cutLx = bvecutObjArr[g][4].replace(/[/]/g,'\\');
						var cutRx = bvecutObjArr[g][5].replace(/[/]/g,'\\');
						var bLen = bvecutObjArr[g][6];
						
						for (key in structure) {
							if (structure[key][0] == cutLx) {
								cutLkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == cutRx) {
								cutRkey = key;
								structure[key][1]++;
							}
						}
						
						var tmpTxt = '';

						//algoritma utk wall type
						if (paralellTrack.length == 0) {
							
							if (typeof cutLkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+cutLkey+'\'].Begin0(0, 1, '+bLen+', '+bLen+',\''+cutLkey+'\');\n';
																
							}
							if (typeof cutRkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+cutRkey+'\'].Begin0(0, 1, '+bLen+', '+bLen+',\''+cutRkey+'\');\n';
								
							}
							
						} else {
							//parallel track, cek trek terkanan atau terkiri
							var leftestIndex = 0; var rightestIndex = 0;
							var leftestX = 0; var rightestX = 0;
							for (pTi = 0; pTi < paralellTrack.length; pTi++) {
								if (paralellTrack[pTi][1] <= leftestX) {
									leftestX = paralellTrack[pTi][1];
									leftestIndex = paralellTrack[pTi][0];
								}
								if (paralellTrack[pTi][1] >= rightestX) {
									rightestX = paralellTrack[pTi][1];
									rightestIndex = paralellTrack[pTi][0];
								}
							}
					
							if (typeof cutLkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+cutLkey+'\'].Begin0(' + leftestIndex + ', 1, '+bLen+', '+bLen+',\''+cutLkey+'\');\n';
																
							}
							if (typeof cutRkey != 'undefined') {
								tmpTxt += '\tRepeater[\''+cutRkey+'\'].Begin0(' + rightestIndex + ', 1, '+bLen+', '+bLen+',\''+cutRkey+'\');\n';
								
							}								
						}

						subTrkArr.push([crX, tmpTxt]);
						
						break;	
					
					}
				}
  			} else {
				for (g = 0; g < bvecutObjArr.length; g++) {
					if (bvecutObjArr[g][1] == arrK_1[0]) {
					
						var cutLkey,cutRkey;
						
						var cutLx = bvecutObjArr[g][4].replace(/[/]/g,'\\');
						var cutRx = bvecutObjArr[g][5].replace(/[/]/g,'\\');
						
						for (key in structure) {
							if (structure[key][0] == cutLx) {
								cutLkey = key;
								structure[key][1]++;
							}
							if (structure[key][0] == cutRx) {
								cutRkey = key;
								structure[key][1]++;
							}
						}

						var tmpTxt = '';
						
						if (typeof cutLkey != 'undefined') {
							tmpTxt += '\tRepeater[\''+cutLkey+'\'].End();\n';
															
						}
						if (typeof cutRkey != 'undefined') {
							tmpTxt += '\tRepeater[\''+cutRkey+'\'].End();\n';
							
						}						

						subTrkArr.push([crX, tmpTxt]);
						
						break;
					}
				}
			}		
		}
	}
	
	if (kdata.underground != '') {
		//subTrkArr.push([ currX, '.Height ' + kdata.height]);
		noteTrkArr.push([ crX,'underground']);
	}
	
	if (kdata.form != '') {
		var formArr = kdata.form.split('¤');
		
		if (formArr.length >2) {
			//['0','formstd','Form Std','form.jpg','1067/form/forml.csv','1067/form/formcl.csv','1067/form/formcr.csv','1067/form/formr.csv','1067/form/roofl.csv','1067/form/roofcl.csv','1067/form/roofcr.csv','1067/form/roofr.csv'];
			
			for (f1 = 0; f1 < bveplatformObjArr.length; f1++) {			
				if (bveplatformObjArr[f1][1] == formArr[0]) {
					
					var FrLkey,FrCLkey,FrCRkey,FrRkey;
					var RfLkey,RfCLkey,RfCRkey,RfRkey;
					
					var FrLx = bveplatformObjArr[f1][4].replace(/[/]/g,'\\');
					var FrCLx = bveplatformObjArr[f1][5].replace(/[/]/g,'\\');
					var FrCRX = bveplatformObjArr[f1][6].replace(/[/]/g,'\\');
					var FrRX = bveplatformObjArr[f1][7].replace(/[/]/g,'\\');
					var RfLX = bveplatformObjArr[f1][8].replace(/[/]/g,'\\');
					var RfCLX = bveplatformObjArr[f1][9].replace(/[/]/g,'\\');
					var RfCRX = bveplatformObjArr[f1][10].replace(/[/]/g,'\\');
					var RfRX = bveplatformObjArr[f1][11].replace(/[/]/g,'\\');
						
					var Rpt = parseInt(bveplatformObjArr[f1][12]);			
					
					for (key in structure) {
						if (structure[key][0] == FrLx) {
							FrLkey = key;
							structure[key][1]++;
						}
						if (structure[key][0] == FrCLx) {
							FrCLkey = key;
							structure[key][1]++;
						}
						if (structure[key][0] == FrCRX) {
							FrCRkey = key;
							structure[key][1]++;
						}
						if (structure[key][0] == FrRX) {
							FrRkey = key;
							structure[key][1]++;
						}
						if (structure[key][0] == RfLX) {
							RfLkey = key;
							structure[key][1]++;
						}
						if (structure[key][0] == RfCLX) {
							RfCLkey = key;
							structure[key][1]++;
						}
						if (structure[key][0] == RfCRX) {
							RfCRkey = key;
							structure[key][1]++;
						}
						if (structure[key][0] == RfRX) {
							RfRkey = key;
							structure[key][1]++;
						}
					}
					
					//get default melody
					var xDepMkey,xDepMx;
										
					for (i = 0; i < bveaudioObjArr.length; i++) {
						if (bveaudioObjArr[i][3] == 'Melody') {
							xDepMx = bveaudioObjArr[i][4].replace(/[/]/g,'\\');
							break;
						}
					}
					
					for (key in sound) {
						if (sound[key][0] == xDepMx) {
							xDepMkey = key;
							sound[key][1]++;
							break;
						}
					}	

					//	MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
					var stop = (formArr[4] == '1')? 'S' : 'B';
					var passAlarm = (formArr[4] == '1')? '1' : '0';
					var door = '0';
					var formSideArr = formArr[6].split('/');
					var fLen = parseInt(formArr[7]);

					for (fs = 0; fs < formSideArr.length; fs++) {
						var formSide = formSideArr[fs].split(':');				
						if (formSide[0] == pid && formSide[1] == 'L') {
							door = '-1';
							break;
						} else if (formSide[0] == pid && formSide[1] == 'R') {
							door = '1';
							break;
						} else {					
							if (formSide[0] == pid) {
								door = '1';
								break;
							} 
							if (formSide[1] == pid) {
								door = '-1';
								break;
							}					
						}
					}
					var stacount = 0;
					for (key in station) {
						if (station[key] != '') {
							if (station[key][1] > 0) {
								stacount++;
							}
						}
					}					
					//stationKey1, stationName1, arrivalTime1, depertureTime1, stoppageTime1, defaultTime1, signalFlag1, alightingTime1, passengers1, arrivalSoundKey1, depertureSoundKey1, doorReopen1, stuckInDoor1
					if (stacount == 0) {
						station[formArr[2]] = [formArr[1] + ',8:00:00,8:00:'+formArr[3]+',' + formArr[3] + ',,1,0,0.4,,' + xDepMkey + ',0.1,0',1,'sta',0];
					} else{
						station[formArr[2]] = [formArr[1] + ',,,' + formArr[3] + ',,1,0,0.4,,' + xDepMkey + ',0.1,0',1,'sta',0];
					}
					curSta = [formArr[2],door];
										
					var formTxt = '';
					// paralellTrack[0] = [RailIndex,X,Y,pid]; // data : railindex, x-distance from main track, y-height --- 2 study
					for (fs = 0; fs < formSideArr.length; fs++) {
						//.Form RailIndex1; L; RoofStructureIndex; FormStructureIndex, Left form
						//.Form RailIndex2; R; RoofStructureIndex; FormStructureIndex, right form
						//.Form RailIndex; RailIndexOpposite; RoofStructureIndex; FormStructureIndex,
					
						var formSide = formSideArr[fs].split(':');
																
						for (pTi = 0; pTi < paralellTrack.length; pTi++) {
							if (formSide[0] == paralellTrack[pTi][3]) {
								formSide[0] = formSide[0].replace(paralellTrack[pTi][3],paralellTrack[pTi][0]);
							}					
							if (formSide[1] == paralellTrack[pTi][3]) {
								formSide[1] = formSide[1].replace(paralellTrack[pTi][3],paralellTrack[pTi][0]);
							}					
						}
						
					
						if (formSide[0] == pid) { 
							formSide[0] = '0';
						}
						if (formSide[1] == pid) { 
							formSide[1] = '0';
						}
						
						if (formSide[1] == 'L') {
							if (typeof FrLkey != 'undefined') {
								subTrkArr.push([crX, '\tRepeater[\''+FrLkey+'\'].Begin0('+formSide[0]+', 1, '+Rpt+', '+Rpt+',\''+FrLkey+'\');\n']);
								subTrkArr.push([crX+fLen, '\tRepeater[\''+FrLkey+'\'].End();\n']);									
							}
							if (typeof FrCLkey != 'undefined') {
								subTrkArr.push([crX, '\tRepeater[\''+FrCLkey+'\'].Begin0('+formSide[0]+', 1, '+Rpt+', '+Rpt+',\''+FrCLkey+'\');\n']);
								subTrkArr.push([crX+fLen, '\tRepeater[\''+FrCLkey+'\'].End();\n']);									
								
							}
							if (typeof RfLkey != 'undefined') {
								subTrkArr.push([crX, '\tRepeater[\''+RfLkey+'\'].Begin0('+formSide[0]+', 1, '+Rpt+', '+Rpt+',\''+RfLkey+'\');\n']);
								subTrkArr.push([crX+fLen, '\tRepeater[\''+RfLkey+'\'].End();\n']);									
							}
							if (typeof RfCLkey != 'undefined') {
								subTrkArr.push([crX, '\tRepeater[\''+RfCLkey+'\'].Begin0('+formSide[0]+', 1, '+Rpt+', '+Rpt+',\''+RfCLkey+'\');\n']);
								subTrkArr.push([crX+fLen, '\tRepeater[\''+RfCLkey+'\'].End();\n']);									
							}

						} else if (formSide[1] == 'R') {
							if (typeof FrCRkey != 'undefined') {
								subTrkArr.push([crX, '\tRepeater[\''+FrCRkey+'\'].Begin0('+formSide[0]+', 1, '+Rpt+', '+Rpt+',\''+FrCRkey+'\');\n']);
								subTrkArr.push([crX+fLen, '\tRepeater[\''+FrCRkey+'\'].End();\n']);									
							}
							if (typeof FrRkey != 'undefined') {
								subTrkArr.push([crX, '\tRepeater[\''+FrRkey+'\'].Begin0('+formSide[0]+', 1, '+Rpt+', '+Rpt+',\''+FrRkey+'\');\n']);
								subTrkArr.push([crX+fLen, '\tRepeater[\''+FrRkey+'\'].End();\n']);									
							}
							if (typeof RfCRkey != 'undefined') {
								subTrkArr.push([crX, '\tRepeater[\''+RfCRkey+'\'].Begin0('+formSide[0]+', 1, '+Rpt+', '+Rpt+',\''+RfCRkey+'\');\n']);
								subTrkArr.push([crX+fLen, '\tRepeater[\''+RfCRkey+'\'].End();\n']);									
							}
							if (typeof RfRkey != 'undefined') {
								subTrkArr.push([crX, '\tRepeater[\''+RfRkey+'\'].Begin0('+formSide[0]+', 1, '+Rpt+', '+Rpt+',\''+RfRkey+'\');\n']);
								subTrkArr.push([crX+fLen, '\tRepeater[\''+RfRkey+'\'].End();\n']);									
							}							
						
						} else {
							if (typeof FrLkey != 'undefined') {
								//subTrkArr.push([crX, '\tRepeater[\''+FrLkey+'\'].Begin0('+formSide[1]+', 1, '+Rpt+', '+Rpt+',\''+FrLkey+'\');\n']);
								//subTrkArr.push([crX+fLen, '\tRepeater[\''+FrLkey+'\'].End();\n']);	
								var Xd = 0;
								while (Xd < fLen) {
									subTrkArr.push([(crX+Xd), '\tStructure[\''+FrLkey+'\'].Put0('+ formSide[1]+',1,'+Rpt+');\n']);
									Xd += Rpt;
								}								
							}
							if (typeof FrCLkey != 'undefined') {
								var Xd = 0;
								while (Xd < fLen) {
									subTrkArr.push([(crX+Xd), '\tStructure[\''+FrCLkey+'\'].PutBetween(' + formSide[0] + ',' + formSide[1] + ');\n']);
									Xd += Rpt;
								}									
							}
							if (typeof FrCRkey != 'undefined') {
								var Xd = 0;
								while (Xd < fLen) {
									subTrkArr.push([(crX+Xd), '\tStructure[\''+FrCRkey+'\'].PutBetween(' + formSide[0] + ',' + formSide[1] + ');\n']);
									Xd += Rpt;
								}
							}
							if (typeof FrRkey != 'undefined') {
								var Xd = 0;
								while (Xd < fLen) {
									subTrkArr.push([(crX+Xd), '\tStructure[\''+FrRkey+'\'].Put0('+ formSide[0]+',1,'+Rpt+');\n']);
									Xd += Rpt;
								}	
							}
							if (typeof RfLkey != 'undefined') {
								var Xd = 0;
								while (Xd < fLen) {
									subTrkArr.push([(crX+Xd), '\tStructure[\''+RfLkey+'\'].Put0('+ formSide[1]+',1,'+Rpt+');\n']);
									Xd += Rpt;
								}								
							}
							if (typeof RfCLkey != 'undefined') {
								var Xd = 0;
								while (Xd < fLen) {
									subTrkArr.push([(crX+Xd), '\tStructure[\''+RfCLkey+'\'].PutBetween(' + formSide[0] + ',' + formSide[1] + ');\n']);
									Xd += Rpt;
								}
							}
							if (typeof RfCRkey != 'undefined') {
								var Xd = 0;
								while (Xd < fLen) {
									subTrkArr.push([(crX+Xd), '\tStructure[\''+RfCRkey+'\'].PutBetween(' + formSide[0] + ',' + formSide[1] + ');\n']);
									Xd += Rpt;
								}									
							}
							if (typeof RfRkey != 'undefined') {
								//subTrkArr.push([crX, '\tRepeater[\''+RfRkey+'\'].Begin0('+formSide[0]+', 1, '+Rpt+', '+Rpt+',\''+RfRkey+'\');\n']);
								//subTrkArr.push([crX+fLen, '\tRepeater[\''+RfRkey+'\'].End();\n']);
								var Xd = 0;
								while (Xd < fLen) {
									subTrkArr.push([(crX+Xd), '\tStructure[\''+RfRkey+'\'].Put0('+ formSide[0]+',1,'+Rpt+');\n']);
									Xd += Rpt;
								}								
							}						
						}						
						
					}
					
					if (stsign) { 
						//subTrkArr.push([ crX-1000, '.FreeObj 0;14;-2;0;0,;st near sign,']); 
						if (parseInt(maxspeed) >150) {
							if (crX-1500 >=0) { 
								subTrkArr.push([ crX-1500, '\tStructure[\'sign_stap\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n']); 
								noteTrkArr.push([ crX-1500,'st near sign']);								
								structure['sign_stap'][1]++;
							}
						} else if (parseInt(maxspeed) >100) {
							if (crX-1000 >=0) { 
								subTrkArr.push([ crX-1000, '\tStructure[\'sign_stap\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n']); 
								noteTrkArr.push([ crX-1000,'st near sign']);								
								structure['sign_stap'][1]++;
							}
						} else if (parseInt(maxspeed) >75) {
							if (crX-600 >=0) { 
								subTrkArr.push([ crX-600, '\tStructure[\'sign_stap\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n']); 
								noteTrkArr.push([ crX-600,'st near sign']);								
								structure['sign_stap'][1]++;
							}
						} else {
							if (crX-200 >=0) { 
								subTrkArr.push([ crX-200, '\tStructure[\'sign_stap\'].Put(0, -2, -0.3, 0, 0, 0, 0, 0, 0);\n']); 
								noteTrkArr.push([ crX-200,'st near sign']);								
								structure['sign_stap'][1]++;
							}
						}				
					}	
						
					break;
					
				}		
			}

				
			
		} else {
			//	MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;
			if (formArr[0] == '1') {
				var stopPoint = crX - parseInt(formArr[1]);
				var dor = parseInt(curSta[1]);
				
				//curSta = [formArr[2],door];
				subTrkArr.push([ stopPoint, '\tStation[\''+curSta[0]+'\'].Put('+dor+', -2, 2);\n']);
				subTrkArr.push([ stopPoint, '\tStructure[\'sign_stop\'].Put(0, '+(-2*dor)+', -0.3, 0, 0, 0, 0, 0, 0);\n']); 
				structure['sign_stop'][1]++;				
			}

			curSta = [];
			
		}

	}

	//proses pole hendaklah selepas form, bergantung pada GBForm
	if (kdata.pole != '') {
		crX = Math.round(currX/25)*25;
		
		var arrK = kdata.pole.split('¤');
		
		for (k = 0; k < arrK.length; k++) {
			var arrK_1 = arrK[k].split(':');
			if (arrK_1[1] == '0') {		
				for (p = 0; p < bvepoleObjArr.length; p++) {
					if (bvepoleObjArr[p][1] == arrK_1[0]) {
						var polekey;					
						var polex = bvepoleObjArr[p][4].replace(/[/]/g,'\\');
						var plen = parseInt(bvepoleObjArr[p][5]);
						
						for (key in structure) {
							if (structure[key][0] == polex) {
								polekey = key;
								structure[key][1]++;
								break;
							}
						}
						
						var tmpTxt = '';
						if (typeof polekey != 'undefined') {
							tmpTxt += '\tRepeater[\''+polekey+'\'].Begin0(0, 1, '+plen+', '+plen+',\''+polekey+'\');\n';
																
						}
						subTrkArr.push([crX, tmpTxt]);
						
						break;
					}
				}			
			} else {
				for (p = 0; p < bvepoleObjArr.length; p++) {
					if (bvepoleObjArr[p][1] == arrK_1[0]) {
						var polekey;					
						var polex = bvepoleObjArr[p][4].replace(/[/]/g,'\\');
						
						for (key in structure) {
							if (structure[key][0] == polex) {
								polekey = key;
								structure[key][1]++;
								break;
							}
						}
						
						var tmpTxt = '';
						if (typeof polekey != 'undefined') {
							tmpTxt += '\tRepeater[\''+polekey+'\'].End();\n';
																
						}
						subTrkArr.push([crX, tmpTxt]);
						
						break;					
					}					
				}
				
			}
		}
		
		//.Pole RailIndex; NumberOfAdditionalRails; Location; Interval; PoleStructureIndex
		
	}
	
	if (kdata.roadcross != '') {
		var rcname = kdata.roadcross.split('¤') ;
		noteTrkArr.push([ crX,'roadcross']);
		var leftestIndex = 0; var rightestIndex = 0;
		var leftestX = 0; var rightestX = 0;
		for (pTi = 0; pTi < paralellTrack.length; pTi++) {
			if (paralellTrack[pTi][1] <= leftestX) {
				leftestX = paralellTrack[pTi][1];
				leftestIndex = paralellTrack[pTi][0];
			}
			if (paralellTrack[pTi][1] >= rightestX) {
				rightestX = paralellTrack[pTi][1];
				rightestIndex = paralellTrack[pTi][0];
			}
		}

		
  		for (g = 0; g < bveRCObjArr.length; g++) {
			if (bveRCObjArr[g][1] == rcname[0]) {
				
				var RCLkey,RCCkey,RCRkey,RCSkey;
				
				var RCLx = bveRCObjArr[g][4].replace(/[/]/g,'\\');
				var RCCx = bveRCObjArr[g][5].replace(/[/]/g,'\\');
				var RCRx = bveRCObjArr[g][6].replace(/[/]/g,'\\');
				var RCSx = bveRCObjArr[g][7].replace(/[/]/g,'\\');
				
				for (key in structure) {
					if (structure[key][0] == RCLx) {
						RCLkey = key;
						structure[key][1]++;
					}
					if (structure[key][0] == RCCx) {
						RCCkey = key;
						structure[key][1]++;
					}
					if (structure[key][0] == RCRx) {
						RCRkey = key;
						structure[key][1]++;
					}
				}
				
				for (key in sound3d) {
					if (sound3d[key][0] == RCSx) {
						RCSkey = key;
						sound3d[key][1]++;
					}
				}						
				
				var tmpTxt = '';

				if (typeof RCLkey != 'undefined') {
					tmpTxt += '\tStructure[\''+RCLkey+'\'].Put(' + leftestIndex + ', 0, 0, 0, 0, 0, 0, 0, 0);\n';								
				}
				if (typeof RCCkey != 'undefined') {							
					if (paralellTrack.length == 0) {
						tmpTxt += '\tStructure[\''+RCCkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n';
					} else {
						tmpTxt += '\tStructure[\''+RCCkey+'\'].Put(0, 0, 0, 0, 0, 0, 0, 0, 0);\n';
						for (pTi = 0; pTi < paralellTrack.length; pTi++) {
							tmpTxt += '\tStructure[\''+RCCkey+'\'].Put(' + paralellTrack[pTi][0] + ', 0, 0, 0, 0, 0, 0, 0, 0);\n';
						}
					}							
				}
				if (typeof RCRkey != 'undefined') {
					tmpTxt += '\tStructure[\''+RCRkey+'\'].Put(' + rightestIndex + ', 0, 0, 0, 0, 0, 0, 0, 0);\n';
				}
				if (typeof RCSkey != 'undefined') {
					var xOffset  = -3.2;
					for (pTi = 0; pTi < paralellTrack.length; pTi++) {
						if (paralellTrack[pTi][0] == leftestIndex) {
							xOffset += paralellTrack[pTi][1];
							break;
						}
					}
					tmpTxt += '\tSound3D[\''+RCSkey+'\'].Put(' + xOffset + ', 2.7);\n';							
				}

				subTrkArr.push([currX, tmpTxt]);					
				break;	
			}
		}		
	}
	
	if (kdata.crack != '') {
		for (csi = 0; csi < bvecrackObjArr.length; csi++) {
  			if (bvecrackObjArr[csi][1] == kdata.ground) {
  				for (ci = 0; ci < Crack.length; ci++) {
  					if (Crack[ci][0] == bvecrackObjArr[csi][4].replace(/[/]/g,'\\')) {
						Crack[ci][1]++;
						GBcrack[0] = ci;
  						break;
  					}
  				}
  			}
		}
		
		for (pTi = 0; pTi < paralellTrack.length; pTi++) {
			//????
		}		
		//.Crack RailIndex1; RailIndex2; CrackStructureIndex
  		//subTrkArr.push([ currX, '.Crack ' + gr ]);

		//GBcrack
		//subTrkArr.push([ currX, '.Height ' + kdata.height]);
		// paralellTrack[0] = [RailIndex,X,Y,pid]; // data : railindex, x-distance from main track, y-height --- 2 study
	}
	
	if (kdata.beacon != '') {
		//subTrkArr.push([ currX, '.Height ' + kdata.height]);
	}
	
	
}

function ProcessSLine5(sline,currX,stIdx,edIdx,cIdx,gauge) {
//2do : create others map
	var linesArr = sline.split('¤');
	crX = Math.round(currX/25)*25;
	
	for (li = 0; li < linesArr.length; li++) {
		var sArr = linesArr[li].split(':');
		//sline = '(side line 1 id):(0=start,>0 end):index:sideline_uid,(side line 2 id):(0=start,>0 end):index:sideline_uid,,,,....';
		//newPoly.markers.getAt(0).lineX = baseline_id + ':' + side + ':' + startOffset + ':' + stSwlength + ':' + baseline_uid;
		//newPoly.markers.getAt(newPoly.markers.length-1).lineX = baseline_id + ':' + side + ':' + endOffset + ':' + edSwlength + ':' + baseline_uid;
		try {
			if (typeof MapToolbar.features['lineTab'][sArr[0]] != 'undefined') {
				var s_polyL = MapToolbar.features['lineTab'][sArr[0]];
				var lXarr = s_polyL.markers.getAt(parseInt(sArr[2])).lineX.split(':'); //.getAt(0).lineX = pid1 + ':' + (-1*side) + ':0:' + ti3;
			
				if (sArr[1] == '0') { //side line start
				
					var stOffset = parseFloat(lXarr[2]);
					var stSwlength = (lXarr[3] != '') ? parseFloat(lXarr[3]) : 0; 
					var side = (parseFloat(lXarr[1]) < 0) ? -1 : 1;
			
					//alert(stOffset + ' / ' + stSwlength);
				
					if (stSwlength != 0) {
						var lXarr2 = s_polyL.markers.getAt(1).lineX.split(':'); // .getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + ':';
						var n = 0;
						var currOffset = side*stOffset;					 
						var turnoutratio = (parseFloat(lXarr2[2])-stOffset) / stSwlength;
						var railIdx = 1;  
						var offs2 = side*parseFloat(lXarr2[2]);
						
						for (p = 0; p < paralellTrack.length; p++) {
							if (paralellTrack[p][0] == railIdx) {
								railIdx ++;  																			
							} else {
								break;
							}
						}

						
						if (cIdx >= stIdx && cIdx <= edIdx) { 
							subTrkArr.push([ crX, '\tTrack[\'' + railIdx + '\'].Gauge('+ gauge +');\n']); 
							subTrkArr.push([ crX, '\tTrack[\'' + railIdx + '\'].Position('+ side*stOffset + ',0);\n']); 
							subTrkArr.push([ crX, '\tRepeater[\'railbase_' + railIdx + '\'].Begin(\'' + railIdx + '\', 0, 0, 0, 0, 0, 0, 3, 5, 5,\'' + defaultrailbasekey + '\',\'' + defaultrailbasekey + '\',\'' + defaultrailbasekey + '\',\'' + defaultrailbasekey + '\',\'' + defaultrailbasekey + '\');\n']);
							subTrkArr.push([ crX, '\tRepeater[\'railL_' + railIdx + '\'].Begin(\'' + railIdx + '\', 0, 0, 0, 0, 0, 0, 3, 5, 5,\'' + defaultrailLkey + '\',\'' + defaultrailLkey + '\',\'' + defaultrailLkey + '\',\'' + defaultrailLkey + '\',\'' + defaultrailLkey + '\');\n']);
							subTrkArr.push([ crX, '\tRepeater[\'railR_' + railIdx + '\'].Begin(\'' + railIdx + '\', 0, 0, 0, 0, 0, 0, 3, 5, 5,\'' + defaultrailRkey + '\',\'' + defaultrailRkey + '\',\'' + defaultrailRkey + '\',\'' + defaultrailRkey + '\',\'' + defaultrailRkey + '\');\n']);
							subTrkArr.push([ crX, '\tRepeater[\'ohwire_' + railIdx + '\'].Begin(\'' + railIdx + '\', 0, 0, 0, 0, 0, 0, 0, 25, 25,\'' + defaultohwirekey + '\');\n']);
							if (stOffset == 0) {
								subTrkArr.push([ crX, '\tJointNoise.Play(0);\n']);
							}
						}
						n++;
						
						while ( n*25 < stSwlength ) {
							currOffset = Math.round((side*stOffset + side * turnoutratio * n * 25)* 1000) / 1000;
							if (cIdx >= stIdx && cIdx <= edIdx) { 
								//subTrkArr.push([(crX + n*5), '.Rail ' + railIdx + ';' + currOffset + ';0;' + defaultRailIndex]); 
								subTrkArr.push([(crX + n*25) , '\tTrack[\'' + railIdx + '\'].Position('+ currOffset + ',0);\n']);
							}
							n ++;
						}
						//if (cIdx >= stIdx && cIdx <= edIdx) { subTrkArr.push([(crX + n*25),'.Rail ' + railIdx + ';' + offs2 + ';0;' + defaultRailIndex]); }
						paralellTrack.push([railIdx,offs2,0,sArr[0],parseInt(sArr[2])]);
									
					} else {
						var railIdx = 1;  											
						for (p = 0; p < paralellTrack.length; p++) {
							if (paralellTrack[p][0] == railIdx) {
								railIdx ++;  																			
							} else {
								break;
							}
						}
			

						if (cIdx >= stIdx && cIdx <= edIdx) { 
							subTrkArr.push([ crX, '\tTrack[\'' + railIdx + '\'].Gauge('+ gauge +');\n']); 
							subTrkArr.push([ crX, '\tTrack[\'' + railIdx + '\'].Position('+ side*stOffset + ',0);\n']); 
							subTrkArr.push([ crX, '\tRepeater[\'railbase_' + railIdx + '\'].Begin(\'' + railIdx + '\', 0, 0, 0, 0, 0, 0, 3, 5, 5,\'' + defaultrailbasekey + '\');\n']);
							subTrkArr.push([ crX, '\tRepeater[\'railL_' + railIdx + '\'].Begin(\'' + railIdx + '\', 0, 0, 0, 0, 0, 0, 3, 5, 5,\'' + defaultrailLkey + '\');\n']);
							subTrkArr.push([ crX, '\tRepeater[\'railR_' + railIdx + '\'].Begin(\'' + railIdx + '\', 0, 0, 0, 0, 0, 0, 3, 5, 5,\'' + defaultrailRkey + '\');\n']);
							subTrkArr.push([ crX, '\tRepeater[\'ohwire_' + railIdx + '\'].Begin(\'' + railIdx + '\', 0, 0, 0, 0, 0, 0, 0, 25, 25,\'' + defaultohwirekey + '\');\n']);
						}
						paralellTrack.push([railIdx,side*stOffset,0,sArr[0],parseInt(sArr[2])]);
					}
					
				} else {
					var endOffset = parseFloat(lXarr[2]);
					//var edSwlength = (lXarr[3] != '') ? parseFloat(lXarr[3]) : 0;
					var side0 = (parseFloat(lXarr[1]) < 0) ? -1 : 1;
					var si0 = 0;
					var si1 = parseInt(sArr[2]);	
					
					for (p = 0; p < paralellTrack.length; p++) {
						if (paralellTrack[p][3] == sArr[0]) {
							railIdx = paralellTrack[p][0];
							si0 = paralellTrack[p][4] + 1;
							paralellTrack.splice(p, 1);
							break;						
						}
					}
						
					//sline = '(side line 1 id):(0=start,>0 end):index:sideline_uid,   (side line 2 id):(0=start,>0 end):index:sideline_uid,,,,....';
					//newPoly.markers.getAt(0).lineX = baseline_id + ':' + side + ':' + startOffset + ':' + stSwlength + ':' + baseline_uid;
					//newPoly.markers.getAt(newPoly.markers.length-1).lineX = baseline_id + ':' + side + ':' + endOffset + ':' + edSwlength + ':' + baseline_uid;	
												
					for (i = si0; i < si1; i++) {
						var sLxD = 0;
						if (s_polyL.markers.getAt(i).lineX != '') {							
							var slDarr = s_polyL.markers.getAt(i).lineX.split(':');
							
							if (slDarr[4] != '') {
								for (j=0;j< MapToolbar.features['lineTab'][lXarr[0]].markers.getLength();j++) {
									if (slDarr[4] == MapToolbar.features['lineTab'][lXarr[0]].markers.getAt(j).uid) {
										sLxD = getTrackDistanceFromStart(lXarr[0],j).LwPitch;
										sLxD = Math.round(sLxD/25)*25;
										break;
									}
								}
							} else {
								var e1 = s_polyL.markers.getAt(i).getPosition();
								var j = formLineWidenAddAt(lXarr[0], e1);
								var preD = getTrackDistanceFromStart(lXarr[0],j).LwPitch;

								var Hca = google.maps.geometry.spherical.computeHeading(e1,MapToolbar.features['lineTab'][lXarr[0]].markers.getAt(j+1).getPosition());
								var Hab = google.maps.geometry.spherical.computeHeading(MapToolbar.features['lineTab'][lXarr[0]].markers.getAt(j).getPosition(),MapToolbar.features['lineTab'][lXarr[0]].markers.getAt(j+1).getPosition());
								var Hcb = google.maps.geometry.spherical.computeHeading(e1,MapToolbar.features['lineTab'][lXarr[0]].markers.getAt(j+1).getPosition());
								var Hba = google.maps.geometry.spherical.computeHeading(MapToolbar.features['lineTab'][lXarr[0]].markers.getAt(j+1).getPosition(),MapToolbar.features['lineTab'][lXarr[0]].markers.getAt(j).getPosition());
					
								var Xac = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features['lineTab'][lXarr[0]].markers.getAt(j).getPosition(),e1);
								var Xbc = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features['lineTab'][lXarr[0]].markers.getAt(j+1).getPosition(),e1);
								var Xab = google.maps.geometry.spherical.computeDistanceBetween(MapToolbar.features['lineTab'][lXarr[0]].markers.getAt(j).getPosition(),MapToolbar.features['lineTab'][lXarr[0]].markers.getAt(j+1).getPosition());
					
								var angleA = intersection_angle(Hca,Hab).angle ;
								var angleB = intersection_angle(Hcb,Hba).angle ; 
					
								var Xcc2a = Xac * Math.sin(angleA.toRad());
								var Xcc2b = Xbc * Math.sin(angleB.toRad()); 
					
								var Xac2 = Math.abs(Xac * Math.cos(angleA.toRad()));
								var Xbc2 = Math.abs(Xbc * Math.cos(angleB.toRad()));
								
								sLxD = preD + Xac2;
								sLxD = Math.round(sLxD/25)*25;
							}
							

							var stOffset = parseFloat(s_polyL.markers.getAt(i).lineX.split(':')[2]);
							var stSwlength = (slDarr[3] != '') ? parseFloat(slDarr[3]) : 0; 
							var side = (parseFloat(slDarr[1]) < 0) ? -1 : 1;
								
							if (stSwlength != 0) {
								var lXarr2 = s_polyL.markers.getAt(i+1).lineX.split(':'); // .getAt(1).lineX = pid1 + ':' + (-1*side) + ':' + wi3 + ':';
								var n = 0;
								var currOffset = side*stOffset;					 
								var turnoutratio = (parseFloat(lXarr2[2])-stOffset) / stSwlength;
									
								while ( n*25 < stSwlength ) {
									//currOffset = side*stOffset + side*(Math.round(turnoutratio * n * 25 * 100) / 100);
									currOffset = Math.round((side*stOffset + side * turnoutratio * n * 25)* 1000) / 1000;
									if (cIdx >= stIdx && cIdx <= edIdx) {
										//subTrkArr.push([(sLxD + n*5), '.Rail ' + railIdx + ';' + currOffset + ';0;' + defaultRailIndex]); 
										subTrkArr.push([(sLxD + n*25), '\tTrack[\'' + railIdx + '\'].Position('+ currOffset + ',0);\n']);
									}
									n ++;
								}								
							} else {
								if (cIdx >= stIdx && cIdx <= edIdx) { 
									//subTrkArr.push([ sLxD, '.Rail ' + railIdx + ';' + side*stOffset + ';0;' + defaultRailIndex ]); 
									subTrkArr.push([ sLxD, '\tTrack[\'' + railIdx + '\'].Position('+ side*stOffset+ ',0);\n']);
								}
							}	
							
								
						} else {
								
						}	
						
						//if (s_polyL.markers.getAt(i).curve != '') {
							
						//} else {

						//} 
					}
					
					//2do extent side line processing
					//setTimeout(function(){ code 2 run }, milliseconds);
						
					if (cIdx >= stIdx && cIdx <= edIdx) { 
						//subTrkArr.push([ crX, '.RailEnd ' + railIdx + ';' + side0*endOffset + ';0']); 
						subTrkArr.push([ crX, '\tTrack[\'' + railIdx + '\'].Position('+ side0*endOffset + ',0);\n']);
						subTrkArr.push([ crX, '\tRepeater[\'railbase_' + railIdx + '\'].End();\n']);
						subTrkArr.push([ crX, '\tRepeater[\'railL_' + railIdx + '\'].End();\n']);
						subTrkArr.push([ crX, '\tRepeater[\'railR_' + railIdx + '\'].End();\n']);
						subTrkArr.push([ crX, '\tRepeater[\'ohwire_' + railIdx + '\'].End();\n']);
						if (endOffset == 0) {
							subTrkArr.push([ crX, '\tJointNoise.Play(0);\n']);
						}
					}				
				}
			} else {
				alert(sArr[0] + ' not defined.');
			}
			
		}
		catch(err) {
			teks += "[Error] : error in processing side line, on line " + sArr[0] + ' at distance ' + crX + ". \n" + err.message + ". \n";
		}		
	}	
}


function turnTxt5(turn,currX) {
	var slope = Math.round(turn * 1000) / 1000;
	//if (isNaN(slope)) { alert(turn); return false; }
	var crX = Math.round(currX/25)*25;
  
	var tmpTxt = '\tLegacy.Turn(' + slope + ');\n';
	if (slope == 0 || (slope > 0 && slope >= 1) || (slope < 0 && slope <= -1)) { return false; }
	
	subTrkArr.push([crX, tmpTxt]);	
}

function stoneMark5(maxlength) {
	var crX = 0;
	
	while ( crX <= maxlength ) {
		if (crX % 1000 == 0) { //every 1000m
			subTrkArr.push([ crX, '\tStructure[\'sign_kmp\'].Put(0, 2, -0.4, 0, 0, 0, 0, 0, 0);\n']);
			structure['sign_kmp'][1]++;
		} else if (crX % 500 == 0) { //every 500m
			subTrkArr.push([ crX, '\tStructure[\'sign_500mp\'].Put(0, 2, -0.4, 0, 0, 0, 0, 0, 0);\n']);
			structure['sign_500mp'][1]++;
		} else { //every 100m
			subTrkArr.push([ crX, '\tStructure[\'sign_100mp\'].Put(0, 2, -0.4, 0, 0, 0, 0, 0, 0);\n']); 
			structure['sign_100mp'][1]++;
		}
		crX += 100;
	}
}

function speedlimitSign(V) {
	var txtStr = '';
	var r = Math.floor(V / 100);
	var p = Math.floor((V - (100 * r))/ 10);
	var s = V - (100*r) - (10*p);
	
	txtStr += '\tStructure[\'sign_spl_pole\'].Put(0, -2.5, -0.2, 0, 0, 0, 0, 0, 0);\n'; //speedlimit sign
	txtStr += '\tStructure[\'sign_spl_back\'].Put(0, -2.5, -0.2, 0, 0, 0, 0, 0, 0);\n'; //speedlimit sign
	structure['sign_spl_pole'][1]++;
	structure['sign_spl_back'][1]++;	
	
	//100 part
	if (r > 0) {
		txtStr += '\tStructure[\'sign_spl_' + r + '\'].Put(0, -2.66, -0.2, 0, 0, 0, 0, 0, 0);\n'; //speedlimit sign
		structure['sign_spl_'+ r][1]++;
	}
	
	//10 part
	txtStr += '\tStructure[\'sign_spl_' + p + '\'].Put(0, -2.48, -0.2, 0, 0, 0, 0, 0, 0);\n'; //speedlimit sign
	structure['sign_spl_'+ p][1]++;
	
	//1 part
	txtStr += '\tStructure[\'sign_spl_' + s + '\'].Put(0, -2.3, -0.2, 0, 0, 0, 0, 0, 0);\n'; //speedlimit sign
	structure['sign_spl_'+ s][1]++;
	
	return txtStr;
}