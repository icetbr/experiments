var app.ScrollBar = function() {
    var height = 200;
    var width = 200;
    this.length = 10;
    this.size = 20;
    
    var init = function() {show()} // ERROR!
    var show = function() {this.hide()} // ERROR!
    this.hide = function() {this.test} // OK

    this.test = function() {
        return this.size * this.length;
    7}
}

var app.ScrollBar = function() {
    var height = 200;
    var width = 200;
    this.length = 10;
    this.size = 20;
    
    var init = function() {show()} // ERROR!
    var show = function() {this.hide()} // ERROR!
    this.hide = function() {this.test} // OK

    this.test = function() {
        return this.size * this.length;
    }
}

var app.ScrollBar = function() {
    var height = 200;
    var width = 200;
    var length = 10;
    var size = 20;
    
    var init = function() {show()} // ERROR!
    var show = function() {this.hide()} // ERROR!
    var hide = function() {this.test} // OK

    var test = function() {
        return size * length;
    }
    
    return {height:height, size:size, hide:hide }
}

var app.ScrollBar = {
    height: 200,
    width: 200,
    length: 10,
    size: 20,
    
    init: function() {show()} // ERROR!
    show: function() {this.hide()} // ERROR!
    hide: function() {this.test} // OK

    test: = function() {
        return size * length;
    }
}
