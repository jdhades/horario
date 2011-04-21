/*!
 * Extensible 1.0
 * Copyright(c) 2010-2011 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
Ext.ns('horarios');
App = function() {
    return {
        init : function() {
    
     Ext.QuickTips.init();
 Ext.ensible.cal.EventMappings = {
    EventId:     {name: 'EventId', mapping:'id', type:'int'},
    CalendarId:  {name: 'CalendarId', mapping: 'cid', type: 'int'},
    Title:       {name: 'Title', mapping: 'title', type: 'string'},
    StartDate:   {name: 'StartDate', mapping: 'start', type: 'date', dateFormat: 'c'},
    EndDate:     {name: 'EndDate', mapping: 'end', type: 'date', dateFormat: 'c'},
    RRule:       {name: 'RecurRule', mapping: 'recur_rule'}, // not currently used
    Location:    {name: 'Location', mapping: 'loc', type: 'string'},
    Notes:       {name: 'Notes', mapping: 'notes', type: 'string'},
    Url:         {name: 'Url', mapping: 'url', type: 'string'},
    IsAllDay:    {name: 'IsAllDay', mapping: 'ad', type: 'boolean'},
    Reminder:    {name: 'Reminder', mapping: 'rem', type: 'string'},
    
    // We can also add some new fields that do not exist in the standard EventRecord:
   Guardia:   {name: 'Guardia', mapping: 'guardias'}
    
};
// Don't forget to reconfigure!
Ext.ensible.cal.EventRecord.reconfigure();

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
            create:  'php/requestHorario.php?cmd=saveData&newRecord=true',//apiRoot+'create',
	        update:  {url:'php/requestHorario.php?cmd=saveData&',method:'POST'},//update:  apiRoot+'update',
            destroy: {url:'php/requestHorario.php?cmd=deleteData&',method:'POST'}
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
       encode: true,
        writeAllFields: true
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
                        Ext.ensible.sample.msg('Agregar', 'Agregado "' + Ext.value(rec.data[Ext.ensible.cal.EventMappings.Title.name], '(No title)') + '"');
                        break;
                    case 'update':
                        Ext.ensible.sample.msg('Modificar', 'Modificado "' + Ext.value(rec.data[Ext.ensible.cal.EventMappings.Title.name], '(No title)') + '"');
                        break;
                    case 'destroy':
                        Ext.ensible.sample.msg('Eliminar', 'Eliminado "' + Ext.value(rec.data[Ext.ensible.cal.EventMappings.Title.name], '(No title)') + '"');
                        break;
                }
            }
        }
    });
    
	            new Ext.Viewport({
                layout: 'border',
                renderTo: 'calendar-ct',
                items: [{
                    	 id: 'app-header',
                    	 region: 'north',
                    	 height: 60,
                    	 border: false,
				      	items:[{
		   				 region: 'south'
		    			,id:'app-menu'
		    		//	,el:'app-menu'
		    			,border:false
		    			,tbar:[{
			    			text:'Agregar Plazas'
			  			   ,tooltip:'Agregar un registro al grid'
			    		   ,iconCls:'icon-plus'
			    		   ,id:'btn-add'
			    		   ,handler:function(){winPlazas.show()}
						},{
					        text:'Agregar Vendedores'
						   ,tooltip:'Agregar un registro con una forma'
						   ,iconCls:'icon-form-add'
			               ,handler:function(){winVendedores.show()}
            			},{
					        text:'Agregar Guardias'
						   ,tooltip:'Agregar un registro con una forma'
						   ,iconCls:'icon-form-add'
			               ,handler:function(){winGuardias.show();
				       //  Ext.getCmp('guardiasgrid3').getStore().load({params:{start:0,limit:50}});
					// Ext.getCmp('guardiasgrid3').reconfigure();
				       }
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
                                        App.calendarPanel.setStartDate(dt);
                                    },
                                    scope: this
                                }
                            }
                        },{
                            xtype: 'extensible.calendarlist',
                            id:'app-calendarlist',
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
        		title: '   HORARIO DE EJECUTIVO DE VENTAS',
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
                        showTime: false,
                        //editModal: true,
                        //enableEditDetails: false,
                        //title: 'My Calendar', // the header of the calendar, could be a subtitle for the app
                        
                        // Once this component inits it will set a reference to itself as an application
                        // member property for easy reference in other functions within App.
                      initComponent: function() {
                            App.calendarPanel = this;
                            this.constructor.prototype.initComponent.apply(this, arguments);
                        }   
                        
                        
		    }]
                }]
            });
   
		},
		  // The CalendarPanel itself supports the standard Panel title config, but that title
        // only spans the calendar views.  For a title that spans the entire width of the app
        // we added a title to the layout's outer center region that is app-specific. This code
        // updates that outer title based on the currently-selected view range anytime the view changes.
        updateTitle: function(startDt, endDt){
            var p = Ext.getCmp('app-center');
            
            if(startDt.clearTime().getTime() == endDt.clearTime().getTime()){
                p.setTitle(startDt.format('F j, Y'));
            }
            else if(startDt.getFullYear() == endDt.getFullYear()){
                if(startDt.getMonth() == endDt.getMonth()){
                    p.setTitle(startDt.format('F j') + ' - ' + endDt.format('j, Y'));
                }
                else{
                    p.setTitle(startDt.format('F j') + ' - ' + endDt.format('F j, Y'));
                }
            }
            else{
                p.setTitle(startDt.format('F j, Y') + ' - ' + endDt.format('F j, Y'));
            }
        },
        
        // This is an application-specific way to communicate CalendarPanel event messages back to the user.
        // This could be replaced with a function to do "toast" style messages, growl messages, etc. This will
        // vary based on application requirements, which is why it's not baked into the CalendarPanel.
        showMsg: function(msg){
            Ext.fly('app-msg').update(msg).removeClass('x-hidden');
        },
        
        clearMsg: function(){
            Ext.fly('app-msg').update('').addClass('x-hidden');
        }
   }
}();

Ext.onReady(App.init, App);
