import React, { Component } from 'react'
import { Tabs, Input, Icon, Form, Checkbox, Button } from 'antd'
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva'
import style from './style.less'
import { reloadAuthorized } from '@/utils/Authorized'
// import { state, effects } from './model'

const { TabPane } = Tabs;

@connect(({
  login1,
  loading
}: {
  login1: any,
  loading: {
    effects: {
      [key: string]: string;
    };
  }
}) => ({
  login1,
  submitting: loading.effects['login1/login'],
}))
class index extends Component {
  state = {
    type: '1'
  }

  callback = (key: any) => {
    console.log(key)
    console.log(formatMessage({ id: 'user1.login.userName' }))
  }
  handleSubmit = (e: any) => {
    const { type } = this.state
    const { dispatch } = this.props
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      const value1 = values
      if (!err) {
        if(type == '1'){
          dispatch({
            type: 'login1/login',
            payload: {
              ...value1,
              type: 'jigou'
            },
            callback: () => {
              reloadAuthorized()
            }
          })
        }
        console.log('Received values of form: ', values);
      }
    });
  };

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    // const { getFieldDecorator } = this.props.form
    const { form: { getFieldDecorator }, submitting } = this.props
    return (
      <div className={style.main}>
        <Form onSubmit={this.handleSubmit} className={style.form}>
          <Tabs defaultActiveKey="1" onChange={this.callback}  animated={false}>
            <TabPane tab={formatMessage({ id: 'user1.login.logintype1' })} key="1">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: formatMessage({ id: 'user1.login.username.require' }) }],
                })(
                  <Input 
                    placeholder={formatMessage({ id: 'user1.login.username.require' })}
                    prefix={<Icon type="user" className={style.prefixIcon} />}
                    size='large'
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: formatMessage({ id: 'user1.login.password.require' }) }],
                })(
                  <Input 
                    placeholder={formatMessage({ id: 'user1.login.password.require' })}
                    type='password'
                    prefix={<Icon type="lock" className={style.prefixIcon} />}
                    size='large'
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox><FormattedMessage id='user1.login.autologin' /></Checkbox>)}
                <a className={style.open} href="">
                  <FormattedMessage id='user1.login.openinis' />
                </a>
                <Button loading={submitting} type="primary" htmlType="submit" block size='large'>
                  <FormattedMessage id='user1.login.submit' />
                </Button>
                <a className={style.open} href="">
                  <FormattedMessage id='user1.login.forget' />
                </a>
              </Form.Item>
            </TabPane>
            <TabPane tab={formatMessage({ id: 'user1.login.logintype2' })} key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </Form>
      </div>
    )
  }
}

const LoginIndex = Form.create({ name: 'normal_login' })(index)

export default LoginIndex