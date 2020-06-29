<template>
    <div class="home">proto Demo<br />
    </div>
</template>

<script>
// https://juejin.im/post/5bcda388e51d457a1179da01
import { getStudentList } from './apis/student'
export default {
  name: 'HelloWorld',
  created () {

  },
  methods: {
    _getStudentList () {
      const req = {
        limit = 20,
        offset = 0
      }
      getStudentList(req).then((res) => {
        console.log(res)
      }).catch((res) => {
        console.error(res)
      })
    }
  }
}
</script>
