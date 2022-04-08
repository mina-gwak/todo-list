import Component from '../core/Component,js';

class Card extends Component {
  template() {
    return `<div class='card'>
              <div class='card-header'>
                <h3 class='card-title'>${this.$props.title}</h3>
                <button class='close-btn'>
                  <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z'
                      fill='#828282' />
                  </svg>
                </button>
              </div>
              <p class='card-contents'>${this.$props.contents}</p>
              <span class='card-author'>author by ${this.$props.user.name}</span>
            </div>`;
  }
}

export default Card;