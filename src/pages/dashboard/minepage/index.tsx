import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd'

class mine extends Component {
  constructor(props: any) {
    super(props)
  }

  render () {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>this is my page</Card>
      </PageHeaderWrapper>
    )
  }
}

export default mine