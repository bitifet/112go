// lib/core/shim.js (about & copyright) //{{{
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

	return function applyShims (target) {

		// Fix placeholders on date inputs://{{{
		$("input[type=date]", target).each(function fixDatePlaceholder(){
			var input = $(this);
			input.attr("type", "text");
			input.on("focus", function(){
				input.attr("type", "date");
			});
		});//}}}

		// Implement "in-page" tab navigation://{{{
		$("div.tabbar", target).each(function() {
			var links = $("a", this);
			var container = $("div" + links.first().attr("href")).closest("div.ui-content");
			var allTabs = $("div.tab", container);
			allTabs.css({
				display: "none",
				height: "100%",
				width: "100%",
				margin: "0px",
				border: "0px",
				padding: "0px",
			});
			var pageTitle = allTabs.closest("div[data-role=page]").find("h1").first();
			var initialTitleText = pageTitle.text();
			links.each(function(i){
				var link = $(this);
				var me = $("div"+link.attr("href"), container);
				var myTitle = me.data("title");
				if (!myTitle.length) myTitle = initialTitleText;
				if (i == 0) { // First tab:
					me.css({display: "block"});
					pageTitle.text(myTitle);
				};
				link.on("click", function() {
					allTabs.hide();
					me.show();
				});
			});
		});//}}}

	};

});
