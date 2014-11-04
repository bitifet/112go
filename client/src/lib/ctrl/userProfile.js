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
], function (
) {

	var actions = {};
	var inputs; 
	var controls = {};

	function enhaceActions(target) {//{{{
		$(".action", target).each(function(){
			var action=$(this);
			var fn = action.data("action");
			actions[fn] = action;
			action.on("vclick", function(){
				if (typeof controls[fn] == 'function') {
					controls[fn](exportForm());
				};
			});
		});
	};//}}}

	function indexInputs(target) {//{{{
		inputs = {
			public: {},
			private: {},
		};
		function enhace (placeholder, target) {
			target.each(function(){
				var input = $(this);
				var id = input.attr("name");
				placeholder[id]=input;
			});
		};
		enhace(inputs.public, $("div#userPublicProfile :input", target));
		enhace(inputs.private, $("div#userPrivateProfile :input", target));

	};//}}}


	function clearForm () {
		for (var i in inputs) {
			for (var fname in inputs[i]) {
				inputs[i][fname].val("");
			};
		};
	};


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
				input.val(data[i][fname]);
			};
		};
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




	var editSelfProfile = (function implementSelfProfile() {

		// Initialyze / load user profile
		try {
			var myProfile = JSON.parse(localStorage.getItem("userProfile"));
			if (myProfile === null) throw "Empty";
		} catch (e) {
			var myProfile = {};
		};


		function saveProfile(prof) {
			delete prof.public.role;
			myProfile = prof;
			localStorage.setItem("userProfile", JSON.stringify(myProfile));
			inputs.public.role.closest("li").show();
			actions.remove.show();
			clearForm();
		};


		return function edit() {
			inputs.public.role.closest("li").hide();
			actions.remove.hide();
			importForm(
				myProfile,
				saveProfile
			);
		};

	})();




	return {
		id: "userProfile",
		run: function userProfileRun (container) {
			var target = $("div#userProfile", container);
			indexInputs(container);
			enhaceActions(container);
		},

		load: importForm,

		editSelf: editSelfProfile,
	};

});
