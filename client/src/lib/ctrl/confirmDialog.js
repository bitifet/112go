// lib/ctrl/confirmDialog.js (about & copyright) //{{{
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

	var inputs; 
	var controls = {};
	var removeButton;
	var modified;

	function ctrlHandler(actionId, target, e) {//{{{
		if (typeof controls[actionId] == 'function') {
			setTimeout(controls[actionId], 1);
		};
	};//}}}


	var dialog;
	var dTitle;
	var dMessage;
	var dCancelBtn;
	var dOkBtn;

	var trigger;

	return {
		id: "confirmDialog",
		run: function userProfileRun (container) {
			dialog = $("div#confirmDialog", container);
			dTitle = $("h1", dialog);
			dMessage = $("div[data-role=main] p", dialog);
			dCancelBtn = $(".action[data-action=cancel]", dialog);
			dOkBtn = $(".action[data-action=ok]", dialog);
			trigger = function() {
				container.pagecontainer("change", "confirmDialog");
			};
		},
		yesNo: function askYesNo ( txt, okCbk, cancelCbk) {

			$.mobile.navigate("#confirmDialog"); // Redirect.

			// Update texts:
			dTitle.text(txt.title);
			dMessage.text(txt.message);
			dOkBtn.text(txt.ok);
			dCancelBtn.text(txt.cancel);

			controls = {
				ok: okCbk,
				cancel: cancelCbk,
			};

		},

		actions: {
			ok: ctrlHandler,
			cancel: ctrlHandler,
			//back: function (actionId, target, e) {
			//	ctrlHandler("cancel", target, e);
			//},
			//*/
		},
	};

});
