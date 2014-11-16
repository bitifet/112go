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
], function (
	lang
) {

	var activitys = [];
	var layout = {};
	var model = lang.model.pages.activitys;

	function enhaceTemplate(container) {//{{{
		layout.actList=$("div#actList ul", container).first();
		layout.actNotify=$("div#actNotify ul", container).first();
		// Index labels://{{{
		layout.labels = {};
		$(".label", container).each(function(){
			var lbl =$(this);
			layout.labels[lbl.data("name")] = lbl;
		});//}}}
		layout.altNewBtn = $("div.ui-header .action[data-action=newActivity]", container);
		layout.editBtn = $("div.ui-header .action[data-action=edit]", container);
		layout.startBtn = $(".action[data-action=start]", container).addClass("disabled");
		layout.checkinBtn = $(".action[data-action=checkin]", container).hide();
		layout.endBtn = $(".action[data-action=end]", container).hide();
	};//}}}


	function actDisplay(activity) {
		if ( // No activitys defined.//{{{
			! activitys.length
		) {
			// Show alternate "new" button instead of regular edit button.
			layout.altNewBtn.show();
			layout.editBtn.show();

			layout.startBtn.show().attr("disabled", "disabled");
			layout.checkinBtn.hide();
			layout.endBtn.hide();
			layout.labels.type.text(model.statInfo["noDefinedActivitys"]);
			layout.labels.description.text(model.statInfo["defineOne"]);
			layout.labels.nextMilestone.text("");
		}//}}}
		else if ( // No activity selected.//{{{
			activity === undefined
		) {
			layout.startBtn.show().attr("disabled", "disabled");
			layout.checkinBtn.hide();
			layout.endBtn.hide();
			layout.labels.type.text(model.statInfo["noSelectedActivity"]);
			layout.labels.description.text(model.statInfo["selectOne"]);
			layout.labels.nextMilestone.text("");
		}//}}}
		else if ( // Activity not yet started.//{{{
			activity.nextMilestone === activity.milestones[0].timestamp
		) {
			layout.startBtn.show().removeAttr("disabled");
			layout.checkinBtn.hide();
			layout.endBtn.hide();

			layout.labels.type.text();
			layout.labels.description.text();
			layout.labels.nextMilestone.text();
		}//}}}
		else { // Activity started.//{{{
			layout.startBtn.hide()
			if ( 
				activity.nextMilestone != activity.milestones[activity.milestones.length -1].timestamp
			) {
				layout.checkinBtn.show();
				layout.endBtn.hide();
			} else {
				layout.checkinBtn.hide();
				layout.endBtn.show();
			};

			layout.labels.type.text("FIXME (activity type)");
			layout.labels.description.text("FIXME (activity description)");
			layout.labels.nextMilestone.text("FIXME (next milestone info)");

		};//}}}
	};




	return {
		id: "activitys",
		run: function userProfileRun (container) {
			var target = $("div#activitys", container);
			enhaceTemplate(container);

			actDisplay({});

		},
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
