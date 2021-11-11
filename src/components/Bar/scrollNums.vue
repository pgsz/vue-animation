<template>
  <ul class="flex">
    <scroll-num
      v-for="(number, idx) of numArr"
      :key="idx"
      :i="number"
      :delay="idx + 2.5"
      as="li"
      class="num"
    />
  </ul>
</template>

<script>
import scrollNum from './scrollNum'

export default {
  name: 'scrollNums',
  components: { scrollNum },
  data: () => ({ num: 886 }),
  computed: {
    numArr () {
      const str = String(this.num)

      return [parseInt(str[0]), parseInt(str[1]), parseInt(str[2])]
    }
  }
}
</script>

<style>
.flex {
  display: flex;
  justify-content: center;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.num {
  --width: 26px;
  margin-right: 6px;
  border: 1px solid black;
  border-radius: 8px
}
</style>

