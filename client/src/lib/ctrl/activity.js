// lib/ctrl/activity.js (about & copyright) //{{{
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
], function (
) {

	function enhaceTypeSelector(target) {//{{{
		var select = $("select[data-id=typeselector]", target);
		var input = $("input[name=type]", target);
		function update(){
			var v = select.val();
			if (v == "other") {
				input.val("").show();
			} else {
				input.val(v).hide();
			};
		};
		update();
		select.on("change", update);
	};//}}}

	return {
		id: "activity",
		run: function userProfileRun (container) {
			var target = $("div#activity", container);

			enhaceTypeSelector($("div#actGeneral", target));

		},
	};

});
