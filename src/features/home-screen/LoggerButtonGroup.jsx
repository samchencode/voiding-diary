import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import SvgBeerCelebration from './svg/BeerCelebration';
import SvgPassingBy from './svg/PassingBy';

function LoggerButtonGroup(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Card style={[styles.card, { marginRight: 8 }]}>
        <SvgBeerCelebration
          width="80%"
          height="100%"
          style={{
            position: 'absolute',
            top: -24,
            right: -8,
            transform: [{ scaleX: -1 }],
          }}
        />
        <Text style={styles.buttonTitle}>+Intake</Text>
      </Card>
      <Card style={[styles.card, { marginLeft: 8 }]}>
        <SvgPassingBy
          width="60%"
          height="100%"
          style={{
            position: 'absolute',
            right: 0,
            top: -24,
          }}
        />
        <Text style={styles.buttonTitle}>+Void</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: { flex: 1, height: 120 },
  buttonTitle: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    zIndex: 1,
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
  },
});

export default LoggerButtonGroup;
