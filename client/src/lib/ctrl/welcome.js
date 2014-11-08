// lib/ctrl/welcome.js (about & copyright) //{{{
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
	'ctrl/userProfile',
], function (
	lang,
	userProfile
) {

	function implementLangSelector (target) {
		var langsel = $("select.langSelector", target);
		var currLang = lang.get();

		for (var l in lang.langs) {
			var x = $("<option></option>")
					.attr("value", l)
					.text(lang.langs[l])
					.prepend($("<img></img>")
						.attr("src", "img/flags/"+l+".png")
						.attr("alt", "["+l+"]")
						.css({
							"height": "25px",
							"margin-right": "1em",
						})
					)
					.appendTo(langsel)
			;
		};
		langsel.val(currLang);
		langsel.on("change", function () {
			lang.set(langsel.val());
			langsel.trigger("reload");
		});

		target.one("pagecreate", function() {
			var container = $("span", langsel.closest("div")).first();
			container.prepend($("<img></img>")
				.attr("src", "img/flags/"+currLang+".png")
				.css({
					"height": "25px",
					"margin-right": "1em",
				})
			);
		});
	};


	function implementAppCheckin(beginButton) {
		///beginButton.css({background: "#ffff00"});
	};


	return {
		id: "welcome",
		run: function welcomeRun (container) {
			var target = $("div#welcomeFooter", container);
			implementLangSelector(container);
			implementAppCheckin($("a.appCheckin", target));
		},
	};

});
