<template>
  <footer calls="container-fluid text-center">
    By Vickodev |
    <a href="https://github.com/harvic3" target="_blank">github</a> |
    <a href="https://www.linkedin.com/in/vickodev/" target="_blank">linkedin</a>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped >
footer {
  padding: 50px;
}
footer a {
  color: rgb(99, 217, 253);
}
footer a:hover {
  text-decoration: none;
  color: rgb(0, 195, 255);
}
</style>
