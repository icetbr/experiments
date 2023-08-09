## 1 "Creates" without its own test
> This is an ideal scenario because it has no duplication, making it short and concise. But to implement this would require mixing empty asserts with asserts with messages, or else nested its.

Creates the message of a **failed test run** with

- the title of the failed test
  - including its parents

- the error message
  - when an assertion error, the diff of the actual and expected results
    - works with jest's expect
  - when a regular error, the error name and message
    - includes nested error

- the stack trace, without
  - stack frames from internals
  - useless "prefixes"


***********************************************
## 2 "Creates" with its own test
> A little of duplication keeps this closer to describe/it common usage

Creates the message of a **failed test run** with

- the title of the failed test
  - includes the title   // without parent? just one title?
  - includes its parents

- the error message
  - when an assertion error
    - the diff of the actual and expected results
    - works with jest's expect
  - when a regular error
    - the error name and message
    - includes nested error

- the stack trace, without
  - stack frames from internals
  - useless "prefixes"

### alt
- the error name and message
  - includes nested error
  - when an assertion error, the diff of the actual and expected results
    - works with jest's expect

***********************************************
## 3 Descriptive
> Assuming we want a separate integrated test, the first sentence needs some duplication.

<!-- A **failed test run** message has the title of the failed test, the error's message and stack trace -->
A **failed test run** message has a title, an error message and a stack trace

- a title
    is the title of the failed test
    includes its parents when available

- an error message
  - when an assertion error
    - is the diff of the actual and expected results
    - works with jest's expect
  - when a regular error
    - is the error name and message
    - includes nested error

- a stack trace
  - has no stack frames from internals
  - has no useless "prefixes"

<!-- one or many asserts? -->

***********************************************
## 3 Test name as groupper
> use real sentence instead of the function name?
>   function name as the grouper
> do I need "...with title, error, stack"?

createFailMessage
  creates the message of a **failed test run** with

buildTitle
  the title of the failed test
  including its parents

formatErrorMessage
  the error message
    when an assertion error, the diff of the actual and expected results
    works with jest's expect
    when a regular error, the error name and message
    includes nested error

- the stack trace, without
  - stack frames from internals
  - useless "prefixes"

***********************************************
## 4 Redundant descriptions
> remove similiarities when generating documentation
> can use describe + specify to exclude method names from docs

createFailMessage
  creates the message of a **failed test run** with its title, error message and stack trace

buildTitle
  builds the title of a failed test
  builds the title of a failed test including its parents

formatErrorMessage
  formats an error message
    when an assertion error
      returns the diff of the actual and expected results
      returns the diff of the actual and expected results, works with jest's expect
    when a regular error
      returns the error name and message
      returns the error name and message, includes nested error

cleanStack
  cleans a stack trace
    removes stack frames from internals
    removes useless "prefixes"


***********************************************
- when an assertion error
  - shows the diff of the actual and expected results
    - with regular assertion
    - with jest's expect



***********************************************
including, also, with

object: failedTestRun

- Given a failed test run, creates a message with
- Creates the message of a failed test run. Includes
- Renders a failed test run. Includes
- Formats a failed test run. Includes


- the error name and message
  - includes nested error
  - when an assertion error, the diff of the actual and expected results
    - works with jest's expect

****************************************************
createFailMessage
  Creates the message of a **failed test run**

buildTitle

NOTES
- when too much "whens" can be replace with tables


## Implementation
- For libraries, once a method is public, it needs to be maintained, or at least make the users aware of methods meant to be used for internal purposes
- For apps, too much public methods makes it harder to undertand what is useful and what is implementaiton details






