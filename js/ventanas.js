     winPlazas = new Ext.Window({
         title: 'Plazas'
	,id:'winPlazas'
        ,width:640
        ,height:480
	// ,maximized:true
		,border:false
		,closable:false
		,closeAction:'hide'
		,layout:'border'
		,items:[
			{
			  xtype:'panel'
			  ,region:'north'
			  ,id:'box'
			  //,applyTo:'header'
			  
			},
			{
			 
			 layout:'border'
			,region:'center'
			,border:false
			,items:[{
				 xtype:'horariosgrid3'
				,id:'grid-horarios'
				,region:'center'
				//,title:'Ingresar Plazas'
				,height:300
				
			}]
		}]

    });
/////////////////////////////////////////////////// FIN WIN PLAZAS 1 ////////////////////////////////////////////////	

     /////////////////////////////////////////////////// INICIO WIN VENDEDORES ////////////////////////////////////////////////	

      winVendedores = new Ext.Window({
         title: 'Vendedores'
	    ,id:'winVendedores'
        ,width:640
        ,height:480
	// ,maximized:true
		,border:false
		,closable:false
		,closeAction:'hide'
		,layout:'border'
		,items:[
			{
			  xtype:'panel'
			  ,region:'north'
			  ,id:'box'
			  //,applyTo:'header'
			  
			},
			{
			 
			 layout:'border'
			,region:'center'
			,border:false
			,items:[{
				 xtype:'vendedoresgrid1'
				,id:'grid-vendedores'
				,region:'center'
				//,title:'Ingresar Vendedores'
				,height:300
				
			}]
		}]

    });
/////////////////////////////////////////////////// FIN WIN VENDEDORES //////////////////////////////////////////////

/////////////////////////////////////////////////// INICIO WIN GUARDIAS//////////////////////////////////////////////

  winGuardias = new Ext.Window({
         title: 'Guardias'
	    ,id:'winGuardias'
        ,width:640
        ,height:480
	// ,maximized:true
		,border:false
		,closable:false
		,closeAction:'hide'
		,layout:'border'
		,items:[
			{
			  xtype:'panel'
			  ,region:'north'
			  ,id:'box'
			  //,applyTo:'header'
			  
			},
			{
			 
			 layout:'border'
			,region:'center'
			,border:false
			,items:[{
				 xtype:'guardiasgrid3'
				,id:'grid-vendedores'
				,region:'center'
				//,title:'Ingresar Guardias'
				,height:300
				
			}]
		}]

    });

/////////////////////////////////////////////////// FIN WIN GUARDIAS ////////////////////////////////////////////////	
	
/////////////////////////////////////////////////// INICIO WIN PLAZAS 2 ////////////////////////////////////////////////	
	
	
	
    /*   rf = new Ext.ux.grid.RecordForm({
		 formCt:'east-form'
		,autoShow:true
		,autoHide:false
		,showButtons:true
		//,ignoreFields:{compID:true}
		,formConfig:{autoHeight:false,border:true, frame:true, margins:'10 10 10 10'}
	});
     
	 win2 = new Ext.Window({
		 id:'win2'
		,title:'plazas'
		,layout:'border'
		,width:800
		,height:400
		,closable:true
		,closeAction:'hide'
		,maximizable:false
		,border:false
//		,stateful:false
		,plugins:[new Ext.ux.menu.IconMenu({iconCls:'icon-grid'})]
		,items:[{
			 region:'center'
			,id:'horariosgrid1'
			,title:'Grid'
		//	,stateful:false
			,xtype:'horariosgrid3'
			,autoScroll:true
			,plugins:[rf]
		},{
			 region:'east'
			,id:'east-form'
			,title:'Form'
			,stateful:false
			,width:200
			,split:true
			,border:true
			,frame:true
			,collapsible:true
			,layout:'fit'
			
		}]
	});
*/
//	win2.show();

/////////////////////////////////////////////////// FIN WIN PLAZAS 2 ////////////////////////////////////////////////	

Ext.apply(Ext.form.VTypes, {
	daterange : function(val, field) {
	    
		var date = field.parseDate(val);

		if(!date){
			return;
		}
		if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
			var start = Ext.getCmp(field.startDateField);
			start.setMaxValue(date);
			start.validate();
			this.dateRangeMax = date;
		} 
		else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
			var end = Ext.getCmp(field.endDateField);
			end.setMinValue(date);
			end.validate();
			this.dateRangeMin = date;
		}
		/*
		 * Always return true since we're only using this vtype to set the
		 * min/max allowed values (these are tested for after the vtype test)
		 */
		return true;
	}
});
// Add the additional 'advanced' VTypes -- [End]


var fromdate = new Ext.form.DateField({
			format: 'd/M/Y', //YYYY-MMM-Dd
			renderer: Ext.util.Format.dateRenderer('d/M/Y'),
			fieldLabel: 'Desde',
			id: 'startdt',
			name: 'startdt',
			width:140,
			allowBlank:false,
			vtype: 'daterange',
                        endDateField: 'enddt',// id of the 'To' date field
			// listeners
	listeners:{
		// sets raw value to concatenated last and first names
		 select:function(f,v) {
                        var hdate = new Date(v);
			var fdate = new Date(v);
			if (hdate.getDay(v) == 0){
			    dato1 = 6;
			}else{
			    dato1 = hdate.getDay(v)-1;
			}
			if (hdate.getDay(v) == 0){
			    dato2 = 0;
			}else{
			    dato2 = 7-hdate.getDay(v);
			}
		        hdate.setDate(hdate.getDate(v)-(dato1));
			fdate.setDate(fdate.getDate(v)+(dato2));
			this.setValue(hdate);
			Ext.getCmp('enddt').setValue(fdate);
                       
                      
                        
		}
	}	       
		});
		
		var todate = new Ext.form.DateField({
			format: 'd/M/Y', //YYYY-MMM-DD
			renderer: Ext.util.Format.dateRenderer('d/M/Y'),
			fieldLabel: 'Hasta',
			id: 'enddt',
			name: 'enddt',
			width:140,
			allowBlank:false,
			vtype: 'daterange',
            startDateField: 'startdt'// id of the 'From' date field
		});


var name = new Ext.form.TextField({
	fieldLabel:'Name',
	name:'txt-name',
	emptyText:'Your name...',
	id:"id-name"
}); 



//creamos un formulario
this.form= new Ext.FormPanel({
	border:false,
	defaults:{xtype:'textfield'},	//componente por default del formulario
	items:[
		name, // le asignamos la instancia que creamos anteriormente
		fromdate,
		todate
	]
});

var winGenerar = new Ext.Window({
	title: 'Generar Horario',
	width:350,
	height:200,
	bodyStyle:'background-color:#fff;padding: 10px',
	items:this.form,
	buttonAlign: 'right', //botones alineados a la derecha
	buttons:[{text:'Generar',id:'salvar',
	         handler:function(){
					 Ext.get('salvar').on('click', function(){
   					 	Ext.MessageBox.show({
       					msg: 'Saving your data, please wait...',
      					progressText: 'Saving...',
  					    width:300,
       					wait:true,
       					waitConfig: {interval:200},
      				 	icon:'ext-mb-download', 
    			        animEl: 'buttonID'
  					 });
    setTimeout(function(){
        //This simulates a long-running operation like a database save or XHR call.
        //In real code, this would be in a callback function.
        Ext.MessageBox.hide();
        Ext.example.msg('Done', 'Your fake data was saved!');
    }, 8000);
});

 
					  }
				  }  
	,{text:'Cancel'}] //botones del formulario
});