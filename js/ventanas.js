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