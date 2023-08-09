function List(constructor) {
    Object.defineProperty(this, "constructor", {
        value: constructor || this
    });
}

var Nil = new List;

function Cons(head, tail) {
    var cons  = new List(Cons);
    cons.head = head;
    cons.tail = tail;
    return cons;
}

// parametric polymorphism

function length(a) {
    switch (a.constructor) {
    case Nil:  return 0;
    case Cons: return 1 + length(a.tail);
    }
}

// ad-hoc polymorphism

List.prototype.map = function (f) {
    switch (this.constructor) {
    case Nil:  return Nil;
    case Cons: return Cons(f(this.head), this.tail.map(f));
    }
};

var list = Cons(1, Cons(2, Cons(3, Nil)));

    alert("length: " + length(list));

    function square(n) {
        return n * n;
    }

    var result = list.map(square);

    alert(JSON.stringify(result, null, 4));

    // data List a = Nil | Cons a (List a)



