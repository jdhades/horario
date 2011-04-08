// JavaScript Document
// vim: ts=4:sw=4:nu:fdc=4:nospell
/*global Ext, Example */
/**
 * @class Example.North
 * @extends Ext.Panel
 *
 * North Panel for Example psge
 *
 * @author    Ing. Jozef SakÃ¡loÅ¡
 * @copyright (c) 2008, by Ing. Jozef SakÃ¡loÅ¡
 * @date      3. April 2008
 * @version   1.0
 * @revision  $Id: Example.North.js 524 2009-02-01 17:00:43Z jozo $
 *
 * @license Example.North.js is licensed under the terms of the Open Source
 * LGPL 3.0 license. Commercial use is permitted to the extent that the 
 * code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 *
 * <p>License details: <a href="http://www.gnu.org/licenses/lgpl.html"
 * target="_blank">http://www.gnu.org/licenses/lgpl.html</a></p>
 */
 
Ext.ns('Example');
 
/**
 * @constructor
 * Creates new Example.North
 * @param {Object} config A config object
 */
Example.North = Ext.extend(Ext.Panel, {
    // configurables
	 navlinks:WebPage.prototype.navlinks
	,navlinksTpl:WebPage.prototype.navlinksTpl
	,border:false
	,tpl:
		 '<div id="north-content">'
		+'<div id="north-title"><h1>{title}</h1><div id="themect"></div><div id="langct"></div></div>'
		+'<div id="navlinks">{navlinksTpl}</div>'
		+'</div>'
 
	,afterRender:function() {
		this.tpl = this.tpl.replace(/\{navlinksTpl\}/, this.navlinksTpl.apply({navlinks:this.navlinks}));
		this.tpl = new Ext.XTemplate(this.tpl);
		this.tpl.overwrite(this.body, {
			 title:this.pageTitle
		});
	
		this.themeCombo = new Ext.ux.form.ThemeCombo({id:'theme-combo', width:155, renderTo:'themect'});
		Ext.getBody().select('div.adsense').removeClass('x-hidden');

		Example.North.superclass.afterRender.apply(this, arguments);
	} // eo function afterRender
 
    // any other added/overrided methods
}); // eo extend
 
// register xtype
Ext.reg('examplenorth', Example.North); 
 
// eof
