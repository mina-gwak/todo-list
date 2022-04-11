import Column from '../components/Column.js';
import Header from '../components/Header.js';
import ActionLayer from '../components/ActionLayer.js';
import { ColumnStore } from '../store/index.js';
import Card from '../components/Card.js';

const renderColumns = ({ container, columns }) => {
  const fragment = document.createDocumentFragment();
  columns.forEach(column => {
    const section = document.createElement('section');
    section.classList.add('column');
    section.dataset.id = column.id;
    new Column(section, { column });
    fragment.appendChild(section);
  });
  container.append(fragment);
};

export const renderCards = ({ container, tasks }) => {
  const fragment = document.createDocumentFragment();
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.dataset.id = task.id;
    new Card(listItem, task);
    fragment.appendChild(listItem);
  });
  container.append(fragment);
};

export const render = () => {
  new Header(document.querySelector('header'));
  new ActionLayer(document.querySelector('.action-layer'));
  renderColumns({
    container: document.querySelector('.wrapper'),
    columns: ColumnStore.getAllColumns(),
  });
};
