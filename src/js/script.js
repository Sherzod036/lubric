document.addEventListener('DOMContentLoaded', () => {});

jQuery(() => {
  const lazy = $('img.lazy');
  lazy.lazyload({
    effect: 'fadeIn',
  });
});
