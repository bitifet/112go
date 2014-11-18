// lib/ctrl/activitys.js (about & copyright) //{{{
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
	'ctrl/activity',
], function (
	lang,
	act
) {

	var actList;
	var layout;
	var model = lang.model.pages.activitys;

	function indexLayout(container) {//{{{
		// Initialyze layout map:
		layout = {
			labels: {},
			lists: {
				activitys: $("div#actList ul", container).first(),
				notifications: $("div#actNotify ul", container).first(),
			},
			buttons: {
				altNew: $("div.ui-header .action[data-action=newActivity]", container),
				edit: $("div.ui-header .action[data-action=edit]", container),
				start: $(".action[data-action=start]", container).addClass("disabled"),
				checkIn: $(".action[data-action=checkin]", container).hide(),
				end: $(".action[data-action=end]", container).hide(),
			},
		};
		// Index labels:
		$(".label", container).each(function(){
			var lbl =$(this);
			layout.labels[lbl.data("name")] = lbl;
		});
	};//}}}


	function modActivitys(container) {
		var activitys = [];

		function actDisplay(activity) {//{{{
			if ( // No activitys defined.//{{{
				! activitys.length
			) {
				// Show alternate "new" button instead of regular edit button.
				layout.buttons.altNew.show();
				layout.buttons.edit.show();

				layout.buttons.start.show().attr("disabled", "disabled");
				layout.buttons.checkIn.hide();
				layout.buttons.end.hide();
				layout.labels.type.text(model.statInfo["noDefinedActivitys"]);
				layout.labels.description.text(model.statInfo["defineOne"]);
				layout.labels.nextMilestone.text("");
			}//}}}
			else if ( // No activity selected.//{{{
				activity === undefined
			) {
				layout.buttons.start.show().attr("disabled", "disabled");
				layout.buttons.checkIn.hide();
				layout.buttons.end.hide();
				layout.labels.type.text(model.statInfo["noSelectedActivity"]);
				layout.labels.description.text(model.statInfo["selectOne"]);
				layout.labels.nextMilestone.text("");
			}//}}}
			else if ( // Activity not yet started.//{{{
				activity.nextMilestone === activity.milestones[0].timestamp
			) {
				layout.buttons.start.show().removeAttr("disabled");
				layout.buttons.checkIn.hide();
				layout.buttons.end.hide();

				layout.labels.type.text();
				layout.labels.description.text();
				layout.labels.nextMilestone.text();
			}//}}}
			else { // Activity started.//{{{
				layout.buttons.start.hide()
				if ( 
					activity.nextMilestone != activity.milestones[activity.milestones.length -1].timestamp
				) {
					layout.buttons.checkIn.show();
					layout.buttons.end.hide();
				} else {
					layout.buttons.checkIn.hide();
					layout.buttons.end.show();
				};

				layout.labels.type.text("FIXME (activity type)");
				layout.labels.description.text("FIXME (activity description)");
				layout.labels.nextMilestone.text("FIXME (next milestone info)");

			};//}}}
		};//}}}

		var actList = (function(list){
			var li = $("li", list).detach();

			return {
				add: function addItem(activity) {
					var timestamp = activity.date; // FIXME.

					var newItem = li.clone(true);
					newItem
						.data("timestamp", timestamp)
					;
					$("a",newItem).text(activity.description);

					var listItems = $("li", list);
					if (! listItems.length) {
						list.append(newItem);
					} else {
						listItems.each(function(i){
							var item = $(this);
							if (
								item.data("timestamp") > timestamp
							) {
								newItem.insertBefore(item);
								return false;
							} else if (
								i >= listItems.length - 1
							) {
								newItem.insertAfter(item);
								return false;
							};
						});
					};
					list.listview('refresh');
				},

			};

		})(layout.lists.activitys);




		$("div#activitys", container).on("pagecreate", function() {

			actList.add({
				description: "my",
				date: 2,
			});
			actList.add({
				description: "World",
				date: 4,
			});
			actList.add({
				description: "Hello",
				date: 1,
			});
			actList.add({
				description: "sorted",
				date: 3,
			});

		});


		actDisplay({});

		return {

		};

	};

	function runActivitys (container) {
		var target = $("div#activitys", container);
		indexLayout(container);

		actList = modActivitys(container);


	};



	return {
		id: "activitys",
		run: runActivitys,
		actions: {
			edit: function editAction(){
				console.log("Edit!!");
			},
			sendPosition: function sendPositionAction(){
				console.log("Send position!!");
			},
			start: function checkinAction(){
				console.log("Start!!");
			},
			checkin: function checkinAction(){
				console.log("Checkin!!");
			},
			end: function checkinAction(){
				console.log("End!!");
			},
		},
	};

});
