const modal = document.querySelector('.modal-error');
const modalContainer = document.querySelector('.modal-container');

function closeModal() {
  gsap.fromTo('.modal-container', {
    opacity: 1,
  }, {
    duration: 1,
    opacity: 0,
  })

  gsap.fromTo('.modal-error', {
    opacity: 1,
    y: 0
  }, {
    duration: 1,
    opacity: 0,
    y: -150,
    onComplete: () => {
      modal.style.display = 'none';
      modalContainer.style.display = 'none';
    }
  })
}

gsap.fromTo('.modal-container', {
  opacity: 0,
}, {
  duration: 1,
  opacity: 1,
})

gsap.fromTo('.modal-error', {
  opacity: 0,
  y: 150
}, {
  duration: 1,
  opacity: 1,
  y: 0
})