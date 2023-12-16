Given this is the ideal  way to represent requirements, then the closer to this our tests the better their readability.

## POST /employees
- transforms the employee data to the legacy format
  - turns name to fullname
  - turns jobTitle to occupation
- adds metadata
  - adds the caller's email
  - adds the current time as YYYY-MM-DDTHH:MM:SS
- saves it to the database
- saves a copy for history
- returns the non transformed employee

## feature view
- creates employee
- notifies on creation
- ...

## naming
- adds an updatedBy field with the email of the person who called the endpoint
- adds the caller's email


## How much details should a test description have?

Documentation can be either for the developer or the custumer

**developer**: document only things the code cannot convey
**custumer**: document as detailed as possible!?

**code**
updatedAt: withSeconds(new Date()),
updatedBy: auth.user.email,


