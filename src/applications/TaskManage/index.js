import React, { useState, useEffect, useMemo } from 'react';
import './index.scss';
import { Container, Button, CardColumns } from 'react-bootstrap';
import { ipcRenderer } from 'electron';
import FormModal from '../../components/FormModal';
import TaskItem from './TaskItem';
import CustomScroll from '../../components/CustomScroll';

const TaskManage = () => {
  const [list, setList] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setModalShow(false);
  }, [list]);

  useEffect(() => {
    const result = ipcRenderer.sendSync('get-task-list');
    setList(result);
  }, []);

  const handleSubmit = (form) => {
    const result = ipcRenderer.sendSync('create-task', form);
    setList(result);
  };

  const handleFinish = (item) => {
    const result = ipcRenderer.sendSync('finish-task', item);
    setList(result);
  };

  const handleDelete = (item) => {
    const result = ipcRenderer.sendSync('delete-task', item);
    setList(result);
  };

  const handleEmpty = () => {
    const result = ipcRenderer.sendSync('empty-task');
    setList(result);
  };
  return (
    <Container fluid>
      <Container fluid className="top-menu-bar">
        <Button variant="primary" size="sm" onClick={() => setModalShow(true)}>
          添加
        </Button>
        <Button size="sm" className="margin-left-10" variant="secondary" onClick={handleEmpty}>
          清空
        </Button>
      </Container>

      <CustomScroll height="600px">
        <CardColumns>
          {useMemo(
            () =>
              // eslint-disable-next-line implicit-arrow-linebreak
              list.map(
                (item) =>
                  // eslint-disable-next-line implicit-arrow-linebreak
                  !item.done && (
                    <TaskItem
                      createTime={item.createTime}
                      content={item.content}
                      priority={item.priority}
                      done={item.done}
                      onFinish={() => handleFinish(item)}
                      onDelete={() => handleDelete(item)}
                    />
                  )
              ),
            [list]
          )}
        </CardColumns>
      </CustomScroll>

      <FormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="创建任务"
        onSubmit={handleSubmit}
        fields={[
          {
            name: 'createTime',
            label: '创建时间',
            required: true,
            readonly: true,
            value: new Date().toLocaleString()
          },
          { name: 'content', label: '内容', as: 'textarea', required: true },
          { name: 'priority', label: '优先级', as: 'select', options: [1, 2, 3] }
        ]}
      />
    </Container>
  );
};

export default TaskManage;
