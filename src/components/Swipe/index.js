// @flow

import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import Swipeout from 'react-native-swipeout';

import colors from '~/global/colors';
import assets from '~/global/assets';
import styles from './styles';

type State = {
  activeRowId: null | number,
  scrollEnabled: boolean,
};

type Props = {};

class SwipebleListItem extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { activeRowId: null, scrollEnabled: true };
  }

  onSwipeOpen = (id: number) => {
    this.setState({
      activeRowId: id,
      scrollEnabled: false,
    });
  };

  onSwipeClose = (id: number) => {
    // TODO:
    if (id) {
      this.setState({
        scrollEnabled: true,
      });
    }
  };

  renderSwipeRow = (itemId: number, activeRowId: any) => {
    const swipeoutBtns = [
      {
        component: (
          <View style={[styles.buttonStyle, { backgroundColor: colors.blue }]}>
            <Image source={assets.editIcon} />
          </View>
        ),
      },
      {
        component: (
          <View style={[styles.buttonStyle, { backgroundColor: colors.red }]}>
            <Image source={assets.deleteIcon} />
          </View>
        ),
      },
    ];
    return (
      <Swipeout
        autoClose
        right={swipeoutBtns}
        close={itemId !== activeRowId}
        onOpen={(sectionID, rowId, direction: string) => (
          direction !== undefined ? this.onSwipeOpen(itemId) : null
        )}
        onClose={(sectionID, rowId, direction: string) => (
          direction !== undefined ? this.onSwipeClose(itemId) : null
        )}
      >
        <View>
          <View style={styles.rowItem}>
            <Image style={styles.image} />
            <View style={styles.description}>
              <View>
                <Text style={styles.topText}>Людмила Андропова</Text>
                <Text style={styles.botText}>Ответственный</Text>
              </View>
              <View style={styles.count}>
                <Text style={styles.countText}>4124</Text>
              </View>
            </View>
          </View>
        </View>
      </Swipeout>
    );
  };

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  render() {
    const {
      state: { activeRowId, scrollEnabled },
    } = this;

    const data = [
      { key: 'bdsagdshdsahsadh', id: 1 },
      { key: 'bdsagdshdsahsadh', id: 2 },
      { key: 'bdsagdshdsahsadh', id: 3 },
      { key: 'bdsagdshdsahsadh', id: 4 },
      { key: 'bdsagdshdsahsadh', id: 5 },
      { key: 'bdsagdshdsahsadh', id: 6 },
    ];
    return (
      <View style={styles.container}>
        <FlatList
          scrollEnabled={scrollEnabled}
          style={{ flex: 1, width: '100%' }}
          data={data}
          renderItem={({ item }) => this.renderSwipeRow(item.id, activeRowId)}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

export default SwipebleListItem;
