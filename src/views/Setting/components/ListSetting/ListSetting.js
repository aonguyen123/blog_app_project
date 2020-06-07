import React from 'react';
import { Button, Switch } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

export default function ListSetting(showModal, onClickSwitch, setting, loadingData) {
    return (
        [
            {
                name: formatMessage({id: 'security.setting.password'}),
                action: (
                    <Button
                        htmlType='button'
                        type="link"
                        onClick={() => showModal()}
                        style={{ margin: 0, padding: 0 }}
                    >
                        {formatMessage({id: 'security.setting.modifiPassword'})}
                    </Button>
                ),
                description: formatMessage({id: 'security.setting.passwordDetail'})
            },
            {
                name: formatMessage({id: 'security.setting.phone'}),
                action: (
                    <Switch
                        checkedChildren={formatMessage({id: 'security.setting.showPhone'})}
                        unCheckedChildren={formatMessage({id: 'security.setting.hidePhone'})}
                        defaultChecked={setting}
                        loading={loadingData}
                        onClick={checked => onClickSwitch(checked)}
                    />
                ),
                description: formatMessage({id: 'security.setting.phoneDetail'})
            }
        ]
    )
}