define({
	global: {
		menu: "Menú",
		home: "Inicio",
		homePage: "Lista",
		back: "Volver",
		close: "Cerrar",
		emergencyBtn: "Emergéncia",
		checkin: "Marcar Hito",
		//save: "Guardar",
		remove: "Eliminar",
		ok: "Hecho",
		cancel: "Cancelar",
	},
	panels: {
		menu: {//{{{
			welcomePage: "Bienvenida",
			home: "Inicio",
			personalData: "Datos Personales",
			sendPosition: "Enviar posición",
			preferences: "Configuración",
			contact: "Contacto",
			about: "Sobre 112go",
		},//}}}
	},
	pages: {
		welcome: {//{{{
			title: "112go",
			welcome: "Bienvenidos",
			selectLanguage: "Seleccione su idioma",
			userProfile: "Datos personales",
			about: "Qué es y cómo utilizar 112go",
			start: "Empezar",
		},//}}}
		userProfile: {//{{{
			pub: {
				title: "Perfil Público",
				label: "Público",
				role: "Rol",
				roles: {
					pguide: "Guia profesional",
					aguide: "Guia amateur",
					master: "Experto",
					average: "Participante",
					novice: "Principiante",
					contact: "Persona de contacto (no participa)",
				},
			},
			priv: {
				title: "Perfil Privado",
				label: "Privado",
				whatsThis: "¿Qué es el perfil privado?",
			},
			confirmDialog: {
				msg: "El formulario contiene modificaciones sin guardar. Si continua se perderán los cambios.",
				modified: "Modificado",
				cancel: "Cancelar",
				continue: "Continuar",
			},
			phone: "Teléfono",
			name: "Nombre",
			surname: "Apellidos",
			birthDate: "Fecha de nacimiento",
			comments: "Comentarios",
			contactHeading: "En caso de accidente contactar con",
			contactName: "Nombre",
			contactTel: "Teléfono",
			save: "Actualizar",
			remove: "Borrar",
		},//}}}
		activitys: {//{{{
			title: "Actividades",
			edit: "Editar",
			start: "Iniciar",
			checkin: "Estoy aquí",
			end: "Finalizar",
			statInfo: {
				noDefinedActivitys: "No hay actividades definidas",
				defineOne: "Defina una nueva actividad para empezar",
				noSelectedActivity: "No hay ninguna actividad seleccionada",
				selectOne: "Seleccione una",
			},
			list: "Lista",
			notifications: "Notificaciones",
			nextMilestone: "Siguiente hito",
			newActivity: "Nueva",

			emergency: {
				call: "112",
				warnPartners: "Alertar a los compañeros",
				cancel: "Falsa Alarma",
				comments: "Anote aquí cualquier información que considere pueda ser útil."
			},

		},//}}}
		activity: {//{{{
			title: "Actividad",
			gral: {//{{{
				title: "General",
				description: "Descripción de la Actividad",
				activityType: "Tipo de Actividad",
				type: {
					hiking: "Senderismo",
					climbing: "Escalada",
					torrents: "Torrentes",
					speleology: "Espeleología",
					mountainBike: "Mountain Bike",
					riding: "Equitación",
					other: "Otros",
				},
				activityDate: "Fecha Actividad",
				otherTypeSpecify: "Especifique",
				comments: "Observaciones",
			},//}}}
			route: {//{{{
				timing: {
					recStartLbl: "Recalcular sólo al inicio",
					recStartDesc: "El dia y hora de los hitos se actualitzaran proporcionalmente al iniciar la actividad",
					recAlwaysLbl: "Recalcular siempre",
					recAlwaysDesc: "Al iniciar la actividad o marcar un hito, el dia y hora de los siguientes hitos se actualitzarán proporcionalmente",
					recNeverLbl: "No recalcular nunca",
					recNeverDesc: "Los dias y horas de los hitos no se recalcularán nunca",
				},
				title: "Ruta",
				start: "Inicio",
				day: "Dia",
				hour: "Hora",
				milestone: "Hito",
				end: "Fin",
				add: "Añadir",
			},//}}}
			members: {//{{{
				title: "Participantes",
				addMember: "Añadir",
				guides: "Guias",
				guidesInfo: "Participantes que ejercerán el rol de guia.",
				members: "Participantes",
				membersInfo: "Otras personas que participan en la actividad.",
				contacts: "Contactos",
				contactsInfo: "Personas a contactar en caso de accidente (no participan en la actividad).",
			},//}}}
		},//}}}
		actCheckpoint: {//{{{
			title: "Hito",
			select: "Seleccione",
			description: "Descripción del lugar",
			dayNumber: "Dia",
			hour: "Hora",
			specify: "Especifique",
			latitude: "Latitud",
			longitude: "Longitud",
			remove: "Eliminar",
			map: "Mapa",
			here: "Aquí",
		},//}}}
	},
});
