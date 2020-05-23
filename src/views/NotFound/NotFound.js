import React from 'react';
import Exception from 'ant-design-pro/lib/Exception';

export default function NotFound() {
    return (
        <Exception type="404" desc={<p>Sorry, the page you visited does not exist.</p>} />
    );
}
