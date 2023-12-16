import * as st from 'simple-runtypes'

const userRuntype = st.record({
  id: st.integer(),
  name: st.string({minl}),
  email: st.optional(st.string()),
})
