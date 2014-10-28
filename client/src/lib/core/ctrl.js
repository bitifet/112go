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
	'ctrl/home',
], function (
) {

	function loadController (ctrl, src) {//{{{
		if (src.type === undefined) src.type = "page";
		if (ctrl[src.type] === undefined) ctrl[src.type] = {};
		if (ctrl[src.type][src.id] !== undefined) throw "Duplicated controller: " + src.id;
		ctrl[src.type][src.id] = src;
	};//}}}

	var ctrl = {};
	for (
		var i = 0; // Number of non controller depnedencys (at begining)
		i < arguments.length;
		i++
	) loadController(ctrl, arguments[i]);


	var masterCtrl = {
		run: function runControllers(pageContainer) {
			for (var type in ctrl) {
				var tSelector = "div[data-role=" + type +"]";

				$(tSelector, pageContainer).each(function controllerApply(){
					var target = $(this);
					var id = target.attr("id");
					if (id === undefined) id = target.data("id"); // Repeatable in DOM.
					if (id) {
						if (
							ctrl[type][id] !== undefined
							&& typeof ctrl[type][id].run == 'function'
						) ctrl[type][id].run(target);
						id = "";
						type = "";
					};
				});
			};
		},
	};

	return masterCtrl;
});
