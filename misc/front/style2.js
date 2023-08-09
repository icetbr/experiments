
<button id="saveButton" "click="if(user.name.length > 0) database.save(...)" />

*********************************************************************************

<button id="saveButton" "click="save()" />

function save() {
  if(user.name.length > 0) {
		  database.save(...)
	}
}

*********************************************************************************

<button id="saveButton" "click="onSaveButtonClicked()" />

function onSaveButtonClicked() {
   	save()
}

function save() {
  if(user.name.length > 0) {
		  database.save(...)
	}
}


*********************************************************************************
<button id="saveButton" />

$("saveButton").onClick(save())

function save() {
  if(user.name.length > 0) {
		  database.save(...)
	}
}

events: {
    "click saveButton           : "save"
},


*********************************************************************************
<filtrableComboBox id="series" selectedItem="addSerie()" />
- no swing, estou usando onItemSelected: addSerie


- evitar coloca logica na interface pois fica dificil rastrear p/ mudancas depois
- posso querer ter comportamento diferente quando o save é chamado do saveButton e de outro lugar?