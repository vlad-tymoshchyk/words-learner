import React, { useState } from 'react';
import { Input, Button, Form, List } from 'antd';
import axios from 'axios';

const baseUrl = 'http://localhost:1080';

export const App = () => {
  const [result, setResult] = useState('');

  const handleSubmit = (form: { test_string: string }) => {
    const { test_string } = form;
    axios
      .post(`${baseUrl}/test-string`, { test_string })
      .then((res) => {
        setResult(res.data.formUs);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <Form onFinish={handleSubmit} style={{ maxWidth: 600 }}>
      <Form.Item name="test_string">
        <Input data-testid="input" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" data-testid="submit-button">
          Submit
        </Button>
      </Form.Item>
      {result && (
        <List
          bordered
          size="small"
          dataSource={[result]}
          renderItem={(item) => (
            <List.Item data-testid="result">{item}</List.Item>
          )}
        />
      )}
    </Form>
  );
};
