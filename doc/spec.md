
ANÀLISI I ESPECIFICACIÓ
=======================


Objectíu:
---------

Reemplaçar el formulari que actualment fan servir els excursionistes per
notificar al SEIB112 quan van d'excursió en previsió de que puguin tenir algún
accident i no puguin contactar amb els serveïs d'emergència pel seu compte.

Actualment això es fa mitjançant un formulari web, disponible a la web de la
CAIB, que simplement envia un correu electrònic que reben els supervisors del
centre d'emergències a partir del qual, han de crear manualment un incident amb
una alarma de manera que, si a una hora determinada, els excursionistes no han
telefonat a l'112 per notificar que estan sans i estalvis de manera que un
operador tanqui l'incident, aquest s'activa i alerta de que possiblement hagi
succeït alguna cosa.


###Motivació:###

Aquesta mecànica representa alguns problemes. Entre ells:

  * Una sobrecàrrega de feina a la sala per gestionar el que, en la majoría
  dels casos, afortunadament, no derivarà en una incidència real. Malmetent
  així recursos que poden ser valuosos per l'atenció d'altres incidències.

  * No existeix cap tipus de validació de les dades enviades amb el formulari.
  Si alguna dada, com ara el telèfon de contacte o les senyes per localitzar la
  ubicació de l'activitat, és errònia o incompleta, probablement no es
  detectarà fins que, si és el cas, sigui necessari intentar contactar o
  localitzar els excursionistes per no haver tengut notícies d'ells en el
  termini estipulat.

  * El sistema actual permet detectar quan és possible que s'hagi produït una
  incidència, però no aporta cap tipus de informació adicional, com ara
  coordenades del lloc on es troben els participants de l'activitat o ón es
  trobaven en el darrer moment que tengueren cobertura.

  * Si la sala no reb la notificació de finalització de l'activitat, haurà
  d'iniciar accions per esbrinar què ha passat, fins i tot mobilitzar recursos
  per localitzar-los si no aconsegueixen contactar amb els excursionistes quan
  existeix la possibilitat que simplement hagin exhaurit la bateria del mòbil.


###Possibilitats:###

Una aplicació mòbil ofereix la possibilitat de millorar sensiblement tot aquest procés.

A més, totes aquestes millores es poden implementar de forma escalonada, començant per les més bàsiques, com automatitzar la recollida de dades i generació de les alarmes però notificant primer l'aplicació, de forma automatitzada, al propi usuari per assegurar que no es genera una alarma perquè s'ha oblidat d'avisar o només pateixen un lleuger retard en la planificació.

Les següents son vàries de les funcionalitats que es podríen arribar a implementar. Lògicament no totes estaran disponibles des del principi. Però l'aplicació es construïrà tenint en ment la possibilitat (i desig) de que totes elles o, com a mínim les més importants, arribin a ser una realitat:

  * Completa automatització de la recollida de dades i generació de les
  alarmes.
  
  * Ha de ser multi-idioma.

  * Ampliar el formulari original per possibilitar afegir més informació que
  pugui ser útil en cas de que es produeïxi alguna incidència.

  * Incorporar coordenades dels punts d'inici i de fi de l'activitat,
  associades a l'hora de partida i d'arribada de la mateixa.

  * Permetre introduïr també coordenades de punts intermitjos i, opcionalment,
  també l'hora estimada a la que es preveu passar-hi com qualsevol altra
  informació relacionada que pugui ser d'utilitat.

  * Enviament de la posició del terminal:
	- De forma manual: Quan els usuaris ho considerin oportú (o en el moment de
			l'emergència).
	- De forma automatitzada: En passar aprop dels punts definits, cada cert
	temps (configurable), etc...

  * Seguiment en el servidor de la informació rebuda. Així, en cas de pèrdua de
  cobertura, encara es disposarà de la posició en el darrer moment en que
  tengueren cobertura.

  * UX: L'aplicació ha de ser usable i, a l'hora, oferir a l'usuari la
  possiblitat de triar les opcions més adequades a les seves necessitats i
  mitjans. Per exemple: Enviar coordenades molt sovint podria esgotar la
  bateria del terminal abans que acabin l'activitat. Però si la bateria ho
  aguanta o disposen de carregadors (bateries) auxiliars, pot incidir molt
  positivament en minimitzar el temps de localització i rescat en cas
  d'accident.

  * Notificació des de la pròpia aplicació de quan s'ha finalitzat l'activitat.
  Moment en que es desactivaria el seguiment automatitzat des del servidor
  sense haver generat cap tasca innecessària als operadors.
   
  * Recordar a l'usuari, en arribar l'hora de finalització o detectar el
  terminal estar en la posició final de l'activitat (alternatíu / configurable)
  que ha de notificar (mitjançant l'aplicació) la finalització de l'activitat.
  En aquest punt, l'usuari podría perllongar-la el temps que consideri oportú o
  confirmar la finalització.

  * Si l'usuari no respòn a l'alerta, l'aplicació podría alertar immediatament
  de que l'usuari no està responent. Reduint així considerablement el temps que
  es tarda en generar l'alerta.

  * En cas de considerar-se que l'activitat té un risc elevat, es podría
  configurar la possibilitat que l'aplicació requeris periòdicament a l'usuari
  que confirmi que estan bé a intervals raonables de temps, sense esperar la
  finalització de l'activitat.

  * En qualsevol cas, en qualsevol moment l'usuari disposaria d'un botó per
  realitzar una telefonada d'emergència. Fent-ho des de l'aplicació, al temps
  que es fa la telefonada, s'activaria automàticament l'alerta d'accident
  enviant-se a la sala totes les dades recollides fins aleshores, inclosa la
  posició en l'instant de la telefonada.

  * Notificacions des del centre d'emergències als usuaris: Disposant de la
  posició i la ruta prevista dels excursionistes, es podría alertar aquests
  d'incidències o fenòmens, com ara incendis declarats en zones pròximes, que
  puguin suposar un risc afegit. Això requeriria, lògicament, la integració del
  servidor amb altres serveïs interns del centre, però facilitaria no només
  l'alerta dels propis usuaris, sino la notificació automatizada a la sala de
  la seva presència en les proximitats de l'incident de manera que, donat el
  cas, el supervisor podría decidir contactar amb ells i donar-los instruccions
  perquè s'allunyin o organitzar la seva evacuació preventiva en cas necessari.

  * Posicionament en els sistemes de mapping del centre: El sistema es podria
  integrar amb el sistema de posicionament del SEIB112. De manera que els
  operadors podrien veure posicionats al mapa les distintes activitats
  monitoritzades per aquest sistema de manera que, encara que no salti cap
  alarma automatitzada, els operadors podràn veure la ubicació d'aquestes
  activitats i valorar, si ho consideren, la procedència de qualsevol mesura
  preventiva en funció de les incidències en curs.



Punt de partida:
----------------

El formulari original es pot trobar a:

  http://www.caib.es/sacmicrofront/contacto.do?idsite=264&cont=180
  ò http://www.112ib.com -> Formularis -> Excursions.

En ell es poden cumplimentar les següents dades, en les que ens basarem per
construïr l'especificació posterior.


  * Data Activitat
  * Participants. noms, edats i telèfons.
  * Guia. Nom i telèfon.
  * Persones de contacte fora de l'excursió (noms i telèfons).
  * Tipus d'activitat:
    - Senderisme.
    - Escalada.
    - Torrents.
    - Espeleologia.
    - Mountain Bike.
    - Equitacio.
    - Altres. (Especificar).
  * Ruta. Punt de partida.
  * Hora de partida.
  * Punt d'arribada.
  * Hora d'aribada.
  * Hora d'alarma.
  * Grau de coneixement i experiència.
    - Baix.
    - Mitjà.
    - Alt.
  * Utilitza vehicle (Sí / No)
    - Marca i model.
    - Matrícula.
    - Color.
  * Observacions.



Especificació:
--------------

###Pantalles principals###


####Benvinguda####

  * Serà la pantalla d'entrada el primer cop que s'obre l'aplicació.

  * Sortirà per defecte en l'idioma del dispositiu en cas que estigui suporat i, en cas contrari, se'n sel·leccionarà un dels suportats segons unes regles d'idoneitat (en principi, galeg i euskera derivaràn en castellà i la resta en anglès).

  * Permetrà a l'usuari de forma intuitiva sel·leccionar-ne un diferent d'entre els suportats.

  * Oferirà, en l'idioma sel·leccionat, una breu explicació del funcionament de l'aplicació i, opcionalment, enllaçarà a un manual més detallat.

  * Enllaçarà (emfàticament) a la pantalla per introduïr les dades personals de l'usuari que s'enregistraràn al dispositiu.

  * Finalment, enllaçarà a la pantalla de "Llistat d'activitats" que, un cop l'usuari hagi emplenat les seves dades personals, passarà a ser la pantalla d'entrada de l'aplicació en substitució d'aquesta.

  * Igualment, aquesta pantalla continuarà sent accessible des del menú de navegació.


####Menú lateral####

  * Proporcionarà accés a la pàgina de benvinguda un cop l'usuari ja hagi cumplimentat les seves dades.

  * Proporcionará accés a altres opcions de configuració.


####Peu de pàgina####

No és una pantalla pròpiament. Però totes les pantalles següents, excepte els popups, portaràn el mateix peu de pàgina amb les següents funcionalitats que es reconfiguraràn automàticament segons la situació:

  * Botó de telefonada d'emergència.
    - SEMPRE demanarà confirmació per evitar telefonades accidentals.

  * En cas d'haver-hi una activitat programada de la que s'aproximi l'hora d'inici:
    - Notificació d'inici d'activitat.

  * En cas d'haver-hi una activitat en curs, mostrarà contingut pertinent:
    - Informació de l'activitat activa (Indicació i nom).
    - Botó de notificació de finalització.
    - Botó d'enviament manual de la posició.
  

####Activitats####

  * Llista de les activitats definides.

  * Permetrà accedir-hi (clicant en elles), eliminar-les, o crear-ne de noves.

  * Si hi ha una activitat en curs, la mostrarà ressaltada.


####Activitat - General####

  * Primera pestanya de la fitxa de l'activitat.

  * Mostrà el fomrulari amb la informaicó més bàsica (tipus, descriptió...)

  * Donarà accés a la pantalla de ruta (on s'especificarà com a mínim el punt
		d'inici i fi de l'activitat i l'horari).

  * Mostrarà els controls de configuració d'alarmes (possiblement assistits per un popup).


####Activitat - Participants####

  * Llista de participants en l'activitat.

    * El propi usuari (no s'hi pot eliminar) donarà accés a la pantalla de dades personals de l'usuari.

    * La resta es podràn afegir / eliminar a gust i donaran accés a un formulari semblant a l'anterior per introduïr dades dels participants. S'emfatitzarà el número de telèfon.


####Activitat - Altres####

  * Donarà accés a la pantalla de vehicles.

  * Permetrà introduïr observacions.


###Pantales auxiliars###

####Ruta####

  * S'hi especificaran el punt de partida i fi de l'activitat amb:
    - Coordenades (es podrà posicionar sobre un mapa) mitjançant popup.
    - Descripció (text)
    - Hora.

  * Tots els camps dels punts d'inici i fi seràn "gairebé" obligatoris (s'alertarà si s'intenta enviar una activitat sense alguna d'aquestes dads).

  * S'hi podràn especificar atres punts intermigs, en els quals tots els camps seran opcionals (mentre al menys se n'aporti un).

  * Les hores seran timesamps complets i es consideraran en referència a la data d'inici de l'activitat. Si es canvia aquesta a la pantalla princpal, ja sigui per replanificació o per repetir una activitat antiga, aquests es recalcularan automàticament en funció de la primera.


####Participant####

  * Formulari per introduïr les dades personals de l'usuari (accedint-hi des del menú de configuració o des de la línia corresponent a ell mateix de la pestanya de participants de l'activitat) i per les dades d'altres participants.

  * El formulari es podrà emplenar manualment o carregar les dades a partir dels contactes de l'agenda del dispositiu. Permetent, en qualsevol cas, editar el contingut carregat sense alterar aquesta.

  * Les dades d'aquest formulari, basant-se en el número de telèfon, son el nexe d'unió entre les instàncies de l'aplicació entre diversos terminals dels participants en l'activitat (Veure detalls a l'apartat d'arquitectura de l'aplicació).

  * Dades de la fitxa d'usuari / participant (ja sigui la pública o la privada):
    - Nom.
    - Llinatges.
    - Telèfon.
    - Perfil*
    - Data de naixement.
    - Persona de contacte en cas que li passi alguna cosa: (Nom i telèfon).
      (Només per incidències concretes amb aquest participant)
    - Comentaris.

  * Perfils:
    - Persona de contacte: No és un participant real (no s'en farà seguiment GPS) sino una persona amb qui contactar, en primera instància, en cas d'accident (en general).
    - Guia professional: Professional que exerceix el rol de guia dins el grup.
    - Guia amateur: Amateur que exerceix el ro de guia dins el grup.
    - Expert.
    - Participant.
    - Principiant.


####Vehicles####

Informació de vehicles utilitzats en l'activitat o per arribar-hi.

Consistirà en una llista en que es podràn afegir, modificar o eliminar vehicles mitjançant un formulari en popup auxiliar.

Es podràn emplenar les següents dades:

  - Matrícula.
  - Tipus.
  - Marca.
  - Model.
  - Color.
  - Observacions.


Arquitectura:
-------------

###Sincrontizació entre participants###

Si una activitat té múltiples participants, un cop es faci "pública" l'activitat enviant-la al servidor. Tots aquels que el seu número de telèfon aparegui entre els de la llista de participants, rebràn la informació de l'activitat que es sincronitzarà a la seva instància de l'aplicació. Així:

  * Qualsevol modificació d'una activitat pujada al servidor, es replicarà entre totes les instàncies connectades via websocket i els dispositius que es connectin amb posterioritat SEMPRE sincronitzaran les activitats en les que apareix el seu telèfon des del servidor.

  * Quan un participant rebi una activitat en la que apareix, l'aplicació ignorarà les dades rebudes sobre ell mateix i enviarà les que té configurades al servidor per actualitzar-lo. Però aquestes dades no seran servides a la resta de participants que rebràn només les dades introduïdes originalment pel creador de l'activitat.

  * Alternativament, els usuaris podràn tenir un perfil "públic" que sí s'enviaria a la resta i sobrescriuria les dades empenades originalment pel creador de l'activitat qui, al seu torn, també enviaria el seu perfil públic mantenint així la privacitat del personal.

  * D'aquesta manera, els usuaris podrien afegir als seus perfils personals qualsevol informació privada que puguin considerar d'interés davant una situació d'emergència sense necessitat de compartir-la amb altres participants d'una mateixa activitat que poden ser potencialment desconeguts.

  * Excepte els perfils públic i privat del propi usuari, la resta de perfils de participants s'emmagatzemaran en el propi document d'intercanvi (JSON) que defineix l'activitat i enlloc més.

  * Els usuaris es podran eliminar a sí mateixos o a altres usuaris d'una activitat i, automàticament, els seus perfils públics desapareixeràn de l'activitat i, per tant, dels terminals dels altres usuaris.

  * Quan un usuari és eliminat per un altre, aquest rebrà una notificació. Bé en el mateix instant si es troba connectat o amb posterioritat, quan l'aplicació es connecti i vegi que una de les seves activitats, marcada (mitjançant un identificador) com a pujada al servidor, ja no apareix a la llista d'activitats que el servidor li envia. Aiximateix, com que coneix l'identificador, tendrà a possibilitat de tornar-s'hi a afegir (la finalitat del serveï és rebre la informació dels usuaris, no resoldre possibles conflictes).

  * El servidor, en canvi, conservarà aquesta informació fins un temps prudencial passada la finalització de l'activitat.

  * Dit d'altra manera: La seguretat de l'aplicació es basa en la confiança mútua que es suposa entre els participants d'una activitat de risc, però qualsevol possible acció maliciosa, com ara eliminar deiberadament algú del grup, quedaria registrada inclosa la identitat de qui ho ha fet.


###Estructures de dades###

####Dades en fitxers####

  * Fitxers d'idiomes (JSON).

####Local (Local Storage####

  * Configuració:
    - Idioma.
    - Preferències d'alarmes.
    - Preferències d'enviament de coordenades.
    - Etc...

  * Fitxes personals (pública i privada).

  * Llista (Array JSON) d'activitats.
    - Si tenen identifiador estàn sincronitzades al servidor.

  * Vehicles: (Opcionalment es podria permetre "recordar-los" i sel·leccionar d'una llista en emplenar les activitats).


####Servidor####

  * Activitats:
    - Planificades (per sincronització entre usuaris).
    - En curs (seguiment).
    - Finalitzades recents (eliminades automàticament passat un temps prudencial sense indidències).

No s'enregistraràn ni mantendràn altres informacions relatives als usuaris o activitats passades excepte aquelles que hagin tengut incidències, en cas que dita informació no es decideixi traslladar a altres sistemes.

Les dades dels perfils públics i privats s'enregistraran internamet dins la mateixa estructura de cada activitat i que serà lleugerament distinta a les enviades i rebudes dels clients (els usuaris "manaràn" sobre les seves dades personals, rebràn només els perfils públics dels altres i seràn corresponsables de la resta d'informació).

La identificació dels usuaris serà mitjançant el número de telèfon de l'usuari (participant).

Hi podrà haver participants sense número de telèfon, però no podràn fer servir l'aplicació. Excepte, pot ser, en el futur si es permetés l'accés via web, que s'hauria d'estabir un mecanisme d'autenticació. Però preferentment seria també via número de telèfon validat per codi enviat via sms en cas de no ser smartphone.

Però aquest és un supòsit cada dia més improbable...





