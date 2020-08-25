import React, { useState, useEffect } from 'react';
import './index.scss';
import { Container, Button, CardColumns, Form, Col, InputGroup } from 'react-bootstrap';
import { ipcRenderer } from 'electron';
import FormModal from '../../components/FormModal';
import CollectionItem from './CollectionItem';
import CustomScroll from '../../components/CustomScroll';

const Collection = () => {
  const [list, setList] = useState({
    all: [],
    filtered: []
  });
  const [modalShow, setModalShow] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setModalShow(false);
  }, [list.all]);

  useEffect(() => {
    const result = ipcRenderer.sendSync('get-collection-list');
    setList({ ...list, all: result, filtered: result });
  }, []);

  const handleSubmit = (form) => {
    const result = ipcRenderer.sendSync('create-collection', form);
    setList({ ...list, all: result, filtered: result });
  };

  const handleDelete = (item) => {
    const result = ipcRenderer.sendSync('delete-collection', item);
    setList({ ...list, all: result, filtered: result });
  };

  const handleInput = (e) => {
    setKeyword(e.currentTarget.value);
  };

  const handleSearch = () => {
    let result;
    if (keyword !== '') {
      result = list.all.filter(
        (item) => item.title.indexOf(keyword) !== -1 || item.description.indexOf(keyword) !== -1
      );
    } else {
      result = list.all;
    }
    setList({ ...list, filtered: result });
  };

  const handleEnter = (e) => {
    setKeyword(e.currentTarget.value);
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <Container fluid>
      <Form className="top-menu-bar">
        <Form.Row>
          <Col md={8}>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="name"
                  size="sm"
                  placeholder="请输入关键字"
                  onChange={handleInput}
                  value={keyword}
                  onKeyUp={handleEnter}
                />
                {/* 防止回车键提交表单 */}
                <input style={{ display: 'none' }} />
                <InputGroup.Append>
                  <Button variant="primary" size="sm" onClick={handleSearch}>
                    搜索
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Button variant="success" size="sm" onClick={() => setModalShow(true)}>
              添加
            </Button>
          </Col>
        </Form.Row>
      </Form>

      <CustomScroll height="600px">
        <CardColumns>
          {list.filtered.map(
            (item) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              !item.done && (
                <CollectionItem
                  description={item.description}
                  link={item.link}
                  title={item.title}
                  onDelete={() => handleDelete(item)}
                />
              )
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
          { name: 'title', label: '标题', required: true },
          { name: 'description', label: '描述', as: 'textarea', required: true },
          { name: 'link', label: '链接', required: true }
        ]}
      />
    </Container>
  );
};

export default Collection;
