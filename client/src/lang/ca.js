define({
	panels: {
		menu: {
			home: "Inici",
			personalData: "Dades Personals",
			gpsConfig: "Configuració GPS",
			positionTrack: "Enviament de coordenades",
		},
	},
	global: {
		menu: "Menú",
		homePage: "Llista",
		back: "Tornar",
	},
	navs: {
		activitys: {
			newActivity: "Nova",
		},
		activity: {
			general: "General",
			members: "Participants",
			other: "Altres",
		},
		actMember: {
			publicProfile: "Públic",
			privateProfile: "Privat",
			phone: "Telèfon",
			name: "Nom",
			surname: "Llinatges",
			birthDate: "Data de naixement",
			comments: "Comentaris",
			add: "Afegir",
		},
	},
	pages: {
		home: {
			title: "112go",
			welcome: "Benvinguts",
			selectLanguage: "Sel·leccioni l'idioma",
			userProfile: "Dades personals",
			about: "Què és i com fer servir 112go",
			start: "Començar",
		},
		userProfile: {
			title: "Dades personals",
			phoneNo: "Telèfon",
			name: "Nom",
			surname: "Llinatges",
			birthDate: "Data de naixement",
			comments: "Comentaris",
		},
		activitys: {
			title: "Activitats",
			remove: "Eliminar",
		},
		actGeneral: {
			title: "Activitat",
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
			route: "Ruta",
			comments: "Observacions",
		},
		actMembers: {
			title: "Participants",
		},
		memberPublicProfile: {
			title: "Perfil Públic",
			role: "Rol",
			roles: {
				pguide: "Guia professional",
				aguide: "Guia amateur",
				master: "Expert",
				average: "Participant",
				novice: "Principiant",
				contact: "Persona de contacte (no participa)",
			},
			// Shared labels defined in _nav.actMember
		},
		memberPrivateProfile: {
			title: "Perfil Privat",
			whatsThis: "Que és el perfil privat?",
			info: "<p>El perfil permet aportar dades dels usuaris que aquests no vulguin compartir amb la resta de participants, garantint així la seva privacitat.</p><p>Les dades d'aquesta pantalla no seràn compartides amb els altres membres de l'activitat, però sí amb l'112 en cas necessari.</p><p>Per simplifiar, les dades de perfil públic es copiaran automàticament al privat sempre que el mateix camp estigui buïd o el contingut anterior fos el mateix.</p><p>Les modificacions realitzades al perfil privat mai es sincronitzaran al públic.</p>"
			// Shared labels defined in _nav.actMember
		},
		actOther: {
			title: "Altres",
		},
		actRoute: {
			title: "Ruta",
			start: "Inici",
			milestone: "Fita",
			end: "Fi",
			add: "Afegir",
		},
		actCheckpoint: {
			title: "Punt",
			select: "Sel·leccioni",
			description: "Descripció del lloc",
			dayNumber: "Dia",
			hour: "Hora",
			latitude: "Latitud",
			longitude: "Longitud",
			remove: "Eliminar",
			here: "Aquí",
			checkin: "Som aquí"
		},
		actVehicles: {
			title: "Vehicles",
			trademark: "Marca",
			model: "Model",
			plate: "Matrícula",
			colour: "Color",
			comments: "Observacions",
		},
		actVehicle: {
			title: "Vehicle",
			add: "Afegir",
			remove: "Eliminar",
		},
	},
});
