     winPlazas = new Ext.Window({
         title: 'Plazas'
	,id:'winPlazas'
        ,width:640
        ,height:480
	// ,maximized:true
		,border:false
		,closable:true
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
				,id:'horariosgrid1'
				,region:'center'
				,title:'Ingresar Plazas'
				,height:300
				
			}]
		}]

    });
     
      winVendedores = new Ext.Window({
         title: 'Vendedores'
	    ,id:'winVendedores'
        ,width:640
        ,height:480
	// ,maximized:true
		,border:false
		,closable:true
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
				,title:'Ingresar Vendedores'
				,height:300
				
			}]
		}]

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
			,width:300
			,split:true
			,border:true
			,frame:true
			,collapsible:true
			,layout:'fit'
		}]
	});

//	win2.show();