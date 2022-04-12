import Component from '../core/Component.js';
import autosize from 'autosize';
import { UserStore, ColumnStore, TaskStore } from '../store/index.js';

class InputCard extends Component {
  setup() {
    ColumnStore.subscribe('columns', this);
    TaskStore.subscribe('tasks', this);
  }

  template() {
    return `<form class='card deactivate'>
              <textarea class='card-title' name='title' placeholder='제목을 입력하세요' maxlength='100' rows='1'></textarea>
              <textarea class='card-contents' name='contents' placeholder='내용을 입력하세요' maxlength='500' rows='1'></textarea>
              <div class='card-btn-group'>
                <button class='btn-normal card-btn-quit' type='button'>취소</button>
                <button class='btn-accent card-btn-enroll' type='button' disabled>등록</button>
              </div>
            </form>`;
  }

  setEvent() {
    this.addEvent('input', 'textarea', this.handleTextareaFocus.bind(this));
    this.addEvent('click', 'button', this.handleButtonClick.bind(this));
  }

  mounted() {
    const allTextarea = this.$target.querySelectorAll('textarea');
    allTextarea.forEach(textarea => autosize(textarea));
  }

  handleTextareaFocus() {
    const textareasValue = [...this.$target.querySelectorAll('textarea')];
    const enrollBtn = this.$target.querySelector('.card-btn-enroll');
    const isTextareaEmpty = !!textareasValue.find(
      textarea => textarea.value === '',
    );

    enrollBtn.disabled = isTextareaEmpty;
  }

  async handleButtonClick(event) {
    event.preventDefault();
    const { target } = event;
    const isEnrolled = target.classList.contains('card-btn-enroll');
    isEnrolled ? this.createNewCard() : this.removeCard();
  }

  async createNewCard() {
    const cardInfo = this.getCardInfo();
    const { columnId, title, contents, user } = cardInfo;
    const { id } = user;

    await TaskStore.enrollTask({
      title,
      contents,
      columnId,
      userId: id,
    });
  }

  getCardInfo() {
    const column = this.$target.closest('.column');
    const columnId = this.$props.column.id;
    const title = column.querySelector('.card-title').value;
    const contents = column.querySelector('.card-contents').value;
    const user = UserStore.getUser();

    return { columnId, title, contents, user };
  }

  removeCard() {
    this.$target.remove();
    TaskStore.unsubscribe('tasks', this);
  }
}

export default InputCard;
