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
				if (actions[actionId] !== undefined) throw "Duplicated action handler: " + actionId;
				actions[actionId] = src.actions[actionId];
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


			// Link actions:
			$(".action", pageContainer).on("vclick", function(e) {
				var target = $(this);
				var actionId = target.data("action");
				var cbk = actions[actionId];
				if (typeof cbk == "function") {
					cbk(target, actionId, e);
				} else {
					unimplementedAction(target, actionId);
				};
			});

		},
	};

	return masterCtrl;
});
