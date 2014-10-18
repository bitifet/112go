// lib/core/core.js (about & copyright) //{{{
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
define([
	'core/tpl',
	'core/lang',
], function (
	tpl,
	lang
) {

	var config = { // FIXME: Link to local storage config data.
	};

	// Header templates to be rendered within page model.
	var headers = {};
	for (var i in tpl.layout.header) {
		headers[i] = tpl.layout.header[i];
	};

	// Popup templates to be rendered within page model.
	var popups = {};
	for (var i in tpl.layout.popup) {
		popups[i] = tpl.layout.popup[i];
	};

	// PRE-RENDERD (using global language model) panels.
	var panels = {};
	for (var i in tpl.layout.panel) {
		panels[i] = tpl.layout.panel[i](lang.model);
	};


	// Startup:
	// ========

	$(function(){

		var pageContainer = $(":mobile-pagecontainer");

		for (var pageId in tpl.layout.page) {
			var mainTemplate = tpl.layout.page[pageId];
			var tplModel = mainTemplate.tplModel;

			var mainHeaderTpl = headers[tplModel.headerId];

			var model = $.extend({}, lang.model.pages[pageId]);
			model["_global"] = lang.model.global;
			model["_back"] = tplModel.back;
			model["_panels"] = panels;
			model["_nav"] = $.extend({}, lang.model.navs[tplModel.headerId]);
			model["_header"] = mainHeaderTpl(model);
			var pagePopups = {};
			for (var i in tplModel.popups) {
				var popId = tplModel.popups[i];
				pagePopups[popId] = popups[popId](model);
			}
			model["_popups"] = pagePopups;


			/*/
			console.log ("===========================");
			console.log("pageId", pageId);
			console.log("model", model);
			console.log ("---------------------------");
			console.log ("headerId", tplModel.headerId);
			console.log ("_header", model["_header"]);
			console.log ("_nav", model["_nav"]);
			console.log ("headers", headers);
			console.log ("mainHeaderTpl", mainHeaderTpl);
			console.log ("===========================");
			//*/

			var html = mainTemplate(model);
			/*/
			console.log ("===========================");
			console.log("pageId:", pageId, "with model: ", model);
			console.log ("---------------------------");
			console.log (html);
			console.log ("===========================");
			//*/
			pageContainer.append(html);

		};

		// Startup page:
		if (config.validated) {
			// Normal usage:
			pageContainer.pagecontainer( "change", "#activitys");
		} else {
			// First usage:
			pageContainer.pagecontainer( "change", "#home");
		};

	});

	// ========

});
