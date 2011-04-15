Ext.ns('combobox');

combobox.Cplazas = {
	 xtype:'combo'
    ,fieldLabel:'Plazas'
	,name:'Plazas'
	// we need id to focus this field. See window::defaultButton
	,id:'Cplazas'

	// we want to submit id, not text
	,valueField:'id'
	,hiddenName:'id'

	// could be undefined as we use custom template
	,displayField:'title'

	// query all records on trigger click
	,triggerAction:'all'

	// minimum characters to start the search
	,minChars:2

	// do not allow arbitrary values
	,forceSelection:true

	// otherwise we will not receive key events 
	,enableKeyEvents:true

	// let's use paging combo
	,pageSize:2

	// make the drop down list resizable
	,resizable:true

	// we need wider list for paging toolbar
	,minListWidth:240

	// force user to fill something
	,allowBlank:false

	// store getting items from server
	,store:new Ext.data.JsonStore({
		 id:'id'
		,root:'data'
		,totalProperty:'total'
		,fields:[
			 {name:'id', type:'int'}
			,{name:'title', type:'string'}
//			,{name:'persFirstName', type:'string'}
		]
		,url:'php/request.php'
		,baseParams:{
			 cmd:'getData'
			,objName:'Plazas'
			,fields:'["id","title"]'
		}
	})

	// concatenate last and first names
	,tpl:'<tpl for="."><div class="x-combo-list-item">{title}</div></tpl>'

	// listeners
	,listeners:{
		// sets raw value to concatenated last and first names
		 select:function(combo, record, index) {
			this.setRawValue(record.get('title'));
		}

		// repair raw value after blur
		,blur:function() {
			var val = this.getRawValue();
			this.setRawValue.defer(1, this, [val]);
		}

		// set tooltip and validate 
		,render:function() {
			this.el.set(
				{qtip:'Type at least ' + this.minChars + ' characters to search in last name'}
			);
			this.validate();
		}

		// requery if field is cleared by typing
//		,keypress:{buffer:100, fn:function() {
//			if(!this.getRawValue()) {
//				this.doQuery('', true);
//			}
//		}}
	}

	// label
	
};

// eof
