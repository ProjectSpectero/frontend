<template>
  <div class="ui-guide">
    <section>
      <h2>Buttons</h2>
      <a href="#" class="button">Plain</a>
      <a href="#" class="button button-dark">Dark</a>
      <a href="#" class="button button-info">Info</a>
      <a href="#" class="button button-success">Success</a>
      <a href="#" class="button button-warning">Warning</a>
      <a href="#" class="button button-danger">Danger</a>
      <a href="#" class="button button-success" disabled>Disabled</a>
    </section>
    <section>
      <h2>Inputs</h2>
      <input type="text" class="input" placeholder="Text input">
      <input type="password" class="input" placeholder="Password input">
      <input type="text" class="input" placeholder="Disabled input" disabled>
      <br><br>
      <div class="label"><label for="textarea-demo">Example Label</label></div>
      <textarea id="textarea-demo" class="input" style="width: 100%; max-width: 800px; height: 160px;">This is a textarea input.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra tristique ex rutrum egestas. Nunc porta ipsum vitae mi varius, ac porttitor massa placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia efficitur tellus, ut scelerisque lacus. Suspendisse nec ipsum et lectus aliquam consequat at a augue. Duis quis feugiat justo, in facilisis ante. Proin sed dui quis arcu semper convallis.</textarea>
    </section>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
  @import '../assets/styles/_vars.scss';

  section {
    margin: $pad;
    padding: $pad;
    background: $color-white;
    border-radius: 4px;
    border: 1px solid $color-border;

    h2 {
      display: block;
      margin-bottom: 20px;
    }
  }
</style>
