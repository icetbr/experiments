// IDEAL
tankReserve: 5                      // no end comma
tankCapacity: tankReserve + 40      // var + var

startEngine() {
	injectGas()                     // no use of this
}

injectGas() {
    alert(tankCapacity)
}


// ALTERNATIVE 1: classic
// - no inheritance
// - need generator
// - need comma (or don't use function expression)
// + clean syntax
var car1 = new function() { var
    tankReserve = 10,
    tankCapacity = tankReserve + 40,

    startEngine = function() {
        injectGas()
    },

    injectGas = function() { alert(tankCapacity) }

    return {tankCapacity, startEngine, injectGas}
}


// ALTERNATIVE 2: all "o"
// - clean syntax
var car3 = (function(o) {
	  o.tankReserve = 10
    o.tankCapacity = o.tankReserve + 40

    o.startEngine = function() {
        o.injectGas()
    }

    o.injectGas = function() { alert(o.tankCapacity) }

    return o;
}({}));


//ALTERNATIVE 3: ONL with "o"
// - no support for var + var
// - clean syntax (better then 2)
var car4 = new function() { var o = {
    tankReserve: 10,

    startEngine: function() {
        o.injectGas()
    },

    injectGas: function() {}

}; return o }


// All o: similar to var a; var b; var c;, etc. Specially when many variables
// Need generator: loose ability to console/debug, a little more verbose
// need generator vs no support for var + var, o instead of this
// - Functions are declared normally and therefore have names. (Whereas with the {name: function() { ... }} format, all of your functions are anonymous, even though the properties referencing them have names.) Names help tools help you, from showing call stacks in a debugger, to telling you what function threw an exception

/***************************************************************************************************************************************/

// DECLARE LATER
var car4 = new function() { var o = {

	startEngine: function() {
		o.injectGas()
	},

	injectGas: function() { alert(o.tankCapacity) }
}
	o.tankReserve = 40
	o.tankCapacity = o.tankReserve + 40

return o
}

//ONL
var car1 = {

	init: function() {
	  	this.tankReserve = 5,
	    this.tankCapacity = this.tankReserve + 40,
	},

    startEngine: function() {
        this.injectGas()
    },

    injectGas: function() { alert(this.tankCapacity) }
}

var car2 =  new function() {
     this.tankCapacity = 40
	 this.tankCapacity = this.tankReserve + 40,

    this.startEngine = function() {
        this.injectGas()
    }

    this.injectGas = function() {}

	return this
}

//function encapsulated shorter this, 'with'
var car3 =  new function() { var o = {}; with (o) {
    o.tankCapacity = 40

    o.startEngine = function() {
        injectGas()
    }

    o.injectGas = function() {}
    }
    return o;
}


//MODULE PATTERN ALT
//namespace library: ALL MUST BE FUNCTIONS!
var car9 = new function() {
    function tankCapacity() {return 40}

    function startEngine() {
        injectGas()
    }

    function injectGas() {}

    namespace("car9a", tankCapacity, startEngine, injectGas)
}



//********************************************************************************************* //
// INHERITANCE: MULTIPLE

var asButton = function() {
	/*return {
		a: function() {
			console.log(10)
		}
	}*/
	this.a = function() {
		console.log(10)
	}
	return this
}

var RoundButon = function(){}

asButton.call(RoundButon.prototype);

var r = new RoundButon()
r.a()

// http://jsfiddle.net/MZdMB/
// or use extend to copy to prototype and asButton can be a simple object

// ATTENTION! NEED a initialize() function, because properties are not mixed in well (they're copies to the prototype, arrays will cause problem)
PAREI AQUI: vale a pena toda essa sintaxe?


// INHERITANCE: SINGLE

function makeActor(name) {
    // Create a new instance that inherits from 'actor':
    var a = Object.create(actor);

    // Set the properties of our instance:
    a.name = name;

    // Return the new instance:
    return a;
}


Inherit property
- Parent1.call(this) (+ extends)
  Parent2.call(this)
- instance.initialize() (+merged)
- extend(z, m1)
  extend(z, m2)
  extend(this, m1, m2)

IDEIA
var a = {methods:, properties:}



var Emitter = function () {};
var Page = function () {}


var Foo = function () {
Page.call(this);
Emitter.call(this);
}

for (var k in Emitter.prototype) foo.prototype[k] = Emitter.prototype[k];
for (var k in Page.prototype) foo.prototype[k] = Page.prototype[k];


/********************************************/
app.Card = {
	x: 0,
	y: 0,
	angle: 0,
	$card: new Image(),
	init: function(cardNumber, imageSource) {
		this.$card.src = imageSource
		this.$card.className = "card"
		this.$card.id = "card" + i
	}
}

app.Card = function(cardNumber, imageSource) {
	var model = {
			x: 0,
			y: 0,
			angle: 0
		}
		$card = new Image()

	$card.src = imageSource
	$card.className = "card"
	$card.id = "card" + i

	return {
		$card: $card,
		model: model
	}
}

app.Card = function() {
	this.x = 0
	this.y = 0
	this.angle = 0
	this.$card = new Image()
}

app.Card.prototype = {
	init: function(cardNumber, imageSource) {
		this.$card.src = imageSource
		this.$card.className = "card"
		this.$card.id = "card" + i
	}
}

app.Card = function(o) {
	o.x = 0
	o.y = 0
	o.angle = 0
	o.$card = new Image()

	Draggable.call(o)

	return o
}

app.Card.prototype = function(o){
	o.init = function() {
		this.$card.src = imageSource
		this.$card.className = "card"
		this.$card.id = "card" + i
	}

	return o
}({})

// PRECISO do prototype p/ fins de memoria
// nao pode ser module pq heran�a?
qt economizo com model.x = 10                Se herança, precisa this.model (ou o.model)
                 view.style.left = model.x