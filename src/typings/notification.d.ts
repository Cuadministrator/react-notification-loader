declare module 'rmc-notification' {
  interface NewInstanceProps {
    prefixCls?: string,
    transitionName: string,
    className: string,
    style?: Object,
    getContainer?: () => HTMLElement,
    maxCount?: number,
  }
  type NewInstanceCallback = (notification: any) => undefined
  const newInstance: (props: NewInstanceProps, callback: NewInstanceCallback) => undefined
}
