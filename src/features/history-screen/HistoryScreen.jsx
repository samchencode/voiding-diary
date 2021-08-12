import React from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import ThemeContext, { baseTheme } from '../theme';
import StatusBar from '../status-bar';
import HistoryCard from './HistoryCard';
import Separator from './Separator';
import { connect } from 'react-redux';
import { selectSectionListData, remove as removeLog } from '../history';
import { utils } from '../common';
const { parseDate, formatTime, parseIso } = utils.date;
const { trimWithEllipsis } = utils.string;

const mapStateToProps = (state) => ({
  data: selectSectionListData(state)
});

const mapDispatchToProps = { removeLog };

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
    const isIntake = item.type === 'intake';
    const iso = parseIso(item.datetime)
    const time = formatTime(iso);
    
    return (
      <HistoryCard
        style={[styles.card, styles.belowTopCard]}
        onSwipeStateChange={this.onSwipeStateChange.bind(this)}
        id={item.id}
        type={item.type}
        label={item.label && trimWithEllipsis(item.label, 10)}
        volume={item.volume}
        rightText={time}
        onPressRight={() => this.props.removeLog({ id: item.id })}
      />
    );
  }

  renderSectionHeader({ section }) {
    const datetime = parseDate(section.id);

    return <Separator style={styles.separator} datetime={datetime} />;
  }

  render() {
    const { colors } = this.context;
    const { swiping } = this.state;
    const { data } = this.props;

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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);
