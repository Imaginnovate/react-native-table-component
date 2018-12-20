import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Text, StyleSheet, Image } from 'react-native';
import Cell from './cell';

class Row extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    isRowTitle: PropTypes.bool,
  }

  renderImage() {
    const image = './s.png';
    return(
      <Image style={{width: 6, height: 10}} source ={image} />
    );
  }

  render() {
    const {data,isRowTitle, style, widthArr, height, flexArr, textStyle, borderStyle, ...props} = this.props;
    let widthNum = 0;
    if (widthArr) {
      for(let i=0; i<widthArr.length; i++) {
          widthNum += widthArr[i];
      }
    }
    return (
      data ?
      <View style={[
       {height: 60},
        widthNum && {width: widthNum},
        styles.row,
        style
      ]}>
        {
          data.map((item, i) => {
            const flex = flexArr && flexArr[i];
            const width = widthArr && widthArr[i];
            if(isRowTitle)
            return <Cell key={i} data={item} width={width} height={height} flex={flex} textStyle={textStyle} borderStyle={borderStyle} isRowTitle = {isRowTitle} {...props}/>
            else {
              let image = '';
              let imagWidth = 11;
              let imagHeight = 12;
              let bottom = 20;
              if(item.includes('completed')){
                image = require('./shape_copy.png')
                imagWidth = 11;
                imagHeight = 12;
                bottom = 20;
              }else if(item.includes('started')){
                 image = require('./s.png');
                 imagWidth = 7;
                imagHeight = 11;
                bottom = 20;
              }
              return(
                <View style={{width: 50, height: 60 ,justifyContent:'center', alignItems: 'center', borderRightWidth:1, borderColor:'rgba(169,169,169,0.25)',borderBottomWidth: 1}}>
                <Image source = {image} style={{width: imagWidth, height: imagHeight, marginBottom:bottom}}/>
                <View style={{width: 50,height: 1, backgroundColor:'rgba(169,169,169,0.25)',}} />
                </View>
              );
            }
          })
        }
      </View>
      : null
    )
  }
}

class Rows extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    isRowTitle: PropTypes.bool,
  }
  render() {
    const {data, style, widthArr, heightArr, flexArr, textStyle, borderStyle,isRowTitle, ...props} = this.props;
    let flexNum = 0, widthNum = 0;
    if (flexArr) {
      for(let i=0; i<flexArr.length; i++) {
          flexNum += flexArr[i];
      }
    }
    if (widthArr) {
      for(let i=0; i<widthArr.length; i++) {
          widthNum += widthArr[i];
      }
    }

    return (
      data ?
      <View style={[
        flexNum && {flex: flexNum},
      ]}>
        {
          data.map((item, i) => {
            const height = heightArr && heightArr[i];
            return <Row key={i} data={item} widthArr={widthArr} height={60} flexArr={flexArr} style={style} textStyle={textStyle} isRowTitle= {isRowTitle} borderStyle={borderStyle} {...props}/>
          })
        }
      </View>
      : null
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden'
  },
})

export { Row, Rows };
