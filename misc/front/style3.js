QML Like

$("<div/>", {
	id: "page",
	"data-role": "page",
	"class": "resizable",

	html: $("<div/>", {
		id: "content",
		"data-role": "content",
		"data-iscroll": '{"hideScrollbar":true, "fadeScrollbar":true}',

		html: $("<div/>", {//may remove this tag after bug with filter=true is fixed
			id: "scroller",
			"data-role": "content",
			"data-iscroll": '{"hideScrollbar":true, "fadeScrollbar":true}',

			html: $("<div/>", {
				id: "fileSelectPage",
				"class": "content activeContent",

				html:
				  $("<div/>", {
					id: "dropZone",
					text: "Drop files here",
					"class": "content activeContent"
				  }).after (

				  $("<div/>", {
					id: "fileSelection",

					html: $("<input/>", {
							id: "selectFilesInput",
							type: "file",
							name: "files[]",
							style: "display: none",
							multiple: "true"

				   }).after(
							$("<a/>", {
								id: "selectFiles",
								"data-role":"button",
								"data-theme":"b",
								text: "Select files"
							})
						)
					})
				)
			})

		})
	})
}).appendTo("html");


HTML Like

$("<div/>", { id: "page", "data-role": "page", "class": "resizable",  html:
	$("<div/>", {id: "content", "data-role": "content", "data-iscroll": '{"hideScrollbar":true, "fadeScrollbar":true}', html:
		$("<div/>", { id: "scroller", "data-role": "content", "data-iscroll": '{"hideScrollbar":true, "fadeScrollbar":true}', html:

			$("<div/>", { id: "fileSelectPage", "class": "content activeContent", html:
				$("<div/>", { id: "dropZone", text: "Drop files here", "class": "content activeContent"}).after (
				$("<div/>", { id: "fileSelection", html: $("<input/>", { id: "selectFilesInput", type: "file", name: "files[]", style: "display: none", multiple: "true"}).after(
					$("<a/>", { id: "selectFiles", "data-role":"button", "data-theme":"b", text: "Select files"})
				)
				})
				)
			})

		})
	})
}).appendTo("body");


Without auto $ added

c.page = $('<div data-role="page" class="resizable"/>').on("vmousedown", logTest).append(
   c.content = $('<div data-role="content" data-iscroll=\'{"hideScrollbar":true, "fadeScrollbar":true}\'/>').append(
	   c.scroller = $('<div/>').append(
		   c.fileSelectPage = $('<div class="content activeContent">').append(
			   c.dropZone = $('<div>Drop files here</div>').after(
			   c.fileSelection = $('<div/>').append(
				   c.selectFilesInput = $('<input type="file" id="selectFilesInput" name="files[]" style="display: none" multiple/>').after(
				   c.selectFiles = $('<a data-role="button" data-theme="b">Select files</a>')
				   )
			   ))
		   )
	   )
   )
)


Coffee

c = {}
c.page = $("<div data-role=\"page\" class=\"resizable\"/>").on("vmousedown", logTest).append(
c.content = $("<div data-role=\"content\" data-iscroll='{\"hideScrollbar\":true, \"fadeScrollbar\":true}'/>").append(
  c.scroller = $("<div/>").append(
  c.fileSelectPage = $("<div class=\"content activeContent\">").append(
  c.dropZone = $("<div>Drop files here</div>").after(
  c.fileSelection = $("<div/>").append(
  c.selectFilesInput = $("<input type=\"file\" id=\"selectFilesInput\" name=\"files[]\" style=\"display: none\" multiple/>").after(
  c.selectFiles = $("<a data-role=\"button\" data-theme=\"b\">Select files</a>"))))))))


************************************************************************************************************************************************************************
IDEAL

fileSelectPage class: "content activeContent" sortable: true

  dropZone "Drop files here"

  fileSelection
    selectFilesInput type: "file" name: "file[]" style: "display: none" multiple: true
    selectFiles theme: "b" text: "Select files"

************************************************************************************************************************************************************************
Method Missing


fileSelectPage({class: "content activeContent"},

  dropZone("Drop files here"),

  fileSelection(
    selectFilesInput({type: "file", name: "file[]", style: "display: none", multiple: true}),
    selectFilesButton({theme: "b", text: "Select files"})
  )

)

------------------------------------------------------------------------------------
Coffee

fileSelectPage class: "content activeContent",

  dropZone text: "Drop files here",

  fileSelection
    selectFilesInput type: "file", name: "file[]", style: "display: none", multiple: true
    selectFilesButton theme: "b", text: "Select files"

------------------------------------------------------------------------------------
Without auto $ added

c.fileSelectPage = div({class: "content activeContent"},

  c.dropZone = div("Drop files here"),

  c.fileSelection = div(
    c.selectFilesInput = input({type: "file", name: "file[]", style: "display: none", multiple: true}),
    c.selectFilesButton = button({theme: "b", text: "Select files"})
  )

)

Some binding

fileSelectPage class: "content activeContent",

  dropZone
	  text: "Drop files here",
		remainingItems: "you have" todosLeft "todos left"

  fileSelection //se funcao, elemento, senao, atributo
  	height: content.height - dropZone.outerHeight - fileSelection.outerHeight //onShow, update height?

    selectFilesInput type: "file", name: "file[]", style: "display: none", multiple: true
    selectFilesButton theme: "b", text: "Select files"


************************************************************************************************************************************************************************
Pure HTML

<div id="fileSelectPage" class="content activeContent">

	<div id="dropZone">	Drop files here	</div>

	<div id="fileSelection">
		<input id="selectFilesInput" type="file" name="files[]" style="display: none" multiple />
		<a id="selectFiles" data-role="button" data-theme="b" onm>Select files</a>
	</div>

</div>



************************************************************************************************************************************************************************
Using after()

$("<div/>", { id: "fileSelectPage", "class": "content activeContent", html:

  $("<div/>", { id: "dropZone", text: "Drop files here"}).after (

  $("<div/>", { id: "fileSelection", html:
	  $("<input/>", { id: "selectFilesInput", type: "file", name: "files[]", style: "display: none", multiple: "true"}).after(
	  $("<a/>", { id: "selectFiles", "data-role":"button", "data-theme":"b", text: "Select files"})

			)
   ))
))

************************************************************************************************************************************************************************
With CSS

fileSelectPage class: "content activeContent"
    height: 100%
    width: 100%
    position: relative
    opacity: 0
    text-align: center

  drop Zone "Drop files here"

  fileSelection
    selectFiles:input type: "file" name: "file[]" style: "display: none" multiple: true
		    border: 3px dashed #BBBBBB
				border-radius: 5px 5px 5px 5px
				color: #BBBBBB
				padding: 25px
				text-align: center
				margin: 10px
				font-weight: bold
    selectFiles:button theme: "b" "Select files"

************************************************************************************************************************************************************************
// possivel usar o requestAnimationFrame p/ calcular valores
// methodMissing é um parser JS
// definir varias funcoes com o nome e mesmo retorno? Usar NOME como id
  / ainda falta selector!

fileSelectPage = function() {
   $fileSelectPage = $fileSelectPage
	 return (div);
}

i.fileSelectPage({class: "content activeContent"},

  o.dropZone("Drop files here"),

  o.fileSelection(
    o.selectFilesInput({type: "file", name: "file[]", style: "display: none", multiple: true}),
    o.selectFilesButton({theme: "b", text: "Select files"})
  )

)

//force all to have id?

************************************************************************************************************************************************************************
$("<div/>", { id: "fileSelectPage", "class": "content activeContent" })

div({id: "fileSelectPage", class: "content activeContent"})

fileSelectPage({class: "content activeContent"})

fileSelectPage: {class: "content activeContent"}

fileSelectPage class: "content activeContent"

<div id="fileSelectPage" class="content activeContent">

1) div ({id: "test"})    unresolved
2) testDiv ()            unresolved
3) test {}               invalid

AS JSON
	var xx2 = {
    footerInfo:[
        {p: "Double-click to edit a todo."},
        {p: [{text: "Credits:"},
            {a: {href:"http://twitter.com/cburgdorf", text:"Christoph Burgdorf"}},
            {a: {href:"http://ericbidelman.com", text:"Eric Bidelman"}},
            {a: {href:"http://jacobmumm.com", text:"Christoph Burgdorf"}},
            {a: {href:"http://igorminar.com", text:"Igor Minar"}}
        ]}
    ]
}