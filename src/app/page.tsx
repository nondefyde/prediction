"use client";
import { Form, Input, Button, Row, Col, Typography, Select, Space, SelectProps, Divider, message, InputNumber, List, Tag } from 'antd';
import { OUTCOMES } from '@mpr/_shared/constant';
import { capitalize } from 'lodash';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useTeam } from '@mpr/hooks/app';
import { PlusOutlined } from '@ant-design/icons';
import { CreateTeamModal } from '@mpr/_shared/components';
import { useFixture } from '@mpr/hooks/app/fixture';
import AppTable from '@mpr/_shared/components/app-table';
import { getRandomItems } from '@mpr/_shared/utils';
import { useAppSelector } from '@mpr/redux/store';
import { useDispatch } from 'react-redux';
import { generatePrediction, clearPrediction } from '@mpr/redux/slices/prediction';
import { usePagination } from '@mpr/hooks/_shared/usePagination';

const { Title } = Typography;

export default function Home() {
  const {predictions} = useAppSelector((state) => state.prediction);
  const { pagination: predictionPagination } = usePagination({ key: 'get-predictions' });
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [predictionForm] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false)
  const [open, setOpen] = useState(false);
  const { isLoading, getTeamsResponse, createTeam, createTeamResponse, isCreatingTeam } = useTeam({ triggerKeys: ['get-teams'] });
  const { isLoadingFixtures, isCreatingFixture, createFixture, createFixtureResponse, getFixturesResponse, pagination, deleteFixture, deleteFixtureResponse } = useFixture({ triggerKeys: ['get-fixtures'] })

  const onFinish = (values: Record<string, any>) => {
    const teams: Array<string> = []
    const payload = {
      teams: teams.concat(values['home'], values['away']),
      predictions: values['predictions']
    }
    createFixture({ payload })
    form.resetFields();
  };

  const onGeneratePredictions = (values: Record<string, any>) => {
    const predictions:Array<Record<string, any>>  = getRandomItems(getFixturesResponse?.data?.data, values['noOfPredictions'])
    dispatch(generatePrediction({ predictions }));
    predictionForm.resetFields();
  };

  console.log("getFixturesResponse?.data?.data:::", getFixturesResponse?.data?.data)

  const onClearPredictions = () => dispatch(clearPrediction())

  const onCreateTeam = (value: Record<string, any>) => {
    createTeam({
      payload: {
        ...value,
      }
    })
  }

  const onDeleteFixture = (id: string) => {
    deleteFixture({
      payload: {
        _id: id,
      }
    })
  }
  const handleOpenModal = () => {
    setModalOpen(true)
    setOpen(false)
  }

  const handleCloseModal = useCallback(() => {
    form.resetFields();
    setModalOpen(false);
  }, [])


  useEffect(() => {
    if (createTeamResponse) {
      if (createTeamResponse.data) {
        message.success('Team added successfully')
        setOpen(false)
        setModalOpen(false)
        form.resetFields()
      } else if (createTeamResponse.error) {
        message.error(createTeamResponse.error?.data?.meta?.error?.message || 'Error encountered, try again');
      }
    }
  }, [createTeamResponse])

  useEffect(() => {
    if (createFixtureResponse) {
      if (createFixtureResponse.data) {
        message.success('Prediction created successfully')
        setOpen(false)
        form.resetFields()
      } else if (createFixtureResponse.error) {
        message.error(createFixtureResponse.error?.data?.meta?.error?.message || 'Error encountered, try again');
      }
    }
  }, [createFixtureResponse])

  useEffect(() => {
    if (deleteFixtureResponse) {
      if (deleteFixtureResponse.data) {
        message.success('Prediction deleted successfully')
        setOpen(false)
        form.resetFields()
      } else if (deleteFixtureResponse.error) {
        message.error(deleteFixtureResponse.error?.data?.meta?.error?.message || 'Error encountered, try again');
      }
    }
  }, [deleteFixtureResponse])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Title className='w-full text-center z-20 sticky top-0 bg-white'>M-Predict</Title>
      <Title style={{ marginTop: 0 }} level={4}>Set up a fixture, and make predictions!</Title>

      <section style={{ width: 700 }} className='shadow-lg rounded-xl p-6 mt-5 max-w-full'>
        <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={6}>
              <Form.Item name="home" label="Home" rules={[{ required: true, message: 'select a team' }]}
              >
                <Select
                  showSearch
                  size="middle"
                  placeholder="Select team"
                  open={open}
                  onDropdownVisibleChange={(visible) => setOpen(visible)}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '6px 0' }} />
                      <Button type="text" icon={<PlusOutlined />} block onClick={handleOpenModal}>
                        Add Team
                      </Button>
                    </>
                  )}
                >
                  {(getTeamsResponse?.data?.data ?? [])?.map((team: Record<string, any>) => (
                    <Select.Option key={team?._id} value={team?._id}>
                      {capitalize(team?.name)}
                    </Select.Option>
                  )) ?? 'Teams are not available'}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={1} className='flex justify-center items-center'>
              <Space size="small">vs</Space>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6}>
              <Form.Item name="away" label="Away" rules={[{ required: true, message: 'select a team' }]}>
                <Select
                  showSearch
                  size="middle"
                  placeholder="Select team"
                >
                  {(getTeamsResponse?.data?.data ?? [])?.map((team: Record<string, any>) => (
                    <Select.Option key={`${team?.name}-${team?._id}`} value={team?._id}>
                      {capitalize(team?.name)}
                    </Select.Option>
                  )) ?? 'Teams are not available'}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6}>
              <Form.Item name="predictions" label="Predictions" rules={[{ required: true, message: 'select at least one prediction' }]}>
                <Select
                  showSearch
                  size="middle"
                  placeholder="Select Predictions"
                  mode="multiple"
                  allowClear
                  maxTagCount='responsive'
                  placement='bottomRight'
                >
                  {OUTCOMES?.map((outcome, index) => (
                    <Select.Option key={`${outcome}-${index}`} value={outcome}>
                      {capitalize(outcome)}
                    </Select.Option>
                  )) ?? 'Teams are not available'}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={5} className='flex justify-center items-center'>
              <Button type="primary" htmlType="submit" className="bg-blue-500 shadow-lg shadow-blue-500/50" disabled={isLoading} loading={isLoading || isCreatingFixture}>
                Submit
              </Button>
            </Col>
          </Row>

        </Form>
      </section>

      <section style={{ width: 700 }} className='my-16 max-w-full'>
        <AppTable isLoading={isLoadingFixtures || getFixturesResponse.isFetching || deleteFixtureResponse.isLoading} data={getFixturesResponse?.data?.data ?? [] as any[]} pagination={pagination} onActionSubmit={onDeleteFixture} />
      </section>

          <div style={{ width: 700 }} className='max-w-full flex justify-end'>
            <Title style={{ marginTop: 0 }} level={4}>Generate Predictions</Title>
          </div>
          <section style={{ width: 700 }} className='py-6 mt-0 max-w-full'>
            <div className='w-full flex justify-end'>
              <Form form={predictionForm} onFinish={onGeneratePredictions} layout="vertical" className='flex gap-2' requiredMark={false} id="generate-predictions-form">
                <Form.Item
                  name="noOfPredictions"
                  className='w-48'
                  rules={[
                    {
                      required: true,
                      message: 'Enter a number',
                    },
                  ]}
                >
                  <InputNumber
                    className='w-full'
                    size="middle"
                    placeholder="Enter number of predictions"
                    min={1}
                  />
                </Form.Item>
                <Button type="primary" form="generate-predictions-form" htmlType="submit" className="bg-blue-500 shadow-lg shadow-blue-500/50" disabled={isLoading || !getFixturesResponse?.data?.data?.length} loading={isLoading || isCreatingFixture}>
                  Generate
                </Button>
                <Button type="primary" form="generate-predictions-form" danger htmlType="reset" onClick={onClearPredictions} className="bg-red-500 shadow-lg shadow-red-500/50" disabled={isLoading || !getFixturesResponse?.data?.data?.length || !predictions?.length} loading={isLoading || isCreatingFixture}>
                  Clear
                </Button>

              </Form>
            </div>
            <List
              size="small"
              locale={{ emptyText: 'No predictions generated' }}
              bordered
              dataSource={predictions}
              pagination={predictions && predictions?.length > 0 ? {...predictionPagination}: undefined}
              renderItem={(item) => <List.Item className='w-100' key={item?._id}>
                <Row  style={{width: '100%'}} className='px-1 py-2' gutter={[16, 16]}>
                  <Col span={10} ><Space>{capitalize(item?.teams[0]?.name)}</Space> vs <Space>{capitalize(item.teams[1]?.name)}</Space></Col>
                  <Col span={14}>
                  {item?.predictions.map((prediction:string, index:any) => {
                        return (
                            <Tag color={'geekblue'} key={`${prediction}-${index}`}>
                                {prediction.toUpperCase()}
                            </Tag>
                        );
                    })}
                </Col>
                </Row>
              </List.Item>}
            />
          </section>

      <CreateTeamModal modalOpen={modalOpen} onSubmit={onCreateTeam} isLoading={isCreatingTeam || isLoading || isCreatingFixture} onCancel={handleCloseModal} />
    </main>
  )
}
