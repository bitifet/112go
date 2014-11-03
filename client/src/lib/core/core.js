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
	'core/shim',
	'core/ctrl',
], function (
	tpl,
	lang,
	shim,
	ctrl
) {

	var config = { // FIXME: Link to local storage config data.
	};

	// Header templates to be rendered within page model.
	var headers = {};
	for (var i in tpl.header) {
		headers[i] = tpl.header[i];
	};

	// Content templates to be rendered within page model.
	var contents = {};
	for (var i in tpl.content) {
		contents[i] = tpl.content[i];
	};

	// Footer templates to be rendered within page model.
	var footers = {};
	for (var i in tpl.footer) {
		footers[i] = tpl.footer[i];
	};

	// Popup templates to be rendered within page model.
	var popups = {};
	for (var i in tpl.popup) {
		popups[i] = tpl.popup[i];
	};

	// Panels to be rendered within page model:
	var panels = {};
	for (var i in tpl.panel) {
		panels[i] = tpl.panel[i];
	};




	// Startup:
	// ########

	$(function(){

		var pageContainer = $(":mobile-pagecontainer");

		function appRender () {//{{{

			pageContainer.html("");

			for (var pageId in tpl.page) {
				var mainTemplate = tpl.page[pageId];
				var tplModel = mainTemplate.tplModel;

				// Foreign subtemplates ids:
				// =========================
				var mainHeaderTpl = headers[tplModel.headerId];
				var mainContentTpl = contents[tplModel.contentId];
				var mainFooterTpl = footers[tplModel.footerId];

				// Build specific model:
				// =====================
				var model = $.extend(
					{}, // Start with empty object to avoid overidding.
					lang.model.pages[pageId], // Add page's model.
					{ // And some parameters..
						"_pageId": pageId,
						"_global": lang.model.global,
					}
				);

				// Add properly rendered panels:
				// =============================
				if (tplModel["leftPanel"]) {
					var panId = tplModel["leftPanel"];
					var panModel = $.extend (
						{
							"_pageId" : pageId,
							"_global": lang.model.global,
						},
						lang.model.panels[panId]
					);
					model["_leftPanel"] = panels[tplModel["leftPanel"]](panModel);
				};
				/// Other panels...

				// Add properly rendered foreign subtemplates:
				// ===========================================
				if (typeof mainHeaderTpl == 'function') model["_header"] = mainHeaderTpl(model);
				if (typeof mainContentTpl == 'function') model["_content"] = mainContentTpl(model);
				if (typeof mainFooterTpl == 'function') model["_footer"] = mainFooterTpl(model);

				// Add properly rendered popups:
				// =============================
				var pagePopups = {};
				for (var i in tplModel.popups) {
					var popId = tplModel.popups[i];
					pagePopups[popId] = popups[popId](model);
				}
				model["_popups"] = pagePopups;


				// Render page:
				// ============
				var html = mainTemplate(model);
				pageContainer.append(html);

				/*/ Debugging stuff...
				console.log ("===========================");
				console.log("pageId", pageId);
				console.log("model", model);
				console.log ("---------------------------");
				console.log (html);
				console.log ("===========================");
				//*/

			};

			// Run shims:
			// ==========
			shim(pageContainer);

			// Run controllers:
			// ================
			ctrl.run(pageContainer);

			// Startup page:
			if (config.validated) {
				// Normal usage:
				pageContainer.pagecontainer( "change", "#activitys");
			} else {
				// First usage:
				pageContainer.pagecontainer( "change", "#home");
			};

		};//}}}

		appRender();

		pageContainer.on("reload", appRender);

	});

	// ########

});
