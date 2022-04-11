import '../style/style.scss';
import ActionLayer from './components/ActionLayer.js';
import ActionStore from './store/actionStore.js';
import TaskStore from './store/taskStore.js';
import ColumnStore from './store/columnStore.js';
import Header from './components/Header.js';
import Column from './components/Column.js';

const init = async () => {
  await ActionStore.init();
  await TaskStore.init();
  await ColumnStore.init();
  new Header(document.querySelector('header'));
  new ActionLayer(document.querySelector('.action-layer'));

  const columnSections = document.querySelectorAll('.column');
  const columns = ColumnStore.getAllColumns();
  columnSections.forEach(
    (section, index) => new Column(section, { column: columns[index] }),
  );
};

init();
