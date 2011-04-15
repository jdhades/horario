// vim: ts=4:sw=4:nu:fdc=2:nospell
/**
  * Ext.ux.form.XTimeField - Time field that supports submitFormat
  *
  * @author  Ing. Jozef Sakalos
  * @version $Id: Ext.ux.form.XTimeField.js 700 2008-02-10 05:24:21Z jozo $
  *
  * @class Ext.ux.form.XTimeField
  * @extends Ext.form.TimeField
  */
Ext.ns('Ext.ux.form');
Ext.ux.form.XTimeField = Ext.extend(Ext.form.TimeField, {
     submitFormat:'H:i:s'
    ,onRender:function() {

        this.altFormats += '|' + this.submitFormat;

        // call parent
        Ext.ux.form.XTimeField.superclass.onRender.apply(this, arguments);

        this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name:this.name});
        this.hiddenName = this.name; // otherwise field is not found by BasicForm::findField
        this.el.dom.name = null;
        this.el.on({
             keyup:{scope:this, fn:this.updateHidden}
            ,blur:{scope:this, fn:this.updateHidden}
        });

        this.setValue = this.setValue.createSequence(this.updateHidden);

    } // e/o function onRender

    ,updateHidden:function() {
        var value = this.getValue();
        value = Ext.isDate(value) ? value : Date.parseDate(value, this.format);
        this.hiddenField.dom.value = Ext.util.Format.date(value, this.submitFormat);
    } // e/o function updateHidden

}); // end of extend

// register xtype
Ext.reg('xtimefield', Ext.ux.form.XTimeField);

// e/o file  