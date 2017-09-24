import React from "react"
import NotContent from "react-icons/lib/md/library-music"

import classNames from "classnames"

const AudioListsPanel = ({
  audioLists,
  visible,
  notContentText,
  onCancel,
  onPlay,
  pause,
  playId,
  loading,
  playIcon,
  pauseIcon,
  closeIcon,
  isMobile
 }) => (
    <div
      className={classNames("audio-lists-panel", { "show": visible })} key="audio-list-panel"
    >
      <div className="audio-lists-panel-header">
        <h2 className="title">
          <span>播放列表/</span>
          <span className="num" key="num">{audioLists.length}</span>
          <span className="close-btn" {...isMobile ? { onTouchStart: onCancel } : { onClick: onCancel }}>{closeIcon}</span>
        </h2>
      </div>
      <div
        className={classNames("audio-lists-panel-content", { "no-content": audioLists.length < 1 })}
        key="audio-lists-panel-content"
      >
        {
          audioLists.length >= 1
            ? <ul>
              {
                audioLists.map((audio, i) => {
                  const {
                    name,
                    singer
                  } = audio
                  return (
                    <li
                      key={i}
                      title={pause ? ' Click to play' : 'Click to pause'}
                      className={classNames("audio-item", { "playing": playId === i }, { "pause": pause })}
                      {...isMobile ? { onTouchStart: () => onPlay(i) } : { onClick: () => onPlay(i) }}
                    >
                      <span className="group player-status" key="player-status">
                        <span className="player-icons" key={`player-icons-${i}`}>
                          {
                            playId === i && loading
                              ? loading
                              : playId === i
                                ? pause ? pauseIcon : playIcon
                                : undefined
                          }
                        </span>
                      </span>
                      <span className="group player-name" key="player-name">
                        {name}
                      </span>
                      <span className="group player-time">{singer}</span>
                    </li>
                  )
                })
              }
            </ul>
            : <div>
              <span><NotContent /></span>
              <span className="no-data" key="no-data">{notContentText}</span>
            </div>
        }
      </div>
    </div>
  )

export default AudioListsPanel