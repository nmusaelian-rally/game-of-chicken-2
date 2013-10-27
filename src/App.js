Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
       var that = this;
       /*
       this._redCar = Ext.create('Ext.panel.Panel',{
	width: 121,
	height: 160,
	itemId: 'red',  
	//style: 'border: 1px solid red;',
	items: [{               
	    xtype: 'image',
	    src: 'https://rally1.rallydev.com/slm/attachment/14901040859/red.png'
	    }
	]
    });
    */
       
    /*
    this._blueCar = Ext.create('Ext.panel.Panel',{
	width: 116,
	height: 150,
	itemId: 'blue',  
	//style: 'border: 1px solid blue;',
	items: [{               
	    xtype: 'image',
	    src: 'https://rally1.rallydev.com/slm/attachment/14900851159/blue.png'
	    }
	]
    });
    */
    
    this._redCar = Ext.create('Ext.Img', {
	src: 'https://rally1.rallydev.com/slm/attachment/14901040859/red.png'
    });

   this._blueCar = Ext.create('Ext.Img', {
	src: 'https://rally1.rallydev.com/slm/attachment/14900851159/blue.png'
    });

    
    
    this._carPanel = Ext.create('Ext.panel.Panel',{
		layout: 'hbox',
		height: 200,
		itemId: 'carPanel',
		style: 'border: 1px solid blue;',
		items:[{
		    xtype: 'image',
		    autoRender: true,
		    src: 'https://rally1.rallydev.com/slm/attachment/14899787935/road.png',
		    width: 1000,
		    height: 200
		    }
		]
	    });
   this.add(this._carPanel);
       var container = Ext.create('Ext.Container', {
            items: [
                {
                    xtype  : 'rallybutton',
                    text      : 'Play',
                    id: 'playButton',
                    handler: function() {
			if (that.down("#chart")) { //remove the chart from the previous round if exists
			    that.down("#chart").removeAll();
			}
                        that._play();
                    }
                },
                {
                    xtype: 'container',
                    id: 'controls',
                    width: 600,
                    items: [
                        {
                            xtype  : 'rallybutton',
                            text      : 'keep going',
                            disabled: true,
                            id: 'keepGoingButton',
                            margin: 10,
                            handler: function() {
                                that._move('keep going');
                            }
                        },
                        {
                            xtype  : 'rallybutton',
                            text      : 'swerve',
                            disabled: true,
                            id: 'swerveButton',
                            margin: 10,
                            handler: function() {
                                that._move('swerve');
                            }
                        }
                    ]
                },   
            ]
    });
       this.add(container); 

    },
    
    _play:function(){
        this._moves = [[],[]];
        var min = 4;
        var max = min*2;
        this._numberOfRounds = Math.floor(Math.random() * (max - min + 1)) + min;
        this._rounds = this._numberOfRounds
        console.log("this._numberOfRounds:",this._numberOfRounds);
        this._myMovesArray = [];
        this._opponentsMovesArray = [];
        this._punish = false;
        console.log("_playMyself, init this._myMovesArr",this._myMovesArray);
        this.down('#playButton').setDisabled(true);
        this.down('#keepGoingButton').setDisabled(false);
        this.down('#swerveButton').setDisabled(false);  
    },
    
    _move: function(move){
        if (this._numberOfRounds>0) {
                //the other player's move
		var opponentsMove = '';
                if (this._punish === true) {
		    opponentsMove = 'keep going';
                    //this._opponentsMovesArray.push('keep going');
		    //this._opponentsMovesArray.push(opponentsMove);
                }
                else{
                    var keepGoingOrSwerve = ['keep going','swerve','swerve','swerve','swerve'];
                    var i = Math.floor(Math.random()*keepGoingOrSwerve.length);
		    opponentsMove = keepGoingOrSwerve[i];
                    //this._opponentsMovesArray.push(keepGoingOrSwerve[i]);   
                }
		this._opponentsMovesArray.push(opponentsMove);
                console.log("this._opponentsMovesArray",this._opponentsMovesArray);
                
                
                //your move
                this._myMovesArray.push(move);
                console.log("this._myMovesArray",this._myMovesArray);
                if (this._myMovesArray[this._myMovesArray.length-1] === 'keep going') {
                    this._punish = true;
                    console.log('this._punish',this._punish);
                }
                else{
                    console.log(this._myMovesArray[this._myMovesArray.length-1]);
                    this._punish = false;
                    console.log('this._punish',this._punish);
                }
                this._numberOfRounds--;
		this._animate(opponentsMove, move);
		if (this._numberOfRounds==0) {
		    this._postRoundActions();
		}
	}
    },
    _animate:function(opponentsMove, yourMove){
	var that = this;
	console.log('animating...');
	console.log(opponentsMove, yourMove);
	
	if ((opponentsMove === 'swerve') && (yourMove === 'keep going')) {
	    var redCarKeepGoing = Ext.create('Ext.fx.Animator', {
		target: this._redCar,
		keyframes: {
		    '0%': {
			x:20,
			y:60
		    },
		    '100%': {
			x: 650,
			y:60
		    }
		}
	    });
	
	    var blueCarSwerve = Ext.create('Ext.fx.Animator', {
	       target: this._blueCar,
		x: 1000,
		y: 60,
		keyframes: {
		    '0%': {
			x:1000,
			y:60
		    },
		    '50%': {
			x: 550,
			y: 110
		    }
		}
	    });
	    this._carPanel.add(this._redCar);
	    this._carPanel.add(this._blueCar);

	} //end of if ((opponentsMove === 'swerve') && (yourMove === 'keep going'))
	
	else if ((opponentsMove === 'keep going') && (yourMove === 'swerve')) {
	    var redCarSwerve = Ext.create('Ext.fx.Animator', {
		target: this._redCar,
		keyframes: {
		    '0%': {
			x:20,
			y:60
		    },
		    '100%': {
			x: 650,
			y:10
		    }
		}
	    });
	
	    var blueCarKeepGoing = Ext.create('Ext.fx.Animator', {
	       target: this._blueCar,
		x: 1000,
		y: 60,
		keyframes: {
		    '0%': {
			x:1000,
			y:60
		    },
		    '50%': {
			x: 550,
			y: 60
		    }
		}
	    });
	    this._carPanel.add(this._redCar);
	    this._carPanel.add(this._blueCar);
	} //end of if ((opponentsMove === 'keep going') && (yourMove === 'swerve'))
	
	else if ((opponentsMove === 'swerve') && (yourMove === 'swerve')) {
	    var redCarSwerve = Ext.create('Ext.fx.Animator', {
		target: this._redCar,
		keyframes: {
		    '0%': {
			x:20,
			y:60
		    },
		    '100%': {
			x: 650,
			y:10
		    }
		}
	    });
	
	    var blueCarSwerve = Ext.create('Ext.fx.Animator', {
	       target: this._blueCar,
		x: 1000,
		y: 60,
		keyframes: {
		    '0%': {
			x:1000,
			y:60
		    },
		    '50%': {
			x: 550,
			y: 110
		    }
		}
	    });
	    this._carPanel.add(this._redCar);
	    this._carPanel.add(this._blueCar);
	} //end of if ((opponentsMove === 'swerve') && (yourMove === 'swerve'))
	
	else if ((opponentsMove === 'keep going') && (yourMove === 'keep going')) {
	    var redCarKeepGoing = Ext.create('Ext.fx.Animator', {
		target: this._redCar,
		keyframes: {
		    '0%': {
			x:20,
			y:60
		    },
		    '100%': {
			x: 650,
			y:60
		    }
		}
	    });
	
	    var blueCarKeepGoing = Ext.create('Ext.fx.Animator', {
	       target: this._blueCar,
		x: 1000,
		y: 60,
		keyframes: {
		    '0%': {
			x:1000,
			y:60
		    },
		    '50%': {
			x: 550,
			y: 60
		    }
		}
	    });
	    this._carPanel.add(this._redCar);
	    this._carPanel.add(this._blueCar);
	} //end of if ((opponentsMove === 'keep going') && (yourMove === 'keep going'))
	
    },
    
    _postRoundActions:function(){
	console.log("round is over");
        this.down('#playButton').setDisabled(false);
        this.down('#keepGoingButton').setDisabled(true);
        this.down('#swerveButton').setDisabled(true);
        console.log('this._myMovesArray', this._myMovesArray);
        console.log('this._opponentsMovesArray', this._opponentsMovesArray);
        this._saveResults();  
    },
    _saveResults:function(){
        console.log('inside this._saveResults....');
        this._series = [];
        var players = 2;
        var playersArr = ['You', 'Player 2'];
        this._data = [[],[]];
        this._moves = [[],[]];
        for (var i=0;i<this._opponentsMovesArray.length;i++) {
            this._moves[1][i] = this._opponentsMovesArray[i];
        }
        for (var i=0;i<this._myMovesArray.length;i++) {
            this._moves[0][i] = this._myMovesArray[i];
        }
        
        
        for (var p=0;p<players;p++) {
            for (var i = 0; i<this._rounds; i++) {
                if (p===players-1) { 
                   if ((this._moves[p][i] == "keep going")&&(this._moves[p-1][i] === "keep going")) {
                    this._data[p][i]=[i, -10,this._moves[p][i]];
                    this._data[p-1][i]=[i, -10,this._moves[p-1][i]];
                    
                   }
                   else if ((this._moves[p][i] == "swerve")&&(this._moves[p-1][i] === "keep going")) {
                    this._data[p][i]=[i, -2,this._moves[p][i]];
                    this._data[p-1][i]=[i, 2,this._moves[p-1][i]];
                    
                   }
                   else if ((this._moves[p][i] == "keep going")&&(this._moves[p-1][i] === "swerve")) {
                    this._data[p][i]=[i, 2,this._moves[p][i]];
                    this._data[p-1][i]=[i, -2,this._moves[p-1][i]];
                   }
                   else if ((this._moves[p][i] == "swerve")&&(this._moves[p-1][i] === "swerve")) {
                    this._data[p][i]=[i, 0,this._moves[p][i]];
                    this._data[p-1][i]=[i, 0,this._moves[p-1][i]];
                   }
                }    
            }
        }
        this._series.push({
                            name: playersArr[0],
                            data: this._data[0],
                        color: 'rgba(223, 83, 83, .5)'
                                })
        this._series.push({
                            name: playersArr[1],
                            data: this._data[1],
                        color: 'rgba(119, 152, 191, .5)'
                                })
        
        console.log("_series", this._series);
        //this._updateChart();
	this._makeChart();
        
    },
        _makeChart:function(){
        console.log('make chart');
        this.add(
        {
            xtype: 'rallychart',
            viewConfig: {
                loadMask: false
            },
            id: 'chart',
            width: 600,
            chartConfig: {
                chart:{
                type: 'scatter',
                zoomType: 'xy'
                },
                title:{
                    text: 'The Game Of Chicken'
                },
                subtitle:{
                    text: '(Results of the last game)'
                },
                xAxis: {
                    title: {
                        enabled: true,
                        tickInterval: 1,
                        text: 'Rounds'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true,
                allowDecimals: false,
                },
                yAxis:{
                    title: {
                        text: 'Payoff'
                },
                allowDecimals: false
                },
                tooltip: {
                        formatter: function() {
                            var info = this.series.name  + '<b> ' + this.point.config[2]  + '</b>' + '<br> ' + ' ' + 'round: <b>'+ this.x +'</b> payoff <b>'+ this.y +'</b>';
                            return info;
                        }
        },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 10,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        }
                    }
                },
            },
                            
            chartData: {
                series: this._series
            }
          
        });
        this.down('#chart')._unmask(); 
    }
    
});