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


File : gbm-conv-openbve-p3d1.js
purpose : open bve route builder, data conversion function
type : prototype system (experimental Or still under R&D)
version : prototype 3
build : 120+
last update : 3 April 2013 11:00am (GMT 8+)

*/

	var Rail = new Array();
	var Pole = new Array();
	var DikeL = new Array();
	var DikeR = new Array();
	var WallL = new Array();
	var WallR = new Array();
	var Ground = new Array();
	var Beacon = new Array();
	var FormL = new Array();
	var FormR = new Array();
	var FormCL = new Array();
	var FormCR = new Array();
	var RoofL = new Array();
	var RoofR = new Array();
	var RoofCL = new Array();
	var RoofCR = new Array();
	var CrackL = new Array();
	var CrackR = new Array();
	var FreeObj = new Array();
	var BackGround = new Array();
	
	// GB Maps structure object
	var GBtunnel = [];
	var GBdike = [];
	var GBcut = [];
	var GBbridge = [];
	var GBfo = [];
	var GBform = [];
	var GBug = [];
	
	var paralellTrack = [];   	// paralellTrack[0] = [RailIndex,X,Y,polyid]; // data : railindex, x-distance from main track, y-height --- 2 study
	var teks = '';
	var defaultRailIndex = 0;
	var mainTrkArr = [];
	var subTrkArr = [];
	var noteTrkArr = []; 
	var pitchRatio = 0;
	 
function generateRouteBVE4_OpenBVE(polyid)
{	
	FreeObj[0] = 'gb_maps\\km_p\\m_curve.csv'; //curve sign
	
	FreeObj[1] = 'gb_maps\\km_p\\sloop_down-up.csv'; //menurun opp. mendaki
	FreeObj[2] = 'gb_maps\\km_p\\sloop_level-up.csv'; //level opp. mendaki
	FreeObj[3] = 'gb_maps\\km_p\\sloop_down-level.csv'; //menurun opp. level
	FreeObj[4] = 'gb_maps\\km_p\\sloop_up-level.csv'; //mendaki opp. level
	FreeObj[5] = 'gb_maps\\km_p\\sloop_level-down.csv'; //level opp. menurun
	FreeObj[6] = 'gb_maps\\km_p\\sloop_up-down.csv'; //mendaki opp. menurun
	FreeObj[7] = 'gb_maps\\km_p\\sloop_up-up.csv'; //mendaki-mendaki, lain2 ratio
	FreeObj[8] = 'gb_maps\\km_p\\sloop_down-down.csv'; //menurun-menurun, lain2 ratio
	
	FreeObj[9] = 'gb_maps\\km_p\\kmp.csv'; //kilometer mark
	FreeObj[10] = 'gb_maps\\km_p\\500mp.csv'; //500 meter mark
	FreeObj[11] = 'gb_maps\\km_p\\100mp.csv'; //100 meter mark
	
	FreeObj[12] = 'gb_maps\\Symbol_Tr_Al\\s_begin.csv'; //S start sign
	FreeObj[13] = 'gb_maps\\Symbol_Tr_Al\\s_cancel.csv'; //S cancel sign
	FreeObj[14] = 'gb_maps\\Symbol_Tr_Al\\sta_near.csv'; //station near sign
	FreeObj[15] = 'gb_maps\\Symbol_Tr_Al\\start_wr.csv'; //
	FreeObj[16] = 'gb_maps\\Symbol_Tr_Al\\stop_through.csv'; //
	FreeObj[17] = 'gb_maps\\Symbol_Tr_Al\\whistle.csv'; //whistle sign
	
	FreeObj[18] = 'gb_maps\\rail\\stop\\stop_01.csv'; //stop mark
	FreeObj[19] = 'gb_maps\\rail\\stop\\stop_02.csv'; //stop mark
	FreeObj[20] = 'gb_maps\\rail\\stop\\stop_03.csv'; //stop ballast
	
	
	Pole[0] = ['0; 0','test_route\\pole_2.csv'];
	
	teks ='With Route\n';
	
	if ($('#dbr_trackGauge').val() != '') {
		teks +='.Gauge ' + $('#dbr_trackGauge').val() + '\n';
	} else {
		teks +='.Gauge 1067\n';
	}
	
	if ($('#dbr_note').val() != '') {
		teks +='.comment ' + $('#dbr_note').val() + '\n';
	} else {
		teks +='.comment build with GB Maps - ギビマップ - Prototype 2\n';
	}

	if ($('#dbr_devID').val() != '') {
		teks +='.DeveloperID ' + $('#dbr_devID').val() + '\n';
	} else {
		teks +='.DeveloperID Karya IT,\n';
	}

	teks +='\nWith Train\n';
	if ($('#dbr_runningTrain').val() != 'none') {
		teks +='.Folder ' + $('#dbr_runningTrain').val() + '\n';
	} else {
		teks +='.Folder AK231\n\n';
	}
	

	teks +='\nWith Texture\n';
	no = 0;
	for (i = 0; i < bvebveStrOjArr.length; i++) {		
		if (bvebveStrOjArr[i][3] == 'Background') {
			teks += '.Background(' + no + ') ' + bvebveStrOjArr[i][5].replace(/[/]/g,'\\') + ',,\n';
			BackGround.push(bvebveStrOjArr[i][5].replace(/[/]/g,'\\'));
			no++;
		}		
	}	
	
	teks +='\nWith Structure\n';
	
	for (i = 0; i < bverailobjArr.length; i++) {
		teks += '.Rail(' + bverailobjArr[i][0] + ') ' + bverailobjArr[i][6].replace(/[/]/g,'\\') + ',,\n';
		Rail.push(bverailobjArr[i][6].replace(/[/]/g,'\\'));
		
		if (typeof $('#dbr_railtypedefault option:selected').val() != 'undefined') {
			var defaultRail = $('#dbr_railtypedefault option:selected').text();
			if ( defaultRail == bverailobjArr[i][2] ) { defaultRailIndex = i; }
		}	
	}
	no = 0;
//['0','DefaultDike','Default Dike','dike02.png','seto_down/dike/dikel.csv','seto_down/dike/diker.csv']  	
  for (var i=0; i < bvedikeObjArr.length; i++) {
  	var addno = false;
		if (typeof bvedikeObjArr[i][4] != 'undefined') {
			if (bvedikeObjArr[i][4] != '') {
				var csvfile = bvedikeObjArr[i][4].replace(/[/]/g,'\\');
				if (DikeL.indexOf(csvfile) < 0) {
					DikeL.push(csvfile);
					teks += '.DikeL(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				} 							
			}									
		}
		if (typeof bvedikeObjArr[i][5] != 'undefined') {
			if (bvedikeObjArr[i][5] != '') {
				var csvfile = bvedikeObjArr[i][5].replace(/[/]/g,'\\');
				if (DikeR.indexOf(csvfile) < 0) {
					DikeR.push(csvfile);
					teks += '.DikeR(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				} 							
			}									
		}
		if (addno) { no++;}
  }	
	no = 0;
	for (var i=0; i < bvetunnelObjArr.length; i++) {
  	//0~3 ['0','DarkTunnel01','Dark Tunnel with light','ctunnel1.png',
  	//4~5 'test_route/tunnel_le/tunstart1.csv','test_route/tunnel_le/tunstart2.csv',
  	//6~7 'test_route/tunnel_le/tunnel1ls.csv','test_route/tunnel_le/tunnel1rs.csv',
  	//8-10 'test_route/tunnel_le/ntunnel1l.csv','test_route/tunnel_le/ntunnel1r.csv','0',
  	//11-13 'test_route/tunnel_le/tunnel1l.csv','test_route/tunnel_le/tunnel1r.csv','100',
  	//14-15 'test_route/tunnel_le/tunnel1le.csv','test_route/tunnel_le/tunnel1re.csv'];
    
    if (typeof bvetunnelObjArr[i][4] != 'undefined') { //tunnel entrance
			if (bvetunnelObjArr[i][4] != '') {
				var csvfile = bvetunnelObjArr[i][4].replace(/[/]/g,'\\');
				if (FreeObj.indexOf(csvfile) < 0) {
					FreeObj.push(csvfile);
					//teks += '.FreeObj(' + (FreeObj.length-1) + ') ' + csvfile + ',,\n';					
				} 							
			}							
		}
		if (typeof bvetunnelObjArr[i][5] != 'undefined') { //tunnel exit
			if (bvetunnelObjArr[i][5] != '') {
				var csvfile = bvetunnelObjArr[i][5].replace(/[/]/g,'\\');
				if (FreeObj.indexOf(csvfile) < 0) {
					FreeObj.push(csvfile);
					//teks += '.FreeObj(' + (FreeObj.length-1) + ') ' + csvfile + ',,\n';					
				} 							
			}							
		}
		if ((typeof bvetunnelObjArr[i][6] != 'undefined') && (typeof bvetunnelObjArr[i][7] != 'undefined'))  { 
			if ((bvetunnelObjArr[i][6] != '') && (bvetunnelObjArr[i][7] != '')) {
				var csvfile = bvetunnelObjArr[i][6].replace(/[/]/g,'\\');
				var addno = false;
				if (WallL.indexOf(csvfile) < 0) {
					WallL.push(csvfile);
					teks += '.WallL(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				csvfile = bvetunnelObjArr[i][7].replace(/[/]/g,'\\');
				if (WallR.indexOf(csvfile) < 0) {
					WallR.push(csvfile);
					teks += '.WallR(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				if (addno) { no++;}
			}
		}
		if ((typeof bvetunnelObjArr[i][8] != 'undefined') && (typeof bvetunnelObjArr[i][9] != 'undefined'))  { 
			if ((bvetunnelObjArr[i][8] != '') && (bvetunnelObjArr[i][9] != '')) {
				var csvfile = bvetunnelObjArr[i][8].replace(/[/]/g,'\\');
				var addno = false;
				if (WallL.indexOf(csvfile) < 0) {
					WallL.push(csvfile);
					teks += '.WallL(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				csvfile = bvetunnelObjArr[i][9].replace(/[/]/g,'\\');
				if (WallR.indexOf(csvfile) < 0) {
					WallR.push(csvfile);
					teks += '.WallR(' + no + ') ' + csvfile + ',,\n';			
					addno = true;	
				}
				if (addno) { no++;}
			}
		}
		
		if ((typeof bvetunnelObjArr[i][11] != 'undefined') && (typeof bvetunnelObjArr[i][12] != 'undefined'))  { 
			if ((bvetunnelObjArr[i][11] != '') && (bvetunnelObjArr[i][12] != '')) {
				var csvfile = bvetunnelObjArr[i][11].replace(/[/]/g,'\\');
				var addno = false;
				if (WallL.indexOf(csvfile) < 0) {
					WallL.push(csvfile);
					teks += '.WallL(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				csvfile = bvetunnelObjArr[i][12].replace(/[/]/g,'\\');
				if (WallR.indexOf(csvfile) < 0) {
					WallR.push(csvfile);
					teks += '.WallR(' + no + ') ' + csvfile + ',,\n';		
					addno = true;			
				}
				if (addno) { no++;}
			}
		}
		if ((typeof bvetunnelObjArr[i][14] != 'undefined') && (typeof bvetunnelObjArr[i][15] != 'undefined'))  { 
			if ((bvetunnelObjArr[i][14] != '') && (bvetunnelObjArr[i][15] != '')) {
				var csvfile = bvetunnelObjArr[i][14].replace(/[/]/g,'\\');
				var addno = false;
				if (WallL.indexOf(csvfile) < 0) {
					WallL.push(csvfile);
					teks += '.WallL(' + no + ') ' + csvfile + ',,\n';		
					addno = true;			
				}
				csvfile = bvetunnelObjArr[i][15].replace(/[/]/g,'\\');
				if (WallR.indexOf(csvfile) < 0) {
					WallR.push(csvfile);
					teks += '.WallR(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				if (addno) { no++;}
			}
		}

  }
  
  //['1','Flyover02','Flyover 2','fo02.png','seto_down/wall/walll.csv','seto_down/wall/wallr.csv','pierdbll.csv','50','']
  for (var i=0; i < bveFOObjArr.length; i++) {
  	if ((typeof bveFOObjArr[i][4] != 'undefined') && (typeof bveFOObjArr[i][5] != 'undefined'))  { 
			if ((bveFOObjArr[i][4] != '') && (bveFOObjArr[i][5] != '')) {
				var csvfile = bveFOObjArr[i][4].replace(/[/]/g,'\\');
				var addno = false;
				if (WallL.indexOf(csvfile) < 0) {
					WallL.push(csvfile);
					teks += '.WallL(' + no + ') ' + csvfile + ',,\n';		
					addno = true;			
				}
				csvfile = bveFOObjArr[i][5].replace(/[/]/g,'\\');
				if (WallR.indexOf(csvfile) < 0) {
					WallR.push(csvfile);
					teks += '.WallR(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				if (addno) { no++;}
			}
		}
		if (typeof bveFOObjArr[i][6] != 'undefined') { //pier
			if (bveFOObjArr[i][6] != '') {
				var csvfile = bveFOObjArr[i][6].replace(/[/]/g,'\\');
				if (FreeObj.indexOf(csvfile) < 0) {
					FreeObj.push(csvfile);
					//teks += '.FreeObj(' + (FreeObj.length-1) + ') ' + csvfile + ',,\n';					
				} 							
			}							
		}
  } 
  
  //0~3 ['0','ug1','UG1','ctunnel3.png',
  //4~5 'test_route/tunnel_sikaku/tunnel_sikakuentl.csv','test_route/tunnel_sikaku/tunnel_sikakuentr.csv',
  //6~8 'test_route/tunnel_sikaku/tunnel_sikakul.csv','test_route/tunnel_sikaku/tunnel_sikakur.csv','25',
  //9~11 '','','0',
  //12~13 'test_route/tunnel_sikaku/tunnel_sikakuendl.csv','test_route/tunnel_sikaku/tunnel_sikakuendr.csv']
 	for (var i=0; i < bveUGObjArr.length; i++) {
		if ((typeof bveUGObjArr[i][4] != 'undefined') && (typeof bveUGObjArr[i][5] != 'undefined'))  { 
			if ((bveUGObjArr[i][4] != '') && (bveUGObjArr[i][5] != '')) {
				var csvfile = bveUGObjArr[i][4].replace(/[/]/g,'\\');
				var addno = false;
				if (WallL.indexOf(csvfile) < 0) {
					WallL.push(csvfile);
					teks += '.WallL(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				csvfile = bveUGObjArr[i][5].replace(/[/]/g,'\\');
				if (WallR.indexOf(csvfile) < 0) {
					WallR.push(csvfile);
					teks += '.WallR(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				if (addno) { no++;}
			}
		}

		if ((typeof bveUGObjArr[i][6] != 'undefined') && (typeof bveUGObjArr[i][7] != 'undefined'))  { 
			if ((bveUGObjArr[i][6] != '') && (bveUGObjArr[i][7] != '')) {
				var csvfile = bveUGObjArr[i][6].replace(/[/]/g,'\\');
				var addno = false;
				if (WallL.indexOf(csvfile) < 0) {
					WallL.push(csvfile);
					teks += '.WallL(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				csvfile = bveUGObjArr[i][7].replace(/[/]/g,'\\');
				if (WallR.indexOf(csvfile) < 0) {
					WallR.push(csvfile);
					teks += '.WallR(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				if (addno) { no++;}
			}
		}

		if ((typeof bveUGObjArr[i][9] != 'undefined') && (typeof bveUGObjArr[i][10] != 'undefined'))  { 
			if ((bveUGObjArr[i][9] != '') && (bveUGObjArr[i][10] != '')) {
				var csvfile = bveUGObjArr[i][9].replace(/[/]/g,'\\');
				var addno = false;
				if (WallL.indexOf(csvfile) < 0) {
					WallL.push(csvfile);
					teks += '.WallL(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				csvfile = bveUGObjArr[i][10].replace(/[/]/g,'\\');
				if (WallR.indexOf(csvfile) < 0) {
					WallR.push(csvfile);
					teks += '.WallR(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				if (addno) { no++;}
			}
		}

		if ((typeof bveUGObjArr[i][12] != 'undefined') && (typeof bveUGObjArr[i][13] != 'undefined'))  { 
			if ((bveUGObjArr[i][12] != '') && (bveUGObjArr[i][13] != '')) {
				var csvfile = bveUGObjArr[i][12].replace(/[/]/g,'\\');
				var addno = false;
				if (WallL.indexOf(csvfile) < 0) {
					WallL.push(csvfile);
					teks += '.WallL(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				csvfile = bveUGObjArr[i][13].replace(/[/]/g,'\\');
				if (WallR.indexOf(csvfile) < 0) {
					WallR.push(csvfile);
					teks += '.WallR(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}
				if (addno) { no++;}
			}
		}

  } 
  
  // ['2','LeftRight1','Left Right 1','cut03.png','seto_down/dike/diker.csv','seto_down/dike/dikel.csv']
	for (var i=0; i < bvecutObjArr.length; i++) {
  	var addno = false;
  	if (typeof bvecutObjArr[i][4] != 'undefined') {
			if (bvecutObjArr[i][4] != '') {
				var csvfile = bvecutObjArr[i][4].replace(/[/]/g,'\\');
				if (WallL.indexOf(csvfile) < 0) {
					WallL.push(csvfile);
					teks += '.WallL(' + no + ') ' + csvfile + ',,\n';		
					addno = true;		
				} 							
			}									
		}
		if (typeof bvecutObjArr[i][5] != 'undefined') {
			if (bvecutObjArr[i][5] != '') {
				var csvfile = bvecutObjArr[i][5].replace(/[/]/g,'\\');
				if (WallR.indexOf(csvfile) < 0) {
					WallR.push(csvfile);
					teks += '.WallR(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}							
			}									
		}
		if (addno) { no++;}	
  }  
	
	no = 0;
	for (i = 0; i < bvecrackObjArr.length; i++) {		
		teks += '.CrackL(' + no + ') ' + bvecrackObjArr[i][4].replace(/[/]/g,'\\') + ',,\n';
		CrackL.push(bvecrackObjArr[i][4].replace(/[/]/g,'\\'));
		teks += '.CrackR(' + no + ') ' + bvecrackObjArr[i][5].replace(/[/]/g,'\\') + ',,\n';
		CrackR.push(bvecrackObjArr[i][5].replace(/[/]/g,'\\'));			
		no++;
	}
	
	var np =[0,0,0,0];
	for (i = 0; i < bvepoleObjArr.length; i++) {
		var tracksNum = parseInt(bvepoleObjArr[i][5]) - 1;
		teks += '.Pole(' + tracksNum + ';' + np[tracksNum] + ') ' + bvepoleObjArr[i][4].replace(/[/]/g,'\\') + ',,\n';
		var newPole = [tracksNum + ';' + np[tracksNum], bvepoleObjArr[i][4].replace(/[/]/g,'\\')];
		Pole.push(newPole);
		np[tracksNum]++;
	}

//0~3 ['4','middleFormwR','Middle with Roof','middlepform.png',
//4~7 'forml.csv','formcls.csv','formcrs.csv','formr.csv',
//8~11 'roofl.csv','roofcl.csv','roofcr.csv','roofr.csv']
	no = 1;
  for (var i=0; i < bveplatformObjArr.length; i++) {
  	var addno = false;
  	if (typeof bveplatformObjArr[i][4] != 'undefined') { 
			if (bveplatformObjArr[i][4] != '') {
				var csvfile = bveplatformObjArr[i][4].replace(/[/]/g,'\\');				
				if (FormL.indexOf(csvfile) < 0) {
					FormL.push(csvfile);
					teks += '.FormL(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}				
			}
		}
		
  	if (typeof bveplatformObjArr[i][5] != 'undefined') { 
			if (bveplatformObjArr[i][5] != '') {
				var csvfile = bveplatformObjArr[i][5].replace(/[/]/g,'\\');				
				if (FormCL.indexOf(csvfile) < 0) {
					FormCL.push(csvfile);
					teks += '.FormCL(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}				
			}
		}
		
  	if (typeof bveplatformObjArr[i][6] != 'undefined') { 
			if (bveplatformObjArr[i][6] != '') {
				var csvfile = bveplatformObjArr[i][6].replace(/[/]/g,'\\');				
				if (FormCR.indexOf(csvfile) < 0) {
					FormCR.push(csvfile);
					teks += '.FormCR(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}				
			}
		}
		
  	if (typeof bveplatformObjArr[i][7] != 'undefined') { 
			if (bveplatformObjArr[i][7] != '') {
				var csvfile = bveplatformObjArr[i][7].replace(/[/]/g,'\\');				
				if (FormR.indexOf(csvfile) < 0) {
					FormR.push(csvfile);
					teks += '.FormR(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}				
			}
		}
		
  	if (typeof bveplatformObjArr[i][8] != 'undefined') { 
			if (bveplatformObjArr[i][8] != '') {
				var csvfile = bveplatformObjArr[i][8].replace(/[/]/g,'\\');				
				if (RoofL.indexOf(csvfile) < 0) {
					RoofL.push(csvfile);
					teks += '.RoofL(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}				
			}
		}
		
  	if (typeof bveplatformObjArr[i][9] != 'undefined') { 
			if (bveplatformObjArr[i][9] != '') {
				var csvfile = bveplatformObjArr[i][9].replace(/[/]/g,'\\');				
				if (RoofCL.indexOf(csvfile) < 0) {
					RoofCL.push(csvfile);
					teks += '.RoofCL(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}				
			}
		}
		
  	if (typeof bveplatformObjArr[i][10] != 'undefined') { 
			if (bveplatformObjArr[i][10] != '') {
				var csvfile = bveplatformObjArr[i][10].replace(/[/]/g,'\\');				
				if (RoofCR.indexOf(csvfile) < 0) {
					RoofCR.push(csvfile);
					teks += '.RoofCR(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}				
			}
		}
		
  	if (typeof bveplatformObjArr[i][11] != 'undefined') { 
			if (bveplatformObjArr[i][11] != '') {
				var csvfile = bveplatformObjArr[i][11].replace(/[/]/g,'\\');				
				if (RoofR.indexOf(csvfile) < 0) {
					RoofR.push(csvfile);
					teks += '.RoofR(' + no + ') ' + csvfile + ',,\n';
					addno = true;
				}				
			}
		}														
		
		if (addno) { no++;}
  }	

		
	no = 0;
	for (i = 0; i < bvebveStrOjArr.length; i++) {
		if (bvebveStrOjArr[i][3] == 'Ground') {
			teks += '.Ground(' + no + ') ' + bvebveStrOjArr[i][5].replace(/[/]/g,'\\') + ',,\n';
			Ground.push(bvebveStrOjArr[i][5].replace(/[/]/g,'\\'));
			no++;
		}		
	}	
	for (i = 0; i < bvebveStrOjArr.length; i++) {		
		if (bvebveStrOjArr[i][3] == 'River') {
			teks += '.Ground(' + no + ') ' + bvebveStrOjArr[i][5].replace(/[/]/g,'\\') + ',,\n';
			Ground.push(bvebveStrOjArr[i][5].replace(/[/]/g,'\\'));
			no++;			
		}
	}
		
	no = 0;
	for (i = 0; i < bvebveStrOjArr.length; i++) {
		if (bvebveStrOjArr[i][3] == 'Beacon') {
			teks += '.Beacon(' + no + ') ' + bvebveStrOjArr[i][5].replace(/[/]/g,'\\') + ',,\n';
			Beacon.push(bvebveStrOjArr[i][5].replace(/[/]/g,'\\'));
			no++;
		}		
	}	
	
	if (WallL.length == WallR.length) {
		no = WallL.length;
	} else if (WallL.length == WallR.length) {
		no = WallL.length;
	} else {
		no = WallR.length;
	}
	for (i = 0; i < bvebveStrOjArr.length; i++) {
		if (bvebveStrOjArr[i][3] == 'Wall') {
			teks += '.WallL(' + no + ') ' + bvebveStrOjArr[i][6].replace(/[/]/g,'\\') + ',,\n';
			teks += '.WallR(' + no + ') ' + bvebveStrOjArr[i][7].replace(/[/]/g,'\\') + ',,\n';
			WallL.push(bvebveStrOjArr[i][6].replace(/[/]/g,'\\'));
			WallR.push(bvebveStrOjArr[i][7].replace(/[/]/g,'\\'));
			no++;
		}		
	}	
	
	
	//['0','concreteB1','Concrete Bridge 1','concrete-bridge-01.png','bridgel.csv','<center>','bridger.csv','<pier>','0']
  for (var i=0; i < bvebridgeObjArr.length; i++) {  	
		if (typeof bvebridgeObjArr[i][4] != 'undefined') {
			if (bvebridgeObjArr[i][4] != '') {
				var csvfile = bvebridgeObjArr[i][4].replace(/[/]/g,'\\');
				if (FreeObj.indexOf(csvfile) < 0) {
					FreeObj.push(csvfile);
					//teks += '.FreeObj(' + (FreeObj.length-1) + ') ' + csvfile + ',,\n';
				} 							
			}									
		}
		if (typeof bvebridgeObjArr[i][5] != 'undefined') {
			if (bvebridgeObjArr[i][5] != '') {
				var csvfile = bvebridgeObjArr[i][5].replace(/[/]/g,'\\');
				if (FreeObj.indexOf(csvfile) < 0) {
					FreeObj.push(csvfile);
					//teks += '.FreeObj(' + (FreeObj.length-1) + ') ' + csvfile + ',,\n';
				} 							
			}									
		}
		if (typeof bvebridgeObjArr[i][6] != 'undefined') {
			if (bvebridgeObjArr[i][6] != '') {
				var csvfile = bvebridgeObjArr[i][6].replace(/[/]/g,'\\');
				if (FreeObj.indexOf(csvfile) < 0) {
					FreeObj.push(csvfile);
					//teks += '.FreeObj(' + (FreeObj.length-1) + ') ' + csvfile + ',,\n';
				} 							
			}									
		}
		if (typeof bvebridgeObjArr[i][7] != 'undefined') {
			if (bvebridgeObjArr[i][7] != '') {
				var csvfile = bvebridgeObjArr[i][7].replace(/[/]/g,'\\');
				if (FreeObj.indexOf(csvfile) < 0) {
					FreeObj.push(csvfile);
					//teks += '.FreeObj(' + (FreeObj.length-1) + ') ' + csvfile + ',,\n';
				} 							
			}									
		}
		
  }
 
  //['1','rcD1','Road crossing D 1','toolbar.png','tollbardl.csv','crossingd.csv','tollbardr.csv']
  for (var i=0; i < bveRCObjArr.length; i++) {
		if (typeof bveRCObjArr[i][4] != 'undefined') {
			if (bveRCObjArr[i][4] != '') {
				var csvfile = bveRCObjArr[i][4].replace(/[/]/g,'\\');
				if (FreeObj.indexOf(csvfile) < 0) {
					FreeObj.push(csvfile);
					//teks += '.FreeObj(' + (FreeObj.length-1) + ') ' + csvfile + ',,\n';
				} 							
			}									
		}
		if (typeof bveRCObjArr[i][5] != 'undefined') {
			if (bveRCObjArr[i][5] != '') {
				var csvfile = bveRCObjArr[i][5].replace(/[/]/g,'\\');
				if (FreeObj.indexOf(csvfile) < 0) {
					FreeObj.push(csvfile);
					//teks += '.FreeObj(' + (FreeObj.length-1) + ') ' + csvfile + ',,\n';
				} 							
			}									
		}
		if (typeof bveRCObjArr[i][6] != 'undefined') {
			if (bveRCObjArr[i][6] != '') {
				var csvfile = bveRCObjArr[i][6].replace(/[/]/g,'\\');
				if (FreeObj.indexOf(csvfile) < 0) {
					FreeObj.push(csvfile);
					//teks += '.FreeObj(' + (FreeObj.length-1) + ') ' + csvfile + ',,\n';
				} 							
			}									
		}		
  }
  
  			
	for (i = 0; i < FreeObj.length; i++) {		
		teks += '.FreeObj(' + i + ') ' + FreeObj[i].replace(/[/]/g,'\\') + ',,\n';
	}	
	for (i = 0; i < bvefreeObjArr.length; i++) {		
		FreeObj.push(bvefreeObjArr[i][5].replace(/[/]/g,'\\'));
		teks += '.FreeObj(' + (FreeObj.length-1) + ') ' + bvefreeObjArr[i][5].replace(/[/]/g,'\\') + ',,\n';
	}	
    	

	teks +='\nWith Track\n';
	
  var polyL = MapToolbar.features['lineTab'][polyid];
  var allPoints = polyL.getPath().getArray();

	if (typeof polyL == 'undefined') {
		alert('line (' + polyid + ') is unknown. BVE route building is terminated by system');
		return false;
	}

  var persen = 0;
  var distance = 0;
	
  
  
//line_1,ptype,note,trackname,trackservice,trackno,tracksection,trackbve,kit, 3.6975060399011115;101.50496006011963;note;pitch;bve;kit, ...
// 'curve:'+ curve.id + ';radius:' + preR * dir + ';cant:' + parseFloat($('#sBtnRCCant').val()) + ';limit:' + parseFloat($('#sBtnRCDesignSpeed').val()) + ';tlength:' + l2m1 + ';clength:' + arcL + ';center:' + Cc.lat() + '/' + Cc.lng() + ';start_point:' + extp[0].lat() + '/' + extp[0].lng() + ';end_point:' + extp[extp.length-1].lat() + '/' + extp[extp.length-1].lng()  + ';h1:' + h1 + ';h2:' + h2 + ';forceSL:' + enforceSL;
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
/*tcurve
					note: null, // any extra note 
					pitch: null, // track pitch
					bve: null, // various bve data
					lineX:null, // non parallel line distance
					turn:null, // main line non curve turning
					kit:null, // others data (reserved) by Karya IT
					pid: poly.id
*/


	
	//main data conversion logic
  for (var i = 0; i < allPoints.length; i++) 
  { 
  	if (i == 0) {
			if (typeof polyL.markers.getAt(i) != 'undefined')  {
  			mainTrkArr.push([0,'.RailType 0;' + defaultRailIndex  + ',.Height 1.6']);
  			var currX = 0;
  	
    		if (polyL.markers.getAt(i).pitch != null){
    			if (polyL.markers.getAt(i).pitch != ''){
    				pitchTxt(polyL.markers.getAt(i).pitch,currX);
    			}
  			}
  				
 				if (polyL.markers.getAt(i).bve != null){
  				if (polyL.markers.getAt(i).bve != ''){
  					bveTxt(polyL.markers.getAt(i).bve,currX);
  				}
  			}

  			if (polyL.markers.getAt(i).lineX != null){
  				if (polyL.markers.getAt(i).lineX != ''){
  					if ( polyL.markers.getAt(i).lineX.indexOf('§') == 0) { 
  						polyL.markers.getAt(i).lineX = polyL.markers.getAt(i).lineX.substring(1,polyL.markers.getAt(i).lineX.length);
  					}  			
						lineXTxt(polyL.markers.getAt(i).lineX,currX);  					
		  		}  					
  			}

  			if (polyL.markers.getAt(i).turn != null){
  				if (polyL.markers.getAt(i).turn != ''){
  					turnTxt(polyL.markers.getAt(i).turn,currX);
		  		}  					
  			}
  				
  			if (polyL.markers.getAt(i).prln != null){
  				if (polyL.markers.getAt(i).prln != ''){
  					if ( polyL.markers.getAt(i).prln.indexOf('§') == 0) { 
  						polyL.markers.getAt(i).prln = polyL.markers.getAt(i).prln.substring(1,polyL.markers.getAt(i).prln.length);
  					}  			
						prlnTxt(polyL.markers.getAt(i).prln,currX);
  				}  					
  			}

  			if (polyL.markers.getAt(i).kit != null){
  				if (polyL.markers.getAt(i).kit != ''){  			
  					kitTxt(polyL.markers.getAt(i).kit,currX);
  				}  					
  			}
  				
  			if (polyL.markers.getAt(i).note != null){
  				if (polyL.markers.getAt(i).note != ''){
  					noteTrkArr.push([currX,polyL.markers.getAt(i).note]);
  				}
  			}
			}  	
				
  	} else if (i == allPoints.length-1) {
  		distance += google.maps.geometry.spherical.computeDistanceBetween(allPoints[i-1], allPoints[i]);
					
			if ((polyL.markers.getAt(i-1).curve != null) && (polyL.markers.getAt(i-1).tcurve == null)) { //length correction - previous curve tangent length
  			var cuvarr = polyL.markers.getAt(i-1).curve.split('§');
  			var tL = parseFloat(cuvarr[4].split(':')[1]); 
  			var cL = parseFloat(cuvarr[5].split(':')[1]);
  			//var rIdx = cuvarr[12].split(':')[1];
  			distance -= tL;
  		} else if ((polyL.markers.getAt(i-1).curve != null) && (polyL.markers.getAt(i-1).tcurve == null)) {
  			//2do reserved for transition curve
			}
			
			var currX = Math.round(distance);
  		mainTrkArr.push([currX,'']);
  		
    	if (polyL.markers.getAt(i).pitch != null){
    		if (polyL.markers.getAt(i).pitch != ''){
    			pitchTxt(polyL.markers.getAt(i).pitch,currX);
    		}
  		}
  				
 			if (polyL.markers.getAt(i).bve != null){
  			if (polyL.markers.getAt(i).bve != ''){
  				bveTxt(polyL.markers.getAt(i).bve,currX);
  			}
  		}

  		if (polyL.markers.getAt(i).lineX != null){
  			if (polyL.markers.getAt(i).lineX != ''){
  					if ( polyL.markers.getAt(i).lineX.indexOf('§') == 0) { 
  						polyL.markers.getAt(i).lineX = polyL.markers.getAt(i).lineX.substring(1,polyL.markers.getAt(i).lineX.length);
  					}  			
						lineXTxt(polyL.markers.getAt(i).lineX,currX);  				
		  	}  					
  		}

  		if (polyL.markers.getAt(i).turn != null){
  			if (polyL.markers.getAt(i).turn != ''){
 					turnTxt(polyL.markers.getAt(i).turn,currX);
		  	}  					
  		}
  				
  		if (polyL.markers.getAt(i).prln != null){
  			if (polyL.markers.getAt(i).prln != ''){
  				if ( polyL.markers.getAt(i).prln.indexOf('§') == 0) { 
  					polyL.markers.getAt(i).prln = polyL.markers.getAt(i).prln.substring(1,polyL.markers.getAt(i).prln.length);
  				}  			
					prlnTxt(polyL.markers.getAt(i).prln,currX);
  			}  					
  		}

  		if (polyL.markers.getAt(i).kit != null){
  			if (polyL.markers.getAt(i).kit != ''){  			
  				kitTxt(polyL.markers.getAt(i).kit,currX);
  			}  					
  		}
  				
  		if (polyL.markers.getAt(i).note != null){
  			if (polyL.markers.getAt(i).note != ''){
  				noteTrkArr.push([currX,polyL.markers.getAt(i).note]);
  			}
  		}
  			
  	}	else if (typeof polyL.markers.getAt(i-1) != 'undefined')  {
				if ((polyL.markers.getAt(i-1).curve == null) && (polyL.markers.getAt(i-1).tcurve == null)) { 
					distance += google.maps.geometry.spherical.computeDistanceBetween(allPoints[i-1], allPoints[i]);
  		
  				if ((polyL.markers.getAt(i).curve != null) && (polyL.markers.getAt(i).tcurve == null)) { //length correction - previous curve tangent length
  					var cuvarr = polyL.markers.getAt(i).curve.split('§');
  					var cuvID = cuvarr[0].split(':')[1];
  					var tL = parseFloat(cuvarr[4].split(':')[1]); 
  					var cL = parseFloat(cuvarr[5].split(':')[1]);
  					var cR = cuvarr[1].split(':')[1];
  					var cant = cuvarr[2].split(':')[1];
  					var dV  = cuvarr[3].split(':')[1];
  					var eSL = cuvarr[11].split(':')[1];
  					//var rIdx = cuvarr[12].split(':')[1];
  					distance -= tL;
  					
  					if (eSL == 'true') {
  						mainTrkArr.push([Math.round(distance),'.Curve ' + cR + ';' + cant+', .FreeObj 0;0;-2;0.7;0' + ', .Limit ' + dV + ';-1;0']);
  					} else {				
  						mainTrkArr.push([Math.round(distance),'.Curve ' + cR + ';' + cant+', .FreeObj 0;0;-2;0.7;0']);
  					}
  				
 						if (polyL.markers.getAt(i).bve != null){
  						if (polyL.markers.getAt(i).bve != ''){
  							bveTxt(polyL.markers.getAt(i).bve,Math.round(distance));
  						}
  					}  					
  					
  					var cpoly = MapToolbar.features['curveTab'][cuvID];
  					
  					for (var c = 1; c < cpoly.markers.length; c++) {
  						if (typeof cpoly.markers.getAt(c).ld1 != 'undefined') { // marker on curve
  							var currX = Math.round(distance + parseFloat(cpoly.markers.getAt(c).ld1));
  							  							
  							if (cpoly.markers.getAt(c).pitch != null){
  								if (cpoly.markers.getAt(c).pitch != ''){
  									pitchTxt(cpoly.markers.getAt(c).pitch,currX);
    							}
  							}
  				
 								if (cpoly.markers.getAt(c).bve != null){
  								if (cpoly.markers.getAt(c).bve != ''){
  									bveTxt(cpoly.markers.getAt(c).bve,currX);
  								}
  							}

  							if (cpoly.markers.getAt(c).lineX != null){
  								if (cpoly.markers.getAt(c).lineX != ''){
  									if ( polyL.markers.getAt(i).lineX.indexOf('§') == 0) { 
  										polyL.markers.getAt(i).lineX = polyL.markers.getAt(i).lineX.substring(1,polyL.markers.getAt(i).lineX.length);
  									}
										lineXTxt(polyL.markers.getAt(i).lineX,currX);  						
  								}
  							}

  							if (cpoly.markers.getAt(c).turn != null){
  								if (cpoly.markers.getAt(c).turn != ''){
  									turnTxt(polyL.markers.getAt(i).turn,currX);  						
  								}  					
  							}
  				
		  					if (cpoly.markers.getAt(c).kit != null){
  								if (cpoly.markers.getAt(c).kit != ''){
  									kitTxt(cpoly.markers.getAt(c).kit,currX);	  						
  								}  					
  							}
  				
  							if (cpoly.markers.getAt(c).note != null){
  								if (cpoly.markers.getAt(c).note != ''){
  									noteTrkArr.push([currX, cpoly.markers.getAt(c).note]);
  								}
  							}
  						}
  					}
  					
  					distance += cL;
  					var tmpTxt = '.Curve 0;0'
  					
  					if (eSL == 'true') {
  						tmpTxt += ', .Limit 0;-1;0';
  					}
  					tmpTxt += ', .RailType 0;' + defaultRailIndex;

  					for (p = 0; p < paralellTrack.length; p++) {
  						tmpTxt += ', .RailType ' + paralellTrack[p][0] + ';' + defaultRailIndex;  													
  					}
  					mainTrkArr.push([Math.round(distance),tmpTxt]);
  					
  				} else if ((polyL.markers.getAt(i).curve == null) && (polyL.markers.getAt(i).tcurve != null)) {
  					//2do reserved for transition curve
  					
  				} else {
  					var currX = Math.round(distance);
  					
  					if (polyL.markers.getAt(i).pitch != null){
  						if (polyL.markers.getAt(i).pitch != ''){
  							pitchTxt(polyL.markers.getAt(i).pitch,currX);
    					}
  					}
  				
 						if (polyL.markers.getAt(i).bve != null){
  						if (polyL.markers.getAt(i).bve != ''){
  							bveTxt(polyL.markers.getAt(i).bve,currX);
  						}
  					}

  					if (polyL.markers.getAt(i).lineX != null){
  						if (polyL.markers.getAt(i).lineX != ''){
  							if ( polyL.markers.getAt(i).lineX.indexOf('§') == 0) { 
  								polyL.markers.getAt(i).lineX = polyL.markers.getAt(i).lineX.substring(1,polyL.markers.getAt(i).lineX.length);
  							}  			
									lineXTxt(polyL.markers.getAt(i).lineX,currX);  						
  							}  					
  					}

  					if (polyL.markers.getAt(i).turn != null){
  						if (polyL.markers.getAt(i).turn != ''){
		  					turnTxt(polyL.markers.getAt(i).turn,currX);
  						}  					
  					}
  				
  					if (polyL.markers.getAt(i).prln != null){
  						if (polyL.markers.getAt(i).prln != ''){
  							if ( polyL.markers.getAt(i).prln.indexOf('§') == 0) {
  								polyL.markers.getAt(i).prln = polyL.markers.getAt(i).prln.substring(1,polyL.markers.getAt(i).prln.length);
  							}
								prlnTxt(polyL.markers.getAt(i).prln,currX);
  						} 
  					}

  					if (polyL.markers.getAt(i).kit != null){
  						if (polyL.markers.getAt(i).kit != ''){							
  							kitTxt(polyL.markers.getAt(i).kit,currX);			
  						}  					
  					}
  				
  					if (polyL.markers.getAt(i).note != null){
  						if (polyL.markers.getAt(i).note != ''){
  							noteTrkArr.push([currX, polyL.markers.getAt(i).note]);
  						}
  					}  					
  				}
  			
  			//****************************************************************************************************************//
				} else {
				//****************************************************************************************************************//
					
					distance += google.maps.geometry.spherical.computeDistanceBetween(allPoints[i-1], allPoints[i]);
					
					if ((polyL.markers.getAt(i-1).curve != null) && (polyL.markers.getAt(i-1).tcurve == null)) { //length correction - previous curve tangent length
  					var cuvarr = polyL.markers.getAt(i-1).curve.split('§');
  					var tL = parseFloat(cuvarr[4].split(':')[1]); 
  					var cL = parseFloat(cuvarr[5].split(':')[1]);
  					//var rIdx = cuvarr[12].split(':')[1];
  					distance -= tL;
  				} else if ((polyL.markers.getAt(i-1).curve != null) && (polyL.markers.getAt(i-1).tcurve == null)) {
  					//2do reserved for transition curve
					}
					
					// 4 curve n transition curve
  				if ((polyL.markers.getAt(i).curve != null) && (polyL.markers.getAt(i).tcurve == null)) {	
  					var cuvarr = polyL.markers.getAt(i).curve.split('§');
  					var cuvID = cuvarr[0].split(':')[1];
  					var tL = parseFloat(cuvarr[4].split(':')[1]); 
  					var cL = parseFloat(cuvarr[5].split(':')[1]);
  					var cR = cuvarr[1].split(':')[1];
  					var cant = cuvarr[2].split(':')[1];
  					var dV  = cuvarr[3].split(':')[1];
  					var eSL = cuvarr[11].split(':')[1];
  					//var rIdx = cuvarr[12].split(':')[1];
  					distance -= tL;
  					
  					if (eSL == 'true') {
  						mainTrkArr.push([Math.round(distance),'.Curve ' + cR + ';' + cant + ', .FreeObj 0;0;-2;0.7;0, .Limit ' + dV + ';-1;0']);
  					} else {
  						mainTrkArr.push([Math.round(distance),'.Curve ' + cR + ';' + cant + ', .FreeObj 0;0;-2;0.7;0']);
  					}
  					
 						if (polyL.markers.getAt(i).bve != null){
  						if (polyL.markers.getAt(i).bve != ''){
  							bveTxt(polyL.markers.getAt(i).bve,Math.round(distance));
  						}
  					} 
  					  					
  					var cpoly = MapToolbar.features['curveTab'][cuvID];
  					
  					for (var c = 1; c < cpoly.markers.length; c++) {
  						if (typeof cpoly.markers.getAt(c).ld1 != 'undefined') { // marker on curve
  							var currX = Math.round(distance + parseFloat(cpoly.markers.getAt(c).ld1));
  							
  							if (cpoly.markers.getAt(c).pitch != null){
  								if (cpoly.markers.getAt(c).pitch != ''){
  									pitchTxt(cpoly.markers.getAt(c).pitch,currX);
    							}
  							}
  				
 								if (cpoly.markers.getAt(c).bve != null){
  								if (cpoly.markers.getAt(c).bve != ''){
  									bveTxt(cpoly.markers.getAt(c).bve,currX);
  								}
  							}

  							if (cpoly.markers.getAt(c).lineX != null){
  								if (cpoly.markers.getAt(c).lineX != ''){
  									if ( polyL.markers.getAt(i).lineX.indexOf('§') == 0) { 
  										polyL.markers.getAt(i).lineX = polyL.markers.getAt(i).lineX.substring(1,polyL.markers.getAt(i).lineX.length);
  									}  			
										lineXTxt(polyL.markers.getAt(i).lineX,currX);
  								}  					
  							}

  							if (cpoly.markers.getAt(c).turn != null){
  								if (cpoly.markers.getAt(c).turn != ''){
				  					turnTxt(polyL.markers.getAt(i).turn,currX);
  								}  					
  							}
  							  				
		  					if (cpoly.markers.getAt(c).kit != null){
  								if (cpoly.markers.getAt(c).kit != ''){
  									kitTxt(cpoly.markers.getAt(c).kit,currX);						
  								}  					
  							}
  				
  							if (cpoly.markers.getAt(c).note != null){
  								if (cpoly.markers.getAt(c).note != ''){
  									noteTrkArr.push([currX, cpoly.markers.getAt(c).note]);
  								}
  							}
  						}
  					}
  					
  					distance += cL;
  					var tmpTxt = '.Curve 0;0';

  					if (eSL == 'true') {
  						tmpTxt += ', .Limit 0;-1;0';
  					}
  					tmpTxt += ', .RailType 0;' + defaultRailIndex;

  					for (p = 0; p < paralellTrack.length; p++) {
  						tmpTxt += ', .RailType ' + paralellTrack[p][0] + ';' + defaultRailIndex;  													
  					}

  					mainTrkArr.push([Math.round(distance), tmpTxt]);
  					
  				} else if ((polyL.markers.getAt(i).curve == null) && (polyL.markers.getAt(i).tcurve != null)) {
						//2do reserved for transition curve
  				
  				} else {
  					
  					var currX = Math.round(distance);
  	
    				if (polyL.markers.getAt(i).pitch != null){
    					if (polyL.markers.getAt(i).pitch != ''){
    						pitchTxt(polyL.markers.getAt(i).pitch,currX);
    					}
  					}
  				
 						if (polyL.markers.getAt(i).bve != null){
  						if (polyL.markers.getAt(i).bve != ''){
  							bveTxt(polyL.markers.getAt(i).bve,currX);
  						}
  					}

  					if (polyL.markers.getAt(i).lineX != null){
  						if (polyL.markers.getAt(i).lineX != ''){
  							if ( polyL.markers.getAt(i).lineX.indexOf('§') == 0) { 
  								polyL.markers.getAt(i).lineX = polyL.markers.getAt(i).lineX.substring(1,polyL.markers.getAt(i).lineX.length);
  							}  			
								lineXTxt(polyL.markers.getAt(i).lineX,currX);  							
		  				}  					
  					}

  					if (polyL.markers.getAt(i).turn != null){
  						if (polyL.markers.getAt(i).turn != ''){
		  					turnTxt(polyL.markers.getAt(i).turn,currX);
		  				}  					
  					}
  				
  					if (polyL.markers.getAt(i).prln != null){
  						if (polyL.markers.getAt(i).prln != ''){
  							if ( polyL.markers.getAt(i).prln.indexOf('§') == 0) { 
  								polyL.markers.getAt(i).prln = polyL.markers.getAt(i).prln.substring(1,polyL.markers.getAt(i).prln.length);
  							}  			
								prlnTxt(polyL.markers.getAt(i).prln,currX);
  						}  					
  					}

  					if (polyL.markers.getAt(i).kit != null){
  						if (polyL.markers.getAt(i).kit != ''){  			
  							kitTxt(polyL.markers.getAt(i).kit,currX);
  						}  					
  					}
  				
  					if (polyL.markers.getAt(i).note != null){
  						if (polyL.markers.getAt(i).note != ''){
  							noteTrkArr.push([currX,polyL.markers.getAt(i).note]);
  						}
  					}
			
  				}
					
				}
		} else {
			// error checking only
		}
		
		
 	    
    persen = Math.round(((i+1)/allPoints.length)*100);
    $( "#progressbarBuildBVE4O" ).progressbar({
         value: persen
    });
  	
	} 
	
	var tmpTrkStrArr = [];
	//array sorting by first key
	for (m = 0; m < mainTrkArr.length; m++) {
		if (tmpTrkStrArr.length == 0) {
			tmpTrkStrArr.push(mainTrkArr[m]);
		} else {
			if (parseInt(mainTrkArr[m][0]) > parseInt(tmpTrkStrArr[tmpTrkStrArr.length-1][0])) {
				tmpTrkStrArr.push(mainTrkArr[m]);
			} else {
				var inArr = false;
				for (t=0; t < tmpTrkStrArr.length; t++) {
					if (parseInt(mainTrkArr[m][0]) == parseInt(tmpTrkStrArr[t][0])) {
						tmpTrkStrArr[t][1] += ',' + mainTrkArr[m][1];
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
		persen = Math.round((m/mainTrkArr.length-1)*100);
    $( "#progressbarBuildBVE4O" ).progressbar({
      value: persen
    });
	}
	for (s = 0; s < subTrkArr.length; s++) {
		if (parseInt(subTrkArr[s][0]) > parseInt(tmpTrkStrArr[tmpTrkStrArr.length-1][0])) {
			tmpTrkStrArr.push(subTrkArr[s]);
		} else {
			var inArr = false;
			for (t=0; t < tmpTrkStrArr.length; t++) {
				if (parseInt(subTrkArr[s][0]) == parseInt(tmpTrkStrArr[t][0])) {
					tmpTrkStrArr[t][1] += ',' + subTrkArr[s][1];
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
		persen = Math.round((s/subTrkArr.length-1)*100);
    $( "#progressbarBuildBVE4O" ).progressbar({
      value: persen
    });
	}
	
	for (n = 0; n < noteTrkArr.length; n++) {
		if (parseInt(noteTrkArr[n][0]) > parseInt(tmpTrkStrArr[tmpTrkStrArr.length-1][0])) {
			tmpTrkStrArr.push([noteTrkArr[n][0], ',  ; ' + noteTrkArr[n][1]]);
		} else {
			var inArr = false;
			for (t=0; t < tmpTrkStrArr.length; t++) {
				if (parseInt(noteTrkArr[n][0]) == parseInt(tmpTrkStrArr[t][0])) {
					tmpTrkStrArr[t][1] += ',  ; ' + noteTrkArr[n][1];
					inArr = true;
					break;
				}					
			}
			if (!inArr) {
				for (t=1; t < tmpTrkStrArr.length; t++) {
					if ((parseInt(noteTrkArr[n][0]) > parseInt(tmpTrkStrArr[t-1][0])) && (parseInt(noteTrkArr[n][0]) < parseInt(tmpTrkStrArr[t][0]))) {
						tmpTrkStrArr.splice(t-1,0,[noteTrkArr[n][0], ',  ; ' + noteTrkArr[n][1]]);
						break;
					} else if (parseInt(noteTrkArr[n][0]) < parseInt(tmpTrkStrArr[t-1][0])) {
						if (t == 1) {
							tmpTrkStrArr.unshift([noteTrkArr[n][0], ',  ; ' + noteTrkArr[n][1]]);
							break;
						} else {
							tmpTrkStrArr.splice(t-2,0,[noteTrkArr[n][0], ',  ; ' + noteTrkArr[n][1]]);
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
	
	//final sort if above failed
	var sorted;
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
							
	
	if (tmpTrkStrArr.length > 0) {
		for (t = 0; t < tmpTrkStrArr.length; t++){
			teks += tmpTrkStrArr[t][0] + ',' + tmpTrkStrArr[t][1] + '\n';
			persen = Math.round((t/tmpTrkStrArr.length-1)*100);
    	$( "#progressbarBuildBVE4O" ).progressbar({
      	value: persen
    	});
		}
	}       
  
  $('#buildBVE').val(teks);
  
  if ($('#dialogBuildRoute').dialog('isOpen') == true) {
  	$('#dialogBuildRoute').dialog('close');
  }
}

function prlnTxt(prln,currX) {
	var arrpLd = prln.split('§');
	//alert(prln);
	for (i = 0; i < arrpLd.length; i++) {
  	// code to be executed
  	var plL = arrpLd[i].split(':');
  	if (plL[2] == 'end') {
  						
  		var endOffset = (parseInt(plL[3]) == 0)? 0: parseFloat(plL[1]);
  		var edSwlength = parseInt(plL[4]);
  		//alert(endOffset + ' / ' + edSwlength);
  		
	  		if (endOffset == 0) {
  			var n = edSwlength/25;
  			var currOffset = parseFloat(plL[1]);
  			var turnoutratio = parseFloat(plL[1]) / edSwlength;
  			var railIdx = -1;
  			
  			for (p = 0; p < paralellTrack.length; p++) {
  				if (paralellTrack[p][3] == plL[0]) {
  					railIdx = paralellTrack[p][0];
  					paralellTrack.splice(p, 1);
  					break;						
  				}
  			}
  			
  			while ( n*25 > 0 ) {
  				currOffset = Math.round(turnoutratio * n * 25 * 100) / 100;
  				subTrkArr.push([Math.round(currX - (n*25)),'.Rail ' + railIdx + ';' + currOffset + ';0;' + defaultRailIndex]);
  				n --;
  			}  							
  			subTrkArr.push([ currX, '.RailEnd ' + railIdx + ';' + endOffset + ';0;' + defaultRailIndex]);
  							
  		} else {
  		
  			for (p = 0; p < paralellTrack.length; p++) {
  				if (paralellTrack[p][3] == plL[0]) {
  					railIdx = paralellTrack[p][0];
  					paralellTrack.splice(p, 1);
  					break;						
  				}
  			}
  			subTrkArr.push([ currX, '.RailEnd ' + railIdx + ';' + parseFloat(plL[1]) + ';0,']);
  		}  					
  						
  	} else {
  						
  		var stOffset = (parseInt(plL[3]) == 0)? 0: parseFloat(plL[1]);
  		var stSwlength = parseFloat(plL[4]);
  		
  		//alert(stOffset + ' / ' + stSwlength);
  		
  		if (stOffset == 0) {
  			var n = 0;
  			var currOffset = parseFloat(plL[1]);
  			var turnoutratio = parseFloat(plL[1]) / stSwlength;
  			var railIdx = 1;  											
  			for (p = 0; p < paralellTrack.length; p++) {
  				if (paralellTrack[p][0] == railIdx) {
  					railIdx ++;  																			
  				} else {
  					break;
  				}
  			}
  			while ( n*25 < stSwlength ) {
  				currOffset = Math.round(turnoutratio * n * 25 * 100) / 100;
  				subTrkArr.push([Math.round(currX + n*25), '.Rail ' + railIdx + ';' + currOffset + ';0;' + defaultRailIndex]);
  				n ++;
  			}
  			subTrkArr.push([Math.round(currX + n*25),'.Rail ' + railIdx + ';' + plL[1] + ';0;' + defaultRailIndex]);
	  		paralellTrack.push([railIdx,parseFloat(plL[1]),0,plL[0]]);
	  						
  		} else {
  			var railIdx = 1;  											
  			for (p = 0; p < paralellTrack.length; p++) {
  				if (paralellTrack[p][0] == railIdx) {
  					railIdx ++;  																			
  				} else {
  					break;
  				}
  			}
  			subTrkArr.push([ currX, '.Rail ' + railIdx + ';' + plL[1] + ';0;' + defaultRailIndex ]);
  			paralellTrack.push([railIdx,parseFloat(plL[1]),0,plL[0]]);
  		}
  	}
	}
}


function bveTxt(bve,currX) { // 2do ??? 9/1/2013
	var arrB = bve.split('§');
  for (j = 0; j < arrB.length; j++) {
  	// code to be executed
  	if (arrB[j] != '') {
  		var arrB_1 = arrB[j].split(':');
  		switch (arrB_1[0]) {
  			case 'height':
  				subTrkArr.push([ currX, '.Height ' + arrB_1[1]]);
  				//alert('height : ' + bve);
  				break;
  			case 'railindex':
  				subTrkArr.push([ currX, '.RailType 0;' + arrB_1[1]]);
  				for (p = 0; p < paralellTrack.length; p++) {
  					subTrkArr.push([ currX, '.RailType ' + paralellTrack[p][0] + ';' + arrB_1[1]]);  													
  				}
  				//alert('railindex : ' + bve);
  				break;
  			case 'pole':
  				subTrkArr.push([ currX, '.Pole 0;' + arrB_1[1] + '; 0; 25; 0']);
  				//alert('pole : ' + bve);
  				break;
  			case 'river':  				
  				for (rv = 0; rv < bvebveStrOjArr.length; rv++) {
  					if (bvebveStrOjArr[rv][3] == 'River') {
  						if (bvebveStrOjArr[rv][1] == arrB_1[1]) {
  							for (gr = 0; gr < Ground.length; gr++) {
  								if (Ground[gr] == bvebveStrOjArr[rv][5].replace(/[/]/g,'\\')) {
  									subTrkArr.push([ currX, '.Ground ' + gr ]);  									
  									break;
  								}
  							}
  						}
  					}
  				}
  				//alert('pole : ' + bve);  			
  			case 'ground':
  				for (g1 = 0; g1 < bvebveStrOjArr.length; g1++) {
  					if (bvebveStrOjArr[g1][3] == 'Ground') {
  						if (bvebveStrOjArr[g1][1] == arrB_1[1]) {
  							for (gr = 0; gr < Ground.length; gr++) {
  								if (Ground[gr] == bvebveStrOjArr[g1][5].replace(/[/]/g,'\\')) {
  									subTrkArr.push([ currX, '.Ground ' + gr ]);  									
  									break;
  								}
  							}
  						}
  					}
  				}
  				break;
  			default:
  				// default statements
  		}
  	}
  }	
}


function kitTxt(kitD,currX) {
	//alert('kitD : ' + kitD);
	var arrK = kitD.split('§');
  for (j = 0; j < arrK.length; j++) {
  	// code to be executed
  	if (arrK[j] != '') {
  		var arrK_1 = arrK[j].split(':');
  		var arrK_1a = arrK_1[0].split('_');
  					
  		switch (arrK_1a[0]) {
  			case 'cut':
  				if (arrK_1[0] == 'cut_start') {
  					for (g = 0; g < bvecutObjArr.length; g++) {
							if (bvecutObjArr[g][1] == arrK_1[1]) {										
								if (paralellTrack.length == 0) {
									for (wI = 0; wI < WallL.length; wI++) {
										if (bvecutObjArr[g][4].replace(/[/]/g,'\\') ==  WallL[wI]) {																
											if (bvecutObjArr[g][5] != '') {
												subTrkArr.push([currX, '.Wall 0;0;'+ wI]);
												GBcut[0] = 0;
												GBcut[1] = 0;
											} else {
												subTrkArr.push([currX, '.Wall 0;-1;'+ wI]);
												GBcut[0] = 0;
											}
											break;
										}
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
									for (wI = 0; wI < WallL.length; wI++) {
										if (bvecutObjArr[g][4].replace(/[/]/g,'\\') ==  WallL[wI]) {
											subTrkArr.push([currX, ' .Wall ' + leftestIndex + ';-1;'+ wI]);
											GBcut[0] = leftestIndex;														
											break;
										}
									}
									for (wI = 0; wI < WallR.length; wI++) {
										if (bvecutObjArr[g][5].replace(/[/]/g,'\\') == WallR[wI]) {
											subTrkArr.push([currX, '.Wall ' + rightestIndex + ';1;'+ wI]);
											GBcut[1] = rightestIndex;
											break;
										}
									}
								}

								if ((typeof GBcut[0] != 'undefined') || (typeof GBcut[1] != 'undefined')) {
									GBcut[2] = currX; // initial distance
								}	
								
								break;
							}
						}
								
  				} else {
  									
						if ((typeof GBcut[0] != 'undefined') && (typeof GBcut[1] != 'undefined')) {
  						if (( GBcut[0] == 0) && ( GBcut[1] == 0)) {
  							subTrkArr.push([currX, '.WallEnd 0']);
  						} else {
  							subTrkArr.push([currX, '.WallEnd ' + GBcut[0] + ', .WallEnd ' + GBcut[1]]);
  						}
  					} else { 									
  						if (typeof GBcut[0] != 'undefined') {
  							subTrkArr.push([currX, '.WallEnd ' + GBcut[0]]);
  						}
  						if (typeof GBcut[1] != 'undefined') {
  							subTrkArr.push([currX, '.WallEnd ' + GBcut[1]]);
  						}
  					}
  					GBcut = [];
  				} 
  				break;  				
  							
  			case 'dike':
  				if (arrK_1[0] == 'dike_start') {
  				for (g = 0; g < bvedikeObjArr.length; g++) {
						if (bvedikeObjArr[g][1] == arrK_1[1]) {
							if (paralellTrack.length == 0) {
								for (dI = 0; dI < DikeL.length; dI++) {
									if (bvedikeObjArr[g][4].replace(/[/]/g,'\\') == DikeL[dI]) {
										subTrkArr.push([currX, '.Dike 0;0;'+ dI]);
										GBdike[0] = 0;
										GBdike[1] = 0;
										break;
									}
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
												
								for (dI = 0; dI < DikeL.length; dI++) {
									if (bvedikeObjArr[g][4].replace(/[/]/g,'\\') == DikeL[dI]) {
										subTrkArr.push([currX, '.Dike ' + leftestIndex + ';-1;'+ dI]);
										GBdike[0] = leftestIndex;														
										break;
									}
								}
												
								for (dI = 0; dI < DikeR.length; dI++) {
									if (bvedikeObjArr[g][5].replace(/[/]/g,'\\') == DikeR[dI]) {
										subTrkArr.push([currX, ', .Dike ' + rightestIndex + ';1;'+ dI]);
										GBdike[1] = rightestIndex;
										break;
									}
								}
							}																					
							break;
						}
					}
									
  				} else {
  				//2do macam mana nak ".DikeEnd xx", rail mana
  				if ((typeof GBdike[0] != 'undefined') && (typeof GBdike[1] != 'undefined')) {
  					if (( GBdike[0] == 0) && ( GBdike[1] == 0)) {
  						subTrkArr.push([currX,'.DikeEnd 0']);
  					} else {
  						subTrkArr.push([currX, '.DikeEnd ' + GBdike[0] + ', .DikeEnd ' + GBdike[1]]);
  					}
  				} else {
  					if (typeof GBdike[0] != 'undefined') {
  						subTrkArr.push([currX, '.DikeEnd ' + GBdike[0]]);
  					}
  					if (typeof GBdike[1] != 'undefined') {
  						subTrkArr.push([currX, ' .DikeEnd ' + GBdike[1]]);
  					}
  				}
   								
  				GBdike = [];
  				} 							
  				break;
  							
  			case 'bridge':
  				if (arrK_1[0] == 'bridge_start') {

  				for (g = 0; g < bvebridgeObjArr.length; g++) {
						if (bvebridgeObjArr[g][1] == arrK_1[1]) {
							
							if (paralellTrack.length == 0) {
								if (bvebridgeObjArr[g][4] != '') {	
 									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][4].replace(/[/]/g,'\\') == FreeObj[foI]) {
											subTrkArr.push([currX, '.FreeObj 0;'+ foI +';0;0;0']);
											GBbridge[0] = 0;															
											break;
										}
									}
								}
											
								if (bvebridgeObjArr[g][5] != '') {	
 									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][5].replace(/[/]/g,'\\') == FreeObj[foI]) {
											GBbridge[1] = 0;
											break;
										}
									}
								}
											
								if (bvebridgeObjArr[g][6] != '') {	
 									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][6].replace(/[/]/g,'\\') == FreeObj[foI]) {
											subTrkArr.push([currX, '.FreeObj 0;'+ foI +';0;0;0']);
											GBbridge[2] = 0;															
											break;
										}
									}
								}
											
								if (bvebridgeObjArr[g][7] != '') {	
 									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][7].replace(/[/]/g,'\\') == FreeObj[foI]) {
											GBbridge[3] = 0;
											break;
										}
									}
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
												
								if (bvebridgeObjArr[g][4] != '') {	//left @ basic str
									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][4].replace(/[/]/g,'\\') == FreeObj[foI]) {
											subTrkArr.push([currX, '.FreeObj ' + leftestIndex + ';' + foI +';0;0;0']);
											GBbridge[0] = leftestIndex;														
											break;
										}
									}
								}
								if (bvebridgeObjArr[g][5] != '') {	//center obj													
									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][5].replace(/[/]/g,'\\') == FreeObj[foI]) {
											subTrkArr.push([currX, '.FreeObj 0;' + foI +';0;0;0']); 
											GBbridge[1] = 0;
											break;
										}
									}													
								}
								if (bvebridgeObjArr[g][6] != '') {	//right str
									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][6].replace(/[/]/g,'\\') == FreeObj[foI]) {
											subTrkArr.push([currX, ' .FreeObj ' + rightestIndex + ';' + foI +';0;5;0']);
											GBbridge[2] = rightestIndex;														
											break;
										}
									}
								}
								if (bvebridgeObjArr[g][7] != '') {	//pier obj													
									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][7].replace(/[/]/g,'\\') == FreeObj[foI]) {
											GBbridge[3] = 0;
											break;
										}
									}													
								}											
							}
							if ((typeof GBbridge[0] != 'undefined') || (typeof GBbridge[2] != 'undefined')) {
								GBbridge[4] = 0; // initial distance												
							}												
							break;
						}
					}
									
  				} else {
  								
					var bgL = parseInt(bvebridgeObjArr[g][9]);
									
  				for (g = 0; g < bvebridgeObjArr.length; g++) {
						if (bvebridgeObjArr[g][1] == arrK_1[1]) {											
							if (paralellTrack.length == 0) {
								if (bvebridgeObjArr[g][4] != '') {	
 									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][4].replace(/[/]/g,'\\') == FreeObj[foI]) {
											if (typeof GBbridge[4] != 'undefined') {
												var iXd = GBbridge[4] + Math.abs(bgL);																
												do {
													subTrkArr.push([iXd, '.FreeObj 0;'+ foI +';0;0;0']);
													iXd += Math.abs(bgL);
												} while (iXd <= currX); 
											}
											break;
										}
									}
								}
											
								if (bvebridgeObjArr[g][5] != '') {	
 									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][5].replace(/[/]/g,'\\') == FreeObj[foI]) {
											if (typeof GBbridge[4] != 'undefined') {
												var iXd = GBbridge[4] + Math.abs(bgL);																
												do {
													subTrkArr.push([iXd, '.FreeObj 0;'+ foI +';0;0;0']);
													iXd += Math.abs(bgL);
												} while (iXd <= currX); 
											}
											break;
										}
									}
								}
								if (bvebridgeObjArr[g][6] != '') {	
 									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][6].replace(/[/]/g,'\\') == FreeObj[foI]) {
											if (typeof GBbridge[4] != 'undefined') {
												var iXd = GBbridge[4] + Math.abs(bgL);																
												do {
													subTrkArr.push([iXd, '.FreeObj 0;'+ foI +';0;0;0']);
													iXd += Math.abs(bgL);
												} while (iXd <= currX);
											}
											break;
										}
									}
								}
								if (bvebridgeObjArr[g][7] != '') {
									var pierXd = parseFloat(bvebridgeObjArr[g][8]);
 									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][7].replace(/[/]/g,'\\') == FreeObj[foI]) {
											if (typeof GBbridge[4] != 'undefined') {
												var iXd = GBbridge[4] + pierXd;																
												do {
													subTrkArr.push([iXd, '.FreeObj 0;'+ foI +';0;0;0']);
													iXd += pierXd;
												} while (iXd <= currX); 
											}
											break;
										}
									}
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
												
								if (bvebridgeObjArr[g][4] != '') {	
									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][4].replace(/[/]/g,'\\') == FreeObj[foI]) {																
											if (typeof GBbridge[4] != 'undefined') {
												var iXd = GBbridge[4] + Math.abs(bgL);																
												do {
													subTrkArr.push([iXd, '.FreeObj ' + leftestIndex + ';'+ foI +';0;0;0']);
													iXd += Math.abs(bgL);
												} while (iXd <= currX); 
											}													
											break;
										}
									}
								}
								if (bvebridgeObjArr[g][6] != '') {	
									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][6].replace(/[/]/g,'\\') == FreeObj[foI]) {
											if (typeof GBbridge[4] != 'undefined') {
												var iXd = GBbridge[4] + Math.abs(bgL);																
												do {
													subTrkArr.push([iXd, '.FreeObj ' + rightestIndex + ';' + foI +';0;0;0']);
													iXd += Math.abs(bgL);
												} while (iXd <= currX); 
											}
											break;
										}
									}
								}
												
								if (bvebridgeObjArr[g][5] != '') {	
 									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][5].replace(/[/]/g,'\\') == FreeObj[foI]) {
											if (typeof GBbridge[4] != 'undefined') {
												var iXd = GBbridge[4] + Math.abs(bgL);																
												do {
													subTrkArr.push([iXd, '.FreeObj 0;'+ foI +';0;0;0']);
													iXd += Math.abs(bgL);
												} while (iXd <= currX);
											}
											break;
										}
									}
								}
												
								if (bvebridgeObjArr[g][7] != '') {
									var pierXd = parseFloat(bvebridgeObjArr[g][8]);
 									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][7].replace(/[/]/g,'\\') == FreeObj[foI]) {
											if (typeof GBbridge[4] != 'undefined') {
												var iXd = GBbridge[4] + pierXd;																
												do {
													subTrkArr.push([iXd, '.FreeObj 0;'+ foI +';0;0;0']);
													iXd += pierXd;
												} while (iXd <= currX);
											}
											break;
										}
									}
								}													
							}
											
							break;
						}
					}  								

					GBbridge = [];							
  				}
  				break;
  							
				case 'tunnel':
  				if (arrK_1[0] == 'tunnel_start') {
  								for (g = 0; g < bvetunnelObjArr.length; g++) {
										if (bvetunnelObjArr[g][1] == arrK_1[1]) {
											for (foI = 21; foI < FreeObj.length; foI++) {
												if (bvetunnelObjArr[g][4].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
													subTrkArr.push([currX, ' .FreeObj 0;'+ foI +';0;0;0']);
													break;
												}
											}
											if (paralellTrack.length == 0) {
												for (wI = 0; wI < WallL.length; wI++) {
													if (bvetunnelObjArr[g][6].replace(/[/]/g,'\\') ==  WallL[wI]) {														
														if (bvetunnelObjArr[g][7] != '') {
															subTrkArr.push([currX, ' .Wall 0;0;'+ wI]);
															GBtunnel[0] = 0;
															GBtunnel[1] = 0;
														} else {
															subTrkArr.push([currX, ' .Wall 0;-1;'+ wI]);
															GBtunnel[0] = 0;
														}
														
														break;
													}
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
												
												
													for (wI = 0; wI < WallL.length; wI++) {
														if (bvetunnelObjArr[g][6].replace(/[/]/g,'\\') ==  WallL[wI]) {
															subTrkArr.push([currX, '.Wall ' + leftestIndex + ';-1;'+ wI]);
															GBtunnel[0] = leftestIndex;														
															break;
														}
													}
												
												
													for (wI = 0; wI < WallR.length; wI++) {
														if (bvetunnelObjArr[g][7].replace(/[/]/g,'\\') ==  WallR[wI]) {
															subTrkArr.push([currX, '.Wall ' + rightestIndex + ';1;'+ wI]);
															GBtunnel[1] = rightestIndex;
															break;
														}
													}
												
											}

											break;
										}
									}
									
  				} else {
  								
  								if ((typeof GBtunnel[0] != 'undefined') && (typeof GBtunnel[1] != 'undefined')) {
  									if (( GBtunnel[0] == 0) && ( GBtunnel[1] == 0)) {
  										subTrkArr.push([currX, '.WallEnd 0']);
  									} else {
  										subTrkArr.push([currX, '.WallEnd ' + GBtunnel[0] + ', .WallEnd ' + GBtunnel[1]]);
  									}
  								} else {
  									if (typeof GBtunnel[0] != 'undefined') {
  										subTrkArr.push([currX, '.WallEnd ' + GBtunnel[0]]);
  									}
  									if (typeof GBtunnel[1] != 'undefined') {
  										subTrkArr.push([currX, '.WallEnd ' + GBtunnel[1]]);
  									}
  								}

 										if (bvetunnelObjArr[g][5] != '') {	
 											for (foI = 21; foI < FreeObj.length; foI++) {
												if (bvetunnelObjArr[g][5].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
													subTrkArr.push([currX, '.FreeObj 0;'+ foI +';0;0;0']);
													break;
												}
											}
										}
									GBtunnel = []; 								
  				}		  							
  				break;
  							
  			case 'flyover':
  				if (arrK_1[0] == 'flyover_start') {
  					for (g = 0; g < bveFOObjArr.length; g++) {
							if (bveFOObjArr[g][1] == arrK_1[1]) {
											
								if (paralellTrack.length == 0) {
									for (wI = 0; wI < WallL.length; wI++) {
										if (bveFOObjArr[g][4].replace(/[/]/g,'\\') ==  WallL[wI]) {																
											if (bveFOObjArr[g][5] != '') {
												subTrkArr.push([currX, '.Wall 0;0;'+ wI]);
												GBfo[0] = 0;
												GBfo[1] = 0;
											} else {
												subTrkArr.push([currX, '.Wall 0;-1;'+ wI]);
												GBfo[0] = 0;
											}
											break;
										}
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
									for (wI = 0; wI < WallL.length; wI++) {
										if (bveFOObjArr[g][4].replace(/[/]/g,'\\') ==  WallL[wI]) {
											subTrkArr.push([currX, ' .Wall ' + leftestIndex + ';-1;'+ wI]);
											GBfo[0] = leftestIndex;														
											break;
										}
									}
									for (wI = 0; wI < WallR.length; wI++) {
										if (bveFOObjArr[g][5].replace(/[/]/g,'\\') == WallR[wI]) {
											subTrkArr.push([currX, '.Wall ' + rightestIndex + ';1;'+ wI]);
											GBfo[1] = rightestIndex;
											break;
										}
									}
								}
								if (bveFOObjArr[g][6] != '') {	
									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bveFOObjArr[g][6].replace(/[/]/g,'\\') == FreeObj[foI]) {
											break;
										}
									}
								}
								if ((typeof GBfo[0] != 'undefined') || (typeof GBfo[1] != 'undefined')) {
									GBfo[2] = currX; // initial distance
								}	
								
								break;
							}
						}
									
  				} else {
  								
  					if (bveFOObjArr[g][6] != '') {	
							for (foI = 21; foI < FreeObj.length; foI++) {
								if (bveFOObjArr[g][6].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
									if (typeof GBfo[2] != 'undefined') { 
										var iXd = GBfo[2] + parseInt(bveFOObjArr[g][7]);
										subTrkArr.push([GBfo[2], '.FreeObj 0;' + foI +';0;0;0']);
										do {
											subTrkArr.push([iXd, '.FreeObj 0;' + foI +';0;0;0']);
											iXd += parseInt(bveFOObjArr[g][7]);
										} while (iXd <= currX); // <= currX																
									}
									break;
								}
							}
						}
										
						if ((typeof GBfo[0] != 'undefined') && (typeof GBfo[1] != 'undefined')) {
  						if (( GBfo[0] == 0) && ( GBfo[1] == 0)) {
  							subTrkArr.push([currX, '.WallEnd 0']);
  						} else {
  							subTrkArr.push([currX, '.WallEnd ' + GBfo[0] + ', .WallEnd ' + GBfo[1]]);
  						}
  					} else { 									
  						if (typeof GBfo[0] != 'undefined') {
  							subTrkArr.push([currX, '.WallEnd ' + GBfo[0]]);
  						}
  						if (typeof GBfo[1] != 'undefined') {
  							subTrkArr.push([currX, '.WallEnd ' + GBfo[1]]);
  						}
  					}

  					GBfo = [];
  				} 
  				break;
  				
  			case 'underground':
  				if (arrK_1[0] == 'undeground_start') {
  					for (g = 0; g < bveUGObjArr.length; g++) {
							if (bveUGObjArr[g][1] == arrK_1[1]) {
											
								if (paralellTrack.length == 0) {
									for (wI = 0; wI < WallL.length; wI++) {
										if (bveUGObjArr[g][4].replace(/[/]/g,'\\') == WallL[wI]) {														
											if (bveUGObjArr[g][5] != '') {
												subTrkArr.push([currX, '.Wall 0;0;'+ wI]);
												GBug[0] = 0;
												GBug[1] = 0;
											} else {
												subTrkArr.push([currX, '.Wall 0;-1;'+ wI]);
												GBug[0] = 0;
											}
											break;
										}
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
												
									for (wI = 0; wI < WallL.length; wI++) {
										if (bveUGObjArr[g][4].replace(/[/]/g,'\\') == WallL[wI]) {
											subTrkArr.push([currX, '.Wall ' + leftestIndex + ';-1;'+ wI]);
											GBug[0] = leftestIndex;														
											break;
										}
									}
									for (wI = 0; wI < WallR.length; wI++) {
										if (bveUGObjArr[g][5].replace(/[/]/g,'\\') == WallR[wI]) {
											subTrkArr.push([currX, '.Wall ' + rightestIndex + ';1;'+ wI]);
											GBug[1] = rightestIndex;
											break;
										}
									}
								}
								break;
							}
						}
									
  				} else {
  								
  					if ((typeof GBug[0] != 'undefined') && (typeof GBug[1] != 'undefined')) {
  						if (( GBug[0] == 0) && ( GBug[1] == 0)) {
  							subTrkArr.push([currX, '.WallEnd 0']);
  						} else {
  							subTrkArr.push([currX, '.WallEnd ' + GBug[0] + ', .WallEnd ' + GBug[1]]);
  						}
  					} else {
  						if (typeof GBug[0] != 'undefined') {
  							subTrkArr.push([currX, '.WallEnd ' + GBug[0]]);
  						}
  						if (typeof GBug[1] != 'undefined') {
  							subTrkArr.push([currX, '.WallEnd ' + GBug[1]]);
  						}
  					}

  					GBug = [];
  				} 							
  				break;
  							
  			case 'form':
  				if (arrK_1[0] == 'form_start') {
  								for (g = 0; g < bverailobjArr.length; g++) {
										if (bvegbmapOArr[g][1] == arrK_1[1]) {
											var arrform = bvegbmapOArr[g][5].split('|/|');
											if (typeof arrform[0] != 'undefined') { GBform[0] = arrform[0].split(';'); }
											if (typeof arrform[1] != 'undefined') { GBform[1] = arrform[1].split(';'); }
											if (typeof arrform[2] != 'undefined') { GBform[2] = arrform[2].split(';'); }

											if (typeof GBform[0] != 'undefined') {
											if (typeof GBform[0][0] != 'undefined') {
												for (oIdx = 21; oIdx < FreeObj.length; oIdx++) {
													if (GBform[0][0].replace(/[/]/g,'\\') == FreeObj[oIdx]) {
														teks += '.FreeObj 0;'+ oIdx +';-3;0;0';
														break;
													}													
												}												
											}	
											if (typeof GBform[0][1] != 'undefined') {
												for (oIdx = 21; oIdx < FreeObj.length; oIdx++) {
													if (GBform[0][1].replace(/[/]/g,'\\') == FreeObj[oIdx]) {
														teks += '.FreeObj 0;'+ oIdx +';-3;0;0';
														break;
													}													
												}												
											}
											if (typeof GBform[0][2] != 'undefined') {
												for (oIdx = 21; oIdx < FreeObj.length; oIdx++) {
													if (GBform[0][2].replace(/[/]/g,'\\') == FreeObj[oIdx]) {
														teks += '.FreeObj 0;'+ oIdx +';-3;0;0';
														break;
													}													
												}												
											}														
											}
											
																				

											break;
										}
									}
  				} else {
  								
  								if (typeof GBform[2] != 'undefined') {
									if (typeof GBform[2][0] != 'undefined') {
										for (oIdx = 21; oIdx < FreeObj.length; oIdx++) {
											if (GBform[2][0].replace(/[/]/g,'\\') == FreeObj[oIdx]) {
												teks += '.FreeObj 0;'+ oIdx +';-3;0;0';
												break;
											}													
										}												
									}	
									if (typeof GBform[2][1] != 'undefined') {
										for (oIdx = 21; oIdx < FreeObj.length; oIdx++) {
											if (GBform[2][1].replace(/[/]/g,'\\') == FreeObj[oIdx]) {
												teks += '.FreeObj 0;'+ oIdx +';-3;0;0';
												break;
												}													
											}												
										}
									if (typeof GBform[2][2] != 'undefined') {
										for (oIdx = 21; oIdx < FreeObj.length; oIdx++) {
											if (GBform[2][2].replace(/[/]/g,'\\') == FreeObj[oIdx]) {
												teks += '.FreeObj 0;'+ oIdx +';-3;0;0';
												break;
											}													
										}												
									}  									
  									
  								}
   								
  								GBform = [];
  				}  							
  				break;
  							
  			case 'roadcross':
  				for (g = 0; g < bveRCObjArr.length; g++) {
						if (bveRCObjArr[g][1] == arrK_1[1]) {
											
							if (bveRCObjArr[g][4] != '') {	
 								for (foI = 21; foI < FreeObj.length; foI++) {
									if (bveRCObjArr[g][4].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
										subTrkArr.push([currX, '.FreeObj 0;'+ foI +';0;0;0']);
										break;
									}
								}
							}
											
							if (bveRCObjArr[g][5] != '') {	
 								for (foI = 21; foI < FreeObj.length; foI++) {
									if (bveRCObjArr[g][5].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
										subTrkArr.push([currX, '.FreeObj 0;'+ foI +';0;0;0']);
										break;
									}
								}
							}
											
							if (bveRCObjArr[g][6] != '') {	
 								for (foI = 21; foI < FreeObj.length; foI++) {
									if (bveRCObjArr[g][6].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
										subTrkArr.push([currX, '.FreeObj 0;'+ foI +';0;0;0']);
										break;
									}
								}
							}

							break;
						}
					}
					break;

  			case 'overbridge':
  				for (g = 0; g < bvefreeObjArr.length; g++) {
  					if (bvefreeObjArr[i][3] == 'Structure') {
    					if (bvefreeObjArr[i][1].indexOf('overbridge') == 0) {
								if (bvefreeObjArr[g][1] == arrK_1[1]) {
									if (bvefreeObjArr[g][5] != '') {	
 										for (foI = 21; foI < FreeObj.length; foI++) {
											if (bvefreeObjArr[g][5].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
												subTrkArr.push([currX, '.FreeObj 0;'+ foI +';' + arrK_1[2] + ';0;' + arrK_1[3]]);
												break;
											}
										}
									}
									break;
								}    						
    					}
    				}
					}
					break;  			
  			default:
  				// default statements
  		}
  		subTrkArr.push([currX, '; ' + arrK[j]]);	
  	}
  } 	
}


function pitchTxt(pitch,currX) {
	var rpit = parseInt(pitch);
	if (isNaN(rpit)) { alert(pitch); return false; }
  
  var tmpTxt = '.Pitch ' + rpit;
  if (pitchRatio == 0)  { 
  	if (rpit < pitchRatio)  { 
    	tmpTxt += ', .FreeObj 0;3;-3;0;0'; 	//menurun opp. level
    } else if (rpit > pitchRatio) { 
    	tmpTxt += ', .FreeObj 0;4;-3;0;0';	//mendaki opp. level
    } else {
    	// line level ... (^x^)
    }
  } else if (pitchRatio > 0)  {
  	if (rpit == 0) {
    	tmpTxt += ', .FreeObj 0;2;-3;0;0'; 	//level opp. mendaki
    } else if (rpit > 0) {
    	tmpTxt += ', .FreeObj 0;7;-3;0;0';		//mendaki-mendaki, lain ratio
    } else {
    	tmpTxt += ', .FreeObj 0;1;-3;0;0';    //menurun opp. mendaki										  										
    }
  } else {
  	if (rpit == 0) { 
    	tmpTxt += ', .FreeObj 0;5;-3;0;0';		//level opp. menurun
    } else if (rpit < 0) {
    	tmpTxt += ', .FreeObj 0;8;-3;0;0';		//menurun-menurun, lain ratio
    } else {
	  	tmpTxt += ', .FreeObj 0;6;-3;0;0';		//mendaki opp. menurun
    }
  }	
	pitchRatio = rpit; 
	subTrkArr.push([currX, tmpTxt]);
}

function turnTxt(turn,currX) {
	var slope = parseFloat(turn);
	slope = Math.round(slope * 1000) / 1000;
	if (isNaN(slope)) { alert(turn); return false; }
  
  var tmpTxt = '.Turn ' + slope;

	subTrkArr.push([currX, tmpTxt]);	
}

function lineXTxt(lineX,currX) {
// paralellTrack[0] = [RailIndex,X,Y,polyid]; // data : railindex, x-distance from main track, y-height --- 2 study
	
	var arrX = lineX.split('§');

  for (j = 0; j < arrX.length; j++) {
  	// code to be executed
  	if (arrX[j] != '') {
  		var arrXd = arrX[j].split(':');
  		var pid = arrXd[0];
  		var rL = parseFloat(arrXd[2]);
  		
  		var railIdx;  											
  		
  		for (p = 0; p < paralellTrack.length; p++) {
  			if (paralellTrack[p][3] == pid) {
  				railIdx = paralellTrack[p][0];
  				break;
  			}
  		}

  		var rL = parseFloat(arrXd[2]);

  		if (arrXd[1] == 'start') {
  			for (n = 3; n < arrXd.length; n++) {
  				var tXd = Math.round(parseFloat(arrXd[n]) * 100) / 100;
  				subTrkArr.push([Math.round(currX + (n-3)*rL), '.Rail ' + railIdx + ';' + tXd + ';0;' + defaultRailIndex]);
  			}
  		} else {
  			for (n = 3; n < arrXd.length; n++) {
  				var tXd = Math.round(parseFloat(arrXd[n]) * 100) / 100;
  				subTrkArr.push([Math.round(currX - (n- 3)*rL), '.Rail ' + railIdx + ';' + tXd + ';0;' + defaultRailIndex]);
  			}
  			
  		}
  	}	
  }
}