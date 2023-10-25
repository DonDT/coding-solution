import ReactPlayer from 'react-player'

const YoutubePlayer = ({ videoKey }) => (<ReactPlayer 
  className="video-player" 
  url={`https://www.youtube.com/watch?v=${videoKey}`} 
  controls={true}
  playing={true}
  data-testid="youtube-player"
  width={'inherit'}
  height={'inherit'}
/>);

export default YoutubePlayer;