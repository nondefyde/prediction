"use client";

import { Button, Form, Input, Modal,  } from "antd";
import { FormInputContainer } from "./create-team-modal.styled";

type createTeamModalProps = {
    isLoading: boolean;
    onCancel: () => void;
    onSubmit: (value: Record<string, any>) => void
    modalOpen: boolean;
};

export const CreateTeamModal = (props: createTeamModalProps) => {
    const { isLoading, onCancel, onSubmit, modalOpen } = props;
    const [form] = Form.useForm();
    return (
        <Modal
            title={<div style={{textAlign: 'center'}}>Add Team</div>}
            open={modalOpen}
            onCancel={()=>{
                onCancel();
                form.resetFields();
            }}
            okButtonProps={{ disabled: true }}
            cancelButtonProps={{ disabled: true }}
            footer={[
                <Button key="back" type='primary' disabled={isLoading} danger onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit"
                    disabled={isLoading}
                    loading={isLoading}
                    type="primary" ghost form="create-team-modal-form" htmlType="submit">
                    Submit
                </Button>
            ]}>
            <Form
                labelCol={{ span: 6 }}
                layout="vertical"
                form={form}
                requiredMark={false}
                id="create-team-modal-form"
                onFinish={onSubmit}>
                <FormInputContainer>
                    <Form.Item
                      style={{width: '80%'}}
                        name="name"
                        rules={[{ required: true, message: 'enter a team name' }]}
                        label={<span>Name</span>}>
                        <Input size="large" placeholder="Enter name" />
                    </Form.Item>


                </FormInputContainer>
            </Form>
        </Modal>
    )
}