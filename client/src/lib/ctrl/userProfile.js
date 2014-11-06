// lib/ctrl/userProfile.js (about & copyright) //{{{
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
	'ctrl/confirmDialog',
], function (
	confirm
) {

	var inputs; 
	var controls = {};
	var removeButton;
	var modified;

	function ctrlHandler(actionId, target, e) {//{{{
		if (typeof controls[actionId] == 'function') controls[actionId](exportForm());
	};//}}}

	function indexInputs(target) {//{{{
		inputs = {
			public: {},
			private: {},
		};
		function enhace (placeholder, target) {
			target.on("change", function(){
				modified = true;
			});
			target.each(function(){
				var input = $(this);
				var id = input.attr("name");
				placeholder[id]=input;
			});
		};
		enhace(inputs.public, $("div#userPublicProfile :input", target));
		enhace(inputs.private, $("div#userPrivateProfile :input", target));

	};//}}}

	function clearForm (e) {//{{{
		importForm({});
		inputs.public.role.closest("li").show();
		removeButton.show();
		modified = false;
	};//}}}

	function importForm (//{{{
		data0,
		saveCbk,
		removeCbk
	) {
		var data = $.extend({}, data0);
		for (var i in inputs) {
			if (data[i] === undefined) data[i] = {};
			for (var fname in inputs[i]) {
				var input = inputs[i][fname];
				input.val(data[i][fname])
					.trigger("change")
				;
			};
		};
		modified = false;
		controls = {
			save: saveCbk,
			remove: removeCbk
		};
	};//}}}

	function exportForm() {//{{{
		var data = {};
		for (var i in inputs) {
			data[i] = {};
			for (var fname in inputs[i]) {
				var input = inputs[i][fname];
				if (! input.hasClass("disabled")) {
					data[i][fname] = input.val();
				};
			};
		};
		return data;
	};//}}}


	var editSelfProfile = (function implementSelfProfile() {//{{{

		// Initialyze / load user profile
		try {
			var myProfile = JSON.parse(localStorage.getItem("userProfile"));
			if (myProfile === null) throw "Empty";
		} catch (e) {
			var myProfile = {};
		};

		function saveProfile(prof) {//{{{
			delete prof.public.role;
			myProfile = prof;
			localStorage.setItem("userProfile", JSON.stringify(myProfile));
			clearForm();
		};//}}}

		return function edit() {//{{{
			inputs.public.role.closest("li").hide();
			removeButton.hide();
			importForm(
				myProfile,
				saveProfile
			);
		};//}}}

	})();//}}}


	return {
		id: "userProfile",
		run: function userProfileRun (container) {
			var target = $("div#userProfile", container);
			removeButton = $(".action[data-action=remove]", container);
			indexInputs(container);
		},

		load: importForm,

		actions: {
			editUserProfile: ['*', editSelfProfile],
			save: ctrlHandler,
			remove: ctrlHandler,
			pagechange: function backAction(actionId, target, e) {

				if (modified) {
					var discardPage = target.toPage;
					var cancelPage = "#" + $(target.prevPage[0]).attr("id");
					console.log("/////////////////");
					///console.log ($(cancelPage[0]).attr("id"));
					console.log (discardPage);
					console.log (cancelPage);
					console.log("/////////////////");
					target.toPage = target.prevPage; // Redirect back;
					modified = false; // Avoid infinite loop.


					var formBackup = exportForm();

///					setTimeout(function(){ // "nextTickFn"
						confirm.yesNo(
							{
								title: "title",
								message: "Ese caballo que viene de Bonansaaaaarr!!",
								ok: "Idò",
								cancel: "Idò no!",
							},
							function discardChanges(){
								clearForm();
								////history.back();
								$.mobile.navigate(discardPage); // Redirect.
							},
							function cancelFormExit(){
								console.log ("Cancelling exit!!!");
								history.back();
								setTimeout(function(){
									$.mobile.navigate(cancelPage); // Redirect.
								}, 100);
								importForm(formBackup);
								modified = true; // Restore modified status.
							}
						);
///					}, 1);
					//*/
				} else {
					clearForm();
				};
			},
		},
	};

});
