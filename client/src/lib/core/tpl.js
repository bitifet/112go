// templates.js (about & copyright) //{{{
/* ------------------------------------
 * 112go - Risky activitys tracking app
 * ------------------------------------
 *  
 * 112go is a risky activitys tracking app for the 112 emergency servervice of
 * the Balearic Islands.
 *
 * @author: Joan Miquel Torres <jmtorres@112ib.com>
 * @company: Gestió d'Emergències de les Illes Balears (GEIBSAU).
 *       http://www.112ib.com
 *
 * Git repository: https://github.com/bitifet/112go
 * 
 * Originally build as a practice of the "Programació d'Apps per móbils amb
 * PHONEGAP" course on PalmaActiva:
 *
 *    http://www.reunalia.com/3973953
 *
 * Copyright: Joan Miquel Torres.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *///}}}
"use strict";
define ([
	'handlebars',
	'text!../../tpl/general.html',
	'text!../../tpl/activitys.html',
	'text!../../tpl/userProfile.html',
	'text!../../tpl/route.html',
	'text!../../lang/ca.html',
	'text!../../lang/es.html',
	'text!../../lang/en.html',
	'text!../../lang/de.html',
], function(
	handlebars
) {

	function loadTemplates(tpl, src) {//{{{
		var target = $("<div></div>").html(
			src.replace(/<!--[^<]*?-->/g, '') // Can't live without vim's folding marks ;-)
			// ...and any other matching comments are also unuseful.
		);
		target.find("script[type='text/x-handlebars-template']").each(function(foo) {
			var target = $(this);

			// Check id format: (<id>_<category>_tpl)
			var txt = target.attr("id");
			var prm = txt.split("_");
			if (prm.length != 3 || prm[2] != "tpl") throw "Wrong template id: " + txt;
			var id = prm[0];
			var ctg = prm[1];

			// Compile and index template.
			if (tpl[ctg] === undefined) tpl[ctg] = {}; // Initialyze category by demand.
			var t = handlebars.compile( // Compile template.
				target.html()
			);

			if (ctg == "page") { // Read header selection.
				t.tplModel = {
					headerId: target.data("header"),
					contentId: target.data("content"),
					footerId: target.data("footer"),
					popups: target.data("popups"),
					leftPanel: target.data("leftpanel"),
					///rightPanel: target.data("rightPanel"),
					///...
				};
				// Defaults:
				if (! t.tplModel.headerId) t.tplModel.headerId = 'default';
				if (! t.tplModel.contentId) t.tplModel.contentId = 'default';
				if (! t.tplModel.footerId) t.tplModel.footerId = 'default';
				if (typeof t.tplModel.popups == 'string') t.tplModel.popups = [t.tplModel.popups];
			};

			tpl[ctg][id] = t;

		});
		target.remove(); // Free placeholder.
	};//}}}

	var tpl = {};
	for (
		var i = 1; // Number of non template depnedencys (at begining)
		i < arguments.length;
		i++
	) loadTemplates(tpl, arguments[i]);

	return tpl;

});

