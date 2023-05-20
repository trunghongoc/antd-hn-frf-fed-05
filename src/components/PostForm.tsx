import { Form, Input, Row, Col } from "antd";
import { useEffect } from "react";

export const PostForm = ({ initialValues }: any) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Form form={form}>
      <h2>Post form</h2>

      <Row>
        <Col span={6}>Title:</Col>
        <Col span={18}>
          <Input name="title" />
        </Col>
      </Row>

      <Row>
        <Col span={6}>Description:</Col>
        <Col span={18}>
          <Input name="body" />
        </Col>
      </Row>
    </Form>
  );
};
