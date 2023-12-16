/*
    se tudo que preciso é auto complete, pegar libcom bom validação (mpede validadores errados)
    alts:
*/
//
//
string('email', 'min(5)', 'max(6)'); // registers that email was used, so URL cannot be used now
string(email, min(5), max(6));      // needs to be ordered
string({ email, min: 5, max: 6 });
string({ email, min: 5, max: 6 });

string().email().min(5).max(6);
v.string();
string(s => email(s) && s > 5 && s < 6);
// native Ts?
//const string = () => {}
const string1 = (...validators: StringValidators[]) => string => args.every(x => x); // validate for unique
const string = every(x => x()); // validate for unique
const string = every(call); // validate for unique
const string = call; // validate for unique



