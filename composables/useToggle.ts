export default function () {
  const isToggled = ref(false);

  const toggle = () => {
    isToggled.value = !isToggled.value;
  };

  return {
    isToggled,
    toggle,
  };
}
