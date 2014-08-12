/*
GB Maps ギビマップ - © Karya IT (http://www.karyait.net.my/) 2012-2014. All rights reserved. 
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

GB Maps ギビマップ by Karya IT is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. Based on a work at https://code.google.com/p/gbmaps/. Permissions beyond the scope of this license may be available at https://developers.google.com/readme/terms. Google Maps - ©2014 Google.

Code license : Apache License 2.0

Main GB Maps ギビマップ Website : http://gbmaps.karyait.net.my/ or http://gbmaps.blogspot.com

Development site (programming) : https://github.com/karyait/gbmaps & https://code.google.com/p/gbmaps/
Personal blog for GB Maps ギビマップ (design algorithm) : http://blogkaryait.wordpress.com/tag/gbmaps/


File : gbm-conv-openbve-v1.js
purpose : open bve route builder, data conversion function
type : release (under development)
version : 1.0.0
build : 
last update : 12 August 2014 09:53pm (GMT 8+)

*/
	//BVE object list
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
	
	// GB Maps structure 
	var GBtunnel = [];
	var GBdike = [];
	var GBcut = [];
	var GBbridge = [];
	var GBfo = [];
	var GBform = [];
	var GBug = [];
	var GBcrack = [];
	
	// BVE route structure
	var paralellTrack = [];   // paralellTrack[0] = [RailIndex,X,Y,pid,bsti]; // data : railindex, x-distance from main track, y-height, pid (sideline pid), bsti : index on base line where sideline start (new 08-08-2014)
	var teks = '';
	var defaultRailIndex = 0;
	var mainTrkArr = [];
	var subTrkArr = [];
	var noteTrkArr = []; 
	var pitchRatio = 0;
	 
function generateOpenBVE(pid,stIdx,edIdx,routeId,routeName,gauge,railtype,train,maxspeed,bg,kmstone,stsign,devID,desc)
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
	
	if (gauge != '') {
		teks +='.Gauge ' + gauge + '\n';
	} else {
		teks +='.Gauge 1067\n';
	}
	
	if (desc != '') {
		teks +='.comment ' + desc + '\n';
	} else {
		teks +='.comment build with GB Maps ギビマップ v1.0.0 \n';
	}

	if (devID != '') {
		teks +='.DeveloperID ' + devID + '\n';
	} else {
		teks +='.DeveloperID GB Maps ギビマップ v1.0.0\n';
	}
	


	teks +='\nWith Train\n';
	if (train != '') {
		teks +='.Folder ' + train + '\n';
	} else {
		teks +='.Folder {your train file}\n\n';
	}
	
	if (maxspeed != '') {
		teks +='.Velocity ' + maxspeed + '\n';
	}
	

	teks +='\nWith Texture\n';
	no = 0;
	try {
		for (i = 0; i < bvebveStrOjArr.length; i++) {		
			if (bvebveStrOjArr[i][3] == 'Background') {
				teks += '.Background(' + no + ') ' + bvebveStrOjArr[i][5].replace(/[/]/g,'\\') + ',,\n';
				BackGround.push(bvebveStrOjArr[i][5].replace(/[/]/g,'\\'));
				no++;
			}		
		}			
	}
	catch(err) {
		teks += "[Error] : error in creating background list." + "\n" + err.message + ". \n";
	}	
	
	teks +='\nWith Structure\n';

	try {
		for (i = 0; i < bverailobjArr.length; i++) {
			teks += '.Rail(' + bverailobjArr[i][0] + ') ' + bverailobjArr[i][6].replace(/[/]/g,'\\') + ',,\n';
			Rail.push(bverailobjArr[i][6].replace(/[/]/g,'\\'));
			
			if (railtype != '') {
				if ( railtype == bverailobjArr[i][1] ) { defaultRailIndex = i; }
			}
		}
	}
	catch(err) {
		teks += "[Error] : error in creating rail list." + "\n" + err.message + ". \n";
	}	

	no = 0;

	try {
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
	}
	catch(err) {
		teks += "[Error] : error in creating dike list." + "\n" + err.message + ". \n";
	}	
	
	no = 0;
	try {
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
	}
	catch(err) {
		teks += "[Error] : error in creating tunnel list." + "\n" + err.message + ". \n";
	}	

	try {
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
	}
	catch(err) {
		teks += "[Error] : error in creating flyover list." + "\n" + err.message + ". \n";
	}	

	try {
		//['0','concreteB1','Concrete Bridge 1','concrete-bridge-01.png','bridgel.csv','<center>','bridger.csv','<pier>','0','type']
		for (var i=0; i < bvebridgeObjArr.length; i++) { 
			if (typeof bvebridgeObjArr[i][9] != 'Wall') {		
				if ((typeof bvebridgeObjArr[i][4] != 'undefined') && (typeof bvebridgeObjArr[i][5] != 'undefined'))  { 
					if ((bvebridgeObjArr[i][4] != '') && (bvebridgeObjArr[i][5] != '')) {
						var csvfile = bvebridgeObjArr[i][4].replace(/[/]/g,'\\');
						var addno = false;
						if (WallL.indexOf(csvfile) < 0) {
							WallL.push(csvfile);
							teks += '.WallL(' + no + ') ' + csvfile + ',,\n';		
							addno = true;			
						}
						csvfile = bvebridgeObjArr[i][5].replace(/[/]/g,'\\');
						if (WallR.indexOf(csvfile) < 0) {
							WallR.push(csvfile);
							teks += '.WallR(' + no + ') ' + csvfile + ',,\n';
							addno = true;
						}
						if (addno) { no++;}
					}
				}
				if (typeof bvebridgeObjArr[i][6] != 'undefined') { //pier
					if (bvebridgeObjArr[i][6] != '') {
						var csvfile = bvebridgeObjArr[i][6].replace(/[/]/g,'\\');
						if (FreeObj.indexOf(csvfile) < 0) {
							FreeObj.push(csvfile);
							//teks += '.FreeObj(' + (FreeObj.length-1) + ') ' + csvfile + ',,\n';					
						} 							
					}							
				}			
			}			
		}
	}
	catch(err) {
		teks += "[Error] : error in creating bridge (wall) list." + "\n" + err.message + ". \n";
	}	
	
	
	try {
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
	}
	catch(err) {
		teks += "[Error] : error in creating underground list." + "\n" + err.message + ". \n";
	}	
 
 	try {
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
	}
	catch(err) {
		teks += "[Error] : error in creating hill cut list." + "\n" + err.message + ". \n";
	}
	
	no = 0;
	try {
		for (i = 0; i < bvecrackObjArr.length; i++) {		
			teks += '.CrackL(' + no + ') ' + bvecrackObjArr[i][4].replace(/[/]/g,'\\') + ',,\n';
			CrackL.push(bvecrackObjArr[i][4].replace(/[/]/g,'\\'));
			teks += '.CrackR(' + no + ') ' + bvecrackObjArr[i][5].replace(/[/]/g,'\\') + ',,\n';
			CrackR.push(bvecrackObjArr[i][5].replace(/[/]/g,'\\'));			
			no++;
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating crack list." + "\n" + err.message + ". \n";
	}	
	
	var np =[0,0,0,0];
	try {
		for (i = 0; i < bvepoleObjArr.length; i++) {
			var tracksNum = parseInt(bvepoleObjArr[i][5]) - 1;
			teks += '.Pole(' + tracksNum + ';' + np[tracksNum] + ') ' + bvepoleObjArr[i][4].replace(/[/]/g,'\\') + ',,\n';
			var newPole = [tracksNum + ';' + np[tracksNum], bvepoleObjArr[i][4].replace(/[/]/g,'\\')];
			Pole.push(newPole);
			np[tracksNum]++;
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating pole list." + "\n" + err.message + ". \n";
	}	

	try {
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
		
	}
	catch(err) {
		teks += "[Error] : error in creating platform list." + "\n" + err.message + ". \n";
	}

		
	no = 0;
	try {
		for (i = 0; i < bvebveStrOjArr.length; i++) {
			if (bvebveStrOjArr[i][3] == 'Ground') {
				teks += '.Ground(' + no + ') ' + bvebveStrOjArr[i][5].replace(/[/]/g,'\\') + ',,\n';
				Ground.push(bvebveStrOjArr[i][5].replace(/[/]/g,'\\'));
				no++;
			}		
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating ground list." + "\n" + err.message + ". \n";
	}	

	try {
		for (i = 0; i < bvebveStrOjArr.length; i++) {		
			if (bvebveStrOjArr[i][3] == 'River') {
				teks += '.Ground(' + no + ') ' + bvebveStrOjArr[i][5].replace(/[/]/g,'\\') + ',,\n';
				Ground.push(bvebveStrOjArr[i][5].replace(/[/]/g,'\\'));
				no++;			
			}
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating river list." + "\n" + err.message + ". \n";
	}	

	try {
		for (i = 0; i < bvebveStrOjArr.length; i++) {		
			if (bvebveStrOjArr[i][3] == 'RiverBank') {
				teks += '.Ground(' + no + ') ' + bvebveStrOjArr[i][5].replace(/[/]/g,'\\') + ',,\n';
				Ground.push(bvebveStrOjArr[i][5].replace(/[/]/g,'\\'));
				no++;			
			}
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating river bank list." + "\n" + err.message + ". \n";
	}	
		
	no = 0;
	try {
		for (i = 0; i < bvebveStrOjArr.length; i++) {
			if (bvebveStrOjArr[i][3] == 'Beacon') {
				teks += '.Beacon(' + no + ') ' + bvebveStrOjArr[i][5].replace(/[/]/g,'\\') + ',,\n';
				Beacon.push(bvebveStrOjArr[i][5].replace(/[/]/g,'\\'));
				no++;
			}		
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating beacon list." + "\n" + err.message + ". \n";
	}	
	
	try {
		//['0','concreteB1','Concrete Bridge 1','concrete-bridge-01.png','bridgel.csv','<center>','bridger.csv','<pier>','0']
		for (var i=0; i < bvebridgeObjArr.length; i++) { 
			if (typeof bvebridgeObjArr[i][9] != 'FreeObj') {		
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
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating bridge (FreeObj) list" + "\n" + err.message + ". \n";
	}	
	
	try {
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
	}
	catch(err) {
		teks += "[Error] : error in creating wallL and wallR list." + "\n" + err.message + ". \n";
	}	

	try {
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
	}
	catch(err) {
		teks += "[Error] : error in creating road crossing list." + "\n" + err.message + ". \n";
	} 
  
	try {
		for (i = 0; i < FreeObj.length; i++) {		
			teks += '.FreeObj(' + i + ') ' + FreeObj[i].replace(/[/]/g,'\\') + ',,\n';
		}	
		for (i = 0; i < bvefreeObjArr.length; i++) {		
			FreeObj.push(bvefreeObjArr[i][5].replace(/[/]/g,'\\'));
			teks += '.FreeObj(' + (FreeObj.length-1) + ') ' + bvefreeObjArr[i][5].replace(/[/]/g,'\\') + ',,\n';
		}		
	}
	catch(err) {
		teks += "[Error] : error in creating FreeObj list." + "\n" + err.message + ". \n";
	}  			
	
    	

	teks +='\nWith Track\n';
	
	var polyL = MapToolbar.features['lineTab'][pid];
	var allPoints = polyL.getPath().getArray();

	if (typeof polyL == 'undefined') {
		alert('line (' + pid + ') is unknown. BVE route building is terminated by system');
		return false;
	}

	var persen = 0;
	var distance = 0;

	//detect transition curve
	var tCurveDetect = false;
	for (var i = stIdx; i <= edIdx; i++)  { 
		if (polyL.markers.getAt(i).bdata.curve == '' && polyL.markers.getAt(i).bdata.tcurve != '')  {
			tCurveDetect = true;
			break;
		}
	}
	
	if (tCurveDetect) {
		alert('Transition curve not supported by OpenBVE.');
		return false;
	}
	
	// *******
	
	

	//main data conversion logic
	for (var i = 0; i < allPoints.length; i++)   { 
		var x = getTrackDistanceFromStart(pid,i);  //distance { 'Lpoly' : Lpoly, 'LwCurve' : LwCurve, 'LwPitch' : LwPitch}	
		var currX = x.LwPitch; 
	
		//bdata: {height:'',railindex:'',pitch:'',curve:'',tcurve:''},
	
		if (polyL.markers.getAt(i).sline != '') {
			ProcessSLine(polyL.markers.getAt(i).sline, Math.round(currX),stIdx,edIdx,i);		
		}	
				
		try {
			if (polyL.markers.getAt(i).bdata.curve != '') {
			// ************ on curve section ************
				if (i >= stIdx && i <= edIdx) {
					var cPoly = MapToolbar.features['curveTab'][polyL.markers.getAt(i).bdata.curve];			
					var tL = cPoly.Lt;
					var cL = cPoly.Lc;
					var Rc = cPoly.Rc
					var cant = cPoly.cant
					var Vd = cPoly.Vd
					var forceSL = cPoly.forceSL
					var Crailindex = cPoly.railindex 
				
					currX -= tL;
				
					for (var ci=0; ci < cPoly.markers.getLength(); ci++) {
						if (ci != 2) {
							var cX = currX + cPoly.markers.getAt(ci).ld;
						
							if (ci == 0) {
						
								var tmpTxt = '.Curve ' + Rc + ';' + cant+', .FreeObj 0;0;-2;0.7;0';
							
								if (forceSL == true) {
									tmpTxt += ', .Limit ' + Vd + ';-1;0';
								}
								tmpTxt += ', .RailType 0;' + Crailindex;

								for (p = 0; p < paralellTrack.length; p++) {
									tmpTxt += ', .RailType ' + paralellTrack[p][0] + ';' + Crailindex;  													
								}
								mainTrkArr.push([Math.round(cX),tmpTxt]);

								
							} else if (ci == 1) {					
								var tmpTxt = '.Curve 0;0';
							
								if (forceSL == true) {
									tmpTxt += ', .Limit 0;-1;0';
								}
								tmpTxt += ', .RailType 0;' + defaultRailIndex;

								for (p = 0; p < paralellTrack.length; p++) {
									tmpTxt += ', .RailType ' + paralellTrack[p][0] + ';' + defaultRailIndex;  													
								}
								mainTrkArr.push([Math.round(cX),tmpTxt]);
							
							} else {
								//
							}
						
							// ######### data on point start ##########

							if (cPoly.markers.getAt(ci).bdata.height != '' || cPoly.markers.getAt(ci).bdata.pitch != ''){
								ProcessbData(cPoly.markers.getAt(ci).bdata, Math.round(cX));
							}	
				
							if (cPoly.markers.getAt(ci).note != ''){
								noteTrkArr.push([ Math.round(cX),cPoly.markers.getAt(ci).note]);
							}
				
							//kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''},
							if (cPoly.markers.getAt(ci).kdata.bridge != '' || cPoly.markers.getAt(ci).kdata.overbridge != '' || cPoly.markers.getAt(ci).kdata.river != '' || cPoly.markers.getAt(ci).kdata.ground != '' || cPoly.markers.getAt(ci).kdata.flyover != '' || cPoly.markers.getAt(ci).kdata.tunnel != '' || cPoly.markers.getAt(ci).kdata.pole != '' || cPoly.markers.getAt(ci).kdata.dike != '' || cPoly.markers.getAt(ci).kdata.cut != '' || cPoly.markers.getAt(ci).kdata.underground != '' || cPoly.markers.getAt(ci).kdata.form != '' || cPoly.markers.getAt(ci).kdata.roadcross != '' || cPoly.markers.getAt(ci).kdata.crack != '' || cPoly.markers.getAt(ci).kdata.beacon != ''){  			
								ProcesskData(cPoly.markers.getAt(ci).kdata,Math.round(cX),polyL.markers.getAt(i).bdata.curve,ci);
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
					turnTxt(ratio,currX);
				}

				if (i >= stIdx && i <= edIdx) {
					if (i == stIdx) {
						mainTrkArr.push([Math.round(currX),'.RailType 0;' + defaultRailIndex  + ', ; .height 1,']);
				
					} else if (i == edIdx) {
						var crX = Math.round(currX/25)*25;
						mainTrkArr.push([crX,'']);
						noteTrkArr.push([crX,'************ End of Track ************']);
				
					} else {
			
					}	
					
					// ######### data on point start ##########

					if (polyL.markers.getAt(i).bdata.height != '' || polyL.markers.getAt(i).bdata.railindex != '' || polyL.markers.getAt(i).bdata.pitch != ''){
						ProcessbData(polyL.markers.getAt(i).bdata, Math.round(currX));
					}	
				
					if (polyL.markers.getAt(i).note != ''){
						noteTrkArr.push([ Math.round(currX),polyL.markers.getAt(i).note]);
					}
				
					//kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''},
					if (polyL.markers.getAt(i).kdata.bridge != '' || polyL.markers.getAt(i).kdata.overbridge != '' || polyL.markers.getAt(i).kdata.river != '' || polyL.markers.getAt(i).kdata.ground != '' || polyL.markers.getAt(i).kdata.flyover != '' || polyL.markers.getAt(i).kdata.tunnel != '' || polyL.markers.getAt(i).kdata.pole != '' || polyL.markers.getAt(i).kdata.dike != '' || polyL.markers.getAt(i).kdata.cut != '' || polyL.markers.getAt(i).kdata.underground != '' || polyL.markers.getAt(i).kdata.form != '' || polyL.markers.getAt(i).kdata.roadcross != '' || polyL.markers.getAt(i).kdata.crack != '' || polyL.markers.getAt(i).kdata.beacon != ''){  			
						ProcesskData(polyL.markers.getAt(i).kdata,Math.round(currX),pid,i);
					}			
					// ######### data on point end ##########
				}
			
			}
			
		}
		catch(err) {
			teks += "[Error] : error in creating track at distance " + Math.round(currX) + "\n" + err.message + ". \n";
		}		
 	    
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

function ProcessbData(bdata,currX) {
//bdata: {height:'',railindex:'',pitch:'',curve:''},	
	if (bdata.height != '') {
		subTrkArr.push([ currX, '.Height ' + bdata.height]);
	}
	
	if (bdata.pitch != '') {
		var rpit = parseInt(bdata.pitch);
		if (isNaN(rpit)) { alert(bdata.pitch);}
  
		var tmpTxt = '.Pitch ' + rpit;
		if (pitchRatio == 0)  { 
			if (rpit < pitchRatio)  { 
				tmpTxt += ', .FreeObj 0;3;-2;-0.3;0'; 	//menurun opp. level
				
			} else if (rpit > pitchRatio) { 
				tmpTxt += ', .FreeObj 0;4;-2;-0.3;0';	//mendaki opp. level
				
			} else {
				// line level ... (^x^)
			}
		} else if (pitchRatio > 0)  {
			if (rpit == 0) {
				tmpTxt += ', .FreeObj 0;2;-2;-0.3;0'; 	//level opp. mendaki
			} else if (rpit > 0) {
				tmpTxt += ', .FreeObj 0;7;-2;-0.3;0';		//mendaki-mendaki, lain ratio
			} else {
				tmpTxt += ', .FreeObj 0;1;-2;-0.3;0';    //menurun opp. mendaki										  										
			}
		} else {
			if (rpit == 0) { 
				tmpTxt += ', .FreeObj 0;5;-2;-0.3;0';		//level opp. menurun
			} else if (rpit < 0) {
				tmpTxt += ', .FreeObj 0;8;-2;-0.3;0';		//menurun-menurun, lain ratio
			} else {
				tmpTxt += ', .FreeObj 0;6;-2;-0.3;0';		//mendaki opp. menurun
			}
		}	
		
		pitchRatio = rpit; 
		subTrkArr.push([currX, tmpTxt]);
	}

	if (typeof bdata.railindex != 'undefined') {
		if (bdata.railindex != '') {
			var ri = 0;
			for (g1 = 0; g1 < bverailobjArr.length; g1++) {			
				if (bverailobjArr[g1][1] == bdata.railindex) {
					for (r = 0; r < Rail.length; r++) {
						if (Rail[r] == bverailobjArr[g1][6].replace(/[/]/g,'\\')) {
							ri =  r ;  									
							break;
						}
					}
					break;
				}
			}
		
			subTrkArr.push([ currX, '.RailType 0;' + ri]);
			for (p = 0; p < paralellTrack.length; p++) {
				subTrkArr.push([ currX, '.RailType ' + paralellTrack[p][0] + ';' + ri]);  													
			}		
		}	
	}
	
}


function ProcesskData(kdata,currX,pid,idx) {
//kdata: {bridge:'',overbridge:'',river:'',ground:'',flyover:'',tunnel:'',pole:'',dike:'',cut:'',underground:'',form:'',roadcross:'',crack:'',beacon:''},
	var crX = Math.round(currX/25)*25;

	if ( kdata.bridge != '' ) {
		noteTrkArr.push([ crX,'bridge']);
		var arrK = kdata.bridge.split(',');
		for (k = 0; k < arrK.length; k++) {
			var arrK_1 = arrK[k].split(':');
			if (arrK_1[1] == '0') {
				for (g = 0; g < bvebridgeObjArr.length; g++) {
					if (bvebridgeObjArr[g][1] == arrK_1[0]) {
						if (bvebridgeObjArr[g][9] == 'Wall') {
							//algoritma utk wall type
							if (paralellTrack.length == 0) {
								for (wI = 0; wI < WallL.length; wI++) {
									if (bvebridgeObjArr[g][4].replace(/[/]/g,'\\') ==  WallL[wI]) {																
										if (bvebridgeObjArr[g][5] != '') {
											subTrkArr.push([crX, '.Wall 0;0;'+ wI]);
											GBfo[0] = 0;
											GBfo[1] = 0;
										} else {
											subTrkArr.push([crX, '.Wall 0;-1;'+ wI]);
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
									if (bvebridgeObjArr[g][4].replace(/[/]/g,'\\') ==  WallL[wI]) {
										subTrkArr.push([crX, ' .Wall ' + leftestIndex + ';-1;'+ wI]);
										GBfo[0] = leftestIndex;														
										break;
									}
								}
								for (wI = 0; wI < WallR.length; wI++) {
									if (bvebridgeObjArr[g][5].replace(/[/]/g,'\\') == WallR[wI]) {
										subTrkArr.push([crX, '.Wall ' + rightestIndex + ';1;'+ wI]);
										GBfo[1] = rightestIndex;
										break;
									}
								}
							}
							if (bvebridgeObjArr[g][6] != '') {	
								for (foI = 21; foI < FreeObj.length; foI++) {
									if (bvebridgeObjArr[g][6].replace(/[/]/g,'\\') == FreeObj[foI]) {
										break;
									}
								}
							}
							if ((typeof GBfo[0] != 'undefined') || (typeof GBfo[1] != 'undefined')) {
								GBfo[2] = crX; // initial distance
							}	
					
							break;							
						} else {
							//algoritma utk freeobj type
							if (paralellTrack.length == 0) {
								if (bvebridgeObjArr[g][4] != '') {	
									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][4].replace(/[/]/g,'\\') == FreeObj[foI]) {
											subTrkArr.push([crX, '.FreeObj 0;'+ foI +';0;0;0']);
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
											subTrkArr.push([crX, '.FreeObj 0;'+ foI +';0;0;0']);
											GBbridge[2] = 0;															
											break;
										}
									}
								}
								/*				
								if (bvebridgeObjArr[g][7] != '') {	
									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][7].replace(/[/]/g,'\\') == FreeObj[foI]) {
											GBbridge[3] = 0;
											break;
										}
									}
								}	*/		
																						
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
											subTrkArr.push([crX, '.FreeObj ' + leftestIndex + ';' + foI +';0;0;0']);
											GBbridge[0] = leftestIndex;														
											break;
										}
									}
								}
								
								if (bvebridgeObjArr[g][5] != '') {	//right str
									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][5].replace(/[/]/g,'\\') == FreeObj[foI]) {
											subTrkArr.push([crX, ' .FreeObj ' + rightestIndex + ';' + foI +';0;5;0']);
											GBbridge[1] = rightestIndex;														
											break;
										}
									}
								}
								
								if (bvebridgeObjArr[g][6] != '') {	//pier obj												
									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][6].replace(/[/]/g,'\\') == FreeObj[foI]) {
											subTrkArr.push([crX, '.FreeObj 0;' + foI +';0;0;0']); 
											GBbridge[2] = 0;
											break;
										}
									}													
								}
									
							}
							if ((typeof GBbridge[0] != 'undefined') || (typeof GBbridge[1] != 'undefined')) {
								GBbridge[4] = crX; // initial distance												
							}												
							break;						
						}
					
					}
				}
  			} else {
				for (g = 0; g < bvebridgeObjArr.length; g++) {
					if (bvebridgeObjArr[g][1] == arrK_1[0]) {
					
						if (bvebridgeObjArr[g][9] == 'Wall') {
							for (g = 0; g < bvebridgeObjArr.length; g++) {
								if (bvebridgeObjArr[g][1] == arrK_1[0]) {
									if (bvebridgeObjArr[g][6] != '') {	
										for (foI = 21; foI < FreeObj.length; foI++) {
											if (bvebridgeObjArr[g][6].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
												if (typeof GBfo[2] != 'undefined') { 
													var iXd = GBfo[2] + parseInt(bvebridgeObjArr[g][7]);
													subTrkArr.push([GBfo[2], '.FreeObj 0;' + foI +';0;0;0']);
													do {
														subTrkArr.push([iXd, '.FreeObj 0;' + foI +';0;0;0']);
														iXd += parseInt(bvebridgeObjArr[g][7]);
													} while (iXd <= crX); // <= currX																
												}
												break;
											}
										}
									}
								}
							}				

									
							if ((typeof GBfo[0] != 'undefined') && (typeof GBfo[1] != 'undefined')) {
								if (( GBfo[0] == 0) && ( GBfo[1] == 0)) {
									subTrkArr.push([crX, '.WallEnd 0']);
								} else {
									subTrkArr.push([crX, '.WallEnd ' + GBfo[0] + ', .WallEnd ' + GBfo[1]]);
								}
							} else { 									
								if (typeof GBfo[0] != 'undefined') {
									subTrkArr.push([crX, '.WallEnd ' + GBfo[0]]);
								}
								if (typeof GBfo[1] != 'undefined') {
									subTrkArr.push([crX, '.WallEnd ' + GBfo[1]]);
								}
							}
							GBfo = [];	
							
						} else {
							var bgL = (bvebridgeObjArr[g][8] == '0') ? 25 : parseFloat(bvebridgeObjArr[g][8]);
							
							if (paralellTrack.length == 0) {
								if (bvebridgeObjArr[g][4] != '') {	
									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][4].replace(/[/]/g,'\\') == FreeObj[foI]) {
											if (typeof GBbridge[4] != 'undefined') {
												var iXd = GBbridge[4] + Math.abs(bgL);																
												do {
													subTrkArr.push([iXd, '.FreeObj 0;'+ foI +';0;0;0']);
													iXd += Math.abs(bgL);
												} while (iXd <= crX); 
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
												} while (iXd <= crX); 
											}
											break;
										}
									}
								}
								
								if (bvebridgeObjArr[g][6] != '') {
									var pierXd = (bvebridgeObjArr[g][7] == '0') ? 50 : parseFloat(bvebridgeObjArr[g][7]);
									for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][6].replace(/[/]/g,'\\') == FreeObj[foI]) {
											if (typeof GBbridge[4] != 'undefined') {
												var iXd = GBbridge[4] + pierXd;																
												do {
													subTrkArr.push([iXd, '.FreeObj 0;'+ foI +';0;0;0']);
													iXd += pierXd;
												} while (iXd <= crX); 
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
												} while (iXd <= crX); 
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
													subTrkArr.push([iXd, '.FreeObj ' + rightestIndex + ';' + foI +';0;0;0']);
													iXd += Math.abs(bgL);
												} while (iXd <= crX); 
											}
											break;
										}
									}
								}
				
								if (bvebridgeObjArr[g][6] != '') {
									var pierXd = (bvebridgeObjArr[g][7] == '0') ? 25 : parseFloat(bvebridgeObjArr[g][7]);
										for (foI = 21; foI < FreeObj.length; foI++) {
										if (bvebridgeObjArr[g][6].replace(/[/]/g,'\\') == FreeObj[foI]) {
											if (typeof GBbridge[4] != 'undefined') {
												var iXd = GBbridge[4] + pierXd;																
												do {
													subTrkArr.push([iXd, '.FreeObj 0;'+ foI +';0;0;0']);
													iXd += pierXd;
												} while (iXd <= crX);
											}
											break;
										}
									}
								}													
							}						
						}		
					}
				}
			}
		}			
	}
	
	if (kdata.overbridge != '') {
		var obname = kdata.overbridge.split(',');
		noteTrkArr.push([ crX,'overbridge']);
  		for (g = 0; g < bvefreeObjArr.length; g++) {
  			if (bvefreeObjArr[g][3] == 'overbridge') {
				if (bvefreeObjArr[g][1] == obname[0]) {
					if (bvefreeObjArr[g][5] != '') {	
 						for (foI = 21; foI < FreeObj.length; foI++) {
							if (bvefreeObjArr[g][5].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
								subTrkArr.push([currX, '.FreeObj 0;'+ foI +';' + obname[1] + ';' + obname[2] + ';' + obname[3]]);
								break;
							}
						}
					}
					break;
				}    						
    				
    			}
		}		
	}
	
	/* // dah x perlu, digantikan dengan ground sj
	if (kdata.river != '') {
		var rname = kdata.river.split(',');
		var rwidth = parseInt(rname[1]);
		for (rv = 0; rv < bvebveStrOjArr.length; rv++) {
  			if (bvebveStrOjArr[rv][1] == rname[0]) {
  				for (gr = 0; gr < Ground.length; gr++) {
  					if (Ground[gr] == bvebveStrOjArr[rv][5].replace(/[/]/g,'\\')) {
  						subTrkArr.push([ currX, '.Ground ' + gr ]); 
  						break;
  					}
  				}
				// restore current ground?
  			}
  		}
	}
	*/
	if (kdata.ground != '') {		
		for (g1 = 0; g1 < bvebveStrOjArr.length; g1++) {
  			if (bvebveStrOjArr[g1][1] == kdata.ground) {
  				for (gr = 0; gr < Ground.length; gr++) {
  					if (Ground[gr] == bvebveStrOjArr[g1][5].replace(/[/]/g,'\\')) {
  						subTrkArr.push([ crX, '.Ground ' + gr ]);
  						break;
  					}
  				}
  			}
		}
	}
	
	if (kdata.flyover != '') {
		var arrK = kdata.flyover.split(',');
		noteTrkArr.push([ crX,'flyover']);
		
		for (k = 0; k < arrK.length; k++) {
			var arrK_1 = arrK[k].split(':');
			if (arrK_1[1] == '0') {
				for (g = 0; g < bveFOObjArr.length; g++) {
					if (bveFOObjArr[g][1] == arrK_1[0]) {
									
						if (paralellTrack.length == 0) {
							for (wI = 0; wI < WallL.length; wI++) {
								if (bveFOObjArr[g][4].replace(/[/]/g,'\\') ==  WallL[wI]) {																
									if (bveFOObjArr[g][5] != '') {
										subTrkArr.push([crX, '.Wall 0;0;'+ wI]);
										GBfo[0] = 0;
										GBfo[1] = 0;
									} else {
										subTrkArr.push([crX, '.Wall 0;-1;'+ wI]);
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
									subTrkArr.push([crX, ' .Wall ' + leftestIndex + ';-1;'+ wI]);
									GBfo[0] = leftestIndex;														
									break;
								}
							}
							for (wI = 0; wI < WallR.length; wI++) {
								if (bveFOObjArr[g][5].replace(/[/]/g,'\\') == WallR[wI]) {
									subTrkArr.push([crX, '.Wall ' + rightestIndex + ';1;'+ wI]);
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
							GBfo[2] = crX; // initial distance
						}	
				
						break;
					}
				}
						
			} else {
	
				for (g = 0; g < bveFOObjArr.length; g++) {
					if (bveFOObjArr[g][1] == arrK_1[0]) {
						if (bveFOObjArr[g][6] != '') {	
							for (foI = 21; foI < FreeObj.length; foI++) {
								if (bveFOObjArr[g][6].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
									if (typeof GBfo[2] != 'undefined') { 
										var iXd = GBfo[2] + parseInt(bveFOObjArr[g][7]);
										subTrkArr.push([GBfo[2], '.FreeObj 0;' + foI +';0;0;0']);
										do {
											subTrkArr.push([iXd, '.FreeObj 0;' + foI +';0;0;0']);
											iXd += parseInt(bveFOObjArr[g][7]);
										} while (iXd <= crX); // <= currX																
									}
									break;
								}
							}
						}
					}
				}				

						
				if ((typeof GBfo[0] != 'undefined') && (typeof GBfo[1] != 'undefined')) {
					if (( GBfo[0] == 0) && ( GBfo[1] == 0)) {
						subTrkArr.push([crX, '.WallEnd 0']);
					} else {
						subTrkArr.push([crX, '.WallEnd ' + GBfo[0] + ', .WallEnd ' + GBfo[1]]);
					}
				} else { 									
					if (typeof GBfo[0] != 'undefined') {
						subTrkArr.push([crX, '.WallEnd ' + GBfo[0]]);
					}
					if (typeof GBfo[1] != 'undefined') {
						subTrkArr.push([crX, '.WallEnd ' + GBfo[1]]);
					}
				}
				GBfo = [];
			} 		
		}
 	}
	
	if (kdata.tunnel != '') {
		var arrK = kdata.tunnel.split(',');
		noteTrkArr.push([ crX,'tunnel']);
		
		for (k = 0; k < arrK.length; k++) {
			var arrK_1 = arrK[k].split(':');
			if (arrK_1[1] == '0') {
				for (g = 0; g < bvetunnelObjArr.length; g++) {
					if (bvetunnelObjArr[g][1] == arrK_1[0]) {
						for (foI = 21; foI < FreeObj.length; foI++) {
							if (bvetunnelObjArr[g][4].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
								subTrkArr.push([crX, ' .FreeObj 0;'+ foI +';0;0;0']);
								break;
							}
						}
						if (paralellTrack.length == 0) {
							for (wI = 0; wI < WallL.length; wI++) {
								if (bvetunnelObjArr[g][6].replace(/[/]/g,'\\') ==  WallL[wI]) {														
									if (bvetunnelObjArr[g][7] != '') {
										subTrkArr.push([crX, ' .Wall 0;0;'+ wI]);
										GBtunnel[0] = 0;
										GBtunnel[1] = 0;
									} else {
										subTrkArr.push([crX, ' .Wall 0;-1;'+ wI]);
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
									subTrkArr.push([crX, '.Wall ' + leftestIndex + ';-1;'+ wI]);
									GBtunnel[0] = leftestIndex;														
									break;
								}
							}
											
							for (wI = 0; wI < WallR.length; wI++) {
								if (bvetunnelObjArr[g][7].replace(/[/]/g,'\\') ==  WallR[wI]) {
									subTrkArr.push([crX, '.Wall ' + rightestIndex + ';1;'+ wI]);
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
						subTrkArr.push([crX, '.WallEnd 0']);
					} else {
						subTrkArr.push([crX, '.WallEnd ' + GBtunnel[0] + ', .WallEnd ' + GBtunnel[1]]);
					}
				} else {
					if (typeof GBtunnel[0] != 'undefined') {
						subTrkArr.push([crX, '.WallEnd ' + GBtunnel[0]]);
					}
					if (typeof GBtunnel[1] != 'undefined') {
						subTrkArr.push([crX, '.WallEnd ' + GBtunnel[1]]);
					}
				}
				/*
				for (g = 0; g < bveFOObjArr.length; g++) {
					if (bveFOObjArr[g][1] == arrK_1[0]) {
						if (bvetunnelObjArr[g][5] != '') {	
							for (foI = 21; foI < FreeObj.length; foI++) {
								if (bvetunnelObjArr[g][5].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
									subTrkArr.push([crX, '.FreeObj 0;'+ foI +';0;0;0']);
									break;
								}
							}
						}
					}
				}	*/

				GBtunnel = []; 								
			}
		}
	}
		
	if (kdata.dike != '') {
		var arrK = kdata.dike.split(',');
		
		
		for (k = 0; k < arrK.length; k++) {
			var arrK_1 = arrK[k].split(':');
			if (arrK_1[1] == '0') {
				for (g = 0; g < bvedikeObjArr.length; g++) {
					if (bvedikeObjArr[g][1] == arrK_1[0]) {
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
		
		}		
	}
	
	if (kdata.cut != '') {
		var arrK = kdata.cut.split(',');
		noteTrkArr.push([ crX,'cut']);
		
		for (k = 0; k < arrK.length; k++) {
			var arrK_1 = arrK[k].split(':');
			if (arrK_1[1] == '0') {
				for (g = 0; g < bvecutObjArr.length; g++) {
					if (bvecutObjArr[g][1] == arrK_1[0]) {										
						if (paralellTrack.length == 0) {
							for (wI = 0; wI < WallL.length; wI++) {
								if (bvecutObjArr[g][4].replace(/[/]/g,'\\') ==  WallL[wI]) {																
									if (bvecutObjArr[g][5] != '') {
										subTrkArr.push([crX, '.Wall 0;0;'+ wI]);
										GBcut[0] = 0;
										GBcut[1] = 0;
									} else {
										subTrkArr.push([crX, '.Wall 0;-1;'+ wI]);
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
									subTrkArr.push([crX, ' .Wall ' + leftestIndex + ';-1;'+ wI]);
									GBcut[0] = leftestIndex;														
									break;
								}
							}
							for (wI = 0; wI < WallR.length; wI++) {
								if (bvecutObjArr[g][5].replace(/[/]/g,'\\') == WallR[wI]) {
									subTrkArr.push([crX, '.Wall ' + rightestIndex + ';1;'+ wI]);
									GBcut[1] = rightestIndex;
									break;
								}
							}
						}
						if ((typeof GBcut[0] != 'undefined') || (typeof GBcut[1] != 'undefined')) {
							GBcut[2] = crX; // initial distance
						}	
							
						break;
					}
				}
							
			} else {
 									
				if ((typeof GBcut[0] != 'undefined') && (typeof GBcut[1] != 'undefined')) {
					if (( GBcut[0] == 0) && ( GBcut[1] == 0)) {
						subTrkArr.push([crX, '.WallEnd 0']);
					} else {
						subTrkArr.push([crX, '.WallEnd ' + GBcut[0] + ', .WallEnd ' + GBcut[1]]);
					}
				} else { 									
					if (typeof GBcut[0] != 'undefined') {
						subTrkArr.push([crX, '.WallEnd ' + GBcut[0]]);
					}
					if (typeof GBcut[1] != 'undefined') {
						subTrkArr.push([crX, '.WallEnd ' + GBcut[1]]);
					}
				}
				GBcut = [];
			} 
		
		}
	}
	
	if (kdata.underground != '') {
		//subTrkArr.push([ currX, '.Height ' + kdata.height]);
		noteTrkArr.push([ crX,'underground']);
	}
	
	if (kdata.form != '') {
		var formArr = kdata.form.split(',');
		var RoofStructureIndex;
		var FormStructureIndex;		
		
		if (formArr.length == 7) {
			//['0','formstd','Form Std','form.jpg','1067/form/forml.csv','1067/form/formcl.csv','1067/form/formcr.csv','1067/form/formr.csv','1067/form/roofl.csv','1067/form/roofcl.csv','1067/form/roofcr.csv','1067/form/roofr.csv'];							
			for (f1 = 0; f1 < bveplatformObjArr.length; f1++) {			
				if (bveplatformObjArr[f1][1] == formArr[0]) {
					
					for (fI = 0; fI < FormL.length; fI++) {
						if (bveplatformObjArr[f1][4].replace(/[/]/g,'\\') ==  FormL[fI]) {
							FormStructureIndex = fI+1;
							break;
						}
					}
					for (rI = 0; rI < RoofL.length; rI++) {
						if (bveplatformObjArr[f1][8].replace(/[/]/g,'\\') == RoofL[rI]) {
							RoofStructureIndex = rI+1;
							break;
						}
					}
					break;	
				}				
			}					

			//	MapToolbar.features["lineTab"][pid].markers.getAt(idx).kdata.form = formstr + ',' + staName + ',' + staID + ',' + stopD + ',' + stopT + ',' + fcar + ',' + formSide;
			var stop = (formArr[4] == '1')? 'S' : 'B';
			var passAlarm = (formArr[4] == '1')? '1' : '0';
			var door = '0';
			var formSideArr = formArr[6].split('/');
			
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
			
			subTrkArr.push([ crX, '.sta ' + formArr[1] + ';  ' + stop + '; ; ' + passAlarm + '; ' + door + '; 0; 0; ; ' + formArr[3] + '; 100;test_route\\salam.wav, ']);
			
			var formTxt = '';
			// paralellTrack[0] = [RailIndex,X,Y,pid]; // data : railindex, x-distance from main track, y-height --- 2 study
			for (fs = 0; fs < formSideArr.length; fs++) {
				//.Form RailIndex1; L; RoofStructureIndex; FormStructureIndex, Left form
				//.Form RailIndex2; R; RoofStructureIndex; FormStructureIndex, right form
				//.Form RailIndex; RailIndexOpposite; RoofStructureIndex; FormStructureIndex,
			
				var formSide = formSideArr[fs].replace(':',';');
								
				for (pTi = 0; pTi < paralellTrack.length; pTi++) {
					var fsArr = formSide.split(';');
					if (fsArr[0] == paralellTrack[pTi][3] || fsArr[1] == paralellTrack[pTi][3]) {
						formSide = formSide.replace(paralellTrack[pTi][3],paralellTrack[pTi][0]);
					}					
				}
				
				formSide = formSide.replace(pid,'0');			
				
				//Track.Form RailIndex1; RailIndex2; RoofStructureIndex; FormStructureIndex
				subTrkArr.push([ crX, '.Form ' + formSide + ';' + RoofStructureIndex + ';' + FormStructureIndex]);
				if (formTxt == '') {
					formTxt = '.Form ' + formSide + ';' + RoofStructureIndex + ';' + FormStructureIndex;
				} else {
					formTxt += ', .Form ' + formSide + ';' + RoofStructureIndex + ';' + FormStructureIndex;
				}
			}

			GBform[0] = crX;
			GBform[1] = formTxt;
			GBform[2] = formArr[5];
			switch (door) {
				case '1' :
					GBform[3] = '-1';
					break;
				case '-1' :
					GBform[3] = '1';
					break;
				default:
					GBform[3] = '0';
			}
			
		} else {
			//	MapToolbar.features["lineTab"][pid].markers.getAt(idx+1).kdata.form = stopS + ',' + stopO;
			var Xd = crX-25;
			while (Xd > GBform[0]) {
				subTrkArr.push([ Xd, GBform[1]]);
				Xd -= 25;
			}
			var stopSign = '0';
			if (GBform[3] != '0') {
				stopSign = GBform[3];
			}
			var stopPoint = crX - parseFloat(formArr[1]);
			subTrkArr.push([ stopPoint, '.stop ' + stopSign + '; ; ; ' + GBform[2]]);
			
			GBform = [];
			
		}

	}

	//proses pole hendaklah selepas form, bergantung pada GBForm
	if (kdata.pole != '') {
		crX = Math.round(currX/25)*25;
		
		subTrkArr.push([ crX, '.Pole 0;' + kdata.pole + '; 0; 25; 0']);
	}
	
	if (kdata.roadcross != '') {
		var rcname = kdata.roadcross.split(',') ;
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
				
				// 4 toolbar left
				if (bveRCObjArr[g][4] != '') {	
 					for (foI = 21; foI < FreeObj.length; foI++) {
						if (bveRCObjArr[g][4].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
							subTrkArr.push([currX, '.FreeObj ' + leftestIndex + ';'+ foI +';0;0;0']);
							break;
						}
					}
				}
				
				// 5 crossing center
				if (bveRCObjArr[g][5] != '') {	
 					for (foI = 21; foI < FreeObj.length; foI++) {
						if (bveRCObjArr[g][5].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
							if (paralellTrack.length == 0) {
								subTrkArr.push([currX, '.FreeObj 0;'+ foI +';0;0;0']);
							} else {
								subTrkArr.push([currX, '.FreeObj 0;'+ foI +';0;0;0']);
								for (pTi = 0; pTi < paralellTrack.length; pTi++) {
									subTrkArr.push([currX, '.FreeObj ' + paralellTrack[pTi][0] + ';' + foI + ';0;0;0']);
								}
							}
							break;
						}
					}
				}
				
				// 6 toolbar right
				if (bveRCObjArr[g][6] != '') {	
 					for (foI = 21; foI < FreeObj.length; foI++) {
						if (bveRCObjArr[g][6].replace(/[/]/g,'\\') ==  FreeObj[foI]) {
							subTrkArr.push([currX, '.FreeObj ' + rightestIndex + ';'+ foI +';0;0;0']);
							break;
						}
					}
				}

				// dopller sound
				if (bveRCObjArr[g][7] != '') {	
					var soundFile  = bveRCObjArr[g][7].replace(/[/]/g,'\\');
					var xOffset  = -3.2;
					for (pTi = 0; pTi < paralellTrack.length; pTi++) {
						if (paralellTrack[pTi][0] == leftestIndex) {
							xOffset += paralellTrack[pTi][1];
							break;
						}
					}					
					subTrkArr.push([currX, '.Doppler ' + soundFile + ';' + xOffset + ';2.7']);
					//.Doppler al-kimia\trek\crossing.wav;-3.2;2.7,
				}				
				break;
			}
		}		
	}
	
	if (kdata.crack != '') {
		for (csi = 0; csi < bvecrackObjArr.length; csi++) {
  			if (bvecrackObjArr[csi][1] == kdata.ground) {
  				for (ci = 0; ci < CrackL.length; ci++) {
  					if (CrackL[ci] == bvecrackObjArr[csi][4].replace(/[/]/g,'\\')) {
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

function ProcessSLine(sline,currX,stIdx,edIdx,cIdx) {
	var linesArr = sline.split(',');
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
						while ( n*25 < stSwlength ) {
							//currOffset = side*stOffset + side*(Math.round(turnoutratio * n * 25 * 100) / 100);
							currOffset = Math.round((side*stOffset + side * turnoutratio * n * 25)* 1000) / 1000;
							if (cIdx >= stIdx && cIdx <= edIdx) { subTrkArr.push([(crX + n*25), '.Rail ' + railIdx + ';' + currOffset + ';0;' + defaultRailIndex]); }
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
						if (cIdx >= stIdx && cIdx <= edIdx) { subTrkArr.push([ crX, '.Rail ' + railIdx + ';' + side*stOffset + ';0;' + defaultRailIndex ]); }
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
									if (cIdx >= stIdx && cIdx <= edIdx) { subTrkArr.push([(sLxD + n*25), '.Rail ' + railIdx + ';' + currOffset + ';0;' + defaultRailIndex]); }
									n ++;
								}								
							} else {
								if (cIdx >= stIdx && cIdx <= edIdx) { subTrkArr.push([ sLxD, '.Rail ' + railIdx + ';' + side*stOffset + ';0;' + defaultRailIndex ]); }
							}	
							
								
						} else {
								
						}	
						/*
						if (s_polyL.markers.getAt(i).curve != '') {
							
						} else {

						} */
					}
					
					//2do extent side line processing
					//setTimeout(function(){ code 2 run }, milliseconds);
						
					if (cIdx >= stIdx && cIdx <= edIdx) { subTrkArr.push([ crX, '.RailEnd ' + railIdx + ';' + side0*endOffset + ';0,']); }				
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


function turnTxt(turn,currX) {
	var slope = Math.round(turn * 1000) / 1000;
	//if (isNaN(slope)) { alert(turn); return false; }
	var crX = Math.round(currX/25)*25;
  
	var tmpTxt = '.Turn ' + slope;
	if (slope == 0 || (slope > 0 && slope >= 1) || (slope < 0 && slope <= -1)) { return false; }
	
	subTrkArr.push([crX, tmpTxt]);	
}

