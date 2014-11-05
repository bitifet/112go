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

		// Fix placeholders on date and time inputs://{{{
		(function() {
			function fixPlaceholders(iType) {
				var elems = $("input[type="+iType+"]", target);
				elems.each(function fixPlaceholder(){ // Define once;
					var input = $(this);
					input.attr("type", "text");
					input.on("focus", function(){
						input.attr("type", iType);
					});
					input.on("change", function iReset(){
						if (input.val() == "") input.attr("type", "text");
					});
				});
			};
			fixPlaceholders("date");
			fixPlaceholders("time");
		})();//}}}

		// Make number imputs become spinners://{{{
		$("input[type=number]", target).each(function becomeSpinner() {
			var input = $(this);
			var min = parseInt(input.attr("min"));
			var max = parseInt(input.attr("max"));
			var step = parseInt(input.attr("step"));
			if (isNaN(step)) step = 1;
			input.on("swipe", function (e) {
				// Event:
				var start = e.swipestart.coords
				var stop = e.swipestop.coords
				var xinc = stop[0] - start[0];
				var yinc = start[1] - stop[1];
				var sign = xinc + yinc;

				// Value:
				var v0 = parseInt(input.val());
				var v = v0;
				if (sign > 0) v += step;
				if (sign < 0) v -= step;
				if (v > max) v = max;
				if (v < min) v = min;

				// Update:
				if (v != v0) {
					input.val(v);
					input.trigger("change");
				};
			});
		});//}}}

		// Fix <select> classes://{{{
		target.on("pagecreate", function(e) {
			$("select", e.target).each(function populateSelectClasses() {
				var select = $(this);
				var container = select.closest("div");
				var classes = select.attr("class");
				if (classes !== undefined) {
					classes = classes.split(/\s+/);
					for (var i in classes) {
						container.addClass(classes[i]);
					};
				};
			});
		});//}}}

		// Implement "in-page" tab navigation://{{{
		$("div.tabbar", target).each(function() {
			var allTabs = $("a", this);
			var container = $("div" + allTabs.first().attr("href")).closest("div.ui-content");
			var allPanes = $("div.tab", container);
			var myPage = allPanes.closest("div[data-role=page]");
			var myPageUrl = "#"+myPage.attr("id");
			var myPageH1 = myPage.find("h1").first();
			var defPageTitle = myPageH1.text();
			allPanes.css({ // Styling://{{{
				display: "none",
				height: "100%",
				width: "100%",
				margin: "0px",
				border: "0px",
				padding: "0px",
			});//}}}
			// Enhace tabs://{{{
			allTabs.each(function(i){
				var tab = $(this);
				var tabUrl = tab.attr("href");
				var pane = $("div"+tabUrl, container);
				var myPageTitle = pane.data("title");
				if (myPageTitle === undefined) myPageTitle = defPageTitle;
				function select() {//{{{
					allPanes.hide();
					pane.show();
					myPageH1.text(myPageTitle);
				};//}}}
				// Navigation handling://{{{
				if (i == 0) select(); // Select first pane by default.
				tab.on("vclick", select); // Tab navigation.
				$("a[href="+tabUrl+"]", target) // External navigation.
					.not(allTabs).on("vclick", function(){
						select();
						target.pagecontainer("change", myPageUrl);
					})
				;
				//}}}
			});//}}}
		});//}}}

		// Implement <select.switcher> //{{{
		$("select.switcher", target).each(function() {
			var select = $(this);
			var page = select.closest("div[data-role=page]");
			var switchId = select.data("id");
			var switchBox = $(".switchBox[data-id="+switchId+"]", page);
			var switchItems = $(".switchItem", switchBox);
			function update () {
				switchItems.hide();
				switchItems.filter("[data-id="+select.val()+"]").show();
			};
			update();
			select.on("change", update);
		});//}}}

	};

});
