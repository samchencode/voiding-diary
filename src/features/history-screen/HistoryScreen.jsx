import React from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import ThemeContext, { baseTheme } from '../theme';
import StatusBar from '../status-bar';
import HistoryCard from './HistoryCard';
import Separator from './Separator';
import data from './data';

const ListHeaderComponent = () => <Text style={styles.title}>History</Text>;

class HistoryScreen extends React.Component {
  constructor(...props) {
    super(...props);

    this.state = {
      swiping: false,
    };
  }

  static contextType = ThemeContext;

  onSwipeStateChange(swiping) {
    this.setState({ swiping });
  }

  renderItem({ item }) {
    return (
      <HistoryCard
        style={[styles.card, styles.belowTopCard]}
        onSwipeStateChange={this.onSwipeStateChange.bind(this)}
        id={item.id}
      />
    );
  }

  renderSectionHeader({ section }) {
    return <Separator style={styles.separator} datetime={section.datetime} />;
  }

  render() {
    const { colors } = this.context;
    const { swiping } = this.state;

    return (
      <>
        <StatusBar statusBarStyle="light" color={colors.dark} />
        <SectionList
          scrollEnabled={!swiping}
          stickySectionHeadersEnabled
          style={[styles.container, { backgroundColor: colors.bg }]}
          sections={data}
          windowSize={5}
          renderItem={this.renderItem.bind(this)}
          renderSectionHeader={this.renderSectionHeader.bind(this)}
          keyExtractor={(item) => '' + item.id}
          ListHeaderComponent={ListHeaderComponent}
        />
      </>
    );
  }
}

const { spaces, fonts } = baseTheme;

const styles = StyleSheet.create({
  container: {},
  title: {
    ...fonts.lg,
    marginTop: spaces.sm,
    marginLeft: spaces.lg,
    marginBottom: spaces.sm,
  },
  card: {
    margin: spaces.lg,
  },
  belowTopCard: {
    marginTop: 0,
  },
  separator: {
    marginLeft: spaces.lg,
    marginRight: spaces.lg,
  },
});

export default HistoryScreen;
