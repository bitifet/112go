define({
	global: {
		menu: "Menú",
		home: "Inici",
		homePage: "Llista",
		back: "Tornar",
		close: "Tancar",
		emergencyBtn: "Emergència",
		sendPosition: "Enviar posició",
		checkin: "Marcar Fita",
		save: "Desar",
		remove: "Eliminar",
		ok: "Fet",
		cancel: "Cancel·lar",
	},
	panels: {
		menu: {//{{{
			home: "Inici",
			welcomePage: "Benvinguda",
			personalData: "Dades Personals",
			gpsConfig: "Configuració GPS",
			positionTrack: "Enviament de coordenades",
		},//}}}
	},
	pages: {
		welcome: {//{{{
			title: "112go",
			welcome: "Benvinguts",
			selectLanguage: "Sel·leccioni l'idioma",
			userProfile: "Dades personals",
			about: "Què és i com fer servir 112go",
			start: "Començar",
		},//}}}
		userProfile: {//{{{
			pub: {
				title: "Perfil Públic",
				label: "Públic",
				role: "Rol",
				roles: {
					pguide: "Guia professional",
					aguide: "Guia amateur",
					master: "Expert",
					average: "Participant",
					novice: "Principiant",
					contact: "Persona de contacte (no participa)",
				},
			},
			priv: {
				title: "Perfil Privat",
				label: "Privat",
				whatsThis: "Que és el perfil privat?",
			},
			phone: "Telèfon",
			name: "Nom",
			surname: "Llinatges",
			birthDate: "Data de naixement",
			comments: "Comentaris",
			save: "Actualitzar",
			remove: "Eliminar",
		},//}}}
		activitys: {//{{{
			title: "Activitats",
			edit: "Editar",
			checkin: "Som aquí",
			list: "Llista",
			notifications: "Notificacions",
			nextMilestone: "Propera fita",
			newActivity: "Nova",
			emergency: {
				call: "112",
				warnPartners: "Alertar als companys",
				cancel: "Falsa Alarma",
				comments: "Anoti aquí qualsevol informació que consideri pugui ser útil."
			},
		},//}}}
		activity: {//{{{
			title: "Activitat",
			gral: {//{{{
				title: "General",
				description: "Descripció de l'Activitat",
				activityType: "Tipus d'Activitat",
				type: {
					hiking: "Senderisme",
					climbing: "Escalada",
					torrents: "Torrents",
					speleology: "Espeleologia",
					mountainBike: "Mountain Bike",
					riding: "Equitacio",
					other: "Altres",
				},
				activityDate: "Data Activitat",
				otherTypeSpecify: "Especifiqui",
				comments: "Observacions",
			},//}}}
			route: {//{{{
				timing: {
					recStartLbl: "Recalcular només l'inici",
					recStartDesc: "El dia i hora de les fites s'actualitzaran proporcionalment en iniciar l'activitat",
					recAlwaysLbl: "Recalcular sempre",
					recAlwaysDesc: "En iniciar l'activitat o marcar una fita, el dia i hora de les següents fites s'actualitzaran proporcionalment",
					recNeverLbl: "No recalcular mai",
					recNeverDesc: "Els dies i hores de les fites no es recalcularan mai",
				},
				title: "Ruta",
				start: "Inici",
				day: "Dia",
				milestone: "Fita",
				end: "Fi",
				add: "Afegir",
			},//}}}
			members: {//{{{
				title: "Participants",
				addMember: "Afegir",
				guides: "Guies",
				guidesInfo: "Participants que exerciran el rol de guia.",
				members: "Participants",
				membersInfo: "Altres persones que participen a l'activitat.",
				contacts: "Contactes",
				contactsInfo: "Persones a contactar en cas d'accident (no participen a l'activitat).",
			},//}}}
		},//}}}
		actCheckpoint: {//{{{
			title: "Fita",
			select: "Sel·leccioni",
			description: "Descripció del lloc",
			dayNumber: "Dia",
			hour: "Hora",
			specify: "Especifiqui",
			latitude: "Latitud",
			longitude: "Longitud",
			remove: "Eliminar",
			map: "Mapa",
			here: "Aquí",
		},//}}}
	},
});
