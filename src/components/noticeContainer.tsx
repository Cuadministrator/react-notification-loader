import React, {
  ReactNode,
  useState,
  useEffect,
} from 'react'

import classNames from 'classnames'


import '../styles/noticeContainer.scss'

interface NoticeContainerParams {
  content: ReactNode,
  textColor?: string,
  textClassName?: string,
  imageUrl?: string,
  imageClassName?: string,
}

const NoticeContainer = ({
  content,
  textClassName,
  imageUrl,
  imageClassName,
}: NoticeContainerParams) => {
  const [showImage, setShowImage] = useState<boolean>(false)

  useEffect(() => {
    setShowImage(!!imageUrl)
  }, [imageUrl])

  return (
    <div
      className='notice-container'
    >
      {
        // 提示图片
        showImage
          ? (
            <img
              className={classNames('notice-img', {
                [imageClassName || '']: !!imageClassName,
              })}
              src={imageUrl || ''}
              alt=''
            />
          )
          : null
      }
      {
        // 提示文字
        content
          ? (
            <span
              className={textClassName}
            >{content}</span>
          )
          : null
      }
    </div>
  )
}

export default NoticeContainer
