import React, { Component } from 'react'
import { Drawer, Button } from 'antd'
import style from './index.less'

class MySettingDrawer extends Component {
  constructor(props: any){
    super(props)
  }

  state = {
    visible: false
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
        <Button type="primary" onClick={this.showDrawer} className={style.button} style={this.state.visible ? {'right': '240px'} : {'right': 0} }>
          Open
        </Button>
      </>
    )
  }
}

export default MySettingDrawer