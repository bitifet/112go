// lang.js (about & copyright) //{{{
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
define ([
	'../../lang/ca',
	'../../lang/es',
	'../../lang/en',
	'../../lang/de',
], function(
	ca_model,
	es_model,
	en_model,
	de_model
) {

	// Failback model.
	var defLang = 'ca'; // FIXME: Should end up being en.

	// Base models:
	var baseModels = {
		ca: ca_model,
		es: es_model,
		en: en_model,
		de: de_model,
	};

	// Fully "autocompleted" models:
	var models = {
	};

	var api = {};
	// api.model = (AutoMagically set to default).
	api.set = (function buildLanguageSetter(defLang){//{{{

		// Setter implementation:
		function setLanguage(newLang) {

			// Auto-extend by demand:
			if (models[newLang] === undefined) {
				if (newLang == defLang) {
					// Default is suposed to be fully complete:
					models[newLang] = baseModels[newLang];
				} else {
					// Extend others with default as a uncompletion failback:
					if (baseModels[newLang] === undefined) throw "Unsupported language: " + newLang;
					models[newLang] = $.extend(
						baseModels[newLang], models[defLang] // Allocated at first time.
					);
				};
				delete(baseModels[newLang]);
			};

			// Set:
			api.model = models[newLang];
		};

		// Initially set default lang:
		setLanguage(defLang); // And ensure it's available on extensions.

		return setLanguage;
	})(defLang);//}}}

	return api;

});

