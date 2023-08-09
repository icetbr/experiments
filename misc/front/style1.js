var $verticalScrollbar = $("#verticalScrollbar");
var $horizontalScrollbar = $("#horizontalScrollbar");
var $verticalHandle = $verticalScrollbar.find(".scrollbarButton");
var $horizontalHandle = $horizontalScrollbar.find(".scrollbarButton");

$verticalScrollbar.css({"height": (o.viewport.height - 50) + "px"});
$horizontalScrollbar.css({"width": (o.viewport.width - 50) + "px"});

--------------------------------------------------------

init = function() {
	this.$verticalScrollbar = $("#verticalScrollbar");
	this.$horizontalScrollbar = $("#horizontalScrollbar");
	this.$verticalHandle = this.$verticalScrollbar.find(".scrollbarButton");
	this.$horizontalHandle = this.$horizontalScrollbar.find(".scrollbarButton");

	this.$verticalScrollbar.css({"height": (o.viewport.height - 50) + "px"});
	this.$horizontalScrollbar.css({"width": (o.viewport.width - 50) + "px"});
}

--------------------------------------------------------

var $verticalScrollbar;
var $horizontalScrollbar;
var $verticalHandle;
var $horizontalHandle;

init = function() {
	$verticalScrollbar = $("#verticalScrollbar");
	$horizontalScrollbar = $("#horizontalScrollbar");
	$verticalHandle = $verticalScrollbar.find(".scrollbarButton");
	$horizontalHandle = $horizontalScrollbar.find(".scrollbarButton");

	$verticalScrollbar.css({"height": (o.viewport.height - 50) + "px"});
	$horizontalScrollbar.css({"width": (o.viewport.width - 50) + "px"});
}
