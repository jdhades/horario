

Ext.ns('guardias', 'Ext.ux');
Ext.BLANK_IMAGE_URL = 'http://localhost/horario2/ext-3.3.1/resources/images/default/s.gif';
Ext.state.Manager.setProvider(new Ext.state.CookieProvider);
guardias.version = 'Beta 2';

Ext.util.Format.comboRenderer = function(combo){
    return function(value){
        var record = combo.findRecord(combo.valueField || combo.displayField, value);
        return record ? record.get(combo.displayField) : combo.valueNotFoundText;
    }
 }
 
guardias.Forms = function() {
 return {
  
 PlazasCombo: new Ext.form.ComboBox({
	store:new Ext.data.JsonStore({
        id:'id'
       ,root:'data'
       ,totalProperty:'total'
       ,fields:[
            {name:'id', type:'int'}
           ,{name:'title', type:'string'} ]
       ,url:'php/request.php'
       ,baseParams:{
       		 cmd:'getData'
       		,objName:'Plazas'
                                        		}
       	})
	,displayField:'title'
	,valueField:'id'
	//,hiddenField:'id'
    ,triggerAction:'all'
	,mode:'remote'
	,editable:false
	,lazyRender:true
    ,forceSelection:true
	,id:'PlazasField'
   })
 
 };
}(); 
 
guardias.Grid1 = Ext.extend(Ext.grid.EditorGridPanel, {
	 layout:'fit'
    ,id:'idgridGuardias' 
	,border:false
	,stateful:false
	,url:'php/requestGuardias.php'
	,objName:'Guardias'
	,idName:'id'
	// {{{
	,initComponent:function() {
		this.recordForm = new Ext.ux.grid.RecordForm({
			 title:'Form Agregar'
			,iconCls:'icon-edit-record'
			,columnCount:2
			,ignoreFields:{id:true}
			//,readonlyFields:{action1:true}
			//,disabledFields:{qtip1:true}
			,formConfig:{
				 labelWidth:80
				,buttonAlign:'right'
				,bodyStyle:'padding-top:10px'
			}
		});

		// create row actions
		this.rowActions = new Ext.ux.grid.RowActions({
			 actions:[{
				 iconCls:'icon-minus'
				,qtip:'Delete Record'
			},{
				 iconCls:'icon-edit-record'
				,qtip:'Edit Record'
			}]
			,widthIntercept:Ext.isSafari ? 4 : 2
			,id:'actions'
			,getEditor:Ext.emptyFn
		});
		this.rowActions.on('action', this.onRowAction, this);

		Ext.apply(this, {
			// {{{
			store:new Ext.data.Store({
				reader:new Ext.data.JsonReader({
					 id:'id'
					,totalProperty:'total'
					,root:'data'
					,fields:[
                             {name:'id',type:'int'}
				   			,{name:'descrip',type:'string'}
							,{name:'id_plazas',type:'string'}
				   			,{name:'hora_ini',type:'date',format:"H:i:s"}
							,{name:'hora_fin',type:'date',format:"H:i:s"}
				   			,{name:'activo',type:'int'}
			          
				   
				]
				})
				,proxy:new Ext.data.HttpProxy({url:this.url})
				,baseParams:{cmd:'getData', objName:this.objName}
				,sortInfo:{field:'descrip', direction:'ASC'}
				,remoteSort:true
				,listeners:{
					load:{scope:this, fn:function(store) {

						// keep modified records accros paging
						var modified = store.getModifiedRecords();
						for(var i = 0; i < modified.length; i++) {
							var r = store.getById(modified[i].id);
							if(r) {
								var changes = modified[i].getChanges();
								for(p in changes) {
									if(changes.hasOwnProperty(p)) {
										r.set(p, changes[p]);
									}
								}
							}
						}
					}}
				}
			})
			// }}}
			// {{{
				,columns:[
                                  {
				 header:'Guardia'
				//,id:'id-nombre'
				,dataIndex:'descrip'
				,width:300
				,sortable:true
				,editor:new Ext.form.TextField({
					allowBlank:false
				})
			},{
				 header:'Plazas'
				,id:'combo'
				,dataIndex:'id_plazas'
				,width:200
				,sortable:true
				,editor: guardias.Forms.PlazasCombo
				,renderer: Ext.util.Format.comboRenderer(guardias.Forms.PlazasCombo)
					
			},{
				 header:'Hora de Inicio'
				//,id:'id-direccion'
				,dataIndex:'hora_ini'
				,width:200
				,sortable:true
				
				,editor: new Ext.form.TimeField({
					minValue :'6:00:00'
					,maxValue :'23:00:00'
					,width:75
					,increment: 15
					,format:'H:i:s'
					//allowBlank:false
				})
				,renderer:Ext.util.Format.dateRenderer('H:i:s')
			},{
				 header:'Hora de Fin'
				//,id:'id-direccion'
				,dataIndex:'hora_fin'
				,width:200
				,sortable:true
				
				,editor:new Ext.form.TimeField({
					minValue :'6:00'
					,maxValue :'23:00'
					,width:75
					,increment: 15
					,format:'H:i:s'
					//allowBlank:false
					
				})
				,renderer:Ext.util.Format.dateRenderer('H:i:s')
			},{
				 header:'Disponible'
				//,id:'id-telefonos'
				,dataIndex:'activo'
				,width:160
				,sortable:true
				,editor:new Ext.form.TextField({
					
				})
			}, this.rowActions]
			// }}}
			,plugins:[new Ext.ux.grid.Search({
				 iconCls:'icon-zoom'
				//,readonlyIndexes:['note']
				//,disableIndexes:['pctChange']
			}), this.rowActions, this.recordForm]
			,viewConfig:{forceFit:true}
			,buttons:[{
				 text:'Guardar'
				,iconCls:'icon-disk'
				,scope:this
				,handler:this.commitChanges
			},{
				 text:'Cancelar'
				,iconCls:'icon-undo'
				,scope:this
				,handler:function() {
					this.store.each(function(r) {
						r.reject();
					});
					this.store.modified = [];
//					this.store.rejectChanges();
				}
			},{
				text:'Cerrar'
				,inconCls:'icon-trash-closed'
				,scope:this
				,handler:function(){winGuardias.hide();	this.store.load({params:{start:0,limit:10}});}
			}]
			,tbar:[/*{
				 text:'Agregar-GRID'
				,tooltip:'Agregar un registro al grid'
				,iconCls:'icon-plus'
				,id:'btn-add'
				,listeners:{
					click:{scope:this, fn:this.addRecord,buffer:200}
				}
			},*/{
				 text:'Agregar'
				,tooltip:'Agregar un registro con una forma'
				,iconCls:'icon-form-add'
				,listeners:{
					click:{scope:this, buffer:200, fn:function(btn) {
						this.recordForm.show(this.addRecord(), btn.getEl());
					}}
				}
			}]
		}); // eo apply

		this.bbar = new Ext.PagingToolbar({
			 store:this.store
			,displayInfo:true
			,pageSize:10
		});

		// call parent
		guardias.Grid1.superclass.initComponent.apply(this, arguments);
	} // eo function initComponent
	// }}}
	// {{{
	,onRender:function() {
		// call parent
		guardias.Grid1.superclass.onRender.apply(this, arguments);

		// load store
		this.store.load({params:{start:0,limit:10}});

	} // eo function onRender
	// }}}
	// {{{
	,addRecord:function() {
		var store = this.store;
		if(store.recordType) {
			var rec = new store.recordType({newRecord:true});
			rec.fields.each(function(f) {
				rec.data[f.name] = f.defaultValue || null;
			});
			rec.commit();
			store.add(rec);
			return rec;
		}
		return false;
	} // eo function addRecord
	// }}}
	// {{{
	,onRowAction:function(grid, record, action, row, col) {
		switch(action) {
			case 'icon-minus':
				this.deleteRecord(record);
			break;

			case 'icon-edit-record':
				this.recordForm.show(record, grid.getView().getCell(row, col));
			break;
		}
	} // eo onRowAction
	// }}}
	// {{{
	,commitChanges:function() {
		var records = this.store.getModifiedRecords();
	        
              if(!records.length) {
			return;
		}
		var data = [];
              Ext.each(records, function(r, i) {
			var o = r.getChanges();
			if(r.data.newRecord) {
				o.newRecord = true;
			}
                        
			o[this.idName] = r.get(this.idName);
         		data.push(o);
		}, this);
           	var o = {
			 url:this.url
			,method:'post'
			,callback:this.requestCallback
			,scope:this
			,params:{
				 cmd:'saveData'
				,objName:this.objName
				,data:Ext.encode(data)
                                
         			}
		};
		Ext.Ajax.request(o);
	} // eo function commitChanges
	// }}}
	// {{{
	,requestCallback:function(options, success, response) {
//		console.log(response, response.getAllResponseHeaders());
		if(true !== success) {
			this.showError(response.responseText);
			return;
		}
		try {
			var o = Ext.decode(response.responseText);
		}
		catch(e) {
			this.showError(response.responseText, 'Cannot decode JSON object');
			return;
		}
		if(true !== o.success) {
			this.showError(o.error || 'Unknown error');
			return;
		}

		switch(options.params.cmd) {
			case 'saveData':
				var records = this.store.getModifiedRecords();
				Ext.each(records, function(r, i) {
					if(o.insertIds && o.insertIds[i]) {
						r.set(this.idName, o.insertIds[i]);
						delete(r.data.newRecord);
					}
				});
				this.store.each(function(r) {
					r.commit();
				});
				this.store.modified = [];
//				this.store.commitChanges();
			break;

			case 'deleteData':
			break;
		}
	} // eo function requestCallback
	// }}}
	// {{{
	,showError:function(msg, title) {
		Ext.Msg.show({
			 title:title || 'Error'
			,msg:Ext.util.Format.ellipsis(msg, 2000)
			,icon:Ext.Msg.ERROR
			,buttons:Ext.Msg.OK
			,minWidth:1200 > String(msg).length ? 360 : 600
		});
	} // eo function showError
	// }}}
	// {{{
	,deleteRecord:function(record) {
		Ext.Msg.show({
			 title:'Eliminar Registro?'
			,msg:'Deseas eliminar este registro <b>' + record.get('descrip') + '</b><br/>no puedes reversarlo.'
			,icon:Ext.Msg.QUESTION
			,buttons:Ext.Msg.YESNO
			,scope:this
                        ,displayInfo:true
			,fn:function(response) {
				if('yes' !== response) {
					return;
				}
		         var delid = record.get('id')
                         var o = {
			 url:this.url
			,method:'post'
			,callback:this.requestCallback
			,scope:this
			,params:{
				 cmd:'deleteData'
				,objName:this.objName
                                ,idName:this.idName
				,data:Ext.encode(delid)
                                
         			}
		};
		Ext.Ajax.request(o);
                this.store.load({params:{start:0,limit:10}});
                        }
		});
	} // eo function deleteRecord
	// }}}
 ,showDescripcion: function(value,metaData){
	   metaData.attr = 'style="white-space:normal"';  
       return value;  
	   }
}); // eo extend

// register xtype
Ext.reg('guardiasgrid3', guardias.Grid1);

// app entry point
