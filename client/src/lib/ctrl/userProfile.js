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
	'core/lang',
], function (
	lang
) {

	var inputs; 
	var controls = {};
	var removeButton;
	var modified;
	var model;

	function ctrlHandler(actionId, target, e) {//{{{
		if (typeof controls[actionId] == 'function') controls[actionId](exportForm());
	};//}}}

	function indexInputs(target) {//{{{
		inputs = {//{{{
			public: {},
			private: {},
		};//}}}
		function enhace (placeholder, target) {//{{{
			target.on("change keyup", function(){
				modified = true;
			});
			target.each(function(){
				var input = $(this);
				var id = input.attr("name");
				placeholder[id]=input;
			});
		};//}}}
		enhace(inputs.public, $("div#userPublicProfile :input", target));
		enhace(inputs.private, $("div#userPrivateProfile :input", target));
		// Implement easy pub->priv profile sync://{{{
		for (var i in inputs.public) {
			if (i != "role") (function() {
				var pub = inputs.public[i];
				var priv = inputs.private[i];
				pub.data("oldval", pub.val());
				pub.on("init change", function (e) {
					var oldv = pub.data("oldval");
					var newv = pub.val();
					pub.data("oldval", newv);
					if (e.type == "change") {
						var privv = priv.val();
						if ((privv == oldv) || (privv == "")) priv.val(newv);
					};
				});
			})();
		};//}}}
	};//}}}

	function clearForm (e) {//{{{
		importForm({});
		inputs.public.role.closest("div.ui-select").show();
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
					.trigger("init")
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


	var selfProfile = (function implementSelfProfile() {//{{{

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

		return {
			edit: function edit() {//{{{
				(function hideFuckingJqueryMobileSelect(select){//{{{
					var container = select.closest("div.ui-select");
					if (! container.length) {
						select.closest("div[data-role=page]").one("pagecreate", function(){
							select.closest("div.ui-select").hide();
						});
					} else {
						container.hide();
					};
				})(inputs.public.role);//}}}
				removeButton.hide();
				importForm(
					myProfile,
					saveProfile
				);
			},//}}}
			get: function getSelfProfile() {//{{{
				return $.extend({}, myProfile);
			},//}}}
		};

	})();//}}}


	return {
		id: "userProfile",
		run: function userProfileRun (container) {
			var target = $("div#userProfile", container);
			removeButton = $(".action[data-action=remove]", container);
			indexInputs(container);
			model = lang.model.pages.userProfile.confirmDialog;
		},

		load: importForm,
		selfProfile: selfProfile.get,

		actions: {//{{{
			editUserProfile: ['*', selfProfile.edit],
			save: ctrlHandler,
			remove: ctrlHandler,
			pagechange: function backAction(actionId, target, e) {
				if (modified) {
					var discardPage = target.toPage;
					var cancelPage = "#" + $(target.prevPage[0]).attr("id");
					target.toPage = target.prevPage; // Redirect back;
					navigator.notification.confirm(
						model.msg,
						function (btnIndex) {//{{{
							if (btnIndex == 2) { // Continue:
								clearForm();
								$.mobile.navigate(discardPage);
							} else { // Cancel (1) or dialog closed (0):
								// Do nothing.
							};
						},//}}}
						model.modified,
						[model.cancel, model.continue]
					);

				}
				 else {
					clearForm();
				};
			},
		},//}}}

	};

});
