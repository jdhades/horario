/*!
 * Extensible 1.0
 * Copyright(c) 2010-2011 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
Ext.ns('horarios');
Ext.onReady(function(){
    
     Ext.QuickTips.init();
 

 var newRecord = true;
    var today = new Date().clearTime();
        apiRoot = 'remote/php/app.php/events/';
    
    Ext.Msg.minWidth = 300;
  
  
    // Let's load the calendar store remotely also. All you have to do to get
    // color-coding is include this store with the CalendarPanel.
    var calendarStore = new Ext.data.JsonStore({
        storeId: 'calendarStore',
        //url: 'data/calendars.json',
	url: 'php/request.php',
        root: 'data',
	baseParams:{cmd:'getData',objName:'Plazas'},
        idProperty: Ext.ensible.cal.CalendarMappings.CalendarId.mapping || 'id',
        fields: Ext.ensible.cal.CalendarRecord.prototype.fields.getRange(),
        remoteSort: true,
        sortInfo: {
            field: Ext.ensible.cal.CalendarMappings.Title.name,
            direction: 'ASC'
        }
    });
    // Make sure this loads first so that the calendar records are available
    // when the event store loads and triggers the view to render
    calendarStore.load();
    
    var proxy = new Ext.data.HttpProxy({
        disableCaching: false, // no need for cache busting when loading via Ajax
	//baseParams:{objName:'Horarios'},
        api: {
            read:    'php/requestHorario.php?cmd=getData', //apiRoot+'view',
            create:   'php/requestHorario.php?cmd=saveData&newRecord=true',//apiRoot+'create',
	    update:  'remote/updateEventos.php',//update:  apiRoot+'update',
            destroy: apiRoot+'destroy'
        },
        listeners: {
            exception: function(proxy, type, action, o, res, arg){
                var msg = res.message ? res.message : Ext.decode(res.responseText).message;
                // ideally an app would provide a less intrusive message display
                Ext.Msg.alert('Server Error', msg);
            }
        }
    });
    
    var reader = new Ext.data.JsonReader({
        totalProperty: 'total',
        successProperty: 'success',
        idProperty: 'id',
        root: 'data',
        messageProperty: 'message',
		
   
        fields: Ext.ensible.cal.EventRecord.prototype.fields.getRange()
    });
    
    var writer = new Ext.data.JsonWriter({
      //  encode: true,
        writeAllFields: false
    });
    
    var store = new Ext.ensible.cal.EventStore({
        id: 'event-store',
        restful: true,
        proxy: proxy,
        reader: reader,
        writer: writer,
	// the view will automatically set start / end date params for you. You can
        // also pass a valid config object as specified by Ext.data.Store.load()
        // and the start / end params will be appended to it.
        autoLoad: true,
        baseParams:{objName:'Horarios'},
        // It's easy to provide generic CRUD messaging without having to handle events on every individual view.
        // Note that while the store provides individual add, update and remove events, those fire BEFORE the
        // remote transaction returns from the server -- they only signify that records were added to the store,
        // NOT that your changes were actually persisted correctly in the back end. The 'write' event is the best
        // option for generically messaging after CRUD persistance has succeeded.
        listeners: {
            'write': function(store, action, data, resp, rec){
                switch(action){
                    case 'create': 
                        Ext.ensible.sample.msg('Add', 'Added "' + Ext.value(rec.data[Ext.ensible.cal.EventMappings.Title.name], '(No title)') + '"');
                        break;
                    case 'update':
                        Ext.ensible.sample.msg('Update', 'Updated "' + Ext.value(rec.data[Ext.ensible.cal.EventMappings.Title.name], '(No title)') + '"');
                        break;
                    case 'destroy':
                        Ext.ensible.sample.msg('Delete', 'Deleted "' + Ext.value(rec.data[Ext.ensible.cal.EventMappings.Title.name], '(No title)') + '"');
                        break;
                }
            }
        }
    });
    
	            new Ext.Viewport({
                layout: 'border',
                renderTo: 'cal',
                items: [{
                    	 id: 'app-header',
                    	 region: 'north',
                    	 height: 60,
                    	 border: false,
				      	items:[{
		   				 region: 'south'
		    			,id:'app-menu'
		    			,el:'app-menu'
		    			,border:false
		    			,tbar:[{
			    			text:'Agregar Plazas'
			  			   ,tooltip:'Agregar un registro al grid'
			    		   ,iconCls:'icon-plus'
			    		   ,id:'btn-add'
			    		   ,handler:function(){win2.show()}
				//,listeners:{
				//	click:{scope:this, fn:this.addRecord,buffer:200}
				//}
			},{
				 text:'Agregar Vendedores'
				,tooltip:'Agregar un registro con una forma'
				,iconCls:'icon-form-add'
				,handler:function(){winVendedores.show()}
//				,listeners:{
//					click:{scope:this, buffer:200, fn:function(btn) {
//						formMaquinasAll.render(document.body);
//                                                //this.recordForm.show(this.addRecord(), btn.getEl());
//					}}
//				}
			}]
		    
		    }]
		   ,contentEl: 'app-header-content'
                },{
                    id: 'app-center',
                    title: '...', // will be updated to the current view's date range
                    region: 'center',
                    layout: 'border',
                    listeners: {
                        'afterrender': function(){
                            Ext.getCmp('app-center').header.addClass('app-center-header');
                        }
                    },
                    items: [{
                        id:'app-west',
                        region: 'west',
                        width: 176,
                        border: false,
                        items: [{
                            xtype: 'datepicker',
                            id: 'app-nav-picker',
                            cls: 'ext-cal-nav-picker',
                            listeners: {
                                'select': {
                                    fn: function(dp, dt){
                                        app-calendar.setStartDate(dt);
                                    },
                                    scope: this
                                }
                            }
                        },{
                            xtype: 'extensible.calendarlist',
                            store: calendarStore,
                            border: false,
                            width: 175
                        }]
                    },{
                        xtype: 'extensible.calendarpanel',
                        id: 'app-calendar',
        		eventStore: store,
 			calendarStore: calendarStore,
      			//  renderTo: 'cal',
        		title: 'HORARIO DE EJECUTIVO DE VENTAS',
        		border: true,
                        region: 'center',
                        activeItem: 1, // month view
                        
                        // Any generic view options that should be applied to all sub views:
                        viewConfig: {
                            //enableFx: false,
                            //ddIncrement: 10, //only applies to DayView and subclasses, but convenient to put it here
                            viewStartHour: 0
                            //viewEndHour: 18,
                            //minEventDisplayMinutes: 15
							 
                        },
                        
                        // View options specific to a certain view (if the same options exist in viewConfig
                        // they will be overridden by the view-specific config):
                        monthViewCfg: {
                            showHeader: true,
                            showWeekLinks: true,
                            showWeekNumbers: true
							
                           // showNavBar: true
                        },
                        
                        multiWeekViewCfg: {
                            //weekCount: 3
                        }
                        
                        // Some optional CalendarPanel configs to experiment with:
                      // readOnly: true,
                      ,   showDayView: false,
                        //showMultiDayView: true,
                        showWeekView: false,
                        //showMultiWeekView: false,
                        //showMonthView: false,
                        //showNavBar: false,
                        //showTodayText: false,
                        showTime: false
                        //editModal: true,
                        //enableEditDetails: false,
                        //title: 'My Calendar', // the header of the calendar, could be a subtitle for the app
                        
                        // Once this component inits it will set a reference to itself as an application
                        // member property for easy reference in other functions within App.
                        
                        
                        
		    }]
                }]
            });
    //var cp = new Ext.ensible.cal.CalendarPanel({
     //   id: 'calendar-remote',
       // eventStore: store,
       // calendarStore: calendarStore,
      //  renderTo: 'cal',
       // title: 'Remote Calendar',
        //width: 900,
        //height: 700
   // });
    
    // You can optionally call load() here if you prefer instead of using the 
    // autoLoad config.  Note that as long as you call load AFTER the store
    // has been passed into the CalendarPanel the default start and end date parameters
    // will be set for you automatically (same thing with autoLoad:true).  However, if
    // you call load manually BEFORE the store has been passed into the CalendarPanel 
    // it will call the remote read method without any date parameters, which is most 
    // likely not what you'll want. 
    // store.load({ ... });
    
    
    //var errorCheckbox = Ext.get('forceError');
    // 
    //var setRemoteErrorMode = function(){
    //    if(errorCheckbox.dom.checked){
    //        // force an error response to test handling of CUD (not R) actions. this param is 
    //        // only implemented in the back end code for this sample -- it's not default behavior.
    //        store.setBaseParam('fail', true);
    //        cp.setTitle('Remote Calendar <span id="errTitle">(Currently in remote error mode)</span>');
    //    }
    //    else{
    //        delete store.baseParams['fail'];
    //        cp.setTitle('Remote Calendar');
    //    }
    //};
    //
    //setRemoteErrorMode();
    //errorCheckbox.on('click', setRemoteErrorMode);
});