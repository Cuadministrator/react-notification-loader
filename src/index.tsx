import React, { ReactNode } from 'react'
import classnames from 'classnames'
import Notification from 'rmc-notification'

// container
import NoticeContainer from './components/noticeContainer'

import './styles/index.scss'

interface INoticeConfig {
  duration?: number,
  mask?: boolean,
}

type INoticeBaseTypeConfig = {
  [key: string]: string
}

type IMessageInstance = {
  [key: number]: any
}

const config: INoticeConfig = {}

const noticeType: INoticeBaseTypeConfig = {}

const messageInstance: IMessageInstance = {}

const prefixCls = 'am-notice'

function getMessageInstance(mask?: boolean, callback?: Function) {
  Notification.newInstance(
    // 组件基础配置 参考 Notification 文档 https://github.com/react-component/notification
    {
      prefixCls,
      style: { zIndex: 9999 }, // clear rmc-notification default style
      transitionName: 'am-fade',
      className: classnames({
        [`${prefixCls}-mask`]: mask,
        [`${prefixCls}-no-mask`]: !mask,
      }),
    },
    (notification) => callback && callback(notification),
  )
}

function notice(
  content: ReactNode,
  type = 'info',
  duration = config.duration,
  onClose: Function | undefined,
  mask = config.mask,
) {
  const key = (new Date()).getTime()
  getMessageInstance(mask, (notification: any) => {
    // 记录新的 noticeId
    messageInstance[key] = notification
    notification.notice({
      duration,
      style: {},
      content: (
        <div
          role='alert'
          aria-live='assertive'
          className={`${prefixCls}-text`}
        >
          <NoticeContainer
            imageUrl={noticeType[type]}
            content={content}
          />
        </div>
      ),
      closable: true,
      onClose() {
        if (onClose && typeof onClose === 'function') {
          onClose()
        }
        if (notification) {
          notification.destroy()
        }
        notification = null
        if (messageInstance[key]) {
          delete messageInstance[key]
        }
      },
    })
  })
  return key
}

export interface IBaseParams {
  type: string, // 用户自定义类型
  content: ReactNode, // 提示内容
  duration: number, // 自动关闭的延时，单位秒
  onClose: Function, // 关闭后回调
  mask: boolean, // 是否显示透明蒙层，防止触摸穿透
}

// 基础轻提示组件配置
const init = (conf: INoticeConfig, type?: INoticeBaseTypeConfig) => {
  if (!conf) return
  const { duration, mask } = conf
  config.duration = duration
  if (mask === false) {
    config.mask = mask
  }
  if (type) {
    const keyArr = Object.keys(type)
    keyArr.forEach(key => {
      noticeType[key] = type[key]
    })
  }
}

// 基础轻提示组件
const show = (baseParams: IBaseParams) => {
  const { content, duration, onClose, mask, type } = baseParams
  return notice(content, type, duration, onClose, mask)
}

// 销毁 noticeId 对应的 轻提示组件
const hide = (noticeId: number) => {
  if (messageInstance[noticeId]) {
    messageInstance[noticeId].destroy()
    delete messageInstance[noticeId]
  } else {
    console.warn(`destroy notice error: not found noticeId:${noticeId}！`)
  }
}

const notification = {
  show,
  hide,
  init,
}

export default notification
