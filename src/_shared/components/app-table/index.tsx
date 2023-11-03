import React, { useState } from 'react';
import { Button, Popconfirm, Radio, Space, Table, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { Pagination } from '@mpr/_shared/namespace';
import { capitalize } from 'lodash';

export interface TableDataType {
    key: string;
    id: string;
    _id: string;
    teams: string[];
    predictions: string[];
}

export interface AppTableProps {
    isLoading: boolean;
    data: TableDataType[];
    onActionSubmit: (id: string) => void
    pagination?: Pagination | undefined;
}


const AppTable = (props: AppTableProps) => {
    const { data, pagination, isLoading, onActionSubmit } = props

    const columns: ColumnsType<TableDataType> = [
        {
            title: 'Fixture',
            dataIndex: 'teams',
            key: 'teams',
            render: (teams: string[]) => (
                <span>
                    <Space>{capitalize(teams[0])}</Space> vs <Space>{capitalize(teams[1])}</Space>
                </span>
            ),
        },
        {
            title: 'Predictions',
            key: 'predictions',
            dataIndex: 'predictions',
            render: (predictions: string[]) => (
                <span>
                    {predictions.map((prediction, index) => {
                        return (
                            <Tag style={{margin: '1.5px'}} color={'geekblue'} key={`${prediction}-${index}`}>
                                {prediction.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title={"Delete prediction"}
                    description={"Are you sure to delete this prediction?"}
                    onConfirm={() => onActionSubmit(record?._id)}
                    onCancel={() => { }}
                    okButtonProps={{ type: 'default', danger: true }}
                    okText="Yes"
                    cancelText="No">
                    <Button
                        disabled={isLoading}
                        type="text"
                        size={'small'} danger>
                        Delete

                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            <Table bordered loading={isLoading} columns={columns} pagination={{...pagination}} dataSource={data} />
        </div>
    );
};

export default AppTable;