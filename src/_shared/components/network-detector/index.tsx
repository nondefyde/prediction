import {Detector} from 'react-detect-offline';
import {ReactNode} from 'react';
import {notification} from 'antd';

type NetWorkDetectorType = {
    children: ReactNode;
};

const NetWorkDetector = (props: NetWorkDetectorType) => {
    const {children} = props;

    const onNetWorkChange = (online: boolean) => {
        if (!online) {
            notification.open({
                message: (
                    <span>
            {"You're currently offline. Check your connections "}
                        <a
                            className={'wrt-pl-5'}
                            style={{margin: 0}}
                            onClick={() => window.location.reload()}
                        >
              Refresh Page
            </a>
          </span>
                ),
                placement: 'topLeft',
                duration: 0,
                icon: (
                    <span className={'anticon'}>
            <i className="ri-wifi-off-line wrt-warning-color" style={{fontSize: 20}}/>
          </span>
                ),
                key: '@@WRT-INTERNET_NOTIFICATION',
            });
        } else {
            notification.open({
                message: <span>Your internet connection was restored.</span>,
                duration: 4,
                placement: 'topLeft',
                icon: (
                    <span className={'anticon'}>
            <i className="ri-wifi-line wrt-success-color" style={{fontSize: 20}}/>
          </span>
                ),
                key: '@@WRT-INTERNET_NOTIFICATION',
            });
        }
    };

    return <Detector render={() => <>{children}</>} onChange={onNetWorkChange}/>;
};

export {NetWorkDetector};
