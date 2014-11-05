// lib/core/ctrl.js (about & copyright) //{{{
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
	'ctrl/welcome',
	'ctrl/userProfile',
	'ctrl/activity',
], function (
) {
	var ctrl = {};
	var actions = {};

	// Load all controllers and actions://{{{
	for (
		var i = 0; // Number of non controller depnedencys (at begining)
		i < arguments.length;
		i++
	) { 
		var src = arguments[i];
		if (src.id === undefined) throw "Controller must have an id.";
		if (ctrl[src.id] !== undefined) throw "Duplicated controller: " + src.id;
		ctrl[src.id] = src;
		if (typeof src.actions == "object") {
			for (var actionId in src.actions) {
				var actSpec = src.actions[actionId];
				if (! (actSpec instanceof Array)) actSpec = [[src.id], actSpec]; // Defaults to selfPage action.
				if (! (actSpec[0] instanceof Array)) actSpec[0] = [actSpec[0]]; // Let to specify single page alone.
				for (var j in actSpec[0]) {
					var pageId = actSpec[0][j];
					if (actions[pageId] === undefined) actions[pageId] = {};
					if (actions[pageId][actionId] !== undefined) throw "Duplicated action handler: " + actionId;
					actions[pageId][actionId] = actSpec[1];
				};

			};
		};
	};//}}}


	function unimplementedAction(target, actionId) {
		console.log ("Unimplemented action: " + actionId);
		console.log ("Target: ", target);
	};


	var masterCtrl = {
		run: function runControllers(pageContainer) {

			// Run all specialyzed controlers:
			for (var ctrlId in ctrl) {
				ctrl[ctrlId].run(pageContainer);
			};

			function actionHandler (e, data) {//{{{
				if (typeof this == "string") {
					var target = null;
					var actionId = String(this);
					var pageId = data;
				} else {
					var target = $(this);
					var actionId = target.data("action");
					var pageId = pageContainer.pagecontainer("getActivePage").attr("id");
				};
				if ( // Page specialyzed action.//{{{
					actions[pageId] !== undefined
					&& typeof actions[pageId][actionId] == "function"
				) {
					var cbk = actions[pageId][actionId];
				} //}}}
				else if ( // General action.//{{{
					actions["*"] !== undefined
					&& typeof actions["*"][actionId] == "function"
				) {
					var cbk = actions["*"][actionId];
				}//}}}
				else { // Unimplemented action.//{{{
					cbk = unimplementedAction;
				};//}}}
				cbk(target, actionId, e);
			};//}}}





			// Link actions:
			$(".action", pageContainer).on("vclick", actionHandler);

			///window.onpopstate = function (e) {
			///	actionHandler.apply("back", e); // Triggers ONLY on __forward__ WTF!!!!!
			///};


			(function backDetection() {
				var currentPageId;
				var oldPageId;
				$(document).on("pageshow", function(event) {
					oldPageId = currentPageId;
					currentPageId = $(event.target).attr("id");
				});
				$(window).on("navigate", function (event, data) {
					var direction = data.state.direction;
					if (direction == 'back') {
						actionHandler.apply("back", [event, oldPageId]);
					}
					if (direction == 'forward') {
						// do something else
					}
				});
			})();





		},
	};

	return masterCtrl;
});
