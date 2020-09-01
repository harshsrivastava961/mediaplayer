import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Orientation from 'react-native-orientation';

class VideoScreen extends Component {
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: true,
      playerState: PLAYER_STATES.PAUSED,
      screenType: 'cover',
      source: '../assets/videos/video1.mp4',
      orientation: 'portrait',
      videoList: [
        { name: 'Movie part 1', source: '../assets/video1.mp4', imageSource: '../assets/video.png' },
        { name: 'Movie part 2', source: '../assets/video2.mp4', imageSource: '../assets/video.png' },
        { name: 'Movie part 3', source: '../assets/video3.mp4', imageSource: '../assets/video.png' },
        { name: 'Movie part 4', source: '../assets/video4.mp4', imageSource: '../assets/video.png' },
        { name: 'Movie part 5', source: '../assets/video5.mp4', imageSource: '../assets/video.png' },
      ],
    };
  }

  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };

  onProgress = data => {
    const { isLoading, playerState } = this.state;
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };

  onLoad = data => this.setState({ duration: data.duration, isLoading: false });

  onLoadStart = data => this.setState({ isLoading: true });

  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

  onError = () => Alert.alert('Oh! ', error);

  onFullScreen = () => {

    if (this.state.orientation === 'portrait') {
      this.setState({ orientation: 'landscape' });
      Orientation.lockToLandscape();
    }
    else {
      this.setState({ orientation: 'portrait' });
      Orientation.lockToPortrait()
    };
  };

  onSeeking = currentTime => this.setState({ currentTime });
  get source() {
    switch (this.state.source) {
      case '../assets/video.mp4':
        return require('../assets/video1.mp4');
      case '../assets/video1.mp4':
        return require('../assets/video2.mp4');
      case '../assets/video2.mp4':
        return require('../assets/video3.mp4');
      case '../assets/video3.mp4':
        return require('../assets/video4.mp4');
      case '../assets/video4.mp4':
        return require('../assets/video5.mp4');
      default:
        return require('../assets/video1.mp4');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.videoScreen}>
          <Video
            onEnd={this.onEnd}
            onLoad={this.onLoad}
            onLoadStart={this.onLoadStart}
            onProgress={this.onProgress}
            paused={this.state.paused}
            ref={videoPlayer => (this.videoPlayer = videoPlayer)}
            resizeMode={this.state.screenType}
            onFullScreen={this.state.isFullScreen}
            source={this.source}
            style={styles.videoScreen}
            volume={10}
          />
        </View>
        <View style={styles.MediaControls}>
          <MediaControls
            duration={this.state.duration}
            isLoading={this.state.isLoading}
            mainColor="#333"
            onFullScreen={this.onFullScreen}
            onPaused={this.onPaused}
            onReplay={this.onReplay}
            onSeek={this.onSeek}
            onSeeking={this.onSeeking}
            playerState={this.state.playerState}
            progress={this.state.currentTime}

          />
        </View>
        <SafeAreaView style={styles.flatList}>
          <FlatList
            data={this.state.videoList}
            keyExtractor={(item, index) => item.name}
            renderItem={({ item }) => {
              return (
                <View style={styles.Bottom}>
                  <Image
                    style={styles.thumbnail}
                    source={require('../assets/video.png')}
                  />
                  <TouchableOpacity onPress={() => {
                    this.setState({ source: item.source })
                  }}>
                    <Text style={styles.text}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </SafeAreaView>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  videoScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  Bottom: {
    backgroundColor: '#ff8c00',
    flexDirection: 'row'
  },
  MediaControls: {
    height: 350,
  },
  flatList: {
    flex: 1
  },
  text: {
    color: 'black',
    fontSize: 25,
    alignSelf: 'center',
    marginLeft: 80
  },
  thumbnail: {
    width: 85,
    height: 85
  }
});
export default VideoScreen;