// UI: Add User -> fill data -> save OR saveUser
const data = { name: 'John', type: 'User' };

const save = data => {
  if (data.type === User) saveUser(data);
}

const data = new User({ name: 'John'});
data.save();

const data = { name: 'John', type: User};
data.type.save();


-> fill data -> u = new User(data) => u.save
  save = o =>
    if(o is User) => User.save / saveUser

/*
    - Why type? Because UI/Json/String doesn't understand the concept of Class
    - everywhere the object goes, it knows its behaviours
    record, structm object, class, typeclass, sum type, adt
*/
