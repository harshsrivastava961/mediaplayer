import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Icons from 'react-native-vector-icons/Ionicons';

class AudioScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: 'play',
      source: '',
      audioName: 'audio',
      volume: 1.0,
      List: [
        { name: 'Song 1', source: '../assets/music1.mp3' },
        { name: 'Song 2', source: '../assets/music2.mp3' },
        { name: 'Song 3', source: '../assets/music3.mp3' },
        { name: 'Song 4', source: '../assets/music4.mp3' },
        { name: 'Song 5', source: '../assets/music5.mp3' },
      ],
    }
    this.start();

  }
  get source() {
    switch (this.state.source) {
      case '../assets/music1.mp3':
        return require('../assets/music1.mp3');

      case '../assets/music2.mp3':
        return require('../assets/music2.mp3');

      case '../assets/music3.mp3':
        return require('../assets/music3.mp3');

      case '../assets/music4.mp3':
        return require('../assets/music4.mp3');

      case '../assets/music5.mp3':
        return require('../assets/music5.mp3');

      default:
        return require('../assets/music1.mp3');
    }
  }
  start = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: 'trackId',
      url: this.source,
      artwork: require('../assets/mp3icon.jpg')
    });
  };
  increaseVolume = () => {
    (this.state.volume < 1) && this.setState({ volume: this.state.volume + .1 });
    TrackPlayer.setVolume(this.state.volume);
  }
  decreaseVolume = () => {
    (this.state.volume > 0) && this.setState({ volume: this.state.volume - .1 });
    TrackPlayer.setVolume(this.state.volume);
  }
  MusicHandler = () => {
    this.state.icon === 'play' ? this.setState({ icon: 'pause' }) : this.setState({ icon: 'play' });
    this.state.icon === 'play' ? TrackPlayer.play() : TrackPlayer.pause();
  }
  changeSong = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: this.state.source,
      url: this.source,
      artwork: require('../assets/mp3icon.jpg')
    });
    TrackPlayer.skip(this.state.source);
    TrackPlayer.play();

    this.setState({ icon: 'pause' })
  }

  render() {
    return (
      <View style={styles.container} >
        <Image
          source={require('../assets/music.jpg')}
        />
        <Text style={styles.text}> Now Playing - {this.state.audioName}</Text>
        <View style={styles.bottom}>
          <Icons name='add' style={styles.icon} onPress={() => this.increaseVolume()} size={80} />
          <Icons name={this.state.icon} style={styles.icon} onPress={() => this.MusicHandler()} size={80} />
          <Icons name='remove' style={styles.icon} onPress={() => this.decreaseVolume()} size={80} />
        </View>
        <FlatList
          data={this.state.List}
          keyExtractor={(item, index) => item.name}
          renderItem={({ item }) => {
            return (
              <View style={styles.bottom}>

                <Image
                  style={styles.thumbnail}
                  source={require('../assets/mp3icon.jpg')}
                />
                <TouchableOpacity onPress={() => {
                  this.setState({ source: item.source, audioName: item.name });
                  this.changeSong();
                }}>
                  <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </ View >);
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff8c00',
    flex: 1,
    flexDirection: 'column',
  },
  bottom: {
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
    padding: 30,
    color: "black"
  },
  text: {
    color: 'black',
    fontSize: 25,
  },
  thumbnail: {
    width: 100,
    height: 100
  }
});
export default AudioScreen;